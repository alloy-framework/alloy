# T021: Self Receiver in FunctionDeclaration

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **ID**           | T021                                                                  |
| **Epic**         | [E004 — Traits and Impl Blocks](../epics/E004-traits-and-impl.md)    |
| **Type**         | feature                                                               |
| **Status**       | done                                                                  |
| **Priority**     | high                                                                  |
| **Owner**        | AI coding agent                                                       |
| **AI Executable**| yes                                                                   |
| **Human Review** | yes                                                                   |
| **Dependencies** | T013, T020                                                            |
| **Blocks**       | —                                                                     |

---

## Description

Update `FunctionDeclaration` to support the `receiver` prop, enabling method-style functions inside `ImplBlock` and `TraitDeclaration`. In Rust, methods take `self` as their first parameter in various forms: `&self`, `&mut self`, `self` (by value), or no self parameter (associated function).

## Goal

Enable `FunctionDeclaration` to automatically handle self receiver rendering when used inside impl blocks and trait declarations, with sensible defaults and explicit override.

## Scope

- Add `receiver` prop to `FunctionDeclarationProps`: `"&self" | "&mut self" | "self" | "none"`.
- When inside an `ImplBlock` or `TraitDeclaration` (detected via scope context), default `receiver` to `"&self"`.
- When `receiver` is `"none"`, no self parameter is rendered (associated function / static method).
- When outside an impl block or trait, the `receiver` prop is ignored.
- Render receiver as the first parameter before any other parameters.
- Update `test/function.test.tsx` with receiver-specific tests.

## Out of Scope

- Custom self types (e.g., `self: Box<Self>`, `self: Rc<Self>`).
- `Pin<&mut Self>` receivers.

## Context Files

- `packages/rust/src/components/function-declaration.tsx` — the component to update (from T013).
- `packages/rust/src/components/impl-block.tsx` — provides impl block context (from T020).
- `packages/rust/src/components/trait-declaration.tsx` — provides trait context (from T019).
- `packages/rust/src/symbols/rust-impl-scope.ts` — scope to detect impl context.
- `packages/rust/src/symbols/rust-trait-scope.ts` — scope to detect trait context.

## Implementation Guidance

1. **File**: Update `packages/rust/src/components/function-declaration.tsx`.
2. **Props**: Add `receiver?: "&self" | "&mut self" | "self" | "none"` to `FunctionDeclarationProps`. Do NOT destructure — use `props.receiver`.
3. **Context detection**: Check if the function is inside a `RustImplScope` or `RustTraitScope` by walking the scope chain or using a context value.
4. **Default behavior**:
   - Inside `ImplBlock` or `TraitDeclaration`: default receiver is `"&self"`.
   - Outside these scopes: no receiver regardless of prop value.
5. **Rendering**: When receiver is present and not `"none"`, render it as the first parameter:
   ```
   fn method_name(&self, param1: Type1, param2: Type2) -> ReturnType {
       // body
   }
   ```
   When receiver is `"none"`:
   ```
   fn associated_fn(param1: Type1) -> ReturnType {
       // body
   }
   ```
6. **Comma handling**: If there are additional parameters after the receiver, insert a comma and space after the receiver.
7. **Use `code` template tag** for raw string fragments.

## Acceptance Criteria

- [x] Method with `&self` receiver renders `fn name(&self)`.
- [x] Method with `&mut self` receiver renders `fn name(&mut self)`.
- [x] Method with `self` (by value) receiver renders `fn name(self)`.
- [x] Method with `receiver="none"` renders no self parameter (associated function).
- [x] Default receiver inside `ImplBlock` is `&self`.
- [x] Default receiver inside `TraitDeclaration` is `&self`.
- [x] Receiver with additional parameters renders correctly: `fn name(&self, x: i32)`.
- [x] Function outside impl/trait ignores receiver prop.

## Definition of Done

- `FunctionDeclarationProps` includes `receiver` prop.
- `FunctionDeclaration` correctly renders self receivers.
- Updated tests in `test/function.test.tsx` pass.

## Validation

```bash
cd packages/rust
npx vitest run test/function.test.tsx
```
