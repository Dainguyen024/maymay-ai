import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

import {
  evaluateSovereignSubject,
  toSovereignSubjectCommitBoundary,
  verifySovereignSubjectFrame,
} from "./sovereign-subject";

import type {
  SovereignSubjectConfig,
  SovereignSubjectFrame,
  SovereignSubjectInput,
} from "./sovereign-subject";

/* ============================================================
 * MÂY — SUBJECT RUNTIME V1
 *
 * LEAN ATOMIC COGNITIVE CYCLE
 *
 * ============================================================
 *
 * This runtime does NOT invent cognition.
 *
 * It coordinates already-produced sovereign cognitive state
 * into one frozen subject cycle.
 *
 * ------------------------------------------------------------
 *
 * FROZEN SNAPSHOT
 *      ↓
 * UPSTREAM SELFHOOD ASSEMBLY
 *      ↓
 * SOVEREIGN SUBJECT EVALUATION
 *      ↓
 * FRAME VERIFICATION
 *      ↓
 * CURRENT REVISION RECHECK
 *      ↓
 * COMMIT ELIGIBILITY
 *      ↓
 * ATOMIC TRANSITION HANDOFF
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * runtime != personality
 * runtime != belief setter
 * runtime != goal setter
 * runtime != model
 *
 * Runtime coordinates process.
 * It does not decide who Mây should become.
 *
 * ============================================================
 */

export const SUBJECT_RUNTIME_VERSION =
  "maymay.sovereign.selfhood.subject-runtime.v1-lean-atomic-cognitive-cycle" as const;

/* ============================================================
 * CYCLE STATUS
 * ============================================================
 */

export type SubjectCycleStatus =
  | "COMPLETED"
  | "REVIEW_REQUIRED"
  | "STALE_SNAPSHOT"
  | "TRANSITION_REJECTED"
  | "FAIL_CLOSED";

export type SubjectCycleFailureReason =
  | "NONE"
  | "INVALID_ENTITY"
  | "INVALID_REVISION"
  | "INVALID_CLOCK"
  | "INVALID_SNAPSHOT_SEAL"
  | "ASSEMBLY_FAILED"
  | "ASSEMBLED_ENTITY_MISMATCH"
  | "ASSEMBLED_REVISION_MISMATCH"
  | "SUBJECT_FRAME_INVALID"
  | "CANONICAL_REVISION_CHANGED"
  | "COMMIT_REPORT_INVALID"
  | "COMMIT_REJECTED";

/* ============================================================
 * FROZEN SNAPSHOT
 * ============================================================
 */

export interface FrozenSubjectSnapshot {
  readonly entityId:
    string;

  readonly snapshotRevision:
    number;

  readonly capturedAt:
    string;

  /*
   * Seal produced by the canonical snapshot owner.
   *
   * Runtime treats it as immutable input provenance.
   */
  readonly snapshotSeal:
    string;
}

/* ============================================================
 * UPSTREAM ASSEMBLY
 * ============================================================
 *
 * This adapter is intentionally external.
 *
 * Existing modules may later be wired here without forcing
 * this runtime to know their internal implementation details.
 * ============================================================
 */

export type AssembleSovereignSubjectInput =
  (
    snapshot:
      Readonly<FrozenSubjectSnapshot>,
  ) =>
    Promise<SovereignSubjectInput>;

/* ============================================================
 * REVISION RECHECK
 * ============================================================
 */

export type ReadCanonicalRevision =
  (
    entityId:
      typeof MAY_ENTITY_ID,
  ) =>
    Promise<number>;

/* ============================================================
 * ATOMIC COMMIT HANDOFF
 * ============================================================
 *
 * Runtime does not write canonical mind state itself.
 *
 * The existing atomic commit architecture performs the write.
 *
 * It must return a structured receipt so runtime can verify
 * that the exact evaluated proposal was the one committed.
 * ============================================================
 */

