# Changelog - @alloy-js/core

## 0.20.0

### Bug Fixes

- [#268](https://github.com/alloy-framework/alloy/pull/268) Add export for resource APIs
- [#265](https://github.com/alloy-framework/alloy/pull/265) Connect `componentOwner` in the context tree
- [#269](https://github.com/alloy-framework/alloy/pull/269) writeOutput will write files sequentially instead of in parallel to avoid race conditions where directories aren't created before files are attempted to be written to them.

### Features

- [#276](https://github.com/alloy-framework/alloy/pull/276) Add `symbolForRefkey` API to get a ref to a symbol with the given refkey, using the binder from context.
- [#277](https://github.com/alloy-framework/alloy/pull/277) Add `FormatOptions` component to provide global override for format configuration
- [#278](https://github.com/alloy-framework/alloy/pull/278) Insert final new line by default in source files. Added `insertFinalNewLine` formatting option to disable.
- [#206](https://github.com/alloy-framework/alloy/pull/206) Add `namekey`, a kind of refkey which you can provide a name and use in place of a string. This sets the name of the symbol and serves as a refkey for that symbol.

### Breaking Changes

- [#206](https://github.com/alloy-framework/alloy/pull/206) Update core's representation of symbols and scopes. These changes should not impact usage of language components in code generators, but there are some significant changes for language library implementations. See https://github.com/alloy-framework/alloy/pull/206 for more details.


## 0.19.0

### Bug Fixes

- [#241](https://github.com/alloy-framework/alloy/pull/241) Fixed an issue where event tracing would sometimes fail due to the presence of symbol properties.

### Features

- [#253](https://github.com/alloy-framework/alloy/pull/253) Add AppendFile component which allows for adding to an existing file on disk as opposed to overwriting it.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add CopyFile component which copies an existing file into the output directory.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add TemplateFile component which allows for creating a file from a template on disk. Supports substitutions via {{ substitution_name }}.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add UpdateFile component which allows for updating an existing file on disk. The component is called with the current contents which allows code to decide how to update it.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add `AlloyHost` which provides various File IO utilities.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add `createResource` API to support loading asynchronous data inside a component.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add `createFileResource` API to support loading files inside a component.
- [#253](https://github.com/alloy-framework/alloy/pull/253) Add `renderAsync` render method which must be used when components require async updates like file io.

### Breaking Changes

- [#253](https://github.com/alloy-framework/alloy/pull/253) The `writeOutput` function is now async.


## 0.18.2

### Bug Fixes

- Fix invalid .d.ts import


## 0.18.1

### Bug Fixes

- [#232](https://github.com/alloy-framework/alloy/pull/232) Improve `toRenderTo` test matcher to work better with SourceFiles


## 0.18.0

### Bug Fixes

- [#182](https://github.com/alloy-framework/alloy/pull/182) Added a `@alloy-js/core/testing/matchers` export to be added to `tsconfig.json` `types` in order to load the custom vitest matchers

### Features

- [#198](https://github.com/alloy-framework/alloy/pull/198) Add `inline` option for `<Block>` component to define inline blocks


## 0.17.0

### Features

- [#157](https://github.com/alloy-framework/alloy/pull/157) Add tracing for symbols. Tracing can be enabled by setting ALLOY_TRACE environment variable to a comma-separated list of symbol, scope, and/or resolve.
- [#157](https://github.com/alloy-framework/alloy/pull/157) Symbols and member scopes now support copy and move operations. These are used in combination with instantiate to model such things as instantiating and applying types to variables.
- [#157](https://github.com/alloy-framework/alloy/pull/157) New symbol flag Transient which is a symbol that is merely a placeholder. For example, symbols created by expressions are generally transient, and their useful parts are copied into a declaration symbol when appropriate.
- [#157](https://github.com/alloy-framework/alloy/pull/157) Symbols can now be aliased. Alias symbols will look up to their alias target when accessing things like instance or static members.

### Breaking Changes

- [#157](https://github.com/alloy-framework/alloy/pull/157) Refactor symbols to drastically simplify and optimize their usage. Symbols and scopes are now classes, and languages subclass these to add additional behaviors. Many binder APIs which operated on scopes or symbols are now methods on scopes or symbols.
- [#157](https://github.com/alloy-framework/alloy/pull/157) New takeSymbol/emitSymbol APIs added for passing symbols up the render tree to components which accept them. This is a generalization of the pattern in AssignmentTargetContext, so that context has been deleted.


## 0.16.0

### Features

- [#150](https://github.com/alloy-framework/alloy/pull/150) Export `isRef` and `isReactive` utility functions.
- [#150](https://github.com/alloy-framework/alloy/pull/150) Fully resolve refkeys given to the first part of a MemberExpression.


## 0.15.0

No changes, version bump only.

## 0.14.0

No changes, version bump only.

## 0.13.0

### Bug Fixes

- [#137](https://github.com/alloy-framework/alloy/pull/137) Fix default symbol conflict resolver not working with more than 2 symbols.


## 0.12.0

### Bug Fixes

- [#134](https://github.com/alloy-framework/alloy/pull/134) Support readonly collection in `<For>` `each` prop.

### Features

- [#114](https://github.com/alloy-framework/alloy/pull/114) instantiateSymbolInto now mirrors both instance and static members (including nested static hierarchies), and no longer errors on static-only sources.

### Breaking Changes

- [#127](https://github.com/alloy-framework/alloy/pull/127) Use a scheduler for effects. Effects are no longer run instantly but are queued to run after the current effect finishes. This significantly reduces effect calls due to coalescing multiple updates and also enables more recursive patterns.


## 0.11.0

### Bug Fixes

- [#91](https://github.com/alloy-framework/alloy/pull/91) `taggedComponent` return type updated to make tag as a required property
- [#97](https://github.com/alloy-framework/alloy/pull/97) Update `ForCallbackArgs` to handle arrays early, before unions of arrays are distributed. This mitigates a nasty typechecking bug that appears when the type of elements passed to `For` are a union of arrays.

### Features

- [#104](https://github.com/alloy-framework/alloy/pull/104) Add new `<ReferenceOrContent />` component
- [#105](https://github.com/alloy-framework/alloy/pull/105) Updated dependencies


## 0.10.0

No changes, version bump only.

## 0.9.0

### Features

- [#82](https://github.com/alloy-framework/alloy/pull/82) The For component's each prop now supports iterators.
- [#80](https://github.com/alloy-framework/alloy/pull/80) Add getSymbolForRefkey to binder.
- [#80](https://github.com/alloy-framework/alloy/pull/80) isComponentCreator now takes an optional Component parameter which allows you to check if a child is a specific component.
- [#80](https://github.com/alloy-framework/alloy/pull/80) Export `toRef` and `toRefs` utility functions for constructing refs from reactives.


## 0.8.0

### Bug Fixes

- [#76](https://github.com/alloy-framework/alloy/pull/76) No longer validates that instance member symbols are referenced inside the instance member scope. Languages may allow refernecing instance member symbols in a variety of ways (e.g. TypeScript allows referencing private instance symbols in a private instance symbol scope).

### Features

- [#67](https://github.com/alloy-framework/alloy/pull/67) Add metadata record to symbols and scopes for applications to store arbitrary information about them. Various declaration and scope forms have an additional prop to set this metadata.
- [#67](https://github.com/alloy-framework/alloy/pull/67) Scope name is now optional. Many scopes don't have names.
- [#74](https://github.com/alloy-framework/alloy/pull/74) Add `defaultProps` to allow setting default prop values.
- [#66](https://github.com/alloy-framework/alloy/pull/66) Add `text` helper that processes a string template similar to a JSX template with respect to whitespace handling.
- [#66](https://github.com/alloy-framework/alloy/pull/66) Add `ProviderStc` to context for providing context inside string template components.
- [#68](https://github.com/alloy-framework/alloy/pull/68) Add `doubleHardline` as a list joiner boolean prop. Useful for markdown paragraphs or separating declarations with a blank line.
- [#69](https://github.com/alloy-framework/alloy/pull/69) Add SourceFile `header` prop.
- [#71](https://github.com/alloy-framework/alloy/pull/71) Add `skipFalsy` prop to `For` component for controlling whether to skip falsy values. Previously this defaulted to true, it now defaults to false (which likely just fixes bugs).
- [#78](https://github.com/alloy-framework/alloy/pull/78) Add `Prose` component for wrapping string paragraphs at the line width.

### Breaking Changes

- [#67](https://github.com/alloy-framework/alloy/pull/67) Refkeys no longer default to `refkey(name)`. This behavior is just not very useful and leads to some very confusing behavior especially when multiple same-named symbols exist within a single emit. The old behavior can be achieved by passing the `refkey={refkey(name)}` prop, but this is not recommended.
- [#67](https://github.com/alloy-framework/alloy/pull/67) DeclarationProps, MemberDeclarationProps, and ScopeProps are now unions in order to properly type check and document the distinct usages of either passing a symbol or props necessary to construct a symbol. Anyone extending these interfaces will need to make a similar split.
- [#74](https://github.com/alloy-framework/alloy/pull/74) Remove plural `refkeys` prop. Can now pass an array for the `refkey` prop.
- [#68](https://github.com/alloy-framework/alloy/pull/68) Indent component no longer takes `break` prop. Instead, pass `hardline`, `softline`, `line`, or `literalline` boolean props.


## 0.7.0

### Bug Fixes

- [#62](https://github.com/alloy-framework/alloy/pull/62) Fix writeOutput failing to make new files

### Breaking Changes

- [#61](https://github.com/alloy-framework/alloy/pull/61) Symbols now allow for multiple refkeys. The `refkey` property has been removed, however the refkey prop remains on declaration components and the refkey option remains for the binder's createSymbol, so the breakage should be limited to code which interacts directly with symbols."


## 0.6.0

### Bug Fixes

- [#54](https://github.com/alloy-framework/alloy/pull/54) Fix browser mappings
- [#55](https://github.com/alloy-framework/alloy/pull/55) Export missing STC components.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Properly handle reactive updates in the children of a context Provider.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Fix cleanup of root contexts when cleanup is invoked from another context.

### Features

- [#56](https://github.com/alloy-framework/alloy/pull/56) Added a List component which renders its immediate children with configurable joiner and ender text.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added StatementList component for rendering lists of statements separated by semicolons and newlines.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The For component can now take a memo for its `each` prop.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The For component now takes various list-related boolean props for controlling the joiner and ender text.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The Indent component no longer includes a trailing line break by default in order to allow subsequent blocks to set their own indent level. The old behavior can be had by passing the `trailingBreak` boolean prop.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The Indent component can now configure its line break style (soft, hard, literal, or line).
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added support for the various formatting intrinsic elements.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added `splitProps` utility which can split props into two or more separate props objects while handling reactivity. Useful to pass subsets of props to child components.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The various rendering and printing APIs now take print options `tabWidth`, `useTabs`, and `printWidth` to control formatting behavior.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added `sti` function to create a wrapper around an intrinsic element similar to how `stc` works for components.
- [#56](https://github.com/alloy-framework/alloy/pull/56) `mapJoin` can now be given `Children` for its joiner and ender props.
- [#56](https://github.com/alloy-framework/alloy/pull/56) `children` and `childrenArray` now have a `preserveFragments` option which doesn't flatten fragments, allowing components like `List` to treat fragments as list items.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added Block component for rendering an indented block with configurable opening text, closing text, and line breaks.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added Show component for conditionally rendering child components. Similar to using the `&&` pattern but can be easier to read in some cases.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added Wrap component for conditionally wrapping its children in another component.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `For` component to iterate over a provided array and render a component for each element.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `Switch` component to conditionally render content.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add support to the binder for deleting symbols.
- [#55](https://github.com/alloy-framework/alloy/pull/55) The `Declaration` component will now delete its symbol when its removed from the tree.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Don't re-render unchanged elements when doing reactive updates.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `createCustomContext` to allow establishing a custom reactive context during render.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `findKeyedChildren` which finds multiple children with the given key.

### Breaking Changes

- [#56](https://github.com/alloy-framework/alloy/pull/56) The Output component no longer takes an `indent` prop. Instead, provide `tabWidth`, `useTabs`, and `printWidth` to control indentation behavior.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The SourceFile component no longer takes an `indent` prop. Instead, provide `tabWidth, `useTabs`, and `printWidth` to control indentation behavior.
- [#56](https://github.com/alloy-framework/alloy/pull/56) IndentContext has been removed. The rendering process no longer requires this information, indentation is handled during printing.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Tightened the types of `Child` and `Children`. `Child` can no longer be an array of itself.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added support for formatting primitives to produce formatted output. This includes elements like `group` and `fill` for attempting to fit text on a single line, `hbr`, `sbr`, `lbr`, and `br` for introducing line breaks, `align` for padding output, and more. All the built-in components have been updated to generate nicely formatted code.
- [#55](https://github.com/alloy-framework/alloy/pull/55) `mapJoin` now properly handles reactive sources. To support this, the array source must be wrapped in a callback. For example, `mapJoin(someArray, ...)` needs to be updated to `mapJoin(() => someArray, ...)`. The return value of `mapJoin` is now a memo rather than an array.


## 0.5.0

### Features

- [#50](https://github.com/alloy-framework/alloy/pull/50) Add support for adding refkeys to symbols after symbol creation.
- [#50](https://github.com/alloy-framework/alloy/pull/50) Improve types of JSX elements so typescript and editors can provide accurate errors when providing props to components. For example, component props can be unions of props interfaces, enabling an overload-like pattern.
- [#50](https://github.com/alloy-framework/alloy/pull/50) Add Tappers, which allow getting a reference to contexts provided by nested components from a parent component. Useful for allowing nested components to create things like symbols when the parent component merely needs access to it but doesn't care how its created.


## 0.4.0

### Features

- [80f1ba8](https://github.com/alloy-framework/alloy/commit/80f1ba88470960ce57487b644ae3c3f37f9c4690) Add indent prop to source files for setting indent level.

### Bug Fixes

- [#48](https://github.com/alloy-framework/alloy/pull/48) Add browser mappings to enable running in browser


## 0.3.0

### Features

- [#38](https://github.com/alloy-framework/alloy/pull/38) Add indent prop to source files for setting indent level.




## 0.2.0

### Bug Fixes

- [#31](https://github.com/alloy-framework/alloy/pull/31) Update license to MIT

