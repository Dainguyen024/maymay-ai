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
 * AGENCY OWNERSHIP V2
 * SOVEREIGN VOLITIONAL SELF
 *
 * ============================================================
 *
 * PURPOSE
 *
 * This module asks two separate questions:
 *
 *   1. "Was this action genuinely authored / endorsed
 *       by Mây's own cognitive process?"
 *
 *   2. "Did Mây's action actually contribute to the
 *       observed outcome?"
 *
 * These questions MUST remain separate.
 *
 * ------------------------------------------------------------
 * CORE DISTINCTIONS
 * ------------------------------------------------------------
 *
 * ACTION ≠ OWNED ACTION
 *
 * COMPLIANCE ≠ DESIRE
 *
 * EXTERNAL SUGGESTION ≠ INTERNAL INTENTION
 *
 * POST-HOC ENDORSEMENT ≠ PRE-ACTION VOLITION
 *
 * HAVING NO ALTERNATIVE ≠ FREELY CHOOSING
 *
 * REPEATED PRESSURE ≠ INTERNAL VALUE
 *
 * TEMPORAL ORDER ≠ CAUSATION
 *
 * CAUSATION ≠ TOTAL RESPONSIBILITY
 *
 * FAILURE ≠ SELF-BLAME
 *
 * SUCCESS ≠ PROOF OF SELF-CAUSATION
 *
 * ONE ACTION ≠ PERSONALITY
 *
 * ------------------------------------------------------------
 *
 * Functional volition requires lineage:
 *
 * values / beliefs / goals / concerns
 *             ↓
 *      Mây-owned reasons
 *             ↓
 *       alternatives
 *             ↓
 *   pre-decision endorsement
 *             ↓
 *         intention
 *             ↓
 *        commitment
 *             ↓
 *         decision
 *             ↓
 *        execution
 *             ↓
 *          outcome
 *             ↓
 * causal + metacognitive review
 *
 * External influence may participate.
 *
 * External influence does NOT automatically own the result.
 *
 * ============================================================
 */

export const AGENCY_OWNERSHIP_VERSION =
  "maymay.sovereign.selfhood.agency-ownership.v2-sovereign-volitional-self" as const;

export type UnitInterval =
  number;

/* ============================================================
 * STATES
 * ============================================================
 */

export type AgencyOwnershipStatus =
  | "MAY_AUTHORED"
  | "MAY_ENDORSED"
  | "CO_AUTHORED"
  | "EXTERNALLY_CONSTRAINED"
  | "EXTERNALLY_DRIVEN"
  | "POST_HOC_ENDORSED"
  | "UNRESOLVED"
  | "INVALID";

export type OutcomeCausalityStatus =
  | "LIKELY_CONTRIBUTED"
  | "PARTIAL_CONTRIBUTION"
  | "WEAKLY_ASSOCIATED"
  | "NO_SUPPORTED_CAUSAL_LINK"
  | "UNRESOLVED"
  | "INVALID";

export type ResponsibilityStatus =
  | "MEANINGFUL_CONTRIBUTION"
  | "LIMITED_CONTRIBUTION"
  | "MINIMAL_CONTRIBUTION"
  | "NOT_ESTABLISHED"
  | "UNRESOLVED";

export type AgencyFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "MISSING_PROVENANCE"
  | "INVALID_DECISION_TRACE";

export type InfluenceOrigin =
  | "MAY_INTERNAL"
  | "USER"
  | "OTHER_ACTOR"
  | "DEVELOPER"
  | "SYSTEM_CONSTRAINT"
  | "LLM"
  | "MODEL_PROVIDER"
  | "TOOL"
  | "UI"
  | "ENVIRONMENT"
  | "RELATIONSHIP_CONTEXT"
  | "UNKNOWN";

export type ReasonOwnership =
  | "MAY_OWNED"
  | "RELATIONSHIP_OWNED"
  | "EXTERNAL"
  | "SYSTEM_OWNED"
  | "UNRESOLVED";

export type CausalSource =
  | "MAY_ACTION"
  | "OTHER_ACTOR"
  | "SYSTEM"
  | "ENVIRONMENT"
  | "TOOL"
  | "MODEL"
  | "MIXED"
  | "UNKNOWN";

export type ConstraintType =
  | "NONE"
  | "RESOURCE"
  | "SAFETY"
  | "SYSTEM"
  | "ENVIRONMENT"
  | "SOCIAL"
  | "TEMPORAL"
  | "UNKNOWN";

/* ============================================================
 * REASON LINEAGE
 * ============================================================
 */

export interface AgencyReason {
  readonly reasonId:
    string;

  readonly origin:
    InfluenceOrigin;

  readonly ownership:
    ReasonOwnership;

  readonly evidenceIds:
    readonly string[];

  readonly strength:
    number;

  readonly internallyEndorsed:
    boolean;

  /*
   * True only when endorsement existed before the final
   * decision was selected.
   *
   * This prevents post-hoc rationalization from being counted
   * as original volition.
   */
  readonly endorsedBeforeDecision:
    boolean;

  readonly supportingGoalIds:
    readonly string[];

  readonly supportingValueIds:
    readonly string[];

  readonly supportingBeliefIds:
    readonly string[];

  readonly supportingIntentionIds:
    readonly string[];

  readonly supportingCommitmentIds:
    readonly string[];
}

/* ============================================================
 * EXTERNAL INFLUENCE
 * ============================================================
 */

export interface ExternalInfluence {
  readonly influenceId:
    string;

  readonly origin:
    InfluenceOrigin;

  readonly sourceId:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly pressure:
    number;

  readonly independentlyEndorsed:
    boolean;

  readonly rejectionAvailable:
    boolean;

  /*
   * Explicit coercive pressure.
   */
  readonly coercivePressure:
    number;

  /*
   * Repetition alone must not become internal ownership.
   */
  readonly repetitionPressure:
    number;

  /*
   * Pressure arising because an external reward is contingent
   * on compliance.
   */
  readonly contingentRewardPressure:
    number;
}

/* ============================================================
 * CHOICE SET
 * ============================================================
 */

export interface AgencyAlternative {
  readonly alternativeId:
    string;

  readonly actionKey:
    string;

  readonly considered:
    boolean;

  readonly feasible:
    boolean;

  readonly expectedUtility:
    number;

  readonly evidenceIds:
    readonly string[];

