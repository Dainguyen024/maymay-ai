# Mây Mây AI

Ứng dụng trò chuyện cảm xúc bằng Next.js, Gemini và giọng Fish Audio. Có chat chữ,
đọc tin nhắn và chế độ voice 1-1 dùng nhận giọng nói tiếng Việt của trình duyệt.

## Render

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment variables:
  - `GEMINI_API_KEY`: khóa Gemini
  - `GEMINI_MODEL`: mặc định `gemini-3.8-flash`
  - `GEMINI_FALLBACK_MODELS`: tùy chọn, mặc định thử `gemini-3.5-flash,gemini-3.5-flash-lite` khi model chính quá tải/lỗi tạm thời
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
- Fish TTS dùng tốc độ chậm nhẹ, độ biến thiên thấp, Unicode NFC và câu ngắn để hạn
  chế trôi thanh tiếng Việt. Cả nút loa và voice 1-1 đều dùng cùng cấu hình này.
- Lịch sử chat cũ bị lỗi UTF-8 sẽ được sửa tự động khi mở lại trang.

## Unified Core v17

- State cảm xúc, gu, facts và lời hứa được validate ở backend rồi lưu trong
  `localStorage` của chính trình duyệt. Frontend gửi state này lại ở mỗi lượt; không
  còn lỗi reset state do gửi nhầm trường `mood`.
- Backend cung cấp ngày giờ thật theo `Asia/Ho_Chi_Minh`; model không được tự đoán.
- Gemini phải trả JSON theo schema. Output sai schema, JSON bị cắt hoặc response quá
  lớn không được đẩy thẳng ra giao diện.
- Request chat/TTS có giới hạn kích thước, rate limit, timeout và model fallback.
- Tách tối đa ba bong bóng nhưng nếu model dùng thừa separator thì nội dung còn lại
  được gộp vào bong bóng cuối, không bị mất chữ.
- Memory hiện bền trên cùng trình duyệt. Muốn đồng bộ nhiều máy và chủ động gửi Web
  Push khi trang đóng vẫn cần database + scheduler riêng.

Trước khi deploy có thể chạy `npm run check` để typecheck, lint và build liên tiếp.