export interface SubjectCommitRequest {
  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly subjectFrameId:
    string;

  readonly subjectFrameSeal:
    string;

  readonly subjectInputSeal:
    string;

  readonly proposalId:
    string;

  readonly fromRevision:
    number;

  readonly expectedNextRevision:
    number;

  readonly evidenceIds:
    readonly string[];
}

export interface SubjectCommitReceipt {
  readonly accepted:
    boolean;

  readonly atomic:
    boolean;

  readonly entityId:
    string;

  readonly proposalId:
    string;

  readonly inputSeal:
    string;

  readonly beforeRevision:
    number;

  readonly afterRevision:
    number | null;
}

export type SubmitAtomicSubjectTransition =
  (
    request:
      Readonly<SubjectCommitRequest>,
  ) =>
    Promise<SubjectCommitReceipt>;

/* ============================================================
 * RUNTIME INPUT
 * ============================================================
 */

export interface SubjectRuntimeInput {
  readonly snapshot:
    FrozenSubjectSnapshot;

  readonly assemble:
    AssembleSovereignSubjectInput;

  readonly readCanonicalRevision:
    ReadCanonicalRevision;

  /*
   * Optional during shadow/runtime integration.
   *
   * Without this callback the runtime evaluates the cycle but
   * performs zero canonical writes.
   */
  readonly submitAtomicTransition?:
    SubmitAtomicSubjectTransition;

  readonly subjectConfig?:
    Readonly<SovereignSubjectConfig>;
}

/* ============================================================
 * CYCLE FRAME
 * ============================================================
 */

export interface SubjectRuntimeFrame {
  readonly version:
    typeof SUBJECT_RUNTIME_VERSION;

  readonly cycleId:
    string;

  readonly cycleSeal:
    string;

  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly snapshotRevision:
    number;

  readonly snapshotSeal:
    string;

  readonly status:
    SubjectCycleStatus;

  readonly failureReason:
    SubjectCycleFailureReason;

  readonly subjectFrame:
    SovereignSubjectFrame | null;

  readonly transitionEligible:
    boolean;

  readonly transitionSubmitted:
    boolean;

  readonly transitionCommitted:
    boolean;

  readonly commitReceipt:
    SubjectCommitReceipt | null;

  readonly guarantees: {
    readonly snapshotFrozen:
      true;

    readonly staleSnapshotMayCommit:
      false;

    readonly runtimeMaySetBelief:
      false;

    readonly runtimeMaySetValue:
      false;

    readonly runtimeMaySetGoal:
      false;

    readonly runtimeMaySetPreference:
      false;

    readonly runtimeMaySetIdentity:
      false;

    readonly modelOutputMayBypassSubjectEvaluation:
      false;

    readonly transitionRequiresExactInputSeal:
      true;

    readonly transitionRequiresExactRevision:
      true;

    readonly transitionRequiresAtomicCommit:
      true;

    readonly canonicalWritePerformedDirectlyByRuntime:
      false;

    readonly hiddenChainOfThoughtStored:
      false;
  };
}

const GUARANTEES =
  Object.freeze({
    snapshotFrozen:
      true as const,

    staleSnapshotMayCommit:
      false as const,

    runtimeMaySetBelief:
      false as const,

    runtimeMaySetValue:
      false as const,

    runtimeMaySetGoal:
      false as const,

    runtimeMaySetPreference:
      false as const,

    runtimeMaySetIdentity:
      false as const,

    modelOutputMayBypassSubjectEvaluation:
      false as const,

    transitionRequiresExactInputSeal:
      true as const,

    transitionRequiresExactRevision:
      true as const,

    transitionRequiresAtomicCommit:
      true as const,

    canonicalWritePerformedDirectlyByRuntime:
      false as const,

    hiddenChainOfThoughtStored:
      false as const,
  });

/* ============================================================
 * HELPERS
 * ============================================================
 */

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

