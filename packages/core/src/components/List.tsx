import { Children, memo, splitProps } from "@alloy-js/core/jsx-runtime";
import { childrenArray, JoinOptions } from "../utils.js";
import { For } from "./For.jsx";

export type BreakKind = "none" | "space" | "soft" | "hard" | "literal";

export interface BaseListProps {
  /** Text to place between each element */
  joiner?: Children;

  /** Place a comma between each element */
  comma?: boolean;

  /** Place a semicolon between each element */
  semicolon?: boolean;

  line?: boolean;
  softline?: boolean;
  hardline?: boolean;
  literalline?: boolean;

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

export function baseListPropsToMapJoinArgs(props: BaseListProps): JoinOptions {
  let joiner, punctuation;
  if ("joiner" in props) {
    joiner = props.joiner;
  } else {
    punctuation =
      props.comma ? ","
      : props.semicolon ? ";"
      : "";

    joiner = (
      <>
        {punctuation}
        {props.softline ?
          <sbr />
        : props.hardline ?
          <hbr />
        : props.literalline ?
          <lbr />
        : props.line ?
          <br />
        : <hbr />}
      </>
    );
  }

  const ender =
    "ender" in props ? props.ender
    : props.enderPunctuation ? punctuation
    : undefined;

  return { joiner, ender };
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
    <For each={resolvedChildren} {...forProps}>
      {(child) => child}
    </For>
  );
}
