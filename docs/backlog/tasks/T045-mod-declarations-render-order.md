# T045 — ModDeclarations Render Order Dependency

| Field | Value |
|-------|-------|
| **ID** | T045 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | improvement |
| **Status** | done |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T025 (ModDeclarations), T009 (SourceFile / CrateDirectory) |
| **Blocks** | — |

---

## Description

`ModDeclarations` reads `props.scope.childModules` at render time via `Array.from(props.scope.childModules.values())`. Although `childModules` is declared as `shallowReactive(new Map())`, the rendering does not re-trigger when modules are added after initial render.

This means `<SourceFile path="lib.rs" />` must be placed AFTER all `<ModuleDirectory>` children in the JSX tree, otherwise mod declarations are empty:

```tsx
// ❌ lib.rs renders with empty mod declarations
<CrateDirectory name="my_crate">
  <SourceFile path="lib.rs" />
  <ModuleDirectory path="models">...</ModuleDirectory>
</CrateDirectory>

// ✅ Works — lib.rs after modules
<CrateDirectory name="my_crate">
  <ModuleDirectory path="models">...</ModuleDirectory>
  <SourceFile path="lib.rs" />
</CrateDirectory>
```

---

## Goal

`ModDeclarations` correctly renders all child modules regardless of JSX ordering.

---

## Scope Included

- Investigate why `shallowReactive` Map changes don't trigger re-rendering in `ModDeclarations`
- Fix reactivity tracking so `ModDeclarations` re-renders when `childModules` is mutated
- Alternatively, restructure rendering to ensure modules are always registered before `ModDeclarations` renders
- Add a test that places `SourceFile path="lib.rs"` BEFORE `ModuleDirectory` children

---

## Scope Excluded

- Changes to core reactive rendering engine (unless minimal)

---

## Acceptance Criteria

- [x] `<SourceFile path="lib.rs" />` renders correct mod declarations regardless of JSX position
- [x] Existing module structure tests continue to pass
- [x] New test validates order-independence

---

## Evidence

Discovered in `samples/rust-example/` where placing `lib.rs` before modules produced empty mod declarations. The `ModDeclarations` component at `packages/rust/src/components/mod-declarations.tsx:26` snapshots the map. The reactive Map is at `packages/rust/src/scopes/rust-crate-scope.ts:29`.
