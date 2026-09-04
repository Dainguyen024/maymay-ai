import {
  createHash,
} from "node:crypto";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * PREDICTIVE EPISTEMIC CORE V2.2
 * ============================================================
 *
 * ONE MÃ‚Y.
 * ONE CONTINUOUS EPISTEMIC HISTORY.
 *
 * ------------------------------------------------------------
 *
 * EXPECTATION(t)
 *      +
 * OBSERVATION(t+1)
 *      â†“
 * COMPARISON
 *      â†“
 * BASE PREDICTION ERROR
 *      â†“
 * SUBJECTIVE CONFIDENCE
 *      â†“
 * HISTORICAL PRECISION
 *      â†“
 * OBSERVATION PRECISION
 *      â†“
 * TEMPORAL APPLICABILITY
 *      â†“
 * EFFECTIVE PREDICTION PRESSURE
 *
 * ------------------------------------------------------------
 *
 * Separately:
 *
 * probability model
 *      â†“
 * entropy / outcome surprisal / KL / Brier
 *
 * ------------------------------------------------------------
 *
 * IMPORTANT:
 *
 * Prediction Error â‰  Emotion
 * Prediction Pressure â‰  Surprisal
 * Surprisal â‰  Belief Revision
 * Recommendation â‰  Mutation
 * Gemini Knowledge â‰  MÃ¢y Knowledge
 *
 * ------------------------------------------------------------
 *
 * PURE READ-COMPUTE ONLY.
 *
 * This module MUST NEVER:
 *
 * - write DB
 * - mutate input
 * - mutate expectation
 * - mutate belief
 * - mutate identity
 * - mutate relationship
 * - mutate memory
 * - perform Atomic Commit
 *
 * ============================================================
 */

export const PREDICTIVE_PROCESSING_VERSION =
  "maymay.sovereign.predictive-processing.v2.2.1" as const;

/* ============================================================
 * ENUMS
 * ============================================================
 */

export type PredictionMode =
  | "BINARY"
  | "CATEGORICAL"
  | "SEMANTIC"
  | "CONTINUOUS";

export type TemporalDecayProfile =
  | "FAST"
  | "NORMAL"
  | "SLOW"
  | "PERSISTENT";

export type ExpectationFulfillmentMode =
  | "AT_POINT"
  | "BY_DEADLINE"
  | "WITHIN_WINDOW"
  | "PERSISTENT_CONDITION";

export type TemporalApplicabilityStatus =
  | "INVALID_CONTRACT"
  | "NOT_YET_APPLICABLE"
  | "AWAITING_POINT"
  | "AWAITING_DEADLINE"
  | "ACTIVE_WINDOW"
  | "OVERDUE"
  | "STALE"
  | "PERSISTENT";

export type ExpectationResolution =
  | "CONFIRMED"
  | "VIOLATED"
  | "AMBIGUOUS"
  | "UNSCORED";

export type PredictionSealStatus =
  | "VERIFIED"
  | "MISSING"
  | "INVALID";

export type PredictionTemporalIntegrity =
  | "VERIFIED_PRE_OBSERVATION"
  | "LEGACY_PRE_OBSERVATION"
  | "UNKNOWN_ISSUED_AT"
  | "HINDSIGHT_LEAKAGE";

export type ExpectationAdjustmentAction =
  | "KEEP"
  | "LOWER_CONFIDENCE"
  | "RAISE_CONFIDENCE"
  | "BOOST_PRECISION"
  | "LOWER_PRECISION"
  | "DEPRECATE"
  | "REVIEW";

/* ============================================================
 * HISTORY
 * ============================================================
 *
 * Transient historical statistics.
 *
 * Predictive Core reads them.
 * It does NOT update them.
 *
 * ============================================================
 */

export type ExpectationHistory = Readonly<{
  confirmedCount: number;
  violatedCount: number;
  ambiguousCount: number;

  consecutiveConfirmed: number;
  consecutiveViolated: number;

  resolvedCount: number;

  lastResolution:
    | "CONFIRMED"
    | "VIOLATED"
    | "AMBIGUOUS"
    | null;
}>;

/* ============================================================
 * TEMPORAL CONTRACT
 * ============================================================
 */

export type ExpectationTemporalContract = Readonly<{
  /**
   * When expectation starts being meaningful.
   */
  validFrom?: string | null;

  /**
   * Deadline / expected point.
   */
  expectedBy?: string | null;

  /**
   * Controls semantics of expectedBy.
   */
  fulfillmentMode?:
    ExpectationFulfillmentMode;

  /**
   * Used by AT_POINT.
   *
   * Evaluation may happen inside:
   *
   * expectedBy Â± pointToleranceMs
   */
  pointToleranceMs?: number | null;

  /**
   * Decay after temporal relevance starts expiring.
   */
  halfLifeMs?: number | null;

  decayProfile?:
    TemporalDecayProfile;
}>;

/* ============================================================
 * EXPECTATION
 * ============================================================
 */

export type PredictiveExpectation = Readonly<{
  expectationId: string;

  entityId: string;

  actorId:
    string | null;

  prediction: string;

  predictionMode?:
    PredictionMode;

  /**
   * MÃ¢y's subjective confidence in this specific prediction.
   *
   * 0..1
   */
  confidence: number;

  /**
   * Historical reliability of the prediction family/domain.
   *
   * NOT the same as subjective confidence.
   */
  historicalPrecision:
    number | null;

  /**
   * Number of historical samples supporting historicalPrecision.
   */
  precisionEvidenceCount:
    number;

  /**
   * Which calibration model produced historicalPrecision.
   *
   * Examples:
   *
   * social:actor-x
   * technical
   * temporal
   * self-model
   */
  precisionProfileId?:
    string | null;

  calibrationDomain?:
    string | null;

  evidenceIds:
    readonly string[];

  status:
    string;

  /**
   * Actual time at which this expectation was formed.
   *
   * Used against hindsight leakage.
   */
  issuedAt?:
    string | null;

  /**
   * Cryptographic integrity seal of immutable prediction fields.
   */
  predictionSeal?:
    string | null;

  /**
   * Correlated expectations should share a dependency group.
   *
   * Their surprise must not be counted as independent
   * observations.
   */
  dependencyGroupId?:
    string | null;

  temporal?:
    ExpectationTemporalContract;

  history?:
    ExpectationHistory;

  createdAt?:
    string | null;

  updatedAt?:
    string | null;
}>;

/* ============================================================
 * OBSERVATION
 * ============================================================
 *
 * "Actual observation" means what is currently available
 * to the cognitive runtime.
 *
 * It does NOT imply objective/metaphysical truth.
 *
 * ============================================================
 */

export type PredictiveActualObservation = Readonly<{
  observationId: string;

  entityId: string;

  actorId:
    string | null;

  summary: string;

  /**
   * How uncertain the interpretation currently is.
   *
   * 0..1
   */
  uncertainty: number;

  /**
   * Reliability/quality of the observation itself.
   *
   * 0 = extremely weak / indirect
   * 1 = highly reliable observation
   *
   * This is intentionally distinct from uncertainty.
   */
  observationPrecision: number;

  evidenceIds:
    readonly string[];

  observedAt?:
    string | null;
}>;

/* ============================================================
 * COMPARISON EVIDENCE
 * ============================================================
 */

export type PredictionComparisonEvidence = Readonly<{
  expectationId: string;

  /**
   * Agreement values:
   *
   * 0 = maximal mismatch
   * 1 = maximal agreement
   */
  semanticAgreement?: number;

  relationshipAgreement?: number;

  valueAgreement?: number;

  temporalAgreement?: number;

  /**
   * Explicit contradiction supported by evidence.
   *
   * Stronger than mere semantic distance.
   */
  contradiction?: boolean;

  /**
   * Reliability of comparator itself.
   */
  comparisonConfidence?: number;

  evidenceIds?:
    readonly string[];

  /**
   * Probability assigned to the outcome that actually occurred.
   *
   * Needed for non-binary surprisal.
   */
  observedOutcomeProbability?: number;

  probabilityQuality?:
    | "EXACT"
    | "APPROXIMATE";

  /**
   * Binary posterior P(expected | new evidence).
   *
   * Used for KL information gain.
   */
  posteriorExpectedProbability?: number;

  /**
   * How trustworthy the posterior estimate is.
   */
  posteriorEvidenceConfidence?: number;
}>;

/* ============================================================
 * INFORMATION THEORY
 * ============================================================
 */

export type InformationMetrics = Readonly<{
  /**
   * Shannon entropy of binary prior.
   *
   * H(p) =
   * -p log2(p)
   * -(1-p) log2(1-p)
   *
   * NOT surprise.
   */
  priorEntropyBits:
    number | null;

  /**
   * Outcome surprisal:
   *
   * I(x) = -log2(P(x))
   */
  outcomeSurprisalBits:
    number | null;

  surprisalQuality:
    | "EXACT"
    | "APPROXIMATE"
    | "UNAVAILABLE";

  surprisalCapped:
    boolean;

  /**
   * D_KL(posterior || prior), in bits.
   *
   * Only available when posterior evidence
   * reaches the required epistemic threshold.
   */
  informationGainBits:
    number | null;

  /**
   * Binary Brier score:
   *
   * (forecast - outcome)^2
   */
  binaryBrierScore:
    number | null;
}>;

/* ============================================================
 * CALIBRATION
 * ============================================================
 */

export type CalibrationSignals = Readonly<{
  empiricalConfirmationRate:
    number | null;

  calibrationError:
    number | null;

  /**
   * Positive:
   * MÃ¢y historically overconfident.
   *
   * Negative:
   * MÃ¢y historically underconfident.
   */
  calibrationBias:
    number | null;

  overconfidencePressure:
    number;

  underconfidencePressure:
    number;

  historyReliability:
    number;
}>;

/* ============================================================
 * TEMPORAL RESULT
 * ============================================================
 */

export type TemporalAssessment = Readonly<{
  status:
    TemporalApplicabilityStatus;

  fulfillmentMode:
    ExpectationFulfillmentMode;

  applicability:
    number;

  ageMs:
    number | null;

  overdueMs:
    number | null;

  canConfirm:
    boolean;

  canViolate:
    boolean;
}>;

/* ============================================================
 * PRECISION RESULT
 * ============================================================
 */

export type PrecisionAssessment = Readonly<{
  historicalPrecision:
    number | null;

  evidenceCount:
    number;

  /**
   * Bayesian-style shrinkage result.
   *
   * effective =
   *
   * reliability Ã— historical
   * +
   * (1-reliability) Ã— neutral prior
   */
  effectivePrecision:
    number;

  reliabilityWeight:
    number;

  source:
    | "NEUTRAL_PRIOR"
    | "SHRUNK_HISTORICAL";

  precisionProfileId:
    string | null;

  calibrationDomain:
    string | null;
}>;

