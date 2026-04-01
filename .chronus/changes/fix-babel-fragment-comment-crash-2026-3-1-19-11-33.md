---
# Change versionKind to one of: breaking, feature, fix, internal
changeKind: fix
packages:
  - "@alloy-js/babel-plugin-jsx-dom-expressions"
---

Fix crash for empty substitutions within JSX, which allows comments like `{ /* comment */ }`
