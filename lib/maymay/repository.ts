import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { dbPool, withTransaction } from "@/lib/maymay/database";
import {
  DEFAULT_AUTONOMOUS_STATE,
  DEFAULT_EVOLVED_PERSONA,
  DEFAULT_MAY_STATE,
  DEFAULT_RELATIONSHIP,
  DEFAULT_SELF_MODEL,
  type AutonomousEntityState,
  type EvolvedPersona,
  type IncomingMessage,
  type MayState,
  type MemoryEvent,
  type MemoryNode,
  type Opinion,
  type PersonaEvolutionAudit,
  type PersonaEvolutionProposal,
  type PersonaVersionSnapshot,
  type ReflectionEntry,
  type RelationshipState,
  type RuntimeBundle,
  type SelfModel,
  type SelfObservationSignal,
} from "@/types/maymay";
import {
  sanitizeAutonomousState,
  sanitizeMayState,
  sanitizeMemories,
  sanitizeOpinions,
  sanitizePersona,
  sanitizeReflectionEntries,
  sanitizeRelationship,
  sanitizeSelfModel,
  sanitizeSelfObservation,
} from "@/lib/maymay/evolution";

export class StateConflictError extends Error {
  constructor() {
    super("MayMay runtime revision conflict");
    this.name = "StateConflictError";
  }
}

function parseCookies(request: Request) {
  const raw = request.headers.get("cookie") ?? "";
  const result = new Map<string, string>();
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (!key || !rest.length) continue;
    result.set(key, decodeURIComponent(rest.join("=")));
  }
  return result;
}

export function actorIdentity(request: Request) {
  const headerId = request.headers.get("x-maymay-user-id")?.trim();
  if (headerId && /^[a-zA-Z0-9._:-]{3,120}$/u.test(headerId)) {
    return { actorId: `auth:${headerId}`, setCookie: null as string | null };
  }
  const cookies = parseCookies(request);
  const existing = cookies.get("maymay_actor_id");
  if (existing && /^[0-9a-f-]{36}$/iu.test(existing)) {
    return { actorId: `anon:${existing}`, setCookie: null as string | null };
  }
  const id = randomUUID();
  return {
    actorId: `anon:${id}`,
    setCookie: `maymay_actor_id=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`,
  };
}

async function ensureActor(client: PoolClient, actorId: string) {
  await client.query(
    `INSERT INTO may_state(actor_id,state,revision) VALUES($1,$2,0)
     ON CONFLICT(actor_id) DO NOTHING`,
    [actorId, DEFAULT_MAY_STATE],
  );
  await client.query(
    `INSERT INTO relationship_state(actor_id,relationship) VALUES($1,$2)
     ON CONFLICT(actor_id) DO NOTHING`,
    [actorId, DEFAULT_RELATIONSHIP],
  );
  await client.query(
    `INSERT INTO self_models(actor_id,self_model) VALUES($1,$2)
     ON CONFLICT(actor_id) DO NOTHING`,
    [actorId, DEFAULT_SELF_MODEL],
  );
  await client.query(
    `INSERT INTO autonomous_state(actor_id,state) VALUES($1,$2)
     ON CONFLICT(actor_id) DO NOTHING`,
    [actorId, DEFAULT_AUTONOMOUS_STATE],
  );
  await client.query(
    `INSERT INTO persona_versions(actor_id,version,persona) VALUES($1,$2,$3)
     ON CONFLICT(actor_id,version) DO NOTHING`,
    [actorId, DEFAULT_EVOLVED_PERSONA.version, DEFAULT_EVOLVED_PERSONA],
  );
}

