import { NextResponse } from "next/server";
import {
  applyAutonomousAfterTurn,
  applyMayStateDelta,
  applyMemoryProposals,
  applyOpinionProposals,
  applyRelationshipDelta,
  calculateMemoryActivations,
  clamp,
  clamp01,
  decayStateBeforeTurn,
  deliveryFallbackForState,
  deriveRelationshipMode,
  markMemoryResurfaced,
  safeText,
  sanitizeDelivery,
  sanitizeInternalGoalProposal,
  sanitizeSelfObservation,
  validateAgencyDecision,
} from "@/lib/maymay/evolution";
import { buildRuntimePrompt, buildTemporalContext } from "@/lib/maymay/prompt";
import { callGeminiJson, parseJsonObject } from "@/lib/maymay/gemini";
import {
  actorIdentity,
  appendConversationMessage,
  commitTurn,
  loadRuntimeBundle,
  StateConflictError,
} from "@/lib/maymay/repository";
import type {
  AgencyDecision,
  CognitiveState,
  Delivery,
  IncomingMessage,
  InternalGoalProposal,
  MayModelEnvelope,
  MayState,
  MemoryEdge,
  MemoryNode,
  MemoryUpdateProposal,
  ModelStateDelta,
  Mood,
  OpinionUpdateProposal,
  PersonaLearningSignal,
  RelationshipDelta,
  RuntimeBundle,
} from "@/types/maymay";

const MOODS: Mood[] = ["warm","calm","happy","playful","curious","serious","awkward","embarrassed","hurt","annoyed","cold"];
const STANCES: CognitiveState["stance"][] = ["neutral","curious","skeptical","amused","guarded","annoyed","withdrawn"];
const INTENTS: CognitiveState["intent"][] = ["answer","explore","challenge","banter","comfort","redirect","refuse","close"];
const ACTIONS: AgencyDecision["action"][] = ["TALK","REDIRECT","REFUSE","DISENGAGE"];
const MEMORY_KINDS: MemoryNode["kind"][] = ["fact","detail","moment","inside_joke","bond","wound","boundary","promise","impression","relationship","other"];
const MEMORY_VALENCES: MemoryNode["valence"][] = ["positive","negative","mixed","neutral"];
const MEMORY_RELATIONS: MemoryEdge["relation"][] = ["caused","contradicts","reinforces","reminds_of","resolved_by","related_to"];
const PERSONA_FIELDS: PersonaLearningSignal["field"][] = [
  "traits.playfulness","traits.directness","traits.softness","traits.skepticism","traits.curiosity","traits.patience","traits.assertiveness",
  "communicationPreferences","socialPreferences","boundaries","values","selfDescription",
];

