import { Children, MemberScope as CoreMemberScope } from "@alloy-js/core";
import { PythonMemberScope } from "../symbols/python-member-scope.js";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import { usePythonScope } from "../symbols/scopes.js";
export interface MemberScopeProps {
  children: Children;
  ownerSymbol: PythonOutputSymbol;
}

export function MemberScope(props: MemberScopeProps) {
  const memberScope = new PythonMemberScope("member-scope", usePythonScope(), {
    ownerSymbol: props.ownerSymbol,
  });

  return (
    <CoreMemberScope value={memberScope}>{props.children}</CoreMemberScope>
  );
}
