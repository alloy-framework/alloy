import type { DatabaseSync } from "node:sqlite";

/**
 * Captures all console.log and console.error output during `fn()`.
 * Returns { stdout, stderr } as joined strings with ANSI codes stripped.
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

  // eslint-disable-next-line no-control-regex
  const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

  return {
    stdout: stripAnsi(stdoutLines.join("\n")),
    stderr: stripAnsi(stderrLines.join("\n")),
  };
}
