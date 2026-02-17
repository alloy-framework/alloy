import { type Db, type Opts, formatComponentStack } from "../types.js";

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
    if (err.stack) {
      console.log(err.stack);
    } else {
      console.log(`${err.name}: ${err.message}`);
    }
    if (err.component_stack) {
      const formatted = formatComponentStack(err.component_stack, opts.allFrames);
      if (formatted) {
        console.log("Component stack:");
        console.log(formatted);
      }
    }
    console.log();
  }
}
