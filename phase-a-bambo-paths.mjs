import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function findBambo(value, path = "$", results = []) {
  if (typeof value === "string") {
    if (value.toLowerCase().includes("bambo")) {
      results.push({ path, value });
    }
    return results;
  }

  if (Array.isArray(value)) {
    value.forEach((v, i) => findBambo(v, `${path}[${i}]`, results));
    return results;
  }

  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      findBambo(v, `${path}.${k}`, results);
    }
  }

  return results;
}

await db.connect();

try {
  await db.query(
    "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY"
  );

  const convo = await db.query(`
    SELECT id, role, text, created_at
    FROM conversation_messages
    WHERE text ILIKE '%bambo%'
    ORDER BY created_at ASC
  `);

  const auto = await db.query(`
    SELECT actor_id, state
    FROM autonomous_state
    WHERE state::text ILIKE '%bambo%'
  `);

  console.log("\n=== CONVERSATION BAMBO ===");
  console.table(convo.rows);

  console.log("\n=== AUTONOMOUS BAMBO PATHS ===");

  for (const row of auto.rows) {
    const hits = findBambo(row.state);
    console.dir(hits, { depth: null });
  }

  await db.query("ROLLBACK");
} finally {
  await db.end();
}
