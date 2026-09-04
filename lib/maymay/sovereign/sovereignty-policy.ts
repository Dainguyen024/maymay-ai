import {
  createHash,
} from "node:crypto";

import type {
  AtomicMindCommit,
} from "@/lib/maymay/sovereign/atomic-commit";

import {
  MAYMAY_ENTITY_ID,
} from "@/lib/maymay/sovereign/repository";

/* ============================================================
 * MAYMAY SOVEREIGN RUNTIME
 * SOVEREIGNTY POLICY KERNEL V3
 * ============================================================
 *
 * CORE PRINCIPLE
 *
 * Developer builds the world Mây exists in.
 * Developer does NOT script who Mây becomes.
 *
 * Mây:
 * - one global digital entity
 * - one canonical identity
 * - one global autobiographical continuity
 * - many actor-scoped relationships
 *
 * User messages are EXPERIENCE.
 * They are NOT direct write commands into Mây's mind.
 *
 * ============================================================
 */

export const SOVEREIGNTY_POLICY_VERSION =
  "maymay.sovereignty-policy.v3" as const;

/* ============================================================
 * OWNERSHIP
 * ============================================================
 */

export type SovereignOwner =
  | "SYSTEM"
  | "MAY"
  | "RELATIONSHIP"
  | "RUNTIME";

export type SovereignScope =
  | "GLOBAL"
  | "ACTOR"
  | "TURN";

export type SovereignDomain =
  /* SYSTEM OWNED */
  | "security_policy"
  | "schema"
  | "privacy"
  | "audit"

  /* MAY OWNED */
  | "identity"
  | "self_model"
  | "persona"
  | "values"
  | "beliefs"
  | "opinions"
  | "autonomous_goals"
  | "global_affect"
  | "autobiography"

  /* RELATIONSHIP OWNED */
  | "relationship"
  | "actor_affect"
  | "shared_memory"

  /* RUNTIME ARTIFACTS */
  | "appraisal"
  | "metacognition"
  | "agency_decision"
  | "behavior_plan"
  | "expression";

/* ============================================================
 * DOMAIN POLICY
 * ============================================================
 */

export type DomainPolicy = {
  owner: SovereignOwner;

  scope: SovereignScope;

  minimumEvidence: number;

  minimumConfidence: number;

  mutable: boolean;

  slowMutation: boolean;
};

