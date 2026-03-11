# T007: Name Policy

| Field | Value |
|-------|-------|
| **ID** | T007 |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P0 — critical path |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T001 |
| **Blocks** | T009 (SourceFile needs name policy) |

## Description
Implement Rust naming conventions via `createRustNamePolicy()`.

## Goal
Ensure generated Rust code follows idiomatic naming conventions.

## Scope Included
Create `packages/rust/src/name-policy.ts` with:

- `RustElements` type: `"function" | "method" | "struct" | "enum" | "enum-variant" | "trait" | "type-alias" | "type-parameter" | "field" | "variable" | "parameter" | "constant" | "module"`.

- `createRustNamePolicy()`:
  - `PascalCase`: struct, enum, enum-variant, trait, type-alias, type-parameter.
  - `snake_case`: function, method, field, variable, parameter, module.
  - `SCREAMING_SNAKE_CASE`: constant.

- Reserved word handling: 37 Rust keywords → prefix with `r#`.
  - Keywords: `as`, `async`, `await`, `break`, `const`, `continue`, `crate`, `dyn`, `else`, `enum`, `extern`, `false`, `fn`, `for`, `if`, `impl`, `in`, `let`, `loop`, `match`, `mod`, `move`, `mut`, `pub`, `ref`, `return`, `self`, `Self`, `static`, `struct`, `super`, `trait`, `true`, `type`, `unsafe`, `use`, `where`, `while`, `yield`.

- `useRustNamePolicy()` hook.

Create `packages/rust/test/name-policy.test.tsx` with tests:
- Each element type transforms correctly.
- Reserved words get `r#` prefix.
- Non-reserved words pass through unchanged.

## Out of Scope
- Name conflict resolution (use default from core).

## Context Files to Read First
- `packages/go/src/name-policy.ts` — Go's name policy (simplest).
- `packages/python/src/name-policy.ts` — Python's name policy.
- `packages/core/src/name-policy.ts` — `createNamePolicy()` API.

## Implementation Guidance
1. Use `createNamePolicy<RustElements>()` from core.
2. Use a case-conversion library or implement manually (check what other packages use — likely `change-case` or manual).
3. For reserved words, check against a Set and prefix with `r#`.
4. Note: `r#` is different from other packages that use `_` suffix. This is Rust-specific.

## Acceptance Criteria
- `createRustNamePolicy()` returns a working name policy.
- `PascalCase`, `snake_case`, `SCREAMING_SNAKE_CASE` applied correctly.
- All 37+ reserved words produce `r#` prefix.
- `name-policy.test.tsx` passes.

## Definition of Done
Name policy implemented and tested.

## Validation Approach
```bash
cd packages/rust && pnpm test -- --run name-policy
```
