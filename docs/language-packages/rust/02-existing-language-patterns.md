# 1. Objective

This document compares four existing Alloy language packages — **TypeScript**, **Java**, **Python**, and **C#** — to extract stable, reusable patterns that will inform the design of a new **Rust** language package (`@alloy-js/rust`).

It builds on the core understanding established in [`docs/language-packages/rust/01-core-understanding.md`](./01-core-understanding.md). The purpose here is **not** to restate core, but to identify:

- The recurring "shape" of a language package
- Cross-cutting patterns every package follows
- Language-specific divergences that cannot be generalized
- The minimum viable surface a new package should provide

This document is optimized for future AI agents that will design and implement `@alloy-js/rust`.

---

# 2. Packages Compared

| Language   | Package Path           | Approx. Source Files | Approx. Components |
| ---------- | ---------------------- | -------------------- | ------------------ |
| TypeScript | `packages/typescript/` | ~65                  | ~43                |
| Java       | `packages/java/`       | ~35                  | ~26                |
| Python     | `packages/python/`     | ~52                  | ~33                |
| C#         | `packages/csharp/`     | ~238                 | ~34                |

---

# 3. Common Package Anatomy

## 3.1 Package Layout

All four packages share a remarkably consistent directory structure:

```
packages/<language>/
├── src/
│   ├── index.ts                    # Barrel export (re-exports everything)
│   ├── name-policy.ts              # Language-specific naming conventions
│   ├── name-conflict-resolver.ts   # (TS, Python only) Custom deconfliction
│   ├── create-<unit>.ts            # External dependency descriptor factory
│   ├── parameter-descriptor.ts     # (TS, Python) Parameter metadata types
│   ├── utils.ts                    # Utility helpers
│   ├── symbols/
│   │   ├── index.ts                # Symbol barrel
│   │   ├── <lang>-output-symbol.ts # OutputSymbol subclass
│   │   ├── <lang>-*-scope.ts       # OutputScope subclasses (1–6 files)
│   │   ├── factories.ts            # Symbol creation functions
│   │   └── reference.ts            # Reference resolution helper
│   ├── scopes/                     # (C# only) Separate scope directory
│   ├── components/
│   │   ├── index.ts                # Component barrel
│   │   ├── stc/index.ts            # STC wrappers for external use
│   │   ├── SourceFile.tsx          # Language-specific source file
│   │   ├── Declaration.tsx         # Base declaration component
│   │   ├── Reference.tsx           # Symbol reference component
│   │   ├── ImportStatement.tsx     # Import/using generation
│   │   └── ...                     # Language-specific declaration/expression/statement components
│   ├── context/
│   │   └── type-ref-context.tsx    # (TS, Python) Type reference tracking
│   └── builtins/
│       └── <stdlib>.ts             # Pre-defined external library descriptors
├── test/
│   ├── utils.tsx                   # toSourceText(), findFile(), assertFileContents()
│   ├── vitest.setup.ts             # Imports @alloy-js/core/testing
│   └── *.test.tsx                  # Test files per feature
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

**Observed in:** All four packages follow this pattern. C# is the most complex (separate `scopes/` dir, ~80 builtin files). Java is the simplest.

## 3.2 Public API Surface

Every package's `index.ts` re-exports from:

1. `./components/index.js` — all JSX components
2. `./symbols/index.js` — symbol class, scope classes, factories
3. `./name-policy.js` — `create<Lang>NamePolicy()`, `use<Lang>NamePolicy()`
4. `./create-<unit>.js` — external dependency factory
5. `./builtins/index.js` — pre-defined library descriptors
6. Additional: context exports, parameter descriptors, utilities

**Pattern:** Packages are consumed as `import * as lang from "@alloy-js/<lang>"` and then used as `<lang.ClassDeclaration>`, `<lang.SourceFile>`, etc.

## 3.3 Component Organization

Components consistently fall into these categories:

| Category                        | Examples                                                                             | Present In   |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------------ |
| **Source file**                 | `SourceFile`                                                                         | All          |
| **Package/module/project root** | `PackageDirectory`, `ProjectDirectory`, `ModuleDirectory`                            | All          |
| **Declarations**                | `ClassDeclaration`, `FunctionDeclaration`, `InterfaceDeclaration`, `EnumDeclaration` | All          |
| **Members**                     | `Method`/`MethodDeclaration`, `Field`, `Property`, `Constructor`                     | All          |
| **Expressions**                 | `FunctionCallExpression`, `MemberExpression`, `NewExpression`, `AccessExpression`    | All          |
| **Statements**                  | `IfStatement`, `SwitchStatement`, `TryStatement`, `VarDeclaration`                   | TS, C#       |
| **References/imports**          | `Reference`, `ImportStatement`/`Usings`                                              | All          |
| **Type references**             | `TypeRefContext`, `TypeArguments`, `TypeParameters`                                  | All          |
| **Modifiers/annotations**       | `Modifiers`, `Annotation`, `Attribute`, decorators                                   | All          |
| **Documentation**               | `JSDoc`, `PyDoc`, `DocComment`                                                       | All          |
| **Values/literals**             | `Value`/`ValueExpression`, `Atom`                                                    | All          |
| **Structural/scope**            | `LexicalScope`, `MemberScope`, `BlockScope`                                          | All          |
| **Build system**                | `PackageJsonFile`, `PomFile`, `CsProjFile`                                           | TS, Java, C# |
| **STC wrappers**                | `stc/index.ts`                                                                       | All          |

## 3.4 Symbol / Reference Helpers

Every package provides:

1. **Symbol class** extending `OutputSymbol` with language-specific properties.
2. **Scope hierarchy** with 2–7 scope classes extending `OutputScope`.
3. **Factory functions** for creating symbols in appropriate spaces (e.g., `createFunctionSymbol()`, `createMethodSymbol()`).
4. **A `Reference` component** that resolves a refkey, emits the symbol, and adds imports.
5. **A `ref()` helper** (TS via `Reference`, Java explicitly, Python/C# via symbol emission) that the import system consumes.

## 3.5 File / Module Abstractions

Every package defines:

- **A `SourceFile` component** that wraps core's `SourceFile`, creates a language-specific scope (module scope), and auto-generates imports.
- **A root directory component** that creates a package/project/module scope and optionally generates build files (package.json, pom.xml, .csproj).

## 3.6 Declaration and Expression Modeling

**Declarations** follow a consistent pattern:

1. Accept `name`, `refkey`, optional doc/metadata props.
2. Create a symbol via a factory function.
3. Create a scope (lexical or member) for the body.
4. Render the language syntax with children inside the scope.

**Expressions** are lighter:

1. Accept a `target` or content prop and optional `args`.
2. Render the expression syntax.
3. May create transient symbols (e.g., `NewExpression` in TS).

## 3.7 Formatting Utilities

All packages use:

- Core's `code` template tag for multi-line code emission.
- Core's intrinsic elements (`<indent>`, `<hardline>`, `<group>`, etc.) via print hooks.
- Core's `mapJoin()` for list rendering with joiners.
- Core's `Block` component for `{ ... }` blocks (TS, Java, C#) or indented blocks (Python uses custom `PythonBlock`).

## 3.8 Tests and Examples

Every package has:

- A `test/utils.tsx` with `toSourceText()` and related helpers.
- Tests organized per feature (one test file per component or concept).
- Cross-file reference tests validating import generation.

---

# 4. Cross-Language Concept Matrix

## 4.1 Source File / Module Representation

| Concept              | TypeScript                       | Java                                    | Python              | C#                                        |
| -------------------- | -------------------------------- | --------------------------------------- | ------------------- | ----------------------------------------- |
| **File component**   | `SourceFile`                     | `SourceFile`                            | `SourceFile`        | `SourceFile`                              |
| **Scope created**    | `TSModuleScope`                  | `JavaLexicalScope`                      | `PythonModuleScope` | `CSharpSourceFileScope`                   |
| **File extension**   | `.ts`                            | `.java`                                 | `.py`               | `.cs`                                     |
| **Module structure** | One module per file              | One public class per file               | One module per file | Namespace-based, multiple types per file  |
| **Root component**   | `PackageDirectory`               | `ProjectDirectory` + `PackageDirectory` | None (flat modules) | `Namespace` (file-scoped or block-scoped) |
| **Build file**       | `package.json` + `tsconfig.json` | `pom.xml` (Maven)                       | None                | `.csproj`                                 |

**Shared principle:** Every package has a `SourceFile` component that wraps core's `SourceFile`, creates a language-specific scope, and handles import generation.

**What varies:** The scope hierarchy depth, whether a root container is needed, and the associated build system.

## 4.2 Imports / Usings / Package Declarations

| Concept               | TypeScript                                | Java                                          | Python                                        | C#                                           |
| --------------------- | ----------------------------------------- | --------------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| **Import syntax**     | `import { X } from "path"`                | `import pkg.Class;`                           | `from mod import X`                           | `using Namespace;`                           |
| **Type-only imports** | `import type { X }`                       | N/A (all imports are types)                   | `if TYPE_CHECKING:` block                     | N/A (using covers both)                      |
| **Import generation** | Automatic via `TSModuleScope.addImport()` | Automatic via `SourceFileContext.addImport()` | Automatic via `PythonModuleScope.addImport()` | Automatic via `CSharpSourceFileScope.usings` |
| **Sorting**           | By module path                            | By package name                               | By module, type vs value                      | Alphabetical                                 |
| **Grouping**          | None (flat sorted)                        | None                                          | Type imports separate from value imports      | None                                         |
| **Wildcard imports**  | No                                        | `import pkg.*`                                | No                                            | No                                           |
| **Import component**  | `ImportStatement` / `ImportStatements`    | `ImportStatement` / `ImportStatements`        | `ImportStatement` / `ImportStatements`        | `Usings` / `Using`                           |

**Shared principle:** Imports are generated automatically by the reference resolution system. When a symbol from another scope is referenced, the module scope records the needed import and the SourceFile renders all accumulated imports.

**What varies:** Syntax, type-only handling (TS and Python have special treatment), and grouping/sorting rules.

## 4.3 Identifiers and Symbol References

| Concept                 | TypeScript                                   | Java                            | Python                                           | C#                                            |
| ----------------------- | -------------------------------------------- | ------------------------------- | ------------------------------------------------ | --------------------------------------------- |
| **Reference component** | `Reference`                                  | `Reference`                     | `Reference`                                      | `Reference`                                   |
| **Resolution via**      | `useBinder().resolve()`                      | `ref()` helper                  | `useBinder().resolve()`                          | `useBinder().resolve()`                       |
| **Import trigger**      | `emitSymbol()` + `TSModuleScope.addImport()` | `SourceFileContext.addImport()` | `emitSymbol()` + `PythonModuleScope.addImport()` | Using added to `CSharpSourceFileScope.usings` |
| **Qualified names**     | Relative paths (`./foo.js`)                  | `package.ClassName`             | `module.symbol`                                  | `Namespace.Type`                              |
| **Name rendering**      | Symbol name (after policy)                   | Symbol name (after policy)      | Symbol name (after policy)                       | Symbol name (after policy)                    |

**Shared principle:** `Reference` components accept a `refkey`, resolve it via the binder, emit the symbol for import tracking, and render the symbol's name.

## 4.4 Literals / Values

| Concept             | TypeScript         | Java             | Python         | C#                        |
| ------------------- | ------------------ | ---------------- | -------------- | ------------------------- |
| **Component**       | `ValueExpression`  | `Value`          | `Atom`         | `VarDeclaration` (inline) |
| **String literals** | `"string"`         | `"string"`       | `"string"`     | `"string"`                |
| **Boolean**         | `true`/`false`     | `true`/`false`   | `True`/`False` | `true`/`false`            |
| **Null**            | `null`/`undefined` | `null`           | `None`         | `null`                    |
| **Array/list**      | `[a, b, c]`        | N/A (no literal) | `[a, b, c]`    | N/A (no literal)          |
| **Object/dict**     | `{ key: val }`     | N/A              | `{key: val}`   | N/A                       |

**Shared principle:** Each package has a component or utility that converts JavaScript values to language-appropriate literals.

**What varies:** Null/boolean keywords, collection literal syntax, and what types have literal representations.

## 4.5 Expressions

| Concept              | TypeScript                                   | Java                | Python                                       | C#                                 |
| -------------------- | -------------------------------------------- | ------------------- | -------------------------------------------- | ---------------------------------- |
| **Function call**    | `FunctionCallExpression`                     | N/A (inline `code`) | `FunctionCallExpression`                     | `InvocationExpression`             |
| **Member access**    | `MemberExpression` + `MemberExpression.Part` | N/A (inline)        | `MemberExpression` + `MemberExpression.Part` | `AccessExpression` + chained parts |
| **Constructor call** | `NewExpression`                              | `ObjectDeclaration` | `ClassInstantiation`                         | Inline `new`                       |
| **Arrow/lambda**     | `ArrowFunction`                              | N/A                 | N/A                                          | Expression body on `Method`        |

**Shared principle:** Expression components accept a `target` and `args`, render the call syntax. Member access supports chaining with parts.

**What varies:** TypeScript and Python have the richest expression component sets. Java relies more on inline `code` template usage. C# has `AccessExpression` with a powerful part descriptor model.

## 4.6 Statements

| Concept            | TypeScript                                       | Java                     | Python                | C#                                            |
| ------------------ | ------------------------------------------------ | ------------------------ | --------------------- | --------------------------------------------- |
| **If/else**        | `IfStatement` + `ElseIfClause` + `ElseClause`    | N/A (inline)             | N/A (inline)          | `IfStatement` + `ElseIfClause` + `ElseClause` |
| **Switch/case**    | `SwitchStatement` + `CaseClause`                 | N/A                      | N/A                   | N/A                                           |
| **Try/catch**      | `TryStatement` + `CatchClause` + `FinallyClause` | N/A                      | N/A                   | N/A                                           |
| **Variable decl**  | `VarDeclaration`                                 | `Variable`               | `VariableDeclaration` | `VarDeclaration`                              |
| **Statement list** | Via core `StatementList`                         | Via core `StatementList` | `StatementList`       | Via core `StatementList`                      |

**Shared principle:** TypeScript has the most complete statement coverage. Other packages rely on inline `code` for less common statements.

**What varies:** Only TypeScript and C# provide dedicated statement components. Python and Java handle most statement-level constructs inline.

## 4.7 Declarations

| Concept         | TypeScript             | Java                  | Python                                 | C#                               |
| --------------- | ---------------------- | --------------------- | -------------------------------------- | -------------------------------- |
| **Class**       | `ClassDeclaration`     | `Class`               | `ClassDeclaration`                     | `ClassDeclaration`               |
| **Interface**   | `InterfaceDeclaration` | `Interface`           | N/A (ABC)                              | `InterfaceDeclaration`           |
| **Struct**      | N/A                    | N/A                   | N/A                                    | `StructDeclaration`              |
| **Record**      | N/A                    | N/A                   | N/A                                    | `RecordDeclaration`              |
| **Enum**        | `EnumDeclaration`      | `Enum` + `EnumMember` | `EnumDeclaration` (class & functional) | `EnumDeclaration` + `EnumMember` |
| **Function**    | `FunctionDeclaration`  | N/A (methods only)    | `FunctionDeclaration`                  | N/A (methods only)               |
| **Method**      | Via `ClassMethod`      | `Method`              | `MethodDeclaration` + variants         | `Method`                         |
| **Constructor** | Via class body         | `Constructor`         | `ConstructorDeclaration`               | `Constructor`                    |
| **Type alias**  | `TypeDeclaration`      | N/A                   | N/A                                    | N/A                              |
| **Variable**    | `VarDeclaration`       | `Variable`            | `VariableDeclaration`                  | `VarDeclaration` + `Field`       |
| **Namespace**   | N/A (modules)          | N/A (packages)        | N/A (modules)                          | `Namespace`                      |
| **Property**    | Via `InterfaceMember`  | N/A                   | `PropertyDeclaration`                  | `Property`                       |
| **Dataclass**   | N/A                    | N/A                   | `DataclassDeclaration`                 | N/A                              |

**Shared principle:** All packages provide class, method, and variable declarations. They all create symbols, create scopes, and render the declaration syntax.

**What varies:** Language-specific constructs (interfaces vs ABCs, structs, records, type aliases, namespaces, properties with get/set).

## 4.8 Type References

| Concept              | TypeScript               | Java                    | Python                 | C#                                             |
| -------------------- | ------------------------ | ----------------------- | ---------------------- | ---------------------------------------------- |
| **Type context**     | `TypeRefContext`         | N/A (all refs implicit) | `TypeRefContext`       | N/A (using covers both)                        |
| **Generic params**   | `TypeParameters`         | `TypeParameters`        | N/A (limited generics) | `TypeParameters`                               |
| **Generic args**     | Via inline               | `TypeArguments`         | `TypeArguments`        | `TypeParameters` (with constraints)            |
| **Type constraints** | Inline `extends`         | `extends` in generics   | N/A                    | `TypeParameterConstraints` (`where T : class`) |
| **Nullable**         | `nullish` flag on symbol | N/A                     | N/A                    | `nullable` flag on symbol                      |

**Shared principle:** TypeScript and Python have explicit type-reference contexts to distinguish type-only from value usage (for import optimization). Java and C# don't need this distinction.

## 4.9 Functions / Methods

| Concept             | TypeScript                                    | Java                            | Python                      | C#                            |
| ------------------- | --------------------------------------------- | ------------------------------- | --------------------------- | ----------------------------- |
| **Parameters**      | `ParameterDescriptor[]` or `Parameters` child | `Record<string, Children>`      | `ParameterDescriptor[]`     | `ParameterProps[]`            |
| **Return type**     | `returnType` prop                             | `return` prop (defaults "void") | `returnType` prop           | `returns` prop                |
| **Async**           | `async` boolean prop                          | N/A                             | `async` boolean prop        | `async` boolean prop          |
| **Type params**     | `typeParameters` prop                         | `generics` prop                 | `typeParameters` prop       | `typeParameters` prop         |
| **Function body**   | `children`                                    | `children`                      | `children` (default `pass`) | `children`                    |
| **Expression body** | `ArrowFunction`                               | N/A                             | N/A                         | `expression` prop on `Method` |

**Shared principle:** Functions/methods accept parameters, return type, optional type parameters, and a body. All create symbols and scopes.

**What varies:** Parameter descriptor format (array of objects vs record of name→type), default bodies, async support, and expression body syntax.

## 4.10 Classes / Interfaces / Structs

| Concept           | TypeScript                                         | Java                                         | Python                         | C#                                                |
| ----------------- | -------------------------------------------------- | -------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| **Inheritance**   | `extends` (single) + `implements` (multiple)       | `extends` (single) + `implements` (multiple) | `bases` (multiple)             | `baseType` (single) + `interfaceTypes` (multiple) |
| **Member scope**  | `TSMemberScope`                                    | Via `JavaLexicalScope`                       | `PythonMemberScope`            | `CSharpNamedTypeScope` / `CSharpClassScope`       |
| **Member spaces** | static, instance, private-static, private-instance | static, instance                             | static, instance               | Via `NamedTypeSymbol.members`                     |
| **Visibility**    | `export`/`default` (module-level)                  | `public`/`protected`/`private` + modifiers   | Convention (`_` prefix)        | `public`/`protected`/`private`/`internal`/`file`  |
| **Abstract**      | N/A (use interfaces)                               | `abstract` modifier                          | `@abstractmethod` decorator    | `abstract` modifier                               |
| **Static**        | `static` keyword                                   | `static` modifier                            | `@staticmethod`/`@classmethod` | `static` modifier                                 |

**Shared principle:** Class declarations create a type+value symbol, a member scope, and render the class syntax with members inside the scope.

**What varies:** Inheritance model, visibility system, member space granularity, and abstract/static mechanisms.

## 4.11 Visibility / Modifiers / Annotations / Decorators

| Concept                | TypeScript                      | Java                                                                                  | Python                       | C#                                                                    |
| ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| **Access modifiers**   | `export`/`default`              | `public`/`protected`/`private`/`default`                                              | Convention (`_` name prefix) | `public`/`protected`/`private`/`internal`/`file`                      |
| **Other modifiers**    | `const`/`let`/`var`, `readonly` | `static`/`final`/`abstract`/`synchronized`/`native`/`volatile`/`transient`/`strictfp` | N/A                          | `static`/`sealed`/`abstract`/`virtual`/`override`/`extern`/`readonly` |
| **Annotations**        | N/A                             | `Annotation` component                                                                | Decorators (inline `@`)      | `Attribute` component                                                 |
| **Modifier component** | Inline keywords                 | `Modifiers` component                                                                 | Inline decorators            | `getAccessModifier()` + `makeModifiers()` utilities                   |

**Shared principle:** Modifiers are rendered as keyword prefixes. Annotations/attributes/decorators have dedicated components or inline rendering.

**What varies:** Every language has its own modifier vocabulary. The implementation ranges from boolean props (Java) to dedicated modifier components (C#) to inline text (Python).

## 4.12 Comments / Doc Comments

| Concept           | TypeScript                                            | Java                      | Python                                                                  | C#                                 |
| ----------------- | ----------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| **Doc format**    | JSDoc (`/** ... */`)                                  | JSDoc (same)              | Docstrings (`""" ... """`)                                              | XML doc comments (`/// <summary>`) |
| **Doc component** | `JSDoc`, `JSDocComment`, `JSDocParam`, `JSDocExample` | N/A (uses TS-style JSDoc) | `PyDoc`, `FunctionDoc`, `ClassDoc`, `ModuleDoc`, `PropertyDoc` + 6 more | `DocComment`, `FromMarkdown`       |
| **Line comments** | `SingleLineCommentBlock` (`//`)                       | N/A (inline)              | `SimpleCommentBlock` (`#`)                                              | Region (`#region`)                 |
| **Doc on decl**   | `doc` prop                                            | `doc` prop (limited)      | `doc` prop                                                              | `doc` prop                         |

