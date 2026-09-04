import fs from "node:fs/promises";
import path from "node:path";
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

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = path.join("backups", "v12-db-" + stamp);

await fs.mkdir(dir, { recursive: true });
await db.connect();

try {
  await db.query(
    "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY"
  );

  const manifest = {};

  for (const table of tables) {
    const exists = await db.query(
      `SELECT to_regclass($1) AS name`,
      [`public.${table}`]
    );

    if (!exists.rows[0]?.name) {
      manifest[table] = { exists: false, rows: 0 };
      continue;
    }

    const result = await db.query(`SELECT * FROM "${table}"`);

    await fs.writeFile(
      path.join(dir, `${table}.json`),
      JSON.stringify(result.rows, null, 2),
      "utf8"
    );

    manifest[table] = {
      exists: true,
      rows: result.rows.length
    };
  }

  await fs.writeFile(
    path.join(dir, "manifest.json"),
    JSON.stringify({
      createdAt: new Date().toISOString(),
      readOnly: true,
      tables: manifest
    }, null, 2),
    "utf8"
  );

  await db.query("ROLLBACK");

  console.log("\nFULL_V12_SNAPSHOT_OK");
  console.log("Folder:", path.resolve(dir));
  console.table(manifest);
  console.log("DB READ ONLY - KHONG CO DU LIEU BI SUA");
} finally {
  await db.end();
}
