# 1. Title

**PRD: Alloy Language Package for Rust (`@alloy-js/rust`)**

---

# 2. Objective

Add Rust language support to the Alloy code generation framework by implementing `@alloy-js/rust` as a new language package within the Alloy monorepo. The package will enable developers to declaratively generate correct, idiomatic, and compilable Rust source code using Alloy's JSX-based component model.

---

# 3. Background and Context

Alloy is a reactive, component-based code generation framework. It uses a custom JSX runtime (not React) with Vue-based reactivity to render component trees into formatted source code. Core provides: a rendering pipeline, a symbol/scope/reference resolution system (the binder), formatting via Prettier intrinsics, and structural components (`Output`, `SourceFile`, `SourceDirectory`, `Declaration`, `Scope`, `Block`).

Four language packages already exist: TypeScript, Java, Python, and C#. Each follows a consistent architecture:

1. **Symbol subclass** — extends `OutputSymbol` with language-specific properties.
2. **Scope hierarchy** — extends `OutputScope` with language-specific declaration/member spaces.
3. **Name policy** — transforms identifiers to language conventions via `createNamePolicy()`.
4. **Components** — JSX components for declarations (class, function, enum), references, imports, and structural elements.
5. **External dependency descriptors** — `createPackage()`/`createModule()`/`createLibrary()` for describing external libraries.
6. **Build file generation** — `package.json`, `pom.xml`, `.csproj` generation.
7. **Test utilities** — `toSourceText()` helper and per-component test files.

Full analysis is available in:
- [`01-core-understanding.md`](./01-core-understanding.md) — core architecture deep dive.
- [`02-existing-language-patterns.md`](./02-existing-language-patterns.md) — cross-language comparison.
- [`03-rust-design-notes.md`](./03-rust-design-notes.md) — Rust-specific design decisions.

---

# 4. Problem Statement

Alloy currently has no support for Rust code generation. Developers building tools, SDKs, or code generators that target Rust must hand-roll string templates or use ad-hoc approaches. This leads to:

- Inconsistent formatting and naming.
- Manual import (`use`) management.
- No cross-module reference tracking.
- No automatic `Cargo.toml` dependency management.
- No integration with Alloy's reactive rendering or symbol resolution.

A first-class `@alloy-js/rust` package would bring Rust to parity with the existing language packages, enabling declarative, component-based Rust code generation with automatic imports, name policies, and build file management.

---

# 5. Goals

