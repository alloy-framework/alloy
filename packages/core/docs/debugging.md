# Debugging

## Diagnostics

Alloy has a built-in diagnostic system for validation warnings and errors during rendering.

- [`emitDiagnostic(input)`](api/functions/emitDiagnostic.md) — emit a diagnostic from the current component. Automatically captures the component stack.
- [`attachDiagnosticsCollector()`](api/functions/attachDiagnosticsCollector.md) — attach a collector before rendering to capture all diagnostics.
- [`getDiagnosticsForTree(tree)`](api/functions/getDiagnosticsForTree.md) — extract diagnostics from a rendered tree.
- [`reportDiagnostics(diagnostics)`](api/functions/reportDiagnostics.md) — format and print diagnostics to the console.

## Trace Files

Set `ALLOY_DEBUG_TRACE=1` (or a custom path) to write a SQLite trace database during rendering:

```sh
ALLOY_DEBUG_TRACE=1 node my-generator.js        # writes alloy-trace.db
ALLOY_DEBUG_TRACE=./my-trace.db node my-gen.js   # custom path
```

The trace captures the full render tree, reactive graph (refs, effects, edges), symbol/scope data, scheduler activity, and render errors.

### The `alloy-trace` CLI

The `@alloy-js/trace-cli` package provides `alloy-trace` for querying trace databases.

**Overview:**

```sh
alloy-trace stats                    # summary with overhead analysis
alloy-trace errors                   # render errors with component stacks
```

**Reactive graph:**

```sh
alloy-trace effect list              # all effects
alloy-trace effect hotspots          # most-active effects
alloy-trace effect chain <id>        # dependency/trigger chain
alloy-trace ref list [--unused]      # all refs (--unused for dead code)
alloy-trace ref hotspots             # refs tracked by most effects
alloy-trace ref fanout <id>          # effects tracking a ref
```

**Render tree:**

```sh
alloy-trace component tree           # render tree hierarchy
alloy-trace component list           # all components
alloy-trace component stats          # component counts
```

**Symbols and output:**

```sh
alloy-trace symbol list              # all symbols
alloy-trace scope list               # all scopes
alloy-trace file list                # generated files
```

**Custom queries:**

```sh
alloy-trace query "SELECT * FROM effects WHERE type = 'render'"
```

### Diagnostic Workflow

1. Start with `stats` for a high-level overview; check for framework vs. user effect overhead.
2. Check `errors` for render errors.
3. Use `effect hotspots` / `ref hotspots` to find performance bottlenecks (over-tracked refs, frequently-running effects).
4. Use `effect chain <id>` to trace why a specific effect is running.
5. Use `ref list --unused` to find dead reactive values.
6. Use `query "..."` for ad-hoc SQL for deeper investigation.

## Devtools

For live debugging, Alloy provides a WebSocket-based devtools server that streams reactive state in real time.

### Enabling

```sh
ALLOY_DEBUG=1 node my-generator.js               # auto-start on render
ALLOY_DEBUG_PORT=9000 ALLOY_DEBUG=1 node my-gen.js  # custom port
```

Or programmatically:

```ts
import {
  enableDevtools,
  waitForDevtoolsConnection,
} from "@alloy-js/core/devtools";

await enableDevtools({ port: 8123 }); // start server
await waitForDevtoolsConnection(); // block until client connects
```

### Usage

Open `http://localhost:8123/` (default port) in a browser. The devtools UI connects via WebSocket and subscribes to data channels. Only one client can connect at a time.

**Available channels:** render tree, effects, refs, edges, symbols, scopes, output files, directories, errors, diagnostics, effect lifecycle, scheduler jobs.

The devtools display the same data as trace files but streamed live, including reactive updates after the initial render.
