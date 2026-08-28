import { NextResponse } from "next/server";
import { SpeechEmotion, styleSpeech } from "@/lib/speech";

const EMOTIONS = new Set<SpeechEmotion>(["comfort", "happy", "serious", "playful"]);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.FISH_AUDIO_API_KEY;
    const referenceId = process.env.FISH_AUDIO_VOICE_ID;
    if (!apiKey || !referenceId) {
      return NextResponse.json({ error: "Giọng Mây Mây chưa được kết nối." }, { status: 503 });
    }

    const body = (await request.json()) as { text?: string; emotion?: SpeechEmotion };
    const text = String(body.text ?? "").trim();
    if (!text || text.length > 2400) {
      return NextResponse.json({ error: "Câu đọc không hợp lệ." }, { status: 400 });
    }

    const emotion = EMOTIONS.has(body.emotion as SpeechEmotion) ? body.emotion as SpeechEmotion : "comfort";
    const speechText = styleSpeech(text, emotion);
    const response = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        model: process.env.FISH_AUDIO_MODEL ?? "s2.1-pro-free",
      },
      body: JSON.stringify({
        text: speechText,
        reference_id: referenceId,
        format: "mp3",
        mp3_bitrate: 128,
        normalize: false,
        prosody: { speed: 0.97, volume: 0 },
        temperature: 0.55,
        top_p: 0.7,
      }),
      signal: AbortSignal.timeout(45_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Fish Audio request failed", response.status, detail.slice(0, 500));
      const message = response.status === 429
        ? "Giọng Mây Mây đang bận, thử lại một chút nha."
        : "Mây Mây chưa phát giọng được lúc này.";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "audio/mpeg",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("TTS route error", error);
    return NextResponse.json({ error: "Có lỗi tạo giọng, thử lại nha." }, { status: 500 });
  }
}
