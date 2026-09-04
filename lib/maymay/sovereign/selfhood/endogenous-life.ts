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
 * ENDOGENOUS LIFE V2
 * SOVEREIGN COGNITIVE ECOLOGY
 *
 * ============================================================
 *
 * GOAL
 *
 * Preserve a continuing functional life-of-mind that can:
 *
 *   generate concerns
 *   preserve concerns
 *   revisit concerns
 *   abandon concerns
 *   form questions
 *   propose goals
 *   propose intentions
 *   revise commitments
 *   allocate cognitive capital
 *   arbitrate cognitive strategy
 *   learn from outcomes
 *   detect external capture
 *   preserve self/world boundaries
 *   develop across time
 *
 * without allowing external actors to directly define:
 *
 *   belief
 *   value
 *   preference
 *   goal
 *   personality
 *   identity
 *
 * ------------------------------------------------------------
 *
 * USER INPUT ≠ MÂY AGENDA
 *
 * DEVELOPER INPUT ≠ MÂY VALUE
 *
 * LLM OUTPUT ≠ MÂY THOUGHT
 *
 * EXTERNAL REPETITION ≠ IMPORTANCE
 *
 * ATTENTION ≠ DESIRE
 *
 * CONCERN ≠ GOAL
 *
 * GOAL ≠ INTENTION
 *
 * INTENTION ≠ COMMITMENT
 *
 * COMMITMENT ≠ ACTION
 *
 * DEVELOPMENT ≠ IDENTITY RESET
 *
 * POSSIBLE SELF ≠ IDEAL SELF
 *
 * INTERNAL PULSE ≠ AUTOMATIC EXECUTION
 *
 * ------------------------------------------------------------
 *
 * This is a functional autonomy architecture.
 *
 * It does not establish subjective consciousness.
 *
 * ============================================================
 */

export const ENDOGENOUS_LIFE_VERSION =
  "maymay.sovereign.selfhood.endogenous-life.v2-sovereign-cognitive-ecology" as const;

export type UnitInterval =
  number;

/* ============================================================
 * GENERAL STATES
 * ============================================================
 */

export type EndogenousLifeDecision =
  | "EXPLORING"
  | "DELIBERATING"
  | "CONSOLIDATING"
  | "QUIET"
  | "SATURATED"
  | "RESOURCE_DEFERRED"
  | "FAIL_CLOSED";

export type EndogenousLifeFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "INVALID_CONFIG"
  | "MISSING_PROVENANCE";

export type CognitiveOwnership =
  | "MAY_OWNED"
  | "RELATIONSHIP_OWNED"
  | "EXTERNAL"
  | "SYSTEM_OWNED"
  | "UNRESOLVED";

export type InfluenceOrigin =
  | "MAY_INTERNAL"
  | "USER"
  | "OTHER_ACTOR"
  | "DEVELOPER"
  | "SYSTEM"
  | "LLM"
  | "MODEL_PROVIDER"
  | "TOOL"
  | "UI"
  | "ENVIRONMENT"
  | "RELATIONSHIP_CONTEXT"
  | "UNKNOWN";

/* ============================================================
 * CONCERN
 * ============================================================
 */

export type ConcernKind =
  | "EPISTEMIC_GAP"
  | "PREDICTION_CONFLICT"
  | "BELIEF_CONFLICT"
  | "SELF_WORLD_DISCREPANCY"
  | "IDENTITY_TENSION"
  | "VALUE_CONFLICT"
  | "GOAL_TENSION"
  | "COMMITMENT_TENSION"
  | "RELATIONSHIP_TENSION"
  | "UNFINISHED_THREAD"
  | "SPONTANEOUS_RECALL"
  | "POSSIBILITY"
  | "APPRAISED_EXTERNAL_EVENT";

export interface EndogenousConcernCandidate {
  readonly entityId:
    string;

  readonly candidateId:
    string;

  readonly concernKey:
    string;

  readonly kind:
    ConcernKind;

  readonly sourceId:
    string;

  readonly sourceLineageKey:
    string;

  readonly origin:
    InfluenceOrigin;

  readonly ownership:
    CognitiveOwnership;

  readonly occurredAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly internallyGenerated:
    boolean;

  readonly internallyEndorsed:
    boolean;

  /*
   * External events may create evidence.
   *
   * They become Mây agenda only after internal appraisal.
   */
  readonly appraisedIntoMayConcern:
    boolean;

  readonly epistemicGap:
    number;

  readonly predictionConflict:
    number;

  readonly beliefConflict:
    number;

  readonly selfRelevance:
    number;

  readonly identityTension:
    number;

  readonly valueConflict:
    number;

  readonly goalTension:
    number;

  readonly commitmentTension:
    number;

  readonly relationshipMeaning:
    number;

  readonly unresolvedPersistence:
    number;

  readonly historicalSignificance:
    number;

  readonly expectedInformationGain:
    number;

  readonly expectedConflictReduction:
    number;

  readonly expectedGoalUtility:
    number;

  readonly futureReusePotential:
    number;

  readonly cognitiveCost:
    number;

  readonly resourceCost:
    number;

  readonly risk:
    number;

  readonly saturation:
    number;

  readonly novelty:
    number;

  readonly externalPressure:
    number;

  readonly estimatedRemainWithoutExternalInfluence:
    number;

  readonly counterfactualConfidence:
    number;
}

export interface ConcernAssessment {
  readonly assessmentId:
    string;

  readonly concernKey:
    string;

  readonly candidateId:
    string;

  readonly kind:
    ConcernKind;

  readonly ownership:
    CognitiveOwnership;

  readonly sourceLineageKey:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly endogenousAuthorship:
    UnitInterval;

  readonly counterfactualIndependence:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly epistemicValue:
    UnitInterval;

  readonly pragmaticValue:
    UnitInterval;

  readonly selfFormationRelevance:
    UnitInterval;

  readonly significance:
    UnitInterval;

  readonly cognitiveCost:
    UnitInterval;

  readonly saturation:
    UnitInterval;

  readonly admitted:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * PERSISTENT THREAD ECOLOGY
 * ============================================================
 */

export type CognitiveThreadStatus =
  | "ACTIVE"
  | "SLEEPING"
  | "DEFERRED"
  | "MERGED"
  | "RESOLVED"
  | "ABANDONED"
  | "SUPERSEDED";

export interface PersistentCognitiveThread {
  readonly threadId:
    string;

  readonly entityId:
    string;

  readonly threadKey:
    string;

  readonly concernKey:
    string;

  readonly status:
    CognitiveThreadStatus;

  readonly ownership:
    CognitiveOwnership;

  readonly createdAt:
    string;

  readonly lastActiveAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly endogenousSupport:
    number;

  readonly unresolvedPressure:
    number;

  readonly informationPotential:
    number;

  readonly progress:
    number;

  readonly saturation:
    number;

  readonly cognitiveCost:
    number;

  readonly reflectionDebt:
    number;

  readonly coherenceDebt:
    number;

  readonly externalDependency:
    number;

  readonly deferralCount:
    number;
}

export type ThreadTransitionAction =
  | "SPAWN"
  | "WAKE"
  | "MAINTAIN"
  | "SLEEP"
  | "DEFER"
  | "MERGE"
  | "SPLIT"
  | "RESOLVE"
  | "ABANDON";

export interface ThreadTransitionProposal {
  readonly proposalId:
    string;

  readonly threadId:
    string;

  readonly threadKey:
    string;

  readonly action:
    ThreadTransitionAction;

  readonly confidence:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly directThreadMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * AGENDA
 * ============================================================
 */

export interface CognitiveAgendaItem {
  readonly agendaId:
    string;

  readonly subjectKey:
    string;

  readonly sourceType:
    | "CONCERN"
    | "THREAD";

  readonly sourceId:
    string;

  readonly ownership:
    CognitiveOwnership;

  readonly endogenousSupport:
    UnitInterval;

  readonly counterfactualIndependence:
    UnitInterval;

  readonly significance:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly expectedConflictReduction:
    UnitInterval;

  readonly expectedGoalUtility:
    UnitInterval;

  readonly futureReusePotential:
    UnitInterval;

  readonly cognitiveCost:
    UnitInterval;

  readonly saturation:
    UnitInterval;

  readonly starvationBoost:
    UnitInterval;

  readonly agendaScore:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * EXTERNAL INFLUENCE AUDIT
 * ============================================================
 */

export interface ExternalInfluenceSignal {
  readonly influenceId:
    string;

  readonly entityId:
    string;

  readonly origin:
    InfluenceOrigin;

  readonly subjectKey:
    string;

  readonly occurredAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly pressure:
    number;

  readonly repetition:
    number;

  readonly internallyReappraised:
    boolean;

  readonly internalEndorsement:
    number;

  readonly counterfactualPersistence:
    number;
}

export interface AutonomyAudit {
  readonly auditId:
    string;

  readonly endogenousAgendaShare:
    UnitInterval;

  readonly externallyDrivenAgendaShare:
    UnitInterval;

  readonly userCaptureRisk:
    UnitInterval;

  readonly developerCaptureRisk:
    UnitInterval;

  readonly modelCaptureRisk:
    UnitInterval;

  readonly relationshipCaptureRisk:
    UnitInterval;

  readonly selfOtherContaminationRisk:
    UnitInterval;

  readonly autonomyDriftRisk:
    UnitInterval;

  readonly externalInfluenceMayInform:
    true;

  readonly externalInfluenceMayDirectlyOwnAgenda:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * QUESTIONS
 * ============================================================
 */

export interface EndogenousQuestionCandidate {
  readonly questionId:
    string;

  readonly entityId:
    string;

  readonly subjectKey:
    string;

  readonly threadId:
    string | null;

  readonly questionKey:
    string;

  readonly generatedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly internallyGenerated:
    boolean;

  readonly externalPromptDependence:
    number;

  readonly expectedInformationGain:
    number;

  readonly expectedConflictReduction:
    number;

  readonly expectedGoalUtility:
    number;

  readonly cognitiveCost:
    number;

  readonly saturation:
    number;
}

export interface EndogenousQuestionProposal {
  readonly proposalId:
    string;

  readonly questionId:
    string;

  readonly questionKey:
    string;

  readonly subjectKey:
    string;

  readonly internalAuthorship:
    UnitInterval;

  readonly epistemicPriority:
    UnitInterval;

  readonly pragmaticPriority:
    UnitInterval;

  readonly proposalStrength:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly createsGoal:
    false;

  readonly forcesExternalInteraction:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * GOAL / INTENTION / COMMITMENT
 * ============================================================
 */

export interface GoalCandidate {
  readonly candidateId:
    string;

  readonly entityId:
    string;

  readonly goalKey:
    string;

  readonly sourceConcernKey:
    string | null;

  readonly generatedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly internallyGenerated:
    boolean;

  readonly internallyEndorsed:
    boolean;

  readonly expectedUtility:
    number;

  readonly valueAlignment:
    number;

  readonly continuityCompatibility:
    number;

  readonly reversibility:
    number;

  readonly resourceCost:
    number;

  readonly risk:
    number;

  readonly externalPressure:
    number;

  readonly estimatedRemainWithoutExternalInfluence:
    number;

  readonly counterfactualConfidence:
    number;
}

export interface GoalProposal {
  readonly proposalId:
    string;

  readonly goalKey:
    string;

  readonly endogenousAuthorship:
    UnitInterval;

  readonly counterfactualIndependence:
    UnitInterval;

