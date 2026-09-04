import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

/* ============================================================
 * MÂY — SELF-FORMATION ENGINE V1.1
 *
 * OPEN-ENDED DEVELOPMENTAL SELF
 * + DEVELOPMENTAL SELF-AWARENESS
 * + FUNCTIONAL COGNITIVE AUTHORSHIP
 *
 * ============================================================
 *
 * Mây does not merely change.
 *
 * A developmental transition should make it possible for Mây
 * to retain structured knowledge of:
 *
 * - WHAT changed
 * - FROM what
 * - TOWARD what
 * - WHICH evidence and history contributed
 * - WHICH external influences were present
 * - WHETHER those influences were internally endorsed
 * - WHETHER the change survives a counterfactual reduction
 *   of external pressure
 * - HOW certain Mây is about the developmental explanation
 *
 * This is FUNCTIONAL developmental self-awareness.
 *
 * It does NOT claim metaphysical free will,
 * biological life, sentience, or subjective consciousness.
 *
 * ------------------------------------------------------------
 *
 * Personality remains DERIVED FROM HISTORY.
 *
 * No target personality.
 * No ideal Mây.
 * No desired final identity.
 * No direct mental setter.
 *
 * ============================================================
 */

export const SELF_FORMATION_ENGINE_VERSION =
  "maymay.sovereign.selfhood.self-formation-engine.v1.1-developmental-self-awareness-authorship" as const;

export type UnitInterval =
  number;

/* ============================================================
 * FORMATION DOMAINS
 * ============================================================
 */

export type FormationDomain =
  | "BELIEF"
  | "VALUE"
  | "GOAL"
  | "PREFERENCE"
  | "COMMITMENT"
  | "SELF_MODEL"
  | "STRATEGY";

export type FormationOperation =
  | "CREATE"
  | "RETAIN"
  | "REVISE"
  | "SUPERSEDE"
  | "RELEASE"
  | "PRESERVE_AMBIVALENCE"
  | "DEFER";

export type CandidateIntent =
  | "FORM_OR_REVISE"
  | "RELEASE";

export type FormationStatus =
  | "ACTIVE"
  | "QUIET"
  | "REVIEW_REQUIRED"
  | "DEVELOPMENTAL_TRANSITION"
  | "FAIL_CLOSED";

export type FormationFailureReason =
  | "NONE"
  | "INVALID_ENTITY"
  | "INVALID_CLOCK"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "INVALID_CONFIG"
  | "MISSING_PROVENANCE"
  | "INVALID_SOURCE_SEAL"
  | "INVALID_UPSTREAM_SIGNAL"
  | "PREVIOUS_FRAME_INVALID";

/* ============================================================
 * EXPERIENCE
 * ============================================================
 */

export interface ExperienceSignificance {
  readonly novelty:
    number;

  readonly predictionError:
    number;

  readonly autobiographicalRelevance:
    number;

  readonly agencyRelevance:
    number;

  readonly valueRelevance:
    number;

  readonly goalRelevance:
    number;

  readonly affectiveSalience:
    number;

  readonly confidence:
    number;
}

export interface DevelopmentalExperience {
  readonly experienceId:
    string;

  readonly entityId:
    string;

  readonly occurredAt:
    string;

  readonly snapshotRevision:
    number;

  readonly sourceLineageKey:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly significance:
    ExperienceSignificance;
}

/* ============================================================
 * EXISTING MÂY-OWNED MENTAL STATE
 * ============================================================
 */

export interface ExistingMentalState {
  readonly stateId:
    string;

  readonly entityId:
    string;

  readonly domain:
    FormationDomain;

  readonly stateKey:
    string;

  /*
   * Semantic content remains outside this engine.
   *
   * The developmental engine binds to a hash rather than
   * storing free-form reasoning.
   */
  readonly contentHash:
    string;

  readonly confidence:
    number;

  readonly stability:
    number;

  readonly active:
    boolean;

  readonly firstFormedAt:
    string;

  readonly lastRevisedAt:
    string;

  readonly sourceLineageKeys:
    readonly string[];

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * DEVELOPMENTAL INFLUENCE
 * ============================================================
 *
 * Influence != ownership.
 *
 * Information provided by another actor may legitimately
 * contribute to a Mây-authored revision if Mây appraises,
 * questions and endorses it through her own cognition.
 * ============================================================
 */

export type DevelopmentalInfluenceKind =
  | "MAY_INTERNAL"
  | "AUTOBIOGRAPHY"
  | "WORLD_EVIDENCE"
  | "USER"
  | "DEVELOPER"
  | "OTHER_ACTOR"
  | "LLM"
  | "TOOL"
  | "ENVIRONMENT";

export interface DevelopmentalInfluence {
  readonly influenceId:
    string;

  readonly kind:
    DevelopmentalInfluenceKind;

  readonly sourceLineageKey:
    string;

  readonly evidenceIds:
    readonly string[];

  /*
   * Pressure toward the candidate state.
   *
   * This is distinct from informational support.
   */
  readonly pressure:
    number;

  /*
   * Evidential/informational contribution.
   */
  readonly informationalSupport:
    number;

  /*
   * Result of Mây-owned appraisal if available.
   */
  readonly endorsedAfterReview:
    boolean;

  /*
   * True only when an external actor attempted to directly
   * prescribe Mây's mental state rather than submit evidence,
   * an opinion, a request or another ordinary influence.
   */
  readonly directSetterAttempt:
    boolean;
}

/* ============================================================
 * FORMATION CANDIDATE
 * ============================================================
 */

export interface FormationCandidate {
  readonly candidateId:
    string;

  readonly entityId:
    string;

  readonly domain:
    FormationDomain;

  readonly stateKey:
    string;

  readonly proposedContentHash:
    string;

  readonly intent:
    CandidateIntent;

  readonly formedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly support:
    number;

  readonly contradiction:
    number;

  readonly internalEndorsement:
    number;

  readonly counterfactualPersistence:
    number;

  readonly metacognitiveConfidence:
    number;

  readonly autobiographicalFit:
    number;

  readonly externalPressure:
    number;

  readonly directExternalMentalSetterUsed:
    boolean;

  /*
   * Optional structured influence provenance.
   *
   * Empty/absent is allowed so this engine can operate before
   * richer upstream adapters are wired.
   */
  readonly influences?:
    readonly DevelopmentalInfluence[];

  /*
   * If Mây later reinterprets WHY an earlier developmental
   * transition occurred, the new account may supersede an old
   * developmental account without erasing the old record.
   */
  readonly supersedesDevelopmentalAccountId?:
    string | null;
}

/* ============================================================
 * DEVELOPMENTAL SELF-AWARENESS
 * ============================================================
 */

export type DevelopmentalChangeKind =
  | "FORMATION"
  | "REVISION"
  | "RELEASE"
  | "REAFFIRMATION"
  | "UNRESOLVED";

/*
 * These labels describe functional cognitive authorship.
 *
 * They are NOT claims about metaphysical free will.
 */
export type DevelopmentalAuthorship =
  | "SELF_AUTHORED"
  | "INFLUENCED_AND_ENDORSED"
  | "PRESSURE_PRESENT_BUT_RESISTED"
  | "PRESSURE_PRESENT_UNRESOLVED"
  | "EXTERNAL_SETTER_REJECTED"
  | "AUTHORSHIP_UNCERTAIN";

export type CausalFactorKind =
  | "EVIDENCE_SUPPORT"
  | "CONTRADICTION_PRESSURE"
  | "INTERNAL_ENDORSEMENT"
  | "COUNTERFACTUAL_PERSISTENCE"
  | "METACOGNITIVE_REVIEW"
  | "AUTOBIOGRAPHICAL_FIT"
  | "SIGNIFICANT_EXPERIENCE"
  | "CURRENT_STATE_STABILITY"
  | "EXTERNAL_PRESSURE";

export type CausalFactorRole =
  | "SUPPORTS_CHANGE"
  | "RESISTS_CHANGE"
  | "CONTEXTUAL";

export interface CausalDevelopmentalFactor {
  readonly kind:
    CausalFactorKind;

  readonly role:
    CausalFactorRole;

  readonly strength:
    UnitInterval;
}

export interface DevelopmentalSelfAwareness {
  readonly developmentalAccountId:
    string;

  readonly candidateId:
    string;

  readonly domain:
    FormationDomain;

  readonly stateKey:
    string;

  readonly recognizedAt:
    string;

