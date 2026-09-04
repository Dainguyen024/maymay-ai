import {
  createHash,
  randomUUID,
} from "node:crypto";

import type {
  PoolClient,
} from "pg";

import {
  withTransaction,
} from "@/lib/maymay/database";

import {
  ATOMIC_COMMIT_SCHEMA,
  type AtomicMindCommit,
} from "@/lib/maymay/sovereign/atomic-commit";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * PHASE E — ATOMIC MIND EXECUTOR V2
 * ============================================================
 *
 * Core invariant:
 *
 *   VALIDATED DECISION
 *          ↓
 *   SEALED COMMIT
 *          ↓
 *   DATABASE TRANSACTION
 *          ↓
 *   ALL STATE CHANGES COMMIT
 *          OR
 *   ZERO STATE CHANGES COMMIT
 *
 * Executor tuyệt đối KHÔNG:
 *
 * - gọi model
 * - suy nghĩ lại
 * - đổi emotion
 * - đổi Agency action
 * - đổi BehaviorPlan
 * - merge revision conflict
 * - retry mutation âm thầm
 * - ghi partial canonical state
 *
 * ============================================================
 */

export const ATOMIC_EXECUTOR_VERSION =
  "maymay.sovereign.atomic-executor.v2" as const;

/* ============================================================
 * RESULT MODEL
 * ============================================================
 */

export type AtomicExecutionStatus =
  | "COMMITTED"
  | "IDEMPOTENT_REPLAY"
  | "REJECTED"
  | "REVISION_CONFLICT"
  | "FAILED";

export type AtomicExecutionCode =
  | "ok"
  | "already_committed"
  | "invalid_commit"
  | "integrity_mismatch"
  | "payload_too_large"
  | "payload_not_json"
  | "entity_not_found"
  | "actor_not_found"
  | "event_not_found"
  | "invalid_canonical_revision"
  | "revision_conflict"
  | "turn_collision"
  | "canonical_writer_failed"
  | "mutation_snapshot_missing"
  | "snapshot_not_json"
  | "snapshot_too_large"
  | "revision_guard_failed"
  | "workspace_write_failed"
  | "snapshot_write_failed"
  | "audit_write_failed"
  | "transaction_failed";

export type AtomicExecutionResult = {
  status: AtomicExecutionStatus;

  code: AtomicExecutionCode;

  executorVersion:
    typeof ATOMIC_EXECUTOR_VERSION;

  commitId: string;

  attemptId: string;

  entityId: string;

  actorId: string;

  turnId: string;

  eventId: string;

  revisionBefore:
    | number
    | null;

  revisionAfter:
    | number
    | null;

  idempotent: boolean;

  reasonSummary: string;
};

/* ============================================================
 * EXECUTOR OPTIONS
 * ============================================================
 */

export type AtomicExecutorOptions = {
  /**
   * Thời gian tối đa chờ DB lock.
   */
  lockTimeoutMs?: number;

  /**
   * Thời gian tối đa cho statement DB.
   */
  statementTimeoutMs?: number;

  /**
   * Commit envelope không được phình vô hạn.
   */
  maxCommitBytes?: number;

  /**
   * Canonical recovery snapshot.
   */
  maxSnapshotBytes?: number;

  /**
   * Kiểm actor tồn tại trước mutation.
   */
  requireActor?: boolean;

  /**
   * Kiểm experience event tồn tại.
   */
  requireEvent?: boolean;
};

const DEFAULT_OPTIONS:
  Required<AtomicExecutorOptions> = {
    lockTimeoutMs: 5_000,

    statementTimeoutMs:
      20_000,

    maxCommitBytes:
      2 * 1024 * 1024,

    maxSnapshotBytes:
      8 * 1024 * 1024,

    requireActor: true,

    requireEvent: true,
  };

/* ============================================================
 * CANONICAL WRITER CONTRACT
 * ============================================================
 */

/**
 * Writer là persistence adapter thực sự.
 *
 * Nó có thể ghi:
 *
 * - affect
 * - relationship
 * - episodic memory
 * - semantic memory
 * - narrative memory
 * - beliefs
 * - opinions
 * - autonomous state
 * - self observations
 *
 * Nhưng toàn bộ query của writer phải dùng
 * chính PoolClient executor truyền vào.
 *
 * Không được:
 *
 * - tự mở transaction khác
 * - gọi dbPool().query bên ngoài transaction
 * - COMMIT
 * - ROLLBACK
 * - thay Agency decision
 */
