import { Children, List } from "@alloy-js/core";

export interface StatementListProps {
  children: Children;
}

export function StatementList(props: StatementListProps) {
  return (
    <List semicolon hardline ender=";">
      {props.children}
    </List>
  );
}
