import { loadEnvConfig } from "@next/env";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const projectRoot = path.resolve(currentDir, "..");
const migrationsDir = path.join(projectRoot, "migrations");

loadEnvConfig(projectRoot);

const connectionString =
  process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;

if (!connectionString) {
  console.error("MISSING_DATABASE_URL");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: 1,
  ssl: { rejectUnauthorized: false },
});

async function ensureMigrationTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAppliedMigrations(client) {
  const result = await client.query(
    "SELECT filename FROM schema_migrations ORDER BY filename ASC",
  );
  return new Set(result.rows.map((row) => row.filename));
}

async function getMigrationFiles() {
  const entries = await readdir(migrationsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

async function applyMigration(client, filename) {
  const fullPath = path.join(migrationsDir, filename);
  const sql = await readFile(fullPath, "utf8");

  await client.query("BEGIN");
  try {
    await client.query(sql);
    await client.query(
      "INSERT INTO schema_migrations (filename) VALUES ($1)",
      [filename],
    );
    await client.query("COMMIT");
    console.log(`applied ${filename}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function main() {
  const client = await pool.connect();

  try {
    await ensureMigrationTable(client);
    const applied = await getAppliedMigrations(client);
    const files = await getMigrationFiles();

    for (const filename of files) {
      if (applied.has(filename)) {
        console.log(`skip ${filename}`);
        continue;
      }

      await applyMigration(client, filename);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("migration_failed");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
