# 1. Objective

This document captures a deep, evidence-based understanding of the **Alloy core** (`@alloy-js/core`) framework — its architecture, abstractions, rendering pipeline, symbol system, extension surfaces, and testing patterns.

**Purpose:** To provide a future AI agent (or human) with enough grounded knowledge of core to design and implement a new Rust language package (`@alloy-js/rust`) without misplacing responsibilities between core and language-specific code.

**Scope:** Descriptive, not prescriptive. This document does not propose Rust-specific design. It catalogs what core provides, how existing language packages consume it, and what invariants must be respected.

---

# 2. What Alloy Appears to Be

Alloy is a **reactive, component-based code generation framework** written in TypeScript. It uses JSX (not React — a custom JSX runtime) to declaratively describe the structure of generated source code.

**Generation model in plain language:**

1. A developer authors a tree of JSX components that describes the desired output: files, directories, declarations, expressions, statements.
2. Components compose hierarchically. Core components handle structural concerns (files, scopes, formatting). Language-specific components handle syntax (classes, functions, imports).
3. Alloy renders this component tree reactively — using Vue's `@vue/reactivity` under the hood — producing an in-memory tree of formatted text.
4. A binder tracks declared symbols and resolves cross-references (e.g., an import needed because module A references a symbol in module B).
5. The framework prints the text tree through a Prettier-based formatter and writes the result to disk.

**Key evidence:**
- `packages/core/src/render.ts` — orchestrates the 4-phase pipeline (component tree → rendered text tree → document tree → file output).
- `packages/core/src/binder.ts` — symbol resolution engine.
- `packages/core/src/jsx-runtime.ts` — custom JSX runtime (not React).
- Existing language packages (`typescript`, `python`, `go`, `java`, `csharp`) all follow this model.

---

# 3. Core Architectural Model

## 3.1 Rendering Model

Alloy renders in **four sequential phases**:

### Phase 1 — Component Tree Building
JSX templates produce a tree of `Child` nodes. A `Child` can be a string, number, boolean, function (reactive computation), `ComponentCreator`, `Ref`, `Refkey`, intrinsic element, or `CustomContext`. This phase is driven by user code.

### Phase 2 — Rendering (`renderTree`)
`render.ts:renderTree()` walks the component tree. For each node:
- **Strings/numbers** are added directly to a `RenderedTextTree`.
- **Components** are called inside a reactive `effect()`, so they automatically re-render when dependencies change.
- **Functions** (nullary) are wrapped in effects that call them and insert results.
- **Intrinsic elements** (e.g., `<indent>`, `<hardline>`, `<group>`) are converted to `PrintHook` objects carrying Prettier formatting semantics.
- **Refkeys** encountered as children are converted to `Reference` components on the fly.

The output is a `RenderedTextTree`: a recursive array of `(string | RenderedTextTree | PrintHook)[]`.

### Phase 3 — Output Extraction & Printing (`sourceFilesForTree` + `printTree`)
The rendered tree is traversed. Context metadata on each node identifies directories (`OutputDirectory`) and files (`ContentOutputFile`, `CopyOutputFile`). For each file, `printTree()` converts the `RenderedTextTree` into a Prettier `Doc` and calls `prettier.printDocToString()` to produce a formatted string.

### Phase 4 — File System Writing (`writeOutput`)
`write-output.ts:writeOutput()` uses the `AlloyHost` abstraction to write files and directories to disk.

**Key files:** `packages/core/src/render.ts`, `packages/core/src/write-output.ts`, `packages/core/src/print-hook.ts`.

## 3.2 Component / Composition Model

Components are plain functions `(props: TProps) => Children`. They are not classes. They receive props (which may be reactive getters) and return children.

**Composition tools:**
- **`stc(Component)`** (Stateful Template Component) — wraps a component with a fluent API: `stc(MyComp)({ prop: v }).code\`...\``. Enables chaining `.code()`, `.text()`, `.children()`. Defined in `packages/core/src/stc.ts`.
- **`sti(name)`** (Stateful Template Intrinsic) — same fluent API for intrinsic elements. Defined in `packages/core/src/sti.ts`.
- **`mergeProps()`, `splitProps()`, `defaultProps()`** — reactive-aware prop utilities in `packages/core/src/props-combinators.ts`.
- **`code` and `text` template tags** — `code\`...\`` preserves indentation structure and newlines; `text\`...\`` collapses whitespace like JSX. Defined in `packages/core/src/code.ts`.
- **`mapJoin()`, `join()`** — list rendering with configurable joiners/enders. Defined in `packages/core/src/utils.tsx`.

**Built-in components** (in `packages/core/src/components/`):

| Category | Components |
|---|---|
| **Structure** | `Output`, `SourceDirectory`, `SourceFile`, `Scope`, `MemberScope` |
| **Declarations** | `Declaration`, `MemberDeclaration` |
| **References** | `Name`, `MemberName`, `AccessExpression`, `ReferenceOrContent` |
| **Formatting** | `Block`, `Indent`, `StatementList`, `Prose`, `Wrap` |
| **Files** | `TemplateFile`, `UpdateFile`, `AppendFile`, `CopyFile` |
| **Control flow** | `Show`, `For`, `Switch`/`Match`, `List` |

## 3.3 Context / Providers / Hooks

Alloy implements a provider-based context system modeled on Vue's composition API.

**`createContext(defaultValue?, name?)`** creates a `ComponentContext<T>` with a `.Provider` component. **`useContext(context)`** retrieves the value from the nearest ancestor Provider. Contexts are symbol-keyed and stored on the reactive owner chain.

**Key contexts provided by core** (defined in `packages/core/src/context/`):

