# T012: EnumDeclaration and EnumVariant

| Field       | Value                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Task ID** | T012                                                                                     |
| **Epic**    | E003 — Core Declaration Components                                                       |
| **Deps**    | T006 (Symbol factories), T010 (Declaration/Reference), T015 (Attributes), T016 (DocComments), T017 (TypeParameters) |
| **Blocks**  | —                                                                                        |
| **Status**  | done                                                                                     |

## Description

Create the `EnumDeclaration` and `EnumVariant` components for generating Rust enum definitions. Supports all three variant kinds: unit, tuple, and struct. Creates a `NamedTypeSymbol` with `typeKind: "enum"` and a member scope for variants.

## Goal

Enable users to generate Rust enum declarations with unit, tuple, and struct variants, plus derives, doc comments, and type parameters.

## Scope

- `src/components/enum-declaration.tsx` — `EnumDeclaration` and `EnumVariant` components.
- `test/enum.test.tsx` — tests for all variant kinds.

### Props

```ts
interface EnumDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  derives?: (string | Refkey)[];
  attributes?: Children;
  doc?: string;
  typeParameters?: TypeParameterProp[];
  children?: Children; // EnumVariant elements
}

interface EnumVariantProps {
  name: string;
  refkey?: Refkey;
  doc?: string;
  fields?: Children[]; // tuple variant positional types
  children?: Children; // struct variant fields (Field components)
}
```

### Variant Kind Resolution

- **Unit variant**: no `fields` prop and no `children` → renders `Name,`.
- **Tuple variant**: `fields` prop provided → renders `Name(T1, T2),`.
- **Struct variant**: `children` provided → renders `Name {\n  field: Type,\n},`.

## Out of Scope

- Discriminant values (`Foo = 1`).
- Enum methods (handled via ImplBlock in T020).
- Pattern matching helpers.

## Context Files

| File                                              | Why                                     |
| ------------------------------------------------- | --------------------------------------- |
| `packages/csharp/src/components/enum/`             | Similar enum concept in C#               |
| `packages/typescript/src/components/EnumDeclaration.tsx` | TypeScript enum pattern             |
| `packages/rust/src/symbols/` (from T003–T006)     | NamedTypeSymbol, symbol factories        |

## Implementation Guidance

### EnumDeclaration

1. Use `Declaration` (T010) for symbol registration and visibility.
2. Create `NamedTypeSymbol` with `typeKind: "enum"` via symbol factory.
3. Render structure:

```
{doc comment}
{attributes}
{derives}
[pub] enum Name<TypeParams> {
  {children (EnumVariants)}
}
```

### EnumVariant

1. Determine variant kind from props:
   - `props.fields` is defined and non-empty → tuple variant.
   - `props.children` is defined → struct variant.
   - Otherwise → unit variant.
2. Render accordingly:

```
// Unit
Name,

// Tuple
Name(Type1, Type2),

// Struct
Name {
  field1: Type1,
  field2: Type2,
},
```

3. If `doc` prop, render `DocComment` above the variant.

### Alloy Conventions

- Access props as `props.name`, `props.fields` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] Unit variant renders: `Name,`.
- [x] Tuple variant renders: `Name(String, i32),`.
- [x] Struct variant renders: `Name {\n  field: Type,\n},`.
- [x] Pub enum renders: `pub enum Foo {}`.
- [x] Enum with derives renders: `#[derive(Debug)]\nenum Foo {}`.
- [x] Enum with doc comment renders `/// ...` above.
- [x] Enum with type parameters renders: `enum Foo<T> {}`.
- [x] Mixed variant kinds render correctly in one enum.
- [x] `NamedTypeSymbol` is created with `typeKind: "enum"`.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/enum.test.tsx` passes with all listed test cases.
- No regressions in existing tests.

## Implementation Notes

- Struct-style enum variants currently render their inner fields from raw children content (e.g. `field: Type,`) instead of reusing `Field`.
- `Field` creates symbols through `createFieldSymbol()`, which intentionally rejects non-`struct` owners; enum variants use `createVariantSymbol()` and a variant member scope instead.

## Validation

```bash
cd packages/rust
pnpm build && pnpm vitest run enum
```