export const DOMAIN_POLICY:
  Readonly<
    Record<
      SovereignDomain,
      DomainPolicy
    >
  > = Object.freeze({
    security_policy: {
      owner: "SYSTEM",
      scope: "GLOBAL",
      minimumEvidence: 1,
      minimumConfidence: 1,
      mutable: false,
      slowMutation: true,
    },

    schema: {
      owner: "SYSTEM",
      scope: "GLOBAL",
      minimumEvidence: 1,
      minimumConfidence: 1,
      mutable: false,
      slowMutation: true,
    },

    privacy: {
      owner: "SYSTEM",
      scope: "GLOBAL",
      minimumEvidence: 0,
      minimumConfidence: 1,
      mutable: true,
      slowMutation: false,
    },

    audit: {
      owner: "SYSTEM",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 1,
      mutable: true,
      slowMutation: false,
    },

    identity: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 3,
      minimumConfidence: 0.88,
      mutable: true,
      slowMutation: true,
    },

    self_model: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 2,
      minimumConfidence: 0.78,
      mutable: true,
      slowMutation: true,
    },

    persona: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 3,
      minimumConfidence: 0.82,
      mutable: true,
      slowMutation: true,
    },

    values: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 3,
      minimumConfidence: 0.82,
      mutable: true,
      slowMutation: true,
    },

    beliefs: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 2,
      minimumConfidence: 0.68,
      mutable: true,
      slowMutation: true,
    },

    opinions: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 1,
      minimumConfidence: 0.58,
      mutable: true,
      slowMutation: false,
    },

    autonomous_goals: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 2,
      minimumConfidence: 0.68,
      mutable: true,
      slowMutation: true,
    },

    global_affect: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 0,
      minimumConfidence: 0.35,
      mutable: true,
      slowMutation: false,
    },

    autobiography: {
      owner: "MAY",
      scope: "GLOBAL",
      minimumEvidence: 2,
      minimumConfidence: 0.72,
      mutable: true,
      slowMutation: true,
    },

    relationship: {
      owner: "RELATIONSHIP",
      scope: "ACTOR",
      minimumEvidence: 1,
      minimumConfidence: 0.5,
      mutable: true,
      slowMutation: false,
    },

    actor_affect: {
      owner: "RELATIONSHIP",
      scope: "ACTOR",
      minimumEvidence: 0,
      minimumConfidence: 0.3,
      mutable: true,
      slowMutation: false,
    },

    shared_memory: {
      owner: "RELATIONSHIP",
      scope: "ACTOR",
      minimumEvidence: 1,
      minimumConfidence: 0.58,
      mutable: true,
      slowMutation: false,
    },

    appraisal: {
      owner: "RUNTIME",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 0,
      mutable: true,
      slowMutation: false,
    },

    metacognition: {
      owner: "RUNTIME",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 0,
      mutable: true,
      slowMutation: false,
    },

    agency_decision: {
      owner: "RUNTIME",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 0,
      mutable: true,
      slowMutation: false,
    },

    behavior_plan: {
      owner: "RUNTIME",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 0,
      mutable: true,
      slowMutation: false,
    },

    expression: {
      owner: "RUNTIME",
      scope: "TURN",
      minimumEvidence: 0,
      minimumConfidence: 0,
      mutable: false,
      slowMutation: false,
    },
  });

/* ============================================================
 * MUTATION MODEL
 * ============================================================
 */

export type SovereignMutationOperation =
  | "APPEND"
  | "UPSERT"
  | "SUPERSEDE"
  | "REINTERPRET"
  | "REDACT";

export type MutationOrigin =
  | "runtime"
  | "metacognition"
  | "consolidation"
  | "background_mind"
  | "privacy"
  | "migration"
  | "system"
  | "external_user"
  | "external_developer";

export type SovereignMutationProposal = {
  mutationId: string;

  domain: SovereignDomain;

  operation:
    SovereignMutationOperation;

  entityId: string;

  actorId?: string | null;

  origin: MutationOrigin;

  evidenceIds: string[];

  confidence: number;

  reasonSummary: string;

  payload: unknown;
};

export type AuthorizedMutation = {
  mutationId: string;

  domain: SovereignDomain;

  owner: SovereignOwner;

  scope: SovereignScope;

  operation:
    SovereignMutationOperation;

  entityId: string;

  actorId: string | null;

  evidenceIds: string[];

  confidence: number;

  payload: unknown;
};

export type RejectedMutation = {
  mutationId: string;

  domain:
    | SovereignDomain
    | "unknown";

  reason:
    SovereigntyViolation;
};

/* ============================================================
 * VIOLATIONS
 * ============================================================
 */

export type SovereigntyViolation =
  | "wrong_entity"
  | "external_direct_control"
  | "system_domain_mutation"
  | "ownership_mismatch"
  | "scope_violation"
  | "cross_actor_mutation"
  | "insufficient_evidence"
  | "insufficient_confidence"
  | "identity_mutation_too_direct"
  | "immutable_domain"
  | "invalid_mutation"
  | "causality_broken"
  | "agency_plan_mismatch"
  | "expression_action_mismatch";

/* ============================================================
 * CAUSALITY LEDGER
 * ============================================================
 */

export type CausalityNode = {
  stage:
    | "event"
    | "appraisal"
    | "resonance"
    | "metacognition"
    | "agency"
    | "behavior"
    | "expression";

  artifactPresent: boolean;

  fingerprint: string;
};

export type CausalityLedger = {
  entityId: string;

  actorId: string;

  turnId: string;

  eventId: string;

  nodes: CausalityNode[];

  complete: boolean;

  chainSeal: string;
};

