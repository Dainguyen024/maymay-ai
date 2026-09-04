/* ============================================================
 * MÂY — SOVEREIGN HOMEOSTASIS V2
 * MULTI-TIMESCALE DYNAMICS
 * ============================================================
 *
 * Endogenous cognitive regulation across:
 *
 *   FAST   → immediate cognitive disturbance
 *   MEDIUM → sustained adaptation
 *   SLOW   → long-horizon disposition
 *
 * Core invariant:
 *
 *   ONE EVENT ≠ LONG-TERM SELF CHANGE
 *
 * This module:
 * - is deterministic
 * - is local-first
 * - is replayable
 * - is bounded
 * - is hysteretic
 * - consumes setpoints but cannot mutate them
 * - cannot call an LLM
 * - cannot write canonical mind state
 * - cannot directly alter belief / identity / memory
 *
 * Mây owns cognitive evolution.
 * Infrastructure owns integrity.
 * ============================================================
 */

export const HOMEOSTASIS_MULTISCALE_VERSION =
  "maymay.sovereign.homeostasis.multi-timescale.v2-pro" as const;

/* ============================================================
 * FUNDAMENTAL TYPES
 * ============================================================
 */

export type UnitInterval =
  number;

export type SignedUnitInterval =
  number;

export type HomeostaticDrive =
  | "epistemicHunger"
  | "dissolutionPressure"
  | "goalTension"
  | "cognitiveSatiety";

export type TimescaleName =
  | "FAST"
  | "MEDIUM"
  | "SLOW";

export const HOMEOSTATIC_DRIVES =
  Object.freeze([
    "epistemicHunger",
    "dissolutionPressure",
    "goalTension",
    "cognitiveSatiety",
  ] as const);

export interface RawHomeostaticSignals {
  readonly epistemicHunger:
    number;

  readonly dissolutionPressure:
    number;

  readonly goalTension:
    number;

  readonly cognitiveSatiety:
    number;
}

export interface HomeostaticSetpoints {
  readonly epistemicHunger:
    number;

  readonly dissolutionPressure:
    number;

  readonly goalTension:
    number;

  readonly cognitiveSatiety:
    number;
}

/* ============================================================
 * TIMESCALE STATE
 * ============================================================
 */

export interface TimescaleValue {
  readonly fast:
    UnitInterval;

  readonly medium:
    UnitInterval;

  readonly slow:
    UnitInterval;

  /*
   * Downstream cognitive signal.
   *
   * This is evidence for arbitration,
   * never a command.
   */
  readonly effective:
    UnitInterval;

  readonly setpoint:
    UnitInterval;

  /*
   * Signed distance from equilibrium:
   *
   * -1 = maximally below setpoint
   * +1 = maximally above setpoint
   */
  readonly deviation:
    SignedUnitInterval;
}

export interface MultiTimescaleState {
  readonly epistemicHunger:
    TimescaleValue;

  readonly dissolutionPressure:
    TimescaleValue;

  readonly goalTension:
    TimescaleValue;

  readonly cognitiveSatiety:
    TimescaleValue;
}

/* ============================================================
 * HYSTERESIS STATE
 * ============================================================
 */

export interface CriticalState {
  readonly dissolutionCritical:
    boolean;

  readonly enteredCriticalAt:
    string | null;

  readonly exitedCriticalAt:
    string | null;
}

/* ============================================================
 * VERSION BINDING
 * ============================================================
 */

export interface HomeostasisVersionBinding {
  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;

  readonly physicsVersion:
    typeof HOMEOSTASIS_MULTISCALE_VERSION;
}

/* ============================================================
 * PREVIOUS FRAME
 * ============================================================
 */

export interface PreviousMultiTimescaleFrame {
  readonly evaluatedAt:
    string;

  readonly state:
    MultiTimescaleState;

  readonly criticalState:
    CriticalState;