function strings(value: unknown, max = 12, len = 100) {
  return Array.isArray(value)
    ? value.map(v => safeText(v, len)).filter((v): v is string => Boolean(v)).slice(0, max)
    : [];
}
function clean(value: string) {
  return value.normalize("NFC").replace(/^```(?:json)?\s*/iu, "").replace(/\s*```$/iu, "").trim();
}
function splitBubbles(value: string) {
  const segments = value.split(/\s*\|\|\|\s*/u).map(v => v.trim()).filter(Boolean).slice(0, 3);
  return segments.length ? segments : [value.trim()];
}
function normalizeSpeech(value: string) {
  return value.replace(/\|\|\|/gu, " ").replace(/\s+/gu, " ").trim();
}
function frontendMood(mood: Mood) {
  if (mood === "annoyed" || mood === "cold") return "annoyed";
  if (mood === "hurt" || mood === "serious") return "thinking";
  if (mood === "playful" || mood === "happy") return "happy";
  return "idle";
}
function speechEmotion(mood: ReturnType<typeof frontendMood>) {
  return mood === "happy" ? "playful" : mood === "annoyed" ? "serious" : mood === "thinking" ? "soft" : "warm";
}
function stateDelta(input: unknown): ModelStateDelta {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string, unknown>;
  const limits: Record<keyof ModelStateDelta, number> = {
    energy:.1,patience:.12,curiosity:.1,interest:.12,hurt:.14,irritation:.16,resentment:.08,warmth:.1,playfulness:.1,confidence:.08,socialBattery:.1,needForSpace:.12,initiative:.1,
  };
  const out: ModelStateDelta = {};
  for (const key of Object.keys(limits) as Array<keyof ModelStateDelta>) {
    const n = Number(raw[key]);
    if (Number.isFinite(n)) out[key] = clamp(n, -limits[key], limits[key], 0);
  }
  return out;
}
function memoryEdges(input: unknown): MemoryEdge[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 12).flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const raw = item as Record<string, unknown>;
    const targetId = safeText(raw.targetId, 100);
    if (!targetId || !MEMORY_RELATIONS.includes(raw.relation as MemoryEdge["relation"])) return [];
    return [{ targetId, relation: raw.relation as MemoryEdge["relation"], strength: clamp01(raw.strength, .5) }];
  });
}
function memoryUpdates(input: unknown): MemoryUpdateProposal[] {
  const allowed: MemoryUpdateProposal["action"][] = ["add","reinforce","resolve","reinterpret","redact"];
  if (!Array.isArray(input)) return [];
  return input.slice(0, 8).flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const raw = item as Record<string, unknown>;
    if (!allowed.includes(raw.action as MemoryUpdateProposal["action"])) return [];
    const emotions = raw.emotions && typeof raw.emotions === "object" ? raw.emotions as Record<string,unknown> : null;
    return [{
      action: raw.action as MemoryUpdateProposal["action"],
      id: safeText(raw.id,100) ?? undefined,
      event: safeText(raw.event,360) ?? undefined,
      interpretation: safeText(raw.interpretation,420) ?? undefined,
      kind: MEMORY_KINDS.includes(raw.kind as MemoryNode["kind"]) ? raw.kind as MemoryNode["kind"] : undefined,
      valence: MEMORY_VALENCES.includes(raw.valence as MemoryNode["valence"]) ? raw.valence as MemoryNode["valence"] : undefined,
      importance: raw.importance === undefined ? undefined : clamp01(raw.importance,.5),
      emotions: emotions ? { warmth:clamp01(emotions.warmth), amusement:clamp01(emotions.amusement), trust:clamp01(emotions.trust), hurt:clamp01(emotions.hurt), irritation:clamp01(emotions.irritation) } : undefined,
      edges: memoryEdges(raw.edges),
      relationshipCritical: Boolean(raw.relationshipCritical),
      reasonSummary: safeText(raw.reasonSummary,260),
    }];
  });
}
function opinionUpdates(input: unknown): OpinionUpdateProposal[] {
  if (!Array.isArray(input)) return [];
  const operations = ["strengthen","weaken","revise","split"] as const;
  return input.slice(0, 8).flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const raw = item as Record<string,unknown>;
    const topic = safeText(raw.topic,180), stance = safeText(raw.stance,320);
    if (!topic || !stance) return [];
    return [{ topic, stance, confidence:clamp01(raw.confidence,.55), flexibility:clamp01(raw.flexibility,.7), reasoningSummary:safeText(raw.reasoningSummary,420) ?? "", evidenceMemoryIds:strings(raw.evidenceMemoryIds,24,100), operation:operations.includes(raw.operation as any) ? raw.operation as any : "revise" }];
  });
}
function relationshipDelta(input: unknown): RelationshipDelta {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string,unknown>;
  const keys: Array<keyof RelationshipDelta> = ["familiarity","trust","closeness","comfort","respect","attachment","friction","guardedness"];
  const out: RelationshipDelta = {};
  for (const key of keys) {
    const n = Number(raw[key]);
    if (Number.isFinite(n)) out[key] = clamp(n,-.12,.12,0);
  }
  return out;
}
function personaSignals(input: unknown): PersonaLearningSignal[] {
  if (!Array.isArray(input)) return [];
  const directions: PersonaLearningSignal["direction"][] = ["increase","decrease","add","remove","revise"];
  return input.slice(0, 8).flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const raw = item as Record<string,unknown>;
    if (!PERSONA_FIELDS.includes(raw.field as any) || !directions.includes(raw.direction as any)) return [];
    const reasonSummary = safeText(raw.reasonSummary,300);
    if (!reasonSummary) return [];
    return [{ field:raw.field as any, direction:raw.direction as any, strength:clamp01(raw.strength,.4), evidenceMemoryIds:strings(raw.evidenceMemoryIds,20,100), reasonSummary }];
  });
}
function goalSignals(input: unknown): InternalGoalProposal[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0,5).map(sanitizeInternalGoalProposal).filter((v): v is InternalGoalProposal => Boolean(v));
}
function envelope(input: Record<string, unknown>, state: MayState): MayModelEnvelope | null {
  const publicResponse = safeText(input.publicResponse, 6000);
  if (!publicResponse) return null;
  const c = input.cognitiveState && typeof input.cognitiveState === "object" ? input.cognitiveState as Record<string,unknown> : {};
  const a = input.agency && typeof input.agency === "object" ? input.agency as Record<string,unknown> : {};
  const s = input.speechPlan && typeof input.speechPlan === "object" ? input.speechPlan as Record<string,unknown> : {};
  const d = s.delivery && typeof s.delivery === "object" ? s.delivery : {};
  return {
    publicResponse,
    mood: MOODS.includes(input.mood as Mood) ? input.mood as Mood : state.mood,
    cognitiveState: {
      stance: STANCES.includes(c.stance as any) ? c.stance as any : "neutral",
      intent: INTENTS.includes(c.intent as any) ? c.intent as any : "answer",
      engagement: clamp01(c.engagement,.55), confidence:clamp01(c.confidence,.65),
      memoryFocusIds:strings(c.memoryFocusIds,8,100), opinionFocusIds:strings(c.opinionFocusIds,8,100), emotionalCause:safeText(c.emotionalCause,240),
    },
    agency:{ action:ACTIONS.includes(a.action as any) ? a.action as any : "TALK", intensity:clamp01(a.intensity,.3), reasonSummary:safeText(a.reasonSummary,220) },
    stateDelta:stateDelta(input.stateDelta), emotionCause:safeText(input.emotionCause,240), unresolvedIssue: input.unresolvedIssue === null ? null : safeText(input.unresolvedIssue,240),
    memoryUpdates:memoryUpdates(input.memoryUpdates), opinionUpdates:opinionUpdates(input.opinionUpdates), relationshipDelta:relationshipDelta(input.relationshipDelta), personaSignals:personaSignals(input.personaSignals),
    selfObservation:sanitizeSelfObservation(input.selfObservation), goalSignals:goalSignals(input.goalSignals),
    speechPlan:{ speechText:safeText(s.speechText,6000) ?? publicResponse, delivery:sanitizeDelivery(d, deliveryFallbackForState(state)) },
  };
}
function turnDirection(messages: IncomingMessage[], state: MayState) {
  const last = messages[messages.length - 1]?.text ?? "";
  const long = last.length > 700 || /giải thích|chi tiết|phân tích|code|kiến trúc/iu.test(last);
  return long ? "Trả lời đủ chiều sâu; vẫn giữ giọng tự nhiên của Mây." : state.needForSpace > .55 ? "Giữ câu trả lời gọn, không mở thêm quá nhiều nhánh." : "Chat tự nhiên, trực tiếp, không máy móc.";
}
function contentFromMessages(messages: IncomingMessage[]) {
  return messages.slice(-36).reduce<Array<{role:"model"|"user";parts:Array<{text:string}>}>>((all,m) => {
    const role = m.role === "ai" ? "model" : "user";
    const text = m.text.normalize("NFC").slice(0,5000);
    const prev = all[all.length-1];
    if (prev?.role === role) prev.parts[0].text += `\n${text}`;
    else all.push({role,parts:[{text}]});
    return all;
  },[]);
}

