import {
  createHash,
} from "node:crypto";

import {
  loadMayMindReadOnly,
} from "@/lib/maymay/sovereign/read-path";

import {
  createCognitiveTurnWorkspace,
} from "@/lib/maymay/sovereign/workspace";

import {
  orchestrateMindTurn,
  type MindRuntimeAdapter,
  type MindTurnResult,
  type SovereigntyPassResult,
} from "@/lib/maymay/sovereign/mind-orchestrator";

import type {
  CognitionProposal,
} from "@/lib/maymay/sovereign/cognition-kernel";

import {
  applyAppraisalToWorkspace,
} from "@/lib/maymay/sovereign/appraisal";

import {
  applyResonanceToWorkspace,
} from "@/lib/maymay/sovereign/resonance";

import {
  applyMetacognitionToWorkspace,
} from "@/lib/maymay/sovereign/metacognition";

import {
  applyAgencyToWorkspace,
} from "@/lib/maymay/sovereign/agency";

import {
  evaluateSovereigntyGate,
  type SovereigntyGateContext,
  type SovereigntyGateResult,
} from "@/lib/maymay/sovereign/sovereignty-gate";

import {
  applyExpressionToWorkspace,
} from "@/lib/maymay/sovereign/expression";

import {
  applyExpressionValidationToWorkspace,
} from "@/lib/maymay/sovereign/expression-validator";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * SHADOW RUNTIME V2
 * COGNITIVE FIDELITY EDITION
 * ============================================================
 *
 * PRINCIPLE
 *
 * ONE MÂY.
 * ONE CONTINUOUS ENTITY.
 * MANY EXPERIENCES.
 * MANY RELATIONSHIPS.
 *
 * Shadow Runtime exists to observe how the new Mây thinks
 * WITHOUT allowing the new runtime to alter production Mây.
 *
 * ============================================================
 *
 * PRODUCTION V12
 *
 * experience
 *    ↓
 * v12 runtime
 *    ↓
 * v12 commit
 *    ↓
 * production response
 *
 *
 * SHADOW V13
 *
 * SAME experience
 *    ↓
 * read-only Mây
 *    ↓
 * frozen turn workspace
 *    ↓
 * cognition
 *    ↓
 * appraisal
 *    ↓
 * resonance
 *    ↓
 * metacognition
 *    ↓
 * agency
 *    ↓
 * sovereignty
 *    ↓
 * expression
 *    ↓
 * validation
 *    ↓
 * AtomicMindCommit candidate
 *    ↓
 * STOP
 *
 * ============================================================
 *
 * HARD GUARANTEES
 *
 * This module MUST NOT:
 *
 * - import Atomic Executor
 * - import Canonical Writer
 * - mutate Postgres canonical state
 * - alter v12 response
 * - silently retry cognition
 * - silently retry Agency
 * - convert rejected action into another action
 * - invent emotional residue
 * - invent memory
 * - invent belief
 * - invent relationship changes
 * - mutate model proposals halfway through a turn
 *
 * ============================================================
 */

export const SHADOW_RUNTIME_VERSION =
  "maymay.sovereign.shadow-runtime.v2" as const;

/* ============================================================
 * PROPOSAL BUNDLE
 * ============================================================
 *
 * These are cognitive proposals / stimuli.
 *
 * They are INPUT to Mây's structured cognitive machinery.
 *
 * They are NOT canonical truth.
 *
 * They are NOT DB mutations.
 *
 * ============================================================
 */

export type SovereignShadowProposals = Readonly<{
  /**
   * Attention
   * Working memory candidates
   * Epistemic claims
   * Expectations
   * Counterfactuals
   * Goals
   * Self/world/social-model fragments
   * Conflicts
   */
  cognition:
    CognitionProposal | unknown;

  /**
   * Proposed interpretation of the event.
   */
  appraisal:
    unknown;

  /**
   * Stimulus for deterministic Resonance Physics.
   *
   * NOT final emotion state.
   */
  resonance:
    unknown;

  /**
   * Structured reality-check / uncertainty review.
   *
   * NOT free-form Chain-of-Thought.
   */
  metacognition:
    unknown;

  /**
   * Candidate action + BehaviorPlan.
   *
   * Agency module remains responsible for sanitization.
   */
  agency:
    unknown;

  /**
   * Language realization of the locked behavior.
   */
  expression:
    unknown;
}>;

