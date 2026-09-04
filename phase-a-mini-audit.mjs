import { Client } from "pg";

const tables = [
  "may_state",
  "persona_versions",
  "memory_nodes",
  "memory_edges",
  "memory_events",
  "opinions",
  "relationship_state",
  "self_models",
  "autonomous_state",
  "reflection_entries",
  "self_observation_signals",
  "evolution_runs",
  "heartbeat_runs",
  "proactive_messages",
  "conversation_messages"
];

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await db.connect();

try {
  await db.query("BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");

  console.log("\n=== MAYMAY V12 PHASE A AUDIT ===\n");

  for (const table of tables) {
    const exists = await db.query(
      `SELECT to_regclass($1) AS name`,
      [`public.${table}`]
    );

    if (!exists.rows[0]?.name) {
      console.log(`${table}: MISSING`);
      continue;
    }

    const count = await db.query(
      `SELECT COUNT(*)::int AS count FROM "${table}"`
    );

    console.log(`${table}: ${count.rows[0].count}`);
  }

  const actors = await db.query(`
    SELECT
      actor_id,
      revision,
      last_turn_at
    FROM may_state
    ORDER BY last_turn_at DESC NULLS LAST
  `);

  console.log("\n=== ACTORS ===");
  console.table(actors.rows);

  console.log("\nREAD ONLY — DB KHÔNG BỊ THAY ĐỔI.");

  await db.query("ROLLBACK");
} finally {
  await db.end();
}
