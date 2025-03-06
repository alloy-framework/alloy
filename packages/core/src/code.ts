// this code is split into a tokenizer and a parser of sorts because I feel like
// it should be psosible to share logic between this and the babel transform, but
// this is an exercise for the future.
import { hbr, indent } from "./components/stc/index.js";
import { Child, Children } from "./jsx-runtime.js";
interface IndentLevelData {
  kind: "indent";
  children: (string | Children | IndentLevelData)[];
  pendingLines: string[];
}
export function code(
  template: TemplateStringsArray,
  ...substitutions: Children[]
) {
  const indentNodes: IndentLevelData[] = [
    {
      kind: "indent",
      children: [],
      pendingLines: [],
    },
  ];

  for (const child of childTokens(template, substitutions)) {
    if (child.indentationLevel > indentNodes.length - 1) {
      // indentation level increased (can only ever increase by 1)
      pushIndent();
    } else if (child.indentationLevel < indentNodes.length - 1) {
      popIndent(child);
    }

    const currentIndent = indentNodes.at(-1)!;
    if (child.kind === "line") {
      currentIndent.pendingLines.push(child.line);
    } else {
      flushLines();
      currentIndent.children.push(child.value);
    }
  }
  popIndent();
  flushLines();

  return childNodesFor(indentNodes[0]);

  function childNodesFor(indentNode: IndentLevelData): Child[] {
    return indentNode.children.map((child) => {
      if (
        typeof child === "object" &&
        child !== null &&
        (child as any).kind === "indent"
      ) {
        return indent({ children: childNodesFor(child as IndentLevelData) });
      } else {
        return child as Child;
      }
    });
  }

  function pushIndent() {
    flushLines();
    const newIndent: IndentLevelData = {
      kind: "indent",
      children: [],
      pendingLines: [""],
    };
    indentNodes.at(-1)!.children.push(newIndent);
    indentNodes.push(newIndent);
  }

  function popIndent(child?: ChildToken) {
    // indentation level decreased (can decrease by many)
    const times =
      child ?
        indentNodes.length - child.indentationLevel - 1
      : indentNodes.length - 1;
    for (let i = 0; i < times; i++) {
      flushLines();
      indentNodes.pop();
    }
    if (child) {
      // need a linebreak after dedenting
      indentNodes.at(-1)!.pendingLines.push("");
    }
  }
  function flushLines() {
    const currentIndent = indentNodes.at(-1)!;
    currentIndent.children.push(
      ...currentIndent.pendingLines
        .map((str, index) =>
          index < currentIndent.pendingLines.length - 1 ? [str, hbr()] : [str],
        )
        .flat(),
    );
    currentIndent.pendingLines = [];
  }
}

type ChildToken = LineToken | OtherToken;
interface ChildTokenBase {
  kind: string;
  indentationLevel: number;
  newline: boolean;
}

interface LineToken extends ChildTokenBase {
  kind: "line";
  line: string;
}

interface OtherToken extends ChildTokenBase {
  kind: "other";
  value: Children;
}

function* childTokens(
  template: TemplateStringsArray,
  substitutions: Children[],
): IterableIterator<ChildToken> {
  let newline = false;
  const indentStack: { level: number; literalIndent: string }[] = [
    {
      level: -1,
      literalIndent: "",
    },
  ];

  yield* processLiteralString(
    template[0],
    substitutions.length === 0 ? "only" : "first",
  );
  newline = false;
  for (let i = 0; i < substitutions.length; i++) {
    const indentationLevel = currentIndent().level;
    yield {
      kind: "other",
      value: substitutions[i],
      indentationLevel: indentationLevel < 0 ? 0 : indentationLevel,
      newline,
    };
    yield* processLiteralString(
      template[i + 1],
      i === substitutions.length - 1 ? "last" : undefined,
    );
    newline = false;
  }

  function processLiteralString(
    child: string,
    pos?: "first" | "last" | "only",
  ) {
    const lines = child.split("\n");
    const lineTokens: LineToken[] = [];
    if ((pos === "first" || pos === "only") && lines[0].match(/^\s*$/)) {
      // remove leading whitespace.
      lines.shift();
      newline = true;
    }

    if (
      (pos === "last" || pos === "only") &&
      lines[lines.length - 1].match(/^\s*$/)
    ) {
      // remove trailing whitespace
      lines.pop();
      if (lines.length === 1 && lines[0].trimStart() === "") {
        // an empty line following a component most likely
        return [];
      }
    }

    // eslint-disable-next-line prefer-const
    for (let [lineNum, line] of lines.entries()) {
      if (lineNum > 0) {
        newline = true;
      }

      if (newline) {
        if (line === "" && currentIndent().level > -1) {
          // for empty lines we want to just continue with the current indentation
          lineTokens.push({
            kind: "line",
            line: "",
            indentationLevel: currentIndent().level,
            newline,
          });
          continue;
        }
        const lineIndent = line.match(/^\s+/)?.[0] ?? "";
        const startIndent = currentIndent();
        if (lineIndent.length > startIndent.literalIndent.length) {
          indentStack.push({
            level: startIndent.level + 1,
            literalIndent: lineIndent,
          });
        } else {
          while (currentIndent().literalIndent.length > lineIndent.length) {
            indentStack.pop();
          }
        }
        line = line.trimStart();

        const indentationLevel = currentIndent().level;
        lineTokens.push({
          kind: "line",
          line,
          indentationLevel: indentationLevel < 0 ? 0 : indentationLevel,
          newline,
        });
      } else {
        const indentationLevel = currentIndent().level;
        lineTokens.push({
          kind: "line",
          line,
          indentationLevel: indentationLevel < 0 ? 0 : indentationLevel,
          newline,
        });
      }
    }

    return lineTokens;
  }

  function currentIndent() {
    return indentStack.at(-1)!;
  }
}
