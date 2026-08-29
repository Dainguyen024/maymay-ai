CREATE TABLE IF NOT EXISTS may_state (
  actor_id TEXT PRIMARY KEY,
  state JSONB NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  last_turn_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS persona_versions (
  actor_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  persona JSONB NOT NULL,
  audit JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (actor_id, version)
);
CREATE TABLE IF NOT EXISTS memory_nodes (
  actor_id TEXT NOT NULL,
  memory_id TEXT NOT NULL,
  node JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (actor_id, memory_id)
);
CREATE TABLE IF NOT EXISTS memory_edges (
  actor_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  relation TEXT NOT NULL,
  strength DOUBLE PRECISION NOT NULL,
  PRIMARY KEY (actor_id, source_id, target_id, relation)
);
CREATE TABLE IF NOT EXISTS memory_events (
  event_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  memory_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  turn INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS opinions (
  actor_id TEXT NOT NULL,
  opinion_id TEXT NOT NULL,
  canonical_key TEXT NOT NULL,
  opinion JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (actor_id, opinion_id)
);
CREATE INDEX IF NOT EXISTS opinions_actor_key_idx ON opinions(actor_id, canonical_key);
CREATE TABLE IF NOT EXISTS relationship_state (
  actor_id TEXT PRIMARY KEY,
  relationship JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS self_models (
  actor_id TEXT PRIMARY KEY,
  self_model JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS autonomous_state (
  actor_id TEXT PRIMARY KEY,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS reflection_entries (
  reflection_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  entry JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS self_observation_signals (
  signal_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  signal JSONB NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS evolution_runs (
  run_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  persona_version_before INTEGER NOT NULL,
  persona_version_after INTEGER NOT NULL,
  proposal JSONB NOT NULL,
  audit JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS heartbeat_runs (
  run_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  pressure JSONB NOT NULL,
  result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS proactive_messages (
  message_id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  message TEXT NOT NULL,
  reason TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS proactive_actor_status_idx ON proactive_messages(actor_id, status, created_at);
CREATE TABLE IF NOT EXISTS conversation_messages (
  id BIGSERIAL PRIMARY KEY,
  actor_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user','ai')),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS conversation_actor_created_idx ON conversation_messages(actor_id, created_at DESC);
