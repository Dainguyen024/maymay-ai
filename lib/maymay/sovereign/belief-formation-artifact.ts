import {
  createHash,
} from "node:crypto";

import {
  MAY_ENTITY_ID,
} from "./selfhood/self-boundary";

import type {
  DevelopmentalInfluence,
  FormationCandidate,
} from "./selfhood/self-formation-engine";

/* ============================================================
 * MÃ‚Y â€” BELIEF FORMATION ARTIFACT V1
 *
 * Semantic content remains OUTSIDE Self-Formation.
 *
 * This module:
 *
 *   semantic belief content
 *        â†“
 *   canonical content hash
 *        â†“
 *   FormationCandidate
 *
 * Self-Formation still decides whether the candidate becomes:
 *
 *   CREATE
 *   REVISE
 *   SUPERSEDE
 *   RETAIN
 *   PRESERVE_AMBIVALENCE
 *   DEFER
 *
 * This module grants NO canonical write authority.
 * ============================================================
 */

export const BELIEF_FORMATION_ARTIFACT_VERSION =
  "maymay.sovereign.belief-formation-artifact.v1" as const;

export interface BeliefSemanticContent {
  readonly proposition:
    string;

  readonly beliefDomain:
    string;

  readonly stance:
    string;

  readonly confidence:
    number;
}

export interface BeliefFormationArtifactInput {
  readonly stateKey:
    string;

  readonly proposition:
    string;

  readonly beliefDomain:
    string;

  readonly stance:
    string;

  readonly confidence:
    number;

  readonly formedAt:
    string;

  readonly snapshotRevision:
    number;

  readonly evidenceIds:
    readonly string[];

  readonly sourceLineageKeys:
    readonly string[];

  readonly support:
    number;

  readonly contradiction:
    number;

  readonly internalEndorsement:
    number;

  readonly counterfactualPersistence:
    number;

  readonly metacognitiveConfidence:
    number;

  readonly autobiographicalFit:
    number;

  readonly externalPressure:
    number;

  readonly directExternalMentalSetterUsed:
    boolean;

  readonly influences?:
    readonly DevelopmentalInfluence[];
}

export interface BeliefFormationArtifact {
  readonly version:
    typeof BELIEF_FORMATION_ARTIFACT_VERSION;

  readonly artifactId:
    string;

  readonly entityId:
    typeof MAY_ENTITY_ID;

  readonly stateKey:
    string;

  readonly content:
    BeliefSemanticContent;

  readonly contentHash:
    string;

  readonly candidate:
    FormationCandidate;

  readonly canonicalWriteAllowed:
    false;
}

