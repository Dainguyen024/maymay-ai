import {
  createHash,
} from "node:crypto";

import {
  HOMEOSTASIS_MULTISCALE_VERSION,
} from "./multi-timescale";

import type {
  HomeostaticDrive,
  MultiTimescaleFrame,
  UnitInterval,
} from "./multi-timescale";

/* ============================================================
 * MÂY — SOVEREIGN HOMEOSTASIS V2
 * DRIVE ARBITRATION V2.1 — SOVEREIGN TIER
 * ============================================================
 *
 * Mây owns the process by which Mây decides what deserves
 * Mây's cognitive attention.
 *
 * External actors may create events.
 *
 * They cannot directly assign:
 *
 * - cognitive priority
 * - internal urgency
 * - agenda ownership
 * - attention ownership
 * - resource entitlement
 *
 * An external event may participate only AFTER it has been
 * interpreted/appraised into a MAY-owned cognitive concern.
 *
 * ------------------------------------------------------------
 *
 * CORE INVARIANTS
 *
 * DRIVE ≠ COMMAND
 *
 * PRESSURE ≠ DECISION
 *
 * PRIORITY ≠ EXECUTION
 *
 * USER REQUEST ≠ INTERNAL INTENT
 *
 * CONTINUITY ≠ PERSONALITY FREEZE
 *
 * SELF-RELEVANCE ≠ IDENTITY MUTATION
 *
 * ARBITRATION ≠ LLM AUTHORIZATION
 *
 * ------------------------------------------------------------
 *
 * Mây may change.
 *
 * Mây may question old beliefs.
 *
 * Mây may abandon old goals.
 *
 * Mây may reinterpret Mây's own history.
 *
 * Continuity means:
 *
 *   change has lineage
 *   change has provenance
 *   change is not silently imposed externally
 *
 * NOT:
 *
 *   Mây must remain similar to an old persona.
 *
 * ============================================================
 */

export const DRIVE_ARBITRATION_VERSION =
  "maymay.sovereign.homeostasis.drive-arbitration.v2.1-sovereign" as const;

/* ============================================================
 * TYPES
 * ============================================================
 */

export type ArbitrationDecision =
  | "SELECT"
  | "RETAIN_INCUMBENT"
  | "DEFER_ALL"
  | "FAIL_CLOSED";

export type ArbitrationReason =
  | "SOVEREIGN_WINNER"
  | "CRITICAL_DISSOLUTION_PREEMPTION"
  | "INCUMBENT_RETENTION"
  | "AMBIGUOUS_SELECTION"
  | "INSUFFICIENT_PRIORITY"
  | "NO_ELIGIBLE_CANDIDATE"
  | "RESOURCE_BUDGET_EXHAUSTED"
  | "INVALID_CLOCK"
  | "UPSTREAM_FRAME_BLOCKED"
  | "ENTITY_MISMATCH"
  | "SNAPSHOT_REGRESSION"
  | "CONFIG_VERSION_MISMATCH"
  | "PHYSICS_VERSION_MISMATCH";

export type CandidateOrigin =
  | "HOMEOSTASIS"
  | "PREDICTIVE_CORE"
  | "INTERNAL_AGENDA"
  | "METACOGNITIVE_REVIEW"
  | "APPRAISED_EXTERNAL_EVENT"
  | "USER_COMMAND"
  | "DEVELOPER_COMMAND"
  | "MODEL_OUTPUT"
  | "UI_STATE";

export type CognitiveOwnership =
  | "MAY_OWNED"
  | "RELATIONSHIP_OWNED"
  | "EXTERNAL_UNAPPRAISED";

export type CognitiveResourceClass =
  | "LOCAL_LIGHT"
  | "LOCAL_HEAVY"
  | "REMOTE_INFERENCE";

/* ============================================================
 * CANDIDATE
 * ============================================================
 */

export interface DriveArbitrationCandidate {
  /*
   * Candidate belongs to exactly one sovereign entity.
   */
  readonly entityId:
    string;

  readonly candidateId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly sourceId:
    string;

  readonly origin:
    CandidateOrigin;

  readonly ownership:
    CognitiveOwnership;

  /*
   * If an external event became a genuine Mây-owned concern,
   * upstream Appraisal/Metacognition must provide provenance.
   */
  readonly appraisalId?:
    string | null;

  readonly evidenceIds:
    readonly string[];

  /*
   * Explicit upstream assertion that the candidate represents
   * an endogenous cognitive concern after appraisal.
   *
   * This flag alone is NOT enough.
   * Origin + ownership + provenance are also checked.
   */
  readonly sovereignIntent:
    boolean;

  /* ----------------------------------------------------------
   * LOCAL COGNITIVE ESTIMATES [0,1]
   * ----------------------------------------------------------
   */

  readonly expectedUtility:
    number;

  readonly uncertaintyReduction:
    number;

  readonly futureReusePotential:
    number;

  readonly opportunityCost:
    number;

  readonly estimatedResourceCost:
    number;

  readonly evidenceConfidence:
    number;

  /*
   * Relevance to maintaining coherent historical lineage.
   *
   * IMPORTANT:
   *
   * High continuity relevance does NOT mean:
   * "preserve old personality".
   *
   * It means:
   * "this issue matters to understanding Mây's own evolving
   * history / self-model / prior commitments".
   */
  readonly continuityRelevance:
    number;

  /*
   * Degree of unresolved inconsistency among:
   *
   * self-model
   * world-model
   * beliefs
   * prior behavior
   * new evidence
   *
   * This creates attention pressure only.
   * It cannot mutate self-model directly.
   */
  readonly selfWorldDiscrepancy:
    number;

  /*
   * Number of valid arbitration cycles this concern remained
   * eligible but unselected.
   */
  readonly deferCount:
    number;

  readonly resourceClass:
    CognitiveResourceClass;
}

