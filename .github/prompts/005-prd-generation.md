You are working inside the Alloy monorepo.

Your task is to produce a detailed, execution-ready PRD for adding <TARGET_LANGUAGE> language support to Alloy.

Write the output to:

<PRD_DOC>

Use the following planning inputs as required context:

- <CORE_DOC>
- <PATTERNS_DOC>
- <DESIGN_DOC>

This PRD will be consumed by AI coding agents and human reviewers.
It must be implementation-oriented, precise, scoped, and testable.

Produce a markdown document with the following exact sections:

# 1. Title

A clear title for the initiative.

# 2. Objective

State the goal of adding <TARGET_LANGUAGE> support to Alloy.

# 3. Background and Context

Summarize the relevant context from Alloy core and existing language packages.
Do not repeat all details; include only what materially affects this initiative.

# 4. Problem Statement

Explain what problem this new package solves and why the work matters.

# 5. Goals

List the concrete goals for the initiative.

# 6. Non-Goals

List what is explicitly out of scope for this effort.

# 7. Users / Stakeholders

Identify the likely users and maintainers of the package.

# 8. Scope of MVP

Define the MVP scope in precise implementation terms.

# 9. Functional Requirements

Provide detailed functional requirements for the new language package.

These should cover, where applicable:

- package scaffolding and public API
- file/module/package/namespace rendering
- import/include/use handling
- identifiers and symbol/reference rendering
- primitive and basic type representation
- declarations
- functions/methods
- classes/structs/interfaces/enums or relevant equivalents
- basic expressions/statements
- comments/doc comments
- formatting behavior
- examples and developer ergonomics
- tests and golden outputs

Each requirement should be specific and testable.

# 10. Non-Functional Requirements

Define relevant quality requirements, such as:

- consistency with Alloy architecture
- maintainability
- clarity of public API
- testability
- incremental extensibility
- predictable rendering behavior

# 11. Proposed Package/Module Architecture

Describe the recommended package structure in the monorepo and the major modules/components to implement.

# 12. Milestones / Phases

Break the work into phases from foundation to MVP completion.

# 13. Acceptance Criteria

Define clear criteria that must be true for MVP to be considered complete.

# 14. Test Strategy

Describe how this package should be tested, including:

- unit tests
- golden/file-output tests
- scenario coverage
- regression coverage

# 15. Risks and Mitigations

List the main implementation risks and how to mitigate them.

# 16. Open Questions

List unresolved questions that should be answered before or during implementation.

# 17. Recommended Next Step

State the immediate next action after this PRD is approved.

Requirements:

- Optimize for execution by autonomous coding agents.
- Be concrete, not aspirational.
- Avoid vague requirements.
- Keep dependencies and implementation order in mind.
- Ground the PRD in the prior analysis docs.
