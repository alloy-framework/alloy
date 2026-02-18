import {
  type Db,
  type Opts,
  outputFileContextsCte,
  printPaginationFooter,
  requireId,
  shortPath,
} from "../types.js";

export function componentCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return componentList(db, opts);
    case "show":
      return componentShow(
        db,
        requireId(args, "Usage: alloy-trace component show <id>"),
        opts,
      );
    case "tree":
      return componentTree(
        db,
        args[0] ? parseInt(args[0], 10) : undefined,
        opts,
      );
    case "stats":
      return componentStats(db, opts);
    default:
      console.error(`Unknown component subcommand: ${subcommand}
Usage: alloy-trace component <list|show|tree|stats> [args] [options]`);
      process.exit(1);
  }
}

function componentList(db: Db, opts: Opts) {
  const conditions: string[] = ["rn.kind = 'component'"];
  const params: any[] = [];

  if (opts.sourceFile) {
    conditions.push("rn.source_file LIKE ?");
    params.push(`%${opts.sourceFile}%`);
  }
  if (opts.outputFile) {
    conditions.push(`rn.context_id IN ${outputFileContextsCte()}`);
    params.push(`%${opts.outputFile}%`);
  }
  if (opts.name) {
    conditions.push("rn.name LIKE ?");
    params.push(`%${opts.name}%`);
  }

  const where = "WHERE " + conditions.join(" AND ");
  const limit = opts.limit ?? 50;
  const sql = `
    SELECT rn.id, rn.name, rn.source_file, rn.source_line,
           (SELECT COUNT(*) FROM render_nodes c WHERE c.parent_id = rn.id) as children
    FROM render_nodes rn ${where}
    ORDER BY rn.seq
    LIMIT ?
  `;
  const allParams = [...params, limit];
  const rows = db.prepare(sql).all(...allParams) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No components found.");
    return;
  }

  for (const r of rows) {
    const src =
      r.source_file ? shortPath(r.source_file) + ":" + r.source_line : "";
    console.log(
      `  ${String(r.id).padStart(4)}  ${(r.name || "(unnamed)").padEnd(30)} ${r.children} children  ${src}`,
    );
  }

  printPaginationFooter(
    db,
    `SELECT COUNT(*) as n FROM render_nodes rn ${where}`,
    params,
    limit,
    rows.length,
  );
}

function componentShow(db: Db, id: number, opts: Opts) {
  const node = db
    .prepare("SELECT * FROM render_nodes WHERE id = ?")
    .get(id) as any;
  if (!node) {
    console.error(`Render node ${id} not found`);
    return;
  }

  if (opts.json) {
    console.log(JSON.stringify(node));
    return;
  }

  console.log(`Component ${id}: "${node.name}" (${node.kind})`);
  if (node.source_file)
    console.log(
      `  Source: ${node.source_file}:${node.source_line}:${node.source_col}`,
    );
  if (node.props) console.log(`  Props: ${node.props}`);
  if (node.context_id != null) console.log(`  Context: ${node.context_id}`);

  const children = db
    .prepare(
      "SELECT id, kind, name FROM render_nodes WHERE parent_id = ? ORDER BY seq",
    )
    .all(id) as any[];
  if (children.length > 0) {
    console.log(`  Children (${children.length}):`);
    for (const c of children) {
      console.log(`    ${c.kind} ${c.name ?? ""} (id: ${c.id})`);
    }
  }
}

function componentTree(db: Db, nodeId: number | undefined, opts: Opts) {
  const maxDepth = opts.depth ?? 50;

  if (opts.component) {
    const nodes = db
      .prepare(
        "SELECT * FROM render_nodes WHERE kind = 'component' AND name LIKE ?",
      )
      .all(`%${opts.component}%`) as any[];
    if (nodes.length === 0) {
      console.log(`No components matching "${opts.component}"`);
      return;
    }
    for (const node of nodes) printNode(db, node, 0, maxDepth);
    return;
  }

  if (nodeId != null) {
    const node = db
      .prepare("SELECT * FROM render_nodes WHERE id = ?")
      .get(nodeId) as any;
    if (!node) {
      console.error(`Node ${nodeId} not found`);
      return;
    }
    printNode(db, node, 0, maxDepth);
    return;
  }

  const roots = db
    .prepare("SELECT * FROM render_nodes WHERE parent_id IS NULL ORDER BY seq")
    .all() as any[];
  for (const root of roots) {
    if (opts.json) {
      printTreeJson(db, root, maxDepth);
    } else {
      printNode(db, root, 0, maxDepth);
    }
  }
}

