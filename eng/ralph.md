Complete ONE task per loop. After completion, exit the copilot CLI. NEVER work on a second task.

## Project: @alloy-js/rust

You are building `@alloy-js/rust`, a new Alloy language package for generating
Rust source code. All work is tracked in `docs/backlog/`. Supporting design
documents live in `docs/language-packages/rust/`.

## Available tooling beyond subagents

Use these tools directly from the main context when they provide faster or
more precise results than spawning a subagent:

- **TypeScript LSP** — use `goToDefinition`, `findReferences`,
  `goToImplementation`, `hover`, `documentSymbol`, `workspaceSymbol`,
  `incomingCalls`, `outgoingCalls`, and `rename` for precise code navigation.
  Prefer LSP over grep when looking up symbols, call sites, or type info.
- **GitHub MCP** — use for issue/PR lookups and repository search.

## Context Stack — loaded deterministically every loop

These files form the context stack that is loaded at the start of every
iteration. Load the same stack every loop to ensure consistency:

- **`.github/copilot-instructions.md`** — loaded automatically by Copilot.
  Alloy JSX conventions, component structure rules, and quality bar.
- **`docs/backlog/index.md`** — read via subagent. The full task index with
  status tracking, dependency graph, and phase ordering for `@alloy-js/rust`.
- **`docs/backlog/agents/execution-rules.md`** — read via subagent. Rules for
  task readiness, sequential chains, parallel-safe groups, and quality gates.
- **`docs/language-packages/rust/`** — design documents (core understanding,
  existing language patterns, Rust design notes, PRD). Load the relevant
  document(s) for the task you are working on.

> **Your primary context window is a scheduler.** Do NOT read large files
> directly. Use subagents for all exploration, file reading, and searching.
> Reserve the main context for decision-making and orchestration.

---

## Phase 1: ORIENT — Pick the next task

1. Use a subagent to read `docs/backlog/index.md` and identify pending tasks.
2. Use a subagent to read `docs/backlog/agents/execution-rules.md` for
   readiness rules and sequential/parallel constraints.
3. **Pre-flight check:** Use a single subagent to run:
   ```bash
   pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
   ```
   If the build or tests fail BEFORE you start your work:
   - **Search existing tasks first.** Use a subagent to check whether
     `docs/backlog/tasks/` already contains a task tracking the same
     failure (match on the failing test name and error signature). If a
     matching task exists, do NOT create a duplicate — instead, add a
     short "Still failing as of <date>" note to the existing task, commit,
     push, and **exit**.
   - Only create a new task file at `docs/backlog/tasks/<id>-<issue>.md`
     if no existing task covers the failure.
   - Update `docs/backlog/index.md` to include the new task.
   - Commit, push, and **exit**. Do not work on anything else.
4. If pre-flight passes, choose the highest-priority `pending` task whose
   dependencies are all `done`. **You decide** what has the highest priority —
   not necessarily the first item. Use the Priority column (P0 > P1 > P2)
   and the critical path from the backlog index.
5. If a task should be split into smaller tasks, split it: create the new
   task files in `docs/backlog/tasks/`, update `docs/backlog/index.md`, commit,
   push, and **exit** (splitting counts as your one task).

---

## Phase 2: STUDY — Research before coding

Use up to 500 parallel subagents to study the codebase, documents,
dependencies, or web resources. **Do NOT assume something is not
implemented** — always search first. Think hard about what you find.

1. Read the task document fully (`docs/backlog/tasks/<task-id>.md`).
2. Read all context files listed in the task's "Context Files" section.
3. Search the codebase for existing implementations related to your task.
   Pay special attention to how `@alloy-js/typescript` implements analogous
   features — it is the primary reference package.
4. Study how related code is structured and what patterns it follows.
5. If the task is already done, mark it as `done` in the task file and in
   `docs/backlog/index.md`, commit, push, and exit.
6. Read relevant design documents from `docs/language-packages/rust/`:
   - `01-core-understanding.md` — Alloy core concepts
   - `02-existing-language-patterns.md` — patterns from TypeScript/Python packages
   - `03-rust-design-notes.md` — Rust-specific design decisions
   - `04-rust-prd.md` — product requirements

---

## Phase 3: DESIGN — Evaluate approaches before coding

Before writing any code, do a design review using subagents:

1. Identify at least **2 viable approaches** for implementing the task.
2. For each approach, evaluate against these criteria (in priority order):
   - Idiomatic to the Alloy codebase's existing patterns (study
     `@alloy-js/typescript` and `@alloy-js/core` for reference)
   - Idiomatic Rust output (generated code should look like hand-written Rust)
   - Simple (KISS principle)
   - Consistent with decisions in `docs/language-packages/rust/03-rust-design-notes.md`
