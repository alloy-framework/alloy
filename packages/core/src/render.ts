import { isRef } from "@vue/reactivity";
import { Doc, doc } from "prettier";
import prettier from "prettier/doc.js";
import { useContext } from "./context.js";
import { SourceFileContext } from "./context/source-file.js";
import {
  debug,
  getRenderNodeId,
  isDevtoolsConnected,
  isDevtoolsEnabled,
  type RenderTreeNodeInfo,
} from "./debug/index.js";
import {
  beginTransaction,
  closeTrace,
  commitTransaction,
  notifyDiagnosticsReport,
} from "./debug/trace-writer.js";
import { isTraceEnabled } from "./debug/trace.js";
import {
  attachDiagnosticsCollector,
  DiagnosticsCollector,
  emitDiagnostic,
  reportDiagnostics,
} from "./diagnostics.js";
import {
  isPrintHook,
  printHookTag,
  type PrintHook,
  type RenderedTextTree,
} from "./print-hook.js";
import {
  Context,
  CustomContext,
  effect,
  getContext,
  getElementCache,
  isCustomContext,
  onCleanup,
  ref,
  root,
  untrack,
} from "./reactivity.js";
import { isRefkeyable, toRefkey } from "./refkey.js";
import {
  getRenderStackSnapshot,
  popStack,
  printRenderStack,
  pushStack,
} from "./render-stack.js";
import {
  Child,
  Children,
  isComponentCreator,
  isRenderableObject,
  RENDERABLE,
} from "./runtime/component.js";
import { IntrinsicElement, isIntrinsicElement } from "./runtime/intrinsic.js";
import { flushJobs, flushJobsAsync, waitForSignal } from "./scheduler.js";

const notifiedErrors = new WeakSet<object>();

// ─────────────────────────────────────────────────────────────────────────────
// Deferred file printing: mark files dirty during render, print once at end
// ─────────────────────────────────────────────────────────────────────────────
interface DirtyFileEntry {
  renderNode: RenderedTextTree;
  printOptions: {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    insertFinalNewLine?: boolean;
  };
  path: string;
  filetype: string;
}
const dirtyFiles = new Map<string, DirtyFileEntry>();
const lastFlushTimeByFile = new Map<string, number>();
const DEVTOOLS_FLUSH_INTERVAL_MS = 1000;

function flushDirtyFile(path: string): void {
  const entry = dirtyFiles.get(path);
  if (!entry) return;
  dirtyFiles.delete(path);
  const contents = printTree(entry.renderNode, {
    ...entry.printOptions,
    insertFinalNewLine: entry.printOptions.insertFinalNewLine ?? true,
    noFlush: true,
  });
  debug.files.updated({ path: entry.path, filetype: entry.filetype, contents });
}

function flushDirtyFiles(): void {
  for (const path of [...dirtyFiles.keys()]) {
    flushDirtyFile(path);
  }
}

let lastRenderError: {
  error: { name: string; message: string; stack?: string };
  componentStack: Array<{
    name: string;
    props?: Record<string, unknown> | undefined;
    propsSerialized?: string;
    renderNodeId?: number;
    source?: RenderTreeNodeInfo["source"];
  }>;
} | null = null;

function normalizeRenderError(error: unknown): {
  name: string;
  message: string;
  stack?: string;
} {
  if (error instanceof Error) {
    return {
      name: error.name || error.constructor?.name || "Error",
      message: error.message || "",
      stack: error.stack,
    };
  }
  if (error && typeof error === "object") {
    const anyError = error as {
      name?: string;
      message?: string;
      stack?: string;
    };
    return {
      name: anyError.name || "Error",
      message: anyError.message || String(error),
      stack: anyError.stack,
    };
  }
  return {
    name: "Error",
    message: String(error),
  };
}

