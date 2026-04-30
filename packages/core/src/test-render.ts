/**
 * Direct AlloyNode-tree rendering helpers.
 *
 * `renderTree` produces an `ElementNode` root for assertions that need
 * to inspect tree shape directly (used by component-level tests that
 * don't go through `<SourceFile>`); `printTree` formats the tree with
 * Alloy's direct printer. These are the lower-level entry points behind
 * `render`/`renderAsync` and the testing matchers.
 */

import {
  attachDiagnosticsCollector,
  DiagnosticsCollector,
  getRegisteredDiagnosticsForTree,
  registerDiagnosticsForTree,
  type Diagnostic,
} from "./diagnostics.js";
import type { PrintTreeOptions } from "./output-types.js";
import { root, runInContext } from "./reactivity.js";
import { printNode } from "./render-output.js";
import { getContextForNode } from "./render/node-context.js";
import { AlloyNode, createElement, ElementNode } from "./render/node.js";
import type { Children } from "./runtime/component.js";
import { insert } from "./runtime/insert.js";
import { flushJobs } from "./scheduler.js";

export interface RenderTreeOptions {
  noFlush?: boolean;
}

/** Render `children` into a fresh root AlloyNode. */
export function renderTree(
  children: Children,
  opts?: RenderTreeOptions,
): ElementNode {
  const rootNode = createElement("alloy:root");
  const collector = new DiagnosticsCollector();
  root(() => {
    runInContext(() => {
      attachDiagnosticsCollector(collector);
      insert(rootNode, children);
    });
  });
  if (!opts?.noFlush) flushJobs();
  registerDiagnosticsForTree(rootNode, collector);
  return rootNode;
}

/** Print an AlloyNode tree to a string. */
export function printTree(
  node: AlloyNode,
  opts?: PrintTreeOptions & RenderTreeOptions,
): string {
  if (!opts?.noFlush) flushJobs();
  return printNode(node, opts);
}

/** Diagnostics collected during the render of `rootNode`. */
export function getDiagnosticsForTree(rootNode: AlloyNode): Diagnostic[] {
  return getRegisteredDiagnosticsForTree(rootNode);
}

/**
 * Collect source files from an AlloyNode tree as a `path → contents`
 * map. If no `<SourceFile>` markers are found, returns the printed
 * string of the whole tree. Used by the `toRenderTo` matcher; unlike
 * `sourceFilesForTree`, this does NOT default `insertFinalNewLine`,
 * preserving the raw printed body for test assertions.
 */
export function getFilesFromTree(
  rootNode: AlloyNode,
  opts?: PrintTreeOptions & RenderTreeOptions,
): string | Record<string, string> {
  const files: Record<string, string> = {};
  visit(rootNode);
  if (Object.keys(files).length === 0) {
    return printTree(rootNode, opts);
  }
  return files;

  function visit(node: AlloyNode): void {
    if (node instanceof ElementNode && node.localName === "alloy:source-file") {
      const ctx = getContextForNode(node);
      const sf = ctx?.meta?.sourceFile as { path: string } | undefined;
      if (sf) {
        const printOpts = ctx!.meta!.printOptions as
          | PrintTreeOptions
          | undefined;
        files[sf.path] = printTree(node, {
          printWidth: opts?.printWidth ?? printOpts?.printWidth,
          tabWidth: opts?.tabWidth ?? printOpts?.tabWidth,
          useTabs: opts?.useTabs ?? printOpts?.useTabs,
          insertFinalNewLine:
            opts?.insertFinalNewLine ?? printOpts?.insertFinalNewLine,
          noFlush: true,
        });
      }
    }
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      visit(c);
    }
  }
}
