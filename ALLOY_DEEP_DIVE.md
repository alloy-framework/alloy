# The Alloy Framework: A Deep Dive

Comprehensive guide to understanding Alloy and building TypeSpec emitters.

## What is Alloy?

Alloy is a **code generation framework** that borrows concepts from JavaScript front-end frameworks like React and Solid to provide highly ergonomic and productive source code generation.

### Core Philosophy

- **Declarative:** Use JSX syntax or string templates to define source files and their contents
- **Reactive:** Components are built on reactive primitives — when dependencies change, output automatically updates
- **Language-agnostic:** Core framework supports many languages (TypeScript, Python, Java, C#, Go, JSON, Markdown)
- **Symbol-aware:** Automatic handling of declarations, cross-file references, imports, naming conventions, and symbol resolution

### Key Value Propositions

- Handles the hard parts of code generation: building strings, linking declarations, importing dependencies, applying naming conventions, formatting, generating syntax
- Works like React but for code (not DOM)
- Supports both JSX syntax and fluent string-template composition

---

## The Alloy Stack

### 1. **Core Framework** (`@alloy-js/core`)

The foundation containing:

- **Reactive runtime** — Vue 3 reactivity system (computed, watch, effects, refs)
- **Component model** — JSX components that render to code, not DOM
- **Symbol system** — Declaration/reference tracking, scope hierarchy, refkeys
- **Binder** — Central registry for scopes and symbols, enables cross-file references
- **Formatting** — Prettier document IR for sophisticated layout control
- **Name policies** — Transform names by element type (camelCase for vars, PascalCase for classes)

### 2. **Language Packages** (`@alloy-js/<language>`)

Each language (TypeScript, Python, Java, etc.) provides:

- **Symbol classes** — Extend `OutputSymbol` with language-specific properties (e.g., accessibility, static/abstract flags)
- **Scope classes** — Extend `OutputScope` with language-specific declaration spaces and organizational levels
- **Components** — JSX components for every language construct (classes, interfaces, functions, properties, etc.)
- **Reference component** — Handles symbol resolution and generates appropriate import/reference syntax
- **Name policy** — Casing rules for element kinds
- **External library descriptors** — Lazy symbol registration for built-in/third-party symbols

### 3. **Build & Tooling**

- **`@alloy-js/cli`** — `alloy build` and watch mode for emitters
- **`@alloy-js/babel-plugin-jsx-dom-expressions`** — Core JSX transform
- **`@alloy-js/rollup-plugin`** — Rollup integration

---

## Core Concepts

### Symbols & Refkeys

**Symbols** uniquely identify named declarations (classes, functions, variables, types, etc.) and exist within scopes.

**Refkeys** are immutable identifiers for symbols that enable cross-file referencing and automatic import generation.

```tsx
// Create a refkey (usually from input data)
const userKey = refkey(userSchema);

// Declare a symbol with a refkey
<Declaration name="User" refkey={userKey}>
  {/* declaration body */}
</Declaration>;

// Reference it anywhere in the output tree (forward/backward)
// Alloy auto-generates: import { User } from "./models.js";
const user: { userKey } = await fetchUser();
```

**Namekeys** combine a name + refkey in one value:

```tsx
const MyClass = namekey("MyClass");
<Declaration name={MyClass}>{/* ... */}</Declaration>;
{
  MyClass;
} // Also a reference
```

**Member Refkeys** reference members of symbols:

```tsx
const classKey = refkey(myClass);
const propKey = memberRefkey(classKey, "id");
{
  propKey;
} // Resolves to MyClass.id or this.id depending on context
```

### Binder

The **binder** is the central symbol registry:

- Created by `<Output>` component
- Tracks all scopes and symbols
- Resolves refkeys by searching up the scope tree
- Computes scope paths for reference generation
- Handles member resolution chains
- Available via `BinderContext`

### Scopes

**Scopes** form a tree mirroring the output structure. Each scope:

- Has a parent (except root) and children
- Contains one or more **declaration spaces** (e.g., "types" vs "values" in TypeScript)
- Is either **lexical** (holds its own declarations) or a **member scope** (exposes a symbol's members)

Example TypeScript scope hierarchy:

```
OutputScope (root)
├── TSPackageScope ("pkg1")
│   └── TSModuleScope ("models.ts")
│       └── TSLexicalScope ("values" space, "types" space)
│           ├── ClassDeclaration → TSMemberScope
│           │   ├── "instance" space
│           │   └── "static" space
│           └── InterfaceDeclaration → TSMemberScope
```

### Rendering Pipeline

```
JSX Components  →  Rendered Text Tree  →  Formatted Text  →  Output Files
```

1. **Component rendering** — JSX runs in reactive effects; components yield children
2. **Text tree construction** — Children become strings, refkeys, formatted elements
3. **Symbol resolution** — Refkeys resolve through binder; imports generated
4. **Printing** — Prettier document model formats output with line wrapping, indentation
5. **File writing** — Formatted text written to disk

---

## Creating an Emitter

### Basic Structure

```tsx
import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

// 1. Define emitter logic
function EmitterApp() {
  return (
    <ay.Output>
      <ts.PackageDirectory name="my-client" version="1.0.0">
        <ts.SourceFile path="models.ts">
          {/* Generate TypeScript code here */}
        </ts.SourceFile>
      </ts.PackageDirectory>
    </ay.Output>
  );
}

// 2. Render to files
const output = ay.render(<EmitterApp />);
await ay.writeOutput(output, "./dist");
```

### Pattern: Input → Declarations → References

The typical emitter flow:

```tsx
// Define your input schema
const api = {
  name: "Petstore",
  models: [
    { name: "Pet", properties: [{ name: "name", type: "string" }] }
  ]
};

// Emit declarations (with refkeys from input)
<ts.SourceFile path="models.ts">
  <For each={api.models} hardline>
    {(model) => (
      <ts.InterfaceDeclaration
        export
        name={model.name}
        refkey={refkey(model)}  // Seed refkey from input
      >
        {/* properties */}
      </ts.InterfaceDeclaration>
    )}
  </For>
</ts.SourceFile>

// Reference declarations elsewhere
<ts.SourceFile path="client.ts">
  {/* Refkey lookup finds the Pet interface in models.ts */}
  {/* Alloy auto-imports: import { Pet } from "./models.js"; */}
  const pet: {refkey(api.models[0])} = await getPet();
</ts.SourceFile>
```

### Context & Composition

Use context for shared data across the component tree:

```tsx
import { createContext, useContext } from "@alloy-js/core";

const ApiContext = createContext();

function EmitterApp({ api }) {
  return (
    <ApiContext.Provider value={{ api }}>
      <ts.PackageDirectory name={`${api.name}-client`}>
        <ModelFile />
        <ClientFile />
      </ts.PackageDirectory>
    </ApiContext.Provider>
  );
}

function ModelFile() {
  const { api } = useContext(ApiContext);
  return <ts.SourceFile path="models.ts">{/* ... */}</ts.SourceFile>;
}
```

---

## Language Packages: How to Build One

### Package Setup

```
my-language/
├── src/
│   ├── symbols/
│   │   ├── output-symbol.ts          # Symbol class
│   │   ├── scopes.ts                 # Scope classes
│   │   ├── reference.tsx             # Reference component
│   │   └── index.ts
│   ├── components/
│   │   ├── ClassDeclaration.tsx
│   │   ├── FunctionDeclaration.tsx
│   │   ├── SourceFile.tsx
│   │   └── ... (one per construct)
│   ├── name-policy.ts                # Naming rules
│   ├── name-conflict-resolver.ts
│   └── index.ts
└── package.json
```

### Step 1: Symbol Model

Subclass `OutputSymbol` for language-specific properties:

```tsx
export class MyLangSymbol extends OutputSymbol {
  static readonly memberSpaces = ["static", "instance"];

  #isPublic: boolean;
  get isPublic() {
    track(this, TrackOpTypes.GET, "isPublic");
    return this.#isPublic;
  }
  set isPublic(value: boolean) {
    this.#isPublic = value;
    trigger(this, TriggerOpTypes.SET, "isPublic", value, !value);
  }

  copy() {
    const copy = createSymbol(MyLangSymbol, this.name, undefined, {
      binder: this.binder,
      aliasTarget: this.aliasTarget,
    });
    watch(
      () => this.isPublic,
      (v) => (copy.isPublic = v),
    );
    return copy;
  }
}
```

### Step 2: Scope Model

Define declaration and member spaces:

```tsx
export class MyLangLexicalScope extends OutputScope {
  static readonly declarationSpaces = ["types", "values"];

  get types() {
    return this.spaceFor("types")!;
  }

  get values() {
    return this.spaceFor("values")!;
  }
}

export class MyLangMemberScope extends OutputScope {
  // Member scopes don't define declaration spaces
  static readonly declarationSpaces: string[] = [];
}
```

### Step 3: Factory Functions

Create one factory per symbol kind:

```tsx
export function createValueSymbol(
  name: string | Namekey,
  options?: CreateMySymbolOptions,
): MyLangSymbol {
  const scope = useScope<MyLangLexicalScope>();
  return createSymbol(MyLangSymbol, name, scope.spaceFor("values"), {
    ...options,
    binder: useBinder(),
  });
}

export function createTypeSymbol(
  name: string | Namekey,
  options?: CreateMySymbolOptions,
): MyLangSymbol {
  const scope = useScope<MyLangLexicalScope>();
  return createSymbol(MyLangSymbol, name, scope.spaceFor("types"), {
    ...options,
    binder: useBinder(),
  });
}
```

### Step 4: Reference Component

Handle symbol resolution and emit reference syntax:

```tsx
export function Reference(props: { refkey: Refkey }): Children {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<MyLangScope, MyLangSymbol>(props.refkey);

  return memo(() => {
    if (!resolveResult.value) {
      return unresolvedRefkey(props.refkey);
    }

    const { symbol, pathDown, memberPath } = resolveResult.value;

    // Emit import if cross-module
    if (pathDown[0] instanceof MyLangModuleScope) {
      sourceFile.scope.addImport(symbol, pathDown[0] as MyLangModuleScope);
    }

    // Render reference syntax (qualified name, member access, etc.)
    return renderReference(symbol, memberPath);
  });
}
```

### Step 5: Declaration Components

One component per language construct:

```tsx
export function ClassDeclaration(props: ClassDeclarationProps) {
  const sym = createTypeSymbol(props.name, {
    refkey: props.refkey,
    export: props.export,
    hasInstanceMembers: true,
  });

  return (
    <Declaration symbol={sym}>
      class <Name />{" "}
      {<MemberScope ownerSymbol={sym}>{props.children}</MemberScope>}
    </Declaration>
  );
}

// Member components for class members
export function ClassField(props: ClassFieldProps) {
  const member = createMemberSymbol(props.name, {
    refkey: props.refkey,
    isStatic: props.static,
  });

  return (
    <MemberDeclaration symbol={member}>
      {props.visibility} {props.static && "static"} {props.name}: {props.type}
    </MemberDeclaration>
  );
}
```

### Step 6: Name Policy

Define casing rules for symbol kinds:

```tsx
export function createMyNamePolicy(): NamePolicy {
  return createNamePolicy({
    class: { transform: "PascalCase" },
    field: { transform: "camelCase" },
    enum: { transform: "PascalCase" },
    method: { transform: "camelCase" },
  });
}
```

---

## TypeScript Emitter Example

Let's trace through the TypeScript package to understand the pattern:

### Symbol: `TSOutputSymbol`

```tsx
export class TSOutputSymbol extends OutputSymbol {
  static readonly memberSpaces = [
    "static",
    "instance",
    "private-static",
    "private-instance",
  ];

  #export: boolean;
  get export() {
    /* ... */
  }
  set export(v: boolean) {
    /* ... */
  }

  #default: boolean;
  get default() {
    /* ... */
  }
  set default(v: boolean) {
    /* ... */
  }
}
```

### Scopes

```tsx
// Lexical: types + values
export class TSLexicalScope extends OutputScope {
  static readonly declarationSpaces = ["values", "types"];
  get values() {
    return this.spaceFor("values")!;
  }
  get types() {
    return this.spaceFor("types")!;
  }
}

// Module: tracks exports
export class TSModuleScope extends TSLexicalScope {
  exportedSymbols: Map<Refkey, TSOutputSymbol> = new Map();
}

// Package: tracks dependencies
export class TSPackageScope extends OutputScope {
  static readonly declarationSpaces: string[] = [];
  dependencies: Set<TSPackageScope> = new Set();
}
```

### Reference Component

Resolves refkeys and generates imports:

```tsx
export function ref(refkey: Refkey, options?: RefOptions) {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(refkey, {
    memberResolver,
  });

  return memo(() => {
    if (!resolveResult.value) return unresolvedRefkey(refkey);

    const { symbol, pathDown, memberPath } = resolveResult.value;
    const targetLocation =
      pathDown[0] instanceof TSPackageScope ? "package"
      : pathDown[0] instanceof TSModuleScope ? "module"
      : "local";

    let localSymbol: TSOutputSymbol | undefined;

    if (targetLocation === "package" || targetLocation === "module") {
      // Generate import statement
      localSymbol = sourceFile.scope.addImport(symbol, pathDown[0], {
        type: options?.type,
      });
    }

    // Render qualified reference or member access
    return <MemberExpression children={parts} />;
  });
}
```

### Declaration Component: `ClassDeclaration`

```tsx
export function ClassDeclaration(props: ClassDeclarationProps) {
  const sym = createTypeAndValueSymbol(props.name, {
    refkey: props.refkey,
    export: props.export,
    hasInstanceMembers: true,
  });

  return (
    <Declaration symbol={sym}>
      <MemberScope ownerSymbol={sym}>
        class <Name /> {extendsPart} {implementsPart}{" "}
        <Block>{props.children}</Block>
      </MemberScope>
    </Declaration>
  );
}
```

### Member Component: `ClassMember`

```tsx
export function ClassMember(props: ClassMemberProps) {
  const owner = useMemberOwner();
  const isPrivate = !props.public;
  const spaceKey = `${props.static ? "static" : "instance"}-${
    isPrivate ? "private" : "public"
  }`;

  const member = createMemberSymbol(props.name, {
    refkey: props.refkey,
    space: owner.memberSpaceFor(spaceKey),
  });

  return (
    <MemberDeclaration symbol={member}>
      {props.public && "public "}
      {props.static && "static "}
      {props.name}: {props.type}
      {props.children && ` = ${props.children}`}
    </MemberDeclaration>
  );
}
```

---

## Building a TypeSpec Emitter

### TypeSpec Integration

To consume TypeSpec models:

```tsx
import { createProgram } from "@typespec/compiler";
import * as ts from "@alloy-js/typescript";

// 1. Compile TypeSpec to object model
const program = await createProgram({
  main: "main.tsp",
});
const serviceNamespace = program.getGlobalNamespace();

// 2. Walk the model
function* walkModels(type) {
  if (type.kind === "Model") {
    yield type;
  }
  for (const prop of type.properties?.values() || []) {
    yield* walkModels(prop.type);
  }
}

// 3. Emit declarations
<ts.SourceFile path="models.ts">
  <For each={Array.from(walkModels(serviceNamespace))}>
    {(model) => (
      <ts.InterfaceDeclaration export name={model.name} refkey={refkey(model)}>
        <For each={Array.from(model.properties.values())} comma hardline>
          {(prop) => (
            <ts.InterfaceMethod
              name={prop.name}
              type={renderType(prop.type)}
              readonly
            />
          )}
        </For>
      </ts.InterfaceDeclaration>
    )}
  </For>
</ts.SourceFile>;
```

### Architecture for CDK Emitter

For generating TypeScript CDK packages:

```tsx
interface CdkEmitterOptions {
  typespecProgram: Program;
  packageName: string;
  outputPath: string;
  namePolicy?: NamePolicy;
}

export async function emitCdkPackage(options: CdkEmitterOptions) {
  // 1. Create context for TypeSpec objects
  const typespecContext = createTypeSpecContext(options.typespecProgram);

  // 2. Generate output
  const output = render(
    <ay.Output namePolicy={options.namePolicy ?? tsNamePolicy}>
      <TypeSpecContext.Provider value={typespecContext}>
        <ts.PackageDirectory name={options.packageName} version="1.0.0">
          <ResourcesFile />
          <ClientFile />
          <OperationsFile />
          <BarrelFile />
        </ts.PackageDirectory>
      </TypeSpecContext.Provider>
    </ay.Output>,
  );

  // 3. Write to disk
  await writeOutput(output, options.outputPath);
}

function ResourcesFile() {
  const typespec = useContext(TypeSpecContext);

  return (
    <ts.SourceFile path="resources.ts">
      <For each={typespec.resources} hardline doubleHardline>
        {(resource) => <ResourceClass resource={resource} />}
      </For>
    </ts.SourceFile>
  );
}

function ResourceClass({ resource }) {
  const refkey = refkey(resource);

  return (
    <ts.ClassDeclaration export name={resource.name} refkey={refkey}>
      <For each={resource.operations} hardline>
        {(op) => <OperationMethod operation={op} />}
      </For>
    </ts.ClassDeclaration>
  );
}
```

---

## Formatting & Layout

Alloy uses Prettier's document IR for sophisticated formatting:

### Basic Elements

```tsx
<hbr />                    // hardline - always breaks
<sbr />                    // softline - breaks if group breaks
<br />                     // line - space or line break
<group>...</group>         // Try to fit on one line
<indent>...</indent>       // Increase indentation
<Indent>...</Indent>       // Component: indent + line break

<Block>                    // Indented block with braces
  {props.children}
</Block>

<List comma hardline>      // Items with separators
  {items.map(i => i)}
</List>
```

### Code Templates

Preserve structure and auto-indent:

```tsx
code`
  function foo() {
    return ${expr};
  }
`;

// Line breaks → hardlines
// Indentation increases → indent elements
// Expressions interpolated as children
```

---

## Testing & Debugging

### Example Test

```tsx
import { render } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

describe("ClassDeclaration", () => {
  it("emits a class with members", () => {
    const petKey = refkey();

    const [, file] = render(
      <ts.SourceFile path="pet.ts">
        <ts.ClassDeclaration name="Pet" refkey={petKey} export>
          <ts.ClassField name="name" type="string" />
          <ts.ClassConstructor parameters={[{ name: "name", type: "string" }]}>
            this.name = name;
          </ts.ClassConstructor>
        </ts.ClassDeclaration>
      </ts.SourceFile>,
    );

    expect(file.contents).toContain("export class Pet");
    expect(file.contents).toContain("name: string");
    expect(file.contents).toContain("constructor");
  });
});
```

### DevTools

Alloy includes DevTools for debugging. Visit http://localhost:1234 when running with DevTools enabled.

---

## Best Practices

1. **Seed refkeys from input data** — `refkey(schemaObject)` not hand-created refkeys
2. **Use context for shared data** — Props can get unwieldy; context is cleaner
3. **Don't destructure props** — Keeps reactivity working
4. **Use composition** — Small reusable components > monolithic generators
5. **Test declarations + references separately** — Catch symbol resolution bugs early
6. **Use inline refkeys in JSX** — `{refkey(...)}` not `<Reference refkey={...} />`
7. **Implement member components** — Enables proper scoping and member resolution
8. **Document props** — Props interface is the API surface; every prop needs JSDoc
9. **One file per component** — Easier to navigate and maintain

---

## Key Files to Study

- `@alloy-js/core/src/binder.ts` — Symbol resolution engine
- `@alloy-js/core/src/render.ts` — Rendering pipeline
- `@alloy-js/core/src/symbols/output-symbol.ts` — Symbol base class
- `@alloy-js/typescript/src/symbols/ts-output-symbol.ts` — TypeScript symbol implementation
- `@alloy-js/typescript/src/symbols/reference.tsx` — Reference resolution & import generation
- `samples/client-emitter/src/` — Complete working example

---

## Resources

- **Docs:** `/packages/core/docs/index.md`
- **Language Package Guide:** `/docs/language-package-guide.md`
- **References & Refkeys:** `/docs/references-and-refkeys.md`
- **Style Guide:** `/docs/style-guide.md`
- **API Reference:** Generated from TSDoc in each package's `/docs/api/` dir
