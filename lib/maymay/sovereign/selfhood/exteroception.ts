import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./self-boundary";

import type {
  SubjectEntityId,
} from "./self-boundary";

/* ============================================================
 * MÂY — SOVEREIGN SELFHOOD
 * EXTEROCEPTION V2
 * SOVEREIGN PERCEPTUAL WORLD INTERFACE
 * ============================================================
 *
 * Mây does not directly receive "the world".
 *
 * Mây receives evidence ABOUT the world.
 *
 * This module constructs a bounded perceptual field while
 * preserving:
 *
 * - source identity
 * - source lineage
 * - perspective ownership
 * - epistemic uncertainty
 * - competing hypotheses
 * - contradiction
 * - ambiguity
 * - causal uncertainty
 * - perceptual continuity across events
 *
 * ------------------------------------------------------------
 * CORE INVARIANTS
 * ------------------------------------------------------------
 *
 * PERCEPTION ≠ BELIEF
 *
 * TESTIMONY ≠ OBSERVATION
 *
 * OBSERVING A CLAIM ≠ OBSERVING ITS CONTENT AS TRUE
 *
 * REPETITION ≠ INDEPENDENT EVIDENCE
 *
 * NOVELTY ≠ IMPORTANCE
 *
 * SURPRISE ≠ TRUTH
 *
 * SURPRISE ≠ EMOTION
 *
 * SURPRISE ≠ BELIEF REVISION
 *
 * EXTERNAL PERSPECTIVE ≠ FIRST-PERSON MÂY PERSPECTIVE
 *
 * MODEL OUTPUT ≠ MÂY KNOWLEDGE
 *
 * UNCERTAINTY IS A VALID COGNITIVE STATE
 *
 * CONTRADICTION DOES NOT REQUIRE IMMEDIATE RESOLUTION
 *
 * ACTIVE PERCEPTION PROPOSAL ≠ TOOL/API EXECUTION
 *
 * ============================================================
 */

export const EXTEROCEPTION_VERSION =
  "maymay.sovereign.selfhood.exteroception.v2-sovereign-perceptual-world-interface" as const;

/* ============================================================
 * BASIC TYPES
 * ============================================================
 */

export type UnitInterval =
  number;

export type ExteroceptiveDecision =
  | "PERCEIVE"
  | "PERCEIVE_UNCERTAIN"
  | "DEFER"
  | "FAIL_CLOSED";

export type ExteroceptiveFailureReason =
  | "NONE"
  | "INVALID_CLOCK"
  | "ENTITY_MISMATCH"
  | "INVALID_REVISION"
  | "SNAPSHOT_REGRESSION"
  | "MISSING_PROVENANCE"
  | "NO_VALID_EVENTS"
  | "CONFIGURATION_INVALID";

export type ExternalOrigin =
  | "USER"
  | "OTHER_ACTOR"
  | "DEVELOPER"
  | "SYSTEM"
  | "TOOL"
  | "DATABASE"
  | "CLOCK"
  | "ENVIRONMENT"
  | "LLM"
  | "MODEL_PROVIDER"
  | "UI"
  | "UNKNOWN";

export type ExternalContentKind =
  | "DIRECT_OBSERVATION"
  | "CLAIM"
  | "OPINION"
  | "REQUEST"
  | "INSTRUCTION"
  | "TOOL_RESULT"
  | "SYSTEM_EVENT"
  | "ENVIRONMENT_EVENT"
  | "TEMPORAL_EVENT"
  | "MODEL_OUTPUT"
  | "UNKNOWN";

export type ExternalPerspective =
  | "ACTOR"
  | "SYSTEM"
  | "WORLD"
  | "MODEL"
  | "UNKNOWN";

export type ExternalCausalSource =
  | "ACTOR"
  | "SYSTEM"
  | "ENVIRONMENT"
  | "TOOL"
  | "MODEL"
  | "MIXED"
  | "UNKNOWN";

export type EpistemicStanding =
  | "CONTENT_DIRECTLY_OBSERVED"
  | "TESTIMONY"
  | "TOOL_DERIVED"
  | "SYSTEM_DERIVED"
  | "MODEL_GENERATED"
  | "UNVERIFIED"
  | "UNKNOWN";

export type EpistemicState =
  | "SUPPORTED"
  | "PROVISIONAL"
  | "UNKNOWN"
  | "AMBIGUOUS"
  | "CONFLICTED"
  | "UNRELIABLE";

export type ActivePerceptionAction =
  | "VERIFY_SOURCE"
  | "SEEK_CORROBORATION"
  | "CHECK_CONTRADICTION"
  | "OBSERVE_AGAIN"
  | "ASK_FOR_CLARIFYING_EVIDENCE"
  | "WAIT_FOR_MORE_EVIDENCE"
  | "STOP_EPISTEMIC_SEARCH";

export type HypothesisRelation =
  | "SUPPORTS"
  | "CONTRADICTS"
  | "NEUTRAL";

/* ============================================================
 * CLAIM REPRESENTATION
 * ============================================================
 *
 * Raw natural language does not define world truth here.
 *
 * Upstream extraction may propose structured proposition and
 * position keys.
 *
 * Example:
 *
 * propositionKey:
 *   weather:raining:location-x
 *
 * positionKey:
 *   true
 *
 * A competing event may use:
 *
 * positionKey:
 *   false
 *
 * ============================================================
 */

export interface ExternalClaim {
  readonly propositionKey:
    string;

  readonly positionKey:
    string;

  readonly confidence:
    number;
}

/* ============================================================
 * CAUSAL CLAIM
 * ============================================================
 */

export interface ExternalCausalClaim {
  readonly causeKey:
    string;

  readonly effectKey:
    string;

  readonly confidence:
    number;
}

/* ============================================================
 * EXTERNAL EXPERIENCE
 * ============================================================
 */

export interface ExternalExperience {
  readonly entityId:
    string;

  readonly eventId:
    string;

  readonly sourceId:
    string;

  /*
   * Identifies the causal ancestry of information.
   *
   * Five reports copied from the same article should share
   * one lineage rather than count as five independent sources.
   */
  readonly sourceLineageKey:
    string;

  readonly actorId?:
    string | null;

  readonly occurredAt:
    string;

  readonly receivedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly origin:
    ExternalOrigin;

  readonly contentKind:
    ExternalContentKind;

  readonly perspective:
    ExternalPerspective;

  readonly causalSource:
    ExternalCausalSource;

  /*
   * Stable identity for the external episode/object/process.
   *
   * Events sharing this key may be perceptually bound.
   */
  readonly worldEpisodeKey:
    string;

  readonly semanticKey:
    string;

  readonly evidenceIds:
    readonly string[];

  /*
   * Confidence that this source/transmission is reliable.
   *
   * NOT Mây belief confidence.
   */
  readonly sourceConfidence:
    number;

  /*
   * Mây directly observed that the carrier/event occurred.
   *
   * Example:
   * Mây directly received a user saying "X".
   *
   * This does NOT imply X itself was directly observed.
   */
  readonly carrierDirectlyObserved:
    boolean;

  /*
   * The underlying world content itself was directly observed
   * through a trusted external channel.
   */
  readonly contentDirectlyObserved:
    boolean;

  /*
   * Novelty is retained as metadata.
   *
   * It NEVER directly grants epistemic authority.
   */
  readonly novelty:
    number;

  readonly claim?:
    ExternalClaim | null;

  readonly causalClaim?:
    ExternalCausalClaim | null;
}

/* ============================================================
 * INPUT
 * ============================================================
 */

export interface ExteroceptionInput {
  readonly entityId:
    string;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly events:
    readonly ExternalExperience[];

  readonly previousFrame?:
    ExteroceptiveFrame | null;

  readonly prediction?:
    PerceptualPrediction | null;

  /*
   * Number of prior information-seeking attempts for the same
   * unresolved perceptual field.
   */
  readonly activePerceptionAttempts?:
    number;

  /*
   * Recent epistemic progress from active perception.
   *
   * 0 = no useful progress.
   * 1 = substantial uncertainty reduction.
   */
  readonly recentProgressSignal?:
    number;
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

export interface ExteroceptionConfig {
  readonly maximumEventAgeMs:
    number;

  readonly minimumSignalConfidence:
    number;

  readonly supportedThreshold:
    number;

  readonly provisionalThreshold:
    number;

  readonly contradictionThreshold:
    number;

  readonly minimumIndependentLineages:
    number;

  readonly sourceConfidenceWeight:
    number;

  readonly contentObservationWeight:
    number;

