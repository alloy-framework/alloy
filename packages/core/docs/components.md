# Components

Alloy uses a custom JSX transform similar to Solid.js. JSX compiles to `createComponent()` calls — components run once and return reactive [Children](api/types/Children.md).

## Defining Components

```tsx
import { Children } from "@alloy-js/core";

interface GreetingProps {
  name: string;
}

function Greeting(props: GreetingProps) {
  return <>Hello, {props.name}!</>;
}
```

> **Important:** Do not destructure props. Props are reactive getters — destructuring breaks reactivity.

## Children

[`Children`](api/types/Children.md) is the universal return type. It encompasses strings, numbers, `Ref` values, refkeys, arrays, [`ComponentCreator`](api/types/ComponentCreator.md)s, intrinsic elements, and objects implementing [`RENDERABLE`](api/variables/RENDERABLE.md).

`children` is a reserved prop for nested JSX content:

```tsx
function Wrapper(props: { children?: Children }) {
  return <>({props.children})</>;
}
```

### Children Utilities

- [`childrenArray(fn, options?)`](api/functions/childrenArray.md) — resolves `Children` into a flat array.
- [`findKeyedChild(children, tag)`](api/functions/findKeyedChild.md) — finds a tagged child by its tag symbol.
- [`findUnkeyedChildren(children)`](api/functions/findUnkeyedChildren.md) — returns all non-tagged children.

### Tagged Children

[`taggedComponent(tag, component)`](api/functions/taggedComponent.md) marks a component with a symbol tag, enabling structured child decomposition:

```tsx
const bodyTag = Symbol();
const Body = taggedComponent(bodyTag, (props: { children: Children }) => {
  return props.children;
});

function MyComponent(props: { children: Children }) {
  const kids = childrenArray(() => props.children);
  const body = findKeyedChild(kids, bodyTag);
  const rest = findUnkeyedChildren(kids);
  return (
    <>
      {rest}
      {body}
    </>
  );
}
```

## The RENDERABLE Protocol

Any object can participate in rendering by implementing [`[RENDERABLE](): Children`](api/variables/RENDERABLE.md).

## Props Utilities

- [`mergeProps(...sources)`](api/functions/mergeProps.md) — reactive merge (last source wins).
- [`splitProps(props, ...keyGroups)`](api/functions/splitProps.md) — split by key groups, preserving reactivity.
- [`defaultProps(props, defaults)`](api/functions/defaultProps.md) — apply defaults, preserving reactive getters.

## Taps

Taps let a parent component access context provided by its children. [`createTap()`](api/functions/createTap.md) returns a component and a reactive ref — render the component inside the child tree, read the ref from the parent. Specialized variants:

- [`createDeclarationTap()`](api/functions/createDeclarationTap.md) — taps [`DeclarationContext`](api/contexts/Declaration-context.md).
- [`createMemberTap()`](api/functions/createMemberTap.md) — taps [`MemberDeclarationContext`](api/contexts/MemberDeclaration-context.md).
- [`createScopeTap()`](api/functions/createScopeTap.md) — taps the current scope.
- [`createSourceFileTap()`](api/functions/createSourceFileTap.md) — taps [`SourceFileContext`](api/contexts/SourceFile-context.md).

## `stc()` — Static Template Composition

[`stc(Component)`](api/functions/stc.md) wraps a component into a callable creator with `.code()`, `.text()`, and `.children()` methods. This enables fluent composition without JSX:

```ts
const M = stc(MyComponent);

// These are equivalent:
M({ name: "hello" }).code`// ...`;
<MyComponent name="hello">// ...</MyComponent>
```

- `.code(template)` — sets children via a code template literal.
- `.text(template)` — sets children via a text template literal.
- `.children(...children)` — sets children directly.

Language packages export stc-wrapped versions of key components from a `stc/` subpath.
