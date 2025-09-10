---
changeKind: feature
packages:
  - "@alloy-js/core"
---

Added a new type of Refkey: Refkeyable. Refkeyables are objects which implement the REFKEYABLE symbol method to return a Refkey. Refkeyables are accepted in many places. When a Refkey is needed, the `toRefkey` function can be used.