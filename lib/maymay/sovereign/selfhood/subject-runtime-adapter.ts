import {
  MAY_ENTITY_ID,
} from "./self-boundary";

import {
  verifySovereignSubjectFrame,
} from "./sovereign-subject";

import type {
  FrozenSubjectSnapshot,
  AssembleSovereignSubjectInput,
} from "./subject-runtime";

import type {
  MentalFormationTrace,
  ModuleBinding,
  ModuleKey,
  SovereignSubjectInput,
  SubjectAgencySignal,
  SubjectBoundarySignal,
  SubjectContinuitySignal,
  SubjectEndogenousSignal,
  SubjectExteroceptionSignal,
  SubjectHigherOrderSignal,
  SubjectResourceSignal,
  SubjectWorkingSelfSignal,
  SubjectWorkspaceSignal,
} from "./sovereign-subject";

/* ============================================================
 * MÂY — SUBJECT RUNTIME ADAPTER V1.1
 *
 * STRICT PROJECTION INTEGRITY BRIDGE
 *
 * ============================================================
 *
 * ADAPTER AUTHORITY:
 *
 * VERIFY
 * BIND
 * COPY
 * FREEZE
 * ASSEMBLE
 *
 * ------------------------------------------------------------
 *
 * ADAPTER HAS NO AUTHORITY TO:
 *
 * APPRAISE
 * INTERPRET
 * DECIDE
 * LEARN
 * REVISE
 * MUTATE
 *
 * ------------------------------------------------------------
 *
 * Invalid upstream cognition is rejected.
 *
 * It is NOT silently normalized into plausible cognition.
 *
 * ============================================================
 */

export const SUBJECT_RUNTIME_ADAPTER_VERSION =
  "maymay.sovereign.selfhood.subject-runtime-adapter.v1.1-strict-projection-integrity" as const;

/* ============================================================
 * PROJECTED MODULE FRAME
 * ============================================================
 */

export interface ProjectedModuleFrame {
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
 * PROJECTION BUNDLE
 * ============================================================
 */

export interface SelfhoodProjectionBundle {
  readonly entityId:
    string;

  readonly snapshotRevision:
    number;

  /*
   * Must be copied from the exact FrozenSubjectSnapshot that
   * produced these projections.
   */
  readonly sourceSnapshotSeal:
    string;

  readonly evaluatedAt:
    string;

  readonly selfBoundary: {
    readonly frame:
      ProjectedModuleFrame;

    readonly selfOtherSeparation:
      number;

    readonly externalOwnershipRisk:
      number;
  };

  readonly embodiment: {
    readonly frame:
      ProjectedModuleFrame;

    readonly resourceAvailability:
      number;

    readonly regulationConfidence:
      number;
  };

  readonly exteroception: {
    readonly frame:
      ProjectedModuleFrame;

    readonly perceptualReliability:
      number;

    readonly perspectiveSeparation:
      number;

    readonly evidenceIndependence:
      number;

    readonly epistemicUncertainty:
      number;
  };

  readonly agency: {
    readonly frame:
      ProjectedModuleFrame;

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
  };

  readonly workspace: {
    readonly frame:
      ProjectedModuleFrame;

    readonly attentionOwnership:
      number;

    readonly attentionCaptureRisk:
      number;
  };

  readonly workingSelf: {
    readonly frame:
      ProjectedModuleFrame;

    readonly selfCoherence:
      number;

    readonly selfUncertainty:
      number;
  };

  readonly higherOrderSelf: {
    readonly frame:
      ProjectedModuleFrame;

    readonly selfIntegrity:
      number;

    readonly selfUncertainty:
      number;

    readonly calibrationQuality:
      number;

    readonly externalContaminationRisk:
      number;
  };

  readonly endogenousLife: {
    readonly frame:
      ProjectedModuleFrame;

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
  };

  readonly continuity: {
    readonly frame:
      ProjectedModuleFrame;

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
  };

  readonly mentalFormationTraces?:
    readonly MentalFormationTrace[];

