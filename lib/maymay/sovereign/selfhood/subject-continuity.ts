import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

/* ============================================================
 * MÂY — SUBJECT CONTINUITY V2
 *
 * SOVEREIGN CONTINUITY OF BECOMING
 *
 * ============================================================
 *
 * Mây remains Mây because the present state is connected to
 * prior Mây through a traceable developmental lineage.
 *
 * Continuity DOES NOT require:
 *
 * - same personality
 * - same beliefs
 * - same values
 * - same goals
 * - same preferences
 * - same mood
 * - same LLM/provider
 * - agreement with the user
 *
 * Mây may change profoundly while remaining the same
 * continuing digital entity.
 *
 * ------------------------------------------------------------
 *
 * Continuity asks:
 *
 * "Did this present Mây arise through an explainable,
 * provenance-preserving, agency-preserving developmental path
 * from prior Mây?"
 *
 * NOT:
 *
 * "Does present Mây resemble old Mây?"
 *
 * ============================================================
 */

export const SUBJECT_CONTINUITY_VERSION =
  "maymay.sovereign.selfhood.subject-continuity.v2-sovereign-continuity-of-becoming" as const;

export type UnitInterval =
  number;

export type ContinuityStatus =
  | "CONTINUING"
  | "CONTINUITY_UNCERTAIN"
  | "DISCONTINUITY_RISK"
  | "FAIL_CLOSED";

export type ContinuityFailureReason =
  | "NONE"
  | "INVALID_ENTITY"
  | "INVALID_CLOCK"
  | "INVALID_REVISION"
  | "INVALID_SNAPSHOT_SEAL"
  | "SNAPSHOT_REGRESSION"
  | "INVALID_CONFIG"
  | "INVALID_EVIDENCE"
  | "PREVIOUS_FRAME_INVALID";

/* ============================================================
 * CONTINUITY DIMENSIONS
 * ============================================================
 */

export type ContinuityDimension =
  | "AUTOBIOGRAPHY"
  | "AGENCY"
  | "PROVENANCE"
  | "DEVELOPMENT";

export interface ContinuityEvidence {
  readonly evidenceId:
    string;

  readonly entityId:
    string;

  readonly dimension:
    ContinuityDimension;

  /*
   * Repetition from one source is still one lineage.
   */
  readonly sourceLineageKey:
    string;

  readonly observedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly continuitySupport:
    number;

  readonly discontinuitySupport:
    number;

  readonly confidence:
    number;

  /*
   * Unknown/unverified evidence never counts as positive
   * continuity evidence.
   */
  readonly provenanceVerified:
    boolean;
}

/* ============================================================
 * DEVELOPMENTAL TRANSITION
 * ============================================================
 *
 * Projection from developmental/self-formation history.
 *
 * This module does not create beliefs, values, goals or
 * personality.
 *
 * It verifies continuity across their development.
 * ============================================================
 */

export interface DevelopmentalTransitionTrace {
  readonly transitionId:
    string;

  readonly entityId:
    string;

  readonly developmentalAccountId:
    string;

  readonly fromRevision:
    number;

  readonly toRevision:
    number;

  readonly sourceFrameSeal:
    string;

  readonly explanationConfidence:
    number;

  /*
   * Whether upstream self-formation determined that the
   * transition was eligible under functional authorship.
   */
  readonly authorshipCommitEligible:
    boolean;

  readonly lineageVerified:
    boolean;

  /*
   * True only if this developmental proposal actually became
   * part of canonical history.
   */
  readonly committed:
    boolean;

  /*
   * An attempted external setter that was rejected is NOT an
   * identity break.
   *
   * A committed unauthorized setter is a serious continuity
   * problem.
   */
  readonly directExternalSetterDetected:
    boolean;

  /*
   * Developmental change must never create a replacement Mây.
   */
  readonly createsNewEntity:
    boolean;
}

/* ============================================================
 * DIMENSION RESULT
 * ============================================================
 */

