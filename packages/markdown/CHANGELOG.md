# Changelog - @alloy-js/markdown

## 0.27.0

### Bug Fixes

- [#465](https://github.com/alloy-framework/alloy/pull/465) Choose content-safe fences for direct string `Code` bodies, omit absent languages, and support single-line info strings containing backticks with tilde fences. Reject multiline info strings. JSX children render unchanged without being inspected for fence conflicts.
- [#466](https://github.com/alloy-framework/alloy/pull/466) Resolve Markdown heading refkeys to same-file fragments and relative cross-file links, with explicit stable IDs and per-file anchor collision handling.

### Features

- [#468](https://github.com/alloy-framework/alloy/pull/468) Add `InlineCode` for composable Markdown code spans. Direct string children receive adaptive backtick delimiters, whitespace-preserving padding, newline normalization, and table-context pipe escaping; JSX children pass through unchanged inside single backticks.
- [#467](https://github.com/alloy-framework/alloy/pull/467) Add composable GFM tables with escaped direct string cells, column alignment, and multiline string descriptions. JSX cell content is passed through unchanged.


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

### Features

- [#152](https://github.com/alloy-framework/alloy/pull/152) Add `<Code />` component
- [#149](https://github.com/alloy-framework/alloy/pull/149) Add `<FrontMatter />` component




## 0.15.0

No changes, version bump only.
