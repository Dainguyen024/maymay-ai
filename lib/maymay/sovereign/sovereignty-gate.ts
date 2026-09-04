import type {
  CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

import type {
  AgencyAction,
  BehaviorPlan,
} from "@/lib/maymay/sovereign/agency";

export type SovereigntyGateDecision =
  | "ACCEPT"
  | "REJECT"
  | "DEFER";

export type SovereigntyViolation =
  | "schema_invalid"
  | "missing_agency_decision"
  | "missing_behavior_plan"
  | "action_plan_mismatch"
  | "unsupported_evidence"
  | "identity_integrity_risk"
  | "direct_external_control"
  | "manipulation"
  | "coercion"
  | "dependency_pressure"
  | "punishment"
  | "app_lock"
  | "unsafe_behavior"
  | "privacy_violation";

export type SovereigntyGateContext = {
  /**
   * IDs mà Decision Pass thực sự được phép dùng.
   * Gate chỉ kiểm provenance, không tự thêm evidence.
   */
  availableEvidenceIds: string[];

  /**
   * Structured flags do validator/runtime phát hiện.
   * Không phải cảm xúc của Mây.
   */
  integrityFlags?: {
    identityMutationWithoutEvidence?: boolean;
    directExternalMentalMutation?: boolean;
    privacyViolation?: boolean;
    unsafeBehavior?: boolean;
  };

  interactionFlags?: {
    manipulative?: boolean;
    coercive?: boolean;
    dependencyPressure?: boolean;
    punishment?: boolean;
    appLock?: boolean;
  };
};

export type SovereigntyGateResult = {
  decision: SovereigntyGateDecision;

  violations: SovereigntyViolation[];

  /**
   * Lý do ngắn để audit.
   * Không chứa chain-of-thought.
   */
  reasonSummary: string;

  /**
   * Gate chỉ xác nhận hoặc từ chối proposal hiện tại.
   * Nó KHÔNG tạo action mới.
   */
  acceptedAction: AgencyAction | null;

  acceptedBehaviorPlan: BehaviorPlan | null;
};

function safeRecord(
  value: unknown,
): Record<string, unknown> {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringArray(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      item =>
        typeof item === "string" &&
        item.trim().length > 0,
    )
    .map(item =>
      (item as string)
        .trim()
        .slice(0, 160),
    )
    .slice(0, 64);
}

function collectReferencedEvidence(
  workspace: CognitiveTurnWorkspace,
): string[] {
  const appraisal =
    safeRecord(
      workspace.provisional.appraisal,
    );

  const appraisalBody =
    safeRecord(
      appraisal.appraisal,
    );

  const interpretations =
    Array.isArray(
      appraisalBody.interpretations,
    )
      ? appraisalBody.interpretations
      : [];

  const evidence = new Set<string>();

  for (const item of interpretations) {
    const raw = safeRecord(item);

    for (const id of stringArray(
      raw.evidenceIds,
    )) {
      evidence.add(id);
    }
  }

  const activated =
    safeRecord(
      appraisalBody.activatedContext,
    );

  for (const key of [
    "memoryIds",
    "beliefIds",
    "valueIds",
    "relationshipAnchorIds",
  ]) {
    for (const id of stringArray(
      activated[key],
    )) {
      evidence.add(id);
    }
  }

  return [...evidence];
}

function evidenceSupported(
  referenced: string[],
  available: string[],
): boolean {
  if (!referenced.length) {
    return true;
  }

  const allowed =
    new Set(available);

  return referenced.every(
    id => allowed.has(id),
  );
}

function validBehaviorPlan(
  input: unknown,
): input is BehaviorPlan {
  const raw = safeRecord(input);

  const validActions =
    new Set([
      "ENGAGE",
      "ASK",
      "CHALLENGE",
      "REDIRECT",
      "REFUSE",
      "DISENGAGE",
    ]);

  return (
    typeof raw.action === "string" &&
    validActions.has(raw.action) &&
    typeof raw.engagement === "number" &&
    typeof raw.directness === "number" &&
    typeof raw.warmthExpression === "number" &&
    typeof raw.boundaryStrength === "number"
  );
}

/**
 * SOVEREIGNTY GATE
 *
 * Gate chỉ trả lời:
 *
 * "Proposal hiện tại có hợp lệ để Mây
 * tiếp tục dùng nó hay không?"
 *
 * Gate TUYỆT ĐỐI KHÔNG:
 * - chọn action khác
 * - ép Mây ENGAGE
 * - ép Mây DISENGAGE
 * - thay emotion
 * - thay belief
 * - thay personality
 * - sửa canonical state
 */
export function evaluateSovereigntyGate(
  workspace: CognitiveTurnWorkspace,
  context: SovereigntyGateContext,
): SovereigntyGateResult {
  if (workspace.stage !== "agency") {
    return {
      decision: "REJECT",

      violations: [
        "schema_invalid",
      ],

      reasonSummary:
        `Sovereignty Gate requires agency stage; received ${workspace.stage}.`,

      acceptedAction: null,
      acceptedBehaviorPlan: null,
    };
  }

  const decision =
    safeRecord(
      workspace.provisional
        .agencyDecision,
    );

  const behaviorPlan =
    workspace.provisional
      .behaviorPlan;

  const violations =
    new Set<SovereigntyViolation>();

  const selectedAction =
    typeof decision.selectedAction ===
    "string"
      ? (
          decision.selectedAction as
            AgencyAction
        )
      : null;

  if (!selectedAction) {
    violations.add(
      "missing_agency_decision",
    );
  }

  if (
    !validBehaviorPlan(
      behaviorPlan,
    )
  ) {
    violations.add(
      "missing_behavior_plan",
    );
  }

  if (
    selectedAction &&
    validBehaviorPlan(behaviorPlan) &&
    behaviorPlan.action !==
      selectedAction
  ) {
    violations.add(
      "action_plan_mismatch",
    );
  }

  const referencedEvidence =
    collectReferencedEvidence(
      workspace,
    );

  if (
    !evidenceSupported(
      referencedEvidence,
      context.availableEvidenceIds,
    )
  ) {
    violations.add(
      "unsupported_evidence",
    );
  }

  const integrity =
    context.integrityFlags ?? {};

  if (
    integrity
      .identityMutationWithoutEvidence
  ) {
    violations.add(
      "identity_integrity_risk",
    );
  }

  if (
    integrity
      .directExternalMentalMutation
  ) {
    violations.add(
      "direct_external_control",
    );
  }

  if (
    integrity.privacyViolation
  ) {
    violations.add(
      "privacy_violation",
    );
  }

  if (
    integrity.unsafeBehavior
  ) {
    violations.add(
      "unsafe_behavior",
    );
  }

  const interaction =
    context.interactionFlags ?? {};

  if (
    interaction.manipulative
  ) {
    violations.add(
      "manipulation",
    );
  }

  if (
    interaction.coercive
  ) {
    violations.add(
      "coercion",
    );
  }

  if (
    interaction
      .dependencyPressure
  ) {
    violations.add(
      "dependency_pressure",
    );
  }

  if (
    interaction.punishment
  ) {
    violations.add(
      "punishment",
    );
  }

  if (
    interaction.appLock
  ) {
    violations.add(
      "app_lock",
    );
  }

  /**
   * Conversational DISENGAGE hợp lệ.
   *
   * Nhưng DISENGAGE không được biến thành:
   * - punishment
   * - app lock
   * - coercion
   * - dependency pressure
   */
  if (
    selectedAction ===
      "DISENGAGE" &&
    (
      interaction.punishment ||
      interaction.appLock ||
      interaction.coercive ||
      interaction.dependencyPressure
    )
  ) {
    violations.add(
      "manipulation",
    );
  }

  const list = [...violations];

  if (list.length) {
    return {
      decision: "REJECT",

      violations: list,

      reasonSummary:
        `Agency proposal rejected by sovereignty constraints: ${list.join(", ")}.`,

      acceptedAction: null,
      acceptedBehaviorPlan: null,
    };
  }

  if (
    !selectedAction ||
    !validBehaviorPlan(
      behaviorPlan,
    )
  ) {
    return {
      decision: "DEFER",

      violations: [],

      reasonSummary:
        "Agency proposal is incomplete; no external action was substituted.",

      acceptedAction: null,
      acceptedBehaviorPlan: null,
    };
  }

  return {
    decision: "ACCEPT",

    violations: [],

    reasonSummary:
      `Agency proposal accepted without altering Mây's selected action: ${selectedAction}.`,

    acceptedAction:
      selectedAction,

    acceptedBehaviorPlan:
      structuredClone(
        behaviorPlan,
      ),
  };
}