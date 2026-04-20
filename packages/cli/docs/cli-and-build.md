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
    "prepack": "node scripts/strip-dev-exports.js", // see Publishing below
  },
}
```

#### Publishing

Before publishing, strip the `"source"` export condition — it is required for local Vitest resolution but must not be present for consumers. Create `scripts/strip-dev-exports.js` in your package root:

```js
import { readFileSync, writeFileSync } from "fs";
const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
function strip(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  delete obj.source;
  for (const val of Object.values(obj)) strip(val);
  return obj;
}
if (pkg.exports) strip(pkg.exports);
if (pkg.imports) strip(pkg.imports);
writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
console.log("Stripped source exports from package.json.");
```

The `prepack` script above runs this automatically before `npm publish`.

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

### `install-agents`

```sh
alloy install-agents
```

Installs Alloy agent definitions (debugger, language-package-reviewer, etc.) into your project. Automatically detects whether you use GitHub Copilot (`.github/`) or Claude Code (`.claude/`) and places agent files in the appropriate directory:

- **Copilot**: `.github/agents/<name>.agent.md`
- **Claude**: `.claude/agents/<name>.md`

If both directories exist, agents are installed for both platforms.
