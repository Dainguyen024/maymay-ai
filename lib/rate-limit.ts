type Bucket = {
  count: number;
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  __maymayRateLimit?: Map<string, Bucket>;
};

const buckets =
  globalRateLimit.__maymayRateLimit ??
  (globalRateLimit.__maymayRateLimit = new Map<string, Bucket>());

function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const identity = forwarded || realIp || "unknown";
  return `${scope}:${identity}`;
}

export function checkRateLimit(
  request: Request,
  scope: string,
  maximum: number,
  windowMs = 60_000,
) {
  const now = Date.now();
  const key = clientKey(request, scope);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true as const, remaining: maximum - 1, retryAfter: 0 };
  }

  if (existing.count >= maximum) {
    return {
      allowed: false as const,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
    };
  }

  existing.count += 1;

  // Dọn nhẹ để một tiến trình chạy lâu không giữ bucket hết hạn mãi mãi.
  if (buckets.size > 2_000) {
    for (const [candidate, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(candidate);
      if (buckets.size <= 1_500) break;
    }
  }

  return {
    allowed: true as const,
    remaining: Math.max(0, maximum - existing.count),
    retryAfter: 0,
  };
}