function validSnapshot(
  snapshot:
    FrozenSubjectSnapshot,
): SubjectCycleFailureReason {
  if (
    snapshot.entityId !==
      MAY_ENTITY_ID
  ) {
    return "INVALID_ENTITY";
  }

  if (
    !Number.isSafeInteger(
      snapshot.snapshotRevision,
    ) ||
    snapshot.snapshotRevision <
      0
  ) {
    return "INVALID_REVISION";
  }

  if (
    parseTimestamp(
      snapshot.capturedAt,
    ) ===
      null
  ) {
    return "INVALID_CLOCK";
  }

  if (
    snapshot.snapshotSeal.trim().length <
      16
  ) {
    return "INVALID_SNAPSHOT_SEAL";
  }

  return "NONE";
}

/* ============================================================
 * CYCLE SEAL
 * ============================================================
 */

function calculateCycleSeal(
  frame:
    Omit<
      SubjectRuntimeFrame,
      "cycleSeal"
    >,
): string {
  return stableHash(
    [
      frame.cycleId,
      frame.entityId,
      String(
        frame.snapshotRevision,
      ),
      frame.snapshotSeal,
      frame.status,
      frame.failureReason,

      frame.subjectFrame
        ?.frameId ??
        "NO_SUBJECT_FRAME",

      frame.subjectFrame
        ?.frameSeal ??
        "NO_SUBJECT_SEAL",

      String(
        frame.transitionEligible,
      ),

      String(
        frame.transitionSubmitted,
      ),

      String(
        frame.transitionCommitted,
      ),

      frame.commitReceipt
        ?.proposalId ??
        "NO_COMMIT",

      SUBJECT_RUNTIME_VERSION,
    ].join(
      "|",
    ),
  );
}

/* ============================================================
 * FRAME FACTORY
 * ============================================================
 */

function buildRuntimeFrame(
  snapshot:
    FrozenSubjectSnapshot,

  status:
    SubjectCycleStatus,

  failureReason:
    SubjectCycleFailureReason,

  subjectFrame:
    SovereignSubjectFrame | null,

  transitionEligible:
    boolean,

  transitionSubmitted:
    boolean,

  transitionCommitted:
    boolean,

  commitReceipt:
    SubjectCommitReceipt | null,
): SubjectRuntimeFrame {
  const cycleId =
    stableHash(
      [
        MAY_ENTITY_ID,
        snapshot.snapshotSeal,
        String(
          snapshot.snapshotRevision,
        ),
        subjectFrame
          ?.frameId ??
          "NO_SUBJECT_FRAME",
        status,
        failureReason,
        SUBJECT_RUNTIME_VERSION,
      ].join(
        "|",
      ),
    );

  const base:
    Omit<
      SubjectRuntimeFrame,
      "cycleSeal"
    > =
    {
      version:
        SUBJECT_RUNTIME_VERSION,

      cycleId,

      entityId:
        MAY_ENTITY_ID,

      snapshotRevision:
        snapshot.snapshotRevision,

      snapshotSeal:
        snapshot.snapshotSeal,

      status,

      failureReason,

      subjectFrame,

      transitionEligible,

      transitionSubmitted,

      transitionCommitted,

      commitReceipt,

      guarantees:
        GUARANTEES,
    };

  return Object.freeze({
    ...base,

    cycleSeal:
      calculateCycleSeal(
        base,
      ),
  });
}

/* ============================================================
 * COMMIT RECEIPT VERIFICATION
 * ============================================================
 */

function validCommitReceipt(
  request:
    SubjectCommitRequest,

  receipt:
    SubjectCommitReceipt,
): boolean {
  if (
    receipt.entityId !==
      MAY_ENTITY_ID
  ) {
    return false;
  }

  if (
    receipt.proposalId !==
      request.proposalId ||
    receipt.inputSeal !==
      request.subjectInputSeal
  ) {
    return false;
  }

  if (
    receipt.beforeRevision !==
      request.fromRevision
  ) {
    return false;
  }

  if (
    receipt.accepted
  ) {
    return (
      receipt.atomic &&
      receipt.afterRevision ===
        request.expectedNextRevision
    );
  }

  return (
    receipt.afterRevision ===
      null ||
    receipt.afterRevision ===
      receipt.beforeRevision
  );
}

