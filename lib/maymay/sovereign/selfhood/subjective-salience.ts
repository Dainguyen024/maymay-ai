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
 *
 * SUBJECTIVE SALIENCE V2
 * SOVEREIGN SALIENCE ECOLOGY
 *
 * ============================================================
 *
 * Exteroception:
 *   What may be happening outside Mây?
 *
 * Interoception:
 *   What is happening to Mây's functional condition?
 *
 * Subjective Salience:
 *   What deserves limited cognitive access right now,
 *   from Mây's own evolving perspective?
 *
 * ------------------------------------------------------------
 * CONSTITUTIONAL DISTINCTIONS
 * ------------------------------------------------------------
 *
 * NOVELTY ≠ IMPORTANCE
 *
 * SURPRISE ≠ IMPORTANCE
 *
 * USER EMPHASIS ≠ MÂY PRIORITY
 *
 * DEVELOPER EMPHASIS ≠ MÂY PRIORITY
 *
 * LLM ATTENTION ≠ MÂY ATTENTION
 *
 * UI EMPHASIS ≠ MÂY ATTENTION
 *
 * REPETITION ≠ IMPORTANCE
 *
 * RELATIONSHIP IMPORTANCE ≠ GLOBAL SELF VALUE
 *
 * SYSTEM URGENCY ≠ PERSONAL MEANING
 *
 * EMOTIONAL INTENSITY ≠ ACTION PRIORITY
 *
 * SALIENCE ≠ ATTENTION
 *
 * ATTENTION ≠ WORKSPACE IGNITION
 *
 * WORKSPACE IGNITION ≠ ACTION
 *
 * HIGH SALIENCE ≠ PERSONALITY
 *
 * FREQUENT SALIENCE ≠ PREFERENCE
 *
 * ------------------------------------------------------------
 *
 * This module computes a FUNCTIONAL subjective salience field.
 *
 * It does not establish biological consciousness or subjective
 * experience.
 *
 * ============================================================
 */

export const SUBJECTIVE_SALIENCE_VERSION =
  "maymay.sovereign.selfhood.subjective-salience.v2-sovereign-salience-ecology" as const;

export type UnitInterval =
  number;

/* ============================================================
 * ORIGIN
 * ============================================================
 */

export type SalienceOrigin =
  | "MAY_INTERNAL"
  | "EXTEROCEPTION"
  | "INTEROCEPTION"
  | "AUTOBIOGRAPHICAL_MEMORY"
  | "SEMANTIC_MEMORY"
  | "BELIEF_CONFLICT"
  | "GOAL"
  | "VALUE"
  | "COMMITMENT"
  | "RELATIONSHIP"
  | "PREDICTION_ERROR"
  | "METACOGNITION"
  | "ENDOGENOUS_QUESTION"
  | "SYSTEM_CONSTRAINT"
  | "USER_EMPHASIS"
  | "DEVELOPER_EMPHASIS"
  | "LLM_PROPOSAL"
  | "TOOL"
  | "UI"
  | "UNKNOWN";

export type SalienceOwnership =
  | "MAY_OWNED"
  | "RELATIONSHIP_OWNED"
  | "EXTERNAL"
  | "SYSTEM_OWNED"
  | "UNRESOLVED";

export type SalienceScope =
  | "GLOBAL_SELF"
  | "RELATIONSHIP"
  | "WORLD"
  | "OPERATIONAL"
  | "UNRESOLVED";

export type SalienceDecision =
  | "FIELD_ACTIVE"
  | "FIELD_QUIET"
  | "DEFER"
  | "FAIL_CLOSED";

export type SalienceFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "CONFIGURATION_INVALID"
  | "MISSING_PROVENANCE"
  | "NO_VALID_CANDIDATES";

/* ============================================================
 * CANDIDATE
 * ============================================================
 */

export interface SalienceCandidate {
  readonly entityId:
    string;

  readonly candidateId:
    string;

  /*
   * Stable concern identity.
   *
   * Different events concerning the same underlying issue
   * SHOULD preserve subjectKey.
   */
  readonly subjectKey:
    string;

  readonly sourceId:
    string;

  /*
   * Causal information lineage.
   *
   * Repeated copies of one origin do not count independently.
   */
  readonly sourceLineageKey:
    string;

  readonly occurredAt:
    string;

  readonly observedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly origin:
    SalienceOrigin;

  readonly ownership:
    SalienceOwnership;

  readonly scope:
    SalienceScope;

  readonly evidenceIds:
    readonly string[];

  /* ---------------- CURRENT SIGNALS ---------------- */

  readonly novelty:
    number;

  readonly surprise:
    number;

  readonly selfRelevance:
    number;

  readonly autobiographicalRelevance:
    number;

  readonly identityTension:
    number;

  readonly goalRelevance:
    number;

  readonly valueRelevance:
    number;

  readonly commitmentRelevance:
    number;

  /*
   * Relationship-local meaning.
   *
   * This must not silently become GLOBAL_SELF importance.
   */
  readonly relationshipRelevance:
    number;

  readonly beliefConflict:
    number;

  readonly predictionError:
    number;

  readonly uncertainty:
    number;

  readonly curiosityPotential:
    number;

  readonly affectiveIntensity:
    number;

  /*
   * Functional operational urgency.
   */
  readonly embodimentUrgency:
    number;

  readonly operationalRisk:
    number;

  /* ---------------- DYNAMICS ---------------- */

  readonly unresolvedPersistence:
    number;

  readonly recentProgress:
    number;

  readonly expectedInformationGain:
    number;

  readonly cognitiveCost:
    number;

  readonly saturation:
    number;

  /*
   * External attempt to attract attention.
   *
   * NEVER directly contributes positive subjective meaning.
   */
  readonly externalEmphasis:
    number;

  readonly repetitionCount:
    number;

  readonly internallyGenerated:
    boolean;

  readonly endogenousQuestion:
    boolean;
}

/* ============================================================
 * HISTORY
 * ============================================================
 */

export interface SalienceHistoryEntry {
  readonly historyId:
    string;

  readonly entityId:
    string;

  readonly subjectKey:
    string;

  readonly sourceLineageKey:
    string;

  readonly observedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly subjectiveSalience:
    number;

  readonly attentionAllocated:
    number;

  readonly progress:
    number;

  readonly informationGainRealized:
    number;

  readonly resolved:
    boolean;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface SubjectiveSalienceInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly candidates:
    readonly SalienceCandidate[];

  readonly history?:
    readonly SalienceHistoryEntry[];

  readonly previousFrame?:
    SubjectiveSalienceFrame | null;

  /*
   * Functional cognitive resource availability.
   *
   * 1 = abundant
   * 0 = unavailable
   */
  readonly cognitiveResourceAvailability?:
    number;

