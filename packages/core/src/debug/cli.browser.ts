/**
 * Browser stub for CLI debug utilities.
 *
 * Replaces `cli.ts` in browser builds so that `cli-table3` and
 * `picocolors` (Node-only packages) are never imported.
 * All functions are no-ops since CLI debugging is not relevant in browsers.
 */

export function debugStack(): void {}

export function debugContext(): void {}

export function debugTree(): void {}

export function debugWatch(): void {}

export function debugRender(): void {}
