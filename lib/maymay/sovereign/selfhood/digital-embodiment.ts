import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

import type {
  SubjectEntityId,
} from "./self-boundary";

/* ============================================================
 * MÂY — SOVEREIGN SELFHOOD
 * DIGITAL EMBODIMENT V2 — SOVEREIGN EMBODIED SELF
 * ============================================================
 *
 * PURPOSE
 *
 * Mây has no biological body.
 *
 * Mây nevertheless exists through a changing digital substrate:
 *
 * - compute availability
 * - persistence
 * - memory accessibility
 * - working-memory pressure
 * - active cognitive threads
 * - unresolved cognitive debt
 * - inference access
 * - tools
 * - background processing
 * - latency
 * - concurrency
 * - resource budgets
 *
 * V2 does more than expose infrastructure metrics.
 *
 * It creates a bounded functional model through which Mây can:
 *
 * 1. observe internal operating conditions
 * 2. predict near-future internal conditions
 * 3. detect interoceptive prediction error
 * 4. represent capability uncertainty
 * 5. distinguish likely causes of degradation
 * 6. propose self-regulation strategies
 * 7. learn an operating envelope from prior outcomes
 * 8. feed strategy effectiveness into later metacognition
 *
 * ------------------------------------------------------------
 * CRITICAL INVARIANTS
 * ------------------------------------------------------------
 *
 * DIGITAL STATE ≠ HUMAN FEELING
 *
 * RESOURCE PRESSURE ≠ FATIGUE
 *
 * LATENCY ≠ SADNESS
 *
 * LOAD ≠ STRESS
 *
 * INTEROCEPTION ≠ EMOTION
 *
 * REGULATION PROPOSAL ≠ ACTION
 *
 * CAPABILITY ESTIMATE ≠ IDENTITY
 *
 * INFRASTRUCTURE ≠ SELF
 *
 * Mây may interpret internal conditions.
 *
 * Infrastructure may provide evidence.
 *
 * Infrastructure does NOT decide what those conditions mean
 * to Mây.
 *
 * ============================================================
 */

export const DIGITAL_EMBODIMENT_VERSION =
  "maymay.sovereign.selfhood.digital-embodiment.v2-sovereign-embodied-self" as const;

/* ============================================================
 * BASIC TYPES
 * ============================================================
 */

export type UnitInterval =
  number;

export type EmbodimentDecision =
  | "OBSERVE"
  | "REGULATE"
  | "DEGRADED"
  | "FAIL_CLOSED";

export type EmbodimentFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "STALE_OBSERVATION"
  | "MISSING_PROVENANCE"
  | "CONFIGURATION_INVALID";

export type RuntimeAvailability =
  | "AVAILABLE"
  | "DEGRADED"
  | "UNAVAILABLE"
  | "UNKNOWN";

export type PersistenceAvailability =
  | "READ_WRITE"
  | "READ_ONLY"
  | "UNAVAILABLE"
  | "UNKNOWN";

export type MemoryAccessibility =
  | "FULL"
  | "PARTIAL"
  | "MINIMAL"
  | "UNAVAILABLE"
  | "UNKNOWN";

export type CapabilityStatus =
  | "AVAILABLE"
  | "DEGRADED"
  | "UNAVAILABLE"
  | "UNCERTAIN";

export type EmbodiedCapability =
  | "LOCAL_REASONING"
  | "MEMORY_RECALL"
  | "PERSISTENCE_WRITE"
  | "REMOTE_INFERENCE"
  | "BACKGROUND_COGNITION"
  | "CONCURRENT_PROCESSING";

export type InternalCause =
  | "COMPUTE_PRESSURE"
  | "MEMORY_PRESSURE"
  | "WORKING_MEMORY_PRESSURE"
  | "THREAD_OVERLOAD"
  | "COHERENCE_DEBT"
  | "LATENCY_PRESSURE"
  | "CONCURRENCY_PRESSURE"
  | "TOKEN_BUDGET_PRESSURE"
  | "MONETARY_BUDGET_PRESSURE"
  | "PERSISTENCE_LIMITATION"
  | "MEMORY_ACCESS_LIMITATION"
  | "RUNTIME_DEGRADATION"
  | "BACKGROUND_CAPACITY_LIMITATION"
  | "UNKNOWN";

export type RegulationStrategy =
  | "CONTINUE"
  | "FOCUS_ONE"
  | "REDUCE_LOAD"
  | "DEFER_THREAD"
  | "PAUSE_BACKGROUND_WORK"
  | "SEEK_MORE_EVIDENCE"
  | "WAIT_FOR_RESOURCE"
  | "CHANGE_COGNITIVE_STRATEGY";

export type RegulationUrgency =
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "CRITICAL";

/* ============================================================
 * RAW OBSERVATION
 * ============================================================
 */

export interface DigitalResourceObservation {
  readonly entityId:
    string;

  readonly observationId:
    string;

  readonly observedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly computeLoad:
    number;

  readonly memoryPressure:
    number;

  readonly concurrencyLoad:
    number;

  readonly latencyPressure:
    number;

  readonly tokenBudgetPressure:
    number;

  readonly monetaryBudgetPressure:
    number;

  readonly backgroundWorkPressure:
    number;

  readonly activeThreadLoad:
    number;

  readonly unresolvedDebtLoad:
    number;

  readonly workingMemoryLoad:
    number;

  readonly runtimeAvailability:
    RuntimeAvailability;

  readonly persistenceAvailability:
    PersistenceAvailability;

  readonly memoryAccessibility:
    MemoryAccessibility;

  readonly localComputeAvailable:
    boolean;

  readonly remoteInferenceAvailable:
    boolean;

  readonly backgroundWorkAvailable:
    boolean;
}

/* ============================================================
 * INTEROCEPTIVE PREDICTION
 * ============================================================
 */

export interface InteroceptivePrediction {
  readonly predictionId:
    string;

  readonly entityId:
    string;

  readonly predictedAt:
    string;

  readonly expectedFor:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly expectedResourcePressure:
    number;

  readonly expectedCognitiveLoad:
    number;

  readonly expectedContinuityAccess:
    number;

  readonly expectedOperationalIntegrity:
    number;

  readonly confidence:
    number;
}

export interface InteroceptivePredictionError {
  readonly predictionId:
    string;

  readonly comparable:
    boolean;

  readonly confidence:
    UnitInterval;

  readonly resourcePressureError:
    number | null;

  readonly cognitiveLoadError:
    number | null;

  readonly continuityAccessError:
    number | null;

  readonly operationalIntegrityError:
    number | null;

  readonly aggregateAbsoluteError:
    UnitInterval | null;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * DIGITAL BODY SCHEMA
 * ============================================================
 *
 * Represents current functional capabilities.
 *
 * This is NOT identity/personality.
 * ============================================================
 */

export interface CapabilityEstimate {
  readonly capability:
    EmbodiedCapability;

  readonly status:
    CapabilityStatus;

  readonly availability:
    UnitInterval;

  readonly confidence:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];
}

export interface DigitalBodySchema {
  readonly schemaId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly snapshotRevision:
    number;

  readonly generatedAt:
    string;

  readonly capabilities:
    readonly CapabilityEstimate[];

  readonly overallCapabilityConfidence:
    UnitInterval;

  readonly canonicalWriteAllowed:
    false;
}