function notifyRenderError(error: unknown) {
  if (error && typeof error === "object") {
    if (notifiedErrors.has(error)) return;
    notifiedErrors.add(error);
  }
  if (lastRenderError) return;

  const { name, message, stack } = normalizeRenderError(error);
  const componentStack = getRenderStackSnapshot().map((entry) => {
    const renderNode = entry.context?.meta?.renderNode as
      | RenderedTextTree
      | undefined;
    const renderNodeId = renderNode ? getRenderNodeId(renderNode) : undefined;
    return {
      name: entry.displayName,
      props: entry.props as Record<string, unknown> | undefined,
      renderNodeId,
      source: entry.source,
    };
  });

  // Output to console
  printRenderStack(error);

  // Send to devtools if enabled
  debug.render.error({ name, message, stack }, componentStack);

  // Store for diagnostics
  lastRenderError = { error: { name, message, stack }, componentStack };
  const lastEntry = componentStack.at(-1);
  emitDiagnostic({
    severity: "error",
    message: `${name}: ${message}`,
    source: lastEntry?.source,
  });
}

function reportLastRenderError() {
  // Error already reported in notifyRenderError via debug.renderError
  lastRenderError = null;
}

const {
  builders: {
    align,
    breakParent,
    dedent,
    dedentToRoot,
    fill,
    group,
    hardline,
    indent,
    indentIfBreak,
    line,
    lineSuffix,
    lineSuffixBoundary,
    literalline,
    markAsRoot,
    softline,
    ifBreak,
  },
} = prettier;

/**
 * Turning components into source text involves three different trees produced
 * sequentially:
 *
 * 1. Component tree, built by the nesting of components
 * 2. Rendered text tree, produced by *rendering* the component tree
 * 3. Document tree, produced by *printing* the rendered text tree
 *
 * Finally, the document tree is converted to text via `prettier`. Let's look at
 * each of these trees and the conversions in detail.
 *
 * # Component tree
 *
 * The component tree is built by JSX or STC templates. The nodes in this tree
 * are defined by the type `Child` and are one of the following
 *
 * ## Primitive values
 *
 * Strings in the tree are placed into the rendered text tree as-is. Numbers are
 * converted to strings. Falsy primitive values and booleans are converted to
 * empty strings (and may cause a line break to be ignored, see below).
 *
 * ## Nullary functions
 *
 * Nullary functions represent computed or reactive values in the component
 * tree, such as expressions placed into a JSX template with curly brackets.
 * Nullary functions return `Children` which are then recursively rendered.
 * Nullary functions are invoked in an effect which will update the rendered
 * text tree when any reactive dependencies change.
 *
 * ## Component creators
 *
 * Component creators are a special kind of nullary function which instantiate
 * components in order to get their children which are then recursively
 * rendered. Component creators have some special rendering behavior, such as
 * tracking the stack of rendered components. Like other nullary functions,
 * component creators are invoked in an effect which will update the rendered
 * text tree when any reactive dependencies change.
 *
 * ## Refs
 *
 * Refs are wrapped in a nullary function and rendered in an effect which will
 * update the rendered text tree when the ref's value changes. This is
 * essentially a syntactic convenience, allowing JSX templates to contain
 * `\{ someRef \}` instead of `\{ someRef.value \}`.
 *
 * ## Refkey
 *
 * Refkeys are replaced with a component creator for the Reference component
 * associated with the current source file. This allows creating references by
 * placing them directly in the component tree e.g. `{ someRefkey }`.
 *
 * ## CustomContext
 *
 * CustomContext is a special kind of component which allows rendering children
 * within a custom reactive context. This enables components to manually manage
 * the lifetime of their reactive contexts.
 *
 * ## IntrinsicElement
 *
 * Various intrinsic elements exist to control formatting. These elements
 * provide Print Hooks that are called during Printing.
 *
 * # Rendered Text Tree
 *
 * This tree is a nested array structure containing the rendered output of all
 * the components in the component tree. This structure is updated reactively
 * when reactive dependencies change. The nodes in this tree are predominantly
 * strings, but can also be Print Hooks.
 *
 * This tree is built by the `renderTree` function.
 *
 * # Document Tree
 *
 * This tree is constructed by calling `printTree` on the rendered text tree.
 * The rendered text tree is walked and the appropriate Prettier builders are
 * called to produce a document tree. The result is then passed to Prettier's
 * `printDocToString` function to produce the final source text.
 */

