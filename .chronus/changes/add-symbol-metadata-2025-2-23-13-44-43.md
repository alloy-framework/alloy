---
changeKind: breaking
packages:
  - "@alloy-js/core"
---

Refkeys no longer default to `refkey(name)`. This behavior is just not very useful and leads to some very confusing behavior especially when multiple same-named symbols exist within a single emit. The old behavior can be achieved by passing the `refkey={refkey(name)}` prop, but this is not recommended.