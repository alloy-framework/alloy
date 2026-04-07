# Language Package Guide

Guidelines for creating an `@alloy-js/<language>` package. See [core docs](../index.md) for foundational concepts.

## Summary

A language package must provide (where the target language supports the concept):

- Custom symbol and scope types subclassing `OutputSymbol` and `OutputScope`.
- Symbol factory functions and a reference component handling resolution and cross-file reference generation.
- Name policy, name conflict resolver, and format options.
- Declaration components for every construct that creates a symbol, **member components** for every member kind within member-bearing declarations (see [Symbol Implementation Checklist](#symbol-implementation-checklist)), plus expression and statement components for complex syntax.
- Source file, package/project directory, and metadata file components.
- External library descriptor system with lazy symbol creation.
- Tests covering all components and utilities, a test wrapper factory, and a data-driven `samples/client-emitter/` sample (see [Client-Emitter Sample](#client-emitter-sample)).

## Style

- **One component per file.** File name is kebab-case (e.g., `class-declaration.tsx`).
- **Tests cover every component and utility file.** Co-locate test files next to source or place them all in a `test/` directory.
- **Props interface with every component:** define `<ComponentName>Props` alongside the component. Every prop must have a TSDoc `/** ... */` comment explaining its purpose. The props interface is the primary API surface for consumers — undocumented props are effectively invisible.
- **Component names use PascalCase.** Name after official grammar productions with a suffix: `Declaration`, `Statement`, or `Expression` (e.g., `ClassDeclaration`, `IfStatement`, `ObjectExpression`).
- **Use spec terminology.** Property names, component names, and concepts should match the language specification or its official reflection model.
- **Use [`createSymbol()`](../packages/core/docs/api/functions/createSymbol.md) and [`createScope()`](../packages/core/docs/api/contexts/Scope-context.md)** — never call constructors directly. These register with devtools.
- **`stc()` exports use full component names:** e.g., `VarDeclaration`, not `VarDecl`. Preserves discoverability and 1:1 mapping between JSX and `stc` names.
- **Prefer components when they add value.** Use a component when you need what it provides — formatting (group-breaking, indentation), symbol declaration, scope management, or reactivity. Raw strings and `code` template literals are fine for simple code blocks where none of those concerns apply.
- **Use [`createContext`](../packages/core/docs/api/functions/createContext.md) / [`useContext`](../packages/core/docs/api/functions/useContext.md) for shared data.** When multiple components need the same data (e.g., a schema, configuration, or resolved references), provide it via context rather than threading it through props.

## Package Setup

- Scaffold with `npm init @alloy-js` (library type). See [CLI & Build](cli-and-build.md).
- Organize `src/` into: `symbols/`, `components/`, `context/` (if needed), plus top-level files for name policy, name conflict resolver, and reference component.
- `package.json` exports must include a `"source"` condition pointing to the TypeScript sources. Vitest resolves imports via `conditions: ["source"]`; without it, tests may load a separate copy of `@alloy-js/core` and fail with "Multiple versions of Alloy loaded." The `strip-dev-exports.js` script removes `"source"` keys before publish. Example:
  ```json
  "exports": {
    ".": {
      "source": "./src/index.ts",
      "development": "./dist/dev/index.js",
      "import": "./dist/index.js"
    }
  }
  ```
  These paths match the output layout produced by the recommended Alloy build configuration (see [CLI & Build](cli-and-build.md#build-pipeline)).
- `vitest.config.ts` must use the Alloy rollup plugin and configure both resolvers:

  ```ts
  // vitest.config.ts
  import alloyPlugin from "@alloy-js/rollup-plugin";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    resolve: { conditions: ["source"] },
    ssr: { resolve: { conditions: ["source"] } },
    esbuild: { jsx: "preserve", sourcemap: "both" },
    test: { setupFiles: ["./test/vitest.setup.ts"] },
    plugins: [alloyPlugin()],
  });
  ```

  - `alloyPlugin()` from `@alloy-js/rollup-plugin` transforms Alloy's JSX syntax; do not set `esbuild.jsx: "automatic"` or `jsxImportSource` — esbuild must defer JSX processing to the plugin.
  - `esbuild.jsx: "preserve"` prevents esbuild's built-in JSX handler from running before the plugin.
  - Both `resolve.conditions` and `ssr.resolve.conditions` must include `"source"` — vitest's SSR resolver is configured independently and defaults separately.

- When co-locating tests with source files (see [File Organization](#file-organization)), add `"exclude"` to `tsconfig.json` so test files are not included in the production build:
  ```json
  {
    "exclude": ["**/*.test.ts", "**/*.test.tsx"]
  }
  ```

## Research First

- Read the **official language specification** (grammar, type system, scoping rules).
- Find the **official reflection/metadata object model** if one exists (e.g., .NET's `System.Reflection`, Java's `java.lang.reflect`). Use it to guide symbol property names and type hierarchies.

## Designing Your Symbol Model

The primary job of a language package is to map the target language's declaration and reference semantics onto Alloy's symbol/scope primitives.

1. **What kinds of symbols exist?** — e.g., types, values, namespaces, modules, functions, parameters.

2. **How are symbols organized?** — Determine the scope hierarchy. Does the language use flat module scopes (like TypeScript), nested namespaces (like C#), or packages with subpackages (like Java)? Each organizational level maps to an `OutputScope` subclass.

3. **What are the declaration spaces?** — Some languages have separate type and value spaces (TypeScript), while others have a single unified space (Python). Map these to scope `declarationSpaces`.

4. **What are the member spaces?** — e.g., static vs. instance, public vs. private. These map to symbol `OutputMemberSpace` keys.

5. **How do symbols reference each other?** — Does the language use imports (TypeScript, Python), `using` directives (C#), or fully-qualified names (Java)?

6. **How are external/built-in types provided?** — Use the lazy-registration `createLibrary()` pattern (see [External Libraries](#external-libraries)).

## Symbols

Subclass [`OutputSymbol`](../packages/core/docs/api/types/OutputSymbolOptions.md). See [Extending Symbols](../packages/core/docs/symbols-and-scopes.md#extending-symbols-and-scopes).

- Add language-specific reactive properties for state that may change after construction. Name after the spec/reflection model. Tag with `@reactive` in JSDoc. See the TypeScript package for a concrete implementation.
- Override `static readonly` [`memberSpaces`](../packages/core/docs/symbols-and-scopes.md#member-spaces) for your language's member space keys.
- Implement abstract `copy()`.
- If your language has explicit export semantics, track when a symbol is marked for export and register it in the appropriate scope.

### Factory Functions

Create one factory per distinct declaration-space combination. Each encodes correct space routing and properties. Use [`createSymbol()`](../packages/core/docs/api/functions/createSymbol.md).

Factories should read the enclosing scope from context (via [`useScope()`](../packages/core/docs/api/contexts/Scope-context.md) or a language-specific wrapper), not accept it as a parameter. This keeps call sites clean and ensures the factory always uses the correct scope:

```
createValueSymbol(name, options):
  scope = useScope()
  return createSymbol(MySymbol, name, scope.spaceFor("<value-space>"), options)

createTypeSymbol(name, options):
  scope = useScope()
  return createSymbol(MySymbol, name, scope.spaceFor("<type-space>"), options)
```

Apply the same rule to member spaces (see [Member Spaces](#member-spaces)): one factory per member-space combination. Use the member scope's `ownerSymbol` and [`memberSpaceFor(key)`](../packages/core/docs/api/types/OutputSymbol.md):

```
createMemberSymbol(name, options):
  owner = useMemberOwner()
  return createSymbol(MySymbol, name, owner.memberSpaceFor("<space-key>"), options)
```

### Symbol Properties

Prefer **reactive boolean properties** over bit-flag enums for symbol state that may change after construction (e.g., exported, abstract, readonly). Bit flags are only appropriate for values fixed at construction. Tag reactive properties with `@reactive` in their JSDoc comment.

### Symbol Implementation Checklist

A language package must provide the following symbol infrastructure. Skip items that don't apply to the target language.

1. **Declaration symbols** — one factory per declaration space (types, values, namespaces, etc.). Every construct that introduces a named entity gets a symbol via [`createSymbol()`](../packages/core/docs/api/functions/createSymbol.md).

2. **Member symbols** — one factory per member-space combination (e.g., static, instance, private-static, private-instance). Every field, method, property signature, enum member, or other member construct needs a member symbol routed to the correct space via the owner symbol's [`memberSpaceFor(key)`](../packages/core/docs/api/types/OutputSymbol.md).

3. **Member components** — for every member-bearing declaration (class, interface, enum, etc.), implement components for each kind of member the language supports. Member components use [`<MemberDeclaration>`](../packages/core/docs/api/components/MemberDeclaration.md) (not `<Declaration>`) and create symbols via member symbol factories. They must be rendered inside a [`<MemberScope>`](../packages/core/docs/api/components/MemberScope.md) provided by the parent declaration component.

4. **Member resolution** — two dimensions:
   - **Internal:** members must be resolvable from _within_ the owning type or enclosing scope — e.g., a method referencing a sibling method, or accessing a private field via the language's self-reference keyword. The scope hierarchy must make these symbols reachable without qualification (or with only `self`/`this`).
   - **External:** members must be resolvable from _outside_ the owning type via [`memberRefkey()`](../packages/core/docs/api/functions/memberRefkey.md). The [Reference component](#reference-component) must handle member chains and emit the appropriate access syntax.

5. **Visibility / accessibility** — if the language has access modifiers, store visibility on the symbol and filter by accessibility when resolving members. Private members must be reachable from within the owning type but not from outside it. Other visibility tiers (protected, internal, etc.) should restrict resolution to the appropriate scope boundary.

6. **Export semantics** — if the language has explicit exports, track export status on the symbol and register exported symbols in the appropriate scope.

## Scopes

Subclass [`OutputScope`](../packages/core/docs/api/types/OutputScopeOptions.md). See [Scopes](../packages/core/docs/symbols-and-scopes.md#scopes).

- Override `static readonly declarationSpaces` for space keys — the distinct declaration categories your language distinguishes.
- Always pass your custom scope via `value` to [`<Scope>`](../packages/core/docs/api/components/Scope.md). Bare `<Scope name="...">` creates a `BasicScope`.

### Scope Wrapper Components

Export user-facing scope wrapper components for each scope kind your language uses. These combine scope creation with the language-appropriate block syntax:

- `BlockScope` — creates a lexical scope wrapped in the language's block delimiters (curly braces, indentation, begin/end keywords, etc.).
- `LexicalScope` — creates a lexical scope without block syntax (for function bodies, arrow expressions).
- `MemberScope` — creates a member scope tied to an owner symbol.

### Scope Hierarchy

Design a scope type for each distinct organizational level in your target language:

- **Lexical scope** — base type defining declaration spaces for your language's namespace model. Extend this for scopes that share the same declaration-space structure.
- **Member scope** — exposes the owner symbol's member spaces. Must not inherit declaration spaces: override `declarationSpaces` to be empty rather than inheriting from a scope type that defines them.
- **Grouping scope** (namespace, package, module, etc.) — one or more scope types for each logical grouping level your language has. The natural place to track cross-file dependencies and public surface for that grouping. Extend `OutputScope` directly if the grouping doesn't declare symbols of its own.

What each level tracks — cross-file dependencies, public surface, member spaces — depends on your target language's scoping rules.

## Reference Component

Every language package **must** implement a `Reference` component, passed to [`<SourceFile reference={Reference}>`](../packages/core/docs/api/components/SourceFile.md).

- [`resolve()`](../packages/core/docs/api/functions/resolve.md) — reactive resolution (works before target exists).
- [`emitSymbol()`](../packages/core/docs/api/functions/emitSymbol.md) — notify ancestors (e.g., for import generation).
- Use `pathDown` from the result to determine relationship and emit appropriate syntax (simple name, qualified name, import statement, namespace directive, etc.).
- Handle member chains for member refkeys.
- When your language distinguishes reference contexts (type vs. value position, pointer vs. reference, etc.), implement a context provider component:
  1. Define a context with a flag indicating the reference kind.
  2. Create a provider component that wraps children in that context. Design it to be idempotent — wrapping an already-contextualized subtree must have no effect.
  3. In the `Reference` component, read the context to decide import style. See the TypeScript package for a concrete implementation.

## Name Policy

- Use [`createNamePolicy()`](../packages/core/docs/api/contexts/NamePolicy-context.md) to map element kinds to casing rules. See [Name Policies](../packages/core/docs/symbols-and-scopes.md#name-policies).
- Apply casing first, then check reserved words (suffix/prefix on collision).
- For context-sensitive reserved words, check element kind before rejecting.

## Name Conflict Resolution

- Implement [`NameConflictResolver`](../packages/core/docs/api/types/NameConflictResolver.md) for duplicate names in the same scope.
- Common strategy: keep the first resolved symbol unchanged; append a numeric suffix to subsequent conflicts (`_2`, `_3`, …).

## Component Design

The goal is **composition**, not an XML schema for the language.

- Only make a component when it manages declarations, scopes, symbols, formatting, or reactive behavior — not for static syntax.
- Use [tagged children](../packages/core/docs/components.md#tagged-children) for optional sub-parts (parameters, type parameters, body, decorators). Tagged children should be optional.

### Shared Base Components

Extract shared rendering logic for recurring patterns. E.g., if functions, methods, and lambdas share parameter lists and bodies, create a shared callable-base they reuse.

When a modifier changes the return type shape (e.g., a concurrency modifier wrapping the return in a future/promise/task), implement a `getReturnType(returnType, modifiers)` helper for the shared callable base.

### Declaration Wrapper

Create a language-specific `Declaration` wrapper handling concerns shared across all declarations: modifier props, symbol registration, name policy, doc comments. Individual components delegate to it.

The wrapper has two responsibilities for declaration modifier props:

1. **Store on the symbol** — pass modifier props (e.g., visibility level, exported flag, access modifier) to the symbol factory so they become reactive properties. Other parts of the output graph may read these properties — some reactively, some at construction time.
2. **Emit modifier syntax** — read the same symbol properties to conditionally render modifier syntax. Prefer reading from the symbol rather than from props directly; direct reads from props are safe only when no external component mutates the symbol property after construction.

Example:

```
// pseudocode
symbol.visibilityModifier = props.visibilityModifier   // store on symbol
emit(symbol.visibilityModifier + " ")                  // read back when rendering
```

### Utility Components

Provide these utility components:

- **Comma-separated list** — wraps core `<List>` with language-appropriate separator, trailing punctuation, and break behavior. Used for parameter lists, arguments, array items, generics.
- **Property/member name** — handles identifier quoting, private-member prefixes, and defaults to `MemberDeclarationContext` name.

### Implementation Checklist

For each new component, work through these steps in order. Skip steps that don't apply.

1. **Define props interface** — create `<ComponentName>Props`. Extend a shared base (e.g., `CommonDeclarationProps`) when the component is a declaration.
2. **Create symbol** — when the component declares a named entity. Use a language-specific factory function (not the constructor). Pass name, refkey, export flag, and language-specific properties.
3. **Create child scope** — when the component introduces a new scope level (function body, block, class members, etc.). Use `createScope()` with your custom scope subclass.
4. **Set up symbol flow** — when the component produces a symbol for ancestors (expression components) or needs symbol info from children (declarations with typed initializers). See [Symbol Flow](../packages/core/docs/symbols-and-scopes.md#symbol-flow).
5. **Wire context** — when children need parent state (provide via context) or parent needs child state (consume via `useContext`).
6. **Handle formatting** — when the construct has variable-width layout. Use `<group>` + `<indent>` for wrappable content, `<Block>` for bodies, `<List>` for separated items.
7. **Document the component** — every public component must have a JSDoc comment explaining what it renders and an `@example` block showing its use in context. The example should include any required or commonly-used parent components and context so that a reader can understand how the component fits into a real tree:
   ````ts
   /**
    * Emit a TypeScript interface declaration.
    *
    * @example
    * ```tsx
    * <SourceFile path="models.ts">
    *   <InterfaceDeclaration name="User" export>
    *     <InterfaceMember name="id" type="string" />
    *     <InterfaceMember name="name" type="string" />
    *   </InterfaceDeclaration>
    * </SourceFile>
    * ```
    */
   ````
8. **Create test file** — co-located next to the component. Cover every prop, formatting edge cases (flat and broken layouts), and symbol/reference behavior.
9. **Export** — add to the barrel file (`components/index.ts`) and to the `stc` barrel if applicable.

## Declaration Components

- Wrap [`<Declaration>`](../packages/core/docs/api/components/Declaration.md) — pass your symbol via `symbol`. Never use bare `<Declaration name="...">` (creates `BasicSymbol`).
- Wrap [`<Scope>`](../packages/core/docs/api/components/Scope.md) — pass your scope via `value`. Never use bare `<Scope name="...">`.
- Same for [`<MemberScope>`](../packages/core/docs/api/components/MemberScope.md) and [`<MemberDeclaration>`](../packages/core/docs/api/components/MemberDeclaration.md).

### Wiring

A declaration component is responsible for: obtaining the enclosing scope via [`useScope()`](../packages/core/docs/api/contexts/Scope-context.md); creating a symbol via the appropriate factory (using the correct declaration space key from `scope.spaceFor("<your-space-key>")`); creating a child scope if needed via [`createScope()`](../packages/core/docs/api/contexts/Scope-context.md); and rendering `<Declaration>` and `<Scope>` to register them with the binder. Space keys are defined by your `declarationSpaces` override. See the TypeScript package for a reference implementation.

### Body Rendering

Use [`<Block>`](../packages/core/docs/api/components/Block.md) for constructs with bodies (functions, type declarations, blocks, etc.).

```tsx
<Block>{props.members}</Block>
```

Pass `opener`/`closer` for languages that use different delimiters (`begin`/`end`, `:`/newline, etc.).

### Name vs. MemberName

[`<Name />`](../packages/core/docs/api/components/Name.md) reads from `DeclarationContext`. [`<MemberName />`](../packages/core/docs/api/components/MemberName.md) reads from `MemberDeclarationContext`. Using `<Name />` inside a `<MemberDeclaration>` renders the _parent_ declaration's name.

### Utilities

- [`childrenArray()`](../packages/core/docs/api/functions/childrenArray.md) + [`findKeyedChild()`](../packages/core/docs/api/functions/findKeyedChild.md) to decompose children.
- [`emitSymbol()`](../packages/core/docs/api/functions/emitSymbol.md) and [`moveTakenMembersTo()`](../packages/core/docs/api/functions/moveTakenMembersTo.md) for expression components that produce symbols.

### Parameter Descriptors

Define a `ParameterDescriptor` interface covering name, type, modifiers appropriate to your target language (e.g., optional, variadic, pass-by-reference, or others your language supports), default value, refkey, and doc. Create a symbol for each parameter so it participates in the binder.

**Parameter scope:** Register parameter symbols in the scope appropriate for your target language's scoping rules. Some languages share the body locals scope; others use a distinct parameter scope (e.g., to support default-value forward references).

## SourceFile Component

- Wrap core [`<SourceFile>`](../packages/core/docs/api/components/SourceFile.md). Create a file-level scope using the **full path from the output root** as the scope identifier: combine the parent directory's path (available via the directory context) with its path. Pass the scope to `<Scope>`; pass your `Reference` component to `<SourceFile>`.
- Accept a prop indicating the file's scope should be registered with the parent package scope for cross-package resolution.
- Provide a language-specific `SourceFileContext` if components need file-level state.

### Reactive Cross-File Reference Generation

Provide a helper (e.g., `addImport()`, `addUsing()`, or language-appropriate equivalent) via context or scope that populates a reactive map rendered by `SourceFile`. The memo passed to `header` must return `undefined` when there is nothing to emit — do not use `<Show>` here. See [`<SourceFile>` § header](../packages/core/docs/api/components/SourceFile.md).

The component rendering each import line **must return [`memo(() => ...)`](../packages/core/docs/api/functions/memo.md)** — output recomputes reactively when dependencies change, enabling forward references and reactive import generation. See [Reactivity § memo](../packages/core/docs/reactivity.md#memofn-equal-name).

**Single-owner rule:** the reactive backing store must live in exactly one place — either the scope class or the context, but not both. If both surfaces expose the helper, the secondary one must delegate to the primary rather than maintain its own copy.

The state shape depends entirely on the target language's reference syntax — a path-keyed import map, a qualified-name set, a namespace directive list, or another structure. `SourceFile` renders dependency output reactively whenever cross-file dependencies are registered. See the TypeScript package for one concrete approach.

### Taps

Use [taps](../packages/core/docs/components.md#taps) when a parent needs context set by its children — e.g., [`createScopeTap()`](../packages/core/docs/api/functions/createScopeTap.md), [`createSourceFileTap()`](../packages/core/docs/api/functions/createSourceFileTap.md).

### Source Directory Tracking

If your target language supports directory-level aggregation files (e.g., re-export modules, namespace-forwarding files), track which files belong to each directory reactively. These two patterns compose — a package may use both simultaneously:

**Side-table pattern** — use the `SourceDirectoryContext` value as an identity key into an external side table holding reactive per-directory state. Choose this when you do not have a dedicated language-specific wrapper component — state is lazily keyed off the core context value, no extra provider needed. See reference implementation: `packages/typescript/src/source-directory-data.ts`.

**Provider/consumer pattern** — wrap `<SourceDirectory>` in a language-specific component that creates and provides a custom context (see [context docs](../packages/core/docs/context.md)). Choose this when you have or need a language-specific wrapper component (e.g., for scope setup) and want to bundle rich language-specific context alongside it. See reference implementation: `packages/java/src/components/PackageDirectory.tsx`.

### Symbol Re-Exposure / Module Aggregation

- **Named/selective re-export** — the aggregating module names specific symbols. Track exported symbols reactively on the module/namespace scope so the aggregating component can iterate them.
- **Bulk/wildcard re-export** — the aggregating module forwards all symbols from a source unit. Register source units with their parent directory. See [Source Directory Tracking](#source-directory-tracking).

## Expression Components

- Call [`emitSymbol()`](../packages/core/docs/api/functions/emitSymbol.md) for symbols they produce.
- Use [`moveTakenMembersTo()`](../packages/core/docs/api/functions/moveTakenMembersTo.md) to attach emitted members to the nearest declaration.
- Resolve member access chains via `memberRefkey()`.

### Expression/Declaration Split

When a construct can appear both as a top-level declaration and inline (e.g., a record/struct body used inline as a type, or an anonymous class in an expression), provide two components:

- A **Declaration** component that creates a symbol, registers it, and renders the full declaration.
- An **Expression** component that renders just the body.

Expression components whose children create named members (object literals, interface bodies, constructor calls) create a transient symbol via a language-specific factory and call `emitSymbol()` so the parent declaration can capture it. Wrap children in `<MemberScope ownerSymbol={sym}>` so members participate in the binder.

### Value Expression Component

Provide a `ValueExpression` component that converts host runtime values into the target language's source representation. Handle host types with target-language analogs (primitives, collections, null/absent values), delegating to language-specific literal expression components as needed.

### Anonymous Function/Lambda Expressions

Unlike member-bearing expressions, these do not create transient symbols or call `emitSymbol()` — they render a callable body inline. Accept the same parameter and return-type props as function declarations, using the shared callable base component.

### Type Expression Components

Provide type expression components for whatever type-level constructs the target language supports (function types, generic/parameterized types, nullable types, etc.). These wrap their contents in a reference context provider (see [Reference Component](#reference-component)) so nested references resolve in type position.

## Statement & Control Flow Components

Statements typically do not create symbols. Wrap lexical-scope bodies in [`<Scope>`](../packages/core/docs/api/components/Scope.md) with block syntax.

Design compound statements as sibling components that render in sequence, not as deeply nested props:

```tsx
// Prefer sibling composition:
<IfStatement condition="x > 0">positive</IfStatement>
<ElseIfClause condition="x < 0">negative</ElseIfClause>
<ElseClause>zero</ElseClause>

// Not deeply nested props:
<IfStatement condition="x > 0" else={<ElseClause>...</ElseClause>}>
```

Every block-body clause must wrap its body in its own `<Scope>`. For clauses that introduce named bindings, also accept a full parameter descriptor to support whatever annotations the language requires.

## Documentation Comments

Give each declaration component a `doc` prop. Build doc comments as composable component trees matching the language's format (JSDoc, XML doc comments, docstrings). Provide tag components for structured entries (params, returns, examples).

## Type Parameters

Implement a `TypeParameters` tagged component as a tagged child on generic declarations. Each parameter has a `name`, optional constraint, and optional default. Match constraint field names to language keywords (`extends`, `where`).

**Symbol creation:** Create a symbol for each type parameter using your language-specific symbol factory. Ensure each symbol is refkey-referenceable so it can be resolved within the generic scope. Route the symbol to the appropriate declaration space; unbound symbols must not be registered in any declaration space. Delete type parameter symbols on cleanup — they are scoped to the declaring construct.

## Format Options

Use [`createFormatOptionsContextFor()`](../packages/core/docs/api/functions/createFormatOptionsContextFor.md) for configurable style (brace style, semicolons, etc.). Returns a `Provider` and `useFormatOptions` pair. See [Format Options Context](../packages/core/docs/context.md#format-options-context).

## Formatting

Output must match the formatting a canonical/idiomatic formatter would produce for the target language (e.g., Prettier for TypeScript, `dotnet format` for C#, `gofmt` for Go, Black for Python). If someone runs the language's standard formatter on the output, nothing should change.

Use Alloy's [formatting primitives](../packages/core/docs/formatting.md) to express line-break behavior. Key guidelines:

- **Wrap comma-separated constructs** (parameter lists, argument lists, array literals) in `<group>` + `<indent>` so they stay on one line when short and wrap with indentation when long.
- **Use `<List>`** (or a language-specific list component) for comma-separated items — it handles joiners, trailing punctuation, and break behavior.
- **Test break behavior** by setting a narrow `printWidth` (e.g., 40) in tests and verifying the broken layout matches the canonical formatter. Test both the flat (single-line) and broken (multi-line) forms.
- **Don't hard-code line breaks** where a group break should decide. Use `<br />` or `<sbr />` inside a `<group>` instead of `\n`.

## External Libraries

See [External Libraries](../packages/core/docs/symbols-and-scopes.md#external-libraries) in the core docs for the `TO_SYMBOL`/`REFKEYABLE` mechanism.

Implement a `createLibrary()` helper that builds a tree of descriptor objects. Choose the registration target (global namespace, module scope, etc.) appropriate for your language's model.

- Name the factory function to match the target language's packaging concept (e.g., `createPackage()`, `createLibrary()`).
- Support multi-module/multi-path external packages via a hierarchical descriptor with lazy member initialization at each level.
- Symbols are created **lazily on first reference**, cached per-binder.
- **Import generation requires scope placement.** If your `Reference` component resolves imports via scope traversal, library symbols must be placed inside the appropriate scope hierarchy.
- Container types use lazy member initializers — members created on first access.
- Library objects work directly in JSX expressions.

## Member Spaces

Arrange member spaces along the visibility × lifetime axes your language requires. Choose space names matching your language's conventions. See [Member Spaces](../packages/core/docs/symbols-and-scopes.md#member-spaces) for the core mechanism. Public spaces conventionally omit the `public-` prefix — i.e., `static` and `instance` rather than `public-static` and `public-instance`.

- **No access control:** `static`, `instance`.
- **Public/private:** `<vis>-static`, `<vis>-instance` — where `<vis>` is the appropriate visibility prefix for your language (e.g., `private-static`, `private-instance`).
- **Additional visibility tiers:** add rows for each level the language distinguishes (e.g., `internal`, `protected`).

Filter by accessibility when resolving members from outside the owning type.

## Testing

### File Organization

- **Unit tests may be co-located with their source file** — name the test file after the source file with a `.test.tsx` suffix (e.g., `src/components/foo-bar.tsx` → `src/components/foo-bar.test.tsx`).
- **Alternatively, all tests may live in a `test/` directory at the package root.** This is also the natural home for tests that span multiple source files (e.g., cross-file reference resolution tests).

### Test Structure

- **Test components in isolation.** Create focused setup components (wrappers) providing only the context a component needs (e.g., `<Output>` + `<SourceFile>`).
- **No top-level `describe` block.** Put `it()` calls at file scope. Use `describe()` only to group a subset of related tests within a file (e.g., `describe("symbols", ...)`).
- **`toRenderTo()` is a Vitest custom matcher.** Two setup steps are required:
  1. Add `"@alloy-js/core/testing/matchers"` to `"types"` in `tsconfig.json` for TypeScript support.
  2. Add a setup file that imports `"@alloy-js/core/testing"` to register matchers at runtime:

     ```ts
     // test/vitest.setup.ts
     import "@alloy-js/core/testing";
     ```

     Reference `test.setupFiles` in `vitest.config.ts` (see the complete config in [Package Setup](#package-setup)).

  To force line-breaking in tests, pass `{ printWidth: N }` as the second argument — see [`ToRenderToOptions`](../packages/core/docs/api/testing/types/ToRenderToOptions.md).

- Formatting context (required for group breaking) comes only from a file component, not from `<Output>`.
- **Use multi-line template strings for expected output.** Never use single-line strings with `\n`. The [`d` template tag](../packages/core/docs/api/testing/index.md) (from `@alloy-js/core/testing`) strips leading/trailing blank lines and common indentation. `toRenderTo()` applies `d` automatically, so you only need `d` explicitly when using `.toBe()`.
- **One test per behavior/modifier/prop variation.** Use `it.each` for combinatorics (e.g., modifier permutations, value mappings).
- **For reactivity tests or components with internal symbols, use `renderTree()` + `printTree()` instead of `toRenderTo()`** — `toRenderTo()` re-renders on every call, resetting reactive state and re-creating symbols (causing silent name-mangling like `x_2`). Instead:
  1. Create reactive state at **test-body scope** (not in a component function). Note: symbols declared in components cannot be hoisted — `renderTree`/`printTree` is required for those components.
  2. Call [`renderTree()`](../packages/core/docs/api/functions/renderTree.md) **once** to obtain a stable tree.
  3. Mutate reactive state, then assert with [`printTree(tree)`](../packages/core/docs/api/functions/printTree.md) after each mutation.
- **Do not capture `useFormatOptions()` results via closure.** Two independent constraints make this fail:
  1. **Scheduler timing** — component bodies run during scheduler flush, not at tree construction (see _renderTree + printTree_ bullet above), so closures set before flush remain uninitialized.
  2. **Output filtering** — `<Output>` evaluates only `<SourceDirectory>`/`<SourceFile>` children; arbitrary function components placed directly inside `<Output>` never execute.

  Instead, test format option effects through rendered output: wrap the component under test in a format option context with a source file, then assert the rendered output differs between context configurations. Use separate test cases for each option variant.

### What to Test

- **Every prop and modifier** on every declaration component.
- **Formatting edge cases:** test behavior at the boundary where the formatter wraps lines. Verify trailing commas/separators, empty vs. non-empty bodies, multiline parameter/type-parameter lists, and indentation of wrapped content. Use a narrow `printWidth` to force wrapping without extremely long inputs.
- **Reference resolution across files:** declare a symbol in one file, reference it from another, verify the correct import/using is generated. Test both forward and back references.
- **Name policy and conflict resolution:** verify names are cased correctly and conflicts are resolved.
- **External library references:** verify imports/usings are generated for library symbols.
- **Member symbol creation:** verify each member component creates symbols in the correct member space (e.g., static vs. instance, private vs. public). Test all member-space combinations the language supports.
- **Internal member resolution:** verify members are resolvable from within the owning type — sibling methods can reference each other, private fields are accessible internally.
- **External member resolution:** verify members are resolvable from outside the owning type via `memberRefkey()`. Test member chains (e.g., `a.b.c`).
- **Visibility filtering:** verify that private members are _not_ resolvable from outside the owning type. Test each visibility tier the language supports at its appropriate scope boundary.
- **Member components:** verify each member kind renders correctly inside its parent declaration, including formatting in both flat and broken layouts.

### Test Wrapper

- Export `createTestWrapper()` from your `testing/` subpath by delegating to [`createTestWrapper`](../packages/core/docs/api/testing/functions/createTestWrapper.md) from `@alloy-js/core/testing`:
  ```ts
  export function createMyLangTestWrapper(): TestWrapper {
    return createTestWrapper({
      filePath,
      useScope,
      makeSymbol,
      SourceFile: FileComponent,
    });
  }
  ```
- `Wrapper` — JSX component providing Output + a file-level component + language scope context. Wrap each `expect(...)` in it. Name policy context is opt-in — see [`createTestWrapper`](../packages/core/docs/api/testing/functions/createTestWrapper.md).
- `defkey(name)` — returns a `Namekey` and schedules a pre-declaration inside `Wrapper`; bypasses name policy. For tests that verify name casing or conflict resolution, use `namekey()` directly — the test body must then declare the symbol explicitly (no pre-declaration is scheduled).
- Downstream consumers of your language package use this wrapper to test their own components without re-creating language infrastructure.

### Client-Emitter Sample

Every language package should include a `samples/client-emitter/` sample that demonstrates a **data-driven emitter** — a small program that reads an input spec schema and emits typed output using your language package's components. This is the single most important artifact for showing how the components compose in practice.

#### Why data-driven?

The purpose of the sample is _not_ to exercise every component by hardcoding static declarations. A static sample that manually writes out each interface, enum, and class body is no better than a template literal — it proves the components render, but says nothing about how they compose to solve a real problem. The sample should instead demonstrate the core value proposition: given some input data, produce well-structured, cross-referencing code.

#### Spec schema

Define a small **spec schema** — a plain TypeScript type describing the input (e.g., a REST API, a data model, a protocol). Include a concrete instance of the schema with enough variety to exercise the important components. For example:

```ts
// schema.ts
export interface RestApi {
  name: string;
  operations: RestApiOperation[];
  models: RestApiModel[];
}

export interface RestApiOperation {
  name: string;
  endpoint: string;
  verb: "get" | "post";
  requestBody?: RestApiModelReference;
  responseBody?: RestApiModelReference;
}

export interface RestApiModelReference {
  ref: string;
  array?: boolean;
}

export interface RestApiModel {
  name: string;
  properties: RestApiModelProperty[];
}

export interface RestApiModelProperty {
  name: string;
  type: RestApiModel | RestApiModelReference | "string" | "number" | "boolean";
}

export const api: RestApi = {
  name: "Petstore",
  operations: [
    {
      name: "list_pets",
      verb: "get",
      endpoint: "/pets",
      responseBody: { ref: "Pet", array: true },
    },
    {
      name: "create_pet",
      verb: "post",
      endpoint: "/pets",
      requestBody: { ref: "Pet" },
      responseBody: { ref: "Pet" },
    },
  ],
  models: [
    {
      name: "Pet",
      properties: [
        { name: "name", type: "string" },
        { name: "age", type: "number" },
      ],
    },
  ],
};
```

#### Emitter structure

The emitter should iterate over the schema and emit code using your declaration components, `<For>`, cross-file references, and external libraries. The top-level entry point reads the schema and composes the output:

```tsx
const output = await renderAsync(
  <Output namePolicy={namePolicy}>
    <SourceFile path="models.ts">
      <For each={api.models} doubleHardline>
        {(model) => <Model model={model} />}
      </For>
    </SourceFile>
    <SourceFile path="client.ts">
      <Client />
    </SourceFile>
  </Output>,
);
```

Each component (e.g., `<Model>`, `<Client>`, `<ClientMethod>`) is a small focused function that maps one piece of the schema to language constructs. The components should use refkeys derived from schema objects for cross-file references, demonstrating that changing the input schema changes the output without touching the emitter code.

#### What it should exercise

- **Multi-file output** with cross-file references (e.g., a client file importing model types).
- **`<For>` iteration** over schema collections (models, operations, properties).
- **Declaration components** (classes, interfaces, functions, etc.) wired to schema data.
- **Member components** (methods, fields, property signatures, etc.) inside member-bearing declarations — not raw strings.
- **Context** for shared data (e.g., the schema or a reference resolver) via `createContext`/`useContext`.
- **Refkeys derived from schema objects** — `refkey(schemaModel)` rather than manually created refkeys.
- **External library references** (e.g., a fetch library).
- **Name policy and conflict resolution** applied via `<Output>`.
- **Package/project structure** components if your language supports them.