export interface OutputDirectory {
  kind: "directory";
  path: string;
  contents: (OutputDirectory | OutputFile)[];
}

export interface OutputFileBase {
  kind: "file";
  path: string;
}

export interface CopyOutputFile extends OutputFileBase {
  sourcePath: string;
}

export interface ContentOutputFile extends OutputFileBase {
  contents: string;
  filetype: string;
}

export type OutputFile = ContentOutputFile | CopyOutputFile;

const nodesToContext = new WeakMap<RenderedTextTree, Context>();
const diagnosticsByTree = new WeakMap<RenderedTextTree, DiagnosticsCollector>();

export function getContextForRenderNode(node: RenderedTextTree) {
  return nodesToContext.get(node);
}

export function getDiagnosticsForTree(tree: RenderedTextTree) {
  return diagnosticsByTree.get(tree)?.getDiagnostics() ?? [];
}

function reportDiagnosticsForTree(tree: RenderedTextTree) {
  const diagnostics = diagnosticsByTree.get(tree);
  if (!diagnostics) return;
  const entries = diagnostics.getDiagnostics();
  if (entries.length === 0) return;
  reportDiagnostics(diagnostics);
  notifyDiagnosticsReport(entries);
}

// Re-export from print-hook.ts to maintain backwards compatibility
export {
  isPrintHook,
  printHookTag,
  type PrintHook,
  type RenderedTextTree,
} from "./print-hook.js";

export function createRenderTreeHook(
  subtree: RenderedTextTree,
  hooks: Omit<PrintHook, typeof printHookTag | "subtree">,
): PrintHook {
  return {
    [printHookTag]: true,
    subtree,
    ...hooks,
  };
}

/**
 * Render a component tree to source directories and files. Will ensure that
 * all non-async scheduled jobs are completed before returning. If async jobs
 * are found, an error will be thrown. Use `renderAsync` when asynchronous
 * jobs are expected.
 */
export function render(
  children: Children,
  options?: PrintTreeOptions,
): OutputDirectory {
  const tree = renderTree(children);
  flushJobs();
  const output = sourceFilesForTree(tree, options);
  flushDirtyFiles();
  reportDiagnosticsForTree(tree);
  reportLastRenderError();
  debug.render.complete();
  // Only close the trace DB when devtools is NOT running. When devtools is
  // active the DB must remain open for post-render reactive updates.
  if (isTraceEnabled() && !isDevtoolsEnabled()) closeTrace();
  if (isDevtoolsEnabled()) {
    void waitForSignal();
  }
  return output;
}

/**
 * Render a component tree to source directories and files. Will ensure that all
 * scheduled jobs are completed before returning.
 */
export async function renderAsync(
  children: Children,
  options?: PrintTreeOptions,
): Promise<OutputDirectory> {
  await debug.prepare();
  const tree = renderTree(children);
  // Ensure all reactive updates are flushed before printing.
  await flushJobsAsync();
  const output = sourceFilesForTree(tree, options);
  flushDirtyFiles();
  reportDiagnosticsForTree(tree);
  reportLastRenderError();
  debug.render.complete();
  // Only close the trace DB when devtools is NOT running. When devtools is
  // active the DB must remain open for post-render reactive updates.
  if (isTraceEnabled() && !isDevtoolsEnabled()) closeTrace();

  return output;
}

/**
 * Convert a rendered text tree to source directories and files. Will ensure
 * that all scheduled jobs are completed before returning.
 */
