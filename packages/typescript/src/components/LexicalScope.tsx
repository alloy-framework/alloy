import { Scope, ScopePropsWithInfo, ScopePropsWithValue } from "@alloy-js/core";
import { createLexicalScope, TSLexicalScope } from "../symbols/index.js";

export interface LexicalScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface LeixcalScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type LexicalScopeProps =
  | LexicalScopePropsWithScopeValue
  | LeixcalScopePropsWithScopeInfo;

export function LexicalScope(props: LexicalScopeProps) {
  let scope;
  if ("value" in props) {
    if (!(props.value instanceof TSLexicalScope)) {
      throw new Error("LexicalScope value must be a TSLexicalScope instance");
    }
    scope = props.value;
  } else {
    scope = createLexicalScope(props.name ?? "Lexical scope", props);
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
