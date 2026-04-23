import {
  type Db,
  type Opts,
  outputFileRenderNodesCte,
  requireId,
} from "../types.js";

export function symbolCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return symbolList(db, opts);
    case "show":
      return symbolShow(
        db,
        requireId(args, "Usage: alloy-trace symbol show <id>"),
        opts,
      );
    default:
      console.error(`Unknown symbol subcommand: ${subcommand}
Usage: alloy-trace symbol <list|show> [args] [options]`);
      process.exit(1);
  }
}

function symbolList(db: Db, opts: Opts) {
  const conditions: string[] = [];
  const params: any[] = [];

  if (opts.name) {
    conditions.push("s.name LIKE ?");
    params.push(`%${opts.name}%`);
  }
  if (opts.outputFile) {
    conditions.push(`s.render_node_id IN ${outputFileRenderNodesCte()}`);
    params.push(`%${opts.outputFile}%`);
  }
  if (opts.component) {
    conditions.push(
      "s.render_node_id IN (SELECT rn.id FROM render_nodes rn WHERE rn.kind = 'component' AND rn.name LIKE ?)",
    );
    params.push(`%${opts.component}%`);
  }

  const where =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  const sql = `
    SELECT s.id, s.name, s.original_name, s.scope_id, s.owner_symbol_id,
           s.is_member, s.is_transient, s.is_alias,
           sc.name as scope_name,
           os.name as owner_name
    FROM symbols s
    LEFT JOIN scopes sc ON s.scope_id = sc.id
    LEFT JOIN symbols os ON s.owner_symbol_id = os.id
    ${where}
    ORDER BY s.id
  `;
  const rows = db.prepare(sql).all(...params) as any[];

  if (opts.json) {
    for (const r of rows) console.log(JSON.stringify(r));
    return;
  }
  if (rows.length === 0) {
    console.log("No symbols found.");
    return;
  }

  for (const r of rows) {
    const orig =
      r.original_name && r.original_name !== r.name ?
        ` (original: ${r.original_name})`
      : "";
    const scope = r.scope_name ? ` in scope "${r.scope_name}"` : "";
    const owner = r.owner_name ? ` member of "${r.owner_name}"` : "";
    const flags = [
      r.is_member ? "member" : "",
      r.is_transient ? "transient" : "",
      r.is_alias ? "alias" : "",
    ]
      .filter(Boolean)
      .join(", ");
    const flagStr = flags ? ` [${flags}]` : "";
    console.log(
      `  ${String(r.id).padStart(4)}  ${r.name}${orig}${flagStr}${scope}${owner}`,
    );
  }
}

function symbolShow(db: Db, id: number, opts: Opts) {
  const sym = db.prepare("SELECT * FROM symbols WHERE id = ?").get(id) as any;
  if (!sym) {
    console.error(`Symbol ${id} not found`);
    return;
  }
  if (opts.json) {
    console.log(JSON.stringify(sym));
    return;
  }

  console.log(`Symbol ${id}: "${sym.name}"`);
  if (sym.original_name !== sym.name)
    console.log(`  Original name: ${sym.original_name}`);
  if (sym.scope_id != null) {
    const scope = db
      .prepare("SELECT name FROM scopes WHERE id = ?")
      .get(sym.scope_id) as any;
    console.log(`  Scope: ${sym.scope_id} ("${scope?.name ?? "?"}")`);
  }
  if (sym.owner_symbol_id != null)
    console.log(`  Owner symbol: ${sym.owner_symbol_id}`);
  if (sym.render_node_id != null)
    console.log(`  Render node: ${sym.render_node_id}`);
  console.log(
    `  Member: ${Boolean(sym.is_member)} | Transient: ${Boolean(sym.is_transient)} | Alias: ${Boolean(sym.is_alias)}`,
  );
}
