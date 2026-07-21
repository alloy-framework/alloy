---
changeKind: internal
packages:
  - "@alloy-js/babel-plugin"
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
  - "@alloy-js/typespec"
---

Adopt explicit `import type` / `export type` across the codebase (enforced via TypeScript's `verbatimModuleSyntax`) and re-enable Babel 8's default `onlyRemoveTypeImports: true` by dropping the stopgap override in the CLI and rollup-plugin builds.
