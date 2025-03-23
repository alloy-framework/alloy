---
changeKind: breaking
packages:
  - "@alloy-js/core"
---

DeclarationProps, MemberDeclarationProps, and ScopeProps are now unions in order to properly type check and document the distinct usages of either passing a symbol or props necessary to construct a symbol. Anyone extending these interfaces will need to make a similar split.