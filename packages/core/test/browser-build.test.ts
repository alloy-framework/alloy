import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { build, type Rollup } from "vite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const tempDir = join(__dirname, ".temp", "browser-build-test");
const entryFile = join(tempDir, "entry.js");

/**
 * Bundles `@alloy-js/core` for the browser using Vite and returns
 * the concatenated output code.
 *
 * Uses the `browser` export condition from the package exports map,
 * which resolves to the compiled browser entry. This requires the
 * package to be built first (the CI pipeline and `pnpm build` handle
 * this automatically).
 */
async function bundleForBrowser(): Promise<string> {
  const result = await build({
    configFile: false,
    logLevel: "silent",
    resolve: {
      conditions: ["browser", "import"],
    },
    // Disable automatic process.env replacement so we can detect leaks
    define: {},
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
      },
    },
  });

  const output = (Array.isArray(result) ? result[0] : result) as Rollup.RollupOutput;
  const chunks = output.output.filter(
    (o): o is Rollup.OutputChunk => o.type === "chunk",
  );
  return chunks.map((c) => c.code).join("\n");
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
    const code = await bundleForBrowser();

    // The browser bundle must not reference the Node.js `process` global.
    // If this fails, a file is using process.env / process.cwd / etc.
    // without going through host/node-host.ts (or another browser-overridden module).
    expect(code).not.toMatch(/\bprocess\./);

    // Should not contain static require("node:…") calls
    expect(code).not.toMatch(/require\(\s*["']node:/);
  }, 30_000);
});

