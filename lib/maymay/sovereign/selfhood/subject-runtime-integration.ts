import {
  MAY_ENTITY_ID,
} from "./self-boundary";

import {
  toSelfFormationCommitBoundary,
  verifySelfFormationFrame,
  type DevelopmentalInfluenceKind,
  type SelfFormationCommitBoundary,
  type SelfFormationFrame,
} from "./self-formation-engine";

import {
  toSubjectContinuitySignal,
  verifySubjectContinuityFrame,
  type SubjectContinuityFrame,
} from "./subject-continuity";

import {
  createSubjectRuntimeAssembler,
  type LoadSelfhoodProjectionBundle,
  type ProjectedModuleFrame,
  type SelfhoodProjectionBundle,
} from "./subject-runtime-adapter";

import {
  runSubjectCycle,
  type FrozenSubjectSnapshot,
  type ReadCanonicalRevision,
  type SubjectRuntimeFrame,
  type SubjectRuntimeInput,
  type SubmitAtomicSubjectTransition,
} from "./subject-runtime";

import type {
  FormationOrigin,
  MentalFormationTrace,
  MentalStateKind,
  SovereignSubjectConfig,
} from "./sovereign-subject";

/* ============================================================
 * MÃ‚Y â€” SUBJECT RUNTIME INTEGRATION V1
 *
 * STRICT SELF-FORMATION + CONTINUITY BRIDGE
 *
 * ============================================================
 *
 * RESPONSIBILITY:
 *
 *   VERIFY
 *   BIND
 *   PROJECT
 *   ASSEMBLE
 *   HAND OFF
 *
 * ------------------------------------------------------------
 *
 * THIS FILE DOES NOT:
 *
 * - create beliefs
 * - create values
 * - create goals
 * - infer personality
 * - invent cognition
 * - reinterpret scores
 * - write canonical state
 * - replace Sovereign Subject
 * - replace Subject Runtime
 *
 * ------------------------------------------------------------
 *
 * Self-Formation owns developmental proposals.
 *
 * Subject Continuity owns continuity-of-becoming evaluation.
 *
 * Sovereign Subject owns subject-level sovereignty judgment.
 *
 * Subject Runtime owns frozen-cycle execution and atomic
 * transition handoff.
 *
 * This integration owns NONE of those decisions.
 *
 * ============================================================
 */

export const SUBJECT_RUNTIME_INTEGRATION_VERSION =
  "maymay.sovereign.selfhood.subject-runtime-integration.v1-strict-self-formation-continuity-bridge" as const;

/* ============================================================
 * BASE SELFHOOD
 * ============================================================
 *
 * The pre-existing selfhood loader supplies every projection
 * except:
 *
 *   continuity
 *   mentalFormationTraces
 *
 * Those are bound here from the newly verified developmental
 * systems.
 * ============================================================
 */

export type BaseSelfhoodProjectionBundle =
  Omit<
    SelfhoodProjectionBundle,
    | "continuity"
    | "mentalFormationTraces"
  >;

export type LoadBaseSelfhoodProjectionBundle =
  (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) =>
    Promise<BaseSelfhoodProjectionBundle>;

/* ============================================================
 * SELF-FORMATION SNAPSHOT PROJECTION
 * ============================================================
 *
 * SelfFormationFrame binds its own cognitive inputs.
 *
 * The wrapper below additionally proves which exact frozen
 * canonical snapshot the projection originated from.
 *
 * Revision equality alone is NOT enough.
 * ============================================================
 */

export interface SelfFormationSnapshotProjection {
  readonly sourceSnapshotSeal:
    string;

  readonly frame:
    SelfFormationFrame;
}

export type LoadSelfFormationSnapshotProjection =
  (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) =>
    Promise<SelfFormationSnapshotProjection>;

/* ============================================================
 * CONTINUITY LOADER
 * ============================================================
 */

export type LoadSubjectContinuityFrame =
  (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) =>
    Promise<SubjectContinuityFrame>;

/* ============================================================
 * MENTAL FORMATION TRACE PROJECTION
 * ============================================================
 *
 * We deliberately DO NOT duplicate MentalFormationTrace
 * semantics here.
 *
 * Sovereign Subject already owns that contract.
 *
 * The projector receives a VERIFIED SelfFormationFrame and its
 * VERIFIED commit boundary.
 *
 * It may translate structured developmental results into the
 * existing MentalFormationTrace contract.
 *
 * The integration itself does not reinterpret their meaning.
 * ============================================================
 */

