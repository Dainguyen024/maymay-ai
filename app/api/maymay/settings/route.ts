import { NextResponse } from "next/server";
import { actorIdentity, loadRuntimeBundle, saveAutonomousState } from "@/lib/maymay/repository";
import { sanitizeAutonomousState } from "@/lib/maymay/evolution";

export async function GET(request: Request) {
  const identity = actorIdentity(request);
  const bundle = await loadRuntimeBundle(identity.actorId);
  const response = NextResponse.json({
    proactiveEnabled: bundle.autonomous.proactiveEnabled,
    timeZone: bundle.autonomous.timeZone,
    quietHours: bundle.autonomous.quietHours,
  });
  if (identity.setCookie) response.headers.append("Set-Cookie", identity.setCookie);
  return response;
}

export async function POST(request: Request) {
  const identity = actorIdentity(request);
  const bundle = await loadRuntimeBundle(identity.actorId);
  const body = await request.json() as { proactiveEnabled?: boolean; timeZone?: string; quietHours?: { start?: string; end?: string } };
  const next = sanitizeAutonomousState({
    ...bundle.autonomous,
    proactiveEnabled: body.proactiveEnabled ?? bundle.autonomous.proactiveEnabled,
    timeZone: body.timeZone ?? bundle.autonomous.timeZone,
    quietHours: {
      start: body.quietHours?.start ?? bundle.autonomous.quietHours.start,
      end: body.quietHours?.end ?? bundle.autonomous.quietHours.end,
    },
  });
  await saveAutonomousState(identity.actorId, next);
  const response = NextResponse.json({
    proactiveEnabled: next.proactiveEnabled,
    timeZone: next.timeZone,
    quietHours: next.quietHours,
  });
  if (identity.setCookie) response.headers.append("Set-Cookie", identity.setCookie);
  return response;
}