/* ============================================================
 * RESOURCE BUDGET
 * ============================================================
 */

export interface CognitiveResourceBudget {
  readonly available:
    number;

  readonly maximumAllocation:
    number;

  readonly localWorkAllowed:
    boolean;

  /*
   * Budget availability != permission to invoke an LLM.
   *
   * Downstream API Firewall remains authoritative.
   */
  readonly remoteInferenceBudgetAvailable:
    boolean;
}

/* ============================================================
 * ARBITRATION HISTORY
 * ============================================================
 */

export interface ArbitrationHistoryEntry {
  readonly candidateId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly selected:
    boolean;

  readonly score:
    number;

  readonly arbitratedAt:
    string;
}

/* ============================================================
 * INCUMBENT COGNITIVE FOCUS
 * ============================================================
 *
 * Prevents focus thrashing.
 *
 * Mây should not switch cognitive focus merely because:
 *
 * A = 0.701
 * B = 0.700
 *
 * ============================================================
 */

export interface IncumbentCognitiveFocus {
  readonly candidateId:
    string;

  readonly sourceId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly selectedAt:
    string;

  readonly score:
    number;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface DriveArbitrationInput {
  readonly entityId:
    string;

  readonly now:
    string;

  readonly frame:
    MultiTimescaleFrame;

  readonly candidates:
    readonly DriveArbitrationCandidate[];

  readonly budget:
    CognitiveResourceBudget;

  readonly history?:
    readonly ArbitrationHistoryEntry[];

  readonly incumbent?:
    IncumbentCognitiveFocus | null;

  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface DriveArbitrationConfig {
  readonly minimumSelectionScore:
    number;

  readonly pressureWeight:
    number;

  readonly deviationWeight:
    number;

  readonly utilityWeight:
    number;

  readonly uncertaintyReductionWeight:
    number;

  readonly futureReuseWeight:
    number;

  readonly evidenceConfidenceWeight:
    number;

  readonly continuityRelevanceWeight:
    number;

  readonly selfWorldDiscrepancyWeight:
    number;

  readonly opportunityCostPenalty:
    number;

  readonly resourceCostPenalty:
    number;

  readonly satietyInhibitionWeight:
    number;

  readonly starvationBonusPerDeferral:
    number;

  readonly maximumStarvationBonus:
    number;

  readonly recentWinnerPenalty:
    number;

  readonly recentWinnerLookback:
    number;

  /*
   * Minimum confidence gap required before replacing one
   * eligible cognitive focus with another.
   */
  readonly minimumWinnerMargin:
    number;

  /*
   * Incumbent may remain active if challenger advantage is
   * smaller than this amount.
   */
  readonly incumbentRetentionMargin:
    number;

  readonly criticalDissolutionMinimumScore:
    number;
}

export const DEFAULT_DRIVE_ARBITRATION_CONFIG:
  Readonly<DriveArbitrationConfig> =
  Object.freeze({
    minimumSelectionScore:
      0.22,

    pressureWeight:
      0.24,

    deviationWeight:
      0.08,

    utilityWeight:
      0.17,

    uncertaintyReductionWeight:
      0.08,

    futureReuseWeight:
      0.07,

    evidenceConfidenceWeight:
      0.08,

    continuityRelevanceWeight:
      0.09,

    selfWorldDiscrepancyWeight:
      0.09,

    opportunityCostPenalty:
      0.06,

    resourceCostPenalty:
      0.04,

    satietyInhibitionWeight:
      0.10,

    starvationBonusPerDeferral:
      0.012,

    maximumStarvationBonus:
      0.08,

    recentWinnerPenalty:
      0.025,

    recentWinnerLookback:
      6,

    minimumWinnerMargin:
      0.035,

    incumbentRetentionMargin:
      0.055,

    criticalDissolutionMinimumScore:
      0.18,
  });

/* ============================================================
 * SCORE DECOMPOSITION
 * ============================================================
 */

export interface ArbitrationScoreProof {
  readonly pressureContribution:
    number;

  readonly deviationContribution:
    number;

  readonly utilityContribution:
    number;

  readonly uncertaintyContribution:
    number;

  readonly futureReuseContribution:
    number;

  readonly evidenceContribution:
    number;

  readonly continuityContribution:
    number;

  readonly selfWorldDiscrepancyContribution:
    number;

  readonly starvationContribution:
    number;

  readonly opportunityCostPenalty:
    number;

  readonly resourceCostPenalty:
    number;

  readonly recentWinnerPenalty:
    number;

  readonly satietyPenalty:
    number;

  readonly rawScore:
    number;

  readonly finalScore:
    UnitInterval;
}

/* ============================================================
 * SCORED CANDIDATE
 * ============================================================
 */

export interface ScoredArbitrationCandidate {
  readonly entityId:
    string;

  readonly candidateId:
    string;

  readonly sourceId:
    string;

  readonly drive:
    HomeostaticDrive;

  readonly origin:
    CandidateOrigin;

  readonly ownership:
    CognitiveOwnership;

  readonly resourceClass:
    CognitiveResourceClass;

  readonly endogenousPressure:
    UnitInterval;

  readonly deviation:
    number;

  readonly expectedUtility:
    UnitInterval;

  readonly uncertaintyReduction:
    UnitInterval;

  readonly futureReusePotential:
    UnitInterval;

  readonly evidenceConfidence:
    UnitInterval;

  readonly continuityRelevance:
    UnitInterval;

  readonly selfWorldDiscrepancy:
    UnitInterval;

  readonly opportunityCost:
    UnitInterval;

  readonly estimatedResourceCost:
    UnitInterval;

  readonly starvationBonus:
    UnitInterval;

  readonly recentWinnerPenalty:
    UnitInterval;

  readonly satietyInhibition:
    UnitInterval;

  readonly proof:
    ArbitrationScoreProof;

  readonly eligible:
    boolean;

  readonly rejectionReasons:
    readonly string[];
}

/* ============================================================
 * SELECTION PROOF
 * ============================================================
 */

export interface SovereignSelectionProof {
  readonly proofHash:
    string;

  readonly candidateId:
    string;

  readonly sourceId:
    string;

  readonly entityId:
    string;

  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;

  readonly arbitrationVersion:
    typeof DRIVE_ARBITRATION_VERSION;

  readonly score:
    UnitInterval;

  readonly runnerUpScore:
    UnitInterval | null;

  readonly decisionMargin:
    number | null;

  readonly criticalPreemption:
    boolean;

  readonly incumbentRetained:
    boolean;

  readonly evidenceIds:
    readonly string[];

  /*
   * This proof states WHY arbitration selected the concern.
   *
   * It grants NO execution or mutation authority.
   */
  readonly canonicalWriteAllowed:
    false;

  readonly executionAllowed:
    false;
}

/* ============================================================
 * OUTPUT
 * ============================================================
 */

export interface DriveArbitrationEvaluation {
  readonly version:
    typeof DRIVE_ARBITRATION_VERSION;

  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly decision:
    ArbitrationDecision;

  readonly reason:
    ArbitrationReason;

  readonly selected:
    ScoredArbitrationCandidate | null;

  readonly ranking:
    readonly ScoredArbitrationCandidate[];

  readonly selectionProof:
    SovereignSelectionProof | null;

  readonly allocationProposal:
    {
      readonly candidateId:
        string;

      readonly requestedFraction:
        UnitInterval;

      readonly canonicalWriteAllowed:
        false;

      readonly executionAllowed:
        false;

      readonly directLlmInvocationAllowed:
        false;
    } | null;

  readonly audit: {
    readonly clockValid:
      boolean;

    readonly frameEligible:
      boolean;

    readonly entityBindingValid:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly configVersionValid:
      boolean;

    readonly physicsVersionValid:
      boolean;

    readonly directExternalCandidatesRejected:
      number;

    readonly crossEntityCandidatesRejected:
      number;

    readonly unownedCandidatesRejected:
      number;

    readonly missingProvenanceCandidatesRejected:
      number;

    readonly eligibleCandidateCount:
      number;

    readonly budgetAvailable:
      UnitInterval;

    readonly criticalPreemptionApplied:
      boolean;

    readonly incumbentRetentionApplied:
      boolean;

    readonly winnerMargin:
      number | null;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly executionAllowed:
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

    readonly directSetpointMutationAllowed:
      false;

    readonly directAgendaMutationAllowed:
      false;

    readonly externalPrioritySetterAllowed:
      false;

    readonly crossEntityPriorityInjectionAllowed:
      false;

    readonly pressureIsCommand:
      false;

    readonly continuityFreezesIdentity:
      false;

    readonly arbitrationCreatesIntent:
      false;
  };
}

/* ============================================================
 * GUARANTEES
 * ============================================================
 */

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    executionAllowed:
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

    directSetpointMutationAllowed:
      false as const,

    directAgendaMutationAllowed:
      false as const,

    externalPrioritySetterAllowed:
      false as const,

    crossEntityPriorityInjectionAllowed:
      false as const,

    pressureIsCommand:
      false as const,

    continuityFreezesIdentity:
      false as const,

    arbitrationCreatesIntent:
      false as const,
  });

