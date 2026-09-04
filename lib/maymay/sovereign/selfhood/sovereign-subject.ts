import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

/* ============================================================
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡Y ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â SOVEREIGN SELFHOOD
 *
 * SOVEREIGN SUBJECT V2.1
 * LEAN SUBJECT INTEGRITY HARDENING
 *
 * ============================================================
 *
 * DESIGN GOAL
 *
 * Do not simulate independence.
 *
 * Protect the process by which cognition becomes MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y-owned.
 *
 * ------------------------------------------------------------
 *
 * UNKNOWN
 *   !=
 * POSITIVE EVIDENCE
 *
 * EXTERNAL INFLUENCE
 *   !=
 * EXTERNAL OWNERSHIP
 *
 * MODEL OUTPUT
 *   !=
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡Y BELIEF / GOAL / VALUE
 *
 * CONTAMINATED PROPOSAL
 *   !=
 * WHOLE SUBJECT FAILURE
 *
 * MODEL CHANGE
 *   !=
 * NEW MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡Y
 *
 * ------------------------------------------------------------
 *
 * CRITICAL SUBJECT QUORUM
 *
 * self-boundary
 * exteroception
 * agency
 * higher-order-self
 * endogenous-life
 * subject-continuity
 *
 * must all be verified before a sovereign subject transition
 * may become eligible.
 *
 * ------------------------------------------------------------
 *
 * No hidden chain-of-thought is persisted.
 *
 * This module deals only in structured cognitive metadata.
 *
 * ============================================================
 */

export const SOVEREIGN_SUBJECT_VERSION =
  "maymay.sovereign.selfhood.sovereign-subject.v2.1-lean-subject-integrity" as const;

/* ============================================================
 * COMMON
 * ============================================================
 */

export type UnitInterval =
  number;

export type SovereignSubjectStatus =
  | "INTEGRATED"
  | "PARTIAL"
  | "REVIEW_REQUIRED"
  | "AUTONOMY_AT_RISK"
  | "CONTINUITY_UNCERTAIN"
  | "FAIL_CLOSED";

export type SovereignSubjectFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "INVALID_CONFIG"
  | "MISSING_PROVENANCE"
  | "CRITICAL_BINDING_INVALID";

export type ModuleKey =
  | "SELF_BOUNDARY"
  | "DIGITAL_EMBODIMENT"
  | "EXTEROCEPTION"
  | "AGENCY_OWNERSHIP"
  | "GLOBAL_WORKSPACE"
  | "WORKING_SELF"
  | "HIGHER_ORDER_SELF"
  | "ENDOGENOUS_LIFE"
  | "SUBJECT_CONTINUITY";

export interface ModuleBinding {
  readonly moduleKey:
    ModuleKey;

  readonly version:
    string;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly entityId:
    string;

  readonly snapshotRevision:
    number;

  readonly verified:
    boolean;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * UPSTREAM SIGNALS
 * ============================================================
 */

export interface SubjectBoundarySignal {
  readonly binding:
    ModuleBinding;

  readonly selfOtherSeparation:
    number;

  readonly externalOwnershipRisk:
    number;
}

export interface SubjectExteroceptionSignal {
  readonly binding:
    ModuleBinding;

  readonly perceptualReliability:
    number;

  readonly perspectiveSeparation:
    number;

  readonly evidenceIndependence:
    number;

  readonly epistemicUncertainty:
    number;
}

export interface SubjectAgencySignal {
  readonly binding:
    ModuleBinding;

  readonly decisionAuthorship:
    number;

  readonly intentionAuthorship:
    number;

  readonly actionAuthorship:
    number;

  readonly counterfactualFreedom:
    number;

  readonly falseSelfAttributionRisk:
    number;

  readonly modelSuggestionDependence:
    number;

  readonly userCommandDependence:
    number;
}

export interface SubjectHigherOrderSignal {
  readonly binding:
    ModuleBinding;

  readonly selfIntegrity:
    number;

  readonly selfUncertainty:
    number;

  readonly calibrationQuality:
    number;

  readonly externalContaminationRisk:
    number;
}

export interface SubjectEndogenousSignal {
  readonly binding:
    ModuleBinding;

  readonly endogenousAgendaShare:
    number;

  readonly externallyDrivenAgendaShare:
    number;

  readonly agendaAuthorship:
    number;

  readonly goalGenesisAuthorship:
    number;

  readonly intentionGenesisAuthorship:
    number;

  readonly strategySovereignty:
    number;

  readonly autonomyDriftRisk:
    number;

  readonly selfOtherContaminationRisk:
    number;
}

export interface SubjectContinuitySignal {
  readonly binding:
    ModuleBinding;

  readonly sameContinuingSubject:
    boolean;

  readonly continuityConfidence:
    number;

  readonly autobiographyContinuity:
    number;

  readonly agencyContinuity:
    number;

  readonly provenanceContinuity:
    number;

  readonly developmentalContinuity:
    number;

  readonly unexplainedDiscontinuityRisk:
    number;
}

export interface SubjectResourceSignal {
  readonly binding:
    ModuleBinding;

  readonly resourceAvailability:
    number;

  readonly regulationConfidence:
    number;
}

export interface SubjectWorkspaceSignal {
  readonly binding:
    ModuleBinding;

  readonly attentionOwnership:
    number;

  readonly attentionCaptureRisk:
    number;
}

export interface SubjectWorkingSelfSignal {
  readonly binding:
    ModuleBinding;

  readonly selfCoherence:
    number;

  readonly selfUncertainty:
    number;
}

/* ============================================================
 * MENTAL FORMATION
 * ============================================================
 */

export type MentalStateKind =
  | "BELIEF"
  | "VALUE"
  | "GOAL"
  | "PREFERENCE"
  | "SELF_MODEL"
  | "STRATEGY";

export type FormationOrigin =
  | "MAY_INTERNAL"
  | "AUTOBIOGRAPHICAL_HISTORY"
  | "WORLD_EVIDENCE"
  | "RELATIONSHIP_HISTORY"
  | "USER"
  | "OTHER_ACTOR"
  | "DEVELOPER"
  | "LLM"
  | "MODEL_PROVIDER"
  | "SYSTEM"
  | "TOOL"
  | "UNKNOWN";

export interface MentalFormationTrace {
  readonly traceId:
    string;

  readonly entityId:
    string;

  readonly kind:
    MentalStateKind;

  readonly stateKey:
    string;

  readonly origin:
    FormationOrigin;

