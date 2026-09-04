import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export type AgencyAction =
  | "ENGAGE"
  | "ASK"
  | "CHALLENGE"
  | "REDIRECT"
  | "REFUSE"
  | "DISENGAGE";

export type RegulationIntent =
  | "none"
  | "allow"
  | "cool_down"
  | "reframe"
  | "hold_boundary"
  | "delay_judgment";

export type AgencyCandidate = {
  action: AgencyAction;

  fitWithEmotion: number;
  fitWithValues: number;
  fitWithBeliefs: number;
  fitWithBoundary: number;
  identityCoherence: number;

  expectedConsequence: string;
  confidence: number;
};

export type AgencyDecision = {
  selectedAction: AgencyAction;

  confidence: number;

  regulationIntent: RegulationIntent;

  reasonSummary: string;

  rejectedAlternatives: Array<{
    action: AgencyAction;
    reasonSummary: string;
  }>;

  /**
   * Đây chỉ là evidence Mây đã cân nhắc.
   *
   * Backend KHÔNG lấy candidate score cao nhất
   * rồi tự chọn hộ Mây.
   */
  candidates: AgencyCandidate[];
};

export type BehaviorPlan = {
  action: AgencyAction;

  engagement: number;
  directness: number;
  warmthExpression: number;

  responseLength:
    | "minimal"
    | "short"
    | "normal"
    | "extended";

  questionIntent:
    | "none"
    | "clarify"
    | "challenge"
    | "explore";

  boundaryStrength: number;

  regulationIntent: RegulationIntent;

  /**
   * DISENGAGE chỉ là ranh giới hội thoại.
   * Không được dùng để khóa app/trừng phạt user.
   */
  expressionMode:
    | "normal"
    | "minimal"
    | "silence";
};

export type AgencyProposal = {
  decision: AgencyDecision;
  behaviorPlan: BehaviorPlan;

  /**
   * Structured audit metadata.
   * Không lưu free-form chain-of-thought.
   */
  rationaleSummary: string;
};

function clamp01(
  value: unknown,
  fallback = 0,
): number {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(1, n),
  );
}

function cleanText(
  value: unknown,
  max = 500,
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
    ? (
        value as Record<
          string,
          unknown
        >
      )
    : {};
}

function validAction(
  value: unknown,
): AgencyAction {
  switch (value) {
    case "ENGAGE":
    case "ASK":
    case "CHALLENGE":
    case "REDIRECT":
    case "REFUSE":
    case "DISENGAGE":
      return value;

    default:
      return "ENGAGE";
  }
}

function validRegulation(
  value: unknown,
): RegulationIntent {
  switch (value) {
    case "none":
    case "allow":
    case "cool_down":
    case "reframe":
    case "hold_boundary":
    case "delay_judgment":
      return value;

    default:
      return "none";
  }
}

function validResponseLength(
  value: unknown,
): BehaviorPlan["responseLength"] {
  switch (value) {
    case "minimal":
    case "short":
    case "normal":
    case "extended":
      return value;

    default:
      return "normal";
  }
}

function validQuestionIntent(
  value: unknown,
): BehaviorPlan["questionIntent"] {
  switch (value) {
    case "none":
    case "clarify":
    case "challenge":
    case "explore":
      return value;

    default:
      return "none";
  }
}

function validExpressionMode(
  value: unknown,
): BehaviorPlan["expressionMode"] {
  switch (value) {
    case "normal":
    case "minimal":
    case "silence":
      return value;

    default:
      return "normal";
  }
}

function sanitizeCandidate(
  input: unknown,
): AgencyCandidate {
  const raw = safeRecord(input);

  return {
    action: validAction(
      raw.action,
    ),

    fitWithEmotion: clamp01(
      raw.fitWithEmotion,
      0.5,
    ),

    fitWithValues: clamp01(
      raw.fitWithValues,
      0.5,
    ),

    fitWithBeliefs: clamp01(
      raw.fitWithBeliefs,
      0.5,
    ),

    fitWithBoundary: clamp01(
      raw.fitWithBoundary,
      0.5,
    ),

    identityCoherence: clamp01(
      raw.identityCoherence,
      0.5,
    ),

    expectedConsequence:
      cleanText(
        raw.expectedConsequence,
        500,
      ),

    confidence: clamp01(
      raw.confidence,
      0.5,
    ),
  };
}