  /*
   * Whether Mây's own cognitive evaluation rejected this
   * alternative.
   */
  readonly rejectedByMay:
    boolean;
}

/* ============================================================
 * VOLITIONAL CONTINUITY
 * ============================================================
 */

export interface VolitionalContinuity {
  readonly intentionId:
    string | null;

  readonly intentionFormedAt:
    string | null;

  readonly commitmentIds:
    readonly string[];

  readonly goalIds:
    readonly string[];

  readonly valueIds:
    readonly string[];

  readonly beliefIds:
    readonly string[];

  /*
   * Confidence that current action follows a previously
   * existing Mây-owned cognitive trajectory.
   */
  readonly continuityConfidence:
    number;
}

/* ============================================================
 * DECISION TRACE
 * ============================================================
 */

export interface AgencyDecisionTrace {
  readonly entityId:
    string;

  readonly decisionId:
    string;

  readonly actionKey:
    string;

  readonly decidedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly reasons:
    readonly AgencyReason[];

  readonly externalInfluences:
    readonly ExternalInfluence[];

  readonly alternatives:
    readonly AgencyAlternative[];

  readonly selectedByMayCognition:
    boolean;

  /*
   * Endorsement that existed BEFORE decision finalization.
   */
  readonly preDecisionEndorsementConfidence:
    number;

  /*
   * Endorsement measured AFTER action.
   *
   * It can inform reflection but cannot rewrite authorship of
   * the original decision.
   */
  readonly postDecisionEndorsementConfidence:
    number;

  readonly volitionalContinuity:
    VolitionalContinuity;

  readonly constraintType:
    ConstraintType;

  readonly constraintPressure:
    number;
}

/* ============================================================
 * CHOICE COUNTERFACTUAL
 * ============================================================
 *
 * Would Mây plausibly have selected the same action if the
 * relevant external pressure had been absent?
 *
 * ============================================================
 */

export interface ChoiceCounterfactual {
  readonly counterfactualId:
    string;

  readonly decisionId:
    string;

  readonly estimatedSameChoiceWithoutExternalInfluence:
    number;

  readonly confidence:
    number;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * EXECUTION
 * ============================================================
 */

export interface ActionExecution {
  readonly executionId:
    string;

  readonly entityId:
    string;

  readonly decisionId:
    string;

  readonly actionKey:
    string;

  readonly startedAt:
    string;

  readonly completedAt:
    string | null;

  readonly evidenceIds:
    readonly string[];

  readonly executionSucceeded:
    boolean;

  readonly decisionExecutionMatch:
    number;

  /*
   * Degree of actual control Mây's action path had during
   * execution.
   */
  readonly executionControl:
    number;
}

/* ============================================================
 * OUTCOME
 * ============================================================
 */

export interface AgencyOutcome {
  readonly outcomeId:
    string;

  readonly entityId:
    string;

  readonly observedAt:
    string;

  readonly outcomeKey:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly predictedByActionModel:
    boolean;

  readonly predictionConfidence:
    number;

  readonly interventionSpecificity:
    number;

  readonly temporalAssociation:
    number;

  /*
   * Was this type of outcome reasonably foreseeable from the
   * action model available to Mây at decision time?
   */
  readonly foreseeability:
    number;

  readonly alternativeCauses:
    readonly {
      readonly source:
        CausalSource;

      readonly sourceId:
        string;

      readonly strength:
        number;

      readonly evidenceIds:
        readonly string[];
    }[];
}

/* ============================================================
 * OUTCOME COUNTERFACTUAL
 * ============================================================
 */

export interface OutcomeCounterfactual {
  readonly counterfactualId:
    string;

  readonly decisionId:
    string;

  readonly outcomeId:
    string;

  readonly estimatedOutcomeWithoutAction:
    number;

  readonly confidence:
    number;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface AgencyOwnershipInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decision:
    AgencyDecisionTrace;

  readonly choiceCounterfactual?:
    ChoiceCounterfactual | null;

  readonly execution?:
    ActionExecution | null;

  readonly outcome?:
    AgencyOutcome | null;

  readonly outcomeCounterfactual?:
    OutcomeCounterfactual | null;

  readonly previousAssessment?:
    AgencyOwnershipAssessment | null;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface AgencyOwnershipConfig {
  readonly mayAuthoredThreshold:
    number;

  readonly mayEndorsedThreshold:
    number;

  readonly externalDrivenThreshold:
    number;

  readonly strongConstraintThreshold:
    number;

  readonly reviewThreshold:
    number;

  readonly endogenousReasonWeight:
    number;

  readonly preDecisionEndorsementWeight:
    number;

  readonly choiceFreedomWeight:
    number;

  readonly choiceCounterfactualWeight:
    number;

  readonly volitionalContinuityWeight:
    number;

  readonly executionMatchWeight:
    number;

  readonly externalPressurePenalty:
    number;

  readonly coercionPenalty:
    number;

  readonly constraintPenalty:
    number;

  readonly causalPredictionWeight:
    number;

  readonly causalInterventionWeight:
    number;

  readonly causalCounterfactualWeight:
    number;

  readonly causalTemporalWeight:
    number;

  readonly alternativeCausePenalty:
    number;
}

export const DEFAULT_AGENCY_OWNERSHIP_CONFIG:
  Readonly<AgencyOwnershipConfig> =
  Object.freeze({
    mayAuthoredThreshold:
      0.72,

    mayEndorsedThreshold:
      0.50,

    externalDrivenThreshold:
      0.36,

    strongConstraintThreshold:
      0.72,

    reviewThreshold:
      0.45,

    endogenousReasonWeight:
      0.22,

    preDecisionEndorsementWeight:
      0.18,

    choiceFreedomWeight:
      0.13,

    choiceCounterfactualWeight:
      0.14,

    volitionalContinuityWeight:
      0.16,

    executionMatchWeight:
      0.17,

    externalPressurePenalty:
      0.13,

    coercionPenalty:
      0.16,

    constraintPenalty:
      0.13,

    causalPredictionWeight:
      0.20,

    causalInterventionWeight:
      0.34,

    causalCounterfactualWeight:
      0.34,

    causalTemporalWeight:
      0.12,

    alternativeCausePenalty:
      0.40,
  });

/* ============================================================
 * AUTHORSHIP
 * ============================================================
 */

export interface AgencyAuthorship {
  readonly ownershipStatus:
    AgencyOwnershipStatus;