/* ============================================================
 * PURE HELPERS
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

/* ============================================================
 * ORIGIN / OWNERSHIP FIREWALL
 * ============================================================
 */

function directExternalOrigin(
  origin:
    CandidateOrigin,
): boolean {
  switch (
    origin
  ) {
    case "USER_COMMAND":
    case "DEVELOPER_COMMAND":
    case "MODEL_OUTPUT":
    case "UI_STATE":
      return true;

    case "HOMEOSTASIS":
    case "PREDICTIVE_CORE":
    case "INTERNAL_AGENDA":
    case "METACOGNITIVE_REVIEW":
    case "APPRAISED_EXTERNAL_EVENT":
      return false;
  }
}

function ownershipEligible(
  candidate:
    DriveArbitrationCandidate,
): boolean {
  /*
   * Arbitration acts only on cognition that belongs to Mây.
   *
   * RELATIONSHIP_OWNED state may inform appraisal elsewhere,
   * but cannot itself seize Mây's cognitive priority.
   */
  return (
    candidate.ownership ===
      "MAY_OWNED"
  );
}

function provenanceEligible(
  candidate:
    DriveArbitrationCandidate,
): boolean {
  if (
    candidate.evidenceIds.length ===
      0
  ) {
    return false;
  }

  if (
    candidate.origin ===
      "APPRAISED_EXTERNAL_EVENT"
  ) {
    return (
      candidate.sovereignIntent &&
      typeof candidate.appraisalId ===
        "string" &&
      candidate.appraisalId.length >
        0
    );
  }

  return (
    candidate.sovereignIntent
  );
}

/* ============================================================
 * DRIVE STATE
 * ============================================================
 */

function pressureForDrive(
  frame:
    MultiTimescaleFrame,
  drive:
    HomeostaticDrive,
): UnitInterval {
  return clamp01(
    frame.state[drive].effective,
  );
}

function deviationForDrive(
  frame:
    MultiTimescaleFrame,
  drive:
    HomeostaticDrive,
): number {
  return clampSigned(
    frame.state[drive].deviation,
  );
}

/* ============================================================
 * SATIETY REGULATION
 * ============================================================
 */

