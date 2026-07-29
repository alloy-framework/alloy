# Changelog - @alloy-js/cli

## 0.25.0

### Features

- [#440](https://github.com/alloy-framework/alloy/pull/440) `alloy build` now uses the native TypeScript compiler binary, adding support for TypeScript 7. Type-checking and declaration emit shell out to the project's `tsc` instead of the (now removed) programmatic compiler API, and watch mode uses Node's built-in recursive file watcher. Requires Node.js >=22.


## 0.24.0

### Bug Fixes

- [#407](https://github.com/alloy-framework/alloy/pull/407) Adds a `--top-heading-level <N>` option to `install-docs` so callers can control the heading depth of the generated AGENTS.md section.


## 0.23.0

### Bug Fixes

- [#384](https://github.com/alloy-framework/alloy/pull/384) Fix error count not including TypeScript errors
- [#353](https://github.com/alloy-framework/alloy/pull/353) Make sure sourceMappingURL is added in --watch mode

### Features

- [#379](https://github.com/alloy-framework/alloy/pull/379) Add `install-docs` and `install-agents` subcommands. `install-docs` scans installed `@alloy-js` packages and updates `AGENTS.md` with links to version-matched documentation. `install-agents` detects Copilot or Claude and installs agent definitions. Also adds subcommand routing to the CLI with backward-compatible default to build.
- [#350](https://github.com/alloy-framework/alloy/pull/350) Add --dev and --prod options to alloy build. Production builds do not have source information. `watch` is dev build by default.
- [#368](https://github.com/alloy-framework/alloy/pull/368) Add `--with-dev` flag to produce both production (`dist/`) and development (`dist/dev/`) builds. Dev builds include source info from babel transforms for improved debugging. `--dev` produces only a dev build to `dist/`, and `--watch` now defaults to dev mode. Package exports use `"development"` condition so consumers can opt into dev builds via `node --conditions=development`.