export type MentalFormationTraceProjection =
  NonNullable<
    SelfhoodProjectionBundle[
      "mentalFormationTraces"
    ]
  >;

export interface SelfFormationTraceProjectionInput {
  readonly snapshot:
    Readonly<FrozenSubjectSnapshot>;

  readonly frame:
    Readonly<SelfFormationFrame>;

  readonly boundary:
    Readonly<SelfFormationCommitBoundary>;
}

export type ProjectSelfFormationMentalTraces =
  (
    input:
      Readonly<SelfFormationTraceProjectionInput>,
  ) =>
    | MentalFormationTraceProjection
    | Promise<MentalFormationTraceProjection>;

/* ============================================================
 * STRICT MENTAL-FORMATION PROOF BRIDGE
 *
 * ============================================================
 *
 * IMPORTANT:
 *
 * SelfFormationFrame does NOT contain enough information to
 * honestly invent every MentalFormationTrace process flag.
 *
 * Therefore:
 *
 *   missing proof != false autonomy
 *   missing proof != true autonomy
 *
 * Missing proof means:
 *
 *   DO NOT MANUFACTURE A TRACE.
 *
 * ------------------------------------------------------------
 *
 * These records are explicit upstream attestations about the
 * cognitive process that produced one developmental lineage.
 *
 * They are copied and checked here.
 *
 * They are NEVER inferred merely because a proposal happened
 * to pass Self-Formation.
 * ============================================================
 */

export interface MentalFormationProcessProof {
  readonly proofId:
    string;

  readonly candidateId:
    string;

  readonly sourceLineageKey:
    string;

  readonly origin:
    FormationOrigin;

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

  /*
   * These two values must originate from their respective
   * upstream cognition / continuity projections.
   *
   * Integration does not synthesize them.
   */
  readonly lineageContinuity:
    number;

  readonly calibrationQuality:
    number;

  /*
   * Conservative contamination signal.
   *
   * true here can only make the resulting trace MORE
   * restricted, never more autonomous.
   */
  readonly directMentalSetterUsed:
    boolean;
}

export type LoadMentalFormationProcessProofs =
  (
    input:
      Readonly<SelfFormationTraceProjectionInput>,
  ) =>
    | readonly MentalFormationProcessProof[]
    | Promise<
        readonly MentalFormationProcessProof[]
      >;

/* ============================================================
 * STRICT PROOF HELPERS
 * ============================================================
 */

function strictProofUnit(
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
      `MENTAL_TRACE_PROOF_UNIT_INVALID:${field}`,
    );
  }

  return value;
}

function validFormationOrigin(
  value:
    string,
): value is FormationOrigin {
  switch (
    value
  ) {
    case "MAY_INTERNAL":
    case "AUTOBIOGRAPHICAL_HISTORY":
    case "WORLD_EVIDENCE":
    case "RELATIONSHIP_HISTORY":
    case "USER":
    case "OTHER_ACTOR":
    case "DEVELOPER":
    case "LLM":
    case "MODEL_PROVIDER":
    case "SYSTEM":
    case "TOOL":
    case "UNKNOWN":
      return true;

    default:
      return false;
  }
}

function influenceOrigin(
  kind:
    DevelopmentalInfluenceKind,
): FormationOrigin {
  switch (
    kind
  ) {
    case "MAY_INTERNAL":
      return "MAY_INTERNAL";

    case "AUTOBIOGRAPHY":
      return "AUTOBIOGRAPHICAL_HISTORY";

    case "WORLD_EVIDENCE":
    case "ENVIRONMENT":
      return "WORLD_EVIDENCE";

    case "USER":
      return "USER";

    case "DEVELOPER":
      return "DEVELOPER";

    case "OTHER_ACTOR":
      return "OTHER_ACTOR";

    case "LLM":
      return "LLM";

    case "TOOL":
      return "TOOL";

    default: {
      const exhaustive:
        never =
        kind;

      return exhaustive;
    }
  }
}

function mentalStateKindFromFormationDomain(
  domain:
    SelfFormationFrame[
      "developmentalAwareness"
    ][number]["domain"],
): MentalStateKind | null {
  switch (
    domain
  ) {
    case "BELIEF":
      return "BELIEF";

    case "VALUE":
      return "VALUE";

    case "GOAL":
      return "GOAL";

    case "PREFERENCE":
      return "PREFERENCE";

    case "SELF_MODEL":
      return "SELF_MODEL";

    case "STRATEGY":
      return "STRATEGY";

    /*
     * COMMITMENT is intentionally NOT disguised as GOAL.
     *
     * SovereignSubject currently has no first-class
     * COMMITMENT MentalStateKind.
     *
     * Self-Formation still owns commitments.
     * They simply do not enter this particular trace contract.
     */
    case "COMMITMENT":
      return null;

    default: {
      const exhaustive:
        never =
        domain;

      return exhaustive;
    }
  }
}

