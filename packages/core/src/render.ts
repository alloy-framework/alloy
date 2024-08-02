import { Indent, IndentContext, IndentState } from "./components/Indent.js";
import {
  Child,
  Children,
  Component,
  Context,
  createComponent,
  effect,
  getContext,
  isComponentCreator,
  memo,
  root,
  untrack,
} from "./jsx-runtime.js";

/**
 * The component tree is constructed as the result of transforming JSX with
 * `babel-preset-alloy`. Elements in the component tree (represented by the type
 * Children) are three distinct types of things:
 *
 * 1. Primitive data types, which are either literal JSX or substitutions
 * 2. Components, which are created via `createComponent`
 * 3. Memos, which are created via `memo`, and represent substitutions like
 *    property accesses and function calls that might be reactive.
 *
 * This tree is then compiled into a render tree, which is a normalized form of
 * the component tree. The render tree is constructed by traversing the
 * component tree, invoking components, wrapping memos, doing whitespace
 * normalization, and other activities. There are four types of nodes in the
 * render tree.
 *
 * 1. Strings, which are either literal JSX or substitutions. Other primitive
 *    types are either converted to the empty string or stringified as
 *    appropriate.
 * 2. Components, which are possibly wrapped if they are indented.
 * 3. Memos, which are wrapped in a reactive effect which updates its render
 *    tree nodes when its value changes.
 * 4. Arrays of these things.
 *
 * The render tree is whitespace normalized and indentation preserving. When the
 * component increases the literal indent level and then embeds a component,
 * memo, or array, the contents of that substitution are indented appropriately.
 * This is accomplished by wrapping those substitutions in an indent component.
 *
 * So the high level process for rendering while normalizing whitespace is as
 * follows:
 *
 * 1. For an array of elements in the render tree (which may be a component or
 *    array of elements):
 *    1. Normalize all primitive values other than strings to strings.
 *       Recursively normalize nested array elements.
 *    2. Use the first text node to determine the literal indent level of the
 *       children. Remove all preceding whitespace - any indent of the first
 *       line is provided in the text nodes preceding the reference to this
 *       component. If the first element is not a literal string, then no
 *       literal indent is applied, and all indentation within the component
 *       becomes significant.
 *    3. For each child of the component, render it:
 *       1. If it is a string, reindent it by splitting on lines and replacing
 *          the detected literal whitespace with the current indent level,
 *          skipping the first line. If the string ends with a larger literal
 *          indent than the detected literal indent, then a subsequent child
 *          will be indented.
 *       2. If it's a component, if the next child should be indented, create an
 *          Indent component and wrap the component's children in it.
 *       3. If it's a function, if the next child should be indented, wrap it in
 *          an indent component. Any elements processed as a result of executing
 *          the memo are treated as first elements in a child array are with
 *          respect to establishing literal indent level and whitespace trimming
 *          behavior.
 *       4. If it's an array, if the next child should be indented, create an
 *          Indent component and wrap it the array in it.
 *
 * Let's look at a few examples of each of these phases:
 *
 * ## Explicit indentation
 *
 * ### Input
 * ```
 * <Indent>
 *   <Foo />
 *   <Foo />
 * </Indent>
 * ```
 *
 * ### Compiled tree
 * ```
 * [
 *   createComponent(Indent, {
 *     get children() {
 *       return [
 *         "\n  ",
 *         createComponent(Foo, {}),
 *         "\n  ",
 *         createComponent(Foo, {}),
 *         "\n"
 *       ]
 *     }
 *   })
 * ]
 * ```
 *
 * ### Render tree
 * ```
 * [              // node for Indent
 *   [            // node for Context Provider
 *     "  ",      // indent from the children of Indent
 *     [          // component for Foo
 *       "Foo"    // result of calling Foo
 *     ],
 *     "\n  ",    // indent and line break from the children of Ident
 *     [ "Foo" ]  // second foo component
 *   ]
 * ]
 * ```
 * ### Rendered text
 * ```
 *   FooFoo
 * ```
 *
 * ## Implicit indentation
 *
 * ### Input
 * ```
 * <>
 *   base
 *     <Foo /> <Foo />
 * </>
 * ```
 *
 * ### Render tree
 * ```
 * [                  // node for top-level fragment
 *   "base\n  ",      // contents of fragment, including trailing indent
 *   [                // node for implicitly created Indent component
 *     [              // node for its context provider [ "Foo" ],   // contents of Foo "\n"
 * ]
 * ```
 * ## Rendered text
 * ```
 * base
 *   Foo Foo
 * ```
 */

//
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

const nodesToContext = new WeakMap<RenderTextTree, Context>();

export function getContextForRenderNode(node: RenderTextTree) {
  return nodesToContext.get(node);
}
export type RenderStructure = {};

export type RenderTextTree = (string | RenderTextTree)[];

