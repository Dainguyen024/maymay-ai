import { NextResponse } from "next/server";
import { actorIdentity, getQueuedProactiveMessages } from "@/lib/maymay/repository";

export async function GET(request: Request) {
  const identity = actorIdentity(request);
  const messages = await getQueuedProactiveMessages(identity.actorId);
  const response = NextResponse.json({ messages });
  if (identity.setCookie) response.headers.append("Set-Cookie", identity.setCookie);
  return response;
}
