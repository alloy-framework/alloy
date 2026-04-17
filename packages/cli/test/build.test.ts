import { execa } from "execa";
import { join } from "node:path";
import { expect, it } from "vitest";

const cliPath = join(import.meta.dirname, "..", "cmd", "alloy.js");
const fixturesDir = join(import.meta.dirname, "fixtures");

async function runBuild(
  fixtureName: string,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const cwd = join(fixturesDir, fixtureName);
  try {
    const { stdout, stderr } = await execa("node", [cliPath, "build"], {
      cwd,
    });
    return { stdout, stderr, exitCode: 0 };
  } catch (e: any) {
    return { stdout: e.stdout ?? "", stderr: e.stderr ?? "", exitCode: e.code };
  }
}

it("reports correct error count when there are type errors", async () => {
  const { stdout, exitCode } = await runBuild("project-with-type-error");
  expect(exitCode).not.toBe(0);
  expect(stdout).toMatch(/Build completed with \d+ errors?\./);
  expect(stdout).toContain("Build completed with 1 error");
});

it("reports success when there are no errors", async () => {
  const { stdout, exitCode } = await runBuild("project-clean");
  expect(exitCode).toBe(0);
  expect(stdout).toContain("Build completed successfully");
});
