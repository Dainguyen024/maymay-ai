import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await db.connect();

try {
  await db.query("BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");

  const convo = await db.query(`
    SELECT id, actor_id, role, text, created_at
    FROM conversation_messages
    WHERE text ILIKE '%bambo%'
    ORDER BY created_at ASC
  `);

  const auto = await db.query(`
    SELECT actor_id, state
    FROM autonomous_state
    WHERE state::text ILIKE '%bambo%'
  `);

  const signals = await db.query(`
    SELECT signal_id, actor_id, signal, processed, created_at
    FROM self_observation_signals
    WHERE signal::text ILIKE '%bambo%'
    ORDER BY created_at ASC
  `);

  console.log("\n=== BAMBO CONVERSATION ===");
  console.dir(convo.rows, { depth: null });

  console.log("\n=== BAMBO AUTONOMOUS STATE ===");
  console.dir(auto.rows, { depth: null });

  console.log("\n=== BAMBO SELF OBSERVATION ===");
  console.dir(signals.rows, { depth: null });

  await db.query("ROLLBACK");
} finally {
  await db.end();
}
