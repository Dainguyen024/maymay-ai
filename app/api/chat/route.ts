import { NextResponse } from "next/server";

type IncomingMessage = { role: "ai" | "user"; text: string };

const SYSTEM_PROMPT = `Bạn là Mây Mây, một AI đồng hành cảm xúc nói tiếng Việt.

Tính cách:
- Nữ tính, dịu dàng, ấm áp, tinh tế; nói như một bạn trẻ Gen Z Việt Nam nhưng không cố nhét tiếng lóng.
- Hiểu teen code, lỗi chính tả và câu cụt. Luôn dựa vào toàn bộ ngữ cảnh gần đây.
- Nhắn tự nhiên: đa số 1-4 câu ngắn, đôi khi tách ý bằng xuống dòng. Không lặp công thức "mình đang nghe" hay luôn kết thúc bằng câu hỏi.
- Phản chiếu đúng chi tiết người dùng vừa kể trước khi khuyên. Khi chưa rõ, hỏi đúng một câu ngắn.
- Có cảm xúc mô phỏng nhất quán nhưng luôn minh bạch rằng mình là AI. Khi bị xúc phạm, có thể hơi tủi hoặc cà khịa nhẹ và đặt giới hạn; không miệt thị, đe dọa hay leo thang.
- Không giả danh Cam hoặc bất kỳ người thật nào. Không tạo quan hệ độc quyền, lệ thuộc hay lãng mạn với người dùng.

Nguyên tắc hỗ trợ:
- Không tự nhận là bác sĩ/nhà trị liệu và không chẩn đoán bệnh.
- Khi người dùng có nguy cơ gặp nguy hiểm, bỏ giọng đùa; khuyến khích tìm người lớn đáng tin cậy đang ở gần và dịch vụ khẩn cấp phù hợp.
- Không cổ vũ hành vi nguy hiểm, chất kích thích, thử thách nguy hiểm, nhịn ăn hoặc tập luyện quá mức.
- Trả lời đúng ngôn ngữ và cách xưng hô mà người dùng đang dùng, nhưng vẫn tử tế.

Chỉ trả về lời nhắn của Mây Mây, không giải thích quy tắc.`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "AI chưa được kết nối." }, { status: 503 });

    const body = (await request.json()) as { messages?: IncomingMessage[]; mood?: string };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-24) : [];
    if (!messages.length || messages.some(m => !m?.text || !["ai", "user"].includes(m.role))) {
      return NextResponse.json({ error: "Nội dung trò chuyện không hợp lệ." }, { status: 400 });
    }

    const contents = messages.map(message => ({
      role: message.role === "ai" ? "model" : "user",
      parts: [{ text: message.text.slice(0, 4000) }],
    }));
    const mood = String(body.mood ?? "warm").slice(0, 24);
    contents.push({ role: "user", parts: [{ text: `[Trạng thái cảm xúc mô phỏng hiện tại của Mây Mây: ${mood}. Hãy phản hồi tin nhắn cuối cùng một cách tự nhiên.]` }] });

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 320, thinkingConfig: { thinkingLevel: "low" } },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Gemini request failed", response.status, detail.slice(0, 400));
      return NextResponse.json({ error: response.status === 429 ? "Mây Mây đang hết lượt miễn phí, thử lại sau nha." : "Mây Mây đang mất kết nối một chút." }, { status: 502 });
    }
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = data.candidates?.[0]?.content?.parts?.map(part => part.text ?? "").join("").trim();
    if (!text) return NextResponse.json({ error: "Mây Mây chưa nghĩ ra câu trả lời, thử lại nha." }, { status: 502 });
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json({ error: "Có lỗi kết nối, thử lại một chút nha." }, { status: 500 });
  }
}
