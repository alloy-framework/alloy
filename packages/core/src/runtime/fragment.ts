/**
 * `Fragment` component.
 *
 * Compiles `<>...</>` into `createComponent(Fragment, { children: [...] })`.
 * When invoked, returns a `FragmentNode` whose children are eagerly
 * inserted via the polymorphic {@link insert}. `FragmentNode` has
 * DocumentFragment splice-on-insert semantics — inserting a fragment
 * into a parent moves its children into the parent and leaves the
 * fragment empty.
 */

import { createFragment, type FragmentNode } from "../render/node.js";
import type { Children } from "./component.js";
import { insert } from "./insert.js";

export function Fragment(props: { children?: Children }): FragmentNode {
  const node = createFragment();
  if (props.children !== undefined) {
    insert(node, props.children);
  }
  return node;
}