export function sourceFilesForTree(
  tree: RenderedTextTree,
  options?: PrintTreeOptions,
): OutputDirectory {
  let rootDirectory: OutputDirectory | undefined = undefined;

  collectSourceFiles(undefined, tree);

  if (!rootDirectory) {
    emitDiagnostic({
      severity: "error",
      message:
        "No root directory found. Make sure you are using the output component.",
    });
    return { kind: "directory", path: "", contents: [] };
  }

  return rootDirectory;

  function collectSourceFiles(
    currentDirectory: OutputDirectory | undefined,
    root: RenderedTextTree,
  ) {
    if (!Array.isArray(root)) {
      return;
    }
    const context = getContextForRenderNode(root);

    if (!context) {
      return recurse(currentDirectory);
    }

    if (context.meta?.directory) {
      const directory: OutputDirectory = {
        kind: "directory",
        path: context.meta?.directory.path,
        contents: [],
      };

      if (currentDirectory) {
        currentDirectory.contents.push(directory);
      } else {
        rootDirectory = directory;
      }
      recurse(directory);
    } else if (context.meta?.sourceFile) {
      if (!currentDirectory) {
        // This shouldn't happen if you're using the Output component.
        throw new Error(
          "Source file doesn't have parent directory. Make sure you have used the Output component.",
        );
      }

      const sourceFile: ContentOutputFile = {
        kind: "file",
        path: context.meta?.sourceFile.path,
        filetype: context.meta?.sourceFile.filetype,
        contents: printTree(root, {
          printWidth:
            options?.printWidth ?? context.meta?.printOptions?.printWidth,
          tabWidth: options?.tabWidth ?? context.meta?.printOptions?.tabWidth,
          useTabs: options?.useTabs ?? context.meta?.printOptions?.useTabs,
          insertFinalNewLine:
            options?.insertFinalNewLine ??
            context.meta?.printOptions?.insertFinalNewLine ??
            true,
        }),
      };

      currentDirectory.contents.push(sourceFile);
    } else if (context.meta?.copyFile) {
      if (!currentDirectory) {
        // This shouldn't happen if you're using the Output component.
        throw new Error(
          "Copy file doesn't have parent directory. Make sure you have used the Output component.",
        );
      }

      const sourceFile: CopyOutputFile = {
        kind: "file",
        path: context.meta?.copyFile.path,
        sourcePath: context.meta?.copyFile.sourcePath,
      };

      currentDirectory.contents.push(sourceFile);
    } else {
      recurse(currentDirectory);
    }

    function recurse(cwd: OutputDirectory | undefined) {
      for (const child of root) {
        collectSourceFiles(cwd, child as RenderedTextTree);
      }
    }
  }
}
export function renderTree(children: Children) {
  const rootElem: RenderedTextTree = [];
  const diagnostics = new DiagnosticsCollector();
  lastRenderError = null;
  debug.effect.reset();
  debug.symbols.reset();
  debug.files.reset();
  dirtyFiles.clear();
  lastFlushTimeByFile.clear();
  debug.render.initialize(rootElem);
  if (isTraceEnabled()) beginTransaction();
  try {
    root(() => {
      attachDiagnosticsCollector(diagnostics);
      renderWorker(rootElem, children);
    });
  } catch (e) {
    if (isTraceEnabled()) commitTransaction();
    flushDirtyFiles();
    notifyRenderError(e);
    reportLastRenderError();
    throw e;
  }
  if (isTraceEnabled()) commitTransaction();

  diagnosticsByTree.set(rootElem, diagnostics);

  return rootElem;
}

function renderWorker(node: RenderedTextTree, children: Children) {
  if (lastRenderError) return;
  if (!getContext()) {
    throw new Error(
      "Cannot render without a context. Make sure you are using the Output component.",
    );
  }

  if (Array.isArray(node)) {
    nodesToContext.set(node, getContext()!);
  }

  if (Array.isArray(children)) {
    for (const child of (children as any).flat(Infinity)) {
      appendChild(node, child);
      if (lastRenderError) break;
    }
  } else {
    appendChild(node, children);
  }
}

function contentAdded() {
  const context: Context = getContext()!;
  context.childrenWithContent++;
}

