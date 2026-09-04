import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export type AppraisalCertainty =
  | "known"
  | "recalled"
  | "inferred"
  | "fuzzy"
  | "unknown";

export type AppraisalMeaning = {
  summary: string;

  /**
   * Điều thực sự quan sát được từ event/user message.
   * Không trộn suy đoán vào đây.
   */
  observedFacts: string[];

  /**
   * Mây đang hiểu sự kiện này theo nghĩa gì.
   * Đây là interpretation, KHÔNG phải fact.
   */
  interpretations: Array<{
    meaning: string;
    confidence: number;
    evidenceIds: string[];
  }>;

  /**
   * Sự kiện có liên quan tới Mây theo hướng nào,
   * nhưng chưa quyết định cảm xúc.
   */
  relevance: {
    self: number;
    relationship: number;
    goals: number;
    values: number;
    boundaries: number;
  };

  /**
   * Có điều gì khác với thứ Mây đã dự đoán hay không.
   * Đây là tín hiệu cho attention/resonance sau này.
   */
  expectationViolation: {
    detected: boolean;
    magnitude: number;
    description: string | null;
  };

  /**
   * Những phần ký ức/belief/value được kích hoạt.
   * Appraisal chỉ tham chiếu, không mutate chúng.
   */
  activatedContext: {
    memoryIds: string[];
    beliefIds: string[];
    valueIds: string[];
    relationshipAnchorIds: string[];
  };

  certainty: AppraisalCertainty;

  /**
   * Mây có nhận ra mình chưa đủ dữ liệu không.
   */
  ambiguity: {
    level: number;
    unresolvedQuestions: string[];
  };
};

export type AppraisalProposal = {
  appraisal: AppraisalMeaning;

  /**
   * Metadata ngắn để audit.
   * Không chứa free-form chain-of-thought.
   */
  rationaleSummary: string;
};

function clamp01(value: unknown, fallback = 0): number {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, n));
}

function cleanText(
  value: unknown,
  max = 500,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

function cleanTextArray(
  value: unknown,
  maxItems: number,
  maxLength = 300,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(item => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function cleanIds(
  value: unknown,
  maxItems = 24,
): string[] {
  return cleanTextArray(value, maxItems, 120);
}

function validCertainty(
  value: unknown,
): AppraisalCertainty {
  switch (value) {
    case "known":
    case "recalled":
    case "inferred":
    case "fuzzy":
    case "unknown":
      return value;

    default:
      return "unknown";
  }
}

/**
 * Backend validation boundary.
 *
 * Gemini có thể PROPOSE appraisal,
 * nhưng proposal không được tin trực tiếp.
 */
export function sanitizeAppraisalProposal(
  input: unknown,
): AppraisalProposal {
  const root =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  const raw =
    root.appraisal &&
    typeof root.appraisal === "object"
      ? (root.appraisal as Record<string, unknown>)
      : {};

  const relevance =
    raw.relevance &&
    typeof raw.relevance === "object"
      ? (raw.relevance as Record<string, unknown>)
      : {};

  const violation =
    raw.expectationViolation &&
    typeof raw.expectationViolation === "object"
      ? (
          raw.expectationViolation as Record<
            string,
            unknown
          >
        )
      : {};

  const activated =
    raw.activatedContext &&
    typeof raw.activatedContext === "object"
      ? (
          raw.activatedContext as Record<
            string,
            unknown
          >
        )
      : {};

  const ambiguity =
    raw.ambiguity &&
    typeof raw.ambiguity === "object"
      ? (
          raw.ambiguity as Record<
            string,
            unknown
          >
        )
      : {};

  const interpretations = Array.isArray(
    raw.interpretations,
  )
    ? raw.interpretations
        .slice(0, 8)
        .map(item => {
          const value =
            item && typeof item === "object"
              ? (
                  item as Record<
                    string,
                    unknown
                  >
                )
              : {};

          return {
            meaning: cleanText(
              value.meaning,
              500,
            ),

            confidence: clamp01(
              value.confidence,
              0.5,
            ),

            evidenceIds: cleanIds(
              value.evidenceIds,
            ),
          };
        })
        .filter(item => item.meaning)
    : [];

  return {
    appraisal: {
      summary: cleanText(
        raw.summary,
        700,
      ),

      observedFacts: cleanTextArray(
        raw.observedFacts,
        12,
        400,
      ),

      interpretations,

      relevance: {
        self: clamp01(relevance.self),
        relationship: clamp01(
          relevance.relationship,
        ),
        goals: clamp01(
          relevance.goals,
        ),
        values: clamp01(
          relevance.values,
        ),
        boundaries: clamp01(
          relevance.boundaries,
        ),
      },

      expectationViolation: {
        detected:
          violation.detected === true,

        magnitude: clamp01(
          violation.magnitude,
        ),

        description:
          cleanText(
            violation.description,
            500,
          ) || null,
      },

      activatedContext: {
        memoryIds: cleanIds(
          activated.memoryIds,
        ),

        beliefIds: cleanIds(
          activated.beliefIds,
        ),

        valueIds: cleanIds(
          activated.valueIds,
        ),

        relationshipAnchorIds:
          cleanIds(
            activated.relationshipAnchorIds,
          ),
      },

      certainty: validCertainty(
        raw.certainty,
      ),

      ambiguity: {
        level: clamp01(
          ambiguity.level,
        ),

        unresolvedQuestions:
          cleanTextArray(
            ambiguity.unresolvedQuestions,
            8,
            400,
          ),
      },
    },

    rationaleSummary: cleanText(
      root.rationaleSummary,
      700,
    ),
  };
}

/**
 * Appraisal chỉ được ghi vào WORKSPACE.
 * Không có DB write.
 * Không tạo emotion.
 * Không quyết định action.
 */
export function applyAppraisalToWorkspace(
  workspace: CognitiveTurnWorkspace,
  proposal: unknown,
): CognitiveTurnWorkspace {
  if (workspace.stage !== "created") {
    throw new Error(
      `Invalid appraisal transition from stage: ${workspace.stage}`,
    );
  }

  const sanitized =
    sanitizeAppraisalProposal(proposal);

  const next: CognitiveTurnWorkspace = {
    ...workspace,

    provisional: {
      ...workspace.provisional,
      appraisal: sanitized,
    },
  };

  return advanceWorkspaceStage(
    next,
    "appraisal",
    sanitized.rationaleSummary ||
      "Event meaning appraised without mutating canonical mind.",
  );
}