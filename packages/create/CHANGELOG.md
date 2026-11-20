# Changelog - @alloy-js/create

## 0.27.0

### Bug Fixes

- [#459](https://github.com/alloy-framework/alloy/pull/459) Generate `src/index.tsx` instead of `src/index.ts` for JSX projects, so the entrypoint can contain JSX (as in the TypeScript walkthrough) without renaming it.
- [#458](https://github.com/alloy-framework/alloy/pull/458) Fix `npm init @alloy-js` on Windows: resolve `deps.json` and `deps-versions.json` with `fileURLToPath(import.meta.url)` instead of stripping the `file:` prefix, which produced paths like `C:\C:\...`.


## 0.26.0

No changes, version bump only.

## 0.25.0

No changes, version bump only.

## 0.24.0

No changes, version bump only.

## 0.23.0

### Features

- [#368](https://github.com/alloy-framework/alloy/pull/368) Ship dev sources in package for debugging. Use node's --condition="development" flag to use this build.


## 0.22.0

No changes, version bump only.

## 0.21.0

No changes, version bump only.

## 0.20.0

No changes, version bump only.

## 0.19.0

No changes, version bump only.

## 0.18.0

No changes, version bump only.

## 0.17.0

No changes, version bump only.

## 0.16.0

No changes, version bump only.

## 0.15.0

No changes, version bump only.

## 0.14.0

No changes, version bump only.

## 0.13.0

No changes, version bump only.

## 0.12.0

No changes, version bump only.

## 0.11.0

No changes, version bump only.

## 0.10.0

No changes, version bump only.

## 0.9.0

No changes, version bump only.

## 0.8.0

No changes, version bump only.

## 0.7.0

### Features

- [#63](https://github.com/alloy-framework/alloy/pull/63) Add a create package. Use `npm init @alloy-js` to use.
