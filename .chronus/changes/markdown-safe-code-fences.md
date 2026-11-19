---
changeKind: fix
packages:
  - "@alloy-js/markdown"
---

Keep rendered `Code` bodies inside a single Markdown code block by choosing content-safe fences. Omit absent languages and support single-line info strings containing backticks with tilde fences. Reject multiline info strings.
