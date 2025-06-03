import { Block, Indent, Match, Switch, type Children } from "@alloy-js/core";
import { BlockScope } from "./BlockScope.jsx";
import { ValueExpression } from "./ValueExpression.jsx";

export interface SwitchStatementProps {
  expression: Children;
  children: Children;
}

/**
 * A switch statement.
 */
export function SwitchStatement(props: SwitchStatementProps) {
  return (
    <>
      switch ({props.expression}) <Block>{props.children}</Block>
    </>
  );
}

export interface CaseClausePropsBase {
  children: Children;
  block?: boolean;
  break?: boolean;
}

export interface CaseClausePropsWithExpression extends CaseClausePropsBase {
  expression: Children;
}

export interface CaseClausePropsWithValue extends CaseClausePropsBase {
  jsValue: unknown;
}

export interface CaseClausePropsWithDefault extends CaseClausePropsBase {
  default: true;
}

export type CaseClauseProps =
  | CaseClausePropsWithExpression
  | CaseClausePropsWithValue
  | CaseClausePropsWithDefault;

/**
 * A case clause in a switch statement. Provide either an expression or a JS
 * value to compare to the switch expression. Can optionally be wrapped in a
 * block. Pass `break` to finish with a break statement.
 */
export function CaseClause(props: CaseClauseProps) {
  const Wrapper = props.block ? BlockScope : Indent;
  return (
    <>
      <Switch>
        <Match when={"default" in props && props.default}>default </Match>
        <Match else>
          case{" "}
          {"expression" in props ?
            props.expression
          : <ValueExpression
              jsValue={(props as CaseClausePropsWithValue).jsValue}
            />
          }
        </Match>
      </Switch>
      {": "}
      <Wrapper>
        {props.children}
        {props.break && (
          <>
            <hbr />
            break;
          </>
        )}
      </Wrapper>
    </>
  );
}
