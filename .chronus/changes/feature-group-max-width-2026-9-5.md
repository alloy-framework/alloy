---
changeKind: feature
packages:
  - "@alloy-js/core"
---

Add an optional `max` prop to `<group>`. When set, the group's children are measured in their flat form against `max` rather than against the space left on the current line, so the group lays out the same way wherever it appears. This suits layout rules stated per construct rather than per line — a style that caps argument lists, collection literals or call chains below the file's print width. A group that fits `max` stays flat even when that overruns `printWidth`, leaving an enclosing group to break elsewhere.