export async function loadRuntimeBundle(actorId: string): Promise<RuntimeBundle> {
  return withTransaction(async client => {
    await ensureActor(client, actorId);
    const [stateR, personaR, memoriesR, opinionsR, relationR, selfR, autoR, reflectR, convoR, obsR] =
      await Promise.all([
        client.query(`SELECT state,revision,last_turn_at FROM may_state WHERE actor_id=$1`, [actorId]),
        client.query(`SELECT persona FROM persona_versions WHERE actor_id=$1 ORDER BY version DESC LIMIT 5`, [actorId]),
        client.query(`SELECT node FROM memory_nodes WHERE actor_id=$1 ORDER BY updated_at DESC LIMIT 500`, [actorId]),
        client.query(`SELECT opinion FROM opinions WHERE actor_id=$1 ORDER BY updated_at DESC LIMIT 120`, [actorId]),
        client.query(`SELECT relationship FROM relationship_state WHERE actor_id=$1`, [actorId]),
        client.query(`SELECT self_model FROM self_models WHERE actor_id=$1`, [actorId]),
        client.query(`SELECT state FROM autonomous_state WHERE actor_id=$1`, [actorId]),
        client.query(`SELECT entry FROM reflection_entries WHERE actor_id=$1 ORDER BY created_at DESC LIMIT 8`, [actorId]),
        client.query(`SELECT role,text FROM conversation_messages WHERE actor_id=$1 ORDER BY id DESC LIMIT 36`, [actorId]),
        client.query(`SELECT signal FROM self_observation_signals WHERE actor_id=$1 AND processed=FALSE ORDER BY created_at DESC LIMIT 12`, [actorId]),
      ]);

    const personas = personaR.rows.map(row => sanitizePersona(row.persona));
    const persona = personas[0] ?? structuredClone(DEFAULT_EVOLVED_PERSONA);
    const personaHistory: PersonaVersionSnapshot[] = personas
      .slice()
      .reverse()
      .map(item => ({
        version: item.version,
        traits: item.traits,
        selfDescription: item.selfDescription,
        updatedAtTurn: item.updatedAtTurn,
      }));
    const conversation: IncomingMessage[] = convoR.rows
      .slice()
      .reverse()
      .map(row => ({ role: row.role === "ai" ? "ai" : "user", text: String(row.text) }));

    return {
      actorId,
      revision: Number(stateR.rows[0]?.revision ?? 0),
      state: sanitizeMayState(stateR.rows[0]?.state),
      persona,
      personaHistory,
      memories: sanitizeMemories(memoriesR.rows.map(row => row.node)),
      opinions: sanitizeOpinions(opinionsR.rows.map(row => row.opinion)),
      relationship: sanitizeRelationship(relationR.rows[0]?.relationship),
      selfModel: sanitizeSelfModel(selfR.rows[0]?.self_model),
      autonomous: sanitizeAutonomousState(autoR.rows[0]?.state),
      recentReflections: sanitizeReflectionEntries(reflectR.rows.map(row => row.entry)),
      conversation,
      pendingSelfObservations: obsR.rows.map(row => sanitizeSelfObservation(row.signal)),
      lastTurnAt: stateR.rows[0]?.last_turn_at ? new Date(stateR.rows[0].last_turn_at).toISOString() : null,
    };
  });
}

export async function appendConversationMessage(actorId: string, role: "user" | "ai", text: string) {
  await dbPool().query(
    `INSERT INTO conversation_messages(actor_id,role,text) VALUES($1,$2,$3)`,
    [actorId, role, text.slice(0, 12000)],
  );
}

