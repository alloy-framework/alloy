import {
  type Db,
  type Opts,
  outputFileContextsCte,
  printPaginationFooter,
  requireId,
  shortPath,
} from "../types.js";

export function refCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return refList(db, opts);
    case "show":
      return refShow(
        db,
        requireId(args, "Usage: alloy-trace ref show <id>"),
        opts,
      );
    case "chain":
      return refChain(
        db,
        requireId(args, "Usage: alloy-trace ref chain <id>"),
        opts,
      );
    case "hotspots":
      return refHotspots(db, opts);
    case "fanout":
      return refFanout(
        db,
        requireId(args, "Usage: alloy-trace ref fanout <id>"),
        opts,
      );
    case "ownership":
      return refOwnership(
        db,
        requireId(args, "Usage: alloy-trace ref ownership <id>"),
        opts,
      );
    default:
      console.error(`Unknown ref subcommand: ${subcommand}
Usage: alloy-trace ref <list|show|chain|hotspots|fanout|ownership> [args] [options]`);
      process.exit(1);
  }
}

function refList(db: Db, opts: Opts) {
  const conditions: string[] = [];
  const params: any[] = [];

  if (opts.sourceFile) {
    conditions.push("r.source_file LIKE ?");
    params.push(`%${opts.sourceFile}%`);
  }
  if (opts.outputFile) {
    conditions.push(
      `r.created_by_effect_id IN (SELECT e.id FROM effects e WHERE e.context_id IN ${outputFileContextsCte()})`,
    );
    params.push(`%${opts.outputFile}%`);
  }
  if (opts.type) {
    conditions.push("r.kind = ?");
    params.push(opts.type);
  }
  if (opts.minTrackers != null) {
    conditions.push(
      `(SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'track') >= ?`,
    );
    params.push(opts.minTrackers);
  }
  if (opts.unused) {
    conditions.push(`(SELECT COUNT(*) FROM edges WHERE ref_id = r.id) = 0`);
  }

  const where =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  const limit = opts.limit ?? 50;
  const orderBy =
    opts.minTrackers != null ?
      "ORDER BY (SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'track') DESC"
    : "ORDER BY r.id";
  const sql = `
    SELECT r.id, r.kind, r.source_file, r.source_line, r.created_by_effect_id,
           (SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'track') as tracked_by,
           (SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'trigger') as triggered
    FROM refs r ${where}
    ${orderBy}
    LIMIT ?
  `;
  const allParams = [...params, limit];
  const rows = db.prepare(sql).all(...allParams) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No refs found.");
    return;
  }

  for (const r of rows) {
    const src =
      r.source_file ? shortPath(r.source_file) + ":" + r.source_line : "";
    console.log(
      `  ${String(r.id).padStart(4)}  ${r.kind.padEnd(12)} creator: effect ${r.created_by_effect_id ?? "?"}  tracked_by: ${r.tracked_by}  triggered: ${r.triggered}`,
    );
    if (src) console.log(`        ${src}`);
  }

  printPaginationFooter(
    db,
    `SELECT COUNT(*) as n FROM refs r ${where}`,
    params,
    limit,
    rows.length,
  );
}

