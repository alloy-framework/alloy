# T013: FunctionDeclaration and Parameters

| Field       | Value                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **Task ID** | T013                                                                                                     |
| **Epic**    | E003 — Core Declaration Components                                                                       |
| **Deps**    | T006 (Symbol factories), T008 (ParameterDescriptor), T010 (Declaration/Reference), T017 (TypeParameters) |
| **Blocks**  | —                                                                                                        |
| **Status**  | done                                                                                                     |

## Description

Create the `FunctionDeclaration` and `Parameters` components for generating Rust function definitions. `FunctionDeclaration` creates a `FunctionSymbol` and `RustFunctionScope`. It supports visibility, async/unsafe/const qualifiers, parameters, return types, type parameters, where clauses, and doc comments. The `receiver` prop (for `&self`, `&mut self`) is NOT implemented here — it is deferred to T021 (ImplBlock).

## Goal

Enable users to generate Rust function declarations with parameters, return types, qualifiers, generics, and doc comments.

## Scope

- `src/components/function-declaration.tsx` — `FunctionDeclaration` component.
- `src/components/parameters.tsx` — `Parameters` component.
- `test/function.test.tsx` — comprehensive tests.

### Props

```ts
interface FunctionDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  async?: boolean;
  unsafe?: boolean;
  const?: boolean;
  parameters?: ParameterDescriptor[];
  returnType?: Children;
  typeParameters?: TypeParameterProp[];
  whereClause?: Children;
  doc?: string;
  receiver?: Children; // deferred to T021 — not implemented
  children?: Children; // function body
}
```

### ParameterDescriptor (from T008)

```ts
interface ParameterDescriptor {
  name: string;
  type: Children;
  refkey?: Refkey;
}
```

## Out of Scope

- `receiver` prop implementation (`&self`, `&mut self`) — deferred to T021.
- Closure / lambda syntax.
- Function pointers.
- Extern functions.

## Context Files

| File                                                         | Why                               |
| ------------------------------------------------------------ | --------------------------------- |
| `packages/go/src/components/FunctionDeclaration.tsx`         | Go function declaration pattern   |
| `packages/typescript/src/components/FunctionDeclaration.tsx` | TypeScript function pattern       |
| `packages/csharp/src/components/MethodDeclaration.tsx`       | Method with qualifiers pattern    |
| `packages/rust/src/symbols/` (from T003–T006)                | FunctionSymbol, RustFunctionScope |

## Implementation Guidance

### FunctionDeclaration

1. Use `Declaration` (T010) for symbol registration and visibility.
2. Create `FunctionSymbol` via symbol factory (T006).
3. Create `RustFunctionScope` for the function body.
4. Render structure:

```
{doc comment}
[pub] [async] [unsafe] [const] fn name<TypeParams>({Parameters}) [-> ReturnType] [WhereClause] {
  {children}
}
```

5. Qualifier order: `pub async unsafe const fn` (follow Rust convention).
6. If no children (empty body), render `{}` on the same line.

### Parameters

1. Accept `ParameterDescriptor[]`.
2. Render comma-separated: `name: Type, name2: Type2`.
3. Handle empty array → render `()`.

### Alloy Conventions

- Access props as `props.async`, `props.parameters` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] Basic function renders: `fn foo() {}`.
- [x] Pub function renders: `pub fn foo() {}`.
- [x] Async function renders: `pub async fn foo() {}`.
- [x] Unsafe function renders: `unsafe fn foo() {}`.
- [x] Const function renders: `const fn foo() {}`.
- [x] Function with parameters renders: `fn foo(x: i32, y: String) {}`.
- [x] Function with return type renders: `fn foo() -> i32 {}`.
- [x] Function with type parameters renders: `fn foo<T: Display>(x: T) -> T {}`.
- [x] Function with where clause renders correctly.
- [x] Function with doc comment renders `/// ...` above.
- [x] Function with body renders children indented inside braces.
- [x] Empty body renders `{}` (not `{\n}`).
- [x] `FunctionSymbol` is created with correct properties.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/function.test.tsx` passes with all listed test cases.
- No regressions in existing tests.

## Completion Notes

- Implemented `FunctionDeclaration` and `Parameters` in `packages/rust/src/components/function-declaration.tsx` and `packages/rust/src/components/parameters.tsx`.
- Added/updated coverage in `packages/rust/test/function.test.tsx` for qualifier order, parameters, return types, generics/where clauses, doc comments, body formatting, and symbol creation.
- Kept `receiver` support deferred to T021 as planned.

## Validation

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust exec vitest run test/function.test.tsx
```

Result: ✅ Passed (build succeeded; `test/function.test.tsx` — 1 file, 6 tests passed).
