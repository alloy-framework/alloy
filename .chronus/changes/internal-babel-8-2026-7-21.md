---
changeKind: internal
packages:
  - "@alloy-js/babel-plugin"
  - "@alloy-js/babel-plugin-jsx-dom-expressions"
  - "@alloy-js/cli"
  - "@alloy-js/create"
  - "@alloy-js/rollup-plugin"
---

Upgrade Babel and related tooling to v8. `@alloy-js/babel-plugin` drops the obsolete generator/printer override (Babel 8's default generator already preserves JSX whitespace) and no longer depends on the legacy `@types/babel__*` packages. The Babel build now passes `onlyRemoveTypeImports: false` to keep eliding unmarked type-only imports.
