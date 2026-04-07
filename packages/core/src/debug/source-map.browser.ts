/**
 * Browser stub for source-map resolution.
 *
 * Source maps are not resolved in the browser — all functions pass through
 * their inputs unchanged.
 */

import type { SourceLocation } from "../devtools/devtools-protocol.js";

export function loadSourceMapSupport() {
  // no-op in browser
}

export function getRealPath(fileName: string): string {
  return fileName;
}

export function resolveSourceMap(
  fileName: string,
  line: number,
  col: number,
): { fileName: string; line: number; col: number } {
  return { fileName, line, col };
}

export function resolveComponentSource(
  source: SourceLocation | undefined,
): SourceLocation | undefined {
  return source;
}
