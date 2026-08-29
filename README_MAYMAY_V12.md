# MayMay v12 — Persistent Autonomous Self-Model

This package upgrades the frozen v11 architecture without changing its core principles.
It does **not** claim to create scientifically verified consciousness. It implements a
persistent autonomous agent with a self-model, metacognition, internal goals,
structured reflection, bounded self-evolution, and a server-authoritative runtime.

## Included

- `types/maymay.ts`
  - fixed core + evolved persona
  - subjective memory graph + append-only events
  - opinion engine
  - 8-axis relationship state
  - agency + cognitive metadata
  - speech plan separated from UI text
  - SelfModel / epistemic self / internal conflicts
  - autonomous drives + goals + structured reflection
- `lib/maymay/evolution.ts`
  - memory activation (no random trigger)
  - bounded persona shift `MAX_TRAIT_SHIFT = 0.06`
  - 3–5-version drift guard
  - relationship/state/memory/opinion application
  - self-model and goal validation
  - autonomous-drive updates
- `lib/maymay/prompt.ts`
  - token-budgeted memory/opinion/self-model runtime prompt
- `lib/maymay/database.ts` + `repository.ts`
  - PostgreSQL server-authoritative persistence
  - optimistic runtime revision check
  - no client `runtimeSnapshot`
- `lib/maymay/autonomy.ts`
  - deterministic heartbeat pressure
  - mostly-NOOP heartbeat
  - structured reflection worker
  - proactive-message gating
  - max 2 proactive messages/day, minimum 4h cooldown, quiet hours
- `app/api/chat/route.ts`
  - Gemini JSON envelope, temperature 0.9 / topP 0.95
  - UI text and TTS speech plan separated
  - internal cognitive/self data never returned to browser
- `app/api/internal/heartbeat/route.ts`
  - protected by `MAYMAY_CRON_SECRET`
- `app/api/maymay/proactive/route.ts`
  - browser pulls queued proactive messages
- `app/api/maymay/settings/route.ts`
  - opt-in proactive mode + timezone + quiet hours
- `db/migrations/001_maymay_v12.sql`
- `lib/maymay/client.ts`
  - frontend-safe API helpers

## Install

```bash
npm.cmd i pg
npm.cmd i -D @types/pg
```

## Database

Create a PostgreSQL database, set `DATABASE_URL`, then run:

```bash
psql "%DATABASE_URL%" -f db/migrations/001_maymay_v12.sql
```

Or paste the migration SQL into your provider's SQL console.

## Environment

Copy the variables from `.env.example` into Render Environment variables.
`MAYMAY_CRON_SECRET` should be a long random secret.

## Frontend migration

Old v11 client request:

```ts
body: JSON.stringify({ messages, state, runtimeSnapshot })
```

v12 request:

```ts
body: JSON.stringify({ message: text })
```

The browser must stop persisting/sending May's internal state. Use
`sendMayMessage()` from `lib/maymay/client.ts` if convenient.

The response still includes compatibility fields used by the existing UI:
`text`, `segments`, `speechText`, `speechSegments`, `emotion`, `delivery`, and
`uiMood`. It intentionally omits `state`, `runtimeSnapshot`, `cognitiveState`,
memories, opinions, self-model, drives, and reflection data.

## Heartbeat

Schedule an external cron/Render Cron Job to POST to:

```text
/api/internal/heartbeat
```

with header:

```text
Authorization: Bearer <MAYMAY_CRON_SECRET>
```

A cadence around 15–30 minutes is enough. The heartbeat itself is deterministic
and usually returns `NOOP`; it does not call the model just to simulate activity.

## Proactive messages

Proactive messaging is **off by default**. Opt in through:

```ts
await updateMayAutonomySettings({
  proactiveEnabled: true,
  timeZone: "Asia/Ho_Chi_Minh",
  quietHours: { start: "22:30", end: "08:00" },
});
```

When the app is open, poll `/api/maymay/proactive` (for example every 60–90s)
and append returned messages to the chat UI. For real push notifications outside
the open browser, add Web Push later; the autonomous engine already queues the
messages server-side.

## Important invariants

- Core safety/output rules cannot self-rewrite.
- No free-form chain-of-thought/private diary is stored.
- Reflection stores structured observations, interpretations, emotional impact,
  lessons, adjustments, and evidence IDs.
- A belief such as "I am conscious" can only exist as a tentative/uncertain
  self-belief; it cannot override the fixed epistemic boundary.
- Internal goals cannot create dependency/manipulation/exclusivity objectives.
- `DISENGAGE` is conversational only; it never locks the app.
- Memory resurfacing uses activation/relevance/cooldown, not a random 3–5% roll.
- All persona evolution remains bounded, versioned, auditable, and reversible.
