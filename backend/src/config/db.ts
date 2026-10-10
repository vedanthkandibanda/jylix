import { Pool } from "pg";

import { env } from "./env.js";

export const db = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

db.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export const query = async <
  T extends import("pg").QueryResultRow = import("pg").QueryResultRow
>(
  text: string,
  values?: unknown[],
) => {
  return db.query<T>(text, values);
};