# References & Refkeys

Alloy's refkey system lets you declare named symbols and reference them across files. When a reference is rendered, Alloy automatically computes the correct name, generates any needed imports, and handles name conflicts.

## Creating Refkeys

A **refkey** uniquely identifies a symbol. Create one with `refkey()`:

```ts
import { refkey } from "@alloy-js/core";

// Unique refkey (different every call)
const myKey = refkey();

// Seeded refkey (same args → same refkey)
const modelKey = refkey(schemaObject);
```

Seeded refkeys are the most common pattern. When you're generating code from input data (like a schema), pass the data object to `refkey()` and you'll always get the same key for the same object. This means you don't need to pass refkeys around — any code that has the original data object can recreate the same refkey.

### Composite Refkeys

Pass multiple arguments to create a composite key when you need multiple declarations for the same input:

```tsx
// Two declarations from the same schema
<Declaration name="UserInput"  refkey={refkey(userSchema, "input")} />
<Declaration name="UserOutput" refkey={refkey(userSchema, "output")} />
```

Arguments are compared by identity for objects and by value for primitives. The order matters — `refkey(a, b)` is different from `refkey(b, a)`.

## Declaring Symbols

Pass a refkey to a declaration component to register a symbol:

```tsx
<Declaration name="getUser" refkey={refkey(getUserOp)}>
  {body}
</Declaration>
```

The declaration component creates a symbol in the current scope, associated with that refkey. Other components can then reference it by the same refkey.

## Referencing Symbols

There are two ways to reference a declared symbol.

### Inline Refkeys in JSX

The simplest approach: use a refkey directly as a JSX child.

```tsx
<SourceFile path="client.ts">
  const user = await {refkey(getUserOp)}();
</SourceFile>
```

When a refkey appears as a JSX child, Alloy resolves it through the current source file's `reference` function. This renders the symbol's name and, if the declaration is in a different file or package, automatically generates the necessary import statement.

The above might render:

```ts
import { getUser } from "./api.js";

const user = await getUser();
```

### The Reference Component

Each language package provides a `Reference` component for explicit control:

```tsx
import { Reference } from "@alloy-js/typescript";

<Reference refkey={refkey(model)} type />;
```

The `type` prop (TypeScript-specific) generates `import type` instead of `import`. Most of the time inline refkeys are sufficient — use `Reference` when you need language-specific options.

### Refkeys in `code` Templates

Refkeys work inside `code` template expressions too:

```tsx
code`someExpression(${refkey(responseModel)})`;
```

This resolves the refkey and splices the rendered name into the output.

## Namekeys

A **namekey** is a special refkey that also carries a name and naming options. Use it when you want to both name and reference a symbol in one value:

```tsx
import { namekey } from "@alloy-js/core";

const myClass = namekey("MyClass");

return (
  <>
    <Declaration name={myClass}>{/* ... */}</Declaration>
    {myClass}
  </>
);
```

This renders a declaration named `MyClass` and a reference to it. The namekey serves as both the `name` prop and a refkey.

### Name Policy Bypass

Namekeys can opt out of the language's name policy or conflict resolution:

```tsx
// Keep the exact name, don't apply camelCase/snake_case transforms
const specialName = namekey("$internal", { ignoreNamePolicy: true });

// Don't disambiguate if another symbol has the same name
const fixedName = namekey("toString", { ignoreNameConflict: true });
```

### Refkey vs. Namekey

|                | `refkey()`                           | `namekey()`                                  |
| -------------- | ------------------------------------ | -------------------------------------------- |
| **Purpose**    | Identify a symbol by its source data | Identify + name a symbol                     |
| **Name**       | Set separately via `name` prop       | Carried in the namekey                       |
| **Uniqueness** | Same args → same key                 | Always unique (like `refkey()` with no args) |
| **Use when**   | Generating from input data           | Generating fixed/known names                 |

Use `refkey(data)` when you're mapping input data to declarations — this is the common case. Use `namekey()` when you're creating declarations with known names that don't come from input data.

## Member Refkeys

Use `memberRefkey()` to reference a member of a symbol — for example, an instance property of a class:

```ts
import { memberRefkey } from "@alloy-js/core";

const classKey = refkey(myClass);
const propKey = memberRefkey(classKey, refkey(myClass, "id"));
```

Member refkeys resolve through the language's member resolution system, which handles things like `this.id` inside a class vs. `instance.id` outside.

## Cross-File References

Refkeys work across files automatically. When you reference a symbol declared in another file, the language package generates the necessary import:

```tsx
<SourceFile path="models.ts">
  <Declaration name="User" refkey={refkey(userSchema)}>
    {/* language-specific declaration body */}
  </Declaration>
</SourceFile>

<SourceFile path="client.ts">
  const user: {refkey(userSchema)} = await fetchUser();
</SourceFile>
```

The language package handles the import generation. For example, in TypeScript `client.ts` renders with an auto-generated import:

```ts
import { User } from "./models.js";

const user: User = await fetchUser();
```

This works across packages too — Alloy resolves the correct package name and path.

**Order doesn't matter.** References can appear before their declarations in the component tree. Alloy resolves everything reactively, so forward references work naturally.

## External Package Symbols

Language packages provide helpers like `createPackage()` (TypeScript) or `createModule()` (Python) to declare symbols from external libraries that your generated code imports:

```ts
import { createPackage } from "@alloy-js/typescript";

const node = createPackage({
  name: "node:path",
  descriptor: {
    ".": { named: ["join", "resolve", "dirname"] },
  },
});

// Reference in a component — auto-generates: import { join } from "node:path"
code`${node.join}("a", "b")`;
```

These symbols aren't declared in the output tree — they exist only in the binder's symbol table and generate imports when referenced.

## How Resolution Works

When a refkey is encountered during rendering:

1. The render pipeline detects the refkey (via `isRefkeyable()` check)
2. It calls `sourceFile.reference({ refkey })` — the reference function provided by the language package's SourceFile component
3. The language's `ref()` function calls `resolve()` from core, which searches the scope tree for the symbol matching the refkey
4. Based on where the symbol is relative to the reference (local, different module, different package), the language package renders the appropriate syntax and generates any needed imports
5. The result is reactive — if the symbol moves or is renamed, the reference updates automatically

## Best Practices

- **Seed refkeys from input data** — `refkey(schemaObj)` is better than passing refkeys around manually.
- **Use composite keys for disambiguation** — `refkey(schema, "input")` vs `refkey(schema, "output")` when one input maps to multiple declarations.
- **Use inline refkeys** (`{refkey(...)}` in JSX) for most references — simpler than `<Reference>`.
- **Use `namekey` sparingly** — only when the name is known ahead of time and not derived from input data.
- **Export declarations that need cross-file references** — a symbol must be reachable through the scope tree to be referenced.
