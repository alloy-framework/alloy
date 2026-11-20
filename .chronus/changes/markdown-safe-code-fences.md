---
changeKind: fix
packages:
  - "@alloy-js/markdown"
---

Choose content-safe fences for direct string `Code` bodies, omit absent languages, and support single-line info strings containing backticks with tilde fences. Reject multiline info strings. JSX children render unchanged without being inspected for fence conflicts.
