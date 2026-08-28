# Changelog - @alloy-js/rollup-plugin

## 0.2.0

### Features

- [#445](https://github.com/alloy-framework/alloy/pull/445) The Rollup/Vite plugin now accepts `addSourceInfo` and `sourceMaps` options and automatically configures esbuild for Alloy (`jsx: "preserve"` plus the `source` resolve conditions). Consumers no longer need to set these by hand in their Vite/Vitest config.


## 0.1.2

### Bug Fixes

- [#402](https://github.com/alloy-framework/alloy/pull/402) Fix package metadata for `@alloy-js/rollup-plugin`: the description now correctly identifies it as the Rollup/Vite Alloy JSX/TSX transform plugin, the package export map includes the source/default export shape, and the plugin accepts a typed options object for future configuration.


## 0.1.1

No changes, version bump only.



## 0.1.0

No changes, version bump only.