function printNode(db: Db, node: any, depth: number, maxDepth: number) {
  if (depth > maxDepth) return;
  const indent = depth === 0 ? "" : "  ".repeat(depth - 1) + "├─ ";
  const name = node.name ? ` "${node.name}"` : "";
  let value = "";
  if (node.kind === "text" && node.value != null) {
    const truncated =
      node.value.length > 60 ? node.value.slice(0, 60) + "…" : node.value;
    value = ` ${JSON.stringify(truncated)}`;
  }
  console.log(`${indent}${node.kind}${name}${value}`);

  const children = db
    .prepare("SELECT * FROM render_nodes WHERE parent_id = ? ORDER BY seq")
    .all(node.id) as any[];
  for (const child of children) printNode(db, child, depth + 1, maxDepth);
}

function printTreeJson(db: Db, node: any, maxDepth: number, depth = 0) {
  if (depth > maxDepth) return;
  const children = db
    .prepare("SELECT * FROM render_nodes WHERE parent_id = ? ORDER BY seq")
    .all(node.id) as any[];
  const result: any = { ...node, children: [] };
  for (const child of children)
    result.children.push(printTreeJson(db, child, maxDepth, depth + 1));
  if (depth === 0) console.log(JSON.stringify(result));
  return result;
}

function componentStats(db: Db, opts: Opts) {
  const limit = opts.limit ?? 25;

  // For each component type: count instances, total effects in subtree, total refs in subtree
  // We do this by walking each component's context_id subtree
  const componentTypes = db
    .prepare(
      `
    SELECT name, COUNT(*) as instances
    FROM render_nodes WHERE kind = 'component' AND name IS NOT NULL
    GROUP BY name ORDER BY instances DESC
    LIMIT ?
  `,
    )
    .all(limit) as any[];

  if (opts.json) {
    // For JSON, compute full stats per type
    const results = componentTypes.map((ct: any) => {
      const stats = db
        .prepare(
          `
        WITH comp_contexts AS (
          SELECT context_id FROM render_nodes WHERE kind = 'component' AND name = ?
        ),
        subtree_effects AS (
          SELECT e.id, e.context_id FROM effects e WHERE e.context_id IN (SELECT context_id FROM comp_contexts)
        )
        SELECT
          (SELECT COUNT(*) FROM subtree_effects) as total_effects,
          (SELECT COUNT(*) FROM refs WHERE created_by_effect_id IN (SELECT id FROM subtree_effects)) as total_refs
      `,
        )
        .get(ct.name) as any;
      return { ...ct, ...stats };
    });
    for (const r of results) console.log(JSON.stringify(r));
    return;
  }

  console.log(
    "Per-component overhead (direct effects and refs created by the component's render effect):\n",
  );
  console.log(
    `  ${"Component".padEnd(38)} ${"Inst".padStart(5)}  ${"Effects".padStart(8)}  ${"Eff/Inst".padStart(8)}  ${"Refs".padStart(8)}  ${"Ref/Inst".padStart(8)}`,
  );
  console.log(
    `  ${"─".repeat(38)} ${"─".repeat(5)}  ${"─".repeat(8)}  ${"─".repeat(8)}  ${"─".repeat(8)}  ${"─".repeat(8)}`,
  );

  for (const ct of componentTypes) {
    // Count direct effects and refs for each instance of this component type
    // Direct = effects whose owner_context_id is the component's context_id
    const stats = db
      .prepare(
        `
      SELECT
        COUNT(DISTINCT e.id) as total_effects,
        (SELECT COUNT(*) FROM refs r WHERE r.created_by_effect_id IN (
          SELECT e2.id FROM effects e2
          WHERE e2.owner_context_id IN (SELECT context_id FROM render_nodes WHERE kind = 'component' AND name = ?)
        )) as total_refs
      FROM effects e
      WHERE e.owner_context_id IN (SELECT context_id FROM render_nodes WHERE kind = 'component' AND name = ?)
    `,
      )
      .get(ct.name, ct.name) as any;

    const effPerInst = (stats.total_effects / ct.instances).toFixed(1);
    const refPerInst = (stats.total_refs / ct.instances).toFixed(1);
    console.log(
      `  ${ct.name.padEnd(38)} ${String(ct.instances).padStart(5)}  ${String(stats.total_effects).padStart(8)}  ${effPerInst.padStart(8)}  ${String(stats.total_refs).padStart(8)}  ${refPerInst.padStart(8)}`,
    );
  }
}