export type CanonicalMutationWriter =
  (
    client: PoolClient,
    commit: AtomicMindCommit,
  ) => Promise<
    CanonicalMutationResult
  >;

export type CanonicalMutationResult = {
  /**
   * Canonical snapshot SAU mutation.
   *
   * Snapshot này dùng cho:
   *
   * - recovery
   * - rollback tooling
   * - observability
   * - migration verification
   */
  snapshot: unknown;

  /**
   * Chỉ metadata có cấu trúc.
   * Không free-form CoT.
   */
  audit?: Record<
    string,
    unknown
  >;

  /**
   * Optional telemetry.
   *
   * Không ảnh hưởng logic commit.
   */
  touched?: {
    global?: string[];
    relationship?: string[];
    memories?: string[];
  };
};

/* ============================================================
 * INTERNAL ERRORS
 * ============================================================
 */

class AtomicExecutorError
  extends Error {
  readonly code:
    AtomicExecutionCode;

  constructor(
    code: AtomicExecutionCode,
    message: string,
  ) {
    super(message);

    this.name =
      "AtomicExecutorError";

    this.code = code;
  }
}

/* ============================================================
 * SAFE HELPERS
 * ============================================================
 */

function safeRecord(
  value: unknown,
): Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  )
    ? (
        value as Record<
          string,
          unknown
        >
      )
    : {};
}

function isNonEmptyString(
  value: unknown,
  maxLength = 500,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

function finiteSafeRevision(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0
  );
}

function isValidIsoDate(
  value: unknown,
): boolean {
  if (
    typeof value !== "string"
  ) {
    return false;
  }

  return Number.isFinite(
    Date.parse(value),
  );
}

function hasValue(
  value: unknown,
): boolean {
  return (
    value !== null &&
    value !== undefined
  );
}

/* ============================================================
 * JSON VALIDATION
 * ============================================================
 */

type JsonInspection = {
  valid: boolean;

  bytes: number;

  json: string | null;
};

function inspectJson(
  value: unknown,
): JsonInspection {
  try {
    const json =
      JSON.stringify(value);

    if (
      typeof json !== "string"
    ) {
      return {
        valid: false,
        bytes: 0,
        json: null,
      };
    }

    return {
      valid: true,

      bytes:
        Buffer.byteLength(
          json,
          "utf8",
        ),

      json,
    };
  } catch {
    return {
      valid: false,
      bytes: 0,
      json: null,
    };
  }
}

/* ============================================================
 * DETERMINISTIC SERIALIZATION
 * ============================================================
 */

