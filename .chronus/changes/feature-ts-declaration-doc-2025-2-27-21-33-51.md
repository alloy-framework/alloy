---
changeKind: feature
packages:
  - "@alloy-js/typescript"
---

Adding support for JSDocs on declarations. This change adds the following components:
- `JSDocParam` component which renders a single JSDoc comment for a parameter.
- `JSDocParameters` which takes an array of `ParameterDescription` to render JSDocParam comments for each.