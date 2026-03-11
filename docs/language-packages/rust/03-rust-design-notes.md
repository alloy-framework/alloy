# 1. Objective

This document defines the implementation design for `@alloy-js/rust`, a new Alloy language package for generating Rust source code.

**Purpose:** To bridge the gap between the abstract patterns documented in [`01-core-understanding.md`](./01-core-understanding.md) and [`02-existing-language-patterns.md`](./02-existing-language-patterns.md) and a concrete, buildable plan for Rust support.

**How it feeds the PRD:** A subsequent planning agent will convert this design brief into a prioritized backlog of implementation tasks. This document provides the "what and how" — the PRD will add "in what order and to what acceptance criteria."

**Constraints:**
- This is a design brief, not a task backlog.
- Rust language semantics are stated precisely, not hand-waved.
- All Alloy architecture decisions are grounded in repository evidence.

---

# 2. Target Language Constraints

## 2.1 File / Module / Crate Model

Rust's code organization is hierarchical with three levels:

1. **Crate** — the top-level compilation unit. A crate is either a binary (`main.rs`) or a library (`lib.rs`). A crate corresponds to a Cargo package.
2. **Module** — a namespace within a crate. Modules can be:
   - **File-based:** `src/foo.rs` defines module `foo`. Submodules go in `src/foo/` with a `mod.rs` or via `src/foo.rs` + `src/foo/bar.rs`.
   - **Inline:** `mod foo { ... }` declares a module inside a file.
   - Modules must be explicitly declared with `mod foo;` in the parent.
3. **Items** — declarations within a module: functions, structs, enums, traits, impls, type aliases, constants, statics, macros.

**Key constraints for Alloy:**
- Every `.rs` file is a module. The file path determines the module path.
- The crate root (`lib.rs` or `main.rs`) must declare all top-level modules with `mod` statements.
- Submodules must be declared by their parent module.
- Module declarations (`mod foo;`) and `use` statements are separate concerns.

## 2.2 Import / Use Semantics

Rust's `use` statement brings names into scope:

```rust
use std::collections::HashMap;       // Bring a single type
use std::io::{Read, Write};          // Bring multiple from same path
use crate::models::User;             // From current crate
use super::utils::helper;            // From parent module
use self::submod::Thing;             // From child module
```

**Path roots:**
- `crate::` — absolute path from crate root.
- `super::` — parent module.
- `self::` — current module.
- Bare name (e.g., `std::`) — external crate or prelude.

**Re-exports:** `pub use crate::internal::Type;` makes `Type` available from the re-exporting module.

**Glob imports:** `use std::collections::*;` (generally discouraged in generated code).

**Key constraints for Alloy:**
- Import paths are `::` separated, not `/` or `.`.
- Imports from the same crate use `crate::`, not the crate name.
- The import system must distinguish: same-module (no import needed), same-crate-different-module (`use crate::...`), external-crate (`use <crate>::...`).
- Multiple imports from the same path should be grouped: `use std::io::{Read, Write};`.

## 2.3 Declaration Forms

Rust items (declarations) at module level:

| Item | Syntax | Notes |
|---|---|---|
| **Function** | `fn name(params) -> ReturnType { body }` | Can be `pub`, `async`, `const`, `unsafe`, `extern` |
| **Struct** | `struct Name { fields }` or `struct Name(types);` (tuple) or `struct Name;` (unit) | Can be `pub`, fields can have individual visibility |
| **Enum** | `enum Name { Variant1, Variant2(T), Variant3 { field: T } }` | Variants can be unit, tuple, or struct-like |
| **Trait** | `trait Name { methods/associated types }` | Can have default method implementations |
| **Impl block** | `impl Type { methods }` or `impl Trait for Type { methods }` | Not a declaration in the symbol sense — it adds methods to an existing type |
| **Type alias** | `type Name = OtherType;` | `pub type` for re-exports |
| **Constant** | `const NAME: Type = value;` | Must be compile-time evaluable |
| **Static** | `static NAME: Type = value;` | Global variable, can be `mut` |
| **Module** | `mod name;` or `mod name { ... }` | File-backed or inline |
| **Use** | `use path::to::item;` | Import statement |
| **Extern crate** | `extern crate name;` | Rarely needed in edition 2021+ |

## 2.4 Expression and Statement Model

Rust is expression-oriented. Most constructs are expressions:
- `if/else` returns a value: `let x = if cond { a } else { b };`
- `match` returns a value: `let x = match val { ... };`
- Block expressions: `{ stmt; stmt; expr }` — last expression is the return value.
- `loop`, `while`, `for` are expressions (with `break value`).

**Statements:**
- `let` bindings: `let x: Type = value;` or `let mut x = value;`
- Expression statements: `expr;` (expression followed by semicolon)
- Item declarations (at statement position)