export async function commitTurn(args: {
  actorId: string;
  expectedRevision: number;
  state: MayState;
  relationship: RelationshipState;
  memories: MemoryNode[];
  memoryEvents: MemoryEvent[];
  opinions: Opinion[];
  autonomous: AutonomousEntityState;
  selfObservation: SelfObservationSignal;
  assistantText: string;
  focusedResurfacingId?: string | null;
}) {
  return withTransaction(async client => {
    const updated = await client.query(
      `UPDATE may_state SET state=$3,revision=revision+1,last_turn_at=NOW(),updated_at=NOW()
       WHERE actor_id=$1 AND revision=$2 RETURNING revision`,
      [args.actorId, args.expectedRevision, args.state],
    );
    if (!updated.rowCount) throw new StateConflictError();

    await client.query(
      `INSERT INTO relationship_state(actor_id,relationship) VALUES($1,$2)
       ON CONFLICT(actor_id) DO UPDATE SET relationship=EXCLUDED.relationship,updated_at=NOW()`,
      [args.actorId, args.relationship],
    );
    await client.query(
      `INSERT INTO autonomous_state(actor_id,state) VALUES($1,$2)
       ON CONFLICT(actor_id) DO UPDATE SET state=EXCLUDED.state,updated_at=NOW()`,
      [args.actorId, args.autonomous],
    );

    const touched = new Set(args.memoryEvents.map(event => event.memoryId));
    if (args.focusedResurfacingId) touched.add(args.focusedResurfacingId);
    for (const memory of args.memories) {
      if (!touched.has(memory.id)) continue;
      await client.query(
        `INSERT INTO memory_nodes(actor_id,memory_id,node) VALUES($1,$2,$3)
         ON CONFLICT(actor_id,memory_id) DO UPDATE SET node=EXCLUDED.node,updated_at=NOW()`,
        [args.actorId, memory.id, memory],
      );
      await client.query(`DELETE FROM memory_edges WHERE actor_id=$1 AND source_id=$2`, [args.actorId, memory.id]);
      for (const edge of memory.edges) {
        await client.query(
          `INSERT INTO memory_edges(actor_id,source_id,target_id,relation,strength)
           VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING`,
          [args.actorId, memory.id, edge.targetId, edge.relation, edge.strength],
        );
      }
    }
    for (const event of args.memoryEvents) {
      await client.query(
        `INSERT INTO memory_events(event_id,actor_id,memory_id,event_type,payload,turn)
         VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(event_id) DO NOTHING`,
        [event.id, args.actorId, event.memoryId, event.type, event, event.turn],
      );
    }
    for (const opinion of args.opinions) {
      await client.query(
        `INSERT INTO opinions(actor_id,opinion_id,canonical_key,opinion) VALUES($1,$2,$3,$4)
         ON CONFLICT(actor_id,opinion_id) DO UPDATE SET canonical_key=EXCLUDED.canonical_key,opinion=EXCLUDED.opinion,updated_at=NOW()`,
        [args.actorId, opinion.id, opinion.canonicalKey, opinion],
      );
    }
    if (args.selfObservation.observation || args.selfObservation.severity > 0.05) {
      await client.query(
        `INSERT INTO self_observation_signals(signal_id,actor_id,signal) VALUES($1,$2,$3)`,
        [randomUUID(), args.actorId, args.selfObservation],
      );
    }
    await client.query(
      `INSERT INTO conversation_messages(actor_id,role,text) VALUES($1,'ai',$2)`,
      [args.actorId, args.assistantText.slice(0, 12000)],
    );
    return Number(updated.rows[0].revision);
  });
}

export async function saveReflectionResult(args: {
  actorId: string;
  persona: EvolvedPersona;
  personaProposal: PersonaEvolutionProposal;
  personaAudit: PersonaEvolutionAudit;
  selfModel: SelfModel;
  autonomous: AutonomousEntityState;
  reflection: ReflectionEntry;
  memories: MemoryNode[];
  memoryEvents: MemoryEvent[];
  opinions: Opinion[];
}) {
  await withTransaction(async client => {
    if (args.personaAudit.personaVersionAfter !== args.personaAudit.personaVersionBefore) {
      await client.query(
        `INSERT INTO persona_versions(actor_id,version,persona,audit) VALUES($1,$2,$3,$4)
         ON CONFLICT(actor_id,version) DO NOTHING`,
        [args.actorId, args.persona.version, args.persona, args.personaAudit],
      );
      await client.query(
        `INSERT INTO evolution_runs(run_id,actor_id,persona_version_before,persona_version_after,proposal,audit)
         VALUES($1,$2,$3,$4,$5,$6)`,
        [randomUUID(), args.actorId, args.personaAudit.personaVersionBefore, args.personaAudit.personaVersionAfter, args.personaProposal, args.personaAudit],
      );
    }
    await client.query(
      `INSERT INTO self_models(actor_id,self_model) VALUES($1,$2)
       ON CONFLICT(actor_id) DO UPDATE SET self_model=EXCLUDED.self_model,updated_at=NOW()`,
      [args.actorId, args.selfModel],
    );
    await client.query(
      `INSERT INTO autonomous_state(actor_id,state) VALUES($1,$2)
       ON CONFLICT(actor_id) DO UPDATE SET state=EXCLUDED.state,updated_at=NOW()`,
      [args.actorId, args.autonomous],
    );
    await client.query(
      `INSERT INTO reflection_entries(reflection_id,actor_id,entry) VALUES($1,$2,$3) ON CONFLICT DO NOTHING`,
      [args.reflection.id, args.actorId, args.reflection],
    );
    for (const memory of args.memories) {
      await client.query(
        `INSERT INTO memory_nodes(actor_id,memory_id,node) VALUES($1,$2,$3)
         ON CONFLICT(actor_id,memory_id) DO UPDATE SET node=EXCLUDED.node,updated_at=NOW()`,
        [args.actorId, memory.id, memory],
      );
    }
    for (const event of args.memoryEvents) {
      await client.query(
        `INSERT INTO memory_events(event_id,actor_id,memory_id,event_type,payload,turn)
         VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(event_id) DO NOTHING`,
        [event.id, args.actorId, event.memoryId, event.type, event, event.turn],
      );
    }
    for (const opinion of args.opinions) {
      await client.query(
        `INSERT INTO opinions(actor_id,opinion_id,canonical_key,opinion) VALUES($1,$2,$3,$4)
         ON CONFLICT(actor_id,opinion_id) DO UPDATE SET canonical_key=EXCLUDED.canonical_key,opinion=EXCLUDED.opinion,updated_at=NOW()`,
        [args.actorId, opinion.id, opinion.canonicalKey, opinion],
      );
    }
    await client.query(`UPDATE self_observation_signals SET processed=TRUE WHERE actor_id=$1 AND processed=FALSE`, [args.actorId]);
  });
}

