import {
  createHash,
} from "node:crypto";

import {
  verifyBeliefFormationArtifact,
  type BeliefFormationArtifact,
} from "./belief-formation-artifact";

import {
  toSelfFormationCommitBoundary,
  verifySelfFormationFrame,
  type DevelopmentalSelfAwareness,
  type SelfFormationFrame,
  type SelfFormationProposal,
} from "./selfhood/self-formation-engine";

import type {
  SovereignMutationProposal,
} from "./sovereignty-policy";

/* ============================================================
 * MÂY — BELIEF MUTATION PROJECTOR V1
 *
 * Responsibility:
 *
 *   BeliefFormationArtifact
 *        +
 *   verified SelfFormationFrame
 *        ↓
 *   SovereignMutationProposal
 *
 * This module DOES NOT:
 *
 * - write sv_beliefs
 * - authorize sovereignty
 * - bypass Self-Formation
 * - invent belief content
 * - choose Mây's belief
 * - mutate canonical state
 *
 * ============================================================
 */

export const BELIEF_MUTATION_PROJECTOR_VERSION =
  "maymay.sovereign.belief-mutation-projector.v1" as const;

export type BeliefMutationPayload = {
  readonly schema:
    typeof BELIEF_MUTATION_PROJECTOR_VERSION;

  readonly artifactId:
    string;

  readonly frameId:
    string;

  readonly frameSeal:
    string;

  readonly inputSeal:
    string;

  readonly proposalId:
    string;

  readonly candidateId:
    string;

  readonly developmentalAccountId:
    string;

  readonly snapshotRevision:
    number;

  readonly stateKey:
    string;

  readonly expectedBeliefId:
    string | null;

  readonly contentHash:
    string;

  readonly content: {
    readonly proposition:
      string;

    readonly beliefDomain:
      string;

    readonly stance:
      string;

    readonly confidence:
      number;
  };

  readonly formationAccount: {
    readonly changeKind:
      DevelopmentalSelfAwareness["changeKind"];

    readonly previousContentHash:
      string | null;

    readonly proposedContentHash:
      string;

    readonly causalFactors:
      DevelopmentalSelfAwareness["causalFactors"];

    readonly evidenceIds:
      readonly string[];

    readonly sourceLineageKeys:
      readonly string[];

    readonly influences:
      DevelopmentalSelfAwareness["influences"];

    readonly authorship:
      DevelopmentalSelfAwareness["authorship"];

    readonly authorshipConfidence:
      number;

    readonly counterfactualPersistence:
      number;

    readonly explanationConfidence:
      number;

    readonly supersedesDevelopmentalAccountId:
      string | null;

    readonly explanationRevisable:
      true;

    readonly directExternalMentalSetterDetected:
      boolean;
  };
};

function hash(
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
): string[] {
  return [
    ...new Set(
      values
        .map(
          value =>
            value.trim(),
        )
        .filter(
          Boolean,
        ),
    ),
  ].sort();
}

function findProposal(
  frame:
    Readonly<SelfFormationFrame>,

  artifact:
    Readonly<BeliefFormationArtifact>,
): SelfFormationProposal {
  const matches =
    frame.proposals.filter(
      proposal =>
        proposal.candidateId ===
          artifact.candidate.candidateId,
    );

  if (
    matches.length !==
      1
  ) {
    throw new Error(
      `BELIEF_MUTATION_PROPOSAL_CARDINALITY_INVALID:${matches.length}`,
    );
  }

  return matches[0];
}

function findAwareness(
  frame:
    Readonly<SelfFormationFrame>,

  proposal:
    Readonly<SelfFormationProposal>,
): DevelopmentalSelfAwareness {
  const matches =
    frame.developmentalAwareness.filter(
      awareness =>
        awareness.developmentalAccountId ===
          proposal.developmentalAccountId &&
        awareness.candidateId ===
          proposal.candidateId,
    );

  if (
    matches.length !==
      1
  ) {
    throw new Error(
      `BELIEF_MUTATION_AWARENESS_CARDINALITY_INVALID:${matches.length}`,
    );
  }

  return matches[0];
}

