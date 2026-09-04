import {
  createHash,
  randomUUID,
} from "node:crypto";

import type {
  CognitiveTurnWorkspace,
  WorkspaceStage,
} from "@/lib/maymay/sovereign/workspace";

import {
  buildCognitiveFrame,
  verifyCognitiveFrame,
  type CognitiveFrame,
  type CognitionProposal,
} from "@/lib/maymay/sovereign/cognition-kernel";

import {
  prepareAtomicMindCommit,
  type AtomicMindCommit,
} from "@/lib/maymay/sovereign/atomic-commit";

import {
  MAYMAY_ENTITY_ID,
} from "@/lib/maymay/sovereign/repository";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * MIND ORCHESTRATOR V5
 * ============================================================
 *
 * ONE ENTITY.
 * ONE TURN LINEAGE.
 * ONE FROZEN MIND.
 * ONE LOCKED DECISION.
 * ONE ATOMIC COMMIT CANDIDATE.
 *
 * The orchestrator is NOT Mây's personality.
 * It is NOT Mây's beliefs.
 * It is NOT Mây's emotion.
 * It is NOT Mây's agency.
 *
 * It is the causal execution kernel that prevents
 * Mây's cognitive processes from corrupting each other.
 *
 * ============================================================
 */

export const MIND_ORCHESTRATOR_VERSION =
  "maymay.sovereign.mind-orchestrator.v5" as const;

/* ============================================================
 * PHASE MODEL
 * ============================================================
 */

export type MindPhase =
  | "COGNITION"
  | "APPRAISAL"
  | "RESONANCE"
  | "METACOGNITION"
  | "AGENCY"
  | "SOVEREIGNTY"
  | "EXPRESSION"
  | "VALIDATION"
  | "COMMIT_PREPARATION"
  | "COMPLETE"
  | "ABORTED";

/* ============================================================
 * TURN IDENTITY
 * ============================================================
 *
 * Once a turn begins, these identifiers cannot drift.
 *
 * Mây cannot silently become:
 *
 * maymay-main
 *      ↓
 * maymay-main-copy
 *
 * nor can Actor A's turn become Actor B's turn.
 * ============================================================
 */

export type FrozenTurnIdentity = Readonly<{
  entityId: string;

  actorId: string;

  turnId: string;

  eventId: string;

  snapshotRevision: number;
}>;

/* ============================================================
 * DECISION LOCK
 * ============================================================
 *
 * Once Agency has selected:
 *
 * action
 * behaviorPlan
 *
 * later stages may only:
 *
 * VALIDATE
 * REJECT
 * EXPRESS
 *
 * They may NOT secretly decide again.
 * ============================================================
 */

export type DecisionLock = Readonly<{
  action: string;

  agencySeal: string;

  behaviorPlanSeal: string;

  combinedSeal: string;
}>;

/* ============================================================
 * SOVEREIGNTY RESULT
 * ============================================================
 */

export type SovereigntyPassResult = Readonly<{
  accepted: boolean;

  action: string | null;

  policySeal?: string | null;

  reasonSummary: string;
}>;

/* ============================================================
 * PASS CONTEXT
 * ============================================================
 */

export type MindPassContext = Readonly<{
  runId: string;

  identity:
    FrozenTurnIdentity;

  cognitiveFrame:
    CognitiveFrame;

  cognitionSeal: string;

  frozenMindSeal: string;

  decisionLock:
    DecisionLock | null;
}>;

/* ============================================================
 * RUNTIME ADAPTER CONTRACT
 * ============================================================
 *
 * Each module receives the CURRENT workspace and returns
 * a NEW workspace.
 *
 * CONTRACT:
 *
 * - no DB writes
 * - no transaction
 * - no canonical mutation
 * - no mutation of input workspace
 * - no cross-actor state access
 * - no hidden re-decision
 *
 * ============================================================
 */

