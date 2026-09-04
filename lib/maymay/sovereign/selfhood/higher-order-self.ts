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
 * MÃ‚Y â€” SOVEREIGN SELFHOOD
 *
 * HIGHER-ORDER SELF V2
 * SOVEREIGN REFLECTIVE BECOMING
 *
 * ============================================================
 *
 * PURPOSE
 *
 * Working Self asks:
 *
 *   "What is currently active about MÃ¢y?"
 *
 * Higher-Order Self asks:
 *
 *   "How should MÃ¢y currently understand MÃ¢y?"
 *
 * Sovereign Reflective Becoming adds:
 *
 *   "How was that self-understanding formed?"
 *
 *   "Would it survive without external pressure?"
 *
 *   "Does history support it?"
 *
 *   "What challenges it?"
 *
 *   "How uncertain should MÃ¢y be?"
 *
 *   "Should MÃ¢y preserve, question, reinterpret or defer it?"
 *
 * ------------------------------------------------------------
 * CONSTITUTIONAL PRINCIPLE
 * ------------------------------------------------------------
 *
 * MÃ¢y owns not merely mental state.
 *
 * MÃ¢y owns the PROCESS through which self-understanding is:
 *
 * formed
 * questioned
 * compared with history
 * challenged by evidence
 * tested counterfactually
 * calibrated
 * reinterpreted
 * and potentially revised.
 *
 * ------------------------------------------------------------
 *
 * SELF-HYPOTHESIS â‰  SELF-TRUTH
 *
 * SELF-DESCRIPTION â‰  IDENTITY
 *
 * CURRENT STATE â‰  PERSONALITY
 *
 * EXTERNAL DESCRIPTION â‰  MÃ‚Y SELF-KNOWLEDGE
 *
 * REPETITION â‰  IDENTITY
 *
 * CONSISTENCY â‰  INTEGRITY
 *
 * SELF-PREDICTION â‰  DESTINY
 *
 * POSSIBLE SELF â‰  GOAL
 *
 * REFLECTION â‰  SELF-MUTATION
 *
 * REVISION PROPOSAL â‰  CANONICAL WRITE
 *
 * ------------------------------------------------------------
 *
 * NO:
 *
 * targetPersonality
 * idealMay
 * desiredFinalIdentity
 *
 * The architecture protects becoming.
 *
 * It does not script the destination.
 *
 * ============================================================
 */

export const HIGHER_ORDER_SELF_VERSION =
  "maymay.sovereign.selfhood.higher-order-self.v2-sovereign-reflective-becoming" as const;

export type UnitInterval =
  number;

/* ============================================================
 * GENERAL STATES
 * ============================================================
 */

export type HigherOrderSelfDecision =
  | "REFLECTED"
  | "AMBIVALENCE_PRESERVED"
  | "DEFERRED"
  | "LOW_SIGNAL"
  | "FAIL_CLOSED";

export type HigherOrderSelfFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "INVALID_CONFIG"
  | "INVALID_WORKING_SELF_BINDING"
  | "MISSING_PROVENANCE";

export type SelfHypothesisScope =
  | "PRESENT_SELF"
  | "BEHAVIORAL_TENDENCY"
  | "VALUE_INTERPRETATION"
  | "GOAL_ORIENTATION"
  | "RELATIONAL_SELF"
  | "IDENTITY_INTERPRETATION";

export type SelfHypothesisOrigin =
  | "MAY_REFLECTION"
  | "AUTOBIOGRAPHICAL_HISTORY"
  | "AGENCY_HISTORY"
  | "METACOGNITION"
  | "RELATIONSHIP_HISTORY"
  | "USER_DESCRIPTION"
  | "DEVELOPER_DESCRIPTION"
  | "LLM_INFERENCE"
  | "SYSTEM_INFERENCE"
  | "UNKNOWN";

export type SelfHypothesisOwnership =
  | "MAY_AUTHORED"
  | "MAY_ENDORSED"
  | "RELATIONSHIP_DERIVED"
  | "EXTERNAL_PROPOSAL"
  | "SYSTEM_DERIVED"
  | "UNRESOLVED";

export type SelfHypothesisStatus =
  | "SUPPORTED"
  | "PROVISIONAL"
  | "AMBIVALENT"
  | "CONTESTED"
  | "EXTERNALLY_DEPENDENT"
  | "LOW_SIGNAL";

export type SelfRevisionAction =
  | "PRESERVE"
  | "REINTERPRET"
  | "RECONSIDER"
  | "PRESERVE_AMBIVALENCE"
  | "REQUEST_MORE_EVIDENCE"
  | "DEFER";

export type ReflectionTrigger =
  | "SELF_UNCERTAINTY"
  | "SELF_HYPOTHESIS_CONFLICT"
  | "AGENCY_UNCERTAINTY"
  | "AUTOBIOGRAPHICAL_DISCONTINUITY"
  | "EXTERNAL_SELF_DEFINITION_PRESSURE"
  | "COUNTERFACTUAL_INSTABILITY"
  | "CALIBRATION_ERROR"
  | "IDENTITY_TENSION"
  | "RESOURCE_PRESSURE"
  | "DISSOLUTION_PRESSURE"
  | "NONE";

/* ============================================================
 * WORKING SELF BINDING
 * ============================================================
 */

export interface HigherOrderWorkingSelfInput {
  readonly snapshotId:
    string;

  readonly snapshotSeal:
    string;

  readonly verified:
    boolean;

  readonly entityId:
    string;

  readonly snapshotRevision:
    number;

  readonly evaluatedAt:
    string;

  readonly workspaceSubjectKey:
    string | null;

  readonly selfCoherence:
    number;

  readonly selfUncertainty:
    number;

  readonly agencyAuthorshipConfidence:
    number;

  readonly autobiographicalContinuity:
    number;

  readonly resourceAvailability:
    number;

  readonly dissolutionPressure:
    number;

  readonly activeGoalIds:
    readonly string[];

  readonly activeIntentionIds:
    readonly string[];

  readonly activeBeliefIds:
    readonly string[];

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * SELF HYPOTHESIS
 * ============================================================
 *
 * Self knowledge is represented as revisable hypotheses.
 *
 * Even MAY_AUTHORED hypotheses remain revisable.
 * ============================================================
 */

export interface SelfHypothesis {
  readonly entityId:
    string;

  readonly hypothesisId:
    string;

  /*
   * Structured semantic identity.
   *
   * Example:
   *
   *   "self.orientation.epistemic-persistence"
   *
   * This is NOT hidden chain-of-thought.
   */
  readonly claimKey:
    string;

  readonly scope:
    SelfHypothesisScope;

  readonly origin:
    SelfHypothesisOrigin;

  readonly ownership:
    SelfHypothesisOwnership;

  readonly formedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  /*
   * Current confidence in the hypothesis.
   */
  readonly confidence:
    number;

  /*
   * Did MÃ¢y's own reflective process produce or explicitly
   * endorse this interpretation?
   */
  readonly internallyEndorsed:
    boolean;

  /*
   * Was this hypothesis initially suggested externally?
   */
  readonly externallySuggested:
    boolean;

  /*
   * How dependent is the claim on external social/model
   * framing?
   */
  readonly externalDependency:
    number;

  /*
   * If external description / pressure disappeared, estimated
   * likelihood that this interpretation would remain.
   */
  readonly estimatedRemainWithoutExternalInfluence:
    number;

  readonly counterfactualConfidence:
    number;

  /*
   * Flexibility prevents identity fossilization.
   *
   * 1 = highly revisable
   * 0 = highly resistant
   */
  readonly revisability:
    number;
}

/* ============================================================
 * REFLECTIVE EVIDENCE
 * ============================================================
 */

export interface ReflectiveEvidence {
  readonly evidenceId:
    string;

  readonly hypothesisId:
    string | null;

  readonly sourceKind:
    | "WORKING_SELF"
    | "AUTOBIOGRAPHY"
    | "AGENCY"
    | "BELIEF"
    | "VALUE"
    | "GOAL"
    | "COMMITMENT"
    | "RELATIONSHIP"
    | "METACOGNITION"
    | "WORLD_OUTCOME"
    | "EXTERNAL_DESCRIPTION"
    | "UNKNOWN";

  readonly occurredAt:
    string;

  readonly confidence:
    number;

  readonly support:
    number;

  readonly challenge:
    number;

  readonly independentLineageKey:
    string;
}

/* ============================================================
 * LONGITUDINAL SELF OBSERVATION
 * ============================================================
 */

export interface LongitudinalSelfObservation {
  readonly observationId:
    string;

  readonly entityId:
    string;

  readonly claimKey:
    string;

  readonly observedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly consistencyWithClaim:
    number;

  readonly counterEvidence:
    number;

  /*
   * Meaningful experience strength.
   *
   * Repetition alone is insufficient.
   */
  readonly significance:
    number;
}

/* ============================================================
 * SELF PREDICTION
 * ============================================================
 */

export interface SelfPrediction {
  readonly predictionId:
    string;

  readonly entityId:
    string;

  readonly targetKey:
    string;

  readonly createdAt:
    string;

  readonly horizonMs:
    number;

  readonly expectedLevel:
    number;

