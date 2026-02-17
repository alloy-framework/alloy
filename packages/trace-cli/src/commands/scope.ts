import {
  type Db,
  type Opts,
  outputFileRenderNodesCte,
  requireId,
} from "../types.js";

export function scopeCommand(
  db: Db,
  subcommand: string,
  args: string[],
  opts: Opts,
) {
  switch (subcommand) {
    case "list":
    case "ls":
      return scopeList(db, opts);
    case "show":
      return scopeShow(
        db,
        requireId(args, "Usage: alloy-trace scope show <id>"),
        opts,
      );
    default:
      console.error(`Unknown scope subcommand: ${subcommand}
Usage: alloy-trace scope <list|show> [args] [options]`);
      process.exit(1);
  }
}

function scopeList(db: Db, opts: Opts) {
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
    SELECT s.id, s.name, s.parent_id, s.is_member_scope, s.owner_symbol_id,
           (SELECT COUNT(*) FROM symbols sym WHERE sym.scope_id = s.id OR sym.owner_symbol_id = s.owner_symbol_id) as symbol_count,
           p.name as parent_name,
           os.name as owner_name
    FROM scopes s
    LEFT JOIN scopes p ON s.parent_id = p.id
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
    console.log("No scopes found.");
    return;
  }

  for (const r of rows) {
    const parent = r.parent_name ? ` (parent: "${r.parent_name}")` : "";
    const member = r.is_member_scope ? " [member]" : "";
    const owner = r.owner_name ? ` owner: "${r.owner_name}"` : "";
    console.log(
      `  ${String(r.id).padStart(4)}  ${r.name}${member}  ${r.symbol_count} symbols${owner}${parent}`,
    );
  }
}

function scopeShow(db: Db, id: number, opts: Opts) {
  const scope = db.prepare("SELECT * FROM scopes WHERE id = ?").get(id) as any;
  if (!scope) {
    console.error(`Scope ${id} not found`);
    return;
  }
  if (opts.json) {
    console.log(JSON.stringify(scope));
    return;
  }

  console.log(`Scope ${id}: "${scope.name}"`);
  if (scope.parent_id != null) {
    const parent = db
      .prepare("SELECT name FROM scopes WHERE id = ?")
      .get(scope.parent_id) as any;
    console.log(
      `  Parent: scope ${scope.parent_id} ("${parent?.name ?? "?"}")`,
    );
  }
  if (scope.owner_symbol_id != null)
    console.log(`  Owner symbol: ${scope.owner_symbol_id}`);
  console.log(`  Member scope: ${Boolean(scope.is_member_scope)}`);

  const syms = db
    .prepare("SELECT id, name FROM symbols WHERE scope_id = ?")
    .all(id) as any[];
  if (syms.length > 0) {
    console.log(
      `  Symbols: ${syms.map((s: any) => `${s.name} (${s.id})`).join(", ")}`,
    );
  }
}
