---
changeKind: feature
packages:
  - "@alloy-js/cli"
---

Add `--with-dev` flag to produce both production (`dist/`) and development (`dist/dev/`) builds. Dev builds include source info from babel transforms for improved debugging. `--dev` produces only a dev build to `dist/`, and `--watch` now defaults to dev mode. Package exports use `"development"` condition so consumers can opt into dev builds via `node --conditions=development`.
