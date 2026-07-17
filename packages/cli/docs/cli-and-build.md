# CLI & Build

## Creating a Project

```sh
npm init @alloy-js
```

Scaffolds a new Alloy project interactively. Prompts for package metadata and project type:

- **JSX project** — components use `.tsx` files with the Alloy JSX transform.
- **STC project** — components use string template components (no JSX transform required).
- **Library** — publishable package.

Generates `package.json`, `tsconfig.json`, `vitest.config.ts`, and a starter `src/` layout. Use `-y` for defaults.

## TypeScript Configuration

Alloy uses a split build: TypeScript emits **only declarations** (`.d.ts`), Babel handles all JavaScript output. Your `tsconfig.json` must set:

```jsonc
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "preserve", // preserve JSX for Alloy-specific reactive compilation by Babel
    "jsxImportSource": "@alloy-js/core",
    "emitDeclarationOnly": true, // TS emits .d.ts only, Babel emits .js
    "declaration": true,
  },
}
```

## The `alloy` CLI

```sh
npm install -D @alloy-js/cli
```

```sh
alloy build [--watch] [--dev] [--prod] [--source-info] [--with-dev]
alloy install-docs
alloy install-agents
```

### Build

```sh
alloy build [flags]
```

Running `alloy` with no subcommand or with build flags defaults to build.

| Flag            | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| `--watch`       | Rebuild on file changes (defaults to dev mode)         |
| `--dev`         | Development build (includes source info for debugging) |
| `--prod`        | Production build (strips source info)                  |
| `--source-info` | Explicitly enable/disable source info                  |
| `--with-dev`    | Dual build: prod → `dist/`, dev → `dist/dev/`          |

Mode is determined by: CLI flags > `BABEL_ENV` > `NODE_ENV` > default (prod, or dev in watch mode).

### Typical package.json scripts

```jsonc
{
  "scripts": {
    "generate-docs": "api-extractor run", // or your preferred API doc tool
    "build": "alloy build --with-dev && pnpm run generate-docs",
    "clean": "rimraf dist/ .temp/",
    "test:watch": "vitest -w",
    "watch": "alloy build --watch",
    "test": "vitest run",
  },
}
```

#### Publishing

The `"source"` export condition is required for local Vitest resolution but must not be present for consumers. Rather than mutating `package.json` with a prepack script, declare the consumer-facing `exports` (and `imports`) under [pnpm's `publishConfig`](https://pnpm.io/package_json#publishconfig). pnpm swaps these in when packing (`pnpm pack`/`pnpm publish`), so the published manifest has no `"source"` condition:

```jsonc
{
  "exports": {
    ".": {
      "source": "./src/index.ts", // local dev only
      "development": "./dist/dev/index.js",
      "import": "./dist/index.js",
    },
  },
  "publishConfig": {
    // pnpm replaces the whole `exports` field with this on publish
    "exports": {
      ".": {
        "development": "./dist/dev/index.js",
        "import": "./dist/index.js",
      },
    },
  },
}
```

`publishConfig.exports` is a whole-field replacement, so it must contain the complete export map minus the `"source"` condition. The same applies to `imports` if your package uses it. This override only takes effect when packing with pnpm.

You don't have to hand-maintain the `publishConfig` copy. The repo's `eng/sync-publish-config.ts` regenerates it from each package's top-level `exports`/`imports` (stripping `"source"`). Run `pnpm sync-publish-config` to update it, and `pnpm sync-publish-config:check` (run in CI) to fail if it drifts.

> **Note:** Export paths in `package.json` must match your actual output directory (see [Build Pipeline](#build-pipeline) below). Update all compiled output paths in your `exports` accordingly (e.g., `"./dist/dev/index.js"` and `"./dist/index.js"`). The `"source"` condition path (`./src/index.ts`) is unchanged.

### Build Pipeline

1. **TypeScript** — incremental type-checking, emits `.d.ts` declarations only.
2. **Babel** — transforms each `.ts`/`.tsx` file using `@alloy-js/babel-preset`, which includes:
   - `@alloy-js/babel-plugin` — whitespace-preserving JSX transform.
   - `@alloy-js/babel-plugin-jsx-dom-expressions` — fine-grained reactive JSX compilation (Solid.js-style).

Output preserves directory structure: `src/foo.tsx` → `dist/src/foo.js`. Without explicit `rootDir`, TypeScript infers it from the full `include` set, so `src/` appears in the output path. Set `"rootDir": "src"` in `tsconfig.json` to strip it.

No Alloy-specific config file. The CLI reads `tsconfig.json` for `rootDir`, `outDir`, `sourceMap`, and file lists. Default output is `dist/`.

## Build Tooling Packages

- **`@alloy-js/babel-preset`** — complete Babel preset bundling both Alloy plugins. Configures JSX runtime, generation mode, and source info.
- **`@alloy-js/rollup-plugin`** — wraps `@rollup/plugin-babel` with the Alloy preset and TypeScript support for `.ts`/`.tsx` files. Use this when integrating Alloy into a Rollup build instead of the CLI.

## AI Agent Setup

### `install-docs`

```sh
alloy install-docs
```

Scans `node_modules/@alloy-js/` for installed packages that include a `docs/` directory. Creates or updates `AGENTS.md` at the project root with a managed section linking to each package's documentation index. This tells AI coding agents (Copilot, Claude, etc.) where to find version-matched Alloy docs.

The managed section uses `<!-- BEGIN:alloy-docs -->` / `<!-- END:alloy-docs -->` markers so the command is idempotent — running it again updates the section without affecting other content in `AGENTS.md`.

| Flag                  | Purpose                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--output <dir>`      | Directory for `AGENTS.md` (defaults to the git root, or the project root if not in a repo).                      |
| `--top-heading-level` | Level (1–5) for the section's top heading. Default `1` emits `# Alloy Framework`; `2` emits `## Alloy ...`, etc. |

### `install-agents`

```sh
alloy install-agents
```

Installs Alloy agent definitions (debugger, language-package-reviewer, etc.) into your project. Automatically detects whether you use GitHub Copilot (`.github/`) or Claude Code (`.claude/`) and places agent files in the appropriate directory:

- **Copilot**: `.github/agents/<name>.agent.md`
- **Claude**: `.claude/agents/<name>.md`

If both directories exist, agents are installed for both platforms.
