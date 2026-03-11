# P06: Polish and Integration

## Goal
Complete STC wrappers, verify exports, pass all golden scenarios, and handle edge cases.

## Why This Phase Exists
Final quality pass before MVP is declared complete.

## Included Epics
- [E006: External Dependencies, Build File, and Polish](../epics/E006-external-deps-build-polish.md) (T032–T035)

## Included Tasks
| ID | Title | Type |
|----|-------|------|
| T032 | STC wrappers | feature |
| T033 | Barrel exports verification | infra |
| T034 | Golden scenario tests | test |
| T035 | Edge case tests | test |

## Exit Criteria
- All golden scenarios from PRD section 7 pass.
- STC wrappers exist for all key components.
- All barrel exports verified complete.
- Full test suite green.
- All 16 acceptance criteria from PRD section 13 met.

## Risks
- Golden scenarios may reveal integration issues missed in earlier phases.
