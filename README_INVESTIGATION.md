# Alloy Framework Investigation Complete

This directory contains comprehensive documentation about the Alloy framework for building TypeScript CDK emitters from TypeSpec.

## Documents Created

### 1. **ALLOY_DEEP_DIVE.md** (758 lines)

Comprehensive guide covering:

- What is Alloy and core philosophy
- The complete Alloy stack (Core, Language Packages, Tooling)
- Core concepts (Symbols, Refkeys, Binder, Scopes, Rendering Pipeline)
- How to create basic emitters with working examples
- Complete language package implementation guide
- Detailed TypeScript emitter pattern walkthrough
- TypeSpec integration patterns
- CDK emitter architecture example
- Formatting & layout system
- Testing strategies
- Best practices

**Start here for understanding fundamentals.**

### 2. **QUICK_REFERENCE.md** (400+ lines)

Practical reference guide with:

- 10 essential patterns with copy-paste examples
- TypeScript language-specific patterns
- Common emitter patterns
- Rendering and testing code
- File organization template
- Debugging techniques

**Use this during implementation for quick lookups.**

### 3. **ARCHITECTURE.md** (350+ lines)

System architecture documentation:

- Complete system overview diagram
- Symbol system structure
- Scope hierarchy with TypeScript example
- Binder responsibility and API
- Complete rendering pipeline
- Language package architecture
- Data flow example (emitting a class)
- Reactivity mechanism
- Design patterns explanation
- Import generation logic
- Scope path resolution
- Performance considerations

**Reference this when designing your emitter architecture.**

## Key Findings

### Alloy Is...

A **code generation framework** inspired by React/Solid that uses JSX to declaratively define source code generation. It's reactive (Vue 3), symbol-aware (automatic imports, name resolution), and language-agnostic.

### Core Philosophy

1. **Declarative** — JSX syntax defines output structure
2. **Reactive** — Changes propagate automatically
3. **Symbol-Aware** — Automatic declaration/reference linking
4. **Language-Agnostic** — Core + pluggable language packages

### The Alloy Stack

```
@alloy-js/core
  ├── Reactive runtime (Vue 3)
  ├── Component model
  ├── Symbol system + Binder
  ├── Prettier document IR formatting
  └── Name policies

@alloy-js/typescript (and other languages)
  ├── TSOutputSymbol class
  ├── Scope classes (Lexical, Module, Package, Member)
  ├── 67+ JSX components for TypeScript constructs
  ├── Reference component (symbol resolution)
  ├── Name policy (PascalCase for classes, etc.)
  └── External library support

@alloy-js/cli
  └── Build + watch mode
```

### How Symbols Work

1. **Create a refkey from input data** — `refkey(userSchema)`
2. **Declare the symbol** — `<Declaration name="User" refkey={...}>`
3. **Reference it anywhere** — `const x: {refkey(userSchema)}`
4. **Alloy auto-generates imports** — `import { User } from "./models.js"`

**Key insight:** Refkeys are seeded from input objects, so refkey lookup is deterministic and works across time/restarts.

### How Cross-File References Work

```
Rendering Phase:
  Symbols collected in scope tree while components render
  Refkeys stored as markers

Resolution Phase:
  Refkeys resolved through Binder using scope hierarchy
  Scope paths computed (needed for import generation)
  Name conflicts handled (symbol.name becomes reactive)

Reference Emission:
  Language's Reference component generates appropriate syntax
  For cross-module: generate import statement
  For same-module: use simple name
  For members: generate member access (obj.prop or this.prop)
```

### Language Package Pattern

Every language package needs:

1. **Symbol Class** — Extend OutputSymbol with language properties

   ```tsx
   export class MySymbol extends OutputSymbol {
     static readonly memberSpaces = ["static", "instance"];
     get isPublic() {
       /* ... */
     }
   }
   ```

2. **Scope Classes** — Extend OutputScope for language's organization

   ```tsx
   class MyLexicalScope extends OutputScope {
     static readonly declarationSpaces = ["types", "values"];
   }
   ```

3. **Symbol Factories** — Create symbols in correct spaces

   ```tsx
   export function createTypeSymbol(name) {
     const scope = useScope();
     return createSymbol(MySymbol, name, scope.spaceFor("types"), {...});
   }
   ```

4. **Reference Component** — Resolve refkeys and emit reference syntax

   ```tsx
   export function Reference(props) {
     const result = resolve(props.refkey);
     // Generate import if cross-module
     // Return reference syntax (qualified name, member access, etc.)
   }
   ```

5. **Declaration Components** — One per language construct

   ```tsx
   export function ClassDeclaration(props) {
     const sym = createTypeSymbol(props.name, { refkey: props.refkey });
     return (
       <Declaration symbol={sym}>
         class <Name /> { <MemberScope ownerSymbol={sym}>{...}</MemberScope> }
       </Declaration>
     );
   }
   ```

6. **Member Components** — One per member kind
   ```tsx
   export function ClassField(props) {
     const member = createMemberSymbol(props.name, {...});
     return <MemberDeclaration symbol={member}>{...}</MemberDeclaration>;
   }
   ```

