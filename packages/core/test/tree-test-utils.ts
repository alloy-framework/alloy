import { TEXT_NODE, TextNode, type AlloyNode } from "../src/render/node.js";

export function textContent(root: AlloyNode): string {
  let result = "";

  function visit(node: AlloyNode): void {
    if (node.nodeType === TEXT_NODE) {
      result += (node as TextNode).data;
      return;
    }

    for (
      let child = node.firstChild;
      child !== null;
      child = child.nextSibling
    ) {
      visit(child);
    }
  }

  visit(root);
  return result;
}