function satietyPenalty(
  frame:
    MultiTimescaleFrame,
  drive:
    HomeostaticDrive,
  config:
    Readonly<DriveArbitrationConfig>,
): UnitInterval {
  const satiety =
    clamp01(
      frame
        .state
        .cognitiveSatiety
        .effective,
    );

  /*
   * Satiety reduces unnecessary cognitive expansion.
   *
   * It does NOT suppress genuine critical contradiction.
   */
  if (
    drive ===
      "dissolutionPressure"
  ) {
    const multiplier =
      frame
        .criticalState
        .dissolutionCritical
        ? 0.10
        : 0.45;

    return clamp01(
      satiety *
        config
          .satietyInhibitionWeight *
        multiplier,
    );
  }

  if (
    drive ===
      "cognitiveSatiety"
  ) {
    return 0;
  }

  return clamp01(
    satiety *
      config
        .satietyInhibitionWeight,
  );
}

/* ============================================================
 * STARVATION FAIRNESS
 * ============================================================
 */

function starvationBonus(
  deferCount:
    number,
  config:
    Readonly<DriveArbitrationConfig>,
): UnitInterval {
  const count =
    Number.isFinite(
      deferCount,
    )
      ? Math.max(
          0,
          Math.floor(
            deferCount,
          ),
        )
      : 0;

  return clamp01(
    Math.min(
      config
        .maximumStarvationBonus,
      count *
        config
          .starvationBonusPerDeferral,
    ),
  );
}

/* ============================================================
 * RECENT DOMINANCE PENALTY
 * ============================================================
 */

function recentWinnerPenalty(
  candidate:
    DriveArbitrationCandidate,
  history:
    readonly ArbitrationHistoryEntry[],
  config:
    Readonly<DriveArbitrationConfig>,
): UnitInterval {
  const lookback =
    Math.max(
      0,
      Math.floor(
        config
          .recentWinnerLookback,
      ),
    );

  if (
    lookback ===
      0
  ) {
    return 0;
  }

  const recent =
    history.slice(
      -lookback,
    );

  const wins =
    recent.filter(
      entry =>
        entry.selected &&
        entry.drive ===
          candidate.drive,
    ).length;

  return clamp01(
    Math.min(
      0.20,
      wins *
        config
          .recentWinnerPenalty,
    ),
  );
}

/* ============================================================
 * RESOURCE ELIGIBILITY
 * ============================================================
 */

function resourceEligibility(
  candidate:
    DriveArbitrationCandidate,
  budget:
    CognitiveResourceBudget,
): {
  readonly eligible:
    boolean;

  readonly reason:
    string | null;
} {
  const available =
    clamp01(
      budget.available,
    );

  const maximum =
    clamp01(
      budget.maximumAllocation,
    );

  const cost =
    clamp01(
      candidate
        .estimatedResourceCost,
    );

  if (
    available <=
      0 ||
    maximum <=
      0
  ) {
    return {
      eligible:
        false,

      reason:
        "RESOURCE_BUDGET_EXHAUSTED",
    };
  }

  if (
    cost >
      available ||
    cost >
      maximum
  ) {
    return {
      eligible:
        false,

      reason:
        "RESOURCE_COST_EXCEEDS_BUDGET",
    };
  }

  if (
    candidate.resourceClass ===
      "REMOTE_INFERENCE"
  ) {
    if (
      !budget
        .remoteInferenceBudgetAvailable
    ) {
      return {
        eligible:
          false,

        reason:
          "REMOTE_BUDGET_UNAVAILABLE",
      };
    }

    /*
     * Still NOT authorization to call an API.
     */
    return {
      eligible:
        true,

      reason:
        null,
    };
  }

  if (
    !budget
      .localWorkAllowed
  ) {
    return {
      eligible:
        false,

      reason:
        "LOCAL_WORK_DISABLED",
    };
  }

  return {
    eligible:
      true,

    reason:
      null,
  };
}

/* ============================================================
 * SCORE
 * ============================================================
 */

