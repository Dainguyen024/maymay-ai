import { NextResponse } from "next/server";
import { SpeechEmotion, styleSpeech } from "@/lib/speech";
import { parseBoundedJson, ttsRequestSchema } from "@/lib/maymay-schemas";
import { checkRateLimit } from "@/lib/rate-limit";

const EMOTIONS = new Set<SpeechEmotion>(["comfort", "happy", "serious", "playful"]);

export async function POST(request: Request) {
  try {
    const limit = checkRateLimit(request, "tts", 18);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Giọng Mây đang nhận quá nhiều lượt, chờ một chút nha." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        },
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = "YlfinSFWQzGhbK3PYlDC";

if (!apiKey) {
  return NextResponse.json(
    { error: "Giọng Mây Mây chưa được kết nối." },
    { status: 503 }
  );
}

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) {
      return NextResponse.json({ error: "Câu đọc quá lớn." }, { status: 413 });
    }

    const parsed = parseBoundedJson(await request.text(), 12_000);
    const validation = parsed.ok ? ttsRequestSchema.safeParse(parsed.value) : null;
    if (!validation?.success) {
      return NextResponse.json({ error: "Câu đọc không hợp lệ." }, { status: 400 });
    }

    const { text } = validation.data;
    const emotion = EMOTIONS.has(validation.data.emotion as SpeechEmotion)
      ? (validation.data.emotion as SpeechEmotion)
      : "comfort";
    const speechText = styleSpeech(text, emotion);
    const response = await fetch(
`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`,
  {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: speechText,
      model_id: "eleven_v3",
      voice_settings: {
  stability: 0.42,
  similarity_boost: 0.82,
  style: 0,
  use_speaker_boost: false,
  speed: 1.06,
},
    }),
    signal: AbortSignal.timeout(45_000),
  }
);

    if (!response.ok) {
      const detail = await response.text();
      console.error("Fish Audio request failed", response.status, detail.slice(0, 500));
      const message = response.status === 429
        ? "Giọng Mây Mây đang bận, thử lại một chút nha."
        : "Mây Mây chưa phát giọng được lúc này.";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    if (!response.body) {
  console.error("ElevenLabs returned an empty audio stream");

  return NextResponse.json(
    { error: "Mây chưa tạo được giọng lúc này, thử lại chút nha." },
    { status: 502 },
  );
}

const contentType =
  response.headers.get("content-type") ?? "audio/mpeg";

return new Response(response.body, {
  status: 200,
  headers: {
    "Content-Type": contentType,

    // Không cache audio hội thoại
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",

    // Hạn chế proxy/server gom cả audio rồi mới gửi
    "X-Accel-Buffering": "no",

    // Cho browser xử lý như audio phát trực tiếp
    "Content-Disposition": "inline",
  },
});
    
  } catch (error) {
    console.error("TTS route error", error);
    return NextResponse.json({ error: "Có lỗi tạo giọng, thử lại nha." }, { status: 500 });
  }
}
