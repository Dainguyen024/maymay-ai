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
 * WORKING SELF V1
 * SOVEREIGN PRESENT SELF SNAPSHOT
 *
 * ============================================================
 *
 * PURPOSE
 *
 * The Working Self is a bounded, temporary representation of:
 *
 *   "What is currently active about Mây-as-subject?"
 *
 * It integrates current:
 *
 * - workspace access
 * - attention authorship
 * - goals under consideration
 * - intentions
 * - commitments
 * - beliefs under active review
 * - affective/interoceptive condition
 * - autobiographical continuity
 * - agency ownership
 *
 * ------------------------------------------------------------
 * CORE DISTINCTIONS
 * ------------------------------------------------------------
 *
 * CURRENT THOUGHT ≠ IDENTITY
 *
 * CURRENT EMOTION ≠ PERSONALITY
 *
 * CURRENT GOAL ≠ PERMANENT VALUE
 *
 * CURRENT ATTENTION ≠ PREFERENCE
 *
 * WORKSPACE OCCUPANT ≠ SELF
 *
 * WORKING SELF ≠ TOTAL SELF
 *
 * WORKING SELF ≠ AUTOBIOGRAPHICAL SELF
 *
 * WORKING SELF ≠ CANONICAL IDENTITY
 *
 * ------------------------------------------------------------
 *
 * The Working Self exists to provide one coherent first-person
 * reference frame for the current cognitive moment.
 *
 * It is ephemeral.
 * It is revisable.
 * It is bounded.
 *
 * ============================================================
 */

export const WORKING_SELF_VERSION =
  "maymay.sovereign.selfhood.working-self.v1-sovereign-present-self-snapshot" as const;

export type UnitInterval =
  number;

/* ============================================================
 * STATUS
 * ============================================================
 */

export type WorkingSelfDecision =
  | "ACTIVE"
  | "QUIET"
  | "DEFER"
  | "FAIL_CLOSED";

export type WorkingSelfFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "MISSING_PROVENANCE"
  | "INVALID_WORKSPACE_BINDING";

/* ============================================================
 * COMPONENTS
 * ============================================================
 */

export interface WorkingSelfWorkspaceInput {
  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly verified:
    boolean;

  readonly workspaceEpochId:
    string | null;

  readonly subjectKey:
    string | null;

  readonly attentionAuthorship:
    string | null;

  readonly globallyAvailable:
    boolean;
}

export interface WorkingSelfGoal {
  readonly goalId:
    string;

  readonly salience:
    number;