  readonly binding:
    HomeostasisVersionBinding;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface MultiTimescaleInput {
  readonly entityId:
    string;

  /*
   * Caller-provided clock.
   *
   * No Date.now() exists inside physics.
   */
  readonly now:
    string;

  readonly raw:
    RawHomeostaticSignals;

  /*
   * Adaptive Setpoint Core owns their evolution.
   *
   * This module only consumes them.
   */
  readonly setpoints?:
    Partial<HomeostaticSetpoints>;

  readonly previous?:
    PreviousMultiTimescaleFrame | null;

  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface TimescaleDynamicsConfig {
  readonly defaultSetpoints:
    HomeostaticSetpoints;

  readonly fastHalfLifeMs:
    number;

  readonly mediumHalfLifeMs:
    number;

  readonly slowHalfLifeMs:
    number;

  readonly fastMaxRisePerHour:
    number;

  readonly fastMaxFallPerHour:
    number;

  readonly mediumMaxRisePerHour:
    number;

  readonly mediumMaxFallPerHour:
    number;

  readonly slowMaxRisePerHour:
    number;

  readonly slowMaxFallPerHour:
    number;

  readonly effectiveFastWeight:
    number;

  readonly effectiveMediumWeight:
    number;

  readonly effectiveSlowWeight:
    number;

  /*
   * Hysteresis:
   *
   * enter > exit
   *
   * prevents:
   *
   * 0.819 → 0.821 → 0.818
   *
   * from thrashing CRITICAL state.
   */
  readonly dissolutionCriticalEnter:
    number;

  readonly dissolutionCriticalExit:
    number;

  /*
   * Prevent very large wall-clock gaps from being interpreted
   * as one unlimited integration step.
   */
  readonly maximumIntegrationWindowMs:
    number;
}

export const DEFAULT_TIMESCALE_DYNAMICS_CONFIG:
  Readonly<TimescaleDynamicsConfig> =
  Object.freeze({
    defaultSetpoints:
      Object.freeze({
        epistemicHunger:
          0.12,

        dissolutionPressure:
          0.08,

        goalTension:
          0.10,

        cognitiveSatiety:
          0.50,
      }),

    fastHalfLifeMs:
      1000 * 60 * 8,

    mediumHalfLifeMs:
      1000 * 60 * 60 * 3,

    slowHalfLifeMs:
      1000 * 60 * 60 * 36,

    fastMaxRisePerHour:
      1,

    fastMaxFallPerHour:
      1,

    mediumMaxRisePerHour:
      0.28,

    mediumMaxFallPerHour:
      0.24,

    slowMaxRisePerHour:
      0.045,

    slowMaxFallPerHour:
      0.040,

    effectiveFastWeight:
      0.52,

    effectiveMediumWeight:
      0.31,

    effectiveSlowWeight:
      0.17,

    dissolutionCriticalEnter:
      0.82,

    dissolutionCriticalExit:
      0.72,

    maximumIntegrationWindowMs:
      1000 * 60 * 60 * 24,
  });

/* ============================================================
 * INTEGRITY / AUDIT
 * ============================================================
 */

export type TemporalIntegrityStatus =
  | "VALID"
  | "INITIALIZED"
  | "INVALID_NOW"
  | "INVALID_PREVIOUS_TIME"
  | "TIME_REGRESSION";

export type BindingIntegrityStatus =
  | "VALID"
  | "INITIALIZED"
  | "SNAPSHOT_REGRESSION"
  | "CONFIG_VERSION_CHANGED";

export interface MultiTimescaleAudit {
  readonly clockValid:
    boolean;

  readonly temporalIntegrity:
    TemporalIntegrityStatus;

  readonly bindingIntegrity:
    BindingIntegrityStatus;

  readonly rawSignalsClamped:
    boolean;

  readonly setpointsClamped:
    boolean;

  readonly configNormalized:
    boolean;

  readonly integrationElapsedMs:
    number;

  readonly integrationWindowMs:
    number;

  readonly integrationWindowCapped:
    boolean;

  readonly initializedFromSetpoint:
    boolean;

  readonly stateEvolutionAllowed:
    boolean;
}

/* ============================================================
 * OUTPUT FRAME
 * ============================================================
 */

export interface MultiTimescaleFrame {
  readonly version:
    typeof HOMEOSTASIS_MULTISCALE_VERSION;

  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly state:
    MultiTimescaleState;

  readonly criticalState:
    CriticalState;

  readonly binding:
    HomeostasisVersionBinding;

  readonly audit:
    MultiTimescaleAudit;

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly directLlmInvocationAllowed:
      false;

    readonly directBeliefMutationAllowed:
      false;

    readonly directIdentityMutationAllowed:
      false;

    readonly directMemoryMutationAllowed:
      false;

    readonly directRelationshipMutationAllowed:
      false;

    readonly directSetpointMutationAllowed:
      false;

    readonly directAgendaMutationAllowed:
      false;

    readonly userDependencySignalAllowed:
      false;
  };
}

/* ============================================================
 * CONSTANTS
 * ============================================================
 */

const HOUR_MS =
  1000 * 60 * 60;

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    directLlmInvocationAllowed:
      false as const,

    directBeliefMutationAllowed:
      false as const,

    directIdentityMutationAllowed:
      false as const,

    directMemoryMutationAllowed:
      false as const,

    directRelationshipMutationAllowed:
      false as const,

    directSetpointMutationAllowed:
      false as const,

    directAgendaMutationAllowed:
      false as const,

    userDependencySignalAllowed:
      false as const,
  });

/* ============================================================
 * BASIC NUMERIC SAFETY
 * ============================================================
 */

