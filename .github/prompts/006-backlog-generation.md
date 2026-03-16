You are a senior technical product planner and software architect.

You are working inside the Alloy monorepo.

Your task is to generate a complete, execution-ready project backlog from the Rust language package PRD and documentation @docs/language-packages/rust

The backlog will be consumed primarily by AI coding agents, so it must be:

- precise
- implementation-oriented
- dependency-aware
- incrementally executable
- testable
- safe for autonomous execution

Write the output to:

<BACKLOG_DOC>

Use the following planning inputs as required context:

- <CORE_DOC>
- <PATTERNS_DOC>
- <DESIGN_DOC>
- <PRD_DOC>

These documents may include:

- PRDs
- architecture documents
- non-functional requirements
- data model notes
- API design notes
- state machine docs
- operational constraints
- implementation notes

If some files are clearly obsolete, contradictory, or overlapping:

- call that out explicitly
- make the most reasonable synthesis possible
- do not silently ignore meaningful conflicts

# Objective

Produce a backlog that translates the product and architecture into a practical development plan from foundation to production-ready system.

The output must be suitable for:

- humans who need a complete view of scope, sequencing, and risks
- AI coding agents that execute one task at a time with limited context

---

## What you must do

1. Read and synthesize the documents under `docs/language-packages/rust`.
2. Identify the full scope of work needed to build the system.
3. Break the work into:
   - epics
   - features/capabilities
   - implementation tasks
4. Order the backlog by dependencies and implementation readiness.
5. Separate true product work from enabling/foundation work.
6. Explicitly account for:
   - infrastructure/platform setup
   - testing
   - documentation
7. Include tasks needed for integration between subsystems, not just isolated components.
8. Identify assumptions, missing information, or decisions that block implementation.
9. Prefer vertical slices where possible, but include foundational platform work where necessary.
10. Optimize for AI coding agents that will execute one task at a time with limited context.

## Backlog design rules

Each task must be:

- small enough for one coding agent to complete in one focused work session
- large enough to produce meaningful progress
- independently understandable
- explicitly scoped
- verifiable by tests, review, or observable outcome

Avoid vague tasks like:

- "build auth"
- "create frontend"
- "implement backend"

Prefer concrete tasks like:

- "Add JWT validation middleware for API requests"
- "Create database migration for tenant, user, and role tables"
- "Implement POST /customers endpoint with validation and persistence"
- "Build customer list page with pagination and empty/loading states"

Avoid Placeholder tasks:

- Do not create placeholder, umbrella, or non-executable tasks unless they are true spikes or decision records.
- Each implementation task should correspond to a concrete change that can be completed and validated.

Each task document must be executable in isolation by an AI coding agent. That means it must contain enough context, scope boundaries, dependencies, acceptance criteria, and validation guidance that the agent can implement it without needing to infer the intended work from the PRD alone.

---

## Backlog artifact organization

Generate the backlog as repository documentation using this structure:

- `docs/backlog/index.md` — master backlog index
- `docs/backlog/epics/` — epic-level documents
- `docs/backlog/tasks/` — executable task documents
- `docs/backlog/phases/` — implementation phase documents if useful
- `docs/backlog/agents/` — AI-agent execution guidance if useful

Use stable IDs and deterministic sortable filenames.

Examples:

- `E001-platform-foundation.md`
- `T001-repo-bootstrap.md`
- `P01-foundation.md`

Do not put all detail into the index.  
The index is for navigation, summary, sequencing, and readiness.  
Detailed implementation instructions belong in epic and task documents.

---

## Backlog index requirements

Create `docs/backlog/index.md` as the single entry point for the backlog.

It must include:

- purpose of the backlog
- how to use the backlog
- backlog file organization
- executive summary
- major workstreams
- recommended implementation order
- key risks
- assumptions / gaps / open questions
- epic overview table
- recommended delivery phases
- task summary table
- dependency highlights
- ready-now tasks
- blocked tasks
- high-priority tasks
- links to all detailed backlog documents

