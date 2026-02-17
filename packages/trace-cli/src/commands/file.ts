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

  // Find all text nodes under this file's render node subtree that contain the substring
  const textNodes = db.prepare(`
    WITH RECURSIVE desc_nodes(id) AS (
      SELECT ?
      UNION ALL
      SELECT rn.id FROM render_nodes rn JOIN desc_nodes d ON rn.parent_id = d.id
    )
    SELECT rn.id, rn.value, rn.parent_id
    FROM render_nodes rn
    JOIN desc_nodes d ON rn.id = d.id
    WHERE rn.kind = 'text' AND rn.value LIKE ?
  `).all(file.render_node_id, `%${substring}%`) as any[];

  if (textNodes.length === 0) {
    console.log(`No text matching "${substring}" found in ${file.path}`);
    return;
  }

  if (opts.json) {
    for (const textNode of textNodes) {
      const stack = buildComponentStack(db, textNode.id);
      console.log(JSON.stringify({ textNodeId: textNode.id, text: textNode.value, stack }));
    }
    return;
  }

  console.log(`Found ${textNodes.length} text node(s) matching "${substring}" in ${file.path}\n`);

  for (let i = 0; i < textNodes.length; i++) {
    const textNode = textNodes[i];
    const preview = textNode.value.length > 80 ? textNode.value.slice(0, 80) + "…" : textNode.value;
    console.log(`Match ${i + 1}: text node #${textNode.id}`);
    console.log(`  Text: ${JSON.stringify(preview)}`);

    const stack = buildComponentStack(db, textNode.id);
    if (stack.length > 0) {
      const json = JSON.stringify(
        stack.map((c: any) => ({
          name: c.name ?? "(unnamed)",
          source: c.source_file
            ? { fileName: c.source_file, lineNumber: c.source_line, columnNumber: c.source_col }
            : undefined,
        })),
      );
      const formatted = formatComponentStack(json);
      if (formatted) {
        console.log("  Component stack (innermost first):");
        console.log(formatted);
      }
    } else {
      console.log("  (no component ancestors)");
    }
    console.log();
  }
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
