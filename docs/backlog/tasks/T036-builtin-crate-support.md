# T036 — Builtin Crate Support in createCrate / ref

| Field                     | Value                                               |
| ------------------------- | --------------------------------------------------- |
| **ID**                    | T036                                                |
| **Epic**                  | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type**                  | feature                                             |
| **Status**                | done                                                |
| **Priority**              | P0 — blocks T029 (std builtins)                     |
| **Owner Role**            | AI coding agent                                     |
| **AI Executable**         | Yes                                                 |
| **Human Review Required** | Yes                                                 |
| **Dependencies**          | T028 (createCrate factory)                          |
| **Blocks**                | T029 (std builtins)                                 |

---

## Description

Add support for marking crates as "builtin" (implicit) so that referencing their symbols generates `use` statements but does NOT add the crate to `Cargo.toml` `[dependencies]`.

Rust's `std` crate is always available without an explicit dependency declaration. The current `createCrate()` → `ref()` → `addDependency()` pipeline unconditionally records every external crate as a Cargo.toml dependency. This would incorrectly produce `std = "*"` in Cargo.toml when std builtins are referenced.

Go solves this with a `builtin: boolean` parameter in `createModule()` that propagates to `PackageSymbol` (see `packages/go/src/create-module.ts` line 102).

---

## Goal

After this task, `createCrate({ name: "std", builtin: true, ... })` creates a crate descriptor whose symbols generate `use` statements on reference but are excluded from Cargo.toml dependency tracking.

---

## Scope Included

1. Add optional `builtin?: boolean` field to `CrateDescriptor` interface
2. Store `builtin` flag on `CrateFactoryState` in `create-crate.ts`
3. Expose `isBuiltinCrate(crate: ExternalCrate): boolean` utility function
4. Modify `ref()` in `reference.ts` to skip `sourceCrate.addDependency()` when the target crate is builtin
5. Add tests for builtin crate behavior

---

## Out of Scope

- Implementing the actual `std` descriptor (that's T029)
- Changes to `CargoTomlFile` rendering (it already reads from `RustCrateScope.dependencies`)
- Changes to `UseStatement` / `UseStatements` (use generation already works correctly)

---

## Context Files

| File                                           | Relevance                                  |
| ---------------------------------------------- | ------------------------------------------ |
| `packages/rust/src/create-crate.ts`            | Add `builtin` to descriptor and state      |
| `packages/rust/src/symbols/reference.ts`       | Conditional `addDependency()` on line ~101 |
| `packages/rust/src/scopes/rust-crate-scope.ts` | Where dependencies are stored              |
| `packages/go/src/create-module.ts`             | Go's builtin pattern (lines 102-113)       |
| `packages/rust/test/create-crate.test.tsx`     | Add builtin test cases                     |

---

## Implementation Guidance

### Step 1: Update `CrateDescriptor` interface

In `packages/rust/src/create-crate.ts`:

```typescript
export interface CrateDescriptor<TModules = ...> {
  name: string;
  version?: string;
  builtin?: boolean;  // NEW: if true, crate is implicit (e.g., std) — no Cargo.toml entry
  modules: TModules;
}
```

### Step 2: Store builtin flag on factory state

In `CrateFactoryState`:

```typescript
interface CrateFactoryState {
  name: string;
  version?: string;
  builtin: boolean; // NEW
  scopes: WeakMap<Binder, RustCrateScope>;
}
```

Set from descriptor: `builtin: descriptor.builtin ?? false`.

### Step 3: Expose helper

```typescript
export function isBuiltinCrate(crate: ExternalCrate): boolean {
  return getFactoryState(crate).builtin;
}
```

### Step 4: Modify `ref()` in `reference.ts`

At approximately line 101, wrap the `addDependency` call:

```typescript
// Before:
sourceCrate.addDependency(targetCrate.name, targetCrate.version ?? "*");

// After:
import { isBuiltinCrate, type ExternalCrate } from "../create-crate.js";
// ... in the external crate branch:
if (!(isBuiltinCrate(/* the external crate object */))) {
  sourceCrate.addDependency(targetCrate.name, targetCrate.version ?? "*");
}
```

**Key challenge:** The `ref()` function resolves symbols via the binder and gets a `ResolutionResult`. It needs access to the `ExternalCrate` object to check if it's builtin. The crate scope is available via `targetCrate` (a `RustCrateScope`). The factory state stores `scopes: WeakMap<Binder, RustCrateScope>` — but we need the reverse lookup: from `RustCrateScope` to `ExternalCrate`.

**Approach options:**

1. Store `builtin` on `RustCrateScope` itself (simplest — add `builtin: boolean` constructor param)
2. Maintain a reverse map from scope to factory state

Option 1 is recommended — it's simpler and `RustCrateScope` already accepts constructor args.

### Step 5: Alternative — Store builtin on RustCrateScope

In `rust-crate-scope.ts`, add a `builtin` property. In `create-crate.ts`, pass `builtin` when creating the scope via `createScope(RustCrateScope, name, version, { binder, metadata: { external: true, builtin: true } })`.

Then in `reference.ts`: `if (!targetCrate.metadata?.builtin) { sourceCrate.addDependency(...); }`.

---

## Acceptance Criteria

- [x] `CrateDescriptor` interface has optional `builtin` field
- [x] `createCrate({ name: "std", builtin: true, modules: { ... } })` creates a crate
- [x] Referencing a symbol from a builtin crate generates `use std::collections::HashMap;`
- [x] Builtin crate does NOT appear in `RustCrateScope.dependencies`
- [x] Existing non-builtin crate behavior unchanged (serde tests still pass)
- [x] `isBuiltinCrate()` or equivalent check is exposed

---

## Definition of Done

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

All existing tests pass. New builtin crate test passes.

## Completion Notes

- Added `builtin?: boolean` to `CrateDescriptor` and persisted it in `CrateFactoryState`.
- Added exported `isBuiltinCrate(crate)` utility in `create-crate.ts`.
- Added `builtin` support to `RustCrateScope` options/property and propagated it during scope creation.
- Updated `ref()` to keep generating `use` statements while skipping dependency tracking for builtin crates.
- Added/ran coverage in `packages/rust/test/create-crate.test.tsx` for builtin-crate behavior.
