# Changelog - @alloy-js/typescript

## 0.6.0

### Features

- [#56](https://github.com/alloy-framework/alloy/pull/56) Output is now formatted.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added CommaList component for rendering a comma separated list with configurable line break behavior.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added new components JSDoc, JSDocComment, JSDocParagraph, and JSDocExample for generating formatted JSDoc comments.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Add MemberChainExpression component for creating a nicely formatted chain of property access and method calls.

### Breaking Changes

- [#56](https://github.com/alloy-framework/alloy/pull/56) Block component has been removed (now provided by core).
- [#56](https://github.com/alloy-framework/alloy/pull/56) The FunctionCallExpression component now takes a `target` prop of type `Children` rather than a `refkey` prop.


## 0.5.0

No changes, version bump only.

## 0.4.0

### Features

- [#45](https://github.com/alloy-framework/alloy/pull/45) Update TypeScript name policy to handle reserved words and properly case
enum members.


## 0.3.0

No changes, version bump only.



## 0.2.0

### Bug Fixes

- [#34](https://github.com/alloy-framework/alloy/pull/34) Fix scope for local import symbols.
- [#31](https://github.com/alloy-framework/alloy/pull/31) Update license to MIT