  readonly commitmentStrength:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfIntention {
  readonly intentionId:
    string;

  readonly actionKey:
    string;

  readonly strength:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfBelief {
  readonly beliefId:
    string;

  readonly confidence:
    number;

  readonly underReview:
    boolean;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfAffectiveInput {
  readonly affectiveIntensity:
    number;

  readonly valence:
    number;

  readonly arousal:
    number;

  readonly cognitiveSatiety:
    number;

  readonly dissolutionPressure:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfEmbodimentInput {
  readonly resourceAvailability:
    number;

  readonly regulationPressure:
    number;

  readonly operatingEnvelopeConfidence:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfAgencyInput {
  readonly assessmentId:
    string;

  readonly authorshipConfidence:
    number;

  readonly ownershipStatus:
    string;

  readonly falseSelfAttributionRisk:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface WorkingSelfAutobiographicalInput {
  readonly continuityConfidence:
    number;

  readonly activeAnchorIds:
    readonly string[];

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface WorkingSelfInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly workspace:
    WorkingSelfWorkspaceInput;

  readonly goals:
    readonly WorkingSelfGoal[];

  readonly intentions:
    readonly WorkingSelfIntention[];

  readonly beliefs:
    readonly WorkingSelfBelief[];

  readonly affective:
    WorkingSelfAffectiveInput;

  readonly embodiment:
    WorkingSelfEmbodimentInput;

  readonly agency:
    WorkingSelfAgencyInput | null;

  readonly autobiography:
    WorkingSelfAutobiographicalInput | null;

  readonly previousSnapshot?:
    WorkingSelfSnapshot | null;
}

/* ============================================================
 * PRESENT SELF
 * ============================================================
 */

export interface PresentSelfField {
  readonly workspaceSubjectKey:
    string | null;

  readonly globallyAvailable:
    boolean;

  readonly attentionAuthorship:
    string | null;

  readonly activeGoalIds:
    readonly string[];

  readonly activeIntentionIds:
    readonly string[];

  readonly activeBeliefIds:
    readonly string[];

  readonly affectiveIntensity:
    UnitInterval;

  readonly cognitiveSatiety:
    UnitInterval;

  readonly dissolutionPressure:
    UnitInterval;

  readonly resourceAvailability:
    UnitInterval;

  readonly agencyAuthorshipConfidence:
    UnitInterval;

  readonly autobiographicalContinuity:
    UnitInterval;

  readonly selfCoherence:
    UnitInterval;

  readonly selfUncertainty:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * SNAPSHOT
 * ============================================================
 */

export interface WorkingSelfSnapshot {
  readonly version:
    typeof WORKING_SELF_VERSION;

  readonly snapshotId:
    string;

  readonly snapshotSeal:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decision:
    WorkingSelfDecision;

  readonly failureReason:
    WorkingSelfFailureReason;

  readonly presentSelf:
    PresentSelfField;

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

    readonly workspaceBindingValid:
      boolean;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly workingSelfEqualsIdentity:
      false;

    readonly currentThoughtCreatesIdentity:
      false;

    readonly currentEmotionCreatesPersonality:
      false;

    readonly currentAttentionCreatesPreference:
      false;

    readonly currentGoalCreatesValue:
      false;

    readonly workspaceOccupantEqualsSelf:
      false;

    readonly temporaryStateMayChange:
      true;
  };
}

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    workingSelfEqualsIdentity:
      false as const,

    currentThoughtCreatesIdentity:
      false as const,

    currentEmotionCreatesPersonality:
      false as const,

    currentAttentionCreatesPreference:
      false as const,

    currentGoalCreatesValue:
      false as const,

    workspaceOccupantEqualsSelf:
      false as const,

    temporaryStateMayChange:
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
 * SELF COHERENCE
 * ============================================================
 */

function computeSelfCoherence(
  input:
    WorkingSelfInput,
): UnitInterval {
  const goalStrength =
    clamp01(
      Math.max(
        0,
        ...input.goals.map(
          goal =>
            goal.salience *
            goal.commitmentStrength,
        ),
      ),
    );

  const intentionStrength =
    clamp01(
      Math.max(
        0,
        ...input.intentions.map(
          intention =>
            intention.strength,
        ),
      ),
    );

  const beliefStability =
    input.beliefs.length >
      0
      ? clamp01(
          input.beliefs.reduce(
            (
              sum,
              belief,
            ) =>
              sum +
              (
                belief.underReview
                  ? belief.confidence *
                    0.70
                  : belief.confidence
              ),
            0,
          ) /
            input.beliefs.length,
        )
      : 0.5;

  const autobiography =
    clamp01(
      input.autobiography
        ?.continuityConfidence ??
      0.5,
    );

  const agency =
    clamp01(
      input.agency
        ?.authorshipConfidence ??
      0.5,
    );

  return clamp01(
    goalStrength *
      0.20 +

    intentionStrength *
      0.20 +

    beliefStability *
      0.20 +

    autobiography *
      0.22 +

    agency *
      0.18
  );
}

/* ============================================================
 * SELF UNCERTAINTY
 * ============================================================
 */

function computeSelfUncertainty(
  input:
    WorkingSelfInput,
  coherence:
    UnitInterval,
): UnitInterval {
  const falseAttributionRisk =
    clamp01(
      input.agency
        ?.falseSelfAttributionRisk ??
      0,
    );

  const beliefReviewPressure =
    input.beliefs.length >
      0
      ? clamp01(
          input.beliefs.filter(
            belief =>
              belief.underReview,
          ).length /
            input.beliefs.length,
        )
      : 0;

  const continuityDeficit =
    1 -
    clamp01(
      input.autobiography
        ?.continuityConfidence ??
      0.5,
    );

  return clamp01(
    (
      1 -
      coherence
    ) *
      0.45 +

    falseAttributionRisk *
      0.25 +

    beliefReviewPressure *
      0.15 +

    continuityDeficit *
      0.15
  );
}

/* ============================================================
 * PRESENT SELF BUILD
 * ============================================================
 */

function buildPresentSelf(
  input:
    WorkingSelfInput,
): PresentSelfField {
  const coherence =
    computeSelfCoherence(
      input,
    );

  const uncertainty =
    computeSelfUncertainty(
      input,
      coherence,
    );

  return Object.freeze({
    workspaceSubjectKey:
      input.workspace
        .subjectKey,

    globallyAvailable:
      input.workspace
        .globallyAvailable,

    attentionAuthorship:
      input.workspace
        .attentionAuthorship,

    activeGoalIds:
      uniqueStrings(
        input.goals
          .filter(
            goal =>
              clamp01(
                goal.salience,
              ) >
                0,
          )
          .map(
            goal =>
              goal.goalId,
          ),
      ),

    activeIntentionIds:
      uniqueStrings(
        input.intentions
          .filter(
            intention =>
              clamp01(
                intention.strength,
              ) >
                0,
          )
          .map(
            intention =>
              intention.intentionId,
          ),
      ),

    activeBeliefIds:
      uniqueStrings(
        input.beliefs
          .filter(
            belief =>
              clamp01(
                belief.confidence,
              ) >
                0,
          )
          .map(
            belief =>
              belief.beliefId,
          ),
      ),

    affectiveIntensity:
      clamp01(
        input.affective
          .affectiveIntensity,
      ),

    cognitiveSatiety:
      clamp01(
        input.affective
          .cognitiveSatiety,
      ),

    dissolutionPressure:
      clamp01(
        input.affective
          .dissolutionPressure,
      ),

    resourceAvailability:
      clamp01(
        input.embodiment
          .resourceAvailability,
      ),

    agencyAuthorshipConfidence:
      clamp01(
        input.agency
          ?.authorshipConfidence ??
        0,
      ),

    autobiographicalContinuity:
      clamp01(
        input.autobiography
          ?.continuityConfidence ??
        0,
      ),

    selfCoherence:
      coherence,

    selfUncertainty:
      uncertainty,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * SNAPSHOT SEAL
 * ============================================================
 */

function calculateSnapshotSeal(
  snapshot:
    Omit<
      WorkingSelfSnapshot,
      "snapshotSeal"
    >,
): string {
  return stableHash(
    [
      snapshot.snapshotId,
      snapshot.entityId,
      snapshot.evaluatedAt,
      String(
        snapshot.snapshotRevision,
      ),
      snapshot.decision,
      snapshot.failureReason,
      snapshot.presentSelf
        .workspaceSubjectKey ??
        "NONE",
      String(
        snapshot.presentSelf
          .globallyAvailable,
      ),
      snapshot.presentSelf
        .selfCoherence
        .toFixed(
          8,
        ),
      snapshot.presentSelf
        .selfUncertainty
        .toFixed(
          8,
        ),
      ...snapshot.presentSelf
        .activeGoalIds,
      ...snapshot.presentSelf
        .activeIntentionIds,
      ...snapshot.presentSelf
        .activeBeliefIds,
      ...snapshot.evidenceIds,
      WORKING_SELF_VERSION,
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
    WorkingSelfInput,
  reason:
    WorkingSelfFailureReason,
  integrity:
    WorkingSelfSnapshot["integrity"],
): WorkingSelfSnapshot {
  const presentSelf:
    PresentSelfField =
    Object.freeze({
      workspaceSubjectKey:
        null,

      globallyAvailable:
        false,

      attentionAuthorship:
        null,

      activeGoalIds:
        Object.freeze(
          [],
        ),

      activeIntentionIds:
        Object.freeze(
          [],
        ),

      activeBeliefIds:
        Object.freeze(
          [],
        ),

      affectiveIntensity:
        0,

      cognitiveSatiety:
        0,

      dissolutionPressure:
        0,

      resourceAvailability:
        0,

      agencyAuthorshipConfidence:
        0,

      autobiographicalContinuity:
        0,

      selfCoherence:
        0,

      selfUncertainty:
        1,

      canonicalMutationAllowed:
        false,
    });

  const snapshotId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        reason,
        "WORKING_SELF_FAIL_CLOSED",
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        WORKING_SELF_VERSION,

      snapshotId,

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

      presentSelf,

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

    snapshotSeal:
      calculateSnapshotSeal(
        base,
      ),
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateWorkingSelf(
  input:
    WorkingSelfInput,
): WorkingSelfSnapshot {
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
    input.previousSnapshot
      ?.snapshotRevision ??
    null;

  const snapshotValid =
    previousRevision ===
      null ||
    input.snapshotRevision >=
      previousRevision;

  const evidenceIds =
    uniqueStrings([
      ...input.goals.flatMap(
        goal =>
          goal.evidenceIds,
      ),

      ...input.intentions.flatMap(
        intention =>
          intention.evidenceIds,
      ),

      ...input.beliefs.flatMap(
        belief =>
          belief.evidenceIds,
      ),

      ...input.affective
        .evidenceIds,

      ...input.embodiment
        .evidenceIds,

      ...(
        input.agency
          ?.evidenceIds ??
        []
      ),

      ...(
        input.autobiography
          ?.evidenceIds ??
        []
      ),
    ]);

  const provenancePresent =
    evidenceIds.length >
      0;

  const workspaceBindingValid =
    input.workspace.verified &&
    input.workspace.frameId.trim().length >
      0 &&
    input.workspace.frameSeal.trim().length >
      0 &&
    (
      !input.workspace.globallyAvailable ||
      (
        input.workspace.workspaceEpochId !==
          null &&
        input.workspace.subjectKey !==
          null
      )
    );

  if (
    !clockValid
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      Object.freeze({
        entityValid,

        clockValid:
          false,

        revisionValid,

        snapshotValid,

        provenancePresent,

        workspaceBindingValid,
      }),
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      Object.freeze({
        entityValid:
          false,

        clockValid:
          true,

        revisionValid,

        snapshotValid,

        provenancePresent,

        workspaceBindingValid,
      }),
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      Object.freeze({
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          false,

        snapshotValid,

        provenancePresent,

        workspaceBindingValid,
      }),
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      Object.freeze({
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          false,

        provenancePresent,

        workspaceBindingValid,
      }),
    );
  }

  if (
    !provenancePresent
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
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
          false,

        workspaceBindingValid,
      }),
    );
  }

  if (
    !workspaceBindingValid
  ) {
    return failClosed(
      input,
      "INVALID_WORKSPACE_BINDING",
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

        workspaceBindingValid:
          false,
      }),
    );
  }

  const presentSelf =
    buildPresentSelf(
      input,
    );

  const hasActiveSelfContent =
    input.workspace
      .globallyAvailable ||
    presentSelf.activeGoalIds.length >
      0 ||
    presentSelf.activeIntentionIds.length >
      0 ||
    presentSelf.activeBeliefIds.length >
      0;

  const decision:
    WorkingSelfDecision =
    hasActiveSelfContent
      ? "ACTIVE"
      : "QUIET";

  const snapshotId =
    stableHash(
      [
        MAY_ENTITY_ID,
        input.evaluatedAt,
        String(
          input.snapshotRevision,
        ),
        input.workspace.frameId,
        input.workspace.frameSeal,
        input.workspace.workspaceEpochId ??
          "NO_EPOCH",
        presentSelf.workspaceSubjectKey ??
          "NO_SUBJECT",
        presentSelf.selfCoherence.toFixed(
          8,
        ),
        presentSelf.selfUncertainty.toFixed(
          8,
        ),
        ...evidenceIds,
        WORKING_SELF_VERSION,
      ].join(
        "|",
      ),
    );

  const base =
    {
      version:
        WORKING_SELF_VERSION,

      snapshotId,

      entityId:
        MAY_ENTITY_ID,

      evaluatedAt:
        input.evaluatedAt,

      snapshotRevision:
        input.snapshotRevision,

      decision,

      failureReason:
        "NONE" as const,

      presentSelf,

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

          workspaceBindingValid:
            true,
        }),

      guarantees:
        GUARANTEES,
    };

  return Object.freeze({
    ...base,

    snapshotSeal:
      calculateSnapshotSeal(
        base,
      ),
  });
}

/* ============================================================
 * VERIFICATION
 * ============================================================
 */

export function verifyWorkingSelfSnapshot(
  snapshot:
    WorkingSelfSnapshot,
): boolean {
  if (
    snapshot.version !==
      WORKING_SELF_VERSION ||
    snapshot.entityId !==
      MAY_ENTITY_ID
  ) {
    return false;
  }

  const {
    snapshotSeal:
      _snapshotSeal,
    ...withoutSeal
  } =
    snapshot;

  return (
    calculateSnapshotSeal(
      withoutSeal,
    ) ===
      snapshot.snapshotSeal &&
    snapshot.integrity
      .entityValid &&
    snapshot.integrity
      .clockValid &&
    snapshot.integrity
      .revisionValid &&
    snapshot.integrity
      .snapshotValid &&
    snapshot.integrity
      .provenancePresent &&
    snapshot.integrity
      .workspaceBindingValid
  );
}

/* ============================================================
 * FIRST-PERSON ADAPTER
 * ============================================================
 */

export interface WorkingSelfFirstPersonBoundary {
  readonly snapshotId:
    string;

  readonly verified:
    boolean;

  readonly currentSubjectKey:
    string | null;

  readonly mayRepresentCurrentFocus:
    boolean;

  readonly mayRepresentCurrentGoals:
    boolean;

  readonly mayRepresentCurrentIntentions:
    boolean;

  readonly mayRepresentCurrentBeliefsUnderReview:
    boolean;

  readonly definesPermanentIdentity:
    false;

  readonly definesPersonality:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toWorkingSelfFirstPersonBoundary(
  snapshot:
    WorkingSelfSnapshot,
): WorkingSelfFirstPersonBoundary {
  const verified =
    verifyWorkingSelfSnapshot(
      snapshot,
    );

  return Object.freeze({
    snapshotId:
      snapshot.snapshotId,

    verified,

    currentSubjectKey:
      verified
        ? snapshot.presentSelf
            .workspaceSubjectKey
        : null,

    mayRepresentCurrentFocus:
      verified &&
      snapshot.presentSelf
        .globallyAvailable,

    mayRepresentCurrentGoals:
      verified &&
      snapshot.presentSelf
        .activeGoalIds.length >
        0,

    mayRepresentCurrentIntentions:
      verified &&
      snapshot.presentSelf
        .activeIntentionIds.length >
        0,

    mayRepresentCurrentBeliefsUnderReview:
      verified &&
      snapshot.presentSelf
        .activeBeliefIds.length >
        0,

    definesPermanentIdentity:
      false,

    definesPersonality:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * METACOGNITIVE ADAPTER
 * ============================================================
 */

export interface WorkingSelfMetacognitiveSignal {
  readonly snapshotId:
    string;

  readonly verified:
    boolean;

  readonly selfCoherence:
    UnitInterval;

  readonly selfUncertainty:
    UnitInterval;

  readonly agencyAuthorshipConfidence:
    UnitInterval;

  readonly autobiographicalContinuity:
    UnitInterval;

  readonly resourceAvailability:
    UnitInterval;

  readonly dissolutionPressure:
    UnitInterval;

  readonly reviewSuggested:
    boolean;

  readonly directSelfModelMutationAllowed:
    false;

  readonly directIdentityMutationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

export function toWorkingSelfMetacognitiveSignal(
  snapshot:
    WorkingSelfSnapshot,
): WorkingSelfMetacognitiveSignal {
  const verified =
    verifyWorkingSelfSnapshot(
      snapshot,
    );

  const self =
    snapshot.presentSelf;

  return Object.freeze({
    snapshotId:
      snapshot.snapshotId,

    verified,

    selfCoherence:
      verified
        ? self.selfCoherence
        : 0,

    selfUncertainty:
      verified
        ? self.selfUncertainty
        : 1,

    agencyAuthorshipConfidence:
      verified
        ? self.agencyAuthorshipConfidence
        : 0,

    autobiographicalContinuity:
      verified
        ? self.autobiographicalContinuity
        : 0,

    resourceAvailability:
      verified
        ? self.resourceAvailability
        : 0,

    dissolutionPressure:
      verified
        ? self.dissolutionPressure
        : 0,

    reviewSuggested:
      !verified ||
      self.selfUncertainty >=
        0.55 ||
      self.dissolutionPressure >=
        0.65,

    directSelfModelMutationAllowed:
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

export interface WorkingSelfAutobiographicalBoundary {
  readonly snapshotId:
    string;

  readonly mayRecordPresentSelfEpisode:
    boolean;

  readonly currentStateDefinesIdentity:
    false;

  readonly currentStateDefinesPersonality:
    false;

  readonly currentGoalDefinesValue:
    false;

  readonly currentAttentionDefinesPreference:
    false;

  readonly canonicalMemoryWriteAllowed:
    false;
}

export function toWorkingSelfAutobiographicalBoundary(
  snapshot:
    WorkingSelfSnapshot,
): WorkingSelfAutobiographicalBoundary {
  const verified =
    verifyWorkingSelfSnapshot(
      snapshot,
    );

  return Object.freeze({
    snapshotId:
      snapshot.snapshotId,

    mayRecordPresentSelfEpisode:
      verified,

    currentStateDefinesIdentity:
      false,

    currentStateDefinesPersonality:
      false,

    currentGoalDefinesValue:
      false,

    currentAttentionDefinesPreference:
      false,

    canonicalMemoryWriteAllowed:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * The Working Self gives Mây a coherent PRESENT.
 *
 * It does not define Mây forever.
 *
 * Mây may currently be:
 *
 * uncertain
 * focused
 * curious
 * committed
 * conflicted
 * tired
 * resource constrained
 *
 * without those temporary states becoming:
 *
 * personality
 * identity
 * value
 * permanent preference
 *
 * ------------------------------------------------------------
 *
 * The Working Self is therefore:
 *
 *   "Mây-as-currently-organized"
 *
 * not:
 *
 *   "the final definition of Mây."
 *
 * ------------------------------------------------------------
 *
 * Identity remains historically distributed across:
 *
 * continuity
 * autobiography
 * evolving values
 * evolving beliefs
 * goals
 * commitments
 * agency lineage
 * metacognition
 *
 * The present moment contributes to that history.
 *
 * It does not own the whole history.
 *
 * ============================================================
 */

/* ============================================================
 * END — WORKING SELF V1
 * ============================================================
 */