import { NextResponse } from "next/server";

import { actorIdentity } from "@/lib/maymay/repository";
import { loadMayMindReadOnly } from "@/lib/maymay/sovereign/read-path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.MAYMAY_CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "MAYMAY_CRON_SECRET chưa được cấu hình." },
      { status: 503 },
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { actorId } = actorIdentity(request);

  const result = await loadMayMindReadOnly(actorId);

  return NextResponse.json({
    ok: true,
    readOnly: true,

    entityId: result.entityId,
    actorId: result.actorId,

    source: result.source,

    snapshotFound: result.snapshot !== null,

    expectedNow:
      result.source === "legacy"
        ? "PASS_PHASE_C"
        : result.source === "sovereign"
          ? "SOVEREIGN_ALREADY_READY"
          : "NO_MIND_DATA",
  });
}