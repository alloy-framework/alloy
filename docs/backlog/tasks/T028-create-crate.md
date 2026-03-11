# T028: createCrate Factory

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T028                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | feature                                                                                 |
| **Status**       | pending                                                                                 |
| **Priority**     | high                                                                                    |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T003, T005, T006                                                                        |
| **Blocks**       | T029, T031                                                                              |

---

## Description

Implement the `createCrate()` factory function for the `@alloy-js/rust` package. This factory allows external crates (like `serde`, `tokio`, `std`) to be described declaratively so that their symbols can be referenced and resolved without rendering the crate itself. The factory implements the `SymbolCreator` protocol for lazy symbol creation via the binder.

## Goal

Enable declarative description of external crates so that referencing their symbols automatically generates correct `use` statements and `Cargo.toml` dependencies.

## Scope

- Create `src/create-crate.ts`.
- `createCrate(descriptor)` function:
  - Takes a `CrateDescriptor` — a nested object mapping module paths to named exports.
  - Returns a `CrateRef` — an object keyed by module path then symbol name, each value being a `Refkey`.
  - Implements the `SymbolCreator` protocol so the binder lazily creates symbols when first referenced.
- `CrateDescriptor` type definition:
  ```ts
  interface CrateDescriptor {
    name: string;
    version?: string;
    modules: Record<string, Record<string, SymbolDescriptor>>;
  }
  ```
- `SymbolDescriptor` — describes the kind, name, and metadata of each symbol.
- Create `test/create-crate.test.tsx`.

## Out of Scope

- Feature flags on crate dependencies.
- Optional dependencies.
- Workspace dependency inheritance.
- Proc-macro crates.

## Context Files

- `packages/go/src/create-module.ts` — closest pattern in existing Alloy packages.
- `packages/core/src/binder.ts` — binder and SymbolCreator protocol.
- `packages/rust/src/symbols/rust-crate-scope.ts` — crate scope (from T005).
- `packages/rust/src/symbols/rust-module-scope.ts` — module scope (from T005).

## Implementation Guidance

1. **File**: `packages/rust/src/create-crate.ts`.
2. **Descriptor shape**: Design `CrateDescriptor` to mirror the module structure of the external crate:
   ```ts
   const serde = createCrate({
     name: "serde",
     version: "1.0",
     modules: {
       "": { Serialize: { kind: "trait" }, Deserialize: { kind: "trait" } },
       "json": { to_string: { kind: "function" }, from_str: { kind: "function" } },
     },
   });
   // serde[""].Serialize → Refkey
   // serde.json.to_string → Refkey
   ```
3. **SymbolCreator protocol**: The returned object must implement `SymbolCreator` so the binder can lazily instantiate symbols when they are first resolved. Study `packages/go/src/create-module.ts` for the exact protocol.
4. **Refkey generation**: Generate stable refkeys for each symbol in the descriptor.
5. **Crate metadata**: Store crate name and version so that when a symbol is referenced, the crate can be added to `Cargo.toml` dependencies.
6. **Return type**: `CrateRef` should be a deeply-typed object where `crateRef.modulePath.symbolName` returns a `Refkey`.

## Acceptance Criteria

- [ ] `createCrate()` returns a `CrateRef` with refkeys for all described symbols.
- [ ] Symbols are lazily created when first resolved by the binder.
- [ ] Crate name and version are accessible for dependency tracking.
- [ ] Module paths correctly map to Rust module hierarchy.
- [ ] Root module symbols (path `""`) are accessible at `crateRef[""].SymbolName`.

## Definition of Done

- `src/create-crate.ts` exists and exports `createCrate`, `CrateDescriptor`, `CrateRef`.
- `test/create-crate.test.tsx` passes with all acceptance criteria covered.
- Module is re-exported from `src/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/create-crate.test.tsx
```
