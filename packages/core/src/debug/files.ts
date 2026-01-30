import { emitDevtoolsMessage } from "./trace.js";

export interface FileUpdateInfo {
  path: string;
  filetype: string;
  contents: string;
  unchanged: boolean;
}

const fileContentCache = new Map<string, string>();

export function recordDirectory(path: string) {
  emitDevtoolsMessage({ type: "files:directoryAdded", path });
}

export function recordFile(path: string, filetype: string) {
  emitDevtoolsMessage({ type: "files:fileAdded", path, filetype });
}

export function notifyFileUpdated(info: Omit<FileUpdateInfo, "unchanged">) {
  const previous = fileContentCache.get(info.path);
  const unchanged = previous === info.contents;
  fileContentCache.set(info.path, info.contents);

  // Only send contents if they changed - avoids sending large payloads for unchanged files
  if (unchanged) {
    emitDevtoolsMessage({
      type: "files:fileUpdated",
      path: info.path,
      filetype: info.filetype,
      unchanged: true,
    });
  } else {
    emitDevtoolsMessage({
      type: "files:fileUpdated",
      path: info.path,
      filetype: info.filetype,
      contents: info.contents,
      unchanged: false,
    });
  }
}
