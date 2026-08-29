import { createHash } from "node:crypto";

export type CachedAudio = {
  bytes: Uint8Array;
  contentType: string;
};

type CacheEntry = CachedAudio & {
  expiresAt: number;
};

type TtsRuntimeState = {
  active: number;
  cache: Map<string, CacheEntry>;
};

const runtimeGlobal = globalThis as typeof globalThis & {
  __maymayTtsRuntime?: TtsRuntimeState;
};

const runtime =
  runtimeGlobal.__maymayTtsRuntime ??
  (runtimeGlobal.__maymayTtsRuntime = {
    active: 0,
    cache: new Map<string, CacheEntry>(),
  });

export function acquireTtsSlot(maximum = 2) {
  if (runtime.active >= maximum) return null;
  runtime.active += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    runtime.active = Math.max(0, runtime.active - 1);
  };
}

export function ttsCacheKey(parts: string[]) {
  return createHash("sha256").update(parts.join("\u0000")).digest("hex");
}

export function getCachedAudio(key: string): CachedAudio | null {
  const item = runtime.cache.get(key);
  if (!item) return null;
  if (item.expiresAt <= Date.now()) {
    runtime.cache.delete(key);
    return null;
  }
  return { bytes: item.bytes, contentType: item.contentType };
}

export function setCachedAudio(
  key: string,
  audio: CachedAudio,
  ttlMs = 10 * 60_000,
) {
  const now = Date.now();

  if (runtime.cache.size >= 24) {
    for (const [candidate, item] of runtime.cache) {
      if (item.expiresAt <= now || runtime.cache.size >= 20) {
        runtime.cache.delete(candidate);
      }
    }
  }

  runtime.cache.set(key, {
    ...audio,
    expiresAt: now + ttlMs,
  });
}

export function isMp3(bytes: Uint8Array) {
  if (bytes.length < 1_000 || bytes.length > 15 * 1024 * 1024) return false;

  const hasId3 =
    bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
  const hasFrameSync =
    bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;

  return hasId3 || hasFrameSync;
}

