/**
 * Top-level render entry points.
 *
 * `render` and `renderAsync` take a `Children` tree, insert it into a
 * fresh root `ElementNode`, flush the scheduler, and walk the result
 * to assemble an {@link OutputDirectory}. The walker recognizes
 * marker `localName`s (`alloy:directory`, `alloy:source-file`,
 * `alloy:copy-file`) stamped on the AlloyNode by `<SourceDirectory>`,
 * `<SourceFile>`, and `<CopyFile>` (see `components/`), reading
 * each marker's owning Context for path/filetype metadata.
 */

import { debug, isDevtoolsEnabled } from "./debug/index.js";
import { closeTrace } from "./debug/trace-writer.js";
import { isTraceEnabled } from "./debug/trace.js";
import {
  attachDiagnosticsCollector,
  DiagnosticsCollector,
  emitDiagnosticForTree,
  registerDiagnosticsForTree,
  reportDiagnosticsForTree,
} from "./diagnostics.js";
import type {
  ContentOutputFile,
  CopyOutputFile,
  OutputDirectory,
  PrintTreeOptions,
} from "./output-types.js";
import { root as createRoot, type Context } from "./reactivity.js";
import { notifyRenderError, resetRenderErrorState } from "./render-error.js";
import { getContextForNode } from "./render/node-context.js";
import { AlloyNode, createElement, ElementNode } from "./render/node.js";
import { printNodeToString } from "./render/printer.js";
import type { Children } from "./runtime/component.js";
import { insert } from "./runtime/insert.js";
import { flushJobs, flushJobsAsync, waitForSignal } from "./scheduler.js";

/** Render a component tree to an {@link OutputDirectory}. */
export function render(
  children: Children,
  options?: PrintTreeOptions,
): OutputDirectory {
  debug.assertReadyForSyncRender();
  resetRenderErrorState();
  const root = createElement("alloy:root");
  const collector = new DiagnosticsCollector();
  registerDiagnosticsForTree(root, collector);
  debug.render.initialize(root);
  let output: OutputDirectory | undefined;
  try {
    createRoot(() => {
      attachDiagnosticsCollector(collector);
      insert(root, children);
    });
    flushJobs();
    output = sourceFilesForTree(root, options);
  } catch (error) {
    notifyRenderError(error, collector);
    throw error;
  } finally {
    try {
      reportDiagnosticsForTree(root);
    } finally {
      try {
        debug.render.complete();
      } finally {
        // Close trace DB only if devtools is NOT running. With devtools active the
        // DB must remain open for post-render reactive updates streamed to clients.
        if (isTraceEnabled() && !isDevtoolsEnabled()) closeTrace();
      }
    }
  }
  if (isDevtoolsEnabled()) {
    void waitForSignal();
  }
  return output!;
}

/**
 * Async variant — awaits any scheduled async jobs (e.g. produced by
 * `<Output>` consumers that read external data) before walking the
 * tree.
 */
export async function renderAsync(
  children: Children,
  options?: PrintTreeOptions,
): Promise<OutputDirectory> {
  await debug.prepare();
  resetRenderErrorState();
  const root = createElement("alloy:root");
  const collector = new DiagnosticsCollector();
  registerDiagnosticsForTree(root, collector);
  debug.render.initialize(root);
  let output: OutputDirectory | undefined;
  try {
    createRoot(() => {
      attachDiagnosticsCollector(collector);
      insert(root, children);
    });
    await flushJobsAsync();
    output = sourceFilesForTree(root, options);
  } catch (error) {
    notifyRenderError(error, collector);
    throw error;
  } finally {
    try {
      reportDiagnosticsForTree(root);
    } finally {
      try {
        debug.render.complete();
      } finally {
        if (isTraceEnabled() && !isDevtoolsEnabled()) closeTrace();
      }
    }
  }
  return output!;
}

/**
 * Walk the AlloyNode tree, collecting `<SourceDirectory>`,
 * `<SourceFile>`, and `<CopyFile>` markers into an
 * {@link OutputDirectory}.
 */
export function sourceFilesForTree(
  rootNode: AlloyNode,
  opts?: PrintTreeOptions,
): OutputDirectory {
  let result: OutputDirectory | undefined;
  walk(rootNode, undefined);
  if (!result) {
    emitDiagnosticForTree(rootNode, {
      severity: "error",
      message:
        "No root directory found. Make sure you are using the Output component.",
    });
    return { kind: "directory", path: "", contents: [] };
  }
  return result;

  function walk(node: AlloyNode, cwd: OutputDirectory | undefined): void {
    if (node instanceof ElementNode) {
      const ctx = getContextForNode(node);
      if (node.localName === "alloy:directory") {
        const dirMeta = ctx?.meta?.directory as { path: string } | undefined;
        const dir: OutputDirectory = {
          kind: "directory",
          path: dirMeta?.path ?? "",
          contents: [],
        };
        if (cwd) cwd.contents.push(dir);
        else result = dir;
        for (let c = node.firstChild; c !== null; c = c.nextSibling) {
          walk(c, dir);
        }
        return;
      }
      if (node.localName === "alloy:source-file") {
        const sf = ctx?.meta?.sourceFile as
          | { path: string; filetype: string }
          | undefined;
        if (sf) {
          if (!cwd) {
            throw new Error(
              "Source file doesn't have parent directory. Make sure you have used the Output component.",
            );
          }
          const printOpts = ctx!.meta!.printOptions as
            | PrintTreeOptions
            | undefined;
          const file: ContentOutputFile = {
            kind: "file",
            path: sf.path,
            filetype: sf.filetype,
            contents: printNode(node, {
              printWidth: opts?.printWidth ?? printOpts?.printWidth,
              tabWidth: opts?.tabWidth ?? printOpts?.tabWidth,
              useTabs: opts?.useTabs ?? printOpts?.useTabs,
              insertFinalNewLine:
                opts?.insertFinalNewLine ??
                printOpts?.insertFinalNewLine ??
                true,
            }),
          };
          cwd.contents.push(file);
          debug.files.updated({
            path: sf.path,
            filetype: sf.filetype,
            contents: file.contents,
          });
        }
        return;
      }
      if (node.localName === "alloy:copy-file") {
        const cf = ctx?.meta?.copyFile as
          | { path: string; sourcePath: string }
          | undefined;
        if (cf) {
          if (!cwd) {
            throw new Error(
              "Copy file doesn't have parent directory. Make sure you have used the Output component.",
            );
          }
          const file: CopyOutputFile = {
            kind: "file",
            path: cf.path,
            sourcePath: cf.sourcePath,
          };
          cwd.contents.push(file);
        }
        return;
      }
    }
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      walk(c, cwd);
    }
  }
}

export { getContextForNode } from "./render/node-context.js";

/**
 * @deprecated Use {@link getContextForNode}. Render tree nodes are now
 * represented by AlloyNode objects directly.
 */
export function getContextForRenderNode(node: AlloyNode): Context | undefined {
  return getContextForNode(node);
}

/**
 * Print an AlloyNode subtree with the given options. Used internally
 * by `sourceFilesForTree` to format each `<SourceFile>` body and
 * exposed for testing helpers.
 */
export function printNode(node: AlloyNode, opts?: PrintTreeOptions): string {
  const merged = {
    printWidth: opts?.printWidth ?? 80,
    tabWidth: opts?.tabWidth ?? 2,
    useTabs: opts?.useTabs ?? false,
  };
  let formatted = printNodeToString(node, merged).formatted;
  if (opts?.insertFinalNewLine && !formatted.endsWith("\n")) formatted += "\n";
  return formatted;
}
