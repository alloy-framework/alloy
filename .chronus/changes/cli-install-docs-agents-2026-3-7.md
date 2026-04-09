---
# Change versionKind to one of: breaking, feature, fix, internal
changeKind: feature
packages:
  - "@alloy-js/cli"
---

Add `install-docs` and `install-agents` subcommands. `install-docs` scans installed `@alloy-js` packages and updates `AGENTS.md` with links to version-matched documentation. `install-agents` detects Copilot or Claude and installs agent definitions. Also adds subcommand routing to the CLI with backward-compatible default to build.
