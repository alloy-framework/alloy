---
changeKind: breaking
packages:
  - "@alloy-js/core"
---

Alloy's render tree is now a DOM-like `AlloyNode` tree instead of `RenderedTextTree`. Tree-facing APIs such as `renderTree`, `printTree`, `sourceFilesForTree`, `getDiagnosticsForTree`, and `getContextForNode` now operate on `AlloyNode` instances. The old print-hook APIs (`RenderedTextTree`, `PrintHook`, `createRenderTreeHook`, `printHookTag`, and `isPrintHook`) are removed. `getContextForRenderNode` remains as a deprecated alias for `getContextForNode`.