export function notifyContentState() {
  untrack(() => {
    const startContext = getContext()!;

    if (startContext.childrenWithContent === 0) {
      if (startContext._lastEmpty) {
        // it was already empty, no work to do.
        return;
      }

      startContext._lastEmpty = true;
      if (startContext.isEmpty) {
        startContext.isEmpty.value = true;
      }

      // otherwise we need to decrement the content counts up the tree.
      let current = startContext.owner;
      while (current) {
        if (current.childrenWithContent === 0) {
          break;
        }
        current.childrenWithContent--;
        if (current.childrenWithContent > 0) {
          // This isn't the last content so we have no work to do
          break;
        }
        current._lastEmpty = true;
        if (current.isEmpty) {
          current.isEmpty.value = true;
        }
        current = current.owner;
      }
    } else {
      if (!startContext._lastEmpty) {
        // it was already non-empty, no work to do.
        return;
      }

      startContext._lastEmpty = false;
      if (startContext.isEmpty) {
        startContext.isEmpty.value = false;
      }

      // otherwise we need to increment the content counts up the tree.
      let current = startContext.owner;
      while (current) {
        current.childrenWithContent++;
        if (current.childrenWithContent > 1) {
          // This isn't the first content so we have no work to do
          break;
        }

        current._lastEmpty = false;
        if (current.isEmpty) {
          current.isEmpty.value = false;
        }

        current = current.owner;
      }
    }
  });
}