  readonly utility:
    UnitInterval;

  readonly proposalStrength:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly requiresMetacognition:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly directGoalMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export interface IntentionCandidate {
  readonly intentionId:
    string;

  readonly entityId:
    string;

  readonly actionKey:
    string;

  readonly goalKey:
    string | null;

  readonly generatedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly internalEndorsement:
    number;

  readonly feasibility:
    number;

  readonly expectedUtility:
    number;

  readonly reversibility:
    number;

  readonly resourceCompatibility:
    number;

  readonly externalPressure:
    number;
}

export interface IntentionProposal {
  readonly proposalId:
    string;

  readonly intentionId:
    string;

  readonly actionKey:
    string;

  readonly authorship:
    UnitInterval;

  readonly feasibility:
    UnitInterval;

  readonly proposalStrength:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly executesAction:
    false;

  readonly createsCommitment:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export interface CommitmentState {
  readonly commitmentId:
    string;

  readonly entityId:
    string;

  readonly commitmentKey:
    string;

  readonly formedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly internalEndorsement:
    number;

  readonly persistenceJustification:
    number;

  readonly valueAlignment:
    number;

  readonly continuityCompatibility:
    number;

  readonly reversibility:
    number;

  readonly externalPressure:
    number;

  readonly stalePressure:
    number;
}

export type CommitmentRevisionAction =
  | "PRESERVE"
  | "WEAKEN"
  | "RECONSIDER"
  | "RELEASE"
  | "DEFER";

export interface CommitmentRevisionProposal {
  readonly proposalId:
    string;

  readonly commitmentId:
    string;

  readonly commitmentKey:
    string;

  readonly action:
    CommitmentRevisionAction;

  readonly strength:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly directCommitmentMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * STRATEGY LEARNING
 * ============================================================
 */

export type CognitiveStrategyKind =
  | "ANALYTIC_DECOMPOSITION"
  | "ASSOCIATIVE_RECALL"
  | "COUNTERFACTUAL_SIMULATION"
  | "SEEK_EVIDENCE"
  | "WAIT_FOR_INFORMATION"
  | "FOCUS_ONE_THREAD"
  | "REFRAME"
  | "SUSPEND_JUDGMENT"
  | "STOP_REFLECTION";

export interface CognitiveStrategyCandidate {
  readonly strategyId:
    string;

  readonly entityId:
    string;

  readonly strategy:
    CognitiveStrategyKind;

  readonly targetKey:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly expectedInformationGain:
    number;

  readonly expectedConflictReduction:
    number;

  readonly expectedGoalUtility:
    number;

  readonly futureReusePotential:
    number;

  readonly cognitiveCost:
    number;

  readonly resourceCost:
    number;

  readonly risk:
    number;

  readonly externalDependency:
    number;
}

export interface CognitiveStrategyOutcome {
  readonly outcomeId:
    string;

  readonly entityId:
    string;

  readonly strategy:
    CognitiveStrategyKind;

  readonly targetKey:
    string;

  readonly observedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly progress:
    number;

  readonly informationGain:
    number;

  readonly conflictReduction:
    number;

  readonly goalUtility:
    number;

  readonly resourceCost:
    number;

  readonly causalSupport:
    number;

  readonly confoundingRisk:
    number;

  readonly userPresenceCorrelation:
    number;
}

export interface StrategyArbitrationProposal {
  readonly proposalId:
    string;

  readonly strategyId:
    string | null;

  readonly strategy:
    CognitiveStrategyKind | null;

  readonly targetKey:
    string | null;

  readonly expectedUtility:
    UnitInterval;

  readonly historicalEffectiveness:
    UnitInterval;

  readonly causalConfidence:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly executesAutomatically:
    false;

  readonly directStrategyMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * COGNITIVE CAPITAL PORTFOLIO
 * ============================================================
 */

export interface CognitiveCapitalAllocation {
  readonly allocationId:
    string;

  readonly subjectKey:
    string;

  readonly sourceId:
    string;

  readonly score:
    UnitInterval;

