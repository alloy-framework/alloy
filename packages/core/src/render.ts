import { isRef } from "@vue/reactivity";
import { Doc, doc } from "prettier";
import prettier from "prettier/doc.js";
import { useContext } from "./context.js";
import { SourceFileContext } from "./context/source-file.js";
import { shouldDebug } from "./debug.js";
import {
  Context,
  CustomContext,
  effect,
  getContext,
  getElementCache,
  isCustomContext,
  root,
  untrack,
} from "./reactivity.js";
import { isRefkey } from "./refkey.js";
import {
  Child,
  Children,
  Component,
  isComponentCreator,
  Props,
} from "./runtime/component.js";
import { IntrinsicElement, isIntrinsicElement } from "./runtime/intrinsic.js";
import { flushJobs } from "./scheduler.js";
import { trace, TracePhase } from "./tracer.js";

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

export interface OutputFile {
  kind: "file";
  contents: string;
  path: string;
  filetype: string;
}

const nodesToContext = new WeakMap<RenderedTextTree, Context>();

export function getContextForRenderNode(node: RenderedTextTree) {
  return nodesToContext.get(node);
}

export const printHookTag = Symbol();

export interface PrintHook {
  [printHookTag]: true;
  transform?(tree: RenderedTextTree): RenderedTextTree;
  print?(
    tree: RenderedTextTree,
    print: (subtree: RenderedTextTree) => Doc,
  ): Doc;
  subtree: RenderedTextTree;
}

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

export function isPrintHook(type: unknown): type is PrintHook {
  return typeof type === "object" && type !== null && printHookTag in type;
}

export type RenderedTextTree = (string | RenderedTextTree | PrintHook)[];