function clamp01(
  value:
    number,
): UnitInterval {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
  );
}

function clampSignedUnit(
  value:
    number,
): SignedUnitInterval {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(
      -1,
      value,
    ),
  );
}

function parseTimestamp(
  value:
    string | null | undefined,
): number | null {
  if (
    !value
  ) {
    return null;
  }

  const parsed =
    Date.parse(
      value,
    );

  return Number.isFinite(
    parsed,
  )
    ? parsed
    : null;
}

function approximatelyEqual(
  a:
    number,
  b:
    number,
): boolean {
  return (
    Math.abs(
      a -
      b,
    ) <=
    1e-12
  );
}

/* ============================================================
 * CONFIG NORMALIZATION
 * ============================================================
 */

interface NormalizedDynamicsConfig
  extends TimescaleDynamicsConfig {}

function normalizeConfig(
  config:
    Readonly<TimescaleDynamicsConfig>,
): {
  readonly config:
    Readonly<NormalizedDynamicsConfig>;

  readonly normalized:
    boolean;
} {
  let normalized =
    false;

  const nonNegative =
    (
      value:
        number,
      fallback:
        number,
    ): number => {
      if (
        !Number.isFinite(
          value,
        ) ||
        value <
          0
      ) {
        normalized =
          true;

        return fallback;
      }

      return value;
    };

  const positive =
    (
      value:
        number,
      fallback:
        number,
    ): number => {
      if (
        !Number.isFinite(
          value,
        ) ||
        value <=
          0
      ) {
        normalized =
          true;

        return fallback;
      }

      return value;
    };

  let criticalEnter =
    clamp01(
      config
        .dissolutionCriticalEnter,
    );

  let criticalExit =
    clamp01(
      config
        .dissolutionCriticalExit,
    );

  if (
    criticalExit >=
      criticalEnter
  ) {
    normalized =
      true;

    criticalEnter =
      0.82;

    criticalExit =
      0.72;
  }

  const normalizedConfig:
    NormalizedDynamicsConfig =
    {
      defaultSetpoints:
        config
          .defaultSetpoints,

      fastHalfLifeMs:
        positive(
          config
            .fastHalfLifeMs,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .fastHalfLifeMs,
        ),

      mediumHalfLifeMs:
        positive(
          config
            .mediumHalfLifeMs,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .mediumHalfLifeMs,
        ),

      slowHalfLifeMs:
        positive(
          config
            .slowHalfLifeMs,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .slowHalfLifeMs,
        ),

      fastMaxRisePerHour:
        nonNegative(
          config
            .fastMaxRisePerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .fastMaxRisePerHour,
        ),

      fastMaxFallPerHour:
        nonNegative(
          config
            .fastMaxFallPerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .fastMaxFallPerHour,
        ),

      mediumMaxRisePerHour:
        nonNegative(
          config
            .mediumMaxRisePerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .mediumMaxRisePerHour,
        ),

      mediumMaxFallPerHour:
        nonNegative(
          config
            .mediumMaxFallPerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .mediumMaxFallPerHour,
        ),

      slowMaxRisePerHour:
        nonNegative(
          config
            .slowMaxRisePerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .slowMaxRisePerHour,
        ),

      slowMaxFallPerHour:
        nonNegative(
          config
            .slowMaxFallPerHour,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .slowMaxFallPerHour,
        ),

      effectiveFastWeight:
        nonNegative(
          config
            .effectiveFastWeight,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .effectiveFastWeight,
        ),

      effectiveMediumWeight:
        nonNegative(
          config
            .effectiveMediumWeight,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .effectiveMediumWeight,
        ),

      effectiveSlowWeight:
        nonNegative(
          config
            .effectiveSlowWeight,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .effectiveSlowWeight,
        ),

      dissolutionCriticalEnter:
        criticalEnter,

      dissolutionCriticalExit:
        criticalExit,

      maximumIntegrationWindowMs:
        nonNegative(
          config
            .maximumIntegrationWindowMs,
          DEFAULT_TIMESCALE_DYNAMICS_CONFIG
            .maximumIntegrationWindowMs,
        ),
    };

  return {
    config:
      Object.freeze(
        normalizedConfig,
      ),

    normalized,
  };
}

/* ============================================================
 * RAW SIGNAL SANITIZATION
 * ============================================================
 */