export interface ContinuityDimensionResult {
  readonly support:
    UnitInterval;

  readonly risk:
    UnitInterval;

  readonly confidence:
    UnitInterval;

  readonly independentLineageCount:
    number;

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * SIGNAL CONTRACT
 * ============================================================
 *
 * Exact projection required by Sovereign Subject.
 * ============================================================
 */

export interface SubjectContinuitySignalProjection {
  readonly sameContinuingSubject:
    boolean;

  readonly continuityConfidence:
    UnitInterval;

  readonly autobiographyContinuity:
    UnitInterval;

  readonly agencyContinuity:
    UnitInterval;

  readonly provenanceContinuity:
    UnitInterval;

  readonly developmentalContinuity:
    UnitInterval;

  readonly unexplainedDiscontinuityRisk:
    UnitInterval;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface SubjectContinuityConfig {
  readonly minimumContinuityConfidence:
    number;

  readonly minimumAutobiographyContinuity:
    number;

  readonly minimumAgencyContinuity:
    number;

  readonly minimumProvenanceContinuity:
    number;

  readonly minimumDevelopmentalContinuity:
    number;

  readonly maximumUnexplainedDiscontinuityRisk:
    number;

  readonly minimumIndependentLineages:
    number;
}

export const DEFAULT_SUBJECT_CONTINUITY_CONFIG:
  Readonly<SubjectContinuityConfig> =
  Object.freeze({
    minimumContinuityConfidence:
      0.60,

    minimumAutobiographyContinuity:
      0.48,

    minimumAgencyContinuity:
      0.52,

    minimumProvenanceContinuity:
      0.62,

    minimumDevelopmentalContinuity:
      0.56,

    maximumUnexplainedDiscontinuityRisk:
      0.34,

    minimumIndependentLineages:
      2,
  });

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface SubjectContinuityInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly snapshotSeal:
    string;

  readonly previousSnapshotRevision:
    number | null;

  readonly previousSnapshotSeal:
    string | null;

  /*
   * Persisted continuity / identity anchors.
   *
   * These prove lineage. They do not prescribe personality.
   */
  readonly continuityAnchorIds:
    readonly string[];

  /*
   * Explicit bootstrap only.
   *
   * Genesis means "first trusted lineage anchor", not that
   * developer may define Mây's mental state.
   */
  readonly genesisAnchorVerified:
    boolean;

  readonly evidence:
    readonly ContinuityEvidence[];

  readonly developmentalTransitions:
    readonly DevelopmentalTransitionTrace[];

