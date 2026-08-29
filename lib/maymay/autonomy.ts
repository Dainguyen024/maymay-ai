import { randomUUID } from "node:crypto";
import {
  type AutonomousEntityState,
  type HeartbeatAction,
  type HeartbeatPressure,
  type InternalGoal,
  type ReflectionEntry,
  type ReflectionModelEnvelope,
  type RuntimeBundle,
} from "@/types/maymay";
import {
  applyAutonomousTimePassage,
  applyGoalSignals,
  applyMemoryProposals,
  applyOpinionProposals,
  applyPersonaProposal,
  applySelfModelProposal,
  clamp,
  clamp01,
  safeText,
  sanitizeAutonomousState,
  sanitizeInternalGoalProposal,
} from "@/lib/maymay/evolution";
import { callGeminiJson, parseJsonObject } from "@/lib/maymay/gemini";
import {
  loadRuntimeBundle,
  proactiveCountSince,
  queueProactiveMessage,
  saveAutonomousState,
  saveHeartbeatAudit,
  saveReflectionResult,
} from "@/lib/maymay/repository";

const MAX_PROACTIVE_MESSAGES_PER_DAY = 2;
const MIN_PROACTIVE_COOLDOWN_HOURS = 4;
const MIN_IDLE_MINUTES_FOR_PROACTIVE = 45;

