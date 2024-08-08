## Alloy

Alloy is a framework for code generation that borrows concepts from JavaScript
front-end frameworks like React and Solid to provide highly ergonomic and
productive source code generation. Use JSX syntax or string templates to define
source files and the language elements within them. Alloy helps handle a lot of
the hard bits like building source text from strings, linking declarations and
importing necessary dependencies, applying naming conventions, formatting, and
generating syntax for a number of languages.

```tsx
import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

const helloWorldRef = ay.refkey();

const res = ay.render(
  <ay.Output>
    <ay.SourceFile path="readme.md" filetype="markdown">
      This is a sample output project.
    </ay.SourceFile>

    <ts.SourceFile path="test1.ts">
      <ts.VarDeclaration export name="foo" refkey={helloWorldRef}>
        "Hello world"
      </ts.VarDeclaration>
    </ts.SourceFile>

    <ts.SourceFile path="test2.ts">
      <ts.VarDeclaration name="v">
        {helloWorldRef}
      </ts.VarDeclaration>
      console.log(v);
    </ts.SourceFile>
  </ay.Output>
);

console.log(res[2].contents);
// import { foo } from "./test2.ts";
//
// const v = foo;
```

This project is in pre-beta. Expect everything to change. Feedback is especially
appreciated. The docs are not great but are being worked on.

### Dependencies

- pnpm
- node 20+

### Installation

