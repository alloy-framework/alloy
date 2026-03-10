You are working inside the Alloy monorepo.

Your task is to convert the PRD for Alloy <TARGET_LANGUAGE> support into a dependency-aware implementation backlog suitable for AI coding agents.

Write the output to:

<BACKLOG_DOC>

Use the following planning inputs as required context:
- <CORE_DOC>
- <PATTERNS_DOC>
- <DESIGN_DOC>
- <PRD_DOC>

The backlog must be:
- implementation-oriented
- incrementally executable
- dependency-aware
- testable
- safe for autonomous execution

Produce a markdown document with the following exact sections:

# 1. Objective
Explain what this backlog is for and how it should be used.

# 2. Sequencing Principles
Explain the ordering logic used for the backlog.

# 3. Epics
Define the major epics for delivering MVP support for <TARGET_LANGUAGE>.

# 4. Detailed Backlog
Provide a dependency-aware task list.

For each task include:
- ID
- Title
- Goal
- Why it matters
- Dependencies
- Implementation notes
- Files/modules likely affected
- Acceptance criteria
- Suggested tests

Tasks should be small enough for an AI coding agent to complete safely, but large enough to be meaningful.

# 5. Critical Path
Identify the tasks that form the critical path to MVP.

# 6. Parallelizable Work
Identify tasks that can be performed in parallel with low coordination risk.

# 7. Risky Tasks
Identify tasks with the highest architectural or correctness risk.

# 8. Suggested First 5 Tasks
Recommend the first five tasks to implement in order.

Requirements:
- Do not merely restate PRD headings.
- Break work into concrete implementation tasks.
- Respect architectural dependencies.
- Prefer vertical slices when useful, but establish foundations first where necessary.
- Make every task testable.