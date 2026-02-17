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

export function shortPath(p: string): string {
  return p.replace(/.*\/packages\//, "");
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
