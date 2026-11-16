---
changeKind: fix
packages:
  - "@alloy-js/create"
---

Generate `src/index.tsx` instead of `src/index.ts` for JSX projects, so the entrypoint can contain JSX (as in the TypeScript walkthrough) without renaming it.
