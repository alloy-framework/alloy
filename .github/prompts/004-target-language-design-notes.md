You are working inside the Alloy monorepo.

Your task is to design the implementation approach for a new Alloy language package for <TARGET_LANGUAGE>, using:
1. repository evidence from Alloy core
2. patterns from the existing language packages
3. the real constraints and idioms of <TARGET_LANGUAGE>

Write the output to:

<DESIGN_DOC>

Use these existing planning documents as required context:
- <CORE_DOC>
- <PATTERNS_DOC>

This document is a design brief, not a backlog and not implementation code.
It must define a realistic and scoped plan for <TARGET_LANGUAGE> support.

Produce a markdown document with the following exact sections:

# 1. Objective
State the purpose of the design notes and how they will feed the PRD.

# 2. Target Language Constraints
Describe the core code-organization and syntax constraints of <TARGET_LANGUAGE> that matter for Alloy package design.

Cover the language features that are relevant to code generation, such as:
- file/module/package/namespace model
- import/include/use semantics
- declaration forms
- expression and statement model
- type system concerns
- comments/doc comments
- formatting conventions
- visibility/modifier rules
- special constraints or idioms

# 3. Mapping Alloy Concepts to <TARGET_LANGUAGE>
Map the Alloy concepts from core and the cross-language patterns to the constructs of <TARGET_LANGUAGE>.

For each major concept, explain:
- whether it maps cleanly
- whether it needs adaptation
- whether it suggests a package-specific abstraction
- any risks or limitations

# 4. Proposed Package Shape
Propose the likely package architecture for alloy-<TARGET_LANGUAGE_SLUG> within the monorepo.

Include:
- likely directories/modules
- likely public API shape
- major internal areas of responsibility
- relationship to Alloy core
- any helper layers needed

# 5. MVP Scope
Define the recommended MVP for <TARGET_LANGUAGE> support.

This should be explicit and limited.
Identify the minimum supported capabilities needed for a useful first version.

Be concrete about what is in scope, for example:
- file/module generation
- imports/includes
- identifiers and references
- primitive types
- basic declarations
- functions
- classes/structs/interfaces/enums as relevant
- basic expressions/statements
- comments
- formatting
- tests

# 6. Deferred / Out-of-Scope Features
List advanced features that should be deferred beyond MVP.

# 7. Golden Scenarios
Define a small set of example outputs that the package should be able to generate by the end of MVP.
These should be realistic and useful for testing.

# 8. Risks and Open Design Questions
List the biggest design uncertainties, repo ambiguities, or target-language-specific risks.

# 9. Recommendation
Provide a concise recommendation for how Alloy should support <TARGET_LANGUAGE> in MVP form.

Requirements:
- Ground the design in the repo and existing package patterns.
- Make explicit where you are inferring or proposing.
- Do not create a task backlog yet.
- Do not hand-wave target-language semantics; be precise.
- Optimize the result so a later planning agent can directly convert it into a PRD.
```