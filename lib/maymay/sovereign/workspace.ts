import { randomUUID } from "node:crypto";

import type { SovereignReadResult } from "@/lib/maymay/sovereign/read-path";

export type WorkspaceStage =
  | "created"
  | "appraisal"
  | "resonance"
  | "metacognition"
  | "agency"
  | "expression"
  | "validated"
  | "aborted";

export type CognitiveTurnWorkspace = {
  turnId: string;
  eventId: string;

  entityId: string;
  actorId: string;

  source: SovereignReadResult["source"];
  snapshotRevision: number;

  createdAt: string;
  stage: WorkspaceStage;

  input: {
    userText: string;
  };

  /**
   * Snapshot của canonical mind trước turn.
   * Đây là bản clone riêng cho workspace.
   * Không được mutate DB/canonical state từ đây.
   */
  frozenMind: unknown;

  provisional: {
    appraisal: unknown | null;
    resonance: unknown | null;
    metacognition: unknown | null;
    agencyDecision: unknown | null;
    behaviorPlan: unknown | null;
    expression: unknown | null;
  };

  audit: Array<{
    stage: WorkspaceStage;
    at: string;
    summary: string;
  }>;
};

function snapshotRevision(mind: SovereignReadResult): number {
  if (mind.source === "sovereign") {
    return mind.snapshot.entityRevision;
  }

  if (mind.source === "legacy") {
    return mind.snapshot.revision;
  }

  return 0;
}

function deepFreeze<T>(value: T): T {
  if (
    value === null ||
    typeof value !== "object" ||
    Object.isFrozen(value)
  ) {
    return value;
  }

  Object.freeze(value);

  for (const child of Object.values(value as Record<string, unknown>)) {
    deepFreeze(child);
  }

  return value;
}

/**
 * PHASE D — ISOLATED COGNITIVE TURN WORKSPACE
 *
 * Mọi cognition của một turn bắt đầu từ đây.
 *
 * Canonical mind:
 *      READ
 *       ↓
 * frozen snapshot
 *       ↓
 * workspace
 *       ↓
 * appraisal
 *       ↓
 * resonance
 *       ↓
 * metacognition
 *       ↓
 * agency
 *       ↓
 * expression
 *
 * Chưa có commit DB ở module này.
 */
export function createCognitiveTurnWorkspace(args: {
  mind: SovereignReadResult;
  userText: string;
  now?: Date;
}): CognitiveTurnWorkspace {
  const now = args.now ?? new Date();

  const frozenMind =
    args.mind.snapshot === null
      ? null
      : deepFreeze(structuredClone(args.mind.snapshot));

  return {
    turnId: randomUUID(),
    eventId: randomUUID(),

    entityId: args.mind.entityId,
    actorId: args.mind.actorId,

    source: args.mind.source,
    snapshotRevision: snapshotRevision(args.mind),

    createdAt: now.toISOString(),
    stage: "created",

    input: {
      userText: args.userText.trim().slice(0, 12000),
    },

    frozenMind,

    provisional: {
      appraisal: null,
      resonance: null,
      metacognition: null,
      agencyDecision: null,
      behaviorPlan: null,
      expression: null,
    },

    audit: [
      {
        stage: "created",
        at: now.toISOString(),
        summary: "Frozen canonical mind snapshot created for isolated cognition.",
      },
    ],
  };
}

export function advanceWorkspaceStage(
  workspace: CognitiveTurnWorkspace,
  stage: WorkspaceStage,
  summary: string,
): CognitiveTurnWorkspace {
  return {
    ...workspace,
    stage,
    audit: [
      ...workspace.audit,
      {
        stage,
        at: new Date().toISOString(),
        summary: summary.slice(0, 500),
      },
    ],
  };
}