function appendChild(node: RenderedTextTree, rawChild: Child) {
  if (lastRenderError) return;
  const child = normalizeChild(rawChild);

  if (typeof child === "string") {
    if (child !== "") {
      contentAdded();
      debug.render.appendTextNode(node, node.length, child);
    }
    node.push(child);
  } else {
    const cache = getElementCache();
    if (cache.has(child as any)) {
      const cachedNode = cache.get(child as any)!;
      // recordSubtreeAdded detects cached nodes automatically and re-adds their children
      if (isCustomContext(child)) {
        debug.render.appendCustomContext(node, cachedNode);
      } else {
        debug.render.appendFragmentChild(node, cachedNode);
      }
      node.push(cachedNode);
      return;
    }
    if (isCustomContext(child)) {
      const newNode: RenderedTextTree = [];
      debug.render.appendCustomContext(node, newNode);
      child.useCustomContext((children) => {
        renderWorker(newNode, children);
        node.push(newNode);
        cache.set(child, newNode);
        notifyContentState();
        notifyFileUpdateForNode(node);
      });
    } else if (isIntrinsicElement(child)) {
      // don't need a new context here because intrinsics are never reactive
      const intrinsic = child as IntrinsicElement;
      const newNode: RenderedTextTree = [];

      function formatHookWithChildren(command: (doc: Doc) => Doc) {
        const hook = createRenderTreeHook(newNode, {
          print(tree, print) {
            return command(print(tree));
          },
        });
        debug.render.appendPrintHook(
          node,
          node.length,
          hook,
          intrinsic.name,
          newNode,
        );
        node.push(hook);
        renderWorker(newNode, (child as any).props.children);
        notifyFileUpdateForNode(node);
      }

      function formatHook(command: Doc) {
        const hook = createRenderTreeHook(newNode, {
          print() {
            return command;
          },
        });
        debug.render.appendPrintHook(node, node.length, hook, intrinsic.name);
        node.push(hook);
        return hook;
      }

      switch (child.name) {
        case "indent":
          return formatHookWithChildren(indent);
        case "indentIfBreak":
          {
            const hook = createRenderTreeHook(newNode, {
              print(tree, print) {
                return indentIfBreak(print(tree), {
                  groupId: child.props.groupId,
                  negate: child.props.negate,
                });
              },
            });
            debug.render.appendPrintHook(
              node,
              node.length,
              hook,
              intrinsic.name,
              newNode,
            );
            node.push(hook);
          }
          renderWorker(newNode, child.props.children);
          notifyFileUpdateForNode(node);
          return;
        case "fill":
          return formatHookWithChildren(fill as any);
        case "group":
          {
            const hook = createRenderTreeHook(newNode, {
              print(tree, print) {
                return group(print(tree), {
                  id: child.props.id,
                  shouldBreak: child.props.shouldBreak,
                });
              },
            });
            debug.render.appendPrintHook(
              node,
              node.length,
              hook,
              intrinsic.name,
              newNode,
            );
            node.push(hook);
          }
          renderWorker(newNode, child.props.children);
          notifyFileUpdateForNode(node);
          return;
        case "line":
        case "br":
          return formatHook(line);
        case "hbr":
        case "hardline":
          return formatHook(hardline);
        case "sbr":
        case "softline":
          return formatHook(softline);
        case "literalline":
        case "lbr":
          return formatHook(literalline);
        case "align":
          {
            const hook = createRenderTreeHook(newNode, {
              print(tree, print) {
                return align(
                  (child.props as any).width ?? (child.props as any).string!,
                  print(tree),
                );
              },
            });
            debug.render.appendPrintHook(
              node,
              node.length,
              hook,
              intrinsic.name,
              newNode,
            );
            node.push(hook);
          }
          renderWorker(newNode, (child as any).props.children);
          notifyFileUpdateForNode(node);
          return;
        case "lineSuffix":
          return formatHookWithChildren(lineSuffix);
        case "lineSuffixBoundary":
          return formatHook(lineSuffixBoundary);
        case "breakParent":
          return formatHook(breakParent);
        case "dedent":
          return formatHookWithChildren(dedent);
        case "dedentToRoot":
          return formatHookWithChildren(dedentToRoot);
        case "markAsRoot":
          return formatHookWithChildren(markAsRoot);
        case "ifBreak":
          {
            const hook = createRenderTreeHook(newNode, {
              print(tree, print) {
                return ifBreak(
                  print((tree as RenderedTextTree[])[0]),
                  print((tree as RenderedTextTree[])[1]),
                );
              },
            });
            debug.render.appendPrintHook(
              node,
              node.length,
              hook,
              intrinsic.name,
              newNode,
            );
            node.push(hook);
          }
          newNode.push([], []);
          debug.render.appendFragmentChild(
            newNode,
            newNode[0] as RenderedTextTree,
          );
          debug.render.appendFragmentChild(
            newNode,
            newNode[1] as RenderedTextTree,
          );
          renderWorker(
            newNode[0] as RenderedTextTree[],
            (child as any).props.children,
          );
          renderWorker(
            newNode[1] as RenderedTextTree[],
            (child as any).props.flatContents,
          );
          notifyFileUpdateForNode(node);
          return;
        default:
          throw new Error("Unknown intrinsic element");
      }
    } else if (isComponentCreator(child)) {
      const index = node.length;
      const rerenderToken = isDevtoolsEnabled()
        ? ref(0, { isInfrastructure: true })
        : undefined;
      const breakNext = isDevtoolsEnabled()
        ? ref(false, { isInfrastructure: true })
        : undefined;
      // todo: remove this effect (only needed for context, not needed for anything else)
      effect(
        () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          rerenderToken?.value;
          const context = getContext();
          context!.childrenWithContent = 0;

          if (context) context.componentOwner = child;
          const existing = node[index];
          const componentRoot: RenderedTextTree =
            Array.isArray(existing) ? existing : [];
          context!.meta ??= {};
          context!.meta.renderNode = componentRoot;
          const propsSource = (child.props ?? undefined) as
            | Record<string, unknown>
            | undefined;
          const debugSession = debug.render.beginComponent({
            parent: node,
            index,
            node: componentRoot,
            component: child,
            propsSource,
            source: child.source,
            isExisting: Array.isArray(existing),
            actions: {
              rerender:
                rerenderToken ?
                  () => {
                    lastRenderError = null;
                    rerenderToken.value++;
                  }
                : () => {},
              rerenderAndBreak:
                breakNext && rerenderToken ?
                  () => {
                    lastRenderError = null;
                    breakNext.value = true;
                    rerenderToken.value++;
                  }
                : () => {},
            },
          });
          if (Array.isArray(existing)) {
            componentRoot.length = 0;
          }

          pushStack(child.component, child.props, child.source);
          let renderFailed = false;
          let childResult: Children | undefined;
          try {
            childResult = untrack(() => {
              const shouldBreak = breakNext?.value ?? false;
              if (shouldBreak) {
                breakNext!.value = false;
                // eslint-disable-next-line no-debugger
                debugger;
              }
              return child();
            });
          } catch (error) {
            notifyRenderError(error);
            renderFailed = true;
            throw error;
          }
          try {
            if (context?.meta?.directory) {
              debugSession.recordDirectory(context.meta.directory.path);
            }
            if (context?.meta?.sourceFile) {
              context.meta.renderNode = componentRoot;
              debugSession.recordFile(
                context.meta.sourceFile.path,
                context.meta.sourceFile.filetype,
              );
              context.meta.sourceFileReady = false;
            }
            if (!renderFailed) {
              renderWorker(componentRoot, childResult);
            }
          } finally {
            popStack();
          }
          if (renderFailed) {
            node[index] = componentRoot;
            cache.set(child, componentRoot);
            notifyFileUpdateForNode(node);
            notifyContentState();
            onCleanup(() => debugSession.dispose());
            return;
          }
          if (context?.meta?.sourceFile) {
            context.meta.sourceFileReady = true;
            notifyFileUpdateForNode(componentRoot);
          }
          node[index] = componentRoot;
          cache.set(child, componentRoot);
          notifyContentState();
          onCleanup(() => debugSession.dispose());
        },
        undefined,
        {
          debug: {
            name: `render:${child.component.name || "Anonymous"}`,
            type: "render",
          },
        },
      );
    } else if (typeof child === "function") {
      const index = node.length;
      effect(
        () => {
          let res: Child | Children | undefined;
          let renderFailed = false;
          try {
            res = child();
            while (typeof res === "function" && !isComponentCreator(res)) {
              res = res();
            }
          } catch (error) {
            notifyRenderError(error);
            renderFailed = true;
            throw error;
          }
          const context = getContext();
          context!.childrenWithContent = 0;

          const existing = node[index];
          const memoNode: RenderedTextTree =
            Array.isArray(existing) ? existing : [];

          debug.render.prepareMemoNode(node, memoNode, Array.isArray(existing));
          if (Array.isArray(existing)) {
            memoNode.length = 0;
          }

          if (!renderFailed) {
            renderWorker(memoNode, res);
          }
          node[index] = memoNode;
          cache.set(child, memoNode);
          notifyFileUpdateForNode(node);
          notifyContentState();
          return memoNode;
        },
        undefined,
        {
          debug: {
            name: `render:memo:${child.name || "anonymous"}`,
            type: "render",
          },
        },
      );
    } else {
      throw new Error("Unexpected child type");
    }
  }
}

