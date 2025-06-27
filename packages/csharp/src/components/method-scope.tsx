import {
  Scope,
  ScopePropsWithInfo,
  ScopePropsWithValue,
  useScope,
} from "@alloy-js/core";
import { CSharpMethodScope } from "../scopes/method-scope.js";

export interface MethodScopePropsWithScopeValue extends ScopePropsWithValue {}
export interface MethodScopePropsWithScopeInfo extends ScopePropsWithInfo {}

export type MethodScopeProps =
  | MethodScopePropsWithScopeValue
  | MethodScopePropsWithScopeInfo;

export function MethodScope(props: MethodScopeProps) {
  let scope;
  if ("value" in props) {
    if (!(props.value instanceof CSharpMethodScope)) {
      throw new Error("MethodScope value must be a CSharpMethodScope instance");
    }
    scope = props.value;
  } else {
    const parentScope = useScope();
    scope = new CSharpMethodScope(props.name ?? "method scope", parentScope, {
      ...props,
    });
  }

  return <Scope value={scope}>{props.children}</Scope>;
}