**Shared principle:** Declarations accept a `doc` prop that renders language-appropriate documentation.

**What varies:** Doc format (JSDoc vs docstrings vs XML), complexity (Python has the most elaborate doc system), and comment syntax.

## 4.13 Formatting / Whitespace / Delimiters

| Concept                   | TypeScript      | Java            | Python                   | C#              |
| ------------------------- | --------------- | --------------- | ------------------------ | --------------- |
| **Block delimiters**      | `{ ... }`       | `{ ... }`       | `:` + indentation        | `{ ... }`       |
| **Statement terminator**  | `;`             | `;`             | Newline                  | `;`             |
| **Block component**       | Core `Block`    | Core `Block`    | `PythonBlock` (custom)   | Core `Block`    |
| **Default print width**   | 80              | 80              | 80                       | 120             |
| **Default tab width**     | 2               | 2               | 4                        | 4               |
| **Statement list joiner** | `\n` (hardline) | `\n` (hardline) | `\n\n` (double hardline) | `\n` (hardline) |

**Shared principle:** All packages use core's formatting primitives. Brace-delimited languages use core's `Block`; Python defines a custom block for colon+indent.

**What varies:** Python is the only whitespace-significant language, requiring a custom block component. C# uses wider formatting defaults.

## 4.14 Test Strategy