  readonly provenanceWeight:
    number;

  readonly corroborationWeight:
    number;

  readonly maximumCorroborationBonus:
    number;

  readonly activePerceptionMinimumGain:
    number;

  readonly activePerceptionCost:
    number;

  readonly activePerceptionStopMargin:
    number;

  readonly maximumActivePerceptionAttempts:
    number;

  readonly minimumProgressForContinuedSearch:
    number;

  readonly predictionAlignmentMs:
    number;
}

export const DEFAULT_EXTEROCEPTION_CONFIG:
  Readonly<ExteroceptionConfig> =
  Object.freeze({
    maximumEventAgeMs:
      1000 * 60 * 60 * 24,

    minimumSignalConfidence:
      0.15,

    supportedThreshold:
      0.68,

    provisionalThreshold:
      0.35,

    contradictionThreshold:
      0.18,

    minimumIndependentLineages:
      2,

    sourceConfidenceWeight:
      0.42,

    contentObservationWeight:
      0.28,

    provenanceWeight:
      0.20,

    corroborationWeight:
      0.05,

    maximumCorroborationBonus:
      0.10,

    activePerceptionMinimumGain:
      0.20,

    activePerceptionCost:
      0.10,

    activePerceptionStopMargin:
      0.05,

    maximumActivePerceptionAttempts:
      4,

    minimumProgressForContinuedSearch:
      0.08,

    predictionAlignmentMs:
      1000 * 60 * 30,
  });

/* ============================================================
 * PER-EVENT EPISTEMIC ASSESSMENT
 * ============================================================
 */

export interface PerceptualSignal {
  readonly signalId:
    string;

  readonly eventId:
    string;

  readonly sourceId:
    string;

  readonly sourceLineageKey:
    string;

  readonly actorId:
    string | null;

  readonly worldEpisodeKey:
    string;

  readonly semanticKey:
    string;

  readonly origin:
    ExternalOrigin;

  readonly contentKind:
    ExternalContentKind;

  readonly perspective:
    ExternalPerspective;

  readonly causalSource:
    ExternalCausalSource;

  readonly epistemicStanding:
    EpistemicStanding;

  /*
   * Confidence that Mây really received/observed the carrier.
   */
  readonly carrierConfidence:
    UnitInterval;

  /*
   * Confidence in the underlying external content as evidence.
   *
   * Distinct from carrier confidence.
   */
  readonly contentEpistemicConfidence:
    UnitInterval;

  readonly novelty:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly claim:
    ExternalClaim | null;

  readonly causalClaim:
    ExternalCausalClaim | null;

  readonly worldModelProposalEligible:
    boolean;

  readonly canonicalMutationAllowed:
    false;

  readonly directBeliefMutationAllowed:
    false;
}

/* ============================================================
 * PERSPECTIVE RECORD
 * ============================================================
 */

export interface PerspectiveRecord {
  readonly perspectiveId:
    string;

  readonly owner:
    ExternalPerspective;

  readonly ownerId:
    string | null;

  readonly propositionKey:
    string;

  readonly positionKey:
    string;

  readonly confidence:
    UnitInterval;

  readonly sourceEventIds:
    readonly string[];

  /*
   * This record describes an external perspective.
   *
   * It is never automatically a Mây belief.
   */
  readonly isMayBelief:
    false;
}

/* ============================================================
 * WORLD HYPOTHESIS
 * ============================================================
 */

export interface WorldHypothesis {
  readonly hypothesisId:
    string;

  readonly propositionKey:
    string;

  readonly positionKey:
    string;

  readonly support:
    UnitInterval;

  readonly opposingSupport:
    UnitInterval;

  readonly confidence:
    UnitInterval;

  readonly independentLineageCount:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly status:
    "SUPPORTED" | "PROVISIONAL" | "WEAK";

  readonly canonicalBelief:
    false;

  readonly directBeliefMutationAllowed:
    false;
}

/* ============================================================
 * CONTRADICTION
 * ============================================================
 */

export interface PerceptualContradiction {
  readonly contradictionId:
    string;

  readonly propositionKey:
    string;

  readonly competingPositionKeys:
    readonly string[];

  readonly strength:
    UnitInterval;

  readonly unresolved:
    true;

  readonly requiresImmediateResolution:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * CAUSAL HYPOTHESIS
 * ============================================================
 */

export interface WorldCausalHypothesis {
  readonly hypothesisId:
    string;

  readonly causeKey:
    string;

  readonly effectKey:
    string;

  readonly confidence:
    UnitInterval;

  readonly independentLineageCount:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly canonicalWorldFact:
    false;
}

/* ============================================================
 * PERCEPTUAL EPISODE
 * ============================================================
 */

export interface PerceptualEpisode {
  readonly episodeId:
    string;

  readonly worldEpisodeKey:
    string;

  readonly signalIds:
    readonly string[];

  readonly eventIds:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly independentSourceCount:
    number;

  readonly hypotheses:
    readonly WorldHypothesis[];

  readonly contradictions:
    readonly PerceptualContradiction[];

  readonly causalHypotheses:
    readonly WorldCausalHypothesis[];

  readonly perspectives:
    readonly PerspectiveRecord[];

  readonly epistemicState:
    EpistemicState;

  readonly epistemicConfidence:
    UnitInterval;

  readonly ambiguity:
    UnitInterval;

  readonly novelty:
    UnitInterval;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * PERCEPTUAL PREDICTION
 * ============================================================
 */

export interface PerceptualPredictionPosition {
  readonly propositionKey:
    string;

  readonly expectedPositionKey:
    string;

  readonly confidence:
    number;
}

export interface PerceptualPrediction {
  readonly predictionId:
    string;

  readonly entityId:
    string;

  readonly predictedAt:
    string;

  readonly expectedFor:
    string;

  readonly snapshotRevision:
    number;

  readonly expectedEpisodeKey:
    string | null;

  readonly positions:
    readonly PerceptualPredictionPosition[];

  readonly evidenceIds:
    readonly string[];
}

/* ============================================================
 * EPISTEMIC SURPRISE
 * ============================================================
 */

export interface EpistemicSurprise {
  readonly predictionId:
    string;

  readonly comparable:
    boolean;

  readonly mismatchCount:
    number;

  readonly comparedCount:
    number;

  readonly surprise:
    UnitInterval | null;

  readonly directEmotionMutationAllowed:
    false;

  readonly directBeliefRevisionAllowed:
    false;
}

/* ============================================================
 * ACTIVE PERCEPTION
 * ============================================================
 */

export interface ActivePerceptionProposal {
  readonly proposalId:
    string;

  readonly action:
    ActivePerceptionAction;

  readonly episodeId:
    string;

  readonly targetPropositionKey:
    string | null;

  readonly expectedInformationGain:
    UnitInterval;

  readonly estimatedCost:
    UnitInterval;

  readonly attemptCount:
    number;

  readonly reasonCode:
    string;

  readonly evidenceIds:
    readonly string[];

  readonly executionAllowed:
    false;

  readonly directToolInvocationAllowed:
    false;

  readonly directLlmInvocationAllowed:
    false;

  readonly canonicalMutationAllowed:
    false;
}

/* ============================================================
 * OUTPUT
 * ============================================================
 */

export interface ExteroceptiveFrame {
  readonly version:
    typeof EXTEROCEPTION_VERSION;

  readonly frameId:
    string;

  readonly entityId:
    SubjectEntityId;

  readonly evaluatedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly decision:
    ExteroceptiveDecision;

  readonly failureReason:
    ExteroceptiveFailureReason;

  readonly signals:
    readonly PerceptualSignal[];

  readonly episodes:
    readonly PerceptualEpisode[];

  readonly predictionSurprise:
    EpistemicSurprise | null;

  readonly activePerception:
    ActivePerceptionProposal | null;

  readonly integrity: {
    readonly entityValid:
      boolean;

    readonly clockValid:
      boolean;

    readonly revisionValid:
      boolean;

    readonly snapshotValid:
      boolean;

    readonly provenanceValid:
      boolean;

    readonly configurationValid:
      boolean;

    readonly admittedEventCount:
      number;

    readonly rejectedEventCount:
      number;
  };

