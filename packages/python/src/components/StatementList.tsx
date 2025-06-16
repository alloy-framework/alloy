import { Children, List } from "@alloy-js/core";

export interface StatementListProps {
  children: Children;
}

/**
 * Join child elements with semicolons and hardlines.
 */
export function StatementList(props: StatementListProps) {
  return (
    <List hardline>
      {props.children}
    </List>
  );
}