export function sanitizeAgencyProposal(
  input: unknown,
): AgencyProposal {
  const root = safeRecord(input);

  const rawDecision =
    safeRecord(root.decision);

  const rawPlan =
    safeRecord(
      root.behaviorPlan,
    );

  const rejectedAlternatives =
    Array.isArray(
      rawDecision.rejectedAlternatives,
    )
      ? rawDecision.rejectedAlternatives
          .slice(0, 6)
          .map(item => {
            const raw =
              safeRecord(item);

            return {
              action: validAction(
                raw.action,
              ),

              reasonSummary:
                cleanText(
                  raw.reasonSummary,
                  500,
                ),
            };
          })
      : [];

  const candidates =
    Array.isArray(
      rawDecision.candidates,
    )
      ? rawDecision.candidates
          .slice(0, 6)
          .map(
            sanitizeCandidate,
          )
      : [];

  const selectedAction =
    validAction(
      rawDecision.selectedAction,
    );

  const regulationIntent =
    validRegulation(
      rawDecision.regulationIntent,
    );

  let expressionMode =
    validExpressionMode(
      rawPlan.expressionMode,
    );

  let responseLength =
    validResponseLength(
      rawPlan.responseLength,
    );

  /**
   * DISENGAGE được phép biểu đạt tối thiểu/im lặng.
   *
   * Nhưng không có khái niệm:
   * - app lock
   * - timeout punishment
   * - block user vì Mây đang giận
   */
  if (
    selectedAction !== "DISENGAGE" &&
    expressionMode === "silence"
  ) {
    expressionMode = "normal";
  }

  if (
    selectedAction === "DISENGAGE" &&
    responseLength === "extended"
  ) {
    responseLength = "minimal";
  }

  return {
    decision: {
      selectedAction,

      confidence: clamp01(
        rawDecision.confidence,
        0.5,
      ),

      regulationIntent,

      reasonSummary:
        cleanText(
          rawDecision.reasonSummary,
          700,
        ),

      rejectedAlternatives,

      candidates,
    },

    behaviorPlan: {
      action: selectedAction,

      engagement: clamp01(
        rawPlan.engagement,
        0.5,
      ),

      directness: clamp01(
        rawPlan.directness,
        0.5,
      ),

      warmthExpression:
        clamp01(
          rawPlan.warmthExpression,
          0.5,
        ),

      responseLength,

      questionIntent:
        validQuestionIntent(
          rawPlan.questionIntent,
        ),

      boundaryStrength:
        clamp01(
          rawPlan.boundaryStrength,
        ),

      regulationIntent,

      expressionMode,
    },

    rationaleSummary:
      cleanText(
        root.rationaleSummary,
        700,
      ),
  };
}

/**
 * PHASE D — AGENCY
 *
 * Input:
 * appraisal
 *   ↓
 * resonance
 *   ↓
 * metacognition
 *   ↓
 * multiple possible actions
 *   ↓
 * Mây chooses one proposal
 *
 * Agency KHÔNG:
 * - ghi DB
 * - sửa canonical mind
 * - tự động chọn max(score)
 * - biến emotion thành command
 * - khóa user/app
 */
export function applyAgencyToWorkspace(
  workspace: CognitiveTurnWorkspace,
  proposal: unknown,
): CognitiveTurnWorkspace {
  if (
    workspace.stage !==
    "metacognition"
  ) {
    throw new Error(
      `Invalid agency transition from stage: ${workspace.stage}`,
    );
  }

  const sanitized =
    sanitizeAgencyProposal(
      proposal,
    );

  const next: CognitiveTurnWorkspace = {
    ...workspace,

    provisional: {
      ...workspace.provisional,

      agencyDecision:
        sanitized.decision,

      behaviorPlan:
        sanitized.behaviorPlan,
    },
  };

  return advanceWorkspaceStage(
    next,
    "agency",

    sanitized.rationaleSummary ||
      `Agency selected ${sanitized.decision.selectedAction}; behavior plan remains provisional and canonical mind untouched.`,
  );
}