import { Indent, IndentContext } from "./components/indent.js";
import { useContext } from "./context.js";
import {
  Child,
  Children,
  createComponent,
  effect,
  isComponent,
  memo,
  root,
  untrack,
} from "./jsx-runtime.js";

export type RenderTree = (string | RenderTree)[];

export function render(rootElement: Children) {
  const rootElem: RenderTree[] = [];
  root(() => {
    renderWorker(rootElem, rootElement);
  });
  return rootElem;
}

function renderWorker(
  parent: RenderTree,
  rootElements: Child | Children,
  noProcess = false
): RenderTree {
  //console.log("Rendering", JSON.stringify(rootElements));
  const children = noProcess ? rootElements : processChildren(rootElements);

  if (!Array.isArray(children)) {
    appendChild(children);
  } else {
    for (const element of children) {
      appendChild(element);
    }
  }

  return parent;

  function appendChild(child: Child) {
    const index = parent.length;

    if (typeof child === "string") {
      parent.push(child);
    } else if (typeof child === "function") {
      if (isComponent(child)) {
        root(() => {
          const componentRoot: RenderTree = [];
          renderWorker(
            componentRoot,
            untrack(() => child())
          );
          parent.push(componentRoot);
        });
      } else {
        effect((prev: any) => {
          const newNodes: RenderTree = [];
          // don't need to process this because it has already been processed
          // when we came across this node earlier.
          renderWorker(newNodes, child(), true);
          parent.splice(index, prev ? prev.length : 0, ...newNodes);
          return newNodes;
        });
      }
    } else if (typeof child === "boolean") {
      return;
    } else if (Array.isArray(child)) {
      effect((prev: any) => {
        const newNodes: RenderTree = [];
        renderWorker(newNodes, child);
        parent.splice(index, prev ? prev.length : 0, ...newNodes);
        return newNodes;
      });
    } else {
      parent.push(String(child));
    }
  }
}

function redent(
  str: string,
  literalIndent: string,
  indent: string,
  dontIndentFirstLine = false
) {
  const lines = str.split("\n");

  const replaceRe = new RegExp("^" + literalIndent);
  const redented = lines
    .map((line, index) => {
      if (dontIndentFirstLine && index === 0) {
        return line;
      }
      if (line.match(/^\s*$/)) {
        return "";
      }
      return line.replace(replaceRe, indent);
    })
    .join("\n");

  return redented;
}

type NormalizedChild = string | (() => Child | Children);
type NormalizedChildren = NormalizedChild[];

function getStartState(children: Children | Child): ProcessingState {
  return {
    indent: useContext(IndentContext)!.indentString,
    newLine: true,
    literalIndent: "",
    firstChild: true,
    lastChild: !Array.isArray(children) || children.length === 1,
    indentNextComponent: false,
  };
}

function processChildren(
  children: Children | Child,
  state: ProcessingState = getStartState(children)
) {
  if (Array.isArray(children)) {
    const flatChildren = children.flat(Infinity);

    return flatChildren.map((child, index) => {
      if (index === flatChildren.length - 1) {
        state.lastChild = true;
      }
      return processChild(child, state);
    });
  } else {
    return processChild(children, state);
  }
}

interface ProcessingState {
  /**
   * The current indent string which will replace any leading indent inside
   * templates.
   */
  indent: string;

  /**
   * The leading literal indent within the template.
   */
  literalIndent: string;

  /**
   * Whether to indent the next component. True when the previous child was a
   * string and ended with a line which increased the indent level.
   */
  indentNextComponent: boolean;

  /**
   * Whether we are currently on a new line. True when the previous child was a
   * string and ended with a line break (and any amount of trailing whitespace)
   * or we are processing the first or only child.
   */
  newLine: boolean;

  /**
   * Whether this is the first child, and as such we should trim leading line
   * break and establish a base indent level.
   */
  firstChild: boolean;

  /**
   * Whether this is the last child, and as such we should trim trailing line
   * break and whitespace.
   */
  lastChild: boolean;
}

function processChild(child: Child, state: ProcessingState): NormalizedChild {
  let normalized = normalizeChild(child);
  //console.log("Processing child", { normalized, state });
  if (typeof normalized === "string") {
    const trailingIndent = getTrailingIndent(normalized);

    if (state.firstChild) {
      const leadingLineBreak = getLeadingLineBreak(normalized);
      if (leadingLineBreak) {
        // slice off the leading line break; this is not semantically meaningful whitespace.
        normalized = normalized.slice(leadingLineBreak.length);

        // now detect base indent level
        state.literalIndent = getIndent(normalized);
      }

      state.firstChild = false;
    }

    normalized = redent(
      normalized,
      state.literalIndent,
      state.indent,
      !state.newLine
    );

    if (state.lastChild && trailingIndent) {
      normalized = normalized.slice(0, -1);
    }

    if (trailingIndent) {
      state.newLine = true;
      if (trailingIndent.length > state.literalIndent.length) {
        state.indentNextComponent = true;
      }
    } else {
      state.indentNextComponent = false;
    }

    return normalized;
  } else if (isComponent(normalized)) {
    if (state.indentNextComponent) {
      state.indentNextComponent = false;

      return (createComponent as any)(Indent, {
        get children() {
          return normalized;
        },
      });
    } else {
      return normalized;
    }
  } else {
    const startState = { ...state };
    state.newLine = false;
    startState.literalIndent = "";
    return () => processChildren((normalized as any)(), startState);
  }
}

function getLeadingLineBreak(str: string) {
  const match = str.match(/^\s*\n/);
  return match === null ? null : match[0];
}

function normalizeChild(child: Child): NormalizedChild {
  if (typeof child === "string" || typeof child === "function") {
    return child;
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

function getIndent(str: string) {
  return str.match(/^\s*/)![0];
}

function getTrailingIndent(str: string) {
  const match = str.match(/\n(\s*)$/);
  if (!match) return null;
  return match[1];
}
