---
changeKind: internal
packages:
  - "@alloy-js/cli"
  - "@alloy-js/core"
  - "@alloy-js/csharp"
  - "@alloy-js/go"
  - "@alloy-js/java"
  - "@alloy-js/json"
  - "@alloy-js/markdown"
  - "@alloy-js/msbuild"
  - "@alloy-js/python"
  - "@alloy-js/rollup-plugin"
  - "@alloy-js/typescript"
---

Adopt explicit `import type` / `export type` across the codebase (enforced via oxlint's `consistent-type-imports` / `consistent-type-exports`) and re-enable Babel 8's default `onlyRemoveTypeImports: true` by dropping the stopgap override in the CLI and rollup-plugin builds.
