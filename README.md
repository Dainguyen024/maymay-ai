# Mây Mây AI

Ứng dụng trò chuyện cảm xúc bằng Next.js, Gemini và giọng Fish Audio. Có chat chữ,
đọc tin nhắn và chế độ voice 1-1 dùng nhận giọng nói tiếng Việt của trình duyệt.

## Render

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment variables:
  - `GEMINI_API_KEY`: khóa Gemini
  - `GEMINI_MODEL`: mặc định `gemini-3.5-flash`
  - `FISH_AUDIO_API_KEY`: khóa API Fish Audio
  - `FISH_AUDIO_VOICE_ID`: ID giọng trong URL `fish.audio/m/<ID>`
  - `FISH_AUDIO_MODEL`: mặc định `s2.1-pro-free`

Không đưa API key vào mã nguồn hoặc GitHub. Trong Render, thêm các giá trị này tại
`Environment`. Không cần tự tạo biến `PORT` vì Render cấp biến này tự động.

## Cách hoạt động của voice

- Tin nhắn AI xuất hiện bằng chữ trước, sau đó mới phát giọng để không phải chờ audio.
- Bật `voice 1-1`, bấm mic và nói. Trình duyệt đổi giọng nói thành chữ, gửi Gemini rồi
  tự phát câu trả lời bằng giọng Fish Audio.
- Mọi câu trước khi đọc đều được làm sạch teen-code và sửa các cụm Fish dễ đọc sai
  trong `lib/speech.ts`. Muốn bổ sung từ đọc sai, thêm vào `PHRASE_REPLACEMENTS`.