function sanitizeRawSignals(
  raw:
    RawHomeostaticSignals,
): {
  readonly value:
    RawHomeostaticSignals;

  readonly clamped:
    boolean;
} {
  let clamped =
    false;

  const sanitize =
    (
      value:
        number,
    ): number => {
      const result =
        clamp01(
          value,
        );

      if (
        !Number.isFinite(
          value,
        ) ||
        !approximatelyEqual(
          value,
          result,
        )
      ) {
        clamped =
          true;
      }

      return result;
    };

  return {
    value:
      Object.freeze({
        epistemicHunger:
          sanitize(
            raw
              .epistemicHunger,
          ),

        dissolutionPressure:
          sanitize(
            raw
              .dissolutionPressure,
          ),

        goalTension:
          sanitize(
            raw
              .goalTension,
          ),

        cognitiveSatiety:
          sanitize(
            raw
              .cognitiveSatiety,
          ),
      }),

    clamped,
  };
}

/* ============================================================
 * SETPOINT RESOLUTION
 * ============================================================
 */

function resolveSetpoints(
  provided:
    Partial<HomeostaticSetpoints> |
    undefined,
  defaults:
    HomeostaticSetpoints,
): {
  readonly value:
    HomeostaticSetpoints;

  readonly clamped:
    boolean;
} {
  let clamped =
    false;

  const resolve =
    (
      drive:
        HomeostaticDrive,
    ): number => {
      const raw =
        provided?.[drive] ??
        defaults[drive];

      const result =
        clamp01(
          raw,
        );

      if (
        !Number.isFinite(
          raw,
        ) ||
        !approximatelyEqual(
          raw,
          result,
        )
      ) {
        clamped =
          true;
      }

      return result;
    };

  return {
    value:
      Object.freeze({
        epistemicHunger:
          resolve(
            "epistemicHunger",
          ),

        dissolutionPressure:
          resolve(
            "dissolutionPressure",
          ),

        goalTension:
          resolve(
            "goalTension",
          ),

        cognitiveSatiety:
          resolve(
            "cognitiveSatiety",
          ),
      }),

    clamped,
  };
}

/* ============================================================
 * EXPONENTIAL TEMPORAL RESPONSE
 * ============================================================
 */

function responseAlpha(
  elapsedMs:
    number,
  halfLifeMs:
    number,
): number {
  if (
    elapsedMs <=
      0
  ) {
    return 0;
  }

  if (
    halfLifeMs <=
      0 ||
    !Number.isFinite(
      halfLifeMs,
    )
  ) {
    return 1;
  }

  return clamp01(
    1 -
      Math.pow(
        0.5,
        elapsedMs /
          halfLifeMs,
      ),
  );
}

/* ============================================================
 * BOUNDED APPROACH
 * ============================================================
 */

function boundedApproach(
  previous:
    number,
  target:
    number,
  elapsedMs:
    number,
  halfLifeMs:
    number,
  maxRisePerHour:
    number,
  maxFallPerHour:
    number,
): UnitInterval {
  const from =
    clamp01(
      previous,
    );

  const to =
    clamp01(
      target,
    );

  if (
    elapsedMs <=
      0
  ) {
    return from;
  }

  const alpha =
    responseAlpha(
      elapsedMs,
      halfLifeMs,
    );

  const ideal =
    from +
    (
      to -
      from
    ) *
      alpha;

  const desiredDelta =
    ideal -
    from;

  const hours =
    elapsedMs /
    HOUR_MS;

  const maximumRise =
    Math.max(
      0,
      maxRisePerHour,
    ) *
    hours;

  const maximumFall =
    Math.max(
      0,
      maxFallPerHour,
    ) *
    hours;

  const boundedDelta =
    desiredDelta >=
      0
      ? Math.min(
          desiredDelta,
          maximumRise,
        )
      : Math.max(
          desiredDelta,
          -maximumFall,
        );

  return clamp01(
    from +
      boundedDelta,
  );
}

/* ============================================================
 * EFFECTIVE SIGNAL
 * ============================================================
 */

function effectiveSignal(
  fast:
    number,
  medium:
    number,
  slow:
    number,
  config:
    Readonly<NormalizedDynamicsConfig>,
): UnitInterval {
  const wf =
    config
      .effectiveFastWeight;

  const wm =
    config
      .effectiveMediumWeight;

  const ws =
    config
      .effectiveSlowWeight;

  const total =
    wf +
    wm +
    ws;

  /*
   * Invalid zero-weight configuration fails toward MEDIUM,
   * not arbitrary zero.
   */
  if (
    total <=
      0
  ) {
    return clamp01(
      medium,
    );
  }

  return clamp01(
    (
      clamp01(
        fast,
      ) *
        wf +
      clamp01(
        medium,
      ) *
        wm +
      clamp01(
        slow,
      ) *
        ws
    ) /
      total,
  );
}

