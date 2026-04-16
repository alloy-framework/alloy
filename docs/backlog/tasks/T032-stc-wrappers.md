# T032: STC Wrappers

| Field             | Value                                                                               |
| ----------------- | ----------------------------------------------------------------------------------- |
| **ID**            | T032                                                                                |
| **Epic**          | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md) |
| **Type**          | feature                                                                             |
| **Status**        | done                                                                                |
| **Priority**      | medium                                                                              |
| **Owner**         | AI coding agent                                                                     |
| **AI Executable** | yes                                                                                 |
| **Human Review**  | yes                                                                                 |
| **Dependencies**  | T011, T012, T013, T014, T015, T016, T017, T018, T019, T020, T021                    |
| **Blocks**        | —                                                                                   |

---

## Description

Create STC (Source Tree Construction) wrappers for all Rust components using the `stc()` utility from `@alloy-js/core`. STC wrappers provide a programmatic API for constructing component trees without JSX, which is useful for code generation from data models and TypeSpec emitters.

## Goal

Provide a complete STC API surface for the Rust package, enabling programmatic tree construction alongside JSX-based construction.

## Scope

- Create `src/components/stc/index.ts`.
- Wrap the following components with `stc()`:
  - `StructDeclaration`
  - `Field`
  - `EnumDeclaration`
  - `EnumVariant`
  - `FunctionDeclaration`
  - `TraitDeclaration`
  - `ImplBlock`
  - `TypeAlias`
  - `ConstDeclaration`
  - `Attribute`
  - `DeriveAttribute`
  - `DocComment`
- Re-export from `src/components/index.ts` and `src/index.ts`.
- Create `test/stc.test.tsx` with basic tests.

## Out of Scope

- STC wrappers for internal/non-public components.
- STC wrappers for layout components (`SourceFile`, `CrateDirectory`).

## Context Files

- `packages/go/src/components/stc/index.ts` — exact pattern to follow.
- `packages/csharp/src/components/stc/index.ts` — another reference.
- `packages/core/src/stc.ts` — the `stc()` utility implementation.

## Implementation Guidance

1. **File**: `packages/rust/src/components/stc/index.ts`.
2. **Pattern**: Follow `packages/go/src/components/stc/index.ts` exactly:

   ```ts
   import { stc } from "@alloy-js/core";
   import { StructDeclaration as StructDeclarationComponent } from "../struct-declaration.js";
   // ... other imports

   export const StructDeclaration = stc(StructDeclarationComponent);
   export const Field = stc(FieldComponent);
   // ... etc
   ```

3. **Naming**: The STC export should use the same name as the component. Import the component with an alias if needed to avoid conflicts.
4. **Completeness**: Wrap every public component that takes props. Skip components that are purely internal.
5. **Re-export**: Ensure `src/components/index.ts` has `export * from "./stc/index.js"` or a namespaced export (check Go package pattern).
6. **Tests**: Verify that each STC wrapper can be called programmatically and produces the same output as the JSX equivalent.

## Acceptance Criteria

- [x] All listed components have STC wrappers.
- [x] STC wrappers produce identical output to JSX equivalents.
- [x] Wrappers are exported from `src/components/stc/index.ts`.
- [x] Wrappers are re-exported from package entry point.
- [x] Basic test verifies at least 3 STC wrappers work correctly.

## Definition of Done

- `src/components/stc/index.ts` exists with all wrappers.
- `test/stc.test.tsx` passes.
- Wrappers are accessible from `@alloy-js/rust`.

## Validation

```bash
cd packages/rust
npx vitest run test/stc.test.tsx
```