export async function activeActorIds(limit = 12) {
  const result = await dbPool().query(
    `SELECT actor_id FROM may_state WHERE updated_at > NOW() - INTERVAL '30 days'
     ORDER BY updated_at DESC LIMIT $1`,
    [Math.max(1, Math.min(50, limit))],
  );
  return result.rows.map((row: { actor_id: unknown }) => String(row.actor_id));
}

export async function queueProactiveMessage(args: {
  actorId: string;
  message: string;
  reason: string;
  confidence: number;
}) {
  const id = randomUUID();
  await dbPool().query(
    `INSERT INTO proactive_messages(message_id,actor_id,message,reason,confidence)
     VALUES($1,$2,$3,$4,$5)`,
    [id, args.actorId, args.message, args.reason, args.confidence],
  );
  return id;
}

export async function getQueuedProactiveMessages(actorId: string) {
  return withTransaction(async client => {
    const result = await client.query(
      `SELECT message_id,message,reason,created_at FROM proactive_messages
       WHERE actor_id=$1 AND status='queued' ORDER BY created_at ASC LIMIT 3 FOR UPDATE SKIP LOCKED`,
      [actorId],
    );
    if (result.rows.length) {
      await client.query(
        `UPDATE proactive_messages SET status='delivered',delivered_at=NOW()
         WHERE message_id = ANY($1::text[])`,
        [result.rows.map(row => row.message_id)],
      );
    }
    return result.rows.map(row => ({
      id: String(row.message_id),
      text: String(row.message),
      reason: String(row.reason),
      createdAt: new Date(row.created_at).toISOString(),
    }));
  });
}

export async function saveHeartbeatAudit(actorId: string, action: string, pressure: unknown, result: unknown) {
  await dbPool().query(
    `INSERT INTO heartbeat_runs(run_id,actor_id,action,pressure,result) VALUES($1,$2,$3,$4,$5)`,
    [randomUUID(), actorId, action, pressure, result ?? null],
  );
}

export async function saveAutonomousState(actorId: string, state: AutonomousEntityState) {
  await dbPool().query(
    `INSERT INTO autonomous_state(actor_id,state) VALUES($1,$2)
     ON CONFLICT(actor_id) DO UPDATE SET state=EXCLUDED.state,updated_at=NOW()`,
    [actorId, state],
  );
}

export async function proactiveCountSince(actorId: string, sinceIso: string) {
  const result = await dbPool().query(
    `SELECT COUNT(*)::int AS count FROM proactive_messages WHERE actor_id=$1 AND created_at >= $2::timestamptz`,
    [actorId, sinceIso],
  );
  return Number(result.rows[0]?.count ?? 0);
}