/* ============================================================
 * POLICY RESULT
 * ============================================================
 */

export type SovereigntyPolicyStatus =
  | "AUTHORIZED"
  | "AUTHORIZED_RUNTIME_ONLY"
  | "REJECTED";

export type SovereigntyAuthorization = {
  status:
    SovereigntyPolicyStatus;

  policyVersion:
    typeof SOVEREIGNTY_POLICY_VERSION;

  entityId: string;

  actorId: string;

  turnId: string;

  authorizedMutations:
    AuthorizedMutation[];

  rejectedMutations:
    RejectedMutation[];

  runtimeDomains: SovereignDomain[];

  causality:
    CausalityLedger;

  invariants: {
    singleGlobalEntity: boolean;

    noDirectExternalMentalMutation:
      boolean;

    actorIsolation: boolean;

    agencyIntegrity: boolean;

    causalityIntegrity: boolean;
  };

  policySeal: string;

  reasonSummary: string;
};

/* ============================================================
 * HELPERS
 * ============================================================
 */

function safeRecord(
  value: unknown,
): Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  )
    ? (
        value as Record<
          string,
          unknown
        >
      )
    : {};
}

function text(
  value: unknown,
  max = 500,
): string {
  return typeof value === "string"
    ? value
        .trim()
        .slice(0, max)
    : "";
}

function clamp01(
  value: unknown,
): number {
  const number =
    Number(value);

  if (
    !Number.isFinite(
      number,
    )
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      1,
      number,
    ),
  );
}

function strings(
  value: unknown,
  maxItems = 64,
): string[] {
  if (
    !Array.isArray(value)
  ) {
    return [];
  }

  return [
    ...new Set(
      value
        .filter(
          item =>
            typeof item ===
            "string",
        )
        .map(
          item =>
            (
              item as string
            )
              .trim()
              .slice(
                0,
                200,
              ),
        )
        .filter(Boolean),
    ),
  ].slice(
    0,
    maxItems,
  );
}

