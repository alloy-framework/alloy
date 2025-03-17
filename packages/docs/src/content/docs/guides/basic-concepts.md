---
title: Basic concepts
description: Key concepts to understand how alloy works
---

## Components

Components are JavaScript functions that receive parameters (called props) that
are provided by the user of the component. The component then does computation
based on these props and the component's context, and returns children which
represent the component's contents. Components may also receive a prop named
`children` which allows component users to provide children that should be
placed somewhere within the component.

```tsx
interface SayHelloProps {
  name: string;
}

function SayHello(props: SayHelloProps) {
  return (
    <>
      Hello {props.name}!
    <>
  );
}

const text = <SayHello name="Brian">);
renderString(text) // "Hello Brian"
```

The example above uses JSX syntax to define and reference components, but you
can use string template literals as well. However, when using string templates,
you must use the `code` string template tag, and you cannot call the component
directly. Instead, the component must be wrapped into a string template
component. You can import string template components from e.g.
`@alloy-js/core/stc` or `@alloy-js/typescript/stc`. You can also import the
`stc` function to create this wrapper for your own components:

```tsx
interface SayHelloProps {
  name: string;
}

function SayHello(props: SayHelloProps) {
  return code`
    Hello ${props.name}!
  `
}

const SayHelloStc = stc(SayHello);

const text = SayHelloStc({ name: "Brian" });
renderString(text) // "Hello Brian"
```

## Context

It is often useful for a component to expose data to components that are nested
underneath. This can be done by passing props, but props are burdensome when the
component which needs the data is deeply nested. Instead, your component can
create and provide context via `createContext()`, and any nested components can
retrieve that context via `useContext()`.

```tsx
// context interface
export interface NameContext {
  name: string
}

// context variable
export const NameContext = createContext<NameContext>();

function Person(props) {
  // context provider
  return <NameContext.Provider value="Brian">
    {props.children}
  </NameContext.Provider>
}

// in some other component
function Greeting(props) {
  // context accessor
  const name = useContext(NameContext);

  return <>Hello {name}</>;
}
```

This example demonstrates the four components of the context system:

1. The context interface: The data type for context values. Often an interface but may be any kind of value.
1. The context variable: context is declared using `createContext`, providing the context interface, and exporting the resulting value.
2. The context provider: the context variable has a `Provider` member which is a component that allows setting the context value for any children of the `Provider`.
3. The context accessor: `useContext` is passed the context variable and the current context value is retrieved. Some frequently used contexts may also provide a specific context accessor, such as `useScope` or `useNamePolicy`.

Many of the built-in components provide context. For example, `Output` provides the binder, `SourceDirectory` provides directory metadata, `Declaration` provides the current declaration.

## Declarations and references

When you create a declarations, you need to provide the declaration name, and optionally a refkey. Some declarations may have additional props to control things like whether its exported or private. The name you provide may look different in the output depending on your situation, for example a name policy may turn camelCase names into snake_case, or a conflict with another like-named declaration might disambiguate one or the other with a number. 

One of the more challenging bits of doing codegen is generating references to things you've declared. Alloy makes this painless with refkeys. A refkey is a unique identifier for a symbol you declare in your output code. When you reference a refkey, Alloy calculates the necessary reference syntax along with any imports, package dependencies, or other such things needed for the reference to work.

You can create a refkey by calling `refkey()`. Every time this function is called with no arguments, you get a new refkey.

Often you want to create a declaration for a JavaScript value you're holding, like a schema you're converting to source text. In these cases, you don't need to pass along the refkey separately. Instead, you can call `refkey(schemaObj)`, and you'll get the same refkey whenever you pass the same schema.

Sometimes you might want to emit multiple declarations for the same schema, and in these cases you can pass multiple params to refkey, for example `refkey(schemaObj, "deserialize")` and `refkey(schemaObj, "serialize")`.

## Reactivity

Alloy uses fine-grained reactivity to update the rendered source code as the
tree is being built. This is achieved by depending on the emerging standard for
Signals as implemented in the `@vue/reactivity` library. With Signals, you can
read and update data normally, and anything that depends on that data will also
update. This is how things like TypeScript's barrel file works - the barrel file
maps the current files in the directory to a list of import statements, and
because the list of current files is reactive, whenever it changes, the list of
imports change.

There are two primary ways to create a reactive data -
[`ref`](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref) and
[`reactive`](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive).
`ref` creates a single data cell whose value you can get and update by via
`ref.value`. `reactive` turns an entire object into a reactive object but does
not work on non-objects and you cannot reassign the object.

