# T011: StructDeclaration and Field

| Field       | Value                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Task ID** | T011                                                                                     |
| **Epic**    | E003 — Core Declaration Components                                                       |
| **Deps**    | T006 (Symbol factories), T010 (Declaration/Reference) |
| **Blocks**  | T020 (ImplBlock needs struct types)                                                      |
| **Status**  | Done                                                                                     |

## Description

Create the `StructDeclaration` and `Field` components for generating Rust struct definitions. `StructDeclaration` creates a `NamedTypeSymbol` with `typeKind: "struct"` and a member scope for fields. It supports visibility, derive attributes, doc comments, type parameters, and where clauses.

## Goal

Enable users to generate Rust struct declarations with fields, visibility modifiers, derives, doc comments, and generic type parameters.

## Scope

- `src/components/struct-declaration.tsx` — `StructDeclaration` and `Field` components.
- `test/struct.test.tsx` — comprehensive tests.

### Props

```ts
interface StructDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  children?: Children;
}

interface FieldProps {
  name: string;
  type: Children;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  doc?: string;
}
```

## Implementation Note on Optional Dependencies

The `derives` prop renders `#[derive(...)]` if the Attribute component (T015) is available. If T015 is not yet implemented, the struct renders without derives — this is acceptable for initial testing. The `doc` prop similarly depends on T016 but is optional.

## Out of Scope

- Tuple structs (may be added later).
- Unit structs (may be added later).
- Serde attributes (user can supply via `attributes` prop).
- Impl blocks for structs (T020).

## Context Files

| File                                                 | Why                                     |
| ---------------------------------------------------- | --------------------------------------- |
| `packages/csharp/src/components/struct/`              | Similar struct concept in C#             |
| `packages/go/src/components/StructDeclaration.tsx`    | Go struct pattern                        |
| `packages/typescript/src/components/InterfaceDeclaration.tsx` | Named type with members pattern   |
| `packages/rust/src/symbols/` (from T003–T006)        | NamedTypeSymbol, symbol factories        |

## Implementation Guidance

### StructDeclaration

1. Use the `Declaration` component (T010) for symbol registration and visibility.
2. Create a `NamedTypeSymbol` with `typeKind: "struct"` via the symbol factory (T006).
3. Render structure:

```
{doc comment via DocComment}
{attributes}
{derives via DeriveAttribute}
[pub] struct Name<TypeParams> [WhereClause] {
  {children (Fields)}
}
```

4. Use `Indent` from `@alloy-js/core` for field indentation.
5. Each `Field` renders: `[pub] name: type,` with optional doc comment above.

### Field

1. Render visibility prefix if `pub` or `pub_crate`.
2. Render: `name: type,` (trailing comma).
3. If `doc` prop provided, render `DocComment` above the field.

### Alloy Conventions

- Access props as `props.name`, `props.pub` — do NOT destructure.
- Use `<>...</>` for fragments.
- Use `code` template tag for multi-line string literals if needed.

## Acceptance Criteria

- [x] Basic struct renders: `struct Foo {}`.
- [x] Pub struct renders: `pub struct Foo {}`.
- [x] Struct with derives renders: `#[derive(Debug, Clone)]\nstruct Foo {}`.
- [x] Struct with fields renders correctly with indentation and trailing commas.
- [x] Field visibility renders: `pub name: Type,`.
- [x] Struct with doc comment renders `/// ...` above the struct.
- [x] Struct with type parameters renders: `struct Foo<T, U: Display> {}`.
- [x] Struct with where clause renders correctly.
- [x] `NamedTypeSymbol` is created with `typeKind: "struct"`.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/struct.test.tsx` passes with all listed test cases.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm vitest run struct
```