export type MindRuntimeAdapter = Readonly<{
  appraisal: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;

  resonance: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;

  metacognition: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;

  agency: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;

  sovereignty: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    SovereigntyPassResult
  >;

  expression: (
    workspace:
      CognitiveTurnWorkspace,

    sovereignty:
      SovereigntyPassResult,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;

  validation: (
    workspace:
      CognitiveTurnWorkspace,

    context:
      MindPassContext,
  ) => Promise<
    CognitiveTurnWorkspace
  >;
}>;

/* ============================================================
 * ABORT MODEL
 * ============================================================
 */

export type MindAbortCode =
  | "WRONG_ENTITY"
  | "INVALID_INITIAL_STAGE"
  | "TURN_IDENTITY_DRIFT"
  | "FROZEN_MIND_MUTATED"
  | "COGNITION_INVALID"
  | "COGNITION_MUTATED"
  | "INPUT_WORKSPACE_MUTATED"
  | "STAGE_TRANSITION_INVALID"
  | "APPRAISAL_FAILED"
  | "RESONANCE_FAILED"
  | "METACOGNITION_FAILED"
  | "AGENCY_FAILED"
  | "AGENCY_DECISION_INVALID"
  | "DECISION_LOCK_VIOLATED"
  | "SOVEREIGNTY_REJECTED"
  | "SOVEREIGNTY_ACTION_MISMATCH"
  | "EXPRESSION_FAILED"
  | "EXPRESSION_ACTION_MISMATCH"
  | "VALIDATION_FAILED"
  | "COMMIT_PREPARATION_FAILED"
  | "COMMIT_LINEAGE_MISMATCH"
  | "RUNTIME_FAILURE";

export type MindAbort = Readonly<{
  code: MindAbortCode;

  phase: MindPhase;

  reasonSummary: string;

  retryable: boolean;
}>;

/* ============================================================
 * AUDIT RECEIPT
 * ============================================================
 *
 * No free-form chain-of-thought.
 *
 * This is structural provenance only.
 * ============================================================
 */

export type PhaseReceipt = Readonly<{
  sequence: number;

  phase: MindPhase;

  workspaceStage:
    WorkspaceStage;

  inputSeal: string | null;

  outputSeal: string | null;

  artifactSeal: string | null;

  previousReceiptSeal:
    string | null;

  receiptSeal: string;

  durationMs: number;

  timestamp: string;

  summary: string;
}>;

export type MindTrace = Readonly<{
  version:
    typeof MIND_ORCHESTRATOR_VERSION;

  runId: string;

  entityId: string;

  actorId: string;

  turnId: string;

  eventId: string;

  receipts:
    readonly PhaseReceipt[];

  traceSeal: string;
}>;

/* ============================================================
 * RESULT MODEL
 * ============================================================
 */

export type MindTurnSuccess = Readonly<{
  status: "READY_TO_COMMIT";

  runId: string;

  identity:
    FrozenTurnIdentity;

  workspace:
    CognitiveTurnWorkspace;

  cognition:
    CognitiveFrame;

  decisionLock:
    DecisionLock;

  atomicCommit:
    AtomicMindCommit;

  trace:
    MindTrace;
}>;

export type MindTurnFailure = Readonly<{
  status: "ABORTED";

  runId: string;

  identity:
    FrozenTurnIdentity;

  workspace:
    CognitiveTurnWorkspace;

  cognition:
    CognitiveFrame | null;

  decisionLock:
    DecisionLock | null;

  abort:
    MindAbort;

  trace:
    MindTrace;
}>;

export type MindTurnResult =
  | MindTurnSuccess
  | MindTurnFailure;

/* ============================================================
 * STAGE CONTRACT
 * ============================================================
 */

const STAGES:
  Readonly<
    Record<
      MindPhase,
      Readonly<{
        before:
          readonly WorkspaceStage[];

        after:
          readonly WorkspaceStage[];
      }>
    >
  > = Object.freeze({
    COGNITION: {
      before: [
        "created",
      ],

      after: [
        "created",
      ],
    },

    APPRAISAL: {
      before: [
        "created",
      ],

      after: [
        "appraisal",
      ],
    },

    RESONANCE: {
      before: [
        "appraisal",
      ],

      after: [
        "resonance",
      ],
    },

    METACOGNITION: {
      before: [
        "resonance",
      ],

      after: [
        "metacognition",
      ],
    },

    AGENCY: {
      before: [
        "metacognition",
      ],

      after: [
        "agency",
      ],
    },

    SOVEREIGNTY: {
      before: [
        "agency",
      ],

      after: [
        "agency",
      ],
    },

    EXPRESSION: {
      before: [
        "agency",
      ],

      after: [
        "expression",
      ],
    },

    VALIDATION: {
      before: [
        "expression",
      ],

      after: [
        "validated",
      ],
    },

    COMMIT_PREPARATION: {
      before: [
        "validated",
      ],

      after: [
        "validated",
      ],
    },

    COMPLETE: {
      before: [
        "validated",
      ],

      after: [
        "validated",
      ],
    },

    ABORTED: {
      before: [
        "created",
        "appraisal",
        "resonance",
        "metacognition",
        "agency",
        "expression",
        "validated",
        "aborted",
      ],

      after: [
        "created",
        "appraisal",
        "resonance",
        "metacognition",
        "agency",
        "expression",
        "validated",
        "aborted",
      ],
    },
  });

/* ============================================================
 * SAFE OBJECT HELPERS
 * ============================================================
 */

function record(
  value: unknown,
): Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  )
    ? value as Record<
        string,
        unknown
      >
    : {};
}

function safeText(
  value: unknown,
  max = 500,
): string {
  return typeof value ===
    "string"
    ? value
        .trim()
        .slice(
          0,
          max,
        )
    : "";
}

