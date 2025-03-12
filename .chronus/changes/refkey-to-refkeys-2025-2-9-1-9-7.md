---
changeKind: breaking
packages:
  - "@alloy-js/core"
---

Symbols now allow for multiple refkeys. The `refkey` property has been removed, however the refkey prop remains on declaration components and the refkey option remains for the binder's createSymbol, so the breakage should be limited to code which interacts directly with symbols."