import { dbPool } from "@/lib/maymay/database";

export const MAYMAY_ENTITY_ID = "maymay-main";

export type SovereignMindSnapshot = {
  entityId: string;
  entityRevision: number;

  entity: unknown | null;
  identityRoot: unknown | null;
  selfModel: unknown | null;
  persona: unknown | null;

  identityAnchors: unknown[];
  values: unknown[];
  beliefs: unknown[];
  opinions: unknown[];

  autonomousState: unknown | null;
  globalAffect: unknown | null;

  actorId: string | null;
  relationship: unknown | null;
  relationshipAnchors: unknown[];

  episodes: unknown[];
  narratives: unknown[];
  semanticMemories: unknown[];
};

export async function loadSovereignMindSnapshot(
  actorId: string | null,
  entityId = MAYMAY_ENTITY_ID,
): Promise<SovereignMindSnapshot> {
  const db = dbPool();

  const [
    entityResult,
    identityResult,
    selfModelResult,
    personaResult,
    identityAnchorsResult,
    valuesResult,
    beliefsResult,
    opinionsResult,
    autonomousResult,
    affectResult,
  ] = await Promise.all([
    db.query(
      `SELECT *
       FROM sv_entities
       WHERE entity_id = $1
       LIMIT 1`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_identity_roots
       WHERE entity_id = $1
       LIMIT 1`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_self_models
       WHERE entity_id = $1
       LIMIT 1`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_persona_versions
       WHERE entity_id = $1
       ORDER BY version DESC
       LIMIT 1`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_identity_anchors
       WHERE entity_id = $1
         AND status = 'active'
       ORDER BY updated_at DESC
       LIMIT 30`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_may_values
       WHERE entity_id = $1
         AND status = 'active'
       ORDER BY strength DESC, updated_at DESC
       LIMIT 30`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_beliefs
       WHERE entity_id = $1
         AND status = 'active'
       ORDER BY confidence DESC, updated_at DESC
       LIMIT 80`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_opinions
       WHERE entity_id = $1
         AND status = 'active'
       ORDER BY confidence DESC, updated_at DESC
       LIMIT 80`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_autonomous_state
       WHERE entity_id = $1
       LIMIT 1`,
      [entityId],
    ),

    db.query(
      `SELECT *
       FROM sv_global_affective_state
       WHERE entity_id = $1
       LIMIT 1`,
      [entityId],
    ),
  ]);

  let relationship: unknown | null = null;
  let relationshipAnchors: unknown[] = [];
  let episodes: unknown[] = [];
  let narratives: unknown[] = [];
  let semanticMemories: unknown[] = [];

  if (actorId) {
    const [
      relationshipResult,
      relationshipAnchorsResult,
      episodesResult,
      narrativesResult,
      semanticResult,
    ] = await Promise.all([
      db.query(
        `SELECT *
         FROM sv_relationships
         WHERE entity_id = $1
           AND actor_id = $2
         LIMIT 1`,
        [entityId, actorId],
      ),

      db.query(
        `SELECT *
         FROM sv_relationship_anchors
         WHERE entity_id = $1
           AND actor_id = $2
           AND status = 'active'
         ORDER BY confidence DESC, updated_at DESC
         LIMIT 30`,
        [entityId, actorId],
      ),

      db.query(
        `SELECT *
         FROM sv_episodic_memories
         WHERE entity_id = $1
           AND (actor_id = $2 OR actor_id IS NULL)
           AND status = 'active'
         ORDER BY importance DESC, created_at DESC
         LIMIT 80`,
        [entityId, actorId],
      ),

      db.query(
        `SELECT *
         FROM sv_narrative_memories
         WHERE entity_id = $1
           AND (actor_id = $2 OR actor_id IS NULL)
         ORDER BY confidence DESC, updated_at DESC
         LIMIT 40`,
        [entityId, actorId],
      ),

      db.query(
        `SELECT *
         FROM sv_semantic_memories
         WHERE entity_id = $1
           AND (actor_id = $2 OR actor_id IS NULL)
         ORDER BY confidence DESC, learned_at DESC
         LIMIT 80`,
        [entityId, actorId],
      ),
    ]);

    relationship = relationshipResult.rows[0] ?? null;
    relationshipAnchors = relationshipAnchorsResult.rows;
    episodes = episodesResult.rows;
    narratives = narrativesResult.rows;
    semanticMemories = semanticResult.rows;
  }

  return {
    entityId,
    entityRevision: Number(entityResult.rows[0]?.revision ?? 0),

    entity: entityResult.rows[0] ?? null,
    identityRoot: identityResult.rows[0] ?? null,
    selfModel: selfModelResult.rows[0] ?? null,
    persona: personaResult.rows[0] ?? null,

    identityAnchors: identityAnchorsResult.rows,
    values: valuesResult.rows,
    beliefs: beliefsResult.rows,
    opinions: opinionsResult.rows,

    autonomousState: autonomousResult.rows[0] ?? null,
    globalAffect: affectResult.rows[0] ?? null,

    actorId,
    relationship,
    relationshipAnchors,

    episodes,
    narratives,
    semanticMemories,
  };
}