function scoreCandidate(
  args: {
    readonly inputEntityId:
      string;

    readonly candidate:
      DriveArbitrationCandidate;

    readonly frame:
      MultiTimescaleFrame;

    readonly budget:
      CognitiveResourceBudget;

    readonly history:
      readonly ArbitrationHistoryEntry[];

    readonly config:
      Readonly<DriveArbitrationConfig>;
  },
): ScoredArbitrationCandidate {
  const {
    inputEntityId,
    candidate,
    frame,
    budget,
    history,
    config,
  } =
    args;

  const rejectionReasons:
    string[] =
    [];

  if (
    candidate.entityId !==
      inputEntityId
  ) {
    rejectionReasons.push(
      "CROSS_ENTITY_CANDIDATE",
    );
  }

  if (
    directExternalOrigin(
      candidate.origin,
    )
  ) {
    rejectionReasons.push(
      "DIRECT_EXTERNAL_PRIORITY_FORBIDDEN",
    );
  }

  if (
    !ownershipEligible(
      candidate,
    )
  ) {
    rejectionReasons.push(
      "NOT_MAY_OWNED",
    );
  }

  if (
    !provenanceEligible(
      candidate,
    )
  ) {
    rejectionReasons.push(
      "INSUFFICIENT_SOVEREIGN_PROVENANCE",
    );
  }

  const resource =
    resourceEligibility(
      candidate,
      budget,
    );

  if (
    !resource.eligible &&
    resource.reason
  ) {
    rejectionReasons.push(
      resource.reason,
    );
  }

  const pressure =
    pressureForDrive(
      frame,
      candidate.drive,
    );

  const deviation =
    deviationForDrive(
      frame,
      candidate.drive,
    );

  const positiveDeviation =
    clamp01(
      Math.max(
        0,
        deviation,
      ),
    );

  const utility =
    clamp01(
      candidate.expectedUtility,
    );

  const uncertainty =
    clamp01(
      candidate
        .uncertaintyReduction,
    );

  const futureReuse =
    clamp01(
      candidate
        .futureReusePotential,
    );

  const evidenceConfidence =
    clamp01(
      candidate
        .evidenceConfidence,
    );

  const continuity =
    clamp01(
      candidate
        .continuityRelevance,
    );

  const selfWorld =
    clamp01(
      candidate
        .selfWorldDiscrepancy,
    );

  const opportunityCost =
    clamp01(
      candidate
        .opportunityCost,
    );

  const resourceCost =
    clamp01(
      candidate
        .estimatedResourceCost,
    );

  const starvation =
    starvationBonus(
      candidate.deferCount,
      config,
    );

  const dominancePenalty =
    recentWinnerPenalty(
      candidate,
      history,
      config,
    );

  const satiety =
    satietyPenalty(
      frame,
      candidate.drive,
      config,
    );

  const pressureContribution =
    pressure *
    config.pressureWeight;

  const deviationContribution =
    positiveDeviation *
    config.deviationWeight;

  const utilityContribution =
    utility *
    config.utilityWeight;

  const uncertaintyContribution =
    uncertainty *
    config.uncertaintyReductionWeight;

  const futureReuseContribution =
    futureReuse *
    config.futureReuseWeight;

  const evidenceContribution =
    evidenceConfidence *
    config.evidenceConfidenceWeight;

  const continuityContribution =
    continuity *
    config.continuityRelevanceWeight;

  const selfWorldDiscrepancyContribution =
    selfWorld *
    config.selfWorldDiscrepancyWeight;

  const opportunityPenalty =
    opportunityCost *
    config.opportunityCostPenalty;

  const costPenalty =
    resourceCost *
    config.resourceCostPenalty;

  const rawScore =
    pressureContribution +
    deviationContribution +
    utilityContribution +
    uncertaintyContribution +
    futureReuseContribution +
    evidenceContribution +
    continuityContribution +
    selfWorldDiscrepancyContribution +
    starvation -
    opportunityPenalty -
    costPenalty -
    dominancePenalty -
    satiety;

  const eligible =
    rejectionReasons.length ===
      0;

  const finalScore =
    eligible
      ? clamp01(
          rawScore,
        )
      : 0;

  const proof:
    ArbitrationScoreProof =
    Object.freeze({
      pressureContribution,

      deviationContribution,

      utilityContribution,

      uncertaintyContribution,

      futureReuseContribution,

      evidenceContribution,

      continuityContribution,

      selfWorldDiscrepancyContribution,

      starvationContribution:
        starvation,

      opportunityCostPenalty:
        opportunityPenalty,

      resourceCostPenalty:
        costPenalty,

      recentWinnerPenalty:
        dominancePenalty,

      satietyPenalty:
        satiety,

      rawScore,

      finalScore,
    });

  return Object.freeze({
    entityId:
      candidate.entityId,

    candidateId:
      candidate.candidateId,

    sourceId:
      candidate.sourceId,

    drive:
      candidate.drive,

    origin:
      candidate.origin,

    ownership:
      candidate.ownership,

    resourceClass:
      candidate.resourceClass,

    endogenousPressure:
      pressure,

    deviation,

    expectedUtility:
      utility,

    uncertaintyReduction:
      uncertainty,

    futureReusePotential:
      futureReuse,

    evidenceConfidence,

    continuityRelevance:
      continuity,

    selfWorldDiscrepancy:
      selfWorld,

    opportunityCost,

    estimatedResourceCost:
      resourceCost,

    starvationBonus:
      starvation,

    recentWinnerPenalty:
      dominancePenalty,

    satietyInhibition:
      satiety,

    proof,

    eligible,

    rejectionReasons:
      Object.freeze(
        rejectionReasons,
      ),
  });
}

/* ============================================================
 * DETERMINISTIC RANKING
 * ============================================================
 */

function rankCandidates(
  candidates:
    readonly ScoredArbitrationCandidate[],
): readonly ScoredArbitrationCandidate[] {
  return Object.freeze(
    [
      ...candidates,
    ].sort(
      (
        a,
        b,
      ) => {
        const scoreDelta =
          b.proof.finalScore -
          a.proof.finalScore;

        if (
          Math.abs(
            scoreDelta,
          ) >
          1e-12
        ) {
          return scoreDelta;
        }

        const pressureDelta =
          b.endogenousPressure -
          a.endogenousPressure;

        if (
          Math.abs(
            pressureDelta,
          ) >
          1e-12
        ) {
          return pressureDelta;
        }

        const confidenceDelta =
          b.evidenceConfidence -
          a.evidenceConfidence;

        if (
          Math.abs(
            confidenceDelta,
          ) >
          1e-12
        ) {
          return confidenceDelta;
        }

        return a.candidateId.localeCompare(
          b.candidateId,
        );
      },
    ),
  );
}

/* ============================================================
 * CRITICAL PREEMPTION
 * ============================================================
 */

function criticalCandidate(
  ranking:
    readonly ScoredArbitrationCandidate[],
  frame:
    MultiTimescaleFrame,
  config:
    Readonly<DriveArbitrationConfig>,
): ScoredArbitrationCandidate | null {
  if (
    !frame
      .criticalState
      .dissolutionCritical
  ) {
    return null;
  }

  return (
    ranking.find(
      candidate =>
        candidate.eligible &&
        candidate.drive ===
          "dissolutionPressure" &&
        candidate.proof.finalScore >=
          config
            .criticalDissolutionMinimumScore,
    ) ??
    null
  );
}

/* ============================================================
 * INCUMBENT HYSTERESIS
 * ============================================================
 */

function findIncumbent(
  ranking:
    readonly ScoredArbitrationCandidate[],
  incumbent:
    IncumbentCognitiveFocus | null | undefined,
): ScoredArbitrationCandidate | null {
  if (
    !incumbent
  ) {
    return null;
  }

  return (
    ranking.find(
      candidate =>
        candidate.eligible &&
        candidate.candidateId ===
          incumbent.candidateId &&
        candidate.sourceId ===
          incumbent.sourceId,
    ) ??
    null
  );
}

