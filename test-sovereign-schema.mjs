import fs from "node:fs/promises";
import { Client } from "pg";

const migrationPath =
  "db/migrations/003_maymay_belief_lineage_v13.sql";

let sql = (
  await fs.readFile(
    migrationPath,
    "utf8",
  )
).replace(/^\uFEFF/, "");

/*
 * Migration files may own their production transaction boundary.
 *
 * This runner owns a TEST transaction instead:
 *
 * BEGIN
 *   migration body
 * ROLLBACK
 *
 * Therefore remove only the migration's outer BEGIN/COMMIT
 * so a schema test can never intentionally commit.
 */
sql = sql
  .replace(
    /^\s*BEGIN\s*;\s*/i,
    "",
  )
  .replace(
    /\s*COMMIT\s*;\s*$/i,
    "",
  );

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

let transactionOpen = false;

try {
  await db.query("BEGIN");

  transactionOpen = true;

  await db.query(sql);

  await db.query("ROLLBACK");

  transactionOpen = false;

  console.log(
    "BELIEF_LINEAGE_V13_TEST_OK - DB KHONG BI THAY DOI",
  );
} catch (error) {
  if (transactionOpen) {
    try {
      await db.query("ROLLBACK");
    } catch {
      // Preserve the original migration error.
    }
  }

  throw error;
} finally {
  await db.end();
}