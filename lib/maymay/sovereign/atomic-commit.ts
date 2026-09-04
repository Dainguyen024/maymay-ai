import type {
  CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export const ATOMIC_COMMIT_SCHEMA =
  "maymay.sovereign.atomic-commit.v1" as const;

export type AtomicCommitStatus =
  | "READY"
  | "REJECTED";

export type AtomicCommitRejection =
  | "workspace_not_validated"
  | "invalid_revision"
  | "missing_appraisal"
  | "missing_resonance"
  | "missing_metacognition"
  | "missing_agency_decision"
  | "missing_behavior_plan"
  | "missing_expression";

export type AtomicDecisionEnvelope = {
  appraisal: unknown;
  resonance: unknown;
  metacognition: unknown;
  agencyDecision: unknown;
  behaviorPlan: unknown;
  expression: unknown;
};

export type AtomicMindCommit = {
  /**
   * Version hóa contract để migration sau này
   * không phải đoán payload cũ thuộc schema nào.
   */
  schemaVersion:
    typeof ATOMIC_COMMIT_SCHEMA;

  /**
   * Một turn chỉ có một logical commit.
   * Retry network/transaction không sinh
   * thêm một mental event mới.
   */
  commitId: string;
  idempotencyKey: string;

  turnId: string;
  eventId: string;

  entityId: string;
  actorId: string;

  /**
   * Optimistic concurrency control.
   *
   * Canonical revision trong DB phải vẫn bằng
   * revision này tại thời điểm transaction.
   */
  expectedRevision: number;

  /**
   * Revision dự kiến sau commit.
   * DB layer sau này vẫn là nơi quyết định
   * transaction có thực sự thành công hay không.
   */
  targetRevision: number;

  workspace: {
    source: CognitiveTurnWorkspace["source"];
    validatedStage: "validated";
    createdAt: string;
  };

  decision: AtomicDecisionEnvelope;

  integrity: {
    /**
     * Fingerprint deterministic để phát hiện
     * payload bị thay giữa prepare → execute.
     *
     * Đây KHÔNG phải security signature.
     */
    fingerprint: string;

    artifactsPresent: {
      appraisal: true;
      resonance: true;
      metacognition: true;
      agencyDecision: true;
      behaviorPlan: true;
      expression: true;
    };
  };

  preparedAt: string;
};

export type AtomicCommitPreparation = {
  status: AtomicCommitStatus;

  commit: AtomicMindCommit | null;

  rejectionCodes:
    AtomicCommitRejection[];

  /**
   * Audit metadata ngắn.
   * Không lưu free-form chain-of-thought.
   */
  reasonSummary: string;
};

function clone<T>(
  value: T,
): T {
  return structuredClone(value);
}

function deepFreeze<T>(
  value: T,
): T {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return value;
  }

  Object.freeze(value);

  for (
    const child of
    Object.values(
      value as Record<
        string,
        unknown
      >,
    )
  ) {
    if (
      child &&
      typeof child === "object" &&
      !Object.isFrozen(child)
    ) {
      deepFreeze(child);
    }
  }

  return value;
}

/**
 * JSON stable enough cho payload hiện tại:
 * recursively sort object keys.
 *
 * Không dùng để lưu CoT.
 * Chỉ phục vụ integrity fingerprint.
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
    return JSON.stringify(value);
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

/**
 * Lightweight deterministic fingerprint.
 *
 * Không gọi nó là cryptographic signature;
 * mục tiêu chỉ là detect accidental mutation
 * giữa prepare và DB executor.
 */