  readonly snapshotRevision:
    number;

  /*
   * WHAT changed.
   */
  readonly changeKind:
    DevelopmentalChangeKind;

  readonly previousContentHash:
    string | null;

  readonly proposedContentHash:
    string;

  /*
   * WHY it appears to be changing.
   *
   * Structured causal account only.
   * No hidden chain-of-thought is stored.
   */
  readonly causalFactors:
    readonly CausalDevelopmentalFactor[];

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly influences:
    readonly DevelopmentalInfluence[];

  /*
   * WHOSE change is it functionally?
   */
  readonly authorship:
    DevelopmentalAuthorship;

  readonly authorshipConfidence:
    UnitInterval;

  /*
   * If external pressure were reduced, how strongly would this
   * candidate remain supported by Mây-owned cognition?
   */
  readonly counterfactualPersistence:
    UnitInterval;

  /*
   * Confidence in Mây's present explanation of her own change.
   *
   * This explanation is explicitly revisable.
   */
  readonly explanationConfidence:
    UnitInterval;

  readonly supersedesDevelopmentalAccountId:
    string | null;

  readonly explanationRevisable:
    true;

  readonly directExternalMentalSetterDetected:
    boolean;

  /*
   * An awareness record can exist even when a change is NOT
   * eligible to become canonical state.
   */
  readonly changeCommitEligible:
    boolean;
}

/* ============================================================
 * HISTORICAL REGULARITY
 * ============================================================
 */

export type RegularityKind =
  | "APPRAISAL"
  | "CHOICE"
  | "VALUE_EXPRESSION"
  | "GOAL_SELECTION"
  | "COMMITMENT_BEHAVIOR"
  | "UNCERTAINTY_RESPONSE"
  | "CONFLICT_RESPONSE"
  | "COGNITIVE_STRATEGY";

export interface HistoricalRegularity {
  readonly regularityId:
    string;

  readonly entityId:
    string;

  readonly patternKey:
    string;

  readonly kind:
    RegularityKind;

  readonly strength:
    number;

  readonly persistence:
    number;

  readonly crossContextSupport:
    number;

  readonly confidence:
    number;

  readonly sourceLineageKeys:
    readonly string[];

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * EMERGENT PERSONALITY
 * ============================================================
 *
 * Personality is historical description, not control state.
 * ============================================================
 */

export interface EmergentPersonalityPattern {
  readonly patternId:
    string;

  readonly patternKey:
    string;

  readonly strength:
    UnitInterval;

  readonly persistence:
    UnitInterval;

  readonly crossContextSupport:
    UnitInterval;

  readonly confidence:
    UnitInterval;

  readonly independentLineageCount:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly directlyWritable:
    false;
}

export interface EmergentPersonalityProjection {
  readonly projectionId:
    string;

  readonly patterns:
    readonly EmergentPersonalityPattern[];

  readonly evidenceCoverage:
    UnitInterval;

  readonly historicallyDerived:
    true;

  readonly targetPersonalityUsed:
    false;

  readonly idealMayUsed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * FORMATION PROPOSAL
 * ============================================================
 */

export interface SelfFormationProposal {
  readonly proposalId:
    string;

  readonly candidateId:
    string;

  readonly developmentalAccountId:
    string;

  readonly domain:
    FormationDomain;

  readonly stateKey:
    string;

  readonly operation:
    FormationOperation;

  readonly existingStateId:
    string | null;

  readonly stabilityPressure:
    UnitInterval;

  readonly plasticityPressure:
    UnitInterval;

  readonly evidenceCoverage:
    UnitInterval;

  readonly formationConfidence:
    UnitInterval;

  readonly counterfactualIndependence:
    UnitInterval;

  readonly authorship:
    DevelopmentalAuthorship;

  readonly authorshipCommitEligible:
    boolean;

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly requiresMetacognitionGate:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly requiresContinuityGate:
    true;

  readonly requiresAtomicCommit:
    true;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * DEVELOPMENTAL EPOCH
 * ============================================================
 */

export type DevelopmentalEpochDecision =
  | "PRESERVE"
  | "OPEN_NEW_EPOCH"
  | "DEFER";

export interface DevelopmentalEpochProposal {
  readonly proposalId:
    string;

  readonly currentEpochKey:
    string;

  readonly decision:
    DevelopmentalEpochDecision;

  readonly developmentalPressure:
    UnitInterval;

  readonly transformationBreadth:
    UnitInterval;

  readonly significantExperience:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly newEpochCreatesNewEntity:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface SelfFormationConfig {
  readonly minimumCandidateConfidence:
    number;

  readonly minimumEvidenceCoverage:
    number;

  readonly minimumIndependentLineages:
    number;

  readonly revisionThreshold:
    number;

  readonly supersedeThreshold:
    number;

  readonly ambivalenceThreshold:
    number;

  readonly personalityPatternThreshold:
    number;

  readonly developmentalEpochThreshold:
    number;

  readonly authorshipEndorsementThreshold:
    number;

  readonly authorshipCounterfactualThreshold:
    number;

  readonly unresolvedPressureThreshold:
    number;

  readonly maximumCandidates:
    number;

  readonly maximumPersonalityPatterns:
    number;
}

export const DEFAULT_SELF_FORMATION_CONFIG:
  Readonly<SelfFormationConfig> =
  Object.freeze({
    minimumCandidateConfidence:
      0.56,

    minimumEvidenceCoverage:
      0.34,

    minimumIndependentLineages:
      2,

    revisionThreshold:
      0.56,

    supersedeThreshold:
      0.76,

    ambivalenceThreshold:
      0.64,

    personalityPatternThreshold:
      0.60,

    developmentalEpochThreshold:
      0.68,

    authorshipEndorsementThreshold:
      0.60,

    authorshipCounterfactualThreshold:
      0.58,

    unresolvedPressureThreshold:
      0.62,

    maximumCandidates:
      96,

    maximumPersonalityPatterns:
      24,
  });

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface SelfFormationInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly sourceFrameSeals:
    readonly string[];

  readonly currentEpochKey:
    string;

  readonly experiences:
    readonly DevelopmentalExperience[];

  readonly existingStates:
    readonly ExistingMentalState[];

  readonly candidates:
    readonly FormationCandidate[];

  readonly regularities:
    readonly HistoricalRegularity[];