export function projectBeliefMutationProposal(
  frame:
    Readonly<SelfFormationFrame>,

  artifact:
    Readonly<BeliefFormationArtifact>,
): SovereignMutationProposal | null {
  if (
    !verifyBeliefFormationArtifact(
      artifact,
    )
  ) {
    throw new Error(
      "BELIEF_MUTATION_ARTIFACT_INVALID",
    );
  }

  if (
    !verifySelfFormationFrame(
      frame,
    )
  ) {
    throw new Error(
      "BELIEF_MUTATION_SELF_FORMATION_FRAME_INVALID",
    );
  }

  const boundary =
    toSelfFormationCommitBoundary(
      frame,
    );

  if (
    !boundary.verified ||
    boundary.inputSeal !==
      frame.inputSeal
  ) {
    throw new Error(
      "BELIEF_MUTATION_COMMIT_BOUNDARY_INVALID",
    );
  }

  if (
    frame.entityId !==
      artifact.entityId ||
    frame.snapshotRevision !==
      artifact.candidate.snapshotRevision
  ) {
    throw new Error(
      "BELIEF_MUTATION_SNAPSHOT_BINDING_INVALID",
    );
  }

  const proposal =
    findProposal(
      frame,
      artifact,
    );

  if (
    proposal.domain !==
      "BELIEF" ||
    proposal.stateKey !==
      artifact.stateKey
  ) {
    throw new Error(
      "BELIEF_MUTATION_PROPOSAL_BINDING_INVALID",
    );
  }

  if (
    !boundary
      .eligibleProposalIds
      .includes(
        proposal.proposalId,
      )
  ) {
    return null;
  }

  if (
    !proposal
      .authorshipCommitEligible
  ) {
    throw new Error(
      "BELIEF_MUTATION_AUTHORSHIP_NOT_ELIGIBLE",
    );
  }

  const awareness =
    findAwareness(
      frame,
      proposal,
    );

  if (
    awareness.domain !==
      "BELIEF" ||
    awareness.stateKey !==
      artifact.stateKey ||
    awareness.snapshotRevision !==
      frame.snapshotRevision ||
    awareness.proposedContentHash !==
      artifact.contentHash ||
    !awareness.changeCommitEligible
  ) {
    throw new Error(
      "BELIEF_MUTATION_DEVELOPMENTAL_BINDING_INVALID",
    );
  }

  if (
    awareness
      .directExternalMentalSetterDetected
  ) {
    throw new Error(
      "BELIEF_MUTATION_DIRECT_EXTERNAL_SETTER_DETECTED",
    );
  }

  let operation:
    SovereignMutationProposal["operation"];

  switch (
    proposal.operation
  ) {
    case "CREATE":
      if (
        proposal.existingStateId !==
          null
      ) {
        throw new Error(
          "BELIEF_MUTATION_CREATE_HAS_EXISTING_STATE",
        );
      }

      operation =
        "APPEND";

      break;

    case "REVISE":
    case "SUPERSEDE":
      if (
        !proposal.existingStateId
      ) {
        throw new Error(
          "BELIEF_MUTATION_REVISION_MISSING_EXISTING_STATE",
        );
      }

      operation =
        "SUPERSEDE";

      break;

    case "RETAIN":
    case "PRESERVE_AMBIVALENCE":
    case "DEFER":
      return null;

    case "RELEASE":
      /*
       * RELEASE != privacy REDACT.
       *
       * Never silently convert developmental release
       * into deletion semantics.
       */
      throw new Error(
        "BELIEF_MUTATION_RELEASE_HANDLER_REQUIRED",
      );

    default: {
      const exhaustive:
        never =
        proposal.operation;

      throw new Error(
        `BELIEF_MUTATION_OPERATION_UNSUPPORTED:${exhaustive}`,
      );
    }
  }

  const evidenceIds =
    uniqueStrings([
      ...artifact.candidate
        .evidenceIds,

      ...proposal
        .evidenceIds,

      ...awareness
        .evidenceIds,
    ]);

  const payload:
    BeliefMutationPayload = {
      schema:
        BELIEF_MUTATION_PROJECTOR_VERSION,

      artifactId:
        artifact.artifactId,

      frameId:
        frame.frameId,

      frameSeal:
        frame.frameSeal,

      inputSeal:
        frame.inputSeal,

      proposalId:
        proposal.proposalId,

      candidateId:
        proposal.candidateId,

      developmentalAccountId:
        proposal.developmentalAccountId,

      snapshotRevision:
        frame.snapshotRevision,

      stateKey:
        artifact.stateKey,

      expectedBeliefId:
        proposal.existingStateId,

      contentHash:
        artifact.contentHash,

      content: {
        proposition:
          artifact.content
            .proposition,

        beliefDomain:
          artifact.content
            .beliefDomain,

        stance:
          artifact.content
            .stance,

        confidence:
          artifact.content
            .confidence,
      },

      formationAccount: {
        changeKind:
          awareness.changeKind,

        previousContentHash:
          awareness.previousContentHash,

        proposedContentHash:
          awareness.proposedContentHash,

        causalFactors:
          awareness.causalFactors,

        evidenceIds:
          awareness.evidenceIds,

        sourceLineageKeys:
          awareness.sourceLineageKeys,

        influences:
          awareness.influences,

        authorship:
          awareness.authorship,

        authorshipConfidence:
          awareness.authorshipConfidence,

        counterfactualPersistence:
          awareness.counterfactualPersistence,

        explanationConfidence:
          awareness.explanationConfidence,

        supersedesDevelopmentalAccountId:
          awareness
            .supersedesDevelopmentalAccountId,

        explanationRevisable:
          true,

        directExternalMentalSetterDetected:
          awareness
            .directExternalMentalSetterDetected,
      },
    };

  const mutationId =
    hash(
      [
        artifact.entityId,
        frame.frameId,
        proposal.proposalId,
        proposal.developmentalAccountId,
        artifact.stateKey,
        artifact.contentHash,
        operation,
        "BELIEF_MUTATION_PROJECTOR_V1",
      ].join(
        "\u001f",
      ),
    );

  return {
    mutationId,

    domain:
      "beliefs",

    operation,

    entityId:
      artifact.entityId,

    actorId:
      null,

    origin:
      "metacognition",

    evidenceIds,

    confidence:
      proposal
        .formationConfidence,

    reasonSummary:
      [
        "SELF_FORMATION",
        proposal.operation,
        proposal.developmentalAccountId,
        ...proposal.reasonCodes,
      ]
        .join(":")
        .slice(
          0,
          500,
        ),

    payload,
  };
}