In order for reactive data to propagate, you must observe reactive data in a
reactive context. Generally speaking, this is within a JSX template, or inside
the callback of a `memo` or `computed`. Note that the non-JSX code within a
component function is **not** reactive, so it is best to avoid reading reactive
data there.

```tsx
interface ChildCounterContext {
  increment(): void;
}
const ChildCounterContext = createContext<ChildCounterContext>();

function ChildCounter() {
  const numChildren = ref(0);

  // this will always be 0 and never update because this is not
  // a reactive context.
  const initialValue = numChildren.value;

  // however its fine to make changes
  const context: ChildCounterContext = {
    increment() {
      numChildren.value++;
    }
  }

  return <ChildCounterContext.Provider value={context}>
    Number of children: {numChildren}
    <Child />
    <Child />
  </ChildCounterContext.Provider>
}

function Child() {
  const childContext = useContext(ChildCounterContext)!;
  childContext.increment();
  return "child";
}

renderString(<ChildCounter />);
// Number of children: 2
// child
// child
```

The two primary ways to compute values that depend on other reactive values are `memo` and `computed`. `memo` returns a function which when called gives the current value of the computation.  Computations which depend on the memo are only updated when the memoized value changes. `computed` returns a `ref`, and the `ref` is updated whenever the computation is run. Generally, `memo` is preferred. Whichever you use, when embedded within JSX or within `code`-tagged string templates, the value will be unwrapped, so no need to call the memo or access `.value` on a `ref`.

```ts
function MemoExample() {
  const v = ref(2);
  const twiceValue = memo(() => v.value * 2);
  const fourTimesValue = computed(() => twiceValue() * 2);

  return <>
    value: {v}
    twiceValue: {twiceValue}
    fourTimesValue: {squaredValue}
  </>
}

renderString(<MemoExample />);
// value: 1
// twiceValue: 2
// fourTimesValue: 4
```

## Formatting

Line breaks are ignored within JSX templates and the `text` string template tag,
and contiguous chunks of whitespace are replaced with a single space. This works
similarly to HTML. To control the formatting of the emitted output, various
formatting intrinsic elements are used to format source text according to the
formatting configuration for a particular output or source file.

Note that, for many situations, you won't need to use these formatting elements
directly. Components provided by core like `Indent`, `Block`, `List`, and `For`
generally handle most formatting for you. Additionally, built-in language
components like `IfStatement`, `Switch`, and so on handle formatting as well. 

The most common formatting intrinsic elements are:

### Line breaks

Alloy has four distinct kinds of line breaks:

* `<hardline />`, `<hbr />` - hard line breaks. Always printed as a line break.
* `<softline />`, `<sbr />` - soft line breaks. Printed as a line break if the
  current group exceeds the configured line width, and otherwise printed as
  nothing.
* `<literalline />`, `<lbr />` - literal line breaks. Always printed as a
  linebreak and ignores the indentation level for the next line.
* `<line />`, `<br />` - regular line breaks. Printed as a line break if the
  current group exceeds the configured line width, and otherwise is printed as a
  space.

  Alloy attempts to fit all the text inside a `<group>` on a single line if
  possible. If the current group cannot fit on a single line, then all line
  breaks in the group are printed as line breaks. The `<fill>` element behaves
  similar to `<group>` except only regular line breaks at the end of a line are
  printed as line breaks, making it useful for formatting text.

### Indentation

* `<indent>` - increase the indent level by one.
* `<dedent>` - decrease the dedent level by one.
* `<dedentToRoot>` - decrease the indent level to the root indentation level, which is either no indent or the indent level set by `<markAsRoot />`.
* `<align width={number} string={string}>` - increase the indent by the given
  width or with the given string prefix.

### Conditional formatting

* `<indentIfBreak groupId={symbol} negate={boolean}>` - indent the group if a previously printed group is broken (or if it isn't broken when passing `negate`).
* `<ifBreak groupId={symbol} flatContents={Children}>` - if the current group (or group referenced by the given `groupId`) is broken, print the children. Otherwise, print `flatContents`.

### `code` content

The `code` template tag is akin to the `<code>` HTML element in that it
preserves linebreaks. It also normalizes indentation. Whitespace is processed
according to the following rules:

**Any leading and trailing line breaks are ignored**

```jsx
renderString(code`
x
`); // "x"
```

**The first significant line sets the base indent**

```jsx
renderString(code`
  x
  y
`); // "x\ny"
```

**Lines which increase indent set indent level for any contents on that line**

```jsx
renderString(code`
  base
    ${code`a\nb`}
`);
// base
//   a
//   b
```