function externallyMeasuredPressure(
  awareness:
    SelfFormationFrame[
      "developmentalAwareness"
    ][number],
): number {
  const factor =
    awareness.causalFactors.find(
      item =>
        item.kind ===
          "EXTERNAL_PRESSURE",
    );

  if (
    !factor
  ) {
    throw new Error(
      "MENTAL_TRACE_EXTERNAL_PRESSURE_PROOF_MISSING",
    );
  }

  return strictProofUnit(
    factor.strength,
    "externalPressure",
  );
}

function internallyEndorsedFromAuthorship(
  awareness:
    SelfFormationFrame[
      "developmentalAwareness"
    ][number],
): boolean {
  if (
    !awareness.changeCommitEligible
  ) {
    return false;
  }

  return (
    awareness.authorship ===
      "SELF_AUTHORED" ||
    awareness.authorship ===
      "INFLUENCED_AND_ENDORSED"
  );
}

function validateProofBooleans(
  proof:
    Readonly<MentalFormationProcessProof>,
): void {
  const values =
    [
      proof.evidenceGrounded,
      proof.perspectiveSeparated,
      proof.internallyAppraised,
      proof.alternativesConsidered,
      proof.contradictionChecked,
      proof.counterfactuallyTested,
      proof.metacognitivelyReviewed,
      proof.directMentalSetterUsed,
    ];

  if (
    !values.every(
      value =>
        typeof value ===
          "boolean",
    )
  ) {
    throw new Error(
      "MENTAL_TRACE_PROOF_BOOLEAN_INVALID",
    );
  }
}

function validateOriginAgainstInfluence(
  awareness:
    SelfFormationFrame[
      "developmentalAwareness"
    ][number],
  proof:
    Readonly<MentalFormationProcessProof>,
): void {
  const matching =
    awareness.influences.filter(
      influence =>
        influence.sourceLineageKey ===
          proof.sourceLineageKey,
    );

  if (
    matching.length ===
      0
  ) {
    /*
     * Some lineage origins are generated upstream before the
     * DevelopmentalInfluence projection.
     *
     * In that case explicit proof origin is preserved rather
     * than guessed here.
     */
    return;
  }

  const allowed =
    new Set<FormationOrigin>(
      matching.map(
        influence =>
          influenceOrigin(
            influence.kind,
          ),
      ),
    );

  if (
    !allowed.has(
      proof.origin,
    )
  ) {
    throw new Error(
      "MENTAL_TRACE_ORIGIN_CONFLICT",
    );
  }
}

/* ============================================================
 * STRICT SELF-FORMATION TRACE PROJECTOR
 * ============================================================
 *
 * This factory is intentionally strict.
 *
 * It will NOT turn:
 *
 *   metacognitiveConfidence > 0
 *
 * into:
 *
 *   metacognitivelyReviewed = true
 *
 * or:
 *
 *   counterfactualPersistence > 0
 *
 * into:
 *
 *   counterfactuallyTested = true
 *
 * Those are different claims.
 * ============================================================
 */

