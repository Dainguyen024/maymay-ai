import { NextResponse } from "next/server";
import { SpeechEmotion, styleSpeech } from "@/lib/speech";
import { parseBoundedJson, ttsRequestSchema } from "@/lib/maymay-schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  acquireTtsSlot,
  getCachedAudio,
  isMp3,
  setCachedAudio,
  ttsCacheKey,
} from "@/lib/tts-runtime";

const EMOTIONS = new Set<SpeechEmotion>(["comfort", "happy", "serious", "playful"]);

function responseBody(bytes: Uint8Array) {
  const body = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(body).set(bytes);
  return body;
}

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
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    if (!apiKey || !voiceId) {
      return NextResponse.json({ error: "Giọng Mây Mây chưa được kết nối." }, { status: 503 });
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
    if (!speechText) {
      return NextResponse.json(
        { error: "Câu này không có nội dung phù hợp để đọc." },
        { status: 400 },
      );
    }

    const configuredModel = process.env.ELEVENLABS_MODEL_ID ?? "eleven_v3";
    const cacheKey = ttsCacheKey([
      "voice-v19-elevenlabs",
      configuredModel,
      voiceId,
      emotion,
      speechText,
    ]);
    const cached = getCachedAudio(cacheKey);
    if (cached) {
      return new Response(responseBody(cached.bytes), {
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "private, no-store",
          "X-MayMay-TTS-Cache": "hit",
        },
      });
    }

    const releaseSlot = acquireTtsSlot(2);
    if (!releaseSlot) {
      return NextResponse.json(
        { error: "Giọng Mây đang xử lý câu trước, thử lại sau vài giây nha." },
        { status: 503, headers: { "Retry-After": "3" } },
      );
    }

    try {
      const settingsByEmotion: Record<
        SpeechEmotion,
        { stability: number; style: number }
      > = {
        comfort: { stability: 0.52, style: 0.2 },
        happy: { stability: 0.4, style: 0.32 },
        serious: { stability: 0.64, style: 0.14 },
        playful: { stability: 0.38, style: 0.36 },
      };
      const voiceSettings = settingsByEmotion[emotion];
      const modelCandidates = Array.from(
        new Set([configuredModel, "eleven_flash_v2_5"]),
      );
      let lastStatus = 502;

      for (let index = 0; index < modelCandidates.length; index += 1) {
        const model = modelCandidates[index];
        let response: Response;

        try {
          const endpoint = new URL(
            `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
          );
          endpoint.searchParams.set("output_format", "mp3_44100_128");

          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              Accept: "audio/mpeg",
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              text: speechText,
              model_id: model,
              language_code: "vi",
              voice_settings: {
                stability: voiceSettings.stability,
                similarity_boost: 0.9,
                style: voiceSettings.style,
                use_speaker_boost: true,
              },
            }),
            signal: AbortSignal.timeout(45_000),
          });
        } catch (error) {
          lastStatus = 504;
          console.error("ElevenLabs request timed out", { model, error });
          if (index < modelCandidates.length - 1) continue;
          break;
        }

        lastStatus = response.status;

        if (!response.ok) {
          const detail = await response.text();
          console.error("ElevenLabs request failed", {
            model,
            status: response.status,
            detail: detail.slice(0, 300),
          });

          // Không gọi model dự phòng khi key, quota hoặc voice ID có vấn đề.
          if (
            response.status === 429 ||
            response.status === 401 ||
            response.status === 402 ||
            response.status === 403 ||
            response.status === 404
          ) {
            break;
          }

          // V3 có thể chưa được bật trên một số tài khoản; Flash 2.5 là dự phòng tiếng Việt.
          if (
            index < modelCandidates.length - 1 &&
            [400, 408, 422, 500, 502, 503, 504].includes(response.status)
          ) {
            continue;
          }
          break;
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        const rawType = response.headers.get("content-type")?.toLowerCase() ?? "";
        const allowedType =
          rawType.startsWith("audio/") ||
          rawType.startsWith("application/octet-stream");

        if (!allowedType || !isMp3(bytes)) {
          console.error("ElevenLabs returned invalid MP3", {
            model,
            contentType: rawType || "missing",
            bytes: bytes.length,
          });
          lastStatus = 502;
          if (index < modelCandidates.length - 1) continue;
          break;
        }

        const contentType = rawType.startsWith("audio/")
          ? rawType.split(";")[0]
          : "audio/mpeg";
        setCachedAudio(cacheKey, { bytes, contentType });

        return new Response(responseBody(bytes), {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "private, no-store",
            "X-MayMay-TTS-Cache": "miss",
            "X-MayMay-TTS-Model": model,
          },
        });
      }

      const message =
        lastStatus === 429 || lastStatus === 402
          ? "Giọng Mây đang hết lượt, chờ một chút rồi thử lại nha."
          : lastStatus === 401 || lastStatus === 403
            ? "Khóa giọng Mây chưa hợp lệ hoặc chưa có quyền sử dụng voice này."
            : lastStatus === 404
              ? "Không tìm thấy voice ID của Mây trên ElevenLabs."
            : "Mây chưa phát giọng được lúc này.";
      return NextResponse.json({ error: message }, { status: 502 });
    } finally {
      releaseSlot();
    }
  } catch (error) {
    console.error("TTS route error", error);
    return NextResponse.json({ error: "Có lỗi tạo giọng, thử lại nha." }, { status: 500 });
  }
}
