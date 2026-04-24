# Documentation Updates Plan

Two valid issues from `validated-doc-issues.json`. Issues 3 and 4 are marked `invalid` (duplicates) and are skipped.

---

## Fix 1 — Wrong `OutputSymbol` links in `symbols-and-scopes.md`

**Source:** `packages/core/docs/symbols-and-scopes.md`
**Severity:** non-blocking

### What to change

Two sentences link `OutputSymbol` to `api/types/OutputSymbolOptions.md` instead of
`api/types/OutputSymbol.md`. Both are hand-written prose and can be edited directly.

**Line 11** (Symbols section intro):

```
[`OutputSymbol`](api/types/OutputSymbolOptions.md) is the base class.
```

→

```
[`OutputSymbol`](api/types/OutputSymbol.md) is the base class.
```

**Line 35** (Declaring Symbols section, "See also" sentence):

```
See [`OutputSymbol`](api/types/OutputSymbolOptions.md) and [`OutputSymbolOptions`](api/types/OutputSymbolOptions.md) for parameter details.
```

→

```
See [`OutputSymbol`](api/types/OutputSymbol.md) and [`OutputSymbolOptions`](api/types/OutputSymbolOptions.md) for parameter details.
```

---

## Fix 2 — Unresolved TSDoc links in `OutputSymbol`

**Source:** `packages/core/src/symbols/output-symbol.ts`
**Generated page:** `packages/core/docs/api/types/OutputSymbol.md`
**Severity:** non-blocking

The doc generator uses `apiModel.resolveDeclarationReference()` to turn `{@link}` tags into
symbols. Two links fail to resolve and render as `[unresolved link]` in the generated page:

### 2a — `copyToSpace` description: `{@link OutputSymbol.copy}`

The fully-qualified self-reference `{@link OutputSymbol.copy}` is not resolved by the API
Extractor model when the context is already `OutputSymbol`. Use the relative form instead.

**Current TSDoc (line ~393):**

```ts
/**
 * Copy this symbol into the given space. Calls {@link OutputSymbol.copy} and places
 * the result in `space`, then returns the copy.
 */
```

**Corrected:**

```ts
/**
 * Copy this symbol into the given space. Calls {@link copy} and places
 * the result in `space`, then returns the copy.
 */
```

### 2b — Class remarks: `{@link OutputSymbolOptions.binder}`

Cross-type member links (`Type.member`) do not resolve in this doc generator. Link to the
type itself instead.

**Current TSDoc (line ~138):**

```ts
 * See {@link OutputSymbolOptions.binder} and {@link TO_SYMBOL}.
```

**Corrected:**

```ts
 * See {@link OutputSymbolOptions} (`binder` option) and {@link TO_SYMBOL}.
```

This preserves the navigational intent while using a form the generator can resolve.