| Context | Set by | Purpose |
|---|---|---|
| `BinderContext` | `Output` | Access to the `Binder` instance |
| `ScopeContext` | `Scope` | Current symbol scope |
| `DeclarationContext` | `Declaration` | Current symbol being declared |
| `MemberDeclarationContext` | `MemberDeclaration` | Current member being declared |
| `SourceFileContext` | `SourceFile` | Current output file metadata |
| `SourceDirectoryContext` | `SourceDirectory` | Current output directory |
| `NamePolicyContext` | `Output` | Active naming convention policy |
| `FormatOptions` | `Output` | Formatting rules (indent, width) |

**Taps** (`packages/core/src/tap.ts`): A mechanism for parent components to capture values from children. `createTap(tapper, handler?)` returns a component that, when rendered, calls `tapper` to capture a context value. Specialized variants: `createDeclarationTap`, `createMemberTap`, `createScopeTap`, `createSourceFileTap`.

**Content slots** (`packages/core/src/content-slot.tsx`): `createContentSlot()` returns a component that tracks whether it has any content, with `.WhenEmpty` and `.WhenHasContent` sub-components for conditional rendering.

## 3.4 Document / File Generation Model

File structure is declared via components:

```tsx
<Output>
  <SourceDirectory path="src">
    <SourceFile path="main.ts" filetype="typescript">
      {code`console.log("hello");`}
    </SourceFile>
  </SourceDirectory>
</Output>
```

- **`Output`** — root component; sets up the `Binder`, `NamePolicy`, and `FormatOptions` contexts.
- **`SourceDirectory`** — represents a directory; provides `SourceDirectoryContext`.
- **`SourceFile`** — represents a file; provides `SourceFileContext` including `path`, `filetype`, and a `reference` component for generating references to symbols in this file.

The `filetype` on `SourceFile` is a string identifier. Language packages use it to control file extensions and formatting behavior. The `reference` prop is a component that language packages provide to render references to symbols (e.g., generating import statements).

**Output types** (from `render.ts`):
- `OutputDirectory` — `{ kind: "directory", path, contents: (OutputDirectory | OutputFile)[] }`
- `ContentOutputFile` — `{ kind: "file", path, filetype, contents: string }`
- `CopyOutputFile` — `{ kind: "copy-file", path, sourcePath }`

## 3.5 Symbol / Reference Model

Alloy has a comprehensive symbol system for tracking named entities and resolving cross-references.

### Symbols (`OutputSymbol`)
An abstract base class (`packages/core/src/symbols/output-symbol.ts`). Key reactive properties:
- `name` — display name (may be transformed by name policy)
- `originalName` — the name as requested
- `refkeys` — array of `Refkey` identifiers
- `spaces` — which `OutputSpace` instances contain this symbol
- `memberSpaces` — scoped containers for member symbols (keyed by strings like `"static"`, `"instance"`)
- `type` — optional type symbol (if set and `isTyped`, member lookups delegate to this type)
- `aliasTarget` — if set, this symbol is an alias
- `isTransient` — if true, symbol cannot be directly referenced; used for combining into other symbols
- `metadata` — arbitrary reactive metadata bag
- `namePolicy` — optional per-symbol naming function

Language packages subclass this. For example, `TSOutputSymbol` adds `export`, `default`, `tsFlags`. `CSharpSymbol` adds `accessibility`, `isOverride`, `isAbstract`, etc.

### Scopes (`OutputScope`)
An abstract base class (`packages/core/src/symbols/output-scope.ts`). Scopes form a tree:
- `parent` — parent scope (undefined for root)
- `children` — set of child scopes
- `ownerSymbol` — if set, this is a **member scope** that exposes the owner's members instead of its own declaration spaces

Each scope subclass declares `static readonly declarationSpaces: string[]`. For example, `BasicScope` declares `["symbols"]`; TypeScript scopes declare `["values", "types"]`.

### Spaces (`OutputSpace`)
Two kinds (`packages/core/src/symbols/output-space.ts`):
- **`OutputDeclarationSpace`** — symbols declared within a scope.
- **`OutputMemberSpace`** — member symbols of a particular symbol.

Both are backed by `SymbolTable` (`packages/core/src/symbols/symbol-table.ts`), a reactive set with name/refkey indexing and automatic name deconfliction.

### Refkeys (`Refkey`)
The identity system for symbols (`packages/core/src/refkey.ts`):
- **`SymbolRefkey`** — `{ key: string }`, deterministic from arguments.
- **`Namekey`** — a SymbolRefkey with a `name` property and optional naming flags.
- **`MemberRefkey`** — `{ base: Refkey, member: Refkey | string }`, for nested member access.
- `refkey(...args)` — creates a deterministic refkey; same args → same object (cached).
- `namekey(name, options?)` — creates a namekey.
- `memberRefkey(base, ...members)` — creates a chained member refkey.

## 3.6 Scope and Name Resolution Model

### Binder (`packages/core/src/binder.ts`)
The `Binder` is the central resolution engine. Created by `createOutputBinder(options)` and provided via `BinderContext`.

**Resolution:** `resolveDeclarationByKey(currentScope, refkey, options?)` returns a reactive `Ref<ResolutionResult>` containing:
- `symbol` — the resolved symbol
- `lexicalDeclaration` — the top-level symbol (if resolved through member path)
- `memberPath` — symbols traversed from lexical declaration to target
- `commonScope` — deepest scope containing both reference and declaration
- `pathUp` — scopes from reference scope up to common scope
- `pathDown` — scopes from common scope down to declaration scope
- `fullSymbolPath`, `fullReferencePath` — complete scope chains to root

