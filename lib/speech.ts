export type SpeechEmotion = "comfort" | "happy" | "serious" | "playful";

const WINDOWS_1252_BYTES = new Map<number, number>([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

const MOJIBAKE_MARKERS = /Ã|Â|Ä|Æ|áº|á»|â€|ï¿½/u;

/** Khôi phục chuỗi UTF-8 từng bị Windows đọc nhầm thành Windows-1252. */
export function repairMojibake(input: string) {
  if (!MOJIBAKE_MARKERS.test(input)) return input;
  try {
    const bytes: number[] = [];
    for (const character of input) {
      const codePoint = character.codePointAt(0) ?? 0;
      const byte = codePoint <= 0xff ? codePoint : WINDOWS_1252_BYTES.get(codePoint);
      if (byte === undefined) return input;
      bytes.push(byte);
    }
    const repaired = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
    return MOJIBAKE_MARKERS.test(repaired) ? input : repaired;
  } catch {
    return input;
  }
}

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
  return repairMojibake(value)
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
