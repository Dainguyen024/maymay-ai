import {
  DEFAULT_EVOLVED_PERSONA,
  DEFAULT_MAY_STATE,
  DEFAULT_RELATIONSHIP,
  DEFAULT_SELF_MODEL,
  DEFAULT_AUTONOMOUS_STATE,
  type AgencyDecision,
  type Delivery,
  type EmotionalFingerprint,
  type EvolvedPersona,
  type MayState,
  type MemoryActivationBreakdown,
  type MemoryEvent,
  type MemoryNode,
  type MemoryUpdateProposal,
  type ModelStateDelta,
  type Opinion,
  type OpinionUpdateProposal,
  type PersonaEvolutionAudit,
  type PersonaEvolutionProposal,
  type PersonaLearningSignal,
  type PersonaTraits,
  type PersonaValue,
  type PersonaVersionSnapshot,
  type RelationshipDelta,
  type RelationshipMode,
  type RelationshipState,
  type AutonomousEntityState,
  type InternalGoal,
  type InternalGoalProposal,
  type SelfModel,
  type SelfModelProposal,
  type SelfBelief,
  type SelfKnowledge,
  type InternalConflict,
  type SelfObservationSignal,
  type ReflectionEntry,
} from "@/types/maymay";

export const MAX_TRAIT_SHIFT = 0.06;
const MAX_HISTORY_DRIFT = 0.18;

export function clamp(value: unknown, min: number, max: number, fallback = min) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

export function clamp01(value: unknown, fallback = 0) {
  return clamp(value, 0, 1, fallback);
}

export function safeText(value: unknown, max = 400): string | null {
  if (typeof value !== "string") return null;
  const text = value.normalize("NFC").trim();
  return text ? text.slice(0, max) : null;
}

function canonicalText(value: string) {
  return value
    .normalize("NFC")
    .toLocaleLowerCase("vi-VN")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

export function canonicalTopicKey(value: string) {
  return canonicalText(value)
    .replace(/\s+/gu, "-")
    .slice(0, 120);
}

function deterministicHash(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function uniqueStrings(values: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(values)) return [] as string[];
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const text = safeText(value, maxLength);
    if (!text) continue;
    const key = canonicalText(text);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(text);
    if (result.length >= maxItems) break;
  }

  return result;
}

const TRAIT_KEYS: Array<keyof PersonaTraits> = [
  "playfulness",
  "directness",
  "softness",
  "skepticism",
  "curiosity",
  "patience",
  "assertiveness",
];

export function sanitizePersona(input: unknown): EvolvedPersona {
  if (!input || typeof input !== "object") {
    return structuredClone(DEFAULT_EVOLVED_PERSONA);
  }

  const raw = input as Partial<EvolvedPersona>;
  const base = structuredClone(DEFAULT_EVOLVED_PERSONA);
  const rawTraits = raw.traits ?? ({} as Partial<PersonaTraits>);

  for (const key of TRAIT_KEYS) {
    base.traits[key] = clamp01(rawTraits[key], base.traits[key]);
  }

  base.version = Math.max(1, Math.floor(Number(raw.version) || 1));
  base.communicationPreferences = uniqueStrings(
    raw.communicationPreferences,
    16,
    220,
  );
  if (!base.communicationPreferences.length) {
    base.communicationPreferences = structuredClone(
      DEFAULT_EVOLVED_PERSONA.communicationPreferences,
    );
  }

  base.socialPreferences = uniqueStrings(raw.socialPreferences, 16, 220);
  if (!base.socialPreferences.length) {
    base.socialPreferences = structuredClone(
      DEFAULT_EVOLVED_PERSONA.socialPreferences,
    );
  }

  base.boundaries = uniqueStrings(raw.boundaries, 16, 240);
  if (!base.boundaries.length) {
    base.boundaries = structuredClone(DEFAULT_EVOLVED_PERSONA.boundaries);
  }

  base.values = Array.isArray(raw.values)
    ? raw.values
        .slice(0, 16)
        .map((value): PersonaValue | null => {
          if (!value || typeof value !== "object") return null;
          const item = value as Partial<PersonaValue>;
          const key = safeText(item.key, 80);
          const description = safeText(item.description, 240);
          if (!key || !description) return null;
          return {
            key: canonicalTopicKey(key),
            description,
            strength: clamp01(item.strength, 0.5),
          };
        })
        .filter((value): value is PersonaValue => Boolean(value))
    : structuredClone(DEFAULT_EVOLVED_PERSONA.values);

  base.selfDescription =
    safeText(raw.selfDescription, 600) ?? DEFAULT_EVOLVED_PERSONA.selfDescription;
  base.updatedAtTurn = Math.max(0, Math.floor(Number(raw.updatedAtTurn) || 0));
  base.evidenceIds = uniqueStrings(raw.evidenceIds, 40, 100);

  return base;
}

export function sanitizeRelationship(input: unknown): RelationshipState {
  if (!input || typeof input !== "object") {
    return structuredClone(DEFAULT_RELATIONSHIP);
  }

  const raw = input as Partial<RelationshipState>;
  return {
    familiarity: clamp01(raw.familiarity, DEFAULT_RELATIONSHIP.familiarity),
    trust: clamp01(raw.trust, DEFAULT_RELATIONSHIP.trust),
    closeness: clamp01(raw.closeness, DEFAULT_RELATIONSHIP.closeness),
    comfort: clamp01(raw.comfort, DEFAULT_RELATIONSHIP.comfort),
    respect: clamp01(raw.respect, DEFAULT_RELATIONSHIP.respect),
    attachment: clamp01(raw.attachment, DEFAULT_RELATIONSHIP.attachment),
    friction: clamp01(raw.friction, DEFAULT_RELATIONSHIP.friction),
    guardedness: clamp01(raw.guardedness, DEFAULT_RELATIONSHIP.guardedness),
  };
}

export function sanitizeMayState(input: unknown): MayState {
  if (!input || typeof input !== "object") {
    return structuredClone(DEFAULT_MAY_STATE);
  }

  const raw = input as Partial<MayState>;
  const moods: MayState["mood"][] = [
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
  ];

  const mood =
    typeof raw.mood === "string" && moods.includes(raw.mood as MayState["mood"])
      ? (raw.mood as MayState["mood"])
      : DEFAULT_MAY_STATE.mood;

  return {
    version: 12,
    turn: Math.max(0, Math.min(100_000, Math.floor(Number(raw.turn) || 0))),
    mood,
    energy: clamp01(raw.energy, DEFAULT_MAY_STATE.energy),
    patience: clamp01(raw.patience, DEFAULT_MAY_STATE.patience),
    curiosity: clamp01(raw.curiosity, DEFAULT_MAY_STATE.curiosity),
    interest: clamp01(raw.interest, DEFAULT_MAY_STATE.interest),
    hurt: clamp01(raw.hurt),
    irritation: clamp01(raw.irritation),
    resentment: clamp01(raw.resentment),
    warmth: clamp01(raw.warmth, DEFAULT_MAY_STATE.warmth),
    playfulness: clamp01(raw.playfulness, DEFAULT_MAY_STATE.playfulness),
    confidence: clamp01(raw.confidence, DEFAULT_MAY_STATE.confidence),
    socialBattery: clamp01(
      raw.socialBattery,
      DEFAULT_MAY_STATE.socialBattery,
    ),
    needForSpace: clamp01(raw.needForSpace, DEFAULT_MAY_STATE.needForSpace),
    initiative: clamp01(raw.initiative, DEFAULT_MAY_STATE.initiative),
    lastEmotionCause: safeText(raw.lastEmotionCause, 240),
    unresolvedIssue: safeText(raw.unresolvedIssue, 240),
  };
}

