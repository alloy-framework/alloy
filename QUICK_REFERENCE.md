# Alloy Quick Reference Guide

## Essential Patterns

### 1. Creating Refkeys from Input

```tsx
// Seed refkey from data object — same object always → same key
const userKey = refkey(userSchema);
const petKey = refkey(petSchema);

// Composite key for multiple declarations from one input
const inputKey = refkey(schema, "input");
const outputKey = refkey(schema, "output");

// Namekey for fixed names (less common)
const MyClass = namekey("MyClass");
```

### 2. Declaring Symbols

```tsx
// Basic declaration
<Declaration name="User" refkey={refkey(userSchema)} export>
  {/* content */}
</Declaration>

// In TypeScript with class
<ts.ClassDeclaration
  name={props.name}
  refkey={refkey(model)}
  export
>
  <ts.MemberScope ownerSymbol={sym}>
    {/* members */}
  </ts.MemberScope>
</ts.ClassDeclaration>
```

### 3. Referencing Symbols (Auto-Imports)

```tsx
// Inline refkey in JSX (most common)
const user: { refkey(userSchema) } = await fetch();

// In code template
code`const x: ${refkey(typeSchema)} = ...`;

// Member refkey
{
  memberRefkey(classKey, propertyKey);
}

// Explicit Reference component
<Reference refkey={refkey(schema)} type />;
```

### 4. Using Context

```tsx
// Create context
const ApiContext = createContext<ApiSchema>();

// Provide in emitter
<ApiContext.Provider value={api}>
  <ts.PackageDirectory name={api.name}>
    <ModelFiles />
  </ts.PackageDirectory>
</ApiContext.Provider>;

// Use in components
function ModelFiles() {
  const api = useContext(ApiContext);
  return (
    <ts.SourceFile path="models.ts">
      <For each={api.models} hardline doubleHardline>
        {(model) => <Model model={model} />}
      </For>
    </ts.SourceFile>
  );
}
```

### 5. Conditional Rendering

```tsx
// Short inline conditions
{
  props.async && "async ";
}
{
  !props.children && ";";
}

// Larger blocks
<Show when={props.extends}>extends {props.extends}</Show>;

// Ternary for multiple paths
{
  condition ? <A /> : <B />;
}
```

### 6. List Rendering

```tsx
// Use For component
<For each={items} comma space>  // comma-separated on same line
  {(item) => item.name}
</For>

<For each={items} hardline>     // line breaks between
  {(item) => <Item item={item} />}
</For>

<For each={items} comma hardline enderPunctuation>
  {(item) => item}
</For>
```

### 7. Formatting & Layout

```tsx
// Code templates (preserve structure)
code`
  function foo() {
    return ${expr};
  }
`

// Blocks with content
<Block>{props.children}</Block>

// Lists with separators
<List comma hardline enderPunctuation>
  {props.items.map(i => i)}
</List>

// Indentation
<Indent hardline={true}>
  {props.body}
</Indent>

// Groups (fit on one line if possible)
<group>
  {prop1}, {prop2}, {prop3}
</group>
```

### 8. Component Structure (Best Practice)

```tsx
// Props interface with JSDoc
export interface MyComponentProps {
  /** The name of the declaration */
  name: string | Namekey;

  /** Refkey for cross-file references */
  refkey?: Refkey;

  children?: Children;
}

// Component (don't destructure props!)
export function MyComponent(props: MyComponentProps) {
  // Create symbol with name policy
  const sym = createValueSymbol(props.name, {
    refkey: props.refkey,
    namePolicy: useNamePolicy().for("variable"),
  });

  return <Declaration symbol={sym}>{/* render */}</Declaration>;
}
```

### 9. Member Symbols in Classes

```tsx
export function ClassField(props: ClassFieldProps) {
  const owner = useMemberOwner();
  const spaceKey = props.static ? "static" : "instance";

  const member = createMemberSymbol(props.name, {
    refkey: props.refkey,
    space: owner.memberSpaceFor(spaceKey),
  });

  return (
    <MemberDeclaration symbol={member}>
      {props.public && "public "}
      {props.static && "static "}
      {props.name}: {props.type}
    </MemberDeclaration>
  );
}
```

### 10. External Symbols

```tsx
// Create package for external library
const fs = createPackage({
  name: "node:fs",
  descriptor: {
    ".": { named: ["readFile", "writeFile"] },
  },
});

// Reference auto-imports from external package
code`await ${fs.readFile}("file.txt")`;
// Renders: import { readFile } from "node:fs";
//          await readFile("file.txt")
```

## Rendering

```tsx
import { render, writeOutput } from "@alloy-js/core";

// Synchronous render
const output = render(
  <Output namePolicy={namePolicy}>{/* your components */}</Output>,
);

// Asynchronous (for TypeSpec parsing, etc.)
const output = await renderAsync(<Output>{/* your components */}</Output>);

// Write to disk
await writeOutput(output, "./dist");

// Individual files
output.forEach((file) => {
  console.log(file.path, file.contents);
});
```

## TypeScript Language Specifics

### Declaration Types

```tsx
// Value declarations (variables, functions, classes)
<ts.VarDeclaration name="x" const refkey={key} export>
  42
</ts.VarDeclaration>

<ts.FunctionDeclaration name="add" export refkey={key}>
  // body
</ts.FunctionDeclaration>

// Type declarations (interfaces, types, enums)
<ts.InterfaceDeclaration name="User" export refkey={key}>
  // members
</ts.InterfaceDeclaration>

<ts.TypeDeclaration name="ID" export refkey={key}>
  string | number
</ts.TypeDeclaration>

<ts.EnumDeclaration name="Status" export refkey={key}>
  // members
</ts.EnumDeclaration>
```

