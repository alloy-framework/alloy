---
changeKind: fix
packages:
  - "@alloy-js/create"
---

Fix `npm init @alloy-js` on Windows: resolve `deps.json` and `deps-versions.json` with `fileURLToPath(import.meta.url)` instead of stripping the `file:` prefix, which produced paths like `C:\C:\...`.
