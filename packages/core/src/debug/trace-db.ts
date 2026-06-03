/**
 * Database initialization for the trace writer.
 *
 * Isolates the `node:sqlite` and `node:fs` dependencies so that
 * `trace-writer.ts` itself remains browser-safe (all functions no-op
 * when db is null). In browser builds this module is replaced by
 * `trace-db.browser.ts` which always returns null.
 */
import type { DatabaseSync as DatabaseSyncType } from "node:sqlite";

export type { DatabaseSyncType as DatabaseSync };

/**
 * Opens a fresh SQLite database at the given path, removing any existing file.
 * Returns the opened database instance.
 */
export async function openTraceDatabase(
  path: string,
): Promise<DatabaseSyncType> {
  const { DatabaseSync } = await import("node:sqlite");
  const fs = await import("node:fs");
  // Remove existing trace file so each run starts fresh
  try {
    fs.unlinkSync(path);
  } catch {
    /* ignore missing */
  }
  try {
    fs.unlinkSync(path + "-wal");
  } catch {
    /* ignore missing */
  }
  try {
    fs.unlinkSync(path + "-shm");
  } catch {
    /* ignore missing */
  }
  const db = new DatabaseSync(path);
  db.exec("PRAGMA journal_mode=WAL");
  db.exec("PRAGMA synchronous=NORMAL");
  return db;
}