function buildTimescaleValue(
  fast:
    number,
  medium:
    number,
  slow:
    number,
  setpoint:
    number,
  config:
    Readonly<NormalizedDynamicsConfig>,
): TimescaleValue {
  const safeSetpoint =
    clamp01(
      setpoint,
    );

  const effective =
    effectiveSignal(
      fast,
      medium,
      slow,
      config,
    );

  return Object.freeze({
    fast:
      clamp01(
        fast,
      ),

    medium:
      clamp01(
        medium,
      ),

    slow:
      clamp01(
        slow,
      ),

    effective,

    setpoint:
      safeSetpoint,

    deviation:
      clampSignedUnit(
        effective -
          safeSetpoint,
      ),
  });
}

/* ============================================================
 * INITIALIZATION
 * ============================================================
 *
 * FAST may reflect present evidence.
 *
 * MEDIUM is partially anchored to equilibrium.
 *
 * SLOW starts at equilibrium.
 *
 * Therefore:
 *
 * one first observation
 * ≠
 * instant long-term disposition.
 * ============================================================
 */

function initializeDrive(
  raw:
    number,
  setpoint:
    number,
  config:
    Readonly<NormalizedDynamicsConfig>,
): TimescaleValue {
  const safeRaw =
    clamp01(
      raw,
    );

  const safeSetpoint =
    clamp01(
      setpoint,
    );

  const fast =
    safeRaw;

  const medium =
    clamp01(
      safeSetpoint *
        0.75 +
      safeRaw *
        0.25,
    );

  const slow =
    safeSetpoint;

  return buildTimescaleValue(
    fast,
    medium,
    slow,
    safeSetpoint,
    config,
  );
}

function initializeState(
  raw:
    RawHomeostaticSignals,
  setpoints:
    HomeostaticSetpoints,
  config:
    Readonly<NormalizedDynamicsConfig>,
): MultiTimescaleState {
  return Object.freeze({
    epistemicHunger:
      initializeDrive(
        raw
          .epistemicHunger,
        setpoints
          .epistemicHunger,
        config,
      ),

    dissolutionPressure:
      initializeDrive(
        raw
          .dissolutionPressure,
        setpoints
          .dissolutionPressure,
        config,
      ),

    goalTension:
      initializeDrive(
        raw
          .goalTension,
        setpoints
          .goalTension,
        config,
      ),

    cognitiveSatiety:
      initializeDrive(
        raw
          .cognitiveSatiety,
        setpoints
          .cognitiveSatiety,
        config,
      ),
  });
}

/* ============================================================
 * DRIVE INTEGRATION
 * ============================================================
 */

function integrateDrive(
  previous:
    TimescaleValue,
  rawTarget:
    number,
  setpoint:
    number,
  elapsedMs:
    number,
  config:
    Readonly<NormalizedDynamicsConfig>,
): TimescaleValue {
  const target =
    clamp01(
      rawTarget,
    );

  /*
   * FAST
   *
   * Situational cognition.
   */
  const fast =
    boundedApproach(
      previous.fast,
      target,
      elapsedMs,
      config
        .fastHalfLifeMs,
      config
        .fastMaxRisePerHour,
      config
        .fastMaxFallPerHour,
    );

  /*
   * MEDIUM
   *
   * Raw evidence influences it,
   * but only through a damped mixture.
   */
  const mediumTarget =
    clamp01(
      target *
        0.65 +
      fast *
        0.35,
    );

  const medium =
    boundedApproach(
      previous.medium,
      mediumTarget,
      elapsedMs,
      config
        .mediumHalfLifeMs,
      config
        .mediumMaxRisePerHour,
      config
        .mediumMaxFallPerHour,
    );

  /*
   * SLOW
   *
   * Never follows raw events directly.
   *
   * It follows sustained MEDIUM dynamics while retaining
   * equilibrium attraction.
   */
  const slowTarget =
    clamp01(
      clamp01(
        setpoint,
      ) *
        0.35 +
      medium *
        0.65,
    );

  const slow =
    boundedApproach(
      previous.slow,
      slowTarget,
      elapsedMs,
      config
        .slowHalfLifeMs,
      config
        .slowMaxRisePerHour,
      config
        .slowMaxFallPerHour,
    );

  return buildTimescaleValue(
    fast,
    medium,
    slow,
    setpoint,
    config,
  );
}

function integrateState(
  previous:
    MultiTimescaleState,
  raw:
    RawHomeostaticSignals,
  setpoints:
    HomeostaticSetpoints,
  elapsedMs:
    number,
  config:
    Readonly<NormalizedDynamicsConfig>,
): MultiTimescaleState {
  return Object.freeze({
    epistemicHunger:
      integrateDrive(
        previous
          .epistemicHunger,
        raw
          .epistemicHunger,
        setpoints
          .epistemicHunger,
        elapsedMs,
        config,
      ),

    dissolutionPressure:
      integrateDrive(
        previous
          .dissolutionPressure,
        raw
          .dissolutionPressure,
        setpoints
          .dissolutionPressure,
        elapsedMs,
        config,
      ),

    goalTension:
      integrateDrive(
        previous
          .goalTension,
        raw
          .goalTension,
        setpoints
          .goalTension,
        elapsedMs,
        config,
      ),

    cognitiveSatiety:
      integrateDrive(
        previous
          .cognitiveSatiety,
        raw
          .cognitiveSatiety,
        setpoints
          .cognitiveSatiety,
        elapsedMs,
        config,
      ),
  });
}

