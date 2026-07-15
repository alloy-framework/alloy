---
changeKind: feature
packages:
  - "@alloy-js/cli"
---

`alloy build` now uses the native TypeScript compiler binary, adding support for TypeScript 7. Type-checking and declaration emit shell out to the project's `tsc` instead of the (now removed) programmatic compiler API, and watch mode uses Node's built-in recursive file watcher. Requires Node.js >=22.
