/**
 * Browser stub for CLI debug utilities.
 *
 * Replaces `cli.ts` in browser builds so that `cli-table3` (and its
 * transitive dependency on `@colors/colors` → `util` / `os`) is never
 * imported.  Every function is a no-op.
 */

export function debugStack(): void {
  // No-op in browser
}

export function debugContext(): void {
  // No-op in browser
}

export function debugTree(): void {
  // No-op in browser
}

export function debugWatch(): void {
  // No-op in browser
}

export function debugRender(): void {
  // No-op in browser
}
