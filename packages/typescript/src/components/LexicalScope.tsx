import { Scope, ScopePropsWithInfo, ScopePropsWithValue } from "@alloy-js/core";
import { createLexicalScope, TSLexicalScope } from "../symbols/index.js";

export interface LexicalScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface LeixcalScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type LexicalScopeProps =
  | LexicalScopePropsWithScopeValue
  | LeixcalScopePropsWithScopeInfo;

/**
 * A lexical scope for TypeScript, which contains declaration spaces for types
 * and values. Declaration components will create symbols in this scope.
 */
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
