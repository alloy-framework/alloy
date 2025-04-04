---
changeKind: feature
packages:
  - "@alloy-js/core"
---

Add `skipFalsy` prop to `For` component for controlling whether to skip falsy values. Previously this defaulted to true, it now defaults to false (which likely just fixes bugs).