### TypeSpec Integration

To build a TypeSpec emitter:

1. **Compile TypeSpec** — `await createProgram({main: "main.tsp"})`
2. **Walk the model** — Recursively traverse types/operations
3. **Create context** — Use React-like context to pass schema
4. **Emit declarations** — For each model, operation, etc.
5. **Emit references** — Components auto-link via refkeys
6. **Render to files** — `await writeOutput(output, "./dist")`

Example pattern in ALLOY_DEEP_DIVE.md shows complete CDK emitter structure.

## File Structure of This Investigation

```
alloy/
├── agents.md                    # (Original) Points to docs/index.md
├── readme.md                    # Project overview
├── docs/
│   ├── index.md                 # Main documentation entry
│   ├── language-package-guide.md # 42KB comprehensive guide
│   ├── references-and-refkeys.md # Symbol referencing system
│   ├── style-guide.md           # JSX idiom patterns
│   └── cli-and-build.md         # Build setup
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── binder.ts        # Symbol registry (89KB)
│   │   │   ├── render.ts        # Rendering pipeline (35KB)
│   │   │   ├── symbols/         # Symbol classes
│   │   │   ├── components/      # Core components (Declaration, Scope, etc.)
│   │   │   └── reactivity.ts    # Vue 3 integration
│   │   └── docs/
│   │       ├── components.md
│   │       ├── symbols-and-scopes.md
│   │       ├── rendering.md
│   │       └── formatting.md
│   ├── typescript/
│   │   ├── src/
│   │   │   ├── symbols/
│   │   │   │   ├── ts-output-symbol.ts  # TypeScript symbol class
│   │   │   │   ├── ts-lexical-scope.ts  # Types + values spaces
│   │   │   │   ├── reference.tsx        # Import generation
│   │   │   │   └── ... (7 files)
│   │   │   └── components/              # 67 TypeScript components
│   │   └── docs/api/
│   │       └── (Generated TypeScript component docs)
│   ├── python/
│   ├── java/
│   ├── go/
│   └── ... (other languages)
└── samples/
    ├── basic-project/           # Multi-file example (greeting-lib + consumer)
    ├── client-emitter/          # REST API → client generation
    ├── python-example/          # Petstore API in Python
    └── go-example/              # Petstore API in Go
```

## Key Source Files to Study

**Must Read:**

- `/packages/core/docs/symbols-and-scopes.md` — Symbol system fundamentals
- `/packages/core/src/binder.ts` — Symbol resolution engine
- `/packages/typescript/src/symbols/ts-output-symbol.ts` — Language-specific symbol
- `/packages/typescript/src/symbols/reference.tsx` — Cross-file references
- `/samples/client-emitter/src/` — Working example emitter

**For Deep Understanding:**

- `/packages/core/src/render.ts` — Complete rendering pipeline
- `/packages/core/src/reactivity.ts` — Vue 3 integration
- `/packages/typescript/src/components/ClassDeclaration.tsx` — Class declaration pattern
- `/docs/language-package-guide.md` — Comprehensive implementation guide

## Next Steps for Building TypeSpec Emitter

1. **Study the samples** — Start with `/samples/client-emitter/`, understand the pattern
2. **Create TypeSpec integration** — Add `@typespec/compiler` integration to parse TypeSpec
3. **Extend TypeScript package** — Create custom components for CDK-specific constructs
4. **Test with examples** — Generate from real TypeSpec APIs
5. **Iterate on components** — Refine based on output quality

## Critical Insights

### 1. Refkeys Are the Hub

Every reference system revolves around refkeys. Seed them from input data, and you get deterministic cross-file linking automatically.

### 2. The Binder Does Heavy Lifting

Don't think about scope paths manually. The Binder computes everything: scope hierarchy, resolution, import requirements. Your Reference component just reacts to the result.

### 3. Symbols Are Reactive

Symbol names, visibility, export status — all reactive. Conflicts get resolved and references auto-update. No manual name tracking.

### 4. Member Spaces Enable Access Control

Private members live in member scopes accessible only from within. The scope hierarchy enforces visibility automatically.

### 5. Name Policy Is Per-Kind

"class" elements get PascalCase, "variable" elements get camelCase. Applied automatically. No manual casing logic needed.

### 6. Prettier Document IR Is Powerful

Alloy uses Prettier's document model internally. Sophisticated line-wrapping, indentation, conditional formatting — all available via simple JSX elements like `<group>`, `<indent>`, `<fill>`.

## Further Reading

- **Official Docs:** https://alloy-framework.github.io/alloy
- **GitHub:** https://github.com/alloy-framework/alloy
- **TypeSpec Docs:** https://typespec.io/
- **Prettier Document Model:** https://prettier.io/docs/en/doc-builders.html

---

**Investigation completed:** You now have enough understanding to design and build a TypeScript CDK emitter using Alloy and TypeSpec. Start with the QUICK_REFERENCE.md for implementation patterns, refer to ARCHITECTURE.md for design decisions, and use ALLOY_DEEP_DIVE.md for detailed concept explanations.
