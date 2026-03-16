# Discovery: Relevant Files for a New Language Package

## Purpose

This document identifies the minimum set of repository files needed to understand Alloy's core architecture, how existing language packages extend it, and what patterns to follow when adding a new language package (Rust). It is grounded entirely in the repository structure and intended as a practical index for subsequent analysis passes.

---

## Core Files

These files define the framework primitives that every language package builds on.

| Path                                     | Why It Matters                                                                                                                                                             | Concept                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `packages/core/src/index.ts`             | Main barrel export — shows every public API surface at a glance                                                                                                            | Public API surface      |
| `packages/core/src/render.ts`            | Core rendering engine that transforms JSX component trees into output text via Prettier                                                                                    | Rendering pipeline      |
| `packages/core/src/reactivity.ts`        | Custom wrapper over `@vue/reactivity`; drives reactive updates in generated code                                                                                           | Reactivity system       |
| `packages/core/src/components/`          | 26 built-in JSX components (`Output`, `SourceFile`, `Declaration`, `Scope`, `For`, `Show`, `Block`, `Indent`, etc.)                                                        | Component primitives    |
| `packages/core/src/symbols/`             | 11 files: `basic-symbol.ts`, `output-symbol.ts`, `symbol-table.ts`, `basic-scope.ts`, `output-scope.ts`, `output-space.ts`, `symbol-flow.ts`, `symbol-slot.tsx`, `decl.ts` | Symbol/scope resolution |
| `packages/core/src/context/`             | 11 files: scope, binder, declaration, member-declaration, member-scope, source-file, source-directory, format-options, assignment, name-policy contexts                    | Execution contexts      |
| `packages/core/src/binder.ts`            | Symbol binding logic — wires declarations to scopes                                                                                                                        | Symbol binding          |
| `packages/core/src/name-policy.ts`       | Name policy infrastructure (casing, conflict resolution)                                                                                                                   | Naming conventions      |
| `packages/core/src/refkey.ts`            | Reference key management — cross-component symbol linking                                                                                                                  | Cross-reference keys    |
| `packages/core/src/code.ts`              | `code` tagged template literal for raw string content in components                                                                                                        | Code construction       |
| `packages/core/src/stc.ts`               | "Symbol Table Component" wrapper — type-safe component factories                                                                                                           | STC pattern             |
| `packages/core/src/runtime/component.ts` | Component function/creator definition                                                                                                                                      | Component runtime       |
| `packages/core/src/content-slot.tsx`     | Slot component and context for content projection                                                                                                                          | Content slots           |
| `packages/core/package.json`             | Exports map, dependency on `@vue/reactivity`, dual build (prod/dev/browser)                                                                                                | Package structure       |

---

## Existing Language Package Files

### TypeScript (`packages/typescript/`) — most mature, 48 components

| Path                                                  | Why It Matters                                                                                                                                                       | Role                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `packages/typescript/src/index.ts`                    | Barrel export showing the full public surface                                                                                                                        | API surface          |
| `packages/typescript/src/symbols/ts-output-symbol.ts` | Language-specific output symbol with member spaces `["static", "instance", "private-static", "private-instance"]`                                                    | Custom symbol type   |
| `packages/typescript/src/symbols/ts-lexical-scope.ts` | Lexical scope specialization for TS                                                                                                                                  | Scope hierarchy      |
| `packages/typescript/src/symbols/ts-member-scope.ts`  | Member scope (class/interface bodies)                                                                                                                                | Member scoping       |
| `packages/typescript/src/symbols/ts-module-scope.ts`  | Module-level scope (file-level imports/exports)                                                                                                                      | Module scoping       |
| `packages/typescript/src/symbols/ts-package-scope.ts` | Package-level scope (cross-file resolution)                                                                                                                          | Package scoping      |
| `packages/typescript/src/symbols/reference.tsx`       | Reference rendering — emits the correct identifier or import for a symbol                                                                                            | Reference resolution |
| `packages/typescript/src/name-policy.ts`              | TS-specific naming rules (camelCase functions, PascalCase types, etc.)                                                                                               | Naming policy        |
| `packages/typescript/src/name-conflict-resolver.ts`   | Handles naming collisions via suffixes                                                                                                                               | Conflict resolution  |
| `packages/typescript/src/components/`                 | 48 components: declarations (Class, Function, Interface, Enum), expressions (Array, Object, Arrow, Call), statements (Import, Export, If, Switch, Try), docs (JSDoc) | Language constructs  |
| `packages/typescript/src/components/stc/index.ts`     | STC wrappers for all 48 components                                                                                                                                   | Type-safe factories  |
| `packages/typescript/src/create-package.ts`           | Factory for creating a full TS package output                                                                                                                        | Package scaffolding  |
| `packages/typescript/src/context/package-metadata.ts` | Package.json metadata context                                                                                                                                        | Package metadata     |
| `packages/typescript/src/builtins/node.ts`            | Built-in Node.js type declarations                                                                                                                                   | Standard library     |