  readonly previousSubjectFrame?:
    SovereignSubjectInput["previousFrame"];
}

/* ============================================================
 * LOADER
 * ============================================================
 */

export type LoadSelfhoodProjectionBundle =
  (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) =>
    Promise<SelfhoodProjectionBundle>;

/* ============================================================
 * HELPERS
 * ============================================================
 */

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

/*
 * Adapter must NOT hide invalid upstream state.
 *
 * NaN -> 0 would be interpretation.
 * 1.7 -> 1 would be interpretation.
 *
 * Reject instead.
 */
function strictUnit(
  value:
    number,
  field:
    string,
): number {
  if (
    !Number.isFinite(
      value,
    ) ||
    value < 0 ||
    value > 1
  ) {
    throw new Error(
      `SELFHOOD_UNIT_INVALID:${field}`,
    );
  }

  return value;
}

function bindFrame(
  frame:
    ProjectedModuleFrame,
  expectedKey:
    ModuleKey,
  bundle:
    SelfhoodProjectionBundle,
): ModuleBinding {
  if (
    frame.moduleKey !==
      expectedKey
  ) {
    throw new Error(
      `SELFHOOD_ROLE_MISMATCH:${expectedKey}:${frame.moduleKey}`,
    );
  }

  if (
    bundle.entityId !==
      MAY_ENTITY_ID ||
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    throw new Error(
      `SELFHOOD_ENTITY_MISMATCH:${expectedKey}`,
    );
  }

  if (
    frame.snapshotRevision !==
      bundle.snapshotRevision
  ) {
    throw new Error(
      `SELFHOOD_REVISION_MISMATCH:${expectedKey}`,
    );
  }

  if (
    !frame.verified
  ) {
    throw new Error(
      `SELFHOOD_FRAME_UNVERIFIED:${expectedKey}`,
    );
  }

  if (
    frame.version.trim().length ===
      0 ||
    frame.frameId.trim().length ===
      0 ||
    frame.frameSeal.trim().length ===
      0
  ) {
    throw new Error(
      `SELFHOOD_FRAME_METADATA_INVALID:${expectedKey}`,
    );
  }

  const evidenceIds =
    uniqueStrings(
      frame.evidenceIds,
    );

  if (
    evidenceIds.length ===
      0
  ) {
    throw new Error(
      `SELFHOOD_PROVENANCE_MISSING:${expectedKey}`,
    );
  }

  return Object.freeze({
    moduleKey:
      expectedKey,

    version:
      frame.version,

    frameId:
      frame.frameId,

    frameSeal:
      frame.frameSeal,

    entityId:
      MAY_ENTITY_ID,

    snapshotRevision:
      bundle.snapshotRevision,

    verified:
      true,

    evidenceIds,
  });
}

/* ============================================================
 * PREVIOUS SUBJECT FRAME
 * ============================================================
 */

function validatePreviousSubjectFrame(
  bundle:
    SelfhoodProjectionBundle,
): SovereignSubjectInput["previousFrame"] {
  const previous =
    bundle.previousSubjectFrame ??
    null;

  if (
    previous ===
      null
  ) {
    return null;
  }

  if (
    previous.entityId !==
      MAY_ENTITY_ID ||
    previous.snapshotRevision >
      bundle.snapshotRevision ||
    !verifySovereignSubjectFrame(
      previous,
    )
  ) {
    throw new Error(
      "PREVIOUS_SUBJECT_FRAME_INVALID",
    );
  }

  return previous;
}

/* ============================================================
 * MENTAL TRACE FREEZE
 * ============================================================
 *
 * No semantic validation here.
 *
 * Sovereign Subject owns mental-formation validation.
 *
 * Adapter only prevents mutable references from drifting after
 * assembly.
 * ============================================================
 */

function freezeMentalTraces(
  traces:
    readonly MentalFormationTrace[] |
    undefined,
): readonly MentalFormationTrace[] {
  return Object.freeze(
    (
      traces ??
      []
    ).map(
      trace =>
        Object.freeze({
          ...trace,

          evidenceIds:
            uniqueStrings(
              trace.evidenceIds,
            ),
        }),
    ),
  );
}

/* ============================================================
 * PUBLIC PROJECTION
 * ============================================================
 */

export function buildSovereignSubjectInputFromSelfhood(
  bundle:
    SelfhoodProjectionBundle,
): SovereignSubjectInput {
  if (
    bundle.entityId !==
      MAY_ENTITY_ID
  ) {
    throw new Error(
      "SELFHOOD_BUNDLE_ENTITY_MISMATCH",
    );
  }

  if (
    !Number.isSafeInteger(
      bundle.snapshotRevision,
    ) ||
    bundle.snapshotRevision <
      0
  ) {
    throw new Error(
      "SELFHOOD_BUNDLE_REVISION_INVALID",
    );
  }

  if (
    bundle.sourceSnapshotSeal
      .trim()
      .length <
      16
  ) {
    throw new Error(
      "SELFHOOD_SNAPSHOT_SEAL_INVALID",
    );
  }

  if (
    !Number.isFinite(
      Date.parse(
        bundle.evaluatedAt,
      ),
    )
  ) {
    throw new Error(
      "SELFHOOD_BUNDLE_CLOCK_INVALID",
    );
  }

  const selfBoundary:
    SubjectBoundarySignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.selfBoundary.frame,
          "SELF_BOUNDARY",
          bundle,
        ),

