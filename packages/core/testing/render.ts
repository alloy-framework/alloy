import { RenderTextTree, renderTree } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export function printTree(tree: RenderTextTree) {
  return (tree as any).flat(Infinity).join("");
}

export function renderToString(element: Children) {
  return printTree(renderTree(element));
}

export function d(strings: TemplateStringsArray, ...values: any[]): string {
  // Combine the strings and values
  const result = strings.reduce(
    (acc, str, i) => acc + str + (values[i] ?? ""),
    "",
  );

  return dedent(result);
}

export function dedent(str: string): string {
  // Remove leading and trailing line breaks
  str = str.replace(/^\n|\n[ ]*$/g, "");

  // Find the indent of the first line
  const match = str.match(/^[ \t]+/);
  const indent = match ? match[0] : "";

  // Remove the indent from each line
  const dedented = str
    .split("\n")
    .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line))
    .join("\n");

  return dedented;
}
