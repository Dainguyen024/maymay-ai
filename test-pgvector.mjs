import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await db.connect();

try {
  await db.query("BEGIN");
  await db.query("CREATE EXTENSION IF NOT EXISTS vector");

  const r = await db.query(`
    SELECT extversion
    FROM pg_extension
    WHERE extname = 'vector'
  `);

  console.log("PGVECTOR_TEST_OK", r.rows);
  await db.query("ROLLBACK");
  console.log("ROLLBACK_OK - DB KHONG BI THAY DOI");
} finally {
  await db.end();
}
