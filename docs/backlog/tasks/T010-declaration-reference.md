# T010: Declaration and Reference Basics

| Field       | Value                                            |
| ----------- | ------------------------------------------------ |
| **Task ID** | T010                                             |
| **Epic**    | E003 — Core Declaration Components               |
| **Deps**    | T006 (Symbol factories), T009 (SourceFile/Crate) |
| **Blocks**  | T011, T012, T013, T014, T015, T016, T017, T018   |
| **Status**  | Done                                             |

## Description

Create the base `Declaration` component that wraps core's `Declaration` and handles Rust visibility prefix rendering (`pub`, `pub(crate)`). Create the initial `Reference` component that resolves a `refkey` and renders the symbol's name. Import tracking for `use` statements is deferred to T022.

## Goal

Provide reusable declaration and reference primitives that all subsequent Rust declaration components (struct, enum, function, etc.) will build upon.

## Scope

- `src/components/declaration.tsx` — `Declaration` component.
- `src/components/reference.tsx` — `Reference` component.

### Props

```ts
interface DeclarationProps {
  name: string;
  refkey?: Refkey;
  nameKind?: string; // e.g., "type", "function", "constant"
  pub?: boolean;
  pub_crate?: boolean;
  children?: Children;
}

interface ReferenceProps {
  refkey: Refkey;
}
```

## Out of Scope

- Import tracking and `use` statement generation (T022).
- Path-qualified references (`crate::module::Type`).
- Trait/impl-aware reference resolution.

## Context Files

| File                                                   | Why                                          |
| ------------------------------------------------------ | -------------------------------------------- |
| `packages/go/src/symbols/reference.ts`                 | Reference pattern for symbol name resolution |
| `packages/typescript/src/components/Declaration.tsx`   | Core Declaration wrapping pattern            |
| `packages/core/src/components/Declaration.tsx`         | Core Declaration being wrapped               |
| `packages/csharp/src/components/CSharpDeclaration.tsx` | Visibility modifier pattern                  |

## Implementation Guidance

### Declaration

1. Import `Declaration as CoreDeclaration` from `@alloy-js/core`.
2. Accept visibility props: `pub` and `pub_crate` (mutually exclusive; `pub` takes precedence).
3. Render visibility prefix BEFORE the core Declaration's content:
   - `props.pub` → render `pub `.
   - `props.pub_crate` → render `pub(crate) `.
   - Neither → render nothing (private by default in Rust).
4. Pass `name`, `refkey`, `nameKind` through to core Declaration.
5. Render children inside the core Declaration.

```tsx
// Pseudocode
function Declaration(props: DeclarationProps) {
  const visibility =
    props.pub ? "pub "
    : props.pub_crate ? "pub(crate) "
    : "";
  return (
    <CoreDeclaration
      name={props.name}
      refkey={props.refkey}
      nameKind={props.nameKind}
    >
      {visibility}
      {props.children}
    </CoreDeclaration>
  );
}
```

### Reference

1. Use core's symbol resolution mechanism (e.g., `resolve` or `useContext`) to look up the symbol by `refkey`.
2. Render the resolved symbol's name.
3. Do NOT generate `use` statements or path prefixes yet — just the bare name.

### Alloy Conventions

- Access props as `props.pub`, `props.name` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [ ] `Declaration` renders with no visibility prefix by default.
- [ ] `Declaration` renders `pub ` prefix when `pub={true}`.
- [ ] `Declaration` renders `pub(crate) ` prefix when `pub_crate={true}`.
- [ ] `pub` takes precedence over `pub_crate` if both are set.
- [ ] `Reference` resolves a `refkey` and renders the symbol's name.
- [ ] `Reference` works within a `SourceFile` scope.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- Unit tests for Declaration visibility and Reference resolution pass.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm test
```

## Completion Note

Implemented `Declaration` and `Reference` base components, wired reference resolution through `SourceFile` scope/context, and added tests covering declaration visibility behavior plus reference resolution rendering.
