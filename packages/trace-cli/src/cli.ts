#!/usr/bin/env -S node --experimental-sqlite --no-warnings=ExperimentalWarning
import { parseArgs } from "node:util";
import { openTrace } from "./db.js";
import { effectCommand } from "./commands/effect.js";
import { refCommand } from "./commands/ref.js";
import { componentCommand } from "./commands/component.js";
import { symbolCommand } from "./commands/symbol.js";
import { scopeCommand } from "./commands/scope.js";
import { fileCommand } from "./commands/file.js";
import { statsCommand } from "./commands/stats.js";
import { runErrors } from "./commands/errors.js";
import { runQuery } from "./commands/query.js";

const { positionals, values } = parseArgs({
  options: {
    db: { type: "string", default: "./trace.db" },
    json: { type: "boolean", default: false },
    limit: { type: "string" },
    depth: { type: "string" },
    component: { type: "string" },
    "source-file": { type: "string" },
    "output-file": { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    "min-trackers": { type: "string" },
    unused: { type: "boolean", default: false },
    framework: { type: "boolean", default: false },
  },
  allowPositionals: true,
  strict: false,
});

const [entity, subcommand, ...args] = positionals;

if (!entity || entity === "help") {
  printUsage();
  process.exit(0);
}

const db = openTrace(values.db as string);
const opts = {
  json: values.json as boolean,
  limit: values.limit ? parseInt(values.limit as string, 10) : undefined,
  depth: values.depth ? parseInt(values.depth as string, 10) : undefined,
  component: values.component as string | undefined,
  sourceFile: values["source-file"] as string | undefined,
  outputFile: values["output-file"] as string | undefined,
  name: values.name as string | undefined,
  type: values.type as string | undefined,
  minTrackers: values["min-trackers"] ? parseInt(values["min-trackers"] as string, 10) : undefined,
  unused: values.unused as boolean,
  framework: values.framework as boolean,
};

try {
  switch (entity) {
    case "effect":
      effectCommand(db, subcommand ?? "list", args, opts);
      break;
    case "ref":
      refCommand(db, subcommand ?? "list", args, opts);
      break;
    case "component":
      componentCommand(db, subcommand ?? "list", args, opts);
      break;
    case "symbol":
      symbolCommand(db, subcommand ?? "list", args, opts);
      break;
    case "scope":
      scopeCommand(db, subcommand ?? "list", args, opts);
      break;
    case "file":
      fileCommand(db, subcommand ?? "list", args, opts);
      break;
    case "stats":
      statsCommand(db, args, opts);
      break;
    case "errors":
      runErrors(db, opts);
      break;
    case "query":
      runQuery(db, [subcommand, ...args].filter(Boolean), opts);
      break;
    default:
      console.error(`Unknown command: ${entity}`);
      printUsage();
      process.exit(1);
  }
} finally {
  db.close();
}

function printUsage() {
  console.log(`
Usage: alloy-trace <command> [subcommand] [options]

Entity commands:
  effect <list|show|chain|hotspots|ancestry|subtree> [id]  Effects (reactive computations)
  ref <list|show|chain|hotspots|fanout|ownership> [id]     Refs (reactive values)
  component <list|show|tree|stats> [id]                    Components (render tree nodes)
  symbol <list|show> [id]                                  Symbols (output symbols)
  scope <list|show> [id]                                   Scopes (output scopes)
  file <list|show> [path]                                  Output files

Analysis commands:
  stats              Aggregate stats and overhead analysis
  errors             List render errors
  query <sql>        Run a raw SQL query

Options:
  --db=<path>             Path to trace database (default: ./trace.db)
  --json                  Output as JSON
  --limit=<n>             Limit number of results
  --depth=<n>             Max tree depth
  --source-file=<pattern> Filter by source file
  --output-file=<pattern> Filter by output file
  --component=<name>      Filter by component name
  --name=<pattern>        Filter by name
  --type=<type>           Filter by type/kind
  --min-trackers=<n>      Filter refs by minimum tracker count
  --unused                Show only unused refs
  --framework             Show only framework-internal effects
`);
}