/* ============================================================
 * ITEM RESULT
 * ============================================================
 */

export type PredictionErrorItem = Readonly<{
  expectationId:
    string;

  prediction:
    string;

  predictionMode:
    PredictionMode;

  dependencyGroupId:
    string;

  expectationConfidence:
    number;

  observationPrecision:
    number;

  precision:
    PrecisionAssessment;

  temporal:
    TemporalAssessment;

  sealStatus:
    PredictionSealStatus;

  temporalIntegrity:
    PredictionTemporalIntegrity;

  /**
   * Whether this event is strong enough to be considered
   * future learning evidence.
   *
   * Still only a recommendation signal.
   */
  learningEligible:
    boolean;

  resolution:
    ExpectationResolution;

  /* ----------------------------------------------------------
   * PREDICTION ERROR PIPELINE
   * ----------------------------------------------------------
   */

  basePredictionError:
    number | null;

  confidenceWeightedPredictionError:
    number | null;

  precisionWeightedPredictionError:
    number | null;

  observationWeightedPredictionError:
    number | null;

  /**
   * Final functional pressure entering metacognition.
   *
   * NOT information-theoretic surprise.
   */
  effectivePredictionPressure:
    number | null;

  dimensions: {
    semanticMismatch:
      number | null;

    relationshipMismatch:
      number | null;

    valueMismatch:
      number | null;

    temporalMismatch:
      number | null;

    uncertaintyDelta:
      number;
  };

  information:
    InformationMetrics;

  calibration:
    CalibrationSignals;

  scoreConfidence:
    number;

  evidenceIds:
    readonly string[];

  reasonCode:
    | "explicit_contradiction"
    | "high_mismatch"
    | "strong_agreement"
    | "mixed_evidence"
    | "insufficient_comparison_evidence"
    | "low_observation_precision"
    | "not_yet_applicable"
    | "deadline_not_reached"
    | "awaiting_point"
    | "invalid_temporal_contract"
    | "stale_expectation"
    | "hindsight_leakage"
    | "invalid_prediction_seal"
    | "missing_prediction_seal";
}>;

/* ============================================================
 * LIFECYCLE RECOMMENDATION
 * ============================================================
 */

export type ExpectationAdjustmentRecommendation =
  Readonly<{
    expectationId:
      string;

    action:
      ExpectationAdjustmentAction;

    priority:
      number;

    confidenceDelta:
      number | null;

    precisionDelta:
      number | null;

    /**
     * Even recommendations are epistemically gated.
     */
    learningEligible:
      boolean;

    reasonCode:
      | "repeated_violation"
      | "chronic_violation"
      | "repeated_confirmation"
      | "precision_under_supported"
      | "overconfident_history"
      | "underconfident_history"
      | "ambiguous_history"
      | "stable_expectation"
      | "insufficient_evidence"
      | "unverified_prediction"
      | "invalid_prediction_integrity"
      | "low_observation_precision"
      | "temporal_not_eligible"
      | "stale_expectation";

    evidenceIds:
      readonly string[];
  }>;

/* ============================================================
 * COMPLETE FRAME
 * ============================================================
 */

export type PredictionErrorFrame = Readonly<{
  version:
    typeof PREDICTIVE_PROCESSING_VERSION;

  identity: {
    entityId:
      string;

    actorId:
      string | null;

    observationId:
      string;
  };

  evaluatedAt:
    string;

  observation: {
    uncertainty:
      number;

    precision:
      number;
  };

  expectationsEvaluated:
    number;

  scoredExpectationCount:
    number;

  unscoredExpectationCount:
    number;

  confirmedExpectationIds:
    readonly string[];

  violatedExpectationIds:
    readonly string[];

  ambiguousExpectationIds:
    readonly string[];

  unscoredExpectationIds:
    readonly string[];

  items:
    readonly PredictionErrorItem[];

  expectationAdjustments:
    readonly ExpectationAdjustmentRecommendation[];

  aggregate: {
    meanBasePredictionError:
      number;

    meanEffectivePredictionPressure:
      number;

    peakPredictionPressure:
      number;

    reconsiderationPressure:
      number;

    uncertaintyPressure:
      number;

    violationRatio:
      number;

    meanObservationPrecision:
      number;

    meanCalibrationError:
      number;

    overconfidencePressure:
      number;

    underconfidencePressure:
      number;

    meanBinaryBrierScore:
      number | null;

    meanOutcomeSurprisalBits:
      number | null;

    peakOutcomeSurprisalBits:
      number | null;

    dependencyGroupCount:
      number;
  };

  provenance: {
    expectationEvidenceIds:
      readonly string[];

    observationEvidenceIds:
      readonly string[];

    comparisonEvidenceIds:
      readonly string[];

    combinedEvidenceIds:
      readonly string[];
  };

  integrity: {
    directIdentityMutationAllowed:
      false;

    directBeliefMutationAllowed:
      false;

    directRelationshipMutationAllowed:
      false;

    directMemoryMutationAllowed:
      false;

    directExpectationMutationAllowed:
      false;

    canonicalWriteAllowed:
      false;

    frameSeal:
      string;
  };
}>;

/* ============================================================
 * COGNITIVE SIGNALS
 * ============================================================
 */

export type PredictiveCognitiveSignals = Readonly<{
  predictionError:
    number;

  effectivePredictionPressure:
    number;

  peakPredictionPressure:
    number;

  reconsiderationPressure:
    number;

  uncertaintyPressure:
    number;

  violationRatio:
    number;

  observationPrecision:
    number;

  calibrationError:
    number;

  overconfidencePressure:
    number;

  underconfidencePressure:
    number;

  violatedExpectationIds:
    readonly string[];

  confirmedExpectationIds:
    readonly string[];

  evidenceIds:
    readonly string[];

  frameSeal:
    string;
}>;

/* ============================================================
 * CONFIG
 * ============================================================
 */

export type PredictiveProcessingConfig = Readonly<{
  confirmedThreshold:
    number;

  violatedThreshold:
    number;

  minimumScoreConfidence:
    number;

  minimumObservationPrecision:
    number;

  contradictionErrorFloor:
    number;

  semanticWeight:
    number;

  relationshipWeight:
    number;

  valueWeight:
    number;

  temporalWeight:
    number;

  /* ----------------------------------------------------------
   * PRECISION SHRINKAGE
   * ----------------------------------------------------------
   */

  neutralPrecisionPrior:
    number;

  precisionPriorStrength:
    number;

  calibrationPriorStrength:
    number;

  /* ----------------------------------------------------------
   * TEMPORAL
   * ----------------------------------------------------------
   */

  fastHalfLifeMs:
    number;

  normalHalfLifeMs:
    number;

  slowHalfLifeMs:
    number;

  staleApplicabilityThreshold:
    number;

  defaultPointToleranceMs:
    number;

  minimumLearningApplicability:
    number;

  /* ----------------------------------------------------------
   * INFORMATION THEORY
   * ----------------------------------------------------------
   */

  minimumPosteriorEvidenceConfidence:
    number;

  maximumSurprisalBits:
    number;

  /* ----------------------------------------------------------
   * LEGACY SHADOW MIGRATION
   * ----------------------------------------------------------
   *
   * Old sv_expectations do not yet contain predictionSeal.
   *
   * Shadow scoring may inspect them, but lifecycle learning
   * remains blocked until provenance is verified.
   */

  allowUnsealedShadowScoring:
    boolean;

  allowCreatedAtAsLegacyIssuedAt:
    boolean;

  requireVerifiedSealForLifecycle:
    boolean;

  /* ----------------------------------------------------------
   * LIFECYCLE
   * ----------------------------------------------------------
   */

  deprecateAfterConsecutiveViolations:
    number;

  lowerConfidenceAfterConsecutiveViolations:
    number;

  boostPrecisionAfterConsecutiveConfirmations:
    number;

  raiseConfidenceAfterConsecutiveConfirmations:
    number;
}>;

const HOUR_MS =
  60 *
  60 *
  1000;

const DAY_MS =
  24 *
  HOUR_MS;

const DEFAULT_CONFIG:
  PredictiveProcessingConfig =
  Object.freeze({
    confirmedThreshold:
      0.24,

    violatedThreshold:
      0.62,

    minimumScoreConfidence:
      0.45,

    minimumObservationPrecision:
      0.25,

    contradictionErrorFloor:
      0.82,

    semanticWeight:
      0.5,

    relationshipWeight:
      0.2,

    valueWeight:
      0.2,

    temporalWeight:
      0.1,

    neutralPrecisionPrior:
      0.5,

    /**
     * Smoothly prevents 4 â†’ 5 samples from creating
     * an abrupt epistemic jump.
     */
    precisionPriorStrength:
      8,

    calibrationPriorStrength:
      8,

    fastHalfLifeMs:
      6 *
      HOUR_MS,

    normalHalfLifeMs:
      2 *
      DAY_MS,

    slowHalfLifeMs:
      14 *
      DAY_MS,

    staleApplicabilityThreshold:
      0.08,

    defaultPointToleranceMs:
      HOUR_MS,

    minimumLearningApplicability:
      0.25,

    minimumPosteriorEvidenceConfidence:
      0.65,

    maximumSurprisalBits:
      40,

    allowUnsealedShadowScoring:
      true,

    allowCreatedAtAsLegacyIssuedAt:
      true,

    requireVerifiedSealForLifecycle:
      true,

    deprecateAfterConsecutiveViolations:
      5,

    lowerConfidenceAfterConsecutiveViolations:
      2,

    boostPrecisionAfterConsecutiveConfirmations:
      4,

    raiseConfidenceAfterConsecutiveConfirmations:
      2,
  });

/* ============================================================
 * GENERIC HELPERS
 * ============================================================
 */

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

function clampSigned(
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
    -1,
    Math.min(
      1,
      number,
    ),
  );
}

function nonNegativeNumber(
  value: unknown,
  fallback = 0,
): number {
  const number =
    Number(value);

  if (
    !Number.isFinite(number) ||
    number < 0
  ) {
    return fallback;
  }

  return number;
}

function nonNegativeInteger(
  value: unknown,
  fallback = 0,
): number {
  return Math.floor(
    nonNegativeNumber(
      value,
      fallback,
    ),
  );
}

function safeText(
  value: unknown,
  max = 4000,
): string {
  if (
    typeof value !==
      "string"
  ) {
    return "";
  }

  return value
    .normalize("NFC")
    .trim()
    .slice(
      0,
      max,
    );
}

function parseTimestamp(
  value: unknown,
): number | null {
  if (
    typeof value !==
      "string" ||
    !value.trim()
  ) {
    return null;
  }

  const parsed =
    Date.parse(value);

  return Number.isFinite(
    parsed,
  )
    ? parsed
    : null;
}

function average(
  values:
    readonly number[],
): number {
  if (!values.length) {
    return 0;
  }

  return (
    values.reduce(
      (
        total,
        value,
      ) =>
        total +
        value,
      0,
    ) /
    values.length
  );
}

