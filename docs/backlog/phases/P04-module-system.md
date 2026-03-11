# P04: Module System and Imports

## Goal
Enable multi-module Rust crates with automatic `use` statement and `mod` declaration generation.

## Why This Phase Exists
This is the most complex phase. Rust's module system with `mod` declarations and `use` paths has no direct analog. This enables multi-file code generation.

## Included Epics
- [E005: Module System and Imports](../epics/E005-module-system-imports.md) (all tasks)

## Included Tasks
| ID | Title | Type |
|----|-------|------|
| T022 | Reference resolution with use tracking | feature |
| T023 | UseStatement and UseStatements | feature |
| T024 | ModuleDirectory component | feature |
| T025 | Auto mod declaration generation | feature |
| T026 | Cross-module import integration tests | test |
| T027 | Module structure integration tests | test |

## Exit Criteria
- `imports.test.tsx`, `reference.test.tsx`, `module-structure.test.tsx` pass.
- Cross-module references auto-generate `use crate::path::Symbol;`.
- `mod` declarations auto-generated in parent modules.
- Import sorting follows Rust convention (std → external → crate).

## Risks
- Use path construction from ResolutionResult is error-prone. Test every scenario.
- Prelude handling could miss edge cases.