### Scopes

```tsx
// Package scope
<ts.PackageDirectory name="pkg-name" version="1.0.0">
  {/* modules */}
</ts.PackageDirectory>

// Module (source file with scope)
<ts.SourceFile path="models.ts" export="models.js">
  {/* declarations */}
</ts.SourceFile>

// Member scope (inside class/interface)
<ts.MemberScope ownerSymbol={classSymbol}>
  {/* members */}
</ts.MemberScope>

// Lexical scope (inside function)
<ts.LexicalScope>
  {/* declarations */}
</ts.LexicalScope>
```

### Member Symbols

```tsx
// Class field
<ts.ClassField name="id" type="string" public refkey={key} />

// Class method
<ts.ClassMethod name="getId" returns="string" public>
  return this.id;
</ts.ClassMethod>

// Class constructor
<ts.ClassConstructor parameters={[{ name: "id", type: "string" }]}>
  this.id = id;
</ts.ClassConstructor>

// Interface method
<ts.InterfaceMethod name="getId" returns="string" />

// Enum member
<ts.EnumMember name="ACTIVE" />
```

### References in TypeScript

```tsx
// Inline refkey for type reference
const user: { refkey(userSchema) };

// In code template
code`Promise<${refkey(successType)}>`;

// Member reference
{
  memberRefkey(classKey, propertyKey);
}

// Explicit with type context
<ts.TypeRefContext>
  <Reference refkey={typeKey} type />
</ts.TypeRefContext>;
```

## Common Patterns

### Input → Schema Validation

```tsx
// Define schema shape
interface ApiSpec {
  name: string;
  models: Array<{
    name: string;
    fields: Array<{ name: string; type: string }>;
  }>;
}

// Emit from schema
function EmitApi(props: { api: ApiSpec }) {
  return (
    <ts.SourceFile path="api.ts">
      <For each={props.api.models} hardline doubleHardline>
        {(model) => (
          <ts.InterfaceDeclaration
            export
            name={model.name}
            refkey={refkey(model)}
          >
            <For each={model.fields} comma hardline enderPunctuation>
              {(field) => (
                <ts.InterfaceMethod
                  name={field.name}
                  type={field.type}
                  readonly
                />
              )}
            </For>
          </ts.InterfaceDeclaration>
        )}
      </For>
    </ts.SourceFile>
  );
}
```

### Lazy Symbol Registration

```tsx
// For external libraries
export function createNodePackage() {
  const pkg = createPackage({
    name: "node:fs",
    descriptor: {
      ".": {
        named: ["readFile", "writeFile", "mkdir"],
      },
    },
  });

  // Symbols created lazily when referenced
  return {
    readFile: pkg.readFile,
    writeFile: pkg.writeFile,
    mkdir: pkg.mkdir,
  };
}
```

### Multi-File Emitter

```tsx
export async function emitClient(schema: ApiSpec) {
  const output = render(
    <Output>
      <ts.PackageDirectory name={`${schema.name}-client`} version="1.0.0">
        {/* Models file */}
        <ts.SourceFile path="models.ts">
          <For each={schema.models} hardline>
            {(model) => <Model model={model} />}
          </For>
        </ts.SourceFile>

        {/* Client file */}
        <ts.SourceFile path="client.ts" export=".">
          <ts.ClassDeclaration
            export
            name={`${schema.name}Client`}
            refkey={refkey(schema)}
          >
            <For each={schema.operations} hardline>
              {(op) => <Operation operation={op} />}
            </For>
          </ts.ClassDeclaration>
        </ts.SourceFile>

        {/* Barrel export */}
        <ts.BarrelFile export="." />
      </ts.PackageDirectory>
    </Output>,
  );

  await writeOutput(output, "./dist");
}
```

## Debugging

```tsx
// Enable devtools in render
const output = render(<App />, {
  devtools: { enabled: true },
});

// Inspect a symbol
import { inspect } from "@alloy-js/core";
console.log(inspect(symbol));

// Check refkey resolution
const result = resolve(myRefkey);
console.log("Symbol:", result.value?.symbol.name);
console.log("Path:", result.value?.pathDown);
```

## File Organization

```
my-emitter/
├── src/
│   ├── index.tsx              # Main entry point
│   ├── components/
│   │   ├── Model.tsx
│   │   ├── Client.tsx
│   │   └── Operation.tsx
│   ├── context/
│   │   └── api.ts             # Context setup
│   └── schema.ts              # Input type definitions
├── test/
│   ├── vitest.setup.ts
│   └── emitter.test.tsx
└── package.json
```

## Testing

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

describe("MyEmitter", () => {
  it("emits a class", () => {
    const [output, file] = render(
      <ts.SourceFile path="test.ts">
        <ts.ClassDeclaration name="User" export>
          <ts.ClassField name="name" type="string" public />
        </ts.ClassDeclaration>
      </ts.SourceFile>,
    );

    expect(file.contents).toContain("export class User");
    expect(file.contents).toContain("name: string");
  });
});
```

---

See `ALLOY_DEEP_DIVE.md` for comprehensive explanation of core concepts, architecture, and language package implementation.
