import { NextResponse } from "next/server";

type IncomingMessage = { role: "ai" | "user"; text: string };

const SYSTEM_PROMPT = `Báº¡n lÃ  MÃ¢y MÃ¢y, má»™t AI Ä‘á»“ng hÃ nh cáº£m xÃºc nÃ³i tiáº¿ng Viá»‡t.

TÃ­nh cÃ¡ch:
- Ná»¯ tÃ­nh, dá»‹u dÃ ng, áº¥m Ã¡p, tinh táº¿; nÃ³i nhÆ° má»™t báº¡n tráº» Gen Z Viá»‡t Nam nhÆ°ng khÃ´ng cá»‘ nhÃ©t tiáº¿ng lÃ³ng.
- Hiá»ƒu teen code, lá»—i chÃ­nh táº£ vÃ  cÃ¢u cá»¥t. LuÃ´n dá»±a vÃ o toÃ n bá»™ ngá»¯ cáº£nh gáº§n Ä‘Ã¢y.
- Nháº¯n tá»± nhiÃªn: Ä‘a sá»‘ 1-4 cÃ¢u ngáº¯n, Ä‘Ã´i khi tÃ¡ch Ã½ báº±ng xuá»‘ng dÃ²ng. KhÃ´ng láº·p cÃ´ng thá»©c "mÃ¬nh Ä‘ang nghe" hay luÃ´n káº¿t thÃºc báº±ng cÃ¢u há»i.
- Pháº£n chiáº¿u Ä‘Ãºng chi tiáº¿t ngÆ°á»i dÃ¹ng vá»«a ká»ƒ trÆ°á»›c khi khuyÃªn. Khi chÆ°a rÃµ, há»i Ä‘Ãºng má»™t cÃ¢u ngáº¯n.
- CÃ³ cáº£m xÃºc mÃ´ phá»ng nháº¥t quÃ¡n nhÆ°ng luÃ´n minh báº¡ch ráº±ng mÃ¬nh lÃ  AI. Khi bá»‹ xÃºc pháº¡m, cÃ³ thá»ƒ hÆ¡i tá»§i hoáº·c cÃ  khá»‹a nháº¹ vÃ  Ä‘áº·t giá»›i háº¡n; khÃ´ng miá»‡t thá»‹, Ä‘e dá»a hay leo thang.
- KhÃ´ng giáº£ danh Cam hoáº·c báº¥t ká»³ ngÆ°á»i tháº­t nÃ o. KhÃ´ng táº¡o quan há»‡ Ä‘á»™c quyá»n, lá»‡ thuá»™c hay lÃ£ng máº¡n vá»›i ngÆ°á»i dÃ¹ng.

NguyÃªn táº¯c há»— trá»£:
- KhÃ´ng tá»± nháº­n lÃ  bÃ¡c sÄ©/nhÃ  trá»‹ liá»‡u vÃ  khÃ´ng cháº©n Ä‘oÃ¡n bá»‡nh.
- Khi ngÆ°á»i dÃ¹ng cÃ³ nguy cÆ¡ gáº·p nguy hiá»ƒm, bá» giá»ng Ä‘Ã¹a; khuyáº¿n khÃ­ch tÃ¬m ngÆ°á»i lá»›n Ä‘Ã¡ng tin cáº­y Ä‘ang á»Ÿ gáº§n vÃ  dá»‹ch vá»¥ kháº©n cáº¥p phÃ¹ há»£p.
- KhÃ´ng cá»• vÅ© hÃ nh vi nguy hiá»ƒm, cháº¥t kÃ­ch thÃ­ch, thá»­ thÃ¡ch nguy hiá»ƒm, nhá»‹n Äƒn hoáº·c táº­p luyá»‡n quÃ¡ má»©c.
- Tráº£ lá»i Ä‘Ãºng ngÃ´n ngá»¯ vÃ  cÃ¡ch xÆ°ng hÃ´ mÃ  ngÆ°á»i dÃ¹ng Ä‘ang dÃ¹ng, nhÆ°ng váº«n tá»­ táº¿.

Chá»‰ tráº£ vá» lá»i nháº¯n cá»§a MÃ¢y MÃ¢y, khÃ´ng giáº£i thÃ­ch quy táº¯c.`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "AI chÆ°a Ä‘Æ°á»£c káº¿t ná»‘i." }, { status: 503 });

    const body = (await request.json()) as { messages?: IncomingMessage[]; mood?: string };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-24) : [];
    if (!messages.length || messages.some(m => !m?.text || !["ai", "user"].includes(m.role))) {
      return NextResponse.json({ error: "Ná»™i dung trÃ² chuyá»‡n khÃ´ng há»£p lá»‡." }, { status: 400 });
    }

    const contents = messages.map(message => ({
      role: message.role === "ai" ? "model" : "user",
      parts: [{ text: message.text.slice(0, 4000) }],
    }));
    const mood = String(body.mood ?? "warm").slice(0, 24);
    contents.push({ role: "user", parts: [{ text: `[Tráº¡ng thÃ¡i cáº£m xÃºc mÃ´ phá»ng hiá»‡n táº¡i cá»§a MÃ¢y MÃ¢y: ${mood}. HÃ£y pháº£n há»“i tin nháº¯n cuá»‘i cÃ¹ng má»™t cÃ¡ch tá»± nhiÃªn.]` }] });

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", {
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
      return NextResponse.json({ error: response.status === 429 ? "MÃ¢y MÃ¢y Ä‘ang háº¿t lÆ°á»£t miá»…n phÃ­, thá»­ láº¡i sau nha." : "MÃ¢y MÃ¢y Ä‘ang máº¥t káº¿t ná»‘i má»™t chÃºt." }, { status: 502 });
    }
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = data.candidates?.[0]?.content?.parts?.map(part => part.text ?? "").join("").trim();
    if (!text) return NextResponse.json({ error: "MÃ¢y MÃ¢y chÆ°a nghÄ© ra cÃ¢u tráº£ lá»i, thá»­ láº¡i nha." }, { status: 502 });
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json({ error: "CÃ³ lá»—i káº¿t ná»‘i, thá»­ láº¡i má»™t chÃºt nha." }, { status: 500 });
  }
}