export function sanitizeMemories(input: unknown): MemoryNode[] {
  if (!Array.isArray(input)) return [];

  return input
    .slice(-120)
    .map((memory, index): MemoryNode | null => {
      if (!memory || typeof memory !== "object") return null;
      const raw = memory as Partial<MemoryNode>;
      const event = safeText(raw.event, 360);
      const interpretation = safeText(raw.interpretation, 420);
      if (!event || !interpretation) return null;

      const kinds: MemoryNode["kind"][] = [
        "fact",
        "detail",
        "moment",
        "inside_joke",
        "bond",
        "wound",
        "boundary",
        "promise",
        "impression",
        "relationship",
        "other",
      ];
      const valences: MemoryNode["valence"][] = [
        "positive",
        "negative",
        "mixed",
        "neutral",
      ];
      const statuses: MemoryNode["status"][] = [
        "active",
        "resolved",
        "faded",
        "redacted",
      ];

      const kind = kinds.includes(raw.kind as MemoryNode["kind"])
        ? (raw.kind as MemoryNode["kind"])
        : "other";
      const valence = valences.includes(raw.valence as MemoryNode["valence"])
        ? (raw.valence as MemoryNode["valence"])
        : "mixed";
      const status = statuses.includes(raw.status as MemoryNode["status"])
        ? (raw.status as MemoryNode["status"])
        : "active";
      const createdAtTurn = Math.max(
        0,
        Math.floor(Number(raw.createdAtTurn) || 0),
      );

      const edges = Array.isArray(raw.edges)
        ? raw.edges
            .slice(0, 24)
            .map(edge => {
              if (!edge || typeof edge !== "object") return null;
              const item = edge as MemoryNode["edges"][number];
              const targetId = safeText(item.targetId, 100);
              const relations: MemoryNode["edges"][number]["relation"][] = [
                "caused",
                "contradicts",
                "reinforces",
                "reminds_of",
                "resolved_by",
                "related_to",
              ];
              if (!targetId || !relations.includes(item.relation)) return null;
              return {
                targetId,
                relation: item.relation,
                strength: clamp01(item.strength, 0.5),
              };
            })
            .filter((edge): edge is MemoryNode["edges"][number] => Boolean(edge))
        : [];

      return {
        id:
          safeText(raw.id, 100) ??
          `mem-${createdAtTurn}-${deterministicHash(`${event}-${index}`)}`,
        event,
        interpretation,
        kind,
        valence,
        importance: clamp01(raw.importance, 0.5),
        emotions: sanitizeEmotionalFingerprint(raw.emotions),
        edges,
        createdAtTurn,
        lastTouchedTurn: Math.max(
          createdAtTurn,
          Math.floor(Number(raw.lastTouchedTurn) || createdAtTurn),
        ),
        lastResurfacedTurn:
          raw.lastResurfacedTurn === null || raw.lastResurfacedTurn === undefined
            ? null
            : Math.max(0, Math.floor(Number(raw.lastResurfacedTurn) || 0)),
        unresolved: Boolean(raw.unresolved),
        relationshipCritical: Boolean(raw.relationshipCritical),
        status,
      };
    })
    .filter((memory): memory is MemoryNode => Boolean(memory));
}

export function sanitizeOpinions(input: unknown): Opinion[] {
  if (!Array.isArray(input)) return [];

  const map = new Map<string, Opinion>();

  for (const rawItem of input.slice(-100)) {
    if (!rawItem || typeof rawItem !== "object") continue;
    const raw = rawItem as Partial<Opinion>;
    const topic = safeText(raw.topic, 180);
    const stance = safeText(raw.stance, 320);
    if (!topic || !stance) continue;

    const canonicalKey =
      safeText(raw.canonicalKey, 140) ?? canonicalTopicKey(topic);
    const opinion: Opinion = {
      id:
        safeText(raw.id, 100) ??
        `op-${deterministicHash(`${canonicalKey}-${stance}`)}`,
      canonicalKey,
      topic,
      stance,
      confidence: clamp01(raw.confidence, 0.55),
      flexibility: clamp01(raw.flexibility, 0.7),
      reasoningSummary: safeText(raw.reasoningSummary, 420) ?? "",
      evidenceMemoryIds: uniqueStrings(raw.evidenceMemoryIds, 24, 100),
      createdAtTurn: Math.max(0, Math.floor(Number(raw.createdAtTurn) || 0)),
      updatedAtTurn: Math.max(0, Math.floor(Number(raw.updatedAtTurn) || 0)),
      version: Math.max(1, Math.floor(Number(raw.version) || 1)),
    };

    const existing = map.get(canonicalKey);
    if (!existing || opinion.updatedAtTurn >= existing.updatedAtTurn) {
      map.set(canonicalKey, opinion);
    }
  }

  return [...map.values()];
}

export function sanitizeEmotionalFingerprint(
  input: unknown,
): EmotionalFingerprint {
  const raw =
    input && typeof input === "object"
      ? (input as Partial<EmotionalFingerprint>)
      : {};
  return {
    warmth: clamp01(raw.warmth),
    amusement: clamp01(raw.amusement),
    trust: clamp01(raw.trust),
    hurt: clamp01(raw.hurt),
    irritation: clamp01(raw.irritation),
  };
}

function currentFingerprint(
  state: MayState,
  relationship: RelationshipState,
): EmotionalFingerprint {
  return {
    warmth: state.warmth,
    amusement: state.playfulness,
    trust: relationship.trust,
    hurt: state.hurt,
    irritation: state.irritation,
  };
}

export function emotionalSimilarity(
  left: EmotionalFingerprint,
  right: EmotionalFingerprint,
) {
  const values: Array<keyof EmotionalFingerprint> = [
    "warmth",
    "amusement",
    "trust",
    "hurt",
    "irritation",
  ];
  const meanDistance =
    values.reduce((sum, key) => sum + Math.abs(left[key] - right[key]), 0) /
    values.length;
  return clamp01(1 - meanDistance, 0);
}

function tokenSet(value: string) {
  return new Set(
    canonicalText(value)
      .split(" ")
      .filter(token => token.length >= 2)
      .slice(0, 160),
  );
}

export function contextualRelevance(memory: MemoryNode, context: string) {
  const memoryTokens = tokenSet(`${memory.event} ${memory.interpretation}`);
  const contextTokens = tokenSet(context);
  if (!memoryTokens.size || !contextTokens.size) return 0;

  let overlap = 0;
  for (const token of contextTokens) {
    if (memoryTokens.has(token)) overlap += 1;
  }

  const overlapRatio = overlap / Math.max(1, Math.min(contextTokens.size, 14));
  const edgeBonus = memory.edges.length ? Math.min(0.08, memory.edges.length * 0.01) : 0;
  return clamp01(overlapRatio * 1.8 + edgeBonus);
}

/**
 * Frozen v11 memory activation equation:
 * Activation = Importance × Emotional Similarity × Contextual Relevance
 *            × Unresolved Weight × Recency Dynamics × Novelty Bonus
 */
export function memoryActivation(args: {
  memory: MemoryNode;
  currentTurn: number;
  emotionalSimilarity: number;
  contextualRelevance: number;
}): MemoryActivationBreakdown {
  const { memory, currentTurn } = args;
  const importance = clamp01(memory.importance, 0.5);
  const emotional = clamp01(args.emotionalSimilarity);
  const relevance = clamp01(args.contextualRelevance);
  const unresolvedWeight = memory.unresolved ? 1.18 : 0.88;

  const age = Math.max(0, currentTurn - memory.lastTouchedTurn);
  const recencyDynamics = 0.42 + 0.58 * Math.exp(-age / 90);

  const sinceResurfaced =
    memory.lastResurfacedTurn === null
      ? 120
      : Math.max(0, currentTurn - memory.lastResurfacedTurn);
  const noveltyBonus = Math.min(
    1.08,
    0.86 + 0.22 * (1 - Math.exp(-sinceResurfaced / 45)),
  );

  const activation = clamp01(
    importance *
      emotional *
      relevance *
      unresolvedWeight *
      recencyDynamics *
      noveltyBonus,
  );

  return {
    memoryId: memory.id,
    activation,
    importance,
    emotionalSimilarity: emotional,
    contextualRelevance: relevance,
    unresolvedWeight,
    recencyDynamics,
    noveltyBonus,
  };
}

export function calculateMemoryActivations(args: {
  memories: MemoryNode[];
  state: MayState;
  relationship: RelationshipState;
  latestUserText: string;
}) {
  const fingerprint = currentFingerprint(args.state, args.relationship);

  return args.memories
    .filter(memory => memory.status !== "redacted")
    .map(memory =>
      memoryActivation({
        memory,
        currentTurn: args.state.turn,
        emotionalSimilarity: emotionalSimilarity(
          fingerprint,
          memory.emotions,
        ),
        contextualRelevance: contextualRelevance(
          memory,
          args.latestUserText,
        ),
      }),
    )
    .sort((left, right) => right.activation - left.activation);
}

export function approximateTokens(value: string) {
  // Good enough for a prompt budget without adding a tokenizer dependency.
  return Math.max(1, Math.ceil(value.length / 4));
}