**Key constraints for Alloy:**
- Semicolons are significant: `expr` (expression, returns value) vs `expr;` (statement, discards value).
- The `let` keyword is always required for variable binding.
- Pattern matching is pervasive (`let (a, b) = tuple;`, `if let Some(x) = opt { ... }`).

## 2.5 Type System Concerns

**Generics:** `fn foo<T: Display>(x: T)`, `struct Foo<T> { field: T }`.

**Lifetimes:** `fn foo<'a>(x: &'a str) -> &'a str`, `struct Foo<'a> { s: &'a str }`. Lifetimes annotate borrow durations. They appear in:
- Function signatures
- Struct/enum definitions
- Impl blocks
- Trait definitions
- Type aliases

**Trait bounds:** `T: Display + Clone`, `where T: Display + Clone`.

**Associated types:** `type Output;` in traits, `type Output = i32;` in impls.

**Reference types:** `&T` (shared borrow), `&mut T` (mutable borrow), `Box<T>`, `Rc<T>`, `Arc<T>`.

**Key constraints for Alloy:**
- Lifetimes are a first-class concern in signatures. A `ParameterDescriptor` must support `&'a T`, `&'a mut T`, etc.
- Generic parameters can be types (`T`) or lifetimes (`'a`). They share the `<>` syntax.
- Trait bounds appear both inline (`T: Bound`) and in `where` clauses.

## 2.6 Comments / Doc Comments

```rust
// Line comment
/* Block comment */
/// Doc comment (applies to the following item) — rendered as markdown
//! Inner doc comment (applies to the enclosing item, e.g., module-level)
```

