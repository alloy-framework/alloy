# T068 — Fix rust-example externals TS2742 Build Failure

| Field | Value |
|-------|-------|
| **ID** | T068 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T053 (Update rust-example sample) |
| **Blocks** | — |

---

## Description

`pnpm --filter rust-example build` currently fails with a pre-existing TypeScript portability error (`TS2742`) rooted in `samples/rust-example/src/externals.ts`.

This failure is unrelated to Rust package component correctness, but it prevents sample-build validation from passing cleanly.

---

## Scope Included

- Reproduce and capture the exact `TS2742` failure in `samples/rust-example/src/externals.ts`
- Refactor/export-type annotations in `externals.ts` to avoid non-portable inferred types
- Keep generated/output behavior unchanged
- Re-run `pnpm --filter rust-example build` to confirm the sample build succeeds

---

## Scope Excluded

- Feature work in `@alloy-js/rust` components
- Non-TS2742 sample refactors outside `externals.ts` unless strictly required for the fix

---

## Acceptance Criteria

- [x] `pnpm --filter rust-example build` succeeds without `TS2742`
- [x] `samples/rust-example/src/externals.ts` no longer relies on non-portable inferred exported types
- [x] No behavior change in sample generation flow

---

## Evidence

Observed during T053 RECORD phase on 2026-03-12: `pnpm --filter rust-example build` still fails with pre-existing `TS2742` in `samples/rust-example/src/externals.ts`.

Resolved on 2026-03-12 by replacing inferred exported crate values in `samples/rust-example/src/externals.ts` with explicit descriptor constants (`as const`) and explicit exported crate type aliases (`CrateRef<typeof descriptor> & SymbolCreator & ExternalCrate`).
