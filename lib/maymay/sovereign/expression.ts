import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

import type {
  AgencyAction,
  BehaviorPlan,
} from "@/lib/maymay/sovereign/agency";

import type {
  SovereigntyGateResult,
} from "@/lib/maymay/sovereign/sovereignty-gate";

export type ExpressionProposal = {
  /**
   * Model phải echo lại action mà nó đang diễn đạt.
   * Nếu khác BehaviorPlan đã khóa => reject.
   */
  action: AgencyAction;

  text: string;

  /**
   * Audit metadata ngắn.
   * Không lưu chain-of-thought.
   */
  rationaleSummary: string;
};

export type LockedExpression = {
  action: AgencyAction;

  text: string;

  behaviorPlan: BehaviorPlan;

  generatedAt: string;
};

function cleanText(
  value: unknown,
  max = 12000,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, max);
}

function safeRecord(
  value: unknown,
): Record<string, unknown> {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function validAction(
  value: unknown,
): AgencyAction | null {
  switch (value) {
    case "ENGAGE":
    case "ASK":
    case "CHALLENGE":
    case "REDIRECT":
    case "REFUSE":
    case "DISENGAGE":
      return value;

    default:
      return null;
  }
}

export function sanitizeExpressionProposal(
  input: unknown,
): ExpressionProposal {
  const raw = safeRecord(input);

  const action =
    validAction(raw.action);

  if (!action) {
    throw new Error(
      "Expression proposal has invalid action.",
    );
  }

  return {
    action,

    text: cleanText(
      raw.text,
    ),

    rationaleSummary:
      cleanText(
        raw.rationaleSummary,
        500,
      ),
  };
}

/**
 * EXPRESSION PASS
 *
 * Decision đã xảy ra trước bước này:
 *
 * appraisal
 *   ↓
 * resonance
 *   ↓
 * metacognition
 *   ↓
 * agency
 *   ↓
 * sovereignty gate
 *   ↓
 * EXPRESSION
 *
 * Expression chỉ được quyền chọn CÁCH NÓI.
 * Không được đổi Mây muốn làm gì.
 */
export function applyExpressionToWorkspace(
  workspace: CognitiveTurnWorkspace,
  gate: SovereigntyGateResult,
  proposal: unknown,
): CognitiveTurnWorkspace {
  if (
    workspace.stage !== "agency"
  ) {
    throw new Error(
      `Invalid expression transition from stage: ${workspace.stage}`,
    );
  }

  if (
    gate.decision !== "ACCEPT" ||
    !gate.acceptedAction ||
    !gate.acceptedBehaviorPlan
  ) {
    throw new Error(
      "Expression requires an accepted sovereignty decision.",
    );
  }

  const sanitized =
    sanitizeExpressionProposal(
      proposal,
    );

  /**
   * Model không được thay action trong lúc viết câu trả lời.
   */
  if (
    sanitized.action !==
    gate.acceptedAction
  ) {
    throw new Error(
      `Expression attempted to change locked action from ${gate.acceptedAction} to ${sanitized.action}.`,
    );
  }

  const plan =
    structuredClone(
      gate.acceptedBehaviorPlan,
    );

  let text =
    sanitized.text;

  /**
   * Silence chỉ hợp lệ với DISENGAGE
   * đã được Agency chọn + Gate chấp nhận.
   */
  if (
    plan.expressionMode ===
      "silence"
  ) {
    if (
      plan.action !==
        "DISENGAGE"
    ) {
      throw new Error(
        "Silence expression is only valid for DISENGAGE.",
      );
    }

    text = "";
  }

  const expression:
    LockedExpression = {
      action:
        gate.acceptedAction,

      text,

      behaviorPlan: plan,

      generatedAt:
        new Date()
          .toISOString(),
    };

  const next:
    CognitiveTurnWorkspace = {
      ...workspace,

      provisional: {
        ...workspace.provisional,

        expression,
      },
    };

  return advanceWorkspaceStage(
    next,
    "expression",

    sanitized.rationaleSummary ||
      `Expression rendered locked ${gate.acceptedAction} behavior without changing the decision.`,
  );
}