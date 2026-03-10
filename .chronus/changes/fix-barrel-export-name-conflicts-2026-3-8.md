---
changeKind: fix
packages:
  - "@alloy-js/typescript"
---

Resolve name conflicts in barrel file exports. When multiple source files export symbols with the same name, the barrel now falls back to named re-exports with deterministic aliases (e.g. `export { helper as helper_2 } from "./b.js"`) instead of emitting conflicting `export *` statements that produce TypeScript build errors.