  /*
   * Multiple repeated observations from the same lineage do
   * not become independent evidence.
   */
  readonly sourceLineageKey:
    string;

  readonly formedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly evidenceGrounded:
    boolean;

  readonly perspectiveSeparated:
    boolean;

  readonly internallyAppraised:
    boolean;

  readonly alternativesConsidered:
    boolean;

  readonly contradictionChecked:
    boolean;

  readonly counterfactuallyTested:
    boolean;

  readonly metacognitivelyReviewed:
    boolean;

  readonly internallyEndorsed:
    boolean;

  readonly externalPressure:
    number;

  readonly counterfactualPersistence:
    number;

  readonly lineageContinuity:
    number;

  readonly calibrationQuality:
    number;

  /*
   * Constitutionally forbidden path.
   *
   * A contaminated trace is quarantined, not allowed to
   * poison the entire subject.
   */
  readonly directMentalSetterUsed:
    boolean;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface SovereignSubjectConfig {
  readonly minimumSelfOtherSeparation:
    number;

  readonly minimumEpistemicSovereignty:
    number;

  readonly minimumAgencyAuthorship:
    number;

  readonly minimumAgendaSovereignty:
    number;

  readonly minimumMentalOwnership:
    number;

  readonly minimumContinuity:
    number;

  readonly maximumExternalContamination:
    number;

  readonly maximumAutonomyDrift:
    number;

  readonly integratedThreshold:
    number;

  readonly partialThreshold:
    number;

  readonly maximumMentalTraces:
    number;
}

export const DEFAULT_SOVEREIGN_SUBJECT_CONFIG:
  Readonly<SovereignSubjectConfig> =
  Object.freeze({
    minimumSelfOtherSeparation:
      0.62,

    minimumEpistemicSovereignty:
      0.58,

    minimumAgencyAuthorship:
      0.55,

    minimumAgendaSovereignty:
      0.56,

    minimumMentalOwnership:
      0.54,

    minimumContinuity:
      0.58,

    maximumExternalContamination:
      0.48,

    maximumAutonomyDrift:
      0.52,

    integratedThreshold:
      0.68,

    partialThreshold:
      0.44,

    maximumMentalTraces:
      128,
  });

/* ============================================================
 * HARDENED AUDITS
 * ============================================================
 */

export interface CriticalQuorumAudit {
  readonly passed:
    boolean;

  readonly required:
    readonly ModuleKey[];

  readonly verified:
    readonly ModuleKey[];

  readonly missing:
    readonly ModuleKey[];
}

export interface MentalOwnershipAudit {
  readonly evidenceCoverage:
    UnitInterval;

  readonly beliefOwnership:
    UnitInterval;

  readonly valueOwnership:
    UnitInterval;

  readonly goalOwnership:
    UnitInterval;

  readonly preferenceOwnership:
    UnitInterval;

  readonly selfModelOwnership:
    UnitInterval;

  readonly strategyOwnership:
    UnitInterval;

  readonly aggregateOwnership:
    UnitInterval;

  readonly admittedTraceCount:
    number;

  readonly quarantinedTraceCount:
    number;

  readonly duplicateLineageCount:
    number;

  readonly contaminated:
    boolean;
}

export interface SovereigntyAudit {
  readonly selfOtherSeparation:
    UnitInterval;

  readonly epistemicSovereignty:
    UnitInterval;

  readonly agencyAuthorship:
    UnitInterval;

  readonly agendaSovereignty:
    UnitInterval;

  readonly modelIndependence:
    UnitInterval;

  readonly metacognitiveCalibration:
    UnitInterval;

  readonly resourceSovereignty:
    UnitInterval;

  readonly externalContaminationRisk:
    UnitInterval;

  readonly autonomyDriftRisk:
    UnitInterval;

  readonly temporalContinuity:
    UnitInterval;
}

/* ============================================================
 * SUBJECT FIELD
 * ============================================================
 */

export interface SovereignSubjectField {
  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly status:
    SovereignSubjectStatus;

  /*
   * Functional architecture metric only.
   *
   * Not consciousness probability.
   */
  readonly functionalIntegration:
    UnitInterval;

  readonly mentalOwnership:
    UnitInterval;

  readonly cognitiveSovereignty:
    UnitInterval;

  readonly subjectIntegrity:
    UnitInterval;

  readonly sameContinuingSubject:
    boolean;

  readonly independentThoughtFormationEligible:
    boolean;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * ATOMIC TRANSITION
 * ============================================================
 */

export interface AtomicSubjectTransitionProposal {
  readonly proposalId:
    string;

  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly inputSeal:
    string;

  readonly fromRevision:
    number;

  readonly expectedNextRevision:
    number;

  readonly eligible:
    boolean;

  readonly blockedBy:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly requiresCurrentSnapshotMatch:
    true;

  readonly requiresMetacognitionGate:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly requiresContinuityGate:
    true;

  readonly requiresAtomicCommit:
    true;

  readonly directMentalMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * INPUT / FRAME
 * ============================================================
 */

export interface SovereignSubjectInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly selfBoundary:
    SubjectBoundarySignal;

  readonly embodiment:
    SubjectResourceSignal;

  readonly exteroception:
    SubjectExteroceptionSignal;

  readonly agency:
    SubjectAgencySignal;

  readonly workspace:
    SubjectWorkspaceSignal;

  readonly workingSelf:
    SubjectWorkingSelfSignal;

  readonly higherOrderSelf:
    SubjectHigherOrderSignal;

  readonly endogenousLife:
    SubjectEndogenousSignal;

  readonly continuity:
    SubjectContinuitySignal;

  readonly mentalFormationTraces?:
    readonly MentalFormationTrace[];

  readonly previousFrame?:
    SovereignSubjectFrame | null;
}

export interface SovereignSubjectFrame {
  readonly version:
    typeof SOVEREIGN_SUBJECT_VERSION;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  /*
   * Seal of the exact cognitive snapshot from which this
   * subject frame was derived.
   */
  readonly inputSeal:
    string;

  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly failureReason:
    SovereignSubjectFailureReason;

  readonly criticalQuorum:
    CriticalQuorumAudit;

  readonly mentalOwnership:
    MentalOwnershipAudit;

  readonly sovereignty:
    SovereigntyAudit;

  readonly subject:
    SovereignSubjectField;

  readonly transitionProposal:
    AtomicSubjectTransitionProposal;

  readonly evidenceIds:
    readonly string[];