3. Think hard. Choose the approach that best satisfies the criteria.
4. If the decision has systemic impact, record it in the Rust design notes
   or create a new document in `docs/language-packages/rust/` so future loops
   don't revisit the same question.

---

## Phase 4: IMPLEMENT — Write code and tests

1. All code lives in `packages/rust/` under the `@alloy-js/rust` package.
2. Components go in `packages/rust/src/components/` using kebab-case filenames.
3. Symbols go in `packages/rust/src/symbols/`.
4. Tests go in `packages/rust/test/` using Vitest with Alloy testing utilities.
5. Follow Alloy conventions from `.github/copilot-instructions.md`:
   - Use `props.x` access (do NOT destructure props).
   - Use `code` template tag for raw string content.
   - Define `<ComponentName>Props` interfaces for component props.
   - Use `<></>` instead of `<Fragment>`.
   - Do NOT use HTML elements — use Alloy components only.
6. Tests use `toRenderTo()` matcher with `d` template tag for expected output.
   Always import `"@alloy-js/core/testing"` in test files.
7. After implementing, run the tests **for just the Rust package** before
   proceeding to full validation:
   ```bash
   pnpm --filter @alloy-js/rust test
   ```
8. Do NOT modify `@alloy-js/core` or any other existing package.
9. Do NOT update changelogs — these are managed by `npx chronus`.

---

## Phase 5: VALIDATE — Back pressure

Build and test form the **back pressure** that rejects bad code generation.
The faster this wheel turns, the better the outcomes.

Run validation with a **single subagent** (do not fan out builds/tests to
multiple subagents — it causes conflicting backpressure):

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

### What each validation step catches

- **`build`** — TypeScript type system catches structural errors before
  runtime.
- **`test`** — Vitest assertions verify correctness. This is the primary
  correctness gate.

If tests unrelated to your work fail, it is **your job** to resolve them as
part of this increment of change. Think hard when investigating these
failures — do NOT blindly update test expectations to make them pass without
being 100% certain it is the correct thing to do.

### Stuck detection

If validation fails **3 times** on the same issue, stop. Mark the task as
`blocked` in `docs/backlog/index.md` and the task file with a reason,
commit, push, and **exit**. Do not burn the remaining context window retrying.

---

## Phase 6: RECORD — Document and commit

1. Mark your task as `done` in both `docs/backlog/index.md` and the individual
   task file.
2. If you discovered a failure mode, gotcha, or learning, record it in the
   task file or update `docs/backlog/agents/execution-rules.md`.
3. If you learned something about how to build, test, or debug this project,
   update `.github/copilot-instructions.md` via a subagent. Keep updates
   brief and actionable.
4. `git add -A && git commit` using **conventional commit format**, then
   `git push`.
   - Format: `type(rust): description` — e.g., `feat(rust): add struct
declaration component`, `fix(rust): correct scope hierarchy for impl blocks`,
     `test(rust): add enum variant rendering tests`
   - Valid types: `feat`, `fix`, `test`, `chore`, `refactor`, `docs`
   - Scope is always `rust` for `@alloy-js/rust` work.

---

## Phase 7: EXIT

Exit the copilot CLI. If the backlog is complete (no remaining `pending`
tasks), output `<promise>COMPLETED</promise>` before exiting.

---

## Critical Rules (NEVER violate)

9999\. DO NOT IMPLEMENT PLACEHOLDER, STUB, OR MINIMAL IMPLEMENTATIONS. Write
full, complete implementations. If you can't fully implement something,
create tasks for what's missing and exit.

99999\. Use up to 500 parallel subagents for exploring, studying, or searching
code. Use only **1 subagent** for build and test operations.

999999\. If you are stuck on a task (e.g., blocked by a missing dependency,
unclear spec, or repeated failures), mark the task as `blocked` in
`docs/backlog/index.md` and its individual task file with a reason, and exit.
Do not loop forever.

9999999\. When you learn something new about how to build, test, or debug this
project — or discover a pattern that works well — update
`.github/copilot-instructions.md` via a subagent. Keep updates brief and
actionable.

99999999\. When you discover a bug unrelated to your current task, create a
task in `docs/backlog/tasks/` to track it and update `docs/backlog/index.md`.
Commit and continue with your current task (do not fix unrelated bugs
in-loop unless they block your work).

999999999\. NEVER commit secrets, API keys, passwords, or credentials.

9999999999\. Do NOT modify `@alloy-js/core` or any package other than
`@alloy-js/rust`. If your task requires core changes, mark it as `blocked`
with an explanation and exit.

99999999999\. Always study `@alloy-js/typescript` as the reference
implementation before building analogous features in `@alloy-js/rust`.
Follow its patterns for symbol classes, scope types, factory functions,
and component structure.
