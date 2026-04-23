import { Children, printTree, renderTree } from "../src/index.js";

export { printTree } from "../src/index.js";

/**
 * Render a JSX element tree to a string. Convenience wrapper combining
 * `renderTree` and `printTree`.
 */
export function renderToString(element: Children) {
  return printTree(renderTree(element));
}

/**
 * Dedented template literal tag. Strips leading/trailing blank lines and
 * removes the common leading whitespace from all lines — useful for
 * multi-line expected output in tests.
 */
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