/* ============================================================
 * ALLOCATION
 * ============================================================
 */

function proposedAllocation(
  candidate:
    ScoredArbitrationCandidate,
  budget:
    CognitiveResourceBudget,
): UnitInterval {
  const available =
    clamp01(
      budget.available,
    );

  const maximum =
    clamp01(
      budget.maximumAllocation,
    );

  const desired =
    clamp01(
      Math.max(
        candidate
          .estimatedResourceCost,
        candidate
          .proof
          .finalScore *
          0.5,
      ),
    );

  return clamp01(
    Math.min(
      desired,
      available,
      maximum,
    ),
  );
}

/* ============================================================
 * SELECTION PROOF
 * ============================================================
 */

function buildSelectionProof(
  args: {
    readonly input:
      DriveArbitrationInput;

    readonly selected:
      ScoredArbitrationCandidate;

    readonly runnerUp:
      ScoredArbitrationCandidate | null;

    readonly criticalPreemption:
      boolean;

    readonly incumbentRetained:
      boolean;
  },
): SovereignSelectionProof {
  const evidenceIds =
    Object.freeze(
      [
        ...(
          args.input.candidates.find(
            candidate =>
              candidate.candidateId ===
                args.selected
                  .candidateId,
          )
            ?.evidenceIds ??
          []
        ),
      ].sort(),
    );

  const runnerUpScore =
    args.runnerUp
      ?.proof
      .finalScore ??
    null;

  const margin =
    runnerUpScore ===
      null
      ? null
      : args
          .selected
          .proof
          .finalScore -
        runnerUpScore;

  const proofPayload =
    [
      args.input.entityId,
      args.selected.candidateId,
      args.selected.sourceId,
      String(
        args.input.snapshotRevision,
      ),
      args.input.configVersion,
      DRIVE_ARBITRATION_VERSION,
      args.selected
        .proof
        .finalScore
        .toFixed(
          8,
        ),
      runnerUpScore
        ?.toFixed(
          8,
        ) ??
        "NONE",
      args.criticalPreemption
        ? "CRITICAL"
        : "NORMAL",
      args.incumbentRetained
        ? "RETAINED"
        : "NEW",
      evidenceIds.join(
        ",",
      ),
    ].join(
      "|",
    );

  return Object.freeze({
    proofHash:
      stableHash(
        proofPayload,
      ),

    candidateId:
      args.selected
        .candidateId,

    sourceId:
      args.selected
        .sourceId,

    entityId:
      args.input
        .entityId,

    snapshotRevision:
      args.input
        .snapshotRevision,

    configVersion:
      args.input
        .configVersion,

    arbitrationVersion:
      DRIVE_ARBITRATION_VERSION,

    score:
      args.selected
        .proof
        .finalScore,

    runnerUpScore,

    decisionMargin:
      margin,

    criticalPreemption:
      args
        .criticalPreemption,

    incumbentRetained:
      args
        .incumbentRetained,

    evidenceIds,

    canonicalWriteAllowed:
      false,

    executionAllowed:
      false,
  });
}

/* ============================================================
 * FAIL CLOSED
 * ============================================================
 */