function traceRender(phase: string, message: string) {
  return false;
  console.log(`[\x1b[34m${phase}\x1b[0m]: ${message}`);
}

export function render(children: Children): OutputDirectory {
  const tree = renderTree(children);
  let rootDirectory: OutputDirectory | undefined = undefined;
  collectSourceFiles(undefined, tree);

  if (!rootDirectory) {
    throw new Error(
      "No root directory found. Make sure you are using the Output component."
    );
  }

  return rootDirectory;

  function collectSourceFiles(
    currentDirectory: OutputDirectory | undefined,
    root: RenderTextTree
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
          "Source file doesn't have parent directory. Make sure you have used the Output component."
        );
      }
      const sourceFile: OutputFile = {
        kind: "file",
        path: context.meta?.sourceFile.path,
        filetype: context.meta?.sourceFile.filetype,
        contents: (root as any).flat(Infinity).join(""),
      };

      currentDirectory.contents.push(sourceFile);
    } else {
      recurse(currentDirectory);
    }

    function recurse(cwd: OutputDirectory | undefined) {
      for (const child of root) {
        collectSourceFiles(cwd, child as RenderTextTree);
      }
    }
  }
}

export function renderTree(children: Children) {
  const rootElem: RenderTextTree = [];
  const state: RenderState = {
    indent: "",
    literalIndent: "",
    newLine: true,
    literalIndentIncrease: false,
    lastWasString: false,
  };
  root(() => {
    renderWorker(rootElem, children, state);
  }, "render worker");

  return rootElem;
}

interface RenderState {
  indent: string;
  literalIndent: string;
  newLine: boolean;
  literalIndentIncrease: boolean;
  lastWasString: boolean;
}

function renderWorker(
  node: RenderTextTree,
  children: Children,
  state: RenderState
) {
  traceRender("render", dumpChildren(children) + " " + JSON.stringify(state));

  if (Array.isArray(node)) {
    nodesToContext.set(node, getContext()!);
  }

  const oldIndent = state.indent;
  const oldLiteralIndent = state.literalIndent;
  const contextIndent = getIdentFromContext();
  state.indent = contextIndent?.indentString ?? state.indent;

  state.literalIndent = getLiteralIndent(children);
  // remove trailing line break from last string
  if (contextIndent && state.newLine) {
    // Special case: when we have an indent component at the start of the line,
    // the literal indent won't be sufficient because we don't want the user to
    // have to both increase the literal indent and use the indent component.
    // So, we need to prepend the current indent. However, when the user is
    // using implicit indentation (i.e. they've increased the literal indent
    // level and we've wrapped a subsequent element or memo in an indent
    // component) we don't need to add this indent. This is handled via setting
    // newLine to false when we have a literal indent.
    node.push(contextIndent.indent);
  }

  if (Array.isArray(children)) {
    if (children.length > 0) {
      children[0] = removeLeadingWhitespace(children[0]);
      children[children.length - 1] = removeTrailingWhitespace(
        children[children.length - 1]
      );
    }
    for (const child of children) {
      appendChild(node, child, state);
    }
  } else {
    children = removeLeadingWhitespace(children);
    children = removeTrailingWhitespace(children);
    appendChild(node, children, state);
  }

  // restore state
  state.indent = oldIndent;
  state.literalIndent = oldLiteralIndent;
}

