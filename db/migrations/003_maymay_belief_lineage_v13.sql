-- ============================================================
-- MAYMAY SOVEREIGN v13
-- BELIEF LINEAGE / CAUSAL FORMATION
-- ============================================================
--
-- Principle:
--
-- A belief revision must never erase the belief that Mây
-- previously held.
--
-- sv_beliefs remains the canonical belief store.
-- New revisions are appended as new rows.
-- Previous rows become superseded.
--
-- No mock beliefs.
-- No direct external mental setter.
-- No second source of truth.
-- ============================================================

BEGIN;

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS state_key TEXT;

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS status TEXT
  NOT NULL DEFAULT 'active';

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS supersedes_belief_id TEXT;

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS canonical_revision BIGINT
  NOT NULL DEFAULT 0;

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS formation_account JSONB
  NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE sv_beliefs
  ADD COLUMN IF NOT EXISTS superseded_at TIMESTAMPTZ;

-- Existing v13 beliefs predate explicit state_key lineage.
-- Give every legacy row a stable private lineage key.
UPDATE sv_beliefs
SET state_key = 'legacy:' || belief_id
WHERE state_key IS NULL
   OR BTRIM(state_key) = '';

ALTER TABLE sv_beliefs
  ALTER COLUMN state_key SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'sv_beliefs_status_check'
  ) THEN
    ALTER TABLE sv_beliefs
      ADD CONSTRAINT sv_beliefs_status_check
      CHECK (
        status IN (
          'active',
          'superseded',
          'redacted'
        )
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'sv_beliefs_supersedes_fk'
  ) THEN
    ALTER TABLE sv_beliefs
      ADD CONSTRAINT sv_beliefs_supersedes_fk
      FOREIGN KEY (supersedes_belief_id)
      REFERENCES sv_beliefs(belief_id);
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS
  sv_beliefs_one_active_state_idx
ON sv_beliefs(
  entity_id,
  state_key
)
WHERE status = 'active';

CREATE INDEX IF NOT EXISTS
  sv_beliefs_lineage_idx
ON sv_beliefs(
  entity_id,
  state_key,
  canonical_revision DESC
);

CREATE INDEX IF NOT EXISTS
  sv_beliefs_supersedes_idx
ON sv_beliefs(
  supersedes_belief_id
)
WHERE supersedes_belief_id IS NOT NULL;

COMMIT;