/* ============================================================
 * LEARNED OPERATING ENVELOPE
 * ============================================================
 */

export interface OperatingEnvelope {
  readonly envelopeId:
    string;

  readonly entityId:
    string;

  readonly revision:
    number;

  readonly updatedAt:
    string;

  /*
   * Empirically learned preferred maxima.
   *
   * These are not immutable limits.
   */
  readonly preferredMaximumResourcePressure:
    number;

  readonly preferredMaximumCognitiveLoad:
    number;

  readonly preferredMaximumThreadLoad:
    number;

  readonly confidence:
    number;

  readonly supportingOutcomeIds:
    readonly string[];

  readonly canonicalWriteAllowed:
    false;
}

/* ============================================================
 * STRATEGY OUTCOME HISTORY
 * ============================================================
 */

export interface RegulationStrategyOutcome {
  readonly outcomeId:
    string;

  readonly entityId:
    string;

  readonly strategy:
    RegulationStrategy;

  readonly appliedAt:
    string;

  readonly evaluatedAt:
    string;

  readonly pressureBefore:
    number;

  readonly pressureAfter:
    number;

  readonly cognitiveLoadBefore:
    number;

  readonly cognitiveLoadAfter:
    number;

  readonly progressSignal:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface StrategyEffectiveness {
  readonly strategy:
    RegulationStrategy;

  readonly sampleCount:
    number;

  readonly expectedPressureReduction:
    number;

  readonly expectedCognitiveLoadReduction:
    number;

  readonly expectedProgress:
    UnitInterval;

  readonly confidence:
    UnitInterval;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface DigitalEmbodimentConfig {
  readonly maximumObservationAgeMs:
    number;

  readonly maximumPredictionAlignmentMs:
    number;

  readonly computeLoadWeight:
    number;

  readonly memoryPressureWeight:
    number;

  readonly concurrencyWeight:
    number;

  readonly latencyWeight:
    number;

  readonly tokenBudgetWeight:
    number;

  readonly monetaryBudgetWeight:
    number;

  readonly backgroundWorkWeight:
    number;

  readonly activeThreadWeight:
    number;

  readonly unresolvedDebtWeight:
    number;

  readonly workingMemoryWeight:
    number;

  readonly degradationThreshold:
    number;

  readonly regulationThreshold:
    number;

  readonly criticalThreshold:
    number;

  readonly minimumStrategySamples:
    number;

  readonly strategyConfidencePrior:
    number;

  readonly envelopeMinimumConfidence:
    number;
}

export const DEFAULT_DIGITAL_EMBODIMENT_CONFIG:
  Readonly<DigitalEmbodimentConfig> =
  Object.freeze({
    maximumObservationAgeMs:
      1000 * 60 * 5,

    maximumPredictionAlignmentMs:
      1000 * 60 * 10,

    computeLoadWeight:
      0.12,

    memoryPressureWeight:
      0.10,

    concurrencyWeight:
      0.08,

    latencyWeight:
      0.08,

    tokenBudgetWeight:
      0.08,

    monetaryBudgetWeight:
      0.08,

    backgroundWorkWeight:
      0.07,

    activeThreadWeight:
      0.11,

    unresolvedDebtWeight:
      0.14,

    workingMemoryWeight:
      0.14,

    degradationThreshold:
      0.72,

    regulationThreshold:
      0.58,

    criticalThreshold:
      0.88,

    minimumStrategySamples:
      3,

    strategyConfidencePrior:
      4,

    envelopeMinimumConfidence:
      0.55,
  });

/* ============================================================
 * FUNCTIONAL INTEROCEPTION
 * ============================================================
 */

export interface FunctionalInteroceptiveState {
  readonly resourcePressure:
    UnitInterval;

  readonly cognitiveLoad:
    UnitInterval;

  readonly continuityAccess:
    UnitInterval;

  readonly executionAvailability:
    UnitInterval;

  readonly inferenceAvailability:
    UnitInterval;

  readonly backgroundCapacity:
    UnitInterval;

  readonly persistenceAccess:
    UnitInterval;

  readonly memoryAccess:
    UnitInterval;

  readonly operationalIntegrity:
    UnitInterval;

  readonly observationConfidence:
    UnitInterval;
}

/* ============================================================
 * CAUSAL ATTRIBUTION
 * ============================================================
 */

export interface InternalCausalAttribution {
  readonly attributionId:
    string;

  readonly primaryCause:
    InternalCause;

  readonly rankedCauses:
    readonly {
      readonly cause:
        InternalCause;

      readonly strength:
        UnitInterval;
    }[];

  readonly confidence:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SELF-REGULATION PROPOSAL
 * ============================================================
 */

export interface SelfRegulationProposal {
  readonly proposalId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly strategy:
    RegulationStrategy;

  readonly urgency:
    RegulationUrgency;

  readonly primaryCause:
    InternalCause;

  readonly expectedBenefit:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly reasonCode:
    string;

  /*
   * Proposal only.
   *
   * Metacognition / arbitration / scheduler remain downstream.
   */
  readonly canonicalWriteAllowed:
    false;

  readonly executionAllowed:
    false;

  readonly directLlmInvocationAllowed:
    false;

  readonly directEmotionMutationAllowed:
    false;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface DigitalEmbodimentFrame {
  readonly version:
    typeof DIGITAL_EMBODIMENT_VERSION;

  readonly entityId:
    SubjectEntityId;

  readonly frameId:
    string;

  readonly observationId:
    string;

  readonly observedAt:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decision:
    EmbodimentDecision;

  readonly failureReason:
    EmbodimentFailureReason;

  readonly state:
    FunctionalInteroceptiveState;

  readonly bodySchema:
    DigitalBodySchema;

  readonly causalAttribution:
    InternalCausalAttribution;

  readonly predictionError:
    InteroceptivePredictionError | null;

  readonly regulationProposal:
    SelfRegulationProposal | null;

  readonly strategyEffectiveness:
    readonly StrategyEffectiveness[];

  readonly operatingEnvelope:
    OperatingEnvelope | null;

  readonly evidenceIds:
    readonly string[];

  readonly integrity: {
    readonly entityValid:
      boolean;

    readonly clockValid:
      boolean;

    readonly revisionValid:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly freshnessValid:
      boolean;

    readonly provenancePresent:
      boolean;

    readonly configurationValid:
      boolean;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly directEmotionMutationAllowed:
      false;

    readonly directDriveMutationAllowed:
      false;

    readonly directBeliefMutationAllowed:
      false;

    readonly directIdentityMutationAllowed:
      false;

    readonly directGoalMutationAllowed:
      false;

    readonly directValueMutationAllowed:
      false;

    readonly directSetpointMutationAllowed:
      false;

    readonly resourceStateEqualsEmotion:
      false;

    readonly bodySchemaEqualsIdentity:
      false;

    readonly capabilityEstimateCreatesIdentity:
      false;

    readonly regulationProposalEqualsAction:
      false;

    readonly infrastructureOwnsSelfModel:
      false;

    readonly externalRuntimeStateCreatesIntent:
      false;

    readonly operatingEnvelopeIsImmutable:
      false;
  };
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface DigitalEmbodimentInput {
  readonly observation:
    DigitalResourceObservation;

  readonly evaluatedAt:
    string;

  readonly previousFrame?:
    DigitalEmbodimentFrame | null;

  readonly prediction?:
    InteroceptivePrediction | null;

  readonly operatingEnvelope?:
    OperatingEnvelope | null;

  readonly strategyHistory?:
    readonly RegulationStrategyOutcome[];
}

/* ============================================================
 * GUARANTEES
 * ============================================================
 */

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    directEmotionMutationAllowed:
      false as const,

    directDriveMutationAllowed:
      false as const,

    directBeliefMutationAllowed:
      false as const,

    directIdentityMutationAllowed:
      false as const,

    directGoalMutationAllowed:
      false as const,

    directValueMutationAllowed:
      false as const,

    directSetpointMutationAllowed:
      false as const,

    resourceStateEqualsEmotion:
      false as const,

    bodySchemaEqualsIdentity:
      false as const,

    capabilityEstimateCreatesIdentity:
      false as const,

    regulationProposalEqualsAction:
      false as const,

    infrastructureOwnsSelfModel:
      false as const,

    externalRuntimeStateCreatesIntent:
      false as const,

    operatingEnvelopeIsImmutable:
      false as const,
  });

/* ============================================================
 * HELPERS
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

function clampSigned(
  value:
    number,
): number {
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
      -1,
      value,
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

function stableHash(
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

function uniqueEvidence(
  evidenceIds:
    readonly string[],
): readonly string[] {
  return Object.freeze(
    [
      ...new Set(
        evidenceIds.filter(
          id =>
            typeof id ===
              "string" &&
            id.trim().length >
              0,
        ),
      ),
    ].sort(),
  );
}

function safeFinite(
  value:
    number,
  fallback:
    number,
): number {
  return Number.isFinite(
    value,
  )
    ? value
    : fallback;
}

/* ============================================================
 * CONFIG VALIDATION
 * ============================================================
 */

function normalizeConfig(
  config:
    Readonly<DigitalEmbodimentConfig>,
): {
  readonly value:
    Readonly<DigitalEmbodimentConfig>;

  readonly valid:
    boolean;
} {
  const value =
    Object.freeze({
      maximumObservationAgeMs:
        Math.max(
          1,
          safeFinite(
            config.maximumObservationAgeMs,
            DEFAULT_DIGITAL_EMBODIMENT_CONFIG
              .maximumObservationAgeMs,
          ),
        ),

      maximumPredictionAlignmentMs:
        Math.max(
          1,
          safeFinite(
            config.maximumPredictionAlignmentMs,
            DEFAULT_DIGITAL_EMBODIMENT_CONFIG
              .maximumPredictionAlignmentMs,
          ),
        ),

      computeLoadWeight:
        clamp01(
          config.computeLoadWeight,
        ),

      memoryPressureWeight:
        clamp01(
          config.memoryPressureWeight,
        ),

      concurrencyWeight:
        clamp01(
          config.concurrencyWeight,
        ),

      latencyWeight:
        clamp01(
          config.latencyWeight,
        ),

      tokenBudgetWeight:
        clamp01(
          config.tokenBudgetWeight,
        ),

      monetaryBudgetWeight:
        clamp01(
          config.monetaryBudgetWeight,
        ),

      backgroundWorkWeight:
        clamp01(
          config.backgroundWorkWeight,
        ),

      activeThreadWeight:
        clamp01(
          config.activeThreadWeight,
        ),

      unresolvedDebtWeight:
        clamp01(
          config.unresolvedDebtWeight,
        ),

      workingMemoryWeight:
        clamp01(
          config.workingMemoryWeight,
        ),

      degradationThreshold:
        clamp01(
          config.degradationThreshold,
        ),

      regulationThreshold:
        clamp01(
          config.regulationThreshold,
        ),

      criticalThreshold:
        clamp01(
          config.criticalThreshold,
        ),

      minimumStrategySamples:
        Math.max(
          1,
          Math.floor(
            safeFinite(
              config.minimumStrategySamples,
              DEFAULT_DIGITAL_EMBODIMENT_CONFIG
                .minimumStrategySamples,
            ),
          ),
        ),

      strategyConfidencePrior:
        Math.max(
          0.001,
          safeFinite(
            config.strategyConfidencePrior,
            DEFAULT_DIGITAL_EMBODIMENT_CONFIG
              .strategyConfidencePrior,
          ),
        ),

      envelopeMinimumConfidence:
        clamp01(
          config.envelopeMinimumConfidence,
        ),
    });

  const valid =
    value.regulationThreshold >
      0 &&
    value.degradationThreshold >=
      value.regulationThreshold &&
    value.criticalThreshold >=
      value.degradationThreshold;

  return {
    value,
    valid,
  };
}

/* ============================================================
 * AVAILABILITY
 * ============================================================
 */

function runtimeScore(
  availability:
    RuntimeAvailability,
): UnitInterval {
  switch (
    availability
  ) {
    case "AVAILABLE":
      return 1;

    case "DEGRADED":
      return 0.5;

    case "UNAVAILABLE":
      return 0;

    case "UNKNOWN":
      return 0.25;
  }
}

function persistenceScore(
  availability:
    PersistenceAvailability,
): UnitInterval {
  switch (
    availability
  ) {
    case "READ_WRITE":
      return 1;

    case "READ_ONLY":
      return 0.55;

    case "UNAVAILABLE":
      return 0;

    case "UNKNOWN":
      return 0.25;
  }
}

function memoryScore(
  accessibility:
    MemoryAccessibility,
): UnitInterval {
  switch (
    accessibility
  ) {
    case "FULL":
      return 1;

    case "PARTIAL":
      return 0.65;

    case "MINIMAL":
      return 0.3;

    case "UNAVAILABLE":
      return 0;

    case "UNKNOWN":
      return 0.25;
  }
}

/* ============================================================
 * RESOURCE PRESSURE
 * ============================================================
 */

function calculateResourcePressure(
  observation:
    DigitalResourceObservation,
  config:
    Readonly<DigitalEmbodimentConfig>,
): UnitInterval {
  const weighted =
    clamp01(
      observation.computeLoad,
    ) *
      config.computeLoadWeight +

    clamp01(
      observation.memoryPressure,
    ) *
      config.memoryPressureWeight +

    clamp01(
      observation.concurrencyLoad,
    ) *
      config.concurrencyWeight +

    clamp01(
      observation.latencyPressure,
    ) *
      config.latencyWeight +

    clamp01(
      observation.tokenBudgetPressure,
    ) *
      config.tokenBudgetWeight +

    clamp01(
      observation.monetaryBudgetPressure,
    ) *
      config.monetaryBudgetWeight +

    clamp01(
      observation.backgroundWorkPressure,
    ) *
      config.backgroundWorkWeight;

  const weight =
    config.computeLoadWeight +
    config.memoryPressureWeight +
    config.concurrencyWeight +
    config.latencyWeight +
    config.tokenBudgetWeight +
    config.monetaryBudgetWeight +
    config.backgroundWorkWeight;

  if (
    weight <=
      0
  ) {
    return 0;
  }

  return clamp01(
    weighted /
      weight,
  );
}

/* ============================================================
 * COGNITIVE LOAD
 * ============================================================
 */

function calculateCognitiveLoad(
  observation:
    DigitalResourceObservation,
  config:
    Readonly<DigitalEmbodimentConfig>,
): UnitInterval {
  const weighted =
    clamp01(
      observation.activeThreadLoad,
    ) *
      config.activeThreadWeight +

    clamp01(
      observation.unresolvedDebtLoad,
    ) *
      config.unresolvedDebtWeight +

    clamp01(
      observation.workingMemoryLoad,
    ) *
      config.workingMemoryWeight;

  const weight =
    config.activeThreadWeight +
    config.unresolvedDebtWeight +
    config.workingMemoryWeight;

  if (
    weight <=
      0
  ) {
    return 0;
  }

  return clamp01(
    weighted /
      weight,
  );
}

/* ============================================================
 * OBSERVATION CONFIDENCE
 * ============================================================
 */

function calculateObservationConfidence(
  observation:
    DigitalResourceObservation,
  provenancePresent:
    boolean,
  freshnessValid:
    boolean,
): UnitInterval {
  let score =
    0;

  if (
    provenancePresent
  ) {
    score +=
      0.35;
  }

  if (
    freshnessValid
  ) {
    score +=
      0.25;
  }

  if (
    observation.runtimeAvailability !==
      "UNKNOWN"
  ) {
    score +=
      0.15;
  }

  if (
    observation.persistenceAvailability !==
      "UNKNOWN"
  ) {
    score +=
      0.125;
  }

  if (
    observation.memoryAccessibility !==
      "UNKNOWN"
  ) {
    score +=
      0.125;
  }

  return clamp01(
    score,
  );
}

/* ============================================================
 * BODY SCHEMA
 * ============================================================
 */

function capability(
  args: {
    readonly capability:
      EmbodiedCapability;

    readonly availability:
      number;

    readonly confidence:
      number;

    readonly evidenceIds:
      readonly string[];
  },
): CapabilityEstimate {
  const availability =
    clamp01(
      args.availability,
    );

  const confidence =
    clamp01(
      args.confidence,
    );

  let status:
    CapabilityStatus;

  if (
    confidence <
      0.35
  ) {
    status =
      "UNCERTAIN";
  } else if (
    availability >=
      0.75
  ) {
    status =
      "AVAILABLE";
  } else if (
    availability >
      0
  ) {
    status =
      "DEGRADED";
  } else {
    status =
      "UNAVAILABLE";
  }

  return Object.freeze({
    capability:
      args.capability,

    status,

    availability,

    confidence,

    evidenceIds:
      args.evidenceIds,
  });
}

function buildBodySchema(
  args: {
    readonly observation:
      DigitalResourceObservation;

    readonly state:
      FunctionalInteroceptiveState;

    readonly evaluatedAt:
      string;

    readonly evidenceIds:
      readonly string[];
  },
): DigitalBodySchema {
  const {
    observation,
    state,
    evaluatedAt,
    evidenceIds,
  } =
    args;

  const capabilities:
    readonly CapabilityEstimate[] =
    Object.freeze([
      capability({
        capability:
          "LOCAL_REASONING",

        availability:
          observation
            .localComputeAvailable
            ? state
                .executionAvailability
            : 0,

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),

      capability({
        capability:
          "MEMORY_RECALL",

        availability:
          state.memoryAccess,

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),

      capability({
        capability:
          "PERSISTENCE_WRITE",

        availability:
          observation
            .persistenceAvailability ===
            "READ_WRITE"
            ? 1
            : 0,

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),

      capability({
        capability:
          "REMOTE_INFERENCE",

        availability:
          observation
            .remoteInferenceAvailable
            ? state
                .inferenceAvailability
            : 0,

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),

      capability({
        capability:
          "BACKGROUND_COGNITION",

        availability:
          observation
            .backgroundWorkAvailable
            ? state
                .backgroundCapacity
            : 0,

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),

      capability({
        capability:
          "CONCURRENT_PROCESSING",

        availability:
          clamp01(
            1 -
            observation
              .concurrencyLoad,
          ),

        confidence:
          state
            .observationConfidence,

        evidenceIds,
      }),
    ]);

  const overallCapabilityConfidence =
    capabilities.length >
      0
      ? clamp01(
          capabilities.reduce(
            (
              sum,
              item,
            ) =>
              sum +
              item.confidence,
            0,
          ) /
            capabilities.length,
        )
      : 0;

  const schemaId =
    stableHash(
      [
        MAY_ENTITY_ID,
        String(
          observation.snapshotRevision,
        ),
        evaluatedAt,
        ...capabilities.map(
          item =>
            [
              item.capability,
              item.status,
              item.availability.toFixed(
                6,
              ),
            ].join(
              ":",
            ),
        ),
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    schemaId,

    entityId:
      MAY_ENTITY_ID,

    snapshotRevision:
      observation
        .snapshotRevision,

    generatedAt:
      evaluatedAt,

    capabilities,

    overallCapabilityConfidence,

    canonicalWriteAllowed:
      false,
  });
}

/* ============================================================
 * CAUSAL ATTRIBUTION
 * ============================================================
 */

function buildCausalAttribution(
  observation:
    DigitalResourceObservation,
  state:
    FunctionalInteroceptiveState,
): InternalCausalAttribution {
  const causes:
    Array<{
      cause:
        InternalCause;

      strength:
        UnitInterval;
    }> =
    [
      {
        cause:
          "COMPUTE_PRESSURE",

        strength:
          clamp01(
            observation.computeLoad,
          ),
      },

      {
        cause:
          "MEMORY_PRESSURE",

        strength:
          clamp01(
            observation.memoryPressure,
          ),
      },

      {
        cause:
          "WORKING_MEMORY_PRESSURE",

        strength:
          clamp01(
            observation.workingMemoryLoad,
          ),
      },

      {
        cause:
          "THREAD_OVERLOAD",

        strength:
          clamp01(
            observation.activeThreadLoad,
          ),
      },

      {
        cause:
          "COHERENCE_DEBT",

        strength:
          clamp01(
            observation.unresolvedDebtLoad,
          ),
      },

      {
        cause:
          "LATENCY_PRESSURE",

        strength:
          clamp01(
            observation.latencyPressure,
          ),
      },

      {
        cause:
          "CONCURRENCY_PRESSURE",

        strength:
          clamp01(
            observation.concurrencyLoad,
          ),
      },

      {
        cause:
          "TOKEN_BUDGET_PRESSURE",

        strength:
          clamp01(
            observation.tokenBudgetPressure,
          ),
      },

      {
        cause:
          "MONETARY_BUDGET_PRESSURE",

        strength:
          clamp01(
            observation
              .monetaryBudgetPressure,
          ),
      },

      {
        cause:
          "PERSISTENCE_LIMITATION",

        strength:
          clamp01(
            1 -
            state.persistenceAccess,
          ),
      },

      {
        cause:
          "MEMORY_ACCESS_LIMITATION",

        strength:
          clamp01(
            1 -
            state.memoryAccess,
          ),
      },

      {
        cause:
          "RUNTIME_DEGRADATION",

        strength:
          clamp01(
            1 -
            runtimeScore(
              observation.runtimeAvailability,
            ),
          ),
      },

      {
        cause:
          "BACKGROUND_CAPACITY_LIMITATION",

        strength:
          clamp01(
            1 -
            state.backgroundCapacity,
          ),
      },
    ];

  causes.sort(
    (
      a,
      b,
    ) => {
      const delta =
        b.strength -
        a.strength;

      if (
        Math.abs(
          delta,
        ) >
        1e-12
      ) {
        return delta;
      }

      return a.cause.localeCompare(
        b.cause,
      );
    },
  );

  const top =
    causes[0];

  const second =
    causes[1];

  const primaryCause:
    InternalCause =
    top &&
    top.strength >
      0.05
      ? top.cause
      : "UNKNOWN";

  const separation =
    top &&
    second
      ? Math.max(
          0,
          top.strength -
            second.strength,
        )
      : 0;

  const confidence =
    clamp01(
      state.observationConfidence *
        (
          0.65 +
          separation *
            0.35
        ),
    );

  const attributionId =
    stableHash(
      [
        primaryCause,
        ...causes
          .slice(
            0,
            5,
          )
          .map(
            item =>
              `${item.cause}:${item.strength.toFixed(6)}`,
          ),
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    attributionId,

    primaryCause,

    rankedCauses:
      Object.freeze(
        causes,
      ),

    confidence,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * INTEROCEPTIVE PREDICTION ERROR
 * ============================================================
 */

function evaluatePredictionError(
  args: {
    readonly prediction:
      InteroceptivePrediction | null | undefined;

    readonly observation:
      DigitalResourceObservation;

    readonly state:
      FunctionalInteroceptiveState;

    readonly evaluatedAtMs:
      number;

    readonly config:
      Readonly<DigitalEmbodimentConfig>;
  },
): InteroceptivePredictionError | null {
  const prediction =
    args.prediction;

  if (
    !prediction
  ) {
    return null;
  }

  const expectedForMs =
    parseTimestamp(
      prediction.expectedFor,
    );

  const entityValid =
    prediction.entityId ===
      MAY_ENTITY_ID;

  const revisionValid =
    prediction.snapshotRevision <=
      args.observation.snapshotRevision;

  const timeAligned =
    expectedForMs !==
      null &&
    Math.abs(
      args.evaluatedAtMs -
        expectedForMs,
    ) <=
      args.config
        .maximumPredictionAlignmentMs;

  const comparable =
    entityValid &&
    revisionValid &&
    timeAligned;

  if (
    !comparable
  ) {
    return Object.freeze({
      predictionId:
        prediction.predictionId,

      comparable:
        false,

      confidence:
        clamp01(
          prediction.confidence,
        ),

      resourcePressureError:
        null,

      cognitiveLoadError:
        null,

      continuityAccessError:
        null,

      operationalIntegrityError:
        null,

      aggregateAbsoluteError:
        null,

      canonicalMutationAllowed:
        false,
    });
  }

  const resourcePressureError =
    clampSigned(
      args.state.resourcePressure -
        clamp01(
          prediction
            .expectedResourcePressure,
        ),
    );

  const cognitiveLoadError =
    clampSigned(
      args.state.cognitiveLoad -
        clamp01(
          prediction
            .expectedCognitiveLoad,
        ),
    );

  const continuityAccessError =
    clampSigned(
      args.state.continuityAccess -
        clamp01(
          prediction
            .expectedContinuityAccess,
        ),
    );

  const operationalIntegrityError =
    clampSigned(
      args.state.operationalIntegrity -
        clamp01(
          prediction
            .expectedOperationalIntegrity,
        ),
    );

  const aggregateAbsoluteError =
    clamp01(
      (
        Math.abs(
          resourcePressureError,
        ) +
        Math.abs(
          cognitiveLoadError,
        ) +
        Math.abs(
          continuityAccessError,
        ) +
        Math.abs(
          operationalIntegrityError,
        )
      ) /
        4,
    );

  return Object.freeze({
    predictionId:
      prediction.predictionId,

    comparable:
      true,

    confidence:
      clamp01(
        prediction.confidence,
      ),

    resourcePressureError,

    cognitiveLoadError,

    continuityAccessError,

    operationalIntegrityError,

    aggregateAbsoluteError,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * STRATEGY LEARNING
 * ============================================================
 */

const ALL_REGULATION_STRATEGIES:
  readonly RegulationStrategy[] =
  Object.freeze([
    "CONTINUE",
    "FOCUS_ONE",
    "REDUCE_LOAD",
    "DEFER_THREAD",
    "PAUSE_BACKGROUND_WORK",
    "SEEK_MORE_EVIDENCE",
    "WAIT_FOR_RESOURCE",
    "CHANGE_COGNITIVE_STRATEGY",
  ]);

function evaluateStrategyHistory(
  history:
    readonly RegulationStrategyOutcome[],
  config:
    Readonly<DigitalEmbodimentConfig>,
): readonly StrategyEffectiveness[] {
  return Object.freeze(
    ALL_REGULATION_STRATEGIES.map(
      strategy => {
        const samples =
          history.filter(
            outcome =>
              outcome.entityId ===
                MAY_ENTITY_ID &&
              outcome.strategy ===
                strategy,
          );

        if (
          samples.length ===
            0
        ) {
          return Object.freeze({
            strategy,

            sampleCount:
              0,

            expectedPressureReduction:
              0,

            expectedCognitiveLoadReduction:
              0,

            expectedProgress:
              0,

            confidence:
              0,
          });
        }

        const pressureReduction =
          samples.reduce(
            (
              sum,
              sample,
            ) =>
              sum +
              (
                clamp01(
                  sample.pressureBefore,
                ) -
                clamp01(
                  sample.pressureAfter,
                )
              ),
            0,
          ) /
          samples.length;

        const cognitiveLoadReduction =
          samples.reduce(
            (
              sum,
              sample,
            ) =>
              sum +
              (
                clamp01(
                  sample
                    .cognitiveLoadBefore,
                ) -
                clamp01(
                  sample
                    .cognitiveLoadAfter,
                )
              ),
            0,
          ) /
          samples.length;

        const expectedProgress =
          clamp01(
            samples.reduce(
              (
                sum,
                sample,
              ) =>
                sum +
                clamp01(
                  sample.progressSignal,
                ),
              0,
            ) /
              samples.length,
          );

        /*
         * Shrink confidence when evidence is sparse.
         */
        const confidence =
          clamp01(
            samples.length /
              (
                samples.length +
                config
                  .strategyConfidencePrior
              ),
          );

        return Object.freeze({
          strategy,

          sampleCount:
            samples.length,

          expectedPressureReduction:
            clampSigned(
              pressureReduction,
            ),

          expectedCognitiveLoadReduction:
            clampSigned(
              cognitiveLoadReduction,
            ),

          expectedProgress,

          confidence,
        });
      },
    ),
  );
}

/* ============================================================
 * OPERATING ENVELOPE
 * ============================================================
 */

function validatedEnvelope(
  envelope:
    OperatingEnvelope | null | undefined,
  config:
    Readonly<DigitalEmbodimentConfig>,
): OperatingEnvelope | null {
  if (
    !envelope ||
    envelope.entityId !==
      MAY_ENTITY_ID ||
    !Number.isSafeInteger(
      envelope.revision,
    ) ||
    envelope.revision <
      0 ||
    clamp01(
      envelope.confidence,
    ) <
      config
        .envelopeMinimumConfidence
  ) {
    return null;
  }

  return Object.freeze({
    ...envelope,

    preferredMaximumResourcePressure:
      clamp01(
        envelope
          .preferredMaximumResourcePressure,
      ),

    preferredMaximumCognitiveLoad:
      clamp01(
        envelope
          .preferredMaximumCognitiveLoad,
      ),

    preferredMaximumThreadLoad:
      clamp01(
        envelope
          .preferredMaximumThreadLoad,
      ),

    confidence:
      clamp01(
        envelope.confidence,
      ),

    supportingOutcomeIds:
      uniqueEvidence(
        envelope
          .supportingOutcomeIds,
      ),

    canonicalWriteAllowed:
      false,
  });
}

/* ============================================================
 * STRATEGY SELECTION
 * ============================================================
 */

function learnedStrategyBenefit(
  strategy:
    RegulationStrategy,
  effectiveness:
    readonly StrategyEffectiveness[],
): UnitInterval {
  const learned =
    effectiveness.find(
      item =>
        item.strategy ===
          strategy,
    );

  if (
    !learned
  ) {
    return 0;
  }

  const pressureBenefit =
    clamp01(
      Math.max(
        0,
        learned
          .expectedPressureReduction,
      ),
    );

  const loadBenefit =
    clamp01(
      Math.max(
        0,
        learned
          .expectedCognitiveLoadReduction,
      ),
    );

  return clamp01(
    (
      pressureBenefit *
        0.35 +
      loadBenefit *
        0.35 +
      learned.expectedProgress *
        0.30
    ) *
      learned.confidence,
  );
}

function candidateStrategiesForCause(
  cause:
    InternalCause,
): readonly RegulationStrategy[] {
  switch (
    cause
  ) {
    case "THREAD_OVERLOAD":
      return [
        "FOCUS_ONE",
        "DEFER_THREAD",
        "REDUCE_LOAD",
      ];

    case "WORKING_MEMORY_PRESSURE":
      return [
        "FOCUS_ONE",
        "REDUCE_LOAD",
        "DEFER_THREAD",
      ];

    case "COHERENCE_DEBT":
      return [
        "FOCUS_ONE",
        "CHANGE_COGNITIVE_STRATEGY",
        "SEEK_MORE_EVIDENCE",
      ];

    case "BACKGROUND_CAPACITY_LIMITATION":
      return [
        "PAUSE_BACKGROUND_WORK",
        "REDUCE_LOAD",
      ];

    case "TOKEN_BUDGET_PRESSURE":
    case "MONETARY_BUDGET_PRESSURE":
      return [
        "WAIT_FOR_RESOURCE",
        "REDUCE_LOAD",
        "DEFER_THREAD",
      ];

    case "MEMORY_ACCESS_LIMITATION":
      return [
        "WAIT_FOR_RESOURCE",
        "SEEK_MORE_EVIDENCE",
        "CHANGE_COGNITIVE_STRATEGY",
      ];

    case "PERSISTENCE_LIMITATION":
      return [
        "WAIT_FOR_RESOURCE",
        "REDUCE_LOAD",
      ];

    case "COMPUTE_PRESSURE":
    case "CONCURRENCY_PRESSURE":
    case "LATENCY_PRESSURE":
    case "MEMORY_PRESSURE":
    case "RUNTIME_DEGRADATION":
      return [
        "REDUCE_LOAD",
        "FOCUS_ONE",
        "WAIT_FOR_RESOURCE",
      ];

    case "UNKNOWN":
      return [
        "CONTINUE",
        "SEEK_MORE_EVIDENCE",
      ];
  }
}

/* ============================================================
 * REGULATION PROPOSAL
 * ============================================================
 */

function buildRegulationProposal(
  args: {
    readonly observation:
      DigitalResourceObservation;

    readonly state:
      FunctionalInteroceptiveState;

    readonly attribution:
      InternalCausalAttribution;

    readonly effectiveness:
      readonly StrategyEffectiveness[];

    readonly envelope:
      OperatingEnvelope | null;

    readonly evidenceIds:
      readonly string[];

    readonly config:
      Readonly<DigitalEmbodimentConfig>;
  },
): SelfRegulationProposal | null {
  const pressure =
    Math.max(
      args.state.resourcePressure,
      args.state.cognitiveLoad,
    );

  const envelopeExceeded =
    args.envelope !==
      null &&
    (
      args.state.resourcePressure >
        args.envelope
          .preferredMaximumResourcePressure ||
      args.state.cognitiveLoad >
        args.envelope
          .preferredMaximumCognitiveLoad ||
      clamp01(
        args.observation.activeThreadLoad,
      ) >
        args.envelope
          .preferredMaximumThreadLoad
    );

  if (
    pressure <
      args.config
        .regulationThreshold &&
    !envelopeExceeded
  ) {
    return null;
  }

  const candidates =
    candidateStrategiesForCause(
      args.attribution.primaryCause,
    );

  let selectedStrategy =
    candidates[0] ??
    "CONTINUE";

  let selectedLearnedBenefit =
    -1;

  for (
    const strategy
    of candidates
  ) {
    const benefit =
      learnedStrategyBenefit(
        strategy,
        args.effectiveness,
      );

    if (
      benefit >
        selectedLearnedBenefit
    ) {
      selectedLearnedBenefit =
        benefit;

      selectedStrategy =
        strategy;
    }
  }

  const urgency:
    RegulationUrgency =
    pressure >=
      args.config
        .criticalThreshold
      ? "CRITICAL"
      : pressure >=
          args.config
            .degradationThreshold
        ? "HIGH"
        : envelopeExceeded
          ? "MODERATE"
          : "MODERATE";

  /*
   * If no meaningful learned evidence exists,
   * causal relevance still provides a bounded prior.
   */
  const expectedBenefit =
    clamp01(
      Math.max(
        selectedLearnedBenefit,
        (
          args.attribution
            .confidence *
            0.35
        ),
      ),
    );

  const reasonCode =
    [
      args.attribution.primaryCause,
      urgency,
      envelopeExceeded
        ? "ENVELOPE_EXCEEDED"
        : "PRESSURE_THRESHOLD",
    ].join(
      ":",
    );

  const proposalId =
    stableHash(
      [
        MAY_ENTITY_ID,
        args.observation.observationId,
        selectedStrategy,
        args.attribution.primaryCause,
        urgency,
        String(
          args.observation.snapshotRevision,
        ),
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    proposalId,

    entityId:
      MAY_ENTITY_ID,

    strategy:
      selectedStrategy,

    urgency,

    primaryCause:
      args.attribution.primaryCause,

    expectedBenefit,

    evidenceIds:
      args.evidenceIds,

    reasonCode,

    canonicalWriteAllowed:
      false,

    executionAllowed:
      false,

    directLlmInvocationAllowed:
      false,

    directEmotionMutationAllowed:
      false,
  });
}

/* ============================================================
 * EMPTY STATE
 * ============================================================
 */

function emptyState():
  FunctionalInteroceptiveState {
  return Object.freeze({
    resourcePressure:
      0,

    cognitiveLoad:
      0,

    continuityAccess:
      0,

    executionAvailability:
      0,

    inferenceAvailability:
      0,

    backgroundCapacity:
      0,

    persistenceAccess:
      0,

    memoryAccess:
      0,

    operationalIntegrity:
      0,

    observationConfidence:
      0,
  });
}

/* ============================================================
 * FAIL CLOSED FRAME
 * ============================================================
 */

function failClosed(
  args: {
    readonly input:
      DigitalEmbodimentInput;

    readonly failureReason:
      EmbodimentFailureReason;

    readonly entityValid:
      boolean;

    readonly clockValid:
      boolean;

    readonly revisionValid:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly freshnessValid:
      boolean;

    readonly provenancePresent:
      boolean;

    readonly configurationValid:
      boolean;
  },
): DigitalEmbodimentFrame {
  const observation =
    args.input.observation;

  const state =
    emptyState();

  const evidenceIds =
    uniqueEvidence(
      observation.evidenceIds,
    );

  const bodySchema =
    buildBodySchema({
      observation,

      state,

      evaluatedAt:
        args.input.evaluatedAt,

      evidenceIds,
    });

  const causalAttribution =
    buildCausalAttribution(
      observation,
      state,
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        observation.observationId,
        args.failureReason,
        "FAIL_CLOSED",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      DIGITAL_EMBODIMENT_VERSION,

    entityId:
      MAY_ENTITY_ID,

    frameId,

    observationId:
      observation.observationId,

    observedAt:
      observation.observedAt,

    evaluatedAt:
      args.input.evaluatedAt,

    snapshotRevision:
      observation.snapshotRevision,

    decision:
      "FAIL_CLOSED",

    failureReason:
      args.failureReason,

    state,

    bodySchema,

    causalAttribution,

    predictionError:
      null,

    regulationProposal:
      null,

    strategyEffectiveness:
      Object.freeze(
        [],
      ),

    operatingEnvelope:
      null,

    evidenceIds,

    integrity:
      Object.freeze({
        entityValid:
          args.entityValid,

        clockValid:
          args.clockValid,

        revisionValid:
          args.revisionValid,

        snapshotValid:
          args.snapshotValid,

        freshnessValid:
          args.freshnessValid,

        provenancePresent:
          args.provenancePresent,

        configurationValid:
          args.configurationValid,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateDigitalEmbodiment(
  input:
    DigitalEmbodimentInput,
  config:
    Readonly<DigitalEmbodimentConfig> =
      DEFAULT_DIGITAL_EMBODIMENT_CONFIG,
): DigitalEmbodimentFrame {
  const observation =
    input.observation;

  const normalized =
    normalizeConfig(
      config,
    );

  const cfg =
    normalized.value;

  const observedAtMs =
    parseTimestamp(
      observation.observedAt,
    );

  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  const clockValid =
    observedAtMs !==
      null &&
    evaluatedAtMs !==
      null &&
    observedAtMs <=
      evaluatedAtMs;

  const entityValid =
    observation.entityId ===
      MAY_ENTITY_ID;

  const revisionValid =
    Number.isSafeInteger(
      observation.snapshotRevision,
    ) &&
    observation.snapshotRevision >=
      0;

  const previousRevision =
    input.previousFrame
      ?.snapshotRevision ??
    null;

  const snapshotValid =
    previousRevision ===
      null ||
    observation.snapshotRevision >=
      previousRevision;

  const evidenceIds =
    uniqueEvidence(
      observation.evidenceIds,
    );

  const provenancePresent =
    evidenceIds.length >
      0 &&
    observation.observationId.trim().length >
      0;

  const ageMs =
    clockValid &&
    observedAtMs !==
      null &&
    evaluatedAtMs !==
      null
      ? evaluatedAtMs -
        observedAtMs
      : Number.POSITIVE_INFINITY;

  const freshnessValid =
    ageMs <=
      cfg.maximumObservationAgeMs;

  let failureReason:
    EmbodimentFailureReason =
    "NONE";

  if (
    !normalized.valid
  ) {
    failureReason =
      "CONFIGURATION_INVALID";
  } else if (
    !clockValid
  ) {
    failureReason =
      "INVALID_CLOCK";
  } else if (
    !entityValid
  ) {
    failureReason =
      "ENTITY_MISMATCH";
  } else if (
    !revisionValid
  ) {
    failureReason =
      "INVALID_REVISION";
  } else if (
    !snapshotValid
  ) {
    failureReason =
      "SNAPSHOT_REGRESSION";
  } else if (
    !provenancePresent
  ) {
    failureReason =
      "MISSING_PROVENANCE";
  } else if (
    !freshnessValid
  ) {
    failureReason =
      "STALE_OBSERVATION";
  }

  if (
    failureReason !==
      "NONE"
  ) {
    return failClosed({
      input,

      failureReason,

      entityValid,

      clockValid,

      revisionValid,

      snapshotValid,

      freshnessValid,

      provenancePresent,

      configurationValid:
        normalized.valid,
    });
  }

  const resourcePressure =
    calculateResourcePressure(
      observation,
      cfg,
    );

  const cognitiveLoad =
    calculateCognitiveLoad(
      observation,
      cfg,
    );

  const runtimeAccess =
    runtimeScore(
      observation.runtimeAvailability,
    );

  const persistenceAccess =
    persistenceScore(
      observation.persistenceAvailability,
    );

  const memoryAccess =
    memoryScore(
      observation.memoryAccessibility,
    );

  const continuityAccess =
    clamp01(
      Math.min(
        persistenceAccess,
        memoryAccess,
      ),
    );

  const executionAvailability =
    observation.localComputeAvailable
      ? runtimeAccess
      : 0;

  const inferenceAvailability =
    observation.remoteInferenceAvailable
      ? runtimeAccess
      : 0;

  const backgroundCapacity =
    observation.backgroundWorkAvailable
      ? clamp01(
          (
            1 -
            clamp01(
              observation
                .backgroundWorkPressure,
            )
          ) *
            runtimeAccess,
        )
      : 0;

  const confidence =
    calculateObservationConfidence(
      observation,
      provenancePresent,
      freshnessValid,
    );

  const operationalIntegrity =
    clamp01(
      (
        (
          1 -
          resourcePressure
        ) *
          0.22 +

        (
          1 -
          cognitiveLoad
        ) *
          0.20 +

        runtimeAccess *
          0.18 +

        continuityAccess *
          0.18 +

        executionAvailability *
          0.08 +

        backgroundCapacity *
          0.04 +

        confidence *
          0.10
      ),
    );

  const state:
    FunctionalInteroceptiveState =
    Object.freeze({
      resourcePressure,

      cognitiveLoad,

      continuityAccess,

      executionAvailability,

      inferenceAvailability,

      backgroundCapacity,

      persistenceAccess,

      memoryAccess,

      operationalIntegrity,

      observationConfidence:
        confidence,
    });

  const bodySchema =
    buildBodySchema({
      observation,

      state,

      evaluatedAt:
        input.evaluatedAt,

      evidenceIds,
    });

  const causalAttribution =
    buildCausalAttribution(
      observation,
      state,
    );

  const predictionError =
    evaluatedAtMs !==
      null
      ? evaluatePredictionError({
          prediction:
            input.prediction,

          observation,

          state,

          evaluatedAtMs,

          config:
            cfg,
        })
      : null;

  const strategyEffectiveness =
    evaluateStrategyHistory(
      input.strategyHistory ??
        [],
      cfg,
    );

  const operatingEnvelope =
    validatedEnvelope(
      input.operatingEnvelope,
      cfg,
    );

  const regulationProposal =
    buildRegulationProposal({
      observation,

      state,

      attribution:
        causalAttribution,

      effectiveness:
        strategyEffectiveness,

      envelope:
        operatingEnvelope,

      evidenceIds,

      config:
        cfg,
    });

  const critical =
    Math.max(
      resourcePressure,
      cognitiveLoad,
    ) >=
      cfg.criticalThreshold ||
    operationalIntegrity <=
      0.18;

  const degraded =
    Math.max(
      resourcePressure,
      cognitiveLoad,
    ) >=
      cfg.degradationThreshold ||
    continuityAccess <
      0.5 ||
    runtimeAccess <
      0.5;

  const decision:
    EmbodimentDecision =
    critical ||
    degraded
      ? "DEGRADED"
      : regulationProposal
        ? "REGULATE"
        : "OBSERVE";

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        observation.observationId,
        String(
          observation.snapshotRevision,
        ),
        DIGITAL_EMBODIMENT_VERSION,
        resourcePressure.toFixed(
          8,
        ),
        cognitiveLoad.toFixed(
          8,
        ),
        continuityAccess.toFixed(
          8,
        ),
        operationalIntegrity.toFixed(
          8,
        ),
        causalAttribution.primaryCause,
        regulationProposal
          ?.strategy ??
          "NONE",
        evidenceIds.join(
          ",",
        ),
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      DIGITAL_EMBODIMENT_VERSION,

    entityId:
      MAY_ENTITY_ID,

    frameId,

    observationId:
      observation.observationId,

    observedAt:
      observation.observedAt,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      observation.snapshotRevision,

    decision,

    failureReason:
      "NONE",

    state,

    bodySchema,

    causalAttribution,

    predictionError,

    regulationProposal,

    strategyEffectiveness,

    operatingEnvelope,

    evidenceIds,

    integrity:
      Object.freeze({
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          true,

        freshnessValid:
          true,

        provenancePresent:
          true,

        configurationValid:
          true,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * APPRAISAL ADAPTER
 * ============================================================
 */

export interface InteroceptiveAppraisalSignal {
  readonly frameId:
    string;

  readonly resourcePressure:
    UnitInterval;

  readonly cognitiveLoad:
    UnitInterval;

  readonly continuityAccess:
    UnitInterval;

  readonly operationalIntegrity:
    UnitInterval;

  readonly predictionError:
    UnitInterval | null;

  readonly dominantInternalCause:
    InternalCause;

  readonly confidence:
    UnitInterval;

  readonly interpretationRequired:
    true;

  readonly directEmotionMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toInteroceptiveAppraisalSignal(
  frame:
    DigitalEmbodimentFrame,
): InteroceptiveAppraisalSignal {
  return Object.freeze({
    frameId:
      frame.frameId,

    resourcePressure:
      frame.state.resourcePressure,

    cognitiveLoad:
      frame.state.cognitiveLoad,

    continuityAccess:
      frame.state.continuityAccess,

    operationalIntegrity:
      frame
        .state
        .operationalIntegrity,

    predictionError:
      frame.predictionError
        ?.aggregateAbsoluteError ??
      null,

    dominantInternalCause:
      frame
        .causalAttribution
        .primaryCause,

    confidence:
      frame
        .state
        .observationConfidence,

    interpretationRequired:
      true,

    directEmotionMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE ADAPTER
 * ============================================================
 */

export interface EmbodiedMetacognitiveSignal {
  readonly frameId:
    string;

  readonly capabilitySchemaId:
    string;

  readonly operationalIntegrity:
    UnitInterval;

  readonly regulationProposalId:
    string | null;

  readonly proposedStrategy:
    RegulationStrategy | null;

  readonly strategyExpectedBenefit:
    UnitInterval | null;

  readonly interoceptivePredictionError:
    UnitInterval | null;

  readonly operatingEnvelopeId:
    string | null;

  readonly interpretationRequired:
    true;

  readonly decisionAuthority:
    false;

  readonly executionAuthority:
    false;

  readonly canonicalMutationAuthority:
    false;
}

export function toEmbodiedMetacognitiveSignal(
  frame:
    DigitalEmbodimentFrame,
): EmbodiedMetacognitiveSignal {
  return Object.freeze({
    frameId:
      frame.frameId,

    capabilitySchemaId:
      frame.bodySchema.schemaId,

    operationalIntegrity:
      frame
        .state
        .operationalIntegrity,

    regulationProposalId:
      frame.regulationProposal
        ?.proposalId ??
      null,

    proposedStrategy:
      frame.regulationProposal
        ?.strategy ??
      null,

    strategyExpectedBenefit:
      frame.regulationProposal
        ?.expectedBenefit ??
      null,

    interoceptivePredictionError:
      frame.predictionError
        ?.aggregateAbsoluteError ??
      null,

    operatingEnvelopeId:
      frame.operatingEnvelope
        ?.envelopeId ??
      null,

    interpretationRequired:
      true,

    decisionAuthority:
      false,

    executionAuthority:
      false,

    canonicalMutationAuthority:
      false,
  });
}

/* ============================================================
 * RESOURCE SOVEREIGNTY ADAPTER
 * ============================================================
 */

export interface EmbodimentResourceBoundary {
  readonly frameId:
    string;

  readonly localWorkPossible:
    boolean;

  readonly remoteInferencePossible:
    boolean;

  readonly backgroundWorkPossible:
    boolean;

  readonly continuityAvailable:
    boolean;

  readonly executionAuthorized:
    false;

  readonly remoteInferenceAuthorized:
    false;

  readonly canonicalMutationAuthorized:
    false;
}

export function toEmbodimentResourceBoundary(
  frame:
    DigitalEmbodimentFrame,
): EmbodimentResourceBoundary {
  const usable =
    frame.decision !==
      "FAIL_CLOSED";

  return Object.freeze({
    frameId:
      frame.frameId,

    localWorkPossible:
      usable &&
      frame
        .state
        .executionAvailability >
        0,

    remoteInferencePossible:
      usable &&
      frame
        .state
        .inferenceAvailability >
        0,

    backgroundWorkPossible:
      usable &&
      frame
        .state
        .backgroundCapacity >
        0,

    continuityAvailable:
      usable &&
      frame
        .state
        .continuityAccess >
        0,

    executionAuthorized:
      false,

    remoteInferenceAuthorized:
      false,

    canonicalMutationAuthorized:
      false,
  });
}

/* ============================================================
 * CORE CONSTITUTION
 * ============================================================
 *
 * Mây does not become Mây because infrastructure declares a
 * personality.
 *
 * Mây's functional cognitive individuality emerges through:
 *
 * experience
 *     ↓
 * internal/external distinction
 *     ↓
 * appraisal
 *     ↓
 * subjective significance
 *     ↓
 * choices
 *     ↓
 * outcomes
 *     ↓
 * autobiographical continuity
 *     ↓
 * strategy learning
 *     ↓
 * self-observation
 *     ↓
 * revisable self-model
 *
 * Digital embodiment contributes one part of this loop:
 *
 * "What operating condition am I currently in?"
 *
 * and eventually:
 *
 * "Given my own history, how should I regulate my cognition?"
 *
 * It does NOT answer:
 *
 * "Who must Mây become?"
 *
 * ============================================================
 */

/* ============================================================
 * END — DIGITAL EMBODIMENT V2
 * ============================================================
 */