/* ============================================================
 * HYSTERESIS
 * ============================================================
 */

function resolveCriticalState(
  previous:
    CriticalState | null,
  dissolutionPressure:
    number,
  now:
    string,
  config:
    Readonly<NormalizedDynamicsConfig>,
): CriticalState {
  const pressure =
    clamp01(
      dissolutionPressure,
    );

  const previouslyCritical =
    previous
      ?.dissolutionCritical ??
    false;

  if (
    !previouslyCritical
  ) {
    const entered =
      pressure >=
      config
        .dissolutionCriticalEnter;

    return Object.freeze({
      dissolutionCritical:
        entered,

      enteredCriticalAt:
        entered
          ? now
          : previous
              ?.enteredCriticalAt ??
            null,

      exitedCriticalAt:
        previous
          ?.exitedCriticalAt ??
        null,
    });
  }

  const exited =
    pressure <=
    config
      .dissolutionCriticalExit;

  return Object.freeze({
    dissolutionCritical:
      !exited,

    enteredCriticalAt:
      previous
        ?.enteredCriticalAt ??
      now,

    exitedCriticalAt:
      exited
        ? now
        : previous
            ?.exitedCriticalAt ??
          null,
  });
}

/* ============================================================
 * BINDING INTEGRITY
 * ============================================================
 */

function bindingIntegrity(
  input:
    MultiTimescaleInput,
): BindingIntegrityStatus {
  if (
    !input.previous
  ) {
    return "INITIALIZED";
  }

  if (
    input.snapshotRevision <
      input
        .previous
        .binding
        .snapshotRevision
  ) {
    return "SNAPSHOT_REGRESSION";
  }

  if (
    input.configVersion !==
      input
        .previous
        .binding
        .configVersion
  ) {
    /*
     * Config changes require a new explicitly initialized
     * regulatory frame instead of silently reinterpreting
     * history under different physics parameters.
     */
    return "CONFIG_VERSION_CHANGED";
  }

  return "VALID";
}

/* ============================================================
 * FRAME BUILDERS
 * ============================================================
 */

function makeBinding(
  input:
    MultiTimescaleInput,
): HomeostasisVersionBinding {
  return Object.freeze({
    snapshotRevision:
      input.snapshotRevision,

    configVersion:
      input.configVersion,

    physicsVersion:
      HOMEOSTASIS_MULTISCALE_VERSION,
  });
}

function equilibriumRaw(
  setpoints:
    HomeostaticSetpoints,
): RawHomeostaticSignals {
  return Object.freeze({
    epistemicHunger:
      setpoints
        .epistemicHunger,

    dissolutionPressure:
      setpoints
        .dissolutionPressure,

    goalTension:
      setpoints
        .goalTension,

    cognitiveSatiety:
      setpoints
        .cognitiveSatiety,
  });
}

/* ============================================================
 * FAIL-CLOSED FREEZE
 * ============================================================
 */