export function render(
  children: Children,
  options?: PrintTreeOptions,
): OutputDirectory {
  const tree = renderTree(children);
  flushJobs();
  let rootDirectory: OutputDirectory | undefined = undefined;

  // when passing Output, the first render tree child is the Output component.
  const rootRenderOptions =
    Array.isArray(tree) ?
      (getContextForRenderNode(tree[0] as RenderedTextTree)?.meta
        ?.printOptions ?? {})
    : {};

  collectSourceFiles(undefined, tree);

  if (!rootDirectory) {
    throw new Error(
      "No root directory found. Make sure you are using the Output component.",
    );
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

      const sourceFile: OutputFile = {
        kind: "file",
        path: context.meta?.sourceFile.path,
        filetype: context.meta?.sourceFile.filetype,
        contents: printTree(root, {
          printWidth:
            options?.printWidth ??
            context.meta?.printOptions?.printWidth ??
            rootRenderOptions.printWidth,
          tabWidth:
            options?.tabWidth ??
            context.meta?.printOptions?.tabWidth ??
            rootRenderOptions.tabWidth,
          useTabs:
            options?.useTabs ??
            context.meta?.printOptions?.useTabs ??
            rootRenderOptions.useTabs,
        }),
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
  try {
    root(() => {
      renderWorker(rootElem, children);
    });
  } catch (e) {
    printRenderStack();
    throw e;
  }

  return rootElem;
}

function renderWorker(node: RenderedTextTree, children: Children) {
  if (!getContext()) {
    throw new Error(
      "Cannot render without a context. Make sure you are using the Output component.",
    );
  }
  trace(TracePhase.render.worker, () => dumpChildren(children));

  if (Array.isArray(node)) {
    nodesToContext.set(node, getContext()!);
  }

  if (Array.isArray(children)) {
    for (const child of (children as any).flat(Infinity)) {
      appendChild(node, child);
    }
  } else {
    appendChild(node, children);
  }
}

function appendChild(node: RenderedTextTree, rawChild: Child) {
  trace(TracePhase.render.appendChild, () => debugPrintChild(rawChild));
  const child = normalizeChild(rawChild);

  if (typeof child === "string") {
    node.push(child);
  } else {
    const cache = getElementCache();
    if (cache.has(child as any)) {
      trace(
        TracePhase.render.appendChild,
        () => "Cached: " + debugPrintChild(child),
      );
      node.push(cache.get(child as any)!);
      return;
    }
    if (isCustomContext(child)) {
      trace(
        TracePhase.render.appendChild,
        () => "CustomContext: " + debugPrintChild(child),
      );
      child.useCustomContext((children) => {
        const newNode: RenderedTextTree = [];
        renderWorker(newNode, children);
        node.push(newNode);
        cache.set(child, newNode);
      });
    } else if (isIntrinsicElement(child)) {
      trace(
        TracePhase.render.appendChild,
        () => "IntrinsicElement: " + debugPrintChild(child),
      );
      // don't need a new context here because intrinsics are never reactive
      const newNode: RenderedTextTree = [];

      function formatHookWithChildren(command: (doc: Doc) => Doc) {
        node.push(
          createRenderTreeHook(newNode, {
            print(tree, print) {
              return command(print(tree));
            },
          }),
        );
        renderWorker(newNode, (child as any).props.children);
      }

      function formatHook(command: Doc) {
        return node.push(
          createRenderTreeHook(newNode, {
            print() {
              return command;
            },
          }),
        );
      }

      switch (child.name) {
        case "indent":
          return formatHookWithChildren(indent);
        case "indentIfBreak":
          node.push(
            createRenderTreeHook(newNode, {
              print(tree, print) {
                return indentIfBreak(print(tree), {
                  groupId: child.props.groupId,
                  negate: child.props.negate,
                });
              },
            }),
          );
          renderWorker(newNode, child.props.children);
          return;
        case "fill":
          return formatHookWithChildren(fill as any);
        case "group":
          node.push(
            createRenderTreeHook(newNode, {
              print(tree, print) {
                return group(print(tree), {
                  id: child.props.id,
                  shouldBreak: child.props.shouldBreak,
                });
              },
            }),
          );
          renderWorker(newNode, child.props.children);
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
          node.push(
            createRenderTreeHook(newNode, {
              print(tree, print) {
                return align(
                  (child.props as any).width ?? (child.props as any).string!,
                  print(tree),
                );
              },
            }),
          );
          renderWorker(newNode, (child as any).props.children);
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
          node.push(
            createRenderTreeHook(newNode, {
              print(tree, print) {
                return ifBreak(
                  print((tree as RenderedTextTree[])[0]),
                  print((tree as RenderedTextTree[])[1]),
                );
              },
            }),
          );
          newNode.push([], []);
          renderWorker(
            newNode[0] as RenderedTextTree[],
            (child as any).props.children,
          );
          renderWorker(
            newNode[1] as RenderedTextTree[],
            (child as any).props.flatContents,
          );
          return;
        default:
          throw new Error("Unknown intrinsic element");
      }
    } else if (isComponentCreator(child)) {
      effect(() => {
        trace(
          TracePhase.render.appendChild,
          () => "Component: " + debugPrintChild(child),
        );
        const componentRoot: RenderedTextTree = [];
        pushStack(child.component, child.props);
        renderWorker(componentRoot, untrack(child));
        popStack();
        node.push(componentRoot);
        cache.set(child, componentRoot);
        trace(
          TracePhase.render.appendChild,
          () => "Component done: " + debugPrintChild(child),
        );
      });
    } else if (typeof child === "function") {
      trace(TracePhase.render.appendChild, () => "Memo: " + child.toString());
      const index = node.length;
      effect(() => {
        trace(TracePhase.render.renderEffect, () => "");
        let res = child();
        while (typeof res === "function" && !isComponentCreator(res)) {
          res = res();
        }
        const newNodes: RenderedTextTree = [];
        renderWorker(newNodes, res);
        node[index] = newNodes;
        cache.set(child, newNodes);
        return newNodes;
      });
    } else {
      throw new Error("Unexpected child type");
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
  } else if (isRefkey(child)) {
    return () => {
      const sfContext = useContext(SourceFileContext);
      if (!sfContext || !sfContext.reference) {
        throw new Error("Can only emit references inside of source files");
      }

      return sfContext.reference({ refkey: child });
    };
  } else if (isCustomContext(child)) {
    return child;
  } else if (isIntrinsicElement(child)) {
    return child;
  } else {
    return String(child);
  }
}

function dumpChildren(children: Children): string {
  if (Array.isArray(children)) {
    return `[ ${children.map(debugPrintChild).join(", ")} ]`;
  }
  return debugPrintChild(children);
}

function debugPrintChild(child: Children): string {
  if (isComponentCreator(child)) {
    return "<" + child.component.name + ">";
  } else if (typeof child === "function") {
    return "$memo";
  } else if (isRef(child)) {
    return "$ref";
  } else if (isIntrinsicElement(child)) {
    return `<${child.name}>`;
  } else {
    return JSON.stringify(child);
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
}

const defaultPrintTreeOptions: PrintTreeOptions = {
  printWidth: 80,
  tabWidth: 2,
};

export function printTree(tree: RenderedTextTree, options?: PrintTreeOptions) {
  options = {
    ...defaultPrintTreeOptions,
    ...Object.fromEntries(
      Object.entries(options ?? {}).filter(([_, v]) => v !== undefined),
    ),
  };

  // make sure queue is empty
  flushJobs();

  const d = printTreeWorker(tree);
  return doc.printer.printDocToString(d, options as doc.printer.Options)
    .formatted;
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
// debugging utilities
const renderStack: {
  component: Component<any>;
  props: Props;
}[] = [];

export function pushStack(component: Component<any>, props: Props) {
  if (!shouldDebug()) return;
  renderStack.push({ component, props });
}

export function popStack() {
  if (!shouldDebug()) return;
  renderStack.pop();
}

export function printRenderStack() {
  if (!shouldDebug()) return;

  // eslint-disable-next-line no-console
  console.error("Error rendering:");
  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { component, props } = renderStack[i];
    // eslint-disable-next-line no-console
    console.error(`    at ${component.name}(${inspectProps(props)})`);
  }
}

function inspectProps(props: Props) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(props).map(([key, value]) => {
        let safeValue;
        switch (typeof value) {
          case "string":
          case "number":
          case "boolean":
            safeValue = value;
            break;
          case "undefined":
            safeValue = "undefined";
            break;
          case "object":
            safeValue = value ? "{...}" : null;
            break;
          case "function":
            safeValue = "function";
            break;
        }
        return [key, safeValue];
      }),
    ),
  );
}