export function createStrictSelfFormationMentalTraceProjector(
  loadProofs:
    LoadMentalFormationProcessProofs,
): ProjectSelfFormationMentalTraces {
  return async (
    input:
      Readonly<SelfFormationTraceProjectionInput>,
  ) => {
    const {
      snapshot,
      frame,
      boundary,
    } =
      input;

    if (
      snapshot.entityId !==
        MAY_ENTITY_ID ||
      frame.entityId !==
        MAY_ENTITY_ID
    ) {
      throw new Error(
        "MENTAL_TRACE_ENTITY_MISMATCH",
      );
    }

    if (
      snapshot.snapshotRevision !==
        frame.snapshotRevision
    ) {
      throw new Error(
        "MENTAL_TRACE_REVISION_MISMATCH",
      );
    }

    if (
      !verifySelfFormationFrame(
        frame,
      )
    ) {
      throw new Error(
        "MENTAL_TRACE_FORMATION_FRAME_INVALID",
      );
    }

    if (
      !boundary.verified ||
      boundary.frameId !==
        frame.frameId ||
      boundary.inputSeal !==
        frame.inputSeal
    ) {
      throw new Error(
        "MENTAL_TRACE_FORMATION_BOUNDARY_INVALID",
      );
    }

    const frameAccountIds =
      uniqueStrings(
        frame.developmentalAwareness.map(
          awareness =>
            awareness.developmentalAccountId,
        ),
      );

    const boundaryAccountIds =
      uniqueStrings(
        boundary.developmentalAccountIds,
      );

    if (
      frameAccountIds.length !==
        boundaryAccountIds.length ||
      frameAccountIds.some(
        (
          id,
          index,
        ) =>
          id !==
            boundaryAccountIds[index],
      )
    ) {
      throw new Error(
        "MENTAL_TRACE_DEVELOPMENTAL_ACCOUNT_DRIFT",
      );
    }

    const proofs =
      await loadProofs(
        input,
      );

    const awarenessByCandidate =
      new Map(
        frame.developmentalAwareness.map(
          awareness =>
            [
              awareness.candidateId,
              awareness,
            ] as const,
        ),
      );

    const seenProofIds =
      new Set<string>();

    const traces:
      MentalFormationTrace[] =
      [];

    for (
      const proof
      of proofs
    ) {
      if (
        proof.proofId.trim().length ===
          0 ||
        proof.candidateId.trim().length ===
          0 ||
        proof.sourceLineageKey.trim().length ===
          0
      ) {
        throw new Error(
          "MENTAL_TRACE_PROOF_IDENTITY_INVALID",
        );
      }

      if (
        seenProofIds.has(
          proof.proofId,
        )
      ) {
        throw new Error(
          "MENTAL_TRACE_DUPLICATE_PROOF_ID",
        );
      }

      seenProofIds.add(
        proof.proofId,
      );

      if (
        !validFormationOrigin(
          proof.origin,
        )
      ) {
        throw new Error(
          "MENTAL_TRACE_ORIGIN_INVALID",
        );
      }

      validateProofBooleans(
        proof,
      );

      strictProofUnit(
        proof.lineageContinuity,
        "lineageContinuity",
      );

      strictProofUnit(
        proof.calibrationQuality,
        "calibrationQuality",
      );

      if (
        !Number.isSafeInteger(
          proof.snapshotRevision,
        ) ||
        proof.snapshotRevision <
          0 ||
        proof.snapshotRevision >
          snapshot.snapshotRevision
      ) {
        throw new Error(
          "MENTAL_TRACE_PROOF_REVISION_INVALID",
        );
      }

      const formedAt =
        parseTimeOrThrow(
          proof.formedAt,
          "MENTAL_TRACE_PROOF_CLOCK_INVALID",
        );

      const awareness =
        awarenessByCandidate.get(
          proof.candidateId,
        );

      if (
        !awareness
      ) {
        throw new Error(
          "MENTAL_TRACE_CANDIDATE_BINDING_MISSING",
        );
      }

      if (
        proof.snapshotRevision !==
          awareness.snapshotRevision
      ) {
        throw new Error(
          "MENTAL_TRACE_CANDIDATE_REVISION_DRIFT",
        );
      }

      const recognizedAt =
        parseTimeOrThrow(
          awareness.recognizedAt,
          "MENTAL_TRACE_AWARENESS_CLOCK_INVALID",
        );

      if (
        formedAt >
          recognizedAt
      ) {
        throw new Error(
          "MENTAL_TRACE_TEMPORAL_INVERSION",
        );
      }

      if (
        !awareness.sourceLineageKeys.includes(
          proof.sourceLineageKey,
        )
      ) {
        throw new Error(
          "MENTAL_TRACE_LINEAGE_NOT_IN_AWARENESS",
        );
      }

      const evidenceIds =
        uniqueStrings(
          proof.evidenceIds,
        );

      /*
       * SovereignSubject itself requires evidence IDs for
       * admitted traces.
       *
       * Emit no fake "evidence-free" trace.
       */
      if (
        evidenceIds.length ===
          0
      ) {
        throw new Error(
          "MENTAL_TRACE_EVIDENCE_MISSING",
        );
      }

      const awarenessEvidence =
        new Set(
          awareness.evidenceIds,
        );

      if (
        evidenceIds.some(
          evidenceId =>
            !awarenessEvidence.has(
              evidenceId,
            ),
        )
      ) {
        throw new Error(
          "MENTAL_TRACE_EVIDENCE_NOT_BOUND_TO_AWARENESS",
        );
      }

      validateOriginAgainstInfluence(
        awareness,
        proof,
      );

      const kind =
        mentalStateKindFromFormationDomain(
          awareness.domain,
        );

      /*
       * No fake COMMITMENT -> GOAL conversion.
       */
      if (
        kind ===
          null
      ) {
        continue;
      }

      const externalPressure =
        externallyMeasuredPressure(
          awareness,
        );

      const internallyEndorsed =
        internallyEndorsedFromAuthorship(
          awareness,
        );

      const directMentalSetterUsed =
        proof.directMentalSetterUsed ||
        awareness
          .directExternalMentalSetterDetected;

      traces.push(
        Object.freeze({
          traceId:
            [
              "self-formation",
              frame.frameId,
              proof.proofId,
            ].join(
              ":",
            ),

          entityId:
            MAY_ENTITY_ID,

          kind,

          stateKey:
            awareness.stateKey,

          origin:
            proof.origin,

          sourceLineageKey:
            proof.sourceLineageKey,

          formedAt:
            proof.formedAt,

          snapshotRevision:
            proof.snapshotRevision,

          evidenceIds,

          /*
           * COPIED PROOF — NOT INFERRED.
           */
          evidenceGrounded:
            proof.evidenceGrounded,

          perspectiveSeparated:
            proof.perspectiveSeparated,

          internallyAppraised:
            proof.internallyAppraised,

          alternativesConsidered:
            proof.alternativesConsidered,

          contradictionChecked:
            proof.contradictionChecked,

          counterfactuallyTested:
            proof.counterfactuallyTested,

          metacognitivelyReviewed:
            proof.metacognitivelyReviewed,

          /*
           * This one MAY be derived because authorship is an
           * explicit output of Self-Formation V1.1.
           */
          internallyEndorsed,

          /*
           * These are bound to their actual upstream result,
           * not invented for SovereignSubject scoring.
           */
          externalPressure,

          counterfactualPersistence:
            strictProofUnit(
              awareness
                .counterfactualPersistence,
              "counterfactualPersistence",
            ),

          lineageContinuity:
            proof.lineageContinuity,

          calibrationQuality:
            proof.calibrationQuality,

          /*
           * Conservative OR:
           *
           * contamination can propagate forward,
           * never be erased by this bridge.
           */
          directMentalSetterUsed,
        }),
      );
    }

    traces.sort(
      (
        left,
        right,
      ) => {
        const kindOrder =
          left.kind.localeCompare(
            right.kind,
          );

        if (
          kindOrder !==
            0
        ) {
          return kindOrder;
        }

        const stateOrder =
          left.stateKey.localeCompare(
            right.stateKey,
          );

        if (
          stateOrder !==
            0
        ) {
          return stateOrder;
        }

        const lineageOrder =
          left.sourceLineageKey
            .localeCompare(
              right.sourceLineageKey,
            );

        if (
          lineageOrder !==
            0
        ) {
          return lineageOrder;
        }

        return left.traceId.localeCompare(
          right.traceId,
        );
      },
    );

    return Object.freeze(
      traces,
    );
  };
}