This information tells language packages how to generate qualified references, whether imports are needed, etc.

**Symbol lifecycle managed by binder:**
1. `notifySymbolCreated(symbol)` — registers symbol by refkeys, notifies waiters.
2. `notifySymbolDeleted(symbol)` — unregisters symbol.
3. Waiting refs: if a symbol is referenced before it's declared, the binder creates a `shallowRef` that resolves later.

**Name conflict resolution:** Binder accepts an optional `nameConflictResolver` callback. Default behavior: renames conflicting symbols with `_2`, `_3` suffixes.

**Member resolution:** An optional `MemberResolver` callback receives `(owner, member, context)` and can implement language-specific visibility/access rules.

### Name Policies (`packages/core/src/name-policy.ts`)
`createNamePolicy<T>(namer)` creates a policy that transforms symbol names based on element type. The `namer` function receives `(name: string, element: T) => string`. Policies are provided via `NamePolicyContext` and applied when symbols are created.

## 3.7 Formatting / Printing Model

Alloy uses **Prettier's document IR** for output formatting. Intrinsic JSX elements map to Prettier builders:

| Intrinsic Element | Prettier Builder | Purpose |
|---|---|---|
| `<group>` | `group()` | Try single line; break if too wide |
| `<indent>` | `indent()` | Increase indent level |
| `<dedent>` | `dedent()` | Decrease indent level |
| `<line>` / `<br>` | `line` | Space if fits, newline if broken |
| `<hardline>` / `<hbr>` | `hardline` | Always newline |
| `<softline>` / `<sbr>` | `softline` | Newline only if group breaks |
| `<literalline>` / `<lbr>` | `literalline` | Always newline, ignore indent |
| `<fill>` | `fill()` | Paragraph-like wrapping |
| `<ifBreak>` | `ifBreak()` | Conditional on group break state |
| `<indentIfBreak>` | `indentIfBreak()` | Conditional indent |
| `<lineSuffix>` | `lineSuffix()` | Append to end of line |
| `<breakParent>` | `breakParent` | Force parent group to break |
| `<align>` | `align()` | Align to column |
| `<markAsRoot>` | `markAsRoot()` | Set indent root |
| `<dedentToRoot>` | `dedentToRoot()` | Dedent to root level |

The `code` template tag automatically converts indentation into nested `<indent>` structures and newlines into `<hbr>` elements.

`printTree()` in `render.ts` walks the `RenderedTextTree`, converts strings (splitting on newlines with hardlines between) and `PrintHook` objects into Prettier Docs, then calls `prettier.printDocToString()`.

**Format options** (`packages/core/src/context/format-options.ts`): Configurable `printWidth`, `tabWidth`, `useTabs`, `insertFinalNewLine`.

## 3.8 Extension / Plugin Surfaces for Language Packages

Language packages extend core by:

1. **Subclassing `OutputSymbol`** with language-specific properties.
2. **Subclassing `OutputScope`** with language-specific declaration spaces.
3. **Defining `memberSpaces`** on symbol subclasses (e.g., `["static", "instance", "private-static", "private-instance"]` for TypeScript).
4. **Defining `declarationSpaces`** on scope subclasses (e.g., `["values", "types"]` for TypeScript/Go, `["symbols"]` for Python/Java).
5. **Implementing a `NamePolicy`** via `createNamePolicy()`.
6. **Building JSX components** that render language syntax using core's formatting intrinsics.
7. **Providing a `Reference` component** (set on `SourceFile`) that generates language-specific references (imports, qualified names, etc.).
8. **Providing external dependency descriptors** (e.g., `createPackage()` for TS, `createModule()` for Go/Python).

---

# 4. Key Core Concepts

## 4.1 `Children` / `Child`

**What it means:** The universal type for component return values and JSX children. A `Child` is one of: string, number, boolean, null, undefined, `Ref`, `Refkey`, function `() => Children`, `ComponentCreator`, `IntrinsicElement`, `RenderableObject`, or `CustomContext`. `Children` is `Child | Children[]` (recursive).

**Why it matters:** Every component must return `Children`. Understanding the valid child types is essential to writing components.

**Key files:** `packages/core/src/runtime/component.ts`

## 4.2 `ComponentCreator`

**What it means:** The runtime representation of a component invocation — wraps a `Component` function with its props, optional tag, and source location. Created by `createComponent()`.

**Why it matters:** This is what JSX expressions produce after compilation. The render loop dispatches on `ComponentCreator` to call the component function.

**Key files:** `packages/core/src/runtime/component.ts`, `packages/core/src/jsx-runtime.ts`

## 4.3 `RenderedTextTree`

**What it means:** The intermediate tree after rendering: `(string | RenderedTextTree | PrintHook)[]`. Strings are literal text; nested arrays are subtrees; `PrintHook` objects carry formatting instructions.

**Why it matters:** This is the bridge between the component/rendering phase and the printing phase. Language packages don't normally interact with it directly, but understanding it clarifies how formatting works.

**Key files:** `packages/core/src/print-hook.ts`, `packages/core/src/render.ts`

## 4.4 `OutputSymbol` and `OutputScope`

**What it means:** Abstract base classes for all symbols and scopes. Symbols are named, referenceable entities. Scopes are containers that form a tree hierarchy.

**Why it matters:** Every language package must subclass both. The choice of `declarationSpaces` and `memberSpaces` determines the structure of the symbol table.

**Key files:** `packages/core/src/symbols/output-symbol.ts`, `packages/core/src/symbols/output-scope.ts`

## 4.5 `SymbolTable` / `OutputSpace`

