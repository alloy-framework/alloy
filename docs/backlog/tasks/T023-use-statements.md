# T023: Use Statements

| Field             | Value                                                                    |
| ----------------- | ------------------------------------------------------------------------ |
| **ID**            | T023                                                                     |
| **Epic**          | [E005 — Module System & Imports](../epics/E005-module-system-imports.md) |
| **Type**          | feature                                                                  |
| **Status**        | done                                                                     |
| **Priority**      | high                                                                     |
| **Owner**         | AI coding agent                                                          |
| **AI Executable** | yes                                                                      |
| **Human Review**  | yes                                                                      |
| **Dependencies**  | T022                                                                     |
| **Blocks**        | T026                                                                     |

---

## Description

Implement `UseStatement` and `UseStatements` components that render Rust `use` declarations. `UseStatements` reads accumulated imports from `RustModuleScope` and renders them with proper grouping and sorting according to Rust conventions.

## Goal

Generate correctly formatted, grouped, and sorted `use` statements in each source file based on symbols referenced across module boundaries.

## Scope

- Create `src/components/use-statement.tsx`.
- `UseStatement` component: renders a single `use path::Symbol;` line.
- `UseStatements` component: reads `RustModuleScope.imports` and renders all accumulated use statements.
- **Flat syntax**: Each symbol gets its own `use` statement: `use path::A;`, `use path::B;`.
- **Sorting**: Follow Rust convention:
  1. `std::` imports first.
  2. External crate imports second.
  3. `crate::` imports third.
  4. Alphabetical within each group.
  5. Blank line between groups.
- Update `SourceFile` component to render `UseStatements` after any `mod` declarations and before the main content.
- Create `test/use-statements.test.tsx`.

**MVP Decision:** Use flat `use` statements (`use path::A; use path::B;`) for simplicity. Tree grouping (`use path::{A, B};`) is deferred to post-MVP polish. Flat syntax is valid Rust and `rustfmt` can group if desired.

## Out of Scope

- Tree grouping (`use path::{A, B};`) — deferred to post-MVP.
- Glob imports (`use path::*`).
- Re-exports (`pub use`).
- Aliased imports (`use path::Type as Alias`).
- Nested path groups (`use std::{io::{self, Read}, fmt}`).

## Context Files

- `packages/rust/src/symbols/rust-module-scope.ts` — scope with import tracking (from T005).
- `packages/rust/src/components/source-file.tsx` — the file component to update (from T009).
- `packages/go/src/components/ImportStatements.tsx` — analog in Go package.
- `packages/rust/src/symbols/reference.tsx` — adds imports to module scope (from T022).

## Implementation Guidance

1. **File**: `packages/rust/src/components/use-statement.tsx`.
2. **`UseStatement` component**: Takes `path: string` and `symbol: string` props. Renders:
   - `use path::Symbol;`
3. **`UseStatements` component**: No props needed — reads from the nearest `RustModuleScope` via context.
   - Collect all imports from `moduleScope.imports` (a map of path → symbol names).
   - Group by category: `std`, external, `crate`.
   - Sort alphabetically within each group.
   - Render with blank lines between groups.
4. **Integration with SourceFile**: Update `SourceFile` to include `<UseStatements />` in the rendered output, positioned after `mod` declarations and before the file's main children content.
5. **Do NOT destructure props** — use `props.path`, `props.symbols`, etc.
6. **Use `code` template tag** for raw string fragments like `use `, `::`, `{`, `}`, `;`.

## Acceptance Criteria

- [x] Single import renders as `use std::fmt::Display;`.
- [x] Multiple imports from same path render as flat statements: `use std::fmt::Debug;` and `use std::fmt::Display;`.
- [x] Imports are sorted: `std::` → external → `crate::`.
- [x] Blank line separates import groups.
- [x] Alphabetical order within each group.
- [x] `UseStatements` correctly reads from `RustModuleScope`.
- [x] `SourceFile` renders `UseStatements` in the correct position.

## Definition of Done

- `src/components/use-statement.tsx` exists and exports `UseStatement` and `UseStatements`.
- `test/use-statements.test.tsx` passes with all acceptance criteria covered.
- `SourceFile` updated to include `UseStatements`.
- Components are re-exported from `src/components/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/use-statements.test.tsx
```
