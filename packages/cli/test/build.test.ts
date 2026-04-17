import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const cliPath = join(import.meta.dirname, "..", "cmd", "alloy.js");
const fixturesDir = join(import.meta.dirname, "fixtures");

async function runBuild(
  fixtureName: string,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const cwd = join(fixturesDir, fixtureName);
  try {
    const { stdout, stderr } = await execFileAsync("node", [cliPath, "build"], {
      cwd,
    });
    return { stdout, stderr, exitCode: 0 };
  } catch (e: any) {
    return { stdout: e.stdout ?? "", stderr: e.stderr ?? "", exitCode: e.code };
  }
}

describe("alloy build", () => {
  it("reports correct error count when there are type errors", async () => {
    const { stdout, exitCode } = await runBuild("project-with-type-error");
    expect(exitCode).not.toBe(0);
    // The key assertion: the error count must reflect the actual type errors,
    // not 0 (which was the bug when using emitResult.diagnostics.length).
    expect(stdout).toMatch(/Build completed with \d+ errors?\./);
    expect(stdout).not.toContain("Build completed with 0 errors");
  });

  it("reports success when there are no errors", async () => {
    const { stdout, exitCode } = await runBuild("project-clean");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Build completed successfully");
  });
});
