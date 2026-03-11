# T033: Barrel Exports

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T033                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | infra                                                                                   |
| **Status**       | pending                                                                                 |
| **Priority**     | medium                                                                                  |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T032                                                                                    |
| **Blocks**       | —                                                                                       |

---

## Description

Verify and complete all barrel export files (`index.ts`) in the `@alloy-js/rust` package so that consumers can import everything they need from the package entry point. This includes components, symbols, scopes, name policy, create-crate factory, parameter descriptors, builtins, context utilities, and STC wrappers.

## Goal

Ensure the `@alloy-js/rust` package has a clean, complete public API surface that can be consumed by external projects and TypeSpec emitters.

## Scope

- Verify `src/index.ts` re-exports:
  - `src/components/index.ts` (all components + STC wrappers).
  - `src/symbols/index.ts` (all symbols, scopes, factories).
  - `src/builtins/index.ts` (std descriptor, `PRELUDE_TYPES`).
  - `src/create-crate.ts` (factory + types).
  - `src/name-policy.ts` (Rust naming conventions).
  - Any context or utility modules.
- Verify `src/components/index.ts` exports all components:
  - `StructDeclaration`, `Field`, `EnumDeclaration`, `EnumVariant`, `FunctionDeclaration`, `TraitDeclaration`, `ImplBlock`, `TypeAlias`, `ConstDeclaration`, `Attribute`, `DeriveAttribute`, `DocComment`, `UseStatement`, `UseStatements`, `SourceFile`, `CrateDirectory`, `ModuleDirectory`, `CargoTomlFile`.
  - STC wrappers from `./stc/index.js`.
- Verify `src/symbols/index.ts` exports all symbols and scopes:
  - `RustCrateScope`, `RustModuleScope`, `RustImplScope`, `RustTraitScope`.
  - `NamedTypeSymbol`, reference utilities.
- Add any missing exports.
- Create a compile test: a TypeScript file that imports key items from `@alloy-js/rust` to verify they resolve.

## Out of Scope

- API documentation generation.
- Deprecation warnings.
- Subpath exports in `package.json`.

## Context Files

- `packages/go/src/index.ts` — reference for barrel export pattern.
- `packages/csharp/src/index.ts` — another reference.
- `packages/rust/src/index.ts` — the file to verify and update.
- `packages/rust/package.json` — package entry point configuration.

## Implementation Guidance

1. **Audit**: Read through all `src/**/*.ts` and `src/**/*.tsx` files to identify every public export.
2. **Component index**: Ensure `src/components/index.ts` has an export line for every component file:
   ```ts
   export { StructDeclaration, StructDeclarationProps } from "./struct-declaration.js";
   export { Field, FieldProps } from "./field.js";
   // ... etc
   export * from "./stc/index.js";
   ```
3. **Symbol index**: Ensure `src/symbols/index.ts` exports all scopes and symbol types.
4. **Root index**: Ensure `src/index.ts` aggregates all sub-indexes:
   ```ts
   export * from "./components/index.js";
   export * from "./symbols/index.js";
   export * from "./builtins/index.js";
   export * from "./create-crate.js";
   export * from "./name-policy.js";
   ```
5. **Compile test**: Create a test file that imports key types and verifies they are defined:
   ```ts
   import { StructDeclaration, RustCrateScope, createCrate, std } from "@alloy-js/rust";
   // If this compiles, exports are correct
   ```
6. **Check for conflicts**: Ensure no naming conflicts between re-exported modules.

## Acceptance Criteria

- [ ] `src/index.ts` re-exports all public modules.
- [ ] `src/components/index.ts` exports all components and STC wrappers.
- [ ] `src/symbols/index.ts` exports all symbols and scopes.
- [ ] `src/builtins/index.ts` exports std and PRELUDE_TYPES.
- [ ] A consumer file can import all key items from `@alloy-js/rust`.
- [ ] No export naming conflicts.
- [ ] Package compiles cleanly with `tsc`.

## Definition of Done

- All barrel export files are complete and consistent.
- Compile test passes.
- `tsc --noEmit` succeeds for the package.

## Validation

```bash
cd packages/rust
npx tsc --noEmit
```