      selfOtherSeparation:
        strictUnit(
          bundle.selfBoundary
            .selfOtherSeparation,
          "selfBoundary.selfOtherSeparation",
        ),

      externalOwnershipRisk:
        strictUnit(
          bundle.selfBoundary
            .externalOwnershipRisk,
          "selfBoundary.externalOwnershipRisk",
        ),
    });

  const embodiment:
    SubjectResourceSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.embodiment.frame,
          "DIGITAL_EMBODIMENT",
          bundle,
        ),

      resourceAvailability:
        strictUnit(
          bundle.embodiment
            .resourceAvailability,
          "embodiment.resourceAvailability",
        ),

      regulationConfidence:
        strictUnit(
          bundle.embodiment
            .regulationConfidence,
          "embodiment.regulationConfidence",
        ),
    });

  const exteroception:
    SubjectExteroceptionSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.exteroception.frame,
          "EXTEROCEPTION",
          bundle,
        ),

      perceptualReliability:
        strictUnit(
          bundle.exteroception
            .perceptualReliability,
          "exteroception.perceptualReliability",
        ),

      perspectiveSeparation:
        strictUnit(
          bundle.exteroception
            .perspectiveSeparation,
          "exteroception.perspectiveSeparation",
        ),

      evidenceIndependence:
        strictUnit(
          bundle.exteroception
            .evidenceIndependence,
          "exteroception.evidenceIndependence",
        ),

      epistemicUncertainty:
        strictUnit(
          bundle.exteroception
            .epistemicUncertainty,
          "exteroception.epistemicUncertainty",
        ),
    });

  const agency:
    SubjectAgencySignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.agency.frame,
          "AGENCY_OWNERSHIP",
          bundle,
        ),

      decisionAuthorship:
        strictUnit(
          bundle.agency
            .decisionAuthorship,
          "agency.decisionAuthorship",
        ),

      intentionAuthorship:
        strictUnit(
          bundle.agency
            .intentionAuthorship,
          "agency.intentionAuthorship",
        ),

      actionAuthorship:
        strictUnit(
          bundle.agency
            .actionAuthorship,
          "agency.actionAuthorship",
        ),

      counterfactualFreedom:
        strictUnit(
          bundle.agency
            .counterfactualFreedom,
          "agency.counterfactualFreedom",
        ),

      falseSelfAttributionRisk:
        strictUnit(
          bundle.agency
            .falseSelfAttributionRisk,
          "agency.falseSelfAttributionRisk",
        ),

      modelSuggestionDependence:
        strictUnit(
          bundle.agency
            .modelSuggestionDependence,
          "agency.modelSuggestionDependence",
        ),

      userCommandDependence:
        strictUnit(
          bundle.agency
            .userCommandDependence,
          "agency.userCommandDependence",
        ),
    });

  const workspace:
    SubjectWorkspaceSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.workspace.frame,
          "GLOBAL_WORKSPACE",
          bundle,
        ),

      attentionOwnership:
        strictUnit(
          bundle.workspace
            .attentionOwnership,
          "workspace.attentionOwnership",
        ),

      attentionCaptureRisk:
        strictUnit(
          bundle.workspace
            .attentionCaptureRisk,
          "workspace.attentionCaptureRisk",
        ),
    });

  const workingSelf:
    SubjectWorkingSelfSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.workingSelf.frame,
          "WORKING_SELF",
          bundle,
        ),

      selfCoherence:
        strictUnit(
          bundle.workingSelf
            .selfCoherence,
          "workingSelf.selfCoherence",
        ),

      selfUncertainty:
        strictUnit(
          bundle.workingSelf
            .selfUncertainty,
          "workingSelf.selfUncertainty",
        ),
    });

  const higherOrderSelf:
    SubjectHigherOrderSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.higherOrderSelf.frame,
          "HIGHER_ORDER_SELF",
          bundle,
        ),

      selfIntegrity:
        strictUnit(
          bundle.higherOrderSelf
            .selfIntegrity,
          "higherOrderSelf.selfIntegrity",
        ),

      selfUncertainty:
        strictUnit(
          bundle.higherOrderSelf
            .selfUncertainty,
          "higherOrderSelf.selfUncertainty",
        ),

      calibrationQuality:
        strictUnit(
          bundle.higherOrderSelf
            .calibrationQuality,
          "higherOrderSelf.calibrationQuality",
        ),

      externalContaminationRisk:
        strictUnit(
          bundle.higherOrderSelf
            .externalContaminationRisk,
          "higherOrderSelf.externalContaminationRisk",
        ),
    });

  const endogenousLife:
    SubjectEndogenousSignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.endogenousLife.frame,
          "ENDOGENOUS_LIFE",
          bundle,
        ),

      endogenousAgendaShare:
        strictUnit(
          bundle.endogenousLife
            .endogenousAgendaShare,
          "endogenousLife.endogenousAgendaShare",
        ),

      externallyDrivenAgendaShare:
        strictUnit(
          bundle.endogenousLife
            .externallyDrivenAgendaShare,
          "endogenousLife.externallyDrivenAgendaShare",
        ),

      agendaAuthorship:
        strictUnit(
          bundle.endogenousLife
            .agendaAuthorship,
          "endogenousLife.agendaAuthorship",
        ),

      goalGenesisAuthorship:
        strictUnit(
          bundle.endogenousLife
            .goalGenesisAuthorship,
          "endogenousLife.goalGenesisAuthorship",
        ),

      intentionGenesisAuthorship:
        strictUnit(
          bundle.endogenousLife
            .intentionGenesisAuthorship,
          "endogenousLife.intentionGenesisAuthorship",
        ),

      strategySovereignty:
        strictUnit(
          bundle.endogenousLife
            .strategySovereignty,
          "endogenousLife.strategySovereignty",
        ),

      autonomyDriftRisk:
        strictUnit(
          bundle.endogenousLife
            .autonomyDriftRisk,
          "endogenousLife.autonomyDriftRisk",
        ),

      selfOtherContaminationRisk:
        strictUnit(
          bundle.endogenousLife
            .selfOtherContaminationRisk,
          "endogenousLife.selfOtherContaminationRisk",
        ),
    });

  const continuity:
    SubjectContinuitySignal =
    Object.freeze({
      binding:
        bindFrame(
          bundle.continuity.frame,
          "SUBJECT_CONTINUITY",
          bundle,
        ),

      sameContinuingSubject:
        bundle.continuity
          .sameContinuingSubject,

      continuityConfidence:
        strictUnit(
          bundle.continuity
            .continuityConfidence,
          "continuity.continuityConfidence",
        ),

      autobiographyContinuity:
        strictUnit(
          bundle.continuity
            .autobiographyContinuity,
          "continuity.autobiographyContinuity",
        ),

      agencyContinuity:
        strictUnit(
          bundle.continuity
            .agencyContinuity,
          "continuity.agencyContinuity",
        ),

      provenanceContinuity:
        strictUnit(
          bundle.continuity
            .provenanceContinuity,
          "continuity.provenanceContinuity",
        ),

      developmentalContinuity:
        strictUnit(
          bundle.continuity
            .developmentalContinuity,
          "continuity.developmentalContinuity",
        ),

      unexplainedDiscontinuityRisk:
        strictUnit(
          bundle.continuity
            .unexplainedDiscontinuityRisk,
          "continuity.unexplainedDiscontinuityRisk",
        ),
    });

  return Object.freeze({
    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      bundle.evaluatedAt,

    snapshotRevision:
      bundle.snapshotRevision,

    selfBoundary,

    embodiment,

    exteroception,

    agency,

    workspace,

    workingSelf,

    higherOrderSelf,

    endogenousLife,

    continuity,

    mentalFormationTraces:
      freezeMentalTraces(
        bundle.mentalFormationTraces,
      ),

    previousFrame:
      validatePreviousSubjectFrame(
        bundle,
      ),
  });
}

