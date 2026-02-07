import { emitDevtoolsMessage, isDebugEnabled } from "./trace.js";

export interface FileUpdateInfo {
  path: string;
  filetype: string;
  contents: string;
}

const fileContentCache = new Map<string, string>();

export function recordDirectory(path: string) {
  if (!isDebugEnabled()) return;
  emitDevtoolsMessage({ type: "files:directoryAdded", path });
}

export function recordFile(path: string, filetype: string) {
  if (!isDebugEnabled()) return;
  emitDevtoolsMessage({ type: "files:fileAdded", path, filetype });
}

export function updated(info: FileUpdateInfo) {
  const previous = fileContentCache.get(info.path);
  if (previous === info.contents) return;
  fileContentCache.set(info.path, info.contents);

  emitDevtoolsMessage({
    type: "files:fileUpdated",
    path: info.path,
    filetype: info.filetype,
    contents: info.contents,
  });
}
