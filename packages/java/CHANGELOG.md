# Changelog - @alloy-js/java

## 0.8.0

No changes, version bump only.

## 0.7.0

No changes, version bump only.

## 0.6.0

### Features

- [#56](https://github.com/alloy-framework/alloy/pull/56) The emitted code is now formatted properly.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Added ArgumentList component to create an arguments list for various things which take them.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Moved extends and implements clause utilities into ExtendsClause and ImplementsClause components.

### Breaking Changes

- [#56](https://github.com/alloy-framework/alloy/pull/56) Split Generics component and various generics-related utilities into TypeParameters and TypeArguments components.
- [#56](https://github.com/alloy-framework/alloy/pull/56) TypeArguments now support all use-site variance options (wildcard, extends, and super). A new descriptor type is used.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Removed Block component (now provided by core).
- [#56](https://github.com/alloy-framework/alloy/pull/56) The Class component now takes `Children[]` for its implements prop.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The Declaration component no longer includes the ending semicolon (line enders should be handled by component consumers via e.g. StatementList).
- [#56](https://github.com/alloy-framework/alloy/pull/56) The `Enum` component now takes `Children[]` for its implements prop.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Moved modifier-related utilities to a new Modifiers component.
- [#56](https://github.com/alloy-framework/alloy/pull/56) Moved named argument related utilities to a new NamedArgumentList component.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The ObjectDeclaration component now takes `Children[]` for its arguments prop.
- [#56](https://github.com/alloy-framework/alloy/pull/56) The Variable component no longer includes the ending semicolon (line enders should be handled by the component consumers via e.g. StatementList).
- [#56](https://github.com/alloy-framework/alloy/pull/56) The `arguments` prop for ObjectDeclaration and Class is now called `args` for consistency.


## 0.5.0

No changes, version bump only.

## 0.4.0

No changes, version bump only.

## 0.3.0

### Features

- [#37](https://github.com/alloy-framework/alloy/pull/37) @alloy-js/java: Allowing specifying `throws` clause to methods




## 0.2.0

### Bug Fixes

- [#31](https://github.com/alloy-framework/alloy/pull/31) Update license to MIT

