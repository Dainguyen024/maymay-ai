import { z } from "zod";

export const moodSchema = z.enum([
  "warm",
  "calm",
  "happy",
  "playful",
  "curious",
  "serious",
  "awkward",
  "embarrassed",
  "hurt",
  "annoyed",
  "cold",
]);

export const incomingMessageSchema = z
  .object({
    role: z.enum(["ai", "user"]),
    text: z.string().trim().min(1).max(5_000),
  })
  .strict();

export const chatRequestSchema = z
  .object({
    messages: z.array(incomingMessageSchema).min(1).max(36),
    state: z.unknown().optional(),
  })
  .strict();

export const ttsRequestSchema = z
  .object({
    text: z.string().trim().min(1).max(2_400),
    emotion: z
      .enum(["comfort", "happy", "serious", "playful"])
      .optional(),
  })
  .strict();

const stateDeltaSchema = z
  .object({
    energy: z.number().finite().optional(),
    patience: z.number().finite().optional(),
    curiosity: z.number().finite().optional(),
    trust: z.number().finite().optional(),
    closeness: z.number().finite().optional(),
    interest: z.number().finite().optional(),
    hurt: z.number().finite().optional(),
    irritation: z.number().finite().optional(),
    resentment: z.number().finite().optional(),
    warmth: z.number().finite().optional(),
    playfulness: z.number().finite().optional(),
    confidence: z.number().finite().optional(),
  })
  .strict();

const personUpdateSchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    aliases: z.array(z.string().trim().min(1).max(80)).max(6).optional(),
    likingDelta: z.number().finite().optional(),
    trustDelta: z.number().finite().optional(),
    respectDelta: z.number().finite().optional(),
    irritationDelta: z.number().finite().optional(),
    hurtDelta: z.number().finite().optional(),
    resentmentDelta: z.number().finite().optional(),
    lastCause: z.string().trim().max(220).nullable().optional(),
    unresolvedIssue: z.string().trim().max(220).nullable().optional(),
  })
  .strict();

const memoryUpdateSchema = z
  .object({
    action: z.enum(["add", "resolve"]).optional(),
    id: z.string().trim().min(1).max(70).optional(),
    summary: z.string().trim().min(1).max(220).optional(),
    valence: z.enum(["positive", "negative", "mixed"]).optional(),
    importance: z.number().finite().optional(),
  })
  .strict();

const tasteUpdateSchema = z
  .object({
    topic: z.string().trim().min(1).max(100).optional(),
    stance: z.string().trim().min(1).max(180).optional(),
    strength: z.number().finite().optional(),
    reason: z.string().trim().max(180).nullable().optional(),
  })
  .strict();

const factUpdateSchema = z
  .object({
    key: z.string().trim().min(1).max(100),
    value: z.string().trim().min(1).max(220),
    confidence: z.number().finite(),
  })
  .strict();

const commitmentUpdateSchema = z
  .object({
    action: z.enum(["add", "complete", "cancel"]),
    id: z.string().trim().min(1).max(70),
    title: z.string().trim().min(1).max(180).optional(),
    scheduledAt: z.string().datetime({ offset: true }).optional(),
    confidence: z.number().finite().optional(),
  })
  .strict();

export const modelEnvelopeSchema = z
  .object({
    reply: z.string().trim().min(1).max(6_000),
    mood: moodSchema.optional(),
    stateDelta: stateDeltaSchema.optional(),
    emotionCause: z.string().trim().max(240).nullable().optional(),
    unresolvedIssue: z.string().trim().max(240).nullable().optional(),
    personUpdates: z.array(personUpdateSchema).max(5).optional(),
    memoryUpdates: z.array(memoryUpdateSchema).max(4).optional(),
    tasteUpdates: z.array(tasteUpdateSchema).max(4).optional(),
    factUpdates: z.array(factUpdateSchema).max(6).optional(),
    commitmentUpdates: z.array(commitmentUpdateSchema).max(4).optional(),
  })
  .strict();

export type ValidatedModelEnvelope = z.infer<typeof modelEnvelopeSchema>;

export function parseBoundedJson(text: string, maximumBytes: number) {
  if (Buffer.byteLength(text, "utf8") > maximumBytes) {
    return { ok: false as const, reason: "too_large" as const };
  }

  try {
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false as const, reason: "invalid_json" as const };
  }
}
