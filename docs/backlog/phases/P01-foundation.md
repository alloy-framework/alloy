# P01: Foundation

## Goal
Establish the package scaffold, symbol system, scope hierarchy, and name policy — the foundation everything else builds on.

## Why This Phase Exists
No components can be built without symbols and scopes. No tests can run without test infrastructure. This phase is 100% foundation work.

## Included Epics
- [E001: Package Foundation](../epics/E001-package-foundation.md)
- [E002: Symbol System](../epics/E002-symbol-system.md) (all tasks)

## Included Tasks
| ID | Title | Type |
|----|-------|------|
| T001 | Package scaffold | foundation |
| T002 | Test infrastructure | foundation |
| T003 | RustOutputSymbol base class | foundation |
| T004 | NamedTypeSymbol and FunctionSymbol | foundation |
| T005 | Scope hierarchy Part 1 (crate/module) | foundation |
| T005b | Scope hierarchy Part 2 (function/lexical/member) | foundation |
| T006 | Symbol factory functions | foundation |
| T007 | Name policy | feature |
| T007b | Name conflict resolver | feature |
| T008 | Parameter descriptor and scope hooks | foundation |

## Exit Criteria
- Package builds and tests run.
- All symbol classes, scope classes, and factories compile.
- Name policy tests pass.
- `import * as rust from "@alloy-js/rust"` works.

## Risks
- Scope hierarchy design is hard to change later. Review T005 carefully.
- Name policy reserved word handling (`r#`) is novel — test thoroughly.
