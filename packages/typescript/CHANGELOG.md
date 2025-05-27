# Changelog - @alloy-js/typescript

## 0.17.0

### Bug Fixes

- [#163](https://github.com/alloy-framework/alloy/pull/163) Add `index` property to `MemberExpression.Part` to allow defining array indexes and treat numeric `id` props as array indexes.

### Features

- [#153](https://github.com/alloy-framework/alloy/pull/153) Add support to createPackage for defining instance and static members.
- [#157](https://github.com/alloy-framework/alloy/pull/157) Variables will now get instance/static symbols based on the type prop or the children. This allows accessing members off of variable declarations when they are typed as a class or interface or assigned an object expression.
- [#157](https://github.com/alloy-framework/alloy/pull/157) Add new `NewExpression` component which will emit a symbol containing the instantiation of the given class reference.


## 0.16.0

### Features

- [#150](https://github.com/alloy-framework/alloy/pull/150) Allow providing explicit children to a MemberExpression.Part.
- [#150](https://github.com/alloy-framework/alloy/pull/150) Format member expressions with multiple calls in a much better way.

### Breaking Changes

- [#150](https://github.com/alloy-framework/alloy/pull/150) Remove `MemberChainExpression` component. Use `MemberExpression` component instead, which accomplishes the same goals but formats better, handles optional chaining, and more.


## 0.15.0

### Features

- [#146](https://github.com/alloy-framework/alloy/pull/146) Add support for rest parameters in function components
- [#146](https://github.com/alloy-framework/alloy/pull/146) Add support for object spread properties
- [#145](https://github.com/alloy-framework/alloy/pull/145) Sort import statements and named imports


## 0.14.0

### Bug Fixes

- [#141](https://github.com/alloy-framework/alloy/pull/141) Fix type import from a package not adding `type` modifier
- [#140](https://github.com/alloy-framework/alloy/pull/140) Include readonly for indexers


## 0.13.0

No changes, version bump only.

## 0.12.0

### Bug Fixes

- [#121](https://github.com/alloy-framework/alloy/pull/121) JS Doc comment close with `*/` instead of `**/`

### Features

- [#117](https://github.com/alloy-framework/alloy/pull/117) Add nullish to TS Symbol flags
- [#125](https://github.com/alloy-framework/alloy/pull/125) Automatically enter a type context when inside of interface, function type, type declaration, etc. This allow referenced used in there to automatically add the `type` keyword in the import
- [#124](https://github.com/alloy-framework/alloy/pull/124) Add `type` prop on `Reference` component to mark this reference as a type only reference allowing imports to be specialized in type import


## 0.11.0

### Bug Fixes

- [#92](https://github.com/alloy-framework/alloy/pull/92) Missing export of `IfStatement`, `ElseIfClause` and `ElseClause`
- [#112](https://github.com/alloy-framework/alloy/pull/112) Fix interface member references

### Features

- [#112](https://github.com/alloy-framework/alloy/pull/112) Add new `<MemberDeclaration />` component. A wrapper around alloy `<MemberDeclaration />` with TypeScript specific props.
- [#91](https://github.com/alloy-framework/alloy/pull/91) Add new `<FunctionExpression />` and `<ArrowFunctionExpression />` components supporting the various formm of function expressions
- [#110](https://github.com/alloy-framework/alloy/pull/110) Add `<InterfaceMethod />` and `<FunctionType />` component
- [#105](https://github.com/alloy-framework/alloy/pull/105) Updated dependencies


## 0.10.0

### Bug Fixes

- [#84](https://github.com/alloy-framework/alloy/pull/84) Export MemberExpression component, stc component, and related types


## 0.9.0

### Features

- [#80](https://github.com/alloy-framework/alloy/pull/80) Add MemberExpression component which produces formatted member expressions and applies conditional access operators when needed.


## 0.8.0

### Bug Fixes

- [#71](https://github.com/alloy-framework/alloy/pull/71) Fix ArrayExpression not rendering falsy elements when passed a `jsValue`.

### Features

- [#67](https://github.com/alloy-framework/alloy/pull/67) Expose `metadata` prop on various declaration forms to add arbitrary metadata about the symbol being declared. This metadata is stored on the symbol and can be accessed within e.g. name conflict resolution callbacks.
- [#74](https://github.com/alloy-framework/alloy/pull/74) Add CallSignature component for creating TypeScript call signatures. Suitable for placing inside an `InterfaceDeclaration` or `InterfaceExpression`.
- [#76](https://github.com/alloy-framework/alloy/pull/76) Support declaring and referencing properties with invalid property names. Added a `PropertyName` component to handle escaping property declaration names.
- [#76](https://github.com/alloy-framework/alloy/pull/76) Properly model private symbols. Private symbols are now stored in separate scopes and will no longer conflict with non-private symbols. Access rules for private symbols are verified (e.g. that static private symbols cannot be referenced outside their scope).
- [#69](https://github.com/alloy-framework/alloy/pull/69) Add `SingleLineCommentBlock` component to handle single line comments `//`.
- [#72](https://github.com/alloy-framework/alloy/pull/72) Adding support for JSDocs on declarations via the `docs` prop.
- [#72](https://github.com/alloy-framework/alloy/pull/72) Add `JSDocParam` component which renders a single JSDoc comment for a parameter.
- [#72](https://github.com/alloy-framework/alloy/pull/72) Add `JSDocParams` which takes an array of `ParameterDescription` to render JSDocParam comments for each.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add new BlockScope component that combines a block and a scope.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add IfStatement, ElseIfClause, and ElseClause components.
- [#65](https://github.com/alloy-framework/alloy/pull/65) Add SwitchStatement and CaseClause components.

### Breaking Changes

- [#67](https://github.com/alloy-framework/alloy/pull/67) Removed all default refkeys based on declaration name.
- [#67](https://github.com/alloy-framework/alloy/pull/67) The `parameters` prop passed to various function or method defining components now takes a `ParameterDescriptor[]` instead of a `Record<string, ParameterDescriptor>`. `ParameterDescriptor` now has a required `name` property. The record form is dangerous because you have to ensure you have no name conflicts, otherwise you'll silently lose parameters.
- [#74](https://github.com/alloy-framework/alloy/pull/74) Remove plural `refkeys` prop. Can now pass an array for the `refkey` prop.
- [#65](https://github.com/alloy-framework/alloy/pull/65) The `value` prop of VarDeclaration has been renamed to `initializer` to align with the ECMAScript grammar.
- [#69](https://github.com/alloy-framework/alloy/pull/69) Remove `JSDocParagraph` component, can just use `Prose` from core.

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

