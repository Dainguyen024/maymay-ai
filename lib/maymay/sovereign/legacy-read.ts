import { dbPool } from "@/lib/maymay/database";
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
  type MemoryNode,
  type Opinion,
  type ReflectionEntry,
  type RelationshipState,
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

export type LegacyMindSnapshot = {
  actorId: string;
  revision: number;

  state: MayState;
  persona: EvolvedPersona;
  personaHistory: EvolvedPersona[];

  memories: MemoryNode[];
  opinions: Opinion[];

  relationship: RelationshipState;
  selfModel: SelfModel;
  autonomous: AutonomousEntityState;

  recentReflections: ReflectionEntry[];
  conversation: IncomingMessage[];
  pendingSelfObservations: SelfObservationSignal[];

  lastTurnAt: string | null;
};

/**
 * PHASE C — READ ONLY LEGACY BRIDGE
 *
 * Đọc v12 trực tiếp nhưng KHÔNG:
 * - ensureActor()
 * - INSERT
 * - UPDATE
 * - DELETE
 * - mutate legacy state
 *
 * Mục tiêu: cho Sovereign Runtime nhìn thấy Mây v12
 * trước khi migration/cutover xảy ra.
 */
export async function loadLegacyMindSnapshot(
  actorId: string,
): Promise<LegacyMindSnapshot | null> {
  const db = dbPool();

  const stateResult = await db.query(
    `SELECT state, revision, last_turn_at
     FROM may_state
     WHERE actor_id = $1
     LIMIT 1`,
    [actorId],
  );

  // Không tự tạo actor mới.
  if (!stateResult.rowCount) {
    return null;
  }

  const [
    personaResult,
    memoriesResult,
    opinionsResult,
    relationshipResult,
    selfModelResult,
    autonomousResult,
    reflectionsResult,
    conversationResult,
    observationsResult,
  ] = await Promise.all([
    db.query(
      `SELECT persona
       FROM persona_versions
       WHERE actor_id = $1
       ORDER BY version DESC
       LIMIT 5`,
      [actorId],
    ),

    /*
     * FIX read-path ordering bug của v12:
     * lấy NEWEST 120 trước, sau đó đảo ASC để sanitizer
     * không vô tình giữ phần cũ hơn.
     */
    db.query(
      `SELECT node
       FROM (
         SELECT node, updated_at
         FROM memory_nodes
         WHERE actor_id = $1
         ORDER BY updated_at DESC
         LIMIT 120
       ) recent
       ORDER BY updated_at ASC`,
      [actorId],
    ),

    db.query(
      `SELECT opinion
       FROM (
         SELECT opinion, updated_at
         FROM opinions
         WHERE actor_id = $1
         ORDER BY updated_at DESC
         LIMIT 100
       ) recent
       ORDER BY updated_at ASC`,
      [actorId],
    ),

    db.query(
      `SELECT relationship
       FROM relationship_state
       WHERE actor_id = $1
       LIMIT 1`,
      [actorId],
    ),

    db.query(
      `SELECT self_model
       FROM self_models
       WHERE actor_id = $1
       LIMIT 1`,
      [actorId],
    ),

    db.query(
      `SELECT state
       FROM autonomous_state
       WHERE actor_id = $1
       LIMIT 1`,
      [actorId],
    ),

    db.query(
      `SELECT entry
       FROM reflection_entries
       WHERE actor_id = $1
       ORDER BY created_at DESC
       LIMIT 8`,
      [actorId],
    ),

    db.query(
      `SELECT role, text
       FROM conversation_messages
       WHERE actor_id = $1
       ORDER BY id DESC
       LIMIT 36`,
      [actorId],
    ),

    db.query(
      `SELECT signal
       FROM self_observation_signals
       WHERE actor_id = $1
         AND processed = FALSE
       ORDER BY created_at DESC
       LIMIT 12`,
      [actorId],
    ),
  ]);

  const personas = personaResult.rows.map(row =>
    sanitizePersona(row.persona),
  );

  const conversation: IncomingMessage[] = conversationResult.rows
    .slice()
    .reverse()
    .map(row => ({
      role: row.role === "ai" ? "ai" : "user",
      text: String(row.text),
    }));

  return {
    actorId,
    revision: Number(stateResult.rows[0]?.revision ?? 0),

    state: sanitizeMayState(
      stateResult.rows[0]?.state ?? DEFAULT_MAY_STATE,
    ),

    persona:
      personas[0] ??
      structuredClone(DEFAULT_EVOLVED_PERSONA),

    personaHistory: personas.slice().reverse(),

    memories: sanitizeMemories(
      memoriesResult.rows.map(row => row.node),
    ),

    opinions: sanitizeOpinions(
      opinionsResult.rows.map(row => row.opinion),
    ),

    relationship: sanitizeRelationship(
      relationshipResult.rows[0]?.relationship ??
        DEFAULT_RELATIONSHIP,
    ),

    selfModel: sanitizeSelfModel(
      selfModelResult.rows[0]?.self_model ??
        DEFAULT_SELF_MODEL,
    ),

    autonomous: sanitizeAutonomousState(
      autonomousResult.rows[0]?.state ??
        DEFAULT_AUTONOMOUS_STATE,
    ),

    recentReflections: sanitizeReflectionEntries(
      reflectionsResult.rows.map(row => row.entry),
    ),

    conversation,

    pendingSelfObservations: observationsResult.rows.map(row =>
      sanitizeSelfObservation(row.signal),
    ),

    lastTurnAt: stateResult.rows[0]?.last_turn_at
      ? new Date(
          stateResult.rows[0].last_turn_at,
        ).toISOString()
      : null,
  };
}