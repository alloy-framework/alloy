---
changeKind: feature
packages:
  - "@alloy-js/rollup-plugin"
---

The Rollup/Vite plugin now accepts `addSourceInfo` and `sourceMaps` options and automatically configures esbuild for Alloy (`jsx: "preserve"` plus the `source` resolve conditions). Consumers no longer need to set these by hand in their Vite/Vitest config.