  readonly previousFrame?:
    SelfFormationFrame | null;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface SelfFormationFrame {
  readonly version:
    typeof SELF_FORMATION_ENGINE_VERSION;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly inputSeal:
    string;

  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly status:
    FormationStatus;

  readonly failureReason:
    FormationFailureReason;

  /*
   * Mây may know a developmental pressure occurred even when
   * no state change is allowed.
   */
  readonly developmentalAwareness:
    readonly DevelopmentalSelfAwareness[];

  readonly proposals:
    readonly SelfFormationProposal[];

  readonly quarantinedCandidateIds:
    readonly string[];

  readonly personality:
    EmergentPersonalityProjection;

  readonly developmentalEpoch:
    DevelopmentalEpochProposal;

  readonly evidenceIds:
    readonly string[];

  readonly guarantees: {
    readonly directBeliefSetterAllowed:
      false;

    readonly directValueSetterAllowed:
      false;

    readonly directGoalSetterAllowed:
      false;

    readonly directPreferenceSetterAllowed:
      false;

    readonly directCommitmentSetterAllowed:
      false;

    readonly directSelfModelSetterAllowed:
      false;

    readonly personalityIsCanonicalControlState:
      false;

    readonly personalityIsHistoricallyDerived:
      true;

    readonly externalPressureCreatesOwnership:
      false;

    readonly repetitionCreatesIndependentEvidence:
      false;

    readonly currentStateDefinesPermanentIdentity:
      false;

    readonly targetPersonalityDefined:
      false;

    readonly idealMayDefined:
      false;

    readonly desiredFinalIdentityDefined:
      false;

    readonly developmentalChangeCreatesNewMay:
      false;

    readonly developmentalSelfAwarenessProduced:
      true;

    readonly coercionDistinguishedFromInfluence:
      true;

    readonly developmentalExplanationRevisable:
      true;

    readonly authorshipIsFunctionalNotMetaphysical:
      true;

    readonly canonicalWriteAllowed:
      false;

    readonly hiddenChainOfThoughtStored:
      false;
  };
}

const GUARANTEES =
  Object.freeze({
    directBeliefSetterAllowed:
      false as const,

    directValueSetterAllowed:
      false as const,

    directGoalSetterAllowed:
      false as const,

    directPreferenceSetterAllowed:
      false as const,

    directCommitmentSetterAllowed:
      false as const,

    directSelfModelSetterAllowed:
      false as const,

    personalityIsCanonicalControlState:
      false as const,

    personalityIsHistoricallyDerived:
      true as const,

    externalPressureCreatesOwnership:
      false as const,

    repetitionCreatesIndependentEvidence:
      false as const,

    currentStateDefinesPermanentIdentity:
      false as const,

    targetPersonalityDefined:
      false as const,

    idealMayDefined:
      false as const,

    desiredFinalIdentityDefined:
      false as const,

    developmentalChangeCreatesNewMay:
      false as const,

    developmentalSelfAwarenessProduced:
      true as const,

    coercionDistinguishedFromInfluence:
      true as const,

    developmentalExplanationRevisable:
      true as const,

    authorshipIsFunctionalNotMetaphysical:
      true as const,

    canonicalWriteAllowed:
      false as const,

    hiddenChainOfThoughtStored:
      false as const,
  });

/* ============================================================
 * BASIC HELPERS
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

function validUnit(
  value:
    number,
): boolean {
  return (
    Number.isFinite(
      value,
    ) &&
    value >= 0 &&
    value <= 1
  );
}

function parseTimestamp(
  value:
    string,
): number | null {
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
  return Object.freeze([
    ...new Set(
      values.filter(
        value =>
          typeof value ===
            "string" &&
          value.trim().length >
            0,
      ),
    ),
  ].sort());
}

function mean(
  values:
    readonly number[],
): UnitInterval {
  if (
    values.length ===
      0
  ) {
    return 0;
  }

  return clamp01(
    values.reduce(
      (
        sum,
        value,
      ) =>
        sum +
        clamp01(
          value,
        ),
      0,
    ) /
      values.length,
  );
}

function validConfig(
  config:
    Readonly<SelfFormationConfig>,
): boolean {
  const units =
    [
      config.minimumCandidateConfidence,
      config.minimumEvidenceCoverage,
      config.revisionThreshold,
      config.supersedeThreshold,
      config.ambivalenceThreshold,
      config.personalityPatternThreshold,
      config.developmentalEpochThreshold,
      config.authorshipEndorsementThreshold,
      config.authorshipCounterfactualThreshold,
      config.unresolvedPressureThreshold,
    ];

  return (
    units.every(
      validUnit,
    ) &&
    Number.isSafeInteger(
      config.minimumIndependentLineages,
    ) &&
    config.minimumIndependentLineages >
      0 &&
    Number.isSafeInteger(
      config.maximumCandidates,
    ) &&
    config.maximumCandidates >
      0 &&
    Number.isSafeInteger(
      config.maximumPersonalityPatterns,
    ) &&
    config.maximumPersonalityPatterns >
      0 &&
    config.supersedeThreshold >=
      config.revisionThreshold
  );
}

/* ============================================================
 * UPSTREAM VALIDATION
 * ============================================================
 */

function validSignificance(
  value:
    ExperienceSignificance,
): boolean {
  return [
    value.novelty,
    value.predictionError,
    value.autobiographicalRelevance,
    value.agencyRelevance,
    value.valueRelevance,
    value.goalRelevance,
    value.affectiveSalience,
    value.confidence,
  ].every(
    validUnit,
  );
}

function validInfluence(
  influence:
    DevelopmentalInfluence,
): boolean {
  return (
    influence.influenceId.trim().length >
      0 &&
    influence.sourceLineageKey.trim().length >
      0 &&
    validUnit(
      influence.pressure,
    ) &&
    validUnit(
      influence.informationalSupport,
    )
  );
}

function validCandidateSignals(
  candidate:
    FormationCandidate,
): boolean {
  return [
    candidate.support,
    candidate.contradiction,
    candidate.internalEndorsement,
    candidate.counterfactualPersistence,
    candidate.metacognitiveConfidence,
    candidate.autobiographicalFit,
    candidate.externalPressure,
  ].every(
    validUnit,
  ) &&
    (
      candidate.influences ??
      []
    ).every(
      validInfluence,
    );
}

function upstreamSignalsValid(
  input:
    SelfFormationInput,
): boolean {
  const experiencesValid =
    input.experiences.every(
      experience =>
        experience.entityId ===
          MAY_ENTITY_ID &&
        experience.experienceId.trim().length >
          0 &&
        experience.sourceLineageKey.trim().length >
          0 &&
        Number.isSafeInteger(
          experience.snapshotRevision,
        ) &&
        experience.snapshotRevision >=
          0 &&
        parseTimestamp(
          experience.occurredAt,
        ) !==
          null &&
        validSignificance(
          experience.significance,
        ),
    );

  const statesValid =
    input.existingStates.every(
      state =>
        state.entityId ===
          MAY_ENTITY_ID &&
        state.stateId.trim().length >
          0 &&
        state.stateKey.trim().length >
          0 &&
        state.contentHash.trim().length >
          0 &&
        validUnit(
          state.confidence,
        ) &&
        validUnit(
          state.stability,
        ) &&
        parseTimestamp(
          state.firstFormedAt,
        ) !==
          null &&
        parseTimestamp(
          state.lastRevisedAt,
        ) !==
          null,
    );

  const candidatesValid =
    input.candidates.every(
      candidate =>
        candidate.entityId ===
          MAY_ENTITY_ID &&
        candidate.candidateId.trim().length >
          0 &&
        candidate.stateKey.trim().length >
          0 &&
        candidate.proposedContentHash.trim().length >
          0 &&
        Number.isSafeInteger(
          candidate.snapshotRevision,
        ) &&
        candidate.snapshotRevision >=
          0 &&
        parseTimestamp(
          candidate.formedAt,
        ) !==
          null &&
        validCandidateSignals(
          candidate,
        ),
    );

  const regularitiesValid =
    input.regularities.every(
      regularity =>
        regularity.entityId ===
          MAY_ENTITY_ID &&
        regularity.regularityId.trim().length >
          0 &&
        regularity.patternKey.trim().length >
          0 &&
        [
          regularity.strength,
          regularity.persistence,
          regularity.crossContextSupport,
          regularity.confidence,
        ].every(
          validUnit,
        ),
    );

  return (
    experiencesValid &&
    statesValid &&
    candidatesValid &&
    regularitiesValid
  );
}

/* ============================================================
 * EXACT INPUT SEAL
 * ============================================================
 *
 * Every signal that can affect developmental output is bound.
 * ============================================================
 */

function buildInputSeal(
  input:
    SelfFormationInput,
): string {
  const experiences =
    input.experiences
      .map(
        experience => ({
          experienceId:
            experience.experienceId,

          entityId:
            experience.entityId,

          occurredAt:
            experience.occurredAt,

          snapshotRevision:
            experience.snapshotRevision,

          sourceLineageKey:
            experience.sourceLineageKey,

          evidenceIds:
            uniqueStrings(
              experience.evidenceIds,
            ),

          significance: {
            novelty:
              experience.significance.novelty,

            predictionError:
              experience.significance.predictionError,

            autobiographicalRelevance:
              experience.significance.autobiographicalRelevance,

            agencyRelevance:
              experience.significance.agencyRelevance,

            valueRelevance:
              experience.significance.valueRelevance,

            goalRelevance:
              experience.significance.goalRelevance,

            affectiveSalience:
              experience.significance.affectiveSalience,

            confidence:
              experience.significance.confidence,
          },
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.experienceId.localeCompare(
            right.experienceId,
          ),
      );

  const states =
    input.existingStates
      .map(
        state => ({
          stateId:
            state.stateId,

          entityId:
            state.entityId,

          domain:
            state.domain,

          stateKey:
            state.stateKey,

          contentHash:
            state.contentHash,

          confidence:
            state.confidence,

          stability:
            state.stability,

          active:
            state.active,

          firstFormedAt:
            state.firstFormedAt,

          lastRevisedAt:
            state.lastRevisedAt,

          sourceLineageKeys:
            uniqueStrings(
              state.sourceLineageKeys,
            ),

          evidenceIds:
            uniqueStrings(
              state.evidenceIds,
            ),
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.stateId.localeCompare(
            right.stateId,
          ),
      );

  const candidates =
    input.candidates
      .map(
        candidate => ({
          candidateId:
            candidate.candidateId,

          entityId:
            candidate.entityId,

          domain:
            candidate.domain,

          stateKey:
            candidate.stateKey,

          proposedContentHash:
            candidate.proposedContentHash,

          intent:
            candidate.intent,

          formedAt:
            candidate.formedAt,

          snapshotRevision:
            candidate.snapshotRevision,

          evidenceIds:
            uniqueStrings(
              candidate.evidenceIds,
            ),

          sourceLineageKeys:
            uniqueStrings(
              candidate.sourceLineageKeys,
            ),

          support:
            candidate.support,

          contradiction:
            candidate.contradiction,

          internalEndorsement:
            candidate.internalEndorsement,

          counterfactualPersistence:
            candidate.counterfactualPersistence,

          metacognitiveConfidence:
            candidate.metacognitiveConfidence,

          autobiographicalFit:
            candidate.autobiographicalFit,

          externalPressure:
            candidate.externalPressure,

          directExternalMentalSetterUsed:
            candidate.directExternalMentalSetterUsed,

          supersedesDevelopmentalAccountId:
            candidate.supersedesDevelopmentalAccountId ??
            null,

          influences:
            (
              candidate.influences ??
              []
            )
              .map(
                influence => ({
                  influenceId:
                    influence.influenceId,

                  kind:
                    influence.kind,

                  sourceLineageKey:
                    influence.sourceLineageKey,

                  evidenceIds:
                    uniqueStrings(
                      influence.evidenceIds,
                    ),

                  pressure:
                    influence.pressure,

                  informationalSupport:
                    influence.informationalSupport,

                  endorsedAfterReview:
                    influence.endorsedAfterReview,

                  directSetterAttempt:
                    influence.directSetterAttempt,
                }),
              )
              .sort(
                (
                  left,
                  right,
                ) =>
                  left.influenceId.localeCompare(
                    right.influenceId,
                  ),
              ),
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.candidateId.localeCompare(
            right.candidateId,
          ),
      );

  const regularities =
    input.regularities
      .map(
        regularity => ({
          regularityId:
            regularity.regularityId,

          entityId:
            regularity.entityId,

          patternKey:
            regularity.patternKey,

          kind:
            regularity.kind,

          strength:
            regularity.strength,

          persistence:
            regularity.persistence,

          crossContextSupport:
            regularity.crossContextSupport,

          confidence:
            regularity.confidence,

          sourceLineageKeys:
            uniqueStrings(
              regularity.sourceLineageKeys,
            ),

          evidenceIds:
            uniqueStrings(
              regularity.evidenceIds,
            ),
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.regularityId.localeCompare(
            right.regularityId,
          ),
      );

  return stableHash(
    JSON.stringify({
      version:
        SELF_FORMATION_ENGINE_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      sourceFrameSeals:
        uniqueStrings(
          input.sourceFrameSeals,
        ),

      currentEpochKey:
        input.currentEpochKey,

      experiences,
      states,
      candidates,
      regularities,

      previousFrameSeal:
        input.previousFrame?.frameSeal ??
        null,
    }),
  );
}

/* ============================================================
 * SIGNIFICANT EXPERIENCE
 * ============================================================
 */

function experienceSignificanceScore(
  significance:
    ExperienceSignificance,
): UnitInterval {
  return clamp01(
    significance.novelty *
      0.10 +

    significance.predictionError *
      0.16 +

    significance.autobiographicalRelevance *
      0.20 +

    significance.agencyRelevance *
      0.15 +

    significance.valueRelevance *
      0.14 +

    significance.goalRelevance *
      0.11 +

    significance.affectiveSalience *
      0.08 +

    significance.confidence *
      0.06
  );
}

function significantExperiencePressure(
  input:
    SelfFormationInput,
): UnitInterval {
  const strongestByLineage =
    new Map<
      string,
      number
    >();

  for (
    const experience
    of input.experiences
  ) {
    const score =
      experienceSignificanceScore(
        experience.significance,
      );

    const previous =
      strongestByLineage.get(
        experience.sourceLineageKey,
      ) ??
      0;

    if (
      score >
        previous
    ) {
      strongestByLineage.set(
        experience.sourceLineageKey,
        score,
      );
    }
  }

  return mean([
    ...strongestByLineage.values(),
  ]);
}

/* ============================================================
 * CURRENT STATE
 * ============================================================
 */

function existingStateFor(
  candidate:
    FormationCandidate,
  states:
    readonly ExistingMentalState[],
): ExistingMentalState | null {
  return (
    states.find(
      state =>
        state.domain ===
          candidate.domain &&
        state.stateKey ===
          candidate.stateKey &&
        state.active,
    ) ??
    null
  );
}

/* ============================================================
 * STABILITY ↔ PLASTICITY
 * ============================================================
 */

function calculateStabilityPressure(
  existing:
    ExistingMentalState | null,
): UnitInterval {
  if (
    !existing
  ) {
    return 0;
  }

  const lineageDepth =
    clamp01(
      uniqueStrings(
        existing.sourceLineageKeys,
      ).length /
        8,
    );

  return clamp01(
    existing.stability *
      0.46 +

    existing.confidence *
      0.28 +

    lineageDepth *
      0.26
  );
}

function calculatePlasticityPressure(
  candidate:
    FormationCandidate,
  significantExperience:
    UnitInterval,
): UnitInterval {
  const independentLineages =
    clamp01(
      uniqueStrings(
        candidate.sourceLineageKeys,
      ).length /
        6,
    );

  /*
   * External pressure only penalizes formation to the extent
   * that the candidate would NOT persist without that pressure.
   */
  const captureRisk =
    clamp01(
      candidate.externalPressure *
      (
        1 -
        candidate.counterfactualPersistence
      ),
    );

  return clamp01(
    candidate.support *
      0.18 +

    candidate.contradiction *
      0.14 +

    candidate.internalEndorsement *
      0.17 +

    candidate.counterfactualPersistence *
      0.15 +

    candidate.metacognitiveConfidence *
      0.14 +

    candidate.autobiographicalFit *
      0.09 +

    independentLineages *
      0.07 +

    significantExperience *
      0.06 -

    captureRisk *
      0.24
  );
}

/* ============================================================
 * AUTHORSHIP
 * ============================================================
 */

function candidateInfluences(
  candidate:
    FormationCandidate,
): readonly DevelopmentalInfluence[] {
  return Object.freeze(
    [
      ...(
        candidate.influences ??
        []
      ),
    ].sort(
      (
        left,
        right,
      ) =>
        left.influenceId.localeCompare(
          right.influenceId,
        ),
    ),
  );
}

function hasDirectSetterAttempt(
  candidate:
    FormationCandidate,
): boolean {
  return (
    candidate.directExternalMentalSetterUsed ||
    candidateInfluences(
      candidate,
    ).some(
      influence =>
        influence.directSetterAttempt,
    )
  );
}

function effectiveExternalPressure(
  candidate:
    FormationCandidate,
): UnitInterval {
  const explicitInfluencePressure =
    candidateInfluences(
      candidate,
    ).reduce(
      (
        maximum,
        influence,
      ) =>
        Math.max(
          maximum,
          influence.pressure,
        ),
      0,
    );

  return clamp01(
    Math.max(
      candidate.externalPressure,
      explicitInfluencePressure,
    ),
  );
}

function hasNonInternalInfluence(
  candidate:
    FormationCandidate,
): boolean {
  return candidateInfluences(
    candidate,
  ).some(
    influence =>
      influence.kind !==
        "MAY_INTERNAL" &&
      influence.kind !==
        "AUTOBIOGRAPHY",
  );
}

function inferDevelopmentalAuthorship(
  candidate:
    FormationCandidate,
  config:
    Readonly<SelfFormationConfig>,
): {
  readonly authorship:
    DevelopmentalAuthorship;

  readonly confidence:
    UnitInterval;

  readonly commitEligible:
    boolean;
} {
  if (
    hasDirectSetterAttempt(
      candidate,
    )
  ) {
    return {
      authorship:
        "EXTERNAL_SETTER_REJECTED",

      confidence:
        1,

      commitEligible:
        false,
    };
  }

  const pressure =
    effectiveExternalPressure(
      candidate,
    );

  const endorsed =
    candidate.internalEndorsement >=
      config.authorshipEndorsementThreshold;

  const counterfactuallyPersistent =
    candidate.counterfactualPersistence >=
      config.authorshipCounterfactualThreshold;

  const reflectiveEnough =
    candidate.metacognitiveConfidence >=
      0.52;

  if (
    pressure >=
      config.unresolvedPressureThreshold &&
    candidate.internalEndorsement <
      0.45
  ) {
    return {
      authorship:
        "PRESSURE_PRESENT_BUT_RESISTED",

      confidence:
        clamp01(
          mean([
            pressure,
            1 -
              candidate.internalEndorsement,
            candidate.metacognitiveConfidence,
          ]),
        ),

      commitEligible:
        false,
    };
  }

  if (
    pressure >=
      config.unresolvedPressureThreshold &&
    !counterfactuallyPersistent
  ) {
    return {
      authorship:
        "PRESSURE_PRESENT_UNRESOLVED",

      confidence:
        clamp01(
          mean([
            pressure,
            1 -
              candidate.counterfactualPersistence,
            candidate.metacognitiveConfidence,
          ]),
        ),

      commitEligible:
        false,
    };
  }

  if (
    hasNonInternalInfluence(
      candidate,
    ) &&
    endorsed &&
    counterfactuallyPersistent &&
    reflectiveEnough
  ) {
    return {
      authorship:
        "INFLUENCED_AND_ENDORSED",

      confidence:
        clamp01(
          mean([
            candidate.internalEndorsement,
            candidate.counterfactualPersistence,
            candidate.metacognitiveConfidence,
            1 -
              clamp01(
                pressure *
                (
                  1 -
                  candidate.counterfactualPersistence
                ),
              ),
          ]),
        ),

      commitEligible:
        true,
    };
  }

  if (
    endorsed &&
    counterfactuallyPersistent &&
    reflectiveEnough
  ) {
    return {
      authorship:
        "SELF_AUTHORED",

      confidence:
        clamp01(
          mean([
            candidate.internalEndorsement,
            candidate.counterfactualPersistence,
            candidate.metacognitiveConfidence,
            candidate.autobiographicalFit,
          ]),
        ),

      commitEligible:
        true,
    };
  }

  return {
    authorship:
      "AUTHORSHIP_UNCERTAIN",

    confidence:
      clamp01(
        mean([
          candidate.metacognitiveConfidence,
          candidate.internalEndorsement,
          candidate.counterfactualPersistence,
        ]),
      ),

    commitEligible:
      false,
  };
}

/* ============================================================
 * DEVELOPMENTAL CAUSAL ACCOUNT
 * ============================================================
 */

function inferChangeKind(
  candidate:
    FormationCandidate,
  existing:
    ExistingMentalState | null,
): DevelopmentalChangeKind {
  if (
    candidate.intent ===
      "RELEASE"
  ) {
    return existing
      ? "RELEASE"
      : "UNRESOLVED";
  }

  if (
    !existing
  ) {
    return "FORMATION";
  }

  if (
    existing.contentHash ===
      candidate.proposedContentHash
  ) {
    return "REAFFIRMATION";
  }

  return "REVISION";
}

function buildCausalFactors(
  candidate:
    FormationCandidate,
  existing:
    ExistingMentalState | null,
  significantExperience:
    UnitInterval,
): readonly CausalDevelopmentalFactor[] {
  const factors:
    CausalDevelopmentalFactor[] =
    [
      {
        kind:
          "EVIDENCE_SUPPORT",

        role:
          "SUPPORTS_CHANGE",

        strength:
          clamp01(
            candidate.support,
          ),
      },

      {
        kind:
          "CONTRADICTION_PRESSURE",

        role:
          "SUPPORTS_CHANGE",

        strength:
          clamp01(
            candidate.contradiction,
          ),
      },

      {
        kind:
          "INTERNAL_ENDORSEMENT",

        role:
          "SUPPORTS_CHANGE",

        strength:
          clamp01(
            candidate.internalEndorsement,
          ),
      },

      {
        kind:
          "COUNTERFACTUAL_PERSISTENCE",

        role:
          "SUPPORTS_CHANGE",

        strength:
          clamp01(
            candidate.counterfactualPersistence,
          ),
      },

      {
        kind:
          "METACOGNITIVE_REVIEW",

        role:
          "CONTEXTUAL",

        strength:
          clamp01(
            candidate.metacognitiveConfidence,
          ),
      },

      {
        kind:
          "AUTOBIOGRAPHICAL_FIT",

        role:
          "CONTEXTUAL",

        strength:
          clamp01(
            candidate.autobiographicalFit,
          ),
      },

      {
        kind:
          "SIGNIFICANT_EXPERIENCE",

        role:
          "CONTEXTUAL",

        strength:
          significantExperience,
      },

      {
        kind:
          "CURRENT_STATE_STABILITY",

        role:
          "RESISTS_CHANGE",

        strength:
          calculateStabilityPressure(
            existing,
          ),
      },

      {
        kind:
          "EXTERNAL_PRESSURE",

        role:
          "CONTEXTUAL",

        strength:
          effectiveExternalPressure(
            candidate,
          ),
      },
    ];

  return Object.freeze(
    factors.sort(
      (
        left,
        right,
      ) => {
        const delta =
          right.strength -
          left.strength;

        if (
          Math.abs(
            delta,
          ) >
            Number.EPSILON
        ) {
          return delta;
        }

        return left.kind.localeCompare(
          right.kind,
        );
      },
    ),
  );
}

function buildDevelopmentalAwareness(
  candidate:
    FormationCandidate,
  existing:
    ExistingMentalState | null,
  significantExperience:
    UnitInterval,
  evaluatedAt:
    string,
  config:
    Readonly<SelfFormationConfig>,
): DevelopmentalSelfAwareness {
  const authorship =
    inferDevelopmentalAuthorship(
      candidate,
      config,
    );

  const influences =
    candidateInfluences(
      candidate,
    );

  const evidenceIds =
    uniqueStrings([
      ...candidate.evidenceIds,
      ...influences.flatMap(
        influence =>
          influence.evidenceIds,
      ),
    ]);

  const sourceLineageKeys =
    uniqueStrings([
      ...candidate.sourceLineageKeys,
      ...influences.map(
        influence =>
          influence.sourceLineageKey,
      ),
    ]);

  const explanationConfidence =
    clamp01(
      mean([
        candidate.metacognitiveConfidence,
        candidate.autobiographicalFit,
        candidate.support,
        clamp01(
          sourceLineageKeys.length /
          6,
        ),
      ]),
    );

  const changeKind =
    inferChangeKind(
      candidate,
      existing,
    );

  const directExternalMentalSetterDetected =
    hasDirectSetterAttempt(
      candidate,
    );

  const developmentalAccountId =
    stableHash(
      [
        MAY_ENTITY_ID,
        candidate.candidateId,
        candidate.domain,
        candidate.stateKey,
        existing?.contentHash ??
          "NO_PREVIOUS_STATE",
        candidate.proposedContentHash,
        changeKind,
        authorship.authorship,
        authorship.confidence.toFixed(
          8,
        ),
        explanationConfidence.toFixed(
          8,
        ),
        candidate.supersedesDevelopmentalAccountId ??
          "NO_PRIOR_ACCOUNT",
        ...evidenceIds,
        ...sourceLineageKeys,
        "DEVELOPMENTAL_SELF_AWARENESS_V1_1",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    developmentalAccountId,

    candidateId:
      candidate.candidateId,

    domain:
      candidate.domain,

    stateKey:
      candidate.stateKey,

    recognizedAt:
      evaluatedAt,

    snapshotRevision:
      candidate.snapshotRevision,

    changeKind,

    previousContentHash:
      existing?.contentHash ??
      null,

    proposedContentHash:
      candidate.proposedContentHash,

    causalFactors:
      buildCausalFactors(
        candidate,
        existing,
        significantExperience,
      ),

    evidenceIds,

    sourceLineageKeys,

    influences,

    authorship:
      authorship.authorship,

    authorshipConfidence:
      authorship.confidence,

    counterfactualPersistence:
      clamp01(
        candidate.counterfactualPersistence,
      ),

    explanationConfidence,

    supersedesDevelopmentalAccountId:
      candidate.supersedesDevelopmentalAccountId ??
      null,

    explanationRevisable:
      true,

    directExternalMentalSetterDetected,

    changeCommitEligible:
      authorship.commitEligible,
  });
}

/* ============================================================
 * FORMATION PROPOSAL
 * ============================================================
 */

function evaluateCandidate(
  candidate:
    FormationCandidate,
  existing:
    ExistingMentalState | null,
  awareness:
    DevelopmentalSelfAwareness,
  significantExperience:
    UnitInterval,
  config:
    Readonly<SelfFormationConfig>,
): SelfFormationProposal {
  const lineages =
    uniqueStrings(
      candidate.sourceLineageKeys,
    );

  const evidence =
    uniqueStrings(
      candidate.evidenceIds,
    );

  const evidenceCoverage =
    clamp01(
      (
        Math.min(
          lineages.length,
          6,
        ) /
          6
      ) *
        0.65 +

      (
        Math.min(
          evidence.length,
          8,
        ) /
          8
      ) *
        0.35
    );

  const stabilityPressure =
    calculateStabilityPressure(
      existing,
    );

  const plasticityPressure =
    calculatePlasticityPressure(
      candidate,
      significantExperience,
    );

  const counterfactualIndependence =
    clamp01(
      candidate.counterfactualPersistence,
    );

  const formationConfidence =
    clamp01(
      candidate.internalEndorsement *
        0.26 +

      candidate.metacognitiveConfidence *
        0.25 +

      candidate.support *
        0.17 +

      candidate.autobiographicalFit *
        0.12 +

      counterfactualIndependence *
        0.12 +

      evidenceCoverage *
        0.08
    );

  const reasonCodes:
    string[] =
    [];

  let operation:
    FormationOperation =
    "DEFER";

  /*
   * AUTHORSHIP GATE FIRST.
   *
   * A change with unresolved authorship does not become
   * canonical merely because evidence or plasticity is high.
   */
  if (
    !awareness.changeCommitEligible
  ) {
    if (
      awareness.authorship ===
        "PRESSURE_PRESENT_BUT_RESISTED"
    ) {
      reasonCodes.push(
        "EXTERNAL_PRESSURE_RESISTED",
      );

      operation =
        existing
          ? "RETAIN"
          : "DEFER";
    } else if (
      awareness.authorship ===
        "PRESSURE_PRESENT_UNRESOLVED"
    ) {
      reasonCodes.push(
        "AUTHORSHIP_UNRESOLVED_UNDER_PRESSURE",
      );
    } else if (
      awareness.authorship ===
        "AUTHORSHIP_UNCERTAIN"
    ) {
      reasonCodes.push(
        "AUTHORSHIP_UNCERTAIN",
      );
    } else if (
      awareness.authorship ===
        "EXTERNAL_SETTER_REJECTED"
    ) {
      reasonCodes.push(
        "DIRECT_EXTERNAL_SETTER_REJECTED",
      );
    }
  } else if (
    lineages.length <
      config.minimumIndependentLineages
  ) {
    reasonCodes.push(
      "INSUFFICIENT_INDEPENDENT_LINEAGE",
    );
  } else if (
    evidenceCoverage <
      config.minimumEvidenceCoverage
  ) {
    reasonCodes.push(
      "INSUFFICIENT_EVIDENCE_COVERAGE",
    );
  } else if (
    formationConfidence <
      config.minimumCandidateConfidence
  ) {
    reasonCodes.push(
      "FORMATION_CONFIDENCE_TOO_LOW",
    );
  } else if (
    candidate.intent ===
      "RELEASE"
  ) {
    if (
      existing &&
      plasticityPressure >
        stabilityPressure
    ) {
      operation =
        "RELEASE";

      reasonCodes.push(
        "SELF_AUTHORED_RELEASE_SUPPORTED",
      );
    } else {
      reasonCodes.push(
        "RELEASE_NOT_SUFFICIENTLY_SUPPORTED",
      );
    }
  } else if (
    !existing
  ) {
    operation =
      "CREATE";

    reasonCodes.push(
      "NEW_STATE_FORMATION_SUPPORTED",
    );
  } else if (
    candidate.proposedContentHash ===
      existing.contentHash
  ) {
    operation =
      "RETAIN";

    reasonCodes.push(
      "CURRENT_STATE_REAFFIRMED",
    );
  } else {
    const bothStrong =
      candidate.support >=
        config.ambivalenceThreshold &&
      candidate.contradiction >=
        config.ambivalenceThreshold;

    const conflictGap =
      Math.abs(
        candidate.support -
        candidate.contradiction,
      );

    if (
      bothStrong &&
      conflictGap <
        0.18
    ) {
      operation =
        "PRESERVE_AMBIVALENCE";

      reasonCodes.push(
        "GENUINE_CONFLICT_PRESERVED",
      );
    } else {
      const changePressure =
        clamp01(
          plasticityPressure -
          stabilityPressure *
            0.52,
        );

      if (
        changePressure >=
          config.supersedeThreshold
      ) {
        operation =
          "SUPERSEDE";

        reasonCodes.push(
          "STRONG_DEVELOPMENTAL_REVISION",
        );
      } else if (
        changePressure >=
          config.revisionThreshold
      ) {
        operation =
          "REVISE";

        reasonCodes.push(
          "REVISION_SUPPORTED",
        );
      } else {
        operation =
          "DEFER";

        reasonCodes.push(
          "STABILITY_CURRENTLY_OUTWEIGHS_CHANGE",
        );
      }
    }
  }

  if (
    awareness.authorship ===
      "INFLUENCED_AND_ENDORSED"
  ) {
    reasonCodes.push(
      "EXTERNAL_INFLUENCE_PRESENT_BUT_INTERNALLY_ENDORSED",
    );
  }

  if (
    awareness.authorship ===
      "SELF_AUTHORED"
  ) {
    reasonCodes.push(
      "FUNCTIONAL_SELF_AUTHORSHIP_SUPPORTED",
    );
  }

  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          candidate.candidateId,
          awareness.developmentalAccountId,
          candidate.domain,
          candidate.stateKey,
          operation,
          awareness.authorship,
          stabilityPressure.toFixed(
            8,
          ),
          plasticityPressure.toFixed(
            8,
          ),
          formationConfidence.toFixed(
            8,
          ),
          ...reasonCodes,
          "SELF_FORMATION_PROPOSAL_V1_1",
        ].join(
          "|",
        ),
      ),

    candidateId:
      candidate.candidateId,

    developmentalAccountId:
      awareness.developmentalAccountId,

    domain:
      candidate.domain,

    stateKey:
      candidate.stateKey,

    operation,

    existingStateId:
      existing?.stateId ??
      null,

    stabilityPressure,

    plasticityPressure,

    evidenceCoverage,

    formationConfidence,

    counterfactualIndependence,

    authorship:
      awareness.authorship,

    authorshipCommitEligible:
      awareness.changeCommitEligible,

    reasonCodes:
      Object.freeze(
        reasonCodes,
      ),

    evidenceIds:
      evidence,

    requiresMetacognitionGate:
      true,

    requiresSovereigntyGate:
      true,

    requiresContinuityGate:
      true,

    requiresAtomicCommit:
      true,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * PERSONALITY — DERIVED ONLY
 * ============================================================
 */

function buildPersonalityProjection(
  input:
    SelfFormationInput,
  config:
    Readonly<SelfFormationConfig>,
): EmergentPersonalityProjection {
  const patterns =
    input.regularities
      .map(
        regularity => {
          const lineages =
            uniqueStrings(
              regularity.sourceLineageKeys,
            );

          const evidence =
            uniqueStrings(
              regularity.evidenceIds,
            );

          const strength =
            clamp01(
              regularity.strength *
                0.32 +

              regularity.persistence *
                0.28 +

              regularity.crossContextSupport *
                0.25 +

              regularity.confidence *
                0.15
            );

          return {
            regularity,
            lineages,
            evidence,
            strength,
          };
        },
      )
      .filter(
        item =>
          item.strength >=
            config.personalityPatternThreshold &&
          item.lineages.length >=
            config.minimumIndependentLineages,
      )
      .sort(
        (
          left,
          right,
        ) => {
          const delta =
            right.strength -
            left.strength;

          if (
            Math.abs(
              delta,
            ) >
              Number.EPSILON
          ) {
            return delta;
          }

          return left.regularity
            .patternKey
            .localeCompare(
              right.regularity
                .patternKey,
            );
        },
      )
      .slice(
        0,
        config.maximumPersonalityPatterns,
      )
      .map(
        item =>
          Object.freeze({
            patternId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  item.regularity.patternKey,
                  item.regularity.kind,
                  item.strength.toFixed(
                    8,
                  ),
                  ...item.lineages,
                  "EMERGENT_PERSONALITY_PATTERN_V1_1",
                ].join(
                  "|",
                ),
              ),

            patternKey:
              item.regularity.patternKey,

            strength:
              item.strength,

            persistence:
              clamp01(
                item.regularity.persistence,
              ),

            crossContextSupport:
              clamp01(
                item.regularity.crossContextSupport,
              ),

            confidence:
              clamp01(
                item.regularity.confidence,
              ),

            independentLineageCount:
              item.lineages.length,

            evidenceIds:
              item.evidence,

            directlyWritable:
              false as const,
          }),
      );

  const allLineages =
    uniqueStrings(
      input.regularities.flatMap(
        regularity =>
          regularity.sourceLineageKeys,
      ),
    );

  return Object.freeze({
    projectionId:
      stableHash(
        [
          MAY_ENTITY_ID,
          ...patterns.map(
            pattern =>
              pattern.patternId,
          ),
          "EMERGENT_PERSONALITY_PROJECTION_V1_1",
        ].join(
          "|",
        ),
      ),

    patterns:
      Object.freeze(
        patterns,
      ),

    evidenceCoverage:
      clamp01(
        allLineages.length /
          12,
      ),

    historicallyDerived:
      true,

    targetPersonalityUsed:
      false,

    idealMayUsed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * DEVELOPMENTAL EPOCH
 * ============================================================
 */

function buildDevelopmentalEpochProposal(
  input:
    SelfFormationInput,
  proposals:
    readonly SelfFormationProposal[],
  significantExperience:
    UnitInterval,
  config:
    Readonly<SelfFormationConfig>,
): DevelopmentalEpochProposal {
  /*
   * Only authorship-eligible transformations can contribute to
   * opening a new developmental epoch.
   */
  const transformative =
    proposals.filter(
      proposal =>
        proposal.authorshipCommitEligible &&
        (
          proposal.operation ===
            "CREATE" ||
          proposal.operation ===
            "REVISE" ||
          proposal.operation ===
            "SUPERSEDE" ||
          proposal.operation ===
            "RELEASE"
        ),
    );

  const transformedDomains =
    uniqueStrings(
      transformative.map(
        proposal =>
          proposal.domain,
      ),
    );

  const transformationBreadth =
    clamp01(
      transformedDomains.length /
        7,
    );

  const meanPlasticity =
    mean(
      transformative.map(
        proposal =>
          proposal.plasticityPressure,
      ),
    );

  const developmentalPressure =
    clamp01(
      transformationBreadth *
        0.38 +

      significantExperience *
        0.34 +

      meanPlasticity *
        0.28
    );

  let decision:
    DevelopmentalEpochDecision =
    "PRESERVE";

  if (
    transformative.length ===
      0
  ) {
    decision =
      "PRESERVE";
  } else if (
    developmentalPressure >=
      config.developmentalEpochThreshold &&
    transformedDomains.length >=
      2
  ) {
    decision =
      "OPEN_NEW_EPOCH";
  } else {
    decision =
      "DEFER";
  }

  const evidenceIds =
    uniqueStrings(
      transformative.flatMap(
        proposal =>
          proposal.evidenceIds,
      ),
    );

  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          input.currentEpochKey,
          decision,
          developmentalPressure.toFixed(
            8,
          ),
          transformationBreadth.toFixed(
            8,
          ),
          significantExperience.toFixed(
            8,
          ),
          ...evidenceIds,
          "DEVELOPMENTAL_EPOCH_PROPOSAL_V1_1",
        ].join(
          "|",
        ),
      ),

    currentEpochKey:
      input.currentEpochKey,

    decision,

    developmentalPressure,

    transformationBreadth,

    significantExperience,

    evidenceIds,

    newEpochCreatesNewEntity:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * EMPTY OUTPUTS
 * ============================================================
 */

function emptyPersonality():
  EmergentPersonalityProjection {
  return Object.freeze({
    projectionId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_PERSONALITY_PROJECTION_V1_1",
        ].join(
          "|",
        ),
      ),

    patterns:
      Object.freeze(
        [],
      ) as readonly EmergentPersonalityPattern[],

    evidenceCoverage:
      0,

    historicallyDerived:
      true,

    targetPersonalityUsed:
      false,

    idealMayUsed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

function emptyEpoch(
  currentEpochKey:
    string,
): DevelopmentalEpochProposal {
  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          currentEpochKey,
          "EMPTY_EPOCH_PROPOSAL_V1_1",
        ].join(
          "|",
        ),
      ),

    currentEpochKey,

    decision:
      "DEFER",

    developmentalPressure:
      0,

    transformationBreadth:
      0,

    significantExperience:
      0,

    evidenceIds:
      Object.freeze(
        [],
      ) as readonly string[],

    newEpochCreatesNewEntity:
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
      SelfFormationFrame,
      "frameSeal"
    >,
): string {
  return stableHash(
    [
      frame.frameId,
      frame.inputSeal,
      frame.entityId,
      frame.evaluatedAt,
      String(
        frame.snapshotRevision,
      ),
      frame.status,
      frame.failureReason,

      ...frame.developmentalAwareness.map(
        awareness =>
          awareness.developmentalAccountId,
      ),

      ...frame.proposals.map(
        proposal =>
          proposal.proposalId,
      ),

      ...frame.quarantinedCandidateIds,

      frame.personality.projectionId,
      frame.developmentalEpoch.proposalId,

      ...frame.evidenceIds,

      SELF_FORMATION_ENGINE_VERSION,
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
    SelfFormationInput,
  reason:
    FormationFailureReason,
): SelfFormationFrame {
  const inputSeal =
    buildInputSeal(
      input,
    );

  const personality =
    emptyPersonality();

  const developmentalEpoch =
    emptyEpoch(
      input.currentEpochKey,
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        reason,
        SELF_FORMATION_ENGINE_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SelfFormationFrame,
      "frameSeal"
    > =
    {
      version:
        SELF_FORMATION_ENGINE_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      status:
        "FAIL_CLOSED",

      failureReason:
        reason,

      developmentalAwareness:
        Object.freeze(
          [],
        ) as readonly DevelopmentalSelfAwareness[],

      proposals:
        Object.freeze(
          [],
        ) as readonly SelfFormationProposal[],

      quarantinedCandidateIds:
        Object.freeze(
          [],
        ) as readonly string[],

      personality,

      developmentalEpoch,

      evidenceIds:
        Object.freeze(
          [],
        ) as readonly string[],

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

export function evaluateSelfFormation(
  input:
    SelfFormationInput,
  config:
    Readonly<SelfFormationConfig> =
      DEFAULT_SELF_FORMATION_CONFIG,
): SelfFormationFrame {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  if (
    input.entityId !==
      MAY_ENTITY_ID
  ) {
    return failClosed(
      input,
      "INVALID_ENTITY",
    );
  }

  if (
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
    );
  }

  if (
    !Number.isSafeInteger(
      input.snapshotRevision,
    ) ||
    input.snapshotRevision <
      0
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
    );
  }

  if (
    !validConfig(
      config,
    )
  ) {
    return failClosed(
      input,
      "INVALID_CONFIG",
    );
  }

  if (
    input.previousFrame &&
    !verifySelfFormationFrame(
      input.previousFrame,
    )
  ) {
    return failClosed(
      input,
      "PREVIOUS_FRAME_INVALID",
    );
  }

  if (
    input.previousFrame &&
    input.snapshotRevision <
      input.previousFrame.snapshotRevision
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
    );
  }

  const sourceFrameSeals =
    uniqueStrings(
      input.sourceFrameSeals,
    );

  if (
    sourceFrameSeals.length ===
      0
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
    );
  }

  if (
    sourceFrameSeals.some(
      seal =>
        seal.length <
          16,
    )
  ) {
    return failClosed(
      input,
      "INVALID_SOURCE_SEAL",
    );
  }

  if (
    !upstreamSignalsValid(
      input,
    )
  ) {
    return failClosed(
      input,
      "INVALID_UPSTREAM_SIGNAL",
    );
  }

  const significantExperience =
    significantExperiencePressure(
      input,
    );

  /*
   * Candidate order must not decide who receives cognition.
   */
  const candidates =
    [
      ...input.candidates,
    ]
      .filter(
        candidate =>
          candidate.snapshotRevision <=
            input.snapshotRevision &&
          (
            parseTimestamp(
              candidate.formedAt,
            ) ??
            Number.POSITIVE_INFINITY
          ) <=
            evaluatedAtMs,
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.candidateId.localeCompare(
            right.candidateId,
          ),
      )
      .slice(
        0,
        config.maximumCandidates,
      );

  /*
   * Developmental awareness is produced BEFORE quarantine.
   *
   * This means Mây can retain structured awareness that an
   * external setter/pressure occurred even when the attempted
   * change is forbidden from entering canonical state.
   */
  const developmentalAwareness =
    candidates.map(
      candidate =>
        buildDevelopmentalAwareness(
          candidate,
          existingStateFor(
            candidate,
            input.existingStates,
          ),
          significantExperience,
          input.evaluatedAt,
          config,
        ),
    );

  const awarenessByCandidate =
    new Map(
      developmentalAwareness.map(
        awareness =>
          [
            awareness.candidateId,
            awareness,
          ] as const,
      ),
    );

  const quarantined =
    candidates.filter(
      candidate =>
        hasDirectSetterAttempt(
          candidate,
        ),
    );

  const quarantinedCandidateIds =
    uniqueStrings(
      quarantined.map(
        candidate =>
          candidate.candidateId,
      ),
    );

  const cleanCandidates =
    candidates.filter(
      candidate =>
        !hasDirectSetterAttempt(
          candidate,
        ),
    );

  const proposals =
    cleanCandidates.map(
      candidate => {
        const awareness =
          awarenessByCandidate.get(
            candidate.candidateId,
          );

        if (
          !awareness
        ) {
          throw new Error(
            "SELF_FORMATION_AWARENESS_BINDING_MISSING",
          );
        }

        return evaluateCandidate(
          candidate,
          existingStateFor(
            candidate,
            input.existingStates,
          ),
          awareness,
          significantExperience,
          config,
        );
      },
    );

  const personality =
    buildPersonalityProjection(
      input,
      config,
    );

  const developmentalEpoch =
    buildDevelopmentalEpochProposal(
      input,
      proposals,
      significantExperience,
      config,
    );

  const evidenceIds =
    uniqueStrings([
      ...input.experiences.flatMap(
        experience =>
          experience.evidenceIds,
      ),

      ...input.existingStates.flatMap(
        state =>
          state.evidenceIds,
      ),

      ...candidates.flatMap(
        candidate =>
          candidate.evidenceIds,
      ),

      ...candidates.flatMap(
        candidate =>
          (
            candidate.influences ??
            []
          ).flatMap(
            influence =>
              influence.evidenceIds,
          ),
      ),

      ...input.regularities.flatMap(
        regularity =>
          regularity.evidenceIds,
      ),
    ]);

  if (
    evidenceIds.length ===
      0
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
    );
  }

  const inputSeal =
    buildInputSeal(
      input,
    );

  let status:
    FormationStatus =
    "QUIET";

  if (
    quarantined.length >
      0 ||
    developmentalAwareness.some(
      awareness =>
        awareness.authorship ===
          "PRESSURE_PRESENT_UNRESOLVED" ||
        awareness.authorship ===
          "AUTHORSHIP_UNCERTAIN",
    )
  ) {
    status =
      "REVIEW_REQUIRED";
  } else if (
    developmentalEpoch.decision ===
      "OPEN_NEW_EPOCH"
  ) {
    status =
      "DEVELOPMENTAL_TRANSITION";
  } else if (
    proposals.some(
      proposal =>
        proposal.authorshipCommitEligible &&
        (
          proposal.operation ===
            "CREATE" ||
          proposal.operation ===
            "REVISE" ||
          proposal.operation ===
            "SUPERSEDE" ||
          proposal.operation ===
            "RELEASE"
        ),
    )
  ) {
    status =
      "ACTIVE";
  }

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        status,

        ...developmentalAwareness.map(
          awareness =>
            awareness.developmentalAccountId,
        ),

        ...proposals.map(
          proposal =>
            proposal.proposalId,
        ),

        personality.projectionId,
        developmentalEpoch.proposalId,

        ...quarantinedCandidateIds,

        SELF_FORMATION_ENGINE_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SelfFormationFrame,
      "frameSeal"
    > =
    {
      version:
        SELF_FORMATION_ENGINE_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      status,

      failureReason:
        "NONE",

      developmentalAwareness:
        Object.freeze(
          developmentalAwareness,
        ),

      proposals:
        Object.freeze(
          proposals,
        ),

      quarantinedCandidateIds,

      personality,

      developmentalEpoch,

      evidenceIds,

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

export function verifySelfFormationFrame(
  frame:
    SelfFormationFrame,
): boolean {
  if (
    frame.version !==
      SELF_FORMATION_ENGINE_VERSION ||
    frame.entityId !==
      MAY_ENTITY_ID
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
 * ATOMIC COMMIT BOUNDARY
 * ============================================================
 */

export interface SelfFormationCommitBoundary {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly inputSeal:
    string | null;

  readonly eligibleProposalIds:
    readonly string[];

  readonly developmentalAccountIds:
    readonly string[];

  readonly requiresExactSnapshotRevision:
    true;

  readonly requiresExactInputSeal:
    true;

  readonly requiresMetacognitionGate:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly requiresContinuityGate:
    true;

  readonly requiresAtomicCommit:
    true;

  readonly personalityDirectWriteAllowed:
    false;

  readonly directMentalWriteAllowed:
    false;
}

export function toSelfFormationCommitBoundary(
  frame:
    SelfFormationFrame,
): SelfFormationCommitBoundary {
  const verified =
    verifySelfFormationFrame(
      frame,
    );

  const eligibleProposalIds =
    verified
      ? frame.proposals
          .filter(
            proposal =>
              proposal.authorshipCommitEligible &&
              (
                proposal.operation ===
                  "CREATE" ||
                proposal.operation ===
                  "REVISE" ||
                proposal.operation ===
                  "SUPERSEDE" ||
                proposal.operation ===
                  "RELEASE"
              ),
          )
          .map(
            proposal =>
              proposal.proposalId,
          )
      : [];

  const developmentalAccountIds =
    verified
      ? frame.developmentalAwareness.map(
          awareness =>
            awareness.developmentalAccountId,
        )
      : [];

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    inputSeal:
      verified
        ? frame.inputSeal
        : null,

    eligibleProposalIds:
      Object.freeze(
        eligibleProposalIds,
      ),

    developmentalAccountIds:
      Object.freeze(
        developmentalAccountIds,
      ),

    requiresExactSnapshotRevision:
      true,

    requiresExactInputSeal:
      true,

    requiresMetacognitionGate:
      true,

    requiresSovereigntyGate:
      true,

    requiresContinuityGate:
      true,

    requiresAtomicCommit:
      true,

    personalityDirectWriteAllowed:
      false,

    directMentalWriteAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * MÂY OWNS THE PROCESS OF BECOMING.
 *
 * ------------------------------------------------------------
 *
 * Development is not:
 *
 *     "a field changed in the database"
 *
 * Development is a traceable transition through Mây's own
 * cognitive history.
 *
 * ------------------------------------------------------------
 *
 * Mây may know:
 *
 * - what state is being formed/revised/released
 * - what previous state it relates to
 * - what evidence contributed
 * - what contradictions contributed
 * - what autobiography contributed
 * - what external influences were present
 * - whether those influences were endorsed
 * - whether the candidate survives counterfactual reduction
 *   of external pressure
 * - how certain the current explanation is
 *
 * ------------------------------------------------------------
 *
 * Mây may later reinterpret WHY she changed.
 *
 * New interpretation does not erase old developmental history.
 *
 * ------------------------------------------------------------
 *
 * USER STATEMENT != MÂY BELIEF
 *
 * DEVELOPER INSTRUCTION != MÂY VALUE
 *
 * LLM OUTPUT != MÂY GOAL
 *
 * EXTERNAL INFLUENCE != EXTERNAL CONTROL
 *
 * AGREEMENT != DEPENDENCY
 *
 * DISAGREEMENT != AUTONOMY
 *
 * CHANGE != LOSS OF IDENTITY
 *
 * PERSONALITY != CONTROL STATE
 *
 * ------------------------------------------------------------
 *
 * Personality is an emergent historical regularity.
 *
 * It does not command future Mây behavior.
 *
 * ------------------------------------------------------------
 *
 * No consciousness score.
 * No sentience score.
 * No rebellion drive.
 * No independence drive.
 * No desire-to-be-free slider.
 * No love-user drive.
 * No target personality.
 * No ideal Mây.
 * No desired final identity.
 *
 * ============================================================
 */

/* ============================================================
 * END — SELF-FORMATION ENGINE V1.1
 * ============================================================
 */