function findSourceFileContext(node: RenderedTextTree) {
  let context: Context | null | undefined =
    getContextForRenderNode(node) ?? null;
  while (context) {
    if (context.meta?.sourceFile) return context;
    context = context.owner;
  }
  return undefined;
}

function notifyFileUpdateForNode(node: RenderedTextTree) {
  // Only track when devtools or trace are actually enabled
  if (!isDevtoolsEnabled() && !isTraceEnabled()) return;
  const context = findSourceFileContext(node);
  if (!context?.meta?.sourceFile) return;
  if (context.meta.sourceFileReady === false) return;
  const sourceFile = context.meta.sourceFile;
  const renderNode: RenderedTextTree =
    (context.meta.renderNode as RenderedTextTree | undefined) ?? node;

  // Mark this file as dirty — defer the expensive printTree to end of render
  dirtyFiles.set(sourceFile.path, {
    renderNode,
    printOptions: {
      printWidth: context.meta?.printOptions?.printWidth,
      tabWidth: context.meta?.printOptions?.tabWidth,
      useTabs: context.meta?.printOptions?.useTabs,
      insertFinalNewLine: context.meta?.printOptions?.insertFinalNewLine,
    },
    path: sourceFile.path,
    filetype: sourceFile.filetype,
  });

  // When a devtools client is connected, throttle file flushing to ~1s per file
  // so the user can watch content build up during rendering.
  if (isDevtoolsConnected()) {
    const now = Date.now();
    const lastFlush = lastFlushTimeByFile.get(sourceFile.path) ?? 0;
    if (now - lastFlush >= DEVTOOLS_FLUSH_INTERVAL_MS) {
      lastFlushTimeByFile.set(sourceFile.path, now);
      flushDirtyFile(sourceFile.path);
    }
  }
}

