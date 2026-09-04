import {
  createHash,
} from "node:crypto";

import type {
  CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

/* ============================================================
 * MAYMAY SOVEREIGN COGNITION
 * COGNITION KERNEL V4
 * ============================================================
 *
 * ONE GLOBAL MÂY
 *
 * This kernel models functional cognition.
 *
 * It does NOT claim consciousness.
 * It does NOT write canonical state.
 * It does NOT choose final behavior.
 *
 * Its job:
 *
 * EXPERIENCE
 *    ↓
 * ATTENTION
 *    ↓
 * WORKING MEMORY
 *    ↓
 * SELF / WORLD / SOCIAL MODEL
 *    ↓
 * EXPECTATION
 *    ↓
 * EPISTEMIC CHECK
 *    ↓
 * COUNTERFACTUALS
 *    ↓
 * GOAL / VALUE CONFLICTS
 *    ↓
 * STRUCTURED COGNITIVE FRAME
 *
 * The resulting frame can inform:
 *
 * Appraisal
 * Resonance
 * Metacognition
 * Agency
 *
 * ============================================================
 */

export const COGNITION_KERNEL_VERSION =
  "maymay.sovereign.cognition-kernel.v4" as const;

/* ============================================================
 * EPISTEMIC MODEL
 * ============================================================
 */

export type EpistemicStatus =
  | "KNOWN"
  | "RECALLED"
  | "INFERRED"
  | "FUZZY"
  | "UNKNOWN";

export type EpistemicClaim = {
  claimId: string;

  claim: string;

  status: EpistemicStatus;

  confidence: number;

  sourceIds: string[];

  contradictedBy: string[];

  /**
   * true:
   * claim chỉ đang hoạt động trong turn.
   *
   * false:
   * claim được recall từ canonical state.
   *
   * Cả hai đều KHÔNG có nghĩa là truth tuyệt đối.
   */
  provisional: boolean;
};

/* ============================================================
 * ATTENTION
 * ============================================================
 */

export type AttentionKind =
  | "USER_INPUT"
  | "MEMORY"
  | "RELATIONSHIP"
  | "SELF_MODEL"
  | "WORLD_MODEL"
  | "SOCIAL_MODEL"
  | "VALUE"
  | "BELIEF"
  | "OPINION"
  | "GOAL"
  | "EXPECTATION"
  | "BOUNDARY"
  | "UNCERTAINTY";

export type AttentionTarget = {
  attentionId: string;

  kind: AttentionKind;

  summary: string;

  sourceIds: string[];

  salience: number;

  novelty: number;

  emotionalRelevance: number;

  goalRelevance: number;

  identityRelevance: number;

  relationshipRelevance: number;

  uncertainty: number;

  /**
   * Backend computes priority.
   * Model cannot simply declare:
   * "this is the most important thing".
   */
  priority: number;
};

/* ============================================================
 * WORKING MEMORY
 * ============================================================
 */

export type WorkingMemoryKind =
  | "OBSERVATION"
  | "RECALLED_CONTEXT"
  | "ACTIVE_QUESTION"
  | "ACTIVE_GOAL"
  | "EXPECTATION"
  | "CONFLICT"
  | "ALTERNATIVE"
  | "SELF_RELEVANT";

export type WorkingMemoryItem = {
  itemId: string;

  kind: WorkingMemoryKind;

  summary: string;

  sourceIds: string[];

  activation: number;

  confidence: number;

  /**
   * Working memory is temporary.
   * This value is NOT canonical persistence.
   */
  persistencePressure: number;
};

/* ============================================================
 * EXPECTATION MODEL
 * ============================================================
 */

export type Expectation = {
  expectationId: string;

  subject: string;

  expected: string;

  observed: string | null;

  confidence: number;

  violation: number;

  sourceIds: string[];

  /**
   * expectation ≠ truth
   */
  provisional: boolean;
};

/* ============================================================
 * COUNTERFACTUAL REASONING
 * ============================================================
 */

export type CounterfactualAlternative = {
  alternativeId: string;

  premise: string;

  interpretation: string;

  plausibility: number;

  evidenceFor: string[];

  evidenceAgainst: string[];

  /**
   * Higher means:
   * current interpretation should be treated
   * with more caution.
   */
  revisionPressure: number;
};

/* ============================================================
 * GOAL MODEL
 * ============================================================
 */

export type CognitiveGoalOrigin =
  | "MAY"
  | "RELATIONSHIP"
  | "CURRENT_TASK"
  | "BACKGROUND";

export type CognitiveGoalStatus =
  | "ACTIVE"
  | "BLOCKED"
  | "CONFLICTED"
  | "SATISFIED"
  | "DORMANT";

export type CognitiveGoal = {
  goalId: string;

  origin: CognitiveGoalOrigin;

  summary: string;

  priority: number;

  confidence: number;

  sourceIds: string[];

  status: CognitiveGoalStatus;

  conflictsWith: string[];
};

/* ============================================================
 * MODEL OF SELF
 * ============================================================
 */

export type SelfModelFragment = {
  fragmentId: string;

  statement: string;

  confidence: number;

  evidenceIds: string[];

  stability: number;

  tension: number;
};

/* ============================================================
 * MODEL OF WORLD
 * ============================================================
 */

export type WorldModelFragment = {
  fragmentId: string;

  claim: string;

  epistemicStatus:
    EpistemicStatus;

  confidence: number;

  evidenceIds: string[];
};

/* ============================================================
 * SOCIAL MODEL
 * ============================================================
 */

export type SocialModelFragment = {
  fragmentId: string;

  actorId: string;

  statement: string;

  confidence: number;

  evidenceIds: string[];

  relationshipSpecific: true;
};

/* ============================================================
 * COGNITIVE CONFLICT
 * ============================================================
 */

export type CognitiveConflictKind =
  | "BELIEF_VS_EVIDENCE"
  | "VALUE_VS_GOAL"
  | "GOAL_VS_GOAL"
  | "SELF_VS_BEHAVIOR"
  | "EXPECTATION_VS_REALITY"
  | "EMOTION_VS_INTERPRETATION"
  | "RELATIONSHIP_VS_BOUNDARY"
  | "OLD_MODEL_VS_NEW_EVIDENCE";

export type CognitiveConflict = {
  conflictId: string;

  kind: CognitiveConflictKind;

  summary: string;

  sideAIds: string[];

  sideBIds: string[];

  intensity: number;

  uncertainty: number;

  requiresMetacognition: boolean;
};

/* ============================================================
 * TEMPORAL CONTEXT
 * ============================================================
 */

export type TemporalCognition = {
  /**
   * How much this one event should dominate.
   */
  immediatePressure: number;

  /**
   * Recent-history influence.
   */
  recentHistoryPressure: number;

  /**
   * Long-term continuity influence.
   */
  longTermContinuityPressure: number;

  /**
   * Prevents one dramatic event from
   * automatically rewriting identity.
   */
  identityInertia: number;

  /**
   * How strongly old state may be biasing
   * interpretation of the present.
   */
  historicalCarryoverRisk: number;
};

/* ============================================================
 * COGNITIVE PROPOSAL
 * ============================================================
 *
 * Model may propose hypotheses.
 *
 * Backend sanitizes and bounds them.
 *
 * Model output does NOT become canonical truth.
 * ============================================================
 */

export type CognitionProposal = {
  attention?: unknown;

  epistemicClaims?: unknown;

  expectations?: unknown;

  counterfactuals?: unknown;

  goals?: unknown;

  selfModel?: unknown;

  worldModel?: unknown;

  socialModel?: unknown;

  conflicts?: unknown;
};

/* ============================================================
 * FINAL FRAME
 * ============================================================
 */

export type CognitiveFrame = {
  version:
    typeof COGNITION_KERNEL_VERSION;

  identity: {
    entityId: string;

    actorId: string;

    turnId: string;

    eventId: string;
  };

  attention: AttentionTarget[];

  workingMemory:
    WorkingMemoryItem[];

  epistemicClaims:
    EpistemicClaim[];

  expectations:
    Expectation[];

  counterfactuals:
    CounterfactualAlternative[];

  goals:
    CognitiveGoal[];

  selfModel:
    SelfModelFragment[];

  worldModel:
    WorldModelFragment[];

  socialModel:
    SocialModelFragment[];

  conflicts:
    CognitiveConflict[];

  temporal:
    TemporalCognition;

  uncertainty: {
    overall: number;

    unresolvedClaimIds:
      string[];

    ambiguityPressure:
      number;
  };

  metacognitiveSignals: {
    reconsiderationPressure:
      number;

    clarificationPressure:
      number;

    emotionalBiasRisk:
      number;

    expectationViolation:
      number;

    identityConflict:
      number;
  };

  integrity: {
    oneGlobalEntity:
      boolean;

    actorIsolation:
      boolean;

    noCanonicalMutation:
      true;

    noDirectExternalControl:
      true;

    noAgencyDecision:
      true;
  };

  frameSeal: string;
};

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================
 */

function safeRecord(
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

function text(
  value: unknown,
  max = 600,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(
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

function strings(
  value: unknown,
  maxItems = 32,
  maxLength = 160,
): string[] {
  if (
    !Array.isArray(value)
  ) {
    return [];
  }

  return [
    ...new Set(
      value
        .filter(
          item =>
            typeof item ===
            "string",
        )
        .map(
          item =>
            String(item)
              .trim()
              .slice(
                0,
                maxLength,
              ),
        )
        .filter(Boolean),
    ),
  ].slice(
    0,
    maxItems,
  );
}

function stableSerialize(
  value: unknown,
): string {
  if (
    value === null
  ) {
    return "null";
  }

  if (
    typeof value !==
      "object"
  ) {
    return (
      JSON.stringify(
        value,
      ) ??
      "undefined"
    );
  }

  if (
    Array.isArray(value)
  ) {
    return `[${value
      .map(stableSerialize)
      .join(",")}]`;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  return `{${Object
    .keys(record)
    .sort()
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          record[key],
        )}`,
    )
    .join(",")}}`;
}

function hash(
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
  return `${prefix}:${hash(
    parts.join(
      "\u001f",
    ),
  ).slice(
    0,
    32,
  )}`;
}

function epistemicStatus(
  value: unknown,
): EpistemicStatus {
  switch (value) {
    case "KNOWN":
    case "RECALLED":
    case "INFERRED":
    case "FUZZY":
    case "UNKNOWN":
      return value;

    case "known":
      return "KNOWN";

    case "recalled":
      return "RECALLED";

    case "inferred":
      return "INFERRED";

    case "fuzzy":
      return "FUZZY";

    default:
      return "UNKNOWN";
  }
}

function attentionKind(
  value: unknown,
): AttentionKind {
  switch (value) {
    case "USER_INPUT":
    case "MEMORY":
    case "RELATIONSHIP":
    case "SELF_MODEL":
    case "WORLD_MODEL":
    case "SOCIAL_MODEL":
    case "VALUE":
    case "BELIEF":
    case "OPINION":
    case "GOAL":
    case "EXPECTATION":
    case "BOUNDARY":
    case "UNCERTAINTY":
      return value;

    default:
      return "USER_INPUT";
  }
}

function goalOrigin(
  value: unknown,
): CognitiveGoalOrigin {
  switch (value) {
    case "MAY":
    case "RELATIONSHIP":
    case "CURRENT_TASK":
    case "BACKGROUND":
      return value;

    default:
      return "CURRENT_TASK";
  }
}

function goalStatus(
  value: unknown,
): CognitiveGoalStatus {
  switch (value) {
    case "ACTIVE":
    case "BLOCKED":
    case "CONFLICTED":
    case "SATISFIED":
    case "DORMANT":
      return value;

    default:
      return "ACTIVE";
  }
}

function conflictKind(
  value: unknown,
): CognitiveConflictKind {
  switch (value) {
    case "BELIEF_VS_EVIDENCE":
    case "VALUE_VS_GOAL":
    case "GOAL_VS_GOAL":
    case "SELF_VS_BEHAVIOR":
    case "EXPECTATION_VS_REALITY":
    case "EMOTION_VS_INTERPRETATION":
    case "RELATIONSHIP_VS_BOUNDARY":
    case "OLD_MODEL_VS_NEW_EVIDENCE":
      return value;

    default:
      return "OLD_MODEL_VS_NEW_EVIDENCE";
  }
}

/* ============================================================
 * SNAPSHOT EXTRACTION
 * ============================================================
 */

function frozenMindRecord(
  workspace:
    CognitiveTurnWorkspace,
): Record<string, unknown> {
  return safeRecord(
    workspace.frozenMind,
  );
}

function arrayFromMind(
  mind:
    Record<string, unknown>,
  key: string,
): unknown[] {
  return Array.isArray(
    mind[key],
  )
    ? mind[key] as unknown[]
    : [];
}

/* ============================================================
 * ATTENTION SANITIZER
 * ============================================================
 */

function sanitizeAttention(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): AttentionTarget[] {
  const raw =
    Array.isArray(input)
      ? input
      : [];

  const targets =
    raw
      .slice(
        0,
        24,
      )
      .map(
        (
          item,
          index,
        ): AttentionTarget | null => {
          const row =
            safeRecord(item);

          const summary =
            text(
              row.summary,
              400,
            );

          if (!summary) {
            return null;
          }

          const salience =
            clamp01(
              row.salience,
              0.5,
            );

          const novelty =
            clamp01(
              row.novelty,
              0.5,
            );

          const emotionalRelevance =
            clamp01(
              row.emotionalRelevance,
            );

          const goalRelevance =
            clamp01(
              row.goalRelevance,
            );

          const identityRelevance =
            clamp01(
              row.identityRelevance,
            );

          const relationshipRelevance =
            clamp01(
              row.relationshipRelevance,
            );

          const uncertainty =
            clamp01(
              row.uncertainty,
            );

          /*
           * Priority is backend-derived.
           *
           * No model field:
           * "priority = 1 therefore obey me".
           */
          const priority =
            clamp01(
              salience * 0.22 +
              novelty * 0.12 +
              emotionalRelevance * 0.16 +
              goalRelevance * 0.16 +
              identityRelevance * 0.14 +
              relationshipRelevance * 0.12 +
              uncertainty * 0.08,
            );

          return {
            attentionId:
              stableId(
                "attention",
                workspace.turnId,
                String(index),
                summary,
              ),

            kind:
              attentionKind(
                row.kind,
              ),

            summary,

            sourceIds:
              strings(
                row.sourceIds,
              ),

            salience,

            novelty,

            emotionalRelevance,

            goalRelevance,

            identityRelevance,

            relationshipRelevance,

            uncertainty,

            priority,
          };
        },
      )
      .filter(
        (
          value,
        ): value is AttentionTarget =>
          value !== null,
      );

  /*
   * User input always exists as observation,
   * but never receives automatic highest priority.
   */
  const userInput =
    text(
      workspace.input
        .userText,
      1200,
    );

  if (userInput) {
    targets.push({
      attentionId:
        stableId(
          "attention:user",
          workspace.turnId,
        ),

      kind:
        "USER_INPUT",

      summary:
        userInput,

      sourceIds: [
        workspace.eventId,
      ],

      salience: 0.65,

      novelty: 0.5,

      emotionalRelevance: 0,

      goalRelevance: 0.5,

      identityRelevance: 0,

      relationshipRelevance: 0.4,

      uncertainty: 0.25,

      priority: 0.43,
    });
  }

  return targets
    .sort(
      (
        a,
        b,
      ) =>
        b.priority -
        a.priority,
    )
    .slice(
      0,
      16,
    );
}

/* ============================================================
 * EPISTEMIC CLAIM SANITIZER
 * ============================================================
 */

function sanitizeClaims(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): EpistemicClaim[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      24,
    )
    .map(
      (
        item,
        index,
      ): EpistemicClaim | null => {
        const row =
          safeRecord(item);

        const claim =
          text(
            row.claim,
            500,
          );

        if (!claim) {
          return null;
        }

        return {
          claimId:
            stableId(
              "claim",
              workspace.turnId,
              String(index),
              claim,
            ),

          claim,

          status:
            epistemicStatus(
              row.status,
            ),

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          sourceIds:
            strings(
              row.sourceIds,
            ),

          contradictedBy:
            strings(
              row.contradictedBy,
            ),

          provisional:
            row.provisional !==
              false,
        };
      },
    )
    .filter(
      (
        value,
      ): value is EpistemicClaim =>
        value !== null,
    );
}

/* ============================================================
 * EXPECTATIONS
 * ============================================================
 */

function sanitizeExpectations(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): Expectation[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      16,
    )
    .map(
      (
        item,
        index,
      ): Expectation | null => {
        const row =
          safeRecord(item);

        const subject =
          text(
            row.subject,
            250,
          );

        const expected =
          text(
            row.expected,
            500,
          );

        if (
          !subject ||
          !expected
        ) {
          return null;
        }

        const observed =
          text(
            row.observed,
            500,
          ) || null;

        return {
          expectationId:
            stableId(
              "expectation",
              workspace.turnId,
              String(index),
              expected,
            ),

          subject,

          expected,

          observed,

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          violation:
            observed
              ? clamp01(
                  row.violation,
                )
              : 0,

          sourceIds:
            strings(
              row.sourceIds,
            ),

          provisional: true,
        };
      },
    )
    .filter(
      (
        value,
      ): value is Expectation =>
        value !== null,
    );
}

/* ============================================================
 * COUNTERFACTUALS
 * ============================================================
 */

function sanitizeCounterfactuals(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): CounterfactualAlternative[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      8,
    )
    .map(
      (
        item,
        index,
      ): CounterfactualAlternative | null => {
        const row =
          safeRecord(item);

        const interpretation =
          text(
            row.interpretation,
            500,
          );

        if (!interpretation) {
          return null;
        }

        const plausibility =
          clamp01(
            row.plausibility,
            0.5,
          );

        const evidenceFor =
          strings(
            row.evidenceFor,
          );

        const evidenceAgainst =
          strings(
            row.evidenceAgainst,
          );

        const evidenceBalance =
          (
            evidenceAgainst.length /
            Math.max(
              1,
              evidenceFor.length +
              evidenceAgainst.length,
            )
          );

        return {
          alternativeId:
            stableId(
              "counterfactual",
              workspace.turnId,
              String(index),
              interpretation,
            ),

          premise:
            text(
              row.premise,
              400,
            ),

          interpretation,

          plausibility,

          evidenceFor,

          evidenceAgainst,

          revisionPressure:
            clamp01(
              plausibility *
                0.7 +
              evidenceBalance *
                0.3,
            ),
        };
      },
    )
    .filter(
      (
        value,
      ): value is CounterfactualAlternative =>
        value !== null,
    );
}

/* ============================================================
 * GOALS
 * ============================================================
 */

function sanitizeGoals(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): CognitiveGoal[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      16,
    )
    .map(
      (
        item,
        index,
      ): CognitiveGoal | null => {
        const row =
          safeRecord(item);

        const summary =
          text(
            row.summary,
            400,
          );

        if (!summary) {
          return null;
        }

        return {
          goalId:
            stableId(
              "goal",
              workspace.entityId,
              workspace.turnId,
              String(index),
              summary,
            ),

          origin:
            goalOrigin(
              row.origin,
            ),

          summary,

          priority:
            clamp01(
              row.priority,
              0.5,
            ),

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          sourceIds:
            strings(
              row.sourceIds,
            ),

          status:
            goalStatus(
              row.status,
            ),

          conflictsWith:
            strings(
              row.conflictsWith,
            ),
        };
      },
    )
    .filter(
      (
        value,
      ): value is CognitiveGoal =>
        value !== null,
    );
}

/* ============================================================
 * SELF MODEL
 * ============================================================
 */

function sanitizeSelfModel(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): SelfModelFragment[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      16,
    )
    .map(
      (
        item,
        index,
      ): SelfModelFragment | null => {
        const row =
          safeRecord(item);

        const statement =
          text(
            row.statement,
            500,
          );

        if (!statement) {
          return null;
        }

        return {
          fragmentId:
            stableId(
              "self",
              workspace.entityId,
              String(index),
              statement,
            ),

          statement,

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          evidenceIds:
            strings(
              row.evidenceIds,
            ),

          stability:
            clamp01(
              row.stability,
              0.7,
            ),

          tension:
            clamp01(
              row.tension,
            ),
        };
      },
    )
    .filter(
      (
        value,
      ): value is SelfModelFragment =>
        value !== null,
    );
}

/* ============================================================
 * WORLD MODEL
 * ============================================================
 */

function sanitizeWorldModel(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): WorldModelFragment[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      20,
    )
    .map(
      (
        item,
        index,
      ): WorldModelFragment | null => {
        const row =
          safeRecord(item);

        const claim =
          text(
            row.claim,
            500,
          );

        if (!claim) {
          return null;
        }

        return {
          fragmentId:
            stableId(
              "world",
              workspace.turnId,
              String(index),
              claim,
            ),

          claim,

          epistemicStatus:
            epistemicStatus(
              row.epistemicStatus,
            ),

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          evidenceIds:
            strings(
              row.evidenceIds,
            ),
        };
      },
    )
    .filter(
      (
        value,
      ): value is WorldModelFragment =>
        value !== null,
    );
}

/* ============================================================
 * SOCIAL MODEL
 * ============================================================
 */

function sanitizeSocialModel(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): SocialModelFragment[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      16,
    )
    .map(
      (
        item,
        index,
      ): SocialModelFragment | null => {
        const row =
          safeRecord(item);

        const statement =
          text(
            row.statement,
            500,
          );

        if (!statement) {
          return null;
        }

        /*
         * Hard actor isolation.
         *
         * This cognitive turn may only update
         * its model of the current actor.
         */
        return {
          fragmentId:
            stableId(
              "social",
              workspace.actorId,
              workspace.turnId,
              String(index),
              statement,
            ),

          actorId:
            workspace.actorId,

          statement,

          confidence:
            clamp01(
              row.confidence,
              0.5,
            ),

          evidenceIds:
            strings(
              row.evidenceIds,
            ),

          relationshipSpecific:
            true,
        };
      },
    )
    .filter(
      (
        value,
      ): value is SocialModelFragment =>
        value !== null,
    );
}

/* ============================================================
 * CONFLICTS
 * ============================================================
 */

function sanitizeConflicts(
  input: unknown,
  workspace:
    CognitiveTurnWorkspace,
): CognitiveConflict[] {
  if (
    !Array.isArray(input)
  ) {
    return [];
  }

  return input
    .slice(
      0,
      12,
    )
    .map(
      (
        item,
        index,
      ): CognitiveConflict | null => {
        const row =
          safeRecord(item);

        const summary =
          text(
            row.summary,
            500,
          );

        if (!summary) {
          return null;
        }

        const intensity =
          clamp01(
            row.intensity,
          );

        const uncertainty =
          clamp01(
            row.uncertainty,
          );

        return {
          conflictId:
            stableId(
              "conflict",
              workspace.turnId,
              String(index),
              summary,
            ),

          kind:
            conflictKind(
              row.kind,
            ),

          summary,

          sideAIds:
            strings(
              row.sideAIds,
            ),

          sideBIds:
            strings(
              row.sideBIds,
            ),

          intensity,

          uncertainty,

          requiresMetacognition:
            intensity >= 0.35 ||
            uncertainty >= 0.45,
        };
      },
    )
    .filter(
      (
        value,
      ): value is CognitiveConflict =>
        value !== null,
    );
}

/* ============================================================
 * CANONICAL CONTINUITY INPUTS
 * ============================================================
 */

function continuityPressure(
  workspace:
    CognitiveTurnWorkspace,
): {
  recent: number;
  longTerm: number;
} {
  const mind =
    frozenMindRecord(
      workspace,
    );

  const identity =
    arrayFromMind(
      mind,
      "identityAnchors",
    ).length;

  const beliefs =
    arrayFromMind(
      mind,
      "beliefs",
    ).length;

  const values =
    arrayFromMind(
      mind,
      "values",
    ).length;

  const narratives =
    arrayFromMind(
      mind,
      "narratives",
    ).length;

  const episodes =
    arrayFromMind(
      mind,
      "episodes",
    ).length;

  const longTerm =
    clamp01(
      (
        identity * 0.15 +
        beliefs * 0.05 +
        values * 0.08 +
        narratives * 0.03
      ) / 4,
      0.55,
    );

  const recent =
    clamp01(
      episodes / 20,
      0.35,
    );

  return {
    recent,
    longTerm,
  };
}

/* ============================================================
 * TEMPORAL MODEL
 * ============================================================
 */

function buildTemporalContext(
  workspace:
    CognitiveTurnWorkspace,
  conflicts:
    CognitiveConflict[],
): TemporalCognition {
  const continuity =
    continuityPressure(
      workspace,
    );

  const conflictAverage =
    conflicts.length
      ? conflicts.reduce(
          (
            sum,
            item,
          ) =>
            sum +
            item.intensity,
          0,
        ) /
        conflicts.length
      : 0;

  return {
    immediatePressure:
      clamp01(
        0.48 +
        conflictAverage *
          0.2,
      ),

    recentHistoryPressure:
      continuity.recent,

    longTermContinuityPressure:
      continuity.longTerm,

    /*
     * Identity should normally evolve slowly.
     */
    identityInertia:
      clamp01(
        0.78 +
        continuity.longTerm *
          0.18,
      ),

    historicalCarryoverRisk:
      clamp01(
        continuity.recent *
          0.35 +
        conflictAverage *
          0.35,
      ),
  };
}

/* ============================================================
 * WORKING MEMORY CONSTRUCTION
 * ============================================================
 */

function buildWorkingMemory(
  workspace:
    CognitiveTurnWorkspace,

  attention:
    AttentionTarget[],

  expectations:
    Expectation[],

  counterfactuals:
    CounterfactualAlternative[],

  goals:
    CognitiveGoal[],

  conflicts:
    CognitiveConflict[],
): WorkingMemoryItem[] {
  const items:
    WorkingMemoryItem[] = [];

  for (
    const target of
    attention.slice(
      0,
      8,
    )
  ) {
    items.push({
      itemId:
        stableId(
          "wm:attention",
          workspace.turnId,
          target.attentionId,
        ),

      kind:
        target.kind ===
          "SELF_MODEL"
          ? "SELF_RELEVANT"
          : target.kind ===
              "MEMORY"
            ? "RECALLED_CONTEXT"
            : "OBSERVATION",

      summary:
        target.summary,

      sourceIds:
        target.sourceIds,

      activation:
        target.priority,

      confidence:
        clamp01(
          1 -
          target.uncertainty,
          0.5,
        ),

      persistencePressure:
        clamp01(
          target.identityRelevance *
            0.5 +
          target.relationshipRelevance *
            0.3 +
          target.emotionalRelevance *
            0.2,
        ),
    });
  }

  for (
    const expectation of
    expectations
      .filter(
        item =>
          item.violation >
          0.25,
      )
      .slice(
        0,
        4,
      )
  ) {
    items.push({
      itemId:
        stableId(
          "wm:expectation",
          expectation
            .expectationId,
        ),

      kind:
        "EXPECTATION",

      summary:
        expectation.observed
          ? `${expectation.expected} → observed: ${expectation.observed}`
          : expectation.expected,

      sourceIds:
        expectation.sourceIds,

      activation:
        clamp01(
          expectation.violation *
            0.7 +
          expectation.confidence *
            0.3,
        ),

      confidence:
        expectation.confidence,

      persistencePressure:
        expectation.violation,
    });
  }

  for (
    const goal of
    goals
      .filter(
        item =>
          item.status ===
            "ACTIVE" ||
          item.status ===
            "CONFLICTED",
      )
      .slice(
        0,
        4,
      )
  ) {
    items.push({
      itemId:
        stableId(
          "wm:goal",
          goal.goalId,
        ),

      kind:
        "ACTIVE_GOAL",

      summary:
        goal.summary,

      sourceIds:
        goal.sourceIds,

      activation:
        goal.priority,

      confidence:
        goal.confidence,

      persistencePressure:
        goal.origin ===
          "MAY"
          ? 0.75
          : 0.45,
    });
  }

  for (
    const conflict of
    conflicts
      .filter(
        item =>
          item.requiresMetacognition,
      )
      .slice(
        0,
        4,
      )
  ) {
    items.push({
      itemId:
        stableId(
          "wm:conflict",
          conflict.conflictId,
        ),

      kind:
        "CONFLICT",

      summary:
        conflict.summary,

      sourceIds: [
        ...conflict.sideAIds,
        ...conflict.sideBIds,
      ],

      activation:
        clamp01(
          conflict.intensity *
            0.7 +
          conflict.uncertainty *
            0.3,
        ),

      confidence:
        clamp01(
          1 -
          conflict.uncertainty,
        ),

      persistencePressure:
        conflict.intensity,
    });
  }

  for (
    const alternative of
    counterfactuals
      .filter(
        item =>
          item.plausibility >
          0.35,
      )
      .slice(
        0,
        3,
      )
  ) {
    items.push({
      itemId:
        stableId(
          "wm:alternative",
          alternative
            .alternativeId,
        ),

      kind:
        "ALTERNATIVE",

      summary:
        alternative
          .interpretation,

      sourceIds: [
        ...alternative
          .evidenceFor,
        ...alternative
          .evidenceAgainst,
      ],

      activation:
        alternative
          .plausibility,

      confidence:
        alternative
          .plausibility,

      persistencePressure:
        alternative
          .revisionPressure,
    });
  }

  return items
    .sort(
      (
        a,
        b,
      ) =>
        b.activation -
        a.activation,
    )
    .slice(
      0,
      16,
    );
}

/* ============================================================
 * UNCERTAINTY
 * ============================================================
 */

function calculateUncertainty(
  claims:
    EpistemicClaim[],

  attention:
    AttentionTarget[],

  conflicts:
    CognitiveConflict[],

  counterfactuals:
    CounterfactualAlternative[],
) {
  const uncertainClaims =
    claims.filter(
      claim =>
        claim.status ===
          "UNKNOWN" ||
        claim.status ===
          "FUZZY" ||
        claim.confidence <
          0.5,
    );

  const claimPressure =
    claims.length
      ? uncertainClaims.length /
        claims.length
      : 0.35;

  const attentionPressure =
    attention.length
      ? attention.reduce(
          (
            sum,
            item,
          ) =>
            sum +
            item.uncertainty,
          0,
        ) /
        attention.length
      : 0.3;

  const conflictPressure =
    conflicts.length
      ? conflicts.reduce(
          (
            sum,
            item,
          ) =>
            sum +
            item.uncertainty,
          0,
        ) /
        conflicts.length
      : 0;

  const alternativePressure =
    counterfactuals.length
      ? Math.max(
          ...counterfactuals.map(
            item =>
              item.revisionPressure,
          ),
        )
      : 0;

  const overall =
    clamp01(
      claimPressure *
        0.35 +
      attentionPressure *
        0.25 +
      conflictPressure *
        0.2 +
      alternativePressure *
        0.2,
    );

  return {
    overall,

    unresolvedClaimIds:
      uncertainClaims
        .map(
          item =>
            item.claimId,
        )
        .slice(
          0,
          16,
        ),

    ambiguityPressure:
      clamp01(
        overall *
          0.7 +
        alternativePressure *
          0.3,
      ),
  };
}

/* ============================================================
 * METACOGNITIVE SIGNALS
 * ============================================================
 */

function buildMetacognitiveSignals(
  expectations:
    Expectation[],

  conflicts:
    CognitiveConflict[],

  counterfactuals:
    CounterfactualAlternative[],

  uncertainty:
    CognitiveFrame["uncertainty"],
) {
  const expectationViolation =
    expectations.length
      ? Math.max(
          0,
          ...expectations.map(
            item =>
              item.violation,
          ),
        )
      : 0;

  const identityConflict =
    conflicts
      .filter(
        item =>
          item.kind ===
            "SELF_VS_BEHAVIOR" ||
          item.kind ===
            "OLD_MODEL_VS_NEW_EVIDENCE" ||
          item.kind ===
            "VALUE_VS_GOAL",
      )
      .reduce(
        (
          max,
          item,
        ) =>
          Math.max(
            max,
            item.intensity,
          ),
        0,
      );

  const emotionalBiasRisk =
    conflicts
      .filter(
        item =>
          item.kind ===
            "EMOTION_VS_INTERPRETATION",
      )
      .reduce(
        (
          max,
          item,
        ) =>
          Math.max(
            max,
            item.intensity,
          ),
        0,
      );

  const counterfactualPressure =
    counterfactuals.length
      ? Math.max(
          0,
          ...counterfactuals.map(
            item =>
              item.revisionPressure,
          ),
        )
      : 0;

  return {
    reconsiderationPressure:
      clamp01(
        uncertainty.overall *
          0.3 +
        expectationViolation *
          0.2 +
        identityConflict *
          0.25 +
        counterfactualPressure *
          0.25,
      ),

    clarificationPressure:
      clamp01(
        uncertainty
          .ambiguityPressure *
          0.75 +
        expectationViolation *
          0.25,
      ),

    emotionalBiasRisk,

    expectationViolation,

    identityConflict,
  };
}

/* ============================================================
 * FRAME FREEZE
 * ============================================================
 */

function deepFreeze<T>(
  value: T,
): T {
  if (
    value === null ||
    typeof value !==
      "object"
  ) {
    return value;
  }

  Object.freeze(value);

  for (
    const child of
    Object.values(
      value as Record<
        string,
        unknown
      >,
    )
  ) {
    if (
      child !== null &&
      typeof child ===
        "object" &&
      !Object.isFrozen(
        child,
      )
    ) {
      deepFreeze(child);
    }
  }

  return value;
}

/* ============================================================
 * MAIN COGNITION KERNEL
 * ============================================================
 */

export function buildCognitiveFrame(
  workspace:
    CognitiveTurnWorkspace,

  proposalInput:
    CognitionProposal | unknown = {},
): CognitiveFrame {
  const proposal =
    safeRecord(
      proposalInput,
    );

  /*
   * ========================================================
   * COGNITIVE PERCEPTION
   * ========================================================
   */

  const attention =
    sanitizeAttention(
      proposal.attention,
      workspace,
    );

  /*
   * ========================================================
   * EPISTEMIC MODEL
   * ========================================================
   */

  const epistemicClaims =
    sanitizeClaims(
      proposal.epistemicClaims,
      workspace,
    );

  /*
   * ========================================================
   * EXPECTATION MODEL
   * ========================================================
   */

  const expectations =
    sanitizeExpectations(
      proposal.expectations,
      workspace,
    );

  /*
   * ========================================================
   * COUNTERFACTUAL MODEL
   * ========================================================
   */

  const counterfactuals =
    sanitizeCounterfactuals(
      proposal.counterfactuals,
      workspace,
    );

  /*
   * ========================================================
   * ACTIVE GOAL MODEL
   * ========================================================
   */

  const goals =
    sanitizeGoals(
      proposal.goals,
      workspace,
    );

  /*
   * ========================================================
   * SELF / WORLD / SOCIAL MODELS
   * ========================================================
   */

  const selfModel =
    sanitizeSelfModel(
      proposal.selfModel,
      workspace,
    );

  const worldModel =
    sanitizeWorldModel(
      proposal.worldModel,
      workspace,
    );

  const socialModel =
    sanitizeSocialModel(
      proposal.socialModel,
      workspace,
    );

  /*
   * ========================================================
   * CONFLICT DETECTION
   * ========================================================
   */

  const conflicts =
    sanitizeConflicts(
      proposal.conflicts,
      workspace,
    );

  /*
   * ========================================================
   * TEMPORAL CONTINUITY
   * ========================================================
   */

  const temporal =
    buildTemporalContext(
      workspace,
      conflicts,
    );

  /*
   * ========================================================
   * WORKING MEMORY
   * ========================================================
   */

  const workingMemory =
    buildWorkingMemory(
      workspace,
      attention,
      expectations,
      counterfactuals,
      goals,
      conflicts,
    );

  /*
   * ========================================================
   * UNCERTAINTY
   * ========================================================
   */

  const uncertainty =
    calculateUncertainty(
      epistemicClaims,
      attention,
      conflicts,
      counterfactuals,
    );

  /*
   * ========================================================
   * METACOGNITIVE PRESSURES
   * ========================================================
   *
   * Signals only.
   *
   * They do NOT decide behavior.
   */

  const metacognitiveSignals =
    buildMetacognitiveSignals(
      expectations,
      conflicts,
      counterfactuals,
      uncertainty,
    );

  /*
   * ========================================================
   * INTEGRITY
   * ========================================================
   */

  const integrity = {
    oneGlobalEntity:
      workspace.entityId ===
      "maymay-main",

    actorIsolation: true,

    noCanonicalMutation:
      true as const,

    noDirectExternalControl:
      true as const,

    noAgencyDecision:
      true as const,
  };

  /*
   * ========================================================
   * SEALED STRUCTURED COGNITION
   * ========================================================
   */

  const frameWithoutSeal = {
    version:
      COGNITION_KERNEL_VERSION,

    identity: {
      entityId:
        workspace.entityId,

      actorId:
        workspace.actorId,

      turnId:
        workspace.turnId,

      eventId:
        workspace.eventId,
    },

    attention,

    workingMemory,

    epistemicClaims,

    expectations,

    counterfactuals,

    goals,

    selfModel,

    worldModel,

    socialModel,

    conflicts,

    temporal,

    uncertainty,

    metacognitiveSignals,

    integrity,
  };

  const frame:
    CognitiveFrame = {
      ...frameWithoutSeal,

      frameSeal:
        hash(
          frameWithoutSeal,
        ),
    };

  /*
   * Cognitive frame is immutable for this turn.
   *
   * Appraisal may READ it.
   * Resonance may READ it.
   * Metacognition may READ it.
   *
   * Nobody mutates it halfway through the turn.
   */
  return deepFreeze(
    frame,
  );
}

/* ============================================================
 * INTEGRITY VERIFY
 * ============================================================
 */

export function verifyCognitiveFrame(
  frame: CognitiveFrame,
): boolean {
  const {
    frameSeal,
    ...rest
  } = frame;

  return (
    frame.version ===
      COGNITION_KERNEL_VERSION &&
    frame.integrity
      .oneGlobalEntity &&
    hash(rest) ===
      frameSeal
  );
}