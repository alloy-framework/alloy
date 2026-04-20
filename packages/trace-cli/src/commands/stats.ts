import { type Db, type Opts, shortPath } from "../types.js";

export function statsCommand(db: Db, _args: string[], opts: Opts) {
  const effects = (db.prepare("SELECT COUNT(*) as n FROM effects").get() as any)
    .n;
  const refs = (db.prepare("SELECT COUNT(*) as n FROM refs").get() as any).n;
  const edges = (db.prepare("SELECT COUNT(*) as n FROM edges").get() as any).n;
  const components = (
    db
      .prepare(
        "SELECT COUNT(*) as n FROM render_nodes WHERE kind = 'component'",
      )
      .get() as any
  ).n;
  const symbols = (db.prepare("SELECT COUNT(*) as n FROM symbols").get() as any)
    .n;
  const scopes = (db.prepare("SELECT COUNT(*) as n FROM scopes").get() as any)
    .n;
  const renderNodes = (
    db.prepare("SELECT COUNT(*) as n FROM render_nodes").get() as any
  ).n;
  const jobsRun = (
    db
      .prepare("SELECT COUNT(*) as n FROM scheduler_jobs WHERE event = 'run'")
      .get() as any
  ).n;
  const flushes = (
    db.prepare("SELECT COUNT(*) as n FROM scheduler_flushes").get() as any
  ).n;
  const outputFiles = (
    db.prepare("SELECT COUNT(*) as n FROM output_files").get() as any
  ).n;
  const errors = (
    db.prepare("SELECT COUNT(*) as n FROM render_errors").get() as any
  ).n;

  if (opts.json) {
    console.log(
      JSON.stringify({
        effects,
        refs,
        edges,
        components,
        symbols,
        scopes,
        renderNodes,
        jobsRun,
        flushes,
        outputFiles,
        errors,
      }),
    );
    return;
  }

  // Summary
  console.log("  Summary");
  console.log("  ───────");
  console.log(`  Effects: ${effects}  |  Refs: ${refs}  |  Edges: ${edges}`);
  console.log(
    `  Components: ${components}  |  Render nodes: ${renderNodes}  |  Symbols: ${symbols}  |  Scopes: ${scopes}`,
  );
  console.log(`  Scheduler: ${jobsRun} jobs in ${flushes} flushes`);
  console.log(`  Output files: ${outputFiles}  |  Errors: ${errors}`);
  console.log();

  // Overhead analysis
  console.log("  Overhead");
  console.log("  ────────");

  const frameworkEffects = (
    db
      .prepare("SELECT COUNT(*) as n FROM effects WHERE source_file IS NULL")
      .get() as any
  ).n;
  const userEffects = effects - frameworkEffects;
  console.log(
    `  Framework effects: ${frameworkEffects} (${pct(frameworkEffects, effects)})  |  User effects: ${userEffects} (${pct(userEffects, effects)})`,
  );
  console.log(
    `  Effects per component: ${(effects / components).toFixed(1)}  |  Refs per component: ${(refs / components).toFixed(1)}`,
  );
  console.log();

  // Effect types
  console.log("  Effects by type");
  console.log("  ───────────────");
  const effectTypes = db
    .prepare(
      `
    SELECT COALESCE(type, '(unnamed)') as type, COUNT(*) as cnt
    FROM effects GROUP BY type ORDER BY cnt DESC
  `,
    )
    .all() as any[];
  for (const r of effectTypes) {
    console.log(
      `    ${r.type.padEnd(20)} ${String(r.cnt).padStart(6)}  (${pct(r.cnt, effects)})`,
    );
  }
  console.log();

  // Ref usage
  console.log("  Ref usage");
  console.log("  ─────────");
  const neverTracked = (
    db
      .prepare(
        `
    SELECT COUNT(*) as n FROM refs r
    WHERE NOT EXISTS (SELECT 1 FROM edges WHERE ref_id = r.id AND type = 'track')
  `,
      )
      .get() as any
  ).n;
  const completelyUnused = (
    db
      .prepare(
        `
    SELECT COUNT(*) as n FROM refs r
    WHERE NOT EXISTS (SELECT 1 FROM edges WHERE ref_id = r.id)
  `,
      )
      .get() as any
  ).n;
  console.log(
    `  Never tracked:     ${String(neverTracked).padStart(6)}  (${pct(neverTracked, refs)})`,
  );
  console.log(
    `  Completely unused: ${String(completelyUnused).padStart(6)}  (${pct(completelyUnused, refs)})`,
  );
  console.log();

  // Top components by instance count
  console.log("  Top components (by instance count)");
  console.log("  ──────────────────────────────────");
  const topComponents = db
    .prepare(
      `
    SELECT name, COUNT(*) as instances
    FROM render_nodes WHERE kind = 'component'
    GROUP BY name ORDER BY instances DESC LIMIT 15
  `,
    )
    .all() as any[];
  for (const r of topComponents) {
    console.log(
      `    ${r.name.padEnd(35)} ${String(r.instances).padStart(4)} instances`,
    );
  }
  console.log();

  // Source files by effect count
  const limit = opts.limit ?? 15;
  const byFile = db
    .prepare(
      `
    SELECT e.source_file,
      COUNT(*) as effects,
      (SELECT COUNT(*) FROM refs r WHERE r.source_file = e.source_file) as refs
    FROM effects e
    WHERE e.source_file IS NOT NULL
    GROUP BY e.source_file
    ORDER BY effects DESC
    LIMIT ?
  `,
    )
    .all(limit) as any[];

  if (byFile.length > 0) {
    console.log("  Source files (by effect count)");
    console.log("  ─────────────────────────────");
    for (const row of byFile) {
      const file = shortPath(row.source_file);
      console.log(
        `    ${file.padEnd(55)} ${row.effects} effects, ${row.refs} refs`,
      );
    }
  }
}

function pct(n: number, total: number): string {
  if (total === 0) return "0%";
  return ((100 * n) / total).toFixed(1) + "%";
}
