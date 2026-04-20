import { DIFF_EQUAL, diff_match_patch } from "diff-match-patch";
import { type Db, type Opts, formatComponentStack } from "../types.js";

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

interface TextRange {
  fileStart: number;
  fileEnd: number;
  nodeId: number;
}

/**
 * Collect text nodes in DFS (output) order by walking the tree structure.
 * Children of each parent are ordered by seq, matching the render pipeline's
 * output order. This is critical because text nodes may be created out of
 * order (e.g. reactive references resolved later) but their position in the
 * tree reflects where they appear in the file.
 */
function collectTextNodesDfs(
  db: Db,
  rootId: number,
): { id: number; value: string }[] {
  // Load all descendant nodes
  const allNodes = db
    .prepare(
      `
    WITH RECURSIVE desc_nodes(id) AS (
      SELECT ?
      UNION ALL
      SELECT rn.id FROM render_nodes rn JOIN desc_nodes d ON rn.parent_id = d.id
    )
    SELECT rn.id, rn.kind, rn.value, rn.parent_id, rn.seq
    FROM render_nodes rn
    JOIN desc_nodes d ON rn.id = d.id
  `,
    )
    .all(rootId) as {
    id: number;
    kind: string;
    value: string | null;
    parent_id: number | null;
    seq: number;
  }[];

  // Build parent→children map, sorted by seq
  const childrenMap = new Map<number, typeof allNodes>();
  const nodeMap = new Map<number, (typeof allNodes)[0]>();
  for (const n of allNodes) {
    nodeMap.set(n.id, n);
    if (n.parent_id != null) {
      let children = childrenMap.get(n.parent_id);
      if (!children) {
        children = [];
        childrenMap.set(n.parent_id, children);
      }
      children.push(n);
    }
  }
  for (const children of childrenMap.values()) {
    children.sort((a, b) => a.seq - b.seq);
  }

  // DFS walk collecting text nodes
  const result: { id: number; value: string }[] = [];
  const stack: number[] = [rootId];
  while (stack.length > 0) {
    const id = stack.pop()!;
    const node = nodeMap.get(id);
    if (!node) continue;

    if (node.kind === "text" && node.value) {
      result.push({ id: node.id, value: node.value });
      continue;
    }

    const children = childrenMap.get(id);
    if (children) {
      // Push in reverse order so first child is popped first
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i].id);
      }
    }
  }

  return result;
}

/**
 * Build a mapping from file content offsets to text node IDs using the same
 * diff-match-patch approach as the devtools. Text nodes collected in DFS
 * (output) order differ from the file content by formatting whitespace; the
 * diff identifies equal segments and maps them between the two coordinate
 * systems.
 */
function buildFileTextRanges(
  db: Db,
  renderNodeId: number,
  fileContent: string,
): TextRange[] {
  const textNodes = collectTextNodesDfs(db, renderNodeId);

  if (textNodes.length === 0 || fileContent.length === 0) return [];

  // Build node spans in concatenated-text coordinate system
  const nodeSpans: { id: number; start: number; end: number }[] = [];
  let cursor = 0;
  for (const node of textNodes) {
    nodeSpans.push({
      id: node.id,
      start: cursor,
      end: cursor + node.value.length,
    });
    cursor += node.value.length;
  }

  const nodeText = textNodes.map((n) => n.value).join("");

  // Diff concatenated text vs file content to find equal segments
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(nodeText, fileContent);
  dmp.diff_cleanupSemantic(diffs);

  const equalSegments: {
    nodeStart: number;
    nodeEnd: number;
    fileStart: number;
    fileEnd: number;
  }[] = [];
  let nodePos = 0;
  let filePos = 0;
  for (const [op, text] of diffs) {
    const len = text.length;
    if (op === DIFF_EQUAL) {
      equalSegments.push({
        nodeStart: nodePos,
        nodeEnd: nodePos + len,
        fileStart: filePos,
        fileEnd: filePos + len,
      });
      nodePos += len;
      filePos += len;
    } else if (op === -1) {
      nodePos += len;
    } else {
      filePos += len;
    }
  }

  // Map each node span through equal segments to get file ranges
  const ranges: TextRange[] = [];
  let segIdx = 0;
  for (const span of nodeSpans) {
    while (
      segIdx < equalSegments.length &&
      equalSegments[segIdx].nodeEnd <= span.start
    ) {
      segIdx++;
    }
    let idx = segIdx;
    while (
      idx < equalSegments.length &&
      equalSegments[idx].nodeStart < span.end
    ) {
      const seg = equalSegments[idx];
      const start = Math.max(span.start, seg.nodeStart);
      const end = Math.min(span.end, seg.nodeEnd);
      if (start < end) {
        const fileStart = seg.fileStart + (start - seg.nodeStart);
        const fileEnd = fileStart + (end - start);
        ranges.push({ fileStart, fileEnd, nodeId: span.id });
      }
      if (seg.nodeEnd >= span.end) break;
      idx++;
    }
  }

  ranges.sort((a, b) => a.fileStart - b.fileStart);
  return ranges;
}

