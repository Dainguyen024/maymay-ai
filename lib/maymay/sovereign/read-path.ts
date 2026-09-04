import {
  loadSovereignMindSnapshot,
  MAYMAY_ENTITY_ID,
  type SovereignMindSnapshot,
} from "@/lib/maymay/sovereign/repository";

import {
  loadLegacyMindSnapshot,
  type LegacyMindSnapshot,
} from "@/lib/maymay/sovereign/legacy-read";

export type SovereignReadResult =
  | {
      source: "sovereign";
      entityId: typeof MAYMAY_ENTITY_ID;
      actorId: string;
      snapshot: SovereignMindSnapshot;
    }
  | {
      source: "legacy";
      entityId: typeof MAYMAY_ENTITY_ID;
      actorId: string;
      snapshot: LegacyMindSnapshot;
    }
  | {
      source: "empty";
      entityId: typeof MAYMAY_ENTITY_ID;
      actorId: string;
      snapshot: null;
    };

/**
 * Không chỉ kiểm tra sv_entities.
 *
 * Một entity row có thể đã tồn tại trong lúc migration
 * nhưng Identity Kernel chưa hoàn chỉnh.
 *
 * Chỉ được coi Sovereign Mây là READY khi các phần
 * continuity tối thiểu đã tồn tại.
 */
function sovereignReady(snapshot: SovereignMindSnapshot) {
  return Boolean(
    snapshot.entity &&
      snapshot.identityRoot &&
      snapshot.selfModel &&
      snapshot.persona,
  );
}

/**
 * PHASE C — UNIFIED READ PATH
 *
 * Thứ tự:
 *
 * 1. Sovereign v13 đã đủ Identity Kernel
 *      -> đọc maymay-main
 *
 * 2. Sovereign chưa sẵn sàng
 *      -> fallback READ-ONLY về Mây v12
 *
 * 3. Không bên nào có data
 *      -> empty
 *
 * TUYỆT ĐỐI KHÔNG:
 * - INSERT
 * - UPDATE
 * - DELETE
 * - migrate
 * - promote memory
 * - mutate identity
 */
export async function loadMayMindReadOnly(
  actorId: string,
): Promise<SovereignReadResult> {
  const sovereign = await loadSovereignMindSnapshot(
    actorId,
    MAYMAY_ENTITY_ID,
  );

  if (sovereignReady(sovereign)) {
    return {
      source: "sovereign",
      entityId: MAYMAY_ENTITY_ID,
      actorId,
      snapshot: sovereign,
    };
  }

  const legacy = await loadLegacyMindSnapshot(actorId);

  if (legacy) {
    return {
      source: "legacy",
      entityId: MAYMAY_ENTITY_ID,
      actorId,
      snapshot: legacy,
    };
  }

  return {
    source: "empty",
    entityId: MAYMAY_ENTITY_ID,
    actorId,
    snapshot: null,
  };
}