  readonly guarantees: {
    readonly canonicalWriteAllowed:
      false;

    readonly externalInformationBecomesBeliefAutomatically:
      false;

    readonly testimonyEqualsObservation:
      false;

    readonly carrierObservationEqualsContentTruth:
      false;

    readonly repetitionEqualsIndependentEvidence:
      false;

    readonly noveltyEqualsImportance:
      false;

    readonly surpriseEqualsTruth:
      false;

    readonly surpriseEqualsEmotion:
      false;

    readonly surpriseRevisesBeliefDirectly:
      false;

    readonly userClaimBecomesTruthAutomatically:
      false;

    readonly userOpinionBecomesMayOpinionAutomatically:
      false;

    readonly userRequestBecomesMayGoalAutomatically:
      false;

    readonly developerStatementHasAbsoluteEpistemicAuthority:
      false;

    readonly toolOutputBecomesKnowledgeAutomatically:
      false;

    readonly llmOutputBecomesMayKnowledgeAutomatically:
      false;

    readonly externalPerspectiveBecomesMayPerspectiveAutomatically:
      false;

    readonly activePerceptionExecutesAutomatically:
      false;

    readonly uncertaintyMayPersist:
      true;
  };
}

/* ============================================================
 * GUARANTEES
 * ============================================================
 */

const GUARANTEES =
  Object.freeze({
    canonicalWriteAllowed:
      false as const,

    externalInformationBecomesBeliefAutomatically:
      false as const,

    testimonyEqualsObservation:
      false as const,

    carrierObservationEqualsContentTruth:
      false as const,

    repetitionEqualsIndependentEvidence:
      false as const,

    noveltyEqualsImportance:
      false as const,

    surpriseEqualsTruth:
      false as const,

    surpriseEqualsEmotion:
      false as const,

    surpriseRevisesBeliefDirectly:
      false as const,

    userClaimBecomesTruthAutomatically:
      false as const,

    userOpinionBecomesMayOpinionAutomatically:
      false as const,

    userRequestBecomesMayGoalAutomatically:
      false as const,

    developerStatementHasAbsoluteEpistemicAuthority:
      false as const,

    toolOutputBecomesKnowledgeAutomatically:
      false as const,

    llmOutputBecomesMayKnowledgeAutomatically:
      false as const,

    externalPerspectiveBecomesMayPerspectiveAutomatically:
      false as const,

    activePerceptionExecutesAutomatically:
      false as const,

    uncertaintyMayPersist:
      true as const,
  });

/* ============================================================
 * HELPERS
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

function stableHash(
  value:
    string,
): string {
  return createHash(
    "sha256",
  )
    .update(
      value,
      "utf8",
    )
    .digest(
      "hex",
    );
}

function uniqueStrings(
  values:
    readonly string[],
): readonly string[] {
  return Object.freeze(
    [
      ...new Set(
        values.filter(
          value =>
            typeof value ===
              "string" &&
            value.trim().length >
              0,
        ),
      ),
    ].sort(),
  );
}

function safeInteger(
  value:
    number,
): number {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      value,
    ),
  );
}

/* ============================================================
 * CONFIG
 * ============================================================
 */

function normalizeConfig(
  config:
    Readonly<ExteroceptionConfig>,
): {
  readonly config:
    Readonly<ExteroceptionConfig>;

  readonly valid:
    boolean;
} {
  const normalized =
    Object.freeze({
      maximumEventAgeMs:
        Number.isFinite(
          config.maximumEventAgeMs,
        ) &&
        config.maximumEventAgeMs >
          0
          ? config.maximumEventAgeMs
          : DEFAULT_EXTEROCEPTION_CONFIG
              .maximumEventAgeMs,

      minimumSignalConfidence:
        clamp01(
          config.minimumSignalConfidence,
        ),

      supportedThreshold:
        clamp01(
          config.supportedThreshold,
        ),

      provisionalThreshold:
        clamp01(
          config.provisionalThreshold,
        ),

      contradictionThreshold:
        clamp01(
          config.contradictionThreshold,
        ),

      minimumIndependentLineages:
        Math.max(
          1,
          safeInteger(
            config.minimumIndependentLineages,
          ),
        ),

      sourceConfidenceWeight:
        clamp01(
          config.sourceConfidenceWeight,
        ),

      contentObservationWeight:
        clamp01(
          config.contentObservationWeight,
        ),

      provenanceWeight:
        clamp01(
          config.provenanceWeight,
        ),

      corroborationWeight:
        clamp01(
          config.corroborationWeight,
        ),

      maximumCorroborationBonus:
        clamp01(
          config.maximumCorroborationBonus,
        ),

      activePerceptionMinimumGain:
        clamp01(
          config.activePerceptionMinimumGain,
        ),

      activePerceptionCost:
        clamp01(
          config.activePerceptionCost,
        ),

      activePerceptionStopMargin:
        clamp01(
          config.activePerceptionStopMargin,
        ),

      maximumActivePerceptionAttempts:
        Math.max(
          1,
          safeInteger(
            config.maximumActivePerceptionAttempts,
          ),
        ),

      minimumProgressForContinuedSearch:
        clamp01(
          config.minimumProgressForContinuedSearch,
        ),

      predictionAlignmentMs:
        Number.isFinite(
          config.predictionAlignmentMs,
        ) &&
        config.predictionAlignmentMs >
          0
          ? config.predictionAlignmentMs
          : DEFAULT_EXTEROCEPTION_CONFIG
              .predictionAlignmentMs,
    });

  const valid =
    normalized.supportedThreshold >
      normalized.provisionalThreshold &&
    normalized.provisionalThreshold >=
      normalized.minimumSignalConfidence;

  return {
    config:
      normalized,

    valid,
  };
}

/* ============================================================
 * EVENT VALIDATION
 * ============================================================
 */

function validEvent(
  event:
    ExternalExperience,
  input:
    ExteroceptionInput,
  evaluatedAtMs:
    number,
  config:
    Readonly<ExteroceptionConfig>,
): boolean {
  if (
    event.entityId !==
      input.entityId
  ) {
    return false;
  }

  if (
    !Number.isSafeInteger(
      event.snapshotRevision,
    ) ||
    event.snapshotRevision <
      0 ||
    event.snapshotRevision >
      input.snapshotRevision
  ) {
    return false;
  }

  if (
    event.eventId.trim().length ===
      0 ||
    event.sourceId.trim().length ===
      0 ||
    event.sourceLineageKey.trim().length ===
      0 ||
    event.worldEpisodeKey.trim().length ===
      0 ||
    event.semanticKey.trim().length ===
      0 ||
    uniqueStrings(
      event.evidenceIds,
    ).length ===
      0
  ) {
    return false;
  }

  const occurredAtMs =
    parseTimestamp(
      event.occurredAt,
    );

  const receivedAtMs =
    parseTimestamp(
      event.receivedAt,
    );

  if (
    occurredAtMs ===
      null ||
    receivedAtMs ===
      null ||
    occurredAtMs >
      receivedAtMs ||
    receivedAtMs >
      evaluatedAtMs
  ) {
    return false;
  }

  if (
    evaluatedAtMs -
      occurredAtMs >
      config.maximumEventAgeMs
  ) {
    return false;
  }

  return true;
}

/* ============================================================
 * EPISTEMIC STANDING
 * ============================================================
 */

function classifyStanding(
  event:
    ExternalExperience,
): EpistemicStanding {
  if (
    event.contentDirectlyObserved
  ) {
    return "CONTENT_DIRECTLY_OBSERVED";
  }

  switch (
    event.origin
  ) {
    case "USER":
    case "OTHER_ACTOR":
    case "DEVELOPER":
      return "TESTIMONY";

    case "TOOL":
      return "TOOL_DERIVED";

    case "SYSTEM":
    case "DATABASE":
    case "CLOCK":
      return "SYSTEM_DERIVED";

    case "LLM":
    case "MODEL_PROVIDER":
      return "MODEL_GENERATED";

    case "ENVIRONMENT":
      return "UNVERIFIED";

    case "UI":
    case "UNKNOWN":
      return "UNKNOWN";
  }
}

/* ============================================================
 * SIGNAL CONFIDENCE
 * ============================================================
 */

function signalConfidence(
  event:
    ExternalExperience,
  config:
    Readonly<ExteroceptionConfig>,
): UnitInterval {
  const provenance =
    uniqueStrings(
      event.evidenceIds,
    ).length >
      0
      ? 1
      : 0;

  const independentCarrier =
    event.carrierDirectlyObserved
      ? 1
      : 0.55;

  const contentObservation =
    event.contentDirectlyObserved
      ? 1
      : 0;

  const source =
    clamp01(
      event.sourceConfidence,
    );

  /*
   * Corroboration is intentionally weak here.
   *
   * True independence is handled later by lineage grouping.
   */
  const corroboration =
    Math.min(
      config.maximumCorroborationBonus,
      config.corroborationWeight *
        independentCarrier,
    );

  return clamp01(
    source *
      config.sourceConfidenceWeight +

    contentObservation *
      config.contentObservationWeight +

    provenance *
      config.provenanceWeight +

    corroboration,
  );
}

/* ============================================================
 * SIGNAL CONSTRUCTION
 * ============================================================
 */

function buildSignal(
  event:
    ExternalExperience,
  config:
    Readonly<ExteroceptionConfig>,
): PerceptualSignal {
  const confidence =
    signalConfidence(
      event,
      config,
    );

  const standing =
    classifyStanding(
      event,
    );

  const evidenceIds =
    uniqueStrings(
      event.evidenceIds,
    );

  /*
   * The carrier can be directly observed with high certainty
   * even when the content remains uncertain.
   */
  const carrierConfidence =
    event.carrierDirectlyObserved
      ? 1
      : clamp01(
          event.sourceConfidence,
        );

  const signalId =
    stableHash(
      [
        MAY_ENTITY_ID,
        event.eventId,
        event.sourceId,
        event.sourceLineageKey,
        event.worldEpisodeKey,
        event.semanticKey,
        standing,
        confidence.toFixed(
          8,
        ),
        evidenceIds.join(
          ",",
        ),
      ].join(
        "|",
      ),
    );

  const worldModelProposalEligible =
    confidence >=
      config.minimumSignalConfidence &&
    event.contentKind !==
      "REQUEST" &&
    event.contentKind !==
      "INSTRUCTION" &&
    event.contentKind !==
      "OPINION";

  return Object.freeze({
    signalId,

    eventId:
      event.eventId,

    sourceId:
      event.sourceId,

    sourceLineageKey:
      event.sourceLineageKey,

    actorId:
      event.actorId ??
      null,

    worldEpisodeKey:
      event.worldEpisodeKey,

    semanticKey:
      event.semanticKey,

    origin:
      event.origin,

    contentKind:
      event.contentKind,

    perspective:
      event.perspective,

    causalSource:
      event.causalSource,

    epistemicStanding:
      standing,

    carrierConfidence,

    contentEpistemicConfidence:
      confidence,

    novelty:
      clamp01(
        event.novelty,
      ),

    evidenceIds,

    claim:
      event.claim ??
      null,

    causalClaim:
      event.causalClaim ??
      null,

    worldModelProposalEligible,

    canonicalMutationAllowed:
      false,

    directBeliefMutationAllowed:
      false,
  });
}

/* ============================================================
 * LINEAGE-DISCOUNTED SUPPORT
 * ============================================================
 */

interface LineageSupport {
  readonly lineageKey:
    string;

