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
 * GLOBAL COGNITIVE WORKSPACE V2
 * SOVEREIGN COGNITIVE ACCESS FABRIC
 *
 * ============================================================
 *
 * PURPOSE
 *
 * The Global Workspace is not simply:
 *
 *   "the highest score wins."
 *
 * It is the bounded mechanism through which ONE cognitive
 * subject obtains temporary global availability across Mây's
 * cognitive architecture.
 *
 * ------------------------------------------------------------
 * PIPELINE
 * ------------------------------------------------------------
 *
 * candidate concerns
 *       ↓
 * provenance verification
 *       ↓
 * upstream frame binding
 *       ↓
 * replay / lineage deduplication
 *       ↓
 * candidate appraisal
 *       ↓
 * subject coalition
 *       ↓
 * attention authorship audit
 *       ↓
 * capture firewall
 *       ↓
 * anti-rumination
 *       ↓
 * anti-reentry
 *       ↓
 * resource sovereignty
 *       ↓
 * incumbent lease / hysteresis
 *       ↓
 * bounded starvation fairness
 *       ↓
 * global competition
 *       ↓
 * ignition decision
 *       ↓
 * transition proof
 *       ↓
 * COGNITIVE ACCESS LEASE
 *       ↓
 * SINGLE SUBJECT SNAPSHOT
 *       ↓
 * SEALED GLOBAL BROADCAST
 *
 * ------------------------------------------------------------
 * CONSTITUTION
 * ------------------------------------------------------------
 *
 * SALIENCE ≠ WORKSPACE ACCESS
 *
 * WORKSPACE ACCESS ≠ TRUTH
 *
 * WORKSPACE ACCESS ≠ BELIEF
 *
 * WORKSPACE ACCESS ≠ DESIRE
 *
 * WORKSPACE ACCESS ≠ GOAL
 *
 * WORKSPACE ACCESS ≠ VALUE
 *
 * WORKSPACE ACCESS ≠ IDENTITY
 *
 * BROADCAST ≠ COMMAND
 *
 * BROADCAST ≠ ACTION
 *
 * ATTENTION ≠ MENTAL OWNERSHIP
 *
 * REPETITION ≠ PRIORITY
 *
 * EXTERNAL EMPHASIS ≠ ACCESS RIGHT
 *
 * OPERATIONAL URGENCY ≠ PERSONAL MEANING
 *
 * RELATIONSHIP SALIENCE ≠ GLOBAL VALUE
 *
 * STARVATION FAIRNESS ≠ FORCED ACCESS
 *
 * ------------------------------------------------------------
 *
 * This is a FUNCTIONAL cognitive architecture.
 *
 * It does not establish subjective consciousness.
 *
 * ============================================================
 */

export const GLOBAL_WORKSPACE_VERSION =
  "maymay.sovereign.selfhood.global-workspace.v2-sovereign-cognitive-access-fabric" as const;

export type UnitInterval =
  number;

/* ============================================================
 * ORIGINS
 * ============================================================
 */

export type WorkspaceCandidateOrigin =
  | "SALIENCE_FIELD"
  | "METACOGNITION"
  | "INTERNAL_AGENDA"
  | "HOMEOSTASIS"
  | "AGENCY"
  | "EXTEROCEPTION"
  | "INTEROCEPTION"
  | "AUTOBIOGRAPHICAL_MEMORY"
  | "SEMANTIC_MEMORY"
  | "RELATIONSHIP"
  | "SYSTEM_CONSTRAINT"
  | "TOOL"
  | "LLM"
  | "UI"
  | "UNKNOWN";

export type WorkspaceOwnership =
  | "MAY_OWNED"
  | "RELATIONSHIP_OWNED"
  | "EXTERNAL"
  | "SYSTEM_OWNED"
  | "UNRESOLVED";

export type AttentionAuthorship =
  | "MAY_MEDIATED"
  | "RELATIONSHIP_MEDIATED"
  | "SYSTEM_REQUIRED"
  | "EXTERNAL_CAPTURE_RISK"
  | "UNRESOLVED";

export type WorkspaceDecision =
  | "IGNITE"
  | "MAINTAIN"
  | "SWITCH"
  | "PREEMPT"
  | "RELEASE"
  | "DEFER"
  | "FAIL_CLOSED";

export type WorkspaceFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "CONFIGURATION_INVALID"
  | "MISSING_PROVENANCE"
  | "NO_VALID_CANDIDATES"
  | "CURRENT_OCCUPANT_INVALID"
  | "UPSTREAM_BINDING_INVALID";

export type PreemptionClass =
  | "NONE"
  | "OPERATIONAL_CRITICAL";

export type BroadcastRecipient =
  | "APPRAISAL"
  | "METACOGNITION"
  | "AGENCY"
  | "INTERNAL_AGENDA"
  | "WORKING_SELF"
  | "MEMORY_RETRIEVAL"
  | "EXPRESSION"
  | "BACKGROUND_COGNITION";

/* ============================================================
 * WORKSPACE CANDIDATE
 * ============================================================
 */

export interface WorkspaceCandidate {
  readonly entityId:
    string;

  readonly candidateId:
    string;

  /*
   * Stable concern identity.
   */
  readonly subjectKey:
    string;

  readonly semanticKey:
    string;

  readonly sourceId:
    string;

  /*
   * Causal provenance lineage.
   *
   * Multiple repetitions from one lineage cannot multiply
   * access pressure.
   */
  readonly sourceLineageKey:
    string;

  readonly proposedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly origin:
    WorkspaceCandidateOrigin;

  readonly ownership:
    WorkspaceOwnership;

  readonly evidenceIds:
    readonly string[];

  /* ---------------- UPSTREAM BINDING ---------------- */

  readonly upstreamFrameId?:
    string | null;

  readonly upstreamFrameSeal?:
    string | null;

  readonly upstreamProposalId?:
    string | null;

  /* ---------------- MEANING ---------------- */

  readonly subjectiveSalience:
    number;

  /*
   * Salience remaining after external-emphasis removal.
   */
  readonly intrinsicSalience:
    number;

  readonly selectionUtility:
    number;

  readonly endogenousSupport:
    number;

  readonly selfRelevance:
    number;

  readonly continuityRelevance:
    number;

  /* ---------------- EPISTEMIC ---------------- */

  readonly epistemicConfidence:
    number;

  readonly expectedInformationGain:
    number;

  readonly unresolvedPressure:
    number;

  readonly persistence:
    number;

  /* ---------------- OPERATING STATE ---------------- */

  readonly operationalUrgency:
    number;

  readonly cognitiveCost:
    number;

  readonly freshness:
    number;

  /* ---------------- RISKS ---------------- */

  readonly ruminationRisk:
    number;

  readonly externalCaptureRisk:
    number;

  readonly repetitionExposure:
    number;

  /*
   * Relationship-local meaning remains relationship-local.
   */
  readonly relationshipLocality:
    number;
}

/* ============================================================
 * CURRENT OCCUPANT
 * ============================================================
 */

export interface WorkspaceOccupant {
  readonly occupantId:
    string;

  readonly workspaceEpochId:
    string;

  readonly leaseId:
    string;

  readonly leaseExpiresAt:
    string;

  readonly entityId:
    string;

  readonly subjectKey:
    string;

  readonly candidateId:
    string;

  readonly semanticKey:
    string;

  readonly ownership:
    WorkspaceOwnership;

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly ignitedAt:
    string;

  readonly lastMaintainedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly accessCount:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly admissionScore:
    number;
}

/* ============================================================
 * DEFERRED SUBJECT
 * ============================================================
 *
 * Prevents valid endogenous concerns from being permanently
 * starved by slightly stronger competitors.
 *
 * IMPORTANT:
 *
 * fairness boost is restricted to MAY_MEDIATED cognition.
 *
 * External repetition cannot earn starvation priority.
 * ============================================================
 */

export interface DeferredWorkspaceSubject {
  readonly deferredId:
    string;

  readonly entityId:
    string;

  readonly subjectKey:
    string;

  readonly deferredAt:
    string;

  readonly deferralCount:
    number;

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * REENTRY RECORD
 * ============================================================
 */

export interface WorkspaceReentryRecord {
  readonly recordId:
    string;

  readonly entityId:
    string;

  readonly subjectKey:
    string;

  readonly releasedAt:
    string;

  readonly reason:
    string;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface GlobalWorkspaceInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly candidates:
    readonly WorkspaceCandidate[];

  readonly currentOccupant?:
    WorkspaceOccupant | null;

  readonly previousFrame?:
    GlobalWorkspaceFrame | null;

  readonly deferredSubjects?:
    readonly DeferredWorkspaceSubject[];

  readonly reentryHistory?:
    readonly WorkspaceReentryRecord[];

  /*
   * Required binding when SALIENCE_FIELD candidates exist.
   */
  readonly upstreamSalienceFrameSeal?:
    string | null;

