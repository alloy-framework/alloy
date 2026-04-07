# Context

Dependency injection through the component tree via the reactive owner chain, similar to React's Context API.

## Creating a Context

```ts
import { ComponentContext, createContext, useContext } from "@alloy-js/core";

interface SectionContext {
  level: number;
}

const SectionContext: ComponentContext<SectionContext> =
  createContext<SectionContext>({ level: 1 });
```

See [`createContext`](api/functions/createContext.md), [`ComponentContext`](api/types/ComponentContext.md).

The argument is the default value when no provider is found.

## Providing Values

```tsx
<SectionContext.Provider value={{ level: 2 }}>
  <MyComponent />
</SectionContext.Provider>
```

## Consuming Values

```ts
function MyComponent() {
  const section = useContext(SectionContext);
}
```

[`useContext`](api/functions/useContext.md) walks the owner chain (not the JSX tree) to find the nearest provider.

## Built-in Contexts

| Context                                                             | Provides                              | Set by                                                                       |
| ------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| [`BinderContext`](api/contexts/Binder-context.md)                   | The binder instance                   | [`<Output>`](api/components/Output.md)                                       |
| [`ScopeContext`](api/contexts/Scope-context.md)                     | Current `OutputScope`                 | [`<Scope>`](api/components/Scope.md), [`<Output>`](api/components/Output.md) |
| [`DeclarationContext`](api/contexts/Declaration-context.md)         | Current `OutputSymbol` being declared | [`<Declaration>`](api/components/Declaration.md)                             |
| [`MemberContext`](api/contexts/Member-context.md)                   | Owner symbol for new members          | [`<MemberScope>`](api/components/MemberScope.md)                             |
| [`SourceFileContext`](api/contexts/SourceFile-context.md)           | Current source file                   | [`<SourceFile>`](api/components/SourceFile.md)                               |
| [`SourceDirectoryContext`](api/contexts/SourceDirectory-context.md) | Current source directory              | [`<SourceDirectory>`](api/components/SourceDirectory.md)                     |
| [`NamePolicyContext`](api/contexts/NamePolicy-context.md)           | Name policy                           | [`<Output>`](api/components/Output.md)                                       |

## Format Options Context

[`createFormatOptionsContextFor<T>(filetype, defaults?)`](api/functions/createFormatOptionsContextFor.md) creates a provider/consumer pair for language-specific formatting options (e.g., brace style, indentation). Returns `{ Provider, useFormatOptions }`.

The `Provider` accepts a value typed as `T` (not `Partial<T>`), so TypeScript requires all non-optional fields. At runtime, the Provider value is spread-merged over `defaults`, overriding each key it supplies. Use `useFormatOptions(overrides?)` for per-call partial overrides — it accepts `Partial<T>` and merges onto current effective options. Undefined override values are ignored.

Merge precedence: `defaults` (lowest) → Provider `value` (full T) → `useFormatOptions(overrides?)` (highest).

## Structuring Custom Contexts

When defining a new context, co-locate these pieces:

- **Interface** — the shape of the context value (e.g., `SourceFileContext`, `NamespaceContext`).
- **Context variable** — created with `createContext()` or `createNamedContext()`.
- **`use` function** — wraps `useContext()` with defaults (e.g., `useSourceFile()`, `useNamespaceContext()`).
- **Provider component** (when needed) — e.g., format options contexts.