function appendChild(
  node: RenderTextTree,
  rawChild: Child,
  state: RenderState
) {
  traceRender(
    "appendChild",
    printChild(rawChild) + " " + JSON.stringify(state)
  );
  const child = normalizeChild(rawChild);

  if (typeof child === "string") {
    let reindented = reindent(child, state);

    if (state.lastWasString) {
      // When the last element was a literal string, this is a string
      // substitution, so we consider the leading and trailing whitespace
      // insignificant because it's likely that this is substituting something
      // rendered that has a bunch of needless whitespace. This aligns the
      // behavior of literal string substitutions with memos-for-strings and
      // components which return strings.
      // We may need some way to mark a string in such a way that it is
      // just dumped into the tree without any processing.
      /*
      reindented = reindented
        .replace(leadingWhitespaceRe, "")
        .replace(trailingWhitespaceRe, "");
      */
    }

    traceRender("appendChild:string", JSON.stringify(reindented));

    const trailingIndent = getTrailingLiteralIndent(child);

    if (trailingIndent !== null || reindented === "") {
      state.newLine = true;
    } else {
      state.newLine = false;
    }

    if (
      trailingIndent !== null &&
      trailingIndent.length > state.literalIndent.length
    ) {
      state.literalIndentIncrease = true;
    } else {
      state.literalIndentIncrease = false;
    }

    if (state.lastWasString) {
      state.lastWasString = false;
    } else {
      state.lastWasString = true;
    }

    node.push(reindented);
  } else if (isComponentCreator(child)) {
    state.lastWasString = false;
    let wrappedChild;

    if (state.literalIndentIncrease) {
      state.literalIndentIncrease = false;
      state.newLine = false;
      wrappedChild = wrapInIndent(child);
    } else {
      wrappedChild = child;
    }
    root(() => {
      traceRender("appendChild:component", printChild(child));
      const componentRoot: RenderTextTree = [];
      renderWorker(
        componentRoot,
        untrack(() => wrappedChild()),
        state
      );
      node.push(componentRoot);
      traceRender("appendChild:component-done", printChild(child));
    }, child.component.name);
    state.lastWasString = false;
  } else if (typeof child === "function") {
    state.lastWasString = false;
    let wrappedChild;

    if (state.literalIndentIncrease) {
      state.literalIndentIncrease = false;
      state.newLine = false;
      wrappedChild = wrapInIndent(child);
    } else {
      wrappedChild = child;
    }

    traceRender("appendChild:memo", wrappedChild.toString());
    const index = node.length;
    // todo: handle indent
    effect((prev: any) => {
      if ((child as any).__WTF__) {
        debugger;
      }
      traceRender("memoEffect:run", "");
      let res = wrappedChild();
      while (typeof res === "function" && !isComponentCreator(res)) {
        res = res();
      }
      const newNodes: RenderTextTree = [];
      renderWorker(newNodes, res, { ...state });
      //node.splice(index, prev ? prev.length : 0, ...newNodes);
      node[index] = newNodes;
      return newNodes;
    });
    traceRender("appendChild:memo-done", "");
    state.lastWasString = false;
  } else {
    state.lastWasString = false;
    let wrappedChild;

    if (state.literalIndentIncrease) {
      state.literalIndentIncrease = false;
      state.newLine = false;
      wrappedChild = wrapInIndent(child);
    } else {
      wrappedChild = child;
    }

    traceRender("appendChild:array", dumpChildren(child));
    renderWorker(node, wrappedChild, state);
    traceRender("appendChild:array-done", dumpChildren(child));
    state.lastWasString = false;
  }
}

const leadingWhitespaceRe = /^\s*\n(\s*)/;
const trailingWhitespaceRe = /\s*\n(\s*)$/;

function reindent(str: string, state: RenderState) {
  const lines = str.split("\n");
  const replaceRe = new RegExp("^" + state.literalIndent);

  for (let i = 1; i < lines.length; i++) {
    lines[i] = lines[i].replace(replaceRe, state.indent);
  }

  return lines.join("\n");
}

function getLiteralIndent(children: Children) {
  const child = Array.isArray(children) ? children[0] : children;
  if (typeof child !== "string") {
    return "";
  }

  const match = child.match(leadingWhitespaceRe);
  if (!match) {
    return "";
  } else {
    return match[1];
  }
}

function removeLeadingWhitespace(child: Child) {
  if (typeof child !== "string") {
    return child;
  }

  return child.replace(leadingWhitespaceRe, "");
}

function removeTrailingWhitespace(child: Child) {
  if (typeof child !== "string") {
    return child;
  }

  return child.replace(trailingWhitespaceRe, "");
}

function getTrailingLiteralIndent(str: string) {
  const match = str.match(trailingWhitespaceRe);
  if (!match) {
    return null;
  }

  return match[1];
}

function lastIsLiterallyIndented(
  tree: RenderTextTree,
  currentLiteralIndent: string
): boolean {
  if (tree.length === 0) {
    return false;
  }

  const last = tree[tree.length - 1];

  if (typeof last !== "string") {
    return false;
  }

  const trailingIndent = getTrailingLiteralIndent(last);

  if (!trailingIndent) {
    return false;
  }

  if (trailingIndent.length > 0) {
    return true;
  }

  return false;
}

type NormalizedChild = string | (() => Child | Children) | NormalizedChild[];

function wrapInIndent(children: Children) {
  return wrap(children, Indent, {});
}

function wrap<T>(children: Children, Component: Component<T>, props: T) {
  return createComponent(Component, {
    ...props,
    get children() {
      return children;
    },
  } as any);
}

function normalizeChild(child: Child): NormalizedChild {
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
  } else {
    return String(child);
  }
}

function getIdentFromContext() {
  const context = getContext();
  const current = context?.context?.[IndentContext.id] as IndentState;
  if (current) {
    return current;
  }
}

function dumpChildren(children: Child | Children): string {
  if (Array.isArray(children)) {
    return `[ ${children.map(printChild).join(", ")} ]`;
  }
  return printChild(children);
}

function printChild(child: Child): string {
  if (isComponentCreator(child)) {
    return "<" + child.component.name + ">";
  } else if (typeof child === "function") {
    return "$memo";
  } else {
    return JSON.stringify(child);
  }
}
