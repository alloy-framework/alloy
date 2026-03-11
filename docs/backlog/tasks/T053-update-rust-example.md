# T053 — Update rust-example Sample with Expression Components

| Field | Value |
|-------|-------|
| **ID** | T053 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | test |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T039 (Reference scope traversal), T040 (Missing newlines), T041 (Trait abstract methods), T042 (Enum tuple variants), T043 (Standalone SourceFile registration), T046 (StructExpression), T047 (MatchExpression), T048 (IfExpression), T049 (LetBinding), T050 (FunctionCallExpression), T051 (ClosureExpression), T052 (ReturnExpression + MacroCall) |
| **Blocks** | — |

---

## Description

Once all bug fixes (T039–T045) and new expression/statement components (T046–T052) are implemented, refactor `samples/rust-example/` to:

1. Replace raw `code` template literals with the new expression components
2. Use `Reference` in field types, parameters, and return types (enabled by T039)
3. Verify that newline formatting is correct (T040)
4. Use proper enum tuple variant syntax (T042)
5. Verify trait abstract methods render with `;` (T041)
6. Verify standalone `config.rs` gets a `mod config;` declaration (T043)
7. Verify lib.rs renders correctly regardless of JSX ordering (T045)

---

## Goal

The `samples/rust-example/` sample demonstrates the full power of `@alloy-js/rust` with minimal raw code, serving as both a test and a showcase.

---

## Scope Included

- Refactor all 4 component files in `samples/rust-example/src/components/`:
  - `error-module.tsx` — Use `MatchExpression` for Display impl, `Reference` in types
  - `traits-module.tsx` — Verify abstract method rendering
  - `store-module.tsx` — Use `StructExpression`, `IfExpression`, `MatchExpression`, `LetBinding`, `ClosureExpression`, `Reference` in fields/params
  - `config-file.tsx` — Use `StructExpression` for all builder methods, `Reference` in field types
- Update `src/externals.ts` if needed
- Update `src/index.tsx` if needed
- Verify build succeeds and generated output is syntactically correct Rust
- Remove workarounds that were needed before bug fixes

---

## Scope Excluded

- Changes to the Rust package itself (those are in T039–T052)
- New sample features beyond what currently exists

---

## Acceptance Criteria

- [ ] `pnpm --filter rust-example build` succeeds
- [ ] `node dist/src/index.js` generates all files without errors
- [ ] Generated Rust code has proper formatting (newlines between items)
- [ ] Raw `code` template usage reduced from 24 instances to ≤4
- [ ] `Reference` used for type annotations in fields, parameters, and return types
- [ ] Generated `lib.rs` includes `mod config;` for standalone config.rs
- [ ] Generated trait methods use `;` not `{}`
- [ ] Generated enum tuple variants use `(Type)` not `{ Type }`

---

## Evidence

This task integrates all fixes and new components discovered during the initial `samples/rust-example/` creation. See the analysis in the session plan for the full breakdown of 24 raw code instances and which components replace them.