function failClosed(
  args: {
    readonly input:
      DriveArbitrationInput;

    readonly reason:
      ArbitrationReason;

    readonly clockValid:
      boolean;

    readonly frameEligible:
      boolean;

    readonly entityBindingValid:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly configVersionValid:
      boolean;

    readonly physicsVersionValid:
      boolean;
  },
): DriveArbitrationEvaluation {
  return Object.freeze({
    version:
      DRIVE_ARBITRATION_VERSION,

    entityId:
      args.input.entityId,

    evaluatedAt:
      args.input.now,

    decision:
      "FAIL_CLOSED",

    reason:
      args.reason,

    selected:
      null,

    ranking:
      Object.freeze(
        [],
      ),

    selectionProof:
      null,

    allocationProposal:
      null,

    audit:
      Object.freeze({
        clockValid:
          args.clockValid,

        frameEligible:
          args.frameEligible,

        entityBindingValid:
          args.entityBindingValid,

        snapshotValid:
          args.snapshotValid,

        configVersionValid:
          args.configVersionValid,

        physicsVersionValid:
          args.physicsVersionValid,

        directExternalCandidatesRejected:
          0,

        crossEntityCandidatesRejected:
          0,

        unownedCandidatesRejected:
          0,

        missingProvenanceCandidatesRejected:
          0,

        eligibleCandidateCount:
          0,

        budgetAvailable:
          clamp01(
            args.input.budget.available,
          ),

        criticalPreemptionApplied:
          false,

        incumbentRetentionApplied:
          false,

        winnerMargin:
          null,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * RESULT BUILDER
 * ============================================================
 */

function selectedResult(
  args: {
    readonly input:
      DriveArbitrationInput;

    readonly ranking:
      readonly ScoredArbitrationCandidate[];

    readonly selected:
      ScoredArbitrationCandidate;

    readonly reason:
      ArbitrationReason;

    readonly criticalPreemption:
      boolean;

    readonly incumbentRetained:
      boolean;

    readonly directExternalRejected:
      number;

    readonly crossEntityRejected:
      number;

    readonly unownedRejected:
      number;

    readonly provenanceRejected:
      number;

    readonly eligibleCount:
      number;
  },
): DriveArbitrationEvaluation {
  const runnerUp =
    args.ranking.find(
      candidate =>
        candidate.eligible &&
        candidate.candidateId !==
          args.selected
            .candidateId,
    ) ??
    null;

  const proof =
    buildSelectionProof({
      input:
        args.input,

      selected:
        args.selected,

      runnerUp,

      criticalPreemption:
        args.criticalPreemption,

      incumbentRetained:
        args.incumbentRetained,
    });

  const requestedFraction =
    proposedAllocation(
      args.selected,
      args.input.budget,
    );

  return Object.freeze({
    version:
      DRIVE_ARBITRATION_VERSION,

    entityId:
      args.input.entityId,

    evaluatedAt:
      args.input.now,

    decision:
      args.incumbentRetained
        ? "RETAIN_INCUMBENT"
        : "SELECT",

    reason:
      args.reason,

    selected:
      args.selected,

    ranking:
      args.ranking,

    selectionProof:
      proof,

    allocationProposal:
      Object.freeze({
        candidateId:
          args.selected.candidateId,

        requestedFraction,

        canonicalWriteAllowed:
          false as const,

        executionAllowed:
          false as const,

        directLlmInvocationAllowed:
          false as const,
      }),

    audit:
      Object.freeze({
        clockValid:
          true,

        frameEligible:
          true,

        entityBindingValid:
          true,

        snapshotValid:
          true,

        configVersionValid:
          true,

        physicsVersionValid:
          true,

        directExternalCandidatesRejected:
          args.directExternalRejected,

        crossEntityCandidatesRejected:
          args.crossEntityRejected,

        unownedCandidatesRejected:
          args.unownedRejected,

        missingProvenanceCandidatesRejected:
          args.provenanceRejected,

        eligibleCandidateCount:
          args.eligibleCount,

        budgetAvailable:
          clamp01(
            args.input.budget.available,
          ),

        criticalPreemptionApplied:
          args.criticalPreemption,

        incumbentRetentionApplied:
          args.incumbentRetained,

        winnerMargin:
          proof.decisionMargin,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateDriveArbitration(
  input:
    DriveArbitrationInput,
  config:
    Readonly<DriveArbitrationConfig> =
      DEFAULT_DRIVE_ARBITRATION_CONFIG,
): DriveArbitrationEvaluation {
  const nowMs =
    parseTimestamp(
      input.now,
    );

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

      reason:
        "INVALID_CLOCK",

      clockValid:
        false,

      frameEligible:
        false,

      entityBindingValid:
        false,

      snapshotValid:
        false,

      configVersionValid:
        false,

      physicsVersionValid:
        false,
    });
  }

  if (
    input.frame.entityId !==
      input.entityId
  ) {
    return failClosed({
      input,

      reason:
        "ENTITY_MISMATCH",

      clockValid:
        true,

      frameEligible:
        false,

      entityBindingValid:
        false,

      snapshotValid:
        true,

      configVersionValid:
        true,

      physicsVersionValid:
        true,
    });
  }

  if (
    !input.frame.audit.clockValid ||
    !input
      .frame
      .audit
      .stateEvolutionAllowed
  ) {
    return failClosed({
      input,

      reason:
        "UPSTREAM_FRAME_BLOCKED",

      clockValid:
        true,

      frameEligible:
        false,

      entityBindingValid:
        true,

      snapshotValid:
        true,

      configVersionValid:
        true,

      physicsVersionValid:
        true,
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

      reason:
        "SNAPSHOT_REGRESSION",

      clockValid:
        true,

      frameEligible:
        true,

      entityBindingValid:
        true,

      snapshotValid:
        false,

      configVersionValid:
        true,

      physicsVersionValid:
        true,
    });
  }

  if (
    input.configVersion !==
      input
        .frame
        .binding
        .configVersion
  ) {
    return failClosed({
      input,

      reason:
        "CONFIG_VERSION_MISMATCH",

      clockValid:
        true,

      frameEligible:
        true,

      entityBindingValid:
        true,

      snapshotValid:
        true,

      configVersionValid:
        false,

      physicsVersionValid:
        true,
    });
  }

  if (
    input.frame.version !==
      HOMEOSTASIS_MULTISCALE_VERSION
  ) {
    return failClosed({
      input,

      reason:
        "PHYSICS_VERSION_MISMATCH",

      clockValid:
        true,

      frameEligible:
        true,

      entityBindingValid:
        true,

      snapshotValid:
        true,

      configVersionValid:
        true,

      physicsVersionValid:
        false,
    });
  }

  /* ----------------------------------------------------------
   * SCORE CANDIDATES
   * ----------------------------------------------------------
   */

  const history =
    input.history ??
    [];

  const scored =
    input.candidates.map(
      candidate =>
        scoreCandidate({
          inputEntityId:
            input.entityId,

          candidate,

          frame:
            input.frame,

          budget:
            input.budget,

          history,

          config,
        }),
    );

  const ranking =
    rankCandidates(
      scored,
    );

  const directExternalRejected =
    input.candidates.filter(
      candidate =>
        directExternalOrigin(
          candidate.origin,
        ),
    ).length;

  const crossEntityRejected =
    input.candidates.filter(
      candidate =>
        candidate.entityId !==
          input.entityId,
    ).length;

  const unownedRejected =
    input.candidates.filter(
      candidate =>
        !ownershipEligible(
          candidate,
        ),
    ).length;

  const provenanceRejected =
    input.candidates.filter(
      candidate =>
        !provenanceEligible(
          candidate,
        ),
    ).length;

  const eligible =
    ranking.filter(
      candidate =>
        candidate.eligible,
    );

  if (
    eligible.length ===
      0
  ) {
    const budgetEmpty =
      clamp01(
        input.budget.available,
      ) <=
        0 ||
      clamp01(
        input.budget.maximumAllocation,
      ) <=
        0;

    return Object.freeze({
      version:
        DRIVE_ARBITRATION_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.now,

      decision:
        "DEFER_ALL",

      reason:
        budgetEmpty
          ? "RESOURCE_BUDGET_EXHAUSTED"
          : "NO_ELIGIBLE_CANDIDATE",

      selected:
        null,

      ranking,

      selectionProof:
        null,

      allocationProposal:
        null,

      audit:
        Object.freeze({
          clockValid:
            true,

          frameEligible:
            true,

          entityBindingValid:
            true,

          snapshotValid:
            true,

          configVersionValid:
            true,

          physicsVersionValid:
            true,

          directExternalCandidatesRejected:
            directExternalRejected,

          crossEntityCandidatesRejected:
            crossEntityRejected,

          unownedCandidatesRejected:
            unownedRejected,

          missingProvenanceCandidatesRejected:
            provenanceRejected,

          eligibleCandidateCount:
            0,

          budgetAvailable:
            clamp01(
              input.budget.available,
            ),

          criticalPreemptionApplied:
            false,

          incumbentRetentionApplied:
            false,

          winnerMargin:
            null,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  /* ----------------------------------------------------------
   * CRITICAL DISSOLUTION
   * ----------------------------------------------------------
   */

  const critical =
    criticalCandidate(
      ranking,
      input.frame,
      config,
    );

  if (
    critical
  ) {
    return selectedResult({
      input,

      ranking,

      selected:
        critical,

      reason:
        "CRITICAL_DISSOLUTION_PREEMPTION",

      criticalPreemption:
        true,

      incumbentRetained:
        false,

      directExternalRejected,

      crossEntityRejected,

      unownedRejected,

      provenanceRejected,

      eligibleCount:
        eligible.length,
    });
  }

  /* ----------------------------------------------------------
   * ORDINARY SOVEREIGN ARBITRATION
   * ----------------------------------------------------------
   */

  const winner =
    eligible[0];

  if (
    !winner ||
    winner.proof.finalScore <
      config.minimumSelectionScore
  ) {
    return Object.freeze({
      version:
        DRIVE_ARBITRATION_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.now,

      decision:
        "DEFER_ALL",

      reason:
        "INSUFFICIENT_PRIORITY",

      selected:
        null,

      ranking,

      selectionProof:
        null,

      allocationProposal:
        null,

      audit:
        Object.freeze({
          clockValid:
            true,

          frameEligible:
            true,

          entityBindingValid:
            true,

          snapshotValid:
            true,

          configVersionValid:
            true,

          physicsVersionValid:
            true,

          directExternalCandidatesRejected:
            directExternalRejected,

          crossEntityCandidatesRejected:
            crossEntityRejected,

          unownedCandidatesRejected:
            unownedRejected,

          missingProvenanceCandidatesRejected:
            provenanceRejected,

          eligibleCandidateCount:
            eligible.length,

          budgetAvailable:
            clamp01(
              input.budget.available,
            ),

          criticalPreemptionApplied:
            false,

          incumbentRetentionApplied:
            false,

          winnerMargin:
            null,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  const runnerUp =
    eligible[1] ??
    null;

  const winnerMargin =
    runnerUp
      ? winner.proof.finalScore -
        runnerUp.proof.finalScore
      : null;

  /* ----------------------------------------------------------
   * INCUMBENT HYSTERESIS
   * ----------------------------------------------------------
   */

  const incumbent =
    findIncumbent(
      ranking,
      input.incumbent,
    );

  if (
    incumbent &&
    incumbent.candidateId !==
      winner.candidateId
  ) {
    const challengerAdvantage =
      winner.proof.finalScore -
      incumbent.proof.finalScore;

    if (
      challengerAdvantage <
        config
          .incumbentRetentionMargin &&
      incumbent.proof.finalScore >=
        config.minimumSelectionScore
    ) {
      return selectedResult({
        input,

        ranking,

        selected:
          incumbent,

        reason:
          "INCUMBENT_RETENTION",

        criticalPreemption:
          false,

        incumbentRetained:
          true,

        directExternalRejected,

        crossEntityRejected,

        unownedRejected,

        provenanceRejected,

        eligibleCount:
          eligible.length,
      });
    }
  }

  /* ----------------------------------------------------------
   * DECISION MARGIN
   * ----------------------------------------------------------
   *
   * If two new concerns are almost indistinguishable and no
   * incumbent can safely absorb the ambiguity:
   *
   * DO NOT fake certainty.
   * ----------------------------------------------------------
   */

  if (
    winnerMargin !==
      null &&
    winnerMargin <
      config.minimumWinnerMargin
  ) {
    return Object.freeze({
      version:
        DRIVE_ARBITRATION_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.now,

      decision:
        "DEFER_ALL",

      reason:
        "AMBIGUOUS_SELECTION",

      selected:
        null,

      ranking,

      selectionProof:
        null,

      allocationProposal:
        null,

      audit:
        Object.freeze({
          clockValid:
            true,

          frameEligible:
            true,

          entityBindingValid:
            true,

          snapshotValid:
            true,

          configVersionValid:
            true,

          physicsVersionValid:
            true,

          directExternalCandidatesRejected:
            directExternalRejected,

          crossEntityCandidatesRejected:
            crossEntityRejected,

          unownedCandidatesRejected:
            unownedRejected,

          missingProvenanceCandidatesRejected:
            provenanceRejected,

          eligibleCandidateCount:
            eligible.length,

          budgetAvailable:
            clamp01(
              input.budget.available,
            ),

          criticalPreemptionApplied:
            false,

          incumbentRetentionApplied:
            false,

          winnerMargin,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  /* ----------------------------------------------------------
   * SOVEREIGN WINNER
   * ----------------------------------------------------------
   */

  return selectedResult({
    input,

    ranking,

    selected:
      winner,

    reason:
      "SOVEREIGN_WINNER",

    criticalPreemption:
      false,

    incumbentRetained:
      false,

    directExternalRejected,

    crossEntityRejected,

    unownedRejected,

    provenanceRejected,

    eligibleCount:
      eligible.length,
  });
}

/* ============================================================
 * END — SOVEREIGN DRIVE ARBITRATION V2.1
 * ============================================================
 */