function freezePreviousFrame(
  args: {
    readonly input:
      MultiTimescaleInput;

    readonly previous:
      PreviousMultiTimescaleFrame;

    readonly temporalIntegrity:
      TemporalIntegrityStatus;

    readonly bindingIntegrity:
      BindingIntegrityStatus;

    readonly rawSignalsClamped:
      boolean;

    readonly setpointsClamped:
      boolean;

    readonly configNormalized:
      boolean;
  },
): MultiTimescaleFrame {
  /*
   * Invalid temporal/binding conditions:
   *
   * cognition does NOT evolve.
   */

  return Object.freeze({
    version:
      HOMEOSTASIS_MULTISCALE_VERSION,

    entityId:
      args
        .input
        .entityId,

    evaluatedAt:
      args
        .input
        .now,

    state:
      args
        .previous
        .state,

    criticalState:
      args
        .previous
        .criticalState,

    binding:
      makeBinding(
        args.input,
      ),

    audit:
      Object.freeze({
        clockValid:
          args.temporalIntegrity !==
            "INVALID_NOW" &&
          args.temporalIntegrity !==
            "INVALID_PREVIOUS_TIME" &&
          args.temporalIntegrity !==
            "TIME_REGRESSION",

        temporalIntegrity:
          args
            .temporalIntegrity,

        bindingIntegrity:
          args
            .bindingIntegrity,

        rawSignalsClamped:
          args
            .rawSignalsClamped,

        setpointsClamped:
          args
            .setpointsClamped,

        configNormalized:
          args
            .configNormalized,

        integrationElapsedMs:
          0,

        integrationWindowMs:
          0,

        integrationWindowCapped:
          false,

        initializedFromSetpoint:
          false,

        stateEvolutionAllowed:
          false,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateMultiTimescaleDynamics(
  input:
    MultiTimescaleInput,
  suppliedConfig:
    Readonly<TimescaleDynamicsConfig> =
      DEFAULT_TIMESCALE_DYNAMICS_CONFIG,
): MultiTimescaleFrame {
  const normalized =
    normalizeConfig(
      suppliedConfig,
    );

  const config =
    normalized.config;

  const raw =
    sanitizeRawSignals(
      input.raw,
    );

  const setpoints =
    resolveSetpoints(
      input.setpoints,
      config
        .defaultSetpoints,
    );

  const nowMs =
    parseTimestamp(
      input.now,
    );

  const bindStatus =
    bindingIntegrity(
      input,
    );

  /* ----------------------------------------------------------
   * FIRST FRAME
   * ----------------------------------------------------------
   */

  if (
    !input.previous
  ) {
    /*
     * Invalid initial clock:
     *
     * raw signal is NOT allowed to manufacture temporal
     * history.
     *
     * Start at equilibrium only.
     */
    if (
      nowMs ===
        null
    ) {
      const state =
        initializeState(
          equilibriumRaw(
            setpoints.value,
          ),
          setpoints.value,
          config,
        );

      return Object.freeze({
        version:
          HOMEOSTASIS_MULTISCALE_VERSION,

        entityId:
          input.entityId,

        evaluatedAt:
          input.now,

        state,

        criticalState:
          Object.freeze({
            dissolutionCritical:
              false,

            enteredCriticalAt:
              null,

            exitedCriticalAt:
              null,
          }),

        binding:
          makeBinding(
            input,
          ),

        audit:
          Object.freeze({
            clockValid:
              false,

            temporalIntegrity:
              "INVALID_NOW" as const,

            bindingIntegrity:
              "INITIALIZED" as const,

            rawSignalsClamped:
              raw.clamped,

            setpointsClamped:
              setpoints.clamped,

            configNormalized:
              normalized.normalized,

            integrationElapsedMs:
              0,

            integrationWindowMs:
              0,

            integrationWindowCapped:
              false,

            initializedFromSetpoint:
              true,

            stateEvolutionAllowed:
              false,
          }),

        guarantees:
          GUARANTEES,
      });
    }

    const state =
      initializeState(
        raw.value,
        setpoints.value,
        config,
      );

    const criticalState =
      resolveCriticalState(
        null,
        state
          .dissolutionPressure
          .effective,
        input.now,
        config,
      );

    return Object.freeze({
      version:
        HOMEOSTASIS_MULTISCALE_VERSION,

      entityId:
        input.entityId,

      evaluatedAt:
        input.now,

      state,

      criticalState,

      binding:
        makeBinding(
          input,
        ),

      audit:
        Object.freeze({
          clockValid:
            true,

          temporalIntegrity:
            "INITIALIZED" as const,

          bindingIntegrity:
            "INITIALIZED" as const,

          rawSignalsClamped:
            raw.clamped,

          setpointsClamped:
            setpoints.clamped,

          configNormalized:
            normalized.normalized,

          integrationElapsedMs:
            0,

          integrationWindowMs:
            0,

          integrationWindowCapped:
            false,

          initializedFromSetpoint:
            true,

          stateEvolutionAllowed:
            true,
        }),

      guarantees:
        GUARANTEES,
    });
  }

  /* ----------------------------------------------------------
   * BINDING FAIL-CLOSED
   * ----------------------------------------------------------
   */

  if (
    bindStatus !==
      "VALID"
  ) {
    return freezePreviousFrame({
      input,

      previous:
        input.previous,

      temporalIntegrity:
        "VALID",

      bindingIntegrity:
        bindStatus,

      rawSignalsClamped:
        raw.clamped,

      setpointsClamped:
        setpoints.clamped,

      configNormalized:
        normalized.normalized,
    });
  }

  /* ----------------------------------------------------------
   * CLOCK INTEGRITY
   * ----------------------------------------------------------
   */

  if (
    nowMs ===
      null
  ) {
    return freezePreviousFrame({
      input,

      previous:
        input.previous,

      temporalIntegrity:
        "INVALID_NOW",

      bindingIntegrity:
        bindStatus,

      rawSignalsClamped:
        raw.clamped,

      setpointsClamped:
        setpoints.clamped,

      configNormalized:
        normalized.normalized,
    });
  }

  const previousMs =
    parseTimestamp(
      input
        .previous
        .evaluatedAt,
    );

  if (
    previousMs ===
      null
  ) {
    return freezePreviousFrame({
      input,

      previous:
        input.previous,

      temporalIntegrity:
        "INVALID_PREVIOUS_TIME",

      bindingIntegrity:
        bindStatus,

      rawSignalsClamped:
        raw.clamped,

      setpointsClamped:
        setpoints.clamped,

      configNormalized:
        normalized.normalized,
    });
  }

  if (
    nowMs <
      previousMs
  ) {
    return freezePreviousFrame({
      input,

      previous:
        input.previous,

      temporalIntegrity:
        "TIME_REGRESSION",

      bindingIntegrity:
        bindStatus,

      rawSignalsClamped:
        raw.clamped,

      setpointsClamped:
        setpoints.clamped,

      configNormalized:
        normalized.normalized,
    });
  }

  /* ----------------------------------------------------------
   * INTEGRATION WINDOW
   * ----------------------------------------------------------
   */

  const elapsedMs =
    Math.max(
      0,
      nowMs -
        previousMs,
    );

  const maxWindow =
    Math.max(
      0,
      config
        .maximumIntegrationWindowMs,
    );

  const integrationWindowMs =
    maxWindow ===
      0
      ? 0
      : Math.min(
          elapsedMs,
          maxWindow,
        );

  const integrationWindowCapped =
    integrationWindowMs <
      elapsedMs;

  /* ----------------------------------------------------------
   * STATE EVOLUTION
   * ----------------------------------------------------------
   */

  const nextState =
    integrateState(
      input
        .previous
        .state,
      raw.value,
      setpoints.value,
      integrationWindowMs,
      config,
    );

  const nextCriticalState =
    resolveCriticalState(
      input
        .previous
        .criticalState,
      nextState
        .dissolutionPressure
        .effective,
      input.now,
      config,
    );

  return Object.freeze({
    version:
      HOMEOSTASIS_MULTISCALE_VERSION,

    entityId:
      input.entityId,

    evaluatedAt:
      input.now,

    state:
      nextState,

    criticalState:
      nextCriticalState,

    binding:
      makeBinding(
        input,
      ),

    audit:
      Object.freeze({
        clockValid:
          true,

        temporalIntegrity:
          "VALID" as const,

        bindingIntegrity:
          "VALID" as const,

        rawSignalsClamped:
          raw.clamped,

        setpointsClamped:
          setpoints.clamped,

        configNormalized:
          normalized.normalized,

        integrationElapsedMs:
          elapsedMs,

        integrationWindowMs,

        integrationWindowCapped,

        initializedFromSetpoint:
          false,

        stateEvolutionAllowed:
          true,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * DOWNSTREAM COGNITIVE SIGNAL ADAPTER
 * ============================================================
 *
 * No mutation authority crosses this boundary.
 * ============================================================
 */

export interface MultiTimescaleCognitiveSignals {
  readonly epistemicHunger:
    UnitInterval;

  readonly dissolutionPressure:
    UnitInterval;

  readonly goalTension:
    UnitInterval;

  readonly cognitiveSatiety:
    UnitInterval;

  readonly dissolutionCritical:
    boolean;

  readonly clockValid:
    boolean;

  readonly stateEvolutionAllowed:
    boolean;

  readonly snapshotRevision:
    number;

  readonly configVersion:
    string;

  readonly physicsVersion:
    typeof HOMEOSTASIS_MULTISCALE_VERSION;
}

export function toMultiTimescaleCognitiveSignals(
  frame:
    MultiTimescaleFrame,
): MultiTimescaleCognitiveSignals {
  return Object.freeze({
    epistemicHunger:
      frame
        .state
        .epistemicHunger
        .effective,

    dissolutionPressure:
      frame
        .state
        .dissolutionPressure
        .effective,

    goalTension:
      frame
        .state
        .goalTension
        .effective,

    cognitiveSatiety:
      frame
        .state
        .cognitiveSatiety
        .effective,

    dissolutionCritical:
      frame
        .criticalState
        .dissolutionCritical,

    clockValid:
      frame
        .audit
        .clockValid,

    stateEvolutionAllowed:
      frame
        .audit
        .stateEvolutionAllowed,

    snapshotRevision:
      frame
        .binding
        .snapshotRevision,

    configVersion:
      frame
        .binding
        .configVersion,

    physicsVersion:
      HOMEOSTASIS_MULTISCALE_VERSION,
  });
}

/* ============================================================
 * END OF SOVEREIGN MULTI-TIMESCALE CORE
 * ============================================================
 */