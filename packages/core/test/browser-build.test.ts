import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { build, type Rolldown } from "vite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const tempDir = join(__dirname, ".temp", "browser-build-test");
const entryFile = join(tempDir, "entry.js");

// Absolute path to the compiled browser entry point.
const corePkgDir = resolve(__dirname, "..");
const browserEntry = resolve(corePkgDir, "dist/src/index.browser.js");

/**
 * Bundles `@alloy-js/core` for the browser using Vite and returns
 * the concatenated output code and any warnings emitted during the build.
 *
 * Uses a custom resolveId plugin to force the browser entry point,
 * because vitest's `resolve.conditions: ["source"]` leaks into the
 * Vite build() call even with `configFile: false`, causing the test
 * to resolve TypeScript source files instead of compiled dist.
 */
async function bundleForBrowser(): Promise<{
  code: string;
  warnings: string[];
}> {
  const warnings: string[] = [];
  const result = await build({
    configFile: false,
    logLevel: "silent",
    resolve: {
      conditions: ["browser", "import"],
      mainFields: ["browser", "module", "main"],
    },
    // Disable automatic process.env replacement so we can detect leaks
    define: {},
    plugins: [
      {
        name: "force-browser-entry",
        enforce: "pre",
        resolveId(source) {
          // Force @alloy-js/core to resolve to the compiled browser entry,
          // bypassing vitest's "source" condition that would resolve to TS.
          if (source === "@alloy-js/core") {
            return browserEntry;
          }
          return null;
        },
      },
      {
        name: "capture-warnings",
        enforce: "post",
        buildStart() {
          // Hook into Vite's warning channel via rollup options
        },
      },
    ],
    customLogger: {
      info() {},
      error() {},
      clearScreen() {},
      hasErrorLogged() {
        return false;
      },
      hasWarned: false,
      warnOnce(msg: string) {
        warnings.push(msg);
      },
      warn(msg: string) {
        warnings.push(msg);
      },
    },
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: entryFile,
        output: { format: "es" },
        // Disable tree-shaking so we catch process.* references in ANY
        // code path, even if it would be removed in a production build.
        treeshake: false,
        external: (id) => {
          // Bundle @alloy-js packages — these are what we're validating
          if (id.startsWith("@alloy-js/")) return false;
          // Bundle relative/absolute imports (intra-package)
          if (id.startsWith(".") || id.startsWith("/")) return false;
          // Externalize third-party deps (vue, pathe, picocolors, …)
          return true;
        },
        onwarn(warning) {
          warnings.push(
            typeof warning === "string" ? warning : (
              (warning.message ?? String(warning))
            ),
          );
        },
      },
    },
  });

  const output = (
    Array.isArray(result) ?
      result[0]
    : result) as Rolldown.RolldownOutput;
  const chunks = output.output.filter(
    (o): o is Rolldown.OutputChunk => o.type === "chunk",
  );
  return { code: chunks.map((c) => c.code).join("\n"), warnings };
}

describe("browser build", () => {
  beforeAll(() => {
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
    mkdirSync(tempDir, { recursive: true });
    writeFileSync(entryFile, 'export * from "@alloy-js/core";\n');
  });

  afterAll(() => {
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("should bundle for browser without Node.js polyfills", async () => {
    const { code, warnings } = await bundleForBrowser();

    // Sanity check: the bundle should not be empty
    expect(code.length).toBeGreaterThan(0);

    // The browser bundle must not reference the Node.js `process` global.
    // If this fails, a file is using process.env / process.cwd / etc.
    // without going through host/node-host.ts (or another browser-overridden module).
    expect(code).not.toMatch(/\bprocess\./);

    // Should not contain static require("node:…") calls
    expect(code).not.toMatch(/require\(\s*["']node:/);

    // Should not contain dynamic import("node:…") calls — these are the
    // ones esbuild and other browser bundlers reject (e.g. node:sqlite, node:fs).
    expect(code).not.toMatch(/import\(\s*["']node:/);

    // Vite silently externalizes node:* modules for browser builds via its
    // built-in rolldown:vite-resolve plugin, which hides the issue from the
    // code assertions above. Catch those by checking for externalization warnings.
    const nodeExternalizationWarnings = warnings.filter(
      (w) =>
        w.includes("externalized for browser compatibility") ||
        w.includes("node:"),
    );
    expect(
      nodeExternalizationWarnings,
      `Node.js modules were externalized for browser compatibility — missing browser shims:\n${nodeExternalizationWarnings.join("\n")}`,
    ).toEqual([]);
  }, 30_000);
});
