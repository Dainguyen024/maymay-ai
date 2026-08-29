// Client-safe helpers. Do not import server repository/database modules here.
export type MayChatResponse = {
  text: string;
  segments: string[];
  speechText: string;
  speechSegments: string[];
  emotion: string;
  delivery: {
    speechRate: number;
    pauseScale: number;
    energy: number;
    softness: number;
    expressiveness: number;
    tone: string;
  };
  uiMood: string;
  publicResponse: string;
  speechPlan: { speechText: string; delivery: MayChatResponse["delivery"] };
  agency: { action: "TALK" | "REDIRECT" | "REFUSE" | "DISENGAGE"; intensity: number; reasonSummary: string | null };
  action: "TALK" | "REDIRECT" | "REFUSE" | "DISENGAGE";
  relationshipMode: string;
};

export async function sendMayMessage(message: string): Promise<MayChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  if (!response.ok || !data?.text) throw new Error(data?.error || "Mây đang khựng kết nối một chút.");
  return data as MayChatResponse;
}

export async function pollMayProactiveMessages() {
  const response = await fetch("/api/maymay/proactive", { cache: "no-store" });
  if (!response.ok) return [] as Array<{ id: string; text: string; reason: string; createdAt: string }>;
  const data = await response.json();
  return Array.isArray(data?.messages) ? data.messages : [];
}

export async function updateMayAutonomySettings(settings: {
  proactiveEnabled?: boolean;
  timeZone?: string;
  quietHours?: { start?: string; end?: string };
}) {
  const response = await fetch("/api/maymay/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error("Không lưu được cài đặt chủ động của Mây.");
  return response.json();
}
