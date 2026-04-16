# T038 — CrateDirectory crateType Prop

| Field                     | Value                                               |
| ------------------------- | --------------------------------------------------- |
| **ID**                    | T038                                                |
| **Epic**                  | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type**                  | feature                                             |
| **Status**                | done                                                |
| **Priority**              | P3 — nice-to-have                                   |
| **Owner Role**            | AI coding agent                                     |
| **AI Executable**         | Yes                                                 |
| **Human Review Required** | No                                                  |
| **Dependencies**          | T009 (CrateDirectory / SourceFile)                  |
| **Blocks**                | —                                                   |

---

## Description

Add a `crateType` prop to `CrateDirectory` to distinguish library crates from binary crates. Currently users can already use `<SourceFile path="main.rs">` to create binary crates (the SourceFile `isModuleRootPath()` function recognizes `main.rs`), but there's no explicit semantic marker.

---

## Goal

`CrateDirectory` accepts `crateType?: "lib" | "bin"` and propagates it via context for downstream components.

---

## Scope Included

1. Add `crateType?: "lib" | "bin"` to `CrateDirectoryProps` (default `"lib"`)
2. Add `crateType` to `CrateContextValue`
3. Pass through in `CrateDirectory` component
4. Add test for binary crate context

---

## Out of Scope

- Cargo.toml `[lib]` / `[[bin]]` section rendering (explicitly deferred in T030)
- Auto-generating `main.rs` vs `lib.rs` (users create SourceFile explicitly)
- Validation that `crateType="bin"` crates have `main.rs`

---

## Context Files

| File                                                      | Relevance                      |
| --------------------------------------------------------- | ------------------------------ |
| `packages/rust/src/components/crate-directory.tsx`        | Add prop                       |
| `packages/rust/src/context/crate-context.tsx`             | Add to context value           |
| `packages/rust/src/components/source-file.tsx`            | Already handles main.rs/lib.rs |
| `packages/rust/test/source-file-crate-directory.test.tsx` | Add test                       |

---

## Implementation Guidance

### crate-directory.tsx

```typescript
export interface CrateDirectoryProps {
  name: string;
  version?: string;
  edition?: string;
  crateType?: "lib" | "bin"; // NEW
  dependencies?: Record<string, CrateDependency>;
  includeCargoToml?: boolean;
  children?: Children;
}
```

### crate-context.tsx

```typescript
export interface CrateContextValue {
  scope: RustCrateScope;
  name: string;
  version?: string;
  edition: string;
  crateType: "lib" | "bin"; // NEW
}
```

Default to `"lib"` in `CrateDirectory`: `crateType: props.crateType ?? "lib"`.

---

## Acceptance Criteria

- [x] `CrateDirectoryProps` has `crateType` field
- [x] `CrateContextValue` has `crateType` field
- [x] `useCrateContext()` returns `crateType`
- [x] Default is `"lib"` when not specified
- [x] Test verifies context value for both lib and bin
- [x] Build passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

---

## Definition of Done

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Implementation Notes

- Added `crateType?: "lib" | "bin"` to `CrateDirectoryProps` with default `"lib"` in `CrateDirectory`.
- Extended `CrateContextValue` with `crateType` and propagated through crate context so consumers receive the semantic crate kind.
- Added/updated test coverage in `source-file-crate-directory` tests to verify crate context behavior for both default lib and explicit bin crates.

## Validation

- Command: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
- Result: Passed.
