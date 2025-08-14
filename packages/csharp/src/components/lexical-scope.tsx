import { Scope, ScopePropsWithInfo, ScopePropsWithValue } from "@alloy-js/core";
import { useCSharpScope } from "../scopes/contexts.js";
import { CSharpLexicalScope } from "../scopes/lexical.js";

export interface LexicalScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface LeixcalScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type LexicalScopeProps =
  | LexicalScopePropsWithScopeValue
  | LeixcalScopePropsWithScopeInfo;

export function LexicalScope(props: LexicalScopeProps) {
  let scope;
  if ("value" in props) {
    if (!(props.value instanceof CSharpLexicalScope)) {
      throw new Error(
        "LexicalScope value must be a CSharpLexicalScope instance",
      );
    }
    scope = props.value;
  } else {
    const parentScope = useCSharpScope();
    scope = new CSharpLexicalScope(props.name ?? "lexical scope", parentScope, {
      ...props,
    });
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
