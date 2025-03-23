---
changeKind: feature
packages:
  - "@alloy-js/typescript"
---

Expose `metadata` prop on various declaration forms to add arbitrary metadata about the symbol being declared. This metadata is stored on the symbol and can be accessed within e.g. name conflict resolution callbacks.