function refShow(db: Db, id: number, opts: Opts) {
  const ref = db.prepare("SELECT * FROM refs WHERE id = ?").get(id) as any;
  if (!ref) {
    console.error(`Ref ${id} not found`);
    return;
  }

  if (opts.json) {
    const trackedBy = db
      .prepare(
        "SELECT DISTINCT effect_id FROM edges WHERE ref_id = ? AND type = 'track'",
      )
      .all(id);
    const writtenBy = db
      .prepare(
        "SELECT effect_id, COUNT(*) as n FROM edges WHERE ref_id = ? AND type = 'trigger' GROUP BY effect_id",
      )
      .all(id);
    console.log(JSON.stringify({ ref, trackedBy, writtenBy }));
    return;
  }

  console.log(`Ref ${id} (kind: ${ref.kind ?? "unknown"})`);
  if (ref.source_file)
    console.log(
      `  Source: ${ref.source_file}:${ref.source_line}:${ref.source_col}`,
    );
  if (ref.created_by_effect_id != null)
    console.log(`  Created by: effect ${ref.created_by_effect_id}`);

  const trackedBy = db
    .prepare(
      "SELECT DISTINCT e.id, e.name FROM edges ed JOIN effects e ON ed.effect_id = e.id WHERE ed.ref_id = ? AND ed.type = 'track'",
    )
    .all(id) as any[];
  if (trackedBy.length > 0) {
    console.log(`  Tracked by ${trackedBy.length} effects:`);
    for (const t of trackedBy) console.log(`    effect ${t.id}  "${t.name}"`);
  }

  const writtenBy = db
    .prepare(
      "SELECT e.id, e.name, COUNT(*) as n FROM edges ed JOIN effects e ON ed.effect_id = e.id WHERE ed.ref_id = ? AND ed.type = 'trigger' GROUP BY e.id",
    )
    .all(id) as any[];
  if (writtenBy.length > 0) {
    console.log(`  Written by ${writtenBy.length} effects:`);
    for (const w of writtenBy)
      console.log(`    effect ${w.id}  "${w.name}"  ×${w.n}`);
  }
}

function refChain(
  db: Db,
  refId: number,
  opts: Opts,
  depth = 0,
  maxDepth = 5,
  visited = new Set<number>(),
) {
  if (visited.has(refId)) return;
  visited.add(refId);

  const ref = db.prepare("SELECT * FROM refs WHERE id = ?").get(refId) as any;
  if (depth === 0) {
    console.log(
      `ref ${refId} (kind: ${ref?.kind ?? "?"}, source: ${ref?.source_file ?? "?"}:${ref?.source_line ?? "?"})`,
    );
  }

  if (depth >= maxDepth) {
    console.log("  ".repeat(depth + 1) + "... (max depth reached)");
    return;
  }

  const triggeredEffects = db
    .prepare(
      `
    SELECT DISTINCT e.id, e.name, COUNT(*) as n
    FROM edges ed JOIN effects e ON ed.effect_id = e.id
    WHERE ed.ref_id = ? AND ed.type = 'triggered-by'
    GROUP BY e.id
  `,
    )
    .all(refId) as any[];

  for (const effect of triggeredEffects) {
    const indent = "  ".repeat(depth + 1);
    console.log(
      `${indent}├─ triggers effect ${effect.id} (${effect.name}) [×${effect.n}]`,
    );

    const writes = db
      .prepare(
        `
      SELECT DISTINCT ref_id FROM edges
      WHERE effect_id = ? AND type = 'trigger' AND ref_id IS NOT NULL
    `,
      )
      .all(effect.id) as any[];

    for (const write of writes) {
      console.log(`${indent}│  └─ writes ref ${write.ref_id}`);
      refChain(db, write.ref_id, opts, depth + 2, maxDepth, visited);
    }
  }
}

function refHotspots(db: Db, opts: Opts) {
  const limit = opts.limit ?? 20;
  const rows = db
    .prepare(
      `
    SELECT r.id, r.kind, r.source_file, r.source_line,
           r.created_by_effect_id,
           e.name as creator_name, e.component as creator_component,
           (SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'track') as tracked_by,
           (SELECT COUNT(*) FROM edges WHERE ref_id = r.id AND type = 'trigger') as triggered
    FROM refs r
    LEFT JOIN effects e ON r.created_by_effect_id = e.id
    ORDER BY tracked_by DESC
    LIMIT ?
  `,
    )
    .all(limit) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No refs found.");
    return;
  }

  console.log("Refs with most trackers:\n");
  for (const r of rows) {
    const creator =
      r.creator_name ?
        `${r.creator_name}${r.creator_component ? ` [${r.creator_component}]` : ""}`
      : "?";
    const src =
      r.source_file ? `  ${shortPath(r.source_file)}:${r.source_line}` : "";
    console.log(
      `  ${String(r.id).padStart(5)}  ${r.kind.padEnd(12)} ${String(r.tracked_by).padStart(4)} trackers, ${String(r.triggered).padStart(3)} writes  creator: ${creator}${src}`,
    );
  }
}

