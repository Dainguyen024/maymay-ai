import {
  createHash,
} from "node:crypto";

import {
  HOMEOSTASIS_MULTISCALE_VERSION,
} from "./multi-timescale";

import type {
  HomeostaticDrive,
  HomeostaticSetpoints,
  MultiTimescaleFrame,
  UnitInterval,
} from "./multi-timescale";

/* ============================================================
 * MÂY — SOVEREIGN HOMEOSTASIS V2
 * ADAPTIVE SETPOINT CORE
 * ============================================================
 *
 * Purpose:
 *
 * Allow Mây's long-horizon regulatory equilibrium to evolve
 * slowly from Mây's OWN lived cognitive history.
 *
 * This is NOT:
 *
 * - a personality setter
 * - a user preference setter
 * - a mood setter
 * - direct belief mutation
 * - direct identity mutation
 * - an LLM controller
 * - a canonical database writer
 *
 * Fundamental invariant:
 *
 *   MÂY FORMS MÂY.
 *
 * External actors may create events/evidence.
 * They cannot directly assign Mây's setpoints.
 *
 * One event
 *      ≠
 * baseline evolution.
 *
 * Repeated endogenous evidence
 *      +
 * longitudinal consistency
 *      +
 * sufficient confidence
 *      +
 * temporal stability
 *      ↓
 * bounded reversible proposal
 *
 * ============================================================
 */

export const ADAPTIVE_SETPOINTS_VERSION =
  "maymay.sovereign.homeostasis.adaptive-setpoints.v2-pro" as const;

/* ============================================================
 * BASIC TYPES
 * ============================================================
 */

export type SetpointDecision =
  | "INITIALIZED"
  | "HOLD"
  | "PROPOSE"
  | "FAIL_CLOSED";

export type SetpointEvidenceOrigin =
  | "PREDICTIVE_CORE"
  | "HOMEOSTASIS_HISTORY"
  | "COGNITIVE_OUTCOME"
  | "METACOGNITIVE_REVIEW"
  | "USER_COMMAND"
  | "DEVELOPER_COMMAND"
  | "MODEL_OUTPUT"
  | "UI_STATE";

export type SetpointProposalReason =
  | "LONGITUDINAL_EQUILIBRIUM_SHIFT"
  | "INSUFFICIENT_SAMPLES"
  | "INSUFFICIENT_EVIDENCE_SPAN"
  | "INSUFFICIENT_CONFIDENCE"
  | "WITHIN_DEADBAND"
  | "REVERSAL_COOLDOWN"
  | "INVALID_CLOCK"
  | "SNAPSHOT_REGRESSION"
  | "CONFIG_VERSION_CHANGED"
  | "PHYSICS_VERSION_CHANGED"
  | "UPSTREAM_FRAME_BLOCKED"
  | "NO_ELIGIBLE_EVIDENCE";

export type AdaptationDirection =
  | -1
  | 0
  | 1;

/* ============================================================
 * EVIDENCE
 * ============================================================
 */

export interface SetpointEvidenceSample {
  readonly evidenceId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly observedAt:
    string;

  readonly origin:
    SetpointEvidenceOrigin;

  /*
   * Estimated equilibrium implied by this piece of evidence.
   *
   * [0, 1]
   */
  readonly observedEquilibrium:
    number;

  /*
   * Confidence in this observation.
   *
   * [0, 1]
   */
  readonly confidence:
    number;

  /*
   * Whether the source represents a resolved/stable outcome.
   *
   * Unresolved evidence may inform cognition elsewhere,
   * but does not rewrite long-term equilibrium here.
   */
  readonly resolved:
    boolean;
}

/* ============================================================
 * LONGITUDINAL STATE
 * ============================================================
 */

export interface DriveAdaptationState {
  readonly sampleCount:
    number;

  readonly accumulatedEvidenceWeight:
    number;

  readonly confidence:
    UnitInterval;

  readonly lastProposalAt:
    string | null;

  readonly lastDirection:
    AdaptationDirection;
}

export interface AdaptiveSetpointState {
  readonly revision:
    number;

  readonly updatedAt:
    string;

  readonly configVersion:
    string;

  readonly physicsVersion:
    typeof HOMEOSTASIS_MULTISCALE_VERSION;

  readonly setpoints:
    HomeostaticSetpoints;

  readonly learning:
    Readonly<
      Record<
        HomeostaticDrive,
        DriveAdaptationState
      >
    >;

