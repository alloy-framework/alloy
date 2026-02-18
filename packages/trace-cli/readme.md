# @alloy-js/trace-cli

CLI tool for querying and analyzing [Alloy](https://alloy-framework.github.io/alloy) debug trace databases.

When Alloy renders with devtools enabled, it writes a SQLite trace database (`alloy-trace.db`) containing the full render tree, reactive graph (effects, refs, edges), symbols, scopes, scheduler activity, and output files. This CLI lets you explore that data from the terminal.

## Requirements

Node.js ≥ 22.5.0 (uses the built-in `node:sqlite` module via `--experimental-sqlite`).

## Installation

```bash
npm install -g @alloy-js/trace-cli
```

Or run directly from the workspace:

```bash
npx alloy-trace --db ./alloy-trace.db stats
```

## Usage

```
alloy-trace <command> [subcommand] [options]
```

### Entity commands

| Command     | Subcommands                                                                        | Description            |
| ----------- | ---------------------------------------------------------------------------------- | ---------------------- |
| `component` | `list`, `show <id>`, `tree [id]`, `stats`                                          | Render tree components |
| `effect`    | `list`, `show <id>`, `chain <id>`, `hotspots`, `ancestry <id>`, `subtree <ctx-id>` | Reactive effects       |
| `ref`       | `list`, `show <id>`, `chain <id>`, `hotspots`, `fanout <id>`, `ownership <id>`     | Reactive refs          |
| `symbol`    | `list`, `show <id>`                                                                | Output symbols         |
| `scope`     | `list`, `show <id>`                                                                | Output scopes          |
| `file`      | `list`, `show <path>`                                                              | Generated output files |

### Analysis commands

| Command       | Description                                    |
| ------------- | ---------------------------------------------- |
| `stats`       | Aggregate statistics and overhead analysis     |
| `errors`      | List render errors with component stacks       |
| `query <sql>` | Run a raw SQL query against the trace database |

### Options

| Option                    | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `--db=<path>`             | Path to trace database (default: `./trace.db`) |
| `--json`                  | Output as JSON (one object per line)           |
| `--limit=<n>`             | Limit number of results                        |
| `--depth=<n>`             | Max tree depth for `component tree`            |
| `--source-file=<pattern>` | Filter by source file path (LIKE match)        |
| `--output-file=<pattern>` | Filter by output file path (LIKE match)        |
| `--component=<name>`      | Filter by component name                       |
| `--name=<pattern>`        | Filter by name                                 |
| `--type=<type>`           | Filter by effect type or ref kind              |
| `--min-trackers=<n>`      | Show refs tracked by at least N effects        |
| `--unused`                | Show only unused refs (no edges)               |
| `--framework`             | Show only framework-internal effects           |

## Examples

```bash
# Overview of a trace
alloy-trace --db ./alloy-trace.db stats

# List all components from a specific source file
alloy-trace component list --source-file=models

# Show the full render tree
alloy-trace component tree

# Find the most active effects
alloy-trace effect hotspots

# Trace the reactive chain from a ref
alloy-trace ref chain 42

# Find refs with the most trackers
alloy-trace ref hotspots --limit=10

# Show unused refs (potential dead code)
alloy-trace ref list --unused

# Walk an effect's component ancestry
alloy-trace effect ancestry 15

# Raw SQL query
alloy-trace query "SELECT name, COUNT(*) as n FROM render_nodes WHERE kind='component' GROUP BY name ORDER BY n DESC"

# JSON output for scripting
alloy-trace effect list --json | jq '.name'
```

## Database schema

The trace database contains these tables:

- **effects** — Reactive computations (render effects, content effects, memos, binder effects)
- **refs** — Reactive values (refs, computed, shallow reactive)
- **edges** — Reactive graph edges (track, trigger, triggered-by)
- **render_nodes** — Render tree (components, fragments, text nodes, memos, custom contexts)
- **symbols** — Output symbol declarations
- **scopes** — Output naming scopes
- **output_files** — Generated file paths and content
- **render_errors** — Errors caught during rendering
- **effect_lifecycle** — Effect run/skip events
- **scheduler_jobs** — Scheduler job queue events
- **scheduler_flushes** — Scheduler flush batches
- **source_maps** — Output file source maps

Use `alloy-trace query "SELECT sql FROM sqlite_master WHERE type='table'"` to inspect the full schema.
