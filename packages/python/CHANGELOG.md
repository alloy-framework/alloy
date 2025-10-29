# Changelog - @alloy-js/python

## 0.2.0

### Bug Fixes

- [#317](https://github.com/alloy-framework/alloy/pull/317) Add an extra line after the ClassDoc
- [#316](https://github.com/alloy-framework/alloy/pull/316) Add support for floats that end in .0
- [#282](https://github.com/alloy-framework/alloy/pull/282) `<Unresolved symbol>` include the refkey information for easier debugging

### Features

- [#302](https://github.com/alloy-framework/alloy/pull/302) Create SingleTypeExpression, refactor FunctionDeclaration, split Enum implementations and split docs components into separate components
- [#284](https://github.com/alloy-framework/alloy/pull/284) Declaration components' `name` prop and symbol constructors' `name` parameter now allow namekeys. Namekeys are a special kind of refkey which
  takes a name and name options. For example, `namekey("myVariable", { disableNamePolicy: true})` when passed to a declaration component would create a symbol named "myVariable", use the namekey as a refkey, and disable the name policy for that symbol.


## 0.1.0

### Features

- [#257](https://github.com/alloy-framework/alloy/pull/257) 
- [#271](https://github.com/alloy-framework/alloy/pull/271) Add Python components to documentation
- [#267](https://github.com/alloy-framework/alloy/pull/267) Add UnionTypeExpression to allow for optional variable types to be described

### Breaking Changes

- [#206](https://github.com/alloy-framework/alloy/pull/206) Update core's representation of symbols and scopes. These changes should not impact usage of language components in code generators, but there are some significant changes for language library implementations. See https://github.com/alloy-framework/alloy/pull/206 for more details.


This package is currently in development. No releases yet.