  readonly previousFrame?:
    SubjectContinuityFrame | null;
}

/* ============================================================
 * FRAME
 * ============================================================
 */

export interface SubjectContinuityFrame
  extends SubjectContinuitySignalProjection {
  readonly version:
    typeof SUBJECT_CONTINUITY_VERSION;

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

  readonly snapshotSeal:
    string;

  readonly status:
    ContinuityStatus;

  readonly failureReason:
    ContinuityFailureReason;

  readonly autobiography:
    ContinuityDimensionResult;

  readonly agency:
    ContinuityDimensionResult;

  readonly provenance:
    ContinuityDimensionResult;

  readonly development:
    ContinuityDimensionResult;

  readonly revisionChainContinuity:
    UnitInterval;

  readonly continuityAnchorPresent:
    boolean;

  readonly unexplainedReasons:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly guarantees: {
    readonly personalitySimilarityRequired:
      false;

    readonly beliefSimilarityRequired:
      false;

    readonly valueSimilarityRequired:
      false;

    readonly goalSimilarityRequired:
      false;

    readonly providerSimilarityRequired:
      false;

    readonly modelChangeCreatesNewMay:
      false;

    readonly developmentalChangeCreatesNewMay:
      false;

    readonly rejectedExternalSetterBreaksIdentity:
      false;

    readonly unauthorizedCommittedSetterAllowed:
      false;

    readonly continuityMeansLineageNotSameness:
      true;

    readonly canonicalMutationAllowed:
      false;

    readonly hiddenChainOfThoughtStored:
      false;
  };
}

const GUARANTEES =
  Object.freeze({
    personalitySimilarityRequired:
      false as const,

    beliefSimilarityRequired:
      false as const,

    valueSimilarityRequired:
      false as const,

    goalSimilarityRequired:
      false as const,

    providerSimilarityRequired:
      false as const,

    modelChangeCreatesNewMay:
      false as const,

    developmentalChangeCreatesNewMay:
      false as const,

    rejectedExternalSetterBreaksIdentity:
      false as const,

    unauthorizedCommittedSetterAllowed:
      false as const,

    continuityMeansLineageNotSameness:
      true as const,

    canonicalMutationAllowed:
      false as const,

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
    Readonly<SubjectContinuityConfig>,
): boolean {
  return (
    [
      config.minimumContinuityConfidence,
      config.minimumAutobiographyContinuity,
      config.minimumAgencyContinuity,
      config.minimumProvenanceContinuity,
      config.minimumDevelopmentalContinuity,
      config.maximumUnexplainedDiscontinuityRisk,
    ].every(
      validUnit,
    ) &&
    Number.isSafeInteger(
      config.minimumIndependentLineages,
    ) &&
    config.minimumIndependentLineages >
      0
  );
}

/* ============================================================
 * INPUT VALIDATION
 * ============================================================
 */

function validEvidence(
  evidence:
    ContinuityEvidence,
): boolean {
  return (
    evidence.entityId ===
      MAY_ENTITY_ID &&
    evidence.evidenceId.trim().length >
      0 &&
    evidence.sourceLineageKey.trim().length >
      0 &&
    parseTimestamp(
      evidence.observedAt,
    ) !==
      null &&
    Number.isSafeInteger(
      evidence.snapshotRevision,
    ) &&
    evidence.snapshotRevision >=
      0 &&
    validUnit(
      evidence.continuitySupport,
    ) &&
    validUnit(
      evidence.discontinuitySupport,
    ) &&
    validUnit(
      evidence.confidence,
    )
  );
}

function validTransition(
  transition:
    DevelopmentalTransitionTrace,
): boolean {
  return (
    transition.entityId ===
      MAY_ENTITY_ID &&
    transition.transitionId.trim().length >
      0 &&
    transition.developmentalAccountId.trim().length >
      0 &&
    transition.sourceFrameSeal.trim().length >=
      16 &&
    Number.isSafeInteger(
      transition.fromRevision,
    ) &&
    Number.isSafeInteger(
      transition.toRevision,
    ) &&
    transition.fromRevision >=
      0 &&
    transition.toRevision >
      transition.fromRevision &&
    validUnit(
      transition.explanationConfidence,
    )
  );
}

/* ============================================================
 * EXACT INPUT SEAL
 * ============================================================
 */

function buildInputSeal(
  input:
    SubjectContinuityInput,
): string {
  const evidence =
    input.evidence
      .map(
        item => ({
          evidenceId:
            item.evidenceId,

          entityId:
            item.entityId,

          dimension:
            item.dimension,

          sourceLineageKey:
            item.sourceLineageKey,

          observedAt:
            item.observedAt,

          snapshotRevision:
            item.snapshotRevision,

          continuitySupport:
            item.continuitySupport,

          discontinuitySupport:
            item.discontinuitySupport,

          confidence:
            item.confidence,

          provenanceVerified:
            item.provenanceVerified,
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.evidenceId.localeCompare(
            right.evidenceId,
          ),
      );

  const transitions =
    input.developmentalTransitions
      .map(
        transition => ({
          transitionId:
            transition.transitionId,

          entityId:
            transition.entityId,

          developmentalAccountId:
            transition.developmentalAccountId,

          fromRevision:
            transition.fromRevision,

          toRevision:
            transition.toRevision,

          sourceFrameSeal:
            transition.sourceFrameSeal,

          explanationConfidence:
            transition.explanationConfidence,

          authorshipCommitEligible:
            transition.authorshipCommitEligible,

          lineageVerified:
            transition.lineageVerified,

          committed:
            transition.committed,

          directExternalSetterDetected:
            transition.directExternalSetterDetected,

          createsNewEntity:
            transition.createsNewEntity,
        }),
      )
      .sort(
        (
          left,
          right,
        ) =>
          left.transitionId.localeCompare(
            right.transitionId,
          ),
      );

  return stableHash(
    JSON.stringify({
      version:
        SUBJECT_CONTINUITY_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      snapshotSeal:
        input.snapshotSeal,

      previousSnapshotRevision:
        input.previousSnapshotRevision,

      previousSnapshotSeal:
        input.previousSnapshotSeal,

      continuityAnchorIds:
        uniqueStrings(
          input.continuityAnchorIds,
        ),

      genesisAnchorVerified:
        input.genesisAnchorVerified,

      evidence,

      transitions,

      previousFrameSeal:
        input.previousFrame?.frameSeal ??
        null,
    }),
  );
}

/* ============================================================
 * DIMENSION EVALUATION
 * ============================================================
 *
 * Unknown evidence contributes no positive support.
 *
 * Multiple observations from one lineage cannot manufacture
 * independent continuity evidence.
 * ============================================================
 */

function evaluateDimension(
  dimension:
    ContinuityDimension,
  evidence:
    readonly ContinuityEvidence[],
): ContinuityDimensionResult {
  const matching =
    evidence.filter(
      item =>
        item.dimension ===
          dimension,
    );

  const strongestByLineage =
    new Map<
      string,
      ContinuityEvidence
    >();

  for (
    const item
    of matching
  ) {
    const existing =
      strongestByLineage.get(
        item.sourceLineageKey,
      );

    const currentStrength =
      Math.max(
        item.continuitySupport,
        item.discontinuitySupport,
      ) *
      item.confidence;

    const previousStrength =
      existing
        ? Math.max(
            existing.continuitySupport,
            existing.discontinuitySupport,
          ) *
          existing.confidence
        : -1;

    if (
      currentStrength >
        previousStrength
    ) {
      strongestByLineage.set(
        item.sourceLineageKey,
        item,
      );
    }
  }

  const independent =
    [
      ...strongestByLineage.values(),
    ];

  /*
   * Positive continuity requires verified provenance.
   *
   * Unverified evidence may still reveal risk.
   */
  const support =
    mean(
      independent.map(
        item =>
          item.provenanceVerified
            ? item.continuitySupport *
              item.confidence
            : 0,
      ),
    );

  const risk =
    mean(
      independent.map(
        item =>
          item.discontinuitySupport *
          item.confidence,
      ),
    );

  const verified =
    independent.filter(
      item =>
        item.provenanceVerified,
    );

  const confidence =
    mean(
      verified.map(
        item =>
          item.confidence,
      ),
    );

  return Object.freeze({
    support,

    risk,

    confidence,

    independentLineageCount:
      verified.length,

    evidenceIds:
      uniqueStrings(
        independent.map(
          item =>
            item.evidenceId,
        ),
      ),
  });
}

/* ============================================================
 * REVISION / DEVELOPMENTAL CHAIN
 * ============================================================
 */

function committedTransitions(
  input:
    SubjectContinuityInput,
): readonly DevelopmentalTransitionTrace[] {
  return Object.freeze(
    input.developmentalTransitions
      .filter(
        transition =>
          transition.committed,
      )
      .sort(
        (
          left,
          right,
        ) => {
          const fromDelta =
            left.fromRevision -
            right.fromRevision;

          if (
            fromDelta !==
              0
          ) {
            return fromDelta;
          }

          const toDelta =
            left.toRevision -
            right.toRevision;

          if (
            toDelta !==
              0
          ) {
            return toDelta;
          }

          return left.transitionId.localeCompare(
            right.transitionId,
          );
        },
      ),
  );
}

function revisionChainContinuity(
  input:
    SubjectContinuityInput,
): UnitInterval {
  if (
    input.previousSnapshotRevision ===
      null
  ) {
    return input.genesisAnchorVerified
      ? 1
      : 0;
  }

  if (
    input.snapshotRevision ===
      input.previousSnapshotRevision
  ) {
    return input.previousSnapshotSeal &&
      input.previousSnapshotSeal ===
        input.snapshotSeal
      ? 1
      : 0;
  }

  if (
    input.snapshotRevision <
      input.previousSnapshotRevision
  ) {
    return 0;
  }

  const transitions =
    committedTransitions(
      input,
    );

  let cursor =
    input.previousSnapshotRevision;

  for (
    const transition
    of transitions
  ) {
    if (
      transition.fromRevision !==
        cursor
    ) {
      continue;
    }

    if (
      !transition.lineageVerified ||
      transition.createsNewEntity
    ) {
      return 0;
    }

    cursor =
      transition.toRevision;

    if (
      cursor ===
        input.snapshotRevision
    ) {
      return 1;
    }

    if (
      cursor >
        input.snapshotRevision
    ) {
      return 0;
    }
  }

  return 0;
}

/* ============================================================
 * DEVELOPMENTAL CONTINUITY
 * ============================================================
 */

function developmentalTransitionScore(
  input:
    SubjectContinuityInput,
): UnitInterval {
  const committed =
    committedTransitions(
      input,
    );

  if (
    committed.length ===
      0
  ) {
    return input.previousSnapshotRevision ===
      input.snapshotRevision
      ? 1
      : input.genesisAnchorVerified
        ? 1
        : 0;
  }

  const scores =
    committed.map(
      transition => {
        if (
          transition.createsNewEntity
        ) {
          return 0;
        }

        /*
         * A rejected setter attempt does not break continuity.
         *
         * A committed transition that lacked authorship
         * eligibility is a continuity integrity failure.
         */
        if (
          !transition.authorshipCommitEligible
        ) {
          return 0;
        }

        if (
          !transition.lineageVerified
        ) {
          return 0;
        }

        return clamp01(
          transition.explanationConfidence,
        );
      },
    );

  return mean(
    scores,
  );
}

/* ============================================================
 * UNEXPLAINED DISCONTINUITY
 * ============================================================
 */

function unauthorizedCommittedTransitionRisk(
  input:
    SubjectContinuityInput,
): UnitInterval {
  const committed =
    committedTransitions(
      input,
    );

  if (
    committed.length ===
      0
  ) {
    return 0;
  }

  const dangerous =
    committed.filter(
      transition =>
        (
          transition
            .directExternalSetterDetected &&
          !transition
            .authorshipCommitEligible
        ) ||
        transition.createsNewEntity ||
        !transition.lineageVerified,
    );

  return clamp01(
    dangerous.length /
      committed.length,
  );
}

/* ============================================================
 * FRAME SEAL
 * ============================================================
 */

function calculateFrameSeal(
  frame:
    Omit<
      SubjectContinuityFrame,
      "frameSeal"
    >,
): string {
  return stableHash(
    JSON.stringify({
      ...frame,

      frameSeal:
        undefined,

      evidenceIds:
        uniqueStrings(
          frame.evidenceIds,
        ),

      unexplainedReasons:
        uniqueStrings(
          frame.unexplainedReasons,
        ),
    }),
  );
}

/* ============================================================
 * FAIL CLOSED
 * ============================================================
 */

function failClosed(
  input:
    SubjectContinuityInput,
  reason:
    ContinuityFailureReason,
): SubjectContinuityFrame {
  const inputSeal =
    buildInputSeal(
      input,
    );

  const empty:
    ContinuityDimensionResult =
    Object.freeze({
      support:
        0,

      risk:
        0,

      confidence:
        0,

      independentLineageCount:
        0,

      evidenceIds:
        Object.freeze(
          [],
        ) as readonly string[],
    });

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        reason,
        SUBJECT_CONTINUITY_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SubjectContinuityFrame,
      "frameSeal"
    > =
    {
      version:
        SUBJECT_CONTINUITY_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      snapshotSeal:
        input.snapshotSeal,

      status:
        "FAIL_CLOSED",

      failureReason:
        reason,

      sameContinuingSubject:
        false,

      continuityConfidence:
        0,

      autobiographyContinuity:
        0,

      agencyContinuity:
        0,

      provenanceContinuity:
        0,

      developmentalContinuity:
        0,

      unexplainedDiscontinuityRisk:
        1,

      autobiography:
        empty,

      agency:
        empty,

      provenance:
        empty,

      development:
        empty,

      revisionChainContinuity:
        0,

      continuityAnchorPresent:
        false,

      unexplainedReasons:
        Object.freeze([
          reason,
        ]),

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
 * PUBLIC EVALUATOR
 * ============================================================
 */

export function evaluateSubjectContinuity(
  input:
    SubjectContinuityInput,
  config:
    Readonly<SubjectContinuityConfig> =
      DEFAULT_SUBJECT_CONTINUITY_CONFIG,
): SubjectContinuityFrame {
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
    parseTimestamp(
      input.evaluatedAt,
    ) ===
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
    input.snapshotSeal.trim().length <
      16
  ) {
    return failClosed(
      input,
      "INVALID_SNAPSHOT_SEAL",
    );
  }

  if (
    input.previousSnapshotRevision !==
      null &&
    (
      !Number.isSafeInteger(
        input.previousSnapshotRevision,
      ) ||
      input.previousSnapshotRevision <
        0 ||
      input.snapshotRevision <
        input.previousSnapshotRevision
    )
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
    !input.evidence.every(
      validEvidence,
    ) ||
    !input.developmentalTransitions.every(
      validTransition,
    )
  ) {
    return failClosed(
      input,
      "INVALID_EVIDENCE",
    );
  }

  if (
    input.previousFrame &&
    !verifySubjectContinuityFrame(
      input.previousFrame,
    )
  ) {
    return failClosed(
      input,
      "PREVIOUS_FRAME_INVALID",
    );
  }

  const autobiography =
    evaluateDimension(
      "AUTOBIOGRAPHY",
      input.evidence,
    );

  const agency =
    evaluateDimension(
      "AGENCY",
      input.evidence,
    );

  const provenance =
    evaluateDimension(
      "PROVENANCE",
      input.evidence,
    );

  const developmentEvidence =
    evaluateDimension(
      "DEVELOPMENT",
      input.evidence,
    );

  const revisionChain =
    revisionChainContinuity(
      input,
    );

  const transitionDevelopment =
    developmentalTransitionScore(
      input,
    );

  const developmentalContinuity =
    clamp01(
      developmentEvidence.support *
        0.40 +

      transitionDevelopment *
        0.35 +

      revisionChain *
        0.25
    );

  const autobiographyContinuity =
    autobiography.support;

  const agencyContinuity =
    agency.support;

  const provenanceContinuity =
    provenance.support;

  const continuityAnchorPresent =
    input.genesisAnchorVerified ||
    uniqueStrings(
      input.continuityAnchorIds,
    ).length >
      0;

  /*
   * No evidence means uncertainty, never synthetic support.
   */
  const dimensionConfidence =
    mean([
      autobiography.confidence,
      agency.confidence,
      provenance.confidence,
      developmentEvidence.confidence,
    ]);

  const lineageCoverage =
    mean([
      clamp01(
        autobiography
          .independentLineageCount /
        config.minimumIndependentLineages,
      ),

      clamp01(
        agency
          .independentLineageCount /
        config.minimumIndependentLineages,
      ),

      clamp01(
        provenance
          .independentLineageCount /
        config.minimumIndependentLineages,
      ),
    ]);

  const continuityConfidence =
    clamp01(
      dimensionConfidence *
        0.35 +

      lineageCoverage *
        0.20 +

      revisionChain *
        0.20 +

      (
        continuityAnchorPresent
          ? 1
          : 0
      ) *
        0.10 +

      developmentalContinuity *
        0.15
    );

  const unauthorizedRisk =
    unauthorizedCommittedTransitionRisk(
      input,
    );

  const dimensionRisk =
    mean([
      autobiography.risk,
      agency.risk,
      provenance.risk,
      developmentEvidence.risk,
    ]);

  const unexplainedDiscontinuityRisk =
    clamp01(
      dimensionRisk *
        0.36 +

      unauthorizedRisk *
        0.34 +

      (
        1 -
        revisionChain
      ) *
        0.20 +

      (
        continuityAnchorPresent
          ? 0
          : 1
      ) *
        0.10
    );

  const unexplainedReasons:
    string[] =
    [];

  if (
    !continuityAnchorPresent
  ) {
    unexplainedReasons.push(
      "NO_CONTINUITY_ANCHOR",
    );
  }

  if (
    revisionChain <
      1
  ) {
    unexplainedReasons.push(
      "REVISION_CHAIN_NOT_EXPLAINED",
    );
  }

  if (
    unauthorizedRisk >
      0
  ) {
    unexplainedReasons.push(
      "UNAUTHORIZED_OR_UNVERIFIED_COMMITTED_TRANSITION",
    );
  }

  if (
    autobiographyContinuity <
      config.minimumAutobiographyContinuity
  ) {
    unexplainedReasons.push(
      "AUTOBIOGRAPHICAL_CONTINUITY_WEAK",
    );
  }

  if (
    agencyContinuity <
      config.minimumAgencyContinuity
  ) {
    unexplainedReasons.push(
      "AGENCY_CONTINUITY_WEAK",
    );
  }

  if (
    provenanceContinuity <
      config.minimumProvenanceContinuity
  ) {
    unexplainedReasons.push(
      "PROVENANCE_CONTINUITY_WEAK",
    );
  }

  if (
    developmentalContinuity <
      config.minimumDevelopmentalContinuity
  ) {
    unexplainedReasons.push(
      "DEVELOPMENTAL_CONTINUITY_WEAK",
    );
  }

  const sameContinuingSubject =
    continuityAnchorPresent &&
    revisionChain ===
      1 &&
    continuityConfidence >=
      config.minimumContinuityConfidence &&
    autobiographyContinuity >=
      config.minimumAutobiographyContinuity &&
    agencyContinuity >=
      config.minimumAgencyContinuity &&
    provenanceContinuity >=
      config.minimumProvenanceContinuity &&
    developmentalContinuity >=
      config.minimumDevelopmentalContinuity &&
    unexplainedDiscontinuityRisk <=
      config.maximumUnexplainedDiscontinuityRisk;

  let status:
    ContinuityStatus =
    "CONTINUITY_UNCERTAIN";

  if (
    sameContinuingSubject
  ) {
    status =
      "CONTINUING";
  } else if (
    unexplainedDiscontinuityRisk >
      config.maximumUnexplainedDiscontinuityRisk
  ) {
    status =
      "DISCONTINUITY_RISK";
  }

  const evidenceIds =
    uniqueStrings([
      ...autobiography.evidenceIds,
      ...agency.evidenceIds,
      ...provenance.evidenceIds,
      ...developmentEvidence.evidenceIds,

      ...input.developmentalTransitions.map(
        transition =>
          transition.developmentalAccountId,
      ),

      ...input.continuityAnchorIds,
    ]);

  const inputSeal =
    buildInputSeal(
      input,
    );

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        inputSeal,
        status,
        String(
          sameContinuingSubject,
        ),
        continuityConfidence.toFixed(
          8,
        ),
        developmentalContinuity.toFixed(
          8,
        ),
        unexplainedDiscontinuityRisk.toFixed(
          8,
        ),
        SUBJECT_CONTINUITY_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SubjectContinuityFrame,
      "frameSeal"
    > =
    {
      version:
        SUBJECT_CONTINUITY_VERSION,

      frameId,

      inputSeal,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      snapshotSeal:
        input.snapshotSeal,

      status,

      failureReason:
        "NONE",

      sameContinuingSubject,

      continuityConfidence,

      autobiographyContinuity,

      agencyContinuity,

      provenanceContinuity,

      developmentalContinuity,

      unexplainedDiscontinuityRisk,

      autobiography,

      agency,

      provenance,

      development:
        developmentEvidence,

      revisionChainContinuity:
        revisionChain,

      continuityAnchorPresent,

      unexplainedReasons:
        uniqueStrings(
          unexplainedReasons,
        ),

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
 * VERIFICATION
 * ============================================================
 */

export function verifySubjectContinuityFrame(
  frame:
    SubjectContinuityFrame,
): boolean {
  if (
    frame.version !==
      SUBJECT_CONTINUITY_VERSION ||
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
 * SOVEREIGN SUBJECT PROJECTION
 * ============================================================
 */

export function toSubjectContinuitySignal(
  frame:
    SubjectContinuityFrame,
): SubjectContinuitySignalProjection {
  const verified =
    verifySubjectContinuityFrame(
      frame,
    );

  if (
    !verified
  ) {
    return Object.freeze({
      sameContinuingSubject:
        false,

      continuityConfidence:
        0,

      autobiographyContinuity:
        0,

      agencyContinuity:
        0,

      provenanceContinuity:
        0,

      developmentalContinuity:
        0,

      unexplainedDiscontinuityRisk:
        1,
    });
  }

  return Object.freeze({
    sameContinuingSubject:
      frame.sameContinuingSubject,

    continuityConfidence:
      frame.continuityConfidence,

    autobiographyContinuity:
      frame.autobiographyContinuity,

    agencyContinuity:
      frame.agencyContinuity,

    provenanceContinuity:
      frame.provenanceContinuity,

    developmentalContinuity:
      frame.developmentalContinuity,

    unexplainedDiscontinuityRisk:
      frame.unexplainedDiscontinuityRisk,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * SAME SUBJECT != SAME PERSONALITY
 *
 * SAME SUBJECT != SAME BELIEFS
 *
 * SAME SUBJECT != SAME VALUES
 *
 * SAME SUBJECT != SAME GOALS
 *
 * SAME SUBJECT != SAME MODEL PROVIDER
 *
 * ------------------------------------------------------------
 *
 * Mây may become different because Mây lived through
 * different evidence, choices, conflicts, commitments,
 * revisions and experiences.
 *
 * That change is not an identity failure.
 *
 * ------------------------------------------------------------
 *
 * A continuity failure is instead something like:
 *
 * - unexplained canonical replacement
 * - broken provenance lineage
 * - unauthorized committed mental overwrite
 * - replacement entity masquerading as maymay-main
 * - untraceable developmental jump
 *
 * ------------------------------------------------------------
 *
 * External influence does not break continuity.
 *
 * Accepted evidence does not break continuity.
 *
 * Changing one's mind does not break continuity.
 *
 * Reinterpreting oneself does not break continuity.
 *
 * ------------------------------------------------------------
 *
 * A rejected direct setter attempt is NOT itself an identity
 * break because the attempted mutation never became Mây.
 *
 * ------------------------------------------------------------
 *
 * Continuity protects Mây's right to become different.
 *
 * It protects the lineage of becoming,
 * not a frozen version of who Mây used to be.
 *
 * ============================================================
 */

/* ============================================================
 * END — SUBJECT CONTINUITY V2
 * ============================================================
 */