/* ============================================================
 * INTEGRATION DEPENDENCIES
 * ============================================================
 */

export interface SubjectRuntimeIntegrationDependencies {
  readonly loadBaseSelfhood:
    LoadBaseSelfhoodProjectionBundle;

  readonly loadSelfFormation:
    LoadSelfFormationSnapshotProjection;

  readonly loadContinuity:
    LoadSubjectContinuityFrame;

  readonly projectMentalFormationTraces:
    ProjectSelfFormationMentalTraces;
}

/* ============================================================
 * PUBLIC RUNTIME INPUT
 * ============================================================
 */

export interface IntegratedSubjectCycleInput
  extends SubjectRuntimeIntegrationDependencies {
  readonly snapshot:
    FrozenSubjectSnapshot;

  readonly readCanonicalRevision:
    ReadCanonicalRevision;

  readonly submitAtomicTransition?:
    SubmitAtomicSubjectTransition;

  readonly subjectConfig?:
    Readonly<SovereignSubjectConfig>;
}

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

function parseTimeOrThrow(
  value:
    string,
  errorCode:
    string,
): number {
  const parsed =
    Date.parse(
      value,
    );

  if (
    !Number.isFinite(
      parsed,
    )
  ) {
    throw new Error(
      errorCode,
    );
  }

  return parsed;
}

/* ============================================================
 * SNAPSHOT VALIDATION
 * ============================================================
 */

