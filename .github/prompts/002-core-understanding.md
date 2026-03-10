You are working inside the Alloy monorepo.

Your task is to understand Alloy core deeply enough that a later agent can design a new <TARGET_LANGUAGE> language package without misplacing responsibilities between core and language-specific libraries.

Write the output to:

<CORE_DOC>

Do not design <TARGET_LANGUAGE> yet.
Do not describe implementation tasks yet.
This document must be primarily descriptive, not prescriptive.

Study the repository and produce a markdown document with the following exact sections:

# 1. Objective
Explain the purpose of this document and how it will be used later.

# 2. What Alloy Appears to Be
Describe Alloy's role as a code generation framework based on repository evidence.
Summarize the apparent generation model in plain language.

# 3. Core Architectural Model
Explain the core architecture of Alloy.
Cover the major abstractions and how they appear to work together.

At minimum analyze:
- rendering model
- component/composition model
- context/providers/hooks if present
- document/file generation model
- symbol/reference model
- scope and name resolution model
- formatting/printing model
- extension/plugin surfaces for language packages

# 4. Key Core Concepts
Create a glossary of the most important concepts in Alloy core.
For each concept include:
- name
- what it means
- why it matters
- key files where it is defined or exercised

# 5. Core-to-Language Extension Surface
Describe exactly how language packages appear to build on core.
Identify the likely contracts, APIs, primitives, or patterns that language packages rely on.

Separate:
- clearly observed extension points
- inferred extension patterns

# 6. Source File Inventory
List the most important core files and directories.
For each include:
- path
- purpose
- notable exported types/functions/components/classes
- why it is relevant to new language support

# 7. Invariants and Constraints
Document the important invariants or architectural constraints that later work must respect.
Examples:
- what core appears to own
- what language packages appear to own
- assumptions about rendering
- assumptions about symbol handling
- assumptions about output structure

# 8. Testing Patterns in Core
Describe how core behavior is tested and what that implies for future language packages.

# 9. Ambiguities / Open Questions
List anything that is unclear, inconsistent, or underdocumented in the repo.

# 10. Key Takeaways for Future Language Package Design
Summarize the most important lessons from core that a planner must not miss.

Requirements:
- Ground important claims in repository-relative file paths.
- Be concrete.
- Separate fact from inference.
- Do not propose new abstractions unless necessary to explain an observed gap.
- Optimize the document for later AI agents that will design and implement <TARGET_LANGUAGE>.