async function runTurn(bundle: RuntimeBundle, userText: string) {
  const relationship = bundle.relationship;
  const state = decayStateBeforeTurn({ state: bundle.state, memories: bundle.memories, relationship });
  const relationshipMode = deriveRelationshipMode(relationship);
  const lastStored = bundle.conversation[bundle.conversation.length - 1];
  const messages: IncomingMessage[] = (
    lastStored?.role === "user" && lastStored.text === userText
      ? bundle.conversation
      : [...bundle.conversation, { role: "user" as const, text: userText }]
  ).slice(-36);
  const activations = calculateMemoryActivations({ memories:bundle.memories,state,relationship,latestUserText:userText });
  const temporal = buildTemporalContext({ timeZone:bundle.autonomous.timeZone, sessionTurns:state.turn, lastTurnAt:bundle.lastTurnAt });
  const prompt = buildRuntimePrompt({
    persona:bundle.persona,state,relationship,relationshipMode,memories:bundle.memories,memoryActivations:activations,opinions:bundle.opinions,temporal,latestUserText:userText,
    turnDirection:turnDirection(messages,state),selfModel:bundle.selfModel,autonomous:bundle.autonomous,recentReflections:bundle.recentReflections,memoryTokenBudget:900,opinionTokenBudget:420,selfTokenBudget:520,
  });
  const model = await callGeminiJson({ systemPrompt:prompt.prompt, contents:contentFromMessages(messages), temperature:.9, topP:.95, maxOutputTokens:1500 });
  if (!model.text) throw new Error(model.status === 429 ? "quota" : "model_unavailable");
  const parsed = parseJsonObject(model.text);
  let env = parsed ? envelope(parsed,state) : null;
  if (!env) {
    const fallback = clean(model.text) || "ơ khoan, mây vừa khựng mất một nhịp 😭";
    env = envelope({ publicResponse:fallback, mood:state.mood, cognitiveState:{}, agency:{action:"TALK"}, stateDelta:{}, memoryUpdates:[], opinionUpdates:[], relationshipDelta:{}, personaSignals:[], selfObservation:{}, goalSignals:[], speechPlan:{speechText:fallback,delivery:{}} }, state)!;
  }
  const memProjection = applyMemoryProposals({ memories:bundle.memories, proposals:env.memoryUpdates, turn:state.turn+1 });
  let nextMemories = memProjection.memories;
  const nextOpinions = applyOpinionProposals({ opinions:bundle.opinions, proposals:env.opinionUpdates, turn:state.turn+1 });
  const nextRelationship = applyRelationshipDelta(relationship,env.relationshipDelta);
  const nextState = applyMayStateDelta({ previous:state,delta:env.stateDelta,mood:env.mood,emotionCause:env.emotionCause,unresolvedIssue:env.unresolvedIssue,memories:nextMemories,relationship:nextRelationship });
  const action = validateAgencyDecision(env.agency,nextState,nextRelationship);
  const focused = prompt.resurfacingCandidateId && env.cognitiveState.memoryFocusIds.includes(prompt.resurfacingCandidateId) ? prompt.resurfacingCandidateId : null;
  nextMemories = markMemoryResurfaced(nextMemories,focused,nextState.turn);
  const relationshipShift = (Object.keys(relationship) as Array<keyof typeof relationship>).reduce((sum,key)=>sum+Math.abs(nextRelationship[key]-relationship[key]),0);
  const significantEvents = memProjection.events.filter(e => e.type === "MEMORY_CREATED" && (e.memory.importance >= .72 || e.memory.relationshipCritical)).length;
  const nextAutonomous = applyAutonomousAfterTurn({ autonomous:bundle.autonomous,selfObservation:env.selfObservation,cognitiveEngagement:env.cognitiveState.engagement,cognitiveStance:env.cognitiveState.stance,goalSignals:env.goalSignals,significantMemoryEvents:significantEvents,relationshipShift,opinionUpdates:env.opinionUpdates.length });
  const segments = splitBubbles(clean(env.publicResponse));
  const text = segments.join("\n\n");
  const delivery: Delivery = sanitizeDelivery(env.speechPlan.delivery,deliveryFallbackForState(nextState));
  const speechText = normalizeSpeech(env.speechPlan.speechText || text);
  return { text,segments,speechText,delivery,nextState,nextRelationship,nextMemories,nextOpinions,nextAutonomous,selfObservation:env.selfObservation,action,relationshipMode:deriveRelationshipMode(nextRelationship),focused,memoryEvents:memProjection.events };
}

