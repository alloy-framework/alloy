import { execSync } from "child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const testDir = join(__dirname, ".temp", "vite-test-project");

describe("Browser Build Test", () => {
  beforeAll(() => {
    // Cleanup previous runs
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }

    // Create a temporary Vite project
    mkdirSync(testDir, { recursive: true });

    execSync("npm init -y", { cwd: testDir });
    execSync("npm install vite", { cwd: testDir });
    execSync("npm install ../../..", { cwd: testDir });

    // Create a minimal Vite app
    writeFileSync(
      join(testDir, "index.js"),
      `
        import { writeOutput } from "@alloy-js/core";
        console.log("Alloy-js core imported successfully!", writeOutput);
      `,
    );

    writeFileSync(
      join(testDir, "vite.config.js"),
      `
        import { defineConfig } from "vite";
    
        export default defineConfig({
          build: {
            outDir: "dist",
            target: "esnext",
          }
        });
      `,
    );

    // Create an index.html file
    writeFileSync(
      join(testDir, "index.html"),
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vite Test</title>
      </head>
      <body>
        <script type="module" src="/index.js"></script>
      </body>
      </html>
      `,
    );

    writeFileSync(
      join(testDir, "package.json"),
      JSON.stringify(
        {
          type: "module",
          scripts: {
            build: "vite build",
          },
        },
        null,
        2,
      ),
    );
  });

  it("Vite should build successfully", () => {
    // Run Vite build process and wait for completion
    expect(() => {
      execSync("npm run build", { cwd: testDir, stdio: "inherit" });
    }).not.toThrow();
  });

  afterAll(() => {
    // Ensure testDir exists before attempting to remove it
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});
