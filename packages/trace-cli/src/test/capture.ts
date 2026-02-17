import type { DatabaseSync } from "node:sqlite";

/**
 * Captures all console.log and console.error output during `fn()`.
 * Returns { stdout, stderr } as joined strings.
 */
export function captureOutput(fn: () => void): {
  stdout: string;
  stderr: string;
} {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const origLog = console.log;
  const origError = console.error;

  console.log = (...args: any[]) => stdoutLines.push(args.join(" "));
  console.error = (...args: any[]) => stderrLines.push(args.join(" "));

  try {
    fn();
  } finally {
    console.log = origLog;
    console.error = origError;
  }

  return {
    stdout: stdoutLines.join("\n"),
    stderr: stderrLines.join("\n"),
  };
}