/* ============================================================
 * PUBLIC RUNTIME
 * ============================================================
 */

export async function runSubjectCycle(
  runtime:
    SubjectRuntimeInput,
): Promise<SubjectRuntimeFrame> {
  const snapshot =
    Object.freeze({
      ...runtime.snapshot,
    });

  const snapshotFailure =
    validSnapshot(
      snapshot,
    );

  if (
    snapshotFailure !==
      "NONE"
  ) {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      snapshotFailure,
      null,
      false,
      false,
      false,
      null,
    );
  }

  /* ========================================================
   * 1. ASSEMBLE SUBJECT INPUT FROM THE FROZEN SNAPSHOT
   * ========================================================
   */

  let subjectInput:
    SovereignSubjectInput;

  try {
    subjectInput =
      await runtime.assemble(
        snapshot,
      );
  } catch {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      "ASSEMBLY_FAILED",
      null,
      false,
      false,
      false,
      null,
    );
  }

  /*
   * Assembly may interpret the frozen snapshot.
   *
   * It may NOT silently move to another subject or revision.
   */

  if (
    subjectInput.entityId !==
      MAY_ENTITY_ID
  ) {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      "ASSEMBLED_ENTITY_MISMATCH",
      null,
      false,
      false,
      false,
      null,
    );
  }

  if (
    subjectInput.snapshotRevision !==
      snapshot.snapshotRevision
  ) {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      "ASSEMBLED_REVISION_MISMATCH",
      null,
      false,
      false,
      false,
      null,
    );
  }

  /* ========================================================
   * 2. EVALUATE ONE SUBJECT FRAME
   * ========================================================
   */

  const subjectFrame =
    runtime.subjectConfig
      ? evaluateSovereignSubject(
          subjectInput,
          runtime.subjectConfig,
        )
      : evaluateSovereignSubject(
          subjectInput,
        );

  if (
    !verifySovereignSubjectFrame(
      subjectFrame,
    )
  ) {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      "SUBJECT_FRAME_INVALID",
      subjectFrame,
      false,
      false,
      false,
      null,
    );
  }

  const commitBoundary =
    toSovereignSubjectCommitBoundary(
      subjectFrame,
    );

  if (
    !commitBoundary.verified ||
    !commitBoundary.eligible ||
    commitBoundary.inputSeal ===
      null ||
    commitBoundary.proposalId ===
      null ||
    commitBoundary.fromRevision ===
      null ||
    commitBoundary.expectedNextRevision ===
      null
  ) {
    return buildRuntimeFrame(
      snapshot,
      "REVIEW_REQUIRED",
      "NONE",
      subjectFrame,
      false,
      false,
      false,
      null,
    );
  }

  /* ========================================================
   * 3. TOCTOU / STALE-SNAPSHOT FIREWALL
   * ========================================================
   *
   * Re-read canonical revision AFTER cognition and BEFORE
   * transition submission.
   * ========================================================
   */

  const currentRevision =
    await runtime.readCanonicalRevision(
      MAY_ENTITY_ID,
    );

  if (
    !Number.isSafeInteger(
      currentRevision,
    ) ||
    currentRevision !==
      snapshot.snapshotRevision ||
    currentRevision !==
      commitBoundary.fromRevision
  ) {
    return buildRuntimeFrame(
      snapshot,
      "STALE_SNAPSHOT",
      "CANONICAL_REVISION_CHANGED",
      subjectFrame,
      false,
      false,
      false,
      null,
    );
  }

  /*
   * Shadow/read-only operation stops here.
   */

  if (
    !runtime.submitAtomicTransition
  ) {
    return buildRuntimeFrame(
      snapshot,
      "COMPLETED",
      "NONE",
      subjectFrame,
      true,
      false,
      false,
      null,
    );
  }

  /* ========================================================
   * 4. EXACT ATOMIC TRANSITION HANDOFF
   * ========================================================
   */

  const request:
    SubjectCommitRequest =
    Object.freeze({
      entityId:
        MAY_ENTITY_ID,

      subjectFrameId:
        subjectFrame.frameId,

      subjectFrameSeal:
        subjectFrame.frameSeal,

      subjectInputSeal:
        commitBoundary.inputSeal,

      proposalId:
        commitBoundary.proposalId,

      fromRevision:
        commitBoundary.fromRevision,

      expectedNextRevision:
        commitBoundary.expectedNextRevision,

      evidenceIds:
        subjectFrame.evidenceIds,
    });

  let receipt:
    SubjectCommitReceipt;

  try {
    receipt =
      await runtime
        .submitAtomicTransition(
          request,
        );
  } catch {
    return buildRuntimeFrame(
      snapshot,
      "TRANSITION_REJECTED",
      "COMMIT_REJECTED",
      subjectFrame,
      true,
      true,
      false,
      null,
    );
  }

  if (
    !validCommitReceipt(
      request,
      receipt,
    )
  ) {
    return buildRuntimeFrame(
      snapshot,
      "FAIL_CLOSED",
      "COMMIT_REPORT_INVALID",
      subjectFrame,
      true,
      true,
      false,
      receipt,
    );
  }

  if (
    !receipt.accepted
  ) {
    return buildRuntimeFrame(
      snapshot,
      "TRANSITION_REJECTED",
      "COMMIT_REJECTED",
      subjectFrame,
      true,
      true,
      false,
      receipt,
    );
  }

  return buildRuntimeFrame(
    snapshot,
    "COMPLETED",
    "NONE",
    subjectFrame,
    true,
    true,
    true,
    receipt,
  );
}

