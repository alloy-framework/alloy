# T029: Standard Library Builtins

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T029                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | feature                                                                                 |
| **Status**       | pending                                                                                 |
| **Priority**     | medium                                                                                  |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T028                                                                                    |
| **Blocks**       | —                                                                                       |

---

## Description

Define the Rust standard library (`std`) as a crate descriptor using `createCrate()`, covering the most commonly used types, traits, and functions. Also define the `PRELUDE_TYPES` list used by reference resolution (T022) to skip import generation for types that are automatically in scope.

## Goal

Provide a ready-to-use `std` crate descriptor so that generated code can reference standard library types and traits with automatic import resolution.

## Scope

- Create `src/builtins/std.ts` — the std crate descriptor.
- Create `src/builtins/index.ts` — barrel export.
- Define std crate modules and symbols:
  - **Root / prelude**: `Option`, `Some`, `None`, `Result`, `Ok`, `Err`, `Vec`, `String`, `Box`.
  - **`rc`**: `Rc`.
  - **`sync`**: `Arc`.
  - **`collections`**: `HashMap`, `HashSet`, `BTreeMap`, `BTreeSet`.
  - **`fmt`**: `Display`, `Debug`, `Formatter`.
  - **`io`**: `Read`, `Write`, `Result` (as `IoResult`).
  - **`clone`**: `Clone`.
  - **`default`**: `Default`.
  - **`convert`**: `From`, `Into`.
- Define `PRELUDE_TYPES` — a `Set<string>` of type names in the Rust prelude that do not need `use` statements:
  - `Option`, `Some`, `None`, `Result`, `Ok`, `Err`, `Vec`, `String`, `Box`, `Clone`, `Default`, `From`, `Into`, `Drop`, `Fn`, `FnMut`, `FnOnce`, `Iterator`, `Send`, `Sync`, `Sized`, `Copy`, `ToString`.
- Export `PRELUDE_TYPES` for use in reference resolution (T022).
- Create `test/builtins.test.tsx`.

## Out of Scope

- Exhaustive std coverage (only common types).
- Nightly-only std features.
- `std::os` platform-specific modules.
- `std::ffi` and `std::ptr`.

## Context Files

- `packages/rust/src/create-crate.ts` — crate factory (from T028).
- `packages/rust/src/symbols/reference.tsx` — consumes `PRELUDE_TYPES` (from T022).
- Rust std library documentation for module paths and type names.

## Implementation Guidance

1. **File**: `packages/rust/src/builtins/std.ts`.
2. **Crate descriptor**:
   ```ts
   import { createCrate } from "../create-crate.js";

   export const std = createCrate({
     name: "std",
     modules: {
       "": {
         Option: { kind: "enum" },
         Result: { kind: "enum" },
         Vec: { kind: "struct" },
         String: { kind: "struct" },
         Box: { kind: "struct" },
       },
       "rc": { Rc: { kind: "struct" } },
       "sync": { Arc: { kind: "struct" } },
       "collections": {
         HashMap: { kind: "struct" },
         HashSet: { kind: "struct" },
         BTreeMap: { kind: "struct" },
         BTreeSet: { kind: "struct" },
       },
       "fmt": {
         Display: { kind: "trait" },
         Debug: { kind: "trait" },
         Formatter: { kind: "struct" },
       },
       "io": {
         Read: { kind: "trait" },
         Write: { kind: "trait" },
       },
       "clone": { Clone: { kind: "trait" } },
       "default": { Default: { kind: "trait" } },
       "convert": {
         From: { kind: "trait" },
         Into: { kind: "trait" },
       },
     },
   });
   ```
3. **PRELUDE_TYPES**:
   ```ts
   export const PRELUDE_TYPES = new Set([
     "Option", "Some", "None", "Result", "Ok", "Err",
     "Vec", "String", "Box", "Clone", "Default",
     "From", "Into", "Drop", "Fn", "FnMut", "FnOnce",
     "Iterator", "Send", "Sync", "Sized", "Copy", "ToString",
   ]);
   ```
4. **Barrel export**: `src/builtins/index.ts` re-exports `std` and `PRELUDE_TYPES`.
5. **Tests**: Verify that refkeys are generated for all described symbols and that `PRELUDE_TYPES` contains the expected entries.

## Acceptance Criteria

- [ ] `std` crate descriptor provides refkeys for all listed symbols.
- [ ] `PRELUDE_TYPES` contains all standard prelude types.
- [ ] `std[""].Option` returns a valid `Refkey`.
- [ ] `std.fmt.Display` returns a valid `Refkey`.
- [ ] `std.collections.HashMap` returns a valid `Refkey`.
- [ ] Referencing a prelude type does not generate a `use` statement.
- [ ] Referencing a non-prelude std type generates `use std::module::Type;`.

## Definition of Done

- `src/builtins/std.ts` exists and exports `std` crate descriptor.
- `src/builtins/index.ts` exists and exports `std` and `PRELUDE_TYPES`.
- `test/builtins.test.tsx` passes with all acceptance criteria covered.
- Builtins are re-exported from `src/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/builtins.test.tsx
```
