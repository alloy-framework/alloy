/**
 * Browser stub for trace database initialization.
 *
 * Replaces `trace-db.ts` in browser builds. Returns null so that
 * all trace-writer functions (which guard on `if (!db) return`) become no-ops.
 */

export type DatabaseSync = null;

export async function openTraceDatabase(_path: string): Promise<null> {
  return null;
}