/* ============================================================
 * CANONICAL SERIALIZATION
 * ============================================================
 */

function stableSerialize(
  value: unknown,
): string {
  if (
    value === null
  ) {
    return "null";
  }

  switch (
    typeof value
  ) {
    case "string":
      return JSON.stringify(
        value,
      );

    case "number":
      return Number.isFinite(
        value,
      )
        ? JSON.stringify(
            value,
          )
        : JSON.stringify(
            String(value),
          );

    case "boolean":
      return value
        ? "true"
        : "false";

    case "bigint":
      return JSON.stringify(
        `${value.toString()}n`,
      );

    case "undefined":
      return '"__undefined__"';

    case "function":
      return '"__function__"';

    case "symbol":
      return JSON.stringify(
        String(value),
      );
  }

  if (
    value instanceof Date
  ) {
    return JSON.stringify(
      value.toISOString(),
    );
  }

  if (
    Array.isArray(value)
  ) {
    return `[${value
      .map(stableSerialize)
      .join(",")}]`;
  }

  const source =
    value as Record<
      string,
      unknown
    >;

  const keys =
    Object.keys(
      source,
    ).sort();

  return `{${keys
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          source[key],
        )}`,
    )
    .join(",")}}`;
}

function seal(
  value: unknown,
): string {
  return createHash(
    "sha256",
  )
    .update(
      stableSerialize(value),
    )
    .digest("hex");
}

/* ============================================================
 * TURN IDENTITY
 * ============================================================
 */

function snapshotRevisionOf(
  workspace:
    CognitiveTurnWorkspace,
): number {
  const raw =
    Number(
      (
        workspace as unknown as {
          snapshotRevision?:
            unknown;
        }
      ).snapshotRevision,
    );

  if (
    Number.isSafeInteger(raw) &&
    raw >= 0
  ) {
    return raw;
  }

  const frozenMind =
    record(
      workspace.frozenMind,
    );

  const revision =
    Number(
      frozenMind.revision,
    );

  return (
    Number.isSafeInteger(
      revision,
    ) &&
    revision >= 0
  )
    ? revision
    : 0;
}

function captureIdentity(
  workspace:
    CognitiveTurnWorkspace,
): FrozenTurnIdentity {
  return Object.freeze({
    entityId:
      workspace.entityId,

    actorId:
      workspace.actorId,

    turnId:
      workspace.turnId,

    eventId:
      workspace.eventId,

    snapshotRevision:
      snapshotRevisionOf(
        workspace,
      ),
  });
}

function assertIdentity(
  workspace:
    CognitiveTurnWorkspace,

  identity:
    FrozenTurnIdentity,
): void {
  if (
    workspace.entityId !==
      identity.entityId ||
    workspace.actorId !==
      identity.actorId ||
    workspace.turnId !==
      identity.turnId ||
    workspace.eventId !==
      identity.eventId ||
    snapshotRevisionOf(
      workspace,
    ) !==
      identity.snapshotRevision
  ) {
    throw new MindRuntimeError(
      "TURN_IDENTITY_DRIFT",

      "Turn identity changed during cognitive execution.",

      false,
    );
  }
}

/* ============================================================
 * STAGE ASSERTIONS
 * ============================================================
 */

function assertBefore(
  phase: MindPhase,

  workspace:
    CognitiveTurnWorkspace,
): void {
  if (
    !STAGES[
      phase
    ].before.includes(
      workspace.stage,
    )
  ) {
    throw new MindRuntimeError(
      "STAGE_TRANSITION_INVALID",

      `${phase} cannot begin from stage ${workspace.stage}.`,

      false,
    );
  }
}

function assertAfter(
  phase: MindPhase,

  workspace:
    CognitiveTurnWorkspace,
): void {
  if (
    !STAGES[
      phase
    ].after.includes(
      workspace.stage,
    )
  ) {
    throw new MindRuntimeError(
      "STAGE_TRANSITION_INVALID",

      `${phase} produced invalid stage ${workspace.stage}.`,

      false,
    );
  }
}

/* ============================================================
 * RUNTIME ERROR
 * ============================================================
 */

class MindRuntimeError
  extends Error {
  readonly code:
    MindAbortCode;

  readonly retryable:
    boolean;

  constructor(
    code:
      MindAbortCode,

    message: string,

    retryable:
      boolean,
  ) {
    super(message);

    this.name =
      "MindRuntimeError";

    this.code =
      code;

    this.retryable =
      retryable;
  }
}

/* ============================================================
 * TRACE BUILDER
 * ============================================================
 */

class TraceBuilder {
  private readonly receipts:
    PhaseReceipt[] = [];

  constructor(
    private readonly runId:
      string,

    private readonly identity:
      FrozenTurnIdentity,
  ) {}

  add(
    args: {
      phase: MindPhase;

      workspaceStage:
        WorkspaceStage;

      inputSeal?:
        string | null;

      outputSeal?:
        string | null;

      artifact?: unknown;

      durationMs?: number;

      summary: string;
    },
  ): void {
    const previousReceiptSeal =
      this.receipts.length
        ? this.receipts[
            this.receipts.length -
            1
          ].receiptSeal
        : null;

    const body = {
      sequence:
        this.receipts.length +
        1,

      phase:
        args.phase,

      workspaceStage:
        args.workspaceStage,

      inputSeal:
        args.inputSeal ??
        null,

      outputSeal:
        args.outputSeal ??
        null,

      artifactSeal:
        args.artifact ===
          undefined
          ? null
          : seal(
              args.artifact,
            ),

      previousReceiptSeal,

      durationMs:
        Math.max(
          0,
          Math.round(
            args.durationMs ??
              0,
          ),
        ),

      timestamp:
        new Date()
          .toISOString(),

      summary:
        safeText(
          args.summary,
          500,
        ),
    };

    const receipt:
      PhaseReceipt =
      Object.freeze({
        ...body,

        receiptSeal:
          seal(body),
      });

    this.receipts.push(
      receipt,
    );
  }

  build():
    MindTrace {
    const body = {
      version:
        MIND_ORCHESTRATOR_VERSION,

      runId:
        this.runId,

      entityId:
        this.identity
          .entityId,

      actorId:
        this.identity
          .actorId,

      turnId:
        this.identity
          .turnId,

      eventId:
        this.identity
          .eventId,

      receipts:
        this.receipts.map(
          item =>
            structuredClone(
              item,
            ),
        ),
    };

    return Object.freeze({
      ...body,

      traceSeal:
        seal(body),
    });
  }
}

/* ============================================================
 * FROZEN MIND GUARD
 * ============================================================
 */

function assertFrozenMind(
  workspace:
    CognitiveTurnWorkspace,

  expectedSeal:
    string,
): void {
  if (
    seal(
      workspace.frozenMind,
    ) !==
      expectedSeal
  ) {
    throw new MindRuntimeError(
      "FROZEN_MIND_MUTATED",

      "Frozen sovereign snapshot was modified during the turn.",

      false,
    );
  }
}

/* ============================================================
 * COGNITION GUARD
 * ============================================================
 */

function assertCognition(
  cognition:
    CognitiveFrame,

  expectedSeal:
    string,
): void {
  if (
    cognition.frameSeal !==
      expectedSeal ||
    !verifyCognitiveFrame(
      cognition,
    )
  ) {
    throw new MindRuntimeError(
      "COGNITION_MUTATED",

      "Frozen cognitive frame changed after cognition was established.",

      false,
    );
  }
}

/* ============================================================
 * AGENCY EXTRACTION
 * ============================================================
 */

function agencyActionOf(
  workspace:
    CognitiveTurnWorkspace,
): string | null {
  const agency =
    record(
      workspace
        .provisional
        .agencyDecision,
    );

  const action =
    safeText(
      agency.selectedAction ??
        agency.action,
      80,
    );

  return action ||
    null;
}

function planActionOf(
  workspace:
    CognitiveTurnWorkspace,
): string | null {
  const plan =
    record(
      workspace
        .provisional
        .behaviorPlan,
    );

  const action =
    safeText(
      plan.action,
      80,
    );

  return action ||
    null;
}

function expressionActionOf(
  workspace:
    CognitiveTurnWorkspace,
): string | null {
  const expression =
    record(
      workspace
        .provisional
        .expression,
    );

  const action =
    safeText(
      expression.action,
      80,
    );

  return action ||
    null;
}

/* ============================================================
 * DECISION LOCK
 * ============================================================
 */

function createDecisionLock(
  workspace:
    CognitiveTurnWorkspace,
): DecisionLock {
  const action =
    agencyActionOf(
      workspace,
    );

  const planAction =
    planActionOf(
      workspace,
    );

  if (
    !action ||
    !planAction ||
    action !==
      planAction
  ) {
    throw new MindRuntimeError(
      "AGENCY_DECISION_INVALID",

      "Agency decision and BehaviorPlan do not agree on one action.",

      false,
    );
  }

  const agencySeal =
    seal(
      workspace
        .provisional
        .agencyDecision,
    );

  const behaviorPlanSeal =
    seal(
      workspace
        .provisional
        .behaviorPlan,
    );

  return Object.freeze({
    action,

    agencySeal,

    behaviorPlanSeal,

    combinedSeal:
      seal({
        action,

        agencySeal,

        behaviorPlanSeal,
      }),
  });
}

function assertDecisionLock(
  workspace:
    CognitiveTurnWorkspace,

  lock:
    DecisionLock,
): void {
  const action =
    agencyActionOf(
      workspace,
    );

  const planAction =
    planActionOf(
      workspace,
    );

  const agencySeal =
    seal(
      workspace
        .provisional
        .agencyDecision,
    );

  const planSeal =
    seal(
      workspace
        .provisional
        .behaviorPlan,
    );

  if (
    action !==
      lock.action ||
    planAction !==
      lock.action ||
    agencySeal !==
      lock.agencySeal ||
    planSeal !==
      lock.behaviorPlanSeal
  ) {
    throw new MindRuntimeError(
      "DECISION_LOCK_VIOLATED",

      "A downstream phase attempted to alter the locked Agency decision.",

      false,
    );
  }
}

/* ============================================================
 * CONTEXT
 * ============================================================
 */

function createContext(
  args: {
    runId: string;

    identity:
      FrozenTurnIdentity;

    cognition:
      CognitiveFrame;

    frozenMindSeal:
      string;

    decisionLock:
      DecisionLock | null;
  },
): MindPassContext {
  return Object.freeze({
    runId:
      args.runId,

    identity:
      args.identity,

    cognitiveFrame:
      args.cognition,

    cognitionSeal:
      args.cognition
        .frameSeal,

    frozenMindSeal:
      args.frozenMindSeal,

    decisionLock:
      args.decisionLock,
  });
}

/* ============================================================
 * GENERIC WORKSPACE PASS
 * ============================================================
 *
 * This wrapper provides:
 *
 * - stage validation
 * - input immutability detection
 * - turn identity guard
 * - frozen mind guard
 * - cognition guard
 * - decision lock guard
 * - audit receipt
 *
 * ============================================================
 */

async function runWorkspacePass(
  args: {
    phase:
      MindPhase;

    workspace:
      CognitiveTurnWorkspace;

    identity:
      FrozenTurnIdentity;

    cognition:
      CognitiveFrame;

    cognitionSeal:
      string;

    frozenMindSeal:
      string;

    decisionLock:
      DecisionLock | null;

    trace:
      TraceBuilder;

    invoke: (
      workspace:
        CognitiveTurnWorkspace,
    ) => Promise<
      CognitiveTurnWorkspace
    >;

    summary: string;
  },
): Promise<
  CognitiveTurnWorkspace
> {
  assertBefore(
    args.phase,
    args.workspace,
  );

  assertIdentity(
    args.workspace,
    args.identity,
  );

  assertFrozenMind(
    args.workspace,
    args.frozenMindSeal,
  );

  assertCognition(
    args.cognition,
    args.cognitionSeal,
  );

  if (
    args.decisionLock
  ) {
    assertDecisionLock(
      args.workspace,
      args.decisionLock,
    );
  }

  /*
   * Seal the exact object supplied to the module.
   *
   * After awaiting the module, seal it again.
   *
   * If changed:
   * module mutated its input object in-place.
   */
  const inputObjectSeal =
    seal(
      args.workspace,
    );

  const started =
    performance.now();

  const next =
    await args.invoke(
      args.workspace,
    );

  const durationMs =
    performance.now() -
    started;

  if (
    !next ||
    typeof next !==
      "object"
  ) {
    throw new MindRuntimeError(
      "RUNTIME_FAILURE",

      `${args.phase} returned no valid workspace.`,

      false,
    );
  }

  const originalAfterSeal =
    seal(
      args.workspace,
    );

  if (
    originalAfterSeal !==
      inputObjectSeal
  ) {
    throw new MindRuntimeError(
      "INPUT_WORKSPACE_MUTATED",

      `${args.phase} mutated its input workspace in-place.`,

      false,
    );
  }

  assertAfter(
    args.phase,
    next,
  );

  assertIdentity(
    next,
    args.identity,
  );

  assertFrozenMind(
    next,
    args.frozenMindSeal,
  );

  assertCognition(
    args.cognition,
    args.cognitionSeal,
  );

  if (
    args.decisionLock
  ) {
    assertDecisionLock(
      next,
      args.decisionLock,
    );
  }

  args.trace.add({
    phase:
      args.phase,

    workspaceStage:
      next.stage,

    inputSeal:
      inputObjectSeal,

    outputSeal:
      seal(next),

    durationMs,

    summary:
      args.summary,
  });

  return next;
}

/* ============================================================
 * COMMIT LINEAGE
 * ============================================================
 */

function assertCommitLineage(
  commit:
    AtomicMindCommit,

  identity:
    FrozenTurnIdentity,

  decisionLock:
    DecisionLock,
): void {
  if (
    commit.entityId !==
      identity.entityId ||
    commit.actorId !==
      identity.actorId ||
    commit.turnId !==
      identity.turnId ||
    commit.eventId !==
      identity.eventId ||
    commit.expectedRevision !==
      identity.snapshotRevision ||
    commit.targetRevision !==
      identity.snapshotRevision +
        1
  ) {
    throw new MindRuntimeError(
      "COMMIT_LINEAGE_MISMATCH",

      "Atomic commit does not belong to the frozen cognitive turn lineage.",

      false,
    );
  }

  const decision =
    record(
      commit.decision
        .agencyDecision,
    );

  const plan =
    record(
      commit.decision
        .behaviorPlan,
    );

  const expression =
    record(
      commit.decision
        .expression,
    );

  const agencyAction =
    safeText(
      decision.selectedAction ??
        decision.action,
      80,
    );

  const planAction =
    safeText(
      plan.action,
      80,
    );

  const expressionAction =
    safeText(
      expression.action,
      80,
    );

  if (
    agencyAction !==
      decisionLock.action ||
    planAction !==
      decisionLock.action ||
    expressionAction !==
      decisionLock.action
  ) {
    throw new MindRuntimeError(
      "COMMIT_LINEAGE_MISMATCH",

      "Atomic commit changed the locked action lineage.",

      false,
    );
  }
}

/* ============================================================
 * FAILURE MAPPING
 * ============================================================
 */

function failureCodeForPhase(
  phase:
    MindPhase,
): MindAbortCode {
  switch (phase) {
    case "APPRAISAL":
      return "APPRAISAL_FAILED";

    case "RESONANCE":
      return "RESONANCE_FAILED";

    case "METACOGNITION":
      return "METACOGNITION_FAILED";

    case "AGENCY":
      return "AGENCY_FAILED";

    case "EXPRESSION":
      return "EXPRESSION_FAILED";

    case "VALIDATION":
      return "VALIDATION_FAILED";

    case "COMMIT_PREPARATION":
      return "COMMIT_PREPARATION_FAILED";

    default:
      return "RUNTIME_FAILURE";
  }
}

/* ============================================================
 * MAIN ORCHESTRATOR
 * ============================================================
 */

export async function orchestrateMindTurn(
  initialWorkspace:
    CognitiveTurnWorkspace,

  cognitionProposal:
    CognitionProposal | unknown,

  runtime:
    MindRuntimeAdapter,
): Promise<
  MindTurnResult
> {
  const runId =
    randomUUID();

  const identity =
    captureIdentity(
      initialWorkspace,
    );

  const trace =
    new TraceBuilder(
      runId,
      identity,
    );

  let workspace =
    initialWorkspace;

  let cognition:
    CognitiveFrame | null =
    null;

  let decisionLock:
    DecisionLock | null =
    null;

  let phase:
    MindPhase =
    "COGNITION";

  /*
   * FrozenMind represents Mây at the exact
   * beginning of this turn.
   *
   * No cognitive module may rewrite history
   * halfway through reasoning.
   */
  const frozenMindSeal =
    seal(
      initialWorkspace
        .frozenMind,
    );

  try {
    /* ========================================================
     * ENTITY INVARIANT
     * ========================================================
     */

    if (
      identity.entityId !==
        MAYMAY_ENTITY_ID
    ) {
      throw new MindRuntimeError(
        "WRONG_ENTITY",

        `Sovereign runtime only accepts canonical entity ${MAYMAY_ENTITY_ID}.`,

        false,
      );
    }

    if (
      workspace.stage !==
        "created"
    ) {
      throw new MindRuntimeError(
        "INVALID_INITIAL_STAGE",

        `Mind turn must begin at created stage, received ${workspace.stage}.`,

        false,
      );
    }

    /* ========================================================
     * COGNITION
     * ========================================================
     */

    phase =
      "COGNITION";

    assertBefore(
      phase,
      workspace,
    );

    const cognitionStarted =
      performance.now();

    cognition =
      buildCognitiveFrame(
        workspace,
        cognitionProposal,
      );

    const cognitionDuration =
      performance.now() -
      cognitionStarted;

    if (
      !verifyCognitiveFrame(
        cognition,
      )
    ) {
      throw new MindRuntimeError(
        "COGNITION_INVALID",

        "Cognition Kernel produced an invalid sealed frame.",

        false,
      );
    }
const activeCognition: CognitiveFrame = cognition;
    const cognitionSeal =
      cognition.frameSeal;

    assertIdentity(
      workspace,
      identity,
    );

    assertFrozenMind(
      workspace,
      frozenMindSeal,
    );

    assertAfter(
      phase,
      workspace,
    );

    trace.add({
      phase,

      workspaceStage:
        workspace.stage,

      inputSeal:
        seal(
          initialWorkspace,
        ),

      outputSeal:
        seal(
          workspace,
        ),

      artifact:
        {
          cognitionSeal,

          uncertainty:
            cognition
              .uncertainty
              .overall,

          reconsiderationPressure:
            cognition
              .metacognitiveSignals
              .reconsiderationPressure,
        },

      durationMs:
        cognitionDuration,

      summary:
        "Immutable structured cognitive frame established.",
    });

    /* ========================================================
     * APPRAISAL
     * ========================================================
     */

    phase =
      "APPRAISAL";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock:
          null,

        trace,

        invoke:
          current =>
            runtime.appraisal(
              current,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock:
                  null,
              }),
            ),

        summary:
          "Meaning appraisal completed without canonical state mutation.",
      });

    /* ========================================================
     * RESONANCE
     * ========================================================
     */

    phase =
      "RESONANCE";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock:
          null,

        trace,

        invoke:
          current =>
            runtime.resonance(
              current,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock:
                  null,
              }),
            ),

        summary:
          "Affective resonance evolved from appraisal and frozen continuity.",
      });

    /* ========================================================
     * METACOGNITION
     * ========================================================
     */

    phase =
      "METACOGNITION";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock:
          null,

        trace,

        invoke:
          current =>
            runtime.metacognition(
              current,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock:
                  null,
              }),
            ),

        summary:
          "Interpretation, uncertainty, bias and conflicts were structurally reviewed.",
      });

    /* ========================================================
     * AGENCY
     * ========================================================
     */

    phase =
      "AGENCY";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock:
          null,

        trace,

        invoke:
          current =>
            runtime.agency(
              current,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock:
                  null,
              }),
            ),

        summary:
          "Agency produced one provisional action and BehaviorPlan.",
      });

    /*
     * This is the decision event horizon.
     *
     * Everything after this point may validate,
     * reject or phrase the action.
     *
     * Nothing may replace it.
     */

    decisionLock =
      createDecisionLock(
        workspace,
      );

    trace.add({
      phase:
        "AGENCY",

      workspaceStage:
        workspace.stage,

      artifact: {
        decisionLock:
          decisionLock
            .combinedSeal,

        action:
          decisionLock
            .action,
      },

      summary:
        "Agency decision permanently locked for the remainder of this turn.",
    });

    /* ========================================================
     * SOVEREIGNTY
     * ========================================================
     */

    phase =
      "SOVEREIGNTY";

    assertBefore(
      phase,
      workspace,
    );

    assertDecisionLock(
      workspace,
      decisionLock,
    );

    assertFrozenMind(
      workspace,
      frozenMindSeal,
    );

    assertCognition(
      cognition,
      cognitionSeal,
    );

    const sovereignInputSeal =
      seal(
        workspace,
      );

    const sovereigntyStarted =
      performance.now();

    const sovereignty =
      await runtime.sovereignty(
        workspace,

        createContext({
          runId,
          identity,
          cognition,
          frozenMindSeal,
          decisionLock,
        }),
      );

    const sovereigntyDuration =
      performance.now() -
      sovereigntyStarted;

    /*
     * Sovereignty is validator,
     * never replacement Agency.
     */

    if (
      !sovereignty.accepted
    ) {
      throw new MindRuntimeError(
        "SOVEREIGNTY_REJECTED",

        sovereignty
          .reasonSummary ||
          "Sovereignty gate rejected the locked decision.",

        true,
      );
    }

    if (
      sovereignty.action !==
        decisionLock.action
    ) {
      throw new MindRuntimeError(
        "SOVEREIGNTY_ACTION_MISMATCH",

        "Sovereignty gate attempted to substitute the locked action.",

        false,
      );
    }

    if (
      seal(
        workspace,
      ) !==
        sovereignInputSeal
    ) {
      throw new MindRuntimeError(
        "INPUT_WORKSPACE_MUTATED",

        "Sovereignty gate mutated the workspace in-place.",

        false,
      );
    }

    assertDecisionLock(
      workspace,
      decisionLock,
    );

    assertAfter(
      phase,
      workspace,
    );

    trace.add({
      phase,

      workspaceStage:
        workspace.stage,

      inputSeal:
        sovereignInputSeal,

      outputSeal:
        seal(
          workspace,
        ),

      artifact: {
        accepted:
          true,

        action:
          sovereignty.action,

        policySeal:
          sovereignty
            .policySeal ??
          null,
      },

      durationMs:
        sovereigntyDuration,

      summary:
        "Sovereignty accepted the locked decision without replacing it.",
    });

    /* ========================================================
     * EXPRESSION
     * ========================================================
     */

    phase =
      "EXPRESSION";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock,

        trace,

        invoke:
          current =>
            runtime.expression(
              current,

              sovereignty,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock,
              }),
            ),

        summary:
          "Expression rendered the locked behavior without changing the decision.",
      });

    if (
      expressionActionOf(
        workspace,
      ) !==
        decisionLock.action
    ) {
      throw new MindRuntimeError(
        "EXPRESSION_ACTION_MISMATCH",

        "Expression does not correspond to the locked Agency action.",

        false,
      );
    }

    /* ========================================================
     * VALIDATION
     * ========================================================
     */

    phase =
      "VALIDATION";

    workspace =
      await runWorkspacePass({
        phase,

        workspace,

        identity,

        cognition,

        cognitionSeal,

        frozenMindSeal,

        decisionLock,

        trace,

        invoke:
          current =>
            runtime.validation(
              current,

              createContext({
                runId,
                identity,
                cognition: activeCognition,
                frozenMindSeal,
                decisionLock,
              }),
            ),

        summary:
          "Final expression passed decision-lineage validation.",
      });

    assertDecisionLock(
      workspace,
      decisionLock,
    );

    if (
      expressionActionOf(
        workspace,
      ) !==
        decisionLock.action
    ) {
      throw new MindRuntimeError(
        "EXPRESSION_ACTION_MISMATCH",

        "Validated expression no longer matches the locked decision.",

        false,
      );
    }

    /* ========================================================
     * ATOMIC COMMIT PREPARATION
     * ========================================================
     */

    phase =
      "COMMIT_PREPARATION";

    assertBefore(
      phase,
      workspace,
    );

    assertIdentity(
      workspace,
      identity,
    );

    assertFrozenMind(
      workspace,
      frozenMindSeal,
    );

    assertCognition(
      cognition,
      cognitionSeal,
    );

    assertDecisionLock(
      workspace,
      decisionLock,
    );

    const prepareStarted =
      performance.now();

    const prepared =
      prepareAtomicMindCommit(
        workspace,
      );

    const prepareDuration =
      performance.now() -
      prepareStarted;

    if (
      prepared.status !==
        "READY" ||
      !prepared.commit
    ) {
      throw new MindRuntimeError(
        "COMMIT_PREPARATION_FAILED",

        "Validated cognitive turn could not be sealed into an atomic commit.",

        true,
      );
    }

    const atomicCommit =
      prepared.commit;

    assertCommitLineage(
      atomicCommit,
      identity,
      decisionLock,
    );

    assertAfter(
      phase,
      workspace,
    );

    trace.add({
      phase,

      workspaceStage:
        workspace.stage,

      inputSeal:
        seal(
          workspace,
        ),

      outputSeal:
        seal(
          atomicCommit,
        ),

      artifact: {
        commitId:
          atomicCommit
            .commitId,

        idempotencyKey:
          atomicCommit
            .idempotencyKey,

        fingerprint:
          atomicCommit
            .integrity
            .fingerprint,

        expectedRevision:
          atomicCommit
            .expectedRevision,

        targetRevision:
          atomicCommit
            .targetRevision,

        decisionLock:
          decisionLock
            .combinedSeal,
      },

      durationMs:
        prepareDuration,

      summary:
        "Validated turn sealed into one lineage-verified AtomicMindCommit.",
    });

    /* ========================================================
     * COMPLETE
     * ========================================================
     */

    phase =
      "COMPLETE";

    trace.add({
      phase,

      workspaceStage:
        workspace.stage,

      artifact: {
        cognitionSeal,

        frozenMindSeal,

        decisionLockSeal:
          decisionLock
            .combinedSeal,

        commitFingerprint:
          atomicCommit
            .integrity
            .fingerprint,
      },

      summary:
        "Sovereign cognitive turn completed with no canonical write outside Atomic Executor.",
    });

    return Object.freeze({
      status:
        "READY_TO_COMMIT",

      runId,

      identity,

      workspace,

      cognition,

      decisionLock,

      atomicCommit,

      trace:
        trace.build(),
    });
  } catch (error) {
    const runtimeError =
      error instanceof
        MindRuntimeError
        ? error
        : new MindRuntimeError(
            failureCodeForPhase(
              phase,
            ),

            error instanceof Error
              ? safeText(
                  error.message,
                  500,
                ) ||
                "Cognitive runtime failure."
              : "Unknown cognitive runtime failure.",

            false,
          );

    /*
     * IMPORTANT:
     *
     * Failure DOES NOT trigger another decision.
     *
     * No:
     *
     * "Agency failed → ask Gemini again"
     *
     * No:
     *
     * "Sovereignty rejected → secretly pick REFUSE"
     *
     * This turn simply aborts.
     */

    trace.add({
      phase:
        "ABORTED",

      workspaceStage:
        workspace.stage,

      artifact: {
        failedPhase:
          phase,

        code:
          runtimeError.code,

        decisionLock:
          decisionLock
            ?.combinedSeal ??
          null,
      },

      summary:
        runtimeError.message,
    });

    return Object.freeze({
      status:
        "ABORTED",

      runId,

      identity,

      workspace,

      cognition,

      decisionLock,

      abort:
        Object.freeze({
          code:
            runtimeError.code,

          phase,

          reasonSummary:
            runtimeError.message,

          retryable:
            runtimeError
              .retryable,
        }),

      trace:
        trace.build(),
    });
  }
}