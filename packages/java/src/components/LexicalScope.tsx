import {
  createScope,
  Scope,
  ScopePropsWithInfo,
  ScopePropsWithValue,
  useScope,
} from "@alloy-js/core";
import { JavaLexicalScope } from "../symbols/index.js";

export interface LexicalScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface LeixcalScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type LexicalScopeProps =
  | LexicalScopePropsWithScopeValue
  | LeixcalScopePropsWithScopeInfo;

export function LexicalScope(props: LexicalScopeProps) {
  let scope;
  if ("value" in props) {
    if (!(props.value instanceof JavaLexicalScope)) {
      throw new Error("LexicalScope value must be a TSLexicalScope instance");
    }
    scope = props.value;
  } else {
    const parentScope = useScope();
    scope = createScope(
      JavaLexicalScope,
      props.name ?? "lexical scope",
      parentScope,
      {
        ...props,
      },
    );
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