function fingerprint(
  value: unknown,
): string {
  const input =
    stableSerialize(value);

  let hashA = 0x811c9dc5;
  let hashB = 0x01000193;

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

function exists(
  value: unknown,
): boolean {
  return (
    value !== undefined &&
    value !== null
  );
}

/**
 * PHASE E
 * ATOMIC MIND COMMIT — PREPARATION
 *
 * Phase D đã quyết định xong.
 * Phase E không được suy nghĩ lại.
 *
 * Nó chỉ biến một workspace VALIDATED
 * thành một transaction envelope bất biến.
 *
 * TUYỆT ĐỐI KHÔNG:
 * - gọi model
 * - thay Agency decision
 * - sửa BehaviorPlan
 * - sửa emotion
 * - ghi DB
 * - tăng revision trong RAM rồi coi như committed
 */
export function prepareAtomicMindCommit(
  workspace: CognitiveTurnWorkspace,
): AtomicCommitPreparation {
  const rejectionCodes =
    new Set<
      AtomicCommitRejection
    >();

  if (
    workspace.stage !==
      "validated"
  ) {
    rejectionCodes.add(
      "workspace_not_validated",
    );
  }

  if (
    !Number.isSafeInteger(
      workspace.snapshotRevision,
    ) ||
    workspace.snapshotRevision < 0
  ) {
    rejectionCodes.add(
      "invalid_revision",
    );
  }

  const provisional =
    workspace.provisional;

  if (
    !exists(
      provisional.appraisal,
    )
  ) {
    rejectionCodes.add(
      "missing_appraisal",
    );
  }

  if (
    !exists(
      provisional.resonance,
    )
  ) {
    rejectionCodes.add(
      "missing_resonance",
    );
  }

  if (
    !exists(
      provisional.metacognition,
    )
  ) {
    rejectionCodes.add(
      "missing_metacognition",
    );
  }

  if (
    !exists(
      provisional.agencyDecision,
    )
  ) {
    rejectionCodes.add(
      "missing_agency_decision",
    );
  }

  if (
    !exists(
      provisional.behaviorPlan,
    )
  ) {
    rejectionCodes.add(
      "missing_behavior_plan",
    );
  }

  if (
    !exists(
      provisional.expression,
    )
  ) {
    rejectionCodes.add(
      "missing_expression",
    );
  }

  const rejects = [
    ...rejectionCodes,
  ];

  if (rejects.length) {
    return {
      status: "REJECTED",

      commit: null,

      rejectionCodes:
        rejects,

      reasonSummary:
        `Atomic commit preparation rejected: ${rejects.join(", ")}.`,
    };
  }

  /**
   * Từ đây TypeScript chưa thể tự suy ra
   * các field chắc chắn non-null,
   * nên clone sau khi invariants đã pass.
   */
  const decision:
    AtomicDecisionEnvelope = {
      appraisal:
        clone(
          provisional.appraisal,
        ),

      resonance:
        clone(
          provisional.resonance,
        ),

      metacognition:
        clone(
          provisional.metacognition,
        ),

      agencyDecision:
        clone(
          provisional.agencyDecision,
        ),

      behaviorPlan:
        clone(
          provisional.behaviorPlan,
        ),

      expression:
        clone(
          provisional.expression,
        ),
    };

  const commitId =
    `mind:${workspace.entityId}:${workspace.turnId}`;

  const idempotencyKey =
    `atomic:${workspace.entityId}:${workspace.turnId}:${workspace.snapshotRevision}`;

  const integrityInput = {
    schemaVersion:
      ATOMIC_COMMIT_SCHEMA,

    commitId,

    idempotencyKey,

    turnId:
      workspace.turnId,

    eventId:
      workspace.eventId,

    entityId:
      workspace.entityId,

    actorId:
      workspace.actorId,

    expectedRevision:
      workspace.snapshotRevision,

    decision,
  };

  const preparedAt =
    new Date().toISOString();

  const commit:
    AtomicMindCommit = {
      schemaVersion:
        ATOMIC_COMMIT_SCHEMA,

      commitId,
      idempotencyKey,

      turnId:
        workspace.turnId,

      eventId:
        workspace.eventId,

      entityId:
        workspace.entityId,

      actorId:
        workspace.actorId,

      expectedRevision:
        workspace.snapshotRevision,

      targetRevision:
        workspace.snapshotRevision +
        1,

      workspace: {
        source:
          workspace.source,

        validatedStage:
          "validated",

        createdAt:
          workspace.createdAt,
      },

      decision,

      integrity: {
        fingerprint:
          fingerprint(
            integrityInput,
          ),

        artifactsPresent: {
          appraisal: true,
          resonance: true,
          metacognition: true,
          agencyDecision: true,
          behaviorPlan: true,
          expression: true,
        },
      },

      preparedAt,
    };

  /**
   * Executor sau này chỉ được đọc payload này.
   * Không mutation giữa prepare → transaction.
   */
  deepFreeze(commit);

  return {
    status: "READY",

    commit,

    rejectionCodes: [],

    reasonSummary:
      `Atomic commit ${commitId} sealed at revision ${workspace.snapshotRevision} → ${workspace.snapshotRevision + 1}.`,
  };
}