function refFanout(db: Db, refId: number, opts: Opts) {
  const ref = db.prepare("SELECT * FROM refs WHERE id = ?").get(refId) as any;
  if (!ref) {
    console.error(`Ref ${refId} not found`);
    return;
  }

  const trackedBy = db
    .prepare(
      `
    SELECT DISTINCT e.id, e.name, e.component
    FROM edges ed JOIN effects e ON ed.effect_id = e.id
    WHERE ed.ref_id = ? AND ed.type = 'track'
  `,
    )
    .all(refId) as any[];

  console.log(
    `Ref ${refId} (${ref.kind}) — tracked by ${trackedBy.length} effects\n`,
  );

  // Group trackers by component
  const byComponent = new Map<string, any[]>();
  for (const t of trackedBy) {
    const key = t.component ?? "(no component)";
    if (!byComponent.has(key)) byComponent.set(key, []);
    byComponent.get(key)!.push(t);
  }

  for (const [comp, effects] of [...byComponent.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  )) {
    console.log(`  ${comp}: ${effects.length} effects`);
    const limit = opts.limit ?? 5;
    for (const e of effects.slice(0, limit)) {
      // Walk up to find the component ancestry
      const ancestry = getComponentAncestry(db, e.id, 5);
      const path = ancestry.length > 0 ? ` (${ancestry.join(" → ")})` : "";
      console.log(`    effect ${e.id} "${e.name}"${path}`);
    }
    if (effects.length > limit) {
      console.log(`    ... and ${effects.length - limit} more`);
    }
  }

  // Show what writes to this ref
  const writers = db
    .prepare(
      `
    SELECT DISTINCT e.id, e.name, e.component
    FROM edges ed JOIN effects e ON ed.effect_id = e.id
    WHERE ed.ref_id = ? AND ed.type = 'trigger'
  `,
    )
    .all(refId) as any[];

  if (writers.length > 0) {
    console.log(`\n  Written by:`);
    for (const w of writers) {
      console.log(
        `    effect ${w.id} "${w.name}"${w.component ? ` [${w.component}]` : ""}`,
      );
    }
  }
}

function getComponentAncestry(
  db: Db,
  effectId: number,
  maxDepth: number,
): string[] {
  const components: string[] = [];
  let ctxId = effectId;
  for (let i = 0; i < maxDepth * 3; i++) {
    const e = db
      .prepare(
        "SELECT owner_context_id, component FROM effects WHERE context_id = ?",
      )
      .get(ctxId) as any;
    if (!e || !e.owner_context_id) break;
    if (e.component) components.push(e.component);
    ctxId = e.owner_context_id;
    if (components.length >= maxDepth) break;
  }
  return components;
}

function refOwnership(db: Db, id: number, _opts: Opts) {
  const ref = db.prepare("SELECT * FROM refs WHERE id = ?").get(id) as any;
  if (!ref) {
    console.error(`Ref ${id} not found`);
    return;
  }

  console.log(`Ref ${id} (${ref.kind ?? "unknown"})`);
  if (ref.source_file)
    console.log(`  Source: ${shortPath(ref.source_file)}:${ref.source_line}`);

  if (ref.created_by_effect_id == null) {
    console.log("  Created outside reactive tracking (no creator effect)");
    return;
  }

  console.log(`  Created by: effect ${ref.created_by_effect_id}`);
  console.log();

  // Walk the creator's context ownership chain to find the component path
  const creator = db
    .prepare("SELECT * FROM effects WHERE id = ?")
    .get(ref.created_by_effect_id) as any;
  if (!creator) {
    console.log("  Creator effect not found in trace");
    return;
  }

  console.log(`  Creator: "${creator.name}" (${creator.type ?? "unknown"})`);
  console.log();
  console.log("  Component ancestry:");

  let ctxId: number | null = creator.context_id;
  let depth = 0;
  while (ctxId != null && depth < 50) {
    const e = db
      .prepare(
        "SELECT id, name, type, component, context_id, owner_context_id FROM effects WHERE context_id = ?",
      )
      .get(ctxId) as any;
    if (!e) break;
    const indent = "  ".repeat(depth);
    if (e.component) {
      console.log(
        `    ${indent}● ${e.component} (effect ${e.id}, ctx: ${e.context_id})`,
      );
    }
    ctxId = e.owner_context_id;
    depth++;
  }
}
