# Symbols & Scopes

Alloy's symbol system models declarations, references, and name resolution — the same concepts found in compilers, adapted for code generation.

## Overview

The [**binder**](api/contexts/Binder-context.md) is the central registry, set up by [`<Output>`](api/components/Output.md). It tracks scopes and symbols. Scopes form a tree mirroring the output structure; each symbol lives in a scope and is identified by one or more [**refkeys**](api/types/Refkey.md). When a refkey appears in JSX, the binder resolves it to the target symbol and computes the scope path between reference and declaration so language packages can emit the correct reference syntax.

## Symbols

[`OutputSymbol`](api/types/OutputSymbol.md) is the base class. Key properties: reactive `name` (subject to name policies), `refkeys`, `scope`, and optional member spaces.

Language packages subclass `OutputSymbol` to add language-specific properties (e.g., accessibility, static/abstract flags).

`BasicSymbol` is a concrete subclass from core with "static" and "instance" member spaces — suitable for simple languages or prototyping.

### Declaring Symbols

[`<Declaration>`](api/components/Declaration.md) creates a `BasicSymbol` by default:

```tsx
const fnKey = refkey();
<Declaration name="myFunction" refkey={fnKey}>
  {/* content */}
</Declaration>;
```

For custom symbol types, pass a pre-created symbol via `symbol`:

```tsx
const sym = createSymbol(MyCustomSymbol, namekey, scope.symbols, options);
<Declaration symbol={sym}>{/* content */}</Declaration>;
```

See [`OutputSymbol`](api/types/OutputSymbol.md) and [`OutputSymbolOptions`](api/types/OutputSymbolOptions.md) for parameter details.

Language packages wrap [`<Declaration>`](api/components/Declaration.md) with their own components that create language-specific symbol types.

### Member Spaces

Symbols can have member spaces holding child symbols. Override `static memberSpaces` to declare the space keys for your symbol type (e.g., `["static", "instance"]`). [`<MemberScope>`](api/components/MemberScope.md) enters a member space; [`<MemberDeclaration>`](api/components/MemberDeclaration.md) declares within it.

Member spaces ([`OutputMemberSpace`](api/types/OutputSpace.md)) belong to symbols; declaration spaces ([`OutputDeclarationSpace`](api/types/OutputSpace.md)) belong to scopes. Together they form the [`OutputSpace`](api/types/OutputSpace.md) type. Symbols register via the constructor `space` parameter.

### Typed Symbols

Symbols support a type-symbol relationship through three properties:

- **`isTyped`**: set at construction when `OutputSymbolOptions.type` is provided. Not reactive.
- **`type`**: reactive getter/setter for the type symbol reference. The setter accepts `OutputSymbol` or `Ref<OutputSymbol>` (for deferred resolution) and auto-dealiases. When `isTyped` is true but `type` is not yet resolved, the symbol's members are unavailable until the type arrives.
- **`hasTypeSymbol`**: derived reactive getter (`this.type !== undefined`).

Language packages can add their own symbol properties to control resolution behavior.

### Member Resolution

The default `resolveMemberByName()` performs:

1. If `isTyped`, delegate to `type.resolveMemberByName()` (or return `undefined` if type not yet available).
2. Otherwise, search member spaces in order for a matching name.

There is no privacy or reachability check in the default resolver. When a language needs access-control filtering, provide a custom `memberResolver` callback. **Return `void` to accept** the member; **throw an error to reject** it. See [`MemberResolver`](api/types/MemberResolver.md) for details.

## Scopes

