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
  - "@alloy-js/typescript"
  - "@alloy-js/typespec"
---

Rely on the Rollup/Vite plugin to configure esbuild, removing the duplicated esbuild/resolve boilerplate from each package's `vitest.config.ts`.