| Concept              | TypeScript               | Java                                    | Python                   | C#                       |
| -------------------- | ------------------------ | --------------------------------------- | ------------------------ | ------------------------ |
| **Test count**       | 37 files                 | 13 files                                | 26 files                 | ~33 files                |
| **Test location**    | `test/`                  | `test/`                                 | `test/`                  | `src/` (colocated)       |
| **Test utility**     | `test/utils.tsx`         | `test/utils.tsx`                        | `test/utils.tsx`         | `test/utils.tsx` (some)  |
| **Key helper**       | `toSourceText()`         | `testRender()` + `assertFileContents()` | `toSourceText()`         | `TestNamespace` wrapper  |
| **Multi-file tests** | Yes (imports, barrels)   | Yes (packages, Maven)                   | Yes (modules, imports)   | Yes (namespaces, usings) |
| **Setup import**     | `@alloy-js/core/testing` | `@alloy-js/core/testing`                | `@alloy-js/core/testing` | `@alloy-js/core/testing` |

**Shared principle:** All packages use Vitest, import `@alloy-js/core/testing`, and use `toRenderTo()` / `d` template tag. Each has a `toSourceText()` or equivalent helper that wraps content in the appropriate language context.

---

# 5. Reusable Patterns

These patterns are consistently used across all four packages and should be adopted by any new language package:

