import { relative } from "node:path";
import type { DatabaseSync } from "node:sqlite";

export interface Opts {
  json?: boolean;
  limit?: number;
  depth?: number;
  sourceFile?: string;
  outputFile?: string;
  component?: string;
  name?: string;
  type?: string;
  minTrackers?: number;
  unused?: boolean;
  framework?: boolean;
  allFrames?: boolean;
}

export type Db = DatabaseSync;

/**
 * Returns a SQL subquery that finds all context_ids belonging to an output file,
 * by walking the context ownership chain from the source file's render node.
 */
export function outputFileContextsCte(): string {
  return `(
    WITH RECURSIVE file_contexts(cid) AS (
      SELECT rn.context_id
      FROM output_files of2
      JOIN render_nodes rn ON rn.id = of2.render_node_id
      WHERE of2.path LIKE ? AND rn.context_id IS NOT NULL
      UNION ALL
      SELECT e.context_id
      FROM effects e
      JOIN file_contexts fc ON e.owner_context_id = fc.cid
      WHERE e.context_id IS NOT NULL
    )
    SELECT cid FROM file_contexts
  )`;
}

/**
 * Returns a SQL subquery that finds all render_node ids that are descendants
 * of an output file's render node in the render tree.
 */
export function outputFileRenderNodesCte(): string {
  return `(
    WITH RECURSIVE desc_nodes(id) AS (
      SELECT render_node_id FROM output_files WHERE path LIKE ?
      UNION ALL
      SELECT rn.id FROM render_nodes rn JOIN desc_nodes d ON rn.parent_id = d.id
    )
    SELECT id FROM desc_nodes
  )`;
}

/**
 * Convert an absolute path to a display-friendly relative path from cwd.
 * Falls back to the original path if it can't be relativized.
 */
export function shortPath(p: string): string {
  const rel = relative(process.cwd(), p);
  // If relative path starts with too many '../', it's not useful — but still
  // shorter than the absolute path in most cases. Return it as-is.
  return rel || p;
}

export function requireId(args: string[], usage: string): number {
  if (!args[0]) { console.error(usage); process.exit(1); }
  const id = parseInt(args[0], 10);
  if (isNaN(id)) { console.error(usage); process.exit(1); }
  return id;
}

export function printPaginationFooter(
  db: Db,
  countSql: string,
  params: any[],
  limit: number,
  shown: number,
) {
  if (shown >= limit) {
    const total = (db.prepare(countSql).get(...params) as any)?.n;
    if (total > limit) {
      console.log(`\n  (showing ${limit} of ${total}, use --limit to show more)`);
    }
  }
}

interface StackEntry {
  name: string;
  renderNodeId?: number;
  source?: { fileName?: string; lineNumber?: number; columnNumber?: number };
}

/**
 * A frame is "external" (library/framework) if its source is inside
 * node_modules. Frames with no source are kept (they may be user components
 * without source annotations). Matches the devtools filtering approach.
 */
function isExternalFrame(entry: StackEntry): boolean {
  if (!entry.source?.fileName) return false;
  return entry.source.fileName.includes("/node_modules/");
}

// ANSI color helpers
const bold = (s: string) => `\x1b[1m${s}\x1b[22m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[22m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[39m`;

function formatEntry(entry: StackEntry): string {
  const id = entry.renderNodeId != null ? dim(` #${entry.renderNodeId}`) : "";
  const loc = entry.source;
  if (loc?.fileName) {
    const parts = [shortPath(loc.fileName)];
    if (loc.lineNumber != null) parts.push(String(loc.lineNumber));
    if (loc.columnNumber != null) parts.push(String(loc.columnNumber));
    return `    at ${bold(entry.name)}${id} ${cyan(`(${parts.join(":")})`)}`;
  }
  return `    at ${bold(entry.name)}${id}`;
}

/**
 * Formats a JSON component_stack string as a stack-trace-style string.
 * When allFrames is false (default), only user frames are shown and a
 * hint about hidden library frames is appended.
 */
export function formatComponentStack(json: string, allFrames = false): string | undefined {
  try {
    const stack = JSON.parse(json) as StackEntry[];
    if (allFrames) {
      return stack.map(formatEntry).join("\n");
    }

    const userFrames = stack.filter((e) => !isExternalFrame(e));
    const hiddenCount = stack.length - userFrames.length;
    const lines = userFrames.map(formatEntry);

    if (hiddenCount > 0 && lines.length > 0) {
      lines.push(dim(`    ... ${hiddenCount} framework frames hidden (use --all-frames to show)`));
    }

    return lines.length > 0 ? lines.join("\n") : undefined;
  } catch {
    return undefined;
  }
}
