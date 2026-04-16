# T037 — Complete STC Wrappers

| Field                     | Value                                               |
| ------------------------- | --------------------------------------------------- |
| **ID**                    | T037                                                |
| **Epic**                  | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type**                  | feature                                             |
| **Status**                | done                                                |
| **Priority**              | P2                                                  |
| **Owner Role**            | AI coding agent                                     |
| **AI Executable**         | Yes                                                 |
| **Human Review Required** | No                                                  |
| **Dependencies**          | T032 (initial STC wrappers)                         |
| **Blocks**                | —                                                   |

---

## Description

T032 implemented STC wrappers for 12 declaration components. Go wraps all 28 of its components (see `packages/go/src/components/stc/index.ts`). This task adds STC wrappers for the remaining user-facing Rust components to reach parity.

---

## Goal

All user-facing Rust components have STC wrappers, matching Go's coverage pattern.

---

## Scope Included

Add STC wrappers for:

1. `ModuleDocComment` — parallels `DocComment` (already wrapped)
2. `SourceFile` — Go wraps its `SourceFile`
3. `ModuleDirectory` — Go wraps its `ModuleDirectory`
4. `CrateDirectory` — Go wraps its `SourceDirectory` (equivalent)
5. `CargoTomlFile` — structural but user-constructed
6. `Reference` — Go wraps its `Reference`
7. `Parameters` — useful for programmatic construction
8. `TypeParameters` — useful for programmatic construction
9. `Value` — useful for programmatic construction

---

## Out of Scope

Internal/auto-rendered components that users don't construct directly:

- `UseStatement` / `UseStatements` (auto-rendered by SourceFile)
- `ModDeclarations` (auto-rendered by SourceFile)
- `Declaration` (internal wrapper, not user-facing)

---

## Context Files

| File                                        | Relevance                       |
| ------------------------------------------- | ------------------------------- |
| `packages/rust/src/components/stc/index.ts` | Add new wrappers here           |
| `packages/go/src/components/stc/index.ts`   | Reference pattern (28 wrappers) |
| `packages/rust/src/components/index.ts`     | Component exports to wrap       |
| `packages/rust/test/stc.test.tsx`           | Update tests                    |

---

## Implementation Guidance

Follow the existing pattern in `stc/index.ts`:

```typescript
import { stc } from "@alloy-js/core";
import { SourceFile as SourceFileComponent } from "../source-file.js";
// ...
export const SourceFile = stc(SourceFileComponent);
```

Update `stc.test.tsx` to verify at least 2-3 of the new wrappers produce identical output to their JSX equivalents.

---

## Acceptance Criteria

- [x] All user-facing components listed in scope have STC wrappers
- [x] `stc.test.tsx` updated with tests for new wrappers
- [x] Build passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

---

## Definition of Done

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```