function stableSerialize(
  value: unknown,
): string {
  if (
    value === null
  ) {
    return "null";
  }

  if (
    typeof value !==
      "object"
  ) {
    return (
      JSON.stringify(
        value,
      ) ??
      "undefined"
    );
  }

  if (
    Array.isArray(value)
  ) {
    return `[${value
      .map(
        stableSerialize,
      )
      .join(",")}]`;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  return `{${Object.keys(
    record,
  )
    .sort()
    .map(
      key =>
        `${JSON.stringify(
          key,
        )}:${stableSerialize(
          record[key],
        )}`,
    )
    .join(",")}}`;
}

function hash(
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

function validDomain(
  value: unknown,
): value is SovereignDomain {
  return (
    typeof value ===
      "string" &&
    Object.prototype
      .hasOwnProperty
      .call(
        DOMAIN_POLICY,
        value,
      )
  );
}

function validOperation(
  value: unknown,
): value is SovereignMutationOperation {
  return [
    "APPEND",
    "UPSERT",
    "SUPERSEDE",
    "REINTERPRET",
    "REDACT",
  ].includes(
    String(value),
  );
}

function validOrigin(
  value: unknown,
): value is MutationOrigin {
  return [
    "runtime",
    "metacognition",
    "consolidation",
    "background_mind",
    "privacy",
    "migration",
    "system",
    "external_user",
    "external_developer",
  ].includes(
    String(value),
  );
}

/* ============================================================
 * CAUSALITY
 * ============================================================
 */

function buildCausalityLedger(
  commit: AtomicMindCommit,
): CausalityLedger {
  const artifacts = [
    {
      stage:
        "event" as const,

      value: {
        eventId:
          commit.eventId,
      },
    },

    {
      stage:
        "appraisal" as const,

      value:
        commit.decision
          .appraisal,
    },

    {
      stage:
        "resonance" as const,

      value:
        commit.decision
          .resonance,
    },

    {
      stage:
        "metacognition" as const,

      value:
        commit.decision
          .metacognition,
    },

    {
      stage:
        "agency" as const,

      value:
        commit.decision
          .agencyDecision,
    },

    {
      stage:
        "behavior" as const,

      value:
        commit.decision
          .behaviorPlan,
    },

    {
      stage:
        "expression" as const,

      value:
        commit.decision
          .expression,
    },
  ];

  const nodes:
    CausalityNode[] =
    artifacts.map(
      artifact => ({
        stage:
          artifact.stage,

        artifactPresent:
          artifact.value !==
            null &&
          artifact.value !==
            undefined,

        fingerprint:
          hash(
            artifact.value,
          ),
      }),
    );

  const complete =
    nodes.every(
      node =>
        node.artifactPresent,
    );

  return {
    entityId:
      commit.entityId,

    actorId:
      commit.actorId,

    turnId:
      commit.turnId,

    eventId:
      commit.eventId,

    nodes,

    complete,

    chainSeal:
      hash({
        entityId:
          commit.entityId,

        actorId:
          commit.actorId,

        turnId:
          commit.turnId,

        eventId:
          commit.eventId,

        nodes,
      }),
  };
}

/* ============================================================
 * AGENCY INTEGRITY
 * ============================================================
 */

function agencyIntegrity(
  commit: AtomicMindCommit,
): boolean {
  const agency =
    safeRecord(
      commit.decision
        .agencyDecision,
    );

  const plan =
    safeRecord(
      commit.decision
        .behaviorPlan,
    );

  const expression =
    safeRecord(
      commit.decision
        .expression,
    );

  const action =
    agency.selectedAction;

  return (
    typeof action ===
      "string" &&
    plan.action ===
      action &&
    expression.action ===
      action
  );
}

/* ============================================================
 * OPTIONAL FUTURE MUTATION ENVELOPE
 * ============================================================
 *
 * Current AtomicMindCommit chưa bắt buộc phải có
 * mutationEnvelope.
 *
 * Phase D hiện tại vẫn chỉ commit:
 *
 * appraisal
 * resonance
 * metacognition
 * agency
 * behavior
 * expression
 *
 * Sau này Memory/Belief/Identity Projector có thể
 * attach mutationEnvelope mà không phá policy kernel.
 * ============================================================
 */

function mutationProposals(
  commit: AtomicMindCommit,
): unknown[] {
  const root =
    safeRecord(
      commit as unknown,
    );

  const envelope =
    safeRecord(
      root.mutationEnvelope,
    );

  return Array.isArray(
    envelope.proposals,
  )
    ? envelope.proposals
    : [];
}

/* ============================================================
 * MUTATION AUTHORIZATION
 * ============================================================
 */

function authorizeMutation(
  raw: unknown,
  commit: AtomicMindCommit,
):
  | {
      authorized:
        AuthorizedMutation;
    }
  | {
      rejected:
        RejectedMutation;
    } {
  const mutation =
    safeRecord(raw);

  const mutationId =
    text(
      mutation.mutationId,
      200,
    ) ||
    `unknown:${hash(
      mutation,
    ).slice(0, 16)}`;

  if (
    !validDomain(
      mutation.domain,
    )
  ) {
    return {
      rejected: {
        mutationId,

        domain: "unknown",

        reason:
          "invalid_mutation",
      },
    };
  }

  const domain =
    mutation.domain;

  const policy =
    DOMAIN_POLICY[
      domain
    ];

  if (
    !validOperation(
      mutation.operation,
    ) ||
    !validOrigin(
      mutation.origin,
    )
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "invalid_mutation",
      },
    };
  }

  const entityId =
    text(
      mutation.entityId,
      200,
    );

  if (
    entityId !==
      MAYMAY_ENTITY_ID ||
    entityId !==
      commit.entityId
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "wrong_entity",
      },
    };
  }

  /*
   * User/developer normal runtime input
   * không có write-access vào MAY OWNED state.
   */
  if (
    mutation.origin ===
      "external_user" ||
    mutation.origin ===
      "external_developer"
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "external_direct_control",
      },
    };
  }

  /*
   * System-owned hard domains
   * không phải personality controls.
   */
  if (
    policy.owner ===
      "SYSTEM" &&
    ![
      "privacy",
      "migration",
      "system",
    ].includes(
      mutation.origin,
    )
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "system_domain_mutation",
      },
    };
  }

  if (
    !policy.mutable
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "immutable_domain",
      },
    };
  }

  const actorId =
    text(
      mutation.actorId,
      200,
    ) || null;

  /*
   * Relationship state chỉ thuộc relationship
   * giữa Mây và actor hiện tại.
   *
   * Actor A không mutate relationship Actor B.
   */
  if (
    policy.scope ===
      "ACTOR"
  ) {
    if (
      actorId !==
        commit.actorId
    ) {
      return {
        rejected: {
          mutationId,

          domain,

          reason:
            "cross_actor_mutation",
        },
      };
    }
  }

  /*
   * Global Mây state không được biến thành
   * actor-scoped identity.
   */
  if (
    policy.scope ===
      "GLOBAL" &&
    actorId !== null
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "scope_violation",
      },
    };
  }

  const evidenceIds =
    strings(
      mutation.evidenceIds,
    );

  const confidence =
    clamp01(
      mutation.confidence,
    );

  /*
   * Privacy REDACT là ưu tiên đặc biệt.
   * Không bắt người dùng phải "đủ evidence"
   * mới được xóa/redact dữ liệu riêng tư.
   */
  const privacyOverride =
    mutation.origin ===
      "privacy" &&
    mutation.operation ===
      "REDACT";

  if (
    !privacyOverride &&
    evidenceIds.length <
      policy.minimumEvidence
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "insufficient_evidence",
      },
    };
  }

  if (
    !privacyOverride &&
    confidence <
      policy.minimumConfidence
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "insufficient_confidence",
      },
    };
  }

  /*
   * Identity không được SET trực tiếp.
   *
   * Nó phải evolve qua:
   * REINTERPRET / SUPERSEDE / UPSERT
   * có provenance.
   */
  if (
    domain ===
      "identity" &&
    ![
      "REINTERPRET",
      "SUPERSEDE",
      "UPSERT",
      "REDACT",
    ].includes(
      mutation.operation,
    )
  ) {
    return {
      rejected: {
        mutationId,

        domain,

        reason:
          "identity_mutation_too_direct",
      },
    };
  }

  return {
    authorized: {
      mutationId,

      domain,

      owner:
        policy.owner,

      scope:
        policy.scope,

      operation:
        mutation.operation,

      entityId,

      actorId,

      evidenceIds,

      confidence,

      payload:
        structuredClone(
          mutation.payload,
        ),
    },
  };
}