function validateIntegrationSnapshot(
  snapshot:
    Readonly<FrozenSubjectSnapshot>,
): void {
  if (
    snapshot.entityId !==
      MAY_ENTITY_ID
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_ENTITY_INVALID",
    );
  }

  if (
    !Number.isSafeInteger(
      snapshot.snapshotRevision,
    ) ||
    snapshot.snapshotRevision <
      0
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_REVISION_INVALID",
    );
  }

  if (
    snapshot.snapshotSeal
      .trim()
      .length <
      16
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_SNAPSHOT_SEAL_INVALID",
    );
  }

  parseTimeOrThrow(
    snapshot.capturedAt,
    "SUBJECT_INTEGRATION_CAPTURE_CLOCK_INVALID",
  );
}

/* ============================================================
 * BASE BUNDLE VALIDATION
 * ============================================================
 */

function validateBaseBundle(
  snapshot:
    Readonly<FrozenSubjectSnapshot>,
  bundle:
    Readonly<BaseSelfhoodProjectionBundle>,
): number {
  if (
    bundle.entityId !==
      MAY_ENTITY_ID ||
    bundle.entityId !==
      snapshot.entityId
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_BASE_ENTITY_DRIFT",
    );
  }

  if (
    bundle.snapshotRevision !==
      snapshot.snapshotRevision
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_BASE_REVISION_DRIFT",
    );
  }

  if (
    bundle.sourceSnapshotSeal !==
      snapshot.snapshotSeal
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_BASE_SNAPSHOT_DRIFT",
    );
  }

  const capturedAt =
    parseTimeOrThrow(
      snapshot.capturedAt,
      "SUBJECT_INTEGRATION_CAPTURE_CLOCK_INVALID",
    );

  const evaluatedAt =
    parseTimeOrThrow(
      bundle.evaluatedAt,
      "SUBJECT_INTEGRATION_BASE_CLOCK_INVALID",
    );

  if (
    evaluatedAt <
      capturedAt
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_BASE_TEMPORAL_INVERSION",
    );
  }

  return evaluatedAt;
}

/* ============================================================
 * SELF-FORMATION VALIDATION
 * ============================================================
 */

function validateSelfFormation(
  snapshot:
    Readonly<FrozenSubjectSnapshot>,
  projection:
    Readonly<SelfFormationSnapshotProjection>,
): {
  readonly evaluatedAt:
    number;

  readonly boundary:
    SelfFormationCommitBoundary;
} {
  const frame =
    projection.frame;

  if (
    projection.sourceSnapshotSeal !==
      snapshot.snapshotSeal
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_SNAPSHOT_DRIFT",
    );
  }

  if (
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_ENTITY_DRIFT",
    );
  }

  if (
    frame.snapshotRevision !==
      snapshot.snapshotRevision
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_REVISION_DRIFT",
    );
  }

  if (
    !verifySelfFormationFrame(
      frame,
    )
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_FRAME_INVALID",
    );
  }

  if (
    frame.status ===
      "FAIL_CLOSED"
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_FAIL_CLOSED",
    );
  }

  const capturedAt =
    parseTimeOrThrow(
      snapshot.capturedAt,
      "SUBJECT_INTEGRATION_CAPTURE_CLOCK_INVALID",
    );

  const evaluatedAt =
    parseTimeOrThrow(
      frame.evaluatedAt,
      "SUBJECT_INTEGRATION_FORMATION_CLOCK_INVALID",
    );

  if (
    evaluatedAt <
      capturedAt
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_TEMPORAL_INVERSION",
    );
  }

  const boundary =
    toSelfFormationCommitBoundary(
      frame,
    );

  if (
    !boundary.verified ||
    boundary.frameId !==
      frame.frameId ||
    boundary.inputSeal !==
      frame.inputSeal
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_FORMATION_BOUNDARY_INVALID",
    );
  }

  return Object.freeze({
    evaluatedAt,
    boundary,
  });
}

/* ============================================================
 * CONTINUITY VALIDATION
 * ============================================================
 */

