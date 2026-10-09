/**
 * Browser stub for Node.js host APIs.
 *
 * Replaces `node-host.ts` in browser builds so that no Node.js globals
 * (`process`, etc.) are referenced.
 */

export function env(_key: string): string | undefined {
  return undefined;
}

export function cwd(): string {
  return "";
}

export function stdoutWrite(text: string): void {
  // eslint-disable-next-line no-console
  console.log(text);
}

export function sourceMapsEnabled(): boolean {
  return false;
}