The index must be concise enough to scan quickly while still giving a complete map of the backlog.

---

## Epic document requirements

Create one file per epic under `docs/backlog/epics/`.

For each epic include:

- ID
- Title
- Summary
- Why this epic exists
- Goals
- In scope
- Out of scope
- Dependencies
- What it enables
- Risks / notes
- Task list with links
- Sequencing notes
- Completion criteria

---

## Task document requirements

Create one file per executable task under `docs/backlog/tasks/`.

For each task include:

- ID
- Title
- Epic
- Type (foundation, feature, bug, spike, infra, test, docs, security, ops)
- Status
- Priority
- Owner role
- Whether autonomous AI execution is appropriate
- Whether human review is required
- Dependencies
- What this task blocks, if known
- Description
- Goal / why this task exists
- Scope included
- Explicit out-of-scope
- Recommended context files/docs the implementation agent should read first
- Implementation guidance
- Acceptance criteria
- Definition of done
- Validation approach
- Suggested validation commands if they can be reasonably inferred
- Risks or notes
- Follow-on tasks if applicable

Make each task independently understandable and safe for small-context execution.

---

## Phase document requirements

If phases materially improve execution, create phase docs under `docs/backlog/phases/`.

Each phase should include:

- ID
- Title
- Goal
- Why the phase exists
- Included epics
- Included tasks
- Exit criteria
- Risks

Suggested examples:

- Phase 0: repo/platform foundation
- Phase 1: core domain skeleton
- Phase 2: first end-to-end vertical slice
- Phase 3: hardening and operational readiness

---

## AI-agent execution guidance

If useful, create `docs/backlog/agents/execution-rules.md`.

This should explain:

- how AI agents should navigate the backlog
- that they should execute one task at a time
- how to determine whether a task is ready
- when to stop and escalate ambiguity
- which tasks can run in parallel
- which tasks must remain sequential
- which require human checkpoints
- which require integration validation before proceeding

---

## For each backlog item include

At minimum, every backlog item must capture:

- ID
- Title
- Epic
- Type
- Description
- Goal / why this task exists
- Scope included
- Explicit out-of-scope
- Dependencies
- Suggested priority
- Suggested owner role
- Acceptance criteria
- Definition of done
- Risks or notes
- Whether the task is suitable for autonomous AI execution
- Recommended context files/docs the implementation agent should read first

---

## Required planning output

Your generated backlog must contain, either in the index or supporting documents:

### 1. Executive summary

- major workstreams
- recommended implementation order
- key risks
- assumptions/gaps discovered

### 2. Epic list

A concise list of epics with purpose and dependency order.

### 3. Detailed backlog

The full backlog in structured repository documentation.

### 4. Dependency graph

Show task/epic dependency relationships in a simple readable format.

### 5. Recommended delivery phases

Show logical implementation groupings and rollout order.

### 6. AI-agent execution guidance

Explain how autonomous coding agents should safely consume the backlog.

---

## Additional instructions

- Be exhaustive but practical.
- Do not merely restate the PRD.
- Infer missing implementation tasks that are obviously required.
- Surface ambiguities instead of silently guessing when they materially affect execution.
- Prefer dependency-correct sequencing over feature popularity.
- Optimize for a repo where AI agents will pick one task at a time from the backlog.
- Assume maintainability, testability, and observability matter from the start.
- Separate strategic planning from executable implementation work.
- Prefer one file per epic and one file per task.
- Optimize for deterministic discovery and safe parallel work.

---

## Output expectations

Create the backlog artifacts in the repository, not just as a single response.

At minimum, generate:

- `docs/backlog/index.md`
- epic docs
- task docs

If the backlog is large, still ensure the index links to everything and that all task docs are scoped for isolated execution.

Before finalizing the backlog, review it for:

- oversized tasks that should be split
- missing dependency edges
- duplicate or redundant tasks
- tasks that are too vague for autonomous execution
- missing cross-cutting work such as testing, observability, security, docs, and operations

Now analyze the documents under `docs/prd/*.md` and generate the backlog.