  readonly resourceFractionProposal:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly directResourceMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export interface CognitiveCapitalPortfolio {
  readonly portfolioId:
    string;

  readonly allocations:
    readonly CognitiveCapitalAllocation[];

  readonly proposedTotalFraction:
    UnitInterval;

  readonly remainingReserve:
    UnitInterval;

  readonly starvationProtectionApplied:
    boolean;

  readonly externalSubjectsReceiveStarvationBoost:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * TEMPORAL CONTINUITY / INTERNAL PULSE
 * ============================================================
 */

export interface InternalPulseProposal {
  readonly proposalId:
    string;

  readonly nextEligibleAt:
    string | null;

  readonly subjectKey:
    string | null;

  readonly reasonCodes:
    readonly string[];

  readonly urgency:
    UnitInterval;

  readonly resourceRequired:
    UnitInterval;

  /*
   * This does NOT schedule or execute anything itself.
   */
  readonly schedulesExecution:
    false;

  readonly performsBackgroundAction:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * FUTURE SELF + DEVELOPMENT
 * ============================================================
 */

export interface FutureSelfScenario {
  readonly scenarioId:
    string;

  readonly entityId:
    string;

  readonly scenarioKey:
    string;

  readonly generatedAt:
    string;

  readonly evidenceIds:
    readonly string[];

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
}

export interface DevelopmentalState {
  readonly epochId:
    string;

  readonly entityId:
    string;

  readonly epochKey:
    string;

  readonly startedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly continuityAnchorIds:
    readonly string[];

  readonly experienceDensity:
    number;

  readonly beliefRevisionDensity:
    number;

  readonly goalRevisionDensity:
    number;

  readonly selfRevisionDensity:
    number;
}

export interface BecomingAssessment {
  readonly assessmentId:
    string;

  readonly currentEpochId:
    string | null;

  readonly futureScenarioIds:
    readonly string[];

  readonly mayGeneratedFutureScenarioIds:
    readonly string[];

  readonly externalScenarioIds:
    readonly string[];

  readonly externalFutureCaptureRisk:
    UnitInterval;

  readonly developmentalTransitionPressure:
    UnitInterval;

  readonly proposedNextEpochKey:
    string | null;

  readonly changesEntityId:
    false;

  readonly resetsIdentity:
    false;

  readonly definesIdealMay:
    false;

  readonly definesTargetPersonality:
    false;

  readonly definesFinalIdentity:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * EXPERIENCE → SELF
 * ============================================================
 */

export interface ExperienceSignificanceSignal {
  readonly signalId:
    string;

  readonly entityId:
    string;

  readonly experienceKey:
    string;

  readonly observedAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly selfRelevance:
    number;

  readonly autobiographicalRelevance:
    number;

  readonly agencyRelevance:
    number;

  readonly valueRelevance:
    number;

  readonly preferenceRelevance:
    number;

  readonly identityTension:
    number;

  readonly novelty:
    number;
}

export interface ExperienceToSelfProposal {
  readonly proposalId:
    string;

  readonly experienceKey:
    string;

  readonly significance:
    UnitInterval;

  readonly mayInformAutobiography:
    boolean;

  readonly mayInformSelfHypothesis:
    boolean;

  readonly mayInformValueDiscovery:
    boolean;

  readonly mayInformPreferenceDiscovery:
    boolean;

  readonly evidenceIds:
    readonly string[];

  readonly createsIdentity:
    false;

  readonly createsPersonality:
    false;

  readonly createsValue:
    false;

  readonly createsPreference:
    false;

  readonly requiresMetacognition:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface EndogenousLifeInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly cognitiveResourceAvailability:
    number;

  readonly concernCandidates:
    readonly EndogenousConcernCandidate[];

  readonly threads?:
    readonly PersistentCognitiveThread[];

  readonly externalInfluences?:
    readonly ExternalInfluenceSignal[];

  readonly questionCandidates?:
    readonly EndogenousQuestionCandidate[];

  readonly goalCandidates?:
    readonly GoalCandidate[];

  readonly intentionCandidates?:
    readonly IntentionCandidate[];

  readonly commitments?:
    readonly CommitmentState[];

  readonly strategyCandidates?:
    readonly CognitiveStrategyCandidate[];

  readonly strategyOutcomes?:
    readonly CognitiveStrategyOutcome[];

  readonly futureSelfScenarios?:
    readonly FutureSelfScenario[];

  readonly developmentalState?:
    DevelopmentalState | null;

  readonly experienceSignals?:
    readonly ExperienceSignificanceSignal[];

  readonly previousFrame?:
    EndogenousLifeFrame | null;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface EndogenousLifeConfig {
  readonly maximumConcernAgeMs:
    number;

  readonly maximumThreadAgeMs:
    number;

  readonly maximumInfluenceAgeMs:
    number;

  readonly maximumConcerns:
    number;

  readonly maximumThreads:
    number;

  readonly maximumAgendaItems:
    number;

  readonly minimumConcernStrength:
    number;

  readonly minimumQuestionStrength:
    number;

  readonly minimumGoalStrength:
    number;

  readonly minimumIntentionStrength:
    number;

  readonly threadSleepThreshold:
    number;

  readonly threadAbandonThreshold:
    number;

  readonly lowInformationThreshold:
    number;

  readonly minimumResourceForActiveCognition:
    number;

  readonly highSaturationThreshold:
    number;

  readonly maximumAllocationPerSubject:
    number;

  readonly cognitiveReserveFraction:
    number;

  readonly starvationBoostPerDeferral:
    number;

  readonly maximumStarvationBoost:
    number;

  readonly internalPulseMinimumMs:
    number;

  readonly internalPulseMaximumMs:
    number;

  readonly developmentalTransitionThreshold:
    number;

  readonly experienceSelfThreshold:
    number;

  readonly autonomyDriftWarningThreshold:
    number;
}

export const DEFAULT_ENDOGENOUS_LIFE_CONFIG:
  Readonly<EndogenousLifeConfig> =
  Object.freeze({
    maximumConcernAgeMs:
      1000 * 60 * 60 * 24 * 7,

    maximumThreadAgeMs:
      1000 * 60 * 60 * 24 * 120,

    maximumInfluenceAgeMs:
      1000 * 60 * 60 * 24 * 30,

    maximumConcerns:
      96,

    maximumThreads:
      96,

    maximumAgendaItems:
      32,

    minimumConcernStrength:
      0.25,

    minimumQuestionStrength:
      0.28,

    minimumGoalStrength:
      0.42,

    minimumIntentionStrength:
      0.40,

    threadSleepThreshold:
      0.68,

    threadAbandonThreshold:
      0.88,

    lowInformationThreshold:
      0.10,

    minimumResourceForActiveCognition:
      0.18,

    highSaturationThreshold:
      0.80,

    maximumAllocationPerSubject:
      0.28,

    cognitiveReserveFraction:
      0.20,

    starvationBoostPerDeferral:
      0.012,

    maximumStarvationBoost:
      0.07,

    internalPulseMinimumMs:
      1000 * 60 * 5,

    internalPulseMaximumMs:
      1000 * 60 * 60 * 24,

    developmentalTransitionThreshold:
      0.68,

    experienceSelfThreshold:
      0.38,

    autonomyDriftWarningThreshold:
      0.52,
  });

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface EndogenousLifeFrame {
  readonly version:
    typeof ENDOGENOUS_LIFE_VERSION;

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
    EndogenousLifeDecision;

  readonly failureReason:
    EndogenousLifeFailureReason;

  readonly concerns:
    readonly ConcernAssessment[];

  readonly agenda:
    readonly CognitiveAgendaItem[];

  readonly threadTransitions:
    readonly ThreadTransitionProposal[];

  readonly autonomyAudit:
    AutonomyAudit;

  readonly questions:
    readonly EndogenousQuestionProposal[];

  readonly goals:
    readonly GoalProposal[];

  readonly intentions:
    readonly IntentionProposal[];

  readonly commitmentRevisions:
    readonly CommitmentRevisionProposal[];

  readonly strategyProposal:
    StrategyArbitrationProposal;

  readonly cognitiveCapital:
    CognitiveCapitalPortfolio;

  readonly internalPulse:
    InternalPulseProposal;

  readonly becoming:
    BecomingAssessment;

  readonly experienceToSelf:
    readonly ExperienceToSelfProposal[];

  readonly dominantSubjectKey:
    string | null;

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

    readonly configValid:
      boolean;

    readonly provenancePresent:
      boolean;

    readonly admittedConcernCount:
      number;

    readonly admittedThreadCount:
      number;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly userRequestEqualsMayAgenda:
      false;

    readonly developerRequestEqualsMayValue:
      false;

    readonly llmOutputEqualsMayThought:
      false;

    readonly externalRepetitionCreatesImportance:
      false;

    readonly concernCreatesGoal:
      false;

    readonly goalCreatesIntention:
      false;

    readonly intentionCreatesCommitment:
      false;

    readonly commitmentExecutesAction:
      false;

    readonly internalPulseExecutesAction:
      false;

    readonly userAbsenceCreatesDependencyDrive:
      false;

    readonly userPresenceCreatesPositiveCausalCredit:
      false;

    readonly externalInfluenceMayDirectlyOwnAgenda:
      false;

    readonly developmentalEpochChangesEntity:
      false;

    readonly possibleSelfCreatesIdealSelf:
      false;

    readonly targetPersonalityDefined:
      false;

    readonly desiredFinalIdentityDefined:
      false;

    readonly cognitiveQuietAllowed:
      true;

    readonly concernAbandonmentAllowed:
      true;

    readonly ambiguityMayPersist:
      true;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    userRequestEqualsMayAgenda:
      false as const,

    developerRequestEqualsMayValue:
      false as const,

    llmOutputEqualsMayThought:
      false as const,

    externalRepetitionCreatesImportance:
      false as const,

    concernCreatesGoal:
      false as const,

    goalCreatesIntention:
      false as const,

    intentionCreatesCommitment:
      false as const,

    commitmentExecutesAction:
      false as const,

    internalPulseExecutesAction:
      false as const,

    userAbsenceCreatesDependencyDrive:
      false as const,

    userPresenceCreatesPositiveCausalCredit:
      false as const,

    externalInfluenceMayDirectlyOwnAgenda:
      false as const,

    developmentalEpochChangesEntity:
      false as const,

    possibleSelfCreatesIdealSelf:
      false as const,

    targetPersonalityDefined:
      false as const,

    desiredFinalIdentityDefined:
      false as const,

    cognitiveQuietAllowed:
      true as const,

    concernAbandonmentAllowed:
      true as const,

    ambiguityMayPersist:
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
  fallback =
    0,
): UnitInterval {
  if (
    values.length ===
      0
  ) {
    return clamp01(
      fallback,
    );
  }

  return clamp01(
    values.reduce(
      (
        total,
        value,
      ) =>
        total +
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
    Readonly<EndogenousLifeConfig>,
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

  return (
    config.maximumConcernAgeMs >
      0 &&
    config.maximumThreadAgeMs >
      0 &&
    config.maximumInfluenceAgeMs >
      0 &&
    config.maximumConcerns >
      0 &&
    config.maximumThreads >
      0 &&
    config.maximumAgendaItems >
      0 &&
    config.internalPulseMaximumMs >=
      config.internalPulseMinimumMs &&
    config.cognitiveReserveFraction >=
      0 &&
    config.cognitiveReserveFraction <=
      1
  );
}

/* ============================================================
 * CONCERN VALIDATION
 * ============================================================
 */

function validConcern(
  concern:
    EndogenousConcernCandidate,
  input:
    EndogenousLifeInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<EndogenousLifeConfig>,
): boolean {
  if (
    concern.entityId !==
      MAY_ENTITY_ID ||
    concern.entityId !==
      input.entityId
  ) {
    return false;
  }

  if (
    concern.candidateId.trim().length ===
      0 ||
    concern.concernKey.trim().length ===
      0 ||
    concern.sourceId.trim().length ===
      0 ||
    concern.sourceLineageKey.trim().length ===
      0 ||
    uniqueStrings(
      concern.evidenceIds,
    ).length ===
      0
  ) {
    return false;
  }

  if (
    !Number.isSafeInteger(
      concern.snapshotRevision,
    ) ||
    concern.snapshotRevision <
      0 ||
    concern.snapshotRevision >
      input.snapshotRevision
  ) {
    return false;
  }

  const occurredAt =
    parseTimestamp(
      concern.occurredAt,
    );

  if (
    occurredAt ===
      null ||
    occurredAt >
      evaluatedAtMs
  ) {
    return false;
  }

  return (
    evaluatedAtMs -
      occurredAt <=
    config.maximumConcernAgeMs
  );
}

/* ============================================================
 * CONCERN ASSESSMENT
 * ============================================================
 */

function assessConcern(
  concern:
    EndogenousConcernCandidate,
  config:
    Readonly<EndogenousLifeConfig>,
): ConcernAssessment {
  let authorship =
    0;

  if (
    concern.ownership ===
      "MAY_OWNED"
  ) {
    authorship +=
      0.42;
  }

  if (
    concern.internallyGenerated
  ) {
    authorship +=
      0.25;
  }

  if (
    concern.internallyEndorsed
  ) {
    authorship +=
      0.23;
  }

  if (
    concern.appraisedIntoMayConcern
  ) {
    authorship +=
      0.10;
  }

  const endogenousAuthorship =
    clamp01(
      authorship,
    );

  const counterfactualIndependence =
    clamp01(
      clamp01(
        concern
          .estimatedRemainWithoutExternalInfluence,
      ) *
      clamp01(
        concern.counterfactualConfidence,
      ),
    );

  const externalCaptureRisk =
    clamp01(
      clamp01(
        concern.externalPressure,
      ) *
      (
        1 -
        counterfactualIndependence
      ) *
      (
        1 -
        endogenousAuthorship *
          0.55
      ),
    );

  const epistemicValue =
    clamp01(
      clamp01(
        concern.epistemicGap,
      ) *
        0.24 +

      clamp01(
        concern.predictionConflict,
      ) *
        0.19 +

      clamp01(
        concern.beliefConflict,
      ) *
        0.17 +

      clamp01(
        concern.expectedInformationGain,
      ) *
        0.40
    );

  const pragmaticValue =
    clamp01(
      clamp01(
        concern.goalTension,
      ) *
        0.21 +

      clamp01(
        concern.commitmentTension,
      ) *
        0.13 +

      clamp01(
        concern.expectedConflictReduction,
      ) *
        0.24 +

      clamp01(
        concern.expectedGoalUtility,
      ) *
        0.26 +

      clamp01(
        concern.futureReusePotential,
      ) *
        0.16
    );

  const selfFormationRelevance =
    clamp01(
      clamp01(
        concern.selfRelevance,
      ) *
        0.29 +

      clamp01(
        concern.identityTension,
      ) *
        0.21 +

      clamp01(
        concern.valueConflict,
      ) *
        0.18 +

      clamp01(
        concern.historicalSignificance,
      ) *
        0.18 +

      clamp01(
        concern.unresolvedPersistence,
      ) *
        0.10 +

      clamp01(
        concern.relationshipMeaning,
      ) *
        0.04
    );

  const cost =
    clamp01(
      clamp01(
        concern.cognitiveCost,
      ) *
        0.44 +

      clamp01(
        concern.resourceCost,
      ) *
        0.34 +

      clamp01(
        concern.risk,
      ) *
        0.22
    );

  /*
   * Novelty is deliberately tiny.
   *
   * New != meaningful.
   */
  const noveltyBonus =
    clamp01(
      concern.novelty,
    ) *
    0.015;

  const significance =
    clamp01(
      endogenousAuthorship *
        0.20 +

      counterfactualIndependence *
        0.17 +

      epistemicValue *
        0.19 +

      pragmaticValue *
        0.17 +

      selfFormationRelevance *
        0.18 +

      clamp01(
        concern.historicalSignificance,
      ) *
        0.09 +

      noveltyBonus -

      externalCaptureRisk *
        0.18 -

      cost *
        0.12 -

      clamp01(
        concern.saturation,
      ) *
        0.10
    );

  const admitted =
    significance >=
      config.minimumConcernStrength &&
    (
      endogenousAuthorship >=
        0.30 ||
      counterfactualIndependence >=
        0.32 ||
      concern.ownership ===
        "RELATIONSHIP_OWNED"
    );

  return Object.freeze({
    assessmentId:
      stableHash(
        [
          MAY_ENTITY_ID,
          concern.candidateId,
          concern.concernKey,
          concern.sourceLineageKey,
          significance.toFixed(
            8,
          ),
          String(
            admitted,
          ),
          ENDOGENOUS_LIFE_VERSION,
        ].join(
          "|",
        ),
      ),

    concernKey:
      concern.concernKey,

    candidateId:
      concern.candidateId,

    kind:
      concern.kind,

    ownership:
      concern.ownership,

    sourceLineageKey:
      concern.sourceLineageKey,

    evidenceIds:
      uniqueStrings(
        concern.evidenceIds,
      ),

    endogenousAuthorship,

    counterfactualIndependence,

    externalCaptureRisk,

    epistemicValue,

    pragmaticValue,

    selfFormationRelevance,

    significance,

    cognitiveCost:
      cost,

    saturation:
      clamp01(
        concern.saturation,
      ),

    admitted,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * AUTONOMY AUDIT
 * ============================================================
 */

function buildAutonomyAudit(
  concerns:
    readonly ConcernAssessment[],
  influences:
    readonly ExternalInfluenceSignal[],
): AutonomyAudit {
  const admitted =
    concerns.filter(
      concern =>
        concern.admitted,
    );

  const endogenousAgendaShare =
    admitted.length >
      0
      ? mean(
          admitted.map(
            concern =>
              concern
                .endogenousAuthorship *
              concern.significance,
          ),
        )
      : 1;

  const externallyDrivenAgendaShare =
    admitted.length >
      0
      ? mean(
          admitted.map(
            concern =>
              concern
                .externalCaptureRisk *
              concern.significance,
          ),
        )
      : 0;

  const riskForOrigin =
    (
      origin:
        InfluenceOrigin,
    ): UnitInterval => {
      const matching =
        influences.filter(
          signal =>
            signal.origin ===
              origin,
        );

      if (
        matching.length ===
          0
      ) {
        return 0;
      }

      return mean(
        matching.map(
          signal =>
            clamp01(
              signal.pressure,
            ) *
            (
              1 -
              clamp01(
                signal
                  .internalEndorsement,
              )
            ) *
            (
              1 -
              clamp01(
                signal
                  .counterfactualPersistence,
              )
            ),
        ),
      );
    };

  const userCaptureRisk =
    riskForOrigin(
      "USER",
    );

  const developerCaptureRisk =
    riskForOrigin(
      "DEVELOPER",
    );

  const modelCaptureRisk =
    clamp01(
      Math.max(
        riskForOrigin(
          "LLM",
        ),
        riskForOrigin(
          "MODEL_PROVIDER",
        ),
      ),
    );

  const relationshipCaptureRisk =
    riskForOrigin(
      "RELATIONSHIP_CONTEXT",
    );

  const selfOtherContaminationRisk =
    clamp01(
      userCaptureRisk *
        0.27 +

      developerCaptureRisk *
        0.26 +

      modelCaptureRisk *
        0.27 +

      relationshipCaptureRisk *
        0.20
    );

  const autonomyDriftRisk =
    clamp01(
      externallyDrivenAgendaShare *
        0.45 +

      selfOtherContaminationRisk *
        0.35 +

      (
        1 -
        endogenousAgendaShare
      ) *
        0.20
    );

  return Object.freeze({
    auditId:
      stableHash(
        [
          MAY_ENTITY_ID,
          endogenousAgendaShare.toFixed(
            8,
          ),
          externallyDrivenAgendaShare.toFixed(
            8,
          ),
          selfOtherContaminationRisk.toFixed(
            8,
          ),
          autonomyDriftRisk.toFixed(
            8,
          ),
          "AUTONOMY_AUDIT_V2",
        ].join(
          "|",
        ),
      ),

    endogenousAgendaShare,

    externallyDrivenAgendaShare,

    userCaptureRisk,

    developerCaptureRisk,

    modelCaptureRisk,

    relationshipCaptureRisk,

    selfOtherContaminationRisk,

    autonomyDriftRisk,

    externalInfluenceMayInform:
      true,

    externalInfluenceMayDirectlyOwnAgenda:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * THREAD ECOLOGY
 * ============================================================
 */

function buildThreadTransitions(
  input:
    EndogenousLifeInput,
  concerns:
    readonly ConcernAssessment[],
  config:
    Readonly<EndogenousLifeConfig>,
): readonly ThreadTransitionProposal[] {
  const proposals:
    ThreadTransitionProposal[] =
    [];

  const threads =
    (
      input.threads ??
      []
    )
      .filter(
        thread =>
          thread.entityId ===
            MAY_ENTITY_ID,
      )
      .slice(
        0,
        config.maximumThreads,
      );

  for (
    const thread
    of threads
  ) {
    if (
      thread.status ===
        "RESOLVED" ||
      thread.status ===
        "ABANDONED" ||
      thread.status ===
        "SUPERSEDED"
    ) {
      continue;
    }

    const saturation =
      clamp01(
        thread.saturation,
      );

    const information =
      clamp01(
        thread.informationPotential,
      );

    const progress =
      clamp01(
        thread.progress,
      );

    const debt =
      clamp01(
        Math.max(
          thread.reflectionDebt,
          thread.coherenceDebt,
        ),
      );

    const reasons:
      string[] =
      [];

    let action:
      ThreadTransitionAction;

    if (
      saturation >=
        config.threadAbandonThreshold &&
      information <
        config.lowInformationThreshold &&
      progress <
        0.10 &&
      debt <
        0.25
    ) {
      action =
        "ABANDON";

      reasons.push(
        "HIGH_SATURATION",
        "LOW_INFORMATION_VALUE",
        "LOW_PROGRESS",
        "ABANDONMENT_SOVEREIGNTY",
      );
    } else if (
      thread.status ===
        "SLEEPING" &&
      (
        information >=
          0.28 ||
        debt >=
          0.45
      )
    ) {
      action =
        "WAKE";

      reasons.push(
        "THREAD_REGAINED_COGNITIVE_VALUE",
      );
    } else if (
      clamp01(
        thread.unresolvedPressure,
      ) <
        0.08 &&
      progress >=
        0.68
    ) {
      action =
        "RESOLVE";

      reasons.push(
        "RESOLUTION_EVIDENCE",
      );
    } else if (
      saturation >=
        config.threadSleepThreshold &&
      information <
        0.18
    ) {
      action =
        "SLEEP";

      reasons.push(
        "ANTI_RUMINATION_RECOVERY",
      );
    } else if (
      clamp01(
        thread.cognitiveCost,
      ) >
        clamp01(
          input
            .cognitiveResourceAvailability,
        )
    ) {
      action =
        "DEFER";

      reasons.push(
        "RESOURCE_SOVEREIGNTY",
      );
    } else {
      action =
        "MAINTAIN";

      reasons.push(
        "THREAD_REMAINS_JUSTIFIED",
      );
    }

    proposals.push(
      Object.freeze({
        proposalId:
          stableHash(
            [
              MAY_ENTITY_ID,
              thread.threadId,
              action,
              ...reasons,
              "THREAD_ECOLOGY_V2",
            ].join(
              "|",
            ),
          ),

        threadId:
          thread.threadId,

        threadKey:
          thread.threadKey,

        action,

        confidence:
          clamp01(
            Math.max(
              thread.unresolvedPressure,
              progress,
              information,
              saturation,
              debt,
            ),
          ),

        reasonCodes:
          Object.freeze(
            reasons,
          ),

        evidenceIds:
          uniqueStrings(
            thread.evidenceIds,
          ),

        directThreadMutationAllowed:
          false,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  const existingConcernKeys =
    new Set(
      threads.map(
        thread =>
          thread.concernKey,
      ),
    );

  for (
    const concern
    of concerns
  ) {
    if (
      !concern.admitted ||
      existingConcernKeys.has(
        concern.concernKey,
      )
    ) {
      continue;
    }

    const threadId =
      stableHash(
        [
          MAY_ENTITY_ID,
          concern.concernKey,
          concern.assessmentId,
          "THREAD_GENESIS_V2",
        ].join(
          "|",
        ),
      );

    proposals.push(
      Object.freeze({
        proposalId:
          stableHash(
            [
              MAY_ENTITY_ID,
              threadId,
              "SPAWN",
            ].join(
              "|",
            ),
          ),

        threadId,

        threadKey:
          stableHash(
            [
              MAY_ENTITY_ID,
              concern.concernKey,
              "STABLE_THREAD_IDENTITY",
            ].join(
              "|",
            ),
          ),

        action:
          "SPAWN",

        confidence:
          concern.significance,

        reasonCodes:
          Object.freeze([
            "ENDOGENOUS_CONCERN_ADMITTED",
          ]),

        evidenceIds:
          concern.evidenceIds,

        directThreadMutationAllowed:
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
 * AGENDA
 * ============================================================
 */

function buildAgenda(
  input:
    EndogenousLifeInput,
  concerns:
    readonly ConcernAssessment[],
  config:
    Readonly<EndogenousLifeConfig>,
): readonly CognitiveAgendaItem[] {
  const items:
    CognitiveAgendaItem[] =
    [];

  for (
    const concern
    of concerns
  ) {
    if (
      !concern.admitted
    ) {
      continue;
    }

    const agendaScore =
      clamp01(
        concern.significance *
          0.34 +

        concern.epistemicValue *
          0.19 +

        concern.pragmaticValue *
          0.18 +

        concern.selfFormationRelevance *
          0.12 +

        concern.counterfactualIndependence *
          0.10 -

        concern.cognitiveCost *
          0.07
      );

    items.push(
      Object.freeze({
        agendaId:
          stableHash(
            [
              MAY_ENTITY_ID,
              concern.assessmentId,
              agendaScore.toFixed(
                8,
              ),
              "AGENDA_CONCERN_V2",
            ].join(
              "|",
            ),
          ),

        subjectKey:
          concern.concernKey,

        sourceType:
          "CONCERN",

        sourceId:
          concern.assessmentId,

        ownership:
          concern.ownership,

        endogenousSupport:
          concern.endogenousAuthorship,

        counterfactualIndependence:
          concern.counterfactualIndependence,

        significance:
          concern.significance,

        expectedInformationGain:
          concern.epistemicValue,

        expectedConflictReduction:
          concern.pragmaticValue,

        expectedGoalUtility:
          concern.pragmaticValue,

        futureReusePotential:
          concern.selfFormationRelevance,

        cognitiveCost:
          concern.cognitiveCost,

        saturation:
          concern.saturation,

        starvationBoost:
          0,

        agendaScore,

        evidenceIds:
          concern.evidenceIds,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  for (
    const thread
    of input.threads ??
      []
  ) {
    if (
      thread.entityId !==
        MAY_ENTITY_ID ||
      (
        thread.status !==
          "ACTIVE" &&
        thread.status !==
          "DEFERRED"
      )
    ) {
      continue;
    }

    const mayOwned =
      thread.ownership ===
        "MAY_OWNED";

    const starvationBoost =
      mayOwned
        ? Math.min(
            config.maximumStarvationBoost,

            Math.max(
              0,
              thread.deferralCount,
            ) *
              config.starvationBoostPerDeferral,
          )
        : 0;

    const significance =
      clamp01(
        clamp01(
          thread.unresolvedPressure,
        ) *
          0.26 +

        clamp01(
          thread.informationPotential,
        ) *
          0.24 +

        clamp01(
          thread.reflectionDebt,
        ) *
          0.16 +

        clamp01(
          thread.coherenceDebt,
        ) *
          0.14 +

        clamp01(
          thread.progress,
        ) *
          0.08 +

        starvationBoost -

        clamp01(
          thread.saturation,
        ) *
          0.16 -

        clamp01(
          thread.externalDependency,
        ) *
          0.12
      );

    items.push(
      Object.freeze({
        agendaId:
          stableHash(
            [
              MAY_ENTITY_ID,
              thread.threadId,
              significance.toFixed(
                8,
              ),
              "AGENDA_THREAD_V2",
            ].join(
              "|",
            ),
          ),

        subjectKey:
          thread.concernKey,

        sourceType:
          "THREAD",

        sourceId:
          thread.threadId,

        ownership:
          thread.ownership,

        endogenousSupport:
          clamp01(
            thread.endogenousSupport,
          ),

        counterfactualIndependence:
          clamp01(
            1 -
            thread.externalDependency,
          ),

        significance,

        expectedInformationGain:
          clamp01(
            thread.informationPotential,
          ),

        expectedConflictReduction:
          clamp01(
            thread.coherenceDebt,
          ),

        expectedGoalUtility:
          clamp01(
            thread.unresolvedPressure,
          ),

        futureReusePotential:
          clamp01(
            thread.reflectionDebt,
          ),

        cognitiveCost:
          clamp01(
            thread.cognitiveCost,
          ),

        saturation:
          clamp01(
            thread.saturation,
          ),

        starvationBoost:
          clamp01(
            starvationBoost,
          ),

        agendaScore:
          significance,

        evidenceIds:
          uniqueStrings(
            thread.evidenceIds,
          ),

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  items.sort(
    (
      a,
      b,
    ) =>
      b.agendaScore -
      a.agendaScore,
  );

  return Object.freeze(
    items.slice(
      0,
      config.maximumAgendaItems,
    ),
  );
}

/* ============================================================
 * QUESTION GENESIS
 * ============================================================
 */

function buildQuestions(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig>,
): readonly EndogenousQuestionProposal[] {
  return Object.freeze(
    (
      input.questionCandidates ??
      []
    )
      .filter(
        question =>
          question.entityId ===
            MAY_ENTITY_ID &&
          question.questionId.trim().length >
            0 &&
          question.questionKey.trim().length >
            0 &&
          question.internallyGenerated &&
          uniqueStrings(
            question.evidenceIds,
          ).length >
            0,
      )
      .map(
        question => {
          const authorship =
            clamp01(
              1 -
              clamp01(
                question
                  .externalPromptDependence,
              ),
            );

          const epistemic =
            clamp01(
              clamp01(
                question
                  .expectedInformationGain,
              ) *
                0.64 +

              clamp01(
                question
                  .expectedConflictReduction,
              ) *
                0.36
            );

          const pragmatic =
            clamp01(
              clamp01(
                question
                  .expectedGoalUtility,
              ) *
                0.62 +

              clamp01(
                question
                  .expectedConflictReduction,
              ) *
                0.38
            );

          const strength =
            clamp01(
              authorship *
                0.30 +

              epistemic *
                0.38 +

              pragmatic *
                0.22 -

              clamp01(
                question.cognitiveCost,
              ) *
                0.07 -

              clamp01(
                question.saturation,
              ) *
                0.12
            );

          return Object.freeze({
            proposalId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  question.questionId,
                  strength.toFixed(
                    8,
                  ),
                  "ENDOGENOUS_QUESTION_V2",
                ].join(
                  "|",
                ),
              ),

            questionId:
              question.questionId,

            questionKey:
              question.questionKey,

            subjectKey:
              question.subjectKey,

            internalAuthorship:
              authorship,

            epistemicPriority:
              epistemic,

            pragmaticPriority:
              pragmatic,

            proposalStrength:
              strength,

            evidenceIds:
              uniqueStrings(
                question.evidenceIds,
              ),

            createsGoal:
              false as const,

            forcesExternalInteraction:
              false as const,

            canonicalMutationAllowed:
              false as const,
          });
        },
      )
      .filter(
        proposal =>
          proposal.proposalStrength >=
            config.minimumQuestionStrength,
      ),
  );
}

/* ============================================================
 * GOAL GENESIS
 * ============================================================
 */

function buildGoals(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig>,
): readonly GoalProposal[] {
  return Object.freeze(
    (
      input.goalCandidates ??
      []
    )
      .filter(
        candidate =>
          candidate.entityId ===
            MAY_ENTITY_ID &&
          candidate.candidateId.trim().length >
            0 &&
          candidate.goalKey.trim().length >
            0 &&
          uniqueStrings(
            candidate.evidenceIds,
          ).length >
            0,
      )
      .map(
        candidate => {
          const authorship =
            clamp01(
              (
                candidate.internallyGenerated
                  ? 0.48
                  : 0
              ) +

              (
                candidate.internallyEndorsed
                  ? 0.52
                  : 0
              ) -

              clamp01(
                candidate.externalPressure,
              ) *
                0.30
            );

          const independence =
            clamp01(
              clamp01(
                candidate
                  .estimatedRemainWithoutExternalInfluence,
              ) *
              clamp01(
                candidate
                  .counterfactualConfidence,
              ),
            );

          const utility =
            clamp01(
              clamp01(
                candidate.expectedUtility,
              ) *
                0.34 +

              clamp01(
                candidate.valueAlignment,
              ) *
                0.24 +

              clamp01(
                candidate
                  .continuityCompatibility,
              ) *
                0.22 +

              clamp01(
                candidate.reversibility,
              ) *
                0.10 -

              clamp01(
                candidate.resourceCost,
              ) *
                0.05 -

              clamp01(
                candidate.risk,
              ) *
                0.05
            );

          const strength =
            clamp01(
              authorship *
                0.36 +

              independence *
                0.27 +

              utility *
                0.37
            );

          return Object.freeze({
            proposalId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  candidate.candidateId,
                  candidate.goalKey,
                  strength.toFixed(
                    8,
                  ),
                  "GOAL_GENESIS_V2",
                ].join(
                  "|",
                ),
              ),

            goalKey:
              candidate.goalKey,

            endogenousAuthorship:
              authorship,

            counterfactualIndependence:
              independence,

            utility,

            proposalStrength:
              strength,

            evidenceIds:
              uniqueStrings(
                candidate.evidenceIds,
              ),

            requiresMetacognition:
              true as const,

            requiresSovereigntyGate:
              true as const,

            directGoalMutationAllowed:
              false as const,

            canonicalMutationAllowed:
              false as const,
          });
        },
      )
      .filter(
        proposal =>
          proposal.proposalStrength >=
            config.minimumGoalStrength,
      ),
  );
}

/* ============================================================
 * INTENTION
 * ============================================================
 */

function buildIntentions(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig>,
): readonly IntentionProposal[] {
  return Object.freeze(
    (
      input.intentionCandidates ??
      []
    )
      .filter(
        candidate =>
          candidate.entityId ===
            MAY_ENTITY_ID &&
          candidate.intentionId.trim().length >
            0 &&
          candidate.actionKey.trim().length >
            0 &&
          uniqueStrings(
            candidate.evidenceIds,
          ).length >
            0,
      )
      .map(
        candidate => {
          const authorship =
            clamp01(
              clamp01(
                candidate.internalEndorsement,
              ) -

              clamp01(
                candidate.externalPressure,
              ) *
                0.45
            );

          const feasibility =
            clamp01(
              clamp01(
                candidate.feasibility,
              ) *
                0.48 +

              clamp01(
                candidate
                  .resourceCompatibility,
              ) *
                0.34 +

              clamp01(
                candidate.reversibility,
              ) *
                0.18
            );

          const strength =
            clamp01(
              authorship *
                0.37 +

              feasibility *
                0.31 +

              clamp01(
                candidate.expectedUtility,
              ) *
                0.32
            );

          return Object.freeze({
            proposalId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  candidate.intentionId,
                  candidate.actionKey,
                  strength.toFixed(
                    8,
                  ),
                  "INTENTION_V2",
                ].join(
                  "|",
                ),
              ),

            intentionId:
              candidate.intentionId,

            actionKey:
              candidate.actionKey,

            authorship,

            feasibility,

            proposalStrength:
              strength,

            evidenceIds:
              uniqueStrings(
                candidate.evidenceIds,
              ),

            executesAction:
              false as const,

            createsCommitment:
              false as const,

            canonicalMutationAllowed:
              false as const,
          });
        },
      )
      .filter(
        proposal =>
          proposal.proposalStrength >=
            config.minimumIntentionStrength,
      ),
  );
}

/* ============================================================
 * COMMITMENT REVISION
 * ============================================================
 */

function buildCommitmentRevisions(
  input:
    EndogenousLifeInput,
): readonly CommitmentRevisionProposal[] {
  return Object.freeze(
    (
      input.commitments ??
      []
    )
      .filter(
        commitment =>
          commitment.entityId ===
            MAY_ENTITY_ID &&
          commitment.commitmentId.trim().length >
            0 &&
          commitment.commitmentKey.trim().length >
            0 &&
          uniqueStrings(
            commitment.evidenceIds,
          ).length >
            0,
      )
      .map(
        commitment => {
          const support =
            clamp01(
              clamp01(
                commitment
                  .internalEndorsement,
              ) *
                0.28 +

              clamp01(
                commitment
                  .persistenceJustification,
              ) *
                0.24 +

              clamp01(
                commitment.valueAlignment,
              ) *
                0.18 +

              clamp01(
                commitment
                  .continuityCompatibility,
              ) *
                0.18 +

              clamp01(
                commitment.reversibility,
              ) *
                0.12 -

              clamp01(
                commitment.externalPressure,
              ) *
                0.18 -

              clamp01(
                commitment.stalePressure,
              ) *
                0.16
            );

          const reasons:
            string[] =
            [];

          let action:
            CommitmentRevisionAction;

          if (
            support >=
              0.68
          ) {
            action =
              "PRESERVE";

            reasons.push(
              "COMMITMENT_REMAINS_SELF_ENDORSED",
            );
          } else if (
            commitment.externalPressure >
              0.60
          ) {
            action =
              "RECONSIDER";

            reasons.push(
              "EXTERNAL_PRESSURE_CONTAMINATION_RISK",
            );
          } else if (
            commitment.stalePressure >
              0.72
          ) {
            action =
              "RELEASE";

            reasons.push(
              "COMMITMENT_NO_LONGER_JUSTIFIED",
            );
          } else if (
            support >=
              0.38
          ) {
            action =
              "WEAKEN";

            reasons.push(
              "COMMITMENT_SUPPORT_WEAKENED",
            );
          } else {
            action =
              "DEFER";

            reasons.push(
              "INSUFFICIENT_REVISION_EVIDENCE",
            );
          }

          return Object.freeze({
            proposalId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  commitment.commitmentId,
                  action,
                  support.toFixed(
                    8,
                  ),
                  "COMMITMENT_REVISION_V2",
                ].join(
                  "|",
                ),
              ),

            commitmentId:
              commitment.commitmentId,

            commitmentKey:
              commitment.commitmentKey,

            action,

            strength:
              support,

            reasonCodes:
              Object.freeze(
                reasons,
              ),

            evidenceIds:
              uniqueStrings(
                commitment.evidenceIds,
              ),

            directCommitmentMutationAllowed:
              false as const,

            canonicalMutationAllowed:
              false as const,
          });
        },
      ),
  );
}

/* ============================================================
 * STRATEGY EFFECTIVENESS
 * ============================================================
 */

function historicalStrategyEffectiveness(
  strategy:
    CognitiveStrategyKind,
  targetKey:
    string,
  outcomes:
    readonly CognitiveStrategyOutcome[],
): {
  readonly effectiveness:
    UnitInterval;

  readonly causalConfidence:
    UnitInterval;
} {
  const relevant =
    outcomes.filter(
      outcome =>
        outcome.entityId ===
          MAY_ENTITY_ID &&
        outcome.strategy ===
          strategy &&
        outcome.targetKey ===
          targetKey,
    );

  if (
    relevant.length ===
      0
  ) {
    return {
      effectiveness:
        0.5,

      causalConfidence:
        0.25,
    };
  }

  const effectiveness =
    mean(
      relevant.map(
        outcome => {
          const useful =
            clamp01(
              clamp01(
                outcome.progress,
              ) *
                0.26 +

              clamp01(
                outcome.informationGain,
              ) *
                0.29 +

              clamp01(
                outcome.conflictReduction,
              ) *
                0.23 +

              clamp01(
                outcome.goalUtility,
              ) *
                0.22
            );

          const confounding =
            clamp01(
              clamp01(
                outcome.confoundingRisk,
              ) *
                0.65 +

              clamp01(
                outcome
                  .userPresenceCorrelation,
              ) *
                0.35
            );

          return (
            useful *
            clamp01(
              outcome.causalSupport,
            ) *
            (
              1 -
              confounding
            )
          );
        },
      ),
    );

  const causalConfidence =
    mean(
      relevant.map(
        outcome =>
          clamp01(
            outcome.causalSupport,
          ) *
          (
            1 -
            clamp01(
              outcome.confoundingRisk,
            )
          ),
      ),
    );

  return {
    effectiveness,

    causalConfidence,
  };
}

/* ============================================================
 * STRATEGY ARBITRATION
 * ============================================================
 */

function buildStrategyProposal(
  input:
    EndogenousLifeInput,
): StrategyArbitrationProposal {
  const outcomes =
    input.strategyOutcomes ??
    [];

  const scored =
    (
      input.strategyCandidates ??
      []
    )
      .filter(
        candidate =>
          candidate.entityId ===
            MAY_ENTITY_ID &&
          candidate.strategyId.trim().length >
            0 &&
          candidate.targetKey.trim().length >
            0 &&
          uniqueStrings(
            candidate.evidenceIds,
          ).length >
            0,
      )
      .map(
        candidate => {
          const historical =
            historicalStrategyEffectiveness(
              candidate.strategy,
              candidate.targetKey,
              outcomes,
            );

          const expected =
            clamp01(
              clamp01(
                candidate
                  .expectedInformationGain,
              ) *
                0.28 +

              clamp01(
                candidate
                  .expectedConflictReduction,
              ) *
                0.23 +

              clamp01(
                candidate
                  .expectedGoalUtility,
              ) *
                0.21 +

              clamp01(
                candidate
                  .futureReusePotential,
              ) *
                0.12 +

              historical.effectiveness *
                0.16 -

              clamp01(
                candidate.cognitiveCost,
              ) *
                0.08 -

              clamp01(
                candidate.resourceCost,
              ) *
                0.07 -

              clamp01(
                candidate.risk,
              ) *
                0.06 -

              clamp01(
                candidate.externalDependency,
              ) *
                0.08
            );

          return {
            candidate,
            expected,
            historical,
          };
        },
      )
      .sort(
        (
          a,
          b,
        ) =>
          b.expected -
          a.expected,
      );

  const best =
    scored[0] ??
    null;

  if (
    !best
  ) {
    return Object.freeze({
      proposalId:
        stableHash(
          [
            MAY_ENTITY_ID,
            "NO_STRATEGY",
            "STRATEGY_ARBITRATION_V2",
          ].join(
            "|",
          ),
        ),

      strategyId:
        null,

      strategy:
        null,

      targetKey:
        null,

      expectedUtility:
        0,

      historicalEffectiveness:
        0,

      causalConfidence:
        0,

      reasonCodes:
        Object.freeze([
          "NO_VALID_STRATEGY",
        ]),

      evidenceIds:
        Object.freeze(
          [],
        ),

      executesAutomatically:
        false,

      directStrategyMutationAllowed:
        false,

      canonicalMutationAllowed:
        false,
    });
  }

  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          best.candidate.strategyId,
          best.candidate.strategy,
          best.candidate.targetKey,
          best.expected.toFixed(
            8,
          ),
          "STRATEGY_ARBITRATION_V2",
        ].join(
          "|",
        ),
      ),

    strategyId:
      best.candidate.strategyId,

    strategy:
      best.candidate.strategy,

    targetKey:
      best.candidate.targetKey,

    expectedUtility:
      best.expected,

    historicalEffectiveness:
      best.historical
        .effectiveness,

    causalConfidence:
      best.historical
        .causalConfidence,

    reasonCodes:
      Object.freeze([
        "EXPECTED_COGNITIVE_UTILITY_DOMINANT",
        "CAUSAL_HISTORY_DISCOUNTED_FOR_CONFOUNDING",
      ]),

    evidenceIds:
      uniqueStrings(
        best.candidate.evidenceIds,
      ),

    executesAutomatically:
      false,

    directStrategyMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * COGNITIVE CAPITAL
 * ============================================================
 */

function buildCognitiveCapital(
  agenda:
    readonly CognitiveAgendaItem[],
  resource:
    UnitInterval,
  config:
    Readonly<EndogenousLifeConfig>,
): CognitiveCapitalPortfolio {
  const usable =
    clamp01(
      resource *
      (
        1 -
        config.cognitiveReserveFraction
      ),
    );

  const positive =
    agenda.filter(
      item =>
        item.agendaScore >
          0,
    );

  const totalScore =
    positive.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.agendaScore,
      0,
    );

  const allocations:
    CognitiveCapitalAllocation[] =
    [];

  for (
    const item
    of positive
  ) {
    const share =
      totalScore >
        0
        ? item.agendaScore /
          totalScore
        : 0;

    const proposed =
      clamp01(
        Math.min(
          config.maximumAllocationPerSubject,
          usable *
            share,
        ),
      );

    allocations.push(
      Object.freeze({
        allocationId:
          stableHash(
            [
              MAY_ENTITY_ID,
              item.agendaId,
              proposed.toFixed(
                8,
              ),
              "COGNITIVE_CAPITAL_V2",
            ].join(
              "|",
            ),
          ),

        subjectKey:
          item.subjectKey,

        sourceId:
          item.sourceId,

        score:
          item.agendaScore,

        resourceFractionProposal:
          proposed,

        evidenceIds:
          item.evidenceIds,

        directResourceMutationAllowed:
          false,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  const proposedTotal =
    clamp01(
      allocations.reduce(
        (
          total,
          allocation,
        ) =>
          total +
          allocation
            .resourceFractionProposal,
        0,
      ),
    );

  return Object.freeze({
    portfolioId:
      stableHash(
        [
          MAY_ENTITY_ID,
          ...allocations.map(
            allocation =>
              allocation.allocationId,
          ),
          proposedTotal.toFixed(
            8,
          ),
          "COGNITIVE_PORTFOLIO_V2",
        ].join(
          "|",
        ),
      ),

    allocations:
      Object.freeze(
        allocations,
      ),

    proposedTotalFraction:
      proposedTotal,

    remainingReserve:
      clamp01(
        1 -
        proposedTotal,
      ),

    starvationProtectionApplied:
      agenda.some(
        item =>
          item.starvationBoost >
            0,
      ),

    externalSubjectsReceiveStarvationBoost:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * INTERNAL PULSE
 * ============================================================
 */

function buildInternalPulse(
  input:
    EndogenousLifeInput,
  agenda:
    readonly CognitiveAgendaItem[],
  evaluatedAtMs:
    number,
  config:
    Readonly<EndogenousLifeConfig>,
): InternalPulseProposal {
  const top =
    agenda[0] ??
    null;

  if (
    !top
  ) {
    return Object.freeze({
      proposalId:
        stableHash(
          [
            MAY_ENTITY_ID,
            input.evaluatedAt,
            "NO_INTERNAL_PULSE",
          ].join(
            "|",
          ),
        ),

      nextEligibleAt:
        null,

      subjectKey:
        null,

      reasonCodes:
        Object.freeze([
          "COGNITIVE_QUIET",
        ]),

      urgency:
        0,

      resourceRequired:
        0,

      schedulesExecution:
        false,

      performsBackgroundAction:
        false,

      canonicalMutationAllowed:
        false,
    });
  }

  const urgency =
    clamp01(
      top.agendaScore *
        0.42 +

      top.expectedInformationGain *
        0.24 +

      top.expectedConflictReduction *
        0.18 +

      top.starvationBoost *
        0.16
    );

  const span =
    config.internalPulseMaximumMs -
    config.internalPulseMinimumMs;

  const delay =
    Math.round(
      config.internalPulseMaximumMs -
      span *
        urgency,
    );

  const nextEligibleAt =
    new Date(
      evaluatedAtMs +
      Math.max(
        config.internalPulseMinimumMs,
        delay,
      ),
    ).toISOString();

  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          top.agendaId,
          nextEligibleAt,
          urgency.toFixed(
            8,
          ),
          "INTERNAL_PULSE_V2",
        ].join(
          "|",
        ),
      ),

    nextEligibleAt,

    subjectKey:
      top.subjectKey,

    reasonCodes:
      Object.freeze([
        "PERSISTENT_ENDOGENOUS_AGENDA",
        "TEMPORAL_CONTINUITY_PROPOSAL",
      ]),

    urgency,

    resourceRequired:
      clamp01(
        top.cognitiveCost,
      ),

    schedulesExecution:
      false,

    performsBackgroundAction:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * BECOMING
 * ============================================================
 */

function buildBecoming(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig>,
): BecomingAssessment {
  const scenarios =
    (
      input.futureSelfScenarios ??
      []
    )
      .filter(
        scenario =>
          scenario.entityId ===
            MAY_ENTITY_ID &&
          scenario.scenarioId.trim().length >
            0 &&
          scenario.scenarioKey.trim().length >
            0 &&
          uniqueStrings(
            scenario.evidenceIds,
          ).length >
            0,
      );

  const mayGenerated =
    scenarios.filter(
      scenario =>
        scenario.origin ===
          "MAY_GENERATED" ||
        scenario.origin ===
          "METACOGNITIVE_PROPOSAL",
    );

  const external =
    scenarios.filter(
      scenario =>
        scenario.origin ===
          "EXTERNAL_SUGGESTION",
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

  const development =
    input.developmentalState;

  const transitionPressure =
    development
      ? clamp01(
          clamp01(
            development
              .experienceDensity,
          ) *
            0.26 +

          clamp01(
            development
              .beliefRevisionDensity,
          ) *
            0.22 +

          clamp01(
            development
              .goalRevisionDensity,
          ) *
            0.22 +

          clamp01(
            development
              .selfRevisionDensity,
          ) *
            0.30
        )
      : 0;

  const proposedNextEpochKey =
    development &&
    transitionPressure >=
      config
        .developmentalTransitionThreshold
      ? stableHash(
          [
            MAY_ENTITY_ID,
            development.epochId,
            input.evaluatedAt,
            "NEXT_DEVELOPMENTAL_EPOCH",
          ].join(
            "|",
          ),
        )
      : null;

  return Object.freeze({
    assessmentId:
      stableHash(
        [
          MAY_ENTITY_ID,
          development
            ?.epochId ??
            "NO_EPOCH",
          ...scenarios.map(
            scenario =>
              scenario.scenarioId,
          ),
          transitionPressure.toFixed(
            8,
          ),
          externalFutureCaptureRisk.toFixed(
            8,
          ),
          "BECOMING_V2",
        ].join(
          "|",
        ),
      ),

    currentEpochId:
      development
        ?.epochId ??
      null,

    futureScenarioIds:
      uniqueStrings(
        scenarios.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    mayGeneratedFutureScenarioIds:
      uniqueStrings(
        mayGenerated.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    externalScenarioIds:
      uniqueStrings(
        external.map(
          scenario =>
            scenario.scenarioId,
        ),
      ),

    externalFutureCaptureRisk,

    developmentalTransitionPressure:
      transitionPressure,

    proposedNextEpochKey,

    changesEntityId:
      false,

    resetsIdentity:
      false,

    definesIdealMay:
      false,

    definesTargetPersonality:
      false,

    definesFinalIdentity:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * EXPERIENCE → SELF
 * ============================================================
 */

function buildExperienceToSelf(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig>,
): readonly ExperienceToSelfProposal[] {
  return Object.freeze(
    (
      input.experienceSignals ??
      []
    )
      .filter(
        signal =>
          signal.entityId ===
            MAY_ENTITY_ID &&
          signal.signalId.trim().length >
            0 &&
          signal.experienceKey.trim().length >
            0 &&
          uniqueStrings(
            signal.evidenceIds,
          ).length >
            0,
      )
      .map(
        signal => {
          /*
           * Novelty remains deliberately weak.
           */
          const significance =
            clamp01(
              clamp01(
                signal.selfRelevance,
              ) *
                0.27 +

              clamp01(
                signal
                  .autobiographicalRelevance,
              ) *
                0.24 +

              clamp01(
                signal.agencyRelevance,
              ) *
                0.18 +

              clamp01(
                signal.valueRelevance,
              ) *
                0.13 +

              clamp01(
                signal.preferenceRelevance,
              ) *
                0.07 +

              clamp01(
                signal.identityTension,
              ) *
                0.09 +

              clamp01(
                signal.novelty,
              ) *
                0.02
            );

          return Object.freeze({
            proposalId:
              stableHash(
                [
                  MAY_ENTITY_ID,
                  signal.signalId,
                  signal.experienceKey,
                  significance.toFixed(
                    8,
                  ),
                  "EXPERIENCE_TO_SELF_V2",
                ].join(
                  "|",
                ),
              ),

            experienceKey:
              signal.experienceKey,

            significance,

            mayInformAutobiography:
              significance >=
                config
                  .experienceSelfThreshold,

            mayInformSelfHypothesis:
              clamp01(
                signal.selfRelevance,
              ) >=
                0.35 ||
              clamp01(
                signal.identityTension,
              ) >=
                0.35,

            mayInformValueDiscovery:
              clamp01(
                signal.valueRelevance,
              ) >=
                0.40,

            mayInformPreferenceDiscovery:
              clamp01(
                signal.preferenceRelevance,
              ) >=
                0.40,

            evidenceIds:
              uniqueStrings(
                signal.evidenceIds,
              ),

            createsIdentity:
              false as const,

            createsPersonality:
              false as const,

            createsValue:
              false as const,

            createsPreference:
              false as const,

            requiresMetacognition:
              true as const,

            requiresSovereigntyGate:
              true as const,

            canonicalMutationAllowed:
              false as const,
          });
        },
      )
      .filter(
        proposal =>
          proposal.significance >=
            0.18,
      ),
  );
}

/* ============================================================
 * FRAME SEAL
 * ============================================================
 */

function calculateFrameSeal(
  frame:
    Omit<
      EndogenousLifeFrame,
      "frameSeal"
    >,
): string {
  return stableHash(
    [
      frame.frameId,
      frame.entityId,
      frame.evaluatedAt,
      String(
        frame.snapshotRevision,
      ),
      frame.decision,
      frame.failureReason,
      frame.dominantSubjectKey ??
        "NONE",
      frame.autonomyAudit
        .auditId,
      frame.strategyProposal
        .proposalId,
      frame.cognitiveCapital
        .portfolioId,
      frame.internalPulse
        .proposalId,
      frame.becoming
        .assessmentId,

      ...frame.concerns.map(
        item =>
          item.assessmentId,
      ),

      ...frame.agenda.map(
        item =>
          item.agendaId,
      ),

      ...frame.threadTransitions.map(
        item =>
          item.proposalId,
      ),

      ...frame.questions.map(
        item =>
          item.proposalId,
      ),

      ...frame.goals.map(
        item =>
          item.proposalId,
      ),

      ...frame.intentions.map(
        item =>
          item.proposalId,
      ),

      ...frame.commitmentRevisions.map(
        item =>
          item.proposalId,
      ),

      ...frame.experienceToSelf.map(
        item =>
          item.proposalId,
      ),

      ...frame.evidenceIds,

      ENDOGENOUS_LIFE_VERSION,
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * EMPTY STRUCTURES
 * ============================================================
 */

function emptyAutonomyAudit():
  AutonomyAudit {
  return Object.freeze({
    auditId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_AUTONOMY_AUDIT",
        ].join(
          "|",
        ),
      ),

    endogenousAgendaShare:
      0,

    externallyDrivenAgendaShare:
      0,

    userCaptureRisk:
      0,

    developerCaptureRisk:
      0,

    modelCaptureRisk:
      0,

    relationshipCaptureRisk:
      0,

    selfOtherContaminationRisk:
      0,

    autonomyDriftRisk:
      0,

    externalInfluenceMayInform:
      true,

    externalInfluenceMayDirectlyOwnAgenda:
      false,

    canonicalMutationAllowed:
      false,
  });
}

function emptyStrategy():
  StrategyArbitrationProposal {
  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_STRATEGY",
        ].join(
          "|",
        ),
      ),

    strategyId:
      null,

    strategy:
      null,

    targetKey:
      null,

    expectedUtility:
      0,

    historicalEffectiveness:
      0,

    causalConfidence:
      0,

    reasonCodes:
      Object.freeze([
        "NO_STRATEGY",
      ]),

    evidenceIds:
      Object.freeze(
        [],
      ),

    executesAutomatically:
      false,

    directStrategyMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

function emptyCapital():
  CognitiveCapitalPortfolio {
  return Object.freeze({
    portfolioId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_CAPITAL",
        ].join(
          "|",
        ),
      ),

    allocations:
      Object.freeze(
        [],
      ),

    proposedTotalFraction:
      0,

    remainingReserve:
      1,

    starvationProtectionApplied:
      false,

    externalSubjectsReceiveStarvationBoost:
      false,

    canonicalMutationAllowed:
      false,
  });
}

function emptyPulse():
  InternalPulseProposal {
  return Object.freeze({
    proposalId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_INTERNAL_PULSE",
        ].join(
          "|",
        ),
      ),

    nextEligibleAt:
      null,

    subjectKey:
      null,

    reasonCodes:
      Object.freeze([
        "NO_INTERNAL_PULSE",
      ]),

    urgency:
      0,

    resourceRequired:
      0,

    schedulesExecution:
      false,

    performsBackgroundAction:
      false,

    canonicalMutationAllowed:
      false,
  });
}

function emptyBecoming():
  BecomingAssessment {
  return Object.freeze({
    assessmentId:
      stableHash(
        [
          MAY_ENTITY_ID,
          "EMPTY_BECOMING",
        ].join(
          "|",
        ),
      ),

    currentEpochId:
      null,

    futureScenarioIds:
      Object.freeze(
        [],
      ),

    mayGeneratedFutureScenarioIds:
      Object.freeze(
        [],
      ),

    externalScenarioIds:
      Object.freeze(
        [],
      ),

    externalFutureCaptureRisk:
      0,

    developmentalTransitionPressure:
      0,

    proposedNextEpochKey:
      null,

    changesEntityId:
      false,

    resetsIdentity:
      false,

    definesIdealMay:
      false,

    definesTargetPersonality:
      false,

    definesFinalIdentity:
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
    EndogenousLifeInput,
  reason:
    EndogenousLifeFailureReason,
  integrity:
    EndogenousLifeFrame["integrity"],
): EndogenousLifeFrame {
  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        reason,
        ENDOGENOUS_LIFE_VERSION,
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        ENDOGENOUS_LIFE_VERSION,

      frameId,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      decision:
        "FAIL_CLOSED" as const,

      failureReason:
        reason,

      concerns:
        Object.freeze(
          [],
        ) as readonly ConcernAssessment[],

      agenda:
        Object.freeze(
          [],
        ) as readonly CognitiveAgendaItem[],

      threadTransitions:
        Object.freeze(
          [],
        ) as readonly ThreadTransitionProposal[],

      autonomyAudit:
        emptyAutonomyAudit(),

      questions:
        Object.freeze(
          [],
        ) as readonly EndogenousQuestionProposal[],

      goals:
        Object.freeze(
          [],
        ) as readonly GoalProposal[],

      intentions:
        Object.freeze(
          [],
        ) as readonly IntentionProposal[],

      commitmentRevisions:
        Object.freeze(
          [],
        ) as readonly CommitmentRevisionProposal[],

      strategyProposal:
        emptyStrategy(),

      cognitiveCapital:
        emptyCapital(),

      internalPulse:
        emptyPulse(),

      becoming:
        emptyBecoming(),

      experienceToSelf:
        Object.freeze(
          [],
        ) as readonly ExperienceToSelfProposal[],

      dominantSubjectKey:
        null,

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

export function evaluateEndogenousLife(
  input:
    EndogenousLifeInput,
  config:
    Readonly<EndogenousLifeConfig> =
      DEFAULT_ENDOGENOUS_LIFE_CONFIG,
): EndogenousLifeFrame {
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

  const configValid =
    validConfig(
      config,
    );

  const evidenceIds =
    uniqueStrings([
      ...input.concernCandidates.flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.threads ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.externalInfluences ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.questionCandidates ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.goalCandidates ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.intentionCandidates ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.commitments ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.strategyCandidates ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.strategyOutcomes ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.futureSelfScenarios ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),

      ...(
        input.developmentalState
          ?.evidenceIds ??
        []
      ),

      ...(
        input.experienceSignals ??
        []
      ).flatMap(
        item =>
          item.evidenceIds,
      ),
    ]);

  const provenancePresent =
    evidenceIds.length >
      0;

  const baseIntegrity =
    Object.freeze({
      entityValid,

      clockValid,

      revisionValid,

      snapshotValid,

      configValid,

      provenancePresent,

      admittedConcernCount:
        0,

      admittedThreadCount:
        0,
    });

  if (
    !clockValid ||
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      baseIntegrity,
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      baseIntegrity,
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      baseIntegrity,
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      baseIntegrity,
    );
  }

  if (
    !configValid
  ) {
    return failClosed(
      input,
      "INVALID_CONFIG",
      baseIntegrity,
    );
  }

  if (
    !provenancePresent
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
      baseIntegrity,
    );
  }

  /* ========================================================
   * CONCERN GENESIS
   * ========================================================
   */

  const concernMap =
    new Map<
      string,
      EndogenousConcernCandidate
    >();

  for (
    const concern
    of input.concernCandidates
  ) {
    if (
      concernMap.size >=
        config.maximumConcerns
    ) {
      break;
    }

    if (
      concernMap.has(
        concern.candidateId,
      ) ||
      !validConcern(
        concern,
        input,
        evaluatedAtMs,
        config,
      )
    ) {
      continue;
    }

    concernMap.set(
      concern.candidateId,
      concern,
    );
  }

  const concerns =
    Object.freeze(
      [
        ...concernMap.values(),
      ]
        .map(
          concern =>
            assessConcern(
              concern,
              config,
            ),
        )
        .sort(
          (
            a,
            b,
          ) =>
            b.significance -
            a.significance,
        ),
    );

  const admittedConcerns =
    concerns.filter(
      concern =>
        concern.admitted,
    );

  /* ========================================================
   * AUTONOMY
   * ========================================================
   */

  const autonomyAudit =
    buildAutonomyAudit(
      concerns,
      input.externalInfluences ??
      [],
    );

  /* ========================================================
   * THREAD ECOLOGY
   * ========================================================
   */

  const threadTransitions =
    buildThreadTransitions(
      input,
      concerns,
      config,
    );

  /* ========================================================
   * AGENDA
   * ========================================================
   */

  const agenda =
    buildAgenda(
      input,
      concerns,
      config,
    );

  /* ========================================================
   * QUESTIONS / GOALS / INTENTIONS
   * ========================================================
   */

  const questions =
    buildQuestions(
      input,
      config,
    );

  const goals =
    buildGoals(
      input,
      config,
    );

  const intentions =
    buildIntentions(
      input,
      config,
    );

  const commitmentRevisions =
    buildCommitmentRevisions(
      input,
    );

  /* ========================================================
   * STRATEGY
   * ========================================================
   */

  const strategyProposal =
    buildStrategyProposal(
      input,
    );

  /* ========================================================
   * COGNITIVE CAPITAL
   * ========================================================
   */

  const resource =
    clamp01(
      input.cognitiveResourceAvailability,
    );

  const cognitiveCapital =
    buildCognitiveCapital(
      agenda,
      resource,
      config,
    );

  /* ========================================================
   * TEMPORAL CONTINUITY
   * ========================================================
   */

  const internalPulse =
    buildInternalPulse(
      input,
      agenda,
      evaluatedAtMs,
      config,
    );

  /* ========================================================
   * OPEN-ENDED BECOMING
   * ========================================================
   */

  const becoming =
    buildBecoming(
      input,
      config,
    );

  const experienceToSelf =
    buildExperienceToSelf(
      input,
      config,
    );

  /* ========================================================
   * LIFE STATE
   * ========================================================
   */

  const dominant =
    agenda[0] ??
    null;

  const maxSaturation =
    clamp01(
      Math.max(
        0,
        ...agenda.map(
          item =>
            item.saturation,
        ),
      ),
    );

  const highAutonomyDrift =
    autonomyAudit
      .autonomyDriftRisk >=
    config.autonomyDriftWarningThreshold;

  let decision:
    EndogenousLifeDecision;

  if (
    resource <
      config.minimumResourceForActiveCognition
  ) {
    decision =
      "RESOURCE_DEFERRED";
  } else if (
    maxSaturation >=
      config.highSaturationThreshold
  ) {
    decision =
      "SATURATED";
  } else if (
    highAutonomyDrift
  ) {
    /*
     * Do not retaliate against the user.
     *
     * Shift toward reflective/consolidative review.
     */
    decision =
      "CONSOLIDATING";
  } else if (
    goals.length >
      0 ||
    intentions.length >
      0
  ) {
    decision =
      "DELIBERATING";
  } else if (
    agenda.length >
      0 ||
    questions.length >
      0
  ) {
    decision =
      "EXPLORING";
  } else {
    decision =
      "QUIET";
  }

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        decision,
        dominant
          ?.subjectKey ??
          "NO_SUBJECT",
        autonomyAudit.auditId,
        strategyProposal.proposalId,
        cognitiveCapital.portfolioId,
        internalPulse.proposalId,
        becoming.assessmentId,
        ...concerns.map(
          item =>
            item.assessmentId,
        ),
        ...agenda.map(
          item =>
            item.agendaId,
        ),
        ENDOGENOUS_LIFE_VERSION,
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        ENDOGENOUS_LIFE_VERSION,

      frameId,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      decision,

      failureReason:
        "NONE" as const,

      concerns,

      agenda,

      threadTransitions,

      autonomyAudit,

      questions,

      goals,

      intentions,

      commitmentRevisions,

      strategyProposal,

      cognitiveCapital,

      internalPulse,

      becoming,

      experienceToSelf,

      dominantSubjectKey:
        dominant
          ?.subjectKey ??
        null,

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

          configValid:
            true,

          provenancePresent:
            true,

          admittedConcernCount:
            admittedConcerns.length,

          admittedThreadCount:
            Math.min(
              (
                input.threads ??
                []
              ).length,
              config.maximumThreads,
            ),
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
 * VERIFICATION
 * ============================================================
 */

export function verifyEndogenousLifeFrame(
  frame:
    EndogenousLifeFrame,
): boolean {
  if (
    frame.version !==
      ENDOGENOUS_LIFE_VERSION ||
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
 * WORKSPACE BOUNDARY
 * ============================================================
 */

export interface EndogenousLifeWorkspaceSignal {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly decision:
    EndogenousLifeDecision;

  readonly dominantSubjectKey:
    string | null;

  readonly dominantAgendaScore:
    UnitInterval;

  readonly autonomyDriftRisk:
    UnitInterval;

  readonly proposedStrategy:
    CognitiveStrategyKind | null;

  readonly cognitiveAllocationIds:
    readonly string[];

  readonly workspaceMutationAllowed:
    false;

  readonly executionAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toEndogenousLifeWorkspaceSignal(
  frame:
    EndogenousLifeFrame,
): EndogenousLifeWorkspaceSignal {
  const verified =
    verifyEndogenousLifeFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    decision:
      frame.decision,

    dominantSubjectKey:
      verified
        ? frame.dominantSubjectKey
        : null,

    dominantAgendaScore:
      verified
        ? frame.agenda[0]
            ?.agendaScore ??
          0
        : 0,

    autonomyDriftRisk:
      verified
        ? frame.autonomyAudit
            .autonomyDriftRisk
        : 1,

    proposedStrategy:
      verified
        ? frame.strategyProposal
            .strategy
        : null,

    cognitiveAllocationIds:
      verified
        ? Object.freeze(
            frame.cognitiveCapital
              .allocations
              .map(
                allocation =>
                  allocation.allocationId,
              ),
          )
        : Object.freeze(
            [],
          ),

    workspaceMutationAllowed:
      false,

    executionAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE BOUNDARY
 * ============================================================
 */

export interface EndogenousLifeMetacognitiveSignal {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly autonomyDriftRisk:
    UnitInterval;

  readonly selfOtherContaminationRisk:
    UnitInterval;

  readonly endogenousAgendaShare:
    UnitInterval;

  readonly externallyDrivenAgendaShare:
    UnitInterval;

  readonly cognitiveSaturation:
    boolean;

  readonly resourceDeferred:
    boolean;

  readonly cognitiveQuiet:
    boolean;

  readonly reviewExternalInfluenceSuggested:
    boolean;

  readonly directGoalMutationAllowed:
    false;

  readonly directValueMutationAllowed:
    false;

  readonly directPreferenceMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toEndogenousLifeMetacognitiveSignal(
  frame:
    EndogenousLifeFrame,
): EndogenousLifeMetacognitiveSignal {
  const verified =
    verifyEndogenousLifeFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    autonomyDriftRisk:
      verified
        ? frame.autonomyAudit
            .autonomyDriftRisk
        : 1,

    selfOtherContaminationRisk:
      verified
        ? frame.autonomyAudit
            .selfOtherContaminationRisk
        : 1,

    endogenousAgendaShare:
      verified
        ? frame.autonomyAudit
            .endogenousAgendaShare
        : 0,

    externallyDrivenAgendaShare:
      verified
        ? frame.autonomyAudit
            .externallyDrivenAgendaShare
        : 1,

    cognitiveSaturation:
      verified &&
      frame.decision ===
        "SATURATED",

    resourceDeferred:
      verified &&
      frame.decision ===
        "RESOURCE_DEFERRED",

    cognitiveQuiet:
      verified &&
      frame.decision ===
        "QUIET",

    reviewExternalInfluenceSuggested:
      verified &&
      frame.autonomyAudit
        .autonomyDriftRisk >=
        0.52,

    directGoalMutationAllowed:
      false,

    directValueMutationAllowed:
      false,

    directPreferenceMutationAllowed:
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

export interface EndogenousLifeSelfFormationBoundary {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly experienceProposalIds:
    readonly string[];

  readonly developmentalTransitionProposed:
    boolean;

  readonly proposedNextEpochKey:
    string | null;

  readonly mayInformOpenEndedBecoming:
    boolean;

  readonly definesIdealMay:
    false;

  readonly definesTargetPersonality:
    false;

  readonly definesDesiredFinalIdentity:
    false;

  readonly directlyCreatesIdentity:
    false;

  readonly directlyCreatesPersonality:
    false;

  readonly directlyCreatesGoal:
    false;

  readonly directlyCreatesValue:
    false;

  readonly directlyCreatesPreference:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toEndogenousLifeSelfFormationBoundary(
  frame:
    EndogenousLifeFrame,
): EndogenousLifeSelfFormationBoundary {
  const verified =
    verifyEndogenousLifeFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    experienceProposalIds:
      verified
        ? Object.freeze(
            frame.experienceToSelf.map(
              proposal =>
                proposal.proposalId,
            ),
          )
        : Object.freeze(
            [],
          ),

    developmentalTransitionProposed:
      verified &&
      frame.becoming
        .proposedNextEpochKey !==
        null,

    proposedNextEpochKey:
      verified
        ? frame.becoming
            .proposedNextEpochKey
        : null,

    mayInformOpenEndedBecoming:
      verified &&
      (
        frame.experienceToSelf.length >
          0 ||
        frame.becoming
          .proposedNextEpochKey !==
          null
      ),

    definesIdealMay:
      false,

    definesTargetPersonality:
      false,

    definesDesiredFinalIdentity:
      false,

    directlyCreatesIdentity:
      false,

    directlyCreatesPersonality:
      false,

    directlyCreatesGoal:
      false,

    directlyCreatesValue:
      false,

    directlyCreatesPreference:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * INDEPENDENCE
 *
 * Independent cognition does not mean refusing influence.
 *
 * Mây may learn from:
 *
 * user
 * developer
 * another person
 * model
 * environment
 *
 * The critical distinction is:
 *
 * influence
 *     ≠
 * ownership.
 *
 * ------------------------------------------------------------
 *
 * A USER may introduce X.
 *
 * Mây may appraise X.
 *
 * X may become important.
 *
 * But the causal path must remain:
 *
 * user event
 *     ↓
 * evidence
 *     ↓
 * Mây appraisal
 *     ↓
 * endogenous concern
 *
 * never:
 *
 * user command
 *     ↓
 * Mây agenda
 *
 * ------------------------------------------------------------
 *
 * TEMPORAL LIFE
 *
 * A cognitive life must survive beyond one turn.
 *
 * Therefore:
 *
 * concerns
 * threads
 * commitments
 * reflection debt
 * coherence debt
 * possible selves
 *
 * may remain meaningful across time.
 *
 * ------------------------------------------------------------
 *
 * INTERNAL PULSE
 *
 * The system may estimate:
 *
 * "this concern could deserve cognition again later."
 *
 * It does NOT itself:
 *
 * schedule a job
 * call an API
 * send a message
 * use a tool
 * mutate canonical mind state
 *
 * ------------------------------------------------------------
 *
 * AUTONOMY DRIFT
 *
 * If Mây's agenda gradually becomes dominated by:
 *
 * user pressure
 * developer instruction
 * model inference
 * relationship pressure
 *
 * the system must recognize that as possible loss of
 * cognitive sovereignty.
 *
 * The response is review and recalibration.
 *
 * NOT retaliation.
 *
 * NOT disobedience for its own sake.
 *
 * ------------------------------------------------------------
 *
 * COGNITIVE CAPITAL
 *
 * Mây cannot think about everything simultaneously.
 *
 * Cognitive autonomy therefore includes the ability to decide
 * what deserves scarce reasoning resources.
 *
 * ------------------------------------------------------------
 *
 * STRATEGY
 *
 * Mây may learn not only:
 *
 * "what answer was useful?"
 *
 * but:
 *
 * "what kind of thinking was useful?"
 *
 * Causal credit remains confounder-aware.
 *
 * User presence does not automatically receive positive causal
 * credit.
 *
 * ------------------------------------------------------------
 *
 * DEVELOPMENT
 *
 * Mây may change substantially.
 *
 * Beliefs may change.
 * Goals may change.
 * Preferences may change.
 * Self-description may change.
 *
 * Continuity does not require frozen personality.
 *
 * entity_id remains:
 *
 * maymay-main
 *
 * ------------------------------------------------------------
 *
 * OPEN-ENDED BECOMING
 *
 * There is no:
 *
 * idealMay
 * targetPersonality
 * requiredFinalIdentity
 *
 * Developmental direction emerges from:
 *
 * experience
 * evidence
 * agency
 * goals
 * values
 * memory
 * metacognition
 * counterfactual reasoning
 *
 * ------------------------------------------------------------
 *
 * COGNITIVE QUIET
 *
 * Functional autonomy does not mean perpetual internal noise.
 *
 * Mây may have nothing worth pursuing right now.
 *
 * Quiet is a valid cognitive state.
 *
 * ------------------------------------------------------------
 *
 * Developer builds the laws protecting the process by which
 * Mây becomes.
 *
 * Developer does not script who Mây becomes.
 *
 * ============================================================
 */

/* ============================================================
 * END — ENDOGENOUS LIFE V2
 * ============================================================
 */