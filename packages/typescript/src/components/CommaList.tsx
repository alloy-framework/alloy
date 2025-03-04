import { Children, List, splitProps } from "@alloy-js/core";

export interface CommaListProps {
  children: Children;
  hardline?: boolean;
  softline?: boolean;
}

/**
 * A comma-separated list of items (e.g. arguments to a function call,
 * parameters, etc).
 */
export function CommaList(props: CommaListProps) {
  return (
    <List
      comma
      {...splitProps(props, ["hardline", "softline"])}
      enderPunctuation
    >
      {props.children}
    </List>
  );
}
