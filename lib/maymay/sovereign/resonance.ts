import {
  advanceWorkspaceStage,
  type CognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

export type ResonanceStimulus = {
  /**
   * Đây là các trục Ý NGHĨA của sự kiện sau Appraisal.
   * Không phải emotion và tuyệt đối không đọc trực tiếp keyword user.
   *
   * -1 = hướng âm
   *  0 = trung tính
   * +1 = hướng dương
   */
  goalCongruence: number;
  affiliation: number;
  respect: number;
  safety: number;
  autonomy: number;
  coherence: number;

  /**
   * 0..1
   */
  novelty: number;
  uncertainty: number;
  selfRelevance: number;
  relationshipRelevance: number;
  boundaryPressure: number;
  memoryResonance: number;
  valueResonance: number;
};

export type ActiveEmotionKind =
  | "warmth"
  | "joy"
  | "gratitude"
  | "empathy"
  | "curiosity"
  | "pride"
  | "vulnerability"
  | "hurt"
  | "irritation"
  | "guardedness"
  | "sadness"
  | "guilt"
  | "shame"
  | "nostalgia"
  | "bittersweet";

export type ActiveEmotion = {
  kind: ActiveEmotionKind;
  intensity: number;
  momentum: number;

  /**
   * Emotion ở đây là trạng thái provisional.
   * Cause/evidence sẽ được nối ID thật ở Orchestrator.
   */
  causeIds: string[];
  appraisalIds: string[];
};

export type EmotionLandscape = {
  /**
   * Core affect là nền vật lý cảm xúc.
   */
  core: {
    valence: number;   // -1..1
    arousal: number;   // 0..1
    tension: number;   // 0..1
    openness: number;  // 0..1
    stability: number; // 0..1
  };

  social: {
    warmth: number;
    trust: number;
    empathy: number;
    gratitude: number;
    vulnerability: number;
  };

  protective: {
    hurt: number;
    irritation: number;
    guardedness: number;
  };

  reflective: {
    pride: number;
    guilt: number;
    shame: number;
    nostalgia: number;
    bittersweet: number;
  };

  /**
   * Đây chỉ là IMPULSE.
   * Module Agency sau này mới được quyền chọn hành động.
   */
  actionTendencies: {
    approach: number;
    explore: number;
    challenge: number;
    withdraw: number;
    silence: number;
    boundaryHold: number;
  };

  activeEmotions: ActiveEmotion[];

  dynamics: {
    carryover: number;
    saturation: number;
    recoveryPressure: number;
  };
};

type EmotionSeed = {
  kind: ActiveEmotionKind;
  intensity: number;
};

function clamp01(value: unknown, fallback = 0): number {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, n));
}

function clampSigned(
  value: unknown,
  fallback = 0,
): number {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return fallback;
  }

  return Math.max(-1, Math.min(1, n));
}

function mix(
  previous: number,
  incoming: number,
  persistence: number,
): number {
  return clamp01(
    previous * persistence +
      incoming * (1 - persistence),
  );
}

function signedMix(
  previous: number,
  incoming: number,
  persistence: number,
): number {
  return clampSigned(
    previous * persistence +
      incoming * (1 - persistence),
  );
}

