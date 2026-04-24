# Alloy Architecture

## System Overview

```
TypeSpec Input
    ↓
┌─────────────────────────────────────────────────────────┐
│ Alloy Emitter (Your Code)                              │
│ ┌────────────────────────────────────────────────────┐ │
│ │ JSX Component Tree                                 │ │
│ │ <Output>                                           │ │
│ │   <PackageDirectory>                               │ │
│ │     <SourceFile> → declarations + references      │ │
│ │   </PackageDirectory>                              │ │
│ │ </Output>                                          │ │
│ └────────────────────────────────────────────────────┘ │
│                      ↓                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Alloy Core Runtime (Reactive)                     │ │
│ │ • Vue 3 reactivity (computed, watch, effects)     │ │
│ │ • Component evaluation                             │ │
│ │ • Binder (symbol resolution)                       │ │
│ │ • Scope tree construction                          │ │
│ └────────────────────────────────────────────────────┘ │
│                      ↓                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Rendered Text Tree                                │ │
│ │ (Strings + Prettier Document IR + Refkeys)        │ │
│ └────────────────────────────────────────────────────┘ │
│                      ↓                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Print Pipeline                                     │ │
│ │ • Symbol resolution (refkeys → names)             │ │
│ │ • Import generation                                │ │
│ │ • Name conflict resolution                         │ │
│ │ • Prettier formatting                              │ │
│ └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                       ↓
                Output Files
```

## Core Components

### 1. Symbol System

```
                   OutputSymbol (base)
                        ↑
                        │ extends
                        │
            ┌───────────┼───────────┐
            ↓           ↓           ↓
       TSOutputSymbol  PySymbol  JavaSymbol  ...

       Properties:
       • name (reactive, subject to name policy)
       • refkeys (identify the symbol)
       • memberSpaces (for class members, etc.)
       • export, visibility, modifiers
       • ownerSymbol (if member symbol)
```

### 2. Scope Hierarchy

```
                OutputScope (base)
                        ↑
                        │ extends
    ┌───────────────────┼─────────────────────┐
    ↓                   ↓                     ↓
BasicScope      TSLexicalScope    TSPackageScope
                      ↑
                      │ extends
         ┌────────────┼────────────┐
         ↓            ↓            ↓
   TSModuleScope TSBlockScope  TSMemberScope

Each scope has:
• declarationSpaces (e.g., "values", "types")
• parent/children scope tree
• symbols registered in spaces
```

Example TypeScript scope tree during rendering:

```
Output root
└── TSPackageScope "my-pkg"
    ├── exportedSymbols (public symbols)
    └── TSModuleScope "models.ts"
        ├── values space
        │   └── User (ClassSymbol)
        │       └── instance members space
        │           └── name (PropertySymbol)
        └── types space
            └── UserInput (TypeAliasSymbol)
```

### 3. Binder (Symbol Registry)

**Purpose:** Central engine for symbol resolution

**Responsibilities:**

- Track all scopes and symbols
- Resolve refkeys by searching scope hierarchy
- Compute scope paths (needed for import generation)
- Handle member resolution chains
- Notify on symbol creation/deletion

**API:**

```tsx
resolveDeclarationByKey<TScope, TSymbol>(
  currentScope, refkey, options?
): Ref<ResolutionResult>

// ResolutionResult contains:
{
  symbol: TSymbol,
  lexicalDeclaration: TSymbol,      // The declaration scope
  commonScope: TScope | undefined,  // Nearest shared scope
  pathUp: TScope[],                 // Scopes from reference to declaration
  pathDown: TScope[],               // Scopes from declaration scope down
  memberPath: TSymbol[]             // Member chain for member refkeys
}
```

### 4. Rendering Pipeline

```
┌─ Components Render ──────────────────────────────────┐
│                                                       │
│ Components execute in reactive effects               │
│ Children accumulate into RenderedTextTree           │
│ Refkeys stored as unresolved markers                │
└───────────────────────┬─────────────────────────────┘
                        ↓
┌─ Symbol Resolution ──────────────────────────────────┐
│                                                       │
│ Walk tree, find refkeys                             │
│ Call binder.resolveDeclarationByKey()               │
│ Binder searches scope hierarchy                     │
│ Returns ResolutionResult                            │
└───────────────────────┬─────────────────────────────┘
                        ↓
┌─ Reference Emission ─────────────────────────────────┐
│                                                       │
│ Language's Reference component processes result    │
│ For imports: call sourceFile.scope.addImport()     │
│ For member access: construct member expression     │
│ For local refs: use simple name                     │
└───────────────────────┬─────────────────────────────┘
                        ↓
┌─ Prettier Formatting ────────────────────────────────┐
│                                                       │
│ Print tree with line wrapping logic                │
│ Apply print width, indentation, tab settings       │
│ Render Prettier document IR                        │
└───────────────────────┬─────────────────────────────┘
                        ↓
┌─ Output Files ───────────────────────────────────────┐
│                                                       │
│ One OutputDirectory per render                      │
│ Contains OutputFile objects with path + contents   │
└──────────────────────────────────────────────────────┘
```

## Language Package Architecture

