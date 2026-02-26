# Changelog - @alloy-js/csharp

## 0.23.0

### Features

- [#362](https://github.com/alloy-framework/alloy/pull/362) Add `createAccessExpression` factory for building language-specific member/access expression components with shared call chain formatting, symbol resolution, and reactive optimization.
- [#354](https://github.com/alloy-framework/alloy/pull/354) Support add doc comment at the beginning of csharp src file
- [#356](https://github.com/alloy-framework/alloy/pull/356) Include debugging information for symbols.
- [#368](https://github.com/alloy-framework/alloy/pull/368) Ship dev sources in package for debugging. Use node's --condition="development" flag to use this build.


## 0.22.0

### Bug Fixes

- [#328](https://github.com/alloy-framework/alloy/pull/328) Empty namespaces now don't render an empty block.

## 0.21.0

### Bug Fixes

- [#320](https://github.com/alloy-framework/alloy/pull/320) export "#region" support
- [#304](https://github.com/alloy-framework/alloy/pull/304) Fix built-ins when multiple binders are used (mostly in tests).
- [#287](https://github.com/alloy-framework/alloy/pull/287) Fix allow defining nested namespace
- [#286](https://github.com/alloy-framework/alloy/pull/286) Improve formatting of CSharp components
- [#314](https://github.com/alloy-framework/alloy/pull/314) Fix broken testing exports
- [#282](https://github.com/alloy-framework/alloy/pull/282) `<Unresolved symbol>` include the refkey information for easier debugging

### Features

- [#295](https://github.com/alloy-framework/alloy/pull/295) VarDeclaration now uses symbol information.
- [#295](https://github.com/alloy-framework/alloy/pull/295) Added `createLibrary` function for defining symbols from external libraries.
- [#295](https://github.com/alloy-framework/alloy/pull/295) Added `access` builder for building member expressions.
- [#288](https://github.com/alloy-framework/alloy/pull/288) Add `const` variable declaration support
- [#319](https://github.com/alloy-framework/alloy/pull/319) Add `#region` support
- [#307](https://github.com/alloy-framework/alloy/pull/307) Add `CsprojFile` component, to be used with `@alloy-js/msbuild`
- [#289](https://github.com/alloy-framework/alloy/pull/289) Add support for `if` `else` statements
- [#310](https://github.com/alloy-framework/alloy/pull/310) Add C# test wrapper with symbol definition utility
- [#300](https://github.com/alloy-framework/alloy/pull/300) [c#] Support parameter modifier "in", "out" and "ref".
  [c#] If AttributeName ends with "Attribute", the "Attribute" will be trimmed.
- [#297](https://github.com/alloy-framework/alloy/pull/297) ΩSupport attributes on parameters
- [#284](https://github.com/alloy-framework/alloy/pull/284) Declaration components' `name` prop and symbol constructors' `name` parameter now allow namekeys. Namekeys are a special kind of refkey which
  takes a name and name options. For example, `namekey("myVariable", { disableNamePolicy: true})` when passed to a declaration component would create a symbol named "myVariable", use the namekey as a refkey, and disable the name policy for that symbol.
- [#303](https://github.com/alloy-framework/alloy/pull/303) VarDeclaration support `using` modifier

### Breaking Changes

- [#283](https://github.com/alloy-framework/alloy/pull/283) Rename `UsingDirective` -> `Usings`

## 0.20.0

### Bug Fixes

- [#270](https://github.com/alloy-framework/alloy/pull/270) Place partial at the end of the attribute list for classes.
- [#275](https://github.com/alloy-framework/alloy/pull/275) Make sure symbols are correctly cleaned when components rerender

### Features

- [#255](https://github.com/alloy-framework/alloy/pull/255) Add suport for class/record primary constructors
- [#276](https://github.com/alloy-framework/alloy/pull/276) Add `InvocationExpression` component for generating calls to functions and methods.
- [#276](https://github.com/alloy-framework/alloy/pull/276) Add `AccessExpression` component for generating member and element access expressions with conditional access operators where needed.
- [#277](https://github.com/alloy-framework/alloy/pull/277) Add `FormatOptions` component to provide global override for format configuration

### Breaking Changes

- [#206](https://github.com/alloy-framework/alloy/pull/206) Update core's representation of symbols and scopes. These changes should not impact usage of language components in code generators, but there are some significant changes for language library implementations. See https://github.com/alloy-framework/alloy/pull/206 for more details.

## 0.19.0

### Features

- [#246](https://github.com/alloy-framework/alloy/pull/246) Add support for `struct` declaration
- [#250](https://github.com/alloy-framework/alloy/pull/250) Fields support `new`, `readonly`, `static` and `volatile` modifier
- [#250](https://github.com/alloy-framework/alloy/pull/250) Private field respect c# naming convention of `_camelCase`
- [#251](https://github.com/alloy-framework/alloy/pull/251) Support `readonly`, `override` and `extern` modifier for `Method`
- [#247](https://github.com/alloy-framework/alloy/pull/247) Add support for expression body syntax in methods

### Breaking Changes

- [#249](https://github.com/alloy-framework/alloy/pull/249) Rename `ClassMember` to `Field` to allow using it with `StructDeclaration`
- [#248](https://github.com/alloy-framework/alloy/pull/248) Rename `ClassConstructor` to `Constructor` to allow using it with `StructDeclaration`
- [#248](https://github.com/alloy-framework/alloy/pull/248) Rename `ClassMethod` to `Method` to allow using it with `StructDeclaration`

## 0.18.0

### Bug Fixes

- [#205](https://github.com/alloy-framework/alloy/pull/205) Add doc support to class members
- [#182](https://github.com/alloy-framework/alloy/pull/182) Fix abstract class method rendering with a body `{}`
- [#201](https://github.com/alloy-framework/alloy/pull/201) Add support for csharp doc comments with various `<Doc*>` components

### Features

- [#228](https://github.com/alloy-framework/alloy/pull/228) Add `<Attribute />` and `<AttributeList />` components to support c# attributes
- [#212](https://github.com/alloy-framework/alloy/pull/212) Add support for class base type(s)
- [#182](https://github.com/alloy-framework/alloy/pull/182) Add support for `async` class methods
- [#193](https://github.com/alloy-framework/alloy/pull/193) Add support for class modifiers `abstract`, `partial`, `sealed` and `static`
- [#209](https://github.com/alloy-framework/alloy/pull/209) Add `<ClassProperty />` component
- [#227](https://github.com/alloy-framework/alloy/pull/227) CSharp SourceFile use 120 lines split by default
- [#191](https://github.com/alloy-framework/alloy/pull/191) Access and method modifiers have been converted to flags `<Class public />` instead of `<Class accessModifier="public" />`
- [#220](https://github.com/alloy-framework/alloy/pull/220) Add `<VarDeclaration />` component to render variables
- [#198](https://github.com/alloy-framework/alloy/pull/198) Add `<InterfaceDeclaration />`, `<InterfaceMethod />` and `<InterfaceProperty />` components
- [#213](https://github.com/alloy-framework/alloy/pull/213) Add support for optional parameters
- [#202](https://github.com/alloy-framework/alloy/pull/202) Add `<DocFromMarkdown>` component allowing conversion from markdown to csharp doc comment syntax
- [#225](https://github.com/alloy-framework/alloy/pull/225) Parameter improved formatting when using multi lines
- [#216](https://github.com/alloy-framework/alloy/pull/216) Add support for `init` properties
- [#215](https://github.com/alloy-framework/alloy/pull/215) Add support for `record` with `<RecordDeclaration>` component
- [#222](https://github.com/alloy-framework/alloy/pull/222) Support for type parameters for interface, class methods, interface methods

### Breaking Changes

- [#192](https://github.com/alloy-framework/alloy/pull/192) Rename `Class` -> `ClassDeclaration` and `Enum` -> `EnumDeclaration`

## 0.17.0

No changes, version bump only.

## 0.16.0

No changes, version bump only.

## 0.15.0

No changes, version bump only.

## 0.14.0

No changes, version bump only.

## 0.13.0

No changes, version bump only.

## 0.12.0

No changes, version bump only.

## 0.11.0

### Features

- [#105](https://github.com/alloy-framework/alloy/pull/105) Updated dependencies

## 0.10.0

No changes, version bump only.

## 0.9.0

No changes, version bump only.

## 0.8.0

### Breaking Changes

- [#67](https://github.com/alloy-framework/alloy/pull/67) Removed all default refkeys based on declaration name.

## 0.7.0

No changes, version bump only.

## 0.6.0

### Features

- [#56](https://github.com/alloy-framework/alloy/pull/56) Emitted code is now formatted properly.

## 0.5.0

No changes, version bump only.

## 0.4.0

### Features

- [80f1ba8](https://github.com/alloy-framework/alloy/commit/80f1ba88470960ce57487b644ae3c3f37f9c4690) Indent source files with 4 spaces as Anders intended.

## 0.3.0

### Features

- [#38](https://github.com/alloy-framework/alloy/pull/38) Indent source files with 4 spaces as Anders intended.

## 0.2.0

### Bug Fixes

- [#31](https://github.com/alloy-framework/alloy/pull/31) Update license to MIT