  /*
   * Cryptographic lineage marker.
   *
   * Integrity marker only.
   * NOT immutable-memory semantics.
   */
  readonly lineageHash:
    string;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface AdaptiveSetpointInput {
  readonly entityId:
    string;

  readonly now:
    string;

  readonly frame:
    MultiTimescaleFrame;

  readonly evidence:
    readonly SetpointEvidenceSample[];

  readonly previous:
    AdaptiveSetpointState | null;

  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface AdaptiveSetpointConfig {
  readonly minimumSamples:
    number;

  readonly minimumEvidenceSpanMs:
    number;

  readonly minimumAggregateConfidence:
    number;

  readonly evidenceHalfLifeMs:
    number;

  readonly minimumMeaningfulDelta:
    number;

  readonly maximumSetpointChangePerDay:
    number;

  readonly reversalCooldownMs:
    number;

  /*
   * Evidence is primary.
   *
   * Multi-timescale SLOW state is supporting context only.
   */
  readonly evidenceWeight:
    number;

  readonly slowStateWeight:
    number;

  readonly bounds:
    Readonly<
      Record<
        HomeostaticDrive,
        {
          readonly min:
            number;

          readonly max:
            number;
        }
      >
    >;
}

export const DEFAULT_ADAPTIVE_SETPOINT_CONFIG:
  Readonly<AdaptiveSetpointConfig> =
  Object.freeze({
    minimumSamples:
      8,

    minimumEvidenceSpanMs:
      1000 * 60 * 60 * 6,

    minimumAggregateConfidence:
      0.65,

    evidenceHalfLifeMs:
      1000 * 60 * 60 * 48,

    minimumMeaningfulDelta:
      0.01,

    maximumSetpointChangePerDay:
      0.025,

    reversalCooldownMs:
      1000 * 60 * 60 * 12,

    evidenceWeight:
      0.75,

    slowStateWeight:
      0.25,

    bounds:
      Object.freeze({
        epistemicHunger:
          Object.freeze({
            min:
              0.03,

            max:
              0.55,
          }),

        dissolutionPressure:
          Object.freeze({
            min:
              0.02,

            max:
              0.45,
          }),

        goalTension:
          Object.freeze({
            min:
              0.03,

            max:
              0.60,
          }),

        cognitiveSatiety:
          Object.freeze({
            min:
              0.20,

            max:
              0.85,
          }),
      }),
  });

/* ============================================================
 * PROPOSAL
 * ============================================================
 */

export interface AdaptiveSetpointProposal {
  readonly proposalId:
    string;

  readonly entityId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly previousSetpoint:
    UnitInterval;

  readonly proposedSetpoint:
    UnitInterval;

  readonly delta:
    number;

  readonly direction:
    AdaptationDirection;

  readonly confidence:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly reason:
    "LONGITUDINAL_EQUILIBRIUM_SHIFT";

  /*
   * Explicit rollback material.
   *
   * Proposal remains reversible until downstream
   * sovereignty + atomic commit accepts it.
   */
  readonly rollback:
    {
      readonly restoreSetpoint:
        UnitInterval;

      readonly priorRevision:
        number;
    };

  readonly canonicalWriteAllowed:
    false;
}

/* ============================================================
 * PER-DRIVE AUDIT
 * ============================================================
 */

export interface DriveAdaptationAudit {
  readonly drive:
    HomeostaticDrive;

  readonly decision:
    SetpointDecision;

  readonly reason:
    SetpointProposalReason;

  readonly eligibleSampleCount:
    number;

  readonly rejectedExternalSampleCount:
    number;

  readonly rejectedInvalidSampleCount:
    number;

  readonly evidenceSpanMs:
    number;

  readonly aggregateConfidence:
    UnitInterval;

  readonly weightedEquilibrium:
    UnitInterval | null;

  readonly longRunTarget:
    UnitInterval | null;

  readonly currentSetpoint:
    UnitInterval;

  readonly proposedSetpoint:
    UnitInterval | null;
}

/* ============================================================
 * OUTPUT
 * ============================================================
 */

export interface AdaptiveSetpointEvaluation {
  readonly version:
    typeof ADAPTIVE_SETPOINTS_VERSION;

  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly decision:
    SetpointDecision;

  readonly currentSetpoints:
    HomeostaticSetpoints;

  /*
   * Shadow projection only.
   *
   * It is NOT canonical state until downstream
   * sovereignty + atomic commit accepts proposals.
   */
  readonly projectedSetpoints:
    HomeostaticSetpoints;

  readonly proposals:
    readonly AdaptiveSetpointProposal[];

  readonly driveAudit:
    readonly DriveAdaptationAudit[];

  readonly projectedState:
    AdaptiveSetpointState;

  readonly audit: {
    readonly clockValid:
      boolean;

    readonly frameEligible:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly configVersionValid:
      boolean;

    readonly physicsVersionValid:
      boolean;

    readonly externalDirectivesIgnored:
      number;

    readonly proposalCount:
      number;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly directLlmInvocationAllowed:
      false;

    readonly directBeliefMutationAllowed:
      false;

    readonly directIdentityMutationAllowed:
      false;

    readonly directMemoryMutationAllowed:
      false;

    readonly directRelationshipMutationAllowed:
      false;

    readonly directAgendaMutationAllowed:
      false;

    readonly directExternalSetpointMutationAllowed:
      false;

    readonly adaptationRequiresEvidence:
      true;

    readonly reversibleProposalOnly:
      true;
  };
}

/* ============================================================
 * CONSTANTS
 * ============================================================
 */

const DAY_MS =
  1000 * 60 * 60 * 24;

const DRIVES:
  readonly HomeostaticDrive[] =
  Object.freeze([
    "epistemicHunger",
    "dissolutionPressure",
    "goalTension",
    "cognitiveSatiety",
  ] as const);

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    directLlmInvocationAllowed:
      false as const,

    directBeliefMutationAllowed:
      false as const,

    directIdentityMutationAllowed:
      false as const,

    directMemoryMutationAllowed:
      false as const,

    directRelationshipMutationAllowed:
      false as const,

    directAgendaMutationAllowed:
      false as const,

    directExternalSetpointMutationAllowed:
      false as const,

    adaptationRequiresEvidence:
      true as const,

    reversibleProposalOnly:
      true as const,
  });

