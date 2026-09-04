import { Client } from "pg";

const c = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await c.connect();

const r = await c.query(`
  SELECT tablename
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename LIKE 'sv_%'
  ORDER BY tablename
`);

console.log("SV_TABLES=" + r.rowCount);
console.table(r.rows);

await c.end();
