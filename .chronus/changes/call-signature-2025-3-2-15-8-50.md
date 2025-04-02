---
changeKind: breaking
packages:
  - "@alloy-js/typescript"
---

Removed Record<string, Children> signature for `parameters` and `typeParameters` props. These now take an array of `ParameterDescriptor`s or `TypeParameterDescriptor`s respectively. They can also simply take an array of strings.