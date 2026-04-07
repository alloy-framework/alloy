---
# Change versionKind to one of: breaking, feature, fix, internal
changeKind: fix
packages:
  - "@alloy-js/csharp"
---

Fix namespace scope-chain construction for dotted namespaces declared inside `SourceFile` so refkey resolution no longer emits incorrect qualification or unnecessary using directives. Adds regression coverage for sibling and multi-level nested namespace scenarios.