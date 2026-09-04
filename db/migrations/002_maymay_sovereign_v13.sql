-- MayMay Sovereign v13
-- PHASE B: parallel schema, does NOT modify v12 tables

CREATE TABLE IF NOT EXISTS sv_entities (
  entity_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nature TEXT NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_actors (
  actor_id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_identity_roots (
  entity_id TEXT PRIMARY KEY REFERENCES sv_entities(entity_id),
  continuity_id TEXT NOT NULL UNIQUE,
  identity JSONB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_self_models (
  entity_id TEXT PRIMARY KEY REFERENCES sv_entities(entity_id),
  self_model JSONB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_identity_versions (
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  version INTEGER NOT NULL,
  snapshot JSONB NOT NULL,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  reason_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (entity_id, version)
);

CREATE TABLE IF NOT EXISTS sv_relationships (
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT NOT NULL REFERENCES sv_actors(actor_id),
  relationship JSONB NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (entity_id, actor_id)
);

CREATE TABLE IF NOT EXISTS sv_relationship_anchors (
  anchor_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT NOT NULL REFERENCES sv_actors(actor_id),
  subject TEXT NOT NULL,
  meaning TEXT NOT NULL,
  facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sv_relationship_anchors_actor_idx
ON sv_relationship_anchors(entity_id, actor_id, status);


CREATE TABLE IF NOT EXISTS sv_identity_anchors (
  anchor_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  category TEXT NOT NULL,
  statement TEXT NOT NULL,
  interpretation TEXT,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_episodic_memories (
  memory_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event TEXT NOT NULL,
  interpretation TEXT,
  emotional_fingerprint JSONB NOT NULL DEFAULT '{}'::jsonb,
  importance DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  novelty DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  unresolved BOOLEAN NOT NULL DEFAULT FALSE,
  relationship_critical BOOLEAN NOT NULL DEFAULT FALSE,
  happened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_recalled_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS sv_narrative_memories (
  narrative_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  meaning_for_self TEXT,
  source_episode_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  themes JSONB NOT NULL DEFAULT '[]'::jsonb,
  belief_effects JSONB NOT NULL DEFAULT '[]'::jsonb,
  relationship_effects JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  version INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_semantic_memories (
  memory_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  concept TEXT NOT NULL,
  knowledge TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  source_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'known',
  learned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_verified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sv_memory_provenance (
  provenance_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  memory_type TEXT NOT NULL,
  memory_id TEXT NOT NULL,
  origin TEXT NOT NULL,
  source_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_memory_edges (
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  relation TEXT NOT NULL,
  strength DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (
    entity_id,
    source_type,
    source_id,
    target_type,
    target_id,
    relation
  )
);

CREATE INDEX IF NOT EXISTS sv_episode_actor_idx
ON sv_episodic_memories(entity_id, actor_id, status);

CREATE INDEX IF NOT EXISTS sv_narrative_actor_idx
ON sv_narrative_memories(entity_id, actor_id);

CREATE INDEX IF NOT EXISTS sv_semantic_concept_idx
ON sv_semantic_memories(entity_id, concept);


CREATE TABLE IF NOT EXISTS sv_beliefs (
  belief_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  proposition TEXT NOT NULL,
  domain TEXT NOT NULL,
  stance TEXT NOT NULL DEFAULT 'uncertain',
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  flexibility DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  contradiction_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  origin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_global_affective_state (
  entity_id TEXT PRIMARY KEY REFERENCES sv_entities(entity_id),
  landscape JSONB NOT NULL DEFAULT '{}'::jsonb,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_actor_emotion_contexts (
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT NOT NULL REFERENCES sv_actors(actor_id),
  landscape JSONB NOT NULL DEFAULT '{}'::jsonb,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (entity_id, actor_id)
);

CREATE TABLE IF NOT EXISTS sv_emotional_appraisals (
  appraisal_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event_id TEXT,
  appraisal JSONB NOT NULL,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_active_emotions (
  emotion_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  kind TEXT NOT NULL,
  intensity DOUBLE PRECISION NOT NULL DEFAULT 0,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  target TEXT,
  cause_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  appraisal_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  persistence TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_emotional_residues (
  residue_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  target_type TEXT NOT NULL,
  target_id TEXT,
  kind TEXT NOT NULL,
  intensity DOUBLE PRECISION NOT NULL DEFAULT 0,
  unresolved BOOLEAN NOT NULL DEFAULT TRUE,
  source_event_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  decay_profile TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sv_beliefs_entity_domain_idx
ON sv_beliefs(entity_id, domain);

CREATE INDEX IF NOT EXISTS sv_active_emotions_actor_idx
ON sv_active_emotions(entity_id, actor_id, status);


CREATE TABLE IF NOT EXISTS sv_experience_events (
  event_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  turn_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  committed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sv_self_observations (
  observation_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event_id TEXT REFERENCES sv_experience_events(event_id),
  observation JSONB NOT NULL,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_agency_decisions (
  decision_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event_id TEXT REFERENCES sv_experience_events(event_id),
  action TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  regulation_intent TEXT,
  reason_summary TEXT,
  rejected_alternatives JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_behavior_plans (
  plan_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event_id TEXT REFERENCES sv_experience_events(event_id),
  decision_id TEXT NOT NULL REFERENCES sv_agency_decisions(decision_id),
  plan JSONB NOT NULL,
  plan_hash TEXT NOT NULL,
  locked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_turn_workspaces (
  turn_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  event_id TEXT NOT NULL REFERENCES sv_experience_events(event_id),
  snapshot_revision BIGINT NOT NULL,
  workspace JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_cognitive_jobs (
  job_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  job_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'queued',
  priority INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sv_runtime_audits (
  audit_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  turn_id TEXT,
  event_id TEXT,
  audit JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sv_events_actor_idx
ON sv_experience_events(entity_id, actor_id, received_at DESC);

CREATE INDEX IF NOT EXISTS sv_jobs_status_idx
ON sv_cognitive_jobs(entity_id, status, priority DESC, created_at ASC);


CREATE TABLE IF NOT EXISTS sv_may_values (
  value_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  statement TEXT NOT NULL,
  strength DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  flexibility DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_opinions (
  opinion_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  topic TEXT NOT NULL,
  stance TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  flexibility DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  reasoning_summary TEXT,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_autonomous_state (
  entity_id TEXT PRIMARY KEY REFERENCES sv_entities(entity_id),
  state JSONB NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_working_memory (
  item_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  kind TEXT NOT NULL,
  content TEXT NOT NULL,
  salience DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  source_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_expectations (
  expectation_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  prediction TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_boundary_holds (
  boundary_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),
  topic TEXT,
  reason_category TEXT NOT NULL,
  strength DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_state_snapshots (
  snapshot_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  entity_revision BIGINT NOT NULL,
  snapshot JSONB NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_maintenance_events (
  maintenance_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  operation TEXT NOT NULL,
  reason TEXT NOT NULL,
  before_hash TEXT,
  after_hash TEXT,
  affected_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_migration_runs (
  migration_id TEXT PRIMARY KEY,
  source_version TEXT NOT NULL,
  target_version TEXT NOT NULL,
  status TEXT NOT NULL,
  audit JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS sv_working_memory_actor_idx
ON sv_working_memory(entity_id, actor_id, status);

CREATE INDEX IF NOT EXISTS sv_expectations_actor_idx
ON sv_expectations(entity_id, actor_id, status);


CREATE TABLE IF NOT EXISTS sv_persona_versions (
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  version INTEGER NOT NULL,
  persona JSONB NOT NULL,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  reason_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (entity_id, version)
);

CREATE TABLE IF NOT EXISTS sv_identity_proposals (
  proposal_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  proposal_type TEXT NOT NULL,
  field_path TEXT NOT NULL,
  current_value JSONB,
  proposed_value JSONB,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5,
  temporal_span JSONB,
  contradiction_level DOUBLE PRECISION NOT NULL DEFAULT 0,
  gate_decision TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sv_identity_evolution_events (
  evolution_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  proposal_id TEXT REFERENCES sv_identity_proposals(proposal_id),
  version_before INTEGER NOT NULL,
  version_after INTEGER NOT NULL,
  change_summary JSONB NOT NULL,
  evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sv_schema_versions (
  version TEXT PRIMARY KEY,
  description TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS sv_memory_embeddings (
  embedding_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES sv_entities(entity_id),
  actor_id TEXT REFERENCES sv_actors(actor_id),

  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,

  embedding VECTOR NOT NULL,
  embedding_model TEXT NOT NULL,
  dimensions INTEGER NOT NULL,

  content_hash TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (
    entity_id,
    source_type,
    source_id,
    embedding_model
  )
);

CREATE INDEX IF NOT EXISTS sv_memory_embeddings_source_idx
ON sv_memory_embeddings(entity_id, source_type, source_id);

