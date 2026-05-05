import type { Children } from "../src/index.js";
import { printTree, renderTree } from "../src/test-render.js";

export type { PrintTreeOptions } from "../src/output-types.js";
export {
  getDiagnosticsForTree,
  getFilesFromTree,
  printTree,
  renderTree,
  type RenderTreeOptions,
} from "../src/test-render.js";

/** Convenience wrapper combining `renderTree` and `printTree`. */
export function renderToString(element: Children) {
  return printTree(renderTree(element));
}

/**
 * Dedented template literal tag. Strips leading/trailing blank lines
 * and removes the common leading whitespace from all lines — useful
 * for multi-line expected output in tests.
 */
export function d(strings: TemplateStringsArray, ...values: any[]): string {
  const result = strings.reduce(
    (acc, str, i) => acc + str + (values[i] ?? ""),
    "",
  );
  return dedent(result);
}

export function dedent(str: string): string {
  str = str.replace(/^\n|\n[ ]*$/g, "");
  const match = str.match(/^[ \t]+/);
  const indent = match ? match[0] : "";
  return str
    .split("\n")
    .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line))
    .join("\n");
}
