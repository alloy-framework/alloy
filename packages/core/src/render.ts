import {
  Indent,
  IndentContext,
  NoLeadingIndent,
  shouldIndentComponent,
} from "./components/indent.js";
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

/*
# Examples

## Notation

### Component Tree

The component tree is constructed as the result of transforming JSX with
`babel-preset-alloy`. Elements in the component tree are 

<>hi<>
["hi"]
hi

const b = "hi";
<>a {b} c<>

*/

export type RenderTree = (string | RenderTree)[];

/**
 * The component tree (represented by Children) contains three distinct types of
 * things:
 *
 * 1. Raw strings, which are either literal JSX or substitutions
 * 2. Components, which are created via `createComponent`
 * 3. Memos, which are created via `memo()`
 *
 *
 *
 */

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
  skipProcessing = false
): RenderTree {
  console.log(">>> Rendering", JSON.stringify(rootElements));
  //console.log(new Error().stack);
  const children = skipProcessing
    ? rootElements
    : processChildren(rootElements);

  if (!Array.isArray(children)) {
    appendChild(children);
  } else {
    for (const element of (children.flat as any)(Infinity)) {
      appendChild(element);
    }
  }

  return parent;

  function appendChild(child: NormalizedChild) {
    const index = parent.length;

    if (typeof child === "string") {
      parent.push(child);
    } else if (typeof child === "function") {
      if (isComponent(child)) {
        root(() => {
          console.log("Rendering component", (child as any).componentName);
          const componentRoot: RenderTree = [];
          renderWorker(
            componentRoot,
            untrack(() => child())
          );
          parent.push(componentRoot);
          console.log("Done rendering component", (child as any).componentName);
        });
      } else {
        effect((prev: any) => {
          const newNodes: RenderTree = [];
          // don't need to process this because memos return normalized
          renderWorker(newNodes, child() as any, true);
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

function redent(str: string, state: ProcessingState) {
  const lines = str.split("\n");

  const replaceRe = new RegExp("^" + state.literalIndent);

  const redented = lines
    .map((line, index) => {
      // don't touch the first line if this isn't the start of a new line,
      // that whitespace is semantically relevant.
      if (!state.newLine && index === 0) {
        return line;
      }
      if (line.match(/^\s*$/)) {
        return "";
      }
      return line.replace(replaceRe, state.indent);
    })
    .join("\n");
  return redented;
}

type NormalizedChild =
  | string
  | (() => NormalizedChild | NormalizedChild[])
  | (() => Child | Children)
  | NormalizedChild[];

function getStartState(children?: Children | Child): ProcessingState {
  return {
    indent: useContext(IndentContext)!.indentString,
    newLine: true,
    literalIndent: "",
    firstChild: true,
    lastChild: !Array.isArray(children) || children.length === 1,
    indentNextComponent: false,
    lastWasString: false,
  };
}

function processChildren(
  children: Children | Child,
  state: ProcessingState = getStartState(children)
): NormalizedChild {
  //console.log("Processing children", JSON.stringify(children));
  let res;
  if (Array.isArray(children)) {
    res = children.map((child, index) => {
      if (index === children.length - 1) {
        state.lastChild = true;
      }
      return processChild(child, state);
    });
  } else {
    res = processChild(children, state);
  }
  //console.log("Processing children result", JSON.stringify(children));
  return res;
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

  /**
   * True when the last element was string. Needed to know if a subsequent string
   * substitution or memo needs to have its contents indented if it's on a new line.
   */
  lastWasString: boolean;
}

function processChild(
  child: Child | Children,
  state: ProcessingState
): NormalizedChild {
  if (Array.isArray(child)) {
    state.lastWasString = false;
    if (state.indentNextComponent) {
      state.indentNextComponent = false;
      const indent = (createComponent as any)(Indent, {
        get children() {
          return child;
        },
      });
      return processChildren(indent);
    } else {
      return processChildren(child);
    }
  }
  let normalized = normalizeChild(child);
  console.log("Processing child", JSON.stringify(normalized));
  console.log(state);
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

    normalized = redent(normalized, state);
    console.log("After redenting", JSON.stringify(normalized), state);
    if (state.indentNextComponent) {
      normalized = useContext(IndentContext)!.indent + normalized.trimStart();
    } else if (
      state.lastWasString &&
      state.newLine &&
      !normalized.match(/^[ \t]+$/)
    ) {
      normalized = state.indent + normalized.trimStart();
    }

    if (state.lastChild && trailingIndent) {
      normalized = normalized.slice(0, -1);
    }

    if (trailingIndent) {
      state.newLine = true;
      if (trailingIndent.length > state.literalIndent.length) {
        state.indentNextComponent = true;
      }
    } else {
      state.newLine = false;
      state.indentNextComponent = false;
    }

    state.lastWasString = true;
    console.log("Final normalized", JSON.stringify(normalized));
    return normalized;
  } else if (isComponent(normalized)) {
    state.firstChild = false;
    state.newLine = false;
    state.lastWasString = false;
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
    if (state.indentNextComponent) {
      state.indentNextComponent = false;
      state.lastWasString = false;
      state.firstChild = false;
      state.newLine = false;
      const indent = (createComponent as any)(Indent, {
        get children() {
          return normalized;
        },
      });
      return indent;
    } else {
      console.log("Have memo, returning processor");
      const stateCopy = { ...state, firstChild: true };
      state.lastWasString = false;
      state.firstChild = false;
      state.newLine = false;
      console.log(stateCopy);
      return () => {
        console.log("Processing memo");
        const res = (normalized as any)();
        stateCopy.lastChild = !Array.isArray(res);
        return processChildren(res, stateCopy);
      };
    }
  }
}

function getLeadingLineBreak(str: string) {
  const match = str.match(/^\s*\n/);
  return match === null ? null : match[0];
}

function normalizeChild(child: Child): NormalizedChild {
  if (typeof child === "string" || typeof child === "function") {
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

function getIndent(str: string) {
  return str.match(/^\s*/)![0];
}

function getTrailingIndent(str: string) {
  const match = str.match(/\n(\s*)$/);
  if (!match) return null;
  return match[1];
}
