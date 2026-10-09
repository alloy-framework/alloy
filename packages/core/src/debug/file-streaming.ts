/**
 * Throttled file-content streaming for devtools.
 *
 * As the render tree mutates, the debug system finds the enclosing
 * `alloy:source-file` wrapper for the changed node and marks it dirty.
 * When a devtools client is connected, dirty files are re-printed at
 * most once per second so users can watch file content build up during
 * rendering. When devtools is not connected, dirty files are flushed
 * once at the end of render via {@link flushAllDirtyFiles}.
 */

import { isDevtoolsConnected } from "../devtools/devtools-server.js";
import type { PrintTreeOptions } from "../output-types.js";
import { getContextForNode } from "../render/node-context.js";
import { ElementNode, type AlloyNode } from "../render/node.js";
import { printNodeToString } from "../render/printer.js";
import { updated as filesUpdated } from "./files.js";
import { isDebugEnabled } from "./trace.js";

const DEVTOOLS_FLUSH_INTERVAL_MS = 1000;

const dirtyFiles = new Set<ElementNode>();
const lastFlushTimeByFile = new Map<string, number>();

/** Find the nearest alloy:source-file ancestor (inclusive). */
function findSourceFileWrapper(node: AlloyNode): ElementNode | undefined {
  let cur: AlloyNode | null = node;
  while (cur !== null) {
    if (cur instanceof ElementNode && cur.localName === "alloy:source-file") {
      return cur;
    }
    cur = cur.parentNode;
  }
  return undefined;
}

interface SourceFileMeta {
  path: string;
  filetype: string;
}

function getSourceFileMeta(wrapper: ElementNode): SourceFileMeta | undefined {
  const ctx = getContextForNode(wrapper);
  const meta = ctx?.meta as
    | {
        sourceFile?: SourceFileMeta;
        sourceFileReady?: boolean;
        printOptions?: PrintTreeOptions;
      }
    | undefined;
  if (meta?.sourceFileReady === false) return undefined;
  return meta?.sourceFile;
}

function getPrintOptions(wrapper: ElementNode): PrintTreeOptions | undefined {
  const ctx = getContextForNode(wrapper);
  const meta = ctx?.meta as { printOptions?: PrintTreeOptions } | undefined;
  return meta?.printOptions;
}

function flushFile(wrapper: ElementNode): void {
  const sf = getSourceFileMeta(wrapper);
  if (!sf) return;
  const printOpts = getPrintOptions(wrapper);
  let contents: string;
  try {
    contents = printNodeToString(wrapper, {
      printWidth: printOpts?.printWidth ?? 80,
      tabWidth: printOpts?.tabWidth ?? 2,
      useTabs: printOpts?.useTabs ?? false,
    }).formatted;
  } catch {
    // Mid-render the tree may be in an inconsistent state — skip this
    // flush attempt and pick it up on the next mutation.
    return;
  }
  if (printOpts?.insertFinalNewLine !== false && !contents.endsWith("\n")) {
    contents += "\n";
  }
  filesUpdated({ path: sf.path, filetype: sf.filetype, contents });
  lastFlushTimeByFile.set(sf.path, Date.now());
  dirtyFiles.delete(wrapper);
}

/**
 * Mark the source file containing `node` as dirty. When devtools is
 * connected and at least 1s has elapsed since this file was last flushed,
 * print and broadcast its content immediately.
 */
export function markFileDirtyForNode(node: AlloyNode): void {
  if (!isDebugEnabled()) return;
  const wrapper = findSourceFileWrapper(node);
  if (!wrapper) return;
  dirtyFiles.add(wrapper);
  if (!isDevtoolsConnected()) return;
  const sf = getSourceFileMeta(wrapper);
  if (!sf) return;
  const last = lastFlushTimeByFile.get(sf.path) ?? 0;
  if (Date.now() - last < DEVTOOLS_FLUSH_INTERVAL_MS) return;
  flushFile(wrapper);
}

/** Flush every dirty file. Called at end of render. */
export function flushAllDirtyFiles(): void {
  if (dirtyFiles.size === 0) return;
  for (const wrapper of [...dirtyFiles]) {
    flushFile(wrapper);
  }
}

/** Reset all streaming state. Called when a new render begins. */
export function reset(): void {
  dirtyFiles.clear();
  lastFlushTimeByFile.clear();
}
