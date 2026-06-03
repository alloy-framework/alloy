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
    case "for-node":
    case "node":
    case "owners":
      return componentForNode(
        db,
        requireId(
          args,
          "Usage: alloy-trace component for-node <render-node-id>",
        ),
        opts,
      );
    case "stats":
      return componentStats(db, opts);
    default:
      console.error(`Unknown component subcommand: ${subcommand}
Usage: alloy-trace component <list|show|tree|for-node|stats> [args] [options]`);
      process.exit(1);
  }
}

function getComponentRoots(db: Db, componentId: number) {
  return db
    .prepare(
      `SELECT rn.id, rn.kind, rn.name, rn.value, cr.ordinal
       FROM component_roots cr
       JOIN render_nodes rn ON rn.id = cr.render_node_id
       WHERE cr.component_id = ?
       ORDER BY cr.ordinal`,
    )
    .all(componentId) as any[];
}

function componentList(db: Db, opts: Opts) {
  const conditions: string[] = ["1 = 1"];
  const params: any[] = [];

  if (opts.sourceFile) {
    conditions.push("ci.source_file LIKE ?");
    params.push(`%${opts.sourceFile}%`);
  }
  if (opts.outputFile) {
    conditions.push(`ci.id IN (
      SELECT cr.component_id
      FROM component_roots cr
      JOIN render_nodes rn ON rn.id = cr.render_node_id
      WHERE rn.context_id IN ${outputFileContextsCte()}
    )`);
    params.push(`%${opts.outputFile}%`);
  }
  if (opts.name) {
    conditions.push("ci.name LIKE ?");
    params.push(`%${opts.name}%`);
  }

  const where = "WHERE " + conditions.join(" AND ");
  const limit = opts.limit ?? 50;
  const sql = `
    SELECT ci.id, ci.name, ci.source_file, ci.source_line,
           (SELECT COUNT(*) FROM component_roots cr WHERE cr.component_id = ci.id) as roots
    FROM component_instances ci ${where}
    ORDER BY ci.seq
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
      `  ${String(r.id).padStart(4)}  ${(r.name || "(unnamed)").padEnd(30)} ${r.roots} roots  ${src}`,
    );
  }

  printPaginationFooter(
    db,
    `SELECT COUNT(*) as n FROM component_instances ci ${where}`,
    params,
    limit,
    rows.length,
  );
}

function componentShow(db: Db, id: number, opts: Opts) {
  const node = db
    .prepare("SELECT * FROM component_instances WHERE id = ?")
    .get(id) as any;
  if (!node) {
    console.error(`Component ${id} not found`);
    return;
  }

  const roots = getComponentRoots(db, id);
  if (opts.json) {
    console.log(JSON.stringify({ ...node, roots }));
    return;
  }

  console.log(`Component ${id}: "${node.name}"`);
  if (node.source_file)
    console.log(
      `  Source: ${node.source_file}:${node.source_line}:${node.source_col}`,
    );
  if (node.props) console.log(`  Props: ${node.props}`);
  if (node.context_id != null) console.log(`  Context: ${node.context_id}`);

  if (roots.length > 0) {
    console.log(`  Roots (${roots.length}):`);
    for (const r of roots) {
      const value = r.value != null ? ` ${JSON.stringify(r.value)}` : "";
      console.log(`    ${r.kind} ${r.name ?? ""}${value} (id: ${r.id})`);
    }
  }
}

function componentForNode(db: Db, renderNodeId: number, opts: Opts) {
  const rows = db
    .prepare(
      `WITH RECURSIVE ancestors(render_node_id, distance) AS (
         SELECT id, 0 FROM render_nodes WHERE id = ?
         UNION ALL
         SELECT rn.parent_id, ancestors.distance + 1
         FROM render_nodes rn
         JOIN ancestors ON rn.id = ancestors.render_node_id
         WHERE rn.parent_id IS NOT NULL
       )
       SELECT ci.*, cr.render_node_id AS root_render_node_id, cr.ordinal,
              ancestors.distance AS distance
       FROM ancestors
       JOIN component_roots cr ON cr.render_node_id = ancestors.render_node_id
       JOIN component_instances ci ON ci.id = cr.component_id
       ORDER BY ancestors.distance, cr.ordinal, ci.seq`,
    )
    .all(renderNodeId) as any[];

  if (opts.json) {
    for (const row of rows) console.log(JSON.stringify(row));
    return;
  }
  if (rows.length === 0) {
    console.log(`No components found for render node ${renderNodeId}.`);
    return;
  }

  console.log(`Components for render node ${renderNodeId}:`);
  for (const row of rows) {
    const distance =
      row.distance === 0 ?
        "direct"
      : `ancestor root #${row.root_render_node_id}`;
    const src =
      row.source_file ?
        ` ${shortPath(row.source_file)}:${row.source_line}`
      : "";
    console.log(
      `  ${String(row.id).padStart(4)}  ${row.name.padEnd(30)} ${distance}${src}`,
    );
  }
}

function componentTree(db: Db, nodeId: number | undefined, opts: Opts) {
  const maxDepth = opts.depth ?? 50;

  if (opts.component) {
    const nodes = db
      .prepare(
        "SELECT * FROM component_instances WHERE name LIKE ? ORDER BY seq",
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
      .prepare("SELECT * FROM component_instances WHERE id = ?")
      .get(nodeId) as any;
    if (!node) {
      console.error(`Component ${nodeId} not found`);
      return;
    }
    printNode(db, node, 0, maxDepth);
    return;
  }

  const roots = db
    .prepare(
      "SELECT * FROM component_instances WHERE parent_id IS NULL ORDER BY seq",
    )
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
  const roots = db
    .prepare("SELECT COUNT(*) as n FROM component_roots WHERE component_id = ?")
    .get(node.id) as any;
  console.log(`${indent}component #${node.id}${name} (${roots.n} roots)`);

  const children = db
    .prepare(
      "SELECT * FROM component_instances WHERE parent_id = ? ORDER BY seq",
    )
    .all(node.id) as any[];
  for (const child of children) printNode(db, child, depth + 1, maxDepth);
}

function printTreeJson(db: Db, node: any, maxDepth: number, depth = 0) {
  if (depth > maxDepth) return;
  const children = db
    .prepare(
      "SELECT * FROM component_instances WHERE parent_id = ? ORDER BY seq",
    )
    .all(node.id) as any[];
  const roots = getComponentRoots(db, node.id);
  const result: any = { ...node, roots, children: [] };
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
    FROM component_instances WHERE name IS NOT NULL
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
          SELECT context_id FROM component_instances WHERE name = ?
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
          WHERE e2.owner_context_id IN (SELECT context_id FROM component_instances WHERE name = ?)
        )) as total_refs
      FROM effects e
      WHERE e.owner_context_id IN (SELECT context_id FROM component_instances WHERE name = ?)
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
