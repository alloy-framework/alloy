import { type Db, type Opts } from "../types.js";

export function runErrors(db: Db, opts: Opts) {
  const errors = db
    .prepare("SELECT * FROM render_errors ORDER BY seq")
    .all() as any[];

  if (opts.json) {
    for (const err of errors) console.log(JSON.stringify(err));
    return;
  }

  if (errors.length === 0) {
    console.log("No render errors.");
    return;
  }

  console.log(`${errors.length} render error(s):\n`);
  for (const err of errors) {
    console.log(`  ${err.name}: ${err.message}`);
    if (err.stack) {
      const firstLine = err.stack
        .split("\n")
        .find((l: string) => l.trim().startsWith("at"));
      if (firstLine) console.log(`  ${firstLine.trim()}`);
    }
    if (err.component_stack) {
      try {
        const stack = JSON.parse(err.component_stack);
        console.log(
          `  Component stack: ${stack.map((s: any) => s.name).join(" > ")}`,
        );
      } catch {
        // ignore parse errors
      }
    }
    console.log();
  }
}
