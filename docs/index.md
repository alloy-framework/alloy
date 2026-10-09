# Alloy Documentation

Alloy is a code generation framework. You define output structure and content using JSX components, and Alloy renders them into formatted source files.

## Core Framework

- **`@alloy-js/core`** — reactive runtime, component model, formatting, symbol/scope system. See [core docs](../packages/core/docs/index.md) for conceptual guides and [API reference](../packages/core/docs/api/index.md).

## CLI & Build

- See [CLI & Build](../packages/cli/docs/cli-and-build.md) for project creation (`npm init @alloy-js`), the `alloy` CLI, TypeScript configuration, and build tooling.

## Style Guide

- See [Style Guide](../packages/core/docs/guides/style-guide.md) for idiomatic Alloy JSX patterns — conditional rendering, string content, line breaks, props, list rendering, reactivity, and component structure.

## References & Refkeys

- See [References & Refkeys](../packages/core/docs/guides/references-and-refkeys.md) for how to declare symbols, reference them across files, and work with refkeys, namekeys, and auto-import generation.

## Implementing a Language Package

- See [Language Package Guide](../packages/core/docs/guides/language-package-guide.md) for guidelines on creating a new `@alloy-js/<language>` package.

## Language Emitters

Each language package provides JSX components for emitting that language's syntax (declarations, imports, types, etc.):

- **`@alloy-js/typescript`** — emit TypeScript/JavaScript code. [API reference](../packages/typescript/docs/api/index.md).
- **`@alloy-js/python`** — emit Python code. [API reference](../packages/python/docs/api/index.md).
- **`@alloy-js/java`** — emit Java code. [API reference](../packages/java/docs/api/index.md).
- **`@alloy-js/csharp`** — emit C# code. [API reference](../packages/csharp/docs/api/index.md).
- **`@alloy-js/go`** — emit Go code. [API reference](../packages/go/docs/api/index.md).
- **`@alloy-js/json`** — emit JSON (objects, arrays, properties). [API reference](../packages/json/docs/api/index.md).
- **`@alloy-js/markdown`** — emit Markdown.

## Tooling

- **`@alloy-js/create`** — project scaffolding (`npm init @alloy-js`).
- **`@alloy-js/cli`** — build and watch Alloy projects.
- **`@alloy-js/babel-plugin-jsx-dom-expressions`** — core JSX transform.
- **`@alloy-js/babel-plugin`** — whitespace-preserving JSX preprocessing and import normalization.
- **`@alloy-js/babel-preset`** — bundles the JSX transform and Alloy preprocessing plugins.
- **`@alloy-js/rollup-plugin`** — Rollup integration for the JSX transform.
- **`@alloy-js/trace-cli`** — inspect Alloy trace files.
