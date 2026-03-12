# T073 — Reference Inline Rendering Inserts Unexpected Line Breaks

| Field | Value |
|-------|-------|
| **ID** | T073 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P2 — nice-to-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T010 (Reference basics), T022 (Reference resolution) |
| **Blocks** | — |

---

## Description

The `Reference` component sometimes inserts unexpected line breaks when rendered inline within block-level contexts (e.g., inside function bodies, struct field type annotations). This produces formatting issues where a type reference wraps to a new line unexpectedly.

The issue appears to be related to how the Reference component interacts with the Alloy rendering engine's whitespace and indentation handling in block scope contexts.

---

## Scope Included

- Investigate and fix the rendering behavior of `Reference` in inline/block contexts
- Ensure References render on the same line as their surrounding code
- Add test cases for inline Reference rendering in various contexts

---

## Scope Excluded

- Multi-line generic type References (e.g., `HashMap<\n  K,\n  V\n>`) — those may legitimately wrap
- Reference resolution logic (only rendering/whitespace is in scope)

---

## Acceptance Criteria

- [ ] `field: HashMap<K, V>` renders on a single line (no unexpected breaks)
- [ ] `fn foo() -> Result<T>` renders on a single line
- [ ] References inside expressions (e.g., `let x: Type = ...`) render inline
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. Some References in block contexts produced unexpected line breaks in the generated output.
