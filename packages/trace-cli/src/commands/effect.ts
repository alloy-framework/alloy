import {
  type Db,
  type Opts,
  outputFileContextsCte,
  printPaginationFooter,
  requireId,
  shortPath,
} from "../types.js";

export function effectCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return effectList(db, opts);
    case "show":
      return effectShow(
        db,
        requireId(args, "Usage: alloy-trace effect show <id>"),
        opts,
      );
    case "chain":
      return effectChain(
        db,
        requireId(args, "Usage: alloy-trace effect chain <id>"),
        opts,
      );
    case "hotspots":
      return effectHotspots(db, opts);
    case "ancestry":
      return effectAncestry(
        db,
        requireId(args, "Usage: alloy-trace effect ancestry <id>"),
        opts,
      );
    case "subtree":
      return effectSubtree(
        db,
        requireId(args, "Usage: alloy-trace effect subtree <context-id>"),
        opts,
      );
    default:
      console.error(`Unknown effect subcommand: ${subcommand}
Usage: alloy-trace effect <list|show|chain|hotspots|ancestry|subtree> [args] [options]`);
      process.exit(1);
  }
}

function effectList(db: Db, opts: Opts) {
  const conditions: string[] = [];
  const params: any[] = [];

  if (opts.sourceFile) {
    conditions.push("e.source_file LIKE ?");
    params.push(`%${opts.sourceFile}%`);
  }
  if (opts.outputFile) {
    conditions.push(`e.context_id IN ${outputFileContextsCte()}`);
    params.push(`%${opts.outputFile}%`);
  }
  if (opts.component) {
    conditions.push("e.component LIKE ?");
    params.push(`%${opts.component}%`);
  }
  if (opts.name) {
    conditions.push("e.name LIKE ?");
    params.push(`%${opts.name}%`);
  }
  if (opts.type) {
    conditions.push("e.type = ?");
    params.push(opts.type);
  }
  if (opts.framework) {
    conditions.push("e.source_file IS NULL");
  }

  const where =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  const limit = opts.limit ?? 50;
  const sql = `
    SELECT e.id, e.name, e.type, e.component, e.source_file, e.source_line,
           (SELECT COUNT(*) FROM edges WHERE effect_id = e.id AND type = 'track') as tracks,
           (SELECT COUNT(*) FROM edges WHERE effect_id = e.id AND type = 'trigger') as triggers
    FROM effects e ${where}
    ORDER BY e.id
    LIMIT ?
  `;
  const allParams = [...params, limit];
  const rows = db.prepare(sql).all(...allParams) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No effects found.");
    return;
  }

  for (const r of rows) {
    const src =
      r.source_file ? shortPath(r.source_file) + ":" + r.source_line : "";
    const comp = r.component ? ` [${r.component}]` : "";
    const stats = `tracks ${r.tracks} refs, triggers ${r.triggers}`;
    console.log(
      `  ${String(r.id).padStart(4)}  ${(r.name || "(anonymous)").padEnd(40)} ${r.type ?? ""} ${stats}${comp}`,
    );
    if (src) console.log(`        ${src}`);
  }

  printPaginationFooter(
    db,
    `SELECT COUNT(*) as n FROM effects e ${where}`,
    params,
    limit,
    rows.length,
  );
}

