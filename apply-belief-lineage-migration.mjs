import fs from "node:fs/promises";
import { Client } from "pg";

const sql = (
  await fs.readFile(
    "db/migrations/003_maymay_belief_lineage_v13.sql",
    "utf8",
  )
).replace(/^\uFEFF/, "");

if (!sql.trim()) {
  throw new Error(
    "BELIEF_LINEAGE_MIGRATION_EMPTY",
  );
}

const db = new Client({
  connectionString:
    process.env.DATABASE_URL,

  ssl:
    process.env.PG_SSL === "false"
      ? false
      : {
          rejectUnauthorized: false,
        },
});

await db.connect();

try {
  await db.query(sql);

  console.log(
    "BELIEF_LINEAGE_V13_APPLIED",
  );
} finally {
  await db.end();
}