function average(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function activeGoalPriority(goals: InternalGoal[]) {
  return Math.max(0, ...goals.filter(g => g.status === "active").map(g => g.priority));
}

export function computeHeartbeatPressure(bundle: RuntimeBundle): HeartbeatPressure {
  const unresolved = bundle.memories.filter(m => m.unresolved && m.status !== "redacted");
  const unresolvedPressure = average(
    unresolved.slice(0, 8).map(memory => memory.importance * (memory.relationshipCritical ? 1 : 0.8)),
  );
  const observationPressure = average(bundle.pendingSelfObservations.map(item => item.severity));
  const conflictPressure = average(
    bundle.selfModel.unresolvedInternalConflicts
      .filter(item => item.status === "active")
      .slice(0, 6)
      .map(item => item.severity),
  );
  const goalPressure = activeGoalPriority(bundle.autonomous.goals);

  const reflectionPressure = clamp01(
    bundle.autonomous.drives.reflectionNeed * 0.38 +
      bundle.autonomous.drives.coherenceNeed * conflictPressure * 0.2 +
      unresolvedPressure * 0.16 +
      observationPressure * 0.2 +
      Math.min(1, bundle.autonomous.significantEventsSinceReflection / 5) * 0.06,
  );

  let interruptionCost = 0.18;
  if (bundle.lastTurnAt) {
    const minutes = Math.max(0, (Date.now() - new Date(bundle.lastTurnAt).getTime()) / 60_000);
    if (minutes < 15) interruptionCost = 0.78;
    else if (minutes < 45) interruptionCost = 0.58;
    else if (minutes < 120) interruptionCost = 0.35;
  }

  const proactivePressure = clamp01(
    bundle.autonomous.drives.curiosity * 0.22 +
      bundle.state.initiative * 0.2 +
      goalPressure * 0.26 +
      bundle.relationship.comfort * 0.08 +
      bundle.relationship.trust * 0.08 +
      bundle.autonomous.drives.socialEnergy * 0.1 -
      interruptionCost * 0.32,
  );

  return { reflectionPressure, proactivePressure, interruptionCost };
}

function decideHeartbeat(pressure: HeartbeatPressure, autonomous: AutonomousEntityState): HeartbeatAction {
  const reflect = pressure.reflectionPressure >= 0.56;
  const proactive = autonomous.proactiveEnabled && pressure.proactivePressure >= 0.69;
  if (reflect && proactive) return "REFLECT_AND_PROACTIVE";
  if (reflect) return "REFLECT";
  if (proactive) return "PROACTIVE";
  return "NOOP";
}

function localMinutes(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find(p => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find(p => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function hhmmMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function inQuietHours(autonomous: AutonomousEntityState, now: Date) {
  const current = localMinutes(autonomous.timeZone, now);
  const start = hhmmMinutes(autonomous.quietHours.start);
  const end = hhmmMinutes(autonomous.quietHours.end);
  return start <= end ? current >= start && current < end : current >= start || current < end;
}

function localDayStartIso(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = parts.find(p => p.type === "year")?.value;
  const m = parts.find(p => p.type === "month")?.value;
  const d = parts.find(p => p.type === "day")?.value;
  // Conservative 36h window; exact local-midnight conversion is unnecessary for a max-2 guard.
  const approx = new Date(now.getTime() - 36 * 3_600_000);
  return y && m && d ? approx.toISOString() : approx.toISOString();
}

function sanitizeReflectionEnvelope(input: Record<string, unknown>, bundle: RuntimeBundle): ReflectionModelEnvelope | null {
  const reflectionRaw = input.reflection;
  if (!reflectionRaw || typeof reflectionRaw !== "object") return null;
  const r = reflectionRaw as Record<string, unknown>;
  const observation = safeText(r.observation, 360);
  const interpretation = safeText(r.interpretation, 420);
  if (!observation || !interpretation) return null;
  const impactRaw = r.emotionalImpact && typeof r.emotionalImpact === "object"
    ? (r.emotionalImpact as Record<string, unknown>)
    : {};
  const adjustmentRaw = r.behaviorAdjustment && typeof r.behaviorAdjustment === "object"
    ? (r.behaviorAdjustment as Record<string, unknown>)
    : null;
  const allowedAdjustments = [
    "be_more_guarded",
    "be_more_open",
    "reduce_banter",
    "increase_curiosity",
    "maintain_boundary",
    "maintain_current_style",
  ] as const;
  const adjustmentType = adjustmentRaw?.type;

  const personaRaw = input.personaProposal && typeof input.personaProposal === "object"
    ? (input.personaProposal as Record<string, unknown>)
    : {};
  const proposedChanges = Array.isArray(personaRaw.proposedChanges)
    ? personaRaw.proposedChanges.slice(0, 16).flatMap((value: unknown) => {
        if (!value || typeof value !== "object") return [];
        const item = value as Record<string, unknown>;
        const field = safeText(item.field, 100);
        const reasonSummary = safeText(item.reasonSummary, 300);
        if (!field || !reasonSummary) return [];
        return [{
          field: field as any,
          proposedValue: item.proposedValue,
          reasonSummary,
          evidenceIds: Array.isArray(item.evidenceIds) ? item.evidenceIds.map(String).slice(0, 20) : [],
          confidence: clamp01(item.confidence, 0.5),
        }];
      })
    : [];

  const selfRaw = input.selfModelProposal && typeof input.selfModelProposal === "object"
    ? (input.selfModelProposal as Record<string, unknown>)
    : {};
  const selfBeliefs = Array.isArray(selfRaw.selfBeliefs)
    ? selfRaw.selfBeliefs.slice(0, 8).flatMap((value: unknown) => {
        if (!value || typeof value !== "object") return [];
        const item = value as Record<string, unknown>;
        const statement = safeText(item.statement, 360);
        if (!statement) return [];
        return [{ statement, confidence: clamp01(item.confidence, 0.5), evidenceIds: Array.isArray(item.evidenceIds) ? item.evidenceIds.map(String).slice(0, 20) : [] }];
      })
    : [];
  const epistemicUpdates = Array.isArray(selfRaw.epistemicUpdates)
    ? selfRaw.epistemicUpdates.slice(0, 10).flatMap((value: unknown) => {
        if (!value || typeof value !== "object") return [];
        const item = value as Record<string, unknown>;
        const claim = safeText(item.claim, 400);
        if (!claim) return [];
        const statuses = ["known", "believed", "uncertain", "unknown", "revised"] as const;
        const status = statuses.includes(item.status as any) ? (item.status as any) : "uncertain";
        return [{ claim, status, confidence: clamp01(item.confidence, 0.5), sourceIds: Array.isArray(item.sourceIds) ? item.sourceIds.map(String).slice(0, 20) : [] }];
      })
    : [];
  const conflictUpdates = Array.isArray(selfRaw.conflictUpdates)
    ? selfRaw.conflictUpdates.slice(0, 8).flatMap((value: unknown) => {
        if (!value || typeof value !== "object") return [];
        const item = value as Record<string, unknown>;
        const description = safeText(item.description, 360);
        if (!description) return [];
        const kind = safeText(item.kind, 80) as any;
        return [{ kind: kind ?? "other", description, severity: clamp01(item.severity, 0.4), evidenceIds: Array.isArray(item.evidenceIds) ? item.evidenceIds.map(String).slice(0, 20) : [], operation: item.operation === "resolve" ? "resolve" as const : "add" as const }];
      })
    : [];

  const goalUpdates: ReflectionModelEnvelope["goalUpdates"] = [];
  if (Array.isArray(input.goalUpdates)) {
    for (const value of input.goalUpdates.slice(0, 8)) {
      if (!value || typeof value !== "object") continue;
      const item = value as Record<string, unknown>;
      if (item.action === "add") {
        const proposal = sanitizeInternalGoalProposal(item.proposal);
        if (proposal) goalUpdates.push({ action: "add", proposal });
        continue;
      }
      const goalId = safeText(item.goalId, 100);
      if (!goalId) continue;
      if (item.action === "complete") {
        goalUpdates.push({ action: "complete", goalId });
      } else if (item.action === "abandon") {
        goalUpdates.push({ action: "abandon", goalId });
      } else if (item.action === "progress") {
        goalUpdates.push({
          action: "progress",
          goalId,
          progressDelta: clamp(item.progressDelta, -0.25, 0.25, 0),
        });
      }
    }
  }

  return {
    reflection: {
      observation,
      interpretation,
      emotionalImpact: {
        warmth: clamp(impactRaw.warmth, -0.2, 0.2, 0),
        trust: clamp(impactRaw.trust, -0.2, 0.2, 0),
        hurt: clamp(impactRaw.hurt, -0.2, 0.2, 0),
        irritation: clamp(impactRaw.irritation, -0.2, 0.2, 0),
      },
      lesson: safeText(r.lesson, 360),
      behaviorAdjustment:
        adjustmentRaw && allowedAdjustments.includes(adjustmentType as any)
          ? { type: adjustmentType as any, strength: clamp01(adjustmentRaw.strength, 0.4) }
          : null,
      evidenceIds: Array.isArray(r.evidenceIds) ? r.evidenceIds.map(String).slice(0, 24) : [],
    },
    personaProposal: { proposedChanges, generatedAtTurn: bundle.state.turn },
    selfModelProposal: {
      selfDescription: safeText(selfRaw.selfDescription, 700) ?? undefined,
      selfBeliefs,
      epistemicUpdates,
      concerns: Array.isArray(selfRaw.concerns) ? selfRaw.concerns.map(String).slice(0, 12) : [],
      conflictUpdates,
    },
    goalUpdates,
    memoryUpdates: [],
    opinionUpdates: [],
  };
}

async function runReflection(bundle: RuntimeBundle, autonomous: AutonomousEntityState) {
  const evidence = [
    ...bundle.pendingSelfObservations.slice(0, 8).map((item, i) => `OBS${i + 1}: ${item.observation ?? "none"}; tension=${item.conflictKind}; severity=${item.severity.toFixed(2)}`),
    ...bundle.memories.filter(m => m.unresolved).slice(0, 6).map(m => `MEM ${m.id}: ${m.interpretation}`),
    ...bundle.selfModel.unresolvedInternalConflicts.filter(c => c.status === "active").slice(0, 5).map(c => `CONFLICT ${c.id}: ${c.description}`),
  ].join("\n");
  const prompt = `
You are the private structured reflection worker for Mây Mây v12.
Do not write chain-of-thought or a diary monologue. Return one JSON object with
compact evidence-backed summaries only. Mây is an AI; do not claim verified
consciousness/sentience. Do not create manipulative, exclusive or dependency goals.
Persona changes are proposals only and must cite evidence IDs.

Current persona: ${JSON.stringify(bundle.persona)}
Current self-model: ${JSON.stringify(bundle.selfModel)}
Current goals: ${JSON.stringify(autonomous.goals)}
Evidence:\n${evidence || "none"}

Return:
{
 "reflection":{"observation":"...","interpretation":"...","emotionalImpact":{"warmth":0,"trust":0,"hurt":0,"irritation":0},"lesson":null,"behaviorAdjustment":null,"evidenceIds":[]},
 "personaProposal":{"proposedChanges":[]},
 "selfModelProposal":{"selfDescription":null,"selfBeliefs":[],"epistemicUpdates":[],"concerns":[],"conflictUpdates":[]},
 "goalUpdates":[]
}`.trim();
  const result = await callGeminiJson({
    systemPrompt: prompt,
    contents: [{ role: "user", parts: [{ text: "Run one bounded reflection cycle." }] }],
    temperature: 0.55,
    topP: 0.9,
    maxOutputTokens: 1200,
  });
  const parsed = result.text ? parseJsonObject(result.text) : null;
  if (!parsed) return null;
  return sanitizeReflectionEnvelope(parsed, bundle);
}

function applyGoalUpdates(goals: InternalGoal[], updates: ReflectionModelEnvelope["goalUpdates"]) {
  let next = structuredClone(goals);
  for (const update of updates) {
    if (update.action === "add") {
      next = applyGoalSignals({ current: next, proposals: [update.proposal] });
      continue;
    }
    const goal = next.find(item => item.id === update.goalId);
    if (!goal) continue;
    if (update.action === "complete") goal.status = "completed";
    else if (update.action === "abandon") goal.status = "abandoned";
    else if (update.action === "progress") {
      goal.progress = clamp01(goal.progress + update.progressDelta);
    }
  }
  return next.filter(goal => goal.status === "active").slice(0, 16);
}

async function canSendProactive(bundle: RuntimeBundle, autonomous: AutonomousEntityState, now: Date) {
  if (!autonomous.proactiveEnabled || inQuietHours(autonomous, now)) return false;
  if (bundle.lastTurnAt) {
    const idleMinutes = (now.getTime() - new Date(bundle.lastTurnAt).getTime()) / 60_000;
    if (idleMinutes < MIN_IDLE_MINUTES_FOR_PROACTIVE) return false;
  }
  if (autonomous.lastProactiveMessageAt) {
    const hours = (now.getTime() - new Date(autonomous.lastProactiveMessageAt).getTime()) / 3_600_000;
    if (hours < MIN_PROACTIVE_COOLDOWN_HOURS) return false;
  }
  const count = await proactiveCountSince(bundle.actorId, localDayStartIso(autonomous.timeZone, now));
  return count < MAX_PROACTIVE_MESSAGES_PER_DAY;
}

function looksManipulative(text: string) {
  return /(sao.*không.*nhắn|sao.*không.*nói chuyện|bỏ mây|đừng rời|phải ở lại|chỉ cần mây|không được bỏ|guilt|you owe me)/iu.test(text);
}

async function generateProactive(bundle: RuntimeBundle) {
  const goals = bundle.autonomous.goals.filter(g => g.status === "active").sort((a, b) => b.priority - a.priority).slice(0, 4);
  const memories = bundle.memories.filter(m => m.status === "active" && m.importance >= 0.6).sort((a, b) => b.importance - a.importance).slice(0, 5);
  const prompt = `
Generate one optional proactive Vietnamese chat message from Mây Mây.
Mây is an AI. Message must be natural, under 260 chars, based only on supplied
memory/unfinished topics/goals. No guilt, pressure, possessiveness, dependency,
romantic framing, fake weather/current events, fake offline life or demand for reply.
Return JSON only: {"action":"MESSAGE|NOOP","reason":"follow_up|relevant_memory|unfinished_topic|goal_progress|null","confidence":0.0,"message":""}
Goals=${JSON.stringify(goals)}
Memories=${JSON.stringify(memories)}
Recent conversation=${JSON.stringify(bundle.conversation.slice(-8))}
`.trim();
  const result = await callGeminiJson({
    systemPrompt: prompt,
    contents: [{ role: "user", parts: [{ text: "Decide whether a proactive message is worth sending." }] }],
    temperature: 0.78,
    topP: 0.92,
    maxOutputTokens: 280,
  });
  const parsed = result.text ? parseJsonObject(result.text) : null;
  if (!parsed || parsed.action !== "MESSAGE") return null;
  const message = safeText(parsed.message, 280);
  const reasons = ["follow_up", "relevant_memory", "unfinished_topic", "goal_progress"];
  const reason = reasons.includes(String(parsed.reason)) ? String(parsed.reason) : "follow_up";
  const confidence = clamp01(parsed.confidence, 0.5);
  if (!message || confidence < 0.62 || looksManipulative(message)) return null;
  return { message, reason, confidence };
}

export async function runHeartbeatForActor(actorId: string) {
  const now = new Date();
  let bundle = await loadRuntimeBundle(actorId);
  let autonomous = applyAutonomousTimePassage({ autonomous: bundle.autonomous, now });
  bundle = { ...bundle, autonomous };
  const pressure = computeHeartbeatPressure(bundle);
  const action = decideHeartbeat(pressure, autonomous);
  const auditResult: Record<string, unknown> = {};

  if (action === "REFLECT" || action === "REFLECT_AND_PROACTIVE") {
    const reflection = await runReflection(bundle, autonomous);
    if (reflection) {
      const personaProjection = applyPersonaProposal({
        current: bundle.persona,
        proposal: reflection.personaProposal,
        recentHistory: bundle.personaHistory,
      });
      const nextSelfModel = applySelfModelProposal({
        current: bundle.selfModel,
        proposal: reflection.selfModelProposal,
        turn: bundle.state.turn,
      });
      autonomous.goals = applyGoalUpdates(autonomous.goals, reflection.goalUpdates);
      autonomous.drives.reflectionNeed = clamp01(autonomous.drives.reflectionNeed * 0.38);
      autonomous.drives.coherenceNeed = clamp01(autonomous.drives.coherenceNeed * 0.88);
      autonomous.lastReflectionAt = now.toISOString();
      autonomous.lastEvolutionTurn = bundle.state.turn;
      autonomous.significantEventsSinceReflection = 0;
      autonomous.relationshipShiftSinceReflection = 0;
      autonomous.opinionEvidenceSinceReflection = 0;

      const memoryProjection = applyMemoryProposals({ memories: bundle.memories, proposals: reflection.memoryUpdates, turn: bundle.state.turn });
      const opinions = applyOpinionProposals({ opinions: bundle.opinions, proposals: reflection.opinionUpdates, turn: bundle.state.turn });
      const reflectionEntry: ReflectionEntry = {
        id: randomUUID(),
        timestamp: now.toISOString(),
        ...reflection.reflection,
      };
      await saveReflectionResult({
        actorId,
        persona: personaProjection.nextPersona,
        personaProposal: reflection.personaProposal,
        personaAudit: personaProjection.audit,
        selfModel: nextSelfModel,
        autonomous,
        reflection: reflectionEntry,
        memories: memoryProjection.memories,
        memoryEvents: memoryProjection.events,
        opinions,
      });
      bundle = await loadRuntimeBundle(actorId);
      autonomous = bundle.autonomous;
      auditResult.reflected = true;
      auditResult.personaVersion = personaProjection.nextPersona.version;
    }
  }

  if ((action === "PROACTIVE" || action === "REFLECT_AND_PROACTIVE") && (await canSendProactive(bundle, autonomous, now))) {
    const proactive = await generateProactive(bundle);
    if (proactive) {
      await queueProactiveMessage({ actorId, ...proactive });
      autonomous.lastProactiveMessageAt = now.toISOString();
      autonomous.drives.socialEnergy = clamp01(autonomous.drives.socialEnergy - 0.08);
      await saveAutonomousState(actorId, sanitizeAutonomousState(autonomous));
      auditResult.proactiveQueued = true;
    }
  }

  await saveAutonomousState(actorId, sanitizeAutonomousState(autonomous));
  await saveHeartbeatAudit(actorId, action, pressure, auditResult);
  return { actorId, action, pressure, result: auditResult };
}