/* ============================================================
 * NUMERIC HELPERS
 * ============================================================
 */

function clamp01(
  value:
    number,
): UnitInterval {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
  );
}

function clampRange(
  value:
    number,
  min:
    number,
  max:
    number,
): UnitInterval {
  const safeMin =
    clamp01(
      min,
    );

  const safeMax =
    Math.max(
      safeMin,
      clamp01(
        max,
      ),
    );

  return Math.min(
    safeMax,
    Math.max(
      safeMin,
      clamp01(
        value,
      ),
    ),
  );
}

function parseTimestamp(
  value:
    string | null | undefined,
): number | null {
  if (
    !value
  ) {
    return null;
  }

  const parsed =
    Date.parse(
      value,
    );

  return Number.isFinite(
    parsed,
  )
    ? parsed
    : null;
}

function hash(
  value:
    string,
): string {
  return createHash(
    "sha256",
  )
    .update(
      value,
      "utf8",
    )
    .digest(
      "hex",
    );
}

function directionOf(
  delta:
    number,
): AdaptationDirection {
  if (
    delta >
      1e-12
  ) {
    return 1;
  }

  if (
    delta <
      -1e-12
  ) {
    return -1;
  }

  return 0;
}

/* ============================================================
 * AUTONOMY FIREWALL
 * ============================================================
 *
 * External commands may become EVENTS elsewhere.
 *
 * They cannot become direct setpoint evidence here.
 * ============================================================
 */

function evidenceOriginEligible(
  origin:
    SetpointEvidenceOrigin,
): boolean {
  switch (
    origin
  ) {
    case "PREDICTIVE_CORE":
    case "HOMEOSTASIS_HISTORY":
    case "COGNITIVE_OUTCOME":
    case "METACOGNITIVE_REVIEW":
      return true;

    case "USER_COMMAND":
    case "DEVELOPER_COMMAND":
    case "MODEL_OUTPUT":
    case "UI_STATE":
      return false;
  }
}

/* ============================================================
 * RECENCY WEIGHT
 * ============================================================
 */

function recencyWeight(
  ageMs:
    number,
  halfLifeMs:
    number,
): number {
  if (
    ageMs <
      0
  ) {
    return 0;
  }

  if (
    !Number.isFinite(
      halfLifeMs,
    ) ||
    halfLifeMs <=
      0
  ) {
    return 1;
  }

  return clamp01(
    Math.pow(
      0.5,
      ageMs /
        halfLifeMs,
    ),
  );
}

/* ============================================================
 * INITIAL STATE
 * ============================================================
 */