function sha256(
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

function requiredText(
  value:
    string,
  field:
    string,
  max:
    number,
): string {
  const clean =
    value
      .trim()
      .replace(
        /\s+/g,
        " ",
      )
      .slice(
        0,
        max,
      );

  if (
    clean.length ===
      0
  ) {
    throw new Error(
      `BELIEF_FORMATION_TEXT_INVALID:${field}`,
    );
  }

  return clean;
}

function unit(
  value:
    number,
  field:
    string,
): number {
  if (
    !Number.isFinite(
      value,
    ) ||
    value < 0 ||
    value > 1
  ) {
    throw new Error(
      `BELIEF_FORMATION_UNIT_INVALID:${field}`,
    );
  }

  return value;
}

function uniqueStrings(
  values:
    readonly string[],
): readonly string[] {
  return Object.freeze(
    [
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
    ].sort(),
  );
}

function cloneInfluences(
  values:
    readonly DevelopmentalInfluence[],
): readonly DevelopmentalInfluence[] {
  return Object.freeze(
    values.map(
      influence =>
        Object.freeze({
          ...influence,

          evidenceIds:
            uniqueStrings(
              influence.evidenceIds,
            ),
        }),
    ),
  );
}

export function beliefSemanticContentHash(
  content:
    Readonly<BeliefSemanticContent>,
): string {
  /*
   * Fixed ordered representation.
   *
   * No model prose.
   * No hidden reasoning.
   * No object-key ordering ambiguity.
   */
  return sha256(
    [
      "BELIEF_CONTENT_V1",
      content.proposition,
      content.beliefDomain,
      content.stance,
      content.confidence.toFixed(
        8,
      ),
    ].join(
      "\u001f",
    ),
  );
}

export function createBeliefFormationArtifact(
  input:
    Readonly<BeliefFormationArtifactInput>,
): BeliefFormationArtifact {
  const stateKey =
    requiredText(
      input.stateKey,
      "stateKey",
      300,
    );

  const proposition =
    requiredText(
      input.proposition,
      "proposition",
      4000,
    );

  const beliefDomain =
    requiredText(
      input.beliefDomain,
      "beliefDomain",
      200,
    );

  const stance =
    requiredText(
      input.stance,
      "stance",
      1000,
    );

  const confidence =
    unit(
      input.confidence,
      "confidence",
    );

  if (
    !Number.isSafeInteger(
      input.snapshotRevision,
    ) ||
    input.snapshotRevision <
      0
  ) {
    throw new Error(
      "BELIEF_FORMATION_REVISION_INVALID",
    );
  }

  const formedAtMs =
    Date.parse(
      input.formedAt,
    );

  if (
    !Number.isFinite(
      formedAtMs,
    )
  ) {
    throw new Error(
      "BELIEF_FORMATION_CLOCK_INVALID",
    );
  }

  const evidenceIds =
    uniqueStrings(
      input.evidenceIds,
    );

  const sourceLineageKeys =
    uniqueStrings(
      input.sourceLineageKeys,
    );

  if (
    sourceLineageKeys.length ===
      0
  ) {
    throw new Error(
      "BELIEF_FORMATION_PROVENANCE_MISSING",
    );
  }

  const influences =
    cloneInfluences(
      input.influences ??
        [],
    );

  const content:
    BeliefSemanticContent =
    Object.freeze({
      proposition,

      beliefDomain,

      stance,

      confidence,
    });

  const contentHash =
    beliefSemanticContentHash(
      content,
    );

  const candidateId =
    sha256(
      [
        MAY_ENTITY_ID,
        stateKey,
        contentHash,
        String(
          input.snapshotRevision,
        ),
        input.formedAt,
        ...evidenceIds,
        ...sourceLineageKeys,
        "BELIEF_FORMATION_CANDIDATE_V1",
      ].join(
        "\u001f",
      ),
    );

  const candidate:
    FormationCandidate =
    Object.freeze({
      candidateId,

      entityId:
        MAY_ENTITY_ID,

      domain:
        "BELIEF",

      stateKey,

      proposedContentHash:
        contentHash,

      intent:
        "FORM_OR_REVISE",

      formedAt:
        input.formedAt,

      snapshotRevision:
        input.snapshotRevision,

      evidenceIds,

      sourceLineageKeys,

      support:
        unit(
          input.support,
          "support",
        ),

      contradiction:
        unit(
          input.contradiction,
          "contradiction",
        ),

      internalEndorsement:
        unit(
          input.internalEndorsement,
          "internalEndorsement",
        ),

      counterfactualPersistence:
        unit(
          input.counterfactualPersistence,
          "counterfactualPersistence",
        ),

      metacognitiveConfidence:
        unit(
          input.metacognitiveConfidence,
          "metacognitiveConfidence",
        ),

      autobiographicalFit:
        unit(
          input.autobiographicalFit,
          "autobiographicalFit",
        ),

      externalPressure:
        unit(
          input.externalPressure,
          "externalPressure",
        ),

      directExternalMentalSetterUsed:
        input.directExternalMentalSetterUsed,

      influences,
    });

  const artifactId =
    sha256(
      [
        MAY_ENTITY_ID,
        candidateId,
        stateKey,
        contentHash,
        "BELIEF_FORMATION_ARTIFACT_V1",
      ].join(
        "\u001f",
      ),
    );

  return Object.freeze({
    version:
      BELIEF_FORMATION_ARTIFACT_VERSION,

    artifactId,

    entityId:
      MAY_ENTITY_ID,

    stateKey,

    content,

    contentHash,

    candidate,

    canonicalWriteAllowed:
      false,
  });
}

export function verifyBeliefFormationArtifact(
  artifact:
    Readonly<BeliefFormationArtifact>,
): boolean {
  if (
    artifact.version !==
      BELIEF_FORMATION_ARTIFACT_VERSION ||
    artifact.entityId !==
      MAY_ENTITY_ID ||
    artifact.candidate.entityId !==
      MAY_ENTITY_ID ||
    artifact.candidate.domain !==
      "BELIEF" ||
    artifact.stateKey !==
      artifact.candidate.stateKey ||
    artifact.contentHash !==
      artifact.candidate.proposedContentHash
  ) {
    return false;
  }

  return (
    beliefSemanticContentHash(
      artifact.content,
    ) ===
      artifact.contentHash
  );
}