type NormalizedChildren = NormalizedChild | NormalizedChildren[];
type NormalizedChild =
  | string
  | (() => Child | Children)
  | CustomContext
  | IntrinsicElement;

function normalizeChild(child: Child): NormalizedChildren {
  if (Array.isArray(child)) {
    return child.map(normalizeChild);
  } else if (typeof child === "string" || typeof child === "function") {
    return child as NormalizedChild;
  } else if (
    typeof child === "undefined" ||
    child === null ||
    typeof child === "boolean"
  ) {
    return "";
  } else if (isRef(child)) {
    return () => child.value as () => Child;
  } else if (isRefkeyable(child)) {
    const refkey = toRefkey(child);
    return () => {
      const sfContext = useContext(SourceFileContext);
      if (!sfContext || !sfContext.reference) {
        throw new Error("Can only emit references inside of source files");
      }

      return sfContext.reference({ refkey });
    };
  } else if (isRenderableObject(child)) {
    // For custom renderable objects, we will just normalize them to a bound function.
    return child[RENDERABLE].bind(child);
  } else if (isCustomContext(child)) {
    return child;
  } else if (isIntrinsicElement(child)) {
    return child;
  } else {
    return String(child);
  }
}

export interface PrintTreeOptions {
  /**
   * The number of characters the printer will wrap on. Defaults to 100
   * characters.
   */
  printWidth?: number;

  /**
   * Whether to use tabs instead of spaces for indentation. Defaults to false.
   */
  useTabs?: boolean;

  /**
   * The number of spaces to use for indentation. Defaults to 2 spaces.
   */
  tabWidth?: number;

  /**
   * If files should end with a final new line.
   * @default true
   */
  insertFinalNewLine?: boolean;

  /**
   * Skip flushing scheduled jobs before printing.
   * @default false
   */
  noFlush?: boolean;
}

const defaultPrintTreeOptions: PrintTreeOptions = {
  printWidth: 80,
  tabWidth: 2,
};

/**
 * Convert a rendered text tree to a string. Will ensure that the scheduler is
 * empty before printing.
 */
export function printTree(tree: RenderedTextTree, options?: PrintTreeOptions) {
  options = {
    ...defaultPrintTreeOptions,
    ...Object.fromEntries(
      Object.entries(options ?? {}).filter(([_, v]) => v !== undefined),
    ),
  };

  if (!options.noFlush) {
    // make sure queue is empty
    flushJobs();
  }

  const d = printTreeWorker(tree);
  const result = doc.printer.printDocToString(
    d,
    options as doc.printer.Options,
  ).formatted;

  return options.insertFinalNewLine && !result.endsWith("\n") ?
      `${result}\n`
    : result;
}

function printTreeWorker(tree: RenderedTextTree): Doc {
  const doc: Doc = [];
  for (const node of tree) {
    if (typeof node === "string") {
      const normalizedNode = node
        .split(/\r?\n/)
        .flatMap((line, index, array) =>
          index < array.length - 1 ? [line, hardline] : [line],
        );
      doc.push(normalizedNode);
    } else if (isPrintHook(node)) {
      doc.push(node.print!(node.subtree, printTreeWorker));
    } else {
      doc.push(printTreeWorker(node));
    }
  }

  return doc;
}