**What it means:** Reactive collections of symbols with name/refkey indexing and automatic name deconfliction. `OutputDeclarationSpace` lives inside scopes; `OutputMemberSpace` lives inside symbols.

**Why it matters:** Name conflicts are resolved here. The deconfliction strategy can be customized per binder.

**Key files:** `packages/core/src/symbols/symbol-table.ts`, `packages/core/src/symbols/output-space.ts`

## 4.6 `Refkey`

**What it means:** A stable identity token for symbols. Can be a `SymbolRefkey` (keyed), `Namekey` (named + keyed), or `MemberRefkey` (nested member access). Same arguments produce the same refkey (cached).

**Why it matters:** Refkeys are the primary mechanism for cross-file, cross-scope references. A user writes `refkey()` to create a stable ID, passes it to a `Declaration`, and later uses it to reference that symbol.

**Key files:** `packages/core/src/refkey.ts`

## 4.7 `Binder` and `ResolutionResult`

**What it means:** The binder is the resolution engine that maps refkeys to symbols and computes scope paths between references and declarations. `ResolutionResult` contains the resolved symbol plus path information (pathUp, pathDown, commonScope, memberPath).

**Why it matters:** Language packages use `ResolutionResult` to decide whether to emit an import statement, a qualified name, or a simple identifier.

**Key files:** `packages/core/src/binder.ts`

## 4.8 `NamePolicy`

**What it means:** A pluggable naming convention system. `createNamePolicy<T>(namer)` creates a policy parameterized by element type (e.g., `"class"`, `"function"`, `"variable"`). The policy transforms names (e.g., `camelCase`, `PascalCase`, `snake_case`).

**Why it matters:** Every language package defines a name policy. Symbols opt in via element type and can opt out via `ignoreNamePolicy`.

**Key files:** `packages/core/src/name-policy.ts`

## 4.9 `code` and `text` Template Tags

**What it means:** `code\`...\`` is a template tag that preserves indentation and newlines, converting them to `<indent>` and `<hbr>` structures. `text\`...\`` collapses whitespace like JSX.

**Why it matters:** The `code` tag is the primary way to emit formatted code from within components.

**Key files:** `packages/core/src/code.ts`

## 4.10 Intrinsic Elements

**What it means:** JSX elements like `<indent>`, `<hardline>`, `<group>`, etc. that map directly to Prettier formatting builders. They are not HTML elements.

**Why it matters:** These are the low-level formatting primitives. The `code` tag generates them automatically, but components can use them directly for fine-grained control.

**Key files:** `packages/core/src/runtime/intrinsic.ts`, `packages/core/src/render.ts` (intrinsic handling)

## 4.11 Reactivity System

**What it means:** Alloy uses `@vue/reactivity` for reactive state management. Core re-exports `ref`, `shallowRef`, `computed`, `reactive`, `effect`, `memo`, `watch`, `untrack`, `onCleanup`. All symbol/scope properties are reactive.

**Why it matters:** Components re-render automatically when dependencies change. Symbol resolution is reactive — references update when symbols are created/moved. Language packages must be aware that props may be reactive getters.

**Key files:** `packages/core/src/reactivity.ts`

## 4.12 Context System

**What it means:** `createContext(default?, name?)` creates a context; `.Provider` sets a value; `useContext(ctx)` reads it. Contexts are symbol-keyed and propagated through the reactive owner chain.

**Why it matters:** Contexts are the primary mechanism for passing data down the component tree (binder, scope, source file info, format options, etc.).

**Key files:** `packages/core/src/context.ts`

## 4.13 Symbol Flow

**What it means:** `takeSymbols()` marks a context as collecting symbols; `emitSymbol(symbol)` sends a symbol up to the nearest taking context. Symbols bubble up through contexts but stop at scope boundaries.

**Why it matters:** Enables parent components to collect child-declared symbols (e.g., for a class collecting its members).

**Key files:** `packages/core/src/symbols/symbol-flow.ts`

## 4.14 `stc` / `sti`

**What it means:** `stc(Component)` wraps a component with a fluent API for composition. Returns a callable creator with `.code()`, `.text()`, `.children()` chainable methods. `sti(name)` does the same for intrinsic elements.

**Why it matters:** Language packages use `stc` extensively to create composable component APIs.

**Key files:** `packages/core/src/stc.ts`, `packages/core/src/sti.ts`

## 4.15 Host System

**What it means:** `AlloyHost` / `AlloyFileInterface` abstract file system operations. Node.js and browser implementations exist.

**Why it matters:** Enables Alloy to work in different environments. Language packages don't typically interact with this directly.

**Key files:** `packages/core/src/host/alloy-host.ts`, `packages/core/src/host/alloy-host.browser.ts`

## 4.16 Scheduler

**What it means:** Manages batching and flushing of reactive effects. `queueJob()` adds work; `flushJobs()` runs all queued work synchronously. Supports async coordination via `trackPromise()`.

**Why it matters:** Symbol name deconfliction and reactive updates are deferred to the scheduler. Tests must call `flushJobs()` after symbol mutations.

**Key files:** `packages/core/src/scheduler.ts`

## 4.17 Diagnostics

**What it means:** `DiagnosticsCollector` collects structured `Diagnostic` messages (`{ id, message, severity, source?, componentStack? }`). Auto-captures render stack for context. `emitDiagnostic()` is the primary API.

**Why it matters:** Language packages can emit warnings/errors with rich context about what component triggered the issue.

**Key files:** `packages/core/src/diagnostics.ts`

---

# 5. Core-to-Language Extension Surface

## 5.1 Clearly Observed Extension Points

These are directly exercised by all existing language packages:

