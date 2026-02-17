import { type Db, type Opts, shortPath, formatComponentStack } from "../types.js";

export function fileCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return fileList(db, opts);
    case "show":
      return fileShow(db, args[0], opts);
    case "search":
      return fileSearch(db, args[0], args.slice(1).join(" "), opts);
    default:
      console.error(`Unknown file subcommand: ${subcommand}
Usage: alloy-trace file <list|show|search> [args] [options]`);
      process.exit(1);
  }
}

function fileList(db: Db, opts: Opts) {
  const files = db
    .prepare("SELECT * FROM output_files ORDER BY seq")
    .all() as any[];

  if (opts.json) {
    for (const f of files) console.log(JSON.stringify(f));
    return;
  }
  if (files.length === 0) {
    console.log("No output files recorded.");
    return;
  }

  console.log(`${files.length} file(s) generated:\n`);
  for (const f of files) {
    const hasContent = f.content ? "✓" : "✗";
    console.log(
      `  ${f.path.padEnd(40)} (filetype: ${f.filetype}, render_node: ${f.render_node_id}) [content: ${hasContent}]`,
    );
  }
}

function fileShow(db: Db, path: string | undefined, opts: Opts) {
  if (!path) {
    console.error("Usage: alloy-trace file show <path>");
    process.exit(1);
  }
  const file = db
    .prepare(
      "SELECT * FROM output_files WHERE path = ? ORDER BY seq DESC LIMIT 1",
    )
    .get(path) as any;
  if (!file) {
    console.error(`No output file matching "${path}"`);
    process.exit(1);
  }
  if (opts.json) {
    console.log(JSON.stringify(file));
    return;
  }

  console.log(`── ${file.path} (${file.filetype}) ──`);
  console.log(file.content ?? "(no content recorded)");
}

function fileSearch(db: Db, path: string | undefined, substring: string | undefined, opts: Opts) {
  if (!path || !substring) {
    console.error("Usage: alloy-trace file search <path> <substring>");
    process.exit(1);
  }

  // Find the output file
  const file = db
    .prepare(
      "SELECT * FROM output_files WHERE path = ? OR path LIKE ? ORDER BY seq DESC LIMIT 1",
    )
    .get(path, `%${path}`) as any;
  if (!file) {
    console.error(`No output file matching "${path}"`);
    process.exit(1);
  }

  if (!file.content) {
    console.log(`No content recorded for ${file.path}`);
    return;
  }

  // Find all occurrences of substring in the file content
  const matches = findContentMatches(file.content, substring);
  if (matches.length === 0) {
    console.log(`No text matching "${substring}" found in ${file.path}`);
    return;
  }

  // Get all text nodes under this file's render subtree
  const allTextNodes = db.prepare(`
    WITH RECURSIVE desc_nodes(id) AS (
      SELECT ?
      UNION ALL
      SELECT rn.id FROM render_nodes rn JOIN desc_nodes d ON rn.parent_id = d.id
    )
    SELECT rn.id, rn.value, rn.parent_id, rn.seq
    FROM render_nodes rn
    JOIN desc_nodes d ON rn.id = d.id
    WHERE rn.kind = 'text' AND rn.value IS NOT NULL
    ORDER BY rn.seq
  `).all(file.render_node_id) as any[];

  if (opts.json) {
    for (const match of matches) {
      const relevant = findRelevantTextNodes(allTextNodes, substring);
      const stacks = relevant.map((tn: any) => ({
        textNodeId: tn.id,
        text: tn.value,
        stack: buildComponentStack(db, tn.id),
      }));
      console.log(JSON.stringify({ text: match.text, offset: match.start, nodes: stacks }));
    }
    return;
  }

  console.log(`Found ${matches.length} match(es) for "${substring}" in ${file.path}\n`);

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const context = getMatchContext(file.content, match.start, match.end);
    console.log(`Match ${i + 1}: offset ${match.start}`);
    console.log(`  ${context}`);

    // Find text nodes relevant to this match
    const relevant = findRelevantTextNodes(allTextNodes, substring);
    if (relevant.length > 0) {
      // Use the most specific (deepest) text node for the component stack
      const deepest = relevant[0];
      const stack = buildComponentStack(db, deepest.id);
      console.log(`  Text nodes: ${relevant.map((tn: any) => "#" + tn.id).join(", ")}`);
      if (stack.length > 0) {
        const formatted = formatComponentStack(
          JSON.stringify(
            stack.map((c: any) => ({
              name: c.name ?? "(unnamed)",
              source: c.source_file
                ? { fileName: c.source_file, lineNumber: c.source_line, columnNumber: c.source_col }
                : undefined,
            })),
          ),
        );
        if (formatted) {
          console.log("  Component stack (innermost first):");
          console.log(formatted);
        }
      }
    } else {
      console.log("  (could not map to text nodes)");
    }
    console.log();
  }
}

/**
 * Find text nodes whose values contain words from the search string.
 * Returns nodes sorted by specificity — longest matching value first.
 */
function findRelevantTextNodes(textNodes: any[], substring: string): any[] {
  // Split search string into non-whitespace tokens
  const tokens = substring.split(/\s+/).filter(Boolean);
  const matched = new Map<number, any>();

  for (const token of tokens) {
    for (const tn of textNodes) {
      if (tn.value.includes(token) && !matched.has(tn.id)) {
        matched.set(tn.id, tn);
      }
    }
  }

  // Sort by longest value first (more specific nodes)
  return [...matched.values()].sort(
    (a, b) => b.value.length - a.value.length,
  );
}

function buildComponentStack(db: Db, nodeId: number): any[] {
  const stack: any[] = [];
  let currentId: number | null = nodeId;

  while (currentId !== null) {
    const node = db
      .prepare("SELECT id, parent_id, kind, name, props, source_file, source_line, source_col FROM render_nodes WHERE id = ?")
      .get(currentId) as any;
    if (!node) break;
    if (node.kind === "component") {
      stack.push(node);
    }
    currentId = node.parent_id;
  }

  return stack;
}

function findContentMatches(content: string, substring: string): { start: number; end: number; text: string }[] {
  const matches: { start: number; end: number; text: string }[] = [];
  let pos = 0;
  while (true) {
    const idx = content.indexOf(substring, pos);
    if (idx === -1) break;
    matches.push({ start: idx, end: idx + substring.length, text: substring });
    pos = idx + 1;
  }
  return matches;
}

function getMatchContext(content: string, start: number, end: number): string {
  const lineStart = content.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = content.indexOf("\n", end);
  return content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
}
