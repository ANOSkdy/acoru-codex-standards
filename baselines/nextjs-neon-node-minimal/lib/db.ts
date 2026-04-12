import "server-only";

import { Pool, type QueryResult, type QueryResultRow } from "pg";

declare global {
  var __baselinePgPool: Pool | undefined;
}

export class DatabaseConfigError extends Error {
  code = "MISSING_DATABASE_URL" as const;

  constructor() {
    super("Database connection string is not configured.");
    this.name = "DatabaseConfigError";
  }
}

export function getDatabaseUrl(): string | null {
  return process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;
}

export function hasDatabaseUrl(): boolean {
  return getDatabaseUrl() !== null;
}

function getPool(): Pool {
  const existingPool = globalThis.__baselinePgPool;

  if (existingPool) {
    return existingPool;
  }

  const connectionString = getDatabaseUrl();

  if (!connectionString) {
    throw new DatabaseConfigError();
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    ssl: { rejectUnauthorized: false },
  });

  globalThis.__baselinePgPool = pool;
  return pool;
}

export async function query<T extends QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const pool = getPool();
  return pool.query<T>(text, params);
}

export async function closePool(): Promise<void> {
  if (!globalThis.__baselinePgPool) {
    return;
  }

  await globalThis.__baselinePgPool.end();
  globalThis.__baselinePgPool = undefined;
}