1. **`OutputSymbol` subclass** — Every language package defines a custom symbol class.
   - TypeScript: `TSOutputSymbol` (`packages/typescript/src/symbols/ts-output-symbol.ts`)
   - Python: `PythonOutputSymbol` (`packages/python/src/symbols/python-output-symbol.ts`)
   - Go: `GoSymbol` (`packages/go/src/symbols/go-output-symbol.ts`)
   - Java: `JavaOutputSymbol` (`packages/java/src/symbols/java-output-symbol.ts`)
   - C#: `CSharpSymbol` (`packages/csharp/src/symbols/csharp-output-symbol.ts`)

2. **`OutputScope` subclass hierarchy** — Multiple scope levels per language.
   - TypeScript: `TSPackageScope → TSModuleScope → TSLexicalScope`
   - Python: `PythonModuleScope → PythonLexicalScope`
   - Go: `GoModuleScope → GoPackageScope → GoSourceFileScope → GoFunctionScope / GoNamedTypeScope → GoLexicalScope`
   - Java: `JavaProjectScope → JavaPackageScope → JavaLexicalScope`
   - C#: `CSharpNamespaceScope → CSharpSourceFileScope → CSharpClassScope / CSharpMethodScope → CSharpLexicalScope`

3. **`static readonly declarationSpaces`** on scope classes:
   - Dual namespace: `["values", "types"]` (TypeScript, Go)
   - Single namespace: `["symbols"]` (Python, Java)
   - Mixed: scope-dependent (C#)

4. **`static readonly memberSpaces`** on symbol classes:
   - TypeScript: `["static", "instance", "private-static", "private-instance"]`
   - Python/Java: `["static", "instance"]`
   - Go/C#: defined per scope type or symbol subclass, not centralized

5. **`createNamePolicy()`** — All packages define a name policy.
   - TypeScript: PascalCase for types, camelCase for values (`packages/typescript/src/name-policy.ts`)
   - Python: PascalCase for classes, snake_case for functions/variables (`packages/python/src/name-policy.ts`)
   - Go: no transformations, only reserved word handling (`packages/go/src/name-policy.ts`)
   - Java: PascalCase for types, camelCase for values (`packages/java/src/name-policy.ts`)
   - C#: PascalCase for public, camelCase for params, `_` prefix for private (`packages/csharp/src/name-policy.ts`)

6. **Reference component** — Each package provides a component set on `SourceFile`'s `reference` prop that generates language-appropriate references (import statements, qualified names, etc.).

7. **Symbol factory functions** — Each package exposes functions like `createFunctionSymbol()`, `createParameterSymbol()`, etc. that call core's `createSymbol(SymbolClass, name, spaces, options)`.

8. **External dependency descriptors** — Each package provides a function to describe external libraries:
   - TypeScript: `createPackage()` (`packages/typescript/src/create-package.ts`)
   - Python: `createModule()` (`packages/python/src/create-module.ts`)
   - Go: `createModule()` (`packages/go/src/create-module.ts`)
   - Java: `createLibrary()` (`packages/java/src/create-library.ts`)
   - C#: `createLibrary()` (`packages/csharp/src/create-library.ts`)

9. **Custom contexts** — Language packages create their own contexts for language-specific state (e.g., `PackageContext`, `ModuleContext`, `NamespaceContext`).

10. **JSX components for language syntax** — Each package provides components like `ClassDeclaration`, `FunctionDeclaration`, `InterfaceDeclaration`, `ImportStatement`, etc.

## 5.2 Inferred Extension Patterns

These patterns are consistent across packages but not formally documented as extension contracts:

1. **Source directory layout** — A typical language package organizes as:
   ```
   src/
   ├── symbols/           # OutputSymbol subclass + factories
   ├── scopes/            # OutputScope subclass hierarchy (or inline in symbols/)
   ├── components/        # JSX components for language constructs
   ├── context/           # Language-specific contexts
   ├── builtins/          # Built-in type/library descriptors
   ├── name-policy.ts     # Naming conventions
   ├── create-*.ts        # External dependency descriptor factory
   └── index.ts           # Barrel export
   ```

2. **Import statement component pattern** — Every language package has a component (often `ImportStatement` or `Reference`) that:
   - Analyzes the `ResolutionResult` from the binder
   - Determines if an import is needed (different file/module/package)
   - Generates the language-appropriate import syntax
   - Groups and sorts imports

3. **Scope-to-component mapping** — Each scope level typically corresponds to a structural component (e.g., `PackageDirectory` → `PackageScope`, `SourceFile` → `ModuleScope`).

4. **Symbol copying** — Language symbol subclasses implement `copy()` for instantiation patterns (generics, type aliases). The pattern calls `createSymbol()` with the same constructor and then `initializeCopy()`.

5. **`useXScope()` hooks** — Language packages define convenience hooks like `useTSScope()`, `usePythonScope()`, `useGoScope()` that wrap `useContext(ScopeContext)` with type narrowing.

---

# 6. Source File Inventory

## 6.1 Core Package (`packages/core/src/`)

### Rendering Pipeline

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `render.ts` | Main render orchestrator | `render()`, `renderAsync()`, `renderTree()`, `sourceFilesForTree()`, `printTree()`, `OutputDirectory`, `OutputFile`, `ContentOutputFile`, `CopyOutputFile` | Core pipeline; language packages don't call directly but depend on its behavior |
| `write-output.ts` | File system writing | `writeOutput()` | Output phase |
| `print-hook.ts` | Print hook protocol | `PrintHook`, `isPrintHook()`, `RenderedTextTree` | Formatting bridge |
| `code.ts` | Template tags | `code`, `text` | Primary way to emit formatted code |
| `jsx-runtime.ts` | JSX runtime | `jsx`, `jsxs` | JSX compilation target |

### Symbol System

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `symbols/output-symbol.ts` | Base symbol class | `OutputSymbol`, `OutputSymbolOptions` | **Must subclass** for any language |
| `symbols/output-scope.ts` | Base scope class | `OutputScope`, `OutputScopeOptions` | **Must subclass** for any language |
| `symbols/output-space.ts` | Space types | `OutputDeclarationSpace`, `OutputMemberSpace`, `OutputSpace` | Containers for symbols |
| `symbols/symbol-table.ts` | Reactive symbol set | `SymbolTable` | Name/refkey indexing, deconfliction |
| `symbols/basic-symbol.ts` | Simple symbol | `BasicSymbol` | Reference implementation; `memberSpaces = ["static", "instance"]` |
| `symbols/basic-scope.ts` | Simple scope | `BasicScope` | Reference implementation; `declarationSpaces = ["symbols"]` |
| `symbols/symbol-flow.ts` | Symbol emission | `takeSymbols()`, `emitSymbol()`, `moveTakenMembersTo()`, `instantiateTakenMembersTo()` | Symbol collection across component boundaries |
| `symbols/symbol-slot.tsx` | Symbol collection component | `SymbolSlot`, `createSymbolSlot()` | Collecting emitted symbols |
| `symbols/decl.ts` | Declaration helper | `decl(namekey)` | Quick symbol declaration for BasicScope |
| `binder.ts` | Resolution engine | `createOutputBinder()`, `createScope()`, `createSymbol()`, `Binder`, `ResolutionResult`, `MemberResolver` | **Central API** for symbol management |
| `refkey.ts` | Identity system | `refkey()`, `namekey()`, `memberRefkey()`, `Refkey`, `SymbolRefkey`, `Namekey`, `MemberRefkey` | **Must use** for symbol identity |
| `name-policy.ts` | Naming conventions | `createNamePolicy()`, `NamePolicy`, `NamePolicyGetter` | **Must implement** for any language |
| `library-symbol-reference.ts` | External symbol bridge | `LibrarySymbolReference`, `TO_SYMBOL` | For library/builtin type references |

### Component Infrastructure

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `components/Output.tsx` | Root component | `Output` | Entry point; sets up binder, name policy, format options |
| `components/SourceFile.tsx` | File component | `SourceFile` | Must set `reference` prop to language-specific reference component |
| `components/SourceDirectory.tsx` | Directory component | `SourceDirectory` | File structure |
| `components/Declaration.tsx` | Symbol declaration | `Declaration` | Declares a symbol in current scope |
| `components/MemberDeclaration.tsx` | Member declaration | `MemberDeclaration` | Declares a member on current symbol |
| `components/Scope.tsx` | Scope creation | `Scope` | Creates a new scope level |
| `components/MemberScope.tsx` | Member scope | `MemberScope` | Creates a member scope for a symbol |
| `components/Block.tsx` | Code block | `Block` | `{ ... }` with indentation |
| `components/Indent.tsx` | Indentation | `Indent` | Indent children |
| `components/List.tsx` | List rendering | `List` | Maps arrays to joined output |
| `components/For.tsx` | Iteration | `For` | Collection iteration |
| `components/Show.tsx` | Conditional | `Show` | If/else rendering |
| `components/Name.tsx` | Symbol name | `Name` | Renders resolved symbol name |
| `components/AccessExpression.tsx` | Member access | `AccessExpression` | `obj.member` expressions |

### Context System

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `context.ts` | Context primitives | `createContext()`, `useContext()`, `ComponentContext` | **Must use** for language-specific state |
| `context/binder.ts` | Binder context | `BinderContext`, `useBinder()` | Access current binder |
| `context/scope.ts` | Scope context | `ScopeContext`, `useScope()` | Access current scope |
| `context/declaration.ts` | Declaration context | `DeclarationContext`, `useDeclaration()` | Access current declaration |
| `context/source-file.ts` | Source file context | `SourceFileContext`, `useSourceFile()` | Access current file metadata |
| `context/format-options.ts` | Format options | `FormatOptionsContext` | Formatting configuration |
| `context/name-policy.ts` | Name policy context | `NamePolicyContext`, `useNamePolicy()` | Access current name policy |

### Composition & Utilities

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `stc.ts` | Component wrapper | `stc()` | Fluent API for component composition |
| `sti.ts` | Intrinsic wrapper | `sti()` | Fluent API for intrinsic composition |
| `props-combinators.ts` | Prop utilities | `mergeProps()`, `splitProps()`, `defaultProps()` | Reactive prop handling |
| `utils.tsx` | Common utilities | `mapJoin()`, `join()`, `children()`, `childrenArray()`, `traverseOutput()` | List rendering, output traversal |
| `content-slot.tsx` | Content tracking | `createContentSlot()` | Conditional rendering based on content |
| `tap.ts` | Context tapping | `createTap()`, `createDeclarationTap()`, etc. | Parent captures child context values |
| `resource.ts` | Async resources | `createResource()`, `createFileResource()` | Async data fetching |
| `reactive-union-set.ts` | Reactive set | `ReactiveUnionSet` | Aggregating symbols from multiple sources |

### Runtime & Infrastructure

| Path | Purpose | Key Exports | Relevance |
|---|---|---|---|
| `runtime/component.ts` | Component types | `Component`, `ComponentCreator`, `Child`, `Children`, `Props` | Type definitions for component system |
| `runtime/intrinsic.ts` | Formatting elements | Intrinsic element definitions | Prettier-mapped formatting primitives |
| `reactivity.ts` | Reactivity wrappers | `ref()`, `shallowRef()`, `computed()`, `effect()`, `memo()`, `watch()`, `untrack()`, `onCleanup()` | Vue reactivity with Alloy extensions |
| `scheduler.ts` | Job scheduler | `queueJob()`, `flushJobs()`, `flushJobsAsync()`, `scheduler()` | Batched reactive updates |
| `diagnostics.ts` | Diagnostic system | `DiagnosticsCollector`, `emitDiagnostic()`, `reportDiagnostics()` | Structured error/warning reporting |
| `render-stack.ts` | Component stack tracking | `pushStack()`, `popStack()`, `printRenderStack()` | Error diagnostics with component context |
| `host/alloy-host.ts` | File system abstraction | `AlloyHost`, `AlloyFileInterface` | Environment-portable I/O |

## 6.2 Testing (`packages/core/testing/`)

| Path | Purpose | Key Exports |
|---|---|---|
| `index.ts` | Testing barrel | Re-exports all testing utilities |
| `extend-expect.ts` | Vitest matchers | `toRenderTo()`, `toRenderToAsync()`, `toHaveDiagnostics()`, `toHaveDiagnosticsAsync()` |
| `render.ts` | Test rendering | `renderToString()`, `d` (dedent template tag), `dedent()`, `printTree()` |
| `create-test-wrapper.tsx` | Test wrapper factory | `createTestWrapper()` |

---

# 7. Invariants and Constraints

## 7.1 What Core Owns

- **Rendering pipeline** — render, print, write phases are entirely core's responsibility. Language packages produce component trees; core renders them.
- **Symbol infrastructure** — `OutputSymbol`, `OutputScope`, `OutputSpace`, `SymbolTable`, `Binder` are core's domain. Language packages subclass but do not replace.
- **Refkey system** — identity and resolution is core-managed. Language packages use `refkey()`, `namekey()`, `memberRefkey()`.
- **Reactivity** — `@vue/reactivity` integration, scheduling, and effect management are core.
- **Formatting primitives** — intrinsic elements and the Prettier integration are core.
- **Context system** — `createContext()` / `useContext()` and the provider mechanism are core.

## 7.2 What Language Packages Own

- **Symbol semantics** — what constitutes a "class", "function", "interface", etc.
- **Scope semantics** — how many scope levels exist, what declaration spaces they have.
- **Member space definitions** — what member categories exist (e.g., static, instance, private).
- **Name policy** — how names are transformed per element type.
- **Reference rendering** — how to generate imports, qualified names, etc. for a given `ResolutionResult`.
- **Syntax components** — JSX components that emit language-specific syntax.
- **External dependency descriptors** — how to describe pre-existing libraries/packages.
- **Reserved word lists** — language-specific keyword conflicts.

## 7.3 Assumptions About Rendering

- Components are **functions**, not classes.
- Component props **may be reactive getters**. Do not destructure props; access them as `props.x`.
- The `code` template tag handles indentation automatically. Components should use it for multi-line code emission.
- Intrinsic elements are **not** HTML elements. They are Prettier formatting builders.
- The rendering is **reactive** — components re-render when their dependencies change. This is automatic and not something language packages need to manage directly.
- `<></>` (fragments) are used instead of `<Fragment>`.

## 7.4 Assumptions About Symbol Handling

- Every language symbol class must extend `OutputSymbol` and define `static readonly memberSpaces`.
- Every language scope class must extend `OutputScope` and define `static readonly declarationSpaces`.
- Symbols are created via `createSymbol(Constructor, name, spaces, options)` — never directly instantiated.
- Scopes are created via `createScope(Constructor, ...args)` — never directly instantiated.
- A symbol's `name` may be transformed by its `namePolicy`. The original name is preserved in `originalName`.
- Refkeys must be created before use and should be stable (same args → same refkey).
- Name deconfliction is automatic (via `SymbolTable`) but can be customized via `nameConflictResolver`.
- Transient symbols cannot be referenced directly; their members must be moved to non-transient symbols.

## 7.5 Assumptions About Output Structure

- The output is always a tree of directories and files.
- `Output` is always the root component.
- `SourceFile` requires a `path` and `filetype`.
- `SourceFile` accepts a `reference` prop — a component that language packages must provide to render references to symbols declared in that file.
- File contents are formatted by Prettier using the configured format options.

---

# 8. Testing Patterns in Core

## 8.1 Framework

Alloy uses **Vitest** for all testing. Tests are `.test.tsx` files using JSX.

## 8.2 Custom Vitest Matchers

Core provides custom matchers in `packages/core/testing/extend-expect.ts`:
- **`toRenderTo(expected)`** — renders JSX and compares to expected string (single file) or `Record<string, string>` (multi-file).
- **`toRenderToAsync(expected)`** — async variant.
- **`toHaveDiagnostics(expected)`** — validates emitted diagnostics.
- **`toHaveDiagnosticsAsync(expected)`** — async variant.

These are enabled by importing `"@alloy-js/core/testing"` in test files.

## 8.3 Test Utilities

- **`d\`...\``** — template tag that dedents multi-line strings, removing common leading whitespace. Essential for readable expected output.
- **`renderToString(jsx)`** — convenience: render → printTree → string.
- **`toSourceText(children, options?, path?)`** — language package test utility (defined in each package's `test/utils.tsx`) that wraps children in appropriate `Output` + `SourceFile` and returns the rendered string.
- **`findFile(outputDir, path)`** — extracts a specific file from multi-file output.
- **`assertFileContents(outputDir, expected)`** — batch validation of multiple files.

## 8.4 Testing Patterns

**Pattern 1: Simple rendering assertion**
```tsx
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";

it("renders", () => {
  expect(<MyComponent prop="value" />).toRenderTo(d`expected output`);
});
```

**Pattern 2: Multi-file with symbol references**
```tsx
const key = refkey();
expect(
  <Output>
    <SourceFile path="a.ts" filetype="typescript">
      <Declaration name="foo" refkey={key} />
    </SourceFile>
    <SourceFile path="b.ts" filetype="typescript">
      <Reference refkey={key} />
    </SourceFile>
  </Output>
).toRenderTo({ "a.ts": "...", "b.ts": "..." });
```

**Pattern 3: Symbol/scope unit tests**
```tsx
const scope = createScope(BasicScope, "test", undefined, { binder });
const symbol = createSymbol(BasicSymbol, "sym", undefined, { binder });
flushJobs(); // Must flush after symbol mutations
expect(scope.symbols.symbolNames.has("sym")).toBe(true);
```

**Pattern 4: Language package test utility**
```tsx
// In test/utils.tsx
export function toSourceText(children, options?, path?) {
  // Wraps in Output + SourceFile + language-specific setup
}

// In test file
it("renders class", () => {
  const res = toSourceText(<lang.ClassDeclaration name="Foo" />);
  expect(res).toBe(d`class Foo {}`);
});
```

## 8.5 Implications for New Language Packages

- **Must import `"@alloy-js/core/testing"`** in every test file to get custom matchers.
- **Must define `test/utils.tsx`** with `toSourceText()` and related helpers.
- **Must call `flushJobs()`** after reactive symbol operations before assertions.
- **Use `d\`...\``** for all multi-line expected output to handle indentation.
- **Test cross-file references** to verify import generation works.
- **Test name policy** to verify naming conventions are applied correctly.

---

# 9. Ambiguities / Open Questions

1. **`filetype` semantics** — `SourceFile`'s `filetype` is a free-form string. It's unclear if core assigns any behavior to specific filetype values or if it's purely for language package use. Observed values: `"typescript"`, `"python"`, `"go"`, etc.

2. **Member resolver contract** — The `MemberResolver` callback on the binder is optional and its usage varies across language packages. The exact contract for when it's called vs. when default member resolution is used needs verification per language.

3. **`defaultDeclarationSpace`** — `BasicScope` defines `static readonly defaultDeclarationSpace = "symbols"`. It's unclear whether this is a formal core concept used by the binder or just a convention.

4. **Transient symbol lifecycle** — The exact patterns for when transient symbols should be used, how their members are combined, and the typical component patterns around them are sparsely documented. The `SymbolSlot` component seems to be the primary consumer but usage examples in language packages are limited.

5. **Dual build system** — Core has `dist/` (production) and `dist/dev/` (development) builds. The `"source"` export condition is used by Vitest. It's unclear if language packages need to replicate this exact structure or can simplify.

6. **Language-specific `decl()` functions** — Core provides `decl()` for `BasicScope`, and the code comments note that language-specific `decl` functions are needed for other scopes. The pattern for implementing these is not standardized.

7. **`getSymbolCreatorSymbol()` / descriptor system** — The mechanism for lazy symbol creation from external dependency descriptors varies between packages and is one of the less-documented extension surfaces.

8. **Symbol `copy()` semantics** — All language symbols implement `copy()`, but the exact contract (what must be preserved, what can differ) varies and is not formally documented in core.

---

# 10. Key Takeaways for Future Language Package Design

1. **Subclass `OutputSymbol` and `OutputScope`** — This is non-negotiable. Define `memberSpaces` and `declarationSpaces` carefully; they determine the structure of the entire symbol table.

2. **Decide declaration space strategy early** — TypeScript and Go use dual namespaces (`values` + `types`); Python and Java use a single namespace. Rust has types, values, macros, and lifetimes — the namespace model needs deliberate design.

3. **Implement a `NamePolicy`** — Every language has naming conventions. Use `createNamePolicy()`. Define element types that map to your language's constructs. Handle reserved words.

4. **Build a `Reference` component** — This is the most complex part of a language package. It must analyze `ResolutionResult` and generate the appropriate reference syntax (imports, `use` statements, qualified paths, etc.).

5. **Use core's formatting intrinsics** — Don't reinvent formatting. Use `code\`...\``, `<indent>`, `<hardline>`, `<group>`, etc. The Prettier integration handles line wrapping and indentation.

6. **Props may be reactive** — Never destructure props in component definitions. Access them as `props.x`. This is an Alloy invariant, not a React pattern.

7. **Test with `toRenderTo()` and `d\`...\``** — Follow the established testing pattern. Import `"@alloy-js/core/testing"`, create a `test/utils.tsx` with `toSourceText()`.

8. **Follow the established directory structure** — `symbols/`, `components/`, `context/`, `builtins/`, `name-policy.ts`, `create-*.ts`, `index.ts`.

9. **Symbol factories over direct construction** — Always use `createSymbol()` and `createScope()` from the binder module. Never construct symbols or scopes directly.

10. **External dependency descriptors are essential** — Users will need to reference `std` library types, `serde`, `tokio`, etc. Implement a `createCrate()` or similar factory early.

11. **Study Go and C# packages closely** — Go (systems language with packages, dual namespaces, no classes) and C# (rich type system with namespaces, visibility modifiers) are likely the closest analogs for Rust's feature set.

12. **Reactivity is automatic** — Don't try to manage re-rendering manually. Use `memo()` for expensive computations, `computed()` for derived values, and let the scheduler handle batching.

13. **`flushJobs()` in tests** — After any reactive symbol operation in tests, call `flushJobs()` before making assertions. This is a common pitfall.