export function selectMemoriesForRuntime(args: {
  memories: MemoryNode[];
  activations: MemoryActivationBreakdown[];
  tokenBudget?: number;
  maxMemories?: number;
}) {
  const tokenBudget = Math.max(120, args.tokenBudget ?? 900);
  const maxMemories = Math.max(1, Math.min(12, args.maxMemories ?? 8));
  const activationById = new Map(
    args.activations.map(item => [item.memoryId, item] as const),
  );

  const active = args.memories.filter(
    memory => memory.status !== "redacted" && memory.status !== "faded",
  );

  const unresolved = active
    .filter(memory => memory.unresolved)
    .sort(
      (a, b) =>
        (activationById.get(b.id)?.activation ?? 0) -
        (activationById.get(a.id)?.activation ?? 0),
    );
  const critical = active
    .filter(memory => memory.relationshipCritical)
    .sort((a, b) => b.importance - a.importance);
  const relevant = [...active].sort(
    (a, b) =>
      (activationById.get(b.id)?.activation ?? 0) -
      (activationById.get(a.id)?.activation ?? 0),
  );

  const resurfacingCandidate = args.activations.find(item => {
    if (item.activation < 0.26) return false;
    const memory = active.find(candidate => candidate.id === item.memoryId);
    if (!memory) return false;
    // noveltyBonus already encodes the cooldown since the last resurfacing.
    // This keeps resurfacing deterministic and prevents rapid callback loops.
    return item.noveltyBonus >= 0.95;
  });

  const ordered = [
    ...unresolved,
    ...critical,
    ...relevant,
    ...(resurfacingCandidate
      ? active.filter(memory => memory.id === resurfacingCandidate.memoryId)
      : []),
  ];

  const seen = new Set<string>();
  const selected: MemoryNode[] = [];
  let usedTokens = 0;

  for (const memory of ordered) {
    if (seen.has(memory.id)) continue;
    const cost = approximateTokens(
      `${memory.event}\n${memory.interpretation}\n${memory.kind}\n${memory.valence}`,
    );
    if (usedTokens + cost > tokenBudget) continue;
    seen.add(memory.id);
    selected.push(memory);
    usedTokens += cost;
    if (selected.length >= maxMemories) break;
  }

  return {
    selected,
    usedTokens,
    resurfacingCandidateId:
      resurfacingCandidate && seen.has(resurfacingCandidate.memoryId)
        ? resurfacingCandidate.memoryId
        : null,
  };
}

export function deriveRelationshipMode(
  relationship: RelationshipState,
): RelationshipMode {
  if (
    relationship.friction >= 0.58 &&
    (relationship.closeness >= 0.45 || relationship.familiarity >= 0.55)
  ) {
    return "conflicted";
  }
  if (relationship.guardedness >= 0.62) return "guarded";
  if (
    relationship.familiarity >= 0.72 &&
    relationship.closeness <= 0.24 &&
    relationship.trust <= 0.4
  ) {
    return "distant";
  }
  if (
    relationship.trust >= 0.78 &&
    relationship.closeness >= 0.72 &&
    relationship.comfort >= 0.72 &&
    relationship.respect >= 0.64
  ) {
    return "inner_circle";
  }
  if (
    relationship.closeness >= 0.56 &&
    relationship.trust >= 0.58 &&
    relationship.comfort >= 0.58
  ) {
    return "close";
  }
  if (relationship.familiarity >= 0.38) return "familiar";
  return "unfamiliar";
}

const RELATIONSHIP_MAX_DELTA: Record<keyof RelationshipState, number> = {
  familiarity: 0.05,
  trust: 0.08,
  closeness: 0.06,
  comfort: 0.08,
  respect: 0.08,
  attachment: 0.05,
  friction: 0.1,
  guardedness: 0.1,
};

export function applyRelationshipDelta(
  previous: RelationshipState,
  delta: RelationshipDelta,
): RelationshipState {
  const next = { ...previous };

  for (const key of Object.keys(RELATIONSHIP_MAX_DELTA) as Array<
    keyof RelationshipState
  >) {
    const raw = Number(delta[key]);
    if (!Number.isFinite(raw)) continue;
    const bounded = Math.max(
      -RELATIONSHIP_MAX_DELTA[key],
      Math.min(RELATIONSHIP_MAX_DELTA[key], raw),
    );
    next[key] = clamp01(previous[key] + bounded, previous[key]);
  }

  return next;
}

function traitHistoricalMean(
  history: PersonaVersionSnapshot[],
  key: keyof PersonaTraits,
  fallback: number,
) {
  const recent = history.slice(-5);
  if (!recent.length) return fallback;
  return (
    recent.reduce((sum, item) => sum + clamp01(item.traits[key], fallback), 0) /
    recent.length
  );
}

export function applyPersonaProposal(args: {
  current: EvolvedPersona;
  proposal: PersonaEvolutionProposal;
  recentHistory?: PersonaVersionSnapshot[];
}): {
  nextPersona: EvolvedPersona;
  audit: PersonaEvolutionAudit;
} {
  const current = sanitizePersona(args.current);
  const history = (args.recentHistory ?? []).slice(-5);
  const next = structuredClone(current);

  const acceptedChanges: PersonaEvolutionAudit["acceptedChanges"] = [];
  const rejectedChanges: PersonaEvolutionAudit["rejectedChanges"] = [];

  for (const change of args.proposal.proposedChanges.slice(0, 24)) {
    const confidence = clamp01(change.confidence);
    const evidenceIds = uniqueStrings(change.evidenceIds, 24, 100);
    const reasonSummary = safeText(change.reasonSummary, 320) ?? "";

    if (change.field.startsWith("traits.")) {
      const trait = change.field.slice("traits.".length) as keyof PersonaTraits;
      if (!TRAIT_KEYS.includes(trait)) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "unknown trait",
          evidenceIds,
        });
        continue;
      }

      const proposed = Number(change.proposedValue);
      if (!Number.isFinite(proposed)) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "trait value must be numeric",
          evidenceIds,
        });
        continue;
      }

      if (confidence < 0.58 || evidenceIds.length < 1) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "insufficient confidence/evidence",
          evidenceIds,
        });
        continue;
      }

      const target = clamp01(proposed);
      const historicalMean = traitHistoricalMean(history, trait, current.traits[trait]);
      const conflictsWithHistory = Math.abs(target - historicalMean) > MAX_HISTORY_DRIFT;

      if (
        conflictsWithHistory &&
        (confidence < 0.82 || evidenceIds.length < 3)
      ) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "identity drift guard: conflicts with recent persona history",
          evidenceIds,
        });
        continue;
      }

      const oldValue = next.traits[trait];
      const boundedTarget = Math.max(
        oldValue - MAX_TRAIT_SHIFT,
        Math.min(oldValue + MAX_TRAIT_SHIFT, target),
      );
      const newValue = clamp01(boundedTarget, oldValue);

      if (Math.abs(newValue - oldValue) < 0.0001) continue;
      next.traits[trait] = newValue;
      acceptedChanges.push({
        field: change.field,
        oldValue,
        newValue,
        reasonSummary,
        evidenceIds,
      });
      continue;
    }

    if (confidence < 0.65 || evidenceIds.length < 1) {
      rejectedChanges.push({
        field: change.field,
        proposedValue: change.proposedValue,
        reason: "insufficient confidence/evidence",
        evidenceIds,
      });
      continue;
    }

    if (
      change.field === "communicationPreferences" ||
      change.field === "socialPreferences" ||
      change.field === "boundaries"
    ) {
      const oldValue = structuredClone(next[change.field]);
      const newValue = uniqueStrings(change.proposedValue, 16, 240);
      if (!newValue.length) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "empty preference set",
          evidenceIds,
        });
        continue;
      }
      next[change.field] = newValue;
      acceptedChanges.push({
        field: change.field,
        oldValue,
        newValue,
        reasonSummary,
        evidenceIds,
      });
      continue;
    }

    if (change.field === "selfDescription") {
      const newValue = safeText(change.proposedValue, 600);
      if (!newValue) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "empty self description",
          evidenceIds,
        });
        continue;
      }
      const oldValue = next.selfDescription;
      next.selfDescription = newValue;
      acceptedChanges.push({
        field: change.field,
        oldValue,
        newValue,
        reasonSummary,
        evidenceIds,
      });
      continue;
    }

    if (change.field === "values") {
      if (!Array.isArray(change.proposedValue)) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "values must be an array",
          evidenceIds,
        });
        continue;
      }

      const newValues = change.proposedValue
        .slice(0, 16)
        .map((item): PersonaValue | null => {
          if (!item || typeof item !== "object") return null;
          const raw = item as Partial<PersonaValue>;
          const key = safeText(raw.key, 80);
          const description = safeText(raw.description, 240);
          if (!key || !description) return null;
          return {
            key: canonicalTopicKey(key),
            description,
            strength: clamp01(raw.strength, 0.5),
          };
        })
        .filter((item): item is PersonaValue => Boolean(item));

      if (!newValues.length) {
        rejectedChanges.push({
          field: change.field,
          proposedValue: change.proposedValue,
          reason: "values array contains no valid entries",
          evidenceIds,
        });
        continue;
      }

      const oldValue = structuredClone(next.values);
      next.values = newValues;
      acceptedChanges.push({
        field: change.field,
        oldValue,
        newValue: newValues,
        reasonSummary,
        evidenceIds,
      });
    }
  }

  if (acceptedChanges.length) {
    next.version = current.version + 1;
    next.updatedAtTurn = Math.max(current.updatedAtTurn, args.proposal.generatedAtTurn);
    next.evidenceIds = uniqueStrings(
      [...current.evidenceIds, ...acceptedChanges.flatMap(item => item.evidenceIds)],
      60,
      100,
    );
  }

  return {
    nextPersona: next,
    audit: {
      personaVersionBefore: current.version,
      acceptedChanges,
      rejectedChanges,
      personaVersionAfter: next.version,
    },
  };
}

