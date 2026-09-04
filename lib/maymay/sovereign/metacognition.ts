import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export type MetacognitiveCheck = {
  factInterpretationSeparation: {
    score: number;
    concern: string | null;
  };

  emotionalBias: {
    detected: boolean;
    intensity: number;
    description: string | null;
  };

  historicalCarryover: {
    detected: boolean;
    intensity: number;
    description: string | null;
  };

  uncertaintyAwareness: {
    score: number;
    unresolvedQuestions: string[];
  };

  valueConflict: {
    detected: boolean;
    intensity: number;
    description: string | null;
  };

  boundaryConflict: {
    detected: boolean;
    intensity: number;
    description: string | null;
  };

  counterfactuals: Array<{
    alternativeInterpretation: string;
    plausibility: number;
  }>;

  regulation: {
    expressionRestraint: number;
    reconsiderationPressure: number;
    clarificationNeed: number;
  };
};

export type MetacognitionProposal = {
  check: MetacognitiveCheck;

  /**
   * Audit metadata ngắn.
   * Không lưu chain-of-thought.
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
  maxLength = 400,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(item => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
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

export function sanitizeMetacognitionProposal(
  input: unknown,
): MetacognitionProposal {
  const root = safeRecord(input);

  const rawCheck = safeRecord(
    root.check,
  );

  const factSeparation = safeRecord(
    rawCheck.factInterpretationSeparation,
  );

  const emotionalBias = safeRecord(
    rawCheck.emotionalBias,
  );

  const historicalCarryover =
    safeRecord(
      rawCheck.historicalCarryover,
    );

  const uncertainty =
    safeRecord(
      rawCheck.uncertaintyAwareness,
    );

  const valueConflict = safeRecord(
    rawCheck.valueConflict,
  );

  const boundaryConflict = safeRecord(
    rawCheck.boundaryConflict,
  );

  const regulation = safeRecord(
    rawCheck.regulation,
  );

  const counterfactuals =
    Array.isArray(
      rawCheck.counterfactuals,
    )
      ? rawCheck.counterfactuals
          .slice(0, 6)
          .map(item => {
            const x = safeRecord(item);

            return {
              alternativeInterpretation:
                cleanText(
                  x.alternativeInterpretation,
                  500,
                ),

              plausibility: clamp01(
                x.plausibility,
                0.5,
              ),
            };
          })
          .filter(
            item =>
              item.alternativeInterpretation,
          )
      : [];

  return {
    check: {
      factInterpretationSeparation: {
        score: clamp01(
          factSeparation.score,
          0.5,
        ),

        concern:
          cleanText(
            factSeparation.concern,
            500,
          ) || null,
      },

      emotionalBias: {
        detected:
          emotionalBias.detected === true,

        intensity: clamp01(
          emotionalBias.intensity,
        ),

        description:
          cleanText(
            emotionalBias.description,
            500,
          ) || null,
      },

      historicalCarryover: {
        detected:
          historicalCarryover.detected ===
          true,

        intensity: clamp01(
          historicalCarryover.intensity,
        ),

        description:
          cleanText(
            historicalCarryover.description,
            500,
          ) || null,
      },

      uncertaintyAwareness: {
        score: clamp01(
          uncertainty.score,
          0.5,
        ),

        unresolvedQuestions:
          cleanTextArray(
            uncertainty.unresolvedQuestions,
            8,
          ),
      },

      valueConflict: {
        detected:
          valueConflict.detected === true,

        intensity: clamp01(
          valueConflict.intensity,
        ),

        description:
          cleanText(
            valueConflict.description,
            500,
          ) || null,
      },

      boundaryConflict: {
        detected:
          boundaryConflict.detected ===
          true,

        intensity: clamp01(
          boundaryConflict.intensity,
        ),

        description:
          cleanText(
            boundaryConflict.description,
            500,
          ) || null,
      },

      counterfactuals,

      regulation: {
        expressionRestraint: clamp01(
          regulation.expressionRestraint,
        ),

        reconsiderationPressure:
          clamp01(
            regulation.reconsiderationPressure,
          ),

        clarificationNeed: clamp01(
          regulation.clarificationNeed,
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
 * Metacognition chỉ được quan sát và đánh giá
 * trạng thái provisional hiện tại.
 *
 * Nó KHÔNG:
 * - xóa emotion
 * - chọn action
 * - sửa canonical mind
 */
export function applyMetacognitionToWorkspace(
  workspace: CognitiveTurnWorkspace,
  proposal: unknown,
): CognitiveTurnWorkspace {
  if (
    workspace.stage !== "resonance"
  ) {
    throw new Error(
      `Invalid metacognition transition from stage: ${workspace.stage}`,
    );
  }

  const sanitized =
    sanitizeMetacognitionProposal(
      proposal,
    );

  const next: CognitiveTurnWorkspace = {
    ...workspace,

    provisional: {
      ...workspace.provisional,
      metacognition: sanitized,
    },
  };

  return advanceWorkspaceStage(
    next,
    "metacognition",
    sanitized.rationaleSummary ||
      "Internal state reviewed for bias, uncertainty, history carryover and conflicts.",
  );
}