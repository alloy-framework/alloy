# T009: SourceFile and CrateDirectory

| Field       | Value                                      |
| ----------- | ------------------------------------------ |
| **Task ID** | T009                                       |
| **Epic**    | E003 — Core Declaration Components         |
| **Deps**    | T005 (Scope hierarchy), T007 (Name policy) |
| **Blocks**  | T010, T022                                 |
| **Status**  | Done                                       |

## Description

Create the foundational structural components that represent Rust source files and crate directories. `SourceFile` wraps core's `SourceFile`, creates a `RustModuleScope`, sets `filetype="rust"`, provides the Rust `Reference` component, and reserves space for rendering `use` statements and `mod` declarations (both stubs initially). `CrateDirectory` creates a `RustCrateScope`, wraps core's `SourceDirectory`, and provides crate-level context. Also introduce `CrateContext` for sharing crate metadata down the tree.

## Goal

Enable rendering of `.rs` files within a crate directory structure, with correct scope creation and file-type metadata, so that downstream components (declarations, references) can be nested inside them.

## Scope

- `src/components/source-file.tsx` — `SourceFile` component.
- `src/components/crate-directory.tsx` — `CrateDirectory` component.
- `src/context/crate-context.tsx` — `CrateContext` with crate scope and metadata.
- `src/context/index.ts` — barrel export for all contexts.
- Update `test/utils.tsx` to use the real `SourceFile` and `CrateDirectory`.

### Props

```ts
interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: Children;
}

interface CrateDirectoryProps {
  name: string;
  version?: string;
  edition?: string; // defaults to "2021"
  children?: Children;
}
```

## Out of Scope

- `use` statement rendering (stubbed; implemented in T022).
- `mod` declaration rendering (stubbed; implemented in T022).
- `Cargo.toml` generation (deferred to T030).
- Cross-module import tracking logic (E005).

## Context Files

| File                                               | Why                                            |
| -------------------------------------------------- | ---------------------------------------------- |
| `packages/go/src/components/SourceFile.tsx`        | Reference pattern for wrapping core SourceFile |
| `packages/go/src/components/ModuleDirectory.tsx`   | Reference pattern for directory + scope        |
| `packages/core/src/components/SourceFile.tsx`      | Core SourceFile being wrapped                  |
| `packages/core/src/components/SourceDirectory.tsx` | Core SourceDirectory being wrapped             |
| `packages/go/src/context.ts`                       | Reference for language-level context           |

## Implementation Guidance

### SourceFile

1. Import `SourceFile as CoreSourceFile` from `@alloy-js/core`.
2. Create a `RustModuleScope` (from T005) for the file.
3. Pass `filetype="rust"` to the core SourceFile.
4. Provide the Rust `Reference` component via the core SourceFile's `reference` prop (initially a placeholder — real Reference comes in T010).
5. Render children inside the scope.
6. Leave stub comment blocks for `use` statement rendering and `mod` declaration rendering.

```tsx
// Pseudocode structure
function SourceFile(props: SourceFileProps) {
  // create RustModuleScope
  // return <CoreSourceFile path={props.path} filetype="rust" reference={RustReference}>
  //   {props.headerComment}
  //   {props.header}
  //   {/* stub: use statements will be rendered here */}
  //   {/* stub: mod declarations will be rendered here */}
  //   {props.children}
  // </CoreSourceFile>
}
```

### CrateDirectory

1. Import `SourceDirectory` from `@alloy-js/core`.
2. Create a `RustCrateScope` (from T005).
3. Wrap children in `CrateContext.Provider` with crate metadata.
4. Wrap in core `SourceDirectory`.

### CrateContext

1. Use `createContext` from `@alloy-js/core`.
2. Store crate name, version, edition, and the `RustCrateScope` reference.

### Alloy Conventions

- Components access props via `props.x` — do NOT destructure.
- Use `<>...</>` for fragments, not `<Fragment>`.
- File names are kebab-case; component names are PascalCase.

## Acceptance Criteria

- [x] `SourceFile` renders a `.rs` file with `filetype="rust"`.
- [x] `SourceFile` creates a `RustModuleScope` for its children.
- [x] `CrateDirectory` creates a `RustCrateScope`.
- [x] `CrateDirectory` provides `CrateContext` to descendants.
- [x] `CrateContext` exposes crate name, version, edition, and scope.
- [x] `test/utils.tsx` updated to use the real components.
- [x] Stub locations for `use` statements and `mod` declarations are present.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- Unit tests pass verifying SourceFile and CrateDirectory render correctly.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm test
```

## Implementation Notes / Learnings

- `SourceFile` now wraps `@alloy-js/core` `SourceFile`, sets `filetype="rust"`, and creates a `RustModuleScope` keyed by file path with crate/module parent scope support (`packages/rust/src/components/source-file.tsx`).
- `CrateDirectory` creates a `RustCrateScope`, defaults crate edition to `"2021"` when omitted, and provides `CrateContext` metadata (`packages/rust/src/components/crate-directory.tsx`, `packages/rust/src/context/crate-context.tsx`).
- `test/utils.tsx` uses real `CrateDirectory` + `SourceFile` wrappers, and focused coverage in `test/source-file-crate-directory.test.tsx` verifies scope/context behavior, rust filetype, and output-neutral placeholder blocks.