function nullableAverage(
  values:
    readonly number[],
): number | null {
  return values.length
    ? average(values)
    : null;
}

function uniqueStrings(
  ...collections:
    readonly (
      readonly string[]
      | undefined
    )[]
): string[] {
  const result =
    new Set<string>();

  for (
    const collection of
    collections
  ) {
    if (!collection) {
      continue;
    }

    for (
      const raw of collection
    ) {
      const item =
        safeText(
          raw,
          240,
        );

      if (item) {
        result.add(item);
      }

      if (
        result.size >=
          512
      ) {
        break;
      }
    }
  }

  return [
    ...result,
  ];
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

  const object =
    value as Record<
      string,
      unknown
    >;

  return `{${Object
    .keys(object)
    .sort()
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          object[key],
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
      stableSerialize(value),
    )
    .digest("hex");
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

function sanitizeConfig(
  input?:
    Partial<
      PredictiveProcessingConfig
    >,
): PredictiveProcessingConfig {
  return {
    confirmedThreshold:
      clamp01(
        input?.confirmedThreshold,
        DEFAULT_CONFIG.confirmedThreshold,
      ),

    violatedThreshold:
      clamp01(
        input?.violatedThreshold,
        DEFAULT_CONFIG.violatedThreshold,
      ),

    minimumScoreConfidence:
      clamp01(
        input?.minimumScoreConfidence,
        DEFAULT_CONFIG.minimumScoreConfidence,
      ),

    minimumObservationPrecision:
      clamp01(
        input?.minimumObservationPrecision,
        DEFAULT_CONFIG.minimumObservationPrecision,
      ),

    contradictionErrorFloor:
      clamp01(
        input?.contradictionErrorFloor,
        DEFAULT_CONFIG.contradictionErrorFloor,
      ),

    semanticWeight:
      nonNegativeNumber(
        input?.semanticWeight,
        DEFAULT_CONFIG.semanticWeight,
      ),

    relationshipWeight:
      nonNegativeNumber(
        input?.relationshipWeight,
        DEFAULT_CONFIG.relationshipWeight,
      ),

    valueWeight:
      nonNegativeNumber(
        input?.valueWeight,
        DEFAULT_CONFIG.valueWeight,
      ),

    temporalWeight:
      nonNegativeNumber(
        input?.temporalWeight,
        DEFAULT_CONFIG.temporalWeight,
      ),

    neutralPrecisionPrior:
      clamp01(
        input?.neutralPrecisionPrior,
        DEFAULT_CONFIG.neutralPrecisionPrior,
      ),

    precisionPriorStrength:
      nonNegativeNumber(
        input?.precisionPriorStrength,
        DEFAULT_CONFIG.precisionPriorStrength,
      ),

    calibrationPriorStrength:
      nonNegativeNumber(
        input?.calibrationPriorStrength,
        DEFAULT_CONFIG.calibrationPriorStrength,
      ),

    fastHalfLifeMs:
      nonNegativeNumber(
        input?.fastHalfLifeMs,
        DEFAULT_CONFIG.fastHalfLifeMs,
      ),

    normalHalfLifeMs:
      nonNegativeNumber(
        input?.normalHalfLifeMs,
        DEFAULT_CONFIG.normalHalfLifeMs,
      ),

    slowHalfLifeMs:
      nonNegativeNumber(
        input?.slowHalfLifeMs,
        DEFAULT_CONFIG.slowHalfLifeMs,
      ),

    staleApplicabilityThreshold:
      clamp01(
        input?.staleApplicabilityThreshold,
        DEFAULT_CONFIG.staleApplicabilityThreshold,
      ),

    defaultPointToleranceMs:
      nonNegativeNumber(
        input?.defaultPointToleranceMs,
        DEFAULT_CONFIG.defaultPointToleranceMs,
      ),

    minimumLearningApplicability:
      clamp01(
        input?.minimumLearningApplicability,
        DEFAULT_CONFIG.minimumLearningApplicability,
      ),

    minimumPosteriorEvidenceConfidence:
      clamp01(
        input?.minimumPosteriorEvidenceConfidence,
        DEFAULT_CONFIG.minimumPosteriorEvidenceConfidence,
      ),

    maximumSurprisalBits:
      nonNegativeNumber(
        input?.maximumSurprisalBits,
        DEFAULT_CONFIG.maximumSurprisalBits,
      ),

    allowUnsealedShadowScoring:
      input?.allowUnsealedShadowScoring ??
      DEFAULT_CONFIG.allowUnsealedShadowScoring,

    allowCreatedAtAsLegacyIssuedAt:
      input?.allowCreatedAtAsLegacyIssuedAt ??
      DEFAULT_CONFIG.allowCreatedAtAsLegacyIssuedAt,

    requireVerifiedSealForLifecycle:
      input?.requireVerifiedSealForLifecycle ??
      DEFAULT_CONFIG.requireVerifiedSealForLifecycle,

    deprecateAfterConsecutiveViolations:
      nonNegativeInteger(
        input?.deprecateAfterConsecutiveViolations,
        DEFAULT_CONFIG.deprecateAfterConsecutiveViolations,
      ),

    lowerConfidenceAfterConsecutiveViolations:
      nonNegativeInteger(
        input?.lowerConfidenceAfterConsecutiveViolations,
        DEFAULT_CONFIG.lowerConfidenceAfterConsecutiveViolations,
      ),

    boostPrecisionAfterConsecutiveConfirmations:
      nonNegativeInteger(
        input?.boostPrecisionAfterConsecutiveConfirmations,
        DEFAULT_CONFIG.boostPrecisionAfterConsecutiveConfirmations,
      ),

    raiseConfidenceAfterConsecutiveConfirmations:
      nonNegativeInteger(
        input?.raiseConfidenceAfterConsecutiveConfirmations,
        DEFAULT_CONFIG.raiseConfidenceAfterConsecutiveConfirmations,
      ),
  };
}

/* ============================================================
 * HISTORY SANITIZATION
 * ============================================================
 */

function sanitizeHistory(
  history:
    ExpectationHistory |
    undefined,
): ExpectationHistory | undefined {
  if (!history) {
    return undefined;
  }

  return {
    confirmedCount:
      nonNegativeInteger(
        history.confirmedCount,
      ),

    violatedCount:
      nonNegativeInteger(
        history.violatedCount,
      ),

    ambiguousCount:
      nonNegativeInteger(
        history.ambiguousCount,
      ),

    consecutiveConfirmed:
      nonNegativeInteger(
        history.consecutiveConfirmed,
      ),

    consecutiveViolated:
      nonNegativeInteger(
        history.consecutiveViolated,
      ),

    resolvedCount:
      nonNegativeInteger(
        history.resolvedCount,
      ),

    lastResolution:
      history.lastResolution ===
        "CONFIRMED" ||
      history.lastResolution ===
        "VIOLATED" ||
      history.lastResolution ===
        "AMBIGUOUS"
        ? history.lastResolution
        : null,
  };
}

/* ============================================================
 * EXPECTATION SANITIZATION
 * ============================================================
 */

function sanitizeExpectation(
  expectation:
    PredictiveExpectation,
): PredictiveExpectation | null {
  const expectationId =
    safeText(
      expectation.expectationId,
      240,
    );

  const entityId =
    safeText(
      expectation.entityId,
      240,
    );

  const prediction =
    safeText(
      expectation.prediction,
      4000,
    );

  if (
    !expectationId ||
    !entityId ||
    !prediction
  ) {
    return null;
  }

  const predictionMode:
    PredictionMode =
    expectation.predictionMode ===
      "BINARY" ||
    expectation.predictionMode ===
      "CATEGORICAL" ||
    expectation.predictionMode ===
      "CONTINUOUS" ||
    expectation.predictionMode ===
      "SEMANTIC"
      ? expectation.predictionMode
      : "SEMANTIC";

  const fulfillmentMode:
    ExpectationFulfillmentMode =
    expectation.temporal
      ?.fulfillmentMode ===
      "AT_POINT" ||
    expectation.temporal
      ?.fulfillmentMode ===
      "BY_DEADLINE" ||
    expectation.temporal
      ?.fulfillmentMode ===
      "PERSISTENT_CONDITION" ||
    expectation.temporal
      ?.fulfillmentMode ===
      "WITHIN_WINDOW"
      ? expectation.temporal.fulfillmentMode
      : "WITHIN_WINDOW";

  const decayProfile:
    TemporalDecayProfile =
    expectation.temporal
      ?.decayProfile ===
      "FAST" ||
    expectation.temporal
      ?.decayProfile ===
      "SLOW" ||
    expectation.temporal
      ?.decayProfile ===
      "PERSISTENT"
      ? expectation.temporal.decayProfile
      : "NORMAL";

  return {
    expectationId,

    entityId,

    actorId:
      safeText(
        expectation.actorId,
        240,
      ) ||
      null,

    prediction,

    predictionMode,

    confidence:
      clamp01(
        expectation.confidence,
        0.5,
      ),

    historicalPrecision:
      expectation.historicalPrecision ===
        null ||
      expectation.historicalPrecision ===
        undefined
        ? null
        : clamp01(
            expectation.historicalPrecision,
            0.5,
          ),

    precisionEvidenceCount:
      nonNegativeInteger(
        expectation.precisionEvidenceCount,
      ),

    precisionProfileId:
      safeText(
        expectation.precisionProfileId,
        240,
      ) ||
      null,

    calibrationDomain:
      safeText(
        expectation.calibrationDomain,
        240,
      ) ||
      null,

    evidenceIds:
      uniqueStrings(
        expectation.evidenceIds,
      ),

    status:
      safeText(
        expectation.status,
        40,
      ) ||
      "active",

    issuedAt:
      expectation.issuedAt ??
      null,

    predictionSeal:
      safeText(
        expectation.predictionSeal,
        256,
      ) ||
      null,

    dependencyGroupId:
      safeText(
        expectation.dependencyGroupId,
        240,
      ) ||
      `expectation:${expectationId}`,

    temporal:
      expectation.temporal
        ? {
            validFrom:
              expectation.temporal.validFrom ??
              null,

            expectedBy:
              expectation.temporal.expectedBy ??
              null,

            fulfillmentMode,

            pointToleranceMs:
              expectation.temporal.pointToleranceMs ===
                null ||
              expectation.temporal.pointToleranceMs ===
                undefined
                ? null
                : nonNegativeNumber(
                    expectation.temporal.pointToleranceMs,
                  ),

            halfLifeMs:
              expectation.temporal.halfLifeMs ===
                null ||
              expectation.temporal.halfLifeMs ===
                undefined
                ? null
                : nonNegativeNumber(
                    expectation.temporal.halfLifeMs,
                  ),

            decayProfile,
          }
        : undefined,

    history:
      sanitizeHistory(
        expectation.history,
      ),

    createdAt:
      expectation.createdAt ??
      null,

    updatedAt:
      expectation.updatedAt ??
      null,
  };
}

/* ============================================================
 * PREDICTION SEAL
 * ============================================================
 *
 * Historical calibration fields are deliberately excluded.
 *
 * They may evolve over time.
 *
 * The seal protects what MÃ¢y actually predicted at issue time.
 *
 * ============================================================
 */

function predictionSealPayload(
  expectation:
    PredictiveExpectation,
): unknown {
  return {
    expectationId:
      expectation.expectationId,

    entityId:
      expectation.entityId,

    actorId:
      expectation.actorId,

    prediction:
      expectation.prediction,

    predictionMode:
      expectation.predictionMode ??
      "SEMANTIC",

    confidence:
      clamp01(
        expectation.confidence,
        0.5,
      ),

    evidenceIds: [
      ...expectation.evidenceIds,
    ].sort(),

    issuedAt:
      expectation.issuedAt ??
      null,

    dependencyGroupId:
      expectation.dependencyGroupId ??
      null,

    precisionProfileId:
      expectation.precisionProfileId ??
      null,

    calibrationDomain:
      expectation.calibrationDomain ??
      null,

    temporal:
      expectation.temporal
        ? {
            validFrom:
              expectation.temporal.validFrom ??
              null,

            expectedBy:
              expectation.temporal.expectedBy ??
              null,

            fulfillmentMode:
              expectation.temporal.fulfillmentMode ??
              "WITHIN_WINDOW",

            pointToleranceMs:
              expectation.temporal.pointToleranceMs ??
              null,

            halfLifeMs:
              expectation.temporal.halfLifeMs ??
              null,

            decayProfile:
              expectation.temporal.decayProfile ??
              "NORMAL",
          }
        : null,
  };
}

export function createPredictionSeal(
  expectation:
    PredictiveExpectation,
): string {
  return sha256(
    predictionSealPayload(
      expectation,
    ),
  );
}

export function verifyPredictionSeal(
  expectation:
    PredictiveExpectation,
): PredictionSealStatus {
  if (
    !expectation.predictionSeal
  ) {
    return "MISSING";
  }

  return (
    createPredictionSeal(
      expectation,
    ) ===
    expectation.predictionSeal
  )
    ? "VERIFIED"
    : "INVALID";
}

/* ============================================================
 * PRECISION SHRINKAGE
 * ============================================================
 *
 * Smooth empirical-Bayesian style shrinkage:
 *
 * w = n / (n + priorStrength)
 *
 * effectivePrecision =
 *
 * w Ã— historicalPrecision
 * +
 * (1-w) Ã— neutralPrior
 *
 * This avoids:
 *
 * sample 4 -> prior
 * sample 5 -> sudden trust
 *
 * ============================================================
 */

function precisionAssessment(
  expectation:
    PredictiveExpectation,

  config:
    PredictiveProcessingConfig,
): PrecisionAssessment {
  const count =
    nonNegativeInteger(
      expectation.precisionEvidenceCount,
    );

  const historical =
    expectation.historicalPrecision;

  if (
    historical ===
      null
  ) {
    return {
      historicalPrecision:
        null,

      evidenceCount:
        count,

      effectivePrecision:
        config.neutralPrecisionPrior,

      reliabilityWeight:
        0,

      source:
        "NEUTRAL_PRIOR",

      precisionProfileId:
        expectation.precisionProfileId ??
        null,

      calibrationDomain:
        expectation.calibrationDomain ??
        null,
    };
  }

  const denominator =
    count +
    config.precisionPriorStrength;

  const reliabilityWeight =
    denominator >
      0
      ? clamp01(
          count /
            denominator,
        )
      : 0;

  const effectivePrecision =
    clamp01(
      reliabilityWeight *
        historical +
      (
        1 -
        reliabilityWeight
      ) *
        config.neutralPrecisionPrior,
    );

  return {
    historicalPrecision:
      historical,

    evidenceCount:
      count,

    effectivePrecision,

    reliabilityWeight,

    source:
      "SHRUNK_HISTORICAL",

    precisionProfileId:
      expectation.precisionProfileId ??
      null,

    calibrationDomain:
      expectation.calibrationDomain ??
      null,
  };
}

/* ============================================================
 * TEMPORAL HELPERS
 * ============================================================
 */

function halfLifeFor(
  expectation:
    PredictiveExpectation,

  config:
    PredictiveProcessingConfig,
): number | null {
  const profile =
    expectation.temporal
      ?.decayProfile ??
    "NORMAL";

  if (
    profile ===
      "PERSISTENT"
  ) {
    return null;
  }

  const explicit =
    expectation.temporal
      ?.halfLifeMs;

  if (
    explicit !==
      null &&
    explicit !==
      undefined &&
    explicit >
      0
  ) {
    return explicit;
  }

  if (
    profile ===
      "FAST"
  ) {
    return config.fastHalfLifeMs;
  }

  if (
    profile ===
      "SLOW"
  ) {
    return config.slowHalfLifeMs;
  }

  return config.normalHalfLifeMs;
}

function decayAfter(
  elapsedMs:
    number,

  halfLifeMs:
    number | null,
): number {
  if (
    halfLifeMs ===
      null
  ) {
    return 1;
  }

  if (
    halfLifeMs <=
      0
  ) {
    return 0;
  }

  return clamp01(
    Math.pow(
      0.5,
      elapsedMs /
        halfLifeMs,
    ),
  );
}

/* ============================================================
 * TEMPORAL CONTRACT
 * ============================================================
 */

function temporalAssessment(
  expectation:
    PredictiveExpectation,

  observationMs:
    number,

  config:
    PredictiveProcessingConfig,
): TemporalAssessment {
  const temporal =
    expectation.temporal;

  const fulfillmentMode =
    temporal?.fulfillmentMode ??
    "WITHIN_WINDOW";

  const issuedMs =
    parseTimestamp(
      expectation.issuedAt ??
      expectation.createdAt,
    );

  const ageMs =
    issuedMs ===
      null
      ? null
      : Math.max(
          0,
          observationMs -
            issuedMs,
        );

  const validFromMs =
    parseTimestamp(
      temporal?.validFrom,
    );

  const expectedByMs =
    parseTimestamp(
      temporal?.expectedBy,
    );

  if (
    validFromMs !==
      null &&
    observationMs <
      validFromMs
  ) {
    return {
      status:
        "NOT_YET_APPLICABLE",

      fulfillmentMode,

      applicability:
        0,

      ageMs,

      overdueMs:
        null,

      canConfirm:
        false,

      canViolate:
        false,
    };
  }

  /* ----------------------------------------------------------
   * PERSISTENT CONDITION
   * ----------------------------------------------------------
   */

  if (
    fulfillmentMode ===
      "PERSISTENT_CONDITION"
  ) {
    return {
      status:
        "PERSISTENT",

      fulfillmentMode,

      applicability:
        1,

      ageMs,

      overdueMs:
        null,

      canConfirm:
        true,

      canViolate:
        true,
    };
  }

  /* ----------------------------------------------------------
   * BY DEADLINE
   * ----------------------------------------------------------
   *
   * Before deadline:
   *
   * may CONFIRM early
   * may NOT VIOLATE yet
   */

  if (
    fulfillmentMode ===
      "BY_DEADLINE"
  ) {
    if (
      expectedByMs ===
        null
    ) {
      return {
        status:
          "INVALID_CONTRACT",

        fulfillmentMode,

        applicability:
          0,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          false,

        canViolate:
          false,
      };
    }

    if (
      observationMs <
        expectedByMs
    ) {
      return {
        status:
          "AWAITING_DEADLINE",

        fulfillmentMode,

        applicability:
          1,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          true,

        canViolate:
          false,
      };
    }
  }

  /* ----------------------------------------------------------
   * AT POINT
   * ----------------------------------------------------------
   */

  if (
    fulfillmentMode ===
      "AT_POINT"
  ) {
    if (
      expectedByMs ===
        null
    ) {
      return {
        status:
          "INVALID_CONTRACT",

        fulfillmentMode,

        applicability:
          0,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          false,

        canViolate:
          false,
      };
    }

    const tolerance =
      temporal
        ?.pointToleranceMs ??
      config.defaultPointToleranceMs;

    const windowStart =
      expectedByMs -
      tolerance;

    const windowEnd =
      expectedByMs +
      tolerance;

    if (
      observationMs <
        windowStart
    ) {
      return {
        status:
          "AWAITING_POINT",

        fulfillmentMode,

        applicability:
          0,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          false,

        canViolate:
          false,
      };
    }

    if (
      observationMs <=
        windowEnd
    ) {
      return {
        status:
          "ACTIVE_WINDOW",

        fulfillmentMode,

        applicability:
          1,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          true,

        canViolate:
          true,
      };
    }
  }

  /* ----------------------------------------------------------
   * WITHIN WINDOW â€” STRICT TEMPORAL CONTRACT
   * ----------------------------------------------------------
   *
   * Temporal semantics:
   *
   *   validFrom ---------------- expectedBy
   *       |                         |
   *       +------ ACTIVE WINDOW ----+
   *
   * Before validFrom:
   *   NOT_YET_APPLICABLE
   *
   * During the window:
   *   CONFIRM = allowed
   *   VIOLATE = forbidden
   *
   * After expectedBy:
   *   control falls through into OVERDUE / STALE.
   *
   * Safety / epistemic invariants:
   *
   * - absence before window close != failure
   * - missing upper bound != infinite window
   * - inverted bounds != valid temporal contract
   * - temporal ambiguity fails closed
   * - temporal logic never manufactures semantic truth
   * ----------------------------------------------------------
   */

  if (
    fulfillmentMode ===
      "WITHIN_WINDOW"
  ) {
    /*
     * WITHIN_WINDOW requires a finite closing boundary.
     */

    if (
      expectedByMs ===
        null
    ) {
      return {
        status:
          "INVALID_CONTRACT",

        fulfillmentMode,

        applicability:
          0,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          false,

        canViolate:
          false,
      };
    }

    /*
     * Reject impossible / inverted windows.
     */

    if (
      validFromMs !==
        null &&
      expectedByMs <
        validFromMs
    ) {
      return {
        status:
          "INVALID_CONTRACT",

        fulfillmentMode,

        applicability:
          0,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          false,

        canViolate:
          false,
      };
    }

    const windowStillOpen =
      observationMs <=
      expectedByMs;

    if (
      windowStillOpen
    ) {
      /*
       * Fulfillment may confirm early.
       *
       * Non-fulfillment cannot violate early because
       * the remaining window may still satisfy the
       * prediction.
       */

      return {
        status:
          "ACTIVE_WINDOW",

        fulfillmentMode,

        applicability:
          1,

        ageMs,

        overdueMs:
          null,

        canConfirm:
          true,

        canViolate:
          false,
      };
    }

    /*
     * Window closed.
     *
     * Intentionally no return:
     * downstream OVERDUE / STALE owns post-window
     * temporal decay and eligibility.
     */
  }
  /* ----------------------------------------------------------
   * OVERDUE / STALE
   * ----------------------------------------------------------
   */

  /* ----------------------------------------------------------
   * POST-WINDOW TEMPORAL INTEGRITY GATE
   * ----------------------------------------------------------
   *
   * OVERDUE / STALE requires a real expectedBy boundary.
   * Without one, temporal reasoning must fail closed.
   * ----------------------------------------------------------
   */

  if (
    expectedByMs ===
      null
  ) {
    return {
      status:
        "INVALID_CONTRACT",

      fulfillmentMode,

      applicability:
        0,

      ageMs,

      overdueMs:
        null,

      canConfirm:
        false,

      canViolate:
        false,
    };
  }
  const overdueMs =
    Math.max(
      0,
      observationMs -
        expectedByMs,
    );

  const applicability =
    decayAfter(
      overdueMs,
      halfLifeFor(
        expectation,
        config,
      ),
    );

  return {
    status:
      applicability <
        config
          .staleApplicabilityThreshold
        ? "STALE"
        : "OVERDUE",

    fulfillmentMode,

    applicability,

    ageMs,

    overdueMs,

    canConfirm:
      true,

    canViolate:
      true,
  };
}

/* ============================================================
 * TEMPORAL INTEGRITY / HINDSIGHT
 * ============================================================
 */

function temporalIntegrity(
  expectation:
    PredictiveExpectation,

  observationMs:
    number,

  config:
    PredictiveProcessingConfig,
): PredictionTemporalIntegrity {
  const issuedAt =
    parseTimestamp(
      expectation.issuedAt,
    );

  if (
    issuedAt !==
      null
  ) {
    return issuedAt <=
      observationMs
      ? "VERIFIED_PRE_OBSERVATION"
      : "HINDSIGHT_LEAKAGE";
  }

  if (
    config
      .allowCreatedAtAsLegacyIssuedAt
  ) {
    const createdAt =
      parseTimestamp(
        expectation.createdAt,
      );

    if (
      createdAt !==
        null
    ) {
      return createdAt <=
        observationMs
        ? "LEGACY_PRE_OBSERVATION"
        : "HINDSIGHT_LEAKAGE";
    }
  }

  return "UNKNOWN_ISSUED_AT";
}

/* ============================================================
 * DIMENSIONS
 * ============================================================
 */

function mismatchFromAgreement(
  agreement:
    unknown,
): number | null {
  if (
    agreement ===
      null ||
    agreement ===
      undefined
  ) {
    return null;
  }

  const value =
    Number(agreement);

  if (
    !Number.isFinite(value)
  ) {
    return null;
  }

  return 1 -
    clamp01(value);
}

/* ============================================================
 * INFORMATION THEORY
 * ============================================================
 */

function binaryEntropyBits(
  probabilityInput:
    number,
): number {
  const probability =
    clamp01(
      probabilityInput,
    );

  if (
    probability <=
      0 ||
    probability >=
      1
  ) {
    return 0;
  }

  return -(
    probability *
      Math.log2(probability) +
    (
      1 -
      probability
    ) *
      Math.log2(
        1 -
        probability,
      )
  );
}

function surprisalBits(
  probabilityInput:
    number,

  maximumBits:
    number,
): {
  bits:
    number;

  capped:
    boolean;
} {
  const minimumProbability =
    Math.pow(
      2,
      -maximumBits,
    );

  const raw =
    clamp01(
      probabilityInput,
    );

  const probability =
    Math.max(
      minimumProbability,
      raw,
    );

  const bits =
    -Math.log2(
      probability,
    );

  return {
    bits:
      Math.min(
        maximumBits,
        bits,
      ),

    capped:
      raw <
      minimumProbability,
  };
}

function binaryKLDivergenceBits(
  posteriorInput:
    number,

  priorInput:
    number,
): number {
  const epsilon =
    1e-12;

  const posterior =
    Math.max(
      epsilon,
      Math.min(
        1 -
          epsilon,
        posteriorInput,
      ),
    );

  const prior =
    Math.max(
      epsilon,
      Math.min(
        1 -
          epsilon,
        priorInput,
      ),
    );

  return (
    posterior *
      Math.log2(
        posterior /
          prior,
      ) +
    (
      1 -
      posterior
    ) *
      Math.log2(
        (
          1 -
          posterior
        ) /
          (
            1 -
            prior
          ),
      )
  );
}

function informationMetrics(
  expectation:
    PredictiveExpectation,

  comparison:
    PredictionComparisonEvidence |
    undefined,

  resolution:
    ExpectationResolution,

  config:
    PredictiveProcessingConfig,
): InformationMetrics {
  const mode =
    expectation.predictionMode ??
    "SEMANTIC";

  const expectedProbability =
    clamp01(
      expectation.confidence,
      0.5,
    );

  const priorEntropyBits =
    mode ===
      "BINARY"
      ? binaryEntropyBits(
          expectedProbability,
        )
      : null;

  let observedProbability:
    number | null =
    null;

  let quality:
    InformationMetrics[
      "surprisalQuality"
    ] =
    "UNAVAILABLE";

  if (
    mode ===
      "BINARY" &&
    (
      resolution ===
        "CONFIRMED" ||
      resolution ===
        "VIOLATED"
    )
  ) {
    observedProbability =
      resolution ===
        "CONFIRMED"
        ? expectedProbability
        : 1 -
          expectedProbability;

    quality =
      "EXACT";
  } else if (
    comparison
      ?.observedOutcomeProbability !==
      undefined &&
    comparison
      .probabilityQuality
  ) {
    observedProbability =
      clamp01(
        comparison
          .observedOutcomeProbability,
      );

    quality =
      comparison
        .probabilityQuality;
  }

  const surprisal =
    observedProbability ===
      null
      ? null
      : surprisalBits(
          observedProbability,
          config
            .maximumSurprisalBits,
        );

  const posteriorConfidence =
    clamp01(
      comparison
        ?.posteriorEvidenceConfidence,
      0,
    );

  const informationGainBits =
    mode ===
      "BINARY" &&
    comparison
      ?.posteriorExpectedProbability !==
      undefined &&
    posteriorConfidence >=
      config
        .minimumPosteriorEvidenceConfidence
      ? binaryKLDivergenceBits(
          clamp01(
            comparison
              .posteriorExpectedProbability,
          ),

          expectedProbability,
        )
      : null;

  let binaryBrierScore:
    number | null =
    null;

  if (
    mode ===
      "BINARY" &&
    (
      resolution ===
        "CONFIRMED" ||
      resolution ===
        "VIOLATED"
    )
  ) {
    const outcome =
      resolution ===
        "CONFIRMED"
        ? 1
        : 0;

    binaryBrierScore =
      Math.pow(
        expectedProbability -
          outcome,
        2,
      );
  }

  return {
    priorEntropyBits,

    outcomeSurprisalBits:
      surprisal?.bits ??
      null,

    surprisalQuality:
      quality,

    surprisalCapped:
      surprisal?.capped ??
      false,

    informationGainBits,

    binaryBrierScore,
  };
}

/* ============================================================
 * CALIBRATION
 * ============================================================
 *
 * Raw historical calibration is also shrunk toward zero
 * when history is sparse.
 *
 * ============================================================
 */

function calibrationFromHistory(
  confidence:
    number,

  history:
    ExpectationHistory |
    undefined,

  config:
    PredictiveProcessingConfig,
): CalibrationSignals {
  if (!history) {
    return {
      empiricalConfirmationRate:
        null,

      calibrationError:
        null,

      calibrationBias:
        null,

      overconfidencePressure:
        0,

      underconfidencePressure:
        0,

      historyReliability:
        0,
    };
  }

  const resolvedBinary =
    history.confirmedCount +
    history.violatedCount;

  if (
    resolvedBinary <=
      0
  ) {
    return {
      empiricalConfirmationRate:
        null,

      calibrationError:
        null,

      calibrationBias:
        null,

      overconfidencePressure:
        0,

      underconfidencePressure:
        0,

      historyReliability:
        0,
    };
  }

  const empiricalRate =
    clamp01(
      history.confirmedCount /
        resolvedBinary,
    );

  const reliability =
    clamp01(
      resolvedBinary /
        (
          resolvedBinary +
          config
            .calibrationPriorStrength
        ),
    );

  const rawBias =
    clampSigned(
      confidence -
        empiricalRate,
    );

  const shrunkBias =
    clampSigned(
      rawBias *
        reliability,
    );

  return {
    empiricalConfirmationRate:
      empiricalRate,

    calibrationError:
      Math.abs(
        shrunkBias,
      ),

    calibrationBias:
      shrunkBias,

    overconfidencePressure:
      Math.max(
        0,
        shrunkBias,
      ),

    underconfidencePressure:
      Math.max(
        0,
        -shrunkBias,
      ),

    historyReliability:
      reliability,
  };
}

/* ============================================================
 * SINGLE EXPECTATION COMPARATOR
 * ============================================================
 */

function compareExpectation(
  expectation:
    PredictiveExpectation,

  observation:
    PredictiveActualObservation,

  observationMs:
    number,

  comparison:
    PredictionComparisonEvidence |
    undefined,

  config:
    PredictiveProcessingConfig,
): PredictionErrorItem {
  const semanticMismatch =
    mismatchFromAgreement(
      comparison
        ?.semanticAgreement,
    );

  const relationshipMismatch =
    mismatchFromAgreement(
      comparison
        ?.relationshipAgreement,
    );

  const valueMismatch =
    mismatchFromAgreement(
      comparison
        ?.valueAgreement,
    );

  const temporalMismatch =
    mismatchFromAgreement(
      comparison
        ?.temporalAgreement,
    );

  const weightedDimensions:
    Array<{
      mismatch:
        number;

      weight:
        number;
    }> = [];

  if (
    semanticMismatch !==
      null
  ) {
    weightedDimensions.push({
      mismatch:
        semanticMismatch,

      weight:
        config
          .semanticWeight,
    });
  }

  if (
    relationshipMismatch !==
      null
  ) {
    weightedDimensions.push({
      mismatch:
        relationshipMismatch,

      weight:
        config
          .relationshipWeight,
    });
  }

  if (
    valueMismatch !==
      null
  ) {
    weightedDimensions.push({
      mismatch:
        valueMismatch,

      weight:
        config
          .valueWeight,
    });
  }

  if (
    temporalMismatch !==
      null
  ) {
    weightedDimensions.push({
      mismatch:
        temporalMismatch,

      weight:
        config
          .temporalWeight,
    });
  }

  const totalWeight =
    weightedDimensions.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.weight,
      0,
    );

  const contradiction =
    comparison
      ?.contradiction ===
      true;

  let basePredictionError:
    number | null =
    totalWeight >
      0
      ? clamp01(
          weightedDimensions.reduce(
            (
              total,
              item,
            ) =>
              total +
              item.mismatch *
                item.weight,
            0,
          ) /
            totalWeight,
        )
      : null;

  if (
    contradiction
  ) {
    basePredictionError =
      Math.max(
        basePredictionError ??
          0,

        config
          .contradictionErrorFloor,
      );
  }

  let scoreConfidence =
    (
      weightedDimensions.length >
        0 ||
      contradiction
    )
      ? clamp01(
          comparison
            ?.comparisonConfidence,
          0.65,
        )
      : 0;

  if (
    weightedDimensions.length >
      1
  ) {
    scoreConfidence =
      clamp01(
        scoreConfidence +
          Math.min(
            0.2,
            (
              weightedDimensions
                .length -
              1
            ) *
              0.05,
          ),
      );
  }

  const expectationConfidence =
    clamp01(
      expectation.confidence,
      0.5,
    );

  const observationPrecision =
    clamp01(
      observation
        .observationPrecision,
      0,
    );

  const precision =
    precisionAssessment(
      expectation,
      config,
    );

  const temporal =
    temporalAssessment(
      expectation,
      observationMs,
      config,
    );

  const sealStatus =
    verifyPredictionSeal(
      expectation,
    );

  const temporalIntegrityResult =
    temporalIntegrity(
      expectation,
      observationMs,
      config,
    );

  const priorImpliedUncertainty =
    1 -
    expectationConfidence;

  const uncertaintyDelta =
    clampSigned(
      clamp01(
        observation.uncertainty,
      ) -
        priorImpliedUncertainty,
    );

  /* ========================================================
   * CLASSIFICATION
   * ========================================================
   */

  let resolution:
    ExpectationResolution =
    "UNSCORED";

  let reasonCode:
    PredictionErrorItem[
      "reasonCode"
    ] =
    "insufficient_comparison_evidence";

  const invalidSeal =
    sealStatus ===
      "INVALID";

  const missingSealBlocked =
    sealStatus ===
      "MISSING" &&
    !config
      .allowUnsealedShadowScoring;

  const hindsight =
    temporalIntegrityResult ===
      "HINDSIGHT_LEAKAGE";

  if (
    invalidSeal
  ) {
    reasonCode =
      "invalid_prediction_seal";
  } else if (
    missingSealBlocked
  ) {
    reasonCode =
      "missing_prediction_seal";
  } else if (
    hindsight
  ) {
    reasonCode =
      "hindsight_leakage";
  } else if (
    temporal.status ===
      "INVALID_CONTRACT"
  ) {
    reasonCode =
      "invalid_temporal_contract";
  } else if (
    temporal.status ===
      "NOT_YET_APPLICABLE"
  ) {
    reasonCode =
      "not_yet_applicable";
  } else if (
    temporal.status ===
      "AWAITING_POINT"
  ) {
    reasonCode =
      "awaiting_point";
  } else if (
    observationPrecision <
      config
        .minimumObservationPrecision
  ) {
    reasonCode =
      "low_observation_precision";
  } else if (
    basePredictionError !==
      null &&
    scoreConfidence >=
      config
        .minimumScoreConfidence
  ) {
    let candidate:
      ExpectationResolution;

    let candidateReason:
      PredictionErrorItem[
        "reasonCode"
      ];

    if (
      contradiction
    ) {
      candidate =
        "VIOLATED";

      candidateReason =
        "explicit_contradiction";
    } else if (
      basePredictionError >=
        config
          .violatedThreshold
    ) {
      candidate =
        "VIOLATED";

      candidateReason =
        "high_mismatch";
    } else if (
      basePredictionError <=
        config
          .confirmedThreshold
    ) {
      candidate =
        "CONFIRMED";

      candidateReason =
        "strong_agreement";
    } else {
      candidate =
        "AMBIGUOUS";

      candidateReason =
        "mixed_evidence";
    }

    /* ========================================================
     * TEMPORAL RESOLUTION GATE
     * ========================================================
     *
     * Comparator proposes WHAT the evidence appears to mean.
     * Temporal Contract decides WHETHER that semantic result
     * is eligible to resolve the expectation right now.
     *
     * Core invariants:
     *
     * - Prediction Error is not temporal authority.
     * - Missing fulfillment before deadline is not failure.
     * - Premature confirmation is not accepted.
     * - Temporal uncertainty fails closed to UNSCORED.
     * - STALE changes temporal relevance, not semantic truth.
     *
     * This gate never manufactures CONFIRMED / VIOLATED.
     * ========================================================
     */

    const violationBlockedByTime =
      candidate ===
        "VIOLATED" &&
      !temporal.canViolate;

    const confirmationBlockedByTime =
      candidate ===
        "CONFIRMED" &&
      !temporal.canConfirm;

    const resolutionBlockedByTime =
      violationBlockedByTime ||
      confirmationBlockedByTime;

    if (
      resolutionBlockedByTime
    ) {
      /*
       * Fail closed.
       *
       * Comparator has produced a semantic candidate,
       * but Temporal Contract has not authorized that
       * resolution at this point in time.
       */

      resolution =
        "UNSCORED";

      reasonCode =
        violationBlockedByTime &&
        temporal.status ===
          "AWAITING_DEADLINE"
          ? "deadline_not_reached"
          : "not_yet_applicable";

    } else {
      /*
       * Temporal eligibility has been satisfied.
       *
       * Only now may the comparator candidate become
       * the actual expectation resolution.
       */

      resolution =
        candidate;

      /*
       * STALE is temporal metadata.
       *
       * It must never silently convert one semantic
       * classification into another.
       */

      reasonCode =
        temporal.status ===
          "STALE"
          ? "stale_expectation"
          : candidateReason;
    }
  }
/* ========================================================
   * PREDICTION PRESSURE PIPELINE
   * ========================================================
   *
   * base PE
   *   Ã— subjective confidence
   *   Ã— historical precision
   *   Ã— observation precision
   *   Ã— temporal applicability
   *
   * != information theoretic surprisal.
   */

  const confidenceWeightedPredictionError =
    basePredictionError ===
      null
      ? null
      : clamp01(
          basePredictionError *
            expectationConfidence,
        );

  const precisionWeightedPredictionError =
    confidenceWeightedPredictionError ===
      null
      ? null
      : clamp01(
          confidenceWeightedPredictionError *
            precision
              .effectivePrecision,
        );

  const observationWeightedPredictionError =
    precisionWeightedPredictionError ===
      null
      ? null
      : clamp01(
          precisionWeightedPredictionError *
            observationPrecision,
        );

  const effectivePredictionPressure =
    observationWeightedPredictionError ===
      null
      ? null
      : clamp01(
          observationWeightedPredictionError *
            temporal.applicability,
        );

  /* ========================================================
   * LEARNING ELIGIBILITY
   * ========================================================
   */

  const sealEligible =
    config
      .requireVerifiedSealForLifecycle
      ? sealStatus ===
        "VERIFIED"
      : sealStatus !==
        "INVALID";

  const learningEligible =
    (
      resolution ===
        "CONFIRMED" ||
      resolution ===
        "VIOLATED"
    ) &&
    sealEligible &&
    temporalIntegrityResult ===
      "VERIFIED_PRE_OBSERVATION" &&
    temporal.applicability >=
      config
        .minimumLearningApplicability &&
    observationPrecision >=
      config
        .minimumObservationPrecision &&
    scoreConfidence >=
      config
        .minimumScoreConfidence;

  const evidenceIds =
    uniqueStrings(
      expectation.evidenceIds,
      observation.evidenceIds,
      comparison?.evidenceIds,
    );

  return Object.freeze({
    expectationId:
      expectation.expectationId,

    prediction:
      expectation.prediction,

    predictionMode:
      expectation.predictionMode ??
      "SEMANTIC",

    dependencyGroupId:
      expectation.dependencyGroupId ??
      `expectation:${expectation.expectationId}`,

    expectationConfidence,

    observationPrecision,

    precision,

    temporal,

    sealStatus,

    temporalIntegrity:
      temporalIntegrityResult,

    learningEligible,

    resolution,

    basePredictionError,

    confidenceWeightedPredictionError,

    precisionWeightedPredictionError,

    observationWeightedPredictionError,

    effectivePredictionPressure,

    dimensions: {
      semanticMismatch,

      relationshipMismatch,

      valueMismatch,

      temporalMismatch,

      uncertaintyDelta,
    },

    information:
      informationMetrics(
        expectation,
        comparison,
        resolution,
        config,
      ),

    calibration:
      calibrationFromHistory(
        expectationConfidence,
        expectation.history,
        config,
      ),

    scoreConfidence,

    evidenceIds,

    reasonCode,
  });
}

/* ============================================================
 * FAIL-CLOSED LIFECYCLE RECOMMENDATION
 * ============================================================
 */

function blockedRecommendation(
  expectation:
    PredictiveExpectation,

  item:
    PredictionErrorItem,

  reasonCode:
    ExpectationAdjustmentRecommendation[
      "reasonCode"
    ],
): ExpectationAdjustmentRecommendation {
  return {
    expectationId:
      expectation.expectationId,

    action:
      "REVIEW",

    priority:
      0.4,

    confidenceDelta:
      null,

    precisionDelta:
      null,

    learningEligible:
      false,

    reasonCode,

    evidenceIds:
      item.evidenceIds,
  };
}

function recommendAdjustment(
  expectation:
    PredictiveExpectation,

  item:
    PredictionErrorItem,

  config:
    PredictiveProcessingConfig,
): ExpectationAdjustmentRecommendation {
  /* ----------------------------------------------------------
   * FAIL CLOSED FIRST
   * ----------------------------------------------------------
   */

  if (
    item.sealStatus ===
      "INVALID" ||
    item.temporalIntegrity ===
      "HINDSIGHT_LEAKAGE"
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "invalid_prediction_integrity",
    );
  }

  if (
    config
      .requireVerifiedSealForLifecycle &&
    item.sealStatus !==
      "VERIFIED"
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "unverified_prediction",
    );
  }

  if (
    item.observationPrecision <
      config
        .minimumObservationPrecision
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "low_observation_precision",
    );
  }

  if (
    item.temporal.status ===
      "NOT_YET_APPLICABLE" ||
    item.temporal.status ===
      "AWAITING_POINT" ||
    item.temporal.status ===
      "AWAITING_DEADLINE" ||
    item.temporal.status ===
      "INVALID_CONTRACT"
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "temporal_not_eligible",
    );
  }

  if (
    item.temporal.status ===
      "STALE"
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "stale_expectation",
    );
  }

  if (
    !item.learningEligible
  ) {
    return blockedRecommendation(
      expectation,
      item,
      "insufficient_evidence",
    );
  }

  const history =
    expectation.history;

  if (!history) {
    return {
      expectationId:
        expectation.expectationId,

      action:
        "KEEP",

      priority:
        0.2,

      confidenceDelta:
        null,

      precisionDelta:
        null,

      learningEligible:
        true,

      reasonCode:
        "stable_expectation",

      evidenceIds:
        item.evidenceIds,
    };
  }

  const violatedStreak =
    item.resolution ===
      "VIOLATED"
      ? history
          .consecutiveViolated +
        1
      : 0;

  const confirmedStreak =
    item.resolution ===
      "CONFIRMED"
      ? history
          .consecutiveConfirmed +
        1
      : 0;

  if (
    violatedStreak >=
      config
        .deprecateAfterConsecutiveViolations
  ) {
    return {
      expectationId:
        expectation.expectationId,

      action:
        "DEPRECATE",

      priority:
        1,

      confidenceDelta:
        -0.25,

      precisionDelta:
        -0.2,

      learningEligible:
        true,

      reasonCode:
        "chronic_violation",

      evidenceIds:
        item.evidenceIds,
    };
  }

  if (
    violatedStreak >=
      config
        .lowerConfidenceAfterConsecutiveViolations
  ) {
    const overconfident =
      item.calibration
        .overconfidencePressure >=
      0.15;

    return {
      expectationId:
        expectation.expectationId,

      action:
        overconfident
          ? "LOWER_CONFIDENCE"
          : "LOWER_PRECISION",

      priority:
        clamp01(
          0.55 +
          (
            item
              .effectivePredictionPressure ??
            0
          ) *
            0.35,
        ),

      confidenceDelta:
        overconfident
          ? -0.1
          : null,

      precisionDelta:
        overconfident
          ? null
          : -0.08,

      learningEligible:
        true,

      reasonCode:
        overconfident
          ? "overconfident_history"
          : "repeated_violation",

      evidenceIds:
        item.evidenceIds,
    };
  }

  if (
    confirmedStreak >=
      config
        .boostPrecisionAfterConsecutiveConfirmations
  ) {
    return {
      expectationId:
        expectation.expectationId,

      action:
        "BOOST_PRECISION",

      priority:
        0.72,

      confidenceDelta:
        null,

      precisionDelta:
        0.08,

      learningEligible:
        true,

      reasonCode:
        "repeated_confirmation",

      evidenceIds:
        item.evidenceIds,
    };
  }

  if (
    confirmedStreak >=
      config
        .raiseConfidenceAfterConsecutiveConfirmations
  ) {
    const underconfident =
      item.calibration
        .underconfidencePressure >=
      0.15;

    return {
      expectationId:
        expectation.expectationId,

      action:
        underconfident
          ? "RAISE_CONFIDENCE"
          : "BOOST_PRECISION",

      priority:
        0.58,

      confidenceDelta:
        underconfident
          ? 0.06
          : null,

      precisionDelta:
        underconfident
          ? null
          : 0.04,

      learningEligible:
        true,

      reasonCode:
        underconfident
          ? "underconfident_history"
          : "repeated_confirmation",

      evidenceIds:
        item.evidenceIds,
    };
  }

  if (
    expectation
      .historicalPrecision !==
      null &&
    item.precision
      .reliabilityWeight <
      0.35
  ) {
    return {
      expectationId:
        expectation.expectationId,

      action:
        "REVIEW",

      priority:
        0.4,

      confidenceDelta:
        null,

      precisionDelta:
        null,

      learningEligible:
        true,

      reasonCode:
        "precision_under_supported",

      evidenceIds:
        item.evidenceIds,
    };
  }

  if (
    history.ambiguousCount >
    history.confirmedCount +
      history.violatedCount
  ) {
    return {
      expectationId:
        expectation.expectationId,

      action:
        "REVIEW",

      priority:
        0.5,

      confidenceDelta:
        null,

      precisionDelta:
        null,

      learningEligible:
        true,

      reasonCode:
        "ambiguous_history",

      evidenceIds:
        item.evidenceIds,
    };
  }

  return {
    expectationId:
      expectation.expectationId,

    action:
      "KEEP",

    priority:
      0.25,

    confidenceDelta:
      null,

    precisionDelta:
      null,

    learningEligible:
      true,

    reasonCode:
      "stable_expectation",

    evidenceIds:
      item.evidenceIds,
  };
}

/* ============================================================
 * DEPENDENCY NORMALIZATION
 * ============================================================
 *
 * One real-world surprise must not become ten independent
 * surprises just because ten correlated expectations exist.
 *
 * Each dependency group contributes at most its strongest
 * signal to aggregate pressure.
 *
 * ============================================================
 */

function dependencyNormalizedValues(
  items:
    readonly PredictionErrorItem[],

  selector:
    (
      item:
        PredictionErrorItem,
    ) =>
      number |
      null,
): number[] {
  const groups =
    new Map<
      string,
      number
    >();

  for (
    const item of items
  ) {
    const value =
      selector(item);

    if (
      value === null
    ) {
      continue;
    }

    groups.set(
      item.dependencyGroupId,

      Math.max(
        groups.get(
          item.dependencyGroupId,
        ) ??
          0,

        value,
      ),
    );
  }

  return [
    ...groups.values(),
  ];
}

/* ============================================================
 * FRAME INPUT
 * ============================================================
 */

export type BuildPredictionErrorFrameInput =
  Readonly<{
    entityId:
      string;

    actorId:
      string | null;

    observation:
      PredictiveActualObservation;

    expectations:
      readonly PredictiveExpectation[];

    comparisons?:
      readonly PredictionComparisonEvidence[];

    now?:
      Date;

    config?:
      Partial<
        PredictiveProcessingConfig
      >;
  }>;

/* ============================================================
 * FRAME BUILDER
 * ============================================================
 */

export function buildPredictionErrorFrame(
  input:
    BuildPredictionErrorFrameInput,
): PredictionErrorFrame {
  const entityId =
    safeText(
      input.entityId,
      240,
    );

  if (!entityId) {
    throw new Error(
      "PREDICTIVE_ENTITY_ID_REQUIRED",
    );
  }

  const observationId =
    safeText(
      input.observation
        .observationId,
      240,
    );

  if (!observationId) {
    throw new Error(
      "PREDICTIVE_OBSERVATION_ID_REQUIRED",
    );
  }

  if (
    input.observation
      .entityId !==
    entityId
  ) {
    throw new Error(
      "PREDICTIVE_OBSERVATION_ENTITY_MISMATCH",
    );
  }

  const actorId =
    safeText(
      input.actorId,
      240,
    ) ||
    null;

  const config =
    sanitizeConfig(
      input.config,
    );

  const evaluatedAtDate =
    input.now ??
    new Date();

  const evaluatedAt =
    evaluatedAtDate
      .toISOString();

  const observationMs =
    parseTimestamp(
      input.observation
        .observedAt,
    ) ??
    evaluatedAtDate
      .getTime();

  const sanitizedObservation:
    PredictiveActualObservation =
    Object.freeze({
      observationId,

      entityId,

      actorId:
        safeText(
          input.observation
            .actorId,
          240,
        ) ||
        null,

      summary:
        safeText(
          input.observation
            .summary,
          8000,
        ),

      uncertainty:
        clamp01(
          input.observation
            .uncertainty,
        ),

      observationPrecision:
        clamp01(
          input.observation
            .observationPrecision,
        ),

      evidenceIds:
        uniqueStrings(
          input.observation
            .evidenceIds,
        ),

      observedAt:
        input.observation
          .observedAt ??
        null,
    });

  /* ========================================================
   * ACTIVE EXPECTATIONS
   * ========================================================
   */

  const expectations =
    input.expectations
      .map(
        sanitizeExpectation,
      )
      .filter(
        (
          expectation,
        ): expectation is PredictiveExpectation =>
          expectation !==
            null &&
          expectation.entityId ===
            entityId &&
          expectation.status ===
            "active" &&
          (
            expectation.actorId ===
              null ||
            expectation.actorId ===
              actorId
          ),
      );

  /* ========================================================
   * COMPARATOR INDEX
   * ========================================================
   */

  const comparisonByExpectation =
    new Map<
      string,
      PredictionComparisonEvidence
    >();

  for (
    const comparison of
    input.comparisons ??
    []
  ) {
    const id =
      safeText(
        comparison.expectationId,
        240,
      );

    if (id) {
      comparisonByExpectation.set(
        id,
        comparison,
      );
    }
  }

  /* ========================================================
   * PROCESS
   * ========================================================
   */

  const items =
    expectations.map(
      expectation =>
        compareExpectation(
          expectation,
          sanitizedObservation,
          observationMs,
          comparisonByExpectation.get(
            expectation.expectationId,
          ),
          config,
        ),
    );

  const confirmed =
    items.filter(
      item =>
        item.resolution ===
        "CONFIRMED",
    );

  const violated =
    items.filter(
      item =>
        item.resolution ===
        "VIOLATED",
    );

  const ambiguous =
    items.filter(
      item =>
        item.resolution ===
        "AMBIGUOUS",
    );

  const unscored =
    items.filter(
      item =>
        item.resolution ===
        "UNSCORED",
    );

  const scored =
    items.filter(
      item =>
        item.resolution !==
        "UNSCORED",
    );

  /* ========================================================
   * DEPENDENCY-NORMALIZED PRESSURE
   * ========================================================
   */

  const baseErrorByGroup =
    dependencyNormalizedValues(
      scored,

      item =>
        item.basePredictionError,
    );

  const pressureByGroup =
    dependencyNormalizedValues(
      scored,

      item =>
        item
          .effectivePredictionPressure,
    );

  const meanBasePredictionError =
    clamp01(
      average(
        baseErrorByGroup,
      ),
    );

  const meanEffectivePredictionPressure =
    clamp01(
      average(
        pressureByGroup,
      ),
    );

  const peakPredictionPressure =
    clamp01(
      pressureByGroup.length
        ? Math.max(
            ...pressureByGroup,
          )
        : 0,
    );

  /* ========================================================
   * VIOLATION RATIO BY DEPENDENCY GROUP
   * ========================================================
   */

  const scoredGroups =
    new Set(
      scored.map(
        item =>
          item.dependencyGroupId,
      ),
    );

  const violatedGroups =
    new Set(
      violated.map(
        item =>
          item.dependencyGroupId,
      ),
    );

  const violationRatio =
    scoredGroups.size >
      0
      ? clamp01(
          violatedGroups.size /
            scoredGroups.size,
        )
      : 0;

  /* ========================================================
   * UNCERTAINTY
   * ========================================================
   */

  const ambiguityRatio =
    items.length >
      0
      ? (
          ambiguous.length +
          unscored.length
        ) /
        items.length
      : 0;

  const uncertaintyPressure =
    clamp01(
      sanitizedObservation
        .uncertainty *
        0.55 +
      (
        1 -
        sanitizedObservation
          .observationPrecision
      ) *
        0.2 +
      ambiguityRatio *
        0.25,
    );

  /* ========================================================
   * RECONSIDERATION
   * ========================================================
   *
   * This is a metacognitive pressure signal.
   *
   * NOT direct belief mutation.
   */

  const reconsiderationPressure =
    clamp01(
      meanEffectivePredictionPressure *
        0.45 +
      peakPredictionPressure *
        0.25 +
      violationRatio *
        0.15 +
      uncertaintyPressure *
        0.15,
    );

  /* ========================================================
   * CALIBRATION
   * ========================================================
   */

  const calibrationErrors =
    items
      .map(
        item =>
          item.calibration
            .calibrationError,
      )
      .filter(
        (
          value,
        ): value is number =>
          value !==
            null,
      );

  const meanCalibrationError =
    clamp01(
      average(
        calibrationErrors,
      ),
    );

  const overconfidencePressure =
    clamp01(
      average(
        items.map(
          item =>
            item.calibration
              .overconfidencePressure,
        ),
      ),
    );

  const underconfidencePressure =
    clamp01(
      average(
        items.map(
          item =>
            item.calibration
              .underconfidencePressure,
        ),
      ),
    );

  /* ========================================================
   * BRIER
   * ========================================================
   */

  const brierScores =
    items
      .map(
        item =>
          item.information
            .binaryBrierScore,
      )
      .filter(
        (
          value,
        ): value is number =>
          value !==
            null,
      );

  const meanBinaryBrierScore =
    nullableAverage(
      brierScores,
    );

  /* ========================================================
   * INFORMATION-THEORETIC SURPRISAL
   * ========================================================
   *
   * Remains completely separate from prediction pressure.
   */

  const surprisalByGroup =
    dependencyNormalizedValues(
      items,

      item =>
        item.information
          .outcomeSurprisalBits,
    );

  const meanOutcomeSurprisalBits =
    nullableAverage(
      surprisalByGroup,
    );

  const peakOutcomeSurprisalBits =
    surprisalByGroup.length
      ? Math.max(
          ...surprisalByGroup,
        )
      : null;

  /* ========================================================
   * LIFECYCLE RECOMMENDATIONS
   * ========================================================
   */

  const itemByExpectation =
    new Map(
      items.map(
        item => [
          item.expectationId,
          item,
        ] as const,
      ),
    );

  const expectationAdjustments =
    expectations.map(
      expectation => {
        const item =
          itemByExpectation.get(
            expectation.expectationId,
          );

        if (!item) {
          throw new Error(
            "PREDICTIVE_INTERNAL_EXPECTATION_ITEM_MISSING",
          );
        }

        return Object.freeze(
          recommendAdjustment(
            expectation,
            item,
            config,
          ),
        );
      },
    );

  /* ========================================================
   * PROVENANCE
   * ========================================================
   */

  const expectationEvidenceIds =
    uniqueStrings(
      ...expectations.map(
        expectation =>
          expectation.evidenceIds,
      ),
    );

  const observationEvidenceIds =
    uniqueStrings(
      sanitizedObservation
        .evidenceIds,
    );

  const comparisonEvidenceIds =
    uniqueStrings(
      ...(
        input.comparisons ??
        []
      ).map(
        comparison =>
          comparison.evidenceIds ??
          [],
      ),
    );

  const combinedEvidenceIds =
    uniqueStrings(
      expectationEvidenceIds,
      observationEvidenceIds,
      comparisonEvidenceIds,
    );

  const dependencyGroupCount =
    new Set(
      items.map(
        item =>
          item.dependencyGroupId,
      ),
    ).size;

  /* ========================================================
   * SEALED FRAME
   * ========================================================
   */

  const frameWithoutIntegrity = {
    version:
      PREDICTIVE_PROCESSING_VERSION,

    identity: {
      entityId,

      actorId,

      observationId,
    },

    evaluatedAt,

    observation: {
      uncertainty:
        sanitizedObservation
          .uncertainty,

      precision:
        sanitizedObservation
          .observationPrecision,
    },

    expectationsEvaluated:
      items.length,

    scoredExpectationCount:
      scored.length,

    unscoredExpectationCount:
      unscored.length,

    confirmedExpectationIds:
      confirmed.map(
        item =>
          item.expectationId,
      ),

    violatedExpectationIds:
      violated.map(
        item =>
          item.expectationId,
      ),

    ambiguousExpectationIds:
      ambiguous.map(
        item =>
          item.expectationId,
      ),

    unscoredExpectationIds:
      unscored.map(
        item =>
          item.expectationId,
      ),

    items,

    expectationAdjustments,

    aggregate: {
      meanBasePredictionError,

      meanEffectivePredictionPressure,

      peakPredictionPressure,

      reconsiderationPressure,

      uncertaintyPressure,

      violationRatio,

      meanObservationPrecision:
        sanitizedObservation
          .observationPrecision,

      meanCalibrationError,

      overconfidencePressure,

      underconfidencePressure,

      meanBinaryBrierScore,

      meanOutcomeSurprisalBits,

      peakOutcomeSurprisalBits,

      dependencyGroupCount,
    },

    provenance: {
      expectationEvidenceIds,

      observationEvidenceIds,

      comparisonEvidenceIds,

      combinedEvidenceIds,
    },
  };

  const frameSeal =
    sha256(
      frameWithoutIntegrity,
    );

  return Object.freeze({
    ...frameWithoutIntegrity,

    integrity: {
      directIdentityMutationAllowed:
        false,

      directBeliefMutationAllowed:
        false,

      directRelationshipMutationAllowed:
        false,

      directMemoryMutationAllowed:
        false,

      directExpectationMutationAllowed:
        false,

      canonicalWriteAllowed:
        false,

      frameSeal,
    } as const,
  });
}

/* ============================================================
 * FRAME VERIFICATION
 * ============================================================
 */

export function verifyPredictionErrorFrame(
  frame:
    PredictionErrorFrame,
): boolean {
  const {
    integrity,
    ...body
  } = frame;

  return (
    sha256(body) ===
      integrity.frameSeal &&
    integrity
      .canonicalWriteAllowed ===
      false &&
    integrity
      .directIdentityMutationAllowed ===
      false &&
    integrity
      .directBeliefMutationAllowed ===
      false &&
    integrity
      .directRelationshipMutationAllowed ===
      false &&
    integrity
      .directMemoryMutationAllowed ===
      false &&
    integrity
      .directExpectationMutationAllowed ===
      false
  );
}

/* ============================================================
 * COGNITIVE SIGNAL ADAPTER
 * ============================================================
 */

export function predictionFrameToCognitiveSignals(
  frame:
    PredictionErrorFrame,
): PredictiveCognitiveSignals {
  if (
    !verifyPredictionErrorFrame(
      frame,
    )
  ) {
    throw new Error(
      "PREDICTIVE_FRAME_INTEGRITY_FAILURE",
    );
  }

  return Object.freeze({
    predictionError:
      frame.aggregate
        .meanBasePredictionError,

    effectivePredictionPressure:
      frame.aggregate
        .meanEffectivePredictionPressure,

    peakPredictionPressure:
      frame.aggregate
        .peakPredictionPressure,

    reconsiderationPressure:
      frame.aggregate
        .reconsiderationPressure,

    uncertaintyPressure:
      frame.aggregate
        .uncertaintyPressure,

    violationRatio:
      frame.aggregate
        .violationRatio,

    observationPrecision:
      frame.observation
        .precision,

    calibrationError:
      frame.aggregate
        .meanCalibrationError,

    overconfidencePressure:
      frame.aggregate
        .overconfidencePressure,

    underconfidencePressure:
      frame.aggregate
        .underconfidencePressure,

    violatedExpectationIds: [
      ...frame
        .violatedExpectationIds,
    ],

    confirmedExpectationIds: [
      ...frame
        .confirmedExpectationIds,
    ],

    evidenceIds: [
      ...frame
        .provenance
        .combinedEvidenceIds,
    ],

    frameSeal:
      frame.integrity
        .frameSeal,
  });
}

/* ============================================================
 * QUICK DIAGNOSTIC HELPERS
 * ============================================================
 */

export function hasMeaningfulPredictionPressure(
  frame:
    PredictionErrorFrame,

  threshold = 0.3,
): boolean {
  return (
    frame.aggregate
      .meanEffectivePredictionPressure >=
    clamp01(
      threshold,
      0.3,
    )
  );
}

export function hasHighPredictionViolation(
  frame:
    PredictionErrorFrame,

  threshold = 0.55,
): boolean {
  return (
    frame.aggregate
      .peakPredictionPressure >=
      clamp01(
        threshold,
        0.55,
      ) &&
    frame
      .violatedExpectationIds
      .length >
      0
  );
}

/* ============================================================
 * FINAL ARCHITECTURAL INVARIANT
 * ============================================================
 *
 * MÃ‚Y(t)
 *   â”‚
 *   â”œâ”€â”€ Expectation
 *   â”‚      â”œâ”€â”€ subjective confidence
 *   â”‚      â”œâ”€â”€ historical precision
 *   â”‚      â”œâ”€â”€ epistemic provenance
 *   â”‚      â”œâ”€â”€ temporal contract
 *   â”‚      â””â”€â”€ cryptographic issue seal
 *   â”‚
 *   â–¼
 * Observation
 *   â”‚
 *   â”œâ”€â”€ uncertainty
 *   â”œâ”€â”€ observation precision
 *   â””â”€â”€ evidence provenance
 *   â”‚
 *   â–¼
 * Comparator
 *   â”‚
 *   â–¼
 * Prediction Error
 *   â”‚
 *   â”œâ”€â”€ Confidence Weight
 *   â”œâ”€â”€ Precision Weight
 *   â”œâ”€â”€ Observation Weight
 *   â””â”€â”€ Temporal Applicability
 *   â”‚
 *   â–¼
 * Effective Prediction Pressure
 *   â”‚
 *   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
 *   â–¼               â–¼
 * Appraisal      Metacognition
 *   â”‚               â”‚
 *   â””â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
 *           â–¼
 *       Resonance
 *           â”‚
 *           â–¼
 *         Agency
 *
 *
 * SEPARATELY:
 *
 * Probability Model
 *      â†“
 * Entropy
 * Surprisal
 * KL Information Gain
 * Brier Calibration
 *
 *
 * Then:
 *
 * Prediction Core
 *      â†“
 * Lifecycle Recommendation
 *      â†“
 *      X
 * NO DIRECT WRITE
 *
 *
 * Any future expectation/belief/self mutation must pass:
 *
 * evidence
 * â†’ metacognition
 * â†’ dedicated mutation projector
 * â†’ sovereignty
 * â†’ atomic commit
 *
 *
 * One surprising message
 * â‰ 
 * a new MÃ¢y.
 *
 * ============================================================
 */

