# T022: Reference Resolution

| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **ID**           | T022                                                                        |
| **Epic**         | [E005 — Module System & Imports](../epics/E005-module-system-imports.md)    |
| **Type**         | feature                                                                     |
| **Status**       | done                                                                        |
| **Priority**     | high                                                                        |
| **Owner**        | AI coding agent                                                             |
| **AI Executable**| yes                                                                         |
| **Human Review** | yes                                                                         |
| **Dependencies** | T005, T010                                                                  |
| **Blocks**       | T023, T026                                                                  |

---

## Description

Implement Rust-specific reference resolution logic. When a symbol is referenced via `refkey`, the resolver must determine the relationship between the reference site and the symbol definition (same module, same crate but different module, or external crate) and generate the appropriate `use` import or render the name directly.

## Goal

Enable automatic import generation when referencing symbols across modules and crates, following Rust's module and import conventions.

## Scope

- Create or update `src/symbols/reference.tsx` (or `.ts`).
- Implement a `ref()` function (or update the existing `Reference` component) that:
  1. Resolves a `Refkey` via the binder to get the target symbol and `ResolutionResult`.
  2. Determines the relationship: same-module, same-crate-different-module, or external-crate.
  3. **Same module**: render the symbol name only (no import needed).
  4. **Same crate, different module**: call `moduleScope.addUse("crate::path::to", symbol)` to register a use import, then render the symbol name.
  5. **External crate**: call `moduleScope.addUse("<crate>::path", symbol)` to register the import AND call `crateScope.addDependency()` to register the crate dependency.
- Build the use path from `ResolutionResult.pathDown` (the scope chain from resolution root to the symbol).
- **Prelude handling**: maintain a `PRELUDE_TYPES` set of types that are automatically in scope (e.g., `Option`, `Result`, `Vec`, `String`, `Box`, `Some`, `None`, `Ok`, `Err`). Skip use generation for these types.
- Maintain a `PRELUDE_TYPES: Set<string>` constant with Rust prelude types. Skip `use` generation for prelude types. Full list: Option, Some, None, Result, Ok, Err, Vec, String, ToString, Box, Clone, Copy, Default, Drop, Eq, PartialEq, Ord, PartialOrd, Iterator, IntoIterator, From, Into, TryFrom, TryInto, AsRef, AsMut, Send, Sync, Sized, Unpin, ToOwned, Fn, FnMut, FnOnce, bool, char, f32, f64, i8, i16, i32, i64, i128, isize, u8, u16, u32, u64, u128, usize, str.
- Create `test/reference.test.tsx` with basic resolution tests.

## Out of Scope

- Glob imports (`use path::*`).
- Re-exports (`pub use`).
- Aliased imports (`use path::Type as Alias`).
- Fully qualified syntax (`<Type as Trait>::method`).

## Context Files

- `packages/go/src/symbols/reference.ts` — closest analog in existing Alloy packages.
- `packages/rust/src/symbols/rust-module-scope.ts` — module scope with import tracking (from T005).
- `packages/rust/src/symbols/rust-crate-scope.ts` — crate scope with dependency tracking (from T005).
- `packages/core/src/components/Reference.tsx` — base Reference component.
- `packages/core/src/binder.ts` — binder and resolution result types.

## Implementation Guidance

1. **File**: `packages/rust/src/symbols/reference.tsx`.
2. **Resolution flow**:
   - Resolve the refkey using the binder: `binder.resolve(refkey)`.
   - Get the `ResolutionResult` which includes `pathDown` (array of scopes from common ancestor to target).
   - Walk `pathDown` to build the Rust path segments (module names, crate name).
3. **Same-module check**: If the target symbol's nearest module scope is the same as the reference site's module scope, render name only.
4. **Same-crate check**: If the target symbol's crate scope matches the reference site's crate scope but the module scope differs, generate a `crate::` prefixed path.
5. **External-crate check**: If crate scopes differ, use the external crate name and register a dependency.
6. **Prelude bypass**: Before generating any import, check if the symbol name is in `PRELUDE_TYPES`. If so, render the name directly.
7. **Module scope API**: Call `moduleScope.addUse(path, symbolName)` where `path` is the full use path without the final symbol name.
8. **Reference**: Study `packages/go/src/symbols/reference.ts` carefully — it implements a similar resolution pattern for Go imports.

## Acceptance Criteria

- [x] Reference to a symbol in the same module renders just the symbol name.
- [x] Reference to a symbol in a different module of the same crate triggers a `crate::mod::Symbol` use import.
- [x] Reference to a symbol in an external crate triggers the correct use import and registers a crate dependency.
- [x] Prelude types (`Option`, `Result`, `Vec`, etc.) do not generate use statements.
- [x] The use path is correctly built from `ResolutionResult.pathDown`.

## Definition of Done

- `src/symbols/reference.tsx` exists and exports the reference resolution logic.
- `test/reference.test.tsx` passes with all acceptance criteria covered.
- Module is re-exported from `src/symbols/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/reference.test.tsx
```
