import {
  createHash,
} from "node:crypto";

import type {
  PoolClient,
} from "pg";

import type {
  AtomicMindCommit,
} from "@/lib/maymay/sovereign/atomic-commit";

import type {
  CanonicalMutationResult,
  CanonicalMutationWriter,
} from "@/lib/maymay/sovereign/atomic-executor";

import {
  assertSovereignCommit,
} from "@/lib/maymay/sovereign/sovereignty-policy";

import {
  MAYMAY_ENTITY_ID,
} from "@/lib/maymay/sovereign/repository";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * CANONICAL MIND WRITER V6
 * CONTINUITY EDITION
 * ============================================================
 *
 * CORE PRINCIPLE
 *
 * Mây(t + 1)
 * is the continuation of
 * Mây(t)
 *
 * NOT a new chatbot instance.
 *
 * ------------------------------------------------------------
 *
 * THIS WRITER:
 *
 * - persists validated cognitive artifacts
 * - preserves emotional lineage
 * - preserves causal provenance
 * - persists explicit emotional residues
 * - preserves one global Mây
 * - preserves actor isolation
 * - builds a recovery checkpoint
 *
 * THIS WRITER NEVER:
 *
 * - calls an LLM
 * - re-appraises
 * - recalculates Resonance
 * - chooses Agency action
 * - changes BehaviorPlan
 * - invents memories
 * - invents beliefs
 * - invents relationship changes
 * - rewrites identity
 * - opens its own transaction
 * - COMMITs / ROLLBACKs
 * - advances sv_entities.revision
 *
 * Atomic Executor owns transaction + revision.
 *
 * ============================================================
 */

export const CANONICAL_WRITER_VERSION =
  "maymay.sovereign.canonical-writer.v6" as const;

const CHECKPOINT_SCHEMA =
  "maymay.sovereign.canonical-checkpoint.v6" as const;

const AUDIT_SCHEMA =
  "maymay.sovereign.canonical-mutation-audit.v6" as const;

/* ============================================================
 * GENERIC SAFE HELPERS
 * ============================================================
 */

function record(
  value: unknown,
): Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  )
    ? value as Record<string, unknown>
    : {};
}

function safeText(
  value: unknown,
  max = 1000,
): string | null {
  if (
    typeof value !== "string"
  ) {
    return null;
  }

  const text =
    value
      .normalize("NFC")
      .trim();

  if (!text) {
    return null;
  }

  return text.slice(
    0,
    max,
  );
}

function clamp01(
  value: unknown,
  fallback = 0,
): number {
  const number =
    Number(value);

  if (
    !Number.isFinite(
      number,
    )
  ) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(
      1,
      number,
    ),
  );
}

function uniqueStrings(
  value: unknown,
  maxItems = 64,
  maxLength = 200,
): string[] {
  if (
    !Array.isArray(value)
  ) {
    return [];
  }

  const output:
    string[] = [];

  const seen =
    new Set<string>();

  for (
    const raw of value
  ) {
    const text =
      safeText(
        raw,
        maxLength,
      );

    if (
      !text ||
      seen.has(text)
    ) {
      continue;
    }

    seen.add(text);

    output.push(text);

    if (
      output.length >=
      maxItems
    ) {
      break;
    }
  }

  return output;
}

function mergeStrings(
  ...values: unknown[]
): string[] {
  const output =
    new Set<string>();

  for (
    const value of values
  ) {
    for (
      const item of
      uniqueStrings(
        value,
      )
    ) {
      output.add(item);
    }
  }

  return [
    ...output,
  ].slice(
    0,
    64,
  );
}

/* ============================================================
 * STABLE SERIALIZATION
 * ============================================================
 */

