/**
 * `createIntrinsic("name", props)` — runtime version.
 *
 * The babel-emitted compiled output of a JSX intrinsic such as
 * `<group shouldBreak>{...}</group>` calls this with the tag name and
 * props. It allocates an `ElementNode` whose `localName` is the
 * intrinsic kind and stores the non-`children` props on `data`, then
 * eagerly inserts the children via the polymorphic {@link insert}
 * helper. The set of recognized localNames matches the cases handled
 * by the direct printer (`group`, `indent`, `line`, `softline`, `hardline`,
 * `ifBreak`, ...); unknown names pass through as transparent
 * containers.
 *
 * Examples:
 *
 *   <group shouldBreak={true}>...</group>
 *     ─→ createIntrinsic("group", { shouldBreak: true, children: [...] })
 *     ─→ ElementNode { localName: "group", data: { shouldBreak: true } }
 */

import { createElement, type ElementNode } from "../render/node.js";
import type { Children, Props } from "./component.js";
import { insert } from "./insert.js";

/**
 * Create an intrinsic ElementNode and insert its children eagerly.
 */
export function createIntrinsic(
  name: string,
  props?: Props & { children?: Children },
): ElementNode {
  let data: Record<string, unknown> | undefined;
  let children: Children | undefined;
  let flatContents: Children | undefined;
  if (props !== undefined) {
    for (const key in props) {
      if (key === "children") {
        children = props.children;
      } else if (key === "flatContents" && name === "ifBreak") {
        flatContents = props[key] as Children;
      } else {
        if (data === undefined) data = {};
        data[key] = props[key];
      }
    }
  }
  if (flatContents !== undefined) {
    const flatNode = createElement("alloy:if-break-flat");
    insert(flatNode, flatContents);
    if (data === undefined) data = {};
    data.flatNode = flatNode;
  }
  const node = createElement(name, data);
  if (children !== undefined) insert(node, children);
  return node;
}
