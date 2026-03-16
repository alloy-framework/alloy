# T014: TypeAlias and ConstDeclaration

| Field       | Value                                                 |
| ----------- | ----------------------------------------------------- |
| **Task ID** | T014                                                  |
| **Epic**    | E003 — Core Declaration Components                    |
| **Deps**    | T006 (Symbol factories), T010 (Declaration/Reference) |
| **Blocks**  | —                                                     |
| **Status**  | done                                                  |

## Description

Create `TypeAlias` and `ConstDeclaration` components for generating Rust type aliases and constant declarations.

## Goal

Enable users to generate `type` aliases and `const` declarations in Rust output.

## Scope

- `src/components/type-alias.tsx` — `TypeAlias` component.
- `src/components/const-declaration.tsx` — `ConstDeclaration` component.
- Tests in `test/type-alias-const.test.tsx` or added to existing test files.

### Props

```ts
interface TypeAliasProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  typeParameters?: TypeParameterProp[];
  children?: Children; // the aliased type
}

interface ConstDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  type: Children;
  children?: Children; // the value expression
}
```

## Out of Scope

- `static` declarations.
- `const fn` (handled by FunctionDeclaration in T013).
- Complex const expressions or const generics.

## Context Files

| File                                                          | Why                               |
| ------------------------------------------------------------- | --------------------------------- |
| `packages/typescript/src/components/TypeAliasDeclaration.tsx` | TypeScript type alias pattern     |
| `packages/go/src/components/TypeDeclaration.tsx`              | Go type alias pattern             |
| `packages/rust/src/symbols/` (from T003–T006)                 | Symbol factories, NamedTypeSymbol |

## Implementation Guidance

### TypeAlias

1. Use `Declaration` (T010) for symbol registration and visibility.
2. Create a `NamedTypeSymbol` with `typeKind: "type-alias"` via factory.
3. Render:

```
[pub] type Name<TypeParams> = {children};
```

4. `children` represents the aliased type (e.g., `Vec<String>`).

### ConstDeclaration

1. Use `Declaration` (T010) for symbol registration and visibility.
2. Name policy should apply `SCREAMING_SNAKE_CASE` to const names (via `nameKind: "constant"`).
3. Render:

```
[pub] const NAME: {type} = {children};
```

4. `props.type` is the type annotation; `props.children` is the value.

### Alloy Conventions

- Access props as `props.name`, `props.type` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] Type alias renders: `type Foo = Bar;`.
- [x] Pub type alias renders: `pub type Foo = Bar;`.
- [x] Type alias with type parameters renders: `type Foo<T> = Vec<T>;`.
- [x] Const renders: `const MAX_SIZE: usize = 100;`.
- [x] Pub const renders: `pub const MAX_SIZE: usize = 100;`.
- [x] Const name is transformed to SCREAMING_SNAKE_CASE by name policy.
- [x] Symbols are created with correct typeKind/symbolKind.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- Tests pass for both components.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm test
```
