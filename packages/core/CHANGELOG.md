# Changelog - @alloy-js/core

## 0.6.0

### Breaking Changes

- [#55](https://github.com/alloy-framework/alloy/pull/55) `mapJoin` now properly handles reactive sources. To support this, the array source must be wrapped in a callback. For example, `mapJoin(someArray, ...)` needs to be updated to `mapJoin(() => someArray, ...)`. The return value of `mapJoin` is now a memo rather than an array.

### Features

- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `For` component to iterate over a provided array and render a component for each element.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `Switch` component to conditionally render content.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add support to the binder for deleting symbols.
- [#55](https://github.com/alloy-framework/alloy/pull/55) The `Declaration` component will now delete its symbol when its removed from the tree.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Don't re-render unchanged elements when doing reactive updates.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `createCustomContext` to allow establishing a custom reactive context during render.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Add `findKeyedChildren` which finds multiple children with the given key.

### Bug Fixes

- [#55](https://github.com/alloy-framework/alloy/pull/55) Export missing STC components.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Properly handle reactive updates in the children of a context Provider.
- [#55](https://github.com/alloy-framework/alloy/pull/55) Fix cleanup of root contexts when cleanup is invoked from another context.


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

