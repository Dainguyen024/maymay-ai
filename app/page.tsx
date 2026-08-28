"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AudioLines, Mic, MicOff, MoreHorizontal, Send, Sparkles, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { repairMojibake } from "@/lib/speech";

type SpeechEmotion = "comfort" | "happy" | "serious" | "playful";
type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
  time: string;
  speechText?: string;
  emotion?: SpeechEmotion;
};
type AiMood = "warm" | "happy" | "hurt" | "annoyed";
type RecognitionResultLike = { isFinal: boolean; 0?: { transcript?: string } };
type RecognitionEventLike = { results: ArrayLike<RecognitionResultLike> };
type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type RecognitionConstructor = new () => RecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

const starter: Message[] = [{
  id: 1,
  role: "ai",
  text: "hii, Mây Mây đây ☁️\nhôm nay trong lòng cậu có gì hong? cứ kể lộn xộn cũng được nha",
  speechText: "Chào cậu, Mây Mây đây. Hôm nay trong lòng cậu có chuyện gì không? Cậu cứ kể như bình thường nha.",
  emotion: "comfort",
  time: "bây giờ",
}];

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
  const [voiceMode, setVoiceMode] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [voiceStatus, setVoiceStatus] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const recognitionRef = useRef<RecognitionInstance | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("may-chat");
    if (saved) try {
      const parsed = JSON.parse(saved) as Message[];
      setMessages(parsed.map(message => ({
        ...message,
        text: repairMojibake(message.text),
        speechText: message.speechText ? repairMojibake(message.speechText) : undefined,
      })));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("may-chat", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);
  useEffect(() => () => {
    audioRef.current?.pause();
    recognitionRef.current?.abort();
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  }, []);

  const moodLabel = useMemo(() => ({
    warm: "đang online nè",
    happy: "mood vui lây ✨",
    hurt: "hơi tụt mood xíu",
    annoyed: "đang dỗi nhẹ",
  })[aiMood], [aiMood]);

  function stopVoice() {
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = null;
    setSpeakingId(null);
    setVoiceStatus("");
  }

  async function playVoice(message: Message) {
    if (speakingId === message.id) {
      stopVoice();
      return;
    }
    stopVoice();
    setSpeakingId(message.id);
    setVoiceStatus("đang chuẩn bị giọng Mây Mây...");
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message.speechText || message.text, emotion: message.emotion || "comfort" }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error || "Mây Mây chưa phát giọng được.");
      }

      const url = URL.createObjectURL(await response.blob());
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.playbackRate = .98;
      audioRef.current = audio;
      audioUrlRef.current = url;
      audio.onplay = () => setVoiceStatus("Mây Mây đang nói...");
      audio.onended = stopVoice;
      audio.onerror = () => {
        stopVoice();
        setVoiceStatus("audio bị lỗi, bấm loa thử lại nha");
      };
      await audio.play();
    } catch (error) {
      stopVoice();
      setVoiceStatus(error instanceof Error ? error.message : "Giọng Mây Mây đang lỗi một chút.");
    }
  }

  async function sendText(rawText: string, fromVoice = false) {
    const text = rawText.trim();
    if (!text || typing) return;
    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const mood = nextMood(text, aiMood);
    const next = [...messages, { id: Date.now(), role: "user" as const, text, time }];
    setMessages(next);
    setDraft("");
    setTyping(true);
    setAiMood(mood);
    setVoiceStatus(fromVoice ? "Mây Mây đang nghĩ..." : "");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, text: value }) => ({ role, text: value })), mood }),
      });
      const data = await response.json() as {
        text?: string;
        segments?: string[];
        speechText?: string;
        speechSegments?: string[];
        emotion?: SpeechEmotion;
        error?: string;
      };
      if (!response.ok || !data.text) throw new Error(repairMojibake(data.error || "Mây Mây đang lag xíu rồi 😭"));
      const rawSegments = Array.isArray(data.segments) && data.segments.length
        ? data.segments.slice(0, 3)
        : [data.text];
      const baseId = Date.now() + 1;
      const aiMessages: Message[] = rawSegments
        .map((segment, index) => ({
          id: baseId + index,
          role: "ai" as const,
          text: repairMojibake(segment).trim(),
          speechText: data.speechSegments?.[index]
            ? repairMojibake(data.speechSegments[index])
            : undefined,
          emotion: data.emotion || "comfort",
          time: "vừa xong",
        }))
        .filter(message => message.text);

      for (let index = 0; index < aiMessages.length; index += 1) {
        if (index > 0) {
          const humanPause = Math.min(850, 300 + aiMessages[index].text.length * 7);
          await new Promise(resolve => window.setTimeout(resolve, humanPause));
        }
        const message = aiMessages[index];
        setMessages(old => [...old, message]);
      }

      if ((voiceMode || fromVoice) && aiMessages.length) {
        const speakingMessage: Message = {
          ...aiMessages[aiMessages.length - 1],
          text: repairMojibake(data.text),
          speechText: data.speechText ? repairMojibake(data.speechText) : undefined,
        };
        void playVoice(speakingMessage);
      }
    } catch (error) {
      setMessages(old => [...old, {
        id: Date.now() + 1,
        role: "ai",
        text: error instanceof Error ? error.message : "Mây Mây đang mất kết nối xíu rồi 😭",
        time: "vừa xong",
      }]);
      setVoiceStatus("");
    } finally {
      setTyping(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    await sendText(draft);
  }

  function startListening() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setVoiceStatus("");
      return;
    }
    if (typing) return;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus("Chrome này chưa hỗ trợ nhận giọng nói, thử Chrome hoặc Edge bản mới nha.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      let transcript = "";
      for (let index = 0; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) transcript += event.results[index][0]?.transcript ?? "";
      }
      setListening(false);
      recognitionRef.current = null;
      if (transcript.trim()) void sendText(transcript, true);
    };
    recognition.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
      setVoiceStatus("Mây Mây chưa nghe rõ, bấm mic nói lại nha.");
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    setVoiceMode(true);
    setListening(true);
    setVoiceStatus("đang nghe cậu nói...");
    recognitionRef.current = recognition;
    recognition.start();
  }

  function toggleVoiceMode() {
    const next = !voiceMode;
    setVoiceMode(next);
    if (!next) {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      setListening(false);
      stopVoice();
    } else {
      setVoiceStatus("voice 1-1 đã bật, bấm mic để nói");
    }
  }

  return <main className="may-shell"><div className="ambient one"/><div className="ambient two"/>
    <section className="chat-card">
      <header className="chat-head"><div className="profile"><div className={`avatar avatar-${aiMood}`}><span>m</span><i/></div><div><h1>Mây Mây</h1><p><b/> {moodLabel}</p></div></div><div className="head-actions"><button type="button" className={`voice-toggle ${voiceMode ? "active" : ""}`} onClick={toggleVoiceMode} aria-pressed={voiceMode}><AudioLines size={15}/><span>{voiceMode ? "voice đang bật" : "voice 1-1"}</span></button><Button variant="ghost" size="icon" className="more" aria-label="Tùy chọn"><MoreHorizontal/></Button></div></header>
      <div className="conversation"><div className="day-pill">hôm nay</div><div className="soft-note"><Sparkles size={13}/> không cần nghĩ câu chữ đâu, cứ nói như bình thường á</div>
        {messages.map((message, index) => <div key={message.id} className={`message-row ${message.role} ${message.role === "ai" && messages[index - 1]?.role === "ai" ? "continuation" : ""}`}>
          {message.role === "ai" && <div className={`mini-avatar ${messages[index - 1]?.role === "ai" ? "avatar-hidden" : ""}`}>m</div>}
          <div className="message-wrap">{message.role === "ai" && (index === 0 || messages[index - 1]?.role !== "ai") && <span className="sender">Mây Mây</span>}<div className="bubble">{message.text}</div><div className="message-meta"><span>{message.time}</span>{message.role === "ai" && <button onClick={() => void playVoice(message)} aria-label={speakingId === message.id ? "Dừng giọng" : "Nghe tin nhắn"}>{speakingId === message.id ? <Square size={11}/> : <Volume2 size={12}/>}</button>}</div></div>
        </div>)}
        {typing && <div className="message-row ai"><div className="mini-avatar">m</div><div className="typing"><i/><i/><i/></div></div>}<div ref={endRef}/>
      </div>
      <div className="composer-area">{voiceStatus && <div className={`voice-status ${listening ? "listening" : ""}`}>{listening && <i/>}{voiceStatus}</div>}{messages.length < 3 && <div className="quick-row">{["nay t hơi mệt", "t có chuyện vui nè", "cho t xin lời khuyên"].map(item => <button key={item} onClick={() => setDraft(item)}>{item}</button>)}</div>}
        <form onSubmit={submit} className="composer"><Button type="button" variant="ghost" size="icon" className={`mic ${listening ? "recording" : ""}`} onClick={startListening} aria-label={listening ? "Dừng nghe" : "Nói với Mây Mây"}>{listening ? <MicOff size={19}/> : <Mic size={19}/>}</Button><Textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={voiceMode ? "bấm mic rồi nói với Mây Mây..." : "nhắn gì đó với Mây Mây..."} aria-label="Tin nhắn" className="message-input"/><Button type="submit" size="icon" disabled={!draft.trim() || typing} className="send" aria-label="Gửi"><Send size={17}/></Button></form>
        <p className="disclaimer">Mây Mây là AI đồng hành, không thay thế chuyên gia tâm lý. Mic chỉ bật khi cậu bấm.</p>
      </div>
    </section>
  </main>;
}
