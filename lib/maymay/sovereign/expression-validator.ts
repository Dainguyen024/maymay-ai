import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export type ExpressionValidationIssue =
  | "missing_expression"
  | "missing_behavior_plan"
  | "missing_agency_decision"
  | "action_changed"
  | "behavior_plan_changed"
  | "invalid_silence"
  | "empty_expression";

export type ExpressionValidationResult = {
  valid: boolean;

  issues: ExpressionValidationIssue[];

  /**
   * Audit metadata ngắn.
   * Không chứa chain-of-thought.
   */
  reasonSummary: string;
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

function sameNumber(
  a: unknown,
  b: unknown,
): boolean {
  return (
    typeof a === "number" &&
    typeof b === "number" &&
    Math.abs(a - b) < 0.000001
  );
}

function behaviorPlansMatch(
  expected: unknown,
  actual: unknown,
): boolean {
  const a = safeRecord(expected);
  const b = safeRecord(actual);

  if (
    a.action !== b.action ||
    a.responseLength !==
      b.responseLength ||
    a.questionIntent !==
      b.questionIntent ||
    a.regulationIntent !==
      b.regulationIntent ||
    a.expressionMode !==
      b.expressionMode
  ) {
    return false;
  }

  return (
    sameNumber(
      a.engagement,
      b.engagement,
    ) &&
    sameNumber(
      a.directness,
      b.directness,
    ) &&
    sameNumber(
      a.warmthExpression,
      b.warmthExpression,
    ) &&
    sameNumber(
      a.boundaryStrength,
      b.boundaryStrength,
    )
  );
}

/**
 * EXPRESSION VALIDATION
 *
 * Validator chỉ kiểm:
 *
 * Agency decision
 *      ↓
 * locked BehaviorPlan
 *      ↓
 * rendered Expression
 *
 * có còn nhất quán hay không.
 *
 * Validator KHÔNG:
 * - viết lại câu trả lời
 * - đổi action
 * - đổi emotion
 * - đổi BehaviorPlan
 * - ghi canonical mind
 * - ghi DB
 */
export function validateExpressionWorkspace(
  workspace: CognitiveTurnWorkspace,
): ExpressionValidationResult {
  const issues =
    new Set<ExpressionValidationIssue>();

  if (
    workspace.stage !==
      "expression"
  ) {
    return {
      valid: false,

      issues: [
        "missing_expression",
      ],

      reasonSummary:
        `Expression validation requires expression stage; received ${workspace.stage}.`,
    };
  }

  const expression =
    safeRecord(
      workspace.provisional
        .expression,
    );

  const behaviorPlan =
    safeRecord(
      workspace.provisional
        .behaviorPlan,
    );

  const agencyDecision =
    safeRecord(
      workspace.provisional
        .agencyDecision,
    );

  if (
    !Object.keys(expression).length
  ) {
    issues.add(
      "missing_expression",
    );
  }

  if (
    !Object.keys(behaviorPlan).length
  ) {
    issues.add(
      "missing_behavior_plan",
    );
  }

  if (
    !Object.keys(agencyDecision).length
  ) {
    issues.add(
      "missing_agency_decision",
    );
  }

  const expressionAction =
    expression.action;

  const planAction =
    behaviorPlan.action;

  const agencyAction =
    agencyDecision.selectedAction;

  if (
    expressionAction !==
      planAction ||
    expressionAction !==
      agencyAction
  ) {
    issues.add(
      "action_changed",
    );
  }

  /**
   * Expression mang theo bản clone
   * của BehaviorPlan đã được Gate accept.
   *
   * Nếu model/runtime sửa plan giữa đường
   * thì reject.
   */
  if (
    !behaviorPlansMatch(
      behaviorPlan,
      expression.behaviorPlan,
    )
  ) {
    issues.add(
      "behavior_plan_changed",
    );
  }

  const text =
    typeof expression.text ===
    "string"
      ? expression.text
      : "";

  const expressionMode =
    behaviorPlan.expressionMode;

  /**
   * Silence chỉ tồn tại khi:
   *
   * action = DISENGAGE
   * expressionMode = silence
   * text = ""
   */
  if (
    expressionMode === "silence"
  ) {
    if (
      planAction !==
        "DISENGAGE" ||
      text.length !== 0
    ) {
      issues.add(
        "invalid_silence",
      );
    }
  } else if (
    text.trim().length === 0
  ) {
    issues.add(
      "empty_expression",
    );
  }

  const list = [...issues];

  return {
    valid: list.length === 0,

    issues: list,

    reasonSummary:
      list.length === 0
        ? "Expression preserved the locked agency decision and BehaviorPlan."
        : `Expression validation failed: ${list.join(", ")}.`,
  };
}

/**
 * Chỉ workspace hợp lệ mới được
 * chuyển sang stage "validated".
 */
export function applyExpressionValidationToWorkspace(
  workspace: CognitiveTurnWorkspace,
): CognitiveTurnWorkspace {
  const result =
    validateExpressionWorkspace(
      workspace,
    );

  if (!result.valid) {
    throw new Error(
      result.reasonSummary,
    );
  }

  return advanceWorkspaceStage(
    workspace,
    "validated",
    result.reasonSummary,
  );
}