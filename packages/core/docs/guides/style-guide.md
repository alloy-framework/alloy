# Alloy JSX Style Guide

Idiomatic patterns for writing Alloy JSX components. Alloy JSX is **not** React — it renders to source code text, not DOM elements. Do not use HTML elements like `<div>`, `<span>`, etc.

## String Content

Use plain string children or the `code` template tag. **Never** wrap string literals in expression braces.

```tsx
// ✅ Good — plain text children
<Declaration>hello world</Declaration>;

// ✅ Good — code template for interpolation
code`Promise<${returnType}>`;

// ✅ Good — code template for multi-line structured output
return code`
  <?xml version="1.0" encoding="UTF-8"?>
  <project>
    ${children}
  </project>
`;

// ❌ Bad — unnecessary expression wrapper around a string
<Declaration>{"hello world"}</Declaration>;
```

Use `code` template tags for any output that mixes static text with interpolated expressions. Use plain template literals only for inline fragments that won't appear directly in rendered output (e.g. computing a variable).

When you introduce a JSX line break only for source formatting, preserve any rendered space that should still exist at that boundary with `{' '}`:

```tsx
// ✅ Good — line break is only for formatting, so keep the rendered space explicit
<>
  Hello{' '}
  world
</>

// ❌ Avoid — the line break removed the intended space between words
<>
  Hello
  world
</>
```

## Conditional Rendering

Use `{condition && content}` for short inline content like keywords, punctuation, or modifiers:

```tsx
// ✅ Good — short conditional modifier
{
  props.async && "async ";
}
{
  props.nullable && "?";
}
{
  !props.children && ";";
}
```

Use `<Show when={}>` for larger conditional blocks:

```tsx
// ✅ Good — conditional block with Show
<Show when={!!param.type}>
  : <TypeSlot>{param.type}</TypeSlot>
</Show>;

// ❌ Avoid — large conditional blocks with &&
{
  props.typeParameters && (
    <TypeParameterList parameters={props.typeParameters} />
  );
}
```

## Boolean Props

Use shorthand for literal `true` values. Use explicit expressions when the value is conditional:

```tsx
// ✅ Good — shorthand for literal true
<For each={items} comma hardline enderPunctuation>

// ✅ Good — explicit expression when conditional
<Indent
  hardline={!props.inline && hasContent}
  softline={props.inline || isEmpty}
  trailingBreak
>
```

## List Rendering

Use `<For each={}>` to render lists in output. Use `.map()` only for transforming data before rendering:

```tsx
// ✅ Good — For in render output
<For each={props.model.properties} comma hardline enderPunctuation>
  {(prop) => <Property property={prop} />}
</For>;

// ✅ Good — .map() for data transformation
const parameters = (props.parameters as string[]).map((name) => ({
  name,
  type: undefined,
}));
```

## Fragments

Use `<>...</>` to combine adjacent pieces of output without a wrapper. Prefer `code` template tags when the content is primarily text with interpolation:

```tsx
// ✅ Good — fragment for combining JSX pieces
<>
  {extendsClause}
  {implementsClause}
</>;

// ✅ Good — code template when mixing text and expressions
code`extends ${baseClass}`;
```

## Props

Do not destructure props. Access them as `props.x`:

```tsx
// ✅ Good
export function MyComponent(props: MyComponentProps) {
  return (
    <Declaration name={props.name} refkey={props.refkey}>
      {props.children}
    </Declaration>
  );
}

// ❌ Bad — destructured props break reactivity
export function MyComponent({ name, refkey, children }: MyComponentProps) {
  // ...
}
```

Use `splitProps` to separate props for forwarding:

```tsx
const [rest, forProps] = splitProps(props, ["children"]);
```

## Reactivity

Use `computed()` for reactive derived values. Use `memo()` for memoizing children or component expressions:

```tsx
// ✅ Good — computed for a reactive signal
const keyword = computed(() => (props.const ? "const" : "var"));

// ✅ Good — memo for memoizing rendered children
const resolvedChildren = memo(() =>
  childrenArray(() => props.children, { preserveFragments: true }),
);
```

## Component Return Patterns

Choose your return style based on the content:

- **JSX** for structural component trees
- **`code` template** for text-heavy structured output
- **`memo()`** wrapping reactive logic that determines what to render

```tsx
// JSX return
export function MyComponent(props: MyComponentProps) {
  return (
    <Declaration name={props.name}>
      <Indent hardline trailingBreak>
        {props.children}
      </Indent>
    </Declaration>
  );
}

// code template return
export function XmlElement(props: XmlElementProps) {
  return code`
    <${props.tag}>
      ${props.children}
    </${props.tag}>
  `;
}

// memo return for reactive branching
export function ValueExpression(props: ValueExpressionProps): Children {
  return memo((): Children => {
    if (Array.isArray(props.jsValue)) {
      return <ArrayExpression jsValue={props.jsValue} />;
    }
    return String(props.jsValue);
  });
}
```

## Symbols and References

Use `refkey()` to capture symbols and reference them across files:

```tsx
// Creating a declaration with a refkey
<InterfaceDeclaration name={props.model.name} refkey={refkey(props.model)}>
  <For each={props.model.properties} comma hardline enderPunctuation>
    {(prop) => <InterfaceMember name={prop.name} type={prop.type} />}
  </For>
</InterfaceDeclaration>;

// Referencing the symbol elsewhere (auto-resolves name and imports)
code`Promise<${refkey(responseModel)}>`;
```

## Component File Organization

Structure component files as: imports, props interface, component function.

```tsx
import { Children, code, refkey } from "@alloy-js/core";
import { Declaration } from "@alloy-js/typescript";

export interface MyComponentProps {
  name: string;
  children?: Children;
}

export function MyComponent(props: MyComponentProps) {
  return <Declaration name={props.name}>{props.children}</Declaration>;
}
```

- File names use `kebab-case` (e.g. `my-component.tsx`)
- Component names use `PascalCase`
- Props interfaces are named `<ComponentName>Props`
- Annotate return type as `Children` when the return is non-trivial
