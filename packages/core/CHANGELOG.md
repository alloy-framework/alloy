# Changelog - @alloy-js/core

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

