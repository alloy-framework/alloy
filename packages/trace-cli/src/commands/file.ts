import { type Db, type Opts } from "../types.js";

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
    default:
      console.error(`Unknown file subcommand: ${subcommand}
Usage: alloy-trace file <list|show> [args] [options]`);
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