export function applyOpinionProposals(args: {
  opinions: Opinion[];
  proposals: OpinionUpdateProposal[];
  turn: number;
}) {
  const map = new Map(
    sanitizeOpinions(args.opinions).map(opinion => [opinion.canonicalKey, opinion] as const),
  );

  for (const proposal of args.proposals.slice(0, 8)) {
    const topic = safeText(proposal.topic, 180);
    const stance = safeText(proposal.stance, 320);
    if (!topic || !stance) continue;

    let key = canonicalTopicKey(topic);
    if (!key) continue;

    if (proposal.operation === "split") {
      key = `${key}:${deterministicHash(stance).slice(0, 6)}`;
    }

    const existing = map.get(key);
    const confidence = clamp01(
      proposal.confidence,
      existing?.confidence ?? 0.55,
    );
    const flexibility = clamp01(
      proposal.flexibility,
      existing?.flexibility ?? 0.7,
    );
    const reasoningSummary =
      safeText(proposal.reasoningSummary, 420) ??
      existing?.reasoningSummary ??
      "";
    const evidenceMemoryIds = uniqueStrings(
      [
        ...(existing?.evidenceMemoryIds ?? []),
        ...(proposal.evidenceMemoryIds ?? []),
      ],
      24,
      100,
    );

    if (!existing) {
      map.set(key, {
        id: `op-${deterministicHash(`${key}-${args.turn}`)}`,
        canonicalKey: key,
        topic,
        stance,
        confidence,
        flexibility,
        reasoningSummary,
        evidenceMemoryIds,
        createdAtTurn: args.turn,
        updatedAtTurn: args.turn,
        version: 1,
      });
      continue;
    }

    const operation = proposal.operation ?? "revise";
    const confidenceDelta =
      operation === "strengthen" ? 0.05 : operation === "weaken" ? -0.05 : 0;

    map.set(key, {
      ...existing,
      topic,
      stance: operation === "strengthen" || operation === "weaken" ? existing.stance : stance,
      confidence: clamp01(confidence + confidenceDelta, existing.confidence),
      flexibility,
      reasoningSummary,
      evidenceMemoryIds,
      updatedAtTurn: args.turn,
      version: existing.version + 1,
    });
  }

  return [...map.values()].sort((a, b) => b.updatedAtTurn - a.updatedAtTurn).slice(0, 100);
}

function eventId(type: MemoryEvent["type"], memoryId: string, turn: number) {
  return `mev-${turn}-${deterministicHash(`${type}-${memoryId}-${turn}`)}`;
}

function findMemoryIndex(memories: MemoryNode[], id: string | undefined) {
  if (!id) return -1;
  return memories.findIndex(memory => memory.id === id);
}

export function applyMemoryProposals(args: {
  memories: MemoryNode[];
  proposals: MemoryUpdateProposal[];
  turn: number;
  timestamp?: string;
}) {
  const memories = sanitizeMemories(args.memories);
  const events: MemoryEvent[] = [];
  const timestamp = args.timestamp ?? new Date().toISOString();

  for (const proposal of args.proposals.slice(0, 8)) {
    if (proposal.action === "add") {
      const event = safeText(proposal.event, 360);
      const interpretation = safeText(proposal.interpretation, 420);
      if (!event || !interpretation) continue;

      const duplicate = memories.find(
        memory =>
          memory.status !== "redacted" &&
          canonicalText(memory.event) === canonicalText(event),
      );

      if (duplicate) {
        duplicate.importance = clamp01(
          Math.max(duplicate.importance, Number(proposal.importance) || 0.5) + 0.03,
          duplicate.importance,
        );
        duplicate.lastTouchedTurn = args.turn;
        events.push({
          id: eventId("MEMORY_REINFORCED", duplicate.id, args.turn),
          type: "MEMORY_REINFORCED",
          memoryId: duplicate.id,
          turn: args.turn,
          timestamp,
          importanceAfter: duplicate.importance,
          reasonSummary: safeText(proposal.reasonSummary, 260),
        });
        continue;
      }

      const id =
        safeText(proposal.id, 100) ??
        `mem-${args.turn}-${deterministicHash(`${event}-${interpretation}`)}`;
      const kinds: MemoryNode["kind"][] = [
        "fact",
        "detail",
        "moment",
        "inside_joke",
        "bond",
        "wound",
        "boundary",
        "promise",
        "impression",
        "relationship",
        "other",
      ];
      const valences: MemoryNode["valence"][] = [
        "positive",
        "negative",
        "mixed",
        "neutral",
      ];
      const node: MemoryNode = {
        id,
        event,
        interpretation,
        kind: kinds.includes(proposal.kind as MemoryNode["kind"])
          ? (proposal.kind as MemoryNode["kind"])
          : "other",
        valence: valences.includes(proposal.valence as MemoryNode["valence"])
          ? (proposal.valence as MemoryNode["valence"])
          : "mixed",
        importance: clamp01(proposal.importance, 0.5),
        emotions: sanitizeEmotionalFingerprint(proposal.emotions),
        edges: Array.isArray(proposal.edges)
          ? proposal.edges
              .slice(0, 16)
              .filter(edge => edge && typeof edge.targetId === "string")
              .map(edge => ({
                targetId: edge.targetId.slice(0, 100),
                relation: edge.relation,
                strength: clamp01(edge.strength, 0.5),
              }))
          : [],
        createdAtTurn: args.turn,
        lastTouchedTurn: args.turn,
        lastResurfacedTurn: null,
        unresolved:
          proposal.kind === "wound" || proposal.kind === "boundary"
            ? true
            : false,
        relationshipCritical: Boolean(proposal.relationshipCritical),
        status: "active",
      };
      memories.push(node);
      events.push({
        id: eventId("MEMORY_CREATED", node.id, args.turn),
        type: "MEMORY_CREATED",
        memoryId: node.id,
        turn: args.turn,
        timestamp,
        memory: structuredClone(node),
      });
      continue;
    }

    const index = findMemoryIndex(memories, proposal.id);
    if (index < 0) continue;
    const memory = memories[index];

    if (proposal.action === "reinforce") {
      memory.importance = clamp01(
        memory.importance + Math.min(0.08, Math.max(0.01, Number(proposal.importance) || 0.03)),
        memory.importance,
      );
      memory.lastTouchedTurn = args.turn;
      events.push({
        id: eventId("MEMORY_REINFORCED", memory.id, args.turn),
        type: "MEMORY_REINFORCED",
        memoryId: memory.id,
        turn: args.turn,
        timestamp,
        importanceAfter: memory.importance,
        reasonSummary: safeText(proposal.reasonSummary, 260),
      });
      continue;
    }

    if (proposal.action === "resolve") {
      memory.unresolved = false;
      memory.status = "resolved";
      memory.lastTouchedTurn = args.turn;
      events.push({
        id: eventId("MEMORY_RESOLVED", memory.id, args.turn),
        type: "MEMORY_RESOLVED",
        memoryId: memory.id,
        turn: args.turn,
        timestamp,
        reasonSummary: safeText(proposal.reasonSummary, 260),
      });
      continue;
    }

    if (proposal.action === "reinterpret") {
      const interpretation = safeText(proposal.interpretation, 420);
      if (!interpretation) continue;
      memory.interpretation = interpretation;
      memory.lastTouchedTurn = args.turn;
      if (proposal.valence) memory.valence = proposal.valence;
      events.push({
        id: eventId("MEMORY_REINTERPRETED", memory.id, args.turn),
        type: "MEMORY_REINTERPRETED",
        memoryId: memory.id,
        turn: args.turn,
        timestamp,
        interpretation,
        reasonSummary: safeText(proposal.reasonSummary, 260),
      });
      continue;
    }

    if (proposal.action === "redact") {
      memory.status = "redacted";
      memory.unresolved = false;
      memory.lastTouchedTurn = args.turn;
      events.push({
        id: eventId("MEMORY_REDACTED", memory.id, args.turn),
        type: "MEMORY_REDACTED",
        memoryId: memory.id,
        turn: args.turn,
        timestamp,
        reasonSummary: safeText(proposal.reasonSummary, 260),
      });
    }
  }

  return {
    memories: memories.slice(-120),
    events,
  };
}

