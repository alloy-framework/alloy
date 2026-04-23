---
changeKind: fix
packages:
  - "@alloy-js/core"
---

Fix O(N²) overhead in `DiagnosticsCollector`. `emit()` and `dismiss()` previously re-broadcast the entire diagnostic history on every call, which dominated render time on large workloads even when debug tracing was disabled (the default). Broadcasts are now skipped when tracing is off, and the trace writer sees per-diagnostic add/remove deltas instead of duplicated inserts.
