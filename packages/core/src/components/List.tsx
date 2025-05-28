import { splitProps } from "../props-combinators.js";
import { memo } from "../reactivity.js";
import type { Children } from "../runtime/component.js";
import { childrenArray } from "../utils.js";
import { For } from "./For.jsx";

export interface BaseListProps {
  /** Text to place between each element */
  joiner?: Children;

  /** Place a comma between each element */
  comma?: boolean;

  /** Place a semicolon between each element */
  semicolon?: boolean;

  /** Place a regular line (`<br />`) between each element */
  line?: boolean;

  /** Place a softline (`<sbr />`) between each element */
  softline?: boolean;

  /** Place a hardline (`<hbr />`) between each element */
  hardline?: boolean;

  /** Place two hardlines between each element */
  doubleHardline?: boolean;

  /** Place a literal line (`<lbr />`) between each element */
  literalline?: boolean;

  /** Place a space between each element */
  space?: boolean;

  /**
   * Text to place at the end of the list when there is at least one item. If
   * set to true, the joiner is used.
   **/
  ender?: Children;

  /**
   * Place the join punctuation at the end, but without a line break.
   */
  enderPunctuation?: boolean;
}

export interface ListProps extends BaseListProps {
  children?: Children;
}

/**
 * Create a list of children with text between each child. The text to join with
 * is specified by providing either `joiner` children, or providing boolean
 * props for the punctuation and line breaks. The default joiner is no
 * punctuation and a hard break. The `ender` prop can provide text to place at
 * the end of the list when there is at least one child.
 */
export function List(props: ListProps) {
  const [rest, forProps] = splitProps(props, ["children"]);
  const resolvedChildren = memo(() =>
    childrenArray(() => rest.children, {
      preserveFragments: true,
    }),
  );
  return (
    <For each={resolvedChildren} {...forProps} skipFalsy>
      {(child) => child}
    </For>
  );
}