Doc comments support markdown, code examples (with ```` ``` ````), and attribute annotations like `# Examples`, `# Panics`, `# Safety`, `# Errors`.

**Key constraints for Alloy:**
- `///` is the standard doc comment prefix. Each line is a separate `///` line.
- `//!` is used at the top of files for module/crate documentation.
- Doc comments are line-based, not block-based (unlike JSDoc or Python docstrings).

## 2.7 Formatting Conventions

Rust has an official formatter: `rustfmt`. Conventions:
- **Indent:** 4 spaces.
- **Line width:** 100 characters (rustfmt default).
- **Braces:** Opening brace on same line, closing brace on own line.
- **Trailing commas:** In multi-line struct fields, enum variants, function parameters.
- **Use statement ordering:** `std` → external crates → `crate::` → `self::` → `super::`.
- **Blank lines:** Between top-level items.

## 2.8 Visibility / Modifier Rules

| Visibility | Syntax | Meaning |
|---|---|---|
| Private (default) | *(no keyword)* | Visible only within the current module and its children |
| Public | `pub` | Visible everywhere |
| Crate-public | `pub(crate)` | Visible within the current crate |
| Super-public | `pub(super)` | Visible to the parent module |
| Path-restricted | `pub(in path)` | Visible within the specified module path |

**Other modifiers:**
- `async` — async function
- `unsafe` — unsafe block/function
- `const` — const function/context
- `extern "C"` — FFI linkage
- `mut` — mutable binding/reference

**Key constraints for Alloy:**
- Visibility is path-scoped, not just keyword-based. The `pub(in crate::foo)` form requires access to the module path.
- Default visibility is private. This is unlike Java/C# where the default varies by context.
- `pub` on struct fields is independent of `pub` on the struct itself.

## 2.9 Special Constraints and Idioms

**Derive macros:** `#[derive(Debug, Clone, PartialEq, Serialize)]` is extremely common. These are attributes that generate trait implementations at compile time.

**Attributes:** `#[attr]` (outer) and `#![attr]` (inner). Used for:
- `#[derive(...)]` — derive trait impls
- `#[cfg(...)]` — conditional compilation
- `#[allow(...)]`, `#[warn(...)]`, `#[deny(...)]` — lint control
- `#[serde(rename_all = "camelCase")]` — crate-specific attributes
- `#[test]`, `#[bench]` — test markers

**Impl blocks are not declarations.** They are *extensions* that add methods to an existing type. A struct can have multiple impl blocks, and trait impls are separate from inherent impls. This has no direct analog in any existing Alloy language package.

**Pattern matching** (`match`, `if let`, `let...else`) is pervasive but complex. For MVP, basic `match` support is sufficient.

**Error handling:** `Result<T, E>` with `?` operator. Not a structural concern for code generation.

**Closures:** `|x, y| x + y` or `move |x| { ... }`. Common in Rust but can be rendered with `code` template.

---

# 3. Mapping Alloy Concepts to Rust

## 3.1 OutputSymbol → RustOutputSymbol

**Maps cleanly** with adaptations.

Rust symbols need:
- `visibility: RustVisibility` — `"pub" | "pub(crate)" | "pub(super)" | "pub(in <path>)" | undefined` (private). Modeled as a property on the symbol (like C#'s `accessibility`), not as separate member spaces.
- `symbolKind: RustSymbolKind` — `"function" | "struct" | "enum" | "trait" | "type-alias" | "const" | "static" | "module" | "field" | "variant" | "method" | "associated-type" | "parameter" | "lifetime" | "type-parameter"`.
- `isAsync: boolean` — for async functions.
- `isUnsafe: boolean` — for unsafe functions/traits.
- `isConst: boolean` — for const functions/items.

**Member spaces:** `["members"]` (single space, like C#). Rust has no static/instance distinction — all struct fields are the same kind, and methods are in impl blocks (not in the struct definition).

**Inference:** The C# approach of a single `"members"` space with metadata properties is the best fit for Rust.

## 3.2 OutputScope → RustScope Hierarchy

**Needs adaptation.** Rust's scope model is:

| Alloy Scope | Rust Concept | Declaration Spaces | Notes |
|---|---|---|---|
| `RustCrateScope` | Crate root | `["types", "values", "macros"]` | Top-level scope. Tracks `mod` declarations. |
| `RustModuleScope` | Module (file) | `["types", "values", "macros"]` | Tracks `use` imports. Creates `mod` declarations in parent. |
| `RustImplScope` | `impl` block | — (member scope) | Owner is the target type symbol. |
| `RustTraitScope` | `trait` body | — (member scope) | Owner is the trait symbol. |
| `RustFunctionScope` | Function body | `["parameters", "type-parameters", "local-variables"]` | Parameters include lifetimes. |
| `RustLexicalScope` | Block `{ ... }` | `["local-variables"]` | For inner blocks. |

**Key design decisions:**

1. **`RustModuleScope` must track `use` imports** (like Go's `GoSourceFileScope.imports` and TS's `TSModuleScope.importedSymbols`). An `addUse(targetSymbol, targetPackage)` method records needed imports.

2. **`RustCrateScope` must track `mod` declarations** — the crate root needs to know which modules exist to generate `mod foo;` statements. This is unique to Rust (Go packages don't need explicit module declarations).

3. **Triple declaration spaces** on module/crate scopes: `["types", "values", "macros"]`. In Rust, a type `Foo` and a function `Foo` can coexist (though this is uncommon). Macros are a separate namespace.

**Inference:** The Go package's approach (`GoModuleScope` → `GoPackageScope` → `GoSourceFileScope`) is the closest analog but needs the extra `mod` declaration tracking.

## 3.3 Binder / Reference Resolution

**Maps cleanly** with adaptations.

The `Reference` component must:
1. Resolve the refkey via the binder.
2. Determine the relationship: same-module, same-crate-different-module, external-crate.
3. If different module: add a `use` entry to the current module scope.
4. Render the symbol name.

**Use path construction:** Given a `ResolutionResult`, the reference component needs to:
- Walk `pathDown` to build the module path from the common scope to the declaration.
- Prefix with `crate::` for same-crate references, or the crate name for external crates.
- Handle `super::` for parent module references (optimization over `crate::full::path`).

**Grouping:** Multiple `use` items from the same path should be grouped: `use std::io::{Read, Write};`. This is a rendering concern handled by the `UseStatement` component.

**Evidence:** Go's `ref()` function in `packages/go/src/symbols/reference.ts` follows a very similar pattern — resolve, check export visibility, add import, build qualified name. Rust's will differ in path syntax (`::` vs `.`) and visibility rules (`pub` vs uppercase first letter).

## 3.4 NamePolicy

**Maps cleanly.**

Rust naming conventions (enforced by `clippy` lints):

| Element | Convention | Example |
|---|---|---|
| `type`, `struct`, `enum`, `trait` | `PascalCase` (UpperCamelCase) | `MyStruct` |
| `function`, `method` | `snake_case` | `my_function` |
| `variable`, `parameter` | `snake_case` | `my_var` |
| `constant`, `static` | `SCREAMING_SNAKE_CASE` | `MAX_SIZE` |
| `module`, `crate` | `snake_case` | `my_module` |
| `lifetime` | `'lowercase` | `'a`, `'static` |
| `type-parameter` | `PascalCase` (usually single letter) | `T`, `E`, `Item` |
| `enum-variant` | `PascalCase` | `Some`, `None`, `Ok` |
| `field` | `snake_case` | `my_field` |

**Reserved words:** `as`, `async`, `await`, `break`, `const`, `continue`, `crate`, `dyn`, `else`, `enum`, `extern`, `false`, `fn`, `for`, `if`, `impl`, `in`, `let`, `loop`, `match`, `mod`, `move`, `mut`, `pub`, `ref`, `return`, `self`, `Self`, `static`, `struct`, `super`, `trait`, `true`, `type`, `unsafe`, `use`, `where`, `while`, `yield`. (37 keywords)

Raw identifier syntax (`r#keyword`) is Rust's escape for reserved words — e.g., `r#type` to use `type` as an identifier.

## 3.5 Formatting Intrinsics

**Maps cleanly.** Rust uses `{ ... }` blocks like TypeScript, Java, and C#. Core's `Block` component works directly. Core's intrinsic elements (`<indent>`, `<hardline>`, `<group>`) provide all needed formatting.

**Format options:**
- `printWidth: 100` (rustfmt default)
- `tabWidth: 4` (Rust convention)
- `useTabs: false`

## 3.6 Impl Blocks

**Needs a package-specific abstraction.** No existing Alloy language package has a concept analogous to Rust's `impl` blocks.

An `ImplBlock` component would:
1. Accept a target type (by refkey or inline) and optional trait.
2. Create a member scope on the target type symbol.
3. Render `impl [Trait for] Type { ... }`.
4. Children are methods, associated types, etc.

**Key difference from classes:** In Java/TS/C#, methods are declared *inside* the class declaration. In Rust, methods are declared in *separate* impl blocks. A struct can have multiple impl blocks.

**Proposed component:**
```tsx
<ImplBlock type={structRefkey}>
  <FunctionDeclaration name="new" pub returnType="Self">
    {code`Self { field: 0 }`}
  </FunctionDeclaration>
</ImplBlock>

<ImplBlock type={structRefkey} trait={displayRefkey}>
  <FunctionDeclaration name="fmt" parameters={[...]}>
    {code`write!(f, "...")`}
  </FunctionDeclaration>
</ImplBlock>
```

## 3.7 Traits

**Needs adaptation.** Traits are closest to TypeScript interfaces / C# interfaces, but with default implementations and associated types.

A `TraitDeclaration` component would:
1. Create a type symbol.
2. Create a member scope (for method signatures and associated types).
3. Render `trait Name { ... }`.
4. Support `where` clauses for bound constraints.

## 3.8 Enums

**Needs adaptation.** Rust enums are algebraic data types (sum types), far richer than C#/Java/TS enums:

```rust
enum Shape {
    Circle(f64),                    // Tuple variant
    Rectangle { width: f64, height: f64 },  // Struct variant
    Point,                           // Unit variant
}
```

An `EnumDeclaration` component needs variant sub-components:
- `EnumVariant` — unit variant
- `EnumVariant` with `fields` — tuple or struct variant

## 3.9 Attributes / Derive

**Maps to C#'s Attribute pattern** with Rust-specific syntax.

```rust
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Config { ... }
```

An `Attribute` component renders `#[name(args)]`. A `DeriveAttribute` convenience component renders `#[derive(Trait1, Trait2, ...)]`.

## 3.10 External Crate Descriptors

**Maps to the existing `createPackage`/`createModule`/`createLibrary` pattern.**

A `createCrate()` factory would describe external crate APIs:

```typescript
const serde = createCrate({
  name: "serde",
  version: "1.0",
  descriptor: {
    ".": { named: ["Serialize", "Deserialize", "Serializer", "Deserializer"] },
    "json": { named: ["to_string", "from_str", "Value"] },
  },
});
```

The descriptor maps module paths within the crate to exported symbols. When referenced, the system adds `use serde::Serialize;` and records the crate dependency for `Cargo.toml`.

## 3.11 Build File (Cargo.toml)

**Maps to the `PackageJsonFile`/`PomFile`/`CsProjFile` pattern.**

A `CargoTomlFile` component generates the TOML manifest:

```toml
[package]
name = "my-crate"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
# ...
```

The crate scope tracks dependencies (added when external crate symbols are referenced) and renders them in `Cargo.toml`.

## 3.12 Lifetimes

**No precedent in existing packages.** Lifetimes are a Rust-specific concept.

For MVP, lifetimes can be handled as:
- String parameters in generic parameter lists: `<'a, T: 'a>`.
- Inline strings in type annotations: `&'a str`.

A dedicated `Lifetime` component or descriptor is deferred beyond MVP. The `code` template tag can render lifetime annotations inline.

## 3.13 Mod Declarations

**Unique to Rust.** When a crate has file-based modules, the crate root (or parent module) must declare them:

```rust
// In lib.rs
mod models;
mod utils;
pub mod api;
```

The `SourceFile` component for `lib.rs` / `main.rs` must auto-generate `mod` statements for all child modules. This is similar to TypeScript's barrel files but mandatory.

**Design:** The `RustCrateScope` (or `RustModuleScope` for submodules) tracks child modules and renders `mod` declarations automatically.

---

# 4. Proposed Package Shape

## 4.1 Directory Layout

```
packages/rust/
├── src/
│   ├── index.ts                      # Barrel export
│   ├── name-policy.ts                # Rust naming conventions
│   ├── create-crate.ts               # External crate descriptor factory
│   ├── parameter-descriptor.ts       # Parameter metadata (name, type, ref, mut, lifetime)
│   ├── utils.ts                      # Utility helpers
│   ├── symbols/
│   │   ├── index.ts                  # Symbol barrel
│   │   ├── rust-output-symbol.ts     # RustOutputSymbol class
│   │   ├── named-type-symbol.ts      # NamedTypeSymbol (struct, enum, trait)
│   │   ├── function-symbol.ts        # FunctionSymbol (fn, method)
│   │   ├── scopes.ts                 # Scope type alias + hooks (useRustScope, etc.)
│   │   ├── rust-crate-scope.ts       # RustCrateScope
│   │   ├── rust-module-scope.ts      # RustModuleScope (with use tracking)
│   │   ├── rust-function-scope.ts    # RustFunctionScope
│   │   ├── rust-lexical-scope.ts     # RustLexicalScope
│   │   ├── rust-impl-scope.ts        # RustImplScope (member scope)
│   │   ├── rust-trait-scope.ts       # RustTraitScope (member scope)
│   │   ├── factories.ts              # Symbol creation functions
│   │   └── reference.tsx             # Reference resolution + use generation
│   ├── components/
│   │   ├── index.ts                  # Component barrel
│   │   ├── stc/index.ts              # STC wrappers
│   │   ├── SourceFile.tsx            # Rust source file (.rs)
│   │   ├── CrateDirectory.tsx        # Crate root (creates CrateScope, Cargo.toml)
│   │   ├── ModuleDirectory.tsx       # Module directory (submodules)
│   │   ├── CargoTomlFile.tsx         # Cargo.toml generation
│   │   ├── Declaration.tsx           # Base declaration component
│   │   ├── Reference.tsx             # Symbol reference rendering
│   │   ├── UseStatement.tsx          # use path::to::item; rendering
│   │   ├── StructDeclaration.tsx     # struct Name { fields }
│   │   ├── EnumDeclaration.tsx       # enum Name { variants }
│   │   ├── FunctionDeclaration.tsx   # fn name(params) -> Type { body }
│   │   ├── TraitDeclaration.tsx      # trait Name { ... }
│   │   ├── ImplBlock.tsx             # impl [Trait for] Type { ... }
│   │   ├── TypeAlias.tsx             # type Name = Type;
│   │   ├── ConstDeclaration.tsx      # const NAME: Type = value;
│   │   ├── StaticDeclaration.tsx     # static NAME: Type = value;
│   │   ├── ModDeclaration.tsx        # mod name; or mod name { ... }
│   │   ├── Attribute.tsx             # #[attr(args)]
│   │   ├── DeriveAttribute.tsx       # #[derive(Trait1, Trait2)]
│   │   ├── DocComment.tsx            # /// doc comment
│   │   ├── MatchExpression.tsx       # match expr { arms }
│   │   ├── Parameters.tsx            # (param: Type, ...) rendering
│   │   ├── TypeParameters.tsx        # <'a, T: Bound> rendering
│   │   ├── WhereClause.tsx           # where T: Display + Clone
│   │   └── Value.tsx                 # Literal rendering
│   ├── context/
│   │   ├── index.ts
│   │   └── crate-context.tsx         # Crate metadata context
│   └── builtins/
│       ├── index.ts
│       └── std.ts                    # std crate descriptor (Option, Result, Vec, String, etc.)
├── test/
│   ├── utils.tsx                     # toSourceText(), findFile(), etc.
│   ├── vitest.setup.ts
│   ├── struct.test.tsx
│   ├── enum.test.tsx
│   ├── function.test.tsx
│   ├── trait.test.tsx
│   ├── impl.test.tsx
│   ├── imports.test.tsx
│   ├── reference.test.tsx
│   ├── name-policy.test.tsx
│   ├── attributes.test.tsx
│   ├── cargo-toml.test.tsx
│   └── module-structure.test.tsx
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## 4.2 Public API Shape

```typescript
// packages/rust/src/index.ts
export * from "./builtins/index.js";
export * from "./components/index.js";
export * from "./context/index.js";
export * from "./create-crate.js";
export * from "./name-policy.js";
export * from "./parameter-descriptor.js";
export * from "./symbols/index.js";
export * from "./utils.js";
```

**Consumer usage:**
```tsx
import * as rust from "@alloy-js/rust";

<Output>
  <rust.CrateDirectory name="my-crate" edition="2021">
    <rust.SourceFile path="lib.rs">
      <rust.StructDeclaration name="Config" pub derives={["Debug", "Clone"]}>
        <rust.Field name="name" type="String" pub />
        <rust.Field name="value" type="i32" pub />
      </rust.StructDeclaration>
    </rust.SourceFile>
  </rust.CrateDirectory>
</Output>
```

## 4.3 Major Internal Areas of Responsibility

1. **Symbol system** (`symbols/`): `RustOutputSymbol`, `NamedTypeSymbol`, `FunctionSymbol`, scope hierarchy, factory functions.
2. **Reference resolution** (`symbols/reference.tsx`): Resolves refkeys, determines use paths, tracks imports.
3. **Components** (`components/`): Declaration, expression, and structural components.
4. **Use statement generation** (`components/UseStatement.tsx`): Renders `use` statements with grouping and tree syntax.
5. **Module structure** (`components/CrateDirectory.tsx`, `ModuleDirectory.tsx`, `SourceFile.tsx`): File/module hierarchy with automatic `mod` declarations.
6. **Build file** (`components/CargoTomlFile.tsx`): `Cargo.toml` generation with dependency tracking.
7. **External crate descriptors** (`create-crate.ts`): Factory for describing external crate APIs.

## 4.4 Relationship to Alloy Core

The package depends on `@alloy-js/core` and uses:
- `OutputSymbol`, `OutputScope` (subclassing)
- `createSymbol()`, `createScope()` (factories)
- `createNamePolicy()` (naming)
- `createContext()`, `useContext()` (context system)
- `Binder`, `resolve()` (reference resolution)
- `refkey()`, `namekey()`, `memberRefkey()` (identity)
- `code`, `text` (template tags)
- `stc()` (component wrappers)
- `mapJoin()`, `join()` (list utilities)
- `Output`, `SourceFile`, `SourceDirectory`, `Declaration`, `Scope`, `Block`, `Indent` (core components)
- Intrinsic elements (`<indent>`, `<hardline>`, `<group>`, etc.)

---

# 5. MVP Scope

The MVP should enable generation of a complete, compilable Rust crate with basic types, functions, traits, and imports.

## 5.1 In Scope

### File / Module Generation
- `CrateDirectory` — creates crate root with `Cargo.toml`.
- `SourceFile` — creates `.rs` files with module scope.
- `ModuleDirectory` — creates subdirectory-based modules.
- Automatic `mod` declaration generation in parent modules.
- `CargoTomlFile` — generates `Cargo.toml` with metadata and dependencies.

### Imports / Use Statements
- Automatic `use` statement generation when referencing cross-module symbols.
- `use crate::path::Item;` for same-crate references.
- `use <crate>::Item;` for external crate references.
- `use path::{Item1, Item2};` grouping for multiple imports from same path.
- Import sorting: `std` → external → `crate::`.

### Identifiers and References
- `Reference` component resolving refkeys to symbol names.
- Name policy with `snake_case`, `PascalCase`, `SCREAMING_SNAKE_CASE` transformations.
- Reserved word handling with `r#` prefix.
- `RustOutputSymbol` with visibility property.

### Declarations
- `StructDeclaration` — named structs with fields (field-level visibility).
- `EnumDeclaration` — enums with unit, tuple, and struct variants.
- `FunctionDeclaration` — functions with parameters, return type, async, pub.
- `TraitDeclaration` — traits with method signatures and default implementations.
- `ImplBlock` — inherent impl and trait impl blocks.
- `TypeAlias` — `type Name = Type;`.
- `ConstDeclaration` — `const NAME: Type = value;`.

### Type System (Basic)
- `TypeParameters` — `<T, U>` with basic bounds (`T: Display`).
- `WhereClause` — `where T: Display + Clone`.
- Inline type annotations via `code` template.

### Attributes
- `Attribute` — `#[name(args)]`.
- `DeriveAttribute` — `#[derive(Trait1, Trait2)]`.

### Comments
- `DocComment` — `///` doc comments.
- `ModuleDocComment` — `//!` inner doc comments (for file headers).

### Formatting
- 4-space indent, 100-char width.
- Trailing commas in multi-line contexts.
- Blank lines between top-level items.

### External Dependencies
- `createCrate()` factory for external crate descriptors.
- `std` builtin descriptor covering: `Option`, `Result`, `Vec`, `String`, `Box`, `HashMap`, `HashSet`, `io::{Read, Write}`, `fmt::Display`, `fmt::Debug`, `clone::Clone`, `default::Default`.

### Tests
- `test/utils.tsx` with `toSourceText()`.
- Tests for each declaration component.
- Cross-module reference tests.
- Name policy tests.
- Cargo.toml tests.

## 5.2 What MVP Produces

A compilable Rust crate with:
- Multiple modules in a directory hierarchy.
- Structs, enums, traits, and functions with correct syntax.
- Automatic `use` statements for cross-module and cross-crate references.
- `#[derive(...)]` attributes.
- `Cargo.toml` with dependencies.
- Doc comments.
- Correct Rust naming conventions.

---

# 6. Deferred / Out-of-Scope Features

| Feature | Why Deferred |
|---|---|
| **Lifetimes** (`'a` annotations) | Complex, Rust-specific. Can be rendered inline with `code` template for now. |
| **Pattern matching** (`match` expressions with complex patterns) | Rich expression syntax. Basic `match` can be inline. |
| **Closures** (`\|x\| expr`) | Can be rendered inline with `code` template. |
| **Async/await expressions** | `async fn` is in MVP; complex async expressions (`async { }`, `.await`) are deferred. |
| **Unsafe blocks/functions** | `unsafe fn` modifier is in MVP; full unsafe block semantics are deferred. |
| **Macro definitions** (`macro_rules!`) | Complex, rarely needed in code generation. |
| **Proc macro crates** | Separate crate type, advanced use case. |
| **Tuple structs** (`struct Foo(T1, T2)`) | Less common. Named structs are MVP. |
| **Unit structs** (`struct Foo;`) | Rare in code generation. |
| **Static declarations** | Less common than `const`. |
| **`pub(in path)` visibility** | Rare. `pub`, `pub(crate)`, and private cover most cases. |
| **Re-exports** (`pub use`) | Advanced module organization. |
| **Glob imports** (`use path::*`) | Generally discouraged. |
| **Conditional compilation** (`#[cfg(...)]`) | Advanced feature. |
| **Feature flags** in `Cargo.toml` | Advanced dependency management. |
| **Workspace support** | Multi-crate projects. |
| **`impl Trait` in function signatures** | Can be rendered inline. |
| **`dyn Trait` / trait objects** | Can be rendered inline. |
| **Associated types** in traits | Can be rendered inline for now. |
| **Complex `where` clauses** | Basic `where` is MVP; higher-ranked trait bounds are deferred. |
| **If/else, loop, for, while expressions** | Imperative control flow. Can use `code` template. |
| **Let bindings with patterns** | Can use `code` template. |

---

# 7. Golden Scenarios

## 7.1 Basic Struct with Impl

**Input (Alloy JSX):**
```tsx
<rust.CrateDirectory name="example" edition="2021">
  <rust.SourceFile path="lib.rs">
    <rust.StructDeclaration name="Point" pub derives={["Debug", "Clone"]}>
      <rust.Field name="x" type="f64" pub />
      <rust.Field name="y" type="f64" pub />
    </rust.StructDeclaration>

    <rust.ImplBlock type={pointRefkey}>
      <rust.FunctionDeclaration name="new" pub parameters={[
        { name: "x", type: "f64" },
        { name: "y", type: "f64" },
      ]} returnType="Self">
        {code`Self { x, y }`}
      </rust.FunctionDeclaration>

      <rust.FunctionDeclaration name="distance" parameters={[
        { name: "&self" },
        { name: "other", type: "&Point" },
      ]} returnType="f64">
        {code`((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()`}
      </rust.FunctionDeclaration>
    </rust.ImplBlock>
  </rust.SourceFile>
</rust.CrateDirectory>
```

**Expected output (`lib.rs`):**
```rust
#[derive(Debug, Clone)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

impl Point {
    pub fn new(x: f64, y: f64) -> Self {
        Self { x, y }
    }

    fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}
```

## 7.2 Multi-Module Crate with Imports

**Input (Alloy JSX):**
```tsx
const userRefkey = refkey();
const greetRefkey = refkey();

<rust.CrateDirectory name="myapp" edition="2021">
  <rust.SourceFile path="lib.rs" />
  <rust.ModuleDirectory path="models">
    <rust.SourceFile path="user.rs">
      <rust.StructDeclaration name="User" pub refkey={userRefkey} derives={["Debug"]}>
        <rust.Field name="name" type="String" pub />
        <rust.Field name="age" type="u32" pub />
      </rust.StructDeclaration>
    </rust.SourceFile>
  </rust.ModuleDirectory>
  <rust.SourceFile path="greet.rs">
    <rust.FunctionDeclaration name="greet" pub refkey={greetRefkey}
      parameters={[{ name: "user", type: <><rust.Reference refkey={userRefkey} /></> }]}
    >
      {code`println!("Hello, {}! Age: {}", user.name, user.age);`}
    </rust.FunctionDeclaration>
  </rust.SourceFile>
</rust.CrateDirectory>
```

**Expected output:**

`lib.rs`:
```rust
pub mod greet;
pub mod models;
```

`models/mod.rs`:
```rust
pub mod user;
```

`models/user.rs`:
```rust
#[derive(Debug)]
pub struct User {
    pub name: String,
    pub age: u32,
}
```

`greet.rs`:
```rust
use crate::models::user::User;

pub fn greet(user: User) {
    println!("Hello, {}! Age: {}", user.name, user.age);
}
```

## 7.3 Trait and Impl

**Expected output:**
```rust
pub trait Greetable {
    fn greeting(&self) -> String;

    fn greet(&self) {
        println!("{}", self.greeting());
    }
}

impl Greetable for User {
    fn greeting(&self) -> String {
        format!("Hello, {}!", self.name)
    }
}
```

## 7.4 Enum with Variants

**Expected output:**
```rust
#[derive(Debug, Clone)]
pub enum Shape {
    Circle(f64),
    Rectangle {
        width: f64,
        height: f64,
    },
    Point,
}
```

## 7.5 Cargo.toml

**Expected output:**
```toml
[package]
name = "myapp"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
```

---

# 8. Risks and Open Design Questions

## 8.1 Design Questions

1. **How should `mod` declarations be auto-generated?** Options:
   - (a) `SourceFile` for `lib.rs`/`main.rs` auto-scans child modules from the scope and renders `mod` declarations. *(Recommended — similar to TS barrel files.)*
   - (b) User explicitly places `<ModDeclaration>` components.
   - (c) Hybrid: auto-generate by default, allow manual override.

2. **How should `self` parameters be represented?** Options:
   - (a) Magic first parameter: `{ name: "&self" }` or `{ name: "&mut self" }`.
   - (b) Dedicated `receiver` prop on `FunctionDeclaration`: `receiver="&self"`.
   - (c) Auto-injected when inside an `ImplBlock` (like Python auto-injects `self`). *(Recommended — least verbose for users.)*

3. **Should `ImplBlock` create a member scope on the target type?** If yes, methods declared inside an impl block would be discoverable as members of the type. This enables `memberRefkey(typeRefkey, "method_name")` references. *(Recommended: yes.)*

4. **How should field-level visibility work?** Struct fields in Rust have independent visibility from the struct. Options:
   - (a) `pub` prop on `Field` component. *(Recommended — mirrors Rust syntax.)*
   - (b) Visibility property on the field symbol.
   - (c) Both (prop sets symbol property).

5. **How should `use` statement grouping work?** Rust idiom groups by path tree:
   ```rust
   use std::io::{self, Read, Write};
   ```
   Options:
   - (a) Always flatten: one `use` per item. Simple to implement.
   - (b) Group by common prefix: `use path::{A, B};`. More idiomatic. *(Recommended for MVP.)*

6. **Should lifetimes be modeled as symbols?** Options:
   - (a) Yes — `LifetimeSymbol` in a `"lifetimes"` declaration space. Enables refkey-based lifetime references.
   - (b) No — lifetimes are inline strings for MVP. *(Recommended for MVP.)*

## 8.2 Risks

1. **Module declaration complexity.** Rust requires explicit `mod` declarations. Auto-generating these from the file tree is non-trivial: the order matters, visibility must be correct, and conditional modules (`#[cfg]`) exist. MVP should handle the simple case.

2. **Impl block multiplicity.** A type can have many impl blocks. The member scope model must support this without symbol conflicts. Each impl block appends to the type's member space.

3. **Use path construction.** Building correct `use` paths requires understanding the full module tree. Paths like `crate::a::b::Symbol` must be computed from the resolution result. Edge cases include re-exports and `self`/`super` paths.

4. **External crate dependency tracking.** When a symbol from an external crate is referenced, the crate must appear in `Cargo.toml`'s `[dependencies]`. The `RustCrateScope` must track this (similar to `JavaProjectScope.addDependency()`).

5. **No existing test for Rust output.** Unlike TS/Python/Java/C# which can be validated by their respective compilers/linters, Rust output validation would require `cargo check`. For MVP, tests will compare rendered strings.

6. **Tuple struct and unit struct variants.** These are syntactically different from named structs but share the same `struct` keyword. The MVP defers these, but the symbol model should not preclude them.

---

# 9. Recommendation

**Implement `@alloy-js/rust` as a standard Alloy language package following the established 4-package pattern (TS/Java/Python/C#), with these Rust-specific adaptations:**

1. **Symbol model:** `RustOutputSymbol` with `visibility` property (not member-space-encoded). Single `"members"` member space. `NamedTypeSymbol` and `FunctionSymbol` subclasses.

2. **Scope hierarchy:** `RustCrateScope` → `RustModuleScope` → `RustFunctionScope` → `RustLexicalScope`, plus `RustImplScope` and `RustTraitScope` as member scopes. Module scopes track `use` imports. Crate scope tracks `mod` declarations and external dependencies.

3. **Declaration spaces:** `["types", "values", "macros"]` on module/crate scopes. `["parameters", "type-parameters", "local-variables"]` on function scopes.

4. **Core components (MVP):** `CrateDirectory`, `SourceFile`, `ModuleDirectory`, `CargoTomlFile`, `StructDeclaration`, `EnumDeclaration`, `FunctionDeclaration`, `TraitDeclaration`, `ImplBlock`, `TypeAlias`, `ConstDeclaration`, `Attribute`, `DeriveAttribute`, `DocComment`, `Reference`, `UseStatement`.

5. **Import system:** Auto-generate `use` statements with path grouping (`use path::{A, B};`). Sort by std → external → crate.

6. **Module system:** Auto-generate `mod` declarations in parent modules/crate root.

7. **External dependencies:** `createCrate()` factory with `std` builtin. Auto-track crate dependencies for `Cargo.toml`.

8. **Defer:** Lifetimes, closures, complex pattern matching, macro definitions, proc macros, tuple/unit structs, `pub(in path)`, re-exports, conditional compilation.

This approach is conservative, proven by existing packages, and delivers a useful Rust code generator at MVP that can be extended incrementally.
