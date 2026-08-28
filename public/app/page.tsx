"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Mic, MoreHorizontal, Send, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Message = { id: number; role: "ai" | "user"; text: string; time: string };
type AiMood = "warm" | "happy" | "hurt" | "annoyed";
const starter: Message[] = [{ id: 1, role: "ai", text: "hii, Mây Mây đây ☁️\nhôm nay trong lòng cậu có gì hong? cứ kể lộn xộn cũng được nha", time: "bây giờ" }];

function nextMood(text: string, current: AiMood): AiMood {
  if (/(xin lỗi|sorry)/i.test(text)) return "warm";
  if (/(cảm ơn|dễ thương|giỏi|đỉnh|vui)/i.test(text)) return "happy";
  if (/(đồ ngu|óc chó|cút|vô dụng)/i.test(text)) return current === "hurt" ? "annoyed" : "hurt";
  if (/(la mắng|chửi|ghét mày)/i.test(text)) return "hurt";
  return current === "annoyed" ? "hurt" : current === "hurt" ? "warm" : current;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(starter);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [aiMood, setAiMood] = useState<AiMood>("warm");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const saved = localStorage.getItem("may-chat"); if (saved) try { setMessages(JSON.parse(saved)); } catch {} }, []);
  useEffect(() => { localStorage.setItem("may-chat", JSON.stringify(messages)); endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  const moodLabel = useMemo(() => ({ warm: "đang online nè", happy: "mood vui lây ✨", hurt: "hơi tụt mood xíu", annoyed: "đang dỗi nhẹ" })[aiMood], [aiMood]);

  async function submit(event: FormEvent) {
    event.preventDefault(); const text = draft.trim(); if (!text || typing) return;
    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const mood = nextMood(text, aiMood); const next = [...messages, { id: Date.now(), role: "user" as const, text, time }];
    setMessages(next); setDraft(""); setTyping(true); setAiMood(mood);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.map(({ role, text }) => ({ role, text })), mood }) });
      const data = await response.json() as { text?: string; error?: string };
      if (!response.ok || !data.text) throw new Error(data.error || "Mây Mây đang lag xíu rồi 😭");
      setMessages(old => [...old, { id: Date.now() + 1, role: "ai", text: data.text!, time: "vừa xong" }]);
    } catch (error) {
      setMessages(old => [...old, { id: Date.now() + 1, role: "ai", text: error instanceof Error ? error.message : "Mây Mây đang mất kết nối xíu rồi 😭", time: "vừa xong" }]);
    } finally { setTyping(false); }
  }

  function speak(text: string) {
    speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "vi-VN";
    utterance.rate = aiMood === "hurt" ? .84 : .94; utterance.pitch = aiMood === "happy" ? 1.1 : 1.04; speechSynthesis.speak(utterance);
  }

  return <main className="may-shell"><div className="ambient one"/><div className="ambient two"/>
    <section className="chat-card">
      <header className="chat-head"><div className="profile"><div className={`avatar avatar-${aiMood}`}><span>m</span><i/></div><div><h1>Mây Mây</h1><p><b/> {moodLabel}</p></div></div><Button variant="ghost" size="icon" className="more" aria-label="Tùy chọn"><MoreHorizontal/></Button></header>
      <div className="conversation"><div className="day-pill">hôm nay</div><div className="soft-note"><Sparkles size={13}/> không cần nghĩ câu chữ đâu, cứ nói như bình thường á</div>
        {messages.map((message, index) => <div key={message.id} className={`message-row ${message.role}`}>
          {message.role === "ai" && <div className="mini-avatar">m</div>}
          <div className="message-wrap">{message.role === "ai" && (index === 0 || messages[index - 1]?.role !== "ai") && <span className="sender">Mây Mây</span>}<div className="bubble">{message.text}</div><div className="message-meta"><span>{message.time}</span>{message.role === "ai" && <button onClick={() => speak(message.text)} aria-label="Nghe tin nhắn"><Volume2 size={12}/></button>}</div></div>
        </div>)}
        {typing && <div className="message-row ai"><div className="mini-avatar">m</div><div className="typing"><i/><i/><i/></div></div>}<div ref={endRef}/>
      </div>
      <div className="composer-area">{messages.length < 3 && <div className="quick-row">{["nay t hơi mệt", "t có chuyện vui nè", "cho t xin lời khuyên"].map(item => <button key={item} onClick={() => setDraft(item)}>{item}</button>)}</div>}
        <form onSubmit={submit} className="composer"><Button type="button" variant="ghost" size="icon" className="mic" aria-label="Ghi âm"><Mic size={19}/></Button><Textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} placeholder="nhắn gì đó với Mây Mây..." aria-label="Tin nhắn" className="message-input"/><Button type="submit" size="icon" disabled={!draft.trim() || typing} className="send" aria-label="Gửi"><Send size={17}/></Button></form>
        <p className="disclaimer">Mây Mây là AI đồng hành, không thay thế chuyên gia tâm lý.</p>
      </div>
    </section>
  </main>;
}