/**
 * Given a file offset range, find the text node(s) that produced it using
 * the pre-computed text ranges. Returns the first (shallowest file-offset)
 * node whose range overlaps the match.
 */
function findNodeAtOffset(
  ranges: TextRange[],
  matchStart: number,
  matchEnd: number,
): number | undefined {
  for (const r of ranges) {
    if (r.fileEnd <= matchStart) continue;
    if (r.fileStart >= matchEnd) break;
    return r.nodeId;
  }
  return undefined;
}

function fileSearch(
  db: Db,
  path: string | undefined,
  substring: string | undefined,
  opts: Opts,
) {
  if (!path || !substring) {
    console.error("Usage: alloy-trace file search <path> <substring>");
    process.exit(1);
  }

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

  const matches = findContentMatches(file.content, substring);
  if (matches.length === 0) {
    console.log(`No text matching "${substring}" found in ${file.path}`);
    return;
  }

  // Build the offset→node mapping using diff-match-patch
  const ranges = buildFileTextRanges(db, file.render_node_id, file.content);

  if (opts.json) {
    for (const match of matches) {
      const nodeId = findNodeAtOffset(ranges, match.start, match.end);
      const stack = nodeId ? buildComponentStack(db, nodeId) : [];
      console.log(
        JSON.stringify({
          text: match.text,
          offset: match.start,
          textNodeId: nodeId,
          stack,
        }),
      );
    }
    return;
  }

  for (const match of matches) {
    const context = getMatchContext(file.content, match.start, match.end);
    console.log(context);

    const nodeId = findNodeAtOffset(ranges, match.start, match.end);
    if (nodeId) {
      const stack = buildComponentStack(db, nodeId);
      if (stack.length > 0) {
        const formatted = formatComponentStack(
          JSON.stringify(
            stack.map((c: any) => ({
              name: c.name ?? "(unnamed)",
              renderNodeId: c.id,
              source:
                c.source_file ?
                  {
                    fileName: c.source_file,
                    lineNumber: c.source_line,
                    columnNumber: c.source_col,
                  }
                : undefined,
            })),
          ),
          opts.allFrames,
        );
        if (formatted) {
          console.log(formatted);
        }
      }
    }
    console.log();
  }
}

function buildComponentStack(db: Db, nodeId: number): any[] {
  const stack: any[] = [];
  let currentId: number | null = nodeId;

  while (currentId !== null) {
    const node = db
      .prepare(
        "SELECT id, parent_id, kind, name, props, source_file, source_line, source_col FROM render_nodes WHERE id = ?",
      )
      .get(currentId) as any;
    if (!node) break;
    if (node.kind === "component") {
      stack.push(node);
    }
    currentId = node.parent_id;
  }

  return stack;
}

function findContentMatches(
  content: string,
  substring: string,
): { start: number; end: number; text: string }[] {
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
  const matchLineStart = content.lastIndexOf("\n", start - 1) + 1;
  const matchLineEnd = content.indexOf("\n", end);

  // Line before
  const prevLineStart =
    matchLineStart > 0 ? content.lastIndexOf("\n", matchLineStart - 2) + 1 : -1;
  // Line after — find end of next line, or end of content
  let contextEnd: number;
  if (matchLineEnd === -1) {
    // Match is on the last line (no newline after match)
    contextEnd = content.length;
  } else {
    const nextLineEnd = content.indexOf("\n", matchLineEnd + 1);
    contextEnd = nextLineEnd !== -1 ? nextLineEnd : content.length;
  }

  const contextStart = prevLineStart >= 0 ? prevLineStart : matchLineStart;
  return content.slice(contextStart, contextEnd);
}
