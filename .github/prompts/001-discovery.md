You are working inside the Alloy monorepo.

Your goal is to identify the minimum set of repository files required to understand:

1. Alloy core
2. How language packages extend Alloy
3. The current implementations for TypeScript, Java, Python, and C#
4. The testing patterns used by existing language packages
5. Any contributor docs, architecture docs, package READMEs, or examples relevant to adding a new language package

Do not write a full architecture summary yet.
Do not propose a design for a target language yet.

Instead, produce a discovery document at:

docs/00-relevant-files.md

The document must contain:

# Purpose

A short explanation of why these files matter for planning a new language package.

# Core Files

A list of the key files/directories needed to understand Alloy core.
For each item include:

- path
- why it matters
- what concept it likely covers

# Existing Language Package Files

For TypeScript, Java, Python, and C#, list the most important files/directories.
For each item include:

- path
- package/language
- why it matters
- likely role in the package

# Tests and Examples

List the most relevant test/example files and why they matter.

# Documentation

List repo docs that appear important.

# Recommended Reading Order

Provide a practical reading order for the next analysis passes.

# Exclusions

List files/directories that appear large but likely irrelevant for this task.

Constraints:

- Be selective. Prefer quality over exhaustiveness.
- Ground everything in the repo.
- Do not guess beyond what the repo supports.
- Keep the document concise but useful.