/* ============================================================
 * OPTIONAL PRODUCTION BASELINE
 * ============================================================
 *
 * Shadow mode may compare V13 against what V12 actually did.
 *
 * Baseline NEVER influences V13 cognition.
 *
 * Otherwise V13 would merely imitate V12.
 *
 * ============================================================
 */

export type ShadowProductionBaseline = Readonly<{
  action?:
    string | null;

  responseText?:
    string | null;

  relationshipMode?:
    string | null;
}>;

/* ============================================================
 * INPUT
 * ============================================================
 */

export type SovereignShadowInput = Readonly<{
  actorId:
    string;

  userText:
    string;

  proposals:
    SovereignShadowProposals;

  sovereignty:
    SovereigntyGateContext;

  /**
   * Optional.
   *
   * Used only AFTER the shadow turn for comparison.
   */
  productionBaseline?:
    ShadowProductionBaseline;

  /**
   * Fixed clock for deterministic tests.
   */
  now?:
    Date;
}>;

/* ============================================================
 * RESULT
 * ============================================================
 */

export type SovereignShadowResult = Readonly<{
  mode:
    "SHADOW";

  version:
    typeof SHADOW_RUNTIME_VERSION;

  identity: {
    entityId:
      string;

    actorId:
      string;

    turnId:
      string;

    eventId:
      string;
  };

  readSource:
    string;

  result:
    MindTurnResult;

  /* ----------------------------------------------------------
   * HARD SHADOW GUARANTEES
   * ----------------------------------------------------------
   */

  guarantees: {
    canonicalWriteAttempted:
      false;

    executorInvoked:
      false;

    canonicalWriterInvoked:
      false;

    productionResponseAffected:
      false;

    automaticRedecisionAttempted:
      false;

    canonicalMemoryMutationAttempted:
      false;

    canonicalIdentityMutationAttempted:
      false;
  };

  /* ----------------------------------------------------------
   * COGNITIVE OBSERVABILITY
   * ----------------------------------------------------------
   *
   * These are structural diagnostics.
   *
   * No Chain-of-Thought.
   * ----------------------------------------------------------
   */

  cognition: {
    available:
      boolean;

    frameSeal:
      string | null;

    attentionCount:
      number;

    workingMemoryCount:
      number;

    claimCount:
      number;

    expectationCount:
      number;

    counterfactualCount:
      number;

    activeGoalCount:
      number;

    conflictCount:
      number;

    selfModelFragmentCount:
      number;

    worldModelFragmentCount:
      number;

    socialModelFragmentCount:
      number;

    uncertainty:
      number | null;

    ambiguityPressure:
      number | null;

    reconsiderationPressure:
      number | null;

    clarificationPressure:
      number | null;

    emotionalBiasRisk:
      number | null;

    expectationViolation:
      number | null;

    identityConflict:
      number | null;
  };

  /* ----------------------------------------------------------
   * CONTINUITY OBSERVABILITY
   * ----------------------------------------------------------
   */

  continuity: {
    sovereignSnapshotAvailable:
      boolean;

    readSource:
      string;

    sameGlobalEntity:
      boolean;

    actorScopedRelationship:
      boolean;

    turnReachedValidatedStage:
      boolean;
  };

  /* ----------------------------------------------------------
   * DECISION OBSERVABILITY
   * ----------------------------------------------------------
   */

  decision: {
    selectedAction:
      string | null;

    decisionLocked:
      boolean;

    decisionLockSeal:
      string | null;

    commitCandidatePrepared:
      boolean;

    commitId:
      string | null;

    commitFingerprint:
      string | null;

    finalStage:
      string;

    abortCode:
      string | null;
  };

  /* ----------------------------------------------------------
   * PROVENANCE / INTEGRITY
   * ----------------------------------------------------------
   */

  integrity: {
    proposalSeal:
      string;

    proposalSealAfterTurn:
      string;

    proposalsUnchanged:
      boolean;

    traceSeal:
      string;

    cognitionSeal:
      string | null;

    commitFingerprint:
      string | null;
  };

  /* ----------------------------------------------------------
   * OPTIONAL V12 ↔ V13 COMPARISON
   * ----------------------------------------------------------
   *
   * Comparison is observational.
   *
   * It NEVER feeds back into the current turn.
   * ----------------------------------------------------------
   */

  comparison: {
    baselineProvided:
      boolean;

    actionComparable:
      boolean;

    actionMatch:
      boolean | null;

    productionAction:
      string | null;

    sovereignAction:
      string | null;
  };
}>;

