import { Scope, ScopePropsWithInfo, ScopePropsWithValue } from "@alloy-js/core";
import { createLexicalScope } from "../symbol-creation.js";
import { PythonLexicalScope } from "../symbols/python-lexical-scope.js";

export interface LexicalScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface LeixcalScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type LexicalScopeProps =
  | LexicalScopePropsWithScopeValue
  | LeixcalScopePropsWithScopeInfo;

export function LexicalScope(props: LexicalScopeProps) {
  let scope;
  if ("value" in props) {
    if (!(props.value instanceof PythonLexicalScope)) {
      throw new Error("LexicalScope value must be a TSLexicalScope instance");
    }
    scope = props.value;
  } else {
    scope = createLexicalScope(props.name ?? "Lexical scope", props);
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