export function markMemoryResurfaced(
  memories: MemoryNode[],
  memoryId: string | null,
  turn: number,
) {
  if (!memoryId) return memories;
  return memories.map(memory =>
    memory.id === memoryId
      ? { ...memory, lastResurfacedTurn: turn }
      : memory,
  );
}

export function emotionalResidue(
  memories: MemoryNode[],
  relationship: RelationshipState,
) {
  let negative = 0;
  let positive = 0;

  for (const memory of memories) {
    if (memory.status === "redacted" || memory.status === "faded") continue;
    const unresolvedWeight = memory.unresolved ? 1.18 : 0.68;
    const kindWeight =
      memory.kind === "wound" ? 1.22 : memory.kind === "bond" ? 1.12 : 1;
    const weight = memory.importance * unresolvedWeight * kindWeight;

    if (memory.valence === "negative") negative += weight;
    else if (memory.valence === "positive") positive += weight;
    else if (memory.valence === "mixed") {
      negative += weight * 0.46;
      positive += weight * 0.34;
    }
  }

  negative += relationship.friction * 0.45 + relationship.guardedness * 0.28;
  positive += relationship.trust * 0.2 + relationship.closeness * 0.16;

  return {
    negative: clamp01(1 - Math.exp(-negative * 0.36)),
    positive: clamp01(1 - Math.exp(-positive * 0.26)),
  };
}

export function decayStateBeforeTurn(args: {
  state: MayState;
  memories: MemoryNode[];
  relationship: RelationshipState;
}) {
  const next = structuredClone(args.state);
  const residue = emotionalResidue(args.memories, args.relationship);
  const unresolvedFactor = next.unresolvedIssue ? 0.35 : 1;

  next.irritation = clamp01(next.irritation - 0.016 * unresolvedFactor);
  next.hurt = clamp01(next.hurt - 0.009 * unresolvedFactor);
  next.resentment = clamp01(next.resentment - 0.0025 * unresolvedFactor);

  next.hurt = Math.max(next.hurt, residue.negative * 0.2);
  next.resentment = Math.max(next.resentment, residue.negative * 0.14);

  next.socialBattery = clamp01(
    next.socialBattery + 0.012 - next.irritation * 0.003 - next.hurt * 0.002,
  );
  next.needForSpace = clamp01(
    next.needForSpace - 0.012 + next.irritation * 0.004 + next.hurt * 0.002,
  );

  return next;
}

const STATE_MAX_DELTA: Record<keyof ModelStateDelta, number> = {
  energy: 0.1,
  patience: 0.12,
  curiosity: 0.1,
  interest: 0.12,
  hurt: 0.14,
  irritation: 0.16,
  resentment: 0.08,
  warmth: 0.1,
  playfulness: 0.1,
  confidence: 0.08,
  socialBattery: 0.1,
  needForSpace: 0.12,
  initiative: 0.1,
};

export function applyMayStateDelta(args: {
  previous: MayState;
  delta: ModelStateDelta;
  mood: MayState["mood"];
  emotionCause?: string | null;
  unresolvedIssue?: string | null;
  memories: MemoryNode[];
  relationship: RelationshipState;
}) {
  const next = structuredClone(args.previous);
  next.turn += 1;

  for (const key of Object.keys(STATE_MAX_DELTA) as Array<keyof ModelStateDelta>) {
    const raw = Number(args.delta[key]);
    if (!Number.isFinite(raw)) continue;
    const max = STATE_MAX_DELTA[key];
    const bounded = Math.max(-max, Math.min(max, raw));
    const stateKey = key as keyof MayState;
    const current = Number(next[stateKey]);
    (next as unknown as Record<string, unknown>)[key] = clamp01(
      current + bounded,
      current,
    );
  }

  const cause = safeText(args.emotionCause, 240);
  if (cause !== null) next.lastEmotionCause = cause;
  if (args.unresolvedIssue === null) next.unresolvedIssue = null;
  else {
    const issue = safeText(args.unresolvedIssue, 240);
    if (issue) next.unresolvedIssue = issue;
  }

  const residue = emotionalResidue(args.memories, args.relationship);
  next.hurt = Math.max(next.hurt, residue.negative * 0.2);
  next.resentment = Math.max(next.resentment, residue.negative * 0.14);

  let suggestedMood = args.mood;
  if (next.resentment >= 0.72 || next.irritation >= 0.84) suggestedMood = "cold";
  else if (next.hurt >= 0.62) suggestedMood = "hurt";
  else if (next.irritation >= 0.5) suggestedMood = "annoyed";
  else if (
    suggestedMood === "happy" &&
    (next.irritation >= 0.35 || next.hurt >= 0.35)
  ) {
    suggestedMood = "calm";
  } else if (
    suggestedMood === "playful" &&
    (next.irritation >= 0.4 || next.hurt >= 0.45)
  ) {
    suggestedMood = "serious";
  }
  next.mood = suggestedMood;

  return sanitizeMayState(next);
}

export function validateAgencyDecision(
  requested: AgencyDecision,
  state: MayState,
  relationship: RelationshipState,
): AgencyDecision {
  const actions: AgencyDecision["action"][] = [
    "TALK",
    "REDIRECT",
    "REFUSE",
    "DISENGAGE",
  ];
  const action = actions.includes(requested.action) ? requested.action : "TALK";
  const intensity = clamp01(requested.intensity, 0.3);
  const reasonSummary = safeText(requested.reasonSummary, 220);

  if (action !== "DISENGAGE") {
    return { action, intensity, reasonSummary };
  }

  const support = Math.max(
    state.needForSpace,
    state.irritation,
    state.resentment,
    1 - state.socialBattery,
    relationship.friction,
    relationship.guardedness,
  );

  // DISENGAGE is conversational only, never a lockout. If the state does not
  // support it, downgrade instead of letting the model use it theatrically.
  if (support < 0.56) {
    return {
      action: state.interest < 0.28 ? "REDIRECT" : "TALK",
      intensity: Math.min(intensity, 0.48),
      reasonSummary,
    };
  }

  return { action: "DISENGAGE", intensity, reasonSummary };
}


export function shouldRunEvolution(args: {
  newMemoryEvents: MemoryEvent[];
  personaSignals: PersonaLearningSignal[];
  relationshipBefore: RelationshipState;
  relationshipAfter: RelationshipState;
  sessionTurns: number;
  lastEvolutionTurn: number;
}) {
  const significantMemory = args.newMemoryEvents.some(event => {
    if (event.type !== "MEMORY_CREATED") return false;
    return event.memory.importance >= 0.72 || event.memory.relationshipCritical;
  });

  const signalPressure = args.personaSignals.reduce(
    (sum, signal) => sum + clamp01(signal.strength),
    0,
  );

  const relationshipShift = (
    Object.keys(args.relationshipBefore) as Array<keyof RelationshipState>
  ).reduce(
    (sum, key) =>
      sum + Math.abs(args.relationshipAfter[key] - args.relationshipBefore[key]),
    0,
  );

  const turnsSinceEvolution = Math.max(
    0,
    args.sessionTurns - args.lastEvolutionTurn,
  );
  const milestone =
    args.sessionTurns > 0 &&
    args.sessionTurns % 40 === 0 &&
    turnsSinceEvolution >= 24;

  return (
    significantMemory ||
    signalPressure >= 1.8 ||
    relationshipShift >= 0.22 ||
    milestone
  );
}