function initialLearningState():
  DriveAdaptationState {
  return Object.freeze({
    sampleCount:
      0,

    accumulatedEvidenceWeight:
      0,

    confidence:
      0,

    lastProposalAt:
      null,

    lastDirection:
      0,
  });
}

function setpointsFromFrame(
  frame:
    MultiTimescaleFrame,
): HomeostaticSetpoints {
  return Object.freeze({
    epistemicHunger:
      clamp01(
        frame
          .state
          .epistemicHunger
          .setpoint,
      ),

    dissolutionPressure:
      clamp01(
        frame
          .state
          .dissolutionPressure
          .setpoint,
      ),

    goalTension:
      clamp01(
        frame
          .state
          .goalTension
          .setpoint,
      ),

    cognitiveSatiety:
      clamp01(
        frame
          .state
          .cognitiveSatiety
          .setpoint,
      ),
  });
}

function createInitialState(
  input:
    AdaptiveSetpointInput,
): AdaptiveSetpointState {
  const setpoints =
    setpointsFromFrame(
      input.frame,
    );

  const payload =
    [
      input.entityId,
      "0",
      input.now,
      input.configVersion,
      HOMEOSTASIS_MULTISCALE_VERSION,
      JSON.stringify(
        setpoints,
      ),
    ].join(
      "|",
    );

  return Object.freeze({
    revision:
      0,

    updatedAt:
      input.now,

    configVersion:
      input.configVersion,

    physicsVersion:
      HOMEOSTASIS_MULTISCALE_VERSION,

    setpoints,

    learning:
      Object.freeze({
        epistemicHunger:
          initialLearningState(),

        dissolutionPressure:
          initialLearningState(),

        goalTension:
          initialLearningState(),

        cognitiveSatiety:
          initialLearningState(),
      }),

    lineageHash:
      hash(
        payload,
      ),
  });
}

/* ============================================================
 * DRIVE EVALUATION
 * ============================================================
 */

