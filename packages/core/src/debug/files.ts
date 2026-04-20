import {
  insertDirectory,
  insertOutputFile,
  updateOutputFileContent,
} from "./trace-writer.js";
import { isDebugEnabled } from "./trace.js";

export interface FileUpdateInfo {
  path: string;
  filetype: string;
  contents: string;
}

const fileContentCache = new Map<string, string>();

/** Record a directory being added to the output. */
export function recordDirectory(path: string) {
  if (!isDebugEnabled()) return;
  insertDirectory(path);
}

/** Record a file being added to the output. */
export function recordFile(path: string, filetype: string) {
  if (!isDebugEnabled()) return;
  insertOutputFile(path, filetype, undefined);
}

/** Notify devtools that a file's contents have changed. De-duplicates by content. */
export function updated(info: FileUpdateInfo) {
  const previous = fileContentCache.get(info.path);
  if (previous === info.contents) return;
  fileContentCache.set(info.path, info.contents);

  updateOutputFileContent(info.path, info.contents);
}

/** Clear all cached file state. Called when a new render begins. */
export function reset() {
  fileContentCache.clear();
}
