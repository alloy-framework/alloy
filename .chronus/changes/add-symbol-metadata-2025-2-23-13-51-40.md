---
changeKind: breaking
packages:
  - "@alloy-js/typescript"
---

The `parameters` prop passed to various function or method defining components now takes a `ParameterDescriptor[]` instead of a `Record<string, ParameterDescriptor>`. `ParameterDescriptor` now has a required `name` property. The record form is dangerous because you have to ensure you have no name conflicts, otherwise you'll silently lose parameters. The `Record<string, Children>` variant remains though may be removed in a future version.