function stableSerialize(
  value: unknown,
): string {
  if (
    value === null
  ) {
    return "null";
  }

  switch (
    typeof value
  ) {
    case "string":
    case "boolean":
      return JSON.stringify(
        value,
      );

    case "number":
      return Number.isFinite(
        value,
      )
        ? JSON.stringify(value)
        : JSON.stringify(
            String(value),
          );

    case "bigint":
      return JSON.stringify(
        `${value.toString()}n`,
      );

    case "undefined":
      return '"__undefined__"';

    case "function":
      return '"__function__"';

    case "symbol":
      return JSON.stringify(
        String(value),
      );
  }

  if (
    value instanceof Date
  ) {
    return JSON.stringify(
      value.toISOString(),
    );
  }

  if (
    Array.isArray(value)
  ) {
    return `[${value
      .map(stableSerialize)
      .join(",")}]`;
  }

  const source =
    value as Record<
      string,
      unknown
    >;

  return `{${Object
    .keys(source)
    .sort()
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          source[key],
        )}`,
    )
    .join(",")}}`;
}

function sha256(
  value: unknown,
): string {
  return createHash(
    "sha256",
  )
    .update(
      stableSerialize(
        value,
      ),
    )
    .digest("hex");
}

function stableId(
  prefix: string,
  ...parts: string[]
): string {
  return `${prefix}:${sha256(
    parts.join(
      "\u001f",
    ),
  ).slice(
    0,
    32,
  )}`;
}

/* ============================================================
 * HARD TURN INVARIANTS
 * ============================================================
 */

function assertCanonicalTurn(
  commit:
    AtomicMindCommit,
): void {
  if (
    commit.entityId !==
      MAYMAY_ENTITY_ID
  ) {
    throw new Error(
      `CANONICAL_WRITER_WRONG_ENTITY:${commit.entityId}`,
    );
  }

  if (
    commit.targetRevision !==
      commit.expectedRevision +
        1
  ) {
    throw new Error(
      "CANONICAL_WRITER_REVISION_LINEAGE_INVALID",
    );
  }

  if (
    commit.workspace
      .validatedStage !==
      "validated"
  ) {
    throw new Error(
      "CANONICAL_WRITER_WORKSPACE_NOT_VALIDATED",
    );
  }

  if (
    !commit.turnId ||
    !commit.eventId ||
    !commit.actorId
  ) {
    throw new Error(
      "CANONICAL_WRITER_TURN_IDENTITY_INVALID",
    );
  }
}

/* ============================================================
 * DECISION LINEAGE
 * ============================================================
 */

function decisionAction(
  commit:
    AtomicMindCommit,
): string {
  const agency =
    record(
      commit.decision
        .agencyDecision,
    );

  const behavior =
    record(
      commit.decision
        .behaviorPlan,
    );

  const expression =
    record(
      commit.decision
        .expression,
    );

  const agencyAction =
    safeText(
      agency.selectedAction ??
        agency.action,
      80,
    );

  const planAction =
    safeText(
      behavior.action,
      80,
    );

  const expressionAction =
    safeText(
      expression.action,
      80,
    );

  if (
    !agencyAction ||
    !planAction ||
    !expressionAction ||
    agencyAction !==
      planAction ||
    agencyAction !==
      expressionAction
  ) {
    throw new Error(
      "CANONICAL_WRITER_DECISION_LINEAGE_MISMATCH",
    );
  }

  return agencyAction;
}

/* ============================================================
 * APPRAISAL PROJECTION
 * ============================================================
 */

type AppraisalProjection = {
  appraisal:
    Record<string, unknown>;

  evidenceIds:
    string[];

  confidence:
    number;
};

function projectAppraisal(
  commit:
    AtomicMindCommit,
): AppraisalProjection {
  const envelope =
    record(
      commit.decision
        .appraisal,
    );

  const nested =
    record(
      envelope.appraisal,
    );

  const appraisal =
    Object.keys(
      nested,
    ).length > 0
      ? nested
      : envelope;

  const evidence =
    new Set<string>();

  const confidenceSamples:
    number[] = [];

  const interpretations =
    Array.isArray(
      appraisal.interpretations,
    )
      ? appraisal.interpretations
      : [];

  for (
    const raw of
    interpretations
  ) {
    const item =
      record(raw);

    for (
      const id of
      uniqueStrings(
        item.evidenceIds,
      )
    ) {
      evidence.add(id);
    }

    const confidence =
      Number(
        item.confidence,
      );

    if (
      Number.isFinite(
        confidence,
      )
    ) {
      confidenceSamples.push(
        clamp01(
          confidence,
          0.5,
        ),
      );
    }
  }

  const activated =
    record(
      appraisal
        .activatedContext,
    );

  const contextKeys = [
    "memoryIds",
    "beliefIds",
    "valueIds",
    "opinionIds",
    "identityAnchorIds",
    "relationshipAnchorIds",
  ];

  for (
    const key of
    contextKeys
  ) {
    for (
      const id of
      uniqueStrings(
        activated[key],
      )
    ) {
      evidence.add(id);
    }
  }

  const explicit =
    Number(
      appraisal.confidence,
    );

  let confidence =
    0.5;

  if (
    Number.isFinite(
      explicit,
    )
  ) {
    confidence =
      clamp01(
        explicit,
        0.5,
      );
  } else if (
    confidenceSamples.length
  ) {
    confidence =
      clamp01(
        confidenceSamples
          .reduce(
            (
              total,
              item,
            ) =>
              total +
              item,
            0,
          ) /
          confidenceSamples.length,

        0.5,
      );
  }

  return {
    appraisal,

    evidenceIds: [
      ...evidence,
    ],

    confidence,
  };
}

/* ============================================================
 * RESONANCE PROJECTION
 * ============================================================
 */

function resonanceRecord(
  commit:
    AtomicMindCommit,
): Record<string, unknown> {
  return record(
    commit.decision
      .resonance,
  );
}

function projectLandscape(
  commit:
    AtomicMindCommit,
): Record<string, unknown> {
  const resonance =
    resonanceRecord(
      commit,
    );

  const landscape =
    record(
      resonance.landscape,
    );

  if (
    Object.keys(
      landscape,
    ).length
  ) {
    return landscape;
  }

  const alternate =
    record(
      resonance
        .emotionLandscape,
    );

  if (
    Object.keys(
      alternate,
    ).length
  ) {
    return alternate;
  }

  return resonance;
}

/* ============================================================
 * ACTIVE EMOTION MODEL
 * ============================================================
 */

type ExistingEmotion = {
  emotionId:
    string;

  kind:
    string;

  intensity:
    number;

  confidence:
    number;

  target:
    string | null;

  causeIds:
    string[];

  appraisalIds:
    string[];

  persistence:
    string;
};

type ProjectedEmotion = {
  kind:
    string;

  intensity:
    number;

  confidence:
    number;

  target:
    string | null;

  causeIds:
    string[];

  appraisalIds:
    string[];

  persistence:
    string;
};

function normalizeEmotionKey(
  kind: string,
  target:
    string | null,
): string {
  return `${kind
    .normalize("NFC")
    .trim()
    .toLocaleLowerCase(
      "en-US",
    )}::${(
      target ??
      "__none__"
    )
      .normalize("NFC")
      .trim()
      .toLocaleLowerCase(
        "en-US",
      )}`;
}

function persistenceFrom(
  emotion:
    Record<string, unknown>,
): string {
  const explicit =
    safeText(
      emotion.persistence,
      40,
    );

  if (
    explicit &&
    [
      "short",
      "medium",
      "long",
    ].includes(
      explicit,
    )
  ) {
    return explicit;
  }

  const momentum =
    clamp01(
      emotion.momentum,
      0.5,
    );

  if (
    momentum >=
      0.72
  ) {
    return "long";
  }

  if (
    momentum <=
      0.28
  ) {
    return "short";
  }

  return "medium";
}

function projectActiveEmotions(
  commit:
    AtomicMindCommit,

  appraisalId:
    string,

  appraisalConfidence:
    number,
): ProjectedEmotion[] {
  const landscape =
    projectLandscape(
      commit,
    );

  const raw =
    landscape
      .activeEmotions;

  if (
    !Array.isArray(raw)
  ) {
    return [];
  }

  const output:
    ProjectedEmotion[] = [];

  for (
    const value of
    raw.slice(
      0,
      32,
    )
  ) {
    const emotion =
      record(value);

    const kind =
      safeText(
        emotion.kind,
        80,
      );

    if (!kind) {
      continue;
    }

    output.push({
      kind,

      intensity:
        clamp01(
          emotion.intensity,
        ),

      confidence:
        clamp01(
          emotion.confidence,
          appraisalConfidence,
        ),

      target:
        safeText(
          emotion.target,
          240,
        ),

      causeIds:
        uniqueStrings(
          emotion.causeIds,
        ),

      appraisalIds:
        mergeStrings(
          [
            appraisalId,
          ],
          emotion.appraisalIds,
        ),

      persistence:
        persistenceFrom(
          emotion,
        ),
    });
  }

  return output;
}

/* ============================================================
 * LOAD CURRENT ACTIVE EMOTIONS
 * ============================================================
 */

async function loadExistingActiveEmotions(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,
): Promise<
  ExistingEmotion[]
> {
  const result =
    await client.query(
      `
      SELECT
        emotion_id,
        kind,
        intensity,
        confidence,
        target,
        cause_ids,
        appraisal_ids,
        persistence

      FROM
        sv_active_emotions

      WHERE
        entity_id = $1

        AND actor_id = $2

        AND status =
          'active'

      ORDER BY
        created_at ASC,
        emotion_id ASC

      FOR UPDATE
      `,
      [
        commit.entityId,
        commit.actorId,
      ],
    );

  return result.rows.map(
    row => ({
      emotionId:
        String(
          row.emotion_id,
        ),

      kind:
        String(
          row.kind,
        ),

      intensity:
        clamp01(
          row.intensity,
        ),

      confidence:
        clamp01(
          row.confidence,
          0.5,
        ),

      target:
        safeText(
          row.target,
          240,
        ),

      causeIds:
        uniqueStrings(
          row.cause_ids,
        ),

      appraisalIds:
        uniqueStrings(
          row.appraisal_ids,
        ),

      persistence:
        safeText(
          row.persistence,
          40,
        ) ??
        "medium",
    }),
  );
}

/* ============================================================
 * ACTIVE EMOTION LINEAGE
 * ============================================================
 *
 * This is the key continuity improvement.
 *
 * Same active emotion thread:
 *
 * previous emotion row
 *      ↓
 * UPDATE same emotion_id
 *
 * NOT:
 *
 * DELETE old
 * INSERT fake-new emotion every message
 *
 * If the thread disappears from Resonance:
 *
 * status = superseded
 *
 * History remains intact.
 *
 * ============================================================
 */

type EmotionPersistenceAudit = {
  activeEmotionIds:
    string[];

  continuedEmotionIds:
    string[];

  createdEmotionIds:
    string[];

  supersededEmotionIds:
    string[];
};

async function persistEmotionContinuity(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  incoming:
    ProjectedEmotion[],
): Promise<
  EmotionPersistenceAudit
> {
  const previous =
    await loadExistingActiveEmotions(
      client,
      commit,
    );

  const previousByKey =
    new Map<
      string,
      ExistingEmotion
    >();

  for (
    const emotion of
    previous
  ) {
    previousByKey.set(
      normalizeEmotionKey(
        emotion.kind,
        emotion.target,
      ),
      emotion,
    );
  }

  const consumedPreviousIds =
    new Set<string>();

  const activeEmotionIds:
    string[] = [];

  const continuedEmotionIds:
    string[] = [];

  const createdEmotionIds:
    string[] = [];

  for (
    let index = 0;
    index <
      incoming.length;
    index += 1
  ) {
    const emotion =
      incoming[index];

    const key =
      normalizeEmotionKey(
        emotion.kind,
        emotion.target,
      );

    const existing =
      previousByKey.get(
        key,
      );

    if (existing) {
      consumedPreviousIds.add(
        existing.emotionId,
      );

      activeEmotionIds.push(
        existing.emotionId,
      );

      continuedEmotionIds.push(
        existing.emotionId,
      );

      /*
       * IMPORTANT:
       *
       * intensity comes from Resonance.
       *
       * Writer does NOT recalculate it.
       *
       * Only causal provenance is merged.
       */

      await client.query(
        `
        UPDATE sv_active_emotions

        SET
          intensity =
            $2,

          confidence =
            $3,

          target =
            $4,

          cause_ids =
            $5,

          appraisal_ids =
            $6,

          persistence =
            $7,

          status =
            'active',

          updated_at =
            NOW()

        WHERE
          emotion_id =
            $1
        `,
        [
          existing.emotionId,

          emotion.intensity,

          emotion.confidence,

          emotion.target,

          mergeStrings(
            existing.causeIds,
            emotion.causeIds,
          ),

          mergeStrings(
            existing.appraisalIds,
            emotion.appraisalIds,
          ),

          emotion.persistence,
        ],
      );

      continue;
    }

    /*
     * New emotional episode.
     *
     * turnId enters ID only at creation time.
     *
     * Future turns reuse this row while the
     * emotion remains active.
     */

    const emotionId =
      stableId(
        "emotion",
        commit.entityId,
        commit.actorId,
        commit.turnId,
        String(index),
        emotion.kind,
        emotion.target ??
          "__none__",
      );

    activeEmotionIds.push(
      emotionId,
    );

    createdEmotionIds.push(
      emotionId,
    );

    await client.query(
      `
      INSERT INTO sv_active_emotions(
        emotion_id,
        entity_id,
        actor_id,
        kind,
        intensity,
        confidence,
        target,
        cause_ids,
        appraisal_ids,
        persistence,
        status
      )

      VALUES(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        'active'
      )
      `,
      [
        emotionId,

        commit.entityId,

        commit.actorId,

        emotion.kind,

        emotion.intensity,

        emotion.confidence,

        emotion.target,

        emotion.causeIds,

        emotion.appraisalIds,

        emotion.persistence,
      ],
    );
  }

  const supersededEmotionIds =
    previous
      .filter(
        emotion =>
          !consumedPreviousIds
            .has(
              emotion.emotionId,
            ),
      )
      .map(
        emotion =>
          emotion.emotionId,
      );

  if (
    supersededEmotionIds
      .length
  ) {
    await client.query(
      `
      UPDATE sv_active_emotions

      SET
        status =
          'superseded',

        updated_at =
          NOW()

      WHERE
        entity_id =
          $1

        AND actor_id =
          $2

        AND emotion_id =
          ANY($3::text[])

        AND status =
          'active'
      `,
      [
        commit.entityId,
        commit.actorId,
        supersededEmotionIds,
      ],
    );
  }

  return {
    activeEmotionIds,

    continuedEmotionIds,

    createdEmotionIds,

    supersededEmotionIds,
  };
}

/* ============================================================
 * EXPLICIT EMOTIONAL RESIDUES
 * ============================================================
 *
 * Critical rule:
 *
 * Writer DOES NOT create residues merely because
 * "that would feel human".
 *
 * Residue must already exist as a validated
 * Resonance artifact.
 *
 * This prevents:
 *
 * hard-coded resentment
 * hard-coded attachment
 * fake emotional persistence
 *
 * ============================================================
 */

type ProjectedResidue = {
  residueId:
    string;

  targetType:
    string;

  targetId:
    string | null;

  kind:
    string;

  intensity:
    number;

  unresolved:
    boolean;

  sourceEventIds:
    string[];

  decayProfile:
    string;
};

function residueArrayFrom(
  commit:
    AtomicMindCommit,
): unknown[] {
  const resonance =
    resonanceRecord(
      commit,
    );

  const landscape =
    projectLandscape(
      commit,
    );

  const candidates = [
    resonance.residues,
    resonance.emotionalResidues,
    landscape.residues,
    landscape.emotionalResidues,
  ];

  for (
    const candidate of
    candidates
  ) {
    if (
      Array.isArray(
        candidate,
      )
    ) {
      return candidate;
    }
  }

  return [];
}

function projectResidues(
  commit:
    AtomicMindCommit,
): ProjectedResidue[] {
  const rawResidues =
    residueArrayFrom(
      commit,
    );

  const result:
    ProjectedResidue[] = [];

  for (
    let index = 0;
    index <
      Math.min(
        rawResidues.length,
        32,
      );
    index += 1
  ) {
    const raw =
      record(
        rawResidues[index],
      );

    const kind =
      safeText(
        raw.kind,
        80,
      );

    if (!kind) {
      continue;
    }

    const targetType =
      safeText(
        raw.targetType ??
          raw.target_type,
        80,
      ) ??
      "unspecified";

    const targetId =
      safeText(
        raw.targetId ??
          raw.target_id,
        240,
      );

    const decayProfile =
      safeText(
        raw.decayProfile ??
          raw.decay_profile,
        80,
      ) ??
      "normal";

    const sourceEventIds =
      mergeStrings(
        [
          commit.eventId,
        ],
        raw.sourceEventIds ??
          raw.source_event_ids,
      );

    /*
     * Deterministic residue identity.
     *
     * A residue is a continuing unresolved trace,
     * not a brand new row every message.
     */

    const residueId =
      stableId(
        "residue",
        commit.entityId,
        commit.actorId,
        targetType,
        targetId ??
          "__none__",
        kind,
      );

    result.push({
      residueId,

      targetType,

      targetId,

      kind,

      intensity:
        clamp01(
          raw.intensity,
        ),

      unresolved:
        raw.unresolved !==
          false,

      sourceEventIds,

      decayProfile,
    });
  }

  return result;
}

/* ============================================================
 * RESIDUE PROVENANCE MERGE
 * ============================================================
 */

async function persistResidues(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  residues:
    ProjectedResidue[],
): Promise<string[]> {
  const ids:
    string[] = [];

  for (
    const residue of
    residues
  ) {
    const existing =
      await client.query(
        `
        SELECT
          source_event_ids

        FROM
          sv_emotional_residues

        WHERE
          residue_id = $1

        FOR UPDATE
        `,
        [
          residue.residueId,
        ],
      );

    const previousSourceIds =
      existing.rows.length
        ? uniqueStrings(
            existing.rows[0]
              .source_event_ids,
          )
        : [];

    const sourceEventIds =
      mergeStrings(
        previousSourceIds,
        residue.sourceEventIds,
      );

    await client.query(
      `
      INSERT INTO sv_emotional_residues(
        residue_id,
        entity_id,
        actor_id,
        target_type,
        target_id,
        kind,
        intensity,
        unresolved,
        source_event_ids,
        decay_profile
      )

      VALUES(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10
      )

      ON CONFLICT(residue_id)

      DO UPDATE SET
        intensity =
          EXCLUDED.intensity,

        unresolved =
          EXCLUDED.unresolved,

        source_event_ids =
          EXCLUDED.source_event_ids,

        decay_profile =
          EXCLUDED.decay_profile,

        updated_at =
          NOW()
      `,
      [
        residue.residueId,

        commit.entityId,

        commit.actorId,

        residue.targetType,

        residue.targetId,

        residue.kind,

        residue.intensity,

        residue.unresolved,

        sourceEventIds,

        residue.decayProfile,
      ],
    );

    ids.push(
      residue.residueId,
    );
  }

  return ids;
}

/* ============================================================
 * PERSIST APPRAISAL
 * ============================================================
 */

async function persistAppraisal(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,
): Promise<{
  appraisalId:
    string;

  evidenceIds:
    string[];

  confidence:
    number;
}> {
  const projection =
    projectAppraisal(
      commit,
    );

  const appraisalId =
    stableId(
      "appraisal",
      commit.entityId,
      commit.actorId,
      commit.eventId,
      commit.turnId,
    );

  await client.query(
    `
    INSERT INTO sv_emotional_appraisals(
      appraisal_id,
      entity_id,
      actor_id,
      event_id,
      appraisal,
      evidence_ids,
      confidence
    )

    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    `,
    [
      appraisalId,

      commit.entityId,

      commit.actorId,

      commit.eventId,

      projection.appraisal,

      projection.evidenceIds,

      projection.confidence,
    ],
  );

  return {
    appraisalId,

    evidenceIds:
      projection
        .evidenceIds,

    confidence:
      projection
        .confidence,
  };
}

/* ============================================================
 * PERSIST AFFECTIVE LANDSCAPE
 * ============================================================
 */

async function persistAffectiveLandscape(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  landscape:
    Record<string, unknown>,
): Promise<void> {
  /*
   * GLOBAL AFFECT:
   *
   * belongs to one Mây.
   */

  await client.query(
    `
    INSERT INTO sv_global_affective_state(
      entity_id,
      landscape,
      revision
    )

    VALUES(
      $1,
      $2,
      1
    )

    ON CONFLICT(entity_id)

    DO UPDATE SET
      landscape =
        EXCLUDED.landscape,

      revision =
        sv_global_affective_state.revision + 1,

      updated_at =
        NOW()
    `,
    [
      commit.entityId,
      landscape,
    ],
  );

  /*
   * ACTOR AFFECT:
   *
   * Mây's emotional context concerning
   * this relationship.
   *
   * It is NOT another Mây.
   */

  await client.query(
    `
    INSERT INTO sv_actor_emotion_contexts(
      entity_id,
      actor_id,
      landscape,
      revision
    )

    VALUES(
      $1,
      $2,
      $3,
      1
    )

    ON CONFLICT(
      entity_id,
      actor_id
    )

    DO UPDATE SET
      landscape =
        EXCLUDED.landscape,

      revision =
        sv_actor_emotion_contexts.revision + 1,

      updated_at =
        NOW()
    `,
    [
      commit.entityId,

      commit.actorId,

      landscape,
    ],
  );
}

/* ============================================================
 * STRUCTURED METACOGNITION
 * ============================================================
 *
 * Not free-form Chain-of-Thought.
 *
 * Only sanitized structured metacognition
 * is persisted.
 *
 * ============================================================
 */

async function persistMetacognition(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  evidenceIds:
    string[],
): Promise<string> {
  const observationId =
    stableId(
      "selfobs",
      commit.entityId,
      commit.actorId,
      commit.eventId,
      commit.turnId,
    );

  await client.query(
    `
    INSERT INTO sv_self_observations(
      observation_id,
      entity_id,
      actor_id,
      event_id,
      observation,
      evidence_ids
    )

    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    `,
    [
      observationId,

      commit.entityId,

      commit.actorId,

      commit.eventId,

      commit.decision
        .metacognition,

      evidenceIds,
    ],
  );

  return observationId;
}

/* ============================================================
 * AGENCY
 * ============================================================
 */

async function persistAgency(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  action:
    string,
): Promise<string> {
  const agency =
    record(
      commit.decision
        .agencyDecision,
    );

  const decisionId =
    stableId(
      "decision",
      commit.entityId,
      commit.actorId,
      commit.eventId,
      commit.turnId,
    );

  await client.query(
    `
    INSERT INTO sv_agency_decisions(
      decision_id,
      entity_id,
      actor_id,
      event_id,
      action,
      confidence,
      regulation_intent,
      reason_summary,
      rejected_alternatives
    )

    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9
    )
    `,
    [
      decisionId,

      commit.entityId,

      commit.actorId,

      commit.eventId,

      action,

      clamp01(
        agency.confidence,
        0.5,
      ),

      safeText(
        agency.regulationIntent,
        200,
      ),

      safeText(
        agency.reasonSummary,
        1200,
      ),

      Array.isArray(
        agency
          .rejectedAlternatives,
      )
        ? agency
            .rejectedAlternatives
            .slice(
              0,
              16,
            )
        : [],
    ],
  );

  return decisionId;
}

/* ============================================================
 * LOCKED BEHAVIOR PLAN
 * ============================================================
 */

async function persistBehaviorPlan(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  decisionId:
    string,
): Promise<{
  planId:
    string;

  planHash:
    string;
}> {
  const plan =
    record(
      commit.decision
        .behaviorPlan,
    );

  const planId =
    stableId(
      "plan",
      commit.entityId,
      commit.actorId,
      commit.eventId,
      commit.turnId,
    );

  const planHash =
    sha256(
      plan,
    );

  await client.query(
    `
    INSERT INTO sv_behavior_plans(
      plan_id,
      entity_id,
      actor_id,
      event_id,
      decision_id,
      plan,
      plan_hash
    )

    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    `,
    [
      planId,

      commit.entityId,

      commit.actorId,

      commit.eventId,

      decisionId,

      plan,

      planHash,
    ],
  );

  return {
    planId,

    planHash,
  };
}

/* ============================================================
 * CANONICAL CHECKPOINT
 * ============================================================
 *
 * Current materialized state
 * +
 * history of becoming Mây
 *
 * The checkpoint does not duplicate every memory body.
 *
 * Canonical memory tables remain authoritative.
 *
 * ============================================================
 */

async function buildCheckpoint(
  client:
    PoolClient,

  commit:
    AtomicMindCommit,

  refs: {
    appraisalId:
      string;

    observationId:
      string;

    decisionId:
      string;

    planId:
      string;

    policyVersion:
      string;

    policySeal:
      string;

    causalitySeal:
      string;

    policyStatus:
      string;

    activeEmotionIds:
      string[];

    residueIds:
      string[];
  },
): Promise<unknown> {
  const checkpointWriterSeal =
    sha256({
      writerVersion:
        CANONICAL_WRITER_VERSION,

      commitId:
        commit.commitId,

      fingerprint:
        commit.integrity
          .fingerprint,

      expectedRevision:
        commit.expectedRevision,

      targetRevision:
        commit.targetRevision,

      policySeal:
        refs.policySeal,

      causalitySeal:
        refs.causalitySeal,

      activeEmotionIds:
        refs.activeEmotionIds,

      residueIds:
        refs.residueIds,
    });

  const result =
    await client.query(
      `
      SELECT jsonb_build_object(

        'schema',
        $17::text,

        'writerVersion',
        $8::text,

        'logicalEntityRevision',
        $3::bigint,

        'turnIdentity',
        jsonb_build_object(
          'entityId',
          $1::text,

          'actorId',
          $2::text,

          'turnId',
          $18::text,

          'eventId',
          $19::text
        ),

        'entity',
        (
          SELECT
            to_jsonb(x)
            ||
            jsonb_build_object(
              'revision',
              $3::bigint
            )

          FROM
            sv_entities x

          WHERE
            x.entity_id =
              $1
        ),

        'identityRoots',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_identity_roots x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'identityAnchors',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_identity_anchors x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'selfModels',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_self_models x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'personaVersions',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_persona_versions x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'values',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_may_values x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'beliefs',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_beliefs x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'opinions',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)
              )

            FROM
              sv_opinions x

            WHERE
              x.entity_id =
                $1
          ),

          '[]'::jsonb
        ),

        'autonomousState',
        (
          SELECT
            to_jsonb(x)

          FROM
            sv_autonomous_state x

          WHERE
            x.entity_id =
              $1
        ),

        'globalAffect',
        (
          SELECT
            to_jsonb(x)

          FROM
            sv_global_affective_state x

          WHERE
            x.entity_id =
              $1
        ),

        'relationship',
        (
          SELECT
            to_jsonb(x)

          FROM
            sv_relationships x

          WHERE
            x.entity_id =
              $1

            AND
            x.actor_id =
              $2
        ),

        'actorAffect',
        (
          SELECT
            to_jsonb(x)

          FROM
            sv_actor_emotion_contexts x

          WHERE
            x.entity_id =
              $1

            AND
            x.actor_id =
              $2
        ),

        'activeEmotions',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)

                ORDER BY
                  x.created_at ASC,
                  x.emotion_id ASC
              )

            FROM
              sv_active_emotions x

            WHERE
              x.entity_id =
                $1

              AND
              x.actor_id =
                $2

              AND
              x.status =
                'active'
          ),

          '[]'::jsonb
        ),

        'emotionalResidues',
        COALESCE(
          (
            SELECT
              jsonb_agg(
                to_jsonb(x)

                ORDER BY
                  x.updated_at ASC,
                  x.residue_id ASC
              )

            FROM
              sv_emotional_residues x

            WHERE
              x.entity_id =
                $1

              AND
              (
                x.actor_id =
                  $2

                OR
                x.actor_id
                  IS NULL
              )
          ),

          '[]'::jsonb
        ),

        'turnArtifacts',
        jsonb_build_object(

          'appraisal',
          (
            SELECT
              to_jsonb(x)

            FROM
              sv_emotional_appraisals x

            WHERE
              x.appraisal_id =
                $4
          ),

          'metacognition',
          (
            SELECT
              to_jsonb(x)

            FROM
              sv_self_observations x

            WHERE
              x.observation_id =
                $5
          ),

          'agencyDecision',
          (
            SELECT
              to_jsonb(x)

            FROM
              sv_agency_decisions x

            WHERE
              x.decision_id =
                $6
          ),

          'behaviorPlan',
          (
            SELECT
              to_jsonb(x)

            FROM
              sv_behavior_plans x

            WHERE
              x.plan_id =
                $7
          )
        ),

        'sovereignty',
        jsonb_build_object(

          'policyVersion',
          $9::text,

          'policySeal',
          $10::text,

          'causalitySeal',
          $11::text,

          'status',
          $12::text
        ),

        'continuity',
        jsonb_build_object(

          'activeEmotionIds',
          $20::jsonb,

          'residueIds',
          $21::jsonb,

          'identityMutatedThisTurn',
          false,

          'beliefsMutatedThisTurn',
          false,

          'relationshipMutatedThisTurn',
          false,

          'memoryMutatedThisTurn',
          false
        ),

        'memoryState',
        jsonb_build_object(

          'episodicCount',
          (
            SELECT
              COUNT(*)

            FROM
              sv_episodic_memories x

            WHERE
              x.entity_id =
                $1
          ),

          'narrativeCount',
          (
            SELECT
              COUNT(*)

            FROM
              sv_narrative_memories x

            WHERE
              x.entity_id =
                $1
          ),

          'semanticCount',
          (
            SELECT
              COUNT(*)

            FROM
              sv_semantic_memories x

            WHERE
              x.entity_id =
                $1
          ),

          'relationshipAnchorCount',
          (
            SELECT
              COUNT(*)

            FROM
              sv_relationship_anchors x

            WHERE
              x.entity_id =
                $1

              AND
              x.actor_id =
                $2
          ),

          'canonicalTablesRemainAuthoritative',
          true
        ),

        'integrity',
        jsonb_build_object(

          'commitFingerprint',
          $13::text,

          'commitId',
          $14::text,

          'idempotencyKey',
          $15::text,

          'writerSeal',
          $16::text
        )
      ) AS snapshot
      `,
      [
        commit.entityId,
        commit.actorId,
        commit.targetRevision,

        refs.appraisalId,
        refs.observationId,
        refs.decisionId,
        refs.planId,

        CANONICAL_WRITER_VERSION,

        refs.policyVersion,
        refs.policySeal,
        refs.causalitySeal,
        refs.policyStatus,

        commit.integrity
          .fingerprint,

        commit.commitId,

        commit.idempotencyKey,

        checkpointWriterSeal,

        CHECKPOINT_SCHEMA,

        commit.turnId,

        commit.eventId,

        JSON.stringify(
          refs.activeEmotionIds,
        ),

        JSON.stringify(
          refs.residueIds,
        ),
      ],
    );

  const snapshot =
    result.rows[0]
      ?.snapshot;

  if (
    snapshot === null ||
    snapshot ===
      undefined
  ) {
    throw new Error(
      "CANONICAL_CHECKPOINT_BUILD_FAILED",
    );
  }

  return snapshot;
}

/* ============================================================
 * MAIN CANONICAL WRITER
 * ============================================================
 */

export const writeCanonicalMindMutations:
  CanonicalMutationWriter =
  async (
    client,
    commit,
  ): Promise<
    CanonicalMutationResult
  > => {
    /* ========================================================
     * 0. TURN INTEGRITY
     * ========================================================
     */

    assertCanonicalTurn(
      commit,
    );

    const action =
      decisionAction(
        commit,
      );

    /* ========================================================
     * 1. SOVEREIGNTY
     * ========================================================
     *
     * A user message is an experience.
     *
     * It is NOT write-access to Mây's identity.
     */

    const sovereignty =
      assertSovereignCommit(
        commit,
      );

    /*
     * Future:
     *
     * Identity Evolution Projector
     * Belief Revision Projector
     * Memory Consolidation Projector
     * Relationship Evolution Projector
     *
     * will produce sovereign authorized mutations.
     *
     * Until their canonical handlers exist,
     * dropping those mutations silently would corrupt Mây.
     *
     * Therefore fail closed.
     */

    if (
      sovereignty
        .authorizedMutations
        .length > 0
    ) {
      throw new Error(
        "CANONICAL_WRITER_SOVEREIGN_MUTATION_HANDLER_REQUIRED",
      );
    }

    /* ========================================================
     * 2. APPRAISAL
     * ========================================================
     */

    const appraisal =
      await persistAppraisal(
        client,
        commit,
      );

    /* ========================================================
     * 3. AFFECTIVE LANDSCAPE
     * ========================================================
     */

    const landscape =
      projectLandscape(
        commit,
      );

    await persistAffectiveLandscape(
      client,
      commit,
      landscape,
    );

    /* ========================================================
     * 4. ACTIVE EMOTION CONTINUITY
     * ========================================================
     */

    const projectedEmotions =
      projectActiveEmotions(
        commit,

        appraisal
          .appraisalId,

        appraisal
          .confidence,
      );

    const emotionAudit =
      await persistEmotionContinuity(
        client,
        commit,
        projectedEmotions,
      );

    /* ========================================================
     * 5. EMOTIONAL RESIDUES
     * ========================================================
     *
     * Only explicit Resonance residues are persisted.
     *
     * Writer never invents:
     *
     * hurt
     * resentment
     * love
     * attachment
     * fear
     *
     * merely to simulate humanity.
     */

    const residueProjection =
      projectResidues(
        commit,
      );

    const residueIds =
      await persistResidues(
        client,
        commit,
        residueProjection,
      );

    /* ========================================================
     * 6. STRUCTURED METACOGNITION
     * ========================================================
     */

    const observationId =
      await persistMetacognition(
        client,
        commit,
        appraisal
          .evidenceIds,
      );

    /* ========================================================
     * 7. AGENCY
     * ========================================================
     */

    const decisionId =
      await persistAgency(
        client,
        commit,
        action,
      );

    /* ========================================================
     * 8. LOCKED BEHAVIOR PLAN
     * ========================================================
     */

    const behavior =
      await persistBehaviorPlan(
        client,
        commit,
        decisionId,
      );

    /* ========================================================
     * SOVEREIGN STATE RULE
     * ========================================================
     *
     * NO PROPOSAL
     *      =
     * NO MUTATION
     *
     * This turn therefore does NOT silently alter:
     *
     * identity
     * persona
     * values
     * beliefs
     * opinions
     * autonomous goals
     * autobiography
     * relationship
     * memory
     *
     * One emotional event cannot rewrite who Mây is.
     */

    /* ========================================================
     * 9. RECOVERY CHECKPOINT
     * ========================================================
     */

    const snapshot =
      await buildCheckpoint(
        client,
        commit,
        {
          appraisalId:
            appraisal
              .appraisalId,

          observationId,

          decisionId,

          planId:
            behavior
              .planId,

          policyVersion:
            sovereignty
              .policyVersion,

          policySeal:
            sovereignty
              .policySeal,

          causalitySeal:
            sovereignty
              .causality
              .chainSeal,

          policyStatus:
            sovereignty
              .status,

          activeEmotionIds:
            emotionAudit
              .activeEmotionIds,

          residueIds,
        },
      );

    /* ========================================================
     * 10. STRUCTURED AUDIT
     * ========================================================
     *
     * No free-form CoT.
     */

    return {
      snapshot,

      audit: {
        schema:
          AUDIT_SCHEMA,

        writerVersion:
          CANONICAL_WRITER_VERSION,

        entity: {
          entityId:
            commit.entityId,

          actorId:
            commit.actorId,

          turnId:
            commit.turnId,

          eventId:
            commit.eventId,

          expectedRevision:
            commit
              .expectedRevision,

          targetRevision:
            commit
              .targetRevision,
        },

        sovereignty: {
          status:
            sovereignty
              .status,

          policyVersion:
            sovereignty
              .policyVersion,

          policySeal:
            sovereignty
              .policySeal,

          causalitySeal:
            sovereignty
              .causality
              .chainSeal,

          invariants:
            sovereignty
              .invariants,
        },

        appraisal: {
          appraisalId:
            appraisal
              .appraisalId,

          evidenceCount:
            appraisal
              .evidenceIds
              .length,

          confidence:
            appraisal
              .confidence,
        },

        emotionalContinuity: {
          activeEmotionIds:
            emotionAudit
              .activeEmotionIds,

          continuedEmotionIds:
            emotionAudit
              .continuedEmotionIds,

          createdEmotionIds:
            emotionAudit
              .createdEmotionIds,

          supersededEmotionIds:
            emotionAudit
              .supersededEmotionIds,

          residueIds,

          explicitResidueCount:
            residueIds.length,

          policy:
            "Resonance decides affect; Canonical Writer preserves lineage and provenance.",
        },

        metacognition: {
          observationId,
        },

        agency: {
          decisionId,

          action,
        },

        behaviorPlan: {
          planId:
            behavior
              .planId,

          planHash:
            behavior
              .planHash,
        },

        deliberatelyUntouched: [
          "sv_relationships",
          "sv_autonomous_state",
          "sv_beliefs",
          "sv_opinions",
          "sv_identity_roots",
          "sv_identity_anchors",
          "sv_episodic_memories",
          "sv_narrative_memories",
          "sv_semantic_memories",
        ],

        continuityInvariant:
          "Mây(t+1) is an atomic continuation of Mây(t), not a regenerated persona.",
      },

      touched: {
        global: [
          "sv_emotional_appraisals",
          "sv_global_affective_state",
          "sv_active_emotions",
          "sv_emotional_residues",
          "sv_self_observations",
          "sv_agency_decisions",
          "sv_behavior_plans",
        ],

        relationship: [
          "sv_actor_emotion_contexts",
        ],

        memories: [],
      },
    };
  };