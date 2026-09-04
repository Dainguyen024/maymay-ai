import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

await db.connect();

const r = await db.query(`
  SELECT
    name,
    default_version,
    installed_version
  FROM pg_available_extensions
  WHERE name = 'vector'
`);

console.table(r.rows);

await db.end();