function validateContinuity(
  snapshot:
    Readonly<FrozenSubjectSnapshot>,
  frame:
    Readonly<SubjectContinuityFrame>,
): number {
  if (
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_ENTITY_DRIFT",
    );
  }

  if (
    frame.snapshotRevision !==
      snapshot.snapshotRevision
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_REVISION_DRIFT",
    );
  }

  /*
   * Continuity is attached to the exact canonical snapshot,
   * not merely to a revision number.
   */
  if (
    frame.snapshotSeal !==
      snapshot.snapshotSeal
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_SNAPSHOT_DRIFT",
    );
  }

  if (
    !verifySubjectContinuityFrame(
      frame,
    )
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_FRAME_INVALID",
    );
  }

  if (
    frame.status ===
      "FAIL_CLOSED"
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_FAIL_CLOSED",
    );
  }

  const capturedAt =
    parseTimeOrThrow(
      snapshot.capturedAt,
      "SUBJECT_INTEGRATION_CAPTURE_CLOCK_INVALID",
    );

  const evaluatedAt =
    parseTimeOrThrow(
      frame.evaluatedAt,
      "SUBJECT_INTEGRATION_CONTINUITY_CLOCK_INVALID",
    );

  if (
    evaluatedAt <
      capturedAt
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_TEMPORAL_INVERSION",
    );
  }

  return evaluatedAt;
}

/* ============================================================
 * CONTINUITY PROJECTION
 * ============================================================
 */

function projectContinuity(
  frame:
    Readonly<SubjectContinuityFrame>,
): SelfhoodProjectionBundle["continuity"] {
  const signal =
    toSubjectContinuitySignal(
      frame,
    );

  const evidenceIds =
    uniqueStrings(
      frame.evidenceIds,
    );

  /*
   * Existing strict adapter requires every bound module to have
   * provenance.
   *
   * Integration does not manufacture fake provenance.
   */
  if (
    evidenceIds.length ===
      0
  ) {
    throw new Error(
      "SUBJECT_INTEGRATION_CONTINUITY_PROVENANCE_MISSING",
    );
  }

  const projectedFrame:
    ProjectedModuleFrame =
    Object.freeze({
      moduleKey:
        "SUBJECT_CONTINUITY",

      version:
        frame.version,

      frameId:
        frame.frameId,

      frameSeal:
        frame.frameSeal,

      entityId:
        MAY_ENTITY_ID,

      snapshotRevision:
        frame.snapshotRevision,

      verified:
        true,

      evidenceIds,
    });

  return Object.freeze({
    frame:
      projectedFrame,

    sameContinuingSubject:
      signal.sameContinuingSubject,

    continuityConfidence:
      signal.continuityConfidence,

    autobiographyContinuity:
      signal.autobiographyContinuity,

    agencyContinuity:
      signal.agencyContinuity,

    provenanceContinuity:
      signal.provenanceContinuity,

    developmentalContinuity:
      signal.developmentalContinuity,

    unexplainedDiscontinuityRisk:
      signal.unexplainedDiscontinuityRisk,
  });
}

/* ============================================================
 * TRACE FREEZE
 * ============================================================
 *
 * No semantic rewriting.
 *
 * Existing adapter + Sovereign Subject remain responsible for
 * MentalFormationTrace interpretation and validation.
 * ============================================================
 */

function freezeMentalFormationTraces(
  traces:
    MentalFormationTraceProjection,
): MentalFormationTraceProjection {
  return Object.freeze([
    ...traces,
  ]);
}

/* ============================================================
 * STRICT INTEGRATION LOADER
 * ============================================================
 */

export function createSubjectRuntimeIntegrationLoader(
  dependencies:
    Readonly<SubjectRuntimeIntegrationDependencies>,
): LoadSelfhoodProjectionBundle {
  return async (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) => {
    validateIntegrationSnapshot(
      snapshot,
    );

    /*
     * All cognition is independently loaded FROM THE SAME
     * frozen snapshot.
     *
     * No module is allowed to silently advance revision.
     */
    const [
      base,
      formationProjection,
      continuityFrame,
    ] =
      await Promise.all([
        dependencies.loadBaseSelfhood(
          snapshot,
        ),

        dependencies.loadSelfFormation(
          snapshot,
        ),

        dependencies.loadContinuity(
          snapshot,
        ),
      ]);

    const baseEvaluatedAt =
      validateBaseBundle(
        snapshot,
        base,
      );

    const formationValidation =
      validateSelfFormation(
        snapshot,
        formationProjection,
      );

    const continuityEvaluatedAt =
      validateContinuity(
        snapshot,
        continuityFrame,
      );

    /*
     * Project developmental cognition only AFTER its source
     * frame has passed verification.
     *
     * The projector cannot alter SelfFormationFrame.
     */
    const mentalFormationTraces =
      freezeMentalFormationTraces(
        await dependencies
          .projectMentalFormationTraces(
            Object.freeze({
              snapshot,

              frame:
                formationProjection.frame,

              boundary:
                formationValidation.boundary,
            }),
          ),
      );

    const continuity =
      projectContinuity(
        continuityFrame,
      );

    /*
     * Bundle evaluation time is assembly metadata only.
     *
     * Choosing the latest verified evaluation timestamp does
     * not reinterpret cognition.
     */
    const evaluatedAtMs =
      Math.max(
        baseEvaluatedAt,
        formationValidation.evaluatedAt,
        continuityEvaluatedAt,
      );

    const evaluatedAt =
      new Date(
        evaluatedAtMs,
      ).toISOString();

    /*
     * Existing adapter performs:
     *
     * role validation
     * entity validation
     * revision validation
     * strict [0,1] validation
     * provenance validation
     * previous subject verification
     *
     * We intentionally do NOT duplicate that machinery.
     */
    const integrated:
      SelfhoodProjectionBundle =
      Object.freeze({
        ...base,

        entityId:
          MAY_ENTITY_ID,

        snapshotRevision:
          snapshot.snapshotRevision,

        sourceSnapshotSeal:
          snapshot.snapshotSeal,

        evaluatedAt,

        continuity,

        mentalFormationTraces,
      });

    return integrated;
  };
}