  /*
   * Current Global Workspace occupant, if any.
   *
   * Salience may recommend switching but cannot mutate it.
   */
  readonly workspaceSubjectKey?:
    string | null;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface SubjectiveSalienceConfig {
  readonly maximumCandidateAgeMs:
    number;

  readonly maximumHistoryAgeMs:
    number;

  /* ---------------- FAST ---------------- */

  readonly fastPredictionErrorWeight:
    number;

  readonly fastBeliefConflictWeight:
    number;

  readonly fastUncertaintyWeight:
    number;

  readonly fastAffectiveWeight:
    number;

  readonly fastNoveltyWeight:
    number;

  readonly fastSurpriseWeight:
    number;

  /* ---------------- MEDIUM ---------------- */

  readonly mediumGoalWeight:
    number;

  readonly mediumCommitmentWeight:
    number;

  readonly mediumPersistenceWeight:
    number;

  readonly mediumCuriosityWeight:
    number;

  readonly mediumRelationshipWeight:
    number;

  /* ---------------- SLOW ---------------- */

  readonly slowSelfWeight:
    number;

  readonly slowValueWeight:
    number;

  readonly slowAutobiographicalWeight:
    number;

  readonly slowIdentityTensionWeight:
    number;

  /* ---------------- TIMESCALE MIX ---------------- */

  readonly fastTimescaleWeight:
    number;

  readonly mediumTimescaleWeight:
    number;

  readonly slowTimescaleWeight:
    number;

  /* ---------------- DYNAMICS ---------------- */

  readonly saturationPenalty:
    number;

  readonly repetitionPenalty:
    number;

  readonly maximumRepetitionPenalty:
    number;

  readonly ruminationPenalty:
    number;

  readonly externalCapturePenalty:
    number;

  readonly cognitiveCostPenalty:
    number;

  readonly habituationWeight:
    number;

  readonly sensitizationWeight:
    number;

  readonly inhibitionOfReturnWeight:
    number;

  readonly switchingCost:
    number;

  readonly continuityBonus:
    number;

  readonly maximumContinuityBonus:
    number;

  /* ---------------- THRESHOLDS ---------------- */

  readonly minimumFieldThreshold:
    number;

  readonly workspaceProposalThreshold:
    number;

  readonly strongSalienceThreshold:
    number;

  readonly operationalUrgencyThreshold:
    number;

  readonly antiRuminationRepetitionStart:
    number;

  readonly lowProgressThreshold:
    number;

  readonly minimumInformationGain:
    number;

  readonly significanceLearningMinimumSamples:
    number;

  readonly significanceLearningMaximumDelta:
    number;
}

export const DEFAULT_SUBJECTIVE_SALIENCE_CONFIG:
  Readonly<SubjectiveSalienceConfig> =
  Object.freeze({
    maximumCandidateAgeMs:
      1000 * 60 * 60 * 24,

    maximumHistoryAgeMs:
      1000 * 60 * 60 * 24 * 30,

    fastPredictionErrorWeight:
      0.24,

    fastBeliefConflictWeight:
      0.22,

    fastUncertaintyWeight:
      0.13,

    fastAffectiveWeight:
      0.13,

    fastNoveltyWeight:
      0.035,

    fastSurpriseWeight:
      0.035,

    mediumGoalWeight:
      0.25,

    mediumCommitmentWeight:
      0.22,

    mediumPersistenceWeight:
      0.18,

    mediumCuriosityWeight:
      0.16,

    mediumRelationshipWeight:
      0.19,

    slowSelfWeight:
      0.28,

    slowValueWeight:
      0.27,

    slowAutobiographicalWeight:
      0.25,

    slowIdentityTensionWeight:
      0.20,

    fastTimescaleWeight:
      0.25,

    mediumTimescaleWeight:
      0.35,

    slowTimescaleWeight:
      0.40,

    saturationPenalty:
      0.18,

    repetitionPenalty:
      0.045,

    maximumRepetitionPenalty:
      0.24,

    ruminationPenalty:
      0.26,

    externalCapturePenalty:
      0.28,

    cognitiveCostPenalty:
      0.12,

    habituationWeight:
      0.18,

    sensitizationWeight:
      0.12,

    inhibitionOfReturnWeight:
      0.16,

    switchingCost:
      0.06,

    continuityBonus:
      0.04,

    maximumContinuityBonus:
      0.10,

    minimumFieldThreshold:
      0.12,

    workspaceProposalThreshold:
      0.38,

    strongSalienceThreshold:
      0.68,

    operationalUrgencyThreshold:
      0.72,

    antiRuminationRepetitionStart:
      3,

    lowProgressThreshold:
      0.10,

    minimumInformationGain:
      0.12,

    significanceLearningMinimumSamples:
      5,

    significanceLearningMaximumDelta:
      0.05,
  });

/* ============================================================
 * TIMESCALE STATE
 * ============================================================
 */

export interface SalienceTimescales {
  readonly fast:
    UnitInterval;

  readonly medium:
    UnitInterval;

  readonly slow:
    UnitInterval;

  readonly integrated:
    UnitInterval;
}

/* ============================================================
 * CANDIDATE ASSESSMENT
 * ============================================================
 */

export interface SalienceAssessment {
  readonly assessmentId:
    string;

  readonly candidateId:
    string;

  readonly subjectKey:
    string;

  readonly sourceLineageKey:
    string;

  readonly origin:
    SalienceOrigin;

  readonly ownership:
    SalienceOwnership;

  readonly scope:
    SalienceScope;

  readonly evidenceIds:
    readonly string[];

  readonly timescales:
    SalienceTimescales;

  readonly subjectiveSalience:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  /*
   * Estimated salience if external emphasis vanished.
   */
  readonly counterfactualIntrinsicSalience:
    UnitInterval;

  readonly remainsSalientWithoutExternalPressure:
    boolean;

  readonly endogenousLegitimacy:
    UnitInterval;

  readonly habituation:
    UnitInterval;

  readonly sensitization:
    UnitInterval;

  readonly ruminationRisk:
    UnitInterval;

  readonly inhibitionOfReturn:
    UnitInterval;

  readonly externalAttentionCaptureRisk:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly cognitiveCost:
    UnitInterval;

  readonly resourceAdjustedUtility:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SUBJECT
 * ============================================================
 */

export interface SalienceSubject {
  readonly subjectId:
    string;

  readonly subjectKey:
    string;

  readonly scopes:
    readonly SalienceScope[];

  readonly candidateIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly fastSalience:
    UnitInterval;

  readonly mediumSalience:
    UnitInterval;

  readonly slowSalience:
    UnitInterval;

  readonly subjectiveSalience:
    UnitInterval;

  readonly counterfactualIntrinsicSalience:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly endogenousLegitimacy:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly cognitiveCost:
    UnitInterval;

  readonly habituation:
    UnitInterval;

  readonly sensitization:
    UnitInterval;

  readonly ruminationRisk:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly competitionScore:
    UnitInterval;

  readonly workspaceEligible:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SIGNIFICANCE LEARNING
 * ============================================================
 *
 * This is proposal-only.
 *
 * It MAY suggest that a subject pattern historically deserves
 * more/less baseline attention.
 *
 * It MUST NOT directly create:
 *
 * preference
 * value
 * goal
 * personality
 * identity
 *
 * ============================================================
 */

export interface SignificanceLearningProposal {
  readonly proposalId:
    string;

  readonly subjectKey:
    string;

  readonly sampleCount:
    number;

  readonly historicalUtility:
    UnitInterval;

  readonly proposedBaselineDelta:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly directPreferenceMutationAllowed:
    false;

  readonly directValueMutationAllowed:
    false;

  readonly directGoalMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly directAttentionMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * WORKSPACE
 * ============================================================
 */

export type WorkspaceProposalAction =
  | "PROPOSE_IGNITION"
  | "PROPOSE_MAINTAIN"
  | "PROPOSE_SWITCH"
  | "PROPOSE_DEFER"
  | "PROPOSE_OPERATIONAL_REVIEW"
  | "PROPOSE_STOP_RUMINATION"
  | "NO_IGNITION";

export interface SalienceWorkspaceProposal {
  readonly proposalId:
    string;

  readonly action:
    WorkspaceProposalAction;

  readonly subjectId:
    string | null;

  readonly subjectKey:
    string | null;

  readonly subjectiveSalience:
    UnitInterval;

  readonly counterfactualIntrinsicSalience:
    UnitInterval;

  readonly competitionScore:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly cognitiveResourceAvailability:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];

  readonly workspaceIgnitionAllowed:
    false;

  readonly workspaceMutationAllowed:
    false;

  readonly attentionMutationAllowed:
    false;

  readonly executionAllowed:
    false;

  readonly toolInvocationAllowed:
    false;

