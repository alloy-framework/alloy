You are working inside the Alloy monorepo.

Your task is to compare the existing Alloy language packages so that a future agent can identify the stable patterns for implementing a new <TARGET_LANGUAGE> package.

Study the repository and write the output to:

<PATTERNS_DOC>

Use the previously generated core understanding document as context:
<CORE_DOC>

The purpose of this document is not to restate core, but to extract reusable patterns and package-shape expectations from the existing language packages.

Analyze the existing language packages for:

- TypeScript
- Java
- Python
- C#

Produce a markdown document with the following exact sections:

# 1. Objective

Explain how this comparison will inform the design of <TARGET_LANGUAGE> support.

# 2. Packages Compared

List the package paths examined for TypeScript, Java, Python, and C#.

# 3. Common Package Anatomy

Describe the recurring structure shared by the existing language packages.
Examples may include:

- package layout
- public API surface
- component organization
- symbol/reference helpers
- file/module abstractions
- declaration and expression modeling
- formatting utilities
- tests and examples

# 4. Cross-Language Concept Matrix

Create a detailed comparison matrix covering at least:

- source file / module representation
- imports / usings / package declarations / namespaces
- identifiers and symbol references
- literals
- expressions
- statements
- declarations
- type references
- functions / methods
- classes / interfaces / structs / equivalents
- visibility/modifiers/annotations/decorators where applicable
- comments / doc comments
- formatting / whitespace / delimiters
- test strategy

For each concept, explain:

- how TypeScript handles it
- how Java handles it
- how Python handles it
- how C# handles it
- what seems to be the shared principle
- what varies by language

# 5. Reusable Patterns

List the architectural and implementation patterns that appear reusable for any new language package.

# 6. Divergent or Language-Specific Patterns

List the parts that vary significantly and should not be over-generalized.

# 7. Implied Minimum Viable Surface for a New Language Package

Based on the existing packages, infer the likely minimum set of capabilities a new language package should provide.

This section should be an inferred checklist, not yet a target-language proposal.

# 8. Testing Patterns Across Language Packages

Describe how the existing language packages test themselves and what a new package should likely emulate.

# 9. Gaps, Inconsistencies, and Risks

Identify inconsistencies between existing packages or any uncertainty that could affect planning for <TARGET_LANGUAGE>.

# 10. Takeaways for Designing <TARGET_LANGUAGE>

Summarize the most important reusable lessons.

Requirements:

- Ground all major claims in actual repository evidence.
- Use repository-relative paths.
- Distinguish observed package behavior from inferred patterns.
- Do not design <TARGET_LANGUAGE> yet except where explicitly asked in section 10 to state takeaways.
- Optimize for future planning and implementation agents.
