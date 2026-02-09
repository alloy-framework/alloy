---
title: Diagnosing issues
description: Tools and techniques for debugging Alloy projects.
---

## Dev builds

In development mode, the Alloy babel transform injects source location metadata
(file name, line, column) into every compiled JSX element as an extra argument to
`createComponent()`. This is what powers component stack traces and devtools
source links — it is **not** the same as TypeScript/esbuild source maps.

| Command | Mode | Source info injected? |
|---------|------|-----------------------|
| `alloy build --watch` | development (default) | ✓ |
| `alloy build` | production (default) | ✗ |
| `alloy build --dev` | development (explicit) | ✓ |
| `alloy build --source-info` | any | ✓ (explicit override) |

Mode is determined by: CLI flags (`--dev`/`--prod`) > `BABEL_ENV` > `NODE_ENV` >
default (watch → dev, otherwise → prod).

When debugging, use watch mode (`alloy build --watch`) — it rebuilds
incrementally and includes source info by default.

## Console tracing with ALLOY_TRACE

Set `ALLOY_TRACE` to a comma-separated list of phases to log to the console:

```sh
ALLOY_TRACE=symbol,resolve npx vitest run
```

Each trace line shows a colored phase tag, trace IDs in brackets, and a message.

### Available phases

| Phase | What it traces |
|-------|---------------|
| `scope` | create, update, delete, copySymbols, moveSymbols |
| `symbol` | create, update, delete, resolve, flow, addToScope, removeFromScope, instantiate, clone |
| `resolve` | success, pending, failure |
| `effect` | schedule, track, trigger, effectAdded, effectUpdated, refAdded |
| `render` | appendChild, appendComponent, appendMemo, renderEffect, and others |

You can also trace a specific sub-area: `ALLOY_TRACE=symbol.create,resolve.failure`.

### Breaking on a trace ID

Each trace event gets a sequential numeric ID shown in brackets. To pause
execution on a specific ID:

```sh
ALLOY_TRACE=symbol ALLOY_BREAK_ON_DID=5 node --inspect my-app.js
```

This inserts a `debugger` statement when trace event 5 fires. Requires a
debugger to be attached (e.g. `--inspect` or `--inspect-brk`).

## Devtools UI

Alloy ships a browser-based devtools for inspecting renders, symbols, effects,
and diagnostics in real time.

### Starting devtools

```sh
ALLOY_DEBUG=1 node my-app.js
```

The server starts on port 8123 (override with `ALLOY_DEBUG_PORT`). Output:

```
Alloy <version>
➜ Debug UI: http://localhost:8123/
➜ Websocket: ws://localhost:8123/

Waiting for connection... Connected!
```

Open the URL in a browser to connect.

### render() vs renderAsync()

With `ALLOY_DEBUG=1`, `render()` requires the devtools client to be connected
before it runs — otherwise it throws. Use `renderAsync()` instead, which
awaits the devtools connection automatically:

```ts
// With ALLOY_DEBUG=1:
await renderAsync(<Output>...</Output>); // ✓ connects then renders
render(<Output>...</Output>);            // ✗ throws if devtools not connected
```

### Devtools panels

**Left panel** — file explorer and symbol tree.

**Top right** — tabbed detail views for files, components, errors, diagnostics, and symbols.

**Bottom right** — four tabs:

| Tab | Shows |
|-----|-------|
| Render Tree | Component hierarchy. Click a node to inspect props and children. |
| Problems | Diagnostics and errors with component stacks. |
| Effects | Reactive effect graph — tracks, triggers, and dependencies. |
| Trace | Live stream of all trace events with category filters. |

The Render Tree panel has **Rerender** and **Rerender + Break** buttons on each
node, letting you re-trigger a component's render and optionally pause in the
debugger.

## Common error messages

| Error | Cause |
|-------|-------|
| `Cannot render without a context` | Missing `<Output>` wrapper around your tree |
| `Source file doesn't have parent directory` | `<SourceFile>` not inside an `<Output>` |
| `ALLOY_DEBUG is set but devtools are not connected` | Used `render()` instead of `renderAsync()` with `ALLOY_DEBUG=1` |
| `Asynchronous jobs were found but render was called synchronously` | Async work in tree — switch to `renderAsync()` |
| `Need binder context to create declarations` | `<Declaration>` used outside a scope |
| `Can only emit references inside of source files` | `<Reference>` used outside `<SourceFile>` |

All render errors include a component stack trace showing the path through your
component tree to the error site, with file locations when built in dev mode.

## Diagnostics API

Components can emit diagnostics (info, warning, error) via the diagnostics
collector attached to the render context. These appear in the devtools Problems
panel and are reported to the console after rendering.

## Quick reference

```sh
# Trace symbol creation and resolution failures
ALLOY_TRACE=symbol.create,resolve.failure npx vitest run

# Break when trace event #12 fires
ALLOY_TRACE=effect ALLOY_BREAK_ON_DID=12 node --inspect my-app.js

# Devtools on a custom port
ALLOY_DEBUG=1 ALLOY_DEBUG_PORT=9000 node my-app.js
```