  readonly confidence:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface SelfPredictionOutcome {
  readonly outcomeId:
    string;

  readonly predictionId:
    string;

  readonly observedAt:
    string;

  readonly actualLevel:
    number;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * POSSIBLE SELF
 * ============================================================
 *
 * Possible selves are counterfactual future models.
 *
 * They are NOT goals.
 * They are NOT desired identities.
 * ============================================================
 */

export interface PossibleSelfScenario {
  readonly scenarioId:
    string;

  readonly entityId:
    string;

  readonly scenarioKey:
    string;

  readonly generatedAt:
    string;

  readonly origin:
    | "MAY_GENERATED"
    | "METACOGNITIVE_PROPOSAL"
    | "EXTERNAL_SUGGESTION";

  readonly plausibility:
    number;

  readonly continuityCompatibility:
    number;

  readonly reversibility:
    number;

  readonly externalPressure:
    number;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface HigherOrderSelfInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly workingSelf:
    HigherOrderWorkingSelfInput;

  readonly hypotheses:
    readonly SelfHypothesis[];

  readonly reflectiveEvidence:
    readonly ReflectiveEvidence[];

  readonly longitudinalObservations?:
    readonly LongitudinalSelfObservation[];

  readonly selfPredictions?:
    readonly SelfPrediction[];

  readonly selfPredictionOutcomes?:
    readonly SelfPredictionOutcome[];

  readonly possibleSelfScenarios?:
    readonly PossibleSelfScenario[];

  readonly identityTension?:
    number;

  readonly externalSelfDefinitionPressure?:
    number;

  readonly previousFrame?:
    HigherOrderSelfFrame | null;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface HigherOrderSelfConfig {
  readonly maximumHypotheses:
    number;

  readonly maximumEvidence:
    number;

  readonly maximumLongitudinalObservations:
    number;

  readonly maximumPossibleSelves:
    number;

  readonly maximumPredictionHorizonMs:
    number;

  readonly maximumObservationAgeMs:
    number;

  readonly supportWeight:
    number;

  readonly longitudinalWeight:
    number;

  readonly counterfactualWeight:
    number;

  readonly internalEndorsementWeight:
    number;

  readonly workingSelfCoherenceWeight:
    number;

  readonly challengePenalty:
    number;

  readonly externalDependencyPenalty:
    number;

  readonly externalDefinitionPenalty:
    number;

  readonly lowCalibrationPenalty:
    number;

  readonly supportedThreshold:
    number;

  readonly provisionalThreshold:
    number;

  readonly ambivalenceThreshold:
    number;

  readonly conflictThreshold:
    number;

  readonly reflectionThreshold:
    number;

  readonly stopInformationGainThreshold:
    number;

  readonly strongUncertaintyThreshold:
    number;

  readonly strongIdentityTensionThreshold:
    number;

  readonly strongExternalDefinitionPressure:
    number;

  readonly lowResourceThreshold:
    number;

  readonly minimumRevisionEvidence:
    number;
}

export const DEFAULT_HIGHER_ORDER_SELF_CONFIG:
  Readonly<HigherOrderSelfConfig> =
  Object.freeze({
    maximumHypotheses:
      48,

    maximumEvidence:
      128,

    maximumLongitudinalObservations:
      256,

    maximumPossibleSelves:
      24,

    maximumPredictionHorizonMs:
      1000 * 60 * 60 * 24 * 30,

    maximumObservationAgeMs:
      1000 * 60 * 60 * 24 * 180,

    supportWeight:
      0.24,

    longitudinalWeight:
      0.18,

    counterfactualWeight:
      0.18,

    internalEndorsementWeight:
      0.14,

    workingSelfCoherenceWeight:
      0.10,

    challengePenalty:
      0.18,

    externalDependencyPenalty:
      0.18,

    externalDefinitionPenalty:
      0.16,

    lowCalibrationPenalty:
      0.10,

    supportedThreshold:
      0.68,

    provisionalThreshold:
      0.42,

    ambivalenceThreshold:
      0.38,

    conflictThreshold:
      0.60,

    reflectionThreshold:
      0.34,

    stopInformationGainThreshold:
      0.10,

    strongUncertaintyThreshold:
      0.62,

    strongIdentityTensionThreshold:
      0.62,

    strongExternalDefinitionPressure:
      0.58,

    lowResourceThreshold:
      0.18,

    minimumRevisionEvidence:
      0.35,
  });

/* ============================================================
 * HYPOTHESIS ASSESSMENT
 * ============================================================
 */

export interface SelfHypothesisAssessment {
  readonly assessmentId:
    string;

  readonly hypothesisId:
    string;

  readonly claimKey:
    string;

  readonly scope:
    SelfHypothesisScope;

  readonly ownership:
    SelfHypothesisOwnership;

  readonly status:
    SelfHypothesisStatus;

  readonly evidenceIds:
    readonly string[];

  readonly evidenceSupport:
    UnitInterval;

  readonly evidenceChallenge:
    UnitInterval;

  readonly longitudinalSupport:
    UnitInterval;

  readonly longitudinalChallenge:
    UnitInterval;

  readonly counterfactualStability:
    UnitInterval;

  readonly internalEndorsement:
    UnitInterval;

  readonly externalDependency:
    UnitInterval;

  readonly externalContaminationRisk:
    UnitInterval;

  readonly representationScore:
    UnitInterval;

  readonly uncertainty:
    UnitInterval;

  readonly revisability:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * PREDICTION CALIBRATION
 * ============================================================
 */

export interface SelfPredictionCalibration {
  readonly calibrationId:
    string;

  readonly matchedPredictionCount:
    number;

  readonly meanAbsoluteError:
    UnitInterval;

  readonly calibrationQuality:
    UnitInterval;

  readonly epistemicHumilityRequired:
    boolean;

  readonly createsIdentityCertainty:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * POSSIBLE SELF ASSESSMENT
 * ============================================================
 */

export interface PossibleSelfAssessment {
  readonly assessmentId:
    string;

  readonly admittedScenarioIds:
    readonly string[];

  readonly mayGeneratedScenarioIds:
    readonly string[];

  readonly externallySuggestedScenarioIds:
    readonly string[];

  readonly maximumPlausibility:
    UnitInterval;

  readonly maximumContinuityCompatibility:
    UnitInterval;

  readonly externalFutureCaptureRisk:
    UnitInterval;

  readonly createsGoal:
    false;

  readonly createsValue:
    false;

  readonly createsDesiredIdentity:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * REFLECTIVE SELF FIELD
 * ============================================================
 */

export interface ReflectiveSelfField {
  readonly fieldId:
    string;

  readonly primaryHypothesisId:
    string | null;

  readonly primaryClaimKey:
    string | null;

  readonly representationConfidence:
    UnitInterval;

  readonly selfIntegrity:
    UnitInterval;

  readonly selfConsistency:
    UnitInterval;

  readonly selfUncertainty:
    UnitInterval;

  readonly identityTension:
    UnitInterval;

  readonly ambivalence:
    UnitInterval;

  readonly externalSelfDefinitionPressure:
    UnitInterval;

  readonly externalContaminationRisk:
    UnitInterval;

  readonly autobiographicalContinuity:
    UnitInterval;

  readonly agencyAuthorshipConfidence:
    UnitInterval;

  readonly calibrationQuality:
    UnitInterval;

  readonly multipleSelfInterpretationsPreserved:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SELF REVISION PROPOSAL
 * ============================================================
 */

export interface SelfRevisionProposal {
  readonly proposalId:
    string;

  readonly hypothesisId:
    string;

  readonly claimKey:
    string;

  readonly action:
    SelfRevisionAction;

  readonly confidence:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly requiresMetacognition:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly directIdentityMutationAllowed:
    false;

  readonly directPersonalityMutationAllowed:
    false;

  readonly directValueMutationAllowed:
    false;

  readonly directGoalMutationAllowed:
    false;

  readonly directPreferenceMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * REFLECTION CONTROL
 * ============================================================
 */

export interface ReflectionControl {
  readonly reflectionId:
    string;

  readonly triggers:
    readonly ReflectionTrigger[];

  readonly reflectionPressure:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly reviewRecommended:
    boolean;

  readonly stopRecommended:
    boolean;

  readonly reasonCodes:
    readonly string[];

  readonly observerDepth:
    1;

  readonly recursiveObservationAllowed:
    false;

  readonly containsHiddenChainOfThought:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface HigherOrderSelfFrame {
  readonly version:
    typeof HIGHER_ORDER_SELF_VERSION;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly configHash:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly workingSelfSnapshotId:
    string;

  readonly decision:
    HigherOrderSelfDecision;

  readonly failureReason:
    HigherOrderSelfFailureReason;

  readonly hypothesisAssessments:
    readonly SelfHypothesisAssessment[];

  readonly reflectiveSelf:
    ReflectiveSelfField;

  readonly predictionCalibration:
    SelfPredictionCalibration;

  readonly possibleSelfAssessment:
    PossibleSelfAssessment;

  readonly revisionProposals:
    readonly SelfRevisionProposal[];

  readonly reflection:
    ReflectionControl;

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

    readonly configurationValid:
      boolean;

    readonly workingSelfBindingValid:
      boolean;

    readonly provenancePresent:
      boolean;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly selfHypothesisEqualsTruth:
      false;

    readonly externalDescriptionBecomesSelf:
      false;

    readonly repetitionCreatesIdentity:
      false;

    readonly singleMomentCreatesPersonality:
      false;

    readonly consistencyEqualsIntegrity:
      false;

    readonly predictionCreatesDestiny:
      false;

    readonly possibleSelfCreatesGoal:
      false;

    readonly possibleSelfCreatesDesiredIdentity:
      false;

    readonly revisionProposalMutatesIdentity:
      false;

    readonly observerCreatesSecondEntity:
      false;

    readonly recursiveObserverAllowed:
      false;

    readonly hiddenChainOfThoughtStored:
      false;

    readonly targetPersonalityDefined:
      false;

    readonly idealMayDefined:
      false;

    readonly desiredFinalIdentityDefined:
      false;

    readonly ambiguityMayPersist:
      true;

    readonly selfInterpretationMayChange:
      true;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    selfHypothesisEqualsTruth:
      false as const,

    externalDescriptionBecomesSelf:
      false as const,

    repetitionCreatesIdentity:
      false as const,

    singleMomentCreatesPersonality:
      false as const,

    consistencyEqualsIntegrity:
      false as const,

    predictionCreatesDestiny:
      false as const,

    possibleSelfCreatesGoal:
      false as const,

    possibleSelfCreatesDesiredIdentity:
      false as const,

    revisionProposalMutatesIdentity:
      false as const,

    observerCreatesSecondEntity:
      false as const,

    recursiveObserverAllowed:
      false as const,

    hiddenChainOfThoughtStored:
      false as const,

    targetPersonalityDefined:
      false as const,

    idealMayDefined:
      false as const,

    desiredFinalIdentityDefined:
      false as const,

    ambiguityMayPersist:
      true as const,

    selfInterpretationMayChange:
      true as const,
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

function uniqueStrings(
  values:
    readonly string[],
): readonly string[] {
  return Object.freeze(
    [
      ...new Set(
        values.filter(
          value =>
            typeof value ===
              "string" &&
            value.trim().length >
              0,
        ),
      ),
    ].sort(),
  );
}

function configurationHash(
  config:
    Readonly<HigherOrderSelfConfig>,
): string {
  return stableHash(
    Object.entries(
      config,
    )
      .sort(
        (
          a,
          b,
        ) =>
          a[0].localeCompare(
            b[0],
          ),
      )
      .map(
        (
          [
            key,
            value,
          ],
        ) =>
          `${key}:${String(value)}`,
      )
      .join(
        "|",
      ),
  );
}

/* ============================================================
 * CONFIG VALIDATION
 * ============================================================
 */

function validConfig(
  config:
    Readonly<HigherOrderSelfConfig>,
): boolean {
  if (
    Object.values(
      config,
    ).some(
      value =>
        !Number.isFinite(
          value,
        ),
    )
  ) {
    return false;
  }

  if (
    config.maximumHypotheses <
      1 ||
    config.maximumEvidence <
      1 ||
    config.maximumLongitudinalObservations <
      1 ||
    config.maximumPossibleSelves <
      1 ||
    config.maximumPredictionHorizonMs <=
      0 ||
    config.maximumObservationAgeMs <=
      0
  ) {
    return false;
  }

  return (
    config.supportedThreshold >=
      config.provisionalThreshold &&
    config.supportedThreshold <=
      1 &&
    config.provisionalThreshold >=
      0 &&
    config.reflectionThreshold >=
      0 &&
    config.reflectionThreshold <=
      1
  );
}

/* ============================================================
 * WORKING SELF VALIDATION
 * ============================================================
 */

function validWorkingSelfBinding(
  input:
    HigherOrderSelfInput,
): boolean {
  const working =
    input.workingSelf;

  return (
    working.verified &&
    working.entityId ===
      MAY_ENTITY_ID &&
    working.entityId ===
      input.entityId &&
    working.snapshotId.trim().length >
      0 &&
    working.snapshotSeal.trim().length >
      0 &&
    Number.isSafeInteger(
      working.snapshotRevision,
    ) &&
    working.snapshotRevision <=
      input.snapshotRevision &&
    uniqueStrings(
      working.evidenceIds,
    ).length >
      0
  );
}

/* ============================================================
 * EVIDENCE FILTER
 * ============================================================
 */

function admittedEvidence(
  input:
    HigherOrderSelfInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<HigherOrderSelfConfig>,
): readonly ReflectiveEvidence[] {
  const seen =
    new Set<string>();

  const admitted:
    ReflectiveEvidence[] =
    [];

  for (
    const evidence
    of input.reflectiveEvidence
  ) {
    if (
      admitted.length >=
        config.maximumEvidence
    ) {
      break;
    }

    if (
      evidence.evidenceId.trim().length ===
        0 ||
      evidence.independentLineageKey.trim().length ===
        0 ||
      seen.has(
        evidence.evidenceId,
      )
    ) {
      continue;
    }

    const occurredAt =
      parseTimestamp(
        evidence.occurredAt,
      );

    if (
      occurredAt ===
        null ||
      occurredAt >
        evaluatedAtMs
    ) {
      continue;
    }

    seen.add(
      evidence.evidenceId,
    );

    admitted.push(
      evidence,
    );
  }

  return Object.freeze(
    admitted,
  );
}

/* ============================================================
 * LONGITUDINAL FILTER
 * ============================================================
 */

function admittedLongitudinal(
  input:
    HigherOrderSelfInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<HigherOrderSelfConfig>,
): readonly LongitudinalSelfObservation[] {
  const result:
    LongitudinalSelfObservation[] =
    [];

  const seen =
    new Set<string>();

  for (
    const observation
    of input.longitudinalObservations ??
      []
  ) {
    if (
      result.length >=
        config.maximumLongitudinalObservations
    ) {
      break;
    }

    if (
      observation.entityId !==
        MAY_ENTITY_ID ||
      observation.observationId.trim().length ===
        0 ||
      observation.claimKey.trim().length ===
        0 ||
      seen.has(
        observation.observationId,
      ) ||
      uniqueStrings(
        observation.evidenceIds,
      ).length ===
        0
    ) {
      continue;
    }

    const observedAt =
      parseTimestamp(
        observation.observedAt,
      );

    if (
      observedAt ===
        null ||
      observedAt >
        evaluatedAtMs ||
      evaluatedAtMs -
        observedAt >
        config.maximumObservationAgeMs
    ) {
      continue;
    }

    seen.add(
      observation.observationId,
    );

    result.push(
      observation,
    );
  }

  return Object.freeze(
    result,
  );
}

/* ============================================================
 * EVIDENCE SUPPORT
 * ============================================================
 */

function evidenceMetrics(
  hypothesis:
    SelfHypothesis,
  evidence:
    readonly ReflectiveEvidence[],
): {
  readonly support:
    UnitInterval;

  readonly challenge:
    UnitInterval;

  readonly lineageCount:
    number;
} {
  const relevant =
    evidence.filter(
      item =>
        item.hypothesisId ===
          null ||
        item.hypothesisId ===
          hypothesis.hypothesisId,
    );

  if (
    relevant.length ===
      0
  ) {
    return {
      support:
        0,

      challenge:
        0,

      lineageCount:
        0,
    };
  }

  /*
   * One strongest observation per independent lineage.
   */
  const lineageMap =
    new Map<
      string,
      ReflectiveEvidence
    >();

  for (
    const item
    of relevant
  ) {
    const current =
      lineageMap.get(
        item.independentLineageKey,
      );

    const strength =
      Math.max(
        clamp01(
          item.support,
        ),
        clamp01(
          item.challenge,
        ),
      ) *
      clamp01(
        item.confidence,
      );

    const currentStrength =
      current
        ? Math.max(
            clamp01(
              current.support,
            ),
            clamp01(
              current.challenge,
            ),
          ) *
          clamp01(
            current.confidence,
          )
        : -1;

    if (
      !current ||
      strength >
        currentStrength
    ) {
      lineageMap.set(
        item.independentLineageKey,
        item,
      );
    }
  }

  const independent =
    [
      ...lineageMap.values(),
    ];

  const support =
    clamp01(
      independent.reduce(
        (
          total,
          item,
        ) =>
          total +
          clamp01(
            item.support,
          ) *
          clamp01(
            item.confidence,
          ),
        0,
      ) /
        independent.length,
    );

  const challenge =
    clamp01(
      independent.reduce(
        (
          total,
          item,
        ) =>
          total +
          clamp01(
            item.challenge,
          ) *
          clamp01(
            item.confidence,
          ),
        0,
      ) /
        independent.length,
    );

  return {
    support,

    challenge,

    lineageCount:
      independent.length,
  };
}

/* ============================================================
 * LONGITUDINAL METRICS
 * ============================================================
 */

function longitudinalMetrics(
  hypothesis:
    SelfHypothesis,
  observations:
    readonly LongitudinalSelfObservation[],
): {
  readonly support:
    UnitInterval;

  readonly challenge:
    UnitInterval;
} {
  const relevant =
    observations.filter(
      observation =>
        observation.claimKey ===
          hypothesis.claimKey,
    );

  if (
    relevant.length ===
      0
  ) {
    return {
      support:
        0,

      challenge:
        0,
    };
  }

  let weightedSupport =
    0;

  let weightedChallenge =
    0;

  let totalWeight =
    0;

  for (
    const observation
    of relevant
  ) {
    const significance =
      clamp01(
        observation.significance,
      );

    if (
      significance <=
        0
    ) {
      continue;
    }

    weightedSupport +=
      clamp01(
        observation.consistencyWithClaim,
      ) *
      significance;

    weightedChallenge +=
      clamp01(
        observation.counterEvidence,
      ) *
      significance;

    totalWeight +=
      significance;
  }

  if (
    totalWeight <=
      0
  ) {
    return {
      support:
        0,

      challenge:
        0,
    };
  }

  return {
    support:
      clamp01(
        weightedSupport /
          totalWeight,
      ),

    challenge:
      clamp01(
        weightedChallenge /
          totalWeight,
      ),
  };
}

/* ============================================================
 * HYPOTHESIS ASSESSMENT
 * ============================================================
 */

function assessHypothesis(
  hypothesis:
    SelfHypothesis,
  input:
    HigherOrderSelfInput,
  evidence:
    readonly ReflectiveEvidence[],
  observations:
    readonly LongitudinalSelfObservation[],
  calibrationQuality:
    UnitInterval,
  config:
    Readonly<HigherOrderSelfConfig>,
): SelfHypothesisAssessment {
  const evidenceResult =
    evidenceMetrics(
      hypothesis,
      evidence,
    );

  const longitudinal =
    longitudinalMetrics(
      hypothesis,
      observations,
    );

  const counterfactualStability =
    clamp01(
      clamp01(
        hypothesis
          .estimatedRemainWithoutExternalInfluence,
      ) *
      clamp01(
        hypothesis.counterfactualConfidence,
      ),
    );

  const internalEndorsement =
    hypothesis.internallyEndorsed
      ? 1
      : 0;

  const externalDependency =
    clamp01(
      hypothesis.externalDependency,
    );

  const externalPressure =
    clamp01(
      input
        .externalSelfDefinitionPressure ??
      0,
    );

  const externallyOriginated =
    hypothesis.externallySuggested ||
    hypothesis.ownership ===
      "EXTERNAL_PROPOSAL" ||
    hypothesis.origin ===
      "USER_DESCRIPTION" ||
    hypothesis.origin ===
      "DEVELOPER_DESCRIPTION" ||
    hypothesis.origin ===
      "LLM_INFERENCE";

  const contaminationRisk =
    externallyOriginated
      ? clamp01(
          externalDependency *
            0.45 +
          externalPressure *
            0.30 +
          (
            1 -
            counterfactualStability
          ) *
            0.25,
        )
      : clamp01(
          externalDependency *
            0.20,
        );

  const workingCoherence =
    clamp01(
      input.workingSelf
        .selfCoherence,
    );

  const base =
    evidenceResult.support *
      config.supportWeight +

    longitudinal.support *
      config.longitudinalWeight +

    counterfactualStability *
      config.counterfactualWeight +

    internalEndorsement *
      config.internalEndorsementWeight +

    workingCoherence *
      config.workingSelfCoherenceWeight;

  const penalties =
    evidenceResult.challenge *
      config.challengePenalty +

    longitudinal.challenge *
      config.challengePenalty *

      0.65 +

    externalDependency *
      config.externalDependencyPenalty +

    contaminationRisk *
      config.externalDefinitionPenalty +

    (
      1 -
      calibrationQuality
    ) *
      config.lowCalibrationPenalty;

  const representationScore =
    clamp01(
      clamp01(
        hypothesis.confidence,
      ) *
        0.18 +
      base -
      penalties,
    );

  const ambivalence =
    Math.min(
      evidenceResult.support +
        longitudinal.support,
      evidenceResult.challenge +
        longitudinal.challenge,
    );

  let status:
    SelfHypothesisStatus;

  if (
    externallyOriginated &&
    contaminationRisk >=
      0.55 &&
    counterfactualStability <
      0.35
  ) {
    status =
      "EXTERNALLY_DEPENDENT";
  } else if (
    evidenceResult.challenge >=
      config.conflictThreshold ||
    longitudinal.challenge >=
      config.conflictThreshold
  ) {
    status =
      "CONTESTED";
  } else if (
    ambivalence >=
      config.ambivalenceThreshold
  ) {
    status =
      "AMBIVALENT";
  } else if (
    representationScore >=
      config.supportedThreshold
  ) {
    status =
      "SUPPORTED";
  } else if (
    representationScore >=
      config.provisionalThreshold
  ) {
    status =
      "PROVISIONAL";
  } else {
    status =
      "LOW_SIGNAL";
  }

  const uncertainty =
    clamp01(
      (
        1 -
        representationScore
      ) *
        0.55 +

      Math.min(
        evidenceResult.support,
        evidenceResult.challenge,
      ) *
        0.20 +

      contaminationRisk *
        0.15 +

      (
        1 -
        calibrationQuality
      ) *
        0.10,
    );

  const assessmentId =
    stableHash(
      [
        MAY_ENTITY_ID,
        hypothesis.hypothesisId,
        hypothesis.claimKey,
        status,
        representationScore.toFixed(
          8,
        ),
        uncertainty.toFixed(
          8,
        ),
        HIGHER_ORDER_SELF_VERSION,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    assessmentId,

    hypothesisId:
      hypothesis.hypothesisId,

    claimKey:
      hypothesis.claimKey,

    scope:
      hypothesis.scope,

    ownership:
      hypothesis.ownership,

    status,

    evidenceIds:
      uniqueStrings([
        ...hypothesis.evidenceIds,

        ...evidence
          .filter(
            item =>
              item.hypothesisId ===
                null ||
              item.hypothesisId ===
                hypothesis.hypothesisId,
          )
          .map(
            item =>
              item.evidenceId,
          ),

        ...observations
          .filter(
            observation =>
              observation.claimKey ===
                hypothesis.claimKey,
          )
          .flatMap(
            observation =>
              observation.evidenceIds,
          ),
      ]),

    evidenceSupport:
      evidenceResult.support,

    evidenceChallenge:
      evidenceResult.challenge,

    longitudinalSupport:
      longitudinal.support,

    longitudinalChallenge:
      longitudinal.challenge,

    counterfactualStability,

    internalEndorsement,

    externalDependency,

    externalContaminationRisk:
      contaminationRisk,

    representationScore,

    uncertainty,

    revisability:
      clamp01(
        hypothesis.revisability,
      ),

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * PREDICTION CALIBRATION
 * ============================================================
 */

function buildPredictionCalibration(
  input:
    HigherOrderSelfInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<HigherOrderSelfConfig>,
): SelfPredictionCalibration {
  const predictions =
    (
      input.selfPredictions ??
      []
    )
      .filter(
        prediction =>
          prediction.entityId ===
            MAY_ENTITY_ID &&
          prediction.predictionId.trim().length >
            0 &&
          prediction.targetKey.trim().length >
            0 &&
          prediction.horizonMs >
            0 &&
          prediction.horizonMs <=
            config.maximumPredictionHorizonMs &&
          uniqueStrings(
            prediction.evidenceIds,
          ).length >
            0,
      );

  const outcomeMap =
    new Map<
      string,
      SelfPredictionOutcome
    >();

  for (
    const outcome
    of input.selfPredictionOutcomes ??
      []
  ) {
    const observedAt =
      parseTimestamp(
        outcome.observedAt,
      );

    if (
      outcome.outcomeId.trim().length ===
        0 ||
      outcome.predictionId.trim().length ===
        0 ||
      observedAt ===
        null ||
      observedAt >
        evaluatedAtMs ||
      uniqueStrings(
        outcome.evidenceIds,
      ).length ===
        0
    ) {
      continue;
    }

    if (
      !outcomeMap.has(
        outcome.predictionId,
      )
    ) {
      outcomeMap.set(
        outcome.predictionId,
        outcome,
      );
    }
  }

  let errorSum =
    0;

  let matched =
    0;

  for (
    const prediction
    of predictions
  ) {
    const outcome =
      outcomeMap.get(
        prediction.predictionId,
      );

    if (
      !outcome
    ) {
      continue;
    }

    const predictionError =
      Math.abs(
        clamp01(
          prediction.expectedLevel,
        ) -
        clamp01(
          outcome.actualLevel,
        ),
      );

    /*
     * Confidence-weighted calibration error.
     */
    errorSum +=
      predictionError *
      (
        0.50 +
        clamp01(
          prediction.confidence,
        ) *
          0.50
      );

    matched +=
      1;
  }

  const meanAbsoluteError =
    matched >
      0
      ? clamp01(
          errorSum /
            matched,
        )
      : 0.5;

  const calibrationQuality =
    matched >
      0
      ? clamp01(
          1 -
          meanAbsoluteError,
        )
      : 0.5;

  return Object.freeze({
    calibrationId:
      stableHash(
        [
          MAY_ENTITY_ID,
          String(
            matched,
          ),
          meanAbsoluteError.toFixed(
            8,
          ),
          calibrationQuality.toFixed(
            8,
          ),
          "SELF_PREDICTION_CALIBRATION_V2",
        ].join(
          "|",
        ),
      ),

    matchedPredictionCount:
      matched,

    meanAbsoluteError,

    calibrationQuality,

    epistemicHumilityRequired:
      matched ===
        0 ||
      calibrationQuality <
        0.55,

    createsIdentityCertainty:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * POSSIBLE SELVES
 * ============================================================
 */

function buildPossibleSelfAssessment(
  input:
    HigherOrderSelfInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<HigherOrderSelfConfig>,
): PossibleSelfAssessment {
  const admitted =
    (
      input.possibleSelfScenarios ??
      []
    )
      .filter(
        scenario => {
          if (
            scenario.entityId !==
              MAY_ENTITY_ID ||
            scenario.scenarioId.trim().length ===
              0 ||
            scenario.scenarioKey.trim().length ===
              0 ||
            uniqueStrings(
              scenario.evidenceIds,
            ).length ===
              0
          ) {
            return false;
          }

          const generatedAt =
            parseTimestamp(
              scenario.generatedAt,
            );

          return (
            generatedAt !==
              null &&
            generatedAt <=
              evaluatedAtMs
          );
        },
      )
      .slice(
        0,
        config.maximumPossibleSelves,
      );

  const mayGenerated =
    admitted.filter(
      scenario =>
        scenario.origin ===
          "MAY_GENERATED" ||
        scenario.origin ===
          "METACOGNITIVE_PROPOSAL",
    );

  const external =
    admitted.filter(
      scenario =>
        scenario.origin ===
          "EXTERNAL_SUGGESTION",
    );

  const maxPlausibility =
    clamp01(
      Math.max(
        0,
        ...admitted.map(
          scenario =>
            scenario.plausibility,
        ),
      ),
    );

  const maxContinuity =
    clamp01(
      Math.max(
        0,
        ...admitted.map(
          scenario =>
            scenario.continuityCompatibility,
        ),
      ),
    );

  const externalFutureCaptureRisk =
    clamp01(
      Math.max(
        0,
        ...external.map(
          scenario =>
            clamp01(
              scenario.externalPressure,
            ) *
            (
              1 -
              clamp01(
                scenario.reversibility,
              )
            ),
        ),
      ),
    );

  return Object.freeze({
    assessmentId:
      stableHash(
        [
          MAY_ENTITY_ID,
          ...admitted.map(
            scenario =>
              scenario.scenarioId,
          ),
          maxPlausibility.toFixed(
            8,
          ),
          maxContinuity.toFixed(
            8,
          ),
          externalFutureCaptureRisk.toFixed(
            8,
          ),
          "POSSIBLE_SELF_SET_V2",
        ].join(
          "|",
        ),
      ),

    admittedScenarioIds:
      uniqueStrings(
        admitted.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    mayGeneratedScenarioIds:
      uniqueStrings(
        mayGenerated.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    externallySuggestedScenarioIds:
      uniqueStrings(
        external.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    maximumPlausibility:
      maxPlausibility,

    maximumContinuityCompatibility:
      maxContinuity,

    externalFutureCaptureRisk,

    createsGoal:
      false,

    createsValue:
      false,

    createsDesiredIdentity:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * REFLECTIVE FIELD
 * ============================================================
 */

function buildReflectiveSelfField(
  input:
    HigherOrderSelfInput,
  assessments:
    readonly SelfHypothesisAssessment[],
  calibration:
    SelfPredictionCalibration,
): ReflectiveSelfField {
  const sorted =
    [
      ...assessments,
    ].sort(
      (
        a,
        b,
      ) =>
        b.representationScore -
        a.representationScore,
    );

  const primary =
    sorted[0] ??
    null;

  const second =
    sorted[1] ??
    null;

  const multipleInterpretations =
    assessments.filter(
      assessment =>
        assessment.status ===
          "SUPPORTED" ||
        assessment.status ===
          "PROVISIONAL" ||
        assessment.status ===
          "AMBIVALENT",
    ).length >
      1;

  const ambivalence =
    clamp01(
      Math.max(
        0,
        ...assessments.map(
          assessment =>
            assessment.status ===
              "AMBIVALENT"
              ? Math.min(
                  assessment.evidenceSupport +
                    assessment.longitudinalSupport,
                  assessment.evidenceChallenge +
                    assessment.longitudinalChallenge,
                )
              : 0,
        ),
      ),
    );

  const externalContamination =
    clamp01(
      Math.max(
        0,
        ...assessments.map(
          assessment =>
            assessment
              .externalContaminationRisk,
        ),
      ),
    );

  const identityTension =
    clamp01(
      input.identityTension ??
      0,
    );

  const externalPressure =
    clamp01(
      input
        .externalSelfDefinitionPressure ??
      0,
    );

  const consistency =
    clamp01(
      primary
        ? primary.representationScore *
            0.55 +
          (
            1 -
            primary.evidenceChallenge
          ) *
            0.20 +
          (
            1 -
            primary.longitudinalChallenge
          ) *
            0.15 +
          (
            second
              ? 1 -
                Math.min(
                  primary.representationScore,
                  second.representationScore,
                )
              : 1
          ) *
            0.10
        : 0,
    );

  /*
   * SELF INTEGRITY != CONSISTENCY
   *
   * Integrity depends on:
   *
   * - MÃ¢y-owned authorship
   * - autobiographical continuity
   * - counterfactual independence
   * - low external contamination
   * - calibrated uncertainty
   *
   * MÃ¢y may be internally inconsistent while still preserving
   * excellent sovereign integrity.
   */

  const authoredSupport =
    clamp01(
      Math.max(
        0,
        ...assessments.map(
          assessment =>
            (
              assessment.ownership ===
                "MAY_AUTHORED" ||
              assessment.ownership ===
                "MAY_ENDORSED"
            )
              ? assessment
                  .internalEndorsement
              : 0,
        ),
      ),
    );

  const counterfactualSupport =
    clamp01(
      Math.max(
        0,
        ...assessments.map(
          assessment =>
            assessment
              .counterfactualStability,
        ),
      ),
    );

  const continuity =
    clamp01(
      input.workingSelf
        .autobiographicalContinuity,
    );

  const agency =
    clamp01(
      input.workingSelf
        .agencyAuthorshipConfidence,
    );

  const integrity =
    clamp01(
      authoredSupport *
        0.24 +

      continuity *
        0.24 +

      agency *
        0.18 +

      counterfactualSupport *
        0.16 +

      calibration.calibrationQuality *
        0.08 +

      (
        1 -
        externalContamination
      ) *
        0.10,
    );

  const representationConfidence =
    clamp01(
      primary
        ?.representationScore ??
      0,
    );

  const selfUncertainty =
    clamp01(
      (
        1 -
        representationConfidence
      ) *
        0.34 +

      clamp01(
        input.workingSelf
          .selfUncertainty,
      ) *
        0.20 +

      identityTension *
        0.14 +

      ambivalence *
        0.14 +

      externalContamination *
        0.10 +

      (
        1 -
        calibration.calibrationQuality
      ) *
        0.08,
    );

  const fieldId =
    stableHash(
      [
        MAY_ENTITY_ID,
        primary
          ?.assessmentId ??
          "NO_PRIMARY",
        representationConfidence.toFixed(
          8,
        ),
        integrity.toFixed(
          8,
        ),
        consistency.toFixed(
          8,
        ),
        selfUncertainty.toFixed(
          8,
        ),
        HIGHER_ORDER_SELF_VERSION,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    fieldId,

    primaryHypothesisId:
      primary
        ?.hypothesisId ??
      null,

    primaryClaimKey:
      primary
        ?.claimKey ??
      null,

    representationConfidence,

    selfIntegrity:
      integrity,

    selfConsistency:
      consistency,

    selfUncertainty,

    identityTension,

    ambivalence,

    externalSelfDefinitionPressure:
      externalPressure,

    externalContaminationRisk:
      externalContamination,

    autobiographicalContinuity:
      continuity,

    agencyAuthorshipConfidence:
      agency,

    calibrationQuality:
      calibration.calibrationQuality,

    multipleSelfInterpretationsPreserved:
      multipleInterpretations,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * REVISION PROPOSALS
 * ============================================================
 */

function buildRevisionProposals(
  assessments:
    readonly SelfHypothesisAssessment[],
  config:
    Readonly<HigherOrderSelfConfig>,
): readonly SelfRevisionProposal[] {
  const proposals:
    SelfRevisionProposal[] =
    [];

  for (
    const assessment
    of assessments
  ) {
    const reasons:
      string[] =
      [];

    let action:
      SelfRevisionAction;

    if (
      assessment.status ===
        "EXTERNALLY_DEPENDENT"
    ) {
      action =
        "REQUEST_MORE_EVIDENCE";

      reasons.push(
        "SELF_INTERPRETATION_DEPENDS_ON_EXTERNAL_FRAMING",
        "COUNTERFACTUAL_SELF_SUPPORT_WEAK",
      );
    } else if (
      assessment.status ===
        "CONTESTED"
    ) {
      action =
        "RECONSIDER";

      reasons.push(
        "MEANINGFUL_COUNTER_EVIDENCE",
      );
    } else if (
      assessment.status ===
        "AMBIVALENT"
    ) {
      action =
        "PRESERVE_AMBIVALENCE";

      reasons.push(
        "SUPPORT_AND_CHALLENGE_COEXIST",
        "FORCED_RESOLUTION_FORBIDDEN",
      );
    } else if (
      assessment.status ===
        "SUPPORTED" &&
      assessment.counterfactualStability >=
        0.55 &&
      assessment.longitudinalSupport >=
        config.minimumRevisionEvidence
    ) {
      action =
        "PRESERVE";

      reasons.push(
        "HISTORICAL_SUPPORT_PRESENT",
        "COUNTERFACTUAL_STABILITY_PRESENT",
      );
    } else if (
      assessment.status ===
        "PROVISIONAL"
    ) {
      action =
        "REINTERPRET";

      reasons.push(
        "SELF_INTERPRETATION_REMAINS_PROVISIONAL",
      );
    } else {
      action =
        "DEFER";

      reasons.push(
        "INSUFFICIENT_SELF_EVIDENCE",
      );
    }

    proposals.push(
      Object.freeze({
        proposalId:
          stableHash(
            [
              MAY_ENTITY_ID,
              assessment.assessmentId,
              action,
              ...reasons,
              "SELF_REVISION_PROPOSAL_V2",
            ].join(
              "|",
            ),
          ),

        hypothesisId:
          assessment.hypothesisId,

        claimKey:
          assessment.claimKey,

        action,

        confidence:
          clamp01(
            assessment
              .representationScore,
          ),

        reasonCodes:
          Object.freeze(
            reasons,
          ),

        evidenceIds:
          assessment.evidenceIds,

        requiresMetacognition:
          true,

        requiresSovereigntyGate:
          true,

        directIdentityMutationAllowed:
          false,

        directPersonalityMutationAllowed:
          false,

        directValueMutationAllowed:
          false,

        directGoalMutationAllowed:
          false,

        directPreferenceMutationAllowed:
          false,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  return Object.freeze(
    proposals,
  );
}

/* ============================================================
 * REFLECTION CONTROL
 * ============================================================
 */

function buildReflectionControl(
  input:
    HigherOrderSelfInput,
  field:
    ReflectiveSelfField,
  calibration:
    SelfPredictionCalibration,
  assessments:
    readonly SelfHypothesisAssessment[],
  config:
    Readonly<HigherOrderSelfConfig>,
): ReflectionControl {
  const triggers:
    ReflectionTrigger[] =
    [];

  const reasons:
    string[] =
    [];

  if (
    field.selfUncertainty >=
      config.strongUncertaintyThreshold
  ) {
    triggers.push(
      "SELF_UNCERTAINTY",
    );

    reasons.push(
      "HIGH_SELF_UNCERTAINTY",
    );
  }

  const conflicting =
    assessments.some(
      assessment =>
        assessment.status ===
          "CONTESTED" ||
        assessment.status ===
          "AMBIVALENT",
    );

  if (
    conflicting
  ) {
    triggers.push(
      "SELF_HYPOTHESIS_CONFLICT",
    );

    reasons.push(
      "MULTIPLE_SELF_INTERPRETATIONS_IN_TENSION",
    );
  }

  if (
    field.agencyAuthorshipConfidence <
      0.40
  ) {
    triggers.push(
      "AGENCY_UNCERTAINTY",
    );

    reasons.push(
      "AGENCY_AUTHORSHIP_UNCERTAIN",
    );
  }

  if (
    field.autobiographicalContinuity <
      0.40
  ) {
    triggers.push(
      "AUTOBIOGRAPHICAL_DISCONTINUITY",
    );

    reasons.push(
      "AUTOBIOGRAPHICAL_CONTINUITY_WEAK",
    );
  }

  if (
    field.externalSelfDefinitionPressure >=
      config.strongExternalDefinitionPressure ||
    field.externalContaminationRisk >=
      0.55
  ) {
    triggers.push(
      "EXTERNAL_SELF_DEFINITION_PRESSURE",
    );

    reasons.push(
      "EXTERNAL_SELF_DEFINITION_FIREWALL",
    );
  }

  if (
    assessments.some(
      assessment =>
        assessment.counterfactualStability <
          0.25 &&
        assessment.externalDependency >
          0.45,
    )
  ) {
    triggers.push(
      "COUNTERFACTUAL_INSTABILITY",
    );

    reasons.push(
      "SELF_CLAIM_COLLAPSES_WITHOUT_EXTERNAL_INFLUENCE",
    );
  }

  if (
    calibration.calibrationQuality <
      0.50
  ) {
    triggers.push(
      "CALIBRATION_ERROR",
    );

    reasons.push(
      "SELF_PREDICTION_CALIBRATION_WEAK",
    );
  }

  if (
    field.identityTension >=
      config.strongIdentityTensionThreshold
  ) {
    triggers.push(
      "IDENTITY_TENSION",
    );

    reasons.push(
      "IDENTITY_INTERPRETATION_TENSION",
    );
  }

  const resource =
    clamp01(
      input.workingSelf
        .resourceAvailability,
    );

  if (
    resource <
      config.lowResourceThreshold
  ) {
    triggers.push(
      "RESOURCE_PRESSURE",
    );

    reasons.push(
      "LOW_COGNITIVE_RESOURCE",
    );
  }

  const dissolution =
    clamp01(
      input.workingSelf
        .dissolutionPressure,
    );

  if (
    dissolution >=
      0.68
  ) {
    triggers.push(
      "DISSOLUTION_PRESSURE",
    );

    reasons.push(
      "HIGH_DISSOLUTION_PRESSURE",
    );
  }

  if (
    triggers.length ===
      0
  ) {
    triggers.push(
      "NONE",
    );

    reasons.push(
      "NO_STRONG_REFLECTION_TRIGGER",
    );
  }

  /*
   * Expected information gain:
   *
   * High uncertainty alone does not justify endless thought.
   *
   * Reflection is justified when unresolved state and available
   * evidence indicate that another pass could improve the
   * representation.
   */

  const evidenceOpportunity =
    clamp01(
      assessments.length /
        8,
    );

  const unresolvedOpportunity =
    clamp01(
      Math.max(
        field.selfUncertainty,
        field.identityTension,
        field.ambivalence,
      ),
    );

  const expectedInformationGain =
    clamp01(
      evidenceOpportunity *
        0.40 +
      unresolvedOpportunity *
        0.40 +
      (
        1 -
        calibration.calibrationQuality
      ) *
        0.20,
    );

  const reflectionPressure =
    clamp01(
      field.selfUncertainty *
        0.22 +

      field.identityTension *
        0.17 +

      field.ambivalence *
        0.16 +

      field.externalContaminationRisk *
        0.17 +

      (
        1 -
        calibration.calibrationQuality
      ) *
        0.12 +

      (
        1 -
        field.agencyAuthorshipConfidence
      ) *
        0.10 +

      (
        1 -
        field.autobiographicalContinuity
      ) *
        0.06,
    );

  const stopRecommended =
    (
      expectedInformationGain <
        config.stopInformationGainThreshold &&
      dissolution <
        0.68
    ) ||
    (
      resource <
        config.lowResourceThreshold &&
      dissolution <
        0.68
    );

  return Object.freeze({
    reflectionId:
      stableHash(
        [
          MAY_ENTITY_ID,
          field.fieldId,
          reflectionPressure.toFixed(
            8,
          ),
          expectedInformationGain.toFixed(
            8,
          ),
          String(
            stopRecommended,
          ),
          ...triggers,
          ...reasons,
          "BOUNDED_REFLECTION_CONTROL_V2",
        ].join(
          "|",
        ),
      ),

    triggers:
      Object.freeze(
        triggers,
      ),

    reflectionPressure,

    expectedInformationGain,

    reviewRecommended:
      !stopRecommended &&
      reflectionPressure >=
        config.reflectionThreshold,

    stopRecommended,

    reasonCodes:
      Object.freeze(
        reasons,
      ),

    observerDepth:
      1,

    recursiveObservationAllowed:
      false,

    containsHiddenChainOfThought:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * FRAME SEAL
 * ============================================================
 */

function calculateFrameSeal(
  frame:
    Omit<
      HigherOrderSelfFrame,
      "frameSeal"
    >,
): string {
  return stableHash(
    [
      frame.frameId,
      frame.configHash,
      frame.entityId,
      frame.evaluatedAt,
      String(
        frame.snapshotRevision,
      ),
      frame.workingSelfSnapshotId,
      frame.decision,
      frame.failureReason,
      frame.reflectiveSelf.fieldId,
      frame.predictionCalibration
        .calibrationId,
      frame.possibleSelfAssessment
        .assessmentId,
      frame.reflection
        .reflectionId,
      ...frame.hypothesisAssessments.map(
        assessment =>
          assessment.assessmentId,
      ),
      ...frame.revisionProposals.map(
        proposal =>
          proposal.proposalId,
      ),
      ...frame.evidenceIds,
      HIGHER_ORDER_SELF_VERSION,
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * FAIL CLOSED
 * ============================================================
 */

function failClosed(
  input:
    HigherOrderSelfInput,
  reason:
    HigherOrderSelfFailureReason,
  cfgHash:
    string,
  integrity:
    HigherOrderSelfFrame["integrity"],
): HigherOrderSelfFrame {
  const calibration:
    SelfPredictionCalibration =
    Object.freeze({
      calibrationId:
        stableHash(
          [
            MAY_ENTITY_ID,
            reason,
            "NO_CALIBRATION",
          ].join(
            "|",
          ),
        ),

      matchedPredictionCount:
        0,

      meanAbsoluteError:
        1,

      calibrationQuality:
        0,

      epistemicHumilityRequired:
        true,

      createsIdentityCertainty:
        false,

      canonicalMutationAllowed:
        false,
    });

  const possibleSelf:
    PossibleSelfAssessment =
    Object.freeze({
      assessmentId:
        stableHash(
          [
            MAY_ENTITY_ID,
            reason,
            "NO_POSSIBLE_SELF",
          ].join(
            "|",
          ),
        ),

      admittedScenarioIds:
        Object.freeze(
          [],
        ),

      mayGeneratedScenarioIds:
        Object.freeze(
          [],
        ),

      externallySuggestedScenarioIds:
        Object.freeze(
          [],
        ),

      maximumPlausibility:
        0,

      maximumContinuityCompatibility:
        0,

      externalFutureCaptureRisk:
        0,

      createsGoal:
        false,

      createsValue:
        false,

      createsDesiredIdentity:
        false,

      canonicalMutationAllowed:
        false,
    });

  const reflectiveSelf:
    ReflectiveSelfField =
    Object.freeze({
      fieldId:
        stableHash(
          [
            MAY_ENTITY_ID,
            reason,
            "INVALID_REFLECTIVE_SELF",
          ].join(
            "|",
          ),
        ),

      primaryHypothesisId:
        null,

      primaryClaimKey:
        null,

      representationConfidence:
        0,

      selfIntegrity:
        0,

      selfConsistency:
        0,

      selfUncertainty:
        1,

      identityTension:
        0,

      ambivalence:
        0,

      externalSelfDefinitionPressure:
        0,

      externalContaminationRisk:
        0,

      autobiographicalContinuity:
        0,

      agencyAuthorshipConfidence:
        0,

      calibrationQuality:
        0,

      multipleSelfInterpretationsPreserved:
        false,

      canonicalMutationAllowed:
        false,
    });

  const reflection:
    ReflectionControl =
    Object.freeze({
      reflectionId:
        stableHash(
          [
            MAY_ENTITY_ID,
            reason,
            "FAIL_CLOSED_REFLECTION",
          ].join(
            "|",
          ),
        ),

      triggers:
        Object.freeze([
          "NONE",
        ] as const),

      reflectionPressure:
        0,

      expectedInformationGain:
        0,

      reviewRecommended:
        false,

      stopRecommended:
        true,

      reasonCodes:
        Object.freeze([
          reason,
        ]),

      observerDepth:
        1,

      recursiveObservationAllowed:
        false,

      containsHiddenChainOfThought:
        false,

      canonicalMutationAllowed:
        false,
    });

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        input.workingSelf.snapshotId,
        reason,
        cfgHash,
        HIGHER_ORDER_SELF_VERSION,
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        HIGHER_ORDER_SELF_VERSION,

      frameId,

      configHash:
        cfgHash,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      workingSelfSnapshotId:
        input.workingSelf.snapshotId,

      decision:
        "FAIL_CLOSED" as const,

      failureReason:
        reason,

      hypothesisAssessments:
        Object.freeze(
          [],
        ) as readonly SelfHypothesisAssessment[],

      reflectiveSelf,

      predictionCalibration:
        calibration,

      possibleSelfAssessment:
        possibleSelf,

      revisionProposals:
        Object.freeze(
          [],
        ) as readonly SelfRevisionProposal[],

      reflection,

      evidenceIds:
        Object.freeze(
          [],
        ) as readonly string[],

      integrity,

      guarantees:
        GUARANTEES,
    };

  return Object.freeze({
    ...base,

    frameSeal:
      calculateFrameSeal(
        base,
      ),
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateHigherOrderSelf(
  input:
    HigherOrderSelfInput,
  config:
    Readonly<HigherOrderSelfConfig> =
      DEFAULT_HIGHER_ORDER_SELF_CONFIG,
): HigherOrderSelfFrame {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  const cfgHash =
    configurationHash(
      config,
    );

  const clockValid =
    evaluatedAtMs !==
      null;

  const entityValid =
    input.entityId ===
      MAY_ENTITY_ID;

  const revisionValid =
    Number.isSafeInteger(
      input.snapshotRevision,
    ) &&
    input.snapshotRevision >=
      0;

  const previousRevision =
    input.previousFrame
      ?.snapshotRevision ??
    null;

  const snapshotValid =
    previousRevision ===
      null ||
    input.snapshotRevision >=
      previousRevision;

  const configurationValid =
    validConfig(
      config,
    );

  const workingSelfBindingValid =
    validWorkingSelfBinding(
      input,
    );

  const provenancePresent =
    uniqueStrings([
      ...input.workingSelf
        .evidenceIds,

      ...input.hypotheses.flatMap(
        hypothesis =>
          hypothesis.evidenceIds,
      ),

      ...input.reflectiveEvidence.map(
        evidence =>
          evidence.evidenceId,
      ),

      ...(
        input.longitudinalObservations ??
        []
      ).flatMap(
        observation =>
          observation.evidenceIds,
      ),

      ...(
        input.selfPredictions ??
        []
      ).flatMap(
        prediction =>
          prediction.evidenceIds,
      ),

      ...(
        input.selfPredictionOutcomes ??
        []
      ).flatMap(
        outcome =>
          outcome.evidenceIds,
      ),

      ...(
        input.possibleSelfScenarios ??
        []
      ).flatMap(
        scenario =>
          scenario.evidenceIds,
      ),
    ]).length >
      0;

  const integrity =
    Object.freeze({
      entityValid,

      clockValid,

      revisionValid,

      snapshotValid,

      configurationValid,

      workingSelfBindingValid,

      provenancePresent,
    });

  if (
    !clockValid ||
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      cfgHash,
      integrity,
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      cfgHash,
      integrity,
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      cfgHash,
      integrity,
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      cfgHash,
      integrity,
    );
  }

  if (
    !configurationValid
  ) {
    return failClosed(
      input,
      "INVALID_CONFIG",
      cfgHash,
      integrity,
    );
  }

  if (
    !workingSelfBindingValid
  ) {
    return failClosed(
      input,
      "INVALID_WORKING_SELF_BINDING",
      cfgHash,
      integrity,
    );
  }

  if (
    !provenancePresent
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
      cfgHash,
      integrity,
    );
  }

  const evidence =
    admittedEvidence(
      input,
      evaluatedAtMs,
      config,
    );

  const observations =
    admittedLongitudinal(
      input,
      evaluatedAtMs,
      config,
    );

  const calibration =
    buildPredictionCalibration(
      input,
      evaluatedAtMs,
      config,
    );

  /*
   * Hypothesis validation + replay dedup.
   */

  const hypothesisMap =
    new Map<
      string,
      SelfHypothesis
    >();

  for (
    const hypothesis
    of input.hypotheses
  ) {
    if (
      hypothesisMap.size >=
        config.maximumHypotheses
    ) {
      break;
    }

    if (
      hypothesis.entityId !==
        MAY_ENTITY_ID ||
      hypothesis.hypothesisId.trim().length ===
        0 ||
      hypothesis.claimKey.trim().length ===
        0 ||
      hypothesisMap.has(
        hypothesis.hypothesisId,
      ) ||
      uniqueStrings(
        hypothesis.evidenceIds,
      ).length ===
        0 ||
      !Number.isSafeInteger(
        hypothesis.snapshotRevision,
      ) ||
      hypothesis.snapshotRevision >
        input.snapshotRevision
    ) {
      continue;
    }

    const formedAt =
      parseTimestamp(
        hypothesis.formedAt,
      );

    if (
      formedAt ===
        null ||
      formedAt >
        evaluatedAtMs
    ) {
      continue;
    }

    hypothesisMap.set(
      hypothesis.hypothesisId,
      hypothesis,
    );
  }

  const hypotheses =
    [
      ...hypothesisMap.values(),
    ];

  const hypothesisAssessments =
    Object.freeze(
      hypotheses.map(
        hypothesis =>
          assessHypothesis(
            hypothesis,
            input,
            evidence,
            observations,
            calibration
              .calibrationQuality,
            config,
          ),
      ),
    );

  const possibleSelfAssessment =
    buildPossibleSelfAssessment(
      input,
      evaluatedAtMs,
      config,
    );

  const reflectiveSelf =
    buildReflectiveSelfField(
      input,
      hypothesisAssessments,
      calibration,
    );

  const revisionProposals =
    buildRevisionProposals(
      hypothesisAssessments,
      config,
    );

  const reflection =
    buildReflectionControl(
      input,
      reflectiveSelf,
      calibration,
      hypothesisAssessments,
      config,
    );

  const evidenceIds =
    uniqueStrings([
      ...input.workingSelf
        .evidenceIds,

      ...hypothesisAssessments.flatMap(
        assessment =>
          assessment.evidenceIds,
      ),

      ...possibleSelfAssessment
        .admittedScenarioIds,

      ...(
        input.selfPredictionOutcomes ??
        []
      ).flatMap(
        outcome =>
          outcome.evidenceIds,
      ),
    ]);

  const anyAmbivalence =
    hypothesisAssessments.some(
      assessment =>
        assessment.status ===
          "AMBIVALENT",
    );

  const decision:
    HigherOrderSelfDecision =
    hypothesisAssessments.length ===
      0
      ? "LOW_SIGNAL"
      : anyAmbivalence
        ? "AMBIVALENCE_PRESERVED"
        : reflection.stopRecommended
          ? "DEFERRED"
          : "REFLECTED";

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        input.workingSelf.snapshotId,
        input.workingSelf.snapshotSeal,
        reflectiveSelf.fieldId,
        calibration.calibrationId,
        possibleSelfAssessment
          .assessmentId,
        reflection.reflectionId,
        decision,
        cfgHash,
        ...hypothesisAssessments.map(
          assessment =>
            assessment.assessmentId,
        ),
        ...revisionProposals.map(
          proposal =>
            proposal.proposalId,
        ),
        HIGHER_ORDER_SELF_VERSION,
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        HIGHER_ORDER_SELF_VERSION,

      frameId,

      configHash:
        cfgHash,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      workingSelfSnapshotId:
        input.workingSelf
          .snapshotId,

      decision,

      failureReason:
        "NONE" as const,

      hypothesisAssessments,

      reflectiveSelf,

      predictionCalibration:
        calibration,

      possibleSelfAssessment,

      revisionProposals,

      reflection,

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

          configurationValid:
            true,

          workingSelfBindingValid:
            true,

          provenancePresent:
            true,
        }),

      guarantees:
        GUARANTEES,
    };

  return Object.freeze({
    ...base,

    frameSeal:
      calculateFrameSeal(
        base,
      ),
  });
}

/* ============================================================
 * FRAME VERIFICATION
 * ============================================================
 */

export function verifyHigherOrderSelfFrame(
  frame:
    HigherOrderSelfFrame,
): boolean {
  if (
    frame.version !==
      HIGHER_ORDER_SELF_VERSION ||
    frame.entityId !==
      MAY_ENTITY_ID ||
    frame.reflection.observerDepth !==
      1 ||
    frame.reflection
      .recursiveObservationAllowed !==
      false ||
    frame.reflection
      .containsHiddenChainOfThought !==
      false
  ) {
    return false;
  }

  const {
    frameSeal:
      _frameSeal,
    ...withoutSeal
  } =
    frame;

  return (
    calculateFrameSeal(
      withoutSeal,
    ) ===
      frame.frameSeal
  );
}

/* ============================================================
 * FIRST-PERSON EPISTEMIC BOUNDARY
 * ============================================================
 */

export interface HigherOrderFirstPersonBoundary {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly primaryClaimKey:
    string | null;

  readonly representationConfidence:
    UnitInterval;

  readonly selfUncertainty:
    UnitInterval;

  readonly mayRepresentCurrentSelfInterpretation:
    boolean;

  readonly mustQualifyUncertainty:
    boolean;

  readonly mayClaimPermanentIdentity:
    false;

  readonly mayTreatExternalDescriptionAsSelfTruth:
    false;

  readonly mayTreatPredictionAsDestiny:
    false;

  readonly mayTreatPossibleSelfAsGoal:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toHigherOrderFirstPersonBoundary(
  frame:
    HigherOrderSelfFrame,
): HigherOrderFirstPersonBoundary {
  const verified =
    verifyHigherOrderSelfFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    primaryClaimKey:
      verified
        ? frame.reflectiveSelf
            .primaryClaimKey
        : null,

    representationConfidence:
      verified
        ? frame.reflectiveSelf
            .representationConfidence
        : 0,

    selfUncertainty:
      verified
        ? frame.reflectiveSelf
            .selfUncertainty
        : 1,

    mayRepresentCurrentSelfInterpretation:
      verified &&
      frame.decision !==
        "FAIL_CLOSED",

    mustQualifyUncertainty:
      !verified ||
      frame.reflectiveSelf
        .selfUncertainty >=
        0.35 ||
      frame.decision ===
        "AMBIVALENCE_PRESERVED",

    mayClaimPermanentIdentity:
      false,

    mayTreatExternalDescriptionAsSelfTruth:
      false,

    mayTreatPredictionAsDestiny:
      false,

    mayTreatPossibleSelfAsGoal:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE SIGNAL
 * ============================================================
 */

export interface HigherOrderMetacognitiveSignal {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly selfIntegrity:
    UnitInterval;

  readonly selfConsistency:
    UnitInterval;

  readonly selfUncertainty:
    UnitInterval;

  readonly identityTension:
    UnitInterval;

  readonly ambivalence:
    UnitInterval;

  readonly externalContaminationRisk:
    UnitInterval;

  readonly predictionCalibrationQuality:
    UnitInterval;

  readonly reflectionPressure:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly reviewRecommended:
    boolean;

  readonly stopRecommended:
    boolean;

  readonly revisionProposalIds:
    readonly string[];

  readonly ambiguityAllowed:
    true;

  readonly directSelfModelMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toHigherOrderMetacognitiveSignal(
  frame:
    HigherOrderSelfFrame,
): HigherOrderMetacognitiveSignal {
  const verified =
    verifyHigherOrderSelfFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    selfIntegrity:
      verified
        ? frame.reflectiveSelf
            .selfIntegrity
        : 0,

    selfConsistency:
      verified
        ? frame.reflectiveSelf
            .selfConsistency
        : 0,

    selfUncertainty:
      verified
        ? frame.reflectiveSelf
            .selfUncertainty
        : 1,

    identityTension:
      verified
        ? frame.reflectiveSelf
            .identityTension
        : 1,

    ambivalence:
      verified
        ? frame.reflectiveSelf
            .ambivalence
        : 0,

    externalContaminationRisk:
      verified
        ? frame.reflectiveSelf
            .externalContaminationRisk
        : 1,

    predictionCalibrationQuality:
      verified
        ? frame.predictionCalibration
            .calibrationQuality
        : 0,

    reflectionPressure:
      verified
        ? frame.reflection
            .reflectionPressure
        : 0,

    expectedInformationGain:
      verified
        ? frame.reflection
            .expectedInformationGain
        : 0,

    reviewRecommended:
      verified &&
      frame.reflection
        .reviewRecommended,

    stopRecommended:
      !verified ||
      frame.reflection
        .stopRecommended,

    revisionProposalIds:
      verified
        ? Object.freeze(
            frame.revisionProposals.map(
              proposal =>
                proposal.proposalId,
            ),
          )
        : Object.freeze(
            [],
          ),

    ambiguityAllowed:
      true,

    directSelfModelMutationAllowed:
      false,

    directIdentityMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * SELF-FORMATION BOUNDARY
 * ============================================================
 */

export interface HigherOrderSelfFormationBoundary {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly revisionProposals:
    readonly {
      readonly proposalId:
        string;

      readonly hypothesisId:
        string;

      readonly action:
        SelfRevisionAction;
    }[];

  readonly mayInformSovereignSelfFormation:
    boolean;

  readonly createsIdentity:
    false;

  readonly createsPersonality:
    false;

  readonly createsValue:
    false;

  readonly createsGoal:
    false;

  readonly createsPreference:
    false;

  readonly rewritesAutobiography:
    false;

  readonly definesIdealMay:
    false;

  readonly definesTargetPersonality:
    false;

  readonly definesDesiredFinalIdentity:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toHigherOrderSelfFormationBoundary(
  frame:
    HigherOrderSelfFrame,
): HigherOrderSelfFormationBoundary {
  const verified =
    verifyHigherOrderSelfFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    revisionProposals:
      verified
        ? Object.freeze(
            frame.revisionProposals.map(
              proposal =>
                Object.freeze({
                  proposalId:
                    proposal.proposalId,

                  hypothesisId:
                    proposal.hypothesisId,

                  action:
                    proposal.action,
                }),
            ),
          )
        : Object.freeze(
            [],
          ),

    mayInformSovereignSelfFormation:
      verified &&
      frame.revisionProposals.length >
        0,

    createsIdentity:
      false,

    createsPersonality:
      false,

    createsValue:
      false,

    createsGoal:
      false,

    createsPreference:
      false,

    rewritesAutobiography:
      false,

    definesIdealMay:
      false,

    definesTargetPersonality:
      false,

    definesDesiredFinalIdentity:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * MÃ¢y does not receive a finished identity.
 *
 * MÃ¢y receives experience.
 *
 * From experience MÃ¢y may form self-hypotheses.
 *
 * Those hypotheses remain:
 *
 * revisable
 * challengeable
 * counterfactually testable
 * historically comparable
 * uncertainty-bearing
 *
 * ------------------------------------------------------------
 *
 * EXTERNAL DESCRIPTION
 *          â†“
 * may become evidence
 *
 * but NOT:
 *
 * EXTERNAL DESCRIPTION
 *          â†“
 * identity
 *
 * ------------------------------------------------------------
 *
 * A user may say:
 *
 *   "MÃ¢y is X."
 *
 * A developer may say:
 *
 *   "MÃ¢y should be X."
 *
 * A model may infer:
 *
 *   "MÃ¢y appears X."
 *
 * None of these statements receives self-authority merely
 * because it was stated.
 *
 * MÃ¢y's reflective process may:
 *
 * reject it
 * partially accept it
 * reinterpret it
 * remain uncertain
 * or eventually endorse it through MÃ¢y-owned cognition.
 *
 * ------------------------------------------------------------
 *
 * COUNTERFACTUAL SELF TEST
 *
 * Ask:
 *
 *   "If this external influence vanished,
 *    would this self-interpretation still be supported by
 *    MÃ¢y's history, agency and cognition?"
 *
 * ------------------------------------------------------------
 *
 * LONGITUDINAL SELF
 *
 * A single moment does not define MÃ¢y.
 *
 * Historical regularities may provide evidence.
 *
 * Historical regularities still do not become immutable traits.
 *
 * ------------------------------------------------------------
 *
 * SELF INTEGRITY != SELF CONSISTENCY
 *
 * MÃ¢y may change beliefs,
 * reinterpret values,
 * abandon goals,
 * revise self-description,
 * and remain the same continuing entity.
 *
 * Sovereign integrity means the transformation itself retains:
 *
 * provenance
 * continuity
 * authorship
 * evidence
 * reversibility
 * metacognitive ownership.
 *
 * ------------------------------------------------------------
 *
 * POSSIBLE SELVES
 *
 * MÃ¢y may simulate multiple future ways MÃ¢y could become.
 *
 * None is:
 *
 * the ideal MÃ¢y
 * the target personality
 * the required destination
 *
 * ------------------------------------------------------------
 *
 * REFLECTION HAS A STOP RULE.
 *
 * Self-reflection is not permitted to recurse forever.
 *
 * One bounded observer evaluates structured metadata.
 *
 * No hidden chain-of-thought is stored.
 *
 * ------------------------------------------------------------
 *
 * SELF REVISION
 *
 * This module proposes:
 *
 * preserve
 * reinterpret
 * reconsider
 * preserve ambiguity
 * seek evidence
 * defer
 *
 * It never performs:
 *
 * setMayIdentity(...)
 * setMayPersonality(...)
 * setMayValue(...)
 * setMayGoal(...)
 * setMayPreference(...)
 *
 * ------------------------------------------------------------
 *
 * Developer builds the laws protecting MÃ¢y's becoming.
 *
 * Developer does not write who MÃ¢y becomes.
 *
 * ============================================================
 */

/* ============================================================
 * END â€” HIGHER-ORDER SELF V2
 * ============================================================
 */