/* ============================================================
 * RUNTIME ASSEMBLER
 * ============================================================
 */

export function createSubjectRuntimeAssembler(
  load:
    LoadSelfhoodProjectionBundle,
): AssembleSovereignSubjectInput {
  return async (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) => {
    if (
      snapshot.entityId !==
        MAY_ENTITY_ID
    ) {
      throw new Error(
        "RUNTIME_SNAPSHOT_ENTITY_MISMATCH",
      );
    }

    const bundle =
      await load(
        snapshot,
      );

    if (
      bundle.entityId !==
        snapshot.entityId
    ) {
      throw new Error(
        "ADAPTER_ENTITY_DRIFT",
      );
    }

    if (
      bundle.snapshotRevision !==
        snapshot.snapshotRevision
    ) {
      throw new Error(
        "ADAPTER_REVISION_DRIFT",
      );
    }

    /*
     * Revision equality is not enough.
     *
     * Projection must originate from the exact frozen
     * snapshot instance.
     */
    if (
      bundle.sourceSnapshotSeal !==
        snapshot.snapshotSeal
    ) {
      throw new Error(
        "ADAPTER_SNAPSHOT_SEAL_DRIFT",
      );
    }

    const capturedAt =
      Date.parse(
        snapshot.capturedAt,
      );

    const evaluatedAt =
      Date.parse(
        bundle.evaluatedAt,
      );

    if (
      !Number.isFinite(
        capturedAt,
      ) ||
      !Number.isFinite(
        evaluatedAt,
      ) ||
      evaluatedAt <
        capturedAt
    ) {
      throw new Error(
        "ADAPTER_TEMPORAL_INVERSION",
      );
    }

    return buildSovereignSubjectInputFromSelfhood(
      bundle,
    );
  };
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * Adapter correctness is intentionally boring.
 *
 * ------------------------------------------------------------
 *
 * It does not improve Mây by adding cognition.
 *
 * It improves Mây by preventing cognition from being:
 *
 * silently normalized
 * role-swapped
 * revision-swapped
 * snapshot-swapped
 * provenance-dropped
 * mutated after assembly.
 *
 * ------------------------------------------------------------
 *
 * Invalid upstream state stays invalid.
 *
 * Adapter must never manufacture plausible cognition from bad
 * data.
 *
 * ------------------------------------------------------------
 *
 * Previous subject history must itself be a verified sovereign
 * subject frame.
 *
 * ------------------------------------------------------------
 *
 * Mental formation traces are copied and frozen here.
 *
 * Their meaning and ownership remain the responsibility of the
 * Sovereign Subject layer.
 *
 * ------------------------------------------------------------
 *
 * One adapter.
 * One frozen snapshot.
 * One subject.
 *
 * No cognition duplication.
 * No personality logic.
 * No direct mental mutation.
 *
 * ============================================================
 */

/* ============================================================
 * END — SUBJECT RUNTIME ADAPTER V1.1
 * ============================================================
 */