## 5.1 Symbol Subclass Pattern

Every package creates a single `<Lang>OutputSymbol` class extending `OutputSymbol`. Language-specific properties are added (e.g., `export`, `accessibility`, `module`). The class defines `static readonly memberSpaces`.

## 5.2 Scope Hierarchy Pattern

Every package defines 2–7 scope classes extending `OutputScope`. The hierarchy typically mirrors the language's nesting model: package/module → file → class/function → block. Each scope declares `static readonly declarationSpaces`.

## 5.3 Factory Function Pattern

Symbol creation is always done via factory functions (not direct construction). These functions:

1. Get the current scope via `useScope()` or a typed variant.
2. Apply name policy via the binder's `createSymbol()`.
3. Return the created symbol.

## 5.4 SourceFile-Creates-ModuleScope Pattern

Every package's `SourceFile` component creates a language-specific scope (module/file scope) that tracks imports. The scope's `addImport()` method is called automatically when symbols from other modules are referenced.

## 5.5 Reference-Triggers-Import Pattern

The `Reference` component resolves a refkey, emits the symbol via `emitSymbol()`, and the module scope's import tracking records the needed import. The `SourceFile` then renders all accumulated imports at the top of the file.

## 5.6 Name Policy Pattern

Every package defines a `create<Lang>NamePolicy()` function using core's `createNamePolicy()`. It maps element type strings to naming transformations. Reserved words are handled with suffix `_` or prefix `_`.