function effectShow(db: Db, id: number, opts: Opts) {
  const effect = db
    .prepare("SELECT * FROM effects WHERE id = ?")
    .get(id) as any;
  if (!effect) {
    console.error(`Effect ${id} not found`);
    return;
  }

  if (opts.json) {
    const tracks = db
      .prepare(
        "SELECT DISTINCT ref_id FROM edges WHERE effect_id = ? AND type = 'track' AND ref_id IS NOT NULL",
      )
      .all(id);
    const triggeredBy = db
      .prepare(
        "SELECT ref_id, COUNT(*) as n, GROUP_CONCAT(seq) as seqs FROM edges WHERE effect_id = ? AND type = 'triggered-by' GROUP BY ref_id",
      )
      .all(id);
    const triggers = db
      .prepare(
        "SELECT ref_id, COUNT(*) as n, GROUP_CONCAT(seq) as seqs FROM edges WHERE effect_id = ? AND type = 'trigger' GROUP BY ref_id",
      )
      .all(id);
    const lifecycle = db
      .prepare(
        "SELECT seq, event, trigger_ref_id FROM effect_lifecycle WHERE effect_id = ? ORDER BY seq",
      )
      .all(id);
    console.log(
      JSON.stringify({ effect, tracks, triggeredBy, triggers, lifecycle }),
    );
    return;
  }

  console.log(`Effect ${id}: "${effect.name}" (${effect.type ?? "unknown"})`);
  if (effect.source_file)
    console.log(
      `  Source: ${effect.source_file}:${effect.source_line}:${effect.source_col}`,
    );
  console.log(
    `  Context: ${effect.context_id} (owner: ${effect.owner_context_id})`,
  );
  if (effect.component) console.log(`  Component: ${effect.component}`);

  const tracks = db
    .prepare(
      "SELECT DISTINCT ref_id FROM edges WHERE effect_id = ? AND type = 'track' AND ref_id IS NOT NULL",
    )
    .all(id) as any[];
  if (tracks.length > 0) {
    console.log(`  Tracks ${tracks.length} refs:`);
    for (const t of tracks) {
      const ref = db
        .prepare("SELECT * FROM refs WHERE id = ?")
        .get(t.ref_id) as any;
      console.log(
        `    ref ${t.ref_id}  (${ref?.source_file ?? "unknown"}:${ref?.source_line ?? "?"})`,
      );
    }
  }

  const triggeredBy = db
    .prepare(
      "SELECT ref_id, COUNT(*) as n, GROUP_CONCAT(seq) as seqs FROM edges WHERE effect_id = ? AND type = 'triggered-by' GROUP BY ref_id",
    )
    .all(id) as any[];
  if (triggeredBy.length > 0) {
    console.log("  Triggered by:");
    for (const t of triggeredBy)
      console.log(`    ref ${t.ref_id}  ×${t.n}  (seq ${t.seqs})`);
  }

  const triggers = db
    .prepare(
      "SELECT ref_id, COUNT(*) as n, GROUP_CONCAT(seq) as seqs FROM edges WHERE effect_id = ? AND type = 'trigger' GROUP BY ref_id",
    )
    .all(id) as any[];
  if (triggers.length > 0) {
    console.log("  Triggers (writes to):");
    for (const t of triggers)
      console.log(`    ref ${t.ref_id}  ×${t.n}  (seq ${t.seqs})`);
  }

  // Lifecycle events
  const lifecycle = db
    .prepare(
      "SELECT seq, event, trigger_ref_id FROM effect_lifecycle WHERE effect_id = ? AND event != 'scheduled' ORDER BY seq",
    )
    .all(id) as any[];
  if (lifecycle.length > 0) {
    const ranEvents = lifecycle.filter((e: any) => e.event === "ran");
    const skippedEvents = lifecycle.filter((e: any) => e.event === "skipped");
    console.log(
      `  Lifecycle: ran ${ranEvents.length} times, skipped ${skippedEvents.length}`,
    );
    for (const e of ranEvents) {
      const triggerInfo =
        e.trigger_ref_id != null ?
          ` (triggered by ref ${e.trigger_ref_id})`
        : "";
      console.log(`    ran at seq ${e.seq}${triggerInfo}`);
    }
  }
}

function effectChain(db: Db, id: number, opts: Opts) {
  const effect = db
    .prepare("SELECT * FROM effects WHERE id = ?")
    .get(id) as any;
  if (!effect) {
    console.error(`Effect ${id} not found`);
    return;
  }

  console.log(`effect ${id} (${effect.name})`);

  const triggeredBy = db
    .prepare(
      `
    SELECT DISTINCT ref_id FROM edges
    WHERE effect_id = ? AND type = 'triggered-by' AND ref_id IS NOT NULL
  `,
    )
    .all(id) as any[];

  if (triggeredBy.length > 0) {
    console.log("  Triggered by:");
    for (const t of triggeredBy) {
      const writers = db
        .prepare(
          `
        SELECT DISTINCT e.id, e.name FROM edges ed JOIN effects e ON ed.effect_id = e.id
        WHERE ed.ref_id = ? AND ed.type = 'trigger'
      `,
        )
        .all(t.ref_id) as any[];
      const writerStr = writers
        .map((w: any) => `effect ${w.id} (${w.name})`)
        .join(", ");
      console.log(`    ref ${t.ref_id} → written by ${writerStr}`);
    }
  }

  const runs = db
    .prepare(
      "SELECT seq FROM scheduler_jobs WHERE effect_id = ? AND event = 'run' ORDER BY seq",
    )
    .all(id) as any[];
  if (runs.length > 0) {
    console.log(
      `  Scheduler runs: ${runs.map((r: any) => `seq ${r.seq}`).join(", ")}`,
    );
  }
}

