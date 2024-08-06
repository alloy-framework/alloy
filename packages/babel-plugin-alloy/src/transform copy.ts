import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { assert } from "vitest";

const intrinsicElementRe = /^[a-z]+$/;
const visited = new Set();
export function transformJSX(path: NodePath<t.JSXElement | t.JSXFragment>) {
  const node = path.node;
  if (visited.has(node)) {
    return;
  }
  visited.add(node);

  transformElement(path as NodePath<t.JSXElement>);
}

function transformElement(path: NodePath<t.JSXElement | t.JSXFragment>) {
  const children = path.get("children");
  if (children.length === 0) {
    return;
  }

  let currentIndent: undefined | NodePath<t.JSXElement> = undefined;
  let lines: string[] = [];
  let indentedLines: string[] = [];

  for (const child of childTokens(path)) {
    if (child.indented) {
      flushLines();
      createIndent();
    } else {
      flushIndentedLines();
      if (currentIndent) {
        currentIndent = undefined;
        lines = [""];
      }
    }

    if (child.kind === "line") {
      if (child.indented) {
        indentedLines.push(child.line);
      } else {
        lines.push(child.line);
      }
    } else {
      if (child.indented) {
        flushIndentedLines();
        currentIndent!.pushContainer("children", child.sourcePath.node);
      } else {
        flushLines();
        path.pushContainer("children", child.sourcePath.node);
      }
    }
  }
  flushIndentedLines();
  flushLines();

  children.forEach((child) => child.remove());

  function createIndent() {
    if (currentIndent) return;
    const indent = t.jsxElement(
      t.jsxOpeningElement(t.jSXIdentifier("Indent"), []),
      t.jsxClosingElement(t.jsxIdentifier("Indent")),
      []
    );
    currentIndent = path.pushContainer("children", indent)[0];
    indentedLines = ["\n"];
  }

  function flushLines() {
    if (lines.length === 0) return;
    path.pushContainer("children", createJSXText(lines.join("\n")));
    lines = [];
  }

  function flushIndentedLines() {
    if (indentedLines.length === 0) return;
    currentIndent!.pushContainer(
      "children",
      createJSXText(indentedLines.join("\n"))
    );
    indentedLines = [];
  }
}

function createJSXText(text: string) {
  const node = t.jsxText(text);
  node.extra = {
    raw: text,
  };

  return node;
}

type ChildToken = LineToken | OtherToken;
interface ChildTokenBase {
  kind: string;
  indented: boolean;
}

interface LineToken extends ChildTokenBase {
  kind: "line";
  sourcePath: NodePath<t.JSXText>;
  line: string;
  newline: boolean;
}

interface OtherToken extends ChildTokenBase {
  kind: "other";
  sourcePath: NodePath<
    t.JSXElement | t.JSXFragment | t.JSXSpreadChild | t.JSXExpressionContainer
  >;
}

function* childTokens(
  path: NodePath<t.JSXElement | t.JSXFragment>
): IterableIterator<ChildToken> {
  const children = path.get("children");
  let literalIndent: string | undefined = undefined;
  let indented = false;
  let newline = false;
  for (const child of children) {
    if (child.isJSXText()) {
      const lines = child.node.value.split("\n");
      if (!child.getPrevSibling().node && lines[0].match(/^\s*$/)) {
        // remove leading whitespace.
        lines.shift();
        newline = true;
      }

      if (
        !child.getNextSibling().node &&
        lines[lines.length - 1].match(/^\s*$/)
      ) {
        // remove trailing whitespace
        lines.pop();
        if (lines.length === 1 && lines[0].trimStart() === "") {
          // an empty line following a component most likely
          continue;
        }
      }

      for (let [lineNum, line] of lines.entries()) {
        if (lineNum > 0) {
          newline = true;
        }

        if (!literalIndent && line.length > 0 && newline) {
          // this is the first significant line we've come across, so set the base
          // indent level.
          literalIndent = line.match(/^\s*/)![0];
        }

        const lineIndent = line.match(/^\s+/)?.[0] ?? "";

        if (
          newline &&
          literalIndent &&
          lineIndent.length <= literalIndent.length
        ) {
          line = line.trimStart();
          if (lineNum > 0) {
            // the first line inherits its indent state from whatever came before.
            indented = false;
          }
        } else if (newline && literalIndent) {
          indented = true;
        }
        yield {
          kind: "line",
          line,
          indented,
          sourcePath: child,
          newline: lineNum > 0,
        };
      }
    } else {
      newline = false;
      yield {
        kind: "other",
        sourcePath: child as OtherToken["sourcePath"],
        indented,
      };
    }
  }
}
