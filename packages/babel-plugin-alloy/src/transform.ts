import helperModuleImports from "@babel/helper-module-imports";
import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
interface Options {
  alloyModuleName: string | undefined;
}

const visited = new Set();
export function transformJSX(
  path: NodePath<
    | t.JSXElement
    | t.JSXFragment
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXText
  >,
  state: { opts: Options },
) {
  const node = path.node;
  if (visited.has(node)) {
    return;
  }
  visited.add(node);

  if (path.isJSXElement() || path.isJSXFragment()) {
    transformElement(
      path as NodePath<t.JSXElement | t.JSXFragment>,
      state.opts,
    );
  }

  path.scope.crawl();
}

function transformElement(
  path: NodePath<t.JSXElement | t.JSXFragment>,
  opts: Options,
) {
  const children = path.get("children");
  if (children.length === 0) {
    return;
  }

  let currentIndent: undefined | t.JSXElement = undefined;
  let lines: string[] = [];
  let indentedLines: string[] = [];
  const newChildren: t.JSXElement["children"] = [];

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
      (child.sourcePath.node as any).alloyCreated = true;
      if (child.indented) {
        flushIndentedLines();
        currentIndent!.children.push(child.sourcePath.node);
      } else {
        flushLines();
        newChildren.push(child.sourcePath.node);
      }
    }
  }
  flushIndentedLines();
  flushLines();

  children.forEach((child) => child.remove());
  newChildren.forEach((newChild) => {
    path.pushContainer("children", newChild)[0];
  });

  path.get("children").forEach((child) => {
    transformJSX(child, { opts });
  });

  function createIndent() {
    if (currentIndent) return;
    const id = registerIndent(path, opts);
    currentIndent = t.jsxElement(
      t.jsxOpeningElement(id, []),
      t.jsxClosingElement(id),
      [],
    );
    (currentIndent as any).alloyCreated = true;
    newChildren.push(currentIndent);
    indentedLines = ["\n"];
  }

  function flushLines() {
    if (lines.length === 0) return;
    newChildren.push(createJSXText(lines.join("\n")));
    lines = [];
  }

  function flushIndentedLines() {
    if (indentedLines.length === 0) return;
    currentIndent!.children.push(createJSXText(indentedLines.join("\n")));
    indentedLines = [];
  }
}

function registerIndent(path: NodePath, opts: Options) {
  const moduleName = opts.alloyModuleName ?? "@alloy-js/core:Indent";
  let imports: Map<string, any>;
  if (path.scope.getProgramParent().data.imports) {
    imports = path.scope.getProgramParent().data.imports as any;
  } else {
    imports = new Map();
    path.scope.getProgramParent().data.imports = imports;
  }

  if (!imports.has(`${moduleName}:Indent`)) {
    const id: t.Identifier = helperModuleImports.addNamed(
      path,
      "Indent",
      moduleName,
      {
        nameHint: `$Indent`,
      },
    );
    imports.set(`${moduleName}:Indent`, id);
    return t.jsxIdentifier(id.name);
  } else {
    const id = imports.get(`${moduleName}:Indent`);
    // the cloning is required to play well with babel-preset-env which is
    // transpiling import as we add them and using the same identifier causes
    // problems with the multiple identifiers of the same thing
    return t.jsxIdentifier(id.name);
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
  path: NodePath<t.JSXElement | t.JSXFragment>,
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
