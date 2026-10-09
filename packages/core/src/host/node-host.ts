/**
 * Node.js host APIs.
 *
 * Provides access to Node.js-specific process APIs. In browser builds this
 * module is replaced by `node-host.browser.ts` which returns safe defaults.
 */

export function env(key: string): string | undefined {
  return process.env[key];
}

export function cwd(): string {
  return process.cwd();
}

export function stdoutWrite(text: string): void {
  process.stdout.write(text);
}

export function sourceMapsEnabled(): boolean {
  return !!(process as any).sourceMapsEnabled;
}
