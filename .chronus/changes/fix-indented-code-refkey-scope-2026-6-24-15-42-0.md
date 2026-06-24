---
changeKind: fix
packages:
  - "@alloy-js/core"
---

Fix references to function-local symbols (e.g. parameters) resolving against the wrong scope when emitted from an indented line of a `code` template. Child collection no longer eagerly invokes intrinsic (`indent`/`group`/...) creators, so their refkeys resolve at render time inside the correct scope.