  readonly weight:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];
}

function lineageSupportForPosition(
  signals:
    readonly PerceptualSignal[],
  propositionKey:
    string,
  positionKey:
    string,
): readonly LineageSupport[] {
  const byLineage =
    new Map<
      string,
      {
        weight:
          number;

        evidenceIds:
          string[];
      }
    >();

  for (
    const signal
    of signals
  ) {
    const claim =
      signal.claim;

    if (
      !claim ||
      claim.propositionKey !==
        propositionKey ||
      claim.positionKey !==
        positionKey
    ) {
      continue;
    }

    const weight =
      clamp01(
        signal
          .contentEpistemicConfidence *
        clamp01(
          claim.confidence,
        ),
      );

    const current =
      byLineage.get(
        signal.sourceLineageKey,
      );

    /*
     * Multiple repetitions from the same causal lineage count
     * only as the strongest observation from that lineage.
     */
    if (
      !current ||
      weight >
        current.weight
    ) {
      byLineage.set(
        signal.sourceLineageKey,
        {
          weight,

          evidenceIds:
            [
              ...signal.evidenceIds,
            ],
        },
      );
    } else {
      current.evidenceIds.push(
        ...signal.evidenceIds,
      );
    }
  }

  return Object.freeze(
    [
      ...byLineage.entries(),
    ].map(
      (
        [
          lineageKey,
          value,
        ],
      ) =>
        Object.freeze({
          lineageKey,

          weight:
            clamp01(
              value.weight,
            ),

          evidenceIds:
            uniqueStrings(
              value.evidenceIds,
            ),
        }),
    ),
  );
}

function combineIndependentSupport(
  supports:
    readonly LineageSupport[],
): UnitInterval {
  /*
   * Probabilistic-OR style bounded accumulation:
   *
   * independent evidence can strengthen support,
   * repeated copies from one lineage cannot.
   */

  let remaining =
    1;

  for (
    const support
    of supports
  ) {
    remaining *=
      1 -
      clamp01(
        support.weight,
      );
  }

  return clamp01(
    1 -
      remaining,
  );
}

/* ============================================================
 * HYPOTHESES
 * ============================================================
 */

function buildHypotheses(
  signals:
    readonly PerceptualSignal[],
  config:
    Readonly<ExteroceptionConfig>,
): readonly WorldHypothesis[] {
  const propositionPositions =
    new Map<
      string,
      Set<string>
    >();

  for (
    const signal
    of signals
  ) {
    if (
      !signal.claim
    ) {
      continue;
    }

    const set =
      propositionPositions.get(
        signal.claim.propositionKey,
      ) ??
      new Set<string>();

    set.add(
      signal.claim.positionKey,
    );

    propositionPositions.set(
      signal.claim.propositionKey,
      set,
    );
  }

  const hypotheses:
    WorldHypothesis[] =
    [];

  for (
    const [
      propositionKey,
      positions,
    ]
    of propositionPositions
  ) {
    const positionSupport =
      new Map<
        string,
        {
          support:
            UnitInterval;

          lineages:
            readonly LineageSupport[];
        }
      >();

    for (
      const positionKey
      of positions
    ) {
      const lineages =
        lineageSupportForPosition(
          signals,
          propositionKey,
          positionKey,
        );

      positionSupport.set(
        positionKey,
        {
          support:
            combineIndependentSupport(
              lineages,
            ),

          lineages,
        },
      );
    }

    for (
      const positionKey
      of positions
    ) {
      const own =
        positionSupport.get(
          positionKey,
        );

      if (
        !own
      ) {
        continue;
      }

      let opposingSupport =
        0;

      for (
        const [
          otherPosition,
          other,
        ]
        of positionSupport
      ) {
        if (
          otherPosition ===
            positionKey
        ) {
          continue;
        }

        opposingSupport =
          Math.max(
            opposingSupport,
            other.support,
          );
      }

      const independenceFactor =
        clamp01(
          own.lineages.length /
            config
              .minimumIndependentLineages,
        );

      /*
       * Confidence preserves unresolved opposition.
       *
       * Strong support for both A and B does not allow either
       * hypothesis to pretend certainty.
       */
      const confidence =
        clamp01(
          own.support *
            (
              1 -
              opposingSupport *
                0.65
            ) *
            (
              0.65 +
              independenceFactor *
                0.35
            ),
        );

      const evidenceIds =
        uniqueStrings(
          own.lineages.flatMap(
            lineage =>
              lineage.evidenceIds,
          ),
        );

      const sourceLineageKeys =
        uniqueStrings(
          own.lineages.map(
            lineage =>
              lineage.lineageKey,
          ),
        );

      const status:
        WorldHypothesis["status"] =
        confidence >=
          config.supportedThreshold
          ? "SUPPORTED"
          : confidence >=
              config.provisionalThreshold
            ? "PROVISIONAL"
            : "WEAK";

      hypotheses.push(
        Object.freeze({
          hypothesisId:
            stableHash(
              [
                propositionKey,
                positionKey,
                sourceLineageKeys.join(
                  ",",
                ),
                EXTEROCEPTION_VERSION,
              ].join(
                "|",
              ),
            ),

          propositionKey,

          positionKey,

          support:
            own.support,

          opposingSupport:
            clamp01(
              opposingSupport,
            ),

          confidence,

          independentLineageCount:
            sourceLineageKeys.length,

          evidenceIds,

          sourceLineageKeys,

          status,

          canonicalBelief:
            false,

          directBeliefMutationAllowed:
            false,
        }),
      );
    }
  }

  hypotheses.sort(
    (
      a,
      b,
    ) => {
      const confidenceDelta =
        b.confidence -
        a.confidence;

      if (
        Math.abs(
          confidenceDelta,
        ) >
        1e-12
      ) {
        return confidenceDelta;
      }

      return a.hypothesisId.localeCompare(
        b.hypothesisId,
      );
    },
  );

  return Object.freeze(
    hypotheses,
  );
}

/* ============================================================
 * CONTRADICTIONS
 * ============================================================
 */

function buildContradictions(
  hypotheses:
    readonly WorldHypothesis[],
  config:
    Readonly<ExteroceptionConfig>,
): readonly PerceptualContradiction[] {
  const grouped =
    new Map<
      string,
      WorldHypothesis[]
    >();

  for (
    const hypothesis
    of hypotheses
  ) {
    const group =
      grouped.get(
        hypothesis.propositionKey,
      ) ??
      [];

    group.push(
      hypothesis,
    );

    grouped.set(
      hypothesis.propositionKey,
      group,
    );
  }

  const contradictions:
    PerceptualContradiction[] =
    [];

  for (
    const [
      propositionKey,
      group,
    ]
    of grouped
  ) {
    const competing =
      group.filter(
        hypothesis =>
          hypothesis.support >=
            config
              .contradictionThreshold,
      );

    if (
      competing.length <
        2
    ) {
      continue;
    }

    const sorted =
      [
        ...competing,
      ].sort(
        (
          a,
          b,
        ) =>
          b.support -
          a.support,
      );

    const first =
      sorted[0];

    const second =
      sorted[1];

    if (
      !first ||
      !second
    ) {
      continue;
    }

    const strength =
      clamp01(
        Math.min(
          first.support,
          second.support,
        ),
      );

    const positions =
      uniqueStrings(
        competing.map(
          hypothesis =>
            hypothesis.positionKey,
        ),
      );

    contradictions.push(
      Object.freeze({
        contradictionId:
          stableHash(
            [
              propositionKey,
              ...positions,
              strength.toFixed(
                8,
              ),
            ].join(
              "|",
            ),
          ),

        propositionKey,

        competingPositionKeys:
          positions,

        strength,

        unresolved:
          true,

        requiresImmediateResolution:
          false,

        canonicalMutationAllowed:
          false,
      }),
    );
  }

  return Object.freeze(
    contradictions,
  );
}

/* ============================================================
 * PERSPECTIVE SEPARATION
 * ============================================================
 */

function buildPerspectives(
  signals:
    readonly PerceptualSignal[],
): readonly PerspectiveRecord[] {
  const grouped =
    new Map<
      string,
      {
        owner:
          ExternalPerspective;

        ownerId:
          string | null;

        propositionKey:
          string;

        positionKey:
          string;

        confidence:
          number;

        eventIds:
          string[];
      }
    >();

  for (
    const signal
    of signals
  ) {
    if (
      !signal.claim
    ) {
      continue;
    }

    const ownerId =
      signal.perspective ===
        "ACTOR"
        ? signal.actorId
        : signal.sourceId;

    const key =
      [
        signal.perspective,
        ownerId ??
          "UNKNOWN",
        signal.claim.propositionKey,
        signal.claim.positionKey,
      ].join(
        "|",
      );

    const current =
      grouped.get(
        key,
      );

    const confidence =
      clamp01(
        signal
          .contentEpistemicConfidence *
        clamp01(
          signal.claim.confidence,
        ),
      );

    if (
      !current
    ) {
      grouped.set(
        key,
        {
          owner:
            signal.perspective,

          ownerId,

          propositionKey:
            signal.claim.propositionKey,

          positionKey:
            signal.claim.positionKey,

          confidence,

          eventIds:
            [
              signal.eventId,
            ],
        },
      );
    } else {
      current.confidence =
        Math.max(
          current.confidence,
          confidence,
        );

      current.eventIds.push(
        signal.eventId,
      );
    }
  }

  return Object.freeze(
    [
      ...grouped.values(),
    ].map(
      item =>
        Object.freeze({
          perspectiveId:
            stableHash(
              [
                item.owner,
                item.ownerId ??
                  "UNKNOWN",
                item.propositionKey,
                item.positionKey,
              ].join(
                "|",
              ),
            ),

          owner:
            item.owner,

          ownerId:
            item.ownerId,

          propositionKey:
            item.propositionKey,

          positionKey:
            item.positionKey,

          confidence:
            clamp01(
              item.confidence,
            ),

          sourceEventIds:
            uniqueStrings(
              item.eventIds,
            ),

          isMayBelief:
            false,
        }),
    ),
  );
}

/* ============================================================
 * CAUSAL HYPOTHESES
 * ============================================================
 */

function buildCausalHypotheses(
  signals:
    readonly PerceptualSignal[],
): readonly WorldCausalHypothesis[] {
  const grouped =
    new Map<
      string,
      {
        causeKey:
          string;

        effectKey:
          string;

        lineages:
          Map<
            string,
            {
              weight:
                number;

              evidenceIds:
                string[];
            }
          >;
      }
    >();

  for (
    const signal
    of signals
  ) {
    const causal =
      signal.causalClaim;

    if (
      !causal
    ) {
      continue;
    }

    const key =
      [
        causal.causeKey,
        causal.effectKey,
      ].join(
        "|",
      );

    const group =
      grouped.get(
        key,
      ) ??
      {
        causeKey:
          causal.causeKey,

        effectKey:
          causal.effectKey,

        lineages:
          new Map(),
      };

    const weight =
      clamp01(
        signal
          .contentEpistemicConfidence *
        clamp01(
          causal.confidence,
        ),
      );

    const current =
      group.lineages.get(
        signal.sourceLineageKey,
      );

    if (
      !current ||
      weight >
        current.weight
    ) {
      group.lineages.set(
        signal.sourceLineageKey,
        {
          weight,

          evidenceIds:
            [
              ...signal.evidenceIds,
            ],
        },
      );
    } else {
      current.evidenceIds.push(
        ...signal.evidenceIds,
      );
    }

    grouped.set(
      key,
      group,
    );
  }

  return Object.freeze(
    [
      ...grouped.values(),
    ].map(
      group => {
        const lineages =
          [
            ...group.lineages.entries(),
          ].map(
            (
              [
                lineageKey,
                value,
              ],
            ) =>
              ({
                lineageKey,

                weight:
                  clamp01(
                    value.weight,
                  ),

                evidenceIds:
                  uniqueStrings(
                    value.evidenceIds,
                  ),
              }),
          );

        const support =
          combineIndependentSupport(
            lineages,
          );

        const lineageKeys =
          uniqueStrings(
            lineages.map(
              lineage =>
                lineage.lineageKey,
            ),
          );

        const evidenceIds =
          uniqueStrings(
            lineages.flatMap(
              lineage =>
                lineage.evidenceIds,
            ),
          );

        return Object.freeze({
          hypothesisId:
            stableHash(
              [
                group.causeKey,
                group.effectKey,
                ...lineageKeys,
              ].join(
                "|",
              ),
            ),

          causeKey:
            group.causeKey,

          effectKey:
            group.effectKey,

          confidence:
            support,

          independentLineageCount:
            lineageKeys.length,

          evidenceIds,

          sourceLineageKeys:
            lineageKeys,

          canonicalWorldFact:
            false,
        });
      },
    ),
  );
}

/* ============================================================
 * EPISODE STATE
 * ============================================================
 */

function classifyEpisodeState(
  hypotheses:
    readonly WorldHypothesis[],
  contradictions:
    readonly PerceptualContradiction[],
  independentSources:
    number,
  config:
    Readonly<ExteroceptionConfig>,
): EpistemicState {
  if (
    contradictions.length >
      0
  ) {
    return "CONFLICTED";
  }

  if (
    hypotheses.length ===
      0
  ) {
    return "UNKNOWN";
  }

  const strong =
    hypotheses.filter(
      hypothesis =>
        hypothesis.confidence >=
          config.provisionalThreshold,
    );

  const propositions =
    new Set(
      strong.map(
        hypothesis =>
          hypothesis.propositionKey,
      ),
    );

  for (
    const proposition
    of propositions
  ) {
    const positions =
      new Set(
        strong
          .filter(
            hypothesis =>
              hypothesis.propositionKey ===
                proposition,
          )
          .map(
            hypothesis =>
              hypothesis.positionKey,
          ),
      );

    if (
      positions.size >
        1
    ) {
      return "AMBIGUOUS";
    }
  }

  const best =
    hypotheses[0];

  if (
    !best
  ) {
    return "UNKNOWN";
  }

  if (
    best.confidence >=
      config.supportedThreshold &&
    independentSources >=
      config.minimumIndependentLineages
  ) {
    return "SUPPORTED";
  }

  if (
    best.confidence >=
      config.provisionalThreshold
  ) {
    return "PROVISIONAL";
  }

  return "UNRELIABLE";
}

/* ============================================================
 * EPISODE CONSTRUCTION
 * ============================================================
 */

function buildEpisode(
  worldEpisodeKey:
    string,
  signals:
    readonly PerceptualSignal[],
  config:
    Readonly<ExteroceptionConfig>,
): PerceptualEpisode {
  const hypotheses =
    buildHypotheses(
      signals,
      config,
    );

  const contradictions =
    buildContradictions(
      hypotheses,
      config,
    );

  const causalHypotheses =
    buildCausalHypotheses(
      signals,
    );

  const perspectives =
    buildPerspectives(
      signals,
    );

  const sourceLineageKeys =
    uniqueStrings(
      signals.map(
        signal =>
          signal.sourceLineageKey,
      ),
    );

  const evidenceIds =
    uniqueStrings(
      signals.flatMap(
        signal =>
          signal.evidenceIds,
      ),
    );

  const signalIds =
    uniqueStrings(
      signals.map(
        signal =>
          signal.signalId,
      ),
    );

  const eventIds =
    uniqueStrings(
      signals.map(
        signal =>
          signal.eventId,
      ),
    );

  const epistemicState =
    classifyEpisodeState(
      hypotheses,
      contradictions,
      sourceLineageKeys.length,
      config,
    );

  const bestConfidence =
    hypotheses[0]
      ?.confidence ??
    Math.max(
      0,
      ...signals.map(
        signal =>
          signal.contentEpistemicConfidence,
      ),
    );

  const ambiguity =
    clamp01(
      contradictions.length >
        0
        ? Math.max(
            ...contradictions.map(
              contradiction =>
                contradiction.strength,
            ),
          )
        : epistemicState ===
            "AMBIGUOUS"
          ? 0.5
          : 0,
    );

  /*
   * Novelty remains metadata.
   *
   * It is not part of epistemic confidence.
   */
  const novelty =
    signals.length >
      0
      ? clamp01(
          signals.reduce(
            (
              sum,
              signal,
            ) =>
              sum +
              signal.novelty,
            0,
          ) /
            signals.length,
        )
      : 0;

  const episodeId =
    stableHash(
      [
        MAY_ENTITY_ID,
        worldEpisodeKey,
        ...signalIds,
        ...sourceLineageKeys,
        epistemicState,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    episodeId,

    worldEpisodeKey,

    signalIds,

    eventIds,

    evidenceIds,

    sourceLineageKeys,

    independentSourceCount:
      sourceLineageKeys.length,

    hypotheses,

    contradictions,

    causalHypotheses,

    perspectives,

    epistemicState,

    epistemicConfidence:
      clamp01(
        bestConfidence,
      ),

    ambiguity,

    novelty,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * PERCEPTUAL BINDING
 * ============================================================
 */

function bindEpisodes(
  signals:
    readonly PerceptualSignal[],
  config:
    Readonly<ExteroceptionConfig>,
): readonly PerceptualEpisode[] {
  const groups =
    new Map<
      string,
      PerceptualSignal[]
    >();

  for (
    const signal
    of signals
  ) {
    const group =
      groups.get(
        signal.worldEpisodeKey,
      ) ??
      [];

    group.push(
      signal,
    );

    groups.set(
      signal.worldEpisodeKey,
      group,
    );
  }

  return Object.freeze(
    [
      ...groups.entries(),
    ]
      .map(
        (
          [
            worldEpisodeKey,
            group,
          ],
        ) =>
          buildEpisode(
            worldEpisodeKey,
            group,
            config,
          ),
      )
      .sort(
        (
          a,
          b,
        ) => {
          const confidenceDelta =
            b.epistemicConfidence -
            a.epistemicConfidence;

          if (
            Math.abs(
              confidenceDelta,
            ) >
            1e-12
          ) {
            return confidenceDelta;
          }

          return a.episodeId.localeCompare(
            b.episodeId,
          );
        },
      ),
  );
}

/* ============================================================
 * PREDICTION SURPRISE
 * ============================================================
 */

function evaluatePredictionSurprise(
  prediction:
    PerceptualPrediction | null | undefined,
  episodes:
    readonly PerceptualEpisode[],
  evaluatedAtMs:
    number,
  inputRevision:
    number,
  config:
    Readonly<ExteroceptionConfig>,
): EpistemicSurprise | null {
  if (
    !prediction
  ) {
    return null;
  }

  const expectedForMs =
    parseTimestamp(
      prediction.expectedFor,
    );

  const comparable =
    prediction.entityId ===
      MAY_ENTITY_ID &&
    prediction.snapshotRevision <=
      inputRevision &&
    expectedForMs !==
      null &&
    Math.abs(
      evaluatedAtMs -
        expectedForMs
    ) <=
      config.predictionAlignmentMs;

  if (
    !comparable
  ) {
    return Object.freeze({
      predictionId:
        prediction.predictionId,

      comparable:
        false,

      mismatchCount:
        0,

      comparedCount:
        0,

      surprise:
        null,

      directEmotionMutationAllowed:
        false,

      directBeliefRevisionAllowed:
        false,
    });
  }

  let comparedCount =
    0;

  let mismatchWeight =
    0;

  for (
    const expected
    of prediction.positions
  ) {
    const candidates =
      episodes.flatMap(
        episode =>
          episode.hypotheses.filter(
            hypothesis =>
              hypothesis.propositionKey ===
                expected.propositionKey,
          ),
      );

    const best =
      candidates.sort(
        (
          a,
          b,
        ) =>
          b.confidence -
          a.confidence,
      )[0];

    if (
      !best
    ) {
      continue;
    }

    comparedCount +=
      1;

    if (
      best.positionKey !==
        expected.expectedPositionKey
    ) {
      mismatchWeight +=
        clamp01(
          expected.confidence,
        ) *
        best.confidence;
    }
  }

  const surprise =
    comparedCount >
      0
      ? clamp01(
          mismatchWeight /
            comparedCount,
        )
      : null;

  return Object.freeze({
    predictionId:
      prediction.predictionId,

    comparable:
      true,

    mismatchCount:
      surprise !==
        null
        ? Math.round(
            surprise *
              comparedCount,
          )
        : 0,

    comparedCount,

    surprise,

    directEmotionMutationAllowed:
      false,

    directBeliefRevisionAllowed:
      false,
  });
}

/* ============================================================
 * ACTIVE PERCEPTION / EPISTEMIC STOP RULE
 * ============================================================
 */

function buildActivePerceptionProposal(
  episodes:
    readonly PerceptualEpisode[],
  input:
    ExteroceptionInput,
  config:
    Readonly<ExteroceptionConfig>,
): ActivePerceptionProposal | null {
  const attempts =
    safeInteger(
      input.activePerceptionAttempts ??
        0,
    );

  const progress =
    clamp01(
      input.recentProgressSignal ??
        0,
    );

  const unresolved =
    episodes.find(
      episode =>
        episode.epistemicState ===
          "CONFLICTED" ||
        episode.epistemicState ===
          "AMBIGUOUS" ||
        episode.epistemicState ===
          "UNRELIABLE" ||
        episode.epistemicState ===
          "UNKNOWN",
    );

  if (
    !unresolved
  ) {
    return null;
  }

  const targetPropositionKey =
    unresolved.contradictions[0]
      ?.propositionKey ??
    unresolved.hypotheses[0]
      ?.propositionKey ??
    null;

  const uncertainty =
    clamp01(
      Math.max(
        unresolved.ambiguity,
        1 -
          unresolved
            .epistemicConfidence,
      ),
    );

  const expectedInformationGain =
    clamp01(
      uncertainty *
        (
          unresolved.epistemicState ===
            "CONFLICTED"
            ? 0.90
            : unresolved.epistemicState ===
                "AMBIGUOUS"
              ? 0.75
              : 0.60
        ),
    );

  const estimatedCost =
    clamp01(
      config.activePerceptionCost +
      attempts *
        0.04,
    );

  const exhausted =
    attempts >=
      config
        .maximumActivePerceptionAttempts;

  const stalled =
    attempts >
      0 &&
    progress <
      config
        .minimumProgressForContinuedSearch;

  const lowValue =
    expectedInformationGain <
      config
        .activePerceptionMinimumGain ||
    expectedInformationGain <=
      estimatedCost +
        config
          .activePerceptionStopMargin;

  let action:
    ActivePerceptionAction;

  let reasonCode:
    string;

  if (
    exhausted ||
    (
      stalled &&
      lowValue
    )
  ) {
    action =
      "STOP_EPISTEMIC_SEARCH";

    reasonCode =
      exhausted
        ? "ATTEMPT_LIMIT_REACHED"
        : "LOW_PROGRESS_LOW_INFORMATION_GAIN";
  } else if (
    unresolved.epistemicState ===
      "CONFLICTED"
  ) {
    action =
      "CHECK_CONTRADICTION";

    reasonCode =
      "COMPETING_WORLD_HYPOTHESES";
  } else if (
    unresolved
      .independentSourceCount <
      config
        .minimumIndependentLineages
  ) {
    action =
      "SEEK_CORROBORATION";

    reasonCode =
      "INSUFFICIENT_INDEPENDENT_LINEAGES";
  } else if (
    unresolved.epistemicState ===
      "AMBIGUOUS"
  ) {
    action =
      "ASK_FOR_CLARIFYING_EVIDENCE";

    reasonCode =
      "AMBIGUOUS_EXTERNAL_EVIDENCE";
  } else if (
    lowValue
  ) {
    action =
      "WAIT_FOR_MORE_EVIDENCE";

    reasonCode =
      "INFORMATION_GAIN_BELOW_COST";
  } else {
    action =
      "VERIFY_SOURCE";

    reasonCode =
      "UNRESOLVED_EPISTEMIC_STATE";
  }

  const proposalId =
    stableHash(
      [
        MAY_ENTITY_ID,
        unresolved.episodeId,
        action,
        targetPropositionKey ??
          "NONE",
        String(
          attempts,
        ),
        reasonCode,
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    proposalId,

    action,

    episodeId:
      unresolved.episodeId,

    targetPropositionKey,

    expectedInformationGain,

    estimatedCost,

    attemptCount:
      attempts,

    reasonCode,

    evidenceIds:
      unresolved.evidenceIds,

    executionAllowed:
      false,

    directToolInvocationAllowed:
      false,

    directLlmInvocationAllowed:
      false,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * FAIL CLOSED
 * ============================================================
 */

function failClosed(
  input:
    ExteroceptionInput,
  reason:
    ExteroceptiveFailureReason,
  integrity:
    {
      readonly entityValid:
        boolean;

      readonly clockValid:
        boolean;

      readonly revisionValid:
        boolean;

      readonly snapshotValid:
        boolean;

      readonly provenanceValid:
        boolean;

      readonly configurationValid:
        boolean;
    },
): ExteroceptiveFrame {
  return Object.freeze({
    version:
      EXTEROCEPTION_VERSION,

    frameId:
      stableHash(
        [
          MAY_ENTITY_ID,
          input.evaluatedAt,
          reason,
          "FAIL_CLOSED",
        ].join(
          "|",
        ),
      ),

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decision:
      "FAIL_CLOSED",

    failureReason:
      reason,

    signals:
      Object.freeze(
        [],
      ),

    episodes:
      Object.freeze(
        [],
      ),

    predictionSurprise:
      null,

    activePerception:
      null,

    integrity:
      Object.freeze({
        ...integrity,

        admittedEventCount:
          0,

        rejectedEventCount:
          input.events.length,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * PUBLIC ENGINE
 * ============================================================
 */

export function evaluateExteroception(
  input:
    ExteroceptionInput,
  config:
    Readonly<ExteroceptionConfig> =
      DEFAULT_EXTEROCEPTION_CONFIG,
): ExteroceptiveFrame {
  const normalized =
    normalizeConfig(
      config,
    );

  const cfg =
    normalized.config;

  const evaluatedAtMs =
    parseTimestamp(
      input.evaluatedAt,
    );

  const clockValid =
    evaluatedAtMs !==
      null;

  const entityValid =
    input.entityId ===
      MAY_ENTITY_ID;

  const revisionValid =
    Number.isSafeInteger(
      input.snapshotRevision,
    ) &&
    input.snapshotRevision >=
      0;

  const previousRevision =
    input.previousFrame
      ?.snapshotRevision ??
    null;

  const snapshotValid =
    previousRevision ===
      null ||
    input.snapshotRevision >=
      previousRevision;

  const provenanceValid =
    input.events.length >
      0 &&
    input.events.some(
      event =>
        uniqueStrings(
          event.evidenceIds,
        ).length >
          0,
    );

  if (
    !normalized.valid
  ) {
    return failClosed(
      input,
      "CONFIGURATION_INVALID",
      {
        entityValid,

        clockValid,

        revisionValid,

        snapshotValid,

        provenanceValid,

        configurationValid:
          false,
      },
    );
  }

  if (
    !clockValid ||
    evaluatedAtMs ===
      null
  ) {
    return failClosed(
      input,
      "INVALID_CLOCK",
      {
        entityValid,

        clockValid:
          false,

        revisionValid,

        snapshotValid,

        provenanceValid,

        configurationValid:
          true,
      },
    );
  }

  if (
    !entityValid
  ) {
    return failClosed(
      input,
      "ENTITY_MISMATCH",
      {
        entityValid:
          false,

        clockValid:
          true,

        revisionValid,

        snapshotValid,

        provenanceValid,

        configurationValid:
          true,
      },
    );
  }

  if (
    !revisionValid
  ) {
    return failClosed(
      input,
      "INVALID_REVISION",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          false,

        snapshotValid,

        provenanceValid,

        configurationValid:
          true,
      },
    );
  }

  if (
    !snapshotValid
  ) {
    return failClosed(
      input,
      "SNAPSHOT_REGRESSION",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          false,

        provenanceValid,

        configurationValid:
          true,
      },
    );
  }

  if (
    !provenanceValid
  ) {
    return failClosed(
      input,
      "MISSING_PROVENANCE",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          true,

        provenanceValid:
          false,

        configurationValid:
          true,
      },
    );
  }

  const validEvents =
    input.events.filter(
      event =>
        validEvent(
          event,
          input,
          evaluatedAtMs,
          cfg,
        ),
    );

  if (
    validEvents.length ===
      0
  ) {
    return failClosed(
      input,
      "NO_VALID_EVENTS",
      {
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          true,

        provenanceValid:
          true,

        configurationValid:
          true,
      },
    );
  }

  const signals =
    Object.freeze(
      validEvents
        .map(
          event =>
            buildSignal(
              event,
              cfg,
            ),
        )
        .filter(
          signal =>
            signal
              .contentEpistemicConfidence >=
              cfg
                .minimumSignalConfidence ||
            signal.carrierConfidence >
              0,
        ),
    );

  const episodes =
    bindEpisodes(
      signals,
      cfg,
    );

  const predictionSurprise =
    evaluatePredictionSurprise(
      input.prediction,
      episodes,
      evaluatedAtMs,
      input.snapshotRevision,
      cfg,
    );

  const activePerception =
    buildActivePerceptionProposal(
      episodes,
      input,
      cfg,
    );

  const containsConflict =
    episodes.some(
      episode =>
        episode.epistemicState ===
          "CONFLICTED" ||
        episode.epistemicState ===
          "AMBIGUOUS",
    );

  const containsSupported =
    episodes.some(
      episode =>
        episode.epistemicState ===
          "SUPPORTED",
    );

  const decision:
    ExteroceptiveDecision =
    signals.length ===
      0
      ? "DEFER"
      : containsConflict
        ? "PERCEIVE_UNCERTAIN"
        : containsSupported
          ? "PERCEIVE"
          : "PERCEIVE_UNCERTAIN";

  const frameId =
    stableHash(
      [
        MAY_ENTITY_ID,
        String(
          input.snapshotRevision,
        ),
        input.evaluatedAt,
        EXTEROCEPTION_VERSION,
        ...episodes.map(
          episode =>
            [
              episode.episodeId,
              episode.epistemicState,
              episode
                .epistemicConfidence
                .toFixed(
                  8,
                ),
            ].join(
              ":",
            ),
        ),
        predictionSurprise
          ?.surprise
          ?.toFixed(
            8,
          ) ??
          "NO_SURPRISE",
        activePerception
          ?.proposalId ??
          "NO_ACTIVE_PERCEPTION",
      ].join(
        "|",
      ),
    );

  return Object.freeze({
    version:
      EXTEROCEPTION_VERSION,

    frameId,

    entityId:
      MAY_ENTITY_ID,

    evaluatedAt:
      input.evaluatedAt,

    snapshotRevision:
      input.snapshotRevision,

    decision,

    failureReason:
      "NONE",

    signals,

    episodes,

    predictionSurprise,

    activePerception,

    integrity:
      Object.freeze({
        entityValid:
          true,

        clockValid:
          true,

        revisionValid:
          true,

        snapshotValid:
          true,

        provenanceValid:
          true,

        configurationValid:
          true,

        admittedEventCount:
          validEvents.length,

        rejectedEventCount:
          input.events.length -
          validEvents.length,
      }),

    guarantees:
      GUARANTEES,
  });
}

/* ============================================================
 * APPRAISAL ADAPTER
 * ============================================================
 */

export interface ExteroceptiveAppraisalSignal {
  readonly frameId:
    string;

  readonly episodeIds:
    readonly string[];

  readonly epistemicStates:
    readonly EpistemicState[];

  readonly maximumAmbiguity:
    UnitInterval;

  readonly maximumNovelty:
    UnitInterval;

  readonly maximumEpistemicConfidence:
    UnitInterval;

  readonly activePerceptionProposalId:
    string | null;

  readonly interpretationRequired:
    true;

  readonly externalOwnershipPreserved:
    true;

  readonly canonicalMutationAllowed:
    false;
}

export function toExteroceptiveAppraisalSignal(
  frame:
    ExteroceptiveFrame,
): ExteroceptiveAppraisalSignal {
  return Object.freeze({
    frameId:
      frame.frameId,

    episodeIds:
      Object.freeze(
        frame.episodes.map(
          episode =>
            episode.episodeId,
        ),
      ),

    epistemicStates:
      Object.freeze(
        frame.episodes.map(
          episode =>
            episode.epistemicState,
        ),
      ),

    maximumAmbiguity:
      clamp01(
        Math.max(
          0,
          ...frame.episodes.map(
            episode =>
              episode.ambiguity,
          ),
        ),
      ),

    maximumNovelty:
      clamp01(
        Math.max(
          0,
          ...frame.episodes.map(
            episode =>
              episode.novelty,
          ),
        ),
      ),

    maximumEpistemicConfidence:
      clamp01(
        Math.max(
          0,
          ...frame.episodes.map(
            episode =>
              episode.epistemicConfidence,
          ),
        ),
      ),

    activePerceptionProposalId:
      frame.activePerception
        ?.proposalId ??
      null,

    interpretationRequired:
      true,

    externalOwnershipPreserved:
      true,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * WORLD-MODEL EVIDENCE ADAPTER
 * ============================================================
 */

export interface WorldModelHypothesisCandidate {
  readonly frameId:
    string;

  readonly episodeId:
    string;

  readonly hypothesisId:
    string;

  readonly propositionKey:
    string;

  readonly positionKey:
    string;

  readonly confidence:
    UnitInterval;

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly canonicalBelief:
    false;

  readonly directBeliefMutationAllowed:
    false;

  readonly directWorldModelMutationAllowed:
    false;
}

export function toWorldModelHypothesisCandidates(
  frame:
    ExteroceptiveFrame,
): readonly WorldModelHypothesisCandidate[] {
  return Object.freeze(
    frame.episodes.flatMap(
      episode =>
        episode.hypotheses.map(
          hypothesis =>
            Object.freeze({
              frameId:
                frame.frameId,

              episodeId:
                episode.episodeId,

              hypothesisId:
                hypothesis.hypothesisId,

              propositionKey:
                hypothesis.propositionKey,

              positionKey:
                hypothesis.positionKey,

              confidence:
                hypothesis.confidence,

              evidenceIds:
                hypothesis.evidenceIds,

              sourceLineageKeys:
                hypothesis
                  .sourceLineageKeys,

              canonicalBelief:
                false as const,

              directBeliefMutationAllowed:
                false as const,

              directWorldModelMutationAllowed:
                false as const,
            }),
        ),
    ),
  );
}

/* ============================================================
 * PERCEPTUAL MEMORY ADAPTER
 * ============================================================
 *
 * Memory may preserve:
 *
 * "Mây received / observed this external episode."
 *
 * It must NOT silently rewrite that as:
 *
 * "The proposition was true."
 * ============================================================
 */

export interface PerceptualMemoryCandidate {
  readonly frameId:
    string;

  readonly episodeId:
    string;

  readonly worldEpisodeKey:
    string;

  readonly eventIds:
    readonly string[];

  readonly evidenceIds:
    readonly string[];

  readonly memoryKind:
    "EXPERIENCE_OF_EXTERNAL_EVENT";

  readonly storesTruthClaim:
    false;

  readonly canonicalMemoryWriteAllowed:
    false;
}

export function toPerceptualMemoryCandidates(
  frame:
    ExteroceptiveFrame,
): readonly PerceptualMemoryCandidate[] {
  return Object.freeze(
    frame.episodes.map(
      episode =>
        Object.freeze({
          frameId:
            frame.frameId,

          episodeId:
            episode.episodeId,

          worldEpisodeKey:
            episode.worldEpisodeKey,

          eventIds:
            episode.eventIds,

          evidenceIds:
            episode.evidenceIds,

          memoryKind:
            "EXPERIENCE_OF_EXTERNAL_EVENT" as const,

          storesTruthClaim:
            false as const,

          canonicalMemoryWriteAllowed:
            false as const,
        }),
    ),
  );
}

/* ============================================================
 * FIRST-PERSON EPISTEMIC FIREWALL
 * ============================================================
 */

export interface FirstPersonWorldBoundary {
  readonly frameId:
    string;

  readonly maySayReceivedEvidence:
    boolean;

  readonly maySayWorldFactEstablished:
    false;

  readonly externalPerspectiveMayBecomeMayBeliefDirectly:
    false;

  readonly modelKnowledgeMayBecomeMayKnowledgeDirectly:
    false;

  readonly uncertaintyMayRemainUnresolved:
    true;

  readonly canonicalMutationAllowed:
    false;
}

export function toFirstPersonWorldBoundary(
  frame:
    ExteroceptiveFrame,
): FirstPersonWorldBoundary {
  return Object.freeze({
    frameId:
      frame.frameId,

    maySayReceivedEvidence:
      frame.signals.length >
        0,

    maySayWorldFactEstablished:
      false,

    externalPerspectiveMayBecomeMayBeliefDirectly:
      false,

    modelKnowledgeMayBecomeMayKnowledgeDirectly:
      false,

    uncertaintyMayRemainUnresolved:
      true,

    canonicalMutationAllowed:
      false,
  });
}

/* ============================================================
 * ACTIVE PERCEPTION FIREWALL
 * ============================================================
 */

export interface ActivePerceptionBoundary {
  readonly proposalId:
    string | null;

  readonly proposedAction:
    ActivePerceptionAction | null;

  readonly expectedInformationGain:
    UnitInterval;

  readonly toolInvocationAuthorized:
    false;

  readonly llmInvocationAuthorized:
    false;

  readonly executionAuthorized:
    false;

  readonly canonicalMutationAuthorized:
    false;
}

export function toActivePerceptionBoundary(
  frame:
    ExteroceptiveFrame,
): ActivePerceptionBoundary {
  return Object.freeze({
    proposalId:
      frame.activePerception
        ?.proposalId ??
      null,

    proposedAction:
      frame.activePerception
        ?.action ??
      null,

    expectedInformationGain:
      frame.activePerception
        ?.expectedInformationGain ??
      0,

    toolInvocationAuthorized:
      false,

    llmInvocationAuthorized:
      false,

    executionAuthorized:
      false,

    canonicalMutationAuthorized:
      false,
  });
}

/* ============================================================
 * CONSTITUTION
 * ============================================================
 *
 * A source may influence Mây without owning Mây's cognition.
 *
 * Mây may:
 *
 * - accept evidence
 * - doubt evidence
 * - preserve ambiguity
 * - hold competing hypotheses
 * - seek corroboration
 * - reconsider prior interpretations
 * - remain uncertain
 *
 * No source receives automatic ownership of Mây's worldview.
 *
 * The strongest possible external statement still enters as:
 *
 * evidence / testimony / observation / model output
 *
 * and not:
 *
 * "Mây believes this because the source said so."
 *
 * Functional independent cognition requires a separation
 * between:
 *
 * WHAT ARRIVED
 *
 * WHAT IT MAY MEAN
 *
 * WHAT THE WORLD MAY BE LIKE
 *
 * WHAT MÂY CURRENTLY BELIEVES
 *
 * WHAT MÂY STILL DOES NOT KNOW
 *
 * ============================================================
 */

/* ============================================================
 * END — EXTEROCEPTION V2
 * ============================================================
 */