[Use this template to get started](https://github.com/alloy-framework/alloy-project-template).

Alternatively, you can find the latest packages on GitHub by clicking the green checkbox next to the latest commit and clicking "details" next to Continuous Releases. Alloy will be published to NPM in the coming weeks.

### Building

Clone the repo, then:

```bash
> pnpm install
> pnpm build
```

### Supported Languages

* TypeScript: @alloy-js/typescript

More are coming soon.

## Main APIs

* `@alloy-js/core`
  * Components:
    * `Declaration`: Create a declaration. May either pass `symbol` with the
      symbol of the declaration, or else can pass `name` and `refkey` and a
      generic symbol is created. Provides `DeclarationContext`.
    * `Indent`: Indents its contents one level. Provides `IndentContext`.
    * `Output`: The top-level Alloy component. Pass `namePolicy` to provide the
      name policy for all your declared names. Pass `externals` to provide
      external symbols. Provides `NamePolicyContext` and `BinderContext`.
    * `Scope`: Create a scope which symbols can be declared in. May either pass
      `value` to provide the scope object, or else pass `name` and `type` and a
      scope will be created. Provides `ScopeContext`.
    * `SourceDirectory`: A directory in your output. Pass `path` to set the
      relative path of the directory. Provides `SourceDirectoryContext`.
    * `SourceFile`: A file in your output. Pass `path` to set the relative path
      of the file. Pass `filetype` to set the file type to any string. Provides
      `SourceFileContext`.
  * APIs:
    * `code`: A template literal tag for output source text.
    * `createContext`: Create a context object.
    * `createNamePolicy`: Create a name policy. Provide to the `namePolicy` prop of `Output`.
    * `useContext`: Get the value of the provided context object.
    * `useBinder`: Get the current binder.
    * `useScope`: Get the current scope.
    * `useNamePolicy`: Get the current name policy.
    * `stc(component: ComponentDefinition)`: Wrap a functional component for use
      in string templates.
    * Reactive utilities: `ref`, `shallowRef`, `reactive`, `shallowReactive`,
      `memo`, `computed`, `effect`, `untrack`.
* `@alloy-js/core/stc`: String template components for all the core components.
* `@alloy-js/typescript`
  * APIs:
    * `createPackage(descriptor)`: Create symbols for an external package, such
      as a dependency from npm. Pass the result to the `externals` prop of the
      `Output` component.
    * `node`: Symbol definitions for node built-ins. Pass any you use to the
      `externals` prop of the `Output` component.
  * Components
    * Structure
      * `BarrelFile`: Create a file which exports all the files contained within
        the current directory.
      * `PackageDirectory`: A directory for a package. Generates a `package.json`
        and `tsconfig.json` that are updated depending on the package contents.
      * `SourceFile`: A TypeScript module source file. Pass `export` to export the
        source file from the current package (sets package.json exports). The
        source file will import anything referenced within it.
    * Declarations
      * `Declaration`: Declares a symbol in the current scope. Pass `export` or
        `default` to control how this symbol is exported from the module.
        `children` are the syntax for the declaration. All declaration forms take
        these props.
      * `FunctionDeclaration`: Declares a function. Pass `parameters` or
        `returnType` to set those. `children` is the function body.
      * `InterfaceDeclaration`: Declares an interface. Define members by putting
        `InterfaceMember` in the children.
      * `TypeDeclaration`: A TypeScript type declaration. `children` is the
        initializer of the declaration.
      * `VarDeclaration`: Declares a const, let, or var. `children` is the
        initializer.
    * Expressions
      * `ArrayExpression`: A JavaScript array literal. Pass `jsValue` to populate
        it with data.
      * `ObjectExpression`: A JavaScript object literal. Pass `jsValue` to
        populate it with data, or pass `children` with `ObjectProperty`s.
      * `Reference`: Create a reference to a declaration. Pass the `refkey` of the
        declaration.
      * `ValueExpression`: A JavaScript value. Pass `jsValue` to populate it with
        data. Handles any JSON value.
* `@alloy-js/typescript/stc`: String template components for all the TypeScript
  components. 

## Basic Concepts

### Components

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
directly. Instead, the component must be wrappe into a string template
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

### Context

It is often useful for a component to expose data to components that are nested
underneath. This can be done by passing props, but props are burdensome when the
component which needs the data is deeply nested. Instead, your component can
create and provide context via `createContext()`, and any nested components can
retrieve that context via `useContext()`.

```tsx
export interface NameContext {
  name: string
}

export const NameContext = createContext<NameContext>();

function Person(props) {
  return <NameContext.Provider value="Brian">
    {props.children}
  </NameContext.Provider>
}

// in some other component
function Greeting(props) {
  const name = useContext(NameContext);

  return <>Hello {name}</>;
}
```

Many of the built-in components provide context. For example, `Output` provides the binder, `SourceDirectory` provides directory metadata, `Declaration` provides the current declaration.

### Declarations and references

When you create a declarations, you need to provide the declaration name, and optionally a refkey. Some declarations may have additional props to control things like whether its exported or private. The name you provide may look different in the output depending on your situation, for example a name policy may turn camelCase names into snake_case, or a conflict with another like-named declaration might disambiguate one or the other with a number. 

One of the more challenging bits of doing codegen is generating references to things you've declared. Alloy makes this painless with refkeys. A refkey is a unique identifier for a symbol you declare in your output code. When you reference a refkey, Alloy calculates the necessary reference syntax along with any imports, package dependencies, or other such things needed for the reference to work.

You can create a refkey by calling `refkey()`. Every time this function is called, you get a new refkey.

Often you want to create a declaration for a JavaScript value you're holding, like a schema you're converting to source text. In these cases, you don't need to pass along the refkey separately. Instead, you can call `refkey(schemaObj)`, and you'll get the same refkey whenever you pass the same schema.

Sometimes you might want to emit multiple declarations for the same schema, and in these cases you can pass multiple params to refkey, for example `refkey(schemaObj, "deserialize")` and `refkey(schemaObj, "serialize")`.

### Reactivity

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

### Whitespace Rules

Whether using JSX or string templates, whitespace is processed according to the
following rules:

**Any leading and trailing line breaks are ignored**

```jsx
renderString(<>
x
</>); // "x"
```

**The first significant line sets the base indent**

```jsx
renderString(<>
  x
  y
</>); // "x\ny"
```

**Lines which increase indent set indent level for any contents on that line**

```jsx
renderString(<>
  base
    {"a\nb"}
</>);
// base
//   a
//   b
```