function effectHotspots(db: Db, opts: Opts) {
  const limit = opts.limit ?? 20;
  const rows = db
    .prepare(
      `
    SELECT e.id, e.name, e.type, e.component, e.source_file, e.source_line,
           (SELECT COUNT(*) FROM edges WHERE effect_id = e.id AND type = 'track') as tracks,
           (SELECT COUNT(*) FROM edges WHERE effect_id = e.id AND type = 'trigger') as triggers,
           (SELECT COUNT(*) FROM refs WHERE created_by_effect_id = e.id) as refs_created
    FROM effects e
    ORDER BY tracks + triggers + refs_created DESC
    LIMIT ?
  `,
    )
    .all(limit) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No effects found.");
    return;
  }

  console.log("Effects with highest reactive activity:\n");
  for (const r of rows) {
    const src =
      r.source_file ? shortPath(r.source_file) + ":" + r.source_line : "";
    const comp = r.component ? ` [${r.component}]` : "";
    console.log(
      `  ${String(r.id).padStart(5)}  ${(r.name || "(anonymous)").padEnd(35)} tracks ${r.tracks}, triggers ${r.triggers}, creates ${r.refs_created} refs${comp}`,
    );
    if (src) console.log(`         ${src}`);
  }
}

function effectAncestry(db: Db, id: number, _opts: Opts) {
  const effect = db
    .prepare("SELECT * FROM effects WHERE id = ?")
    .get(id) as any;
  if (!effect) {
    console.error(`Effect ${id} not found`);
    return;
  }

  console.log(`Effect ${id}: "${effect.name}" (${effect.type ?? "unknown"})`);
  if (effect.source_file)
    console.log(
      `  Source: ${shortPath(effect.source_file)}:${effect.source_line}`,
    );
  console.log();

  // Walk up the context ownership chain
  let ctxId: number | null = effect.owner_context_id;
  let depth = 0;
  while (ctxId != null && depth < 50) {
    const parent = db
      .prepare(
        "SELECT id, name, type, component, context_id, owner_context_id FROM effects WHERE context_id = ?",
      )
      .get(ctxId) as any;
    if (!parent) break;
    const indent = "  ".repeat(depth);
    const comp = parent.component ? ` [${parent.component}]` : "";
    const marker = parent.component ? "●" : "│";
    console.log(
      `  ${indent}${marker} ${parent.name ?? "(anonymous)"}${comp} (ctx: ${parent.context_id})`,
    );
    ctxId = parent.owner_context_id;
    depth++;
  }
}

function effectSubtree(db: Db, contextId: number, opts: Opts) {
  const root = db
    .prepare("SELECT * FROM effects WHERE context_id = ?")
    .get(contextId) as any;
  if (!root) {
    console.error(`No effect with context_id ${contextId}`);
    return;
  }

  // Count all effects in the subtree via recursive CTE
  const totals = db
    .prepare(
      `
    WITH RECURSIVE subtree(ctx_id) AS (
      SELECT ?
      UNION ALL
      SELECT e.context_id FROM effects e JOIN subtree s ON e.owner_context_id = s.ctx_id
    )
    SELECT
      COUNT(*) as total_effects,
      (SELECT COUNT(*) FROM refs WHERE created_by_effect_id IN (SELECT ctx_id FROM subtree)) as total_refs
    FROM effects WHERE context_id IN (SELECT ctx_id FROM subtree)
  `,
    )
    .get(contextId) as any;

  console.log(
    `Subtree of effect context ${contextId}: "${root.name}" (${root.type ?? "unknown"})`,
  );
  if (root.component) console.log(`  Component: ${root.component}`);
  console.log(`  Total effects: ${totals.total_effects}`);
  console.log(`  Total refs created: ${totals.total_refs}`);
  console.log();

  // Break down by effect type
  const byType = db
    .prepare(
      `
    WITH RECURSIVE subtree(ctx_id) AS (
      SELECT ?
      UNION ALL
      SELECT e.context_id FROM effects e JOIN subtree s ON e.owner_context_id = s.ctx_id
    )
    SELECT COALESCE(type, '(unnamed)') as type, COUNT(*) as cnt
    FROM effects WHERE context_id IN (SELECT ctx_id FROM subtree)
    GROUP BY type ORDER BY cnt DESC
  `,
    )
    .all(contextId) as any[];

  console.log("  By type:");
  for (const r of byType) {
    console.log(`    ${r.type.padEnd(20)} ${r.cnt}`);
  }
  console.log();

  // Break down by component (immediate children that are components)
  const byComponent = db
    .prepare(
      `
    WITH RECURSIVE subtree(ctx_id) AS (
      SELECT ?
      UNION ALL
      SELECT e.context_id FROM effects e JOIN subtree s ON e.owner_context_id = s.ctx_id
    )
    SELECT component, COUNT(*) as cnt
    FROM effects
    WHERE context_id IN (SELECT ctx_id FROM subtree) AND component IS NOT NULL
    GROUP BY component ORDER BY cnt DESC
    LIMIT ?
  `,
    )
    .all(contextId, opts.limit ?? 20) as any[];

  if (byComponent.length > 0) {
    console.log("  By component:");
    for (const r of byComponent) {
      console.log(`    ${r.component.padEnd(35)} ${r.cnt} effects`);
    }
  }
}
