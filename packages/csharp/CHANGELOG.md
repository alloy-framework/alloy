# Changelog - @alloy-js/csharp

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