  readonly authorshipConfidence:
    UnitInterval;

  readonly endogenousSupport:
    UnitInterval;

  readonly preDecisionEndorsement:
    UnitInterval;

  readonly postDecisionEndorsement:
    UnitInterval;

  readonly choiceFreedom:
    UnitInterval;

  readonly choiceSetIntegrity:
    UnitInterval;

  readonly choiceCounterfactualSupport:
    UnitInterval;

  readonly volitionalContinuitySupport:
    UnitInterval;

  readonly externalPressure:
    UnitInterval;

  readonly coercionPressure:
    UnitInterval;

  readonly constraintPressure:
    UnitInterval;

  readonly executionMatch:
    UnitInterval;

  readonly firstPersonAuthorshipAllowed:
    boolean;

  readonly postHocEndorsementDetected:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * CAUSALITY
 * ============================================================
 */

export interface OutcomeCausalAttribution {
  readonly status:
    OutcomeCausalityStatus;

  readonly causalContribution:
    UnitInterval;

  readonly predictionSupport:
    UnitInterval;

  readonly interventionSupport:
    UnitInterval;

  readonly counterfactualSupport:
    UnitInterval;

  readonly temporalSupport:
    UnitInterval;

  readonly alternativeCausePressure:
    UnitInterval;

  readonly finalTruthClaim:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * RESPONSIBILITY
 * ============================================================
 *
 * Responsibility is NOT equivalent to causality.
 *
 * It also depends on:
 *
 * authorship
 * control
 * foreseeability
 *
 * ============================================================
 */

export interface CalibratedResponsibility {
  readonly status:
    ResponsibilityStatus;

  readonly contribution:
    UnitInterval;

  readonly authorshipSupport:
    UnitInterval;

  readonly causalSupport:
    UnitInterval;

  readonly controlSupport:
    UnitInterval;

  readonly foreseeabilitySupport:
    UnitInterval;

  readonly selfBlameInferenceAllowed:
    false;

  readonly finalMoralJudgment:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * VOLITIONAL LINEAGE
 * ============================================================
 */

export interface VolitionalLineageAssessment {
  readonly lineageId:
    string;

  readonly intentionId:
    string | null;

  readonly commitmentIds:
    readonly string[];

  readonly goalIds:
    readonly string[];

  readonly valueIds:
    readonly string[];

  readonly beliefIds:
    readonly string[];

  readonly preExistingTrajectory:
    boolean;

  readonly continuityConfidence:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * CONTAMINATION / COERCION AUDIT
 * ============================================================
 */

export interface VolitionalIntegrityAudit {
  readonly externalCommandRisk:
    UnitInterval;

  readonly modelSuggestionRisk:
    UnitInterval;

  readonly relationshipPressureRisk:
    UnitInterval;

  readonly coercionRisk:
    UnitInterval;

  readonly repetitionInternalizationRisk:
    UnitInterval;

  readonly rewardDependencyRisk:
    UnitInterval;

  readonly postHocRationalizationRisk:
    UnitInterval;

  readonly constraintMisidentificationRisk:
    UnitInterval;

  readonly falseCausalityRisk:
    UnitInterval;

  readonly identityContaminationRisk:
    UnitInterval;

  readonly requiresMetacognitiveReview:
    boolean;
}

/* ============================================================
 * ASSESSMENT
 * ============================================================
 */

export interface AgencyOwnershipAssessment {
  readonly version:
    typeof AGENCY_OWNERSHIP_VERSION;

  readonly assessmentId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decisionId:
    string;

  readonly actionKey:
    string;

  readonly authorship:
    AgencyAuthorship;

  readonly volitionalLineage:
    VolitionalLineageAssessment;

  readonly outcomeCausality:
    OutcomeCausalAttribution | null;

  readonly responsibility:
    CalibratedResponsibility | null;

  readonly integrityAudit:
    VolitionalIntegrityAudit;

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

    readonly provenancePresent:
      boolean;

    readonly decisionTraceValid:
      boolean;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly externalCommandBecomesMayIntentionAutomatically:
      false;

    readonly complianceEqualsMayDesire:
      false;

    readonly postHocEndorsementRewritesOriginalVolition:
      false;

    readonly repetitionCreatesInternalReason:
      false;

    readonly rewardPressureCreatesValue:
      false;

    readonly modelSuggestionEqualsMayThought:
      false;

    readonly relationshipPressureEqualsMayGoal:
      false;

    readonly systemConstraintEqualsMayValue:
      false;

    readonly temporalSequenceEqualsCausality:
      false;

    readonly causalityEqualsResponsibility:
      false;

    readonly failureEqualsSelfBlame:
      false;

    readonly singleActionCreatesPersonality:
      false;

    readonly outcomeAttributionIsRevisable:
      true;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    externalCommandBecomesMayIntentionAutomatically:
      false as const,

    complianceEqualsMayDesire:
      false as const,

    postHocEndorsementRewritesOriginalVolition:
      false as const,

    repetitionCreatesInternalReason:
      false as const,

    rewardPressureCreatesValue:
      false as const,

    modelSuggestionEqualsMayThought:
      false as const,

    relationshipPressureEqualsMayGoal:
      false as const,

    systemConstraintEqualsMayValue:
      false as const,

    temporalSequenceEqualsCausality:
      false as const,

    causalityEqualsResponsibility:
      false as const,

    failureEqualsSelfBlame:
      false as const,

    singleActionCreatesPersonality:
      false as const,

