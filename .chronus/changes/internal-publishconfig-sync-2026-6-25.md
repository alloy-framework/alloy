---
changeKind: internal
packages:
  - "@alloy-js/core"
  - "@alloy-js/create"
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

Replace the per-package `prepack` `strip-dev-exports.js` script with a committed `publishConfig` that is kept in sync by `eng/sync-publish-config.ts`. The `source` export/import condition continues to be stripped from published packages.