`OutputScope` is the base class, forming a tree. Each scope has parent/children, one or more **declaration spaces** (named collections of symbols), and is either **lexical** (own declarations) or a **member** scope (exposing an owner symbol's members).

Language packages subclass `OutputScope` for custom declaration spaces and behavior (e.g., import tracking, namespace resolution).

`BasicScope` is a concrete subclass from core with a single "symbols" space — suitable for simple languages or prototyping.

[`<Scope>`](api/components/Scope.md) creates a `BasicScope` by default. Language packages pass custom scope instances via the `value` prop. Use [`createScope()`](api/contexts/Scope-context.md) to construct one.

### OutputScope Members

| Member              | Type                                  | Description                                                                                                                                    |
| ------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`              | `string` (reactive)                   | Descriptive name (used in debugging).                                                                                                          |
| `parent`            | `OutputScope \| undefined` (reactive) | Parent scope, or `undefined` for roots.                                                                                                        |
| `children`          | `Set<OutputScope>` (readonly)         | Directly nested child scopes.                                                                                                                  |
| `binder`            | `Binder \| undefined` (readonly)      | Binder that owns this scope.                                                                                                                   |
| `metadata`          | `Record<string, unknown>`             | The property itself is not reactive; the returned object is a reactive plain object (`Record<string, unknown>` wrapped with Vue `reactive()`). |
| `spaceFor(key)`     | `OutputSpace \| undefined`            | Returns the declaration space for `key`. `undefined` if `key` is not in `declarationSpaces`.                                                   |
| `declarationSpaces` | `string[]` (static)                   | Space keys defined by this scope subclass.                                                                                                     |

### Declaration Spaces

A scope can have multiple declaration spaces. Override `static declarationSpaces` to declare the space keys for your scope type. Core's `BasicScope` provides a single "symbols" space; language packages define their own — e.g., a language might define separate "types" and "values" spaces.

## Refkeys

A [`Refkey`](api/types/Refkey.md) uniquely identifies a symbol. Created with [`refkey()`](api/functions/refkey.md):

```ts
const myClassKey = refkey();
const myClassKey = refkey("MyClass"); // stable seed
```

**Composite:** `refkey(a, b)` — deterministic key from multiple arguments.
**Member:** [`memberRefkey(baseKey, "member")`](api/functions/memberRefkey.md) — access a member of another symbol.

When a `Refkey` appears as a JSX child, the binder resolves it and emits the appropriate reference. If resolution fails, [`unresolvedRefkey(refkey)`](api/functions/unresolvedRefkey.md) returns a placeholder.

A [`Namekey`](api/types/Namekey.md) is a refkey variant that carries a name and options. Use [`namekey(name, options?)`](api/functions/namekey.md) for names that must bypass the name policy:

```ts
const name = namekey("$special", { ignoreNamePolicy: true });
```

## Binder

The central resolution engine. Tracks all scopes and symbols, resolves refkeys by searching up the scope tree, computes scope paths (`pathUp`/`pathDown`), and handles member resolution chains.

Set up by [`<Output>`](api/components/Output.md), available via [`BinderContext`](api/contexts/Binder-context.md). Scopes inherit binder from parent.

### [`resolve(refkey, options?)`](api/functions/resolve.md)

Primary API for resolving a refkey from a component. Returns a reactive `Ref<`[`ResolutionResult`](api/types/ResolutionResult.md)`>`. Generics narrow to language-specific types:

```ts
const result = resolve<MyLangScope, MyLangSymbol>(myRefkey);
```

The [`ResolutionResult`](api/types/ResolutionResult.md) contains the resolved symbol, common ancestor scope, scope paths, and member path. Language packages use `pathDown` to decide how to render a reference.

## Symbol Flow

Symbols can be **emitted** upward and **taken** by ancestors:

- [**`emitSymbol(symbol)`**](api/functions/emitSymbol.md) — emit from current component.
- [**`takeSymbols(cb?)`**](api/functions/takeSymbols.md) — capture emitted descendants. Returns a reactive set.
- [**`moveTakenMembersTo(symbol)`**](api/functions/moveTakenMembersTo.md) — take descendants and move as members.
- [**`createSymbolSlot()`**](api/functions/createSymbolSlot.md) — wrapper component capturing emitted symbols in a subtree.

Example: a variable declaration component wraps its type annotation in a symbol slot, then associates captured type symbols with the variable's symbol.

## Name Policies

`NamePolicy` transforms names by element type (e.g., camelCase for variables, PascalCase for classes). Set on [`<Output>`](api/components/Output.md), applied automatically. Symbols can opt out with `ignoreNamePolicy`.

Name conflict resolution is per-language (e.g., a language package might append `_1`, `_2` to conflicting imports).

## Extending Symbols and Scopes

Custom reactive properties use Vue's `track()` / `trigger()`:

```ts
import { track, trigger, TrackOpTypes, TriggerOpTypes } from "@alloy-js/core";

class CSharpSymbol extends OutputSymbol {
  #isStatic = false;
  get isStatic() {
    track(this, TrackOpTypes.GET, "isStatic");
    return this.#isStatic;
  }
  set isStatic(value: boolean) {
    const old = this.#isStatic;
    this.#isStatic = value;
    trigger(this, TriggerOpTypes.SET, "isStatic", value, old);
  }
}
```

## External Libraries

Language packages model external dependencies as scope/symbol trees outside rendered output. [`REFKEYABLE`](api/variables/REFKEYABLE.md) lets objects produce a refkey for resolution. [`TO_SYMBOL`](api/variables/TO_SYMBOL.md) enables lazy symbol creation — the binder calls `[TO_SYMBOL]()` on first reference.

Typical pattern:

1. Describe the library structure with a descriptor object.
2. Implement `[REFKEYABLE]()` (returns a refkey) and `[TO_SYMBOL]()` (creates the symbol) on each descriptor.
3. Cache symbols per binder in a `WeakMap<Binder, Symbol>`.
4. Use `lazyMemberInitializer` on container types to initialize members lazily when first accessed.

```ts
const lib = createLibrary("my-lib", { SomeType: { kind: "type", members: { ... } } });
<>{lib.SomeType}</> // symbol created lazily on first reference
```

Library descriptors self-register on demand — no additional wiring to `<Output>` is needed.