function stableSerialize(
  value: unknown,
): string {
  if (value === null) {
    return "null";
  }

  if (
    typeof value !== "object"
  ) {
    return (
      JSON.stringify(value) ??
      "undefined"
    );
  }

  if (Array.isArray(value)) {
    return `[${value
      .map(stableSerialize)
      .join(",")}]`;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  const keys =
    Object.keys(record)
      .sort();

  return `{${keys
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          record[key],
        )}`,
    )
    .join(",")}}`;
}

/* ============================================================
 * LEGACY COMMIT FINGERPRINT
 * ============================================================
 *
 * PHẢI giữ cùng thuật toán với atomic-commit.ts
 * hiện tại.
 *
 * Không đổi sang SHA256 ở đây vì sẽ làm
 * commit đã prepare không verify được.
 *
 * SHA256 được bổ sung riêng ở executorSeal.
 * ============================================================
 */

function commitFingerprint(
  value: unknown,
): string {
  const input =
    stableSerialize(value);

  let hashA =
    0x811c9dc5;

  let hashB =
    0x01000193;

  for (
    let i = 0;
    i < input.length;
    i += 1
  ) {
    const code =
      input.charCodeAt(i);

    hashA ^= code;

    hashA =
      Math.imul(
        hashA,
        0x01000193,
      );

    hashB ^=
      code +
      ((i + 1) << 8);

    hashB =
      Math.imul(
        hashB,
        0x85ebca6b,
      );
  }

  const a =
    (hashA >>> 0)
      .toString(16)
      .padStart(8, "0");

  const b =
    (hashB >>> 0)
      .toString(16)
      .padStart(8, "0");

  return `${a}${b}`;
}

function expectedCommitFingerprint(
  commit: AtomicMindCommit,
): string {
  return commitFingerprint({
    schemaVersion:
      commit.schemaVersion,

    commitId:
      commit.commitId,

    idempotencyKey:
      commit.idempotencyKey,

    turnId:
      commit.turnId,

    eventId:
      commit.eventId,

    entityId:
      commit.entityId,

    actorId:
      commit.actorId,

    expectedRevision:
      commit.expectedRevision,

    decision:
      commit.decision,
  });
}

/* ============================================================
 * EXECUTOR SHA256 SEAL
 * ============================================================
 *
 * Đây là checksum mạnh hơn phục vụ:
 *
 * - audit
 * - observability
 * - corruption detection
 *
 * Nó không thay thế commit fingerprint cũ.
 * ============================================================
 */

function executorSeal(
  commit: AtomicMindCommit,
): string {
  return createHash(
    "sha256",
  )
    .update(
      stableSerialize({
        executorVersion:
          ATOMIC_EXECUTOR_VERSION,

        schemaVersion:
          commit.schemaVersion,

        commitId:
          commit.commitId,

        idempotencyKey:
          commit.idempotencyKey,

        entityId:
          commit.entityId,

        actorId:
          commit.actorId,

        turnId:
          commit.turnId,

        eventId:
          commit.eventId,

        expectedRevision:
          commit.expectedRevision,

        targetRevision:
          commit.targetRevision,

        decision:
          commit.decision,

        fingerprint:
          commit.integrity
            .fingerprint,
      }),
    )
    .digest("hex");
}

/* ============================================================
 * DECISION INVARIANTS
 * ============================================================
 */

function validateDecisionIntegrity(
  commit: AtomicMindCommit,
): string | null {
  const decision =
    safeRecord(
      commit.decision,
    );

  const agency =
    safeRecord(
      decision.agencyDecision,
    );

  const plan =
    safeRecord(
      decision.behaviorPlan,
    );

  const expression =
    safeRecord(
      decision.expression,
    );

  const selectedAction =
    agency.selectedAction;

  const planAction =
    plan.action;

  const expressionAction =
    expression.action;

  if (
    !isNonEmptyString(
      selectedAction,
      40,
    )
  ) {
    return (
      "Agency decision is missing selectedAction."
    );
  }

  if (
    selectedAction !==
      planAction
  ) {
    return (
      "BehaviorPlan action differs from Agency decision."
    );
  }

  if (
    selectedAction !==
      expressionAction
  ) {
    return (
      "Expression action differs from locked Agency decision."
    );
  }

  const expressionMode =
    plan.expressionMode;

  const text =
    typeof expression.text ===
    "string"
      ? expression.text
      : "";

  if (
    expressionMode ===
      "silence" &&
    (
      selectedAction !==
        "DISENGAGE" ||
      text.length !== 0
    )
  ) {
    return (
      "Invalid silence expression invariant."
    );
  }

  return null;
}

/* ============================================================
 * COMMIT ENVELOPE VALIDATION
 * ============================================================
 */

function validateCommitEnvelope(
  commit: AtomicMindCommit,
  options:
    Required<AtomicExecutorOptions>,
): {
  valid: boolean;

  code:
    AtomicExecutionCode;

  reasonSummary: string;
} {
  if (
    commit.schemaVersion !==
      ATOMIC_COMMIT_SCHEMA
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Unsupported atomic commit schema.",
    };
  }

  if (
    !isNonEmptyString(
      commit.entityId,
      200,
    ) ||
    !isNonEmptyString(
      commit.actorId,
      200,
    ) ||
    !isNonEmptyString(
      commit.turnId,
      240,
    ) ||
    !isNonEmptyString(
      commit.eventId,
      240,
    )
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic identity fields are invalid.",
    };
  }

  if (
    commit.workspace
      ?.validatedStage !==
      "validated"
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic commit did not originate from a validated workspace.",
    };
  }

  if (
    !isValidIsoDate(
      commit.workspace
        ?.createdAt,
    ) ||
    !isValidIsoDate(
      commit.preparedAt,
    )
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic commit timestamps are invalid.",
    };
  }

  if (
    !finiteSafeRevision(
      commit.expectedRevision,
    ) ||
    !finiteSafeRevision(
      commit.targetRevision,
    ) ||
    commit.targetRevision !==
      commit.expectedRevision +
        1
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic revision contract is invalid.",
    };
  }

  const expectedCommitId =
    `mind:${commit.entityId}:${commit.turnId}`;

  if (
    commit.commitId !==
      expectedCommitId
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic commitId does not match entity/turn identity.",
    };
  }

  const expectedIdempotency =
    `atomic:${commit.entityId}:${commit.turnId}:${commit.expectedRevision}`;

  if (
    commit.idempotencyKey !==
      expectedIdempotency
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic idempotency key is invalid.",
    };
  }

  const requiredArtifacts = [
    commit.decision
      ?.appraisal,

    commit.decision
      ?.resonance,

    commit.decision
      ?.metacognition,

    commit.decision
      ?.agencyDecision,

    commit.decision
      ?.behaviorPlan,

    commit.decision
      ?.expression,
  ];

  if (
    requiredArtifacts.some(
      item =>
        !hasValue(item),
    )
  ) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        "Atomic decision envelope is incomplete.",
    };
  }

  const decisionProblem =
    validateDecisionIntegrity(
      commit,
    );

  if (decisionProblem) {
    return {
      valid: false,

      code: "invalid_commit",

      reasonSummary:
        decisionProblem,
    };
  }

  const commitJson =
    inspectJson(commit);

  if (!commitJson.valid) {
    return {
      valid: false,

      code:
        "payload_not_json",

      reasonSummary:
        "Atomic commit contains non-JSON-safe data.",
    };
  }

  if (
    commitJson.bytes >
      options.maxCommitBytes
  ) {
    return {
      valid: false,

      code:
        "payload_too_large",

      reasonSummary:
        `Atomic commit exceeds ${options.maxCommitBytes} bytes.`,
    };
  }

  const expected =
    expectedCommitFingerprint(
      commit,
    );

  if (
    expected !==
      commit.integrity
        ?.fingerprint
  ) {
    return {
      valid: false,

      code:
        "integrity_mismatch",

      reasonSummary:
        "Atomic commit changed after preparation.",
    };
  }

  return {
    valid: true,

    code: "ok",

    reasonSummary:
      "Atomic commit passed executor validation.",
  };
}

/* ============================================================
 * WORKSPACE IDENTITY HELPERS
 * ============================================================
 */

function storedAtomicCommit(
  workspace: unknown,
): Record<string, unknown> {
  const root =
    safeRecord(workspace);

  return safeRecord(
    root.atomicCommit,
  );
}

function storedCommitId(
  workspace: unknown,
): string | null {
  const atomic =
    storedAtomicCommit(
      workspace,
    );

  return typeof
    atomic.commitId ===
    "string"
    ? atomic.commitId
    : null;
}

function storedFingerprint(
  workspace: unknown,
): string | null {
  const atomic =
    storedAtomicCommit(
      workspace,
    );

  const integrity =
    safeRecord(
      atomic.integrity,
    );

  return typeof
    integrity.fingerprint ===
    "string"
    ? integrity.fingerprint
    : null;
}

/* ============================================================
 * TRANSACTION SAFETY CONFIG
 * ============================================================
 */

async function configureTransaction(
  client: PoolClient,
  options:
    Required<AtomicExecutorOptions>,
): Promise<void> {
  await client.query(
    `
    SELECT
      set_config(
        'lock_timeout',
        $1,
        true
      ),
      set_config(
        'statement_timeout',
        $2,
        true
      )
    `,
    [
      `${options.lockTimeoutMs}ms`,

      `${options.statementTimeoutMs}ms`,
    ],
  );
}

/* ============================================================
 * FK PRECHECK
 * ============================================================
 *
 * Dùng đúng column đã tồn tại theo schema:
 *
 * sv_actors.actor_id
 * sv_experience_events.event_id
 *
 * Không đoán thêm column.
 * ============================================================
 */

async function verifyReferences(
  client: PoolClient,
  commit: AtomicMindCommit,
  options:
    Required<AtomicExecutorOptions>,
): Promise<
  | AtomicExecutionCode
  | null
> {
  if (
    !options.requireActor &&
    !options.requireEvent
  ) {
    return null;
  }

  const result =
    await client.query(
      `
      SELECT
        EXISTS(
          SELECT 1
          FROM sv_actors
          WHERE actor_id = $1
        ) AS actor_exists,

        EXISTS(
          SELECT 1
          FROM sv_experience_events
          WHERE event_id = $2
        ) AS event_exists
      `,
      [
        commit.actorId,
        commit.eventId,
      ],
    );

  const row =
    result.rows[0] ?? {};

  if (
    options.requireActor &&
    row.actor_exists !== true
  ) {
    return "actor_not_found";
  }

  if (
    options.requireEvent &&
    row.event_exists !== true
  ) {
    return "event_not_found";
  }

  return null;
}

/* ============================================================
 * FAILURE RESULT
 * ============================================================
 */

function failureResult(
  args: {
    status:
      AtomicExecutionStatus;

    code:
      AtomicExecutionCode;

    commit:
      AtomicMindCommit;

    attemptId: string;

    revisionBefore:
      number
      | null;

    revisionAfter:
      number
      | null;

    idempotent?: boolean;

    reasonSummary: string;
  },
): AtomicExecutionResult {
  return {
    status: args.status,

    code: args.code,

    executorVersion:
      ATOMIC_EXECUTOR_VERSION,

    commitId:
      args.commit.commitId,

    attemptId:
      args.attemptId,

    entityId:
      args.commit.entityId,

    actorId:
      args.commit.actorId,

    turnId:
      args.commit.turnId,

    eventId:
      args.commit.eventId,

    revisionBefore:
      args.revisionBefore,

    revisionAfter:
      args.revisionAfter,

    idempotent:
      args.idempotent ??
      false,

    reasonSummary:
      args.reasonSummary,
  };
}

/* ============================================================
 * EXECUTOR
 * ============================================================
 */

export async function executeAtomicMindCommit(
  commit: AtomicMindCommit,

  writeCanonicalMutations:
    CanonicalMutationWriter,

  optionsInput:
    AtomicExecutorOptions = {},
): Promise<AtomicExecutionResult> {
  const attemptId =
    randomUUID();

  const options: Required<
    AtomicExecutorOptions
  > = {
    ...DEFAULT_OPTIONS,
    ...optionsInput,
  };

  /* ----------------------------------------------------------
   * PRE-TRANSACTION VALIDATION
   * ----------------------------------------------------------
   *
   * Không cần giữ DB connection nếu commit
   * đã hỏng ngay từ envelope.
   */

  const validation =
    validateCommitEnvelope(
      commit,
      options,
    );

  if (!validation.valid) {
    return failureResult({
      status: "REJECTED",

      code: validation.code,

      commit,

      attemptId,

      revisionBefore:
        null,

      revisionAfter:
        null,

      reasonSummary:
        validation.reasonSummary,
    });
  }

  const seal =
    executorSeal(commit);

  try {
    return await withTransaction(
      async (
        client,
      ): Promise<AtomicExecutionResult> => {
        await configureTransaction(
          client,
          options,
        );

        /* ====================================================
         * STEP 1 — LOCK GLOBAL ENTITY
         * ====================================================
         *
         * Mây là một global entity.
         *
         * Vì vậy global revision serialization
         * phải lock sv_entities row.
         */

        const entityResult =
          await client.query(
            `
            SELECT
              entity_id,
              revision
            FROM sv_entities
            WHERE entity_id = $1
            FOR UPDATE
            `,
            [
              commit.entityId,
            ],
          );

        if (
          !entityResult.rowCount
        ) {
          return failureResult({
            status:
              "REJECTED",

            code:
              "entity_not_found",

            commit,

            attemptId,

            revisionBefore:
              null,

            revisionAfter:
              null,

            reasonSummary:
              `Canonical entity ${commit.entityId} does not exist.`,
          });
        }

        const rawRevision =
          Number(
            entityResult.rows[0]
              .revision,
          );

        if (
          !Number.isSafeInteger(
            rawRevision,
          ) ||
          rawRevision < 0
        ) {
          return failureResult({
            status:
              "FAILED",

            code:
              "invalid_canonical_revision",

            commit,

            attemptId,

            revisionBefore:
              null,

            revisionAfter:
              null,

            reasonSummary:
              "Canonical entity revision is invalid.",
          });
        }

        const currentRevision =
          rawRevision;

        /* ====================================================
         * STEP 2 — TURN IDEMPOTENCY LOCK
         * ====================================================
         *
         * Entity lock serializes concurrent turns.
         *
         * turn_id PRIMARY KEY cung cấp thêm
         * persistence-level duplicate barrier.
         */

        const existingTurn =
          await client.query(
            `
            SELECT
              turn_id,
              entity_id,
              actor_id,
              event_id,
              snapshot_revision,
              workspace,
              status
            FROM sv_turn_workspaces
            WHERE turn_id = $1
            FOR UPDATE
            `,
            [
              commit.turnId,
            ],
          );

        if (
          existingTurn.rowCount
        ) {
          const row =
            existingTurn.rows[0];

          const sameIdentity =
            String(
              row.entity_id,
            ) ===
              commit.entityId &&
            String(
              row.actor_id ??
                "",
            ) ===
              commit.actorId &&
            String(
              row.event_id,
            ) ===
              commit.eventId &&
            Number(
              row.snapshot_revision,
            ) ===
              commit.expectedRevision;

          if (!sameIdentity) {
            return failureResult({
              status:
                "REJECTED",

              code:
                "turn_collision",

              commit,

              attemptId,

              revisionBefore:
                currentRevision,

              revisionAfter:
                currentRevision,

              reasonSummary:
                "turn_id already belongs to another atomic identity.",
            });
          }

          const oldCommitId =
            storedCommitId(
              row.workspace,
            );

          const oldFingerprint =
            storedFingerprint(
              row.workspace,
            );

          /*
           * Replay của một transaction
           * đã commit thành công.
           *
           * Không chạy writer lần hai.
           */
          if (
            row.status ===
              "committed"
          ) {
            if (
              oldCommitId ===
                commit.commitId &&
              oldFingerprint ===
                commit.integrity
                  .fingerprint
            ) {
              return failureResult({
                status:
                  "IDEMPOTENT_REPLAY",

                code:
                  "already_committed",

                commit,

                attemptId,

                revisionBefore:
                  commit.expectedRevision,

                revisionAfter:
                  commit.targetRevision,

                idempotent: true,

                reasonSummary:
                  "Identical atomic turn was already committed; canonical mutation was not repeated.",
              });
            }

            return failureResult({
              status:
                "REJECTED",

              code:
                "turn_collision",

              commit,

              attemptId,

              revisionBefore:
                currentRevision,

              revisionAfter:
                currentRevision,

              reasonSummary:
                "Committed turn exists but atomic integrity does not match.",
            });
          }

          /*
           * Một unfinished workspace đã có
           * atomic identity khác => không overwrite.
           */
          if (
            oldCommitId &&
            oldCommitId !==
              commit.commitId
          ) {
            return failureResult({
              status:
                "REJECTED",

              code:
                "turn_collision",

              commit,

              attemptId,

              revisionBefore:
                currentRevision,

              revisionAfter:
                currentRevision,

              reasonSummary:
                "Existing unfinished workspace belongs to a different commit.",
            });
          }

          if (
            oldFingerprint &&
            oldFingerprint !==
              commit.integrity
                .fingerprint
          ) {
            return failureResult({
              status:
                "REJECTED",

              code:
                "integrity_mismatch",

              commit,

              attemptId,

              revisionBefore:
                currentRevision,

              revisionAfter:
                currentRevision,

              reasonSummary:
                "Existing unfinished workspace has a different commit fingerprint.",
            });
          }
        }

        /* ====================================================
         * STEP 3 — REVISION GUARD
         * ====================================================
         *
         * Không merge stale mental state.
         *
         * Nếu revision đổi:
         *
         * turn phải quay lại Cognitive Runtime
         * và tính lại từ snapshot mới.
         */

        if (
          currentRevision !==
            commit.expectedRevision
        ) {
          return failureResult({
            status:
              "REVISION_CONFLICT",

            code:
              "revision_conflict",

            commit,

            attemptId,

            revisionBefore:
              currentRevision,

            revisionAfter:
              currentRevision,

            reasonSummary:
              `Canonical revision moved from ${commit.expectedRevision} to ${currentRevision}; turn must be recomputed.`,
          });
        }

        /* ====================================================
         * STEP 4 — VERIFY REFERENCES
         * ====================================================
         *
         * Kiểm FK trước canonical mutation
         * để tránh mutate xong mới phát hiện
         * actor/event chưa tồn tại.
         */

        const referenceProblem =
          await verifyReferences(
            client,
            commit,
            options,
          );

        if (
          referenceProblem ===
            "actor_not_found"
        ) {
          return failureResult({
            status:
              "REJECTED",

            code:
              "actor_not_found",

            commit,

            attemptId,

            revisionBefore:
              currentRevision,

            revisionAfter:
              currentRevision,

            reasonSummary:
              `Actor ${commit.actorId} does not exist in sovereign runtime.`,
          });
        }

        if (
          referenceProblem ===
            "event_not_found"
        ) {
          return failureResult({
            status:
              "REJECTED",

            code:
              "event_not_found",

            commit,

            attemptId,

            revisionBefore:
              currentRevision,

            revisionAfter:
              currentRevision,

            reasonSummary:
              `Experience event ${commit.eventId} does not exist.`,
          });
        }

        /* ====================================================
         * STEP 5 — CANONICAL MUTATION
         * ====================================================
         *
         * Đây là điểm state thực tế bắt đầu thay đổi.
         *
         * Tất cả query vẫn nằm trong transaction.
         */

        let mutation:
          CanonicalMutationResult;

        try {
          mutation =
            await writeCanonicalMutations(
              client,
              commit,
            );
        } catch {
          throw new AtomicExecutorError(
            "canonical_writer_failed",
            "Canonical mutation writer failed.",
          );
        }

        if (
          !hasValue(
            mutation?.snapshot,
          )
        ) {
          throw new AtomicExecutorError(
            "mutation_snapshot_missing",

            "Canonical writer did not return a recovery snapshot.",
          );
        }

        const snapshotInspection =
          inspectJson(
            mutation.snapshot,
          );

        if (
          !snapshotInspection.valid
        ) {
          throw new AtomicExecutorError(
            "snapshot_not_json",

            "Canonical recovery snapshot is not JSON-safe.",
          );
        }

        if (
          snapshotInspection.bytes >
            options.maxSnapshotBytes
        ) {
          throw new AtomicExecutorError(
            "snapshot_too_large",

            `Canonical snapshot exceeds ${options.maxSnapshotBytes} bytes.`,
          );
        }

        /* ====================================================
         * STEP 6 — REVISION ADVANCE
         * ====================================================
         *
         * Defense-in-depth:
         *
         * writer không được tự đổi revision.
         *
         * Nếu nó có đổi:
         * WHERE revision = expected sẽ fail
         * và toàn transaction rollback.
         */

        const revisionUpdate =
          await client.query(
            `
            UPDATE sv_entities
            SET
              revision = $2,
              updated_at = NOW()
            WHERE
              entity_id = $1
              AND revision = $3
            RETURNING revision
            `,
            [
              commit.entityId,

              commit.targetRevision,

              commit.expectedRevision,
            ],
          );

        if (
          revisionUpdate.rowCount !==
            1
        ) {
          throw new AtomicExecutorError(
            "revision_guard_failed",

            "Canonical revision guard failed after mutation.",
          );
        }

        const persistedRevision =
          Number(
            revisionUpdate.rows[0]
              .revision,
          );

        if (
          persistedRevision !==
            commit.targetRevision
        ) {
          throw new AtomicExecutorError(
            "revision_guard_failed",

            "Database returned an unexpected canonical revision.",
          );
        }

        /* ====================================================
         * STEP 7 — DATABASE CLOCK
         * ====================================================
         *
         * Audit dùng DB clock để cùng timeline
         * với transaction persistence.
         */

        const clockResult =
          await client.query(
            `
            SELECT
              clock_timestamp()
                AS now
            `,
          );

        const committedAt =
          new Date(
            clockResult.rows[0]
              ?.now ??
              Date.now(),
          ).toISOString();

        /* ====================================================
         * STEP 8 — WORKSPACE COMMIT RECORD
         * ====================================================
         */

        const workspacePayload = {
          schema:
            "maymay.sovereign.turn-workspace.commit.v2",

          executorVersion:
            ATOMIC_EXECUTOR_VERSION,

          atomicCommit:
            commit,

          executorSeal:
            seal,

          attemptId,

          revision: {
            before:
              commit.expectedRevision,

            after:
              commit.targetRevision,
          },

          committedAt,
        };

        if (
          existingTurn.rowCount
        ) {
          const update =
            await client.query(
              `
              UPDATE sv_turn_workspaces
              SET
                workspace = $2,
                status = 'committed',
                updated_at = NOW()
              WHERE
                turn_id = $1
                AND status <> 'committed'
              RETURNING turn_id
              `,
              [
                commit.turnId,

                workspacePayload,
              ],
            );

          if (
            update.rowCount !==
              1
          ) {
            throw new AtomicExecutorError(
              "workspace_write_failed",

              "Unable to finalize existing turn workspace.",
            );
          }
        } else {
          const insert =
            await client.query(
              `
              INSERT INTO sv_turn_workspaces(
                turn_id,
                entity_id,
                actor_id,
                event_id,
                snapshot_revision,
                workspace,
                status
              )
              VALUES(
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                'committed'
              )
              RETURNING turn_id
              `,
              [
                commit.turnId,

                commit.entityId,

                commit.actorId,

                commit.eventId,

                commit.expectedRevision,

                workspacePayload,
              ],
            );

          if (
            insert.rowCount !==
              1
          ) {
            throw new AtomicExecutorError(
              "workspace_write_failed",

              "Unable to persist committed turn workspace.",
            );
          }
        }

        /* ====================================================
         * STEP 9 — RECOVERY SNAPSHOT
         * ====================================================
         *
         * Deterministic snapshot ID.
         *
         * Một canonical revision phải có
         * trace rõ ràng tới turn tạo ra nó.
         */

        const snapshotId =
          [
            "snapshot",
            commit.entityId,
            commit.targetRevision,
            commit.turnId,
          ].join(":");

        const snapshotInsert =
          await client.query(
            `
            INSERT INTO sv_state_snapshots(
              snapshot_id,
              entity_id,
              entity_revision,
              snapshot,
              reason
            )
            VALUES(
              $1,
              $2,
              $3,
              $4,
              $5
            )
            RETURNING snapshot_id
            `,
            [
              snapshotId,

              commit.entityId,

              commit.targetRevision,

              mutation.snapshot,

              "atomic_turn_commit",
            ],
          );

        if (
          snapshotInsert.rowCount !==
            1
        ) {
          throw new AtomicExecutorError(
            "snapshot_write_failed",

            "Canonical recovery snapshot was not persisted.",
          );
        }

        /* ====================================================
         * STEP 10 — STRUCTURED AUDIT
         * ====================================================
         *
         * Không CoT.
         *
         * Chỉ:
         *
         * - identity
         * - integrity
         * - revision
         * - persistence facts
         * - writer telemetry
         */

        const auditId =
          `audit:${commit.commitId}`;

        const auditPayload = {
          schema:
            "maymay.sovereign.atomic-audit.v2",

          executorVersion:
            ATOMIC_EXECUTOR_VERSION,

          attemptId,

          commit: {
            commitId:
              commit.commitId,

            idempotencyKey:
              commit.idempotencyKey,

            fingerprint:
              commit.integrity
                .fingerprint,

            executorSeal:
              seal,
          },

          identity: {
            entityId:
              commit.entityId,

            actorId:
              commit.actorId,

            turnId:
              commit.turnId,

            eventId:
              commit.eventId,
          },

          revision: {
            before:
              commit.expectedRevision,

            after:
              commit.targetRevision,
          },

          persistence: {
            workspaceStatus:
              "committed",

            snapshotId,

            snapshotBytes:
              snapshotInspection.bytes,
          },

          canonicalMutation:
            mutation.audit ??
            {},

          touched:
            mutation.touched ??
            {},

          committedAt,
        };

        const auditInsert =
          await client.query(
            `
            INSERT INTO sv_runtime_audits(
              audit_id,
              entity_id,
              actor_id,
              turn_id,
              event_id,
              audit
            )
            VALUES(
              $1,
              $2,
              $3,
              $4,
              $5,
              $6
            )
            RETURNING audit_id
            `,
            [
              auditId,

              commit.entityId,

              commit.actorId,

              commit.turnId,

              commit.eventId,

              auditPayload,
            ],
          );

        if (
          auditInsert.rowCount !==
            1
        ) {
          throw new AtomicExecutorError(
            "audit_write_failed",

            "Atomic runtime audit was not persisted.",
          );
        }

        /* ====================================================
         * SUCCESS
         * ====================================================
         *
         * Callback return
         *      ↓
         * withTransaction COMMIT
         *
         * Nếu bất kỳ query phía trên throw:
         * withTransaction ROLLBACK.
         */

        return {
          status:
            "COMMITTED",

          code:
            "ok",

          executorVersion:
            ATOMIC_EXECUTOR_VERSION,

          commitId:
            commit.commitId,

          attemptId,

          entityId:
            commit.entityId,

          actorId:
            commit.actorId,

          turnId:
            commit.turnId,

          eventId:
            commit.eventId,

          revisionBefore:
            commit.expectedRevision,

          revisionAfter:
            commit.targetRevision,

          idempotent:
            false,

          reasonSummary:
            `Atomic sovereign mind commit succeeded: revision ${commit.expectedRevision} → ${commit.targetRevision}.`,
        };
      },
    );
  } catch (error) {
    /*
     * withTransaction phải rollback trước
     * khi control quay về đây.
     *
     * Executor KHÔNG tự retry writer.
     */

    if (
      error instanceof
        AtomicExecutorError
    ) {
      return failureResult({
        status: "FAILED",

        code: error.code,

        commit,

        attemptId,

        revisionBefore:
          commit.expectedRevision,

        revisionAfter:
          null,

        reasonSummary:
          `${error.message} Transaction rolled back; no partial canonical commit survived.`,
      });
    }

    return failureResult({
      status: "FAILED",

      code:
        "transaction_failed",

      commit,

      attemptId,

      revisionBefore:
        commit.expectedRevision,

      revisionAfter:
        null,

      reasonSummary:
        "Atomic database transaction failed and was rolled back; canonical mind was not partially committed.",
    });
  }
}