## 5.7 External Dependency Descriptor Pattern

Every package provides a `create<Unit>()` factory (e.g., `createPackage`, `createModule`, `createLibrary`) that takes a descriptor object mapping paths/names to exported symbols. This creates lazy refkeys that resolve to symbols on demand.

## 5.8 Builtin Library Pattern

Every package pre-defines descriptors for common standard library types (Node.js stdlib, java.util, Python abc/enum/dataclasses, System namespace). These are created using the package's own `create<Unit>()` factory.

## 5.9 STC Wrapper Pattern

Every package provides an `stc/index.ts` that wraps key components with `stc()` for fluent API usage from external consumers.

## 5.10 Test Utility Pattern

Every package defines a `test/utils.tsx` with:

- `toSourceText(children, options?, path?)` — wraps in Output + SourceFile context and renders.
- Optionally: `findFile()`, `assertFileContents()`, `testRender()`.

## 5.11 Declaration Component Pattern

Every declaration component (class, function, interface, etc.) follows:

1. Accept `name`, `refkey`, `doc`, language-specific modifier props.
2. Call a symbol factory to create a symbol.
3. Wrap children in a `Declaration` + scope.
4. Render the language syntax using `code` template and core intrinsics.

## 5.12 Modifier Props Pattern

Languages with visibility modifiers (Java, C#) use boolean props (`public`, `private`, `abstract`, etc.) on declaration components. A utility function collects the true props and renders them as a prefix string.

---

# 6. Divergent or Language-Specific Patterns

These patterns vary significantly and should **not** be over-generalized when designing Rust:

## 6.1 Declaration Space Strategy

- **Dual namespace** (TS, Go): `["values", "types"]` — same name can exist as both type and value.
- **Single namespace** (Python, Java): `["symbols"]` — one name, one thing.
- **Mixed** (C#): Method scopes have `["local-variables", "parameters", "type-parameters"]`; named type scopes delegate to member spaces.

**Implication for Rust:** Rust has separate namespaces for types, values, and macros. This will likely require a multi-space strategy, possibly `["types", "values", "macros"]`.

## 6.2 Member Space Strategy

- **TS**: 4 spaces (`static`, `instance`, `private-static`, `private-instance`).
- **Python/Java**: 2 spaces (`static`, `instance`).
- **C#**: Uses a single `"members"` space on `NamedTypeSymbol` instead of multiple spaces.

**Implication for Rust:** Rust structs have fields (not static/instance). Traits have methods. Enums have variants. The member space strategy needs to match Rust's data model.

## 6.3 Import Mechanics

- **TS**: Relative path imports, `import { X } from "./path.js"`.
- **Java**: Package-qualified imports, `import pkg.Class;`.
- **Python**: Module imports with `TYPE_CHECKING` blocks for type-only.
- **C#**: Namespace-based `using` directives.

**Implication for Rust:** Rust uses `use crate::module::Symbol;` with `pub use` for re-exports, `use super::` for parent module, and crate-level `use` for external crates.

## 6.4 Visibility Model

- **TS**: Module-level `export`/`default` only. No class-level visibility.
- **Java**: `public`/`protected`/`private`/`default` on every declaration.
- **Python**: Convention (`_` prefix for private).
- **C#**: `public`/`protected`/`private`/`internal`/`file` with rich modifier combinations.

**Implication for Rust:** Rust uses `pub`, `pub(crate)`, `pub(super)`, `pub(in path)`, and default private. This is path-scoped visibility, different from all existing packages.

## 6.5 Whitespace-Significant Syntax

Python is the only package that defines a custom `PythonBlock` for colon+indent blocks. All others use core's `Block` for `{ ... }`.

**Implication for Rust:** Rust uses `{ ... }` blocks, so core's `Block` should work directly.

## 6.6 Documentation Format

Each language has a unique doc format. Python's is the most complex (~24KB PyDoc file with 12+ sub-components). TS uses JSDoc. Java reuses JSDoc. C# uses XML doc comments.

**Implication for Rust:** Rust uses `///` doc comments with markdown content. This is closer to C#'s approach (line-based doc comments) but with markdown instead of XML.

## 6.7 Build System Integration

- **TS**: `package.json` + `tsconfig.json` generation.
- **Java**: `pom.xml` (Maven) with full dependency/plugin/resource configuration.
- **C#**: `.csproj` XML file.
- **Python**: None (no build file).

**Implication for Rust:** Rust uses `Cargo.toml`. A `CargoTomlFile` component would be needed.

## 6.8 Scope Complexity

- **Java**: 3 scopes (Project → Package → Lexical).
- **Python**: 3 scopes (Module → Lexical → Member).
- **TS**: 4 scopes (Package → Module → Lexical → Member).
- **C#**: 7+ scopes (Namespace → SourceFile → Class → Method → Lexical → Named Type → Member).

**Implication for Rust:** Rust's scope model includes crate → module → function → block, plus impl blocks and trait definitions. Moderate complexity.

---

# 7. Implied Minimum Viable Surface for a New Language Package

Based on the existing packages, a new language package should provide at minimum:

## 7.1 Symbol System

- [ ] `<Lang>OutputSymbol` class extending `OutputSymbol`
- [ ] Define `static readonly memberSpaces` appropriate to language
- [ ] Implement `copy()` method for symbol cloning
- [ ] Language-specific properties on the symbol class

## 7.2 Scope Hierarchy

- [ ] At least 2 scope classes (module/file scope + lexical/block scope)
- [ ] Define `static readonly declarationSpaces` on each scope
- [ ] Scope that tracks imports (typically the module/file scope)
- [ ] Member scope for type declarations

## 7.3 Name Policy

- [ ] `create<Lang>NamePolicy()` function
- [ ] Element type enumeration covering all declaration kinds
- [ ] Reserved word list with conflict resolution

## 7.4 Core Components

- [ ] `SourceFile` — wraps core SourceFile, creates module scope, renders imports
- [ ] `Declaration` — base declaration wrapper
- [ ] `Reference` — resolves refkey, emits symbol, renders name
- [ ] `ImportStatement` — renders language-specific import syntax

## 7.5 Declaration Components

- [ ] At least: function, struct/class, enum, variable/constant
- [ ] Each must: accept name+refkey, create symbol, create scope, render syntax

## 7.6 Type System

- [ ] Generic/type parameter support (if language has generics)
- [ ] Type reference context (if language distinguishes type vs value imports)

## 7.7 External Dependencies

- [ ] `create<Unit>()` factory for describing external libraries
- [ ] At least one builtin descriptor (standard library)

## 7.8 Modifiers/Visibility

- [ ] Visibility modifier rendering (if applicable)
- [ ] Other modifier support (async, static, etc.)

## 7.9 Documentation

- [ ] Doc comment component
- [ ] `doc` prop on declaration components

## 7.10 Root Structure

- [ ] Root directory/package component (creates top-level scope)
- [ ] Build file generation (if applicable)

## 7.11 Test Infrastructure

- [ ] `test/utils.tsx` with `toSourceText()`
- [ ] Tests for each component
- [ ] Cross-file reference tests

## 7.12 STC Wrappers

- [ ] `stc/index.ts` wrapping key components

---

# 8. Testing Patterns Across Language Packages

## 8.1 Common Test Infrastructure

All packages use:

- **Vitest** as the test framework.
- **`@alloy-js/core/testing`** imported in setup for custom matchers.
- **`d\`...\``** template tag for dedenting expected output.
- **`toRenderTo(expected)`** matcher for comparing rendered output.

## 8.2 Test Utility File

Every package defines `test/utils.tsx` (or equivalent) with:

```tsx
// Pattern: wrap content in language context and render to string
export function toSourceText(children: Children, options?: {...}): string {
  return renderToString(
    <Output>
      <RootComponent {...defaults}>
        <SourceFile path="test.ext">
          {children}
        </SourceFile>
      </RootComponent>
    </Output>
  );
}
```

Variants include:

- `toSourceTextMultiple()` — for multi-file tests
- `testRender()` — returns the full output tree for manual inspection
- `findFile(output, path)` — extracts a specific file
- `assertFileContents(output, expected)` — validates multiple files at once

## 8.3 Test Organization

Tests are organized by feature, typically one file per component or concept:

| Test Category             | What It Tests                                   | Example File                                      |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| **Basic declarations**    | Simple rendering of each declaration type       | `class.test.tsx`, `function-declaration.test.tsx` |
| **Modifiers**             | Access modifiers, abstract, static, etc.        | `class.test.tsx` (describe blocks)                |
| **Cross-file references** | Import generation when referencing across files | `imports.test.tsx`, `reference.test.tsx`          |
| **Name policy**           | Naming convention transformations               | `namepolicies.test.tsx`                           |
| **External dependencies** | External library descriptor usage               | `externals.test.tsx`                              |
| **Values/literals**       | Literal rendering                               | `values.test.tsx`                                 |
| **Expressions**           | Function calls, member access, etc.             | `function-call-expression.test.tsx`               |
| **Build files**           | package.json, pom.xml, .csproj                  | `maven.test.tsx`, `barrel.test.tsx`               |

## 8.4 Test Patterns by Complexity

**Level 1 — Single component, no symbols:**

```tsx
it("renders basic function", () => {
  const res = toSourceText(<lang.FunctionDeclaration name="foo" />);
  expect(res).toBe(d`fn foo() {}`);
});
```

**Level 2 — Component with modifiers/options:**

```tsx
it("renders public async function", () => {
  const res = toSourceText(
    <lang.FunctionDeclaration public async name="foo" />,
  );
  expect(res).toBe(d`pub async fn foo() {}`);
});
```

**Level 3 — Cross-file references (multi-file):**

```tsx
it("generates imports across files", () => {
  const key = refkey();
  expect(
    <Output>
      <lang.SourceFile path="a.rs">
        <lang.FunctionDeclaration name="helper" refkey={key} />
      </lang.SourceFile>
      <lang.SourceFile path="b.rs">{code`let x = ${key}();`}</lang.SourceFile>
    </Output>,
  ).toRenderTo({
    "a.rs": d`pub fn helper() {}`,
    "b.rs": d`use crate::a::helper;\n\nlet x = helper();`,
  });
});
```

**Level 4 — External dependency with imports:**

```tsx
it("uses external crate types", () => {
  const serde = createCrate({ name: "serde", descriptor: { ... } });
  const res = toSourceText(
    <lang.StructDeclaration name="Config" derives={[serde.Serialize]}>
      ...
    </lang.StructDeclaration>
  );
  expect(res).toContain("use serde::Serialize;");
});
```

## 8.5 What a New Package Should Emulate

1. **Create `test/utils.tsx`** with `toSourceText()` wrapping content in `Output` + `SourceFile`.
2. **Write one test file per component** (e.g., `struct.test.tsx`, `function.test.tsx`, `enum.test.tsx`).
3. **Test cross-file references** — this validates the entire import pipeline.
4. **Test name policy** — verify naming conventions are applied.
5. **Test modifiers** — verify visibility and other modifiers render correctly.
6. **Always import** `"@alloy-js/core/testing"` in setup or each test file.
7. **Use `d\`...\``** for all expected output.

---

# 9. Gaps, Inconsistencies, and Risks

## 9.1 Inconsistencies Between Packages

1. **Test location**: C# colocates tests in `src/` next to components; all others use a separate `test/` directory. C# also doesn't have a unified test utility file.

2. **Declaration space naming**: TS and Go use `"values"` and `"types"`; Python and Java use `"symbols"`; C# uses `"local-variables"`, `"parameters"`, `"type-parameters"`. There's no standard vocabulary.

3. **Member space strategy**: TS uses 4 member spaces with visibility encoded in the space name. C# uses a single `"members"` space with visibility as a symbol property. Python/Java use 2 spaces. No clear "recommended" approach.

4. **Import tracking mechanism**: TS and Python use scope-level `addImport()` methods. Java uses a `SourceFileContext.addImport()` callback. C# adds to a `usings` set on the source file scope. The mechanism works similarly but the API surface differs.

5. **Expression/statement coverage**: TypeScript has the most complete set of expression and statement components. Java has almost none (relying on `code` template). Python is in between. C# added `IfStatement` and `VarDeclaration`.

6. **Parameter representation**: TS and Python use `ParameterDescriptor[]` arrays. Java uses `Record<string, Children>` (name→type map). C# uses `ParameterProps[]`. No standard parameter interface.

7. **STC wrapper completeness**: STC wrappers vary in how many components they expose. Some packages wrap nearly everything; others wrap only key components.

## 9.2 Under-Documented Areas

1. **Symbol `copy()` contract**: All packages implement it, but there's no documented contract for what must be preserved vs. what can differ.

2. **SymbolCreator protocol**: The lazy symbol creation pattern used by external dependency descriptors is complex and varies between packages. No clear documentation.

3. **Member resolver usage**: Only some packages use the binder's `MemberResolver` callback. The conditions under which it's needed are unclear.

4. **Transient symbols**: Used in TS (e.g., `NewExpression` creates transient symbols with instantiated members) but not consistently documented. Other packages don't seem to use them.

## 9.3 Risks for Rust

1. **Rust's module system** is more complex than any existing package. Rust has crates, modules (which can be files or inline `mod { }`), `use` paths with `self`/`super`/`crate`, re-exports with `pub use`, and glob imports. This will require careful scope hierarchy design.

2. **Rust's trait system** is unique — traits can be implemented on any type (including external types via extension traits). `impl Trait for Type` blocks need a component model that doesn't directly map to existing class/interface patterns.

3. **Rust's lifetime and borrow system** has no precedent in existing packages. Lifetimes on type parameters, function signatures, and struct fields may need a dedicated representation.

4. **Rust's macro system** (`macro_rules!`, proc macros, derive macros) has no analog in existing packages. Derive macros (like `#[derive(Debug, Clone)]`) map loosely to C#'s attributes/Java's annotations but with code generation semantics.

5. **Rust's ownership model** means parameters have move/borrow/mutable-borrow semantics (`T`, `&T`, `&mut T`). This is richer than any existing parameter descriptor.

---

# 10. Takeaways for Designing Rust

1. **Follow the established package shape.** The directory structure, barrel exports, symbol/scope/component/context/builtins organization is proven across 4 languages. Don't deviate without reason.

2. **Design the scope hierarchy to match Rust's module system.** Likely: `RustCrateScope` → `RustModuleScope` → `RustFunctionScope` → `RustLexicalScope`, plus `RustImplScope` and `RustTraitScope`.

3. **Use multi-space declaration strategy.** Rust distinguishes types, values, and macros. Consider `declarationSpaces = ["types", "values", "macros"]` on module scopes.

4. **Keep member spaces simple.** Rust structs have fields (no static/instance distinction). Impl blocks have methods. Consider a single `"members"` space (like C#) or `["fields", "methods"]`.

5. **Model `use` statements carefully.** Rust's import system is path-based (`use crate::foo::Bar;`). The module scope needs an `addUse()` method that records use paths, and the `SourceFile` renders them. Study the TS and Python import implementations closely.

6. **Handle visibility as a symbol property.** Rust's `pub`/`pub(crate)`/`pub(super)`/`pub(in path)` maps best to a visibility property on `RustOutputSymbol` (like C#'s `accessibility`), not separate member spaces (like TS).

7. **Build a `Cargo.toml` component.** Following the pattern of `PackageJsonFile`, `PomFile`, and `CsProjFile`. Include `[dependencies]`, `[dev-dependencies]`, `[features]`, and `edition`.

8. **Use `///` doc comments.** Rust's doc comments are markdown-based `///` lines. A `DocComment` component that wraps markdown content in `///` prefix lines is the right approach (simpler than Python's elaborate docstring system).

9. **Start with core declarations.** Following the precedent of all packages, prioritize: `StructDeclaration`, `EnumDeclaration`, `FunctionDeclaration`, `TraitDeclaration`, `ImplBlock`, `ModuleDeclaration`, `TypeAlias`.

10. **Derive macros as attributes.** `#[derive(Debug, Clone, Serialize)]` maps to C#'s `Attribute` component pattern. Create a `DeriveAttribute` component.

11. **External crate descriptors via `createCrate()`.** Following `createPackage()`/`createModule()`/`createLibrary()`, create a `createCrate()` factory for describing external crate APIs (serde, tokio, etc.).

12. **Test cross-module `use` generation first.** The import system is always the most complex part of a language package. Validate it early with multi-file tests.

13. **Study Go and C# most closely.** Go (packages, no classes, dual namespaces) and C# (rich type system, namespaces, visibility modifiers, attributes) are the closest analogs for Rust's feature set.