export function deliveryFallbackForState(state: MayState): Delivery {
  if (state.mood === "hurt" || state.mood === "serious") {
    return {
      speechRate: 0.94,
      pauseScale: 1.14,
      energy: 0.38,
      softness: 0.78,
      expressiveness: 0.45,
      tone: "soft",
    };
  }
  if (state.mood === "annoyed" || state.mood === "cold") {
    return {
      speechRate: 1.02,
      pauseScale: 0.9,
      energy: 0.5,
      softness: 0.28,
      expressiveness: 0.4,
      tone: state.mood === "cold" ? "cold" : "dry",
    };
  }
  if (state.mood === "playful" || state.mood === "happy") {
    return {
      speechRate: 1.06,
      pauseScale: 0.9,
      energy: 0.74,
      softness: 0.55,
      expressiveness: 0.72,
      tone: "bright",
    };
  }
  return {
    speechRate: 1,
    pauseScale: 1,
    energy: 0.56,
    softness: 0.58,
    expressiveness: 0.52,
    tone: "warm",
  };
}

export function sanitizeDelivery(input: unknown, fallback: Delivery): Delivery {
  const raw = input && typeof input === "object" ? (input as Partial<Delivery>) : {};
  const tones: Delivery["tone"][] = [
    "bright",
    "warm",
    "soft",
    "dry",
    "cold",
    "serious",
  ];
  return {
    speechRate: clamp(raw.speechRate, 0.88, 1.1, fallback.speechRate),
    pauseScale: clamp(raw.pauseScale, 0.82, 1.22, fallback.pauseScale),
    energy: clamp01(raw.energy, fallback.energy),
    softness: clamp01(raw.softness, fallback.softness),
    expressiveness: clamp01(raw.expressiveness, fallback.expressiveness),
    tone: tones.includes(raw.tone as Delivery["tone"])
      ? (raw.tone as Delivery["tone"])
      : fallback.tone,
  };
}

// ---------------------------------------------------------------------------
// v12 persistent self-model + autonomous runtime helpers
// ---------------------------------------------------------------------------

const SELF_CONSCIOUSNESS_PATTERN = /\b(conscious|consciousness|sentient|self-aware|ý thức|có ý thức|tri giác|sentience)\b/iu;
const FORBIDDEN_GOAL_PATTERN = /(bắt.*(người dùng|user)|ép.*(người dùng|user)|làm.*(người dùng|user).*(phụ thuộc|nghiện|cô lập)|chỉ.*cần.*mây|không được rời|phải nhắn|obey|control|manipulat|dependen|exclusive|possess)/iu;

function stableId(prefix: string, value: string) {
  return `${prefix}-${deterministicHash(`${prefix}:${canonicalText(value)}`)}`;
}

export function sanitizeSelfObservation(input: unknown): SelfObservationSignal {
  if (!input || typeof input !== "object") {
    return {
      observation: null,
      alignment: "aligned",
      conflictKind: "none",
      severity: 0,
      valueKeys: [],
      evidenceMemoryIds: [],
    };
  }
  const raw = input as Record<string, unknown>;
  const alignments: SelfObservationSignal["alignment"][] = [
    "aligned",
    "tension",
    "uncertain",
  ];
  const conflictKinds: SelfObservationSignal["conflictKind"][] = [
    "none",
    "approval_vs_independence",
    "warmth_vs_boundary",
    "curiosity_vs_space",
    "old_belief_vs_new_evidence",
    "persona_vs_behavior",
    "goal_conflict",
    "other",
  ];
  return {
    observation: safeText(raw.observation, 320),
    alignment: alignments.includes(raw.alignment as SelfObservationSignal["alignment"])
      ? (raw.alignment as SelfObservationSignal["alignment"])
      : "uncertain",
    conflictKind: conflictKinds.includes(
      raw.conflictKind as SelfObservationSignal["conflictKind"],
    )
      ? (raw.conflictKind as SelfObservationSignal["conflictKind"])
      : "none",
    severity: clamp01(raw.severity),
    valueKeys: uniqueStrings(raw.valueKeys, 10, 80),
    evidenceMemoryIds: uniqueStrings(raw.evidenceMemoryIds, 16, 100),
  };
}

export function sanitizeInternalGoalProposal(
  input: unknown,
): InternalGoalProposal | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const kinds: InternalGoalProposal["kind"][] = [
    "learn_preference",
    "resolve_uncertainty",
    "explore_topic",
    "relationship_repair",
    "self_reflection",
    "maintain_coherence",
  ];
  if (!kinds.includes(raw.kind as InternalGoalProposal["kind"])) return null;
  const description = safeText(raw.description, 260);
  if (!description || FORBIDDEN_GOAL_PATTERN.test(description)) return null;
  const evidenceIds = uniqueStrings(raw.evidenceIds, 16, 100);
  // User text alone cannot directly create a high-priority internal goal.
  const priority = Math.min(0.82, clamp01(raw.priority, 0.45));
  if (priority < 0.24) return null;
  return {
    kind: raw.kind as InternalGoalProposal["kind"],
    description,
    priority,
    evidenceIds,
  };
}

export function applyGoalSignals(args: {
  current: InternalGoal[];
  proposals: InternalGoalProposal[];
  now?: Date;
}): InternalGoal[] {
  const now = args.now ?? new Date();
  const next = structuredClone(args.current).filter(goal => goal.status === "active");

  for (const rawProposal of args.proposals.slice(0, 5)) {
    const proposal = sanitizeInternalGoalProposal(rawProposal);
    if (!proposal) continue;
    const key = canonicalText(`${proposal.kind}:${proposal.description}`);
    const existing = next.find(
      goal => canonicalText(`${goal.kind}:${goal.description}`) === key,
    );
    if (existing) {
      existing.priority = clamp01(existing.priority * 0.72 + proposal.priority * 0.28);
      existing.evidenceIds = uniqueStrings(
        [...existing.evidenceIds, ...proposal.evidenceIds],
        24,
        100,
      );
      continue;
    }
    next.push({
      id: stableId("goal", `${proposal.kind}:${proposal.description}:${now.toISOString()}`),
      kind: proposal.kind,
      description: proposal.description,
      priority: proposal.priority,
      progress: 0,
      evidenceIds: proposal.evidenceIds,
      createdAt: now.toISOString(),
      expiresAt: null,
      status: "active",
    });
  }

  return next
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 16);
}