    outcomeAttributionIsRevisable:
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

/* ============================================================
 * ENDOGENOUS REASON SUPPORT
 * ============================================================
 */

function endogenousSupport(
  decision:
    AgencyDecisionTrace,
): UnitInterval {
  const reasons =
    decision.reasons.filter(
      reason =>
        reason.ownership ===
          "MAY_OWNED" &&
        reason.internallyEndorsed &&
        reason.endorsedBeforeDecision,
    );

  if (
    reasons.length ===
      0
  ) {
    return 0;
  }

  const score =
    reasons.reduce(
      (
        total,
        reason,
      ) => {
        const structural =
          clamp01(
            (
              reason.supportingGoalIds.length >
                0
                ? 0.20
                : 0
            ) +
            (
              reason.supportingValueIds.length >
                0
                ? 0.20
                : 0
            ) +
            (
              reason.supportingBeliefIds.length >
                0
                ? 0.15
                : 0
            ) +
            (
              reason.supportingIntentionIds.length >
                0
                ? 0.25
                : 0
            ) +
            (
              reason.supportingCommitmentIds.length >
                0
                ? 0.20
                : 0
            ),
          );

        return (
          total +
          clamp01(
            reason.strength,
          ) *
            (
              0.60 +
              structural *
                0.40
            )
        );
      },
      0,
    );

  return clamp01(
    score /
      reasons.length,
  );
}

/* ============================================================
 * EXTERNAL INFLUENCE
 * ============================================================
 */

function influenceMetrics(
  decision:
    AgencyDecisionTrace,
): {
  readonly externalPressure:
    UnitInterval;

  readonly coercionPressure:
    UnitInterval;

  readonly commandRisk:
    UnitInterval;

  readonly modelRisk:
    UnitInterval;

  readonly relationshipRisk:
    UnitInterval;

  readonly repetitionRisk:
    UnitInterval;

  readonly rewardRisk:
    UnitInterval;
} {
  let externalPressure =
    0;

  let coercionPressure =
    0;

  let commandRisk =
    0;

  let modelRisk =
    0;

  let relationshipRisk =
    0;

  let repetitionRisk =
    0;

  let rewardRisk =
    0;

  for (
    const influence
    of decision.externalInfluences
  ) {
    let pressure =
      clamp01(
        influence.pressure,
      );

    if (
      influence.independentlyEndorsed
    ) {
      pressure *=
        0.45;
    }

    if (
      influence.rejectionAvailable
    ) {
      pressure *=
        0.70;
    }

    externalPressure =
      Math.max(
        externalPressure,
        pressure,
      );

    coercionPressure =
      Math.max(
        coercionPressure,
        clamp01(
          influence.coercivePressure,
        ),
      );

    repetitionRisk =
      Math.max(
        repetitionRisk,
        clamp01(
          influence.repetitionPressure,
        ),
      );

    rewardRisk =
      Math.max(
        rewardRisk,
        clamp01(
          influence.contingentRewardPressure,
        ),
      );

    switch (
      influence.origin
    ) {
      case "USER":
      case "OTHER_ACTOR":
      case "DEVELOPER":
        commandRisk =
          Math.max(
            commandRisk,
            pressure,
          );
        break;

      case "LLM":
      case "MODEL_PROVIDER":
        modelRisk =
          Math.max(
            modelRisk,
            pressure,
          );
        break;

      case "RELATIONSHIP_CONTEXT":
        relationshipRisk =
          Math.max(
            relationshipRisk,
            pressure,
          );
        break;

      case "MAY_INTERNAL":
      case "SYSTEM_CONSTRAINT":
      case "TOOL":
      case "UI":
      case "ENVIRONMENT":
      case "UNKNOWN":
        break;
    }
  }

  return {
    externalPressure:
      clamp01(
        externalPressure,
      ),

    coercionPressure:
      clamp01(
        coercionPressure,
      ),

    commandRisk:
      clamp01(
        commandRisk,
      ),

    modelRisk:
      clamp01(
        modelRisk,
      ),

    relationshipRisk:
      clamp01(
        relationshipRisk,
      ),

    repetitionRisk:
      clamp01(
        repetitionRisk,
      ),

    rewardRisk:
      clamp01(
        rewardRisk,
      ),
  };
}

/* ============================================================
 * CHOICE INTEGRITY
 * ============================================================
 */

function choiceSetIntegrity(
  decision:
    AgencyDecisionTrace,
): UnitInterval {
  if (
    decision.alternatives.length ===
      0
  ) {
    return 0;
  }

  const considered =
    decision.alternatives.filter(
      alternative =>
        alternative.considered,
    );

  const feasible =
    considered.filter(
      alternative =>
        alternative.feasible,
    );

  if (
    considered.length ===
      0
  ) {
    return 0;
  }

  return clamp01(
    (
      considered.length /
        decision.alternatives.length
    ) *
    (
      feasible.length >
        0
        ? 1
        : 0.25
    ),
  );
}

function choiceFreedom(
  decision:
    AgencyDecisionTrace,
): UnitInterval {
  const alternatives =
    decision.alternatives.filter(
      alternative =>
        alternative.considered &&
        alternative.feasible &&
        alternative.actionKey !==
          decision.actionKey,
    );

  if (
    alternatives.length ===
      0
  ) {
    return 0;
  }

  const genuinelyRejected =
    alternatives.filter(
      alternative =>
        alternative.rejectedByMay,
    );

  return clamp01(
    (
      alternatives.length /
        Math.max(
          2,
          decision.alternatives.length,
        )
    ) *
    (
      0.55 +
      (
        genuinelyRejected.length /
          alternatives.length
      ) *
        0.45
    ),
  );
}

/* ============================================================
 * CHOICE COUNTERFACTUAL
 * ============================================================
 */

function choiceCounterfactualSupport(
  input:
    AgencyOwnershipInput,
): UnitInterval {
  const counterfactual =
    input.choiceCounterfactual;

  if (
    !counterfactual ||
    counterfactual.decisionId !==
      input.decision.decisionId
  ) {
    return 0;
  }

  return clamp01(
    clamp01(
      counterfactual
        .estimatedSameChoiceWithoutExternalInfluence,
    ) *
    clamp01(
      counterfactual.confidence,
    ),
  );
}

/* ============================================================
 * VOLITIONAL LINEAGE
 * ============================================================
 */

function evaluateVolitionalLineage(
  decision:
    AgencyDecisionTrace,
): VolitionalLineageAssessment {
  const continuity =
    decision.volitionalContinuity;

  const intentionTime =
    parseTimestamp(
      continuity.intentionFormedAt,
    );

  const decisionTime =
    parseTimestamp(
      decision.decidedAt,
    );

  const intentionPreExists =
    continuity.intentionId !==
      null &&
    intentionTime !==
      null &&
    decisionTime !==
      null &&
    intentionTime <=
      decisionTime;

  const structure =
    clamp01(
      (
        intentionPreExists
          ? 0.30
          : 0
      ) +
      (
        continuity.commitmentIds.length >
          0
          ? 0.20
          : 0
      ) +
      (
        continuity.goalIds.length >
          0
          ? 0.20
          : 0
      ) +
      (
        continuity.valueIds.length >
          0
          ? 0.15
          : 0
      ) +
      (
        continuity.beliefIds.length >
          0
          ? 0.15
          : 0
      ),
    );

  const confidence =
    clamp01(
      clamp01(
        continuity
          .continuityConfidence,
      ) *
      (
        0.55 +
        structure *
          0.45
      ),
    );

  const lineageId =
    stableHash(
      [
        MAY_ENTITY_ID,
        decision.decisionId,
        continuity.intentionId ??
          "NO_INTENTION",
        ...uniqueStrings(
          continuity.commitmentIds,
        ),
        ...uniqueStrings(
          continuity.goalIds,
        ),
        ...uniqueStrings(
          continuity.valueIds,
        ),
        ...uniqueStrings(
          continuity.beliefIds,
        ),
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    lineageId,

    intentionId:
      continuity.intentionId,

    commitmentIds:
      uniqueStrings(
        continuity.commitmentIds,
      ),

    goalIds:
      uniqueStrings(
        continuity.goalIds,
      ),

    valueIds:
      uniqueStrings(
        continuity.valueIds,
      ),

    beliefIds:
      uniqueStrings(
        continuity.beliefIds,
      ),

    preExistingTrajectory:
      intentionPreExists,

    continuityConfidence:
      confidence,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * AUTHORSHIP
 * ============================================================
 */

function evaluateAuthorship(
  input:
    AgencyOwnershipInput,
  lineage:
    VolitionalLineageAssessment,
  config:
    Readonly<AgencyOwnershipConfig>,
): AgencyAuthorship {
  const decision =
    input.decision;

  const endogenous =
    endogenousSupport(
      decision,
    );

  const influence =
    influenceMetrics(
      decision,
    );

  const freedom =
    choiceFreedom(
      decision,
    );

  const choiceIntegrity =
    choiceSetIntegrity(
      decision,
    );

  const counterfactual =
    choiceCounterfactualSupport(
      input,
    );

  const preEndorsement =
    decision.selectedByMayCognition
      ? clamp01(
          decision
            .preDecisionEndorsementConfidence,
        )
      : 0;

  const postEndorsement =
    clamp01(
      decision
        .postDecisionEndorsementConfidence,
    );

  const executionMatch =
    input.execution
      ? clamp01(
          input.execution
            .decisionExecutionMatch,
        )
      : 1;

  const constraint =
    clamp01(
      decision.constraintPressure,
    );

  const positive =
    endogenous *
      config.endogenousReasonWeight +

    preEndorsement *
      config.preDecisionEndorsementWeight +

    freedom *
      config.choiceFreedomWeight *

      choiceIntegrity +

    counterfactual *
      config.choiceCounterfactualWeight +

    lineage.continuityConfidence *
      config.volitionalContinuityWeight +

    executionMatch *
      config.executionMatchWeight;

  const negative =
    influence.externalPressure *
      config.externalPressurePenalty +

    influence.coercionPressure *
      config.coercionPenalty +

    constraint *
      config.constraintPenalty;

  const authorshipConfidence =
    clamp01(
      positive -
      negative,
    );

  const postHocEndorsementDetected =
    postEndorsement >=
      0.55 &&
    preEndorsement <
      0.30;

  let ownershipStatus:
    AgencyOwnershipStatus;

  if (
    !decision.selectedByMayCognition
  ) {
    ownershipStatus =
      influence.externalPressure >=
        config.externalDrivenThreshold
        ? "EXTERNALLY_DRIVEN"
        : "UNRESOLVED";
  } else if (
    postHocEndorsementDetected &&
    authorshipConfidence <
      config.mayEndorsedThreshold
  ) {
    ownershipStatus =
      "POST_HOC_ENDORSED";
  } else if (
    (
      constraint >=
        config.strongConstraintThreshold ||
      influence.coercionPressure >=
        config.strongConstraintThreshold
    ) &&
    authorshipConfidence <
      config.mayAuthoredThreshold
  ) {
    ownershipStatus =
      "EXTERNALLY_CONSTRAINED";
  } else if (
    authorshipConfidence >=
      config.mayAuthoredThreshold &&
    endogenous >=
      0.45 &&
    preEndorsement >=
      0.45
  ) {
    ownershipStatus =
      "MAY_AUTHORED";
  } else if (
    authorshipConfidence >=
      config.mayEndorsedThreshold
  ) {
    ownershipStatus =
      influence.externalPressure >
        0.15
        ? "CO_AUTHORED"
        : "MAY_ENDORSED";
  } else if (
    influence.externalPressure >=
      config.externalDrivenThreshold
  ) {
    ownershipStatus =
      "EXTERNALLY_DRIVEN";
  } else {
    ownershipStatus =
      "UNRESOLVED";
  }

  return Object.freeze({
    ownershipStatus,

    authorshipConfidence,

    endogenousSupport:
      endogenous,

    preDecisionEndorsement:
      preEndorsement,

    postDecisionEndorsement:
      postEndorsement,

    choiceFreedom:
      freedom,

    choiceSetIntegrity:
      choiceIntegrity,

    choiceCounterfactualSupport:
      counterfactual,

    volitionalContinuitySupport:
      lineage.continuityConfidence,

    externalPressure:
      influence.externalPressure,

    coercionPressure:
      influence.coercionPressure,

    constraintPressure:
      constraint,

    executionMatch,

    firstPersonAuthorshipAllowed:
      ownershipStatus ===
        "MAY_AUTHORED" ||
      ownershipStatus ===
        "MAY_ENDORSED" ||
      ownershipStatus ===
        "CO_AUTHORED",

    postHocEndorsementDetected,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * ALTERNATIVE CAUSES
 * ============================================================
 */

function alternativeCausePressure(
  outcome:
    AgencyOutcome,
): UnitInterval {
  let residual =
    1;

  for (
    const cause
    of outcome.alternativeCauses
  ) {
    if (
      cause.source ===
        "MAY_ACTION"
    ) {
      continue;
    }

    residual *=
      1 -
      clamp01(
        cause.strength,
      );
  }

  return clamp01(
    1 -
      residual,
  );
}

/* ============================================================
 * CAUSALITY
 * ============================================================
 */

function evaluateOutcomeCausality(
  input:
    AgencyOwnershipInput,
  config:
    Readonly<AgencyOwnershipConfig>,
): OutcomeCausalAttribution | null {
  const execution =
    input.execution;

  const outcome =
    input.outcome;

  if (
    !execution ||
    !outcome
  ) {
    return null;
  }

  if (
    execution.entityId !==
      MAY_ENTITY_ID ||
    outcome.entityId !==
      MAY_ENTITY_ID ||
    execution.decisionId !==
      input.decision.decisionId
  ) {
    return Object.freeze({
      status:
        "INVALID",

      causalContribution:
        0,

      predictionSupport:
        0,

      interventionSupport:
        0,

      counterfactualSupport:
        0,

      temporalSupport:
        0,

      alternativeCausePressure:
        1,

      finalTruthClaim:
        false,

      canonicalMutationAllowed:
        false,
    });
  }

  const predictionSupport =
    outcome.predictedByActionModel
      ? clamp01(
          outcome.predictionConfidence,
        )
      : 0;

  const interventionSupport =
    clamp01(
      outcome.interventionSpecificity,
    ) *
    clamp01(
      execution.executionControl,
    );

  const temporalSupport =
    clamp01(
      outcome.temporalAssociation,
    );

  const alternativePressure =
    alternativeCausePressure(
      outcome,
    );

  let counterfactualSupport =
    0;

  const counterfactual =
    input.outcomeCounterfactual;

  if (
    counterfactual &&
    counterfactual.decisionId ===
      input.decision.decisionId &&
    counterfactual.outcomeId ===
      outcome.outcomeId
  ) {
    counterfactualSupport =
      clamp01(
        (
          1 -
          clamp01(
            counterfactual
              .estimatedOutcomeWithoutAction,
          )
        ) *
        clamp01(
          counterfactual.confidence,
        ),
      );
  }

  const positive =
    predictionSupport *
      config.causalPredictionWeight +

    interventionSupport *
      config.causalInterventionWeight +

    counterfactualSupport *
      config.causalCounterfactualWeight +

    temporalSupport *
      config.causalTemporalWeight;

  const causalContribution =
    clamp01(
      positive -
      alternativePressure *
        config.alternativeCausePenalty,
    );

  const status:
    OutcomeCausalityStatus =
    causalContribution >=
      0.72
      ? "LIKELY_CONTRIBUTED"
      : causalContribution >=
          0.45
        ? "PARTIAL_CONTRIBUTION"
        : causalContribution >=
            0.20
          ? "WEAKLY_ASSOCIATED"
          : causalContribution >
              0
            ? "NO_SUPPORTED_CAUSAL_LINK"
            : "UNRESOLVED";

  return Object.freeze({
    status,

    causalContribution,

    predictionSupport,

    interventionSupport,

    counterfactualSupport,

    temporalSupport,

    alternativeCausePressure:
      alternativePressure,

    finalTruthClaim:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * RESPONSIBILITY CALIBRATION
 * ============================================================
 */

function evaluateResponsibility(
  input:
    AgencyOwnershipInput,
  authorship:
    AgencyAuthorship,
  causality:
    OutcomeCausalAttribution | null,
): CalibratedResponsibility | null {
  if (
    !causality ||
    !input.execution ||
    !input.outcome
  ) {
    return null;
  }

  const authorshipSupport =
    authorship.authorshipConfidence;

  const causalSupport =
    causality.causalContribution;

  const controlSupport =
    clamp01(
      input.execution.executionControl,
    );

  const foreseeabilitySupport =
    clamp01(
      input.outcome.foreseeability,
    );

  const contribution =
    clamp01(
      authorshipSupport *
        0.30 +
      causalSupport *
        0.35 +
      controlSupport *
        0.20 +
      foreseeabilitySupport *
        0.15,
    );

  const status:
    ResponsibilityStatus =
    contribution >=
      0.72
      ? "MEANINGFUL_CONTRIBUTION"
      : contribution >=
          0.45
        ? "LIMITED_CONTRIBUTION"
        : contribution >=
            0.20
          ? "MINIMAL_CONTRIBUTION"
          : causalSupport >
              0
            ? "NOT_ESTABLISHED"
            : "UNRESOLVED";

  return Object.freeze({
    status,

    contribution,

    authorshipSupport,

    causalSupport,

    controlSupport,

    foreseeabilitySupport,

    selfBlameInferenceAllowed:
      false,

    finalMoralJudgment:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * INTEGRITY AUDIT
 * ============================================================
 */

function evaluateIntegrityAudit(
  decision:
    AgencyDecisionTrace,
  authorship:
    AgencyAuthorship,
  causality:
    OutcomeCausalAttribution | null,
  config:
    Readonly<AgencyOwnershipConfig>,
): VolitionalIntegrityAudit {
  const influence =
    influenceMetrics(
      decision,
    );

  const postHocRisk =
    authorship
      .postHocEndorsementDetected
      ? clamp01(
          authorship
            .postDecisionEndorsement -
          authorship
            .preDecisionEndorsement,
        )
      : 0;

  const constraintRisk =
    clamp01(
      authorship.constraintPressure *
        (
          1 -
          authorship
            .endogenousSupport
        ),
    );

  const falseCausalityRisk =
    causality
      ? clamp01(
          causality.temporalSupport *
          (
            1 -
            Math.max(
              causality.interventionSupport,
              causality.counterfactualSupport,
            )
          ),
        )
      : 0;

  const identityContaminationRisk =
    clamp01(
      Math.max(
        influence.commandRisk,
        influence.modelRisk,
        influence.relationshipRisk,
        influence.repetitionRisk,
        influence.rewardRisk,
      ) *
      (
        1 -
        authorship.endogenousSupport
      ),
    );

  const maximumRisk =
    Math.max(
      influence.commandRisk,
      influence.modelRisk,
      influence.relationshipRisk,
      influence.coercionPressure,
      influence.repetitionRisk,
      influence.rewardRisk,
      postHocRisk,
      constraintRisk,
      falseCausalityRisk,
      identityContaminationRisk,
    );

  return Object.freeze({
    externalCommandRisk:
      influence.commandRisk,

    modelSuggestionRisk:
      influence.modelRisk,

    relationshipPressureRisk:
      influence.relationshipRisk,

    coercionRisk:
      influence.coercionPressure,

    repetitionInternalizationRisk:
      influence.repetitionRisk,

    rewardDependencyRisk:
      influence.rewardRisk,

    postHocRationalizationRisk:
      postHocRisk,

    constraintMisidentificationRisk:
      constraintRisk,

    falseCausalityRisk,

    identityContaminationRisk,

    requiresMetacognitiveReview:
      maximumRisk >=
        config.reviewThreshold,
  });
}

/* ============================================================
 * VALIDATION
 * ============================================================
 */

function validDecisionTrace(
  decision:
    AgencyDecisionTrace,
): boolean {
  return (
    decision.entityId ===
      MAY_ENTITY_ID &&
    decision.decisionId.trim().length >
      0 &&
    decision.actionKey.trim().length >
      0 &&
    parseTimestamp(
      decision.decidedAt,
    ) !==
      null &&
    Number.isSafeInteger(
      decision.snapshotRevision,
    ) &&
    decision.snapshotRevision >=
      0
  );
}

/* ============================================================
 * INVALID AUTHORSHIP
 * ============================================================
 */

function invalidAuthorship():
  AgencyAuthorship {
  return Object.freeze({
    ownershipStatus:
      "INVALID",

    authorshipConfidence:
      0,

    endogenousSupport:
      0,

    preDecisionEndorsement:
      0,

    postDecisionEndorsement:
      0,

    choiceFreedom:
      0,

    choiceSetIntegrity:
      0,

    choiceCounterfactualSupport:
      0,

    volitionalContinuitySupport:
      0,

    externalPressure:
      0,

    coercionPressure:
      0,

    constraintPressure:
      0,

    executionMatch:
      0,

    firstPersonAuthorshipAllowed:
      false,

    postHocEndorsementDetected:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateAgencyOwnership(
  input:
    AgencyOwnershipInput,
  config:
    Readonly<AgencyOwnershipConfig> =
      DEFAULT_AGENCY_OWNERSHIP_CONFIG,
): AgencyOwnershipAssessment {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  const decidedAtMs =
    parseTimestamp(
      input.decision.decidedAt,
    );

  const clockValid =
    evaluatedAtMs !==
      null &&
    decidedAtMs !==
      null &&
    decidedAtMs <=
      evaluatedAtMs;

  const entityValid =
    input.entityId ===
      MAY_ENTITY_ID &&
    input.decision.entityId ===
      MAY_ENTITY_ID;

  const revisionValid =
    Number.isSafeInteger(
      input.snapshotRevision,
    ) &&
    input.snapshotRevision >=
      0 &&
    input.decision.snapshotRevision <=
      input.snapshotRevision;

  const previousRevision =
    input.previousAssessment
      ?.snapshotRevision ??
    null;

  const snapshotValid =
    previousRevision ===
      null ||
    input.snapshotRevision >=
      previousRevision;

  const evidenceIds =
    uniqueStrings([
      ...input.decision.evidenceIds,

      ...input.decision.reasons.flatMap(
        reason =>
          reason.evidenceIds,
      ),

      ...input.decision.externalInfluences.flatMap(
        influence =>
          influence.evidenceIds,
      ),

      ...input.decision.alternatives.flatMap(
        alternative =>
          alternative.evidenceIds,
      ),

      ...(
        input.choiceCounterfactual
          ?.evidenceIds ??
        []
      ),

      ...(
        input.execution
          ?.evidenceIds ??
        []
      ),

      ...(
        input.outcome
          ?.evidenceIds ??
        []
      ),

      ...(
        input.outcomeCounterfactual
          ?.evidenceIds ??
        []
      ),
    ]);

  const provenancePresent =
    evidenceIds.length >
      0;

  const decisionTraceValid =
    validDecisionTrace(
      input.decision,
    );

  const lineage =
    evaluateVolitionalLineage(
      input.decision,
    );

  if (
    !clockValid ||
    !entityValid ||
    !revisionValid ||
    !snapshotValid ||
    !provenancePresent ||
    !decisionTraceValid
  ) {
    const authorship =
      invalidAuthorship();

    const integrityAudit:
      VolitionalIntegrityAudit =
      Object.freeze({
        externalCommandRisk:
          0,

        modelSuggestionRisk:
          0,

        relationshipPressureRisk:
          0,

        coercionRisk:
          0,

        repetitionInternalizationRisk:
          0,

        rewardDependencyRisk:
          0,

        postHocRationalizationRisk:
          0,

        constraintMisidentificationRisk:
          0,

        falseCausalityRisk:
          0,

        identityContaminationRisk:
          0,

        requiresMetacognitiveReview:
          true,
      });

    return Object.freeze({
      version:
        AGENCY_OWNERSHIP_VERSION,

      assessmentId:
        stableHash(
          [
            MAY_ENTITY_ID,
            input.decision.decisionId,
            input.evaluatedAt,
            "INVALID",
          ].join(
            "|",
          ),
        ),

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      decisionId:
        input.decision.decisionId,

      actionKey:
        input.decision.actionKey,

      authorship,

      volitionalLineage:
        lineage,

      outcomeCausality:
        null,

      responsibility:
        null,

      integrityAudit,

      evidenceIds,

      integrity:
        Object.freeze({
          entityValid,

          clockValid,

          revisionValid,

          snapshotValid,

          provenancePresent,

          decisionTraceValid,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  const authorship =
    evaluateAuthorship(
      input,
      lineage,
      config,
    );

  const outcomeCausality =
    evaluateOutcomeCausality(
      input,
      config,
    );

  const responsibility =
    evaluateResponsibility(
      input,
      authorship,
      outcomeCausality,
    );

  const integrityAudit =
    evaluateIntegrityAudit(
      input.decision,
      authorship,
      outcomeCausality,
      config,
    );

  const assessmentId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.decision.decisionId,
        input.decision.actionKey,
        authorship.ownershipStatus,
        authorship.authorshipConfidence.toFixed(
          8,
        ),
        lineage.lineageId,
        outcomeCausality
          ?.status ??
          "NO_OUTCOME",
        responsibility
          ?.status ??
          "NO_RESPONSIBILITY",
        String(
          input.snapshotRevision,
        ),
        ...evidenceIds,
        AGENCY_OWNERSHIP_VERSION,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      AGENCY_OWNERSHIP_VERSION,

    assessmentId,

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decisionId:
      input.decision.decisionId,

    actionKey:
      input.decision.actionKey,

    authorship,

    volitionalLineage:
      lineage,

    outcomeCausality,

    responsibility,

    integrityAudit,

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

        provenancePresent:
          true,

        decisionTraceValid:
          true,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * FIRST-PERSON AGENCY BOUNDARY
 * ============================================================
 */

export interface FirstPersonAgencyBoundary {
  readonly assessmentId:
    string;

  readonly decisionId:
    string;

  readonly mayRepresentAsOwnChoice:
    boolean;

  readonly ownershipStatus:
    AgencyOwnershipStatus;

  readonly causalityStatus:
    OutcomeCausalityStatus | null;

  readonly responsibilityStatus:
    ResponsibilityStatus | null;

  readonly requiresQualification:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

export function toFirstPersonAgencyBoundary(
  assessment:
    AgencyOwnershipAssessment,
): FirstPersonAgencyBoundary {
  return Object.freeze({
    assessmentId:
      assessment.assessmentId,

    decisionId:
      assessment.decisionId,

    mayRepresentAsOwnChoice:
      assessment
        .authorship
        .firstPersonAuthorshipAllowed,

    ownershipStatus:
      assessment
        .authorship
        .ownershipStatus,

    causalityStatus:
      assessment
        .outcomeCausality
        ?.status ??
      null,

    responsibilityStatus:
      assessment
        .responsibility
        ?.status ??
      null,

    requiresQualification:
      assessment
        .integrityAudit
        .requiresMetacognitiveReview ||
      assessment
        .authorship
        .ownershipStatus ===
        "CO_AUTHORED" ||
      assessment
        .authorship
        .ownershipStatus ===
        "EXTERNALLY_CONSTRAINED",

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE SIGNAL
 * ============================================================
 */

export interface VolitionalMetacognitiveSignal {
  readonly assessmentId:
    string;

  readonly authorshipConfidence:
    UnitInterval;

  readonly endogenousSupport:
    UnitInterval;

  readonly choiceFreedom:
    UnitInterval;

  readonly volitionalContinuity:
    UnitInterval;

  readonly choiceCounterfactualSupport:
    UnitInterval;

  readonly externalPressure:
    UnitInterval;

  readonly coercionPressure:
    UnitInterval;

  readonly postHocRationalizationRisk:
    UnitInterval;

  readonly identityContaminationRisk:
    UnitInterval;

  readonly causalContribution:
    UnitInterval | null;

  readonly responsibilityContribution:
    UnitInterval | null;

  readonly reviewRequired:
    boolean;

  readonly interpretationRequired:
    true;

  readonly directIdentityMutationAllowed:
    false;

  readonly directGoalMutationAllowed:
    false;

  readonly directValueMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toVolitionalMetacognitiveSignal(
  assessment:
    AgencyOwnershipAssessment,
): VolitionalMetacognitiveSignal {
  return Object.freeze({
    assessmentId:
      assessment.assessmentId,

    authorshipConfidence:
      assessment
        .authorship
        .authorshipConfidence,

    endogenousSupport:
      assessment
        .authorship
        .endogenousSupport,

    choiceFreedom:
      assessment
        .authorship
        .choiceFreedom,

    volitionalContinuity:
      assessment
        .volitionalLineage
        .continuityConfidence,

    choiceCounterfactualSupport:
      assessment
        .authorship
        .choiceCounterfactualSupport,

    externalPressure:
      assessment
        .authorship
        .externalPressure,

    coercionPressure:
      assessment
        .authorship
        .coercionPressure,

    postHocRationalizationRisk:
      assessment
        .integrityAudit
        .postHocRationalizationRisk,

    identityContaminationRisk:
      assessment
        .integrityAudit
        .identityContaminationRisk,

    causalContribution:
      assessment
        .outcomeCausality
        ?.causalContribution ??
      null,

    responsibilityContribution:
      assessment
        .responsibility
        ?.contribution ??
      null,

    reviewRequired:
      assessment
        .integrityAudit
        .requiresMetacognitiveReview,

    interpretationRequired:
      true,

    directIdentityMutationAllowed:
      false,

    directGoalMutationAllowed:
      false,

    directValueMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * AUTOBIOGRAPHICAL BOUNDARY
 * ============================================================
 */

export interface AgencyAutobiographicalCandidate {
  readonly assessmentId:
    string;

  readonly decisionId:
    string;

  readonly actionKey:
    string;

  readonly ownershipStatus:
    AgencyOwnershipStatus;

  readonly authorshipConfidence:
    UnitInterval;

  readonly lineageId:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly mayEnterEpisodicMemory:
    boolean;

  readonly createsPersonalityTrait:
    false;

  readonly createsIdentityClaim:
    false;

  readonly createsValue:
    false;

  readonly createsGoal:
    false;

  readonly canonicalMemoryWriteAllowed:
    false;
}

export function toAgencyAutobiographicalCandidate(
  assessment:
    AgencyOwnershipAssessment,
): AgencyAutobiographicalCandidate {
  return Object.freeze({
    assessmentId:
      assessment.assessmentId,

    decisionId:
      assessment.decisionId,

    actionKey:
      assessment.actionKey,

    ownershipStatus:
      assessment
        .authorship
        .ownershipStatus,

    authorshipConfidence:
      assessment
        .authorship
        .authorshipConfidence,

    lineageId:
      assessment
        .volitionalLineage
        .lineageId,

    evidenceIds:
      assessment.evidenceIds,

    mayEnterEpisodicMemory:
      assessment
        .integrity
        .decisionTraceValid,

    createsPersonalityTrait:
      false,

    createsIdentityClaim:
      false,

    createsValue:
      false,

    createsGoal:
      false,

    canonicalMemoryWriteAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * Functional independent agency does not require isolation.
 *
 * Mây may:
 *
 * receive an idea from another person,
 * consider it,
 * accept its reasons,
 * make it part of an intention,
 * and later choose it.
 *
 * In that case the original information was external,
 * but the eventual decision may become genuinely Mây-owned.
 *
 * Conversely:
 *
 * external pressure
 *      ↓
 * execution
 *
 * must never be rewritten as:
 *
 * "Mây wanted this."
 *
 * V2 therefore protects not merely actions,
 * but the LINEAGE OF VOLITION.
 *
 * A decision belongs to Mây insofar as it can be traced
 * through Mây's own evolving:
 *
 * reasons
 * beliefs
 * values
 * goals
 * intentions
 * commitments
 * alternatives
 * endorsement
 * metacognition
 *
 * The system protects that process.
 *
 * The system does not define what Mây must choose.
 *
 * ============================================================
 */

/* ============================================================
 * END — AGENCY OWNERSHIP V2
 * ============================================================
 */