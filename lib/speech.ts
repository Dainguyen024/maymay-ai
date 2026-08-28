export type SpeechEmotion = "comfort" | "happy" | "serious" | "playful";

const STYLE_BY_EMOTION: Record<SpeechEmotion, string> = {
  comfort: "[empathetic][soft tone]",
  happy: "[happy]",
  serious: "[calm]",
  playful: "[playful]",
};

function token(pattern: string) {
  // `\b` của JavaScript chỉ hiểu biên từ ASCII nên dễ ăn nhầm chữ có dấu.
  // Dùng biên Unicode để chỉ thay teen-code khi nó là một từ đứng riêng.
  return new RegExp(`(?<![\\p{L}\\p{N}_])(?:${pattern})(?![\\p{L}\\p{N}_])`, "giu");
}

const PHRASE_REPLACEMENTS: Array<[RegExp, string]> = [
  // Fish thường đọc sai dấu của cụm này; đổi cách nói nhưng giữ nguyên ý.
  [token("từ\\s+từ"), "chậm thôi"],
  [token("ừm"), "ừ"],
  [token("ko|kh|k|hông|hong"), "không"],
  [token("đc|dc"), "được"],
  [token("bth"), "bình thường"],
  [token("bâyh|bh"), "bây giờ"],
  [token("mn"), "mọi người"],
  [token("cx"), "cũng"],
  [token("vs"), "với"],
  [token("r"), "rồi"],
  [token("j"), "gì"],
  [token("t"), "mình"],
  [token("m"), "cậu"],
];

function stripForSpeech(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/[*_#>~|]/g, " ")
    // Bỏ emoji/ký hiệu trang trí nhưng giữ chữ, số và dấu câu tiếng Việt.
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, " ")
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeVietnameseSpeech(input: string) {
  let speech = stripForSpeech(input).slice(0, 1800);
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    speech = speech.replace(pattern, replacement);
  }

  speech = speech
    .replace(/\.{4,}/g, "...")
    .replace(/([!?]){2,}/g, "$1")
    .replace(/\s+([,.!?])/g, "$1")
    .replace(/([,.!?])(?=[^\s])/g, "$1 ")
    .replace(/\s+/g, " ")
    .trim();

  if (speech && !/[.!?…]$/.test(speech)) speech += ".";
  return speech;
}

export function styleSpeech(text: string, emotion: SpeechEmotion = "comfort") {
  const normalized = normalizeVietnameseSpeech(text);
  return normalized ? `${STYLE_BY_EMOTION[emotion]} ${normalized}` : "";
}

export function speechEmotionFromMood(mood?: string): SpeechEmotion {
  if (mood === "happy") return "happy";
  if (mood === "annoyed") return "playful";
  if (mood === "hurt") return "serious";
  return "comfort";
}