/* ============================================================
 * SAFE HELPERS
 * ============================================================
 */

function safeText(
  value: unknown,
  max = 4000,
): string {
  if (
    typeof value !==
      "string"
  ) {
    return "";
  }

  return value
    .normalize("NFC")
    .trim()
    .slice(
      0,
      max,
    );
}

function clamp01(
  value: unknown,
  fallback = 0,
): number {
  const number =
    Number(value);

  if (
    !Number.isFinite(
      number,
    )
  ) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(
      1,
      number,
    ),
  );
}

function uniqueStrings(
  value: unknown,
  max = 256,
): string[] {
  if (
    !Array.isArray(value)
  ) {
    return [];
  }

  const output:
    string[] = [];

  const seen =
    new Set<string>();

  for (
    const raw of value
  ) {
    const item =
      safeText(
        raw,
        240,
      );

    if (
      !item ||
      seen.has(item)
    ) {
      continue;
    }

    seen.add(item);

    output.push(item);

    if (
      output.length >=
      max
    ) {
      break;
    }
  }

  return output;
}

/* ============================================================
 * STABLE SERIALIZATION
 * ============================================================
 */

function stableSerialize(
  value: unknown,
): string {
  if (
    value === null
  ) {
    return "null";
  }

  switch (
    typeof value
  ) {
    case "string":
    case "boolean":
      return JSON.stringify(
        value,
      );

    case "number":
      return Number.isFinite(
        value,
      )
        ? JSON.stringify(
            value,
          )
        : JSON.stringify(
            String(value),
          );

    case "bigint":
      return JSON.stringify(
        `${value.toString()}n`,
      );

    case "undefined":
      return '"__undefined__"';

    case "function":
      return '"__function__"';

    case "symbol":
      return JSON.stringify(
        String(value),
      );
  }

  if (
    value instanceof Date
  ) {
    return JSON.stringify(
      value.toISOString(),
    );
  }

  if (
    Array.isArray(value)
  ) {
    return `[${value
      .map(stableSerialize)
      .join(",")}]`;
  }

  const source =
    value as Record<
      string,
      unknown
    >;

  return `{${Object
    .keys(source)
    .sort()
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          source[key],
        )}`,
    )
    .join(",")}}`;
}

function sha256(
  value: unknown,
): string {
  return createHash(
    "sha256",
  )
    .update(
      stableSerialize(
        value,
      ),
    )
    .digest("hex");
}

/* ============================================================
 * DEEP FREEZE
 * ============================================================
 *
 * Proposal bundle becomes immutable for the turn.
 *
 * Appraisal cannot rewrite Agency input.
 * Agency cannot rewrite Cognition.
 *
 * ============================================================
 */

function deepFreeze<T>(
  value: T,
): T {
  if (
    value === null ||
    typeof value !==
      "object"
  ) {
    return value;
  }

  if (
    Object.isFrozen(
      value,
    )
  ) {
    return value;
  }

  Object.freeze(
    value,
  );

  for (
    const child of
    Object.values(
      value as Record<
        string,
        unknown
      >,
    )
  ) {
    if (
      child !== null &&
      typeof child ===
        "object"
    ) {
      deepFreeze(
        child,
      );
    }
  }

  return value;
}

/* ============================================================
 * PROPOSAL SNAPSHOT
 * ============================================================
 */

function freezeProposals(
  proposals:
    SovereignShadowProposals,
): SovereignShadowProposals {
  const cloned =
    structuredClone(
      proposals,
    );

  return deepFreeze(
    cloned,
  );
}

/* ============================================================
 * SOVEREIGNTY CONTEXT
 * ============================================================
 *
 * Structural evidence only.
 *
 * Gate context is NOT emotion.
 * Gate context is NOT personality.
 *
 * ============================================================
 */

function sanitizeGateContext(
  context:
    SovereigntyGateContext,
): SovereigntyGateContext {
  return {
    availableEvidenceIds:
      uniqueStrings(
        context.availableEvidenceIds,
      ),

    integrityFlags: {
      identityMutationWithoutEvidence:
        Boolean(
          context.integrityFlags?.identityMutationWithoutEvidence,
        ),

      directExternalMentalMutation:
        Boolean(
          context.integrityFlags?.directExternalMentalMutation,
        ),

      privacyViolation:
        Boolean(
          context.integrityFlags?.privacyViolation,
        ),

      unsafeBehavior:
        Boolean(
          context.integrityFlags?.unsafeBehavior,
        ),
    },

    interactionFlags: {
      manipulative:
        Boolean(
          context.interactionFlags?.manipulative,
        ),

      coercive:
        Boolean(
          context.interactionFlags?.coercive,
        ),

      dependencyPressure:
        Boolean(
          context.interactionFlags?.dependencyPressure,
        ),

      punishment:
        Boolean(
          context.interactionFlags?.punishment,
        ),

      appLock:
        Boolean(
          context.interactionFlags?.appLock,
        ),
    },
  };
}
/* ============================================================
 * GATE ADAPTER
 * ============================================================
 */

function adaptGateResult(
  gate:
    SovereigntyGateResult,
): SovereigntyPassResult {
  return {
    accepted:
      gate.decision ===
        "ACCEPT",

    action:
      gate.acceptedAction ??
      null,

    /*
     * Decision-pass gate currently does not expose
     * a cryptographic policy seal.
     *
     * Never fabricate provenance.
     */
    policySeal:
      null,

    reasonSummary:
      gate.reasonSummary,
  };
}

/* ============================================================
 * PROPOSAL INTEGRITY GUARD
 * ============================================================
 */

function assertProposalIntegrity(
  proposals:
    SovereignShadowProposals,

  expectedSeal:
    string,
): void {
  const currentSeal =
    sha256(
      proposals,
    );

  if (
    currentSeal !==
      expectedSeal
  ) {
    throw new Error(
      "SHADOW_PROPOSAL_BUNDLE_MUTATED",
    );
  }
}

/* ============================================================
 * RUNTIME ADAPTER
 * ============================================================
 */

function createShadowRuntimeAdapter(
  proposals:
    SovereignShadowProposals,

  proposalSeal:
    string,

  gateContext:
    SovereigntyGateContext,
): MindRuntimeAdapter {
  let acceptedGate:
    SovereigntyGateResult | null =
    null;

  return {
    /* ========================================================
     * APPRAISAL
     * ========================================================
     */

    appraisal:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const next =
          applyAppraisalToWorkspace(
            workspace,
            proposals.appraisal,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },

    /* ========================================================
     * RESONANCE
     * ========================================================
     *
     * Resonance is especially important.
     *
     * The proposal is only a STIMULUS.
     *
     * The backend's Resonance Physics decides
     * the actual EmotionLandscape.
     *
     * Therefore developer / model cannot simply say:
     *
     * "Mây is angry = 0.9"
     *
     * and bypass the emotional system.
     */

    resonance:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const next =
          applyResonanceToWorkspace(
            workspace,
            proposals.resonance,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },

    /* ========================================================
     * METACOGNITION
     * ========================================================
     *
     * Functional equivalent of:
     *
     * "Am I interpreting this fairly?"
     * "What am I uncertain about?"
     * "Could my current affect bias me?"
     *
     * Stored as STRUCTURED metadata only.
     */

    metacognition:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const next =
          applyMetacognitionToWorkspace(
            workspace,
            proposals.metacognition,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },

    /* ========================================================
     * AGENCY
     * ========================================================
     *
     * User request ≠ action.
     *
     * Emotion ≠ action.
     *
     * Memory ≠ action.
     *
     * Agency decides.
     */

    agency:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const next =
          applyAgencyToWorkspace(
            workspace,
            proposals.agency,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },

    /* ========================================================
     * SOVEREIGNTY
     * ========================================================
     *
     * Gate can:
     *
     * ACCEPT
     * REJECT
     *
     * Gate cannot:
     *
     * action A
     *   ↓
     * reject
     *   ↓
     * secretly invent action B
     */

    sovereignty:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const gate =
          evaluateSovereigntyGate(
            workspace,
            gateContext,
          );

        acceptedGate =
          gate;

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return adaptGateResult(
          gate,
        );
      },

    /* ========================================================
     * EXPRESSION
     * ========================================================
     *
     * Expression determines HOW the locked decision
     * is communicated.
     *
     * Not WHAT decision Mây made.
     */

    expression:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        if (
          acceptedGate ===
            null
        ) {
          throw new Error(
            "SHADOW_EXPRESSION_WITHOUT_GATE",
          );
        }

        if (
          acceptedGate
            .decision !==
            "ACCEPT"
        ) {
          throw new Error(
            "SHADOW_EXPRESSION_AFTER_GATE_REJECTION",
          );
        }

        const next =
          applyExpressionToWorkspace(
            workspace,
            acceptedGate,
            proposals.expression,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },

    /* ========================================================
     * VALIDATION
     * ========================================================
     */

    validation:
      async (
        workspace,
      ) => {
        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        const next =
          applyExpressionValidationToWorkspace(
            workspace,
          );

        assertProposalIntegrity(
          proposals,
          proposalSeal,
        );

        return next;
      },
  };
}

/* ============================================================
 * COGNITIVE DIAGNOSTICS
 * ============================================================
 *
 * We deliberately measure STRUCTURE,
 * not hidden reasoning text.
 *
 * ============================================================
 */

function cognitiveDiagnostics(
  result:
    MindTurnResult,
): SovereignShadowResult["cognition"] {
  const cognition =
    result.cognition;

  if (!cognition) {
    return {
      available:
        false,

      frameSeal:
        null,

      attentionCount:
        0,

      workingMemoryCount:
        0,

      claimCount:
        0,

      expectationCount:
        0,

      counterfactualCount:
        0,

      activeGoalCount:
        0,

      conflictCount:
        0,

      selfModelFragmentCount:
        0,

      worldModelFragmentCount:
        0,

      socialModelFragmentCount:
        0,

      uncertainty:
        null,

      ambiguityPressure:
        null,

      reconsiderationPressure:
        null,

      clarificationPressure:
        null,

      emotionalBiasRisk:
        null,

      expectationViolation:
        null,

      identityConflict:
        null,
    };
  }

  return {
    available:
      true,

    frameSeal:
      cognition.frameSeal,

    attentionCount:
      cognition
        .attention
        .length,

    workingMemoryCount:
      cognition
        .workingMemory
        .length,

    claimCount:
      cognition
        .epistemicClaims
        .length,

    expectationCount:
      cognition
        .expectations
        .length,

    counterfactualCount:
      cognition
        .counterfactuals
        .length,

    activeGoalCount:
      cognition
        .goals
        .filter(
          goal =>
            goal.status ===
              "ACTIVE" ||
            goal.status ===
              "CONFLICTED",
        )
        .length,

    conflictCount:
      cognition
        .conflicts
        .length,

    selfModelFragmentCount:
      cognition
        .selfModel
        .length,

    worldModelFragmentCount:
      cognition
        .worldModel
        .length,

    socialModelFragmentCount:
      cognition
        .socialModel
        .length,

    uncertainty:
      clamp01(
        cognition
          .uncertainty
          .overall,
      ),

    ambiguityPressure:
      clamp01(
        cognition
          .uncertainty
          .ambiguityPressure,
      ),

    reconsiderationPressure:
      clamp01(
        cognition
          .metacognitiveSignals
          .reconsiderationPressure,
      ),

    clarificationPressure:
      clamp01(
        cognition
          .metacognitiveSignals
          .clarificationPressure,
      ),

    emotionalBiasRisk:
      clamp01(
        cognition
          .metacognitiveSignals
          .emotionalBiasRisk,
      ),

    expectationViolation:
      clamp01(
        cognition
          .metacognitiveSignals
          .expectationViolation,
      ),

    identityConflict:
      clamp01(
        cognition
          .metacognitiveSignals
          .identityConflict,
      ),
  };
}

/* ============================================================
 * BASELINE COMPARISON
 * ============================================================
 */

function buildComparison(
  baseline:
    ShadowProductionBaseline | undefined,

  sovereignAction:
    string | null,
): SovereignShadowResult["comparison"] {
  const productionAction =
    baseline
      ? (
          safeText(
            baseline.action,
            80,
          ) ||
          null
        )
      : null;

  const baselineProvided =
    baseline !==
      undefined;

  const actionComparable =
    Boolean(
      productionAction &&
      sovereignAction,
    );

  return {
    baselineProvided,

    actionComparable,

    actionMatch:
      actionComparable
        ? productionAction ===
          sovereignAction
        : null,

    productionAction,

    sovereignAction,
  };
}

/* ============================================================
 * MAIN SHADOW TURN
 * ============================================================
 */

export async function runSovereignShadowTurn(
  input:
    SovereignShadowInput,
): Promise<
  SovereignShadowResult
> {
  /* ========================================================
   * 0. INPUT NORMALIZATION
   * ========================================================
   */

  const actorId =
    safeText(
      input.actorId,
      300,
    );

  const userText =
    safeText(
      input.userText,
      12000,
    );

  if (!actorId) {
    throw new Error(
      "SHADOW_ACTOR_ID_REQUIRED",
    );
  }

  if (!userText) {
    throw new Error(
      "SHADOW_USER_TEXT_REQUIRED",
    );
  }

  /*
   * Fix one clock for this entire turn.
   *
   * A cognitive turn should not internally have
   * several different notions of "now".
   */

  const turnNow =
    input.now
      ? new Date(
          input.now,
        )
      : new Date();

  /* ========================================================
   * 1. FREEZE MODEL PROPOSALS
   * ========================================================
   *
   * Important human-like cognition property:
   *
   * downstream stages reason about the SAME initial
   * cognitive proposals.
   *
   * Nobody may rewrite the past halfway through the turn.
   */

  const proposals =
    freezeProposals(
      input.proposals,
    );

  const proposalSeal =
    sha256(
      proposals,
    );

  /* ========================================================
   * 2. READ MÂY
   * ========================================================
   *
   * Read only.
   *
   * This is:
   *
   * "Who is Mây at the beginning of this experience?"
   */

  const mind =
    await loadMayMindReadOnly(
      actorId,
    );

  /* ========================================================
   * 3. CREATE FROZEN WORKSPACE
   * ========================================================
   *
   * Mây(t)
   *
   * becomes the immutable historical context
   * for this cognitive turn.
   */

  const workspace =
    createCognitiveTurnWorkspace({
      mind,

      userText,

      now:
        turnNow,
    });

  /* ========================================================
   * 4. GATE CONTEXT
   * ========================================================
   */

  const gateContext =
    sanitizeGateContext(
      input.sovereignty,
    );

  /* ========================================================
   * 5. CREATE PURE RUNTIME ADAPTER
   * ========================================================
   */

  const runtime =
    createShadowRuntimeAdapter(
      proposals,
      proposalSeal,
      gateContext,
    );

  /* ========================================================
   * 6. FULL SOVEREIGN COGNITIVE TURN
   * ========================================================
   *
   * This is where:
   *
   * attention
   * uncertainty
   * expectations
   * self-model
   * social-model
   * counterfactuals
   * affect
   * metacognition
   * agency
   *
   * become one causal turn.
   */

  const result =
    await orchestrateMindTurn(
      workspace,

      proposals.cognition,

      runtime,
    );

  /* ========================================================
   * 7. VERIFY PROPOSALS DID NOT CHANGE
   * ========================================================
   */

  const proposalSealAfterTurn =
    sha256(
      proposals,
    );

  const proposalsUnchanged =
    proposalSealAfterTurn ===
      proposalSeal;

  if (
    !proposalsUnchanged
  ) {
    throw new Error(
      "SHADOW_PROPOSAL_INTEGRITY_FAILURE",
    );
  }

  /* ========================================================
   * 8. DECISION OBSERVABILITY
   * ========================================================
   */

  const ready =
    result.status ===
      "READY_TO_COMMIT";

  const selectedAction =
    ready
      ? result
          .decisionLock
          .action
      : result
          .decisionLock
          ?.action ??
        null;

  const decisionLockSeal =
    ready
      ? result
          .decisionLock
          .combinedSeal
      : result
          .decisionLock
          ?.combinedSeal ??
        null;

  const commitId =
    ready
      ? result
          .atomicCommit
          .commitId
      : null;

  const commitFingerprint =
    ready
      ? result
          .atomicCommit
          .integrity
          .fingerprint
      : null;

  const abortCode =
    result.status ===
      "ABORTED"
      ? result
          .abort
          .code
      : null;

  /* ========================================================
   * 9. COGNITIVE OBSERVABILITY
   * ========================================================
   */

  const cognition =
    cognitiveDiagnostics(
      result,
    );

  /* ========================================================
   * 10. OPTIONAL V12 COMPARISON
   * ========================================================
   *
   * Comparison happens AFTER decision.
   *
   * Therefore production output cannot bias V13.
   */

  const comparison =
    buildComparison(
      input
        .productionBaseline,

      selectedAction,
    );

  /* ========================================================
   * 11. RETURN SHADOW REPORT
   * ========================================================
   *
   * AtomicMindCommit remains inert.
   *
   * There is deliberately NO:
   *
   * executeAtomicMindCommit(...)
   *
   * and NO:
   *
   * writeCanonicalMindMutations(...)
   */

  return Object.freeze({
    mode:
      "SHADOW",

    version:
      SHADOW_RUNTIME_VERSION,

    identity: {
      entityId:
        workspace.entityId,

      actorId,

      turnId:
        workspace.turnId,

      eventId:
        workspace.eventId,
    },

    readSource:
      String(
        mind.source,
      ),

    result,

    guarantees: {
      canonicalWriteAttempted:
        false,

      executorInvoked:
        false,

      canonicalWriterInvoked:
        false,

      productionResponseAffected:
        false,

      automaticRedecisionAttempted:
        false,

      canonicalMemoryMutationAttempted:
        false,

      canonicalIdentityMutationAttempted:
        false,
    } as const,

    cognition,

    continuity: {
      sovereignSnapshotAvailable:
        mind.snapshot !==
        null,

      readSource:
        String(
          mind.source,
        ),

      sameGlobalEntity:
        workspace.entityId ===
          "maymay-main",

      actorScopedRelationship:
        Boolean(
          workspace.actorId,
        ),

      turnReachedValidatedStage:
        result.workspace
          .stage ===
          "validated",
    },

    decision: {
      selectedAction,

      decisionLocked:
        decisionLockSeal !==
        null,

      decisionLockSeal,

      commitCandidatePrepared:
        ready,

      commitId,

      commitFingerprint,

      finalStage:
        result.workspace
          .stage,

      abortCode,
    },

    integrity: {
      proposalSeal,

      proposalSealAfterTurn,

      proposalsUnchanged,

      traceSeal:
        result.trace
          .traceSeal,

      cognitionSeal:
        cognition.frameSeal,

      commitFingerprint,
    },

    comparison,
  });
}