### Java (`packages/java/`) — mature, 28 components

| Path                                              | Why It Matters                                                                                              | Role                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------- |
| `packages/java/src/index.ts`                      | Barrel export                                                                                               | API surface          |
| `packages/java/src/symbols/java-output-symbol.ts` | Java-specific output symbol                                                                                 | Custom symbol type   |
| `packages/java/src/symbols/java-lexical-scope.ts` | Java lexical scoping                                                                                        | Scope hierarchy      |
| `packages/java/src/symbols/java-package-scope.ts` | Package-level scope                                                                                         | Package scoping      |
| `packages/java/src/symbols/java-project-scope.ts` | Project-level scope (multi-package)                                                                         | Project scoping      |
| `packages/java/src/symbols/reference.ts`          | Java import/reference rendering                                                                             | Reference resolution |
| `packages/java/src/name-policy.ts`                | Java naming conventions                                                                                     | Naming policy        |
| `packages/java/src/components/`                   | 28 components: Class, Interface, Enum, Annotation, Method, Constructor, MavenProject, ImportStatement, etc. | Language constructs  |
| `packages/java/src/create-library.ts`             | Factory for Java library output                                                                             | Library scaffolding  |

### Python (`packages/python/`) — early (v0.3.0), 34 components

| Path                                                  | Why It Matters                                                                                                            | Role                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `packages/python/src/index.ts`                        | Barrel export                                                                                                             | API surface          |
| `packages/python/src/symbols/python-output-symbol.ts` | Python-specific output symbol                                                                                             | Custom symbol type   |
| `packages/python/src/symbols/python-lexical-scope.ts` | Python lexical scoping                                                                                                    | Scope hierarchy      |
| `packages/python/src/symbols/python-member-scope.ts`  | Class body scope                                                                                                          | Member scoping       |
| `packages/python/src/symbols/python-module-scope.ts`  | Module-level scope                                                                                                        | Module scoping       |
| `packages/python/src/symbols/factories.ts`            | Symbol factory functions                                                                                                  | Symbol creation      |
| `packages/python/src/symbols/reference.tsx`           | Python import/reference rendering                                                                                         | Reference resolution |
| `packages/python/src/name-policy.ts`                  | Python naming conventions (snake_case, etc.)                                                                              | Naming policy        |
| `packages/python/src/name-conflict-resolver.ts`       | Handles naming collisions                                                                                                 | Conflict resolution  |
| `packages/python/src/components/`                     | 34 components: ClassDeclaration, FunctionDeclaration, EnumDeclaration, DataclassDeclaration, various methods, PyDoc, etc. | Language constructs  |
| `packages/python/src/create-module.ts`                | Factory for Python module output                                                                                          | Module scaffolding   |

### C# (`packages/csharp/`) — mature, 75 components, largest package

| Path                                        | Why It Matters                                                                                                                                                                | Role                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `packages/csharp/src/index.ts`              | Barrel export                                                                                                                                                                 | API surface                     |
| `packages/csharp/src/symbols/csharp.ts`     | C#-specific output symbol                                                                                                                                                     | Custom symbol type              |
| `packages/csharp/src/scopes/`               | 10 files: separate scopes directory with `csharp.ts`, `class.ts`, `method.ts`, `namespace.ts`, `source-file.ts`, `named-type.ts`, `lexical.ts`, `factories.ts`, `contexts.ts` | Scope hierarchy (newer pattern) |
| `packages/csharp/src/symbols/reference.tsx` | C# using/reference rendering                                                                                                                                                  | Reference resolution            |
| `packages/csharp/src/name-policy.ts`        | C# naming conventions (PascalCase, etc.)                                                                                                                                      | Naming policy                   |
| `packages/csharp/src/components/`           | 75 components with co-located tests: class, struct, enum, interface, record, method, field, property, attributes, doc, namespace, etc.                                        | Language constructs             |
| `packages/csharp/src/builtins/`             | 174 files covering the .NET standard library (System._, Microsoft._)                                                                                                          | Extensive builtins              |
| `packages/csharp/src/create-library.ts`     | Factory for C# library output                                                                                                                                                 | Library scaffolding             |
| `packages/csharp/src/contexts/`             | 4 context files: format-options, global-namespace, namespace, reference-context                                                                                               | Language contexts               |