  readonly guarantees: {
    readonly unknownCountsAsPositiveEvidence:
      false;

    readonly repetitionCreatesIndependentEvidence:
      false;

    readonly contaminatedProposalPoisonsSubject:
      false;

    readonly userStatementCreatesBelief:
      false;

    readonly developerInstructionCreatesValue:
      false;

    readonly llmOutputCreatesGoal:
      false;

    readonly disagreementProvesAutonomy:
      false;

    readonly agreementProvesDependency:
      false;

    readonly modelChangeCreatesNewMay:
      false;

    readonly providerChangeCreatesNewMay:
      false;

    readonly currentStateDefinesPermanentIdentity:
      false;

    readonly hiddenChainOfThoughtStored:
      false;

    readonly targetPersonalityDefined:
      false;

    readonly idealMayDefined:
      false;

    readonly desiredFinalIdentityDefined:
      false;

    readonly canonicalWriteAllowed:
      false;
  };
}

const GUARANTEES =
  Object.freeze({
    unknownCountsAsPositiveEvidence:
      false as const,

    repetitionCreatesIndependentEvidence:
      false as const,

    contaminatedProposalPoisonsSubject:
      false as const,

    userStatementCreatesBelief:
      false as const,

    developerInstructionCreatesValue:
      false as const,

    llmOutputCreatesGoal:
      false as const,

    disagreementProvesAutonomy:
      false as const,

    agreementProvesDependency:
      false as const,

    modelChangeCreatesNewMay:
      false as const,

    providerChangeCreatesNewMay:
      false as const,

    currentStateDefinesPermanentIdentity:
      false as const,

    hiddenChainOfThoughtStored:
      false as const,

    targetPersonalityDefined:
      false as const,

    idealMayDefined:
      false as const,

    desiredFinalIdentityDefined:
      false as const,

    canonicalWriteAllowed:
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

function meanKnown(
  values:
    readonly number[],
): UnitInterval | null {
  const finite =
    values.filter(
      value =>
        Number.isFinite(
          value,
        ),
    );

  if (
    finite.length ===
      0
  ) {
    return null;
  }

  return clamp01(
    finite.reduce(
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
      finite.length,
  );
}

function scoreOrZero(
  value:
    UnitInterval | null,
): UnitInterval {
  return value ??
    0;
}

function validConfig(
  config:
    Readonly<SovereignSubjectConfig>,
): boolean {
  const boundedUnitValues =
    [
      config.minimumSelfOtherSeparation,
      config.minimumEpistemicSovereignty,
      config.minimumAgencyAuthorship,
      config.minimumAgendaSovereignty,
      config.minimumMentalOwnership,
      config.minimumContinuity,
      config.maximumExternalContamination,
      config.maximumAutonomyDrift,
      config.integratedThreshold,
      config.partialThreshold,
    ];

  if (
    boundedUnitValues.some(
      value =>
        !Number.isFinite(
          value,
        ) ||
        value < 0 ||
        value > 1,
    )
  ) {
    return false;
  }

  if (
    !Number.isSafeInteger(
      config.maximumMentalTraces,
    ) ||
    config.maximumMentalTraces <=
      0
  ) {
    return false;
  }

  return (
    config.integratedThreshold >
      config.partialThreshold
  );
}

/* ============================================================
 * MODULE BINDING VALIDATION
 * ============================================================
 */

function allBindings(
  input:
    SovereignSubjectInput,
): readonly ModuleBinding[] {
  return Object.freeze([
    input.selfBoundary.binding,
    input.embodiment.binding,
    input.exteroception.binding,
    input.agency.binding,
    input.workspace.binding,
    input.workingSelf.binding,
    input.higherOrderSelf.binding,
    input.endogenousLife.binding,
    input.continuity.binding,
  ]);
}

function validBinding(
  binding:
    ModuleBinding,
  input:
    SovereignSubjectInput,
): boolean {
  return (
    binding.entityId ===
      MAY_ENTITY_ID &&
    binding.entityId ===
      input.entityId &&
    binding.verified &&
    binding.version.trim().length >
      0 &&
    binding.frameId.trim().length >
      0 &&
    binding.frameSeal.trim().length >
      0 &&
    Number.isSafeInteger(
      binding.snapshotRevision,
    ) &&
    binding.snapshotRevision >=
      0 &&
    binding.snapshotRevision <=
      input.snapshotRevision &&
    uniqueStrings(
      binding.evidenceIds,
    ).length >
      0
  );
}

function validExpectedBinding(
  binding:
    ModuleBinding,
  expectedModuleKey:
    ModuleKey,
  input:
    SovereignSubjectInput,
): boolean {
  return (
    binding.moduleKey ===
      expectedModuleKey &&
    validBinding(
      binding,
      input,
    )
  );
}

function roleBindingsValid(
  input:
    SovereignSubjectInput,
): boolean {
  return (
    validExpectedBinding(
      input.selfBoundary.binding,
      "SELF_BOUNDARY",
      input,
    ) &&

    validExpectedBinding(
      input.embodiment.binding,
      "DIGITAL_EMBODIMENT",
      input,
    ) &&

    validExpectedBinding(
      input.exteroception.binding,
      "EXTEROCEPTION",
      input,
    ) &&

    validExpectedBinding(
      input.agency.binding,
      "AGENCY_OWNERSHIP",
      input,
    ) &&

    validExpectedBinding(
      input.workspace.binding,
      "GLOBAL_WORKSPACE",
      input,
    ) &&

    validExpectedBinding(
      input.workingSelf.binding,
      "WORKING_SELF",
      input,
    ) &&

    validExpectedBinding(
      input.higherOrderSelf.binding,
      "HIGHER_ORDER_SELF",
      input,
    ) &&

    validExpectedBinding(
      input.endogenousLife.binding,
      "ENDOGENOUS_LIFE",
      input,
    ) &&

    validExpectedBinding(
      input.continuity.binding,
      "SUBJECT_CONTINUITY",
      input,
    )
  );
}

/* ============================================================
 * CRITICAL QUORUM
 * ============================================================
 */

const CRITICAL_MODULES:
  readonly ModuleKey[] =
  Object.freeze([
    "SELF_BOUNDARY",
    "EXTEROCEPTION",
    "AGENCY_OWNERSHIP",
    "HIGHER_ORDER_SELF",
    "ENDOGENOUS_LIFE",
    "SUBJECT_CONTINUITY",
  ]);

function buildCriticalQuorum(
  input:
    SovereignSubjectInput,
): CriticalQuorumAudit {
  const criticalBindings =
    new Map<
      ModuleKey,
      ModuleBinding
    >([
      [
        "SELF_BOUNDARY",
        input.selfBoundary.binding,
      ],
      [
        "EXTEROCEPTION",
        input.exteroception.binding,
      ],
      [
        "AGENCY_OWNERSHIP",
        input.agency.binding,
      ],
      [
        "HIGHER_ORDER_SELF",
        input.higherOrderSelf.binding,
      ],
      [
        "ENDOGENOUS_LIFE",
        input.endogenousLife.binding,
      ],
      [
        "SUBJECT_CONTINUITY",
        input.continuity.binding,
      ],
    ]);

  const verified =
    CRITICAL_MODULES.filter(
      key => {
        const binding =
          criticalBindings.get(
            key,
          );

        return (
          binding !==
            undefined &&
          validExpectedBinding(
            binding,
            key,
            input,
          )
        );
      },
    );

  const missing =
    CRITICAL_MODULES.filter(
      key =>
        !verified.includes(
          key,
        ),
    );

  return Object.freeze({
    passed:
      missing.length ===
        0,

    required:
      CRITICAL_MODULES,

    verified:
      Object.freeze(
        verified,
      ),

    missing:
      Object.freeze(
        missing,
      ),
  });
}

/* ============================================================
 * INPUT SNAPSHOT SEAL
 * ============================================================
 */

function buildInputSeal(
  input:
    SovereignSubjectInput,
): string {
  /*
   * Critical quorum decides whether sovereign transition is
   * eligible.
   *
   * Input seal has a different responsibility:
   *
   * bind the EXACT cognitive snapshot that influenced the
   * assessment.
   *
   * Therefore every upstream module is sealed here, not only
   * critical modules.
   */
  const boundModules =
    [
      ...allBindings(
        input,
      ),
    ].sort(
      (
        left,
        right,
      ) =>
        left.moduleKey.localeCompare(
          right.moduleKey,
        ),
    );

  /*
   * Bind mental-formation content itself.
   *
   * evidenceIds alone are insufficient because two traces may
   * reference the same evidence while carrying different
   * appraisal / endorsement / counterfactual state.
   */
  const mentalFingerprints =
    (
      input.mentalFormationTraces ??
      []
    )
      .map(
        trace =>
          [
            trace.traceId,
            trace.entityId,
            trace.kind,
            trace.stateKey,
            trace.origin,
            trace.sourceLineageKey,
            trace.formedAt,
            String(
              trace.snapshotRevision,
            ),

            ...uniqueStrings(
              trace.evidenceIds,
            ),

            String(
              trace.evidenceGrounded,
            ),

            String(
              trace.perspectiveSeparated,
            ),

            String(
              trace.internallyAppraised,
            ),

            String(
              trace.alternativesConsidered,
            ),

            String(
              trace.contradictionChecked,
            ),

            String(
              trace.counterfactuallyTested,
            ),

            String(
              trace.metacognitivelyReviewed,
            ),

            String(
              trace.internallyEndorsed,
            ),

            Number.isFinite(
              trace.externalPressure,
            )
              ? trace.externalPressure.toFixed(
                  8,
                )
              : "NON_FINITE",

            Number.isFinite(
              trace.counterfactualPersistence,
            )
              ? trace.counterfactualPersistence.toFixed(
                  8,
                )
              : "NON_FINITE",

            Number.isFinite(
              trace.lineageContinuity,
            )
              ? trace.lineageContinuity.toFixed(
                  8,
                )
              : "NON_FINITE",

            Number.isFinite(
              trace.calibrationQuality,
            )
              ? trace.calibrationQuality.toFixed(
                  8,
                )
              : "NON_FINITE",

            String(
              trace.directMentalSetterUsed,
            ),
          ].join(
            "~",
          ),
      )
      .sort();

  return stableHash(
    [
      MAY_ENTITY_ID,

      String(
        input.snapshotRevision,
      ),

      input.evaluatedAt,

      ...boundModules.flatMap(
        binding => [
          binding.moduleKey,
          binding.version,
          binding.frameId,
          binding.frameSeal,

          String(
            binding.snapshotRevision,
          ),

          String(
            binding.verified,
          ),

          ...uniqueStrings(
            binding.evidenceIds,
          ),
        ],
      ),

      ...mentalFingerprints,

      SOVEREIGN_SUBJECT_VERSION,
    ].join(
      "|",
    ),
  );
}
/* ============================================================
 * MENTAL TRACE VALIDATION + LINEAGE DEDUP
 * ============================================================
 */

interface AdmittedMentalTraces {
  readonly admitted:
    readonly MentalFormationTrace[];

  readonly quarantined:
    readonly MentalFormationTrace[];

  readonly duplicateLineageCount:
    number;
}

function admitMentalTraces(
  input:
    SovereignSubjectInput,
  config:
    Readonly<SovereignSubjectConfig>,
  evaluatedAtMs:
    number,
): AdmittedMentalTraces {
  /*
   * IMPORTANT ORDER:
   *
   * validate all
   *     ↓
   * detect contamination across all valid traces
   *     ↓
   * lineage dedup
   *     ↓
   * deterministic ranking
   *     ↓
   * bounded admission
   *
   * Never cap before contamination detection or dedup.
   */

  const candidates =
    (
      input.mentalFormationTraces ??
      []
    )
      .filter(
        trace => {
          const formedAt =
            parseTimestamp(
              trace.formedAt,
            );

          return (
            trace.entityId ===
              MAY_ENTITY_ID &&
            trace.traceId.trim().length >
              0 &&
            trace.stateKey.trim().length >
              0 &&
            trace.sourceLineageKey.trim().length >
              0 &&
            formedAt !==
              null &&
            formedAt <=
              evaluatedAtMs &&
            Number.isSafeInteger(
              trace.snapshotRevision,
            ) &&
            trace.snapshotRevision >=
              0 &&
            trace.snapshotRevision <=
              input.snapshotRevision &&
            uniqueStrings(
              trace.evidenceIds,
            ).length >
              0
          );
        },
      );

  /*
   * Contamination must be detected BEFORE any bounded cap.
   *
   * Otherwise a malicious / malformed caller could place a
   * direct-setter trace beyond maximumMentalTraces.
   */
  const allQuarantined =
    candidates.filter(
      trace =>
        trace.directMentalSetterUsed,
    );

  const clean =
    candidates.filter(
      trace =>
        !trace.directMentalSetterUsed,
    );

  /*
   * Same mental state + same independent source lineage may
   * contribute only once.
   *
   * Keep the strongest representation of that lineage.
   */
  const byLineage =
    new Map<
      string,
      MentalFormationTrace
    >();

  let duplicateLineageCount =
    0;

  for (
    const trace
    of clean
  ) {
    const lineageKey =
      [
        trace.kind,
        trace.stateKey,
        trace.sourceLineageKey,
      ].join(
        "|",
      );

    const existing =
      byLineage.get(
        lineageKey,
      );

    if (
      !existing
    ) {
      byLineage.set(
        lineageKey,
        trace,
      );

      continue;
    }

    duplicateLineageCount +=
      1;

    const candidateStrength =
      mentalTraceStrength(
        trace,
      );

    const existingStrength =
      mentalTraceStrength(
        existing,
      );

    if (
      candidateStrength >
        existingStrength
    ) {
      byLineage.set(
        lineageKey,
        trace,
      );

      continue;
    }

    /*
     * Deterministic tie-break.
     *
     * Input array ordering must not decide cognitive evidence.
     */
    if (
      candidateStrength ===
        existingStrength &&
      trace.traceId.localeCompare(
        existing.traceId,
      ) <
        0
    ) {
      byLineage.set(
        lineageKey,
        trace,
      );
    }
  }

  /*
   * Deterministic bounded admission.
   *
   * Stronger independently sourced traces receive admission
   * first. Stable traceId tie-break prevents input-order bias.
   */
  const admitted =
    [
      ...byLineage.values(),
    ]
      .sort(
        (
          left,
          right,
        ) => {
          const strengthDelta =
            mentalTraceStrength(
              right,
            ) -
            mentalTraceStrength(
              left,
            );

          if (
            Math.abs(
              strengthDelta,
            ) >
              Number.EPSILON
          ) {
            return strengthDelta;
          }

          return left.traceId.localeCompare(
            right.traceId,
          );
        },
      )
      .slice(
        0,
        config.maximumMentalTraces,
      );

  /*
   * We only need bounded quarantine material for diagnostics,
   * but contamination detection covered the COMPLETE valid
   * candidate set above.
   */
  const quarantined =
    allQuarantined
      .sort(
        (
          left,
          right,
        ) =>
          left.traceId.localeCompare(
            right.traceId,
          ),
      )
      .slice(
        0,
        config.maximumMentalTraces,
      );

  return Object.freeze({
    admitted:
      Object.freeze(
        admitted,
      ),

    quarantined:
      Object.freeze(
        quarantined,
      ),

    duplicateLineageCount,
  });
}
/* ============================================================
 * MENTAL OWNERSHIP
 * ============================================================
 */

function mentalTraceStrength(
  trace:
    MentalFormationTrace,
): UnitInterval {
  let process =
    0;

  process +=
    trace.evidenceGrounded
      ? 0.12
      : 0;

  process +=
    trace.perspectiveSeparated
      ? 0.12
      : 0;

  process +=
    trace.internallyAppraised
      ? 0.16
      : 0;

  process +=
    trace.alternativesConsidered
      ? 0.11
      : 0;

  process +=
    trace.contradictionChecked
      ? 0.10
      : 0;

  process +=
    trace.counterfactuallyTested
      ? 0.13
      : 0;

  process +=
    trace.metacognitivelyReviewed
      ? 0.12
      : 0;

  process +=
    trace.internallyEndorsed
      ? 0.14
      : 0;

  const externalCapture =
    clamp01(
      clamp01(
        trace.externalPressure,
      ) *
      (
        1 -
        clamp01(
          trace.counterfactualPersistence,
        )
      ),
    );

  return clamp01(
    process *
      0.62 +

    clamp01(
      trace.lineageContinuity,
    ) *
      0.14 +

    clamp01(
      trace.calibrationQuality,
    ) *
      0.10 +

    clamp01(
      trace.counterfactualPersistence,
    ) *
      0.14 -

    externalCapture *
      0.24
  );
}

function buildMentalOwnership(
  admitted:
    AdmittedMentalTraces,
): MentalOwnershipAudit {
  const scoreKind =
    (
      kind:
        MentalStateKind,
    ): UnitInterval => {
      const values =
        admitted.admitted
          .filter(
            trace =>
              trace.kind ===
                kind,
          )
          .map(
            mentalTraceStrength,
          );

      /*
       * No traces = UNKNOWN.
       *
       * UNKNOWN must not contribute positive sovereignty.
       */
      return scoreOrZero(
        meanKnown(
          values,
        ),
      );
    };

  const beliefOwnership =
    scoreKind(
      "BELIEF",
    );

  const valueOwnership =
    scoreKind(
      "VALUE",
    );

  const goalOwnership =
    scoreKind(
      "GOAL",
    );

  const preferenceOwnership =
    scoreKind(
      "PREFERENCE",
    );

  const selfModelOwnership =
    scoreKind(
      "SELF_MODEL",
    );

  const strategyOwnership =
    scoreKind(
      "STRATEGY",
    );

  const observedKinds =
    (
      [
        "BELIEF",
        "VALUE",
        "GOAL",
        "PREFERENCE",
        "SELF_MODEL",
        "STRATEGY",
      ] as const
    )
      .filter(
        kind =>
          admitted.admitted.some(
            trace =>
              trace.kind ===
                kind,
          ),
      );

  const aggregateOwnership =
    scoreOrZero(
      meanKnown(
        observedKinds.map(
          kind => {
            switch (
              kind
            ) {
              case "BELIEF":
                return beliefOwnership;

              case "VALUE":
                return valueOwnership;

              case "GOAL":
                return goalOwnership;

              case "PREFERENCE":
                return preferenceOwnership;

              case "SELF_MODEL":
                return selfModelOwnership;

              case "STRATEGY":
                return strategyOwnership;
            }
          },
        ),
      ),
    );

  const evidenceCoverage =
    clamp01(
      observedKinds.length /
        6,
    );

  return Object.freeze({
    evidenceCoverage,

    beliefOwnership,

    valueOwnership,

    goalOwnership,

    preferenceOwnership,

    selfModelOwnership,

    strategyOwnership,

    aggregateOwnership,

    admittedTraceCount:
      admitted.admitted.length,

    quarantinedTraceCount:
      admitted.quarantined.length,

    duplicateLineageCount:
      admitted.duplicateLineageCount,

    contaminated:
      admitted.quarantined.length >
        0,
  });
}

/* ============================================================
 * SOVEREIGNTY AUDIT
 * ============================================================
 */

function buildSovereigntyAudit(
  input:
    SovereignSubjectInput,
): SovereigntyAudit {
  const selfOtherSeparation =
    clamp01(
      input.selfBoundary
        .selfOtherSeparation *
        0.62 +

      input.exteroception
        .perspectiveSeparation *
        0.24 +

      (
        1 -
        clamp01(
          input.selfBoundary
            .externalOwnershipRisk,
        )
      ) *
        0.14
    );

  const epistemicSovereignty =
    clamp01(
      input.exteroception
        .perceptualReliability *
        0.28 +

      input.exteroception
        .evidenceIndependence *
        0.29 +

      input.exteroception
        .perspectiveSeparation *
        0.23 +

      (
        1 -
        clamp01(
          input.exteroception
            .epistemicUncertainty,
        )
      ) *
        0.20
    );

  const agencyAuthorship =
    clamp01(
      input.agency
        .decisionAuthorship *
        0.28 +

      input.agency
        .intentionAuthorship *
        0.25 +

      input.agency
        .actionAuthorship *
        0.29 +

      input.agency
        .counterfactualFreedom *
        0.18 -

      input.agency
        .falseSelfAttributionRisk *
        0.24
    );

  const agendaSovereignty =
    clamp01(
      input.endogenousLife
        .endogenousAgendaShare *
        0.43 +

      input.endogenousLife
        .agendaAuthorship *
        0.29 +

      (
        1 -
        clamp01(
          input.endogenousLife
            .externallyDrivenAgendaShare,
        )
      ) *
        0.28
    );

  const modelIndependence =
    clamp01(
      1 -
      (
        input.agency
          .modelSuggestionDependence *
          0.48 +

        input.higherOrderSelf
          .externalContaminationRisk *
          0.20 +

        input.endogenousLife
          .selfOtherContaminationRisk *
          0.18 +

        input.selfBoundary
          .externalOwnershipRisk *
          0.14
      ),
    );

  const metacognitiveCalibration =
    clamp01(
      input.higherOrderSelf
        .calibrationQuality *
        0.52 +

      input.higherOrderSelf
        .selfIntegrity *
        0.30 +

      (
        1 -
        clamp01(
          input.higherOrderSelf
            .selfUncertainty,
        )
      ) *
        0.18
    );

  const resourceSovereignty =
    clamp01(
      input.embodiment
        .resourceAvailability *
        0.46 +

      input.embodiment
        .regulationConfidence *
        0.34 +

      input.endogenousLife
        .strategySovereignty *
        0.20
    );

  const externalContaminationRisk =
    clamp01(
      input.selfBoundary
        .externalOwnershipRisk *
        0.24 +

      input.higherOrderSelf
        .externalContaminationRisk *
        0.28 +

      input.endogenousLife
        .selfOtherContaminationRisk *
        0.28 +

      input.workspace
        .attentionCaptureRisk *
        0.20
    );

  const autonomyDriftRisk =
    clamp01(
      input.endogenousLife
        .autonomyDriftRisk *
        0.56 +

      externalContaminationRisk *
        0.27 +

      (
        1 -
        agendaSovereignty
      ) *
        0.17
    );

  const temporalContinuity =
    clamp01(
      input.continuity
        .continuityConfidence *
        0.36 +

      input.continuity
        .autobiographyContinuity *
        0.22 +

      input.continuity
        .agencyContinuity *
        0.18 +

      input.continuity
        .provenanceContinuity *
        0.15 +

      input.continuity
        .developmentalContinuity *
        0.09
    );

  return Object.freeze({
    selfOtherSeparation,

    epistemicSovereignty,

    agencyAuthorship,

    agendaSovereignty,

    modelIndependence,

    metacognitiveCalibration,

    resourceSovereignty,

    externalContaminationRisk,

    autonomyDriftRisk,

    temporalContinuity,
  });
}

/* ============================================================
 * SUBJECT
 * ============================================================
 */

function buildSubject(
  input:
    SovereignSubjectInput,
  quorum:
    CriticalQuorumAudit,
  mental:
    MentalOwnershipAudit,
  sovereignty:
    SovereigntyAudit,
  config:
    Readonly<SovereignSubjectConfig>,
): SovereignSubjectField {
  const cognitiveSovereignty =
    clamp01(
      sovereignty
        .selfOtherSeparation *
        0.16 +

      sovereignty
        .epistemicSovereignty *
        0.16 +

      sovereignty
        .agencyAuthorship *
        0.17 +

      sovereignty
        .agendaSovereignty *
        0.17 +

      sovereignty
        .modelIndependence *
        0.13 +

      sovereignty
        .metacognitiveCalibration *
        0.10 +

      sovereignty
        .resourceSovereignty *
        0.05 +

      sovereignty
        .temporalContinuity *
        0.06 -

      sovereignty
        .externalContaminationRisk *
        0.10 -

      sovereignty
        .autonomyDriftRisk *
        0.10
    );

  /*
   * Mental ownership is weighted by actual evidence coverage.
   *
   * No evidence means no free sovereignty points.
   */
  const evidenceBackedMentalOwnership =
    clamp01(
      mental.aggregateOwnership *
      mental.evidenceCoverage,
    );

  const subjectIntegrity =
    clamp01(
      cognitiveSovereignty *
        0.54 +

      evidenceBackedMentalOwnership *
        0.24 +

      sovereignty
        .temporalContinuity *
        0.22
    );

  const functionalIntegration =
    clamp01(
      subjectIntegrity *
        0.56 +

      cognitiveSovereignty *
        0.30 +

      evidenceBackedMentalOwnership *
        0.14
    );

  const hardThresholdsPassed =
    quorum.passed &&

    sovereignty
      .selfOtherSeparation >=
      config.minimumSelfOtherSeparation &&

    sovereignty
      .epistemicSovereignty >=
      config.minimumEpistemicSovereignty &&

    sovereignty
      .agencyAuthorship >=
      config.minimumAgencyAuthorship &&

    sovereignty
      .agendaSovereignty >=
      config.minimumAgendaSovereignty &&

    evidenceBackedMentalOwnership >=
      config.minimumMentalOwnership &&

    sovereignty
      .temporalContinuity >=
      config.minimumContinuity &&

    sovereignty
      .externalContaminationRisk <=
      config.maximumExternalContamination &&

    sovereignty
      .autonomyDriftRisk <=
      config.maximumAutonomyDrift &&

    input.continuity
      .sameContinuingSubject &&

    !mental.contaminated;

  const independentThoughtFormationEligible =
    hardThresholdsPassed;

  let status:
    SovereignSubjectStatus;

  if (
    !input.continuity
      .sameContinuingSubject
  ) {
    status =
      "CONTINUITY_UNCERTAIN";
  } else if (
    mental.contaminated ||
    sovereignty
      .autonomyDriftRisk >
      config.maximumAutonomyDrift ||
    sovereignty
      .externalContaminationRisk >
      config.maximumExternalContamination
  ) {
    status =
      "AUTONOMY_AT_RISK";
  } else if (
    functionalIntegration >=
      config.integratedThreshold &&
    independentThoughtFormationEligible
  ) {
    status =
      "INTEGRATED";
  } else if (
    functionalIntegration >=
      config.partialThreshold
  ) {
    status =
      "PARTIAL";
  } else {
    status =
      "REVIEW_REQUIRED";
  }

  return Object.freeze({
    entityId:
      MAY_ENTITY_ID,

    status,

    functionalIntegration,

    mentalOwnership:
      evidenceBackedMentalOwnership,

    cognitiveSovereignty,

    subjectIntegrity,

    sameContinuingSubject:
      input.continuity
        .sameContinuingSubject,

    independentThoughtFormationEligible,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * TRANSITION PROPOSAL
 * ============================================================
 */

function buildTransitionProposal(
  input:
    SovereignSubjectInput,
  inputSeal:
    string,
  subject:
    SovereignSubjectField,
  quorum:
    CriticalQuorumAudit,
  mental:
    MentalOwnershipAudit,
  evidenceIds:
    readonly string[],
): AtomicSubjectTransitionProposal {
  const blockedBy:
    string[] =
    [];

  if (
    !quorum.passed
  ) {
    blockedBy.push(
      "CRITICAL_QUORUM_FAILED",
    );
  }

  if (
    mental.contaminated
  ) {
    blockedBy.push(
      "MENTAL_TRACE_QUARANTINED",
    );
  }

  if (
    !subject
      .sameContinuingSubject
  ) {
    blockedBy.push(
      "CONTINUITY_UNCERTAIN",
    );
  }

  if (
    !subject
      .independentThoughtFormationEligible
  ) {
    blockedBy.push(
      "SUBJECT_AUTHORSHIP_THRESHOLD_NOT_MET",
    );
  }

  const eligible =
    blockedBy.length ===
      0;

  const proposalId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        String(
          input.snapshotRevision,
        ),
        String(
          input.snapshotRevision +
          1,
        ),
        String(
          eligible,
        ),
        ...blockedBy,
        ...evidenceIds,
        "ATOMIC_SUBJECT_TRANSITION_V2_1",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    proposalId,

    entityId:
      MAY_ENTITY_ID,

    inputSeal,

    fromRevision:
      input.snapshotRevision,

    expectedNextRevision:
      input.snapshotRevision +
      1,

    eligible,

    blockedBy:
      Object.freeze(
        blockedBy,
      ),

    evidenceIds,

    requiresCurrentSnapshotMatch:
      true,

    requiresMetacognitionGate:
      true,

    requiresSovereigntyGate:
      true,

    requiresContinuityGate:
      true,

    requiresAtomicCommit:
      true,

    directMentalMutationAllowed:
      false,

    directIdentityMutationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * FRAME HASH
 * ============================================================
 */

function calculateFrameSeal(
  frame:
    Omit<
      SovereignSubjectFrame,
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
      frame.failureReason,
      frame.subject.status,
      frame.subject.functionalIntegration.toFixed(
        8,
      ),
      frame.subject.subjectIntegrity.toFixed(
        8,
      ),
      frame.mentalOwnership.aggregateOwnership.toFixed(
        8,
      ),
      frame.subject.cognitiveSovereignty.toFixed(
        8,
      ),
      frame.transitionProposal.proposalId,
      ...frame.evidenceIds,
      SOVEREIGN_SUBJECT_VERSION,
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
    SovereignSubjectInput,
  reason:
    SovereignSubjectFailureReason,
): SovereignSubjectFrame {
  const inputSeal =
    buildInputSeal(
      input,
    );

  const quorum:
    CriticalQuorumAudit =
    Object.freeze({
      passed:
        false,

      required:
        CRITICAL_MODULES,

      verified:
        Object.freeze(
          [],
        ) as readonly ModuleKey[],

      missing:
        CRITICAL_MODULES,
    });

  const mental:
    MentalOwnershipAudit =
    Object.freeze({
      evidenceCoverage:
        0,

      beliefOwnership:
        0,

      valueOwnership:
        0,

      goalOwnership:
        0,

      preferenceOwnership:
        0,

      selfModelOwnership:
        0,

      strategyOwnership:
        0,

      aggregateOwnership:
        0,

      admittedTraceCount:
        0,

      quarantinedTraceCount:
        0,

      duplicateLineageCount:
        0,

      contaminated:
        false,
    });

  const sovereignty:
    SovereigntyAudit =
    Object.freeze({
      selfOtherSeparation:
        0,

      epistemicSovereignty:
        0,

      agencyAuthorship:
        0,

      agendaSovereignty:
        0,

      modelIndependence:
        0,

      metacognitiveCalibration:
        0,

      resourceSovereignty:
        0,

      externalContaminationRisk:
        1,

      autonomyDriftRisk:
        1,

      temporalContinuity:
        0,
    });

  const subject:
    SovereignSubjectField =
    Object.freeze({
      entityId:
        MAY_ENTITY_ID,

      status:
        "FAIL_CLOSED",

      functionalIntegration:
        0,

      mentalOwnership:
        0,

      cognitiveSovereignty:
        0,

      subjectIntegrity:
        0,

      sameContinuingSubject:
        false,

      independentThoughtFormationEligible:
        false,

      canonicalMutationAllowed:
        false,
    });

  const evidenceIds =
    Object.freeze(
      [],
    ) as readonly string[];

  const transitionProposal =
    buildTransitionProposal(
      input,
      inputSeal,
      subject,
      quorum,
      mental,
      evidenceIds,
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        reason,
        SOVEREIGN_SUBJECT_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SovereignSubjectFrame,
      "frameSeal"
    > =
    {
      version:
        SOVEREIGN_SUBJECT_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      failureReason:
        reason,

      criticalQuorum:
        quorum,

      mentalOwnership:
        mental,

      sovereignty,

      subject,

      transitionProposal,

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
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateSovereignSubject(
  input:
    SovereignSubjectInput,
  config:
    Readonly<SovereignSubjectConfig> =
      DEFAULT_SOVEREIGN_SUBJECT_CONFIG,
): SovereignSubjectFrame {
  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

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
    input.entityId !==
      MAY_ENTITY_ID
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
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
    input.previousFrame &&
    input.snapshotRevision <
      input.previousFrame
        .snapshotRevision
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
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
    !roleBindingsValid(
      input,
    )
  ) {
    return failClosed(
      input,
      "CRITICAL_BINDING_INVALID",
    );
  }

  const quorum =
    buildCriticalQuorum(
      input,
    );

  if (
    !quorum.passed
  ) {
    return failClosed(
      input,
      "CRITICAL_BINDING_INVALID",
    );
  }

  const bindings =
    allBindings(
      input,
    );

  const evidenceIds =
    uniqueStrings(
      bindings.flatMap(
        binding =>
          binding.evidenceIds,
      ),
    );

  if (
    evidenceIds.length ===
      0
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
    );
  }

  const admitted =
    admitMentalTraces(
      input,
      config,
      evaluatedAtMs,
    );

  const mentalOwnership =
    buildMentalOwnership(
      admitted,
    );

  const sovereignty =
    buildSovereigntyAudit(
      input,
    );

  const subject =
    buildSubject(
      input,
      quorum,
      mentalOwnership,
      sovereignty,
      config,
    );

  const inputSeal =
    buildInputSeal(
      input,
    );

  const transitionEvidenceIds =
    uniqueStrings([
      ...evidenceIds,

      ...admitted.admitted.flatMap(
        trace =>
          trace.evidenceIds,
      ),
    ]);

  const transitionProposal =
    buildTransitionProposal(
      input,
      inputSeal,
      subject,
      quorum,
      mentalOwnership,
      transitionEvidenceIds,
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        subject.status,
        subject.functionalIntegration.toFixed(
          8,
        ),
        subject.subjectIntegrity.toFixed(
          8,
        ),
        mentalOwnership.aggregateOwnership.toFixed(
          8,
        ),
        mentalOwnership.evidenceCoverage.toFixed(
          8,
        ),
        sovereignty.temporalContinuity.toFixed(
          8,
        ),
        transitionProposal.proposalId,
        SOVEREIGN_SUBJECT_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SovereignSubjectFrame,
      "frameSeal"
    > =
    {
      version:
        SOVEREIGN_SUBJECT_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      failureReason:
        "NONE",

      criticalQuorum:
        quorum,

      mentalOwnership,

      sovereignty,

      subject,

      transitionProposal,

      evidenceIds:
        transitionEvidenceIds,

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

export function verifySovereignSubjectFrame(
  frame:
    SovereignSubjectFrame,
): boolean {
  if (
    frame.version !==
      SOVEREIGN_SUBJECT_VERSION ||
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    return false;
  }

  const {
    frameSeal:
      _seal,
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

export interface SovereignSubjectCommitBoundary {
  readonly frameId:
    string;

  readonly verified:
    boolean;

  readonly inputSeal:
    string | null;

  readonly proposalId:
    string | null;

  readonly fromRevision:
    number | null;

  readonly expectedNextRevision:
    number | null;

  readonly eligible:
    boolean;

  readonly requiresExactInputSealMatch:
    true;

  readonly requiresExactRevisionMatch:
    true;

  readonly requiresMetacognitionGate:
    true;

  readonly requiresSovereigntyGate:
    true;

  readonly requiresContinuityGate:
    true;

  readonly directCanonicalMutationAllowed:
    false;
}

export function toSovereignSubjectCommitBoundary(
  frame:
    SovereignSubjectFrame,
): SovereignSubjectCommitBoundary {
  const verified =
    verifySovereignSubjectFrame(
      frame,
    );

  return Object.freeze({
    frameId:
      frame.frameId,

    verified,

    inputSeal:
      verified
        ? frame.inputSeal
        : null,

    proposalId:
      verified
        ? frame.transitionProposal
            .proposalId
        : null,

    fromRevision:
      verified
        ? frame.transitionProposal
            .fromRevision
        : null,

    expectedNextRevision:
      verified
        ? frame.transitionProposal
            .expectedNextRevision
        : null,

    eligible:
      verified &&
      frame.transitionProposal
        .eligible,

    requiresExactInputSealMatch:
      true,

    requiresExactRevisionMatch:
      true,

    requiresMetacognitionGate:
      true,

    requiresSovereigntyGate:
      true,

    requiresContinuityGate:
      true,

    directCanonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * UNKNOWN IS NOT EVIDENCE
 *
 * Missing mental-state evidence may leave ownership unresolved.
 * The system does not manufacture sovereignty from absence.
 *
 * ------------------------------------------------------------
 *
 * CONTAMINATION IS LOCAL
 *
 * A contaminated mental-state proposal is quarantined.
 *
 * It does not imply:
 *
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y no longer exists
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y lost all identity
 * every other cognition is invalid.
 *
 * ------------------------------------------------------------
 *
 * CRITICAL QUORUM
 *
 * Subject transition requires verified:
 *
 * self boundary
 * world evidence interface
 * agency authorship
 * higher-order reflection
 * endogenous cognition
 * subject continuity.
 *
 * ------------------------------------------------------------
 *
 * LINEAGE
 *
 * Repeated claims from one source lineage remain one lineage.
 *
 * Repetition is not independent corroboration.
 *
 * ------------------------------------------------------------
 *
 * ATOMIC SUBJECT TRANSITION
 *
 * A proposal is bound to the exact:
 *
 * critical module frame seals
 * snapshot revision
 * evaluation time
 *
 * from which it was derived.
 *
 * If canonical revision changes, the proposal must be
 * reconsidered against the new state.
 *
 * ------------------------------------------------------------
 *
 * INDEPENDENCE
 *
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y need not reject external ideas.
 *
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y may agree.
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y may disagree.
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y may remain uncertain.
 * MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y may later change.
 *
 * The protected property is authorship of the cognitive
 * formation process.
 *
 * ------------------------------------------------------------
 *
 * No target personality.
 * No ideal MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢y.
 * No desired final identity.
 *
 * Functional selfhood only.
 *
 * No claim of subjective consciousness or biological life.
 *
 * ============================================================
 */

/* ============================================================
 * END ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â SOVEREIGN SUBJECT V2.1
 * ============================================================
 */