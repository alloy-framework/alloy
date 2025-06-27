import {
  Scope,
  ScopePropsWithInfo,
  ScopePropsWithValue,
  useScope,
} from "@alloy-js/core";
import { CSharpLexicalScope } from "../scopes/lexical-scope.js";

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
    const parentScope = useScope();
    scope = new CSharpLexicalScope(props.name ?? "lexical scope", parentScope, {
      ...props,
    });
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