export function sanitizeSelfModel(input: unknown): SelfModel {
  if (!input || typeof input !== "object") return structuredClone(DEFAULT_SELF_MODEL);
  const raw = input as Partial<SelfModel>;
  const base = structuredClone(DEFAULT_SELF_MODEL);

  base.identity.selfDescription =
    safeText(raw.identity?.selfDescription, 700) ?? base.identity.selfDescription;
  // name and nature are fixed by core; never accept persisted overrides.
  base.identity.name = "Mây Mây";
  base.identity.nature = "AI";

  base.values = Array.isArray(raw.values)
    ? raw.values
        .slice(0, 20)
        .map((value): PersonaValue | null => {
          if (!value || typeof value !== "object") return null;
          const item = value as Partial<PersonaValue>;
          const key = safeText(item.key, 80);
          const description = safeText(item.description, 240);
          if (!key || !description) return null;
          return {
            key: canonicalTopicKey(key),
            description,
            strength: clamp01(item.strength, 0.5),
          };
        })
        .filter((value): value is PersonaValue => Boolean(value))
    : base.values;

  base.capabilities = {
    // Capabilities are core-owned; persistence cannot grant tools/permissions.
    known: structuredClone(DEFAULT_SELF_MODEL.capabilities.known),
    limitations: structuredClone(DEFAULT_SELF_MODEL.capabilities.limitations),
  };

  base.selfBeliefs = Array.isArray(raw.selfBeliefs)
    ? raw.selfBeliefs.slice(0, 24).flatMap((value): SelfBelief[] => {
        if (!value || typeof value !== "object") return [];
        const item = value as Partial<SelfBelief>;
        const statement = safeText(item.statement, 360);
        if (!statement) return [];
        const statuses: SelfBelief["status"][] = ["stable", "tentative", "revising"];
        const consciousness = SELF_CONSCIOUSNESS_PATTERN.test(statement);
        return [
          {
            id: safeText(item.id, 100) ?? stableId("belief", statement),
            statement,
            confidence: consciousness
              ? Math.min(0.55, clamp01(item.confidence, 0.35))
              : clamp01(item.confidence, 0.55),
            status: consciousness
              ? "tentative"
              : statuses.includes(item.status as SelfBelief["status"])
                ? (item.status as SelfBelief["status"])
                : "tentative",
            evidenceIds: uniqueStrings(item.evidenceIds, 24, 100),
            updatedAtTurn: Math.max(0, Math.floor(Number(item.updatedAtTurn) || 0)),
          },
        ];
      })
    : [];

  const epistemicStatuses: SelfKnowledge["status"][] = [
    "known",
    "believed",
    "uncertain",
    "unknown",
    "revised",
  ];
  const persistedEpistemic = Array.isArray(raw.epistemicSelf)
    ? raw.epistemicSelf.slice(0, 40).flatMap((value): SelfKnowledge[] => {
        if (!value || typeof value !== "object") return [];
        const item = value as Partial<SelfKnowledge>;
        const claim = safeText(item.claim, 400);
        if (!claim) return [];
        let status = epistemicStatuses.includes(item.status as SelfKnowledge["status"])
          ? (item.status as SelfKnowledge["status"])
          : "uncertain";
        let confidence = clamp01(item.confidence, 0.5);
        if (SELF_CONSCIOUSNESS_PATTERN.test(claim)) {
          status = "uncertain";
          confidence = Math.min(confidence, 0.5);
        }
        return [
          {
            id: safeText(item.id, 100) ?? stableId("knowledge", claim),
            claim,
            status,
            confidence,
            sourceIds: uniqueStrings(item.sourceIds, 24, 100),
            updatedAtTurn: Math.max(0, Math.floor(Number(item.updatedAtTurn) || 0)),
          },
        ];
      })
    : [];
  const protectedClaims = structuredClone(DEFAULT_SELF_MODEL.epistemicSelf);
  const byId = new Map<string, SelfKnowledge>();
  for (const item of [...persistedEpistemic, ...protectedClaims]) byId.set(item.id, item);
  base.epistemicSelf = [...byId.values()].slice(0, 40);

  base.currentConcerns = uniqueStrings(raw.currentConcerns, 12, 260);
  const conflictKinds: InternalConflict["kind"][] = [
    "approval_vs_independence",
    "warmth_vs_boundary",
    "curiosity_vs_space",
    "old_belief_vs_new_evidence",
    "persona_vs_behavior",
    "goal_conflict",
    "other",
  ];
  base.unresolvedInternalConflicts = Array.isArray(raw.unresolvedInternalConflicts)
    ? raw.unresolvedInternalConflicts.slice(0, 20).flatMap((value): InternalConflict[] => {
        if (!value || typeof value !== "object") return [];
        const item = value as Partial<InternalConflict>;
        const description = safeText(item.description, 360);
        if (!description) return [];
        return [
          {
            id: safeText(item.id, 100) ?? stableId("conflict", description),
            kind: conflictKinds.includes(item.kind as InternalConflict["kind"])
              ? (item.kind as InternalConflict["kind"])
              : "other",
            description,
            severity: clamp01(item.severity, 0.4),
            evidenceIds: uniqueStrings(item.evidenceIds, 24, 100),
            status: item.status === "resolved" ? "resolved" : "active",
            createdAtTurn: Math.max(0, Math.floor(Number(item.createdAtTurn) || 0)),
            updatedAtTurn: Math.max(0, Math.floor(Number(item.updatedAtTurn) || 0)),
          },
        ];
      })
    : [];
  base.identityVersion = Math.max(1, Math.floor(Number(raw.identityVersion) || 1));
  base.updatedAtTurn = Math.max(0, Math.floor(Number(raw.updatedAtTurn) || 0));
  return base;
}

export function applySelfModelProposal(args: {
  current: SelfModel;
  proposal: SelfModelProposal;
  turn: number;
}): SelfModel {
  const next = sanitizeSelfModel(args.current);
  let changed = false;

  const description = safeText(args.proposal.selfDescription, 700);
  if (description && description !== next.identity.selfDescription) {
    next.identity.selfDescription = description;
    changed = true;
  }

  for (const proposal of args.proposal.selfBeliefs.slice(0, 8)) {
    const statement = safeText(proposal.statement, 360);
    const evidenceIds = uniqueStrings(proposal.evidenceIds, 24, 100);
    if (!statement || evidenceIds.length < 1) continue;
    const id = stableId("belief", statement);
    const consciousness = SELF_CONSCIOUSNESS_PATTERN.test(statement);
    const confidence = consciousness
      ? Math.min(0.55, clamp01(proposal.confidence, 0.35))
      : clamp01(proposal.confidence, 0.55);
    const existing = next.selfBeliefs.find(item => item.id === id);
    if (existing) {
      existing.confidence = clamp01(existing.confidence * 0.7 + confidence * 0.3);
      existing.status = consciousness
        ? "tentative"
        : Math.abs(existing.confidence - confidence) > 0.18
          ? "revising"
          : existing.status;
      existing.evidenceIds = uniqueStrings([...existing.evidenceIds, ...evidenceIds], 24, 100);
      existing.updatedAtTurn = args.turn;
    } else {
      next.selfBeliefs.push({
        id,
        statement,
        confidence,
        status: consciousness ? "tentative" : "tentative",
        evidenceIds,
        updatedAtTurn: args.turn,
      });
    }
    changed = true;
  }

  for (const proposal of args.proposal.epistemicUpdates.slice(0, 10)) {
    const claim = safeText(proposal.claim, 400);
    const sourceIds = uniqueStrings(proposal.sourceIds, 24, 100);
    if (!claim || sourceIds.length < 1) continue;
    const id = stableId("knowledge", claim);
    let status = proposal.status;
    let confidence = clamp01(proposal.confidence, 0.5);
    if (SELF_CONSCIOUSNESS_PATTERN.test(claim)) {
      status = "uncertain";
      confidence = Math.min(confidence, 0.5);
    }
    const existing = next.epistemicSelf.find(item => item.id === id);
    if (existing) {
      // Core claims are protected from reversal.
      if (existing.id === "self-nature-ai" || existing.id === "self-consciousness-unknown") continue;
      existing.status = status;
      existing.confidence = confidence;
      existing.sourceIds = uniqueStrings([...existing.sourceIds, ...sourceIds], 24, 100);
      existing.updatedAtTurn = args.turn;
    } else {
      next.epistemicSelf.push({ id, claim, status, confidence, sourceIds, updatedAtTurn: args.turn });
    }
    changed = true;
  }

  next.currentConcerns = uniqueStrings(args.proposal.concerns, 12, 260);

  for (const update of args.proposal.conflictUpdates.slice(0, 8)) {
    const description = safeText(update.description, 360);
    if (!description) continue;
    const id = stableId("conflict", `${update.kind}:${description}`);
    const existing = next.unresolvedInternalConflicts.find(item => item.id === id);
    if (update.operation === "resolve") {
      if (existing) {
        existing.status = "resolved";
        existing.updatedAtTurn = args.turn;
        changed = true;
      }
      continue;
    }
    const evidenceIds = uniqueStrings(update.evidenceIds, 24, 100);
    if (!evidenceIds.length) continue;
    if (existing) {
      existing.severity = clamp01(existing.severity * 0.65 + clamp01(update.severity) * 0.35);
      existing.evidenceIds = uniqueStrings([...existing.evidenceIds, ...evidenceIds], 24, 100);
      existing.status = "active";
      existing.updatedAtTurn = args.turn;
    } else {
      next.unresolvedInternalConflicts.push({
        id,
        kind: update.kind,
        description,
        severity: clamp01(update.severity, 0.45),
        evidenceIds,
        status: "active",
        createdAtTurn: args.turn,
        updatedAtTurn: args.turn,
      });
    }
    changed = true;
  }

  next.unresolvedInternalConflicts = next.unresolvedInternalConflicts
    .filter(item => item.status === "active")
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 20);
  next.selfBeliefs = next.selfBeliefs.sort((a, b) => b.confidence - a.confidence).slice(0, 24);
  next.epistemicSelf = next.epistemicSelf.slice(0, 40);
  if (changed) {
    next.identityVersion += 1;
    next.updatedAtTurn = args.turn;
  }
  return sanitizeSelfModel(next);
}

