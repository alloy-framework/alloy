/**
 * Shared source-map resolution utilities.
 *
 * Used by both effect source capture (effects.ts) and component source
 * resolution (render.ts) to convert file paths and resolve source maps.
 */

import type { SourceLocation } from "../devtools/devtools-protocol.js";

// Lazily loaded findSourceMap from node:module
let findSourceMap:
  | ((path: string) =>
      | {
          findEntry: (
            line: number,
            col: number,
          ) =>
            | {
                originalSource: string;
                originalLine: number;
                originalColumn: number;
              }
            | undefined;
        }
      | undefined)
  | undefined;
let loaded = false;
let realpathSync: ((path: string) => string) | undefined;
let fileURLToPath: ((url: string | URL) => string) | undefined;
const realpathCache = new Map<string, string>();

export function loadSourceMapSupport() {
  if (loaded) return;
  loaded = true;
  try {
    const mod = process.getBuiltinModule?.("node:module") as
      | typeof import("node:module")
      | undefined;
    if (mod && typeof mod.findSourceMap === "function") {
      findSourceMap = mod.findSourceMap as typeof findSourceMap;
    }
  } catch {
    // not available
  }
  try {
    const fs = process.getBuiltinModule?.("node:fs") as
      | typeof import("node:fs")
      | undefined;
    if (fs) {
      realpathSync = fs.realpathSync;
    }
  } catch {
    // not available
  }
  try {
    const url = process.getBuiltinModule?.("node:url") as
      | typeof import("node:url")
      | undefined;
    if (url) {
      fileURLToPath = url.fileURLToPath;
    }
  } catch {
    // not available
  }
}

export function getRealPath(fileName: string): string {
  if (!realpathSync) return fileName;
  let real = realpathCache.get(fileName);
  if (real === undefined) {
    try {
      real = realpathSync(fileName);
    } catch {
      real = fileName;
    }
    realpathCache.set(fileName, real);
  }
  return real;
}

export function resolveSourceMap(
  fileName: string,
  line: number,
  col: number,
): { fileName: string; line: number; col: number } {
  if (!findSourceMap) return { fileName, line, col };
  // pnpm uses symlinks; findSourceMap only matches the real path
  const real = getRealPath(fileName);
  const map = findSourceMap(real);
  if (!map) return { fileName, line, col };
  const entry = map.findEntry(line - 1, col - 1);
  if (!entry) return { fileName, line, col };
  return {
    fileName: entry.originalSource,
    line: entry.originalLine + 1,
    col: entry.originalColumn + 1,
  };
}

function stripFileUrl(path: string): string {
  if (!path.startsWith("file://")) return path;
  if (fileURLToPath) return fileURLToPath(path);
  return new URL(path).pathname;
}

/**
 * Resolve a component source location. Handles:
 * - `file://` URLs from import.meta.url (converts to file path)
 * - Source map resolution (maps compiled .js to original .tsx)
 * - Plain absolute paths (legacy format, returned as-is)
 */
export function resolveComponentSource(
  source: SourceLocation | undefined,
): SourceLocation | undefined {
  if (!source?.fileName) return source;
  loadSourceMapSupport();

  let fileName = stripFileUrl(source.fileName);

  if (source.lineNumber != null && source.columnNumber != null) {
    // Resolve through source maps to get the original .tsx path
    const resolved = resolveSourceMap(
      fileName,
      source.lineNumber,
      source.columnNumber,
    );
    return {
      fileName: stripFileUrl(resolved.fileName),
      lineNumber: resolved.line,
      columnNumber: resolved.col,
    };
  }

  return { ...source, fileName };
}
