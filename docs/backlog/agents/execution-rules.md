# AI Agent Execution Rules

## How to Navigate the Backlog

1. **Start with the index**: Read `docs/backlog/index.md` for the full backlog overview.
2. **Check phases**: Read the current phase document (e.g., `phases/P01-foundation.md`) for context.
3. **Pick a ready task**: A task is "ready" when all its dependencies have status `done`.
4. **Read the task document fully** before starting implementation.
5. **Read all listed context files** before writing code.

## Execution Rules

### One Task at a Time
- Execute exactly one task per session.
- Complete the task fully (including tests) before moving on.

### How to Determine if a Task is Ready
A task is ready when:
- All tasks listed in its `Dependencies` field have been completed.
- The task status is `pending` (not `in_progress`, `done`, or `blocked`).

### Ready-Now Tasks (Phase 1)
These tasks have no dependencies and can start immediately:
- **T001**: Package scaffold
- **T007**: Name policy (depends only on T001)
- **T008**: Parameter descriptor (depends only on T001)
- **T016**: DocComment (depends only on T001)
- **T017**: TypeParameters (depends only on T001)
- **T018**: Value component (depends only on T001)

### Sequential Chains
These tasks must be done in order:
- T001 → T002 → T003 → T004 → T005 → T006 (foundation chain)
- T001 → T003 → T004 → T005 → T005b → T006 (foundation chain)
- T009 → T010 → T011/T012/T013/T014 (component chain)
- T022 → T023 → T024 → T025 → T026 → T027 (module system chain)
- T028 → T029 → T031 → T030 (external deps chain)

### Parallel-Safe Tasks
These groups can be done in parallel (after their dependencies are met):
- T007, T007b, T008, T016, T017, T018 (independent foundations)
- T011, T012, T013, T014, T015 (independent components after T010)
- T019, T020 (traits and impl after E003)
- T032, T033, T034, T035 (polish tasks after prior phases)

### When to Stop and Escalate
Stop and ask for human guidance when:
- A task's acceptance criteria are ambiguous.
- You discover a design conflict between the task and existing code.
- A dependency is listed as `done` but the expected code doesn't exist.
- You need to modify `@alloy-js/core` to complete a task (this is not allowed).
- Tests fail in ways that suggest an architectural issue, not a bug.

### Human Review Checkpoints
These tasks require human review before proceeding:
- **T001**: Initial package setup (structure must be correct).
- **T005**: Scope hierarchy (architecture review).
- **T022**: Reference resolution (most complex task).
- **T034**: Golden scenarios (validates full MVP).

### Quality Rules
- Every task that adds a component must include tests.
- Tests use `toRenderTo()` matcher with `d` template tag for expected output.
- Always import `"@alloy-js/core/testing"` in test files.
- Follow Alloy conventions: `props.x` access, `code` template tag, kebab-case files.
- Do not modify `@alloy-js/core` or any other package.
- Do not update changelogs.

### After Completing a Task
1. Run `pnpm --filter @alloy-js/rust build` to verify compilation.
2. Run `pnpm --filter @alloy-js/rust test` to verify all tests pass.
3. If both pass, the task is done.
4. If either fails, fix the issues before marking done.
