---
changeKind: feature
packages:
  - "@alloy-js/markdown"
---

Add `InlineCode` for composable Markdown code spans. Direct string children receive adaptive backtick delimiters, whitespace-preserving padding, newline normalization, and table-context pipe escaping; JSX children pass through unchanged inside single backticks.