### Go (`packages/go/`) — early (v0.2.0), 23 components, closest reference for Rust

| Path                                        | Why It Matters                                                                                                                                                                                   | Role                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `packages/go/src/index.ts`                  | Barrel export                                                                                                                                                                                    | API surface          |
| `packages/go/src/symbols/go.ts`             | Go-specific output symbol                                                                                                                                                                        | Custom symbol type   |
| `packages/go/src/symbols/function.ts`       | Function symbol specialization                                                                                                                                                                   | Function symbols     |
| `packages/go/src/symbols/named-type.ts`     | Named type symbol                                                                                                                                                                                | Type symbols         |
| `packages/go/src/symbols/package.ts`        | Package-level symbol                                                                                                                                                                             | Package symbols      |
| `packages/go/src/symbols/type-parameter.ts` | Generic type parameter symbol                                                                                                                                                                    | Generics             |
| `packages/go/src/symbols/factories.ts`      | Symbol factory functions                                                                                                                                                                         | Symbol creation      |
| `packages/go/src/symbols/reference.ts`      | Go import/reference rendering                                                                                                                                                                    | Reference resolution |
| `packages/go/src/scopes/`                   | 10 files: separate scopes directory (newer pattern, like C#) — `go.ts`, `function.ts`, `lexical.ts`, `module.ts`, `named-type.ts`, `package.ts`, `source-file.ts`, `factories.ts`, `contexts.ts` | Scope hierarchy      |
| `packages/go/src/name-policy.ts`            | Go naming conventions (exported = PascalCase, unexported = camelCase)                                                                                                                            | Naming policy        |
| `packages/go/src/components/`               | 23 components: Function, Interface, Struct, Type, Variable, SourceFile, ImportStatement, Pointer, TypeParameters, Comment                                                                        | Language constructs  |
| `packages/go/src/components/stc/index.ts`   | STC wrappers (27 entries)                                                                                                                                                                        | Type-safe factories  |
| `packages/go/src/create-module.ts`          | Factory for Go module output                                                                                                                                                                     | Module scaffolding   |
| `packages/go/src/builtins/`                 | 5 standard library packages: `fmt`, `io`, `net`, `time`                                                                                                                                          | Standard library     |
| `packages/go/src/context/package.ts`        | Package context                                                                                                                                                                                  | Package metadata     |

---

## Tests and Examples

### Test Utilities (per-package pattern)

| Path                                 | Why It Matters                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `packages/typescript/test/utils.tsx` | Defines `toSourceText()`, `findFile()`, `testRender()` — the canonical test helper pattern |
| `packages/java/test/utils.tsx`       | Same pattern adapted for Java                                                              |
| `packages/python/test/utils.tsx`     | Same pattern adapted for Python                                                            |
| `packages/csharp/testing/`           | C# test utilities (exported via package.json)                                              |
| `packages/go/test/utils.tsx`         | Same pattern adapted for Go                                                                |
| `packages/core/src/testing.ts`       | Core testing utilities: `d` (dedent), `.toRenderTo()` matcher                              |

### Key Test Files (representative patterns)

| Path                                                     | Why It Matters                        |
| -------------------------------------------------------- | ------------------------------------- |
| `packages/core/test/rendering/basic.test.tsx`            | Core rendering fundamentals           |
| `packages/core/test/symbols/symbol-table.test.ts`        | Symbol table mechanics                |
| `packages/core/test/symbols/resolution.test.ts`          | Cross-reference resolution            |
| `packages/typescript/test/class.test.tsx`                | Class declaration generation pattern  |
| `packages/typescript/test/imports.test.tsx`              | Import resolution and rendering       |
| `packages/typescript/test/function-declaration.test.tsx` | Function output testing               |
| `packages/java/test/class.test.tsx`                      | Java class generation                 |
| `packages/python/test/class-declaration.test.tsx`        | Python class generation               |
| `packages/go/src/components/function/function.test.tsx`  | Go function test (co-located pattern) |
| `packages/go/src/components/struct/declaration.test.tsx` | Go struct test                        |

### Sample Projects

| Path                          | Why It Matters                                                   |
| ----------------------------- | ---------------------------------------------------------------- |
| `samples/basic-project/`      | Minimal Alloy project with TS + Java generation examples         |
| `samples/go-example/`         | Go-specific generation example — closest model for a Rust sample |
| `samples/python-example/`     | Python generation with TypeSpec integration                      |
| `samples/client-emitter/`     | Practical API client generation pattern                          |
| `samples/scaffold-generator/` | Template-based scaffolding                                       |

---

## Documentation

| Path                                                         | Why It Matters                                              |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| `readme.md`                                                  | Repo overview, JSX/STC syntax examples, supported languages |
| `packages/docs/src/content/docs/guides/basic-concepts.md`    | Components, context, rendering concepts                     |
| `packages/docs/src/content/docs/guides/diagnosing-issues.md` | Troubleshooting guide                                       |
| `.github/copilot-instructions.md`                            | Alloy JSX conventions and component patterns                |
| `.github/prompts/000.md`                                     | Prompt series placeholders and conventions                  |
| `.github/prompts/001-discovery.md` – `008*.md`               | Sequential workflow prompts for language package creation   |
| `test/performance/README.md`                                 | Benchmark runner documentation                              |

---

## Recommended Reading Order

1. **`readme.md`** — High-level understanding of Alloy's purpose and syntax
2. **`packages/core/src/index.ts`** — Scan the full public API surface
3. **`packages/core/src/components/`** — Understand built-in primitives (`Output`, `SourceFile`, `Declaration`, `Scope`, `Block`, `Indent`)
4. **`packages/core/src/symbols/`** — Understand symbol tables, scopes, binding, and resolution
5. **`packages/core/src/context/`** — Understand execution contexts (scope, binder, declaration, name-policy)
6. **`packages/core/src/render.ts`** — Understand the rendering pipeline
7. **`packages/go/src/`** — Study the Go package end-to-end as the closest structural model for Rust (newer `scopes/` + `symbols/` pattern, systems language, similar constructs)
8. **`packages/typescript/src/`** — Study as the most mature and comprehensive reference
9. **`packages/go/test/` and `packages/go/src/components/**/\*.test.tsx`\*\* — Testing patterns for a newer language package
10. **`samples/go-example/`** — Practical usage patterns
11. **`packages/csharp/src/scopes/`** — Additional reference for the newer scopes architecture pattern (shared with Go)

---

## Exclusions

These files/directories appear large but are likely irrelevant for planning a Rust language package:

| Path                                         | Reason to Skip                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| `packages/csharp/src/builtins/`              | 174 files of .NET standard library definitions — C#-specific, not generalizable |
| `packages/devtools/`                         | React-based debugging UI — unrelated to language package creation               |
| `packages/babel-plugin-jsx-dom-expressions/` | Internal JSX transformation plumbing — excluded from vitest workspace           |
| `packages/babel-plugin-alloy/`               | Babel plugin internals                                                          |
| `packages/babel-preset-alloy/`               | Babel preset internals                                                          |
| `packages/rollup-plugin/`                    | Build tooling internals                                                         |
| `packages/trace-cli/`                        | Debug trace CLI tool                                                            |
| `packages/cli/`                              | CLI orchestration — relevant only after implementation                          |
| `packages/create/`                           | Project scaffolding tool                                                        |
| `packages/msbuild/`                          | MSBuild XML generation — C#-specific                                            |
| `packages/docs/` (build infra)               | Astro/Starlight site scaffolding — docs content is listed above                 |
| `packages/markdown/`                         | Markdown generation — different domain                                          |
| `packages/json/`                             | JSON generation — different domain                                              |
| `pnpm-lock.yaml`                             | Dependency lock file                                                            |
| `patches/`                                   | pnpm patches for upstream dependencies                                          |
| `eng/`                                       | Release automation scripts                                                      |
| `packages/core/src/debug/`                   | 19 files of debug/trace infrastructure — not needed for language design         |
| `packages/core/src/devtools/`                | DevTools protocol and server                                                    |
| `packages/core/src/host/`                    | Host environment abstraction (Node vs browser)                                  |