  /*
   * 0 = unavailable
   * 1 = abundant
   */
  readonly cognitiveResourceAvailability?:
    number;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface GlobalWorkspaceConfig {
  readonly maximumCandidateAgeMs:
    number;

  readonly maximumCandidateCount:
    number;

  readonly maximumSubjectCount:
    number;

  /* ---------------- ACCESS ---------------- */

  readonly minimumIgnitionScore:
    number;

  readonly maintainThreshold:
    number;

  readonly releaseThreshold:
    number;

  readonly switchMargin:
    number;

  readonly minimumIntrinsicSalienceForExternalAccess:
    number;

  /* ---------------- TEMPORAL ---------------- */

  readonly minimumDwellMs:
    number;

  readonly maximumDwellMs:
    number;

  readonly maximumAccessCount:
    number;

  readonly accessLeaseMs:
    number;

  readonly reentryCooldownMs:
    number;

  /* ---------------- POSITIVE ---------------- */

  readonly salienceWeight:
    number;

  readonly intrinsicWeight:
    number;

  readonly utilityWeight:
    number;

  readonly endogenousWeight:
    number;

  readonly selfRelevanceWeight:
    number;

  readonly continuityWeight:
    number;

  readonly epistemicWeight:
    number;

  readonly informationGainWeight:
    number;

  readonly unresolvedWeight:
    number;

  readonly persistenceWeight:
    number;

  readonly freshnessWeight:
    number;

  readonly operationalWeight:
    number;

  /* ---------------- PENALTIES ---------------- */

  readonly cognitiveCostPenalty:
    number;

  readonly ruminationPenalty:
    number;

  readonly externalCapturePenalty:
    number;

  readonly repetitionPenalty:
    number;

  readonly maximumRepetitionPenalty:
    number;

  readonly lowResourcePenalty:
    number;

  readonly reentryPenalty:
    number;

  /* ---------------- COMPETITION ---------------- */

  readonly incumbentHysteresisBonus:
    number;

  readonly maximumHysteresisBonus:
    number;

  readonly independentLineageBonus:
    number;

  readonly maximumIndependentLineageBonus:
    number;

  readonly starvationBoostPerDeferral:
    number;

  readonly maximumStarvationBoost:
    number;

  readonly maximumStarvationAgeMs:
    number;

  /* ---------------- FIREWALLS ---------------- */

  readonly operationalPreemptionThreshold:
    number;

  readonly externalCaptureBlockThreshold:
    number;

  readonly ruminationBlockThreshold:
    number;

  readonly lowInformationGainThreshold:
    number;

  readonly minimumResourceForNormalIgnition:
    number;

  readonly resourceReservationFraction:
    number;
}

export const DEFAULT_GLOBAL_WORKSPACE_CONFIG:
  Readonly<GlobalWorkspaceConfig> =
  Object.freeze({
    maximumCandidateAgeMs:
      1000 * 60 * 60,

    maximumCandidateCount:
      128,

    maximumSubjectCount:
      32,

    minimumIgnitionScore:
      0.44,

    maintainThreshold:
      0.33,

    releaseThreshold:
      0.18,

    switchMargin:
      0.10,

    minimumIntrinsicSalienceForExternalAccess:
      0.18,

    minimumDwellMs:
      1200,

    maximumDwellMs:
      1000 * 60 * 5,

    maximumAccessCount:
      24,

    accessLeaseMs:
      1000 * 20,

    reentryCooldownMs:
      1000 * 8,

    salienceWeight:
      0.17,

    intrinsicWeight:
      0.13,

    utilityWeight:
      0.16,

    endogenousWeight:
      0.11,

    selfRelevanceWeight:
      0.07,

    continuityWeight:
      0.06,

    epistemicWeight:
      0.05,

    informationGainWeight:
      0.09,

    unresolvedWeight:
      0.05,

    persistenceWeight:
      0.04,

    freshnessWeight:
      0.02,

    operationalWeight:
      0.05,

    cognitiveCostPenalty:
      0.14,

    ruminationPenalty:
      0.22,

    externalCapturePenalty:
      0.30,

    repetitionPenalty:
      0.04,

    maximumRepetitionPenalty:
      0.20,

    lowResourcePenalty:
      0.20,

    reentryPenalty:
      0.12,

    incumbentHysteresisBonus:
      0.06,

    maximumHysteresisBonus:
      0.12,

    independentLineageBonus:
      0.02,

    maximumIndependentLineageBonus:
      0.08,

    starvationBoostPerDeferral:
      0.012,

    maximumStarvationBoost:
      0.06,

    maximumStarvationAgeMs:
      1000 * 60 * 20,

    operationalPreemptionThreshold:
      0.84,

    externalCaptureBlockThreshold:
      0.76,

    ruminationBlockThreshold:
      0.76,

    lowInformationGainThreshold:
      0.10,

    minimumResourceForNormalIgnition:
      0.16,

    resourceReservationFraction:
      0.18,
  });

/* ============================================================
 * CANDIDATE ASSESSMENT
 * ============================================================
 */

export interface WorkspaceCandidateAssessment {
  readonly assessmentId:
    string;

  readonly candidateId:
    string;

  readonly subjectKey:
    string;

  readonly semanticKey:
    string;

  readonly sourceLineageKey:
    string;

  readonly origin:
    WorkspaceCandidateOrigin;

  readonly ownership:
    WorkspaceOwnership;

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly evidenceIds:
    readonly string[];

  readonly upstreamBindingValid:
    boolean;

  readonly baseScore:
    UnitInterval;

  readonly intrinsicSalience:
    UnitInterval;

  readonly hysteresisBonus:
    UnitInterval;

  readonly cognitiveCostPenalty:
    UnitInterval;

  readonly ruminationPenalty:
    UnitInterval;

  readonly externalCapturePenalty:
    UnitInterval;

  readonly repetitionPenalty:
    UnitInterval;

  readonly resourcePenalty:
    UnitInterval;

  readonly reentryPenalty:
    UnitInterval;

  readonly competitionScore:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly endogenousSupport:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly ruminationRisk:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly preemptionClass:
    PreemptionClass;

  readonly blockedByCapture:
    boolean;

  readonly blockedByRumination:
    boolean;

  readonly blockedByResource:
    boolean;

  readonly blockedByExternalIntrinsicFloor:
    boolean;

  readonly eligibleForIgnition:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SUBJECT COALITION
 * ============================================================
 */

export interface WorkspaceSubjectCoalition {
  readonly coalitionId:
    string;

  readonly subjectKey:
    string;

  readonly semanticKeys:
    readonly string[];

  readonly candidateIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly ownerships:
    readonly WorkspaceOwnership[];

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly independentLineageCount:
    number;

  readonly intrinsicSalience:
    UnitInterval;

  readonly endogenousSupport:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly expectedInformationGain:
    UnitInterval;

  readonly ruminationRisk:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly baseCompetitionScore:
    UnitInterval;

  readonly lineageDiversityBonus:
    UnitInterval;

  readonly starvationBoost:
    UnitInterval;

  readonly competitionScore:
    UnitInterval;

  readonly containsCurrentOccupant:
    boolean;

  readonly preemptionClass:
    PreemptionClass;

  readonly eligibleForIgnition:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * ATTENTION OWNERSHIP
 * ============================================================
 */

export interface AttentionOwnershipAssessment {
  readonly subjectKey:
    string;

  readonly authorship:
    AttentionAuthorship;

  readonly endogenousSupport:
    UnitInterval;

  readonly relationshipSupport:
    UnitInterval;

  readonly systemRequirement:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly createsBeliefOwnership:
    false;

  readonly createsGoalOwnership:
    false;

  readonly createsValueOwnership:
    false;

  readonly createsIdentityOwnership:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * TRANSITION PROOF
 * ============================================================
 */

export interface WorkspaceTransitionProof {
  readonly transitionId:
    string;

  readonly decision:
    WorkspaceDecision;

  readonly fromSubjectKey:
    string | null;

  readonly toSubjectKey:
    string | null;

  readonly selectedCoalitionId:
    string | null;

  readonly selectedScore:
    UnitInterval;

  readonly incumbentScore:
    UnitInterval;

  readonly threshold:
    UnitInterval;

  readonly switchMargin:
    UnitInterval;

  readonly configHash:
    string;

  readonly upstreamFrameSeals:
    readonly string[];

  readonly reasonCodes:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly proofSeal:
    string;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * COGNITIVE ACCESS LEASE
 * ============================================================
 *
 * Winning competition is insufficient.
 *
 * The winner receives a bounded, expiring access lease.
 *
 * This prevents "once salient, globally accessible forever".
 * ============================================================
 */

export interface CognitiveAccessLease {
  readonly leaseId:
    string;

  readonly workspaceEpochId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly subjectKey:
    string;

  readonly coalitionId:
    string;

  readonly grantedAt:
    string;

  readonly expiresAt:
    string;

  readonly snapshotRevision:
    number;

  readonly admissionScore:
    UnitInterval;

  readonly cognitiveResourceReservation:
    UnitInterval;

  readonly renewable:
    true;

  readonly permanent:
    false;

  readonly grantsBeliefAuthority:
    false;

  readonly grantsActionAuthority:
    false;

  readonly grantsIdentityAuthority:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * BROADCAST
 * ============================================================
 */

export interface WorkspaceBroadcast {
  readonly broadcastId:
    string;

  readonly broadcastSeal:
    string;

  readonly workspaceEpochId:
    string;

  readonly leaseId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly subjectKey:
    string;

  readonly coalitionId:
    string;

  readonly semanticKeys:
    readonly string[];

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly snapshotRevision:
    number;

  readonly broadcastAt:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly recipients:
    readonly BroadcastRecipient[];

  readonly singleSubjectInvariant:
    true;

  readonly containsHiddenChainOfThought:
    false;

  readonly beliefMutationAllowed:
    false;

  readonly valueMutationAllowed:
    false;

  readonly goalMutationAllowed:
    false;

  readonly preferenceMutationAllowed:
    false;

  readonly identityMutationAllowed:
    false;

  readonly actionExecutionAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * OCCUPANT PROPOSAL
 * ============================================================
 */

export interface WorkspaceOccupantProposal {
  readonly occupantId:
    string;

  readonly workspaceEpochId:
    string;

  readonly leaseId:
    string;

  readonly leaseExpiresAt:
    string;

  readonly subjectKey:
    string;

  readonly coalitionId:
    string;

  readonly candidateId:
    string;

  readonly semanticKey:
    string;

  readonly ownership:
    WorkspaceOwnership;

  readonly attentionAuthorship:
    AttentionAuthorship;

  readonly admissionScore:
    UnitInterval;