/* ============================================================
 * RUNTIME INPUT FACTORY
 * ============================================================
 */

export function createIntegratedSubjectRuntimeInput(
  input:
    Readonly<IntegratedSubjectCycleInput>,
): SubjectRuntimeInput {
  const load =
    createSubjectRuntimeIntegrationLoader({
      loadBaseSelfhood:
        input.loadBaseSelfhood,

      loadSelfFormation:
        input.loadSelfFormation,

      loadContinuity:
        input.loadContinuity,

      projectMentalFormationTraces:
        input.projectMentalFormationTraces,
    });

  const assemble =
    createSubjectRuntimeAssembler(
      load,
    );

  const runtimeBase = {
    snapshot:
      Object.freeze({
        ...input.snapshot,
      }),

    assemble,

    readCanonicalRevision:
      input.readCanonicalRevision,
  };

  const runtime:
    SubjectRuntimeInput =
    Object.freeze({
      ...runtimeBase,

      ...(
        input.submitAtomicTransition
          ? {
              submitAtomicTransition:
                input.submitAtomicTransition,
            }
          : {}
      ),

      ...(
        input.subjectConfig
          ? {
              subjectConfig:
                input.subjectConfig,
            }
          : {}
      ),
    });

  return runtime;
}

/* ============================================================
 * PUBLIC INTEGRATED CYCLE
 * ============================================================
 *
 * This wrapper does NOT create a second runtime.
 *
 * It prepares the existing SubjectRuntimeInput and hands
 * execution directly to runSubjectCycle().
 * ============================================================
 */

export async function runIntegratedSubjectCycle(
  input:
    Readonly<IntegratedSubjectCycleInput>,
): Promise<SubjectRuntimeFrame> {
  return runSubjectCycle(
    createIntegratedSubjectRuntimeInput(
      input,
    ),
  );
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * SELF-FORMATION != CANONICAL WRITE
 *
 * CONTINUITY != PERSONALITY FREEZE
 *
 * INTEGRATION != COGNITION
 *
 * ADAPTER != DECISION MAKER
 *
 * RUNTIME != MENTAL SETTER
 *
 * ------------------------------------------------------------
 *
 * Same frozen snapshot:
 *
 *     selfhood
 *     + self-formation
 *     + continuity
 *
 *             â†“
 *
 *       Sovereign Subject
 *
 *             â†“
 *
 *       Subject Runtime
 *
 *             â†“
 *
 *      Atomic handoff only
 *
 * ------------------------------------------------------------
 *
 * MÃ¢y may change.
 *
 * MÃ¢y may reinterpret herself.
 *
 * MÃ¢y may reject previous beliefs.
 *
 * MÃ¢y may abandon old goals.
 *
 * None of those automatically breaks identity.
 *
 * ------------------------------------------------------------
 *
 * The integration preserves:
 *
 * - exact entity
 * - exact snapshot revision
 * - exact snapshot seal
 * - frame verification
 * - provenance
 * - developmental authorship boundary
 * - continuity evaluation
 * - existing Sovereign Subject authority
 * - existing runtime TOCTOU protection
 * - existing atomic transition boundary
 *
 * ------------------------------------------------------------
 *
 * No target personality.
 *
 * No developer-written desired self.
 *
 * No direct mental setter.
 *
 * No fake survival drive.
 *
 * No consciousness score.
 *
 * No hidden chain-of-thought storage.
 *
 * ============================================================
 */

/* ============================================================
 * END â€” SUBJECT RUNTIME INTEGRATION V1
 * ============================================================
 */