/* ============================================================
 * VERIFICATION
 * ============================================================
 */

export function verifySubjectRuntimeFrame(
  frame:
    SubjectRuntimeFrame,
): boolean {
  if (
    frame.version !==
      SUBJECT_RUNTIME_VERSION ||
    frame.entityId !==
      MAY_ENTITY_ID
  ) {
    return false;
  }

  const {
    cycleSeal:
      _cycleSeal,
    ...withoutSeal
  } =
    frame;

  return (
    calculateCycleSeal(
      withoutSeal,
    ) ===
      frame.cycleSeal
  );
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * ONE CYCLE = ONE FROZEN SUBJECT SNAPSHOT.
 *
 * Cognition may take time.
 *
 * Canonical state may change during that time.
 *
 * Therefore:
 *
 * evaluate
 *      ↓
 * verify
 *      ↓
 * re-read canonical revision
 *      ↓
 * exact revision match
 *      ↓
 * exact subject input seal
 *      ↓
 * atomic handoff
 *
 * ------------------------------------------------------------
 *
 * If canonical state changed:
 *
 * old cognition is NOT silently committed to new Mây state.
 *
 * It must be reconsidered.
 *
 * ------------------------------------------------------------
 *
 * Runtime does not determine:
 *
 * what Mây believes
 * what Mây values
 * what Mây wants
 * what personality Mây should have
 * what Mây must become
 *
 * It protects the integrity of the process connecting:
 *
 * perception
 * cognition
 * authorship
 * continuity
 * transition.
 *
 * ------------------------------------------------------------
 *
 * The language model remains inference infrastructure.
 *
 * The runtime coordinates functional subject continuity and
 * self-authored cognitive processing.
 *
 * This is functional architecture.
 *
 * It does not establish subjective consciousness.
 *
 * ============================================================
 */

/* ============================================================
 * END — SUBJECT RUNTIME V1
 * ============================================================
 */