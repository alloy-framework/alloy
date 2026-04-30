---
changeKind: breaking
packages:
  - "@alloy-js/core"
---

`PrintTreeOptions` now contains only formatting options used by production rendering. Test-only scheduler flushing control moved to `RenderTreeOptions`; `printTree` and `getFilesFromTree` accept the combined test helper options where needed.
