import { Children, List, splitProps } from "@alloy-js/core";

export interface CommaListProps {
  children: Children;
  hardline?: boolean;
  softline?: boolean;
}

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