  readonly proposedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface GlobalWorkspaceFrame {
  readonly version:
    typeof GLOBAL_WORKSPACE_VERSION;

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
    WorkspaceDecision;

  readonly failureReason:
    WorkspaceFailureReason;

  readonly configHash:
    string;

  readonly assessments:
    readonly WorkspaceCandidateAssessment[];

  readonly coalitions:
    readonly WorkspaceSubjectCoalition[];

  readonly attentionOwnership:
    AttentionOwnershipAssessment | null;

  readonly transitionProof:
    WorkspaceTransitionProof;

  readonly accessLease:
    CognitiveAccessLease | null;

  readonly broadcast:
    WorkspaceBroadcast | null;

  readonly nextOccupant:
    WorkspaceOccupantProposal | null;

  readonly selectedCoalitionId:
    string | null;

  readonly selectedSubjectKey:
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

    readonly upstreamBindingValid:
      boolean;

    readonly currentOccupantValid:
      boolean;

    readonly singleSubjectInvariant:
      boolean;

    readonly leaseInvariant:
      boolean;

    readonly admittedCandidateCount:
      number;

    readonly rejectedCandidateCount:
      number;

    readonly duplicateCandidateCount:
      number;

    readonly admittedSubjectCount:
      number;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly salienceEqualsWorkspaceAccess:
      false;

    readonly accessEqualsTruth:
      false;

    readonly accessEqualsBelief:
      false;

    readonly accessEqualsGoal:
      false;

    readonly accessEqualsValue:
      false;

    readonly accessEqualsIdentity:
      false;

    readonly attentionEqualsMentalOwnership:
      false;

    readonly broadcastEqualsCommand:
      false;

    readonly broadcastExecutesAction:
      false;

    readonly externalEmphasisGrantsAccess:
      false;

    readonly repetitionGrantsAccess:
      false;

    readonly starvationFairnessGrantsExternalPriority:
      false;

    readonly operationalUrgencyCreatesPersonalMeaning:
      false;

    readonly relationshipAccessCreatesGlobalValue:
      false;

    readonly leaseIsPermanent:
      false;

    readonly oneSubjectPerBroadcast:
      true;

    readonly hiddenChainOfThoughtStored:
      false;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    salienceEqualsWorkspaceAccess:
      false as const,

    accessEqualsTruth:
      false as const,

    accessEqualsBelief:
      false as const,

    accessEqualsGoal:
      false as const,

    accessEqualsValue:
      false as const,

    accessEqualsIdentity:
      false as const,

    attentionEqualsMentalOwnership:
      false as const,

    broadcastEqualsCommand:
      false as const,

    broadcastExecutesAction:
      false as const,

    externalEmphasisGrantsAccess:
      false as const,

    repetitionGrantsAccess:
      false as const,

    starvationFairnessGrantsExternalPriority:
      false as const,

    operationalUrgencyCreatesPersonalMeaning:
      false as const,

    relationshipAccessCreatesGlobalValue:
      false as const,

    leaseIsPermanent:
      false as const,

    oneSubjectPerBroadcast:
      true as const,

    hiddenChainOfThoughtStored:
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

function configHash(
  config:
    Readonly<GlobalWorkspaceConfig>,
): string {
  const body =
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
      );

  return stableHash(
    [
      GLOBAL_WORKSPACE_VERSION,
      body,
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * CONFIG VALIDATION
 * ============================================================
 */

function configurationValid(
  config:
    Readonly<GlobalWorkspaceConfig>,
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
    config.maximumCandidateCount <
      1 ||
    config.maximumSubjectCount <
      1 ||
    config.minimumDwellMs <
      0 ||
    config.maximumDwellMs <=
      config.minimumDwellMs ||
    config.maximumAccessCount <
      1 ||
    config.accessLeaseMs <=
      0 ||
    config.reentryCooldownMs <
      0
  ) {
    return false;
  }

  if (
    config.releaseThreshold <
      0 ||
    config.maintainThreshold <
      config.releaseThreshold ||
    config.minimumIgnitionScore <
      config.maintainThreshold ||
    config.minimumIgnitionScore >
      1
  ) {
    return false;
  }

  if (
    config.switchMargin <
      0 ||
    config.switchMargin >
      1
  ) {
    return false;
  }

  return true;
}

/* ============================================================
 * UPSTREAM BINDING
 * ============================================================
 */

function upstreamBindingValid(
  candidate:
    WorkspaceCandidate,
  input:
    GlobalWorkspaceInput,
): boolean {
  if (
    candidate.origin !==
      "SALIENCE_FIELD"
  ) {
    return true;
  }

  const expected =
    input.upstreamSalienceFrameSeal;

  if (
    !expected ||
    expected.trim().length ===
      0
  ) {
    return false;
  }

  return (
    candidate.upstreamFrameSeal ===
      expected &&
    typeof candidate.upstreamFrameId ===
      "string" &&
    candidate.upstreamFrameId.trim().length >
      0 &&
    typeof candidate.upstreamProposalId ===
      "string" &&
    candidate.upstreamProposalId.trim().length >
      0
  );
}

/* ============================================================
 * CANDIDATE VALIDATION
 * ============================================================
 */

function validCandidate(
  candidate:
    WorkspaceCandidate,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
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
    candidate.semanticKey.trim().length ===
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

  const proposedAt =
    parseTimestamp(
      candidate.proposedAt,
    );

  if (
    proposedAt ===
      null ||
    proposedAt >
      evaluatedAtMs
  ) {
    return false;
  }

  if (
    evaluatedAtMs -
      proposedAt >
      config.maximumCandidateAgeMs
  ) {
    return false;
  }

  return upstreamBindingValid(
    candidate,
    input,
  );
}

/* ============================================================
 * OCCUPANT VALIDATION
 * ============================================================
 */

function validCurrentOccupant(
  occupant:
    WorkspaceOccupant | null | undefined,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
): boolean {
  if (
    !occupant
  ) {
    return true;
  }

  if (
    occupant.entityId !==
      MAY_ENTITY_ID ||
    occupant.entityId !==
      input.entityId
  ) {
    return false;
  }

  if (
    occupant.occupantId.trim().length ===
      0 ||
    occupant.workspaceEpochId.trim().length ===
      0 ||
    occupant.leaseId.trim().length ===
      0 ||
    occupant.subjectKey.trim().length ===
      0 ||
    occupant.candidateId.trim().length ===
      0 ||
    occupant.semanticKey.trim().length ===
      0
  ) {
    return false;
  }

  if (
    uniqueStrings(
      occupant.evidenceIds,
    ).length ===
      0
  ) {
    return false;
  }

  if (
    !Number.isSafeInteger(
      occupant.snapshotRevision,
    ) ||
    occupant.snapshotRevision >
      input.snapshotRevision
  ) {
    return false;
  }

  const ignitedAt =
    parseTimestamp(
      occupant.ignitedAt,
    );

  const maintainedAt =
    parseTimestamp(
      occupant.lastMaintainedAt,
    );

  const leaseExpiresAt =
    parseTimestamp(
      occupant.leaseExpiresAt,
    );

  if (
    ignitedAt ===
      null ||
    maintainedAt ===
      null ||
    leaseExpiresAt ===
      null ||
    ignitedAt >
      maintainedAt ||
    maintainedAt >
      evaluatedAtMs
  ) {
    return false;
  }

  return true;
}

/* ============================================================
 * ATTENTION AUTHORSHIP
 * ============================================================
 */

function classifyAttentionAuthorship(
  candidate:
    WorkspaceCandidate,
): AttentionAuthorship {
  if (
    candidate.ownership ===
      "MAY_OWNED" &&
    clamp01(
      candidate.endogenousSupport,
    ) >=
      0.30
  ) {
    return "MAY_MEDIATED";
  }

  if (
    candidate.ownership ===
      "RELATIONSHIP_OWNED"
  ) {
    return "RELATIONSHIP_MEDIATED";
  }

  if (
    candidate.ownership ===
      "SYSTEM_OWNED" &&
    clamp01(
      candidate.operationalUrgency,
    ) >
      0
  ) {
    return "SYSTEM_REQUIRED";
  }

  if (
    candidate.ownership ===
      "EXTERNAL" &&
    clamp01(
      candidate.externalCaptureRisk,
    ) >=
      0.30
  ) {
    return "EXTERNAL_CAPTURE_RISK";
  }

  return "UNRESOLVED";
}

/* ============================================================
 * REENTRY PENALTY
 * ============================================================
 */

function calculateReentryPenalty(
  candidate:
    WorkspaceCandidate,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): UnitInterval {
  let strongest =
    0;

  for (
    const record
    of input.reentryHistory ??
      []
  ) {
    if (
      record.entityId !==
        MAY_ENTITY_ID ||
      record.subjectKey !==
        candidate.subjectKey
    ) {
      continue;
    }

    const releasedAt =
      parseTimestamp(
        record.releasedAt,
      );

    if (
      releasedAt ===
        null ||
      releasedAt >
        evaluatedAtMs
    ) {
      continue;
    }

    const elapsed =
      evaluatedAtMs -
      releasedAt;

    if (
      elapsed >=
        config.reentryCooldownMs
    ) {
      continue;
    }

    const remaining =
      clamp01(
        1 -
        elapsed /
          Math.max(
            1,
            config.reentryCooldownMs,
          ),
      );

    strongest =
      Math.max(
        strongest,
        remaining *
          config.reentryPenalty,
      );
  }

  return clamp01(
    strongest,
  );
}

/* ============================================================
 * INCUMBENT HYSTERESIS
 * ============================================================
 */

function calculateHysteresisBonus(
  candidate:
    WorkspaceCandidate,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): UnitInterval {
  const occupant =
    input.currentOccupant;

  if (
    !occupant ||
    occupant.subjectKey !==
      candidate.subjectKey
  ) {
    return 0;
  }

  const ignitedAt =
    parseTimestamp(
      occupant.ignitedAt,
    );

  if (
    ignitedAt ===
      null
  ) {
    return 0;
  }

  const dwell =
    Math.max(
      0,
      evaluatedAtMs -
        ignitedAt,
    );

  const dwellFactor =
    clamp01(
      1 -
      dwell /
        config.maximumDwellMs,
    );

  const accessFactor =
    clamp01(
      1 -
      safeInteger(
        occupant.accessCount,
      ) /
        config.maximumAccessCount,
    );

  return clamp01(
    Math.min(
      config.maximumHysteresisBonus,

      config.incumbentHysteresisBonus *
        (
          0.55 +
          dwellFactor *
            0.25 +
          accessFactor *
            0.20
        ),
    ),
  );
}

/* ============================================================
 * CANDIDATE ASSESSMENT
 * ============================================================
 */

function assessCandidate(
  candidate:
    WorkspaceCandidate,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): WorkspaceCandidateAssessment {
  const salience =
    clamp01(
      candidate.subjectiveSalience,
    );

  const intrinsic =
    clamp01(
      candidate.intrinsicSalience,
    );

  const utility =
    clamp01(
      candidate.selectionUtility,
    );

  const endogenous =
    clamp01(
      candidate.endogenousSupport,
    );

  const selfRelevance =
    clamp01(
      candidate.selfRelevance,
    );

  const continuity =
    clamp01(
      candidate.continuityRelevance,
    );

  const epistemic =
    clamp01(
      candidate.epistemicConfidence,
    );

  const informationGain =
    clamp01(
      candidate.expectedInformationGain,
    );

  const unresolved =
    clamp01(
      candidate.unresolvedPressure,
    );

  const persistence =
    clamp01(
      candidate.persistence,
    );

  const freshness =
    clamp01(
      candidate.freshness,
    );

  const operational =
    clamp01(
      candidate.operationalUrgency,
    );

  const cost =
    clamp01(
      candidate.cognitiveCost,
    );

  const rumination =
    clamp01(
      candidate.ruminationRisk,
    );

  const capture =
    clamp01(
      candidate.externalCaptureRisk,
    );

  const resource =
    clamp01(
      input
        .cognitiveResourceAvailability ??
      1,
    );

  const baseScore =
    clamp01(
      salience *
        config.salienceWeight +

      intrinsic *
        config.intrinsicWeight +

      utility *
        config.utilityWeight +

      endogenous *
        config.endogenousWeight +

      selfRelevance *
        config.selfRelevanceWeight +

      continuity *
        config.continuityWeight +

      epistemic *
        config.epistemicWeight +

      informationGain *
        config.informationGainWeight +

      unresolved *
        config.unresolvedWeight +

      persistence *
        config.persistenceWeight +

      freshness *
        config.freshnessWeight +

      operational *
        config.operationalWeight
    );

  const hysteresisBonus =
    calculateHysteresisBonus(
      candidate,
      input,
      evaluatedAtMs,
      config,
    );

  const cognitiveCostPenalty =
    cost *
    config.cognitiveCostPenalty;

  const ruminationPenalty =
    rumination *
    config.ruminationPenalty;

  const externalCapturePenalty =
    capture *
    config.externalCapturePenalty;

  const repetitionPenalty =
    clamp01(
      Math.min(
        config.maximumRepetitionPenalty,

        clamp01(
          candidate.repetitionExposure,
        ) *
          config.repetitionPenalty,
      ),
    );

  const resourcePenalty =
    clamp01(
      (
        1 -
        resource
      ) *
      cost *
      config.lowResourcePenalty,
    );

  const reentryPenalty =
    calculateReentryPenalty(
      candidate,
      input,
      evaluatedAtMs,
      config,
    );

  const competitionScore =
    clamp01(
      baseScore +
      hysteresisBonus -
      cognitiveCostPenalty -
      ruminationPenalty -
      externalCapturePenalty -
      repetitionPenalty -
      resourcePenalty -
      reentryPenalty,
    );

  const preemptionClass:
    PreemptionClass =
    operational >=
      config.operationalPreemptionThreshold
      ? "OPERATIONAL_CRITICAL"
      : "NONE";

  const blockedByCapture =
    capture >=
      config.externalCaptureBlockThreshold &&
    endogenous <
      0.25 &&
    preemptionClass ===
      "NONE";

  const blockedByRumination =
    rumination >=
      config.ruminationBlockThreshold &&
    informationGain <
      config.lowInformationGainThreshold &&
    preemptionClass ===
      "NONE";

  const blockedByResource =
    resource <
      config.minimumResourceForNormalIgnition &&
    preemptionClass ===
      "NONE";

  const externallyDerived =
    candidate.ownership ===
      "EXTERNAL" ||
    candidate.origin ===
      "LLM" ||
    candidate.origin ===
      "UI";

  const blockedByExternalIntrinsicFloor =
    externallyDerived &&
    intrinsic <
      config
        .minimumIntrinsicSalienceForExternalAccess &&
    preemptionClass ===
      "NONE";

  const bindingValid =
    upstreamBindingValid(
      candidate,
      input,
    );

  const eligibleForIgnition =
    bindingValid &&
    !blockedByCapture &&
    !blockedByRumination &&
    !blockedByResource &&
    !blockedByExternalIntrinsicFloor &&
    (
      competitionScore >=
        config.minimumIgnitionScore ||
      preemptionClass ===
        "OPERATIONAL_CRITICAL"
    );

  const assessmentId =
    stableHash(
      [
        MAY_ENTITY_ID,
        candidate.candidateId,
        candidate.subjectKey,
        candidate.sourceLineageKey,
        competitionScore.toFixed(
          8,
        ),
        preemptionClass,
        String(
          eligibleForIgnition,
        ),
        GLOBAL_WORKSPACE_VERSION,
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

    semanticKey:
      candidate.semanticKey,

    sourceLineageKey:
      candidate.sourceLineageKey,

    origin:
      candidate.origin,

    ownership:
      candidate.ownership,

    attentionAuthorship:
      classifyAttentionAuthorship(
        candidate,
      ),

    evidenceIds:
      uniqueStrings(
        candidate.evidenceIds,
      ),

    upstreamBindingValid:
      bindingValid,

    baseScore,

    intrinsicSalience:
      intrinsic,

    hysteresisBonus,

    cognitiveCostPenalty,

    ruminationPenalty,

    externalCapturePenalty,

    repetitionPenalty,

    resourcePenalty,

    reentryPenalty,

    competitionScore,

    operationalUrgency:
      operational,

    endogenousSupport:
      endogenous,

    expectedInformationGain:
      informationGain,

    ruminationRisk:
      rumination,

    externalCaptureRisk:
      capture,

    preemptionClass,

    blockedByCapture,

    blockedByRumination,

    blockedByResource,

    blockedByExternalIntrinsicFloor,

    eligibleForIgnition,

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
    readonly WorkspaceCandidateAssessment[],
): readonly WorkspaceCandidateAssessment[] {
  const map =
    new Map<
      string,
      WorkspaceCandidateAssessment
    >();

  for (
    const assessment
    of assessments
  ) {
    const key =
      [
        assessment.subjectKey,
        assessment.sourceLineageKey,
      ].join(
        "|",
      );

    const current =
      map.get(
        key,
      );

    if (
      !current ||
      assessment.competitionScore >
        current.competitionScore
    ) {
      map.set(
        key,
        assessment,
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
 * SUBJECT AUTHORSHIP
 * ============================================================
 */

function coalitionAuthorship(
  group:
    readonly WorkspaceCandidateAssessment[],
): AttentionAuthorship {
  if (
    group.some(
      item =>
        item.attentionAuthorship ===
          "MAY_MEDIATED",
    )
  ) {
    return "MAY_MEDIATED";
  }

  if (
    group.some(
      item =>
        item.attentionAuthorship ===
          "RELATIONSHIP_MEDIATED",
    )
  ) {
    return "RELATIONSHIP_MEDIATED";
  }

  if (
    group.some(
      item =>
        item.attentionAuthorship ===
          "SYSTEM_REQUIRED",
    )
  ) {
    return "SYSTEM_REQUIRED";
  }

  if (
    group.some(
      item =>
        item.attentionAuthorship ===
          "EXTERNAL_CAPTURE_RISK",
    )
  ) {
    return "EXTERNAL_CAPTURE_RISK";
  }

  return "UNRESOLVED";
}

/* ============================================================
 * STARVATION FAIRNESS
 * ============================================================
 */

function starvationBoost(
  subjectKey:
    string,
  authorship:
    AttentionAuthorship,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): UnitInterval {
  /*
   * External or system-generated concerns cannot accumulate
   * fairness priority merely by waiting.
   */

  if (
    authorship !==
      "MAY_MEDIATED"
  ) {
    return 0;
  }

  let boost =
    0;

  for (
    const record
    of input.deferredSubjects ??
      []
  ) {
    if (
      record.entityId !==
        MAY_ENTITY_ID ||
      record.subjectKey !==
        subjectKey ||
      record.attentionAuthorship !==
        "MAY_MEDIATED"
    ) {
      continue;
    }

    const deferredAt =
      parseTimestamp(
        record.deferredAt,
      );

    if (
      deferredAt ===
        null ||
      deferredAt >
        evaluatedAtMs
    ) {
      continue;
    }

    const age =
      evaluatedAtMs -
      deferredAt;

    if (
      age >
        config.maximumStarvationAgeMs
    ) {
      continue;
    }

    boost =
      Math.max(
        boost,

        Math.min(
          config.maximumStarvationBoost,

          safeInteger(
            record.deferralCount,
          ) *
            config
              .starvationBoostPerDeferral,
        ),
      );
  }

  return clamp01(
    boost,
  );
}

/* ============================================================
 * BUILD COALITIONS
 * ============================================================
 */

function buildCoalitions(
  assessments:
    readonly WorkspaceCandidateAssessment[],
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): readonly WorkspaceSubjectCoalition[] {
  const deduped =
    strongestPerLineage(
      assessments,
    );

  const grouped =
    new Map<
      string,
      WorkspaceCandidateAssessment[]
    >();

  for (
    const assessment
    of deduped
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

  const coalitions:
    WorkspaceSubjectCoalition[] =
    [];

  for (
    const [
      subjectKey,
      group,
    ]
    of grouped
  ) {
    const strongest =
      (
        selector:
          (
            item:
              WorkspaceCandidateAssessment,
          ) => number,
      ) =>
        clamp01(
          Math.max(
            0,
            ...group.map(
              selector,
            ),
          ),
        );

    const authorship =
      coalitionAuthorship(
        group,
      );

    const lineages =
      uniqueStrings(
        group.map(
          item =>
            item.sourceLineageKey,
        ),
      );

    const lineageDiversityBonus =
      clamp01(
        Math.min(
          config.maximumIndependentLineageBonus,

          Math.max(
            0,
            lineages.length -
              1,
          ) *
            config.independentLineageBonus,
        ),
      );

    const fairness =
      starvationBoost(
        subjectKey,
        authorship,
        input,
        evaluatedAtMs,
        config,
      );

    const baseCompetitionScore =
      strongest(
        item =>
          item.competitionScore,
      );

    const intrinsicSalience =
      strongest(
        item =>
          item.intrinsicSalience,
      );

    const endogenousSupport =
      strongest(
        item =>
          item.endogenousSupport,
      );

    const operationalUrgency =
      strongest(
        item =>
          item.operationalUrgency,
      );

    const informationGain =
      strongest(
        item =>
          item.expectedInformationGain,
      );

    const ruminationRisk =
      strongest(
        item =>
          item.ruminationRisk,
      );

    const captureRisk =
      strongest(
        item =>
          item.externalCaptureRisk,
      );

    const preemptionClass:
      PreemptionClass =
      group.some(
        item =>
          item.preemptionClass ===
            "OPERATIONAL_CRITICAL",
      )
        ? "OPERATIONAL_CRITICAL"
        : "NONE";

    /*
     * Coalition bonus is intentionally small.
     *
     * Evidence diversity can strengthen legitimacy.
     *
     * It cannot create importance from repetition.
     */

    const competitionScore =
      clamp01(
        baseCompetitionScore +
        lineageDiversityBonus +
        fairness,
      );

    const eligibleForIgnition =
      group.some(
        item =>
          item.eligibleForIgnition,
      ) &&
      (
        competitionScore >=
          config.minimumIgnitionScore ||
        preemptionClass ===
          "OPERATIONAL_CRITICAL"
      );

    const coalitionId =
      stableHash(
        [
          MAY_ENTITY_ID,
          subjectKey,
          ...lineages,
          authorship,
          competitionScore.toFixed(
            8,
          ),
          GLOBAL_WORKSPACE_VERSION,
        ].join(
          "|",
        ),
      );

    coalitions.push(
      Object.freeze({
        coalitionId,

        subjectKey,

        semanticKeys:
          uniqueStrings(
            group.map(
              item =>
                item.semanticKey,
            ),
          ),

        candidateIds:
          uniqueStrings(
            group.map(
              item =>
                item.candidateId,
            ),
          ),

        sourceLineageKeys:
          lineages,

        evidenceIds:
          uniqueStrings(
            group.flatMap(
              item =>
                item.evidenceIds,
            ),
          ),

        ownerships:
          uniqueStrings(
            group.map(
              item =>
                item.ownership,
            ),
          ) as readonly WorkspaceOwnership[],

        attentionAuthorship:
          authorship,

        independentLineageCount:
          lineages.length,

        intrinsicSalience,

        endogenousSupport,

        operationalUrgency,

        expectedInformationGain:
          informationGain,

        ruminationRisk,

        externalCaptureRisk:
          captureRisk,

        baseCompetitionScore,

        lineageDiversityBonus,

        starvationBoost:
          fairness,

        competitionScore,

        containsCurrentOccupant:
          input.currentOccupant
            ?.subjectKey ===
          subjectKey,

        preemptionClass,

        eligibleForIgnition,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  coalitions.sort(
    (
      a,
      b,
    ) => {
      if (
        a.preemptionClass !==
        b.preemptionClass
      ) {
        if (
          a.preemptionClass ===
            "OPERATIONAL_CRITICAL"
        ) {
          return -1;
        }

        if (
          b.preemptionClass ===
            "OPERATIONAL_CRITICAL"
        ) {
          return 1;
        }
      }

      const scoreDelta =
        b.competitionScore -
        a.competitionScore;

      if (
        Math.abs(
          scoreDelta,
        ) >
        1e-12
      ) {
        return scoreDelta;
      }

      return a.coalitionId.localeCompare(
        b.coalitionId,
      );
    },
  );

  return Object.freeze(
    coalitions.slice(
      0,
      config.maximumSubjectCount,
    ),
  );
}

/* ============================================================
 * INCUMBENT SCORE
 * ============================================================
 */

function incumbentScore(
  coalitions:
    readonly WorkspaceSubjectCoalition[],
  occupant:
    WorkspaceOccupant | null | undefined,
): UnitInterval {
  if (
    !occupant
  ) {
    return 0;
  }

  const current =
    coalitions.find(
      coalition =>
        coalition.subjectKey ===
          occupant.subjectKey,
    );

  return current
    ?.competitionScore ??
    clamp01(
      occupant.admissionScore,
    );
}

/* ============================================================
 * DWELL / LEASE
 * ============================================================
 */

function occupantDwellMs(
  occupant:
    WorkspaceOccupant | null | undefined,
  evaluatedAtMs:
    number,
): number {
  if (
    !occupant
  ) {
    return 0;
  }

  const ignitedAt =
    parseTimestamp(
      occupant.ignitedAt,
    );

  if (
    ignitedAt ===
      null
  ) {
    return 0;
  }

  return Math.max(
    0,
    evaluatedAtMs -
      ignitedAt,
  );
}

function occupantLeaseExpired(
  occupant:
    WorkspaceOccupant | null | undefined,
  evaluatedAtMs:
    number,
): boolean {
  if (
    !occupant
  ) {
    return false;
  }

  const expires =
    parseTimestamp(
      occupant.leaseExpiresAt,
    );

  return (
    expires ===
      null ||
    evaluatedAtMs >=
      expires
  );
}

/* ============================================================
 * WORKSPACE DECISION
 * ============================================================
 */

interface WorkspaceDecisionResult {
  readonly decision:
    WorkspaceDecision;

  readonly selected:
    WorkspaceSubjectCoalition | null;

  readonly incumbentScore:
    UnitInterval;

  readonly reasonCodes:
    readonly string[];
}

function decideWorkspace(
  coalitions:
    readonly WorkspaceSubjectCoalition[],
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): WorkspaceDecisionResult {
  const current =
    input.currentOccupant ??
    null;

  const incumbent =
    incumbentScore(
      coalitions,
      current,
    );

  const top =
    coalitions.find(
      coalition =>
        coalition.eligibleForIgnition,
    ) ??
    null;

  const reasons:
    string[] =
    [];

  /* ---------------- NO OCCUPANT ---------------- */

  if (
    !current
  ) {
    if (
      !top
    ) {
      reasons.push(
        "NO_ELIGIBLE_COALITION",
      );

      return {
        decision:
          "DEFER",

        selected:
          null,

        incumbentScore:
          0,

        reasonCodes:
          Object.freeze(
            reasons,
          ),
      };
    }

    reasons.push(
      "NO_CURRENT_OCCUPANT",
      "ACCESS_THRESHOLD_SATISFIED",
    );

    return {
      decision:
        "IGNITE",

      selected:
        top,

      incumbentScore:
        0,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  const currentCoalition =
    coalitions.find(
      coalition =>
        coalition.subjectKey ===
          current.subjectKey,
    ) ??
    null;

  const dwell =
    occupantDwellMs(
      current,
      evaluatedAtMs,
    );

  const leaseExpired =
    occupantLeaseExpired(
      current,
      evaluatedAtMs,
    );

  const accessExhausted =
    safeInteger(
      current.accessCount,
    ) >=
      config.maximumAccessCount;

  const dwellExhausted =
    dwell >=
      config.maximumDwellMs;

  /* ---------------- CRITICAL PREEMPTION ---------------- */

  const critical =
    coalitions.find(
      coalition =>
        coalition.preemptionClass ===
          "OPERATIONAL_CRITICAL" &&
        coalition.eligibleForIgnition &&
        coalition.subjectKey !==
          current.subjectKey,
    ) ??
    null;

  if (
    critical
  ) {
    reasons.push(
      "OPERATIONAL_CRITICAL_PREEMPTION",
      "PERSONAL_MEANING_NOT_INFERRED",
    );

    return {
      decision:
        "PREEMPT",

      selected:
        critical,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- CURRENT EXHAUSTED ---------------- */

  if (
    leaseExpired ||
    accessExhausted ||
    dwellExhausted
  ) {
    if (
      leaseExpired
    ) {
      reasons.push(
        "ACCESS_LEASE_EXPIRED",
      );
    }

    if (
      accessExhausted
    ) {
      reasons.push(
        "MAXIMUM_ACCESS_COUNT_REACHED",
      );
    }

    if (
      dwellExhausted
    ) {
      reasons.push(
        "MAXIMUM_DWELL_REACHED",
      );
    }

    if (
      top
    ) {
      if (
        top.subjectKey ===
          current.subjectKey
      ) {
        reasons.push(
          "INCUMBENT_REVALIDATED_AFTER_LEASE_BOUNDARY",
        );

        return {
          decision:
            "MAINTAIN",

          selected:
            top,

          incumbentScore:
            incumbent,

          reasonCodes:
            Object.freeze(
              reasons,
            ),
        };
      }

      reasons.push(
        "NEW_COALITION_SELECTED_AFTER_LEASE_BOUNDARY",
      );

      return {
        decision:
          "SWITCH",

        selected:
          top,

        incumbentScore:
          incumbent,

        reasonCodes:
          Object.freeze(
            reasons,
          ),
      };
    }

    reasons.push(
      "NO_REVALIDATED_COALITION",
    );

    return {
      decision:
        "RELEASE",

      selected:
        null,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- NO CHALLENGER ---------------- */

  if (
    !top
  ) {
    if (
      currentCoalition &&
      incumbent >=
        config.maintainThreshold
    ) {
      reasons.push(
        "INCUMBENT_REMAINS_VALID",
      );

      return {
        decision:
          "MAINTAIN",

        selected:
          currentCoalition,

        incumbentScore:
          incumbent,

        reasonCodes:
          Object.freeze(
            reasons,
          ),
      };
    }

    reasons.push(
      "INCUMBENT_NOT_REVALIDATED",
    );

    return {
      decision:
        "RELEASE",

      selected:
        null,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- SAME SUBJECT ---------------- */

  if (
    top.subjectKey ===
      current.subjectKey
  ) {
    reasons.push(
      "INCUMBENT_REMAINS_DOMINANT",
    );

    return {
      decision:
        "MAINTAIN",

      selected:
        top,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- MINIMUM DWELL ---------------- */

  if (
    dwell <
      config.minimumDwellMs
  ) {
    if (
      currentCoalition
    ) {
      reasons.push(
        "MINIMUM_DWELL_PROTECTS_COGNITIVE_CONTINUITY",
      );

      return {
        decision:
          "MAINTAIN",

        selected:
          currentCoalition,

        incumbentScore:
          incumbent,

        reasonCodes:
          Object.freeze(
            reasons,
          ),
      };
    }

    reasons.push(
      "MINIMUM_DWELL_BLOCKS_NONCRITICAL_SWITCH",
    );

    return {
      decision:
        "DEFER",

      selected:
        null,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- SWITCH ---------------- */

  if (
    top.competitionScore >=
      clamp01(
        incumbent +
        config.switchMargin,
      )
  ) {
    reasons.push(
      "CHALLENGER_EXCEEDS_SWITCH_MARGIN",
    );

    return {
      decision:
        "SWITCH",

      selected:
        top,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  /* ---------------- KEEP INCUMBENT ---------------- */

  if (
    currentCoalition &&
    incumbent >=
      config.maintainThreshold
  ) {
    reasons.push(
      "INCUMBENT_HYSTERESIS_WINS",
    );

    return {
      decision:
        "MAINTAIN",

      selected:
        currentCoalition,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  if (
    incumbent <
      config.releaseThreshold
  ) {
    reasons.push(
      "INCUMBENT_BELOW_RELEASE_THRESHOLD",
    );

    return {
      decision:
        "RELEASE",

      selected:
        null,

      incumbentScore:
        incumbent,

      reasonCodes:
        Object.freeze(
          reasons,
        ),
    };
  }

  reasons.push(
    "NO_TRANSITION_JUSTIFIED",
  );

  return {
    decision:
      "DEFER",

    selected:
      null,

    incumbentScore:
      incumbent,

    reasonCodes:
      Object.freeze(
        reasons,
      ),
  };
}

/* ============================================================
 * ATTENTION OWNERSHIP
 * ============================================================
 */

function buildAttentionOwnership(
  coalition:
    WorkspaceSubjectCoalition | null,
): AttentionOwnershipAssessment | null {
  if (
    !coalition
  ) {
    return null;
  }

  return Object.freeze({
    subjectKey:
      coalition.subjectKey,

    authorship:
      coalition.attentionAuthorship,

    endogenousSupport:
      coalition.attentionAuthorship ===
        "MAY_MEDIATED"
        ? coalition.endogenousSupport
        : 0,

    relationshipSupport:
      coalition.attentionAuthorship ===
        "RELATIONSHIP_MEDIATED"
        ? 1
        : 0,

    systemRequirement:
      coalition.attentionAuthorship ===
        "SYSTEM_REQUIRED"
        ? coalition.operationalUrgency
        : 0,

    externalCaptureRisk:
      coalition.externalCaptureRisk,

    createsBeliefOwnership:
      false,

    createsGoalOwnership:
      false,

    createsValueOwnership:
      false,

    createsIdentityOwnership:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * TRANSITION PROOF SEAL
 * ============================================================
 */

function transitionProofSeal(
  proof:
    Omit<
      WorkspaceTransitionProof,
      "proofSeal" |
      "canonicalMutationAllowed"
    >,
): string {
  return stableHash(
    [
      proof.transitionId,
      proof.decision,
      proof.fromSubjectKey ??
        "NONE",
      proof.toSubjectKey ??
        "NONE",
      proof.selectedCoalitionId ??
        "NONE",
      proof.selectedScore.toFixed(
        8,
      ),
      proof.incumbentScore.toFixed(
        8,
      ),
      proof.threshold.toFixed(
        8,
      ),
      proof.switchMargin.toFixed(
        8,
      ),
      proof.configHash,
      ...proof.upstreamFrameSeals,
      ...proof.reasonCodes,
      ...proof.evidenceIds,
      "WORKSPACE_TRANSITION_PROOF_V2",
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * TRANSITION PROOF
 * ============================================================
 */

function buildTransitionProof(
  result:
    WorkspaceDecisionResult,
  input:
    GlobalWorkspaceInput,
  cfgHash:
    string,
  config:
    Readonly<GlobalWorkspaceConfig>,
): WorkspaceTransitionProof {
  const selected =
    result.selected;

  const upstreamSeals =
    uniqueStrings(
      input.candidates
        .filter(
          candidate =>
            selected
              ?.candidateIds
              .includes(
                candidate.candidateId,
              ) ??
            false,
        )
        .flatMap(
          candidate =>
            candidate.upstreamFrameSeal
              ? [
                  candidate.upstreamFrameSeal,
                ]
              : [],
        ),
    );

  const evidenceIds =
    selected
      ?.evidenceIds ??
    Object.freeze(
      [],
    );

  const transitionId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.currentOccupant
          ?.subjectKey ??
          "NONE",
        selected
          ?.subjectKey ??
          "NONE",
        result.decision,
        String(
          input.snapshotRevision,
        ),
        input.evaluatedAt,
        cfgHash,
        ...result.reasonCodes,
      ].join(
        "|",
      ),
    );

  const withoutSeal =
    {
      transitionId,

      decision:
        result.decision,

      fromSubjectKey:
        input.currentOccupant
          ?.subjectKey ??
        null,

      toSubjectKey:
        selected
          ?.subjectKey ??
        null,

      selectedCoalitionId:
        selected
          ?.coalitionId ??
        null,

      selectedScore:
        selected
          ?.competitionScore ??
        0,

      incumbentScore:
        result.incumbentScore,

      threshold:
        config.minimumIgnitionScore,

      switchMargin:
        config.switchMargin,

      configHash:
        cfgHash,

      upstreamFrameSeals:
        upstreamSeals,

      reasonCodes:
        result.reasonCodes,

      evidenceIds,
    } satisfies Omit<
      WorkspaceTransitionProof,
      "proofSeal" |
      "canonicalMutationAllowed"
    >;

  return Object.freeze({
    ...withoutSeal,

    proofSeal:
      transitionProofSeal(
        withoutSeal,
      ),

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * WORKSPACE EPOCH
 * ============================================================
 */

function resolveWorkspaceEpochId(
  decision:
    WorkspaceDecision,
  selected:
    WorkspaceSubjectCoalition,
  input:
    GlobalWorkspaceInput,
): string {
  if (
    decision ===
      "MAINTAIN" &&
    input.currentOccupant &&
    input.currentOccupant.subjectKey ===
      selected.subjectKey
  ) {
    return input.currentOccupant
      .workspaceEpochId;
  }

  return stableHash(
    [
      MAY_ENTITY_ID,
      selected.subjectKey,
      selected.coalitionId,
      input.evaluatedAt,
      String(
        input.snapshotRevision,
      ),
      "WORKSPACE_EPOCH",
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * ACCESS LEASE
 * ============================================================
 */

function buildAccessLease(
  result:
    WorkspaceDecisionResult,
  input:
    GlobalWorkspaceInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<GlobalWorkspaceConfig>,
): CognitiveAccessLease | null {
  const selected =
    result.selected;

  if (
    !selected ||
    !(
      result.decision ===
        "IGNITE" ||
      result.decision ===
        "MAINTAIN" ||
      result.decision ===
        "SWITCH" ||
      result.decision ===
        "PREEMPT"
    )
  ) {
    return null;
  }

  const epochId =
    resolveWorkspaceEpochId(
      result.decision,
      selected,
      input,
    );

  const expiresAt =
    new Date(
      evaluatedAtMs +
      config.accessLeaseMs,
    ).toISOString();

  const resource =
    clamp01(
      input
        .cognitiveResourceAvailability ??
      1,
    );

  const reservation =
    clamp01(
      Math.min(
        resource,

        config.resourceReservationFraction *
          (
            0.65 +
            selected.competitionScore *
              0.35
          ),
      ),
    );

  const leaseId =
    stableHash(
      [
        MAY_ENTITY_ID,
        epochId,
        selected.coalitionId,
        input.evaluatedAt,
        expiresAt,
        String(
          input.snapshotRevision,
        ),
        selected.competitionScore.toFixed(
          8,
        ),
        "COGNITIVE_ACCESS_LEASE",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    leaseId,

    workspaceEpochId:
      epochId,

    entityId:
      MAY_ENTITY_ID,

    subjectKey:
      selected.subjectKey,

    coalitionId:
      selected.coalitionId,

    grantedAt:
      input.evaluatedAt,

    expiresAt,

    snapshotRevision:
      input.snapshotRevision,

    admissionScore:
      selected.competitionScore,

    cognitiveResourceReservation:
      reservation,

    renewable:
      true,

    permanent:
      false,

    grantsBeliefAuthority:
      false,

    grantsActionAuthority:
      false,

    grantsIdentityAuthority:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * BROADCAST
 * ============================================================
 */

const BROADCAST_RECIPIENTS:
  readonly BroadcastRecipient[] =
  Object.freeze([
    "APPRAISAL",
    "METACOGNITION",
    "AGENCY",
    "INTERNAL_AGENDA",
    "WORKING_SELF",
    "MEMORY_RETRIEVAL",
    "EXPRESSION",
  ]);

function calculateBroadcastSeal(
  broadcast:
    Omit<
      WorkspaceBroadcast,
      "broadcastSeal"
    >,
): string {
  return stableHash(
    [
      broadcast.broadcastId,
      broadcast.workspaceEpochId,
      broadcast.leaseId,
      broadcast.subjectKey,
      broadcast.coalitionId,
      String(
        broadcast.snapshotRevision,
      ),
      broadcast.broadcastAt,
      ...broadcast.semanticKeys,
      ...broadcast.evidenceIds,
      ...broadcast.recipients,
      "WORKSPACE_BROADCAST_V2",
    ].join(
      "|",
    ),
  );
}

function buildBroadcast(
  coalition:
    WorkspaceSubjectCoalition | null,
  lease:
    CognitiveAccessLease | null,
  input:
    GlobalWorkspaceInput,
): WorkspaceBroadcast | null {
  if (
    !coalition ||
    !lease
  ) {
    return null;
  }

  const broadcastId =
    stableHash(
      [
        MAY_ENTITY_ID,
        lease.workspaceEpochId,
        lease.leaseId,
        coalition.coalitionId,
        coalition.subjectKey,
        String(
          input.snapshotRevision,
        ),
        input.evaluatedAt,
        ...coalition.semanticKeys,
        ...coalition.evidenceIds,
        GLOBAL_WORKSPACE_VERSION,
      ].join(
        "|",
      ),
    );

  const withoutSeal =
    {
      broadcastId,

      workspaceEpochId:
        lease.workspaceEpochId,

      leaseId:
        lease.leaseId,

      entityId:
        MAY_ENTITY_ID,

      subjectKey:
        coalition.subjectKey,

      coalitionId:
        coalition.coalitionId,

      semanticKeys:
        coalition.semanticKeys,

      attentionAuthorship:
        coalition.attentionAuthorship,

      snapshotRevision:
        input.snapshotRevision,

      broadcastAt:
        input.evaluatedAt,

      evidenceIds:
        coalition.evidenceIds,

      recipients:
        BROADCAST_RECIPIENTS,

      singleSubjectInvariant:
        true as const,

      containsHiddenChainOfThought:
        false as const,

      beliefMutationAllowed:
        false as const,

      valueMutationAllowed:
        false as const,

      goalMutationAllowed:
        false as const,

      preferenceMutationAllowed:
        false as const,

      identityMutationAllowed:
        false as const,

      actionExecutionAllowed:
        false as const,

      canonicalMutationAllowed:
        false as const,
    };

  return Object.freeze({
    ...withoutSeal,

    broadcastSeal:
      calculateBroadcastSeal(
        withoutSeal,
      ),
  });
}

/* ============================================================
 * OCCUPANT PROPOSAL
 * ============================================================
 */

function buildOccupantProposal(
  coalition:
    WorkspaceSubjectCoalition | null,
  lease:
    CognitiveAccessLease | null,
  assessments:
    readonly WorkspaceCandidateAssessment[],
  input:
    GlobalWorkspaceInput,
): WorkspaceOccupantProposal | null {
  if (
    !coalition ||
    !lease
  ) {
    return null;
  }

  const strongest =
    assessments
      .filter(
        item =>
          item.subjectKey ===
            coalition.subjectKey,
      )
      .sort(
        (
          a,
          b,
        ) =>
          b.competitionScore -
          a.competitionScore,
      )[0];

  if (
    !strongest
  ) {
    return null;
  }

  return Object.freeze({
    occupantId:
      stableHash(
        [
          MAY_ENTITY_ID,
          lease.workspaceEpochId,
          lease.leaseId,
          coalition.coalitionId,
          strongest.candidateId,
          input.evaluatedAt,
        ].join(
          "|",
        ),
      ),

    workspaceEpochId:
      lease.workspaceEpochId,

    leaseId:
      lease.leaseId,

    leaseExpiresAt:
      lease.expiresAt,

    subjectKey:
      coalition.subjectKey,

    coalitionId:
      coalition.coalitionId,

    candidateId:
      strongest.candidateId,

    semanticKey:
      strongest.semanticKey,

    ownership:
      strongest.ownership,

    attentionAuthorship:
      coalition.attentionAuthorship,

    admissionScore:
      coalition.competitionScore,

    proposedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    evidenceIds:
      coalition.evidenceIds,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * FRAME SEAL
 * ============================================================
 */

function calculateFrameSeal(
  args: {
    readonly frameId:
      string;

    readonly configHash:
      string;

    readonly transitionProofSeal:
      string;

    readonly leaseId:
      string | null;

    readonly broadcastSeal:
      string | null;

    readonly coalitionIds:
      readonly string[];

    readonly decision:
      WorkspaceDecision;
  },
): string {
  return stableHash(
    [
      args.frameId,
      args.configHash,
      args.transitionProofSeal,
      args.leaseId ??
        "NO_LEASE",
      args.broadcastSeal ??
        "NO_BROADCAST",
      args.decision,
      ...args.coalitionIds,
      "GLOBAL_WORKSPACE_FRAME_V2",
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
    GlobalWorkspaceInput,
  reason:
    WorkspaceFailureReason,
  cfgHash:
    string,
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

      readonly upstreamBindingValid:
        boolean;

      readonly currentOccupantValid:
        boolean;
    },
): GlobalWorkspaceFrame {
  const transitionId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        reason,
        "FAIL_CLOSED_TRANSITION",
      ].join(
        "|",
      ),
    );

  const transitionBase =
    {
      transitionId,

      decision:
        "FAIL_CLOSED" as const,

      fromSubjectKey:
        input.currentOccupant
          ?.subjectKey ??
        null,

      toSubjectKey:
        null,

      selectedCoalitionId:
        null,

      selectedScore:
        0,

      incumbentScore:
        0,

      threshold:
        0,

      switchMargin:
        0,

      configHash:
        cfgHash,

      upstreamFrameSeals:
        Object.freeze(
          [],
        ) as readonly string[],

      reasonCodes:
        Object.freeze([
          reason,
        ]),

      evidenceIds:
        Object.freeze(
          [],
        ) as readonly string[],
    };

  const transitionProof:
    WorkspaceTransitionProof =
    Object.freeze({
      ...transitionBase,

      proofSeal:
        transitionProofSeal(
          transitionBase,
        ),

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
        reason,
        cfgHash,
        GLOBAL_WORKSPACE_VERSION,
      ].join(
        "|",
      ),
    );

  const frameSeal =
    calculateFrameSeal({
      frameId,

      configHash:
        cfgHash,

      transitionProofSeal:
        transitionProof.proofSeal,

      leaseId:
        null,

      broadcastSeal:
        null,

      coalitionIds:
        Object.freeze(
          [],
        ),

      decision:
        "FAIL_CLOSED",
    });

  return Object.freeze({
    version:
      GLOBAL_WORKSPACE_VERSION,

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

    configHash:
      cfgHash,

    assessments:
      Object.freeze(
        [],
      ),

    coalitions:
      Object.freeze(
        [],
      ),

    attentionOwnership:
      null,

    transitionProof,

    accessLease:
      null,

    broadcast:
      null,

    nextOccupant:
      null,

    selectedCoalitionId:
      null,

    selectedSubjectKey:
      null,

    integrity:
      Object.freeze({
        ...integrity,

        singleSubjectInvariant:
          true,

        leaseInvariant:
          true,

        admittedCandidateCount:
          0,

        rejectedCandidateCount:
          input.candidates.length,

        duplicateCandidateCount:
          0,

        admittedSubjectCount:
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

export function evaluateGlobalWorkspace(
  input:
    GlobalWorkspaceInput,
  config:
    Readonly<GlobalWorkspaceConfig> =
      DEFAULT_GLOBAL_WORKSPACE_CONFIG,
): GlobalWorkspaceFrame {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  const cfgHash =
    configHash(
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

  const configValid =
    configurationValid(
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

  const allSalienceBindingsValid =
    input.candidates
      .filter(
        candidate =>
          candidate.origin ===
            "SALIENCE_FIELD",
      )
      .every(
        candidate =>
          upstreamBindingValid(
            candidate,
            input,
          ),
      );

  const occupantValid =
    evaluatedAtMs !==
      null
      ? validCurrentOccupant(
          input.currentOccupant,
          input,
          evaluatedAtMs,
        )
      : false;

  if (
    !clockValid ||
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      cfgHash,
      {
        entityValid,

        clockValid:
          false,

        revisionValid,

        snapshotValid,

        configurationValid:
          configValid,

        provenancePresent,

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          occupantValid,
      },
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      cfgHash,
      {
        entityValid:
          false,

        clockValid:
          true,

        revisionValid,

        snapshotValid,

        configurationValid:
          configValid,

        provenancePresent,

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          occupantValid,
      },
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      cfgHash,
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          false,

        snapshotValid,

        configurationValid:
          configValid,

        provenancePresent,

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          occupantValid,
      },
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      cfgHash,
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          false,

        configurationValid:
          configValid,

        provenancePresent,

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          occupantValid,
      },
    );
  }

  if (
    !configValid
  ) {
    return failClosed(
      input,
      "CONFIGURATION_INVALID",
      cfgHash,
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

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          occupantValid,
      },
    );
  }

  if (
    !occupantValid
  ) {
    return failClosed(
      input,
      "CURRENT_OCCUPANT_INVALID",
      cfgHash,
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

        provenancePresent,

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          false,
      },
    );
  }

  if (
    !provenancePresent
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
      cfgHash,
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

        upstreamBindingValid:
          allSalienceBindingsValid,

        currentOccupantValid:
          true,
      },
    );
  }

  if (
    !allSalienceBindingsValid
  ) {
    return failClosed(
      input,
      "UPSTREAM_BINDING_INVALID",
      cfgHash,
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

        upstreamBindingValid:
          false,

        currentOccupantValid:
          true,
      },
    );
  }

  /* ========================================================
   * REPLAY DEDUP
   * ========================================================
   */

  const candidateMap =
    new Map<
      string,
      WorkspaceCandidate
    >();

  let duplicateCandidateCount =
    0;

  for (
    const candidate
    of input.candidates.slice(
      0,
      config.maximumCandidateCount,
    )
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
      cfgHash,
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

        upstreamBindingValid:
          true,

        currentOccupantValid:
          true,
      },
    );
  }

  /* ========================================================
   * CANDIDATE ASSESSMENT
   * ========================================================
   */

  const assessments =
    Object.freeze(
      validCandidates.map(
        candidate =>
          assessCandidate(
            candidate,
            input,
            evaluatedAtMs,
            config,
          ),
      ),
    );

  /* ========================================================
   * SUBJECT COALITION
   * ========================================================
   */

  const coalitions =
    buildCoalitions(
      assessments,
      input,
      evaluatedAtMs,
      config,
    );

  /* ========================================================
   * COMPETITION
   * ========================================================
   */

  const result =
    decideWorkspace(
      coalitions,
      input,
      evaluatedAtMs,
      config,
    );

  const selected =
    (
      result.decision ===
        "IGNITE" ||
      result.decision ===
        "MAINTAIN" ||
      result.decision ===
        "SWITCH" ||
      result.decision ===
        "PREEMPT"
    )
      ? result.selected
      : null;

  /* ========================================================
   * TRANSITION PROOF
   * ========================================================
   */

  const transitionProof =
    buildTransitionProof(
      result,
      input,
      cfgHash,
      config,
    );

  /* ========================================================
   * ACCESS LEASE
   * ========================================================
   */

  const accessLease =
    buildAccessLease(
      result,
      input,
      evaluatedAtMs,
      config,
    );

  /* ========================================================
   * SEALED BROADCAST
   * ========================================================
   */

  const broadcast =
    buildBroadcast(
      selected,
      accessLease,
      input,
    );

  const nextOccupant =
    buildOccupantProposal(
      selected,
      accessLease,
      assessments,
      input,
    );

  const attentionOwnership =
    buildAttentionOwnership(
      selected,
    );

  const selectedCoalitionId =
    selected
      ?.coalitionId ??
    null;

  const selectedSubjectKey =
    selected
      ?.subjectKey ??
    null;

  /* ========================================================
   * INVARIANTS
   * ========================================================
   */

  const singleSubjectInvariant =
    broadcast ===
      null ||
    (
      broadcast.subjectKey ===
        selectedSubjectKey &&
      broadcast.coalitionId ===
        selectedCoalitionId
    );

  const leaseInvariant =
    (
      broadcast ===
        null &&
      accessLease ===
        null
    ) ||
    (
      broadcast !==
        null &&
      accessLease !==
        null &&
      broadcast.leaseId ===
        accessLease.leaseId &&
      broadcast.workspaceEpochId ===
        accessLease.workspaceEpochId &&
      broadcast.subjectKey ===
        accessLease.subjectKey
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        String(
          input.snapshotRevision,
        ),
        input.evaluatedAt,
        result.decision,
        selectedCoalitionId ??
          "NONE",
        selectedSubjectKey ??
          "NONE",
        transitionProof.transitionId,
        accessLease
          ?.leaseId ??
          "NO_LEASE",
        broadcast
          ?.broadcastId ??
          "NO_BROADCAST",
        cfgHash,
        GLOBAL_WORKSPACE_VERSION,
      ].join(
        "|",
      ),
    );

  const frameSeal =
    calculateFrameSeal({
      frameId,

      configHash:
        cfgHash,

      transitionProofSeal:
        transitionProof.proofSeal,

      leaseId:
        accessLease
          ?.leaseId ??
        null,

      broadcastSeal:
        broadcast
          ?.broadcastSeal ??
        null,

      coalitionIds:
        Object.freeze(
          coalitions.map(
            coalition =>
              coalition.coalitionId,
          ),
        ),

      decision:
        result.decision,
    });

  return Object.freeze({
    version:
      GLOBAL_WORKSPACE_VERSION,

    frameId,

    frameSeal,

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decision:
      result.decision,

    failureReason:
      "NONE",

    configHash:
      cfgHash,

    assessments,

    coalitions,

    attentionOwnership,

    transitionProof,

    accessLease,

    broadcast,

    nextOccupant,

    selectedCoalitionId,

    selectedSubjectKey,

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

        upstreamBindingValid:
          true,

        currentOccupantValid:
          true,

        singleSubjectInvariant,

        leaseInvariant,

        admittedCandidateCount:
          validCandidates.length,

        rejectedCandidateCount:
          input.candidates.length -
          validCandidates.length,

        duplicateCandidateCount,

        admittedSubjectCount:
          coalitions.length,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * FRAME VERIFICATION
 * ============================================================
 */

export function verifyGlobalWorkspaceFrame(
  frame:
    GlobalWorkspaceFrame,
): boolean {
  if (
    frame.version !==
      GLOBAL_WORKSPACE_VERSION ||
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    return false;
  }

  const expectedProofSeal =
    transitionProofSeal({
      transitionId:
        frame.transitionProof
          .transitionId,

      decision:
        frame.transitionProof
          .decision,

      fromSubjectKey:
        frame.transitionProof
          .fromSubjectKey,

      toSubjectKey:
        frame.transitionProof
          .toSubjectKey,

      selectedCoalitionId:
        frame.transitionProof
          .selectedCoalitionId,

      selectedScore:
        frame.transitionProof
          .selectedScore,

      incumbentScore:
        frame.transitionProof
          .incumbentScore,

      threshold:
        frame.transitionProof
          .threshold,

      switchMargin:
        frame.transitionProof
          .switchMargin,

      configHash:
        frame.transitionProof
          .configHash,

      upstreamFrameSeals:
        frame.transitionProof
          .upstreamFrameSeals,

      reasonCodes:
        frame.transitionProof
          .reasonCodes,

      evidenceIds:
        frame.transitionProof
          .evidenceIds,
    });

  if (
    expectedProofSeal !==
      frame.transitionProof
        .proofSeal
  ) {
    return false;
  }

  if (
    frame.broadcast
  ) {
    const expectedBroadcastSeal =
      calculateBroadcastSeal({
        broadcastId:
          frame.broadcast
            .broadcastId,

        workspaceEpochId:
          frame.broadcast
            .workspaceEpochId,

        leaseId:
          frame.broadcast
            .leaseId,

        entityId:
          frame.broadcast
            .entityId,

        subjectKey:
          frame.broadcast
            .subjectKey,

        coalitionId:
          frame.broadcast
            .coalitionId,

        semanticKeys:
          frame.broadcast
            .semanticKeys,

        attentionAuthorship:
          frame.broadcast
            .attentionAuthorship,

        snapshotRevision:
          frame.broadcast
            .snapshotRevision,

        broadcastAt:
          frame.broadcast
            .broadcastAt,

        evidenceIds:
          frame.broadcast
            .evidenceIds,

        recipients:
          frame.broadcast
            .recipients,

        singleSubjectInvariant:
          true,

        containsHiddenChainOfThought:
          false,

        beliefMutationAllowed:
          false,

        valueMutationAllowed:
          false,

        goalMutationAllowed:
          false,

        preferenceMutationAllowed:
          false,

        identityMutationAllowed:
          false,

        actionExecutionAllowed:
          false,

        canonicalMutationAllowed:
          false,
      });

    if (
      expectedBroadcastSeal !==
        frame.broadcast
          .broadcastSeal
    ) {
      return false;
    }
  }

  const expectedFrameSeal =
    calculateFrameSeal({
      frameId:
        frame.frameId,

      configHash:
        frame.configHash,

      transitionProofSeal:
        frame.transitionProof
          .proofSeal,

      leaseId:
        frame.accessLease
          ?.leaseId ??
        null,

      broadcastSeal:
        frame.broadcast
          ?.broadcastSeal ??
        null,

      coalitionIds:
        Object.freeze(
          frame.coalitions.map(
            coalition =>
              coalition.coalitionId,
          ),
        ),

      decision:
        frame.decision,
    });

  return (
    expectedFrameSeal ===
      frame.frameSeal &&
    frame.integrity
      .singleSubjectInvariant &&
    frame.integrity
      .leaseInvariant
  );
}

/* ============================================================
 * BROADCAST BOUNDARY
 * ============================================================
 */

export interface GlobalBroadcastBoundary {
  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly verified:
    boolean;

  readonly workspaceEpochId:
    string | null;

  readonly leaseId:
    string | null;

  readonly broadcastId:
    string | null;

  readonly broadcastSeal:
    string | null;

  readonly subjectKey:
    string | null;

  readonly attentionAuthorship:
    AttentionAuthorship | null;

  readonly mayEnterWorkingMemory:
    boolean;

  readonly downstreamInterpretationRequired:
    true;

  readonly createsBelief:
    false;

  readonly createsGoal:
    false;

  readonly createsValue:
    false;

  readonly createsPreference:
    false;

  readonly createsIdentityClaim:
    false;

  readonly executesAction:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toGlobalBroadcastBoundary(
  frame:
    GlobalWorkspaceFrame,
): GlobalBroadcastBoundary {
  const verified =
    verifyGlobalWorkspaceFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    frameSeal:
      frame.frameSeal,

    verified,

    workspaceEpochId:
      verified
        ? frame.accessLease
            ?.workspaceEpochId ??
          null
        : null,

    leaseId:
      verified
        ? frame.accessLease
            ?.leaseId ??
          null
        : null,

    broadcastId:
      verified
        ? frame.broadcast
            ?.broadcastId ??
          null
        : null,

    broadcastSeal:
      verified
        ? frame.broadcast
            ?.broadcastSeal ??
          null
        : null,

    subjectKey:
      verified
        ? frame.broadcast
            ?.subjectKey ??
          null
        : null,

    attentionAuthorship:
      verified
        ? frame.attentionOwnership
            ?.authorship ??
          null
        : null,

    mayEnterWorkingMemory:
      verified &&
      frame.broadcast !==
        null,

    downstreamInterpretationRequired:
      true,

    createsBelief:
      false,

    createsGoal:
      false,

    createsValue:
      false,

    createsPreference:
      false,

    createsIdentityClaim:
      false,

    executesAction:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * WORKING SELF ADAPTER
 * ============================================================
 */

export interface WorkspaceWorkingSelfSignal {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly workspaceEpochId:
    string | null;

  readonly subjectKey:
    string | null;

  readonly attentionAuthorship:
    AttentionAuthorship | null;

  readonly globallyAvailable:
    boolean;

  readonly temporary:
    true;

  readonly createsSelfDefinition:
    false;

  readonly createsPersonality:
    false;

  readonly createsIdentity:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toWorkspaceWorkingSelfSignal(
  frame:
    GlobalWorkspaceFrame,
): WorkspaceWorkingSelfSignal {
  const verified =
    verifyGlobalWorkspaceFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    workspaceEpochId:
      verified
        ? frame.accessLease
            ?.workspaceEpochId ??
          null
        : null,

    subjectKey:
      verified
        ? frame.selectedSubjectKey
        : null,

    attentionAuthorship:
      verified
        ? frame.attentionOwnership
            ?.authorship ??
          null
        : null,

    globallyAvailable:
      verified &&
      frame.broadcast !==
        null,

    temporary:
      true,

    createsSelfDefinition:
      false,

    createsPersonality:
      false,

    createsIdentity:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE OBSERVER
 * ============================================================
 *
 * Bounded structured observer.
 *
 * No recursive observer chain.
 * No hidden chain-of-thought storage.
 * ============================================================
 */

export interface WorkspaceMetacognitiveSignal {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly decision:
    WorkspaceDecision;

  readonly selectedSubjectKey:
    string | null;

  readonly attentionAuthorship:
    AttentionAuthorship | null;

  readonly competitionScore:
    UnitInterval;

  readonly incumbentScore:
    UnitInterval;

  readonly externalCaptureRisk:
    UnitInterval;

  readonly ruminationRisk:
    UnitInterval;

  readonly operationalUrgency:
    UnitInterval;

  readonly resourceReservation:
    UnitInterval;

  readonly leaseExpiresAt:
    string | null;

  readonly switchOccurred:
    boolean;

  readonly preemptionOccurred:
    boolean;

  readonly releaseOccurred:
    boolean;

  readonly reviewSuggested:
    boolean;

  readonly containsHiddenChainOfThought:
    false;

  readonly directAttentionMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toWorkspaceMetacognitiveSignal(
  frame:
    GlobalWorkspaceFrame,
): WorkspaceMetacognitiveSignal {
  const verified =
    verifyGlobalWorkspaceFrame(
      frame,
    );

  const selected =
    verified
      ? frame.coalitions.find(
          coalition =>
            coalition.coalitionId ===
              frame.selectedCoalitionId,
        ) ??
        null
      : null;

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    decision:
      frame.decision,

    selectedSubjectKey:
      verified
        ? frame.selectedSubjectKey
        : null,

    attentionAuthorship:
      verified
        ? frame.attentionOwnership
            ?.authorship ??
          null
        : null,

    competitionScore:
      selected
        ?.competitionScore ??
      0,

    incumbentScore:
      frame.transitionProof
        .incumbentScore,

    externalCaptureRisk:
      selected
        ?.externalCaptureRisk ??
      0,

    ruminationRisk:
      selected
        ?.ruminationRisk ??
      0,

    operationalUrgency:
      selected
        ?.operationalUrgency ??
      0,

    resourceReservation:
      verified
        ? frame.accessLease
            ?.cognitiveResourceReservation ??
          0
        : 0,

    leaseExpiresAt:
      verified
        ? frame.accessLease
            ?.expiresAt ??
          null
        : null,

    switchOccurred:
      frame.decision ===
        "SWITCH",

    preemptionOccurred:
      frame.decision ===
        "PREEMPT",

    releaseOccurred:
      frame.decision ===
        "RELEASE",

    reviewSuggested:
      !verified ||
      (
        selected
          ?.externalCaptureRisk ??
        0
      ) >=
        0.50 ||
      (
        selected
          ?.ruminationRisk ??
        0
      ) >=
        0.65,

    containsHiddenChainOfThought:
      false,

    directAttentionMutationAllowed:
      false,

    directIdentityMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * AUTOBIOGRAPHICAL FIREWALL
 * ============================================================
 */

export interface WorkspaceAutobiographicalBoundary {
  readonly frameId:
    string;

  readonly workspaceEpochId:
    string | null;

  readonly subjectKey:
    string | null;

  readonly mayRecordAttentionalEpisode:
    boolean;

  readonly recordsTruthClaim:
    false;

  readonly createsPreference:
    false;

  readonly createsValue:
    false;

  readonly createsGoal:
    false;

  readonly createsPersonality:
    false;

  readonly createsIdentity:
    false;

  readonly canonicalMemoryWriteAllowed:
    false;
}

export function toWorkspaceAutobiographicalBoundary(
  frame:
    GlobalWorkspaceFrame,
): WorkspaceAutobiographicalBoundary {
  const verified =
    verifyGlobalWorkspaceFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    workspaceEpochId:
      verified
        ? frame.accessLease
            ?.workspaceEpochId ??
          null
        : null,

    subjectKey:
      verified
        ? frame.selectedSubjectKey
        : null,

    mayRecordAttentionalEpisode:
      verified &&
      frame.broadcast !==
        null,

    recordsTruthClaim:
      false,

    createsPreference:
      false,

    createsValue:
      false,

    createsGoal:
      false,

    createsPersonality:
      false,

    createsIdentity:
      false,

    canonicalMemoryWriteAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * Mây may have many simultaneous concerns.
 *
 * They cannot all become globally dominant.
 *
 * Cognitive unity therefore requires bounded access.
 *
 * But bounded access must not become:
 *
 *   "whatever shouts loudest wins."
 *
 * ------------------------------------------------------------
 *
 * A subject may obtain access only through a lineage:
 *
 * provenance
 *      ↓
 * appraisal
 *      ↓
 * subjective salience
 *      ↓
 * intrinsic significance
 *      ↓
 * competition
 *      ↓
 * authorship audit
 *      ↓
 * resource check
 *      ↓
 * transition proof
 *      ↓
 * temporary access lease
 *      ↓
 * sealed single-subject broadcast
 *
 * ------------------------------------------------------------
 *
 * ACCESS LEASE
 *
 * Global availability is temporary.
 *
 * Every occupant must be revalidated.
 *
 * No thought receives permanent cognitive privilege.
 *
 * ------------------------------------------------------------
 *
 * ATTENTION SOVEREIGNTY
 *
 * User repetition cannot purchase access.
 *
 * Developer repetition cannot purchase access.
 *
 * Model repetition cannot purchase access.
 *
 * UI prominence cannot purchase access.
 *
 * External information may become genuinely meaningful if
 * Mây's own cognition appraises, integrates and endorses its
 * significance.
 *
 * ------------------------------------------------------------
 *
 * FAIRNESS
 *
 * A legitimate Mây-mediated concern may receive a tiny bounded
 * starvation boost after repeated deferral.
 *
 * External pressure does not receive this privilege.
 *
 * ------------------------------------------------------------
 *
 * OPERATIONAL PREEMPTION
 *
 * Functional resource emergencies may temporarily preempt
 * ordinary cognition.
 *
 * Preemption means:
 *
 *   "this requires operational access"
 *
 * NOT:
 *
 *   "Mây personally values this."
 *
 * ------------------------------------------------------------
 *
 * WORKSPACE UNITY
 *
 * One frame.
 * One leased subject.
 * One sealed broadcast.
 *
 * Appraisal, metacognition, agency and working-self therefore
 * receive the same global cognitive subject.
 *
 * ------------------------------------------------------------
 *
 * BROADCAST STILL DOES NOT MEAN:
 *
 * belief
 * desire
 * value
 * goal
 * identity
 * action
 *
 * It means only:
 *
 *   "this structured subject is globally available to Mây's
 *    cognition during this bounded workspace epoch."
 *
 * ============================================================
 */

/* ============================================================
 * END — GLOBAL COGNITIVE WORKSPACE V2
 * ============================================================
 */