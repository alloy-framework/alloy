---
changeKind: feature
packages:
  - "@alloy-js/go"
---

Add `public` prop to Go declaration components (functions, types, vars, struct members, interface members). When set, symbols are renamed to follow Go exportedness conventions — PascalCase for public, camelCase for private — keeping common initialisms (`ID`, `URL`, `OS`, `HTTPS`, ...) intact while flipping case.
