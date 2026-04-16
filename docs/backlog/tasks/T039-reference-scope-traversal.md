# T039 — Reference Component Scope Traversal

| Field                     | Value                                                       |
| ------------------------- | ----------------------------------------------------------- |
| **ID**                    | T039                                                        |
| **Epic**                  | [E007](../epics/E007-bug-fixes.md)                          |
| **Type**                  | bug                                                         |
| **Status**                | done                                                        |
| **Priority**              | P0 — critical                                               |
| **Owner Role**            | AI coding agent                                             |
| **AI Executable**         | Yes                                                         |
| **Human Review Required** | Yes                                                         |
| **Dependencies**          | T010 (Declaration & Reference), T022 (Reference Resolution) |
| **Blocks**                | —                                                           |

---

## Description

The `Reference` component (and the underlying `ref()` function in `symbols/reference.ts`) unconditionally calls `useRustModuleScope()` at line 64, which throws `"Expected a Rust module scope"` when used inside any non-module scope — including `RustFunctionScope`, `RustImplScope`, `RustTraitScope`, and struct/enum member scopes.

This makes `Reference` unusable in:

- Struct field types (`<Field type={<Reference refkey={...} />} />`)
- Function parameter types and return types
- Impl block and trait block contents

This defeats the purpose of the reference/import system, forcing users to use plain strings for all type references in nested positions.

---

## Goal

`Reference` works in any scope position by traversing up the scope hierarchy to find the enclosing `RustModuleScope`, rather than requiring the immediate scope to be a module scope.

---

## Scope Included

- Modify `ref()` in `packages/rust/src/symbols/reference.ts` to use scope traversal (e.g., `useRustScope()` + walk up via `enclosingModule` or parent chain) instead of `useRustModuleScope()`
- Ensure `use` statements are still added to the correct enclosing module scope
- Add tests for Reference inside struct fields, function parameters, return types, impl blocks, and trait blocks

---

## Scope Excluded

- Changes to the core scope hierarchy
- New scope types

---

## Acceptance Criteria

- [x] `<Reference refkey={...} />` resolves correctly inside `<Field type={...} />`
- [x] `<Reference refkey={...} />` resolves correctly inside function `parameters` and `returnType`
- [x] `<Reference refkey={...} />` resolves correctly inside `<ImplBlock>` and `<TraitDeclaration>`
- [x] Auto-generated `use` statements appear in the correct enclosing module's source file
- [x] Existing Reference tests continue to pass

---

## Evidence

Discovered while building `samples/rust-example/`. The `ref()` function at `packages/rust/src/symbols/reference.ts:64` calls `useRustModuleScope()` which is implemented in `packages/rust/src/scopes/contexts.ts` and throws if the current scope is not `RustModuleScope` or `RustCrateScope`.