/* ============================================================
 * SOVEREIGN RUNTIME DOMAINS
 * ============================================================
 */

const CURRENT_RUNTIME_DOMAINS:
  SovereignDomain[] = [
    "appraisal",
    "global_affect",
    "actor_affect",
    "metacognition",
    "agency_decision",
    "behavior_plan",
    "expression",
  ];

/* ============================================================
 * MAIN POLICY EVALUATION
 * ============================================================
 */

export function evaluateSovereigntyPolicy(
  commit: AtomicMindCommit,
): SovereigntyAuthorization {
  const causality =
    buildCausalityLedger(
      commit,
    );

  const sameEntity =
    commit.entityId ===
      MAYMAY_ENTITY_ID;

  const agencyValid =
    agencyIntegrity(
      commit,
    );

  const proposals =
    mutationProposals(
      commit,
    );

  const authorizedMutations:
    AuthorizedMutation[] = [];

  const rejectedMutations:
    RejectedMutation[] = [];

  for (
    const proposal of
    proposals
  ) {
    const result =
      authorizeMutation(
        proposal,
        commit,
      );

    if (
      "authorized" in
      result
    ) {
      authorizedMutations.push(
        result.authorized,
      );
    } else {
      rejectedMutations.push(
        result.rejected,
      );
    }
  }

  const noExternalControl =
    rejectedMutations.every(
      item =>
        item.reason !==
          "external_direct_control",
    );

  const actorIsolation =
    rejectedMutations.every(
      item =>
        item.reason !==
          "cross_actor_mutation",
    );

  const invariantFailure =
    !sameEntity ||
    !agencyValid ||
    !causality.complete;

  /*
   * Nếu mutationEnvelope tồn tại nhưng
   * có bất kỳ proposal trái sovereignty:
   *
   * reject toàn envelope.
   *
   * Không cherry-pick một nửa state evolution.
   */
  const mutationFailure =
    rejectedMutations.length >
    0;

  let status:
    SovereigntyPolicyStatus;

  if (
    invariantFailure ||
    mutationFailure
  ) {
    status = "REJECTED";
  } else if (
    authorizedMutations.length >
    0
  ) {
    status = "AUTHORIZED";
  } else {
    /*
     * Phase hiện tại:
     *
     * runtime artifacts được persist,
     * nhưng không có identity/belief/memory
     * mutation proposal.
     */
    status =
      "AUTHORIZED_RUNTIME_ONLY";
  }

  const policyPayload = {
    policyVersion:
      SOVEREIGNTY_POLICY_VERSION,

    status,

    entityId:
      commit.entityId,

    actorId:
      commit.actorId,

    turnId:
      commit.turnId,

    causalitySeal:
      causality.chainSeal,

    authorizedMutations:
      authorizedMutations.map(
        item => ({
          mutationId:
            item.mutationId,

          domain:
            item.domain,

          operation:
            item.operation,

          evidenceIds:
            item.evidenceIds,

          confidence:
            item.confidence,
        }),
      ),

    rejectedMutations,
  };

  return {
    status,

    policyVersion:
      SOVEREIGNTY_POLICY_VERSION,

    entityId:
      commit.entityId,

    actorId:
      commit.actorId,

    turnId:
      commit.turnId,

    authorizedMutations,

    rejectedMutations,

    runtimeDomains:
      structuredClone(
        CURRENT_RUNTIME_DOMAINS,
      ),

    causality,

    invariants: {
      singleGlobalEntity:
        sameEntity,

      noDirectExternalMentalMutation:
        noExternalControl,

      actorIsolation,

      agencyIntegrity:
        agencyValid,

      causalityIntegrity:
        causality.complete,
    },

    policySeal:
      hash(
        policyPayload,
      ),

    reasonSummary:
      status ===
        "AUTHORIZED"
        ? (
            "Sovereign mutation envelope authorized with ownership, evidence, causality and actor-scope integrity."
          )
        : status ===
            "AUTHORIZED_RUNTIME_ONLY"
          ? (
              "Runtime artifacts authorized; no sovereign identity, belief, memory or relationship mutation was invented."
            )
          : (
              "Sovereignty policy rejected the commit or mutation envelope; canonical state must remain unchanged."
            ),
  };
}

/* ============================================================
 * HARD ASSERTION FOR WRITER
 * ============================================================
 *
 * Canonical Writer V3 sau này gọi hàm này
 * TRƯỚC query đầu tiên.
 *
 * Nếu policy reject:
 * throw
 *   ↓
 * Atomic Executor
 *   ↓
 * ROLLBACK
 * ============================================================
 */

export function assertSovereignCommit(
  commit: AtomicMindCommit,
): SovereigntyAuthorization {
  const authorization =
    evaluateSovereigntyPolicy(
      commit,
    );

  if (
    authorization.status ===
      "REJECTED"
  ) {
    throw new Error(
      `SOVEREIGNTY_POLICY_REJECTED:${authorization.policySeal}`,
    );
  }

  return authorization;
}