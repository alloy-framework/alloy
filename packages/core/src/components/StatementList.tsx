import type { Children } from "../runtime/component.js";
import { List } from "./List.jsx";

export interface StatementListProps {
  children: Children;
}

/**
 * Join child elements with semicolons and hardlines.
 */
export function StatementList(props: StatementListProps) {
  return (
    <List semicolon hardline enderPunctuation>
      {props.children}
    </List>
  );
}
