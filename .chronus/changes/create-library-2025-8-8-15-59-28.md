---
changeKind: feature
packages:
  - "@alloy-js/core"
---

Added OutputSymbol#resolveMemberByName, which can be used to find a member by name. By default it will look in all member spaces, but subtypes can implement their own behavior.