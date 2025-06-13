import { Block, type Children } from "@alloy-js/core";

export interface IfStatementProps {
  condition: Children;
  children: Children;
}

/**
 * An if statement.
 */
export function IfStatement(props: IfStatementProps) {
  return (
    <>
      if ({props.condition}) <Block>{props.children}</Block>
    </>
  );
}

export interface ElseIfClauseProps {
  condition: Children;
  children: Children;
}

/**
 * An else clause with an if statement.
 */
export function ElseIfClause(props: ElseIfClauseProps) {
  return (
    <>
      {" "}
      else if ({props.condition}) <Block>{props.children}</Block>
    </>
  );
}

export interface ElseClauseProps {
  children: Children;
}

/**
 * The else clause of an if statement.
 */
export function ElseClause(props: ElseClauseProps) {
  return (
    <>
      {" "}
      else <Block>{props.children}</Block>
    </>
  );
}