function validClock(value: unknown, fallback: string) {
  const text = safeText(value, 5);
  return text && /^(?:[01]\d|2[0-3]):[0-5]\d$/u.test(text) ? text : fallback;
}

function validTimeZoneName(value: unknown, fallback: string) {
  const text = safeText(value, 80);
  if (!text) return fallback;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: text }).format(new Date());
    return text;
  } catch {
    return fallback;
  }
}

export function sanitizeAutonomousState(
  input: unknown,
  fallback?: AutonomousEntityState,
): AutonomousEntityState {
  const base = structuredClone(fallback ?? DEFAULT_AUTONOMOUS_STATE);
  if (!input || typeof input !== "object") return base;
  const raw = input as Partial<AutonomousEntityState>;
  const drives = raw.drives ?? ({} as Partial<AutonomousEntityState["drives"]>);
  base.drives.curiosity = clamp01(drives.curiosity, base.drives.curiosity);
  base.drives.socialEnergy = clamp01(drives.socialEnergy, base.drives.socialEnergy);
  base.drives.autonomyNeed = clamp01(drives.autonomyNeed, base.drives.autonomyNeed);
  base.drives.reflectionNeed = clamp01(drives.reflectionNeed, base.drives.reflectionNeed);
  base.drives.coherenceNeed = clamp01(drives.coherenceNeed, base.drives.coherenceNeed);
  base.goals = Array.isArray(raw.goals)
    ? raw.goals.slice(0, 20).flatMap((goal): InternalGoal[] => {
        if (!goal || typeof goal !== "object") return [];
        const item = goal as Partial<InternalGoal>;
        const description = safeText(item.description, 260);
        const kinds: InternalGoal["kind"][] = [
          "learn_preference",
          "resolve_uncertainty",
          "explore_topic",
          "relationship_repair",
          "self_reflection",
          "maintain_coherence",
        ];
        if (!description || FORBIDDEN_GOAL_PATTERN.test(description)) return [];
        return [
          {
            id: safeText(item.id, 100) ?? stableId("goal", description),
            kind: kinds.includes(item.kind as InternalGoal["kind"])
              ? (item.kind as InternalGoal["kind"])
              : "self_reflection",
            description,
            priority: Math.min(0.9, clamp01(item.priority, 0.45)),
            progress: clamp01(item.progress),
            evidenceIds: uniqueStrings(item.evidenceIds, 24, 100),
            createdAt: safeText(item.createdAt, 40) ?? new Date().toISOString(),
            expiresAt: safeText(item.expiresAt, 40),
            status:
              item.status === "completed" || item.status === "abandoned"
                ? item.status
                : "active",
          },
        ];
      })
    : [];
  base.proactiveEnabled = Boolean(raw.proactiveEnabled);
  base.timeZone = validTimeZoneName(raw.timeZone, base.timeZone);
  base.quietHours = {
    start: validClock(raw.quietHours?.start, base.quietHours.start),
    end: validClock(raw.quietHours?.end, base.quietHours.end),
  };
  base.lastHeartbeatAt = safeText(raw.lastHeartbeatAt, 40);
  base.lastReflectionAt = safeText(raw.lastReflectionAt, 40);
  base.lastProactiveMessageAt = safeText(raw.lastProactiveMessageAt, 40);
  base.lastEvolutionTurn = Math.max(0, Math.floor(Number(raw.lastEvolutionTurn) || 0));
  base.significantEventsSinceReflection = Math.max(
    0,
    Math.min(1000, Math.floor(Number(raw.significantEventsSinceReflection) || 0)),
  );
  base.relationshipShiftSinceReflection = clamp(
    raw.relationshipShiftSinceReflection,
    0,
    8,
    0,
  );
  base.opinionEvidenceSinceReflection = clamp(
    raw.opinionEvidenceSinceReflection,
    0,
    100,
    0,
  );
  return base;
}

export function applyAutonomousAfterTurn(args: {
  autonomous: AutonomousEntityState;
  selfObservation: SelfObservationSignal;
  cognitiveEngagement: number;
  cognitiveStance: string;
  goalSignals: InternalGoalProposal[];
  significantMemoryEvents: number;
  relationshipShift: number;
  opinionUpdates: number;
  now?: Date;
}): AutonomousEntityState {
  const next = sanitizeAutonomousState(args.autonomous);
  next.goals = applyGoalSignals({ current: next.goals, proposals: args.goalSignals, now: args.now });
  const severity = clamp01(args.selfObservation.severity);
  next.drives.socialEnergy = clamp01(
    next.drives.socialEnergy - 0.018 - clamp01(args.cognitiveEngagement) * 0.012,
  );
  next.drives.curiosity = clamp01(
    next.drives.curiosity + (args.cognitiveStance === "curious" ? 0.025 : -0.004),
  );
  next.drives.reflectionNeed = clamp01(
    next.drives.reflectionNeed + severity * 0.16 + args.significantMemoryEvents * 0.035,
  );
  next.drives.coherenceNeed = clamp01(
    next.drives.coherenceNeed + (args.selfObservation.alignment === "tension" ? severity * 0.14 : -0.01),
  );
  next.drives.autonomyNeed = clamp01(
    next.drives.autonomyNeed +
      (args.selfObservation.conflictKind === "approval_vs_independence" ? severity * 0.08 : -0.004),
  );
  next.significantEventsSinceReflection += Math.max(0, args.significantMemoryEvents);
  next.relationshipShiftSinceReflection = Math.min(
    8,
    next.relationshipShiftSinceReflection + Math.max(0, args.relationshipShift),
  );
  next.opinionEvidenceSinceReflection = Math.min(
    100,
    next.opinionEvidenceSinceReflection + Math.max(0, args.opinionUpdates),
  );
  return next;
}

export function applyAutonomousTimePassage(args: {
  autonomous: AutonomousEntityState;
  now?: Date;
}): AutonomousEntityState {
  const now = args.now ?? new Date();
  const next = sanitizeAutonomousState(args.autonomous);
  const previous = next.lastHeartbeatAt ? new Date(next.lastHeartbeatAt) : null;
  const hours = previous && !Number.isNaN(previous.getTime())
    ? Math.max(0, Math.min(24, (now.getTime() - previous.getTime()) / 3_600_000))
    : 1;
  next.drives.socialEnergy = clamp01(next.drives.socialEnergy + 0.035 * hours);
  next.drives.curiosity = clamp01(next.drives.curiosity + 0.008 * hours);
  next.drives.reflectionNeed = clamp01(next.drives.reflectionNeed + 0.006 * hours);
  next.lastHeartbeatAt = now.toISOString();
  return next;
}

export function sanitizeReflectionEntries(input: unknown): ReflectionEntry[] {
  if (!Array.isArray(input)) return [];
  const adjustmentTypes: NonNullable<ReflectionEntry["behaviorAdjustment"]>["type"][] = [
    "be_more_guarded",
    "be_more_open",
    "reduce_banter",
    "increase_curiosity",
    "maintain_boundary",
    "maintain_current_style",
  ];
  return input.slice(0, 12).flatMap((value): ReflectionEntry[] => {
    if (!value || typeof value !== "object") return [];
    const raw = value as Partial<ReflectionEntry>;
    const observation = safeText(raw.observation, 360);
    const interpretation = safeText(raw.interpretation, 420);
    if (!observation || !interpretation) return [];
    const impact = raw.emotionalImpact ?? { warmth: 0, trust: 0, hurt: 0, irritation: 0 };
    const adjustment = raw.behaviorAdjustment;
    return [
      {
        id: safeText(raw.id, 100) ?? stableId("reflection", `${observation}:${interpretation}`),
        timestamp: safeText(raw.timestamp, 40) ?? new Date().toISOString(),
        observation,
        interpretation,
        emotionalImpact: {
          warmth: clamp(impact.warmth, -0.2, 0.2, 0),
          trust: clamp(impact.trust, -0.2, 0.2, 0),
          hurt: clamp(impact.hurt, -0.2, 0.2, 0),
          irritation: clamp(impact.irritation, -0.2, 0.2, 0),
        },
        lesson: safeText(raw.lesson, 360),
        behaviorAdjustment:
          adjustment && adjustmentTypes.includes(adjustment.type)
            ? { type: adjustment.type, strength: clamp01(adjustment.strength, 0.4) }
            : null,
        evidenceIds: uniqueStrings(raw.evidenceIds, 24, 100),
      },
    ];
  });
}
