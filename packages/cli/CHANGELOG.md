# Changelog - @alloy-js/cli

## 0.23.0

### Bug Fixes

- [#353](https://github.com/alloy-framework/alloy/pull/353) Make sure sourceMappingURL is added in --watch mode

### Features

- [#350](https://github.com/alloy-framework/alloy/pull/350) Add --dev and --prod options to alloy build. Production builds do not have source information. `watch` is dev build by default.
- [#368](https://github.com/alloy-framework/alloy/pull/368) Add `--with-dev` flag to produce both production (`dist/`) and development (`dist/dev/`) builds. Dev builds include source info from babel transforms for improved debugging. `--dev` produces only a dev build to `dist/`, and `--watch` now defaults to dev mode. Package exports use `"development"` condition so consumers can opt into dev builds via `node --conditions=development`.

