# Changelog - @alloy-js/typescript

## 0.8.0

### Features

- [#67](https://github.com/alloy-framework/alloy/pull/67) Expose `metadata` prop on various declaration forms to add arbitrary metadata about the symbol being declared. This metadata is stored on the symbol and can be accessed within e.g. name conflict resolution callbacks.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add new BlockScope component that combines a block and a scope.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add IfStatement, ElseIfClause, and ElseClause components.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add SwitchStatement and CaseClause components.

### Breaking Changes

- [#67](https://github.com/alloy-framework/alloy/pull/67) Removed all default refkeys based on declaration name.
- [#67](https://github.com/alloy-framework/alloy/pull/67) The `parameters` prop passed to various function or method defining components now takes a `ParameterDescriptor[]` instead of a `Record<string, ParameterDescriptor>`. `ParameterDescriptor` now has a required `name` property. The record form is dangerous because you have to ensure you have no name conflicts, otherwise you'll silently lose parameters. The `Record<string, Children>` variant remains though may be removed in a future version.
- [#65](https://github.com/alloy-framework/alloy/pull/65) The `value` prop of VarDeclaration has been renamed to `initializer` to align with the ECMAScript grammar.


## 0.7.0

### Bug Fixes

- [#60](https://github.com/alloy-framework/alloy/pull/60) Fix member chains that don't have a call expression in them
- [#61](https://github.com/alloy-framework/alloy/pull/61) Fix extra comma in array expressions with children and no jsValue.

### Features

- [#62](https://github.com/alloy-framework/alloy/pull/62) Improve TypeScript's PackageJson component. It can now be used outside of a PackageDirectory.
- [#61](https://github.com/alloy-framework/alloy/pull/61) Add support for providing multiple refkeys for a single declaration.


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

