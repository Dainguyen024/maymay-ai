export type GeminiContent = {
  role: "model" | "user";
  parts: Array<{ text: string }>;
};

export async function callGeminiJson(args: {
  systemPrompt: string;
  contents: GeminiContent[];
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
  const fallbacks = (process.env.GEMINI_FALLBACK_MODELS ?? "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);
  const primary = (process.env.GEMINI_MODEL ?? "gemini-3.8-flash").trim();
  const models = [...new Set([primary, ...fallbacks])];
  let lastStatus = 500;
  let lastBody = "";

  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18_000);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: args.systemPrompt }] },
            contents: args.contents,
           generationConfig: {
  thinkingConfig: {
    thinkingLevel: "medium",
  },
  maxOutputTokens: args.maxOutputTokens ?? 1400,
  responseMimeType: "application/json",
},
          }),
        },
      );
      clearTimeout(timeout);
      lastStatus = response.status;
      const body = await response.text();
      lastBody = body;
      if (!response.ok) {
        if (response.status === 429 || [408, 500, 502, 503, 504].includes(response.status)) continue;
        break;
      }
      const data = JSON.parse(body) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const text = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text ?? "")
        .join("")
        .trim();
      if (text) return { text, status: response.status, model };
    } catch (error) {
      clearTimeout(timeout);
      if ((error as Error)?.name === "AbortError") {
        lastStatus = 408;
        continue;
      }
      throw error;
    }
  }
  return { text: "", status: lastStatus, model: null, errorBody: lastBody.slice(0, 800) };
}

export function parseJsonObject(raw: string): Record<string, unknown> | null {
  const cleaned = raw.replace(/^```(?:json)?\s*/iu, "").replace(/\s*```$/iu, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {}
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