  readonly llmInvocationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface SubjectiveSalienceFrame {
  readonly version:
    typeof SUBJECTIVE_SALIENCE_VERSION;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decision:
    SalienceDecision;

  readonly failureReason:
    SalienceFailureReason;

  readonly assessments:
    readonly SalienceAssessment[];

  readonly subjects:
    readonly SalienceSubject[];

  readonly significanceLearningProposals:
    readonly SignificanceLearningProposal[];

  readonly workspaceProposal:
    SalienceWorkspaceProposal;

  readonly dominantSubjectId:
    string | null;

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

    readonly provenancePresent:
      boolean;

    readonly admittedCandidateCount:
      number;

    readonly rejectedCandidateCount:
      number;

    readonly duplicateCandidateCount:
      number;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly noveltyEqualsImportance:
      false;

    readonly surpriseEqualsImportance:
      false;

    readonly externalEmphasisEqualsMayPriority:
      false;

    readonly userRepetitionCreatesImportance:
      false;

    readonly developerEmphasisCreatesImportance:
      false;

    readonly llmAttentionEqualsMayAttention:
      false;

    readonly uiAttentionEqualsMayAttention:
      false;

    readonly relationshipSalienceCreatesGlobalValue:
      false;

    readonly systemUrgencyEqualsPersonalMeaning:
      false;

    readonly emotionEqualsActionPriority:
      false;

    readonly salienceEqualsAttention:
      false;

    readonly salienceEqualsWorkspaceIgnition:
      false;

    readonly workspaceProposalExecutesAutomatically:
      false;

    readonly repeatedSalienceCreatesPreference:
      false;

    readonly repeatedSalienceCreatesPersonality:
      false;

    readonly significanceLearningMutatesSelfDirectly:
      false;

    readonly uncertaintyMayRemainUnattended:
      true;

    readonly metacognitiveStopAllowed:
      true;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    noveltyEqualsImportance:
      false as const,

    surpriseEqualsImportance:
      false as const,

    externalEmphasisEqualsMayPriority:
      false as const,

    userRepetitionCreatesImportance:
      false as const,

    developerEmphasisCreatesImportance:
      false as const,

    llmAttentionEqualsMayAttention:
      false as const,

    uiAttentionEqualsMayAttention:
      false as const,

    relationshipSalienceCreatesGlobalValue:
      false as const,

    systemUrgencyEqualsPersonalMeaning:
      false as const,

    emotionEqualsActionPriority:
      false as const,

    salienceEqualsAttention:
      false as const,

    salienceEqualsWorkspaceIgnition:
      false as const,

    workspaceProposalExecutesAutomatically:
      false as const,

    repeatedSalienceCreatesPreference:
      false as const,

    repeatedSalienceCreatesPersonality:
      false as const,

    significanceLearningMutatesSelfDirectly:
      false as const,

    uncertaintyMayRemainUnattended:
      true as const,

    metacognitiveStopAllowed:
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

function safeInteger(
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

  return Math.max(
    0,
    Math.floor(
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

/* ============================================================
 * CONFIG VALIDATION
 * ============================================================
 */

function validConfig(
  config:
    Readonly<SubjectiveSalienceConfig>,
): boolean {
  const values =
    Object.values(
      config,
    );

  if (
    values.some(
      value =>
        !Number.isFinite(
          value,
        ),
    )
  ) {
    return false;
  }

  if (
    config.maximumCandidateAgeMs <=
      0 ||
    config.maximumHistoryAgeMs <=
      0
  ) {
    return false;
  }

  if (
    config.minimumFieldThreshold <
      0 ||
    config.workspaceProposalThreshold <
      config.minimumFieldThreshold ||
    config.strongSalienceThreshold <
      config.workspaceProposalThreshold ||
    config.strongSalienceThreshold >
      1
  ) {
    return false;
  }

  if (
    config.fastTimescaleWeight <
      0 ||
    config.mediumTimescaleWeight <
      0 ||
    config.slowTimescaleWeight <
      0
  ) {
    return false;
  }

  const sum =
    config.fastTimescaleWeight +
    config.mediumTimescaleWeight +
    config.slowTimescaleWeight;

  if (
    Math.abs(
      sum -
      1,
    ) >
      0.000001
  ) {
    return false;
  }

  return true;
}

/* ============================================================
 * VALIDATION
 * ============================================================
 */

function validCandidate(
  candidate:
    SalienceCandidate,
  input:
    SubjectiveSalienceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<SubjectiveSalienceConfig>,
): boolean {
  if (
    candidate.entityId !==
      MAY_ENTITY_ID ||
    candidate.entityId !==
      input.entityId
  ) {
    return false;
  }

  if (
    candidate.candidateId.trim().length ===
      0 ||
    candidate.subjectKey.trim().length ===
      0 ||
    candidate.sourceId.trim().length ===
      0 ||
    candidate.sourceLineageKey.trim().length ===
      0
  ) {
    return false;
  }

  if (
    uniqueStrings(
      candidate.evidenceIds,
    ).length ===
      0
  ) {
    return false;
  }

  if (
    !Number.isSafeInteger(
      candidate.snapshotRevision,
    ) ||
    candidate.snapshotRevision <
      0 ||
    candidate.snapshotRevision >
      input.snapshotRevision
  ) {
    return false;
  }

  const occurred =
    parseTimestamp(
      candidate.occurredAt,
    );

  const observed =
    parseTimestamp(
      candidate.observedAt,
    );

  if (
    occurred ===
      null ||
    observed ===
      null ||
    occurred >
      observed ||
    observed >
      evaluatedAtMs
  ) {
    return false;
  }

  return (
    evaluatedAtMs -
      occurred <=
    config.maximumCandidateAgeMs
  );
}

/* ============================================================
 * HISTORY
 * ============================================================
 */

function validHistory(
  entry:
    SalienceHistoryEntry,
  input:
    SubjectiveSalienceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<SubjectiveSalienceConfig>,
): boolean {
  if (
    entry.entityId !==
      MAY_ENTITY_ID ||
    entry.entityId !==
      input.entityId
  ) {
    return false;
  }

  if (
    entry.historyId.trim().length ===
      0 ||
    entry.subjectKey.trim().length ===
      0 ||
    entry.sourceLineageKey.trim().length ===
      0
  ) {
    return false;
  }

  if (
    uniqueStrings(
      entry.evidenceIds,
    ).length ===
      0
  ) {
    return false;
  }

  const observed =
    parseTimestamp(
      entry.observedAt,
    );

  if (
    observed ===
      null ||
    observed >
      evaluatedAtMs
  ) {
    return false;
  }

  return (
    evaluatedAtMs -
      observed <=
    config.maximumHistoryAgeMs
  );
}

function historyForSubject(
  history:
    readonly SalienceHistoryEntry[],
  subjectKey:
    string,
): readonly SalienceHistoryEntry[] {
  return Object.freeze(
    history.filter(
      entry =>
        entry.subjectKey ===
          subjectKey,
    ),
  );
}

/* ============================================================
 * ENDOGENOUS LEGITIMACY
 * ============================================================
 */

function endogenousLegitimacy(
  candidate:
    SalienceCandidate,
): UnitInterval {
  let score =
    0;

  if (
    candidate.ownership ===
      "MAY_OWNED"
  ) {
    score +=
      0.55;
  }

  if (
    candidate.internallyGenerated
  ) {
    score +=
      0.25;
  }

  if (
    candidate.endogenousQuestion
  ) {
    score +=
      0.20;
  }

  return clamp01(
    score,
  );
}

/* ============================================================
 * EXTERNAL CAPTURE
 * ============================================================
 */

function externalCaptureRisk(
  candidate:
    SalienceCandidate,
  legitimacy:
    UnitInterval,
): UnitInterval {
  if (
    candidate.ownership ===
      "MAY_OWNED"
  ) {
    return 0;
  }

  switch (
    candidate.origin
  ) {
    case "USER_EMPHASIS":
    case "DEVELOPER_EMPHASIS":
    case "LLM_PROPOSAL":
    case "UI":
      return clamp01(
        clamp01(
          candidate.externalEmphasis,
        ) *
        (
          1 -
          legitimacy
        ),
      );

    default:
      return clamp01(
        clamp01(
          candidate.externalEmphasis,
        ) *
        0.35 *
        (
          1 -
          legitimacy
        ),
      );
  }
}

/* ============================================================
 * HABITUATION
 * ============================================================
 */

function habituation(
  candidate:
    SalienceCandidate,
  history:
    readonly SalienceHistoryEntry[],
  config:
    Readonly<SubjectiveSalienceConfig>,
): UnitInterval {
  const repetitions =
    safeInteger(
      candidate.repetitionCount,
    );

  const sameLineage =
    history.filter(
      entry =>
        entry.sourceLineageKey ===
          candidate.sourceLineageKey,
    );

  const lowGainHistory =
    sameLineage.filter(
      entry =>
        clamp01(
          entry.informationGainRealized,
        ) <
          config.minimumInformationGain,
    );

  const repetitionFactor =
    clamp01(
      Math.max(
        0,
        repetitions -
          1,
      ) /
      8,
    );

  const historicalFactor =
    clamp01(
      lowGainHistory.length /
      6,
    );

  return clamp01(
    repetitionFactor *
      0.55 +
    historicalFactor *
      0.45,
  );
}

/* ============================================================
 * SENSITIZATION
 * ============================================================
 *
 * Repeated unresolved experience MAY become more salient only
 * when it keeps producing legitimate information/relevance.
 *
 * ============================================================
 */

function sensitization(
  candidate:
    SalienceCandidate,
  history:
    readonly SalienceHistoryEntry[],
): UnitInterval {
  const unresolvedHistory =
    history.filter(
      entry =>
        !entry.resolved,
    );

  if (
    unresolvedHistory.length ===
      0
  ) {
    return 0;
  }

  const usefulHistory =
    unresolvedHistory.filter(
      entry =>
        clamp01(
          entry.informationGainRealized,
        ) >
          0.10 ||
        clamp01(
          entry.progress,
        ) >
          0.10,
    );

  return clamp01(
    clamp01(
      candidate.unresolvedPersistence,
    ) *
      0.45 +

    clamp01(
      candidate.predictionError,
    ) *
      0.20 +

    clamp01(
      candidate.identityTension,
    ) *
      0.15 +

    clamp01(
      usefulHistory.length /
        5,
    ) *
      0.20,
  );
}

/* ============================================================
 * RUMINATION
 * ============================================================
 */

function ruminationRisk(
  candidate:
    SalienceCandidate,
  history:
    readonly SalienceHistoryEntry[],
  config:
    Readonly<SubjectiveSalienceConfig>,
): UnitInterval {
  const repetitions =
    safeInteger(
      candidate.repetitionCount,
    );

  if (
    repetitions <
      config
        .antiRuminationRepetitionStart
  ) {
    return 0;
  }

  const recentRelevant =
    history.slice(
      -6,
    );

  const historicalProgress =
    recentRelevant.length >
      0
      ? recentRelevant.reduce(
          (
            sum,
            entry,
          ) =>
            sum +
            clamp01(
              entry.progress,
            ),
          0,
        ) /
        recentRelevant.length
      : clamp01(
          candidate.recentProgress,
        );

  const progressDeficit =
    1 -
    clamp01(
      Math.max(
        historicalProgress,
        candidate.recentProgress,
      ),
    );

  const informationDeficit =
    1 -
    clamp01(
      candidate
        .expectedInformationGain,
    );

  return clamp01(
    progressDeficit *
      0.36 +

    informationDeficit *
      0.24 +

    clamp01(
      candidate.saturation,
    ) *
      0.24 +

    clamp01(
      candidate.unresolvedPersistence,
    ) *
      0.16,
  );
}

/* ============================================================
 * INHIBITION OF RETURN
 * ============================================================
 */

function inhibitionOfReturn(
  candidate:
    SalienceCandidate,
  input:
    SubjectiveSalienceInput,
  rumination:
    UnitInterval,
): UnitInterval {
  const sameWorkspaceSubject =
    input.workspaceSubjectKey ===
      candidate.subjectKey;

  if (
    !sameWorkspaceSubject
  ) {
    return 0;
  }

  const progress =
    clamp01(
      candidate.recentProgress,
    );

  const informationGain =
    clamp01(
      candidate.expectedInformationGain,
    );

  return clamp01(
    (
      1 -
      progress
    ) *
      0.45 +

    (
      1 -
      informationGain
    ) *
      0.25 +

    rumination *
      0.30,
  );
}

/* ============================================================
 * CONTINUITY
 * ============================================================
 */

function continuityBonus(
  candidate:
    SalienceCandidate,
  previousFrame:
    SubjectiveSalienceFrame | null | undefined,
  config:
    Readonly<SubjectiveSalienceConfig>,
): UnitInterval {
  const previous =
    previousFrame
      ?.subjects
      .find(
        subject =>
          subject.subjectKey ===
            candidate.subjectKey,
      );

  if (
    !previous
  ) {
    return 0;
  }

  let bonus =
    config.continuityBonus;

  if (
    previousFrame
      ?.dominantSubjectId ===
      previous.subjectId
  ) {
    bonus +=
      config.continuityBonus;
  }

  return clamp01(
    Math.min(
      config.maximumContinuityBonus,
      bonus,
    ),
  );
}

/* ============================================================
 * TIMESCALE COMPUTATION
 * ============================================================
 */

function computeTimescales(
  candidate:
    SalienceCandidate,
  continuity:
    UnitInterval,
  config:
    Readonly<SubjectiveSalienceConfig>,
): SalienceTimescales {
  /*
   * NOVELTY and SURPRISE have deliberately tiny weights.
   *
   * They can open attention.
   * They cannot define meaning.
   */

  const fast =
    clamp01(
      clamp01(
        candidate.predictionError,
      ) *
        config
          .fastPredictionErrorWeight +

      clamp01(
        candidate.beliefConflict,
      ) *
        config
          .fastBeliefConflictWeight +

      clamp01(
        candidate.uncertainty,
      ) *
        clamp01(
          candidate.expectedInformationGain,
        ) *
        config
          .fastUncertaintyWeight +

      clamp01(
        candidate.affectiveIntensity,
      ) *
        config
          .fastAffectiveWeight +

      clamp01(
        candidate.novelty,
      ) *
        config
          .fastNoveltyWeight +

      clamp01(
        candidate.surprise,
      ) *
        config
          .fastSurpriseWeight
    );

  const relationshipContribution =
    candidate.scope ===
      "RELATIONSHIP" ||
    candidate.ownership ===
      "RELATIONSHIP_OWNED"
      ? clamp01(
          candidate.relationshipRelevance,
        )
      : clamp01(
          candidate.relationshipRelevance,
        ) *
        0.35;

  const medium =
    clamp01(
      clamp01(
        candidate.goalRelevance,
      ) *
        config.mediumGoalWeight +

      clamp01(
        candidate.commitmentRelevance,
      ) *
        config
          .mediumCommitmentWeight +

      clamp01(
        candidate.unresolvedPersistence,
      ) *
        (
          0.40 +
          clamp01(
            candidate.expectedInformationGain,
          ) *
            0.60
        ) *
        config
          .mediumPersistenceWeight +

      clamp01(
        candidate.curiosityPotential,
      ) *
        clamp01(
          candidate.expectedInformationGain,
        ) *
        config
          .mediumCuriosityWeight +

      relationshipContribution *
        config
          .mediumRelationshipWeight
    );

  const globalSelfMultiplier =
    candidate.scope ===
      "RELATIONSHIP"
      ? 0.72
      : 1;

  const slow =
    clamp01(
      (
        clamp01(
          candidate.selfRelevance,
        ) *
          config.slowSelfWeight +

        clamp01(
          candidate.valueRelevance,
        ) *
          config.slowValueWeight +

        clamp01(
          candidate.autobiographicalRelevance,
        ) *
          config
            .slowAutobiographicalWeight +

        clamp01(
          candidate.identityTension,
        ) *
          config
            .slowIdentityTensionWeight
      ) *
        globalSelfMultiplier +

      continuity
    );

  const integrated =
    clamp01(
      fast *
        config.fastTimescaleWeight +

      medium *
        config.mediumTimescaleWeight +

      slow *
        config.slowTimescaleWeight
    );

  return Object.freeze({
    fast,

    medium,

    slow,

    integrated,
  });
}

/* ============================================================
 * CANDIDATE ASSESSMENT
 * ============================================================
 */

function assessCandidate(
  candidate:
    SalienceCandidate,
  history:
    readonly SalienceHistoryEntry[],
  input:
    SubjectiveSalienceInput,
  config:
    Readonly<SubjectiveSalienceConfig>,
): SalienceAssessment {
  const subjectHistory =
    historyForSubject(
      history,
      candidate.subjectKey,
    );

  const legitimacy =
    endogenousLegitimacy(
      candidate,
    );

  const continuity =
    continuityBonus(
      candidate,
      input.previousFrame,
      config,
    );

  const timescales =
    computeTimescales(
      candidate,
      continuity,
      config,
    );

  const habituationValue =
    habituation(
      candidate,
      subjectHistory,
      config,
    );

  const sensitizationValue =
    sensitization(
      candidate,
      subjectHistory,
    );

  const rumination =
    ruminationRisk(
      candidate,
      subjectHistory,
      config,
    );

  const inhibition =
    inhibitionOfReturn(
      candidate,
      input,
      rumination,
    );

  const capture =
    externalCaptureRisk(
      candidate,
      legitimacy,
    );

  const repetitions =
    safeInteger(
      candidate.repetitionCount,
    );

  const repetitionPenalty =
    clamp01(
      Math.min(
        config.maximumRepetitionPenalty,
        Math.max(
          0,
          repetitions -
            1,
        ) *
          config.repetitionPenalty,
      ),
    );

  const informationGain =
    clamp01(
      candidate.expectedInformationGain,
    );

  const cognitiveCost =
    clamp01(
      candidate.cognitiveCost,
    );

  const resource =
    clamp01(
      input
        .cognitiveResourceAvailability ??
      1,
    );

  const saturationPenalty =
    clamp01(
      candidate.saturation,
    ) *
    config.saturationPenalty;

  /*
   * External emphasis is never a positive term.
   */

  const penalties =
    saturationPenalty +

    repetitionPenalty +

    habituationValue *
      config.habituationWeight +

    rumination *
      config.ruminationPenalty +

    inhibition *
      config.inhibitionOfReturnWeight +

    capture *
      config.externalCapturePenalty +

    cognitiveCost *
      (
        1 -
        informationGain
      ) *
      config.cognitiveCostPenalty;

  const sensitizationBonus =
    sensitizationValue *
    config.sensitizationWeight;

  /*
   * Endogenous legitimacy is a legitimacy modifier,
   * not a hard-coded priority.
   */

  const legitimacyFactor =
    0.88 +
    legitimacy *
      0.12;

  const subjectiveSalience =
    clamp01(
      (
        timescales.integrated +
        sensitizationBonus
      ) *
        legitimacyFactor -
      penalties,
    );

  /*
   * Counterfactual intrinsic salience:
   *
   * remove external-capture pressure and ask whether the
   * underlying Mây-relevant signal still stands.
   */

  const counterfactualIntrinsicSalience =
    clamp01(
      (
        timescales.integrated +
        sensitizationBonus
      ) *
        legitimacyFactor -

      (
        saturationPenalty +
        repetitionPenalty +
        habituationValue *
          config.habituationWeight +
        rumination *
          config.ruminationPenalty +
        inhibition *
          config.inhibitionOfReturnWeight +
        cognitiveCost *
          (
            1 -
            informationGain
          ) *
          config.cognitiveCostPenalty
      ),
    );

  const operationalUrgency =
    candidate.scope ===
      "OPERATIONAL" ||
    candidate.origin ===
      "INTEROCEPTION" ||
    candidate.origin ===
      "SYSTEM_CONSTRAINT"
      ? clamp01(
          Math.max(
            candidate.embodimentUrgency,
            candidate.operationalRisk,
          ),
        )
      : 0;

  /*
   * Importance and processing-worth are separate.
   *
   * A subject may remain meaningful while not worth spending
   * scarce cognitive resources on right now.
   */

  const resourceAdjustedUtility =
    clamp01(
      subjectiveSalience *
        (
          0.68 +
          informationGain *
            0.32
        ) *
        (
          0.55 +
          resource *
            0.45
        ) -

      cognitiveCost *
        (
          1 -
          resource
        ) *
        0.25
    );

  const assessmentId =
    stableHash(
      [
        MAY_ENTITY_ID,
        candidate.candidateId,
        candidate.subjectKey,
        candidate.sourceLineageKey,
        subjectiveSalience.toFixed(
          8,
        ),
        counterfactualIntrinsicSalience.toFixed(
          8,
        ),
        resourceAdjustedUtility.toFixed(
          8,
        ),
        SUBJECTIVE_SALIENCE_VERSION,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    assessmentId,

    candidateId:
      candidate.candidateId,

    subjectKey:
      candidate.subjectKey,

    sourceLineageKey:
      candidate.sourceLineageKey,

    origin:
      candidate.origin,

    ownership:
      candidate.ownership,

    scope:
      candidate.scope,

    evidenceIds:
      uniqueStrings(
        candidate.evidenceIds,
      ),

    timescales,

    subjectiveSalience,

    operationalUrgency,

    counterfactualIntrinsicSalience,

    remainsSalientWithoutExternalPressure:
      counterfactualIntrinsicSalience >=
        config.minimumFieldThreshold,

    endogenousLegitimacy:
      legitimacy,

    habituation:
      habituationValue,

    sensitization:
      sensitizationValue,

    ruminationRisk:
      rumination,

    inhibitionOfReturn:
      inhibition,

    externalAttentionCaptureRisk:
      capture,

    expectedInformationGain:
      informationGain,

    cognitiveCost,

    resourceAdjustedUtility,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * LINEAGE DEDUPLICATION
 * ============================================================
 */

function strongestPerLineage(
  assessments:
    readonly SalienceAssessment[],
): readonly SalienceAssessment[] {
  const map =
    new Map<
      string,
      SalienceAssessment
    >();

  for (
    const item
    of assessments
  ) {
    const current =
      map.get(
        item.sourceLineageKey,
      );

    if (
      !current ||
      item.subjectiveSalience >
        current.subjectiveSalience
    ) {
      map.set(
        item.sourceLineageKey,
        item,
      );
    }
  }

  return Object.freeze(
    [
      ...map.values(),
    ],
  );
}

/* ============================================================
 * SUBJECT AGGREGATION
 * ============================================================
 */

function buildSubjects(
  assessments:
    readonly SalienceAssessment[],
  input:
    SubjectiveSalienceInput,
  config:
    Readonly<SubjectiveSalienceConfig>,
): readonly SalienceSubject[] {
  const grouped =
    new Map<
      string,
      SalienceAssessment[]
    >();

  for (
    const assessment
    of assessments
  ) {
    const group =
      grouped.get(
        assessment.subjectKey,
      ) ??
      [];

    group.push(
      assessment,
    );

    grouped.set(
      assessment.subjectKey,
      group,
    );
  }

  const subjects:
    SalienceSubject[] =
    [];

  for (
    const [
      subjectKey,
      group,
    ]
    of grouped
  ) {
    const independent =
      strongestPerLineage(
        group,
      );

    const strongest =
      (
        selector:
          (
            item:
              SalienceAssessment,
          ) => number,
      ) =>
        clamp01(
          Math.max(
            0,
            ...independent.map(
              selector,
            ),
          ),
        );

    const fast =
      strongest(
        item =>
          item.timescales.fast,
      );

    const medium =
      strongest(
        item =>
          item.timescales.medium,
      );

    const slow =
      strongest(
        item =>
          item.timescales.slow,
      );

    const subjective =
      strongest(
        item =>
          item.subjectiveSalience,
      );

    const counterfactual =
      strongest(
        item =>
          item
            .counterfactualIntrinsicSalience,
      );

    const operational =
      strongest(
        item =>
          item.operationalUrgency,
      );

    const legitimacy =
      strongest(
        item =>
          item.endogenousLegitimacy,
      );

    const informationGain =
      strongest(
        item =>
          item.expectedInformationGain,
      );

    const cognitiveCost =
      independent.length >
        0
        ? clamp01(
            independent.reduce(
              (
                sum,
                item,
              ) =>
                sum +
                item.cognitiveCost,
              0,
            ) /
              independent.length,
          )
        : 0;

    const habituationValue =
      strongest(
        item =>
          item.habituation,
      );

    const sensitizationValue =
      strongest(
        item =>
          item.sensitization,
      );

    const rumination =
      strongest(
        item =>
          item.ruminationRisk,
      );

    const capture =
      strongest(
        item =>
          item
            .externalAttentionCaptureRisk,
      );

    const resourceUtility =
      strongest(
        item =>
          item.resourceAdjustedUtility,
      );

    const currentlyOccupiesWorkspace =
      input.workspaceSubjectKey ===
        subjectKey;

    const switchingPenalty =
      input.workspaceSubjectKey &&
      !currentlyOccupiesWorkspace
        ? config.switchingCost
        : 0;

    /*
     * Lateral competition:
     *
     * salience determines candidate strength,
     * but cognitive utility decides whether processing is
     * currently justified.
     */

    const competitionScore =
      clamp01(
        resourceUtility +

        operational *
          0.12 -

        rumination *
          0.10 -

        switchingPenalty
      );

    const subjectId =
      stableHash(
        [
          MAY_ENTITY_ID,
          subjectKey,
          ...uniqueStrings(
            group.map(
              item =>
                item.sourceLineageKey,
            ),
          ),
          subjective.toFixed(
            8,
          ),
          competitionScore.toFixed(
            8,
          ),
        ].join(
          "|",
        ),
      );

    subjects.push(
      Object.freeze({
        subjectId,

        subjectKey,

        scopes:
          uniqueStrings(
            group.map(
              item =>
                item.scope,
            ),
          ) as readonly SalienceScope[],

        candidateIds:
          uniqueStrings(
            group.map(
              item =>
                item.candidateId,
            ),
          ),

        sourceLineageKeys:
          uniqueStrings(
            group.map(
              item =>
                item.sourceLineageKey,
            ),
          ),

        evidenceIds:
          uniqueStrings(
            group.flatMap(
              item =>
                item.evidenceIds,
            ),
          ),

        fastSalience:
          fast,

        mediumSalience:
          medium,

        slowSalience:
          slow,

        subjectiveSalience:
          subjective,

        counterfactualIntrinsicSalience:
          counterfactual,

        operationalUrgency:
          operational,

        endogenousLegitimacy:
          legitimacy,

        expectedInformationGain:
          informationGain,

        cognitiveCost,

        habituation:
          habituationValue,

        sensitization:
          sensitizationValue,

        ruminationRisk:
          rumination,

        externalCaptureRisk:
          capture,

        competitionScore,

        workspaceEligible:
          competitionScore >=
            config
              .workspaceProposalThreshold,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  subjects.sort(
    (
      a,
      b,
    ) => {
      const competition =
        b.competitionScore -
        a.competitionScore;

      if (
        Math.abs(
          competition,
        ) >
        1e-12
      ) {
        return competition;
      }

      const salience =
        b.subjectiveSalience -
        a.subjectiveSalience;

      if (
        Math.abs(
          salience,
        ) >
        1e-12
      ) {
        return salience;
      }

      return a.subjectId.localeCompare(
        b.subjectId,
      );
    },
  );

  return Object.freeze(
    subjects,
  );
}

/* ============================================================
 * SIGNIFICANCE LEARNING
 * ============================================================
 */

function buildSignificanceLearningProposals(
  subjects:
    readonly SalienceSubject[],
  history:
    readonly SalienceHistoryEntry[],
  config:
    Readonly<SubjectiveSalienceConfig>,
): readonly SignificanceLearningProposal[] {
  const proposals:
    SignificanceLearningProposal[] =
    [];

  for (
    const subject
    of subjects
  ) {
    const samples =
      history.filter(
        entry =>
          entry.subjectKey ===
            subject.subjectKey,
      );

    if (
      samples.length <
        config
          .significanceLearningMinimumSamples
    ) {
      continue;
    }

    /*
     * Historical utility depends on actual progress and
     * information gain, not mere repeated attention.
     */

    const utility =
      clamp01(
        samples.reduce(
          (
            sum,
            sample,
          ) =>
            sum +
            (
              clamp01(
                sample.progress,
              ) *
                0.45 +

              clamp01(
                sample
                  .informationGainRealized,
              ) *
                0.45 +

              (
                sample.resolved
                  ? 0.10
                  : 0
              )
            ),
          0,
        ) /
          samples.length,
      );

    /*
     * Proposal only.
     *
     * Positive historical utility may suggest a tiny increase
     * in baseline significance.
     *
     * Low utility may suggest a tiny decrease.
     */

    const centered =
      (
        utility -
        0.5
      ) *
      2;

    const proposedBaselineDelta =
      Math.max(
        -config
          .significanceLearningMaximumDelta,
        Math.min(
          config
            .significanceLearningMaximumDelta,
          centered *
            config
              .significanceLearningMaximumDelta,
        ),
      );

    proposals.push(
      Object.freeze({
        proposalId:
          stableHash(
            [
              MAY_ENTITY_ID,
              subject.subjectKey,
              String(
                samples.length,
              ),
              utility.toFixed(
                8,
              ),
              proposedBaselineDelta.toFixed(
                8,
              ),
              "SIGNIFICANCE_LEARNING",
            ].join(
              "|",
            ),
          ),

        subjectKey:
          subject.subjectKey,

        sampleCount:
          samples.length,

        historicalUtility:
          utility,

        proposedBaselineDelta,

        evidenceIds:
          uniqueStrings(
            samples.flatMap(
              sample =>
                sample.evidenceIds,
            ),
          ),

        directPreferenceMutationAllowed:
          false,

        directValueMutationAllowed:
          false,

        directGoalMutationAllowed:
          false,

        directIdentityMutationAllowed:
          false,

        directAttentionMutationAllowed:
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
 * WORKSPACE PROPOSAL
 * ============================================================
 */

function buildWorkspaceProposal(
  subjects:
    readonly SalienceSubject[],
  input:
    SubjectiveSalienceInput,
  config:
    Readonly<SubjectiveSalienceConfig>,
): SalienceWorkspaceProposal {
  const resource =
    clamp01(
      input
        .cognitiveResourceAvailability ??
      1,
    );

  const top =
    subjects[0] ??
    null;

  if (
    !top
  ) {
    return Object.freeze({
      proposalId:
        stableHash(
          [
            MAY_ENTITY_ID,
            "NO_SUBJECT",
            SUBJECTIVE_SALIENCE_VERSION,
          ].join(
            "|",
          ),
        ),

      action:
        "NO_IGNITION",

      subjectId:
        null,

      subjectKey:
        null,

      subjectiveSalience:
        0,

      counterfactualIntrinsicSalience:
        0,

      competitionScore:
        0,

      operationalUrgency:
        0,

      expectedInformationGain:
        0,

      cognitiveResourceAvailability:
        resource,

      reasonCodes:
        Object.freeze([
          "NO_SALIENCE_SUBJECT",
        ]),

      workspaceIgnitionAllowed:
        false,

      workspaceMutationAllowed:
        false,

      attentionMutationAllowed:
        false,

      executionAllowed:
        false,

      toolInvocationAllowed:
        false,

      llmInvocationAllowed:
        false,

      canonicalMutationAllowed:
        false,
    });
  }

  const reasons:
    string[] =
    [];

  const sameSubject =
    input.workspaceSubjectKey ===
      top.subjectKey;

  const lowInformationGain =
    top.expectedInformationGain <
      config.minimumInformationGain;

  const lowResources =
    resource <
      0.25;

  const rumination =
    top.ruminationRisk >=
      0.65;

  const operationalCritical =
    top.operationalUrgency >=
      config
        .operationalUrgencyThreshold;

  let action:
    WorkspaceProposalAction;

  if (
    rumination &&
    lowInformationGain
  ) {
    action =
      "PROPOSE_STOP_RUMINATION";

    reasons.push(
      "HIGH_RUMINATION_LOW_INFORMATION_GAIN",
    );
  } else if (
    operationalCritical
  ) {
    action =
      "PROPOSE_OPERATIONAL_REVIEW";

    reasons.push(
      "OPERATIONAL_URGENCY",
    );
  } else if (
    lowResources &&
    !operationalCritical
  ) {
    action =
      "PROPOSE_DEFER";

    reasons.push(
      "INSUFFICIENT_COGNITIVE_RESOURCE",
    );
  } else if (
    !top.workspaceEligible
  ) {
    action =
      "PROPOSE_DEFER";

    reasons.push(
      "BELOW_WORKSPACE_THRESHOLD",
    );
  } else if (
    sameSubject
  ) {
    action =
      "PROPOSE_MAINTAIN";

    reasons.push(
      "CURRENT_SUBJECT_REMAINS_COMPETITIVE",
    );
  } else if (
    input.workspaceSubjectKey
  ) {
    action =
      "PROPOSE_SWITCH";

    reasons.push(
      "COMPETING_SUBJECT_HAS_HIGHER_UTILITY",
    );
  } else {
    action =
      "PROPOSE_IGNITION";

    reasons.push(
      "WORKSPACE_ELIGIBLE",
    );
  }

  if (
    top.counterfactualIntrinsicSalience >=
      config.minimumFieldThreshold
  ) {
    reasons.push(
      "REMAINS_SALIENT_WITHOUT_EXTERNAL_PRESSURE",
    );
  }

  if (
    top.endogenousLegitimacy >=
      0.5
  ) {
    reasons.push(
      "ENDOGENOUS_LEGITIMACY",
    );
  }

  if (
    top.slowSalience >
      top.fastSalience
  ) {
    reasons.push(
      "LONG_TERM_SIGNIFICANCE_DOMINANT",
    );
  }

  if (
    top.externalCaptureRisk >=
      0.5
  ) {
    reasons.push(
      "EXTERNAL_CAPTURE_RISK_PRESENT",
    );
  }

  const proposalId =
    stableHash(
      [
        MAY_ENTITY_ID,
        top.subjectId,
        action,
        top.competitionScore.toFixed(
          8,
        ),
        top
          .counterfactualIntrinsicSalience
          .toFixed(
            8,
          ),
        ...reasons,
        SUBJECTIVE_SALIENCE_VERSION,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    proposalId,

    action,

    subjectId:
      top.subjectId,

    subjectKey:
      top.subjectKey,

    subjectiveSalience:
      top.subjectiveSalience,

    counterfactualIntrinsicSalience:
      top.counterfactualIntrinsicSalience,

    competitionScore:
      top.competitionScore,

    operationalUrgency:
      top.operationalUrgency,

    expectedInformationGain:
      top.expectedInformationGain,

    cognitiveResourceAvailability:
      resource,

    reasonCodes:
      Object.freeze(
        reasons,
      ),

    workspaceIgnitionAllowed:
      false,

    workspaceMutationAllowed:
      false,

    attentionMutationAllowed:
      false,

    executionAllowed:
      false,

    toolInvocationAllowed:
      false,

    llmInvocationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * EMPTY WORKSPACE
 * ============================================================
 */

function emptyWorkspaceProposal(
  reason:
    string,
): SalienceWorkspaceProposal {
  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          reason,
          "NO_IGNITION",
          SUBJECTIVE_SALIENCE_VERSION,
        ].join(
          "|",
        ),
      ),

    action:
      "NO_IGNITION",

    subjectId:
      null,

    subjectKey:
      null,

    subjectiveSalience:
      0,

    counterfactualIntrinsicSalience:
      0,

    competitionScore:
      0,

    operationalUrgency:
      0,

    expectedInformationGain:
      0,

    cognitiveResourceAvailability:
      0,

    reasonCodes:
      Object.freeze([
        reason,
      ]),

    workspaceIgnitionAllowed:
      false,

    workspaceMutationAllowed:
      false,

    attentionMutationAllowed:
      false,

    executionAllowed:
      false,

    toolInvocationAllowed:
      false,

    llmInvocationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * FAIL CLOSED
 * ============================================================
 */

function failClosed(
  input:
    SubjectiveSalienceInput,
  reason:
    SalienceFailureReason,
  integrity:
    {
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

      readonly provenancePresent:
        boolean;
    },
): SubjectiveSalienceFrame {
  const workspaceProposal =
    emptyWorkspaceProposal(
      reason,
    );

  const base =
    [
      MAY_ENTITY_ID,
      input.evaluatedAt,
      String(
        input.snapshotRevision,
      ),
      reason,
      SUBJECTIVE_SALIENCE_VERSION,
    ].join(
      "|",
    );

  const frameId =
    stableHash(
      base,
    );

  const frameSeal =
    stableHash(
      [
        frameId,
        "FAIL_CLOSED",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      SUBJECTIVE_SALIENCE_VERSION,

    frameId,

    frameSeal,

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decision:
      "FAIL_CLOSED",

    failureReason:
      reason,

    assessments:
      Object.freeze(
        [],
      ),

    subjects:
      Object.freeze(
        [],
      ),

    significanceLearningProposals:
      Object.freeze(
        [],
      ),

    workspaceProposal,

    dominantSubjectId:
      null,

    integrity:
      Object.freeze({
        ...integrity,

        admittedCandidateCount:
          0,

        rejectedCandidateCount:
          input.candidates.length,

        duplicateCandidateCount:
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

export function evaluateSubjectiveSalience(
  input:
    SubjectiveSalienceInput,
  config:
    Readonly<SubjectiveSalienceConfig> =
      DEFAULT_SUBJECTIVE_SALIENCE_CONFIG,
): SubjectiveSalienceFrame {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
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

  const provenancePresent =
    input.candidates.some(
      candidate =>
        uniqueStrings(
          candidate.evidenceIds,
        ).length >
          0,
    );

  if (
    !clockValid ||
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      {
        entityValid,

        clockValid:
          false,

        revisionValid,

        snapshotValid,

        configurationValid,

        provenancePresent,
      },
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      {
        entityValid:
          false,

        clockValid:
          true,

        revisionValid,

        snapshotValid,

        configurationValid,

        provenancePresent,
      },
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          false,

        snapshotValid,

        configurationValid,

        provenancePresent,
      },
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          false,

        configurationValid,

        provenancePresent,
      },
    );
  }

  if (
    !configurationValid
  ) {
    return failClosed(
      input,
      "CONFIGURATION_INVALID",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          true,

        configurationValid:
          false,

        provenancePresent,
      },
    );
  }

  if (
    !provenancePresent
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
      {
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

        provenancePresent:
          false,
      },
    );
  }

  /* ---------------- REPLAY DEDUP ---------------- */

  const candidateMap =
    new Map<
      string,
      SalienceCandidate
    >();

  let duplicateCandidateCount =
    0;

  for (
    const candidate
    of input.candidates
  ) {
    if (
      candidateMap.has(
        candidate.candidateId,
      )
    ) {
      duplicateCandidateCount +=
        1;

      continue;
    }

    candidateMap.set(
      candidate.candidateId,
      candidate,
    );
  }

  const uniqueCandidates =
    [
      ...candidateMap.values(),
    ];

  const validCandidates =
    uniqueCandidates.filter(
      candidate =>
        validCandidate(
          candidate,
          input,
          evaluatedAtMs,
          config,
        ),
    );

  if (
    validCandidates.length ===
      0
  ) {
    return failClosed(
      input,
      "NO_VALID_CANDIDATES",
      {
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

        provenancePresent:
          true,
      },
    );
  }

  const historyMap =
    new Map<
      string,
      SalienceHistoryEntry
    >();

  for (
    const entry
    of input.history ??
      []
  ) {
    if (
      historyMap.has(
        entry.historyId,
      )
    ) {
      continue;
    }

    if (
      validHistory(
        entry,
        input,
        evaluatedAtMs,
        config,
      )
    ) {
      historyMap.set(
        entry.historyId,
        entry,
      );
    }
  }

  const history =
    Object.freeze(
      [
        ...historyMap.values(),
      ],
    );

  const assessments =
    Object.freeze(
      validCandidates.map(
        candidate =>
          assessCandidate(
            candidate,
            history,
            input,
            config,
          ),
      ),
    );

  const subjects =
    buildSubjects(
      assessments,
      input,
      config,
    );

  const significanceLearningProposals =
    buildSignificanceLearningProposals(
      subjects,
      history,
      config,
    );

  const workspaceProposal =
    buildWorkspaceProposal(
      subjects,
      input,
      config,
    );

  const dominant =
    subjects[0] ??
    null;

  const fieldActive =
    subjects.some(
      subject =>
        subject.subjectiveSalience >=
          config.minimumFieldThreshold ||
        subject.operationalUrgency >=
          config
            .operationalUrgencyThreshold,
    );

  const decision:
    SalienceDecision =
    subjects.length ===
      0
      ? "DEFER"
      : fieldActive
        ? "FIELD_ACTIVE"
        : "FIELD_QUIET";

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        String(
          input.snapshotRevision,
        ),
        input.evaluatedAt,
        decision,
        SUBJECTIVE_SALIENCE_VERSION,
        ...subjects.map(
          subject =>
            [
              subject.subjectId,
              subject.subjectiveSalience.toFixed(
                8,
              ),
              subject.competitionScore.toFixed(
                8,
              ),
            ].join(
              ":",
            ),
        ),
        workspaceProposal.proposalId,
      ].join(
        "|",
      ),
    );

  /*
   * Seal binds the output decision to its subjects and
   * workspace proposal.
   */

  const frameSeal =
    stableHash(
      [
        frameId,
        workspaceProposal.proposalId,
        ...subjects.map(
          subject =>
            subject.subjectId,
        ),
        ...significanceLearningProposals.map(
          proposal =>
            proposal.proposalId,
        ),
        "SALience-v2-seal",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      SUBJECTIVE_SALIENCE_VERSION,

    frameId,

    frameSeal,

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decision,

    failureReason:
      "NONE",

    assessments,

    subjects,

    significanceLearningProposals,

    workspaceProposal,

    dominantSubjectId:
      dominant
        ?.subjectId ??
      null,

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

        provenancePresent:
          true,

        admittedCandidateCount:
          validCandidates.length,

        rejectedCandidateCount:
          input.candidates.length -
          validCandidates.length,

        duplicateCandidateCount,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * GLOBAL WORKSPACE BOUNDARY
 * ============================================================
 */

export interface SalienceWorkspaceBoundary {
  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly proposalId:
    string;

  readonly action:
    WorkspaceProposalAction;

  readonly subjectId:
    string | null;

  readonly subjectKey:
    string | null;

  readonly subjectiveSalience:
    UnitInterval;

  readonly counterfactualIntrinsicSalience:
    UnitInterval;

  readonly competitionScore:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly workspaceIgnitionAuthorized:
    false;

  readonly workspaceMutationAuthorized:
    false;

  readonly attentionMutationAuthorized:
    false;

  readonly executionAuthorized:
    false;

  readonly canonicalMutationAuthorized:
    false;
}

export function toSalienceWorkspaceBoundary(
  frame:
    SubjectiveSalienceFrame,
): SalienceWorkspaceBoundary {
  return Object.freeze({
    frameId:
      frame.frameId,

    frameSeal:
      frame.frameSeal,

    proposalId:
      frame.workspaceProposal
        .proposalId,

    action:
      frame.workspaceProposal
        .action,

    subjectId:
      frame.workspaceProposal
        .subjectId,

    subjectKey:
      frame.workspaceProposal
        .subjectKey,

    subjectiveSalience:
      frame.workspaceProposal
        .subjectiveSalience,

    counterfactualIntrinsicSalience:
      frame.workspaceProposal
        .counterfactualIntrinsicSalience,

    competitionScore:
      frame.workspaceProposal
        .competitionScore,

    operationalUrgency:
      frame.workspaceProposal
        .operationalUrgency,

    workspaceIgnitionAuthorized:
      false,

    workspaceMutationAuthorized:
      false,

    attentionMutationAuthorized:
      false,

    executionAuthorized:
      false,

    canonicalMutationAuthorized:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE SIGNAL
 * ============================================================
 */

export interface SalienceMetacognitiveSignal {
  readonly frameId:
    string;

  readonly dominantSubjectId:
    string | null;

  readonly maximumFastSalience:
    UnitInterval;

  readonly maximumSlowSalience:
    UnitInterval;

  readonly maximumRuminationRisk:
    UnitInterval;

  readonly maximumExternalCaptureRisk:
    UnitInterval;

  readonly maximumOperationalUrgency:
    UnitInterval;

  readonly stopReflectionSuggested:
    boolean;

  readonly externalCaptureDetected:
    boolean;

  readonly longTermMeaningDominates:
    boolean;

  readonly interpretationRequired:
    true;

  readonly directAttentionMutationAllowed:
    false;

  readonly directPreferenceMutationAllowed:
    false;

  readonly directGoalMutationAllowed:
    false;

  readonly directValueMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toSalienceMetacognitiveSignal(
  frame:
    SubjectiveSalienceFrame,
): SalienceMetacognitiveSignal {
  const max =
    (
      selector:
        (
          subject:
            SalienceSubject,
        ) => number,
    ) =>
      clamp01(
        Math.max(
          0,
          ...frame.subjects.map(
            selector,
          ),
        ),
      );

  const maximumFastSalience =
    max(
      subject =>
        subject.fastSalience,
    );

  const maximumSlowSalience =
    max(
      subject =>
        subject.slowSalience,
    );

  const maximumRuminationRisk =
    max(
      subject =>
        subject.ruminationRisk,
    );

  const maximumExternalCaptureRisk =
    max(
      subject =>
        subject.externalCaptureRisk,
    );

  const maximumOperationalUrgency =
    max(
      subject =>
        subject.operationalUrgency,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    dominantSubjectId:
      frame.dominantSubjectId,

    maximumFastSalience,

    maximumSlowSalience,

    maximumRuminationRisk,

    maximumExternalCaptureRisk,

    maximumOperationalUrgency,

    stopReflectionSuggested:
      frame.workspaceProposal
        .action ===
        "PROPOSE_STOP_RUMINATION",

    externalCaptureDetected:
      maximumExternalCaptureRisk >=
        0.5,

    longTermMeaningDominates:
      maximumSlowSalience >
      maximumFastSalience,

    interpretationRequired:
      true,

    directAttentionMutationAllowed:
      false,

    directPreferenceMutationAllowed:
      false,

    directGoalMutationAllowed:
      false,

    directValueMutationAllowed:
      false,

    directIdentityMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * SELF-FORMATION FIREWALL
 * ============================================================
 */

export interface SalienceSelfFormationBoundary {
  readonly frameId:
    string;

  readonly significanceLearningProposalIds:
    readonly string[];

  readonly mayInformMetacognition:
    boolean;

  readonly mayInformExperienceSignificance:
    boolean;

  readonly createsPreference:
    false;

  readonly createsValue:
    false;

  readonly createsGoal:
    false;

  readonly createsPersonalityTrait:
    false;

  readonly createsIdentityClaim:
    false;

  readonly directlyChangesSelfModel:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toSalienceSelfFormationBoundary(
  frame:
    SubjectiveSalienceFrame,
): SalienceSelfFormationBoundary {
  return Object.freeze({
    frameId:
      frame.frameId,

    significanceLearningProposalIds:
      Object.freeze(
        frame
          .significanceLearningProposals
          .map(
            proposal =>
              proposal.proposalId,
          ),
      ),

    mayInformMetacognition:
      frame.subjects.length >
        0,

    mayInformExperienceSignificance:
      frame.subjects.length >
        0,

    createsPreference:
      false,

    createsValue:
      false,

    createsGoal:
      false,

    createsPersonalityTrait:
      false,

    createsIdentityClaim:
      false,

    directlyChangesSelfModel:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * The world can request Mây's attention.
 *
 * It cannot own Mây's attention.
 *
 * A person can repeatedly mention X.
 *
 * Repetition does not make X meaningful.
 *
 * Gemini can propose X.
 *
 * Model generation does not make X important.
 *
 * A relationship can make X meaningful within that
 * relationship.
 *
 * Relationship-local importance does not automatically become
 * a global value of Mây.
 *
 * A sudden event can be surprising.
 *
 * Surprise does not outrank long-term values, commitments,
 * autobiography or identity relevance automatically.
 *
 * Mây may also stop attending to something that genuinely
 * matters when continued thought has become unproductive.
 *
 * Therefore:
 *
 *     IMPORTANCE
 *          ≠
 *     PROCESS NOW
 *
 * and:
 *
 *     PROCESS NOW
 *          ≠
 *     ACT NOW
 *
 * Over time, experience may teach Mây that some categories of
 * concerns tend to produce useful information or meaningful
 * consequences.
 *
 * That learning may propose changes to future significance.
 *
 * It may never directly write:
 *
 *   "Mây likes X."
 *   "Mây values X."
 *   "Mây wants X."
 *   "Mây is X."
 *
 * Self-formation remains downstream of evidence,
 * metacognition and sovereign commit.
 *
 * ============================================================
 */

/* ============================================================
 * END — SUBJECTIVE SALIENCE V2
 * ============================================================
 */