1. **G1:** Implement a Rust language package following established Alloy patterns (consistent with TS/Java/Python/C# packages).
2. **G2:** Support generation of compilable Rust crates with multiple modules, structs, enums, functions, traits, and impl blocks.
3. **G3:** Automatically generate `use` statements when symbols are referenced across modules or crates.
4. **G4:** Automatically generate `mod` declarations in parent modules / crate root.
5. **G5:** Generate `Cargo.toml` with metadata and tracked dependencies.
6. **G6:** Apply Rust naming conventions (`snake_case`, `PascalCase`, `SCREAMING_SNAKE_CASE`) via name policy.
7. **G7:** Support `#[derive(...)]` and general attributes.
8. **G8:** Support `///` doc comments on declarations.
9. **G9:** Provide an external crate descriptor system (`createCrate()`) with `std` builtins.
10. **G10:** Comprehensive test coverage with golden output tests.

---

# 6. Non-Goals

The following are explicitly **out of scope** for the MVP:

- **Lifetime annotations** (`'a`) — can be rendered inline via `code` template.
- **Closures** (`|x| expr`) — render inline.
- **Pattern matching** (complex `match` arms) — render inline.
- **Macro definitions** (`macro_rules!`, proc macros).
- **Tuple structs** (`struct Foo(T1, T2)`) and **unit structs** (`struct Foo;`).
- **`pub(in path)` visibility** — `pub`, `pub(crate)`, `pub(super)`, and private are sufficient.
- **`pub use` re-exports** and **glob imports** (`use path::*`).
- **Conditional compilation** (`#[cfg(...)]`).
- **Cargo workspace support** (multi-crate projects).
- **`impl Trait`** and **`dyn Trait`** syntax — render inline.
- **Associated types** in traits — render inline.
- **Control flow statements** (if/else, for, loop, while) — render inline via `code`.
- **Static declarations** (`static NAME: Type`).
- **Feature flags** in `Cargo.toml`.

---

# 7. Users / Stakeholders

| Role | Description |
|---|---|
| **SDK/API generator developers** | Primary users building tools that output Rust code (e.g., API clients, data model generators). |
| **Alloy framework maintainers** | Maintain and review the package for consistency with core and other language packages. |
| **Code generation tool authors** | Use `@alloy-js/rust` as a library to produce Rust source files programmatically. |

---

# 8. Scope of MVP

The MVP delivers a fully functional `@alloy-js/rust` package that generates **compilable Rust crates** with:

- Multi-module file structure with automatic `mod` declarations.
- Named structs, enums (with all variant kinds), functions, traits, impl blocks, type aliases, and constants.
- Automatic `use` statement generation with path grouping.
- `#[derive(...)]` and custom attributes.
- `///` doc comments.
- `Cargo.toml` with metadata and auto-tracked dependencies.
- Rust naming conventions applied via name policy.
- `std` library builtins.
- Comprehensive test suite.

---

# 9. Functional Requirements

## FR-1: Package Scaffolding and Public API

**FR-1.1:** The package is located at `packages/rust/` in the monorepo with `package.json`, `tsconfig.json`, and `vitest.config.ts`.

**FR-1.2:** The package name is `@alloy-js/rust`. It depends on `@alloy-js/core`.

**FR-1.3:** `src/index.ts` barrel-exports from: `./builtins`, `./components`, `./context`, `./create-crate`, `./name-policy`, `./parameter-descriptor`, `./symbols`, `./utils`.

**FR-1.4:** The package is consumable as `import * as rust from "@alloy-js/rust"` with components accessed as `<rust.StructDeclaration>`, `<rust.SourceFile>`, etc.

**FR-1.5:** `src/components/stc/index.ts` provides STC wrappers for key components.

## FR-2: Symbol System

**FR-2.1:** `RustOutputSymbol` extends `OutputSymbol` with properties:
- `visibility: "pub" | "pub(crate)" | "pub(super)" | undefined` (undefined = private).
- `symbolKind: "function" | "struct" | "enum" | "trait" | "type-alias" | "const" | "static" | "module" | "field" | "variant" | "method" | "associated-type" | "parameter" | "type-parameter"`.
- `isAsync: boolean`.
- `isUnsafe: boolean`.
- `isConst: boolean`.
- `static readonly memberSpaces = ["members"]`.

**FR-2.2:** `NamedTypeSymbol` extends `RustOutputSymbol` with:
- `typeKind: "struct" | "enum" | "trait" | "type-alias"`.
- `static readonly memberSpaces = ["members", "type-parameters"]`.

**FR-2.3:** `FunctionSymbol` extends `RustOutputSymbol` with:
- `receiverType?: Children` (for method receiver: `&self`, `&mut self`, `self`).

**FR-2.4:** All symbols implement `copy()` following the pattern in `BasicSymbol` and existing language packages.

## FR-3: Scope Hierarchy

**FR-3.1:** `RustCrateScope` extends `OutputScope`:
- `declarationSpaces = ["types", "values", "macros"]`.
- Tracks child module declarations (for auto-generating `mod` statements).
- Tracks external crate dependencies (for `Cargo.toml`).
- Has `addChildModule(name, visibility)` and `addDependency(crate)` methods.

**FR-3.2:** `RustModuleScope` extends `OutputScope`:
- `declarationSpaces = ["types", "values", "macros"]`.
- Tracks `use` imports via `addUse(targetSymbol, sourcePath)`.
- Tracks child module declarations (for submodule `mod` statements).
- Has `imports` getter returning tracked use records.

**FR-3.3:** `RustFunctionScope` extends `OutputScope`:
- `declarationSpaces = ["parameters", "type-parameters", "local-variables"]`.

**FR-3.4:** `RustLexicalScope` extends `OutputScope`:
- `declarationSpaces = ["local-variables"]`.

**FR-3.5:** `RustImplScope` is a member scope (has `ownerSymbol`) for impl blocks. Methods declared inside are added to the target type's `"members"` space.

**FR-3.6:** `RustTraitScope` is a member scope for trait bodies.

## FR-4: Name Policy

**FR-4.1:** `createRustNamePolicy()` returns a `NamePolicy<RustElements>` where `RustElements` includes: `"function"`, `"method"`, `"struct"`, `"enum"`, `"enum-variant"`, `"trait"`, `"type-alias"`, `"type-parameter"`, `"field"`, `"variable"`, `"parameter"`, `"constant"`, `"module"`.

**FR-4.2:** Naming transformations:
- `PascalCase`: struct, enum, enum-variant, trait, type-alias, type-parameter.
- `snake_case`: function, method, field, variable, parameter, module.
- `SCREAMING_SNAKE_CASE`: constant.

**FR-4.3:** Reserved word handling: 37 Rust keywords. Conflicting names are prefixed with `r#` (e.g., `r#type`).

**FR-4.4:** Exported via `createRustNamePolicy()` and `useRustNamePolicy()`.

## FR-5: File / Module / Crate Structure

**FR-5.1:** `CrateDirectory` component:
- Props: `name: string`, `version?: string` (default `"0.1.0"`), `edition?: string` (default `"2021"`), `children: Children`.
- Creates `RustCrateScope`.
- Renders `Cargo.toml` via `CargoTomlFile`.
- Renders `src/` subdirectory containing source files.
- Provides crate context to descendants.

**FR-5.2:** `SourceFile` component:
- Props: `path: string`, `children?: Children`, `header?: Children`, `headerComment?: string`.
- Creates `RustModuleScope`.
- Wraps core `SourceFile` with `filetype="rust"` and the Rust `Reference` component.
- Auto-generates `use` statements from collected imports.
- For crate root files (`lib.rs`, `main.rs`): auto-generates `mod` declarations for child modules.

**FR-5.3:** `ModuleDirectory` component:
- Props: `path: string`, `children?: Children`.
- Creates a `SourceDirectory` with a corresponding module scope.
- Generates `mod.rs` if submodule files exist.
- Registers itself as a child module in the parent scope.

**FR-5.4:** `CargoTomlFile` component:
- Props: `name: string`, `version: string`, `edition: string`, `dependencies?: Record<string, CrateDependency>`.
- Renders `[package]` section with name, version, edition.
- Renders `[dependencies]` section from crate scope's tracked dependencies + explicit props.
- `CrateDependency` type: `string` (version only) or `{ version: string, features?: string[] }`.

**FR-5.5:** Automatic `mod` declarations: When `SourceFile` renders a crate root or module root, it queries the scope for registered child modules and renders `[pub] mod <name>;` for each, sorted alphabetically.

## FR-6: Import / Use Handling

**FR-6.1:** When a `Reference` component resolves a symbol from a different module within the same crate, `use crate::path::to::Symbol;` is added to the current module scope's import records.

**FR-6.2:** When a `Reference` resolves a symbol from an external crate, `use <crate>::path::to::Symbol;` is added and the crate dependency is recorded on the `RustCrateScope`.

**FR-6.3:** Symbols within the same module do not generate `use` statements.

**FR-6.4:** `UseStatement` component groups multiple imports from the same path: `use path::{Item1, Item2};`.

**FR-6.5:** Import ordering: `std::` → external crate → `crate::` (sorted alphabetically within each group, blank line between groups).

**FR-6.6:** `UseStatements` component renders all accumulated imports for a source file.

## FR-7: Identifiers and References

**FR-7.1:** `Reference` component accepts `refkey: Refkey`, resolves via the binder, and renders the symbol's name.

**FR-7.2:** Reference resolution triggers import tracking (FR-6.1, FR-6.2).

**FR-7.3:** `memberRefkey(base, member)` works for accessing struct fields, enum variants, and impl methods.

## FR-8: Declarations

**FR-8.1: `StructDeclaration`**
- Props: `name`, `refkey?`, `pub?`, `pub_crate?`, `derives?: (string | Refkey)[]`, `attributes?: AttributeProp[]`, `doc?: Children`, `typeParameters?: TypeParameterProp[]`, `whereClause?: Children`, `children: Children`.
- Creates a `NamedTypeSymbol` with `typeKind: "struct"`.
- Creates a member scope for fields.
- Renders: `[attributes]\n[pub] struct Name<params> [where ...] {\n  fields\n}`.

**FR-8.2: `Field`** (child of `StructDeclaration`)
- Props: `name`, `type: Children`, `refkey?`, `pub?`, `pub_crate?`, `doc?: Children`.
- Creates a member symbol in the struct's member space.
- Renders: `[pub] name: type,`.

**FR-8.3: `EnumDeclaration`**
- Props: `name`, `refkey?`, `pub?`, `pub_crate?`, `derives?: (string | Refkey)[]`, `attributes?: AttributeProp[]`, `doc?: Children`, `typeParameters?: TypeParameterProp[]`, `children: Children`.
- Creates a `NamedTypeSymbol` with `typeKind: "enum"`.
- Renders: `[attributes]\n[pub] enum Name<params> {\n  variants\n}`.

**FR-8.4: `EnumVariant`** (child of `EnumDeclaration`)
- Props: `name`, `refkey?`, `doc?: Children`.
- For unit variant: `name,`.
- For tuple variant: `fields?: Children[]` → `name(Type1, Type2),`.
- For struct variant: `children: Children` → `name {\n  fields\n},`.
- Creates a member symbol in the enum's member space.

**FR-8.5: `FunctionDeclaration`**
- Props: `name`, `refkey?`, `pub?`, `pub_crate?`, `async?`, `unsafe?`, `const?`, `parameters?: ParameterDescriptor[]`, `returnType?: Children`, `typeParameters?: TypeParameterProp[]`, `whereClause?: Children`, `doc?: Children`, `children?: Children`.
- Creates a `FunctionSymbol`.
- When inside an `ImplBlock`, auto-injects `&self` as first parameter (configurable via `receiver` prop: `"&self" | "&mut self" | "self" | "none"`).
- Renders: `[pub] [async] [unsafe] [const] fn name<params>(params) [-> ReturnType] [where ...] {\n  body\n}`.
- Empty body renders `{}`.

**FR-8.6: `TraitDeclaration`**
- Props: `name`, `refkey?`, `pub?`, `typeParameters?: TypeParameterProp[]`, `supertraits?: Children[]`, `whereClause?: Children`, `doc?: Children`, `children: Children`.
- Creates a `NamedTypeSymbol` with `typeKind: "trait"`.
- Creates `RustTraitScope` for body.
- Renders: `[pub] trait Name<params>[: Supertrait1 + Supertrait2] [where ...] {\n  methods\n}`.

**FR-8.7: `ImplBlock`**
- Props: `type: Refkey | Children`, `trait?: Refkey | Children`, `typeParameters?: TypeParameterProp[]`, `whereClause?: Children`, `children: Children`.
- Creates `RustImplScope` with the target type as owner.
- Methods declared inside are added to the target type's `"members"` space.
- Renders: `impl<params> [Trait for] Type [where ...] {\n  methods\n}`.

**FR-8.8: `TypeAlias`**
- Props: `name`, `refkey?`, `pub?`, `typeParameters?: TypeParameterProp[]`, `children: Children`.
- Creates a symbol with `symbolKind: "type-alias"`.
- Renders: `[pub] type Name<params> = children;`.

**FR-8.9: `ConstDeclaration`**
- Props: `name`, `refkey?`, `pub?`, `type: Children`, `children: Children`.
- Creates a symbol with `symbolKind: "const"`.
- Renders: `[pub] const NAME: Type = value;`.

## FR-9: Type Parameters and Where Clauses

**FR-9.1:** `TypeParameters` component renders `<'a, T: Bound, U>` from a `TypeParameterProp[]` array. Each prop: `{ name: string, constraint?: Children }`.

**FR-9.2:** `WhereClause` component renders `where T: Display + Clone, U: Debug` from children or structured props.

## FR-10: Attributes

**FR-10.1:** `Attribute` component:
- Props: `name: string | Refkey`, `args?: Children`.
- Renders: `#[name]` or `#[name(args)]`.

**FR-10.2:** `DeriveAttribute` component:
- Props: `traits: (string | Refkey)[]`.
- Renders: `#[derive(Trait1, Trait2, ...)]`.
- When a trait is a `Refkey`, resolves the symbol name and tracks the crate dependency.

**FR-10.3:** Attributes are rendered on the line before the item they decorate.

## FR-11: Comments

**FR-11.1:** `DocComment` component:
- Props: `children: Children`.
- Renders each line prefixed with `/// `.
- Supports multi-line content.

**FR-11.2:** `ModuleDocComment` component:
- Props: `children: Children`.
- Renders each line prefixed with `//! `.
- Used at the top of module files.

**FR-11.3:** Declaration components accept a `doc` prop that renders a `DocComment` before the declaration.

## FR-12: Parameter Descriptors

**FR-12.1:** `ParameterDescriptor` interface:
```typescript
interface ParameterDescriptor {
  name: string;
  type?: Children;
  mutable?: boolean;       // mut binding
  refType?: "&" | "&mut";  // reference type
}
```

**FR-12.2:** `Parameters` component renders `(param1: Type, param2: &mut Type)` from a `ParameterDescriptor[]`.

**FR-12.3:** Special receiver parameters: `&self`, `&mut self`, `self` are handled by a `receiver` prop on `FunctionDeclaration`, not as regular parameters.

## FR-13: Formatting

**FR-13.1:** Default format options: `printWidth: 100`, `tabWidth: 4`, `useTabs: false`.

**FR-13.2:** Trailing commas in multi-line struct fields, enum variants, and function parameters.

**FR-13.3:** Blank lines between top-level items (functions, structs, enums, impl blocks).

**FR-13.4:** `Block` component from core used for `{ ... }` syntax.

## FR-14: External Crate Descriptors

**FR-14.1:** `createCrate()` factory function:
```typescript
function createCrate<T>(props: {
  name: string;
  version: string;
  features?: string[];
  descriptor: T;
}): CrateRefkeys<T> & SymbolCreator
```

**FR-14.2:** Descriptor maps module paths to named exports:
```typescript
{ ".": { named: ["Symbol1", "Symbol2"] }, "submod": { named: ["Symbol3"] } }
```

**FR-14.3:** When a symbol from an external crate is referenced:
- A `use <crate>::Symbol;` is added.
- The crate is added to `RustCrateScope.dependencies`.
- `Cargo.toml` renders the dependency.

**FR-14.4:** `std` builtin crate descriptor provided in `src/builtins/std.ts` covering at minimum:
- `Option`, `Some`, `None`, `Result`, `Ok`, `Err`
- `Vec`, `String`, `Box`, `Rc`, `Arc`
- `HashMap`, `HashSet`, `BTreeMap`, `BTreeSet`
- `fmt::Display`, `fmt::Debug`, `fmt::Formatter`
- `io::Read`, `io::Write`, `io::Result`
- `clone::Clone`, `default::Default`, `convert::{From, Into}`

## FR-15: Value / Literal Rendering

**FR-15.1:** `Value` component converts JavaScript values to Rust literals:
- `string` → `"string"`
- `number` (integer) → `42`
- `number` (float) → `42.0`
- `boolean` → `true` / `false`
- `null`/`undefined` → `None`
- Arrays → `vec![a, b, c]`

## FR-16: Tests

**FR-16.1:** `test/utils.tsx` provides:
- `toSourceText(children, options?)` — wraps in `Output` + `CrateDirectory` + `SourceFile` and renders.
- `toSourceTextMultiple(children)` — multi-file variant.
- `findFile(output, path)` — extracts a file from output.
- `assertFileContents(output, expected)` — batch validation.

**FR-16.2:** Minimum test files:
- `struct.test.tsx` — struct declaration, fields, visibility, derives.
- `enum.test.tsx` — enum with all variant kinds.
- `function.test.tsx` — function with params, return type, async, pub.
- `trait.test.tsx` — trait declaration with methods and default impls.
- `impl.test.tsx` — inherent impl and trait impl.
- `imports.test.tsx` — cross-module `use` generation.
- `reference.test.tsx` — refkey resolution.
- `name-policy.test.tsx` — naming convention transformations.
- `attributes.test.tsx` — derive and custom attributes.
- `cargo-toml.test.tsx` — Cargo.toml generation.
- `module-structure.test.tsx` — multi-module crate with `mod` declarations.

---

# 10. Non-Functional Requirements

**NFR-1: Consistency** — The package follows the same architecture as existing Alloy language packages. Directory layout, barrel exports, symbol/scope patterns, component conventions, and test patterns must match.

**NFR-2: Maintainability** — Each component is in its own file. Symbols, scopes, and components are cleanly separated. No circular dependencies between modules.

**NFR-3: Public API clarity** — The package is consumed as `import * as rust from "@alloy-js/rust"`. Components use descriptive names (`StructDeclaration`, not `Struct`). Props interfaces are exported and documented.

**NFR-4: Testability** — Every component is independently testable via `toSourceText()`. Cross-cutting concerns (imports, mod declarations) are testable via multi-file renders.

**NFR-5: Incremental extensibility** — Deferred features (lifetimes, closures, pattern matching) can be added without breaking changes. The symbol model must not preclude future extensions.

**NFR-6: Predictable rendering** — Output matches `rustfmt` conventions (4-space indent, 100-char width, trailing commas). Generated code should pass `cargo check` without modification.

**NFR-7: No breaking core changes** — The package uses only the public API of `@alloy-js/core`. No changes to core are required.

---

# 11. Proposed Package / Module Architecture

```
packages/rust/
├── src/
│   ├── index.ts                      # Barrel: re-exports all public API
│   ├── name-policy.ts                # createRustNamePolicy(), useRustNamePolicy()
│   ├── create-crate.ts               # createCrate() factory
│   ├── parameter-descriptor.ts       # ParameterDescriptor interface
│   ├── utils.ts                      # Shared helpers
│   ├── symbols/
│   │   ├── index.ts                  # Symbol barrel
│   │   ├── rust-output-symbol.ts     # RustOutputSymbol (base class)
│   │   ├── named-type-symbol.ts      # NamedTypeSymbol (struct, enum, trait)
│   │   ├── function-symbol.ts        # FunctionSymbol
│   │   ├── scopes.ts                 # Type alias RustScope + hooks
│   │   ├── rust-crate-scope.ts       # RustCrateScope (mod tracking, dependencies)
│   │   ├── rust-module-scope.ts      # RustModuleScope (use tracking)
│   │   ├── rust-function-scope.ts    # RustFunctionScope
│   │   ├── rust-lexical-scope.ts     # RustLexicalScope
│   │   ├── rust-impl-scope.ts        # RustImplScope (member scope)
│   │   ├── rust-trait-scope.ts       # RustTraitScope (member scope)
│   │   ├── factories.ts              # createStructSymbol, createFunctionSymbol, etc.
│   │   └── reference.tsx             # ref() resolution + use generation
│   ├── components/
│   │   ├── index.ts                  # Component barrel
│   │   ├── stc/index.ts              # STC wrappers
│   │   ├── source-file.tsx           # SourceFile (wraps core SourceFile)
│   │   ├── crate-directory.tsx       # CrateDirectory (crate root)
│   │   ├── module-directory.tsx      # ModuleDirectory (submodule dirs)
│   │   ├── cargo-toml-file.tsx       # CargoTomlFile
│   │   ├── declaration.tsx           # Base Declaration wrapper
│   │   ├── reference.tsx             # Reference component
│   │   ├── use-statement.tsx         # UseStatement / UseStatements
│   │   ├── struct-declaration.tsx    # StructDeclaration + Field
│   │   ├── enum-declaration.tsx      # EnumDeclaration + EnumVariant
│   │   ├── function-declaration.tsx  # FunctionDeclaration
│   │   ├── trait-declaration.tsx     # TraitDeclaration
│   │   ├── impl-block.tsx            # ImplBlock
│   │   ├── type-alias.tsx            # TypeAlias
│   │   ├── const-declaration.tsx     # ConstDeclaration
│   │   ├── mod-declaration.tsx       # ModDeclaration
│   │   ├── attribute.tsx             # Attribute + DeriveAttribute
│   │   ├── doc-comment.tsx           # DocComment + ModuleDocComment
│   │   ├── parameters.tsx            # Parameters rendering
│   │   ├── type-parameters.tsx       # TypeParameters + WhereClause
│   │   └── value.tsx                 # Value / literal rendering
│   ├── context/
│   │   ├── index.ts
│   │   └── crate-context.tsx         # CrateContext (crate metadata)
│   └── builtins/
│       ├── index.ts
│       └── std.ts                    # std crate descriptor
├── test/
│   ├── utils.tsx
│   ├── vitest.setup.ts
│   └── *.test.tsx                    # Per FR-16.2
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

**Dependency graph (internal):**
```
index.ts
  └── components/index.ts
        ├── source-file.tsx → symbols/rust-module-scope.ts, reference.tsx
        ├── crate-directory.tsx → symbols/rust-crate-scope.ts, cargo-toml-file.tsx
        ├── struct-declaration.tsx → symbols/factories.ts, declaration.tsx
        ├── reference.tsx → symbols/reference.tsx
        └── ...
  └── symbols/index.ts
        ├── rust-output-symbol.ts → @alloy-js/core (OutputSymbol)
        ├── factories.ts → rust-output-symbol.ts, scopes.ts
        └── reference.tsx → @alloy-js/core (resolve, useBinder)
  └── name-policy.ts → @alloy-js/core (createNamePolicy)
  └── create-crate.ts → symbols/, @alloy-js/core (SymbolCreator)
  └── builtins/std.ts → create-crate.ts
```

---

# 12. Milestones / Phases

## Phase 1: Foundation

**Goal:** Package scaffold, symbol system, scope hierarchy, name policy.

**Deliverables:**
- `package.json`, `tsconfig.json`, `vitest.config.ts` configured.
- `RustOutputSymbol`, `NamedTypeSymbol`, `FunctionSymbol` classes.
- All 6 scope classes (`RustCrateScope`, `RustModuleScope`, `RustFunctionScope`, `RustLexicalScope`, `RustImplScope`, `RustTraitScope`).
- `createRustNamePolicy()` with all element types and reserved words.
- Symbol factory functions (`createStructSymbol`, `createEnumSymbol`, `createFunctionSymbol`, etc.).
- `test/utils.tsx` with `toSourceText()`.
- `name-policy.test.tsx` passing.

**Verification:** Name policy tests pass. Symbols and scopes can be created without errors.

## Phase 2: Core Components

**Goal:** Basic declaration components render correct Rust syntax.

**Deliverables:**
- `SourceFile`, `CrateDirectory`, `Declaration`, `Reference`.
- `StructDeclaration` + `Field`.
- `EnumDeclaration` + `EnumVariant`.
- `FunctionDeclaration` + `Parameters`.
- `TypeAlias`, `ConstDeclaration`.
- `TypeParameters`, `WhereClause`.
- `Attribute`, `DeriveAttribute`.
- `DocComment`, `ModuleDocComment`.
- `Value`.

**Verification:** `struct.test.tsx`, `enum.test.tsx`, `function.test.tsx`, `attributes.test.tsx` passing. Single-file renders produce correct Rust syntax.

## Phase 3: Traits and Impl Blocks

**Goal:** Trait declarations and impl blocks work correctly.

**Deliverables:**
- `TraitDeclaration` with method signatures and default impls.
- `ImplBlock` for inherent and trait implementations.
- `FunctionDeclaration` handles `receiver` prop (self parameter) inside impl blocks.

**Verification:** `trait.test.tsx`, `impl.test.tsx` passing. Trait + impl combinations render correctly.

## Phase 4: Module System and Imports

**Goal:** Multi-module crates with automatic `use` and `mod` generation.

**Deliverables:**
- `ModuleDirectory` component.
- `UseStatement` / `UseStatements` with path grouping and sorting.
- `RustModuleScope.addUse()` and import tracking.
- `RustCrateScope.addChildModule()` and `mod` declaration rendering.
- Auto-generation of `mod` declarations in crate root and parent modules.

**Verification:** `imports.test.tsx`, `reference.test.tsx`, `module-structure.test.tsx` passing. Cross-module references generate correct `use` statements and `mod` declarations.

## Phase 5: External Dependencies and Build File

**Goal:** External crate support and `Cargo.toml` generation.

**Deliverables:**
- `createCrate()` factory.
- `std` builtin descriptor.
- `CargoTomlFile` component.
- Dependency tracking on `RustCrateScope`.
- External crate references trigger `use` + dependency recording.

**Verification:** `cargo-toml.test.tsx`, external crate reference tests passing. `Cargo.toml` includes tracked dependencies.

## Phase 6: Polish and Integration

**Goal:** Final cleanup, STC wrappers, documentation, full test suite green.

**Deliverables:**
- STC wrappers for all key components.
- Barrel exports verified complete.
- All test files passing.
- Edge case coverage (empty structs, empty enums, empty functions, etc.).

**Verification:** Full test suite green. All acceptance criteria met.

---

# 13. Acceptance Criteria

The MVP is complete when **all** of the following are true:

1. **AC-1:** `packages/rust/` exists with correct `package.json` (name `@alloy-js/rust`, depends on `@alloy-js/core`).
2. **AC-2:** `import * as rust from "@alloy-js/rust"` works and exposes all components, symbols, and utilities.
3. **AC-3:** A multi-module Rust crate can be generated with `CrateDirectory` → `SourceFile` → declaration components.
4. **AC-4:** `StructDeclaration` renders named structs with `pub` fields, `#[derive(...)]`, doc comments, and type parameters.
5. **AC-5:** `EnumDeclaration` renders enums with unit, tuple, and struct variants.
6. **AC-6:** `FunctionDeclaration` renders functions with parameters, return types, `pub`, `async`, `const`, and `unsafe` modifiers.
7. **AC-7:** `TraitDeclaration` renders traits with method signatures, default implementations, and supertraits.
8. **AC-8:** `ImplBlock` renders both inherent impl and `impl Trait for Type` blocks.
9. **AC-9:** Cross-module symbol references auto-generate correct `use crate::path::Symbol;` statements.
10. **AC-10:** External crate symbol references auto-generate `use <crate>::Symbol;` and record the dependency.
11. **AC-11:** `Cargo.toml` is generated with `[package]` metadata and `[dependencies]` from tracked crate dependencies.
12. **AC-12:** `mod` declarations are auto-generated in crate root / parent modules for all child modules.
13. **AC-13:** Name policy transforms names correctly: `PascalCase` for types, `snake_case` for functions/fields, `SCREAMING_SNAKE_CASE` for constants, `r#` prefix for reserved words.
14. **AC-14:** Format options default to 4-space indent, 100-char width.
15. **AC-15:** All test files listed in FR-16.2 exist and pass.
16. **AC-16:** Golden scenario outputs (struct+impl, multi-module crate, trait+impl, enum, Cargo.toml) match expected Rust syntax.

---

# 14. Test Strategy

## 14.1 Unit Tests

Each component gets a dedicated test file. Tests use `toSourceText()` to render a single component and compare against expected output via `toRenderTo()` + `d` template tag.

**Coverage per component:**
- Basic rendering (minimal props).
- All modifier combinations (`pub`, `async`, `const`, `unsafe`).
- With and without type parameters.
- With and without doc comments.
- With and without attributes.
- Edge cases (empty body, no fields, etc.).

## 14.2 Golden Output Tests

Multi-file tests that render a complete crate and validate all files:

1. **Struct + Impl scenario** — single file with struct, derives, impl block with methods.
2. **Multi-module scenario** — crate root + 2 submodules with cross-module references.
3. **Trait + Impl scenario** — trait declaration + impl for a struct.
4. **Enum scenario** — enum with all variant kinds.
5. **External crate scenario** — references to serde traits with auto-generated `use` + `Cargo.toml` dependencies.

Each golden test validates the exact string output of every generated file.

## 14.3 Scenario Coverage

| Scenario | Tests |
|---|---|
| Symbol creation | Factory functions create correct symbol types with correct properties |
| Name policy | All element types transform correctly; reserved words get `r#` |
| Single-file struct | Struct with fields, derives, visibility, doc comments |
| Single-file enum | Enum with unit, tuple, struct variants |
| Single-file function | Function with params, return type, async, modifiers |
| Trait | Trait with methods, default impls, supertraits |
| Impl block | Inherent impl, trait impl, self receiver |
| Cross-module import | Symbol in module A referenced in module B generates `use` |
| External crate | External crate symbol generates `use` + dependency tracking |
| Cargo.toml | Metadata + dependencies rendered correctly |
| Module structure | `mod` declarations auto-generated in parent modules |
| Attributes | `#[derive(...)]`, custom attributes |
| Type parameters | `<T: Bound>`, where clauses |
| Constants | `const NAME: Type = value;` |

## 14.4 Regression Coverage

Tests should be added for any bug found during development. Key regression areas:
- Import deduplication (same symbol referenced twice should produce one `use`).
- `use` path grouping (`use path::{A, B}` not two separate `use` statements).
- `mod` declaration ordering and visibility.
- Name conflicts across modules.
- Reserved word handling in different positions (type name, field name, parameter name).

---

# 15. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Module `mod` declaration auto-generation is complex** | Incorrect `mod` declarations break compilation | Implement `mod` generation as a separate concern with dedicated tests. Start with simple cases (flat module tree) then handle nesting. |
| **`use` path construction from `ResolutionResult` is error-prone** | Wrong import paths | Study Go's `ref()` implementation closely. Unit test every path scenario: same module, sibling module, nested module, parent module, external crate. |
| **Impl blocks adding to existing type's member space** | Symbol conflicts if multiple impl blocks for same type | Each impl block appends to the type's `"members"` space. Use name deconfliction (inherent from `SymbolTable`). Test with multiple impl blocks. |
| **`Cargo.toml` TOML formatting** | Incorrect TOML syntax | Use simple string-based rendering. TOML is straightforward for the sections we need. Test against expected TOML strings. |
| **Rust's `r#` reserved word syntax is unusual** | Other packages use `_` suffix; agents may forget `r#` | Implement in name policy from Phase 1. Test explicitly. |
| **No `cargo check` validation in CI** | Generated code may have subtle syntax errors | Rely on string comparison tests with carefully validated golden outputs. Consider adding optional `cargo check` integration test later. |

---

# 16. Open Questions

1. **Should `ImplBlock` auto-inject `&self` as the receiver for methods?**
   - Recommendation: Yes, with opt-out via `receiver="none"` prop. This matches Rust convention where most methods take `&self`.
   - Must resolve before: Phase 3.

2. **How should `mod` declarations handle visibility?**
   - In Rust, `mod foo;` makes the module private; `pub mod foo;` makes it public. The child module's visibility should be determined by the symbols it exports or by an explicit prop.
   - Recommendation: Default to `pub mod` for modules containing `pub` items; allow override via prop.
   - Must resolve before: Phase 4.

3. **Should `use` statements use tree syntax (`use path::{A, B}`) or flat syntax (`use path::A; use path::B;`)?**
   - Recommendation: Tree syntax for MVP (more idiomatic Rust).
   - Must resolve before: Phase 4.

4. **How should the `std` prelude be handled?**
   - Rust auto-imports certain types (`Option`, `Result`, `Vec`, `String`, `Box`, etc.) via the prelude. Should the import system skip `use` statements for prelude types?
   - Recommendation: Yes, maintain a prelude list. References to prelude types should not generate `use` statements.
   - Must resolve before: Phase 5.

5. **Should `CrateDirectory` support both `lib.rs` and `main.rs` crate types?**
   - Recommendation: Support both via a `crateType` prop (`"lib"` | `"bin"`, default `"lib"`).
   - Must resolve before: Phase 2.

6. **How should `self` receiver types be modeled in the parameter system?**
   - Options: (a) Dedicated `receiver` prop on `FunctionDeclaration`. (b) First parameter in `ParameterDescriptor[]`.
   - Recommendation: Dedicated `receiver` prop for clarity.
   - Must resolve before: Phase 3.

---

# 17. Recommended Next Step

**Convert this PRD into a phased implementation backlog** (`05-rust-backlog.md`) with:
- Individual work items derived from each functional requirement.
- Dependencies between items.
- Clear acceptance criteria per item.
- Test requirements per item.

Then begin implementation starting with **Phase 1: Foundation** — package scaffold, symbol system, scope hierarchy, and name policy.