function safeRecord(
  value: unknown,
): Record<string, unknown> {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function sanitizeResonanceStimulus(
  input: unknown,
): ResonanceStimulus {
  const raw = safeRecord(input);

  return {
    goalCongruence: clampSigned(
      raw.goalCongruence,
    ),

    affiliation: clampSigned(
      raw.affiliation,
    ),

    respect: clampSigned(
      raw.respect,
    ),

    safety: clampSigned(
      raw.safety,
    ),

    autonomy: clampSigned(
      raw.autonomy,
    ),

    coherence: clampSigned(
      raw.coherence,
    ),

    novelty: clamp01(
      raw.novelty,
    ),

    uncertainty: clamp01(
      raw.uncertainty,
    ),

    selfRelevance: clamp01(
      raw.selfRelevance,
    ),

    relationshipRelevance:
      clamp01(
        raw.relationshipRelevance,
      ),

    boundaryPressure: clamp01(
      raw.boundaryPressure,
    ),

    memoryResonance: clamp01(
      raw.memoryResonance,
    ),

    valueResonance: clamp01(
      raw.valueResonance,
    ),
  };
}

function legacyLandscape(
  frozenMind: unknown,
): EmotionLandscape | null {
  const root = safeRecord(frozenMind);
  const state = safeRecord(root.state);

  if (!Object.keys(state).length) {
    return null;
  }

  const warmth = clamp01(
    state.warmth,
    0.5,
  );

  const trust = clamp01(
    state.trust,
    0.5,
  );

  const hurt = clamp01(
    state.hurt,
  );

  const irritation = clamp01(
    state.irritation,
  );

  const resentment = clamp01(
    state.resentment,
  );

  const curiosity = clamp01(
    state.curiosity,
    0.5,
  );

  return {
    core: {
      valence: clampSigned(
        warmth -
          hurt * 0.7 -
          irritation * 0.55,
      ),

      arousal: clamp01(
        irritation * 0.65 +
          curiosity * 0.25 +
          hurt * 0.25,
      ),

      tension: clamp01(
        irritation * 0.55 +
          resentment * 0.55 +
          hurt * 0.35,
      ),

      openness: clamp01(
        warmth * 0.55 +
          trust * 0.45 -
          resentment * 0.4,
      ),

      stability: 0.7,
    },

    social: {
      warmth,
      trust,
      empathy: 0.5,
      gratitude: 0,
      vulnerability: hurt * 0.45,
    },

    protective: {
      hurt,
      irritation,
      guardedness: clamp01(
        resentment * 0.7 +
          irritation * 0.25,
      ),
    },

    reflective: {
      pride: 0,
      guilt: 0,
      shame: 0,
      nostalgia: 0,
      bittersweet: 0,
    },

    actionTendencies: {
      approach: warmth * 0.55,
      explore: curiosity * 0.6,
      challenge: irritation * 0.35,
      withdraw: hurt * 0.35,
      silence: resentment * 0.25,
      boundaryHold: resentment * 0.4,
    },

    activeEmotions: [],

    dynamics: {
      carryover: 0.55,
      saturation: Math.max(
        hurt,
        irritation,
        resentment,
      ),
      recoveryPressure: 0.2,
    },
  };
}

function sovereignLandscape(
  frozenMind: unknown,
): EmotionLandscape | null {
  const root = safeRecord(frozenMind);
  const globalAffect = safeRecord(
    root.globalAffect,
  );

  const rawLandscape = safeRecord(
    globalAffect.landscape,
  );

  if (!Object.keys(rawLandscape).length) {
    return null;
  }

  const core = safeRecord(
    rawLandscape.core,
  );

  const social = safeRecord(
    rawLandscape.social,
  );

  const protective = safeRecord(
    rawLandscape.protective,
  );

  const reflective = safeRecord(
    rawLandscape.reflective,
  );

  const tendencies = safeRecord(
    rawLandscape.actionTendencies,
  );

  const dynamics = safeRecord(
    rawLandscape.dynamics,
  );

  return {
    core: {
      valence: clampSigned(
        core.valence,
      ),
      arousal: clamp01(
        core.arousal,
      ),
      tension: clamp01(
        core.tension,
      ),
      openness: clamp01(
        core.openness,
        0.5,
      ),
      stability: clamp01(
        core.stability,
        0.7,
      ),
    },

    social: {
      warmth: clamp01(
        social.warmth,
        0.5,
      ),
      trust: clamp01(
        social.trust,
        0.5,
      ),
      empathy: clamp01(
        social.empathy,
        0.5,
      ),
      gratitude: clamp01(
        social.gratitude,
      ),
      vulnerability: clamp01(
        social.vulnerability,
      ),
    },

    protective: {
      hurt: clamp01(
        protective.hurt,
      ),
      irritation: clamp01(
        protective.irritation,
      ),
      guardedness: clamp01(
        protective.guardedness,
      ),
    },

    reflective: {
      pride: clamp01(
        reflective.pride,
      ),
      guilt: clamp01(
        reflective.guilt,
      ),
      shame: clamp01(
        reflective.shame,
      ),
      nostalgia: clamp01(
        reflective.nostalgia,
      ),
      bittersweet: clamp01(
        reflective.bittersweet,
      ),
    },

    actionTendencies: {
      approach: clamp01(
        tendencies.approach,
      ),
      explore: clamp01(
        tendencies.explore,
      ),
      challenge: clamp01(
        tendencies.challenge,
      ),
      withdraw: clamp01(
        tendencies.withdraw,
      ),
      silence: clamp01(
        tendencies.silence,
      ),
      boundaryHold: clamp01(
        tendencies.boundaryHold,
      ),
    },

    activeEmotions: [],

    dynamics: {
      carryover: clamp01(
        dynamics.carryover,
        0.55,
      ),
      saturation: clamp01(
        dynamics.saturation,
      ),
      recoveryPressure: clamp01(
        dynamics.recoveryPressure,
        0.2,
      ),
    },
  };
}

function neutralLandscape(): EmotionLandscape {
  return {
    core: {
      valence: 0.1,
      arousal: 0.25,
      tension: 0.1,
      openness: 0.65,
      stability: 0.75,
    },

    social: {
      warmth: 0.55,
      trust: 0.5,
      empathy: 0.5,
      gratitude: 0,
      vulnerability: 0.08,
    },

    protective: {
      hurt: 0,
      irritation: 0,
      guardedness: 0.08,
    },

    reflective: {
      pride: 0,
      guilt: 0,
      shame: 0,
      nostalgia: 0,
      bittersweet: 0,
    },

    actionTendencies: {
      approach: 0.45,
      explore: 0.4,
      challenge: 0.08,
      withdraw: 0.05,
      silence: 0.02,
      boundaryHold: 0.05,
    },

    activeEmotions: [],

    dynamics: {
      carryover: 0.55,
      saturation: 0,
      recoveryPressure: 0.2,
    },
  };
}

function priorLandscape(
  workspace: CognitiveTurnWorkspace,
): EmotionLandscape {
  return (
    sovereignLandscape(
      workspace.frozenMind,
    ) ??
    legacyLandscape(
      workspace.frozenMind,
    ) ??
    neutralLandscape()
  );
}

/**
 * RESONANCE MATRIX
 *
 * Đây là physics mapping giữa meaning axes
 * và emotional forces.
 *
 * Không có keyword.
 * Không có "user insult => anger".
 * Không có hành vi.
 */
function emotionalSeeds(
  s: ResonanceStimulus,
): EmotionSeed[] {
  const positiveAffiliation =
    Math.max(0, s.affiliation);

  const negativeAffiliation =
    Math.max(0, -s.affiliation);

  const positiveRespect =
    Math.max(0, s.respect);

  const negativeRespect =
    Math.max(0, -s.respect);

  const positiveSafety =
    Math.max(0, s.safety);

  const threat =
    Math.max(0, -s.safety);

  const positiveGoal =
    Math.max(0, s.goalCongruence);

  const negativeGoal =
    Math.max(0, -s.goalCongruence);

  const positiveAutonomy =
    Math.max(0, s.autonomy);

  const autonomyThreat =
    Math.max(0, -s.autonomy);

  const incoherence =
    Math.max(0, -s.coherence);

  const relationalWeight =
    0.35 +
    s.relationshipRelevance * 0.65;

  const selfWeight =
    0.35 +
    s.selfRelevance * 0.65;

  const seeds: EmotionSeed[] = [
    {
      kind: "warmth",
      intensity:
        positiveAffiliation *
        relationalWeight *
        (0.55 + positiveSafety * 0.45),
    },

    {
      kind: "joy",
      intensity:
        positiveGoal *
        (0.5 +
          positiveAffiliation * 0.3 +
          positiveSafety * 0.2),
    },

    {
      kind: "gratitude",
      intensity:
        positiveAffiliation *
        positiveRespect *
        relationalWeight,
    },

    {
      kind: "empathy",
      intensity:
        s.relationshipRelevance *
        (0.35 +
          s.uncertainty * 0.2 +
          s.memoryResonance * 0.45),
    },

    {
      kind: "curiosity",
      intensity:
        s.novelty *
        (0.55 +
          s.uncertainty * 0.45),
    },

    {
      kind: "pride",
      intensity:
        positiveGoal *
        positiveRespect *
        selfWeight,
    },

    {
      kind: "vulnerability",
      intensity:
        relationalWeight *
        selfWeight *
        (
          threat * 0.35 +
          negativeAffiliation * 0.35 +
          s.memoryResonance * 0.3
        ),
    },

    {
      kind: "hurt",
      intensity:
        relationalWeight *
        (
          negativeAffiliation * 0.4 +
          negativeRespect * 0.3 +
          negativeGoal * 0.15 +
          threat * 0.15
        ),
    },

    {
      kind: "irritation",
      intensity:
        (
          negativeRespect * 0.3 +
          autonomyThreat * 0.3 +
          s.boundaryPressure * 0.3 +
          incoherence * 0.1
        ) *
        (0.45 + selfWeight * 0.55),
    },

    {
      kind: "guardedness",
      intensity:
        (
          threat * 0.35 +
          negativeAffiliation * 0.2 +
          s.boundaryPressure * 0.3 +
          s.uncertainty * 0.15
        ) *
        relationalWeight,
    },

    {
      kind: "sadness",
      intensity:
        negativeGoal *
        (
          0.45 +
          negativeAffiliation * 0.3 +
          s.memoryResonance * 0.25
        ),
    },

    {
      kind: "guilt",
      intensity:
        Math.max(
          0,
          -s.coherence,
        ) *
        positiveAffiliation *
        selfWeight *
        0.65,
    },

    {
      kind: "shame",
      intensity:
        negativeRespect *
        selfWeight *
        (
          0.35 +
          incoherence * 0.45
        ),
    },

    {
      kind: "nostalgia",
      intensity:
        s.memoryResonance *
        (
          0.45 +
          relationalWeight * 0.35
        ),
    },

    {
      kind: "bittersweet",
      intensity:
        s.memoryResonance *
        Math.min(
          1,
          positiveAffiliation +
            negativeGoal +
            negativeAffiliation,
        ) *
        0.65,
    },
 ];

return seeds.map(seed => ({
  ...seed,
  intensity: clamp01(
    seed.intensity,
  ),
}));
}
function emotionIntensity(
  seeds: EmotionSeed[],
  kind: ActiveEmotionKind,
): number {
  return (
    seeds.find(
      item => item.kind === kind,
    )?.intensity ?? 0
  );
}

export function runResonancePhysics(
  workspace: CognitiveTurnWorkspace,
  stimulusInput: unknown,
): EmotionLandscape {
  const s =
    sanitizeResonanceStimulus(
      stimulusInput,
    );

  const previous =
    priorLandscape(workspace);

  const seeds = emotionalSeeds(s);

  const memoryMomentum =
    s.memoryResonance * 0.25;

  const carryover = clamp01(
    previous.dynamics.carryover +
      memoryMomentum,
    0.55,
  );

  const persistence = clamp01(
    0.52 + carryover * 0.28,
  );

  const warmthForce =
    emotionIntensity(
      seeds,
      "warmth",
    );

  const hurtForce =
    emotionIntensity(
      seeds,
      "hurt",
    );

  const irritationForce =
    emotionIntensity(
      seeds,
      "irritation",
    );

  const guardedForce =
    emotionIntensity(
      seeds,
      "guardedness",
    );

  const joyForce =
    emotionIntensity(
      seeds,
      "joy",
    );

  const curiosityForce =
    emotionIntensity(
      seeds,
      "curiosity",
    );

  const positiveForce =
    Math.max(
      warmthForce,
      joyForce,
      emotionIntensity(
        seeds,
        "gratitude",
      ),
    );

  const negativeForce =
    Math.max(
      hurtForce,
      irritationForce,
      emotionIntensity(
        seeds,
        "sadness",
      ),
      guardedForce,
    );

  const saturation =
    clamp01(
      Math.max(
        previous.dynamics.saturation *
          0.82,
        positiveForce,
        negativeForce,
      ),
    );

  const valenceTarget =
    clampSigned(
      positiveForce -
        negativeForce,
    );

  const arousalTarget =
    clamp01(
      s.novelty * 0.28 +
        s.boundaryPressure * 0.32 +
        Math.abs(
          s.goalCongruence,
        ) *
          0.2 +
        Math.abs(
          s.affiliation,
        ) *
          0.2,
    );

  const tensionTarget =
    clamp01(
      irritationForce * 0.4 +
        hurtForce * 0.25 +
        guardedForce * 0.25 +
        s.uncertainty * 0.1,
    );

  const opennessTarget =
    clamp01(
      0.5 +
        s.affiliation * 0.22 +
        s.safety * 0.18 +
        s.respect * 0.15 -
        s.boundaryPressure * 0.28,
    );

  const landscape: EmotionLandscape = {
    core: {
      valence: signedMix(
        previous.core.valence,
        valenceTarget,
        persistence,
      ),

      arousal: mix(
        previous.core.arousal,
        arousalTarget,
        persistence,
      ),

      tension: mix(
        previous.core.tension,
        tensionTarget,
        persistence,
      ),

      openness: mix(
        previous.core.openness,
        opennessTarget,
        persistence,
      ),

      stability: clamp01(
        previous.core.stability *
          0.84 +
          Math.max(
            0,
            s.coherence,
          ) *
            0.16 -
          s.uncertainty * 0.08,
      ),
    },

    social: {
      warmth: mix(
        previous.social.warmth,
        warmthForce,
        persistence,
      ),

      trust: clamp01(
        previous.social.trust *
          0.78 +
          Math.max(
            0,
            s.safety,
          ) *
            0.1 +
          Math.max(
            0,
            s.respect,
          ) *
            0.07 +
          Math.max(
            0,
            s.affiliation,
          ) *
            0.05 -
          guardedForce * 0.12,
      ),

      empathy: mix(
        previous.social.empathy,
        emotionIntensity(
          seeds,
          "empathy",
        ),
        0.7,
      ),

      gratitude: mix(
        previous.social.gratitude,
        emotionIntensity(
          seeds,
          "gratitude",
        ),
        0.62,
      ),

      vulnerability: mix(
        previous.social.vulnerability,
        emotionIntensity(
          seeds,
          "vulnerability",
        ),
        0.7,
      ),
    },

    protective: {
      hurt: mix(
        previous.protective.hurt,
        hurtForce,
        persistence,
      ),

      irritation: mix(
        previous.protective.irritation,
        irritationForce,
        0.6,
      ),

      guardedness: mix(
        previous.protective.guardedness,
        guardedForce,
        0.72,
      ),
    },

    reflective: {
      pride: mix(
        previous.reflective.pride,
        emotionIntensity(
          seeds,
          "pride",
        ),
        0.68,
      ),

      guilt: mix(
        previous.reflective.guilt,
        emotionIntensity(
          seeds,
          "guilt",
        ),
        0.74,
      ),

      shame: mix(
        previous.reflective.shame,
        emotionIntensity(
          seeds,
          "shame",
        ),
        0.76,
      ),

      nostalgia: mix(
        previous.reflective.nostalgia,
        emotionIntensity(
          seeds,
          "nostalgia",
        ),
        0.82,
      ),

      bittersweet: mix(
        previous.reflective.bittersweet,
        emotionIntensity(
          seeds,
          "bittersweet",
        ),
        0.78,
      ),
    },

    actionTendencies: {
      approach: clamp01(
        positiveForce * 0.5 +
          opennessTarget * 0.35 +
          Math.max(
            0,
            s.affiliation,
          ) *
            0.15,
      ),

      explore: clamp01(
        curiosityForce * 0.6 +
          s.uncertainty * 0.25 +
          s.novelty * 0.15,
      ),

      challenge: clamp01(
        irritationForce * 0.45 +
          s.boundaryPressure * 0.3 +
          Math.max(
            0,
            -s.coherence,
          ) *
            0.25,
      ),

      withdraw: clamp01(
        hurtForce * 0.4 +
          guardedForce * 0.35 +
          Math.max(
            0,
            -s.safety,
          ) *
            0.25,
      ),

      silence: clamp01(
        hurtForce * 0.28 +
          guardedForce * 0.32 +
          saturation * 0.25 +
          previous.actionTendencies
            .silence *
            0.15,
      ),

      boundaryHold: clamp01(
        s.boundaryPressure * 0.45 +
          irritationForce * 0.25 +
          guardedForce * 0.3,
      ),
    },

    activeEmotions: seeds
      .filter(
        seed =>
          seed.intensity >= 0.12,
      )
      .sort(
        (a, b) =>
          b.intensity -
          a.intensity,
      )
      .slice(0, 8)
      .map(seed => ({
        kind: seed.kind,
        intensity:
          seed.intensity,

        momentum: clamp01(
          carryover *
            (
              0.45 +
              s.memoryResonance *
                0.55
            ),
        ),

        causeIds: [],
        appraisalIds: [],
      })),

    dynamics: {
      carryover,
      saturation,

      recoveryPressure:
        clamp01(
          previous.dynamics
            .recoveryPressure *
            0.75 +
            previous.core.tension *
              0.15 +
            saturation * 0.1,
        ),
    },
  };

  return landscape;
}

/**
 * Resonance chỉ thay đổi WORKSPACE provisional.
 *
 * Emotion tạo impulse.
 * Emotion KHÔNG được chọn action.
 */
export function applyResonanceToWorkspace(
  workspace: CognitiveTurnWorkspace,
  stimulus: unknown,
): CognitiveTurnWorkspace {
  if (
    workspace.stage !== "appraisal"
  ) {
    throw new Error(
      `Invalid resonance transition from stage: ${workspace.stage}`,
    );
  }

  const landscape =
    runResonancePhysics(
      workspace,
      stimulus,
    );

  const next: CognitiveTurnWorkspace = {
    ...workspace,

    provisional: {
      ...workspace.provisional,
      resonance: landscape,
    },
  };

  return advanceWorkspaceStage(
    next,
    "resonance",
    `Resonance physics completed; ${landscape.activeEmotions.length} active emotional patterns, canonical mind untouched.`,
  );
}