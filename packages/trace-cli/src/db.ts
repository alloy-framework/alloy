import { DatabaseSync } from "node:sqlite";

export function openTrace(path: string): DatabaseSync {
  try {
    return new DatabaseSync(path, { readOnly: true });
  } catch (e: any) {
    console.error(`Failed to open trace database: ${path}\n  ${e.message}`);
    process.exit(1);
  }
}
