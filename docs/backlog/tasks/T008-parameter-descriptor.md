# T008: Parameter Descriptor and Scope Hooks

| Field | Value |
|-------|-------|
| **ID** | T008 |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | foundation |
| **Status** | pending |
| **Priority** | P1 |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T001 |
| **Blocks** | T013 (FunctionDeclaration needs ParameterDescriptor) |

## Description
Define the `ParameterDescriptor` interface for Rust function parameters and finalize scope hook exports.

## Goal
Provide a structured way to describe Rust function parameters.

## Scope Included
Create `packages/rust/src/parameter-descriptor.ts`:
```typescript
export interface ParameterDescriptor {
  name: string;
  type?: Children;
  mutable?: boolean;       // mut binding
  refType?: "&" | "&mut";  // reference type prefix
}

export function isParameterDescriptor(value: unknown): value is ParameterDescriptor;
```

Also ensure `src/symbols/scopes.ts` is complete with:
- All scope type aliases.
- All hook functions (`useRustScope()`, `useRustModuleScope()`, `useRustCrateScope()`).

Export both from `src/index.ts`.

## Out of Scope
- Lifetime annotations on parameters (deferred).

## Context Files to Read First
- `packages/python/src/parameter-descriptor.ts` — Python's ParameterDescriptor.
- `packages/typescript/src/parameter-descriptor.ts` — TypeScript's ParameterDescriptor.

## Acceptance Criteria
- `ParameterDescriptor` interface is exported.
- `isParameterDescriptor()` type guard works.
- Scope hooks are exported and typed.

## Definition of Done
Parameter descriptor and scope hooks exist, compile, and are exported.