export async function POST(request: Request) {
  try {
    const identity = actorIdentity(request);
    const body = await request.json() as { message?: string; messages?: IncomingMessage[] };
    const legacyLast = Array.isArray(body.messages) ? [...body.messages].reverse().find(m => m?.role === "user" && typeof m.text === "string")?.text : undefined;
    const userText = safeText(body.message ?? legacyLast, 5000);
    if (!userText) return NextResponse.json({error:"Nội dung trò chuyện không hợp lệ."},{status:400});

    let bundle = await loadRuntimeBundle(identity.actorId);
    await appendConversationMessage(identity.actorId,"user",userText);
    let result;
    try {
      result = await runTurn(bundle,userText);
      await commitTurn({ actorId:identity.actorId,expectedRevision:bundle.revision,state:result.nextState,relationship:result.nextRelationship,memories:result.nextMemories,memoryEvents:result.memoryEvents,opinions:result.nextOpinions,autonomous:result.nextAutonomous,selfObservation:result.selfObservation,assistantText:result.text,focusedResurfacingId:result.focused });
    } catch (error) {
      if (!(error instanceof StateConflictError)) throw error;
      bundle = await loadRuntimeBundle(identity.actorId);
      result = await runTurn(bundle,userText);
      await commitTurn({ actorId:identity.actorId,expectedRevision:bundle.revision,state:result.nextState,relationship:result.nextRelationship,memories:result.nextMemories,memoryEvents:result.memoryEvents,opinions:result.nextOpinions,autonomous:result.nextAutonomous,selfObservation:result.selfObservation,assistantText:result.text,focusedResurfacingId:result.focused });
    }

    const uiMood = frontendMood(result.nextState.mood);
    const response = NextResponse.json({
      text:result.text, segments:result.segments, speechText:result.speechText,
      speechSegments:result.segments.map(normalizeSpeech), emotion:speechEmotion(uiMood), delivery:result.delivery, uiMood,
      publicResponse:result.text, speechPlan:{speechText:result.speechText,delivery:result.delivery}, agency:result.action, action:result.action.action, relationshipMode:result.relationshipMode,
      // No runtimeSnapshot/state/cognitiveState/self-model is returned. DB is authoritative.
    });
    if (identity.setCookie) response.headers.append("Set-Cookie",identity.setCookie);
    return response;
  } catch (error) {
    console.error("MayMay v12 chat error",error);
    const message = (error as Error)?.message === "quota" ? "Mây đang hết lượt model một chút, thử lại sau nha." : "Mây đang khựng kết nối một chút, thử lại nha.";
    return NextResponse.json({error:message},{status:502});
  }
}