```
my-language/
├── Symbol Model
│   ├── OutputSymbol subclass
│   │   └── Language-specific properties (visibility, static, etc.)
│   ├── Member space keys ("static", "instance", etc.)
│   └── Symbol factories
│
├── Scope Model
│   ├── OutputScope subclasses
│   ├── Declaration space keys ("types", "values", etc.)
│   ├── Scope hierarchy
│   └── Scope wrapper components (BlockScope, MemberScope)
│
├── Symbol Resolution
│   ├── Reference component
│   │   └── Resolves refkeys → emits reference syntax
│   ├── Member resolver callback
│   │   └── Validates member access (visibility filtering)
│   └── Import/qualification logic
│
├── Declaration Components
│   ├── One per construct (Class, Function, Interface, etc.)
│   └── Each creates appropriate symbol + member scope
│
├── Member Components
│   ├── For each member kind (Field, Method, Property, etc.)
│   └── Each creates member symbol in correct space
│
├── Name Policy
│   └── Maps element kind → casing rules
│
├── External Libraries
│   └── createPackage() for symbol registration
│
└── Utilities
    ├── Name conflict resolver
    ├── Format options
    └── Helper functions
```

## Data Flow: Emitting a Class

```
Input:
  class MyClass {
    name: string;
  }

Rendering Phase:
  1. <ClassDeclaration name="MyClass" refkey={refkey(input)}>
     → creates TSOutputSymbol in lexical scope
     → emits: Declaration { symbol }

  2. <MemberScope ownerSymbol={sym}>
     → creates child scope linked to symbol
     → enters member space "instance"

  3. <ClassField name="name" type="string">
     → creates member symbol in "instance" space
     → emits: MemberDeclaration { symbol }

Symbol Resolution Phase:
  When <Reference> encounters the refkey:
  1. Calls binder.resolveDeclarationByKey(refkey)
  2. Binder finds symbol in lexical scope
  3. Returns ResolutionResult { symbol, scope path, ... }
  4. Reference component generates import (if needed)

Output:
  // models.ts
  export class MyClass {
    name: string;
  }

  // client.ts
  import { MyClass } from "./models.js";
  const obj: MyClass = ...;
```

## Reactivity in Action

```
Component updates trigger reactions:

1. Symbol property changes
   → tracked via Vue reactivity
   → triggers effects that depend on it

2. Name conflicts resolved
   → symbol.name becomes reactive
   → all references auto-update

3. Member resolution
   → member list can grow/shrink
   → computed() watches and updates

4. Scope changes
   → new declarations found
   → references re-resolve

5. File dirtying
   → print pipeline re-runs
   → output updated
```

## Key Design Patterns

### 1. Reactive Names

- Symbol.name is reactive (subject to name policy)
- References update automatically when name conflicts resolved
- No manual name tracking needed

### 2. Lazy Symbol Registration

- External symbols registered when first referenced
- Enables efficient handling of large libraries
- WeakMap caches per binder instance

### 3. Scope Hierarchy for Access Control

- Public symbols in module scope
- Private symbols in block/function scopes
- Member resolution respects visibility
- Prevents invalid cross-scope references

### 4. Symbol Slots for Type Inference

- `<MemberScope ownerSymbol>` collects transient symbols
- Used to infer member types from expressions
- e.g., variable declaration: infer type from RHS expression

### 5. Tagged Children for Structure

- `<TypeParameters>`, `<Body>`, `<Parameters>`
- Components find tagged children to extract sub-parts
- Enables flexible composition without fixed props

## Import Generation

```
Single-file reference:
  refkey(User) in client.ts
  User declared in models.ts
  → Same module? No
  → Generate: import { User } from "./models.js"

Cross-package reference:
  refkey(MyType) in pkg1/client.ts
  MyType exported from pkg2/models.ts
  → Different package? Yes
  → Generate: import { MyType } from "pkg2"

Member reference:
  memberRefkey(classKey, propKey) in method body
  → Same class? Yes
  → Generate: this.prop

External reference:
  node.path.join in code
  → External library? Yes
  → Generate: import { join } from "node:path"
```

## Scope Path Resolution

```
Reference in package1/client.ts to symbol in package2/models.ts:

pathUp: [TSLexicalScope, TSModuleScope, TSPackageScope]
  ↑ Scopes traversed going UP from reference

pathDown: [TSPackageScope("package2"), TSModuleScope("models.ts"), ...]
  ↑ Scopes traversed going DOWN from common ancestor to symbol

pathDown[0] instanceof TSPackageScope?
  → Cross-package: generate package import

pathDown[0] instanceof TSModuleScope?
  → Cross-module: generate module import

pathDown[0] instanceof TSLexicalScope?
  → Local: simple name reference
```

## Performance Considerations

1. **Lazy scope creation** — Scopes created on demand
2. **Lazy symbol registration** — External symbols registered when referenced
3. **Memoized resolution** — Symbol resolution cached per binder
4. **Deferred printing** — Files marked dirty, printed once at end
5. **Reactive batching** — Effects batched before print phase
6. **Memory:** Symbols stored in scope spaces (O(n) where n = declarations)

## Testing Strategy

1. **Unit tests** — Test individual components in isolation
2. **Integration tests** — Test component combinations with render
3. **Snapshot tests** — Capture generated code output
4. **Symbol resolution tests** — Verify cross-file references
5. **Member access tests** — Verify visibility/access control

---

See `ALLOY_DEEP_DIVE.md` for detailed explanations of each component.