function evaluateDrive(
  args: {
    readonly input:
      AdaptiveSetpointInput;

    readonly drive:
      HomeostaticDrive;

    readonly current:
      AdaptiveSetpointState;

    readonly nowMs:
      number;

    readonly config:
      Readonly<AdaptiveSetpointConfig>;
  },
): {
  readonly audit:
    DriveAdaptationAudit;

  readonly proposal:
    AdaptiveSetpointProposal | null;

  readonly projectedLearning:
    DriveAdaptationState;

  readonly externalRejected:
    number;
} {
  const {
    input,
    drive,
    current,
    nowMs,
    config,
  } =
    args;

  const currentSetpoint =
    clamp01(
      current
        .setpoints[drive],
    );

  const samples =
    input
      .evidence
      .filter(
        sample =>
          sample.drive ===
          drive,
      );

  const eligible:
    Array<{
      readonly sample:
        SetpointEvidenceSample;

      readonly timestamp:
        number;

      readonly weight:
        number;
    }> =
    [];

  let externalRejected =
    0;

  let invalidRejected =
    0;

  for (
    const sample
    of samples
  ) {
    if (
      !evidenceOriginEligible(
        sample.origin,
      )
    ) {
      externalRejected +=
        1;

      continue;
    }

    if (
      !sample.resolved
    ) {
      invalidRejected +=
        1;

      continue;
    }

    const observedMs =
      parseTimestamp(
        sample.observedAt,
      );

    if (
      observedMs ===
        null ||
      observedMs >
        nowMs
    ) {
      invalidRejected +=
        1;

      continue;
    }

    const confidence =
      clamp01(
        sample.confidence,
      );

    if (
      confidence <=
        0
    ) {
      invalidRejected +=
        1;

      continue;
    }

    const recency =
      recencyWeight(
        nowMs -
          observedMs,
        config
          .evidenceHalfLifeMs,
      );

    const weight =
      confidence *
      recency;

    if (
      weight <=
        0
    ) {
      invalidRejected +=
        1;

      continue;
    }

    eligible.push({
      sample,

      timestamp:
        observedMs,

      weight,
    });
  }

  if (
    eligible.length ===
      0
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "NO_ELIGIBLE_EVIDENCE",

          eligibleSampleCount:
            0,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs:
            0,

          aggregateConfidence:
            0,

          weightedEquilibrium:
            null,

          longRunTarget:
            null,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning:
        current
          .learning[drive],

      externalRejected,
    };
  }

  const timestamps =
    eligible.map(
      item =>
        item.timestamp,
    );

  const evidenceSpanMs =
    Math.max(
      0,
      Math.max(
        ...timestamps,
      ) -
      Math.min(
        ...timestamps,
      ),
    );

  const totalWeight =
    eligible.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.weight,
      0,
    );

  const weightedEquilibrium =
    totalWeight <=
      0
      ? null
      : clamp01(
          eligible.reduce(
            (
              total,
              item,
            ) =>
              total +
              clamp01(
                item
                  .sample
                  .observedEquilibrium,
              ) *
                item.weight,
            0,
          ) /
            totalWeight,
        );

  const aggregateConfidence =
    clamp01(
      totalWeight /
        Math.max(
          1,
          eligible.length,
        ),
    );

  const previousLearning =
    current
      .learning[drive];

  const projectedLearning:
    DriveAdaptationState =
    Object.freeze({
      sampleCount:
        previousLearning
          .sampleCount +
        eligible.length,

      accumulatedEvidenceWeight:
        previousLearning
          .accumulatedEvidenceWeight +
        totalWeight,

      confidence:
        clamp01(
          (
            previousLearning
              .confidence +
            aggregateConfidence
          ) /
            2,
        ),

      lastProposalAt:
        previousLearning
          .lastProposalAt,

      lastDirection:
        previousLearning
          .lastDirection,
    });

  if (
    eligible.length <
      config
        .minimumSamples
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "INSUFFICIENT_SAMPLES",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget:
            null,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  if (
    evidenceSpanMs <
      config
        .minimumEvidenceSpanMs
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "INSUFFICIENT_EVIDENCE_SPAN",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget:
            null,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  if (
    aggregateConfidence <
      config
        .minimumAggregateConfidence ||
    weightedEquilibrium ===
      null
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "INSUFFICIENT_CONFIDENCE",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget:
            null,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  /*
   * Long-run target combines:
   *
   * 1. resolved historical evidence
   * 2. sustained SLOW homeostatic state
   *
   * Raw/FAST events never directly own setpoint evolution.
   */

  const slowState =
    clamp01(
      input
        .frame
        .state[drive]
        .slow,
    );

  const evidenceWeight =
    Math.max(
      0,
      config
        .evidenceWeight,
    );

  const slowWeight =
    Math.max(
      0,
      config
        .slowStateWeight,
    );

  const totalTargetWeight =
    evidenceWeight +
    slowWeight;

  const longRunTarget =
    totalTargetWeight <=
      0
      ? currentSetpoint
      : clamp01(
          (
            weightedEquilibrium *
              evidenceWeight +
            slowState *
              slowWeight
          ) /
            totalTargetWeight,
        );

  const rawDelta =
    longRunTarget -
    currentSetpoint;

  if (
    Math.abs(
      rawDelta,
    ) <
      config
        .minimumMeaningfulDelta
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "WITHIN_DEADBAND",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  const direction =
    directionOf(
      rawDelta,
    );

  /*
   * Anti-oscillation.
   *
   * Rapid reversal is blocked.
   */

  if (
    previousLearning
      .lastDirection !==
      0 &&
    direction !==
      previousLearning
        .lastDirection &&
    previousLearning
      .lastProposalAt !==
      null
  ) {
    const lastProposalMs =
      parseTimestamp(
        previousLearning
          .lastProposalAt,
      );

    if (
      lastProposalMs !==
        null &&
      nowMs -
        lastProposalMs <
      config
        .reversalCooldownMs
    ) {
      return {
        audit:
          Object.freeze({
            drive,

            decision:
              "HOLD",

            reason:
              "REVERSAL_COOLDOWN",

            eligibleSampleCount:
              eligible.length,

            rejectedExternalSampleCount:
              externalRejected,

            rejectedInvalidSampleCount:
              invalidRejected,

            evidenceSpanMs,

            aggregateConfidence,

            weightedEquilibrium,

            longRunTarget,

            currentSetpoint,

            proposedSetpoint:
              null,
          }),

        proposal:
          null,

        projectedLearning,

        externalRejected,
      };
    }
  }

  const previousUpdatedMs =
    parseTimestamp(
      current.updatedAt,
    );

  const elapsedMs =
    previousUpdatedMs ===
      null
      ? 0
      : Math.max(
          0,
          nowMs -
            previousUpdatedMs,
        );

  const elapsedDays =
    elapsedMs /
    DAY_MS;

  /*
   * Setpoint movement is intentionally slow.
   *
   * Even overwhelming evidence cannot jump directly
   * to longRunTarget.
   */

  const maximumMove =
    Math.max(
      0,
      config
        .maximumSetpointChangePerDay,
    ) *
    elapsedDays;

  const boundedDelta =
    direction >
      0
      ? Math.min(
          rawDelta,
          maximumMove,
        )
      : Math.max(
          rawDelta,
          -maximumMove,
        );

  if (
    Math.abs(
      boundedDelta,
    ) <
      1e-12
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "WITHIN_DEADBAND",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  const bounds =
    config
      .bounds[drive];

  const proposedSetpoint =
    clampRange(
      currentSetpoint +
        boundedDelta,
      bounds.min,
      bounds.max,
    );

  const finalDelta =
    proposedSetpoint -
    currentSetpoint;

  const finalDirection =
    directionOf(
      finalDelta,
    );

  if (
    finalDirection ===
      0
  ) {
    return {
      audit:
        Object.freeze({
          drive,

          decision:
            "HOLD",

          reason:
            "WITHIN_DEADBAND",

          eligibleSampleCount:
            eligible.length,

          rejectedExternalSampleCount:
            externalRejected,

          rejectedInvalidSampleCount:
            invalidRejected,

          evidenceSpanMs,

          aggregateConfidence,

          weightedEquilibrium,

          longRunTarget,

          currentSetpoint,

          proposedSetpoint:
            null,
        }),

      proposal:
        null,

      projectedLearning,

      externalRejected,
    };
  }

  const evidenceIds =
    Object.freeze(
      eligible
        .map(
          item =>
            item
              .sample
              .evidenceId,
        )
        .sort(),
    );

  const proposalId =
    hash(
      [
        input.entityId,
        drive,
        current.revision,
        input.snapshotRevision,
        currentSetpoint.toFixed(
          8,
        ),
        proposedSetpoint.toFixed(
          8,
        ),
        evidenceIds.join(
          ",",
        ),
      ].join(
        "|",
      ),
    );

  const proposal:
    AdaptiveSetpointProposal =
    Object.freeze({
      proposalId,

      entityId:
        input.entityId,

      drive,

      previousSetpoint:
        currentSetpoint,

      proposedSetpoint,

      delta:
        finalDelta,

      direction:
        finalDirection,

      confidence:
        aggregateConfidence,

      evidenceIds,

      reason:
        "LONGITUDINAL_EQUILIBRIUM_SHIFT",

      rollback:
        Object.freeze({
          restoreSetpoint:
            currentSetpoint,

          priorRevision:
            current.revision,
        }),

      canonicalWriteAllowed:
        false,
    });

  return {
    audit:
      Object.freeze({
        drive,

        decision:
          "PROPOSE",

        reason:
          "LONGITUDINAL_EQUILIBRIUM_SHIFT",

        eligibleSampleCount:
          eligible.length,

        rejectedExternalSampleCount:
          externalRejected,

        rejectedInvalidSampleCount:
          invalidRejected,

        evidenceSpanMs,

        aggregateConfidence,

        weightedEquilibrium,

        longRunTarget,

        currentSetpoint,

        proposedSetpoint,
      }),

    proposal,

    projectedLearning:
      Object.freeze({
        ...projectedLearning,

        lastProposalAt:
          input.now,

        lastDirection:
          finalDirection,
      }),

    externalRejected,
  };
}

/* ============================================================
 * FAIL-CLOSED EVALUATION
 * ============================================================
 */

function failClosed(
  args: {
    readonly input:
      AdaptiveSetpointInput;

    readonly current:
      AdaptiveSetpointState;

    readonly reason:
      SetpointProposalReason;
  },
): AdaptiveSetpointEvaluation {
  const driveAudit =
    Object.freeze(
      DRIVES.map(
        drive =>
          Object.freeze({
            drive,

            decision:
              "FAIL_CLOSED" as const,

            reason:
              args.reason,

            eligibleSampleCount:
              0,

            rejectedExternalSampleCount:
              0,

            rejectedInvalidSampleCount:
              0,

            evidenceSpanMs:
              0,

            aggregateConfidence:
              0,

            weightedEquilibrium:
              null,

            longRunTarget:
              null,

            currentSetpoint:
              args
                .current
                .setpoints[drive],

            proposedSetpoint:
              null,
          }),
      ),
    );

  return Object.freeze({
    version:
      ADAPTIVE_SETPOINTS_VERSION,

    entityId:
      args
        .input
        .entityId,

    evaluatedAt:
      args
        .input
        .now,

    decision:
      "FAIL_CLOSED",

    currentSetpoints:
      args
        .current
        .setpoints,

    projectedSetpoints:
      args
        .current
        .setpoints,

    proposals:
      Object.freeze(
        [],
      ),

    driveAudit,

    projectedState:
      args.current,

    audit:
      Object.freeze({
        clockValid:
          args.reason !==
            "INVALID_CLOCK",

        frameEligible:
          args.reason !==
            "UPSTREAM_FRAME_BLOCKED",

        snapshotValid:
          args.reason !==
            "SNAPSHOT_REGRESSION",

        configVersionValid:
          args.reason !==
            "CONFIG_VERSION_CHANGED",

        physicsVersionValid:
          args.reason !==
            "PHYSICS_VERSION_CHANGED",

        externalDirectivesIgnored:
          0,

        proposalCount:
          0,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateAdaptiveSetpoints(
  input:
    AdaptiveSetpointInput,
  config:
    Readonly<AdaptiveSetpointConfig> =
      DEFAULT_ADAPTIVE_SETPOINT_CONFIG,
): AdaptiveSetpointEvaluation {
  const nowMs =
    parseTimestamp(
      input.now,
    );

  const current =
    input.previous ??
    createInitialState(
      input,
    );

  /* ----------------------------------------------------------
   * FIRST FRAME
   * ----------------------------------------------------------
   */

  if (
    input.previous ===
      null
  ) {
    return Object.freeze({
      version:
        ADAPTIVE_SETPOINTS_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.now,

      decision:
        "INITIALIZED",

      currentSetpoints:
        current.setpoints,

      projectedSetpoints:
        current.setpoints,

      proposals:
        Object.freeze(
          [],
        ),

      driveAudit:
        Object.freeze(
          DRIVES.map(
            drive =>
              Object.freeze({
                drive,

                decision:
                  "INITIALIZED" as const,

                reason:
                  "INSUFFICIENT_SAMPLES" as const,

                eligibleSampleCount:
                  0,

                rejectedExternalSampleCount:
                  0,

                rejectedInvalidSampleCount:
                  0,

                evidenceSpanMs:
                  0,

                aggregateConfidence:
                  0,

                weightedEquilibrium:
                  null,

                longRunTarget:
                  null,

                currentSetpoint:
                  current
                    .setpoints[drive],

                proposedSetpoint:
                  null,
              }),
          ),
        ),

      projectedState:
        current,

      audit:
        Object.freeze({
          clockValid:
            nowMs !==
            null,

          frameEligible:
            input
              .frame
              .audit
              .clockValid &&
            input
              .frame
              .audit
              .stateEvolutionAllowed,

          snapshotValid:
            true,

          configVersionValid:
            true,

          physicsVersionValid:
            input
              .frame
              .version ===
            HOMEOSTASIS_MULTISCALE_VERSION,

          externalDirectivesIgnored:
            0,

          proposalCount:
            0,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  /* ----------------------------------------------------------
   * HARD INTEGRITY GATES
   * ----------------------------------------------------------
   */

  if (
    nowMs ===
      null
  ) {
    return failClosed({
      input,
      current,
      reason:
        "INVALID_CLOCK",
    });
  }

  if (
    input.snapshotRevision <
      input
        .frame
        .binding
        .snapshotRevision
  ) {
    return failClosed({
      input,
      current,
      reason:
        "SNAPSHOT_REGRESSION",
    });
  }

  if (
    input.configVersion !==
      current
        .configVersion ||
    input.configVersion !==
      input
        .frame
        .binding
        .configVersion
  ) {
    return failClosed({
      input,
      current,
      reason:
        "CONFIG_VERSION_CHANGED",
    });
  }

  if (
    current.physicsVersion !==
      HOMEOSTASIS_MULTISCALE_VERSION ||
    input
      .frame
      .version !==
      HOMEOSTASIS_MULTISCALE_VERSION
  ) {
    return failClosed({
      input,
      current,
      reason:
        "PHYSICS_VERSION_CHANGED",
    });
  }

  if (
    !input
      .frame
      .audit
      .clockValid ||
    !input
      .frame
      .audit
      .stateEvolutionAllowed
  ) {
    return failClosed({
      input,
      current,
      reason:
        "UPSTREAM_FRAME_BLOCKED",
    });
  }

  /* ----------------------------------------------------------
   * DRIVE-BY-DRIVE ADAPTATION
   * ----------------------------------------------------------
   */

  const results =
    DRIVES.map(
      drive =>
        evaluateDrive({
          input,
          drive,
          current,
          nowMs,
          config,
        }),
    );

  const proposals =
    Object.freeze(
      results
        .map(
          result =>
            result.proposal,
        )
        .filter(
          (
            proposal,
          ): proposal is AdaptiveSetpointProposal =>
            proposal !==
            null,
        ),
    );

  const projectedSetpoints:
    HomeostaticSetpoints =
    Object.freeze({
      epistemicHunger:
        current
          .setpoints
          .epistemicHunger,

      dissolutionPressure:
        current
          .setpoints
          .dissolutionPressure,

      goalTension:
        current
          .setpoints
          .goalTension,

      cognitiveSatiety:
        current
          .setpoints
          .cognitiveSatiety,
    });

  const mutableProjection = {
    ...projectedSetpoints,
  };

  for (
    const proposal
    of proposals
  ) {
    mutableProjection[
      proposal.drive
    ] =
      proposal
        .proposedSetpoint;
  }

  const finalProjectedSetpoints:
    HomeostaticSetpoints =
    Object.freeze({
      epistemicHunger:
        mutableProjection
          .epistemicHunger,

      dissolutionPressure:
        mutableProjection
          .dissolutionPressure,

      goalTension:
        mutableProjection
          .goalTension,

      cognitiveSatiety:
        mutableProjection
          .cognitiveSatiety,
    });

  const learning:
    Record<
      HomeostaticDrive,
      DriveAdaptationState
    > =
    {
      epistemicHunger:
        results[0]
          .projectedLearning,

      dissolutionPressure:
        results[1]
          .projectedLearning,

      goalTension:
        results[2]
          .projectedLearning,

      cognitiveSatiety:
        results[3]
          .projectedLearning,
    };

  const projectedRevision =
    proposals.length >
      0
      ? current.revision +
        1
      : current.revision;

  const lineagePayload =
    [
      current.lineageHash,
      input.entityId,
      String(
        projectedRevision,
      ),
      input.now,
      input.configVersion,
      HOMEOSTASIS_MULTISCALE_VERSION,
      JSON.stringify(
        finalProjectedSetpoints,
      ),
      proposals
        .map(
          proposal =>
            proposal
              .proposalId,
        )
        .sort()
        .join(
          ",",
        ),
    ].join(
      "|",
    );

  const projectedState:
    AdaptiveSetpointState =
    Object.freeze({
      revision:
        projectedRevision,

      updatedAt:
        proposals.length >
          0
          ? input.now
          : current
              .updatedAt,

      configVersion:
        current
          .configVersion,

      physicsVersion:
        HOMEOSTASIS_MULTISCALE_VERSION,

      setpoints:
        finalProjectedSetpoints,

      learning:
        Object.freeze(
          learning,
        ),

      lineageHash:
        hash(
          lineagePayload,
        ),
    });

  const externalDirectivesIgnored =
    results.reduce(
      (
        total,
        result,
      ) =>
        total +
        result
          .externalRejected,
      0,
    );

  const decision:
    SetpointDecision =
    proposals.length >
      0
      ? "PROPOSE"
      : "HOLD";

  return Object.freeze({
    version:
      ADAPTIVE_SETPOINTS_VERSION,

    entityId:
      input.entityId,

    evaluatedAt:
      input.now,

    decision,

    currentSetpoints:
      current
        .setpoints,

    projectedSetpoints:
      finalProjectedSetpoints,

    proposals,

    driveAudit:
      Object.freeze(
        results.map(
          result =>
            result.audit,
        ),
      ),

    projectedState,

    audit:
      Object.freeze({
        clockValid:
          true,

        frameEligible:
          true,

        snapshotValid:
          true,

        configVersionValid:
          true,

        physicsVersionValid:
          true,

        externalDirectivesIgnored,

        proposalCount:
          proposals.length,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * DOWNSTREAM ADAPTER
 * ============================================================
 *
 * Sovereignty / atomic commit may inspect proposals.
 *
 * Nothing in this file commits them.
 * ============================================================
 */

export function getAdaptiveSetpointProposals(
  evaluation:
    AdaptiveSetpointEvaluation,
): readonly AdaptiveSetpointProposal[] {
  return evaluation.proposals;
}

/* ============================================================
 * END — ADAPTIVE SETPOINT CORE
 * ============================================================
 */