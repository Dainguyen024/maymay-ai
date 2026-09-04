import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const targets = [
  ["conversation_messages", "text"],
  ["may_state", "state"],
  ["persona_versions", "persona"],
  ["memory_nodes", "node"],
  ["memory_events", "payload"],
  ["opinions", "opinion"],
  ["relationship_state", "relationship"],
  ["self_models", "self_model"],
  ["autonomous_state", "state"],
  ["reflection_entries", "entry"],
  ["self_observation_signals", "signal"],
  ["evolution_runs", "proposal"],
  ["evolution_runs", "audit"],
  ["heartbeat_runs", "pressure"],
  ["heartbeat_runs", "result"],
  ["proactive_messages", "message"]
];

await db.connect();

try {
  await db.query("BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");

  const hits = [];

  for (const [table, column] of targets) {
    const r = await db.query(
      `SELECT actor_id, COUNT(*)::int AS matches
       FROM "${table}"
       WHERE COALESCE("${column}"::text, '') ILIKE $1
       GROUP BY actor_id`,
      ["%bambo%"]
    );

    for (const row of r.rows) {
      hits.push({
        table,
        column,
        actor_id: row.actor_id,
        matches: row.matches
      });
    }
  }

  console.log("\n=== BAMBO SEARCH ===");
  if (hits.length) console.table(hits);
  else console.log("NO_BAMBO_FOUND_IN_V12_DB");

  await db.query("ROLLBACK");
} finally {
  await db.end();
}
