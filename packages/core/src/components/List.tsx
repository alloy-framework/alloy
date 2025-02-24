import { Children, splitProps } from "@alloy-js/core/jsx-runtime";
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

  /** Text to place at the end of the list when there is at least one item */
  ender?: Children;
}

export function baseListPropsToMapJoinArgs(props: BaseListProps): JoinOptions {
  let joiner;
  if ("joiner" in props) {
    joiner = props.joiner;
  } else {
    const punctuation =
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

  const ender = props.ender;

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
  return (
    <For each={childrenArray(() => rest.children)} {...forProps}>
      {(child) => child}
    </For>
  );
}
