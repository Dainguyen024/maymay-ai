import { NextResponse } from "next/server";
import { activeActorIds } from "@/lib/maymay/repository";
import { runHeartbeatForActor } from "@/lib/maymay/autonomy";

function authorized(request: Request) {
  const secret = process.env.MAYMAY_CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const actorIds = await activeActorIds(Number(process.env.MAYMAY_HEARTBEAT_BATCH ?? 8));
  const results = [];
  for (const actorId of actorIds) {
    try { results.push(await runHeartbeatForActor(actorId)); }
    catch (error) { console.error("MayMay heartbeat actor error", actorId, error); }
  }
  return NextResponse.json({ ok: true, processed: results.length, results });
}
