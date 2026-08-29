import { Pool, type PoolClient } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __maymayPgPool: Pool | undefined;
}

export function dbPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is missing");
  if (!global.__maymayPgPool) {
    global.__maymayPgPool = new Pool({
      connectionString,
      max: Number(process.env.PG_POOL_MAX ?? 5),
      ssl: process.env.PG_SSL === "false" ? false : { rejectUnauthorized: false },
    });
  }
  return global.__maymayPgPool;
}

export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>) {
  const client = await dbPool().connect();
  try {
    await client.query("BEGIN");
    const value = await fn(client);
    await client.query("COMMIT");
    return value;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
