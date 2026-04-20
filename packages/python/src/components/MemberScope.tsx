import {
  Children,
  MemberScope as CoreMemberScope,
  createScope,
} from "@alloy-js/core";
import { PythonMemberScope } from "../symbols/python-member-scope.js";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import { usePythonScope } from "../symbols/scopes.js";
export interface MemberScopeProps {
  children: Children;
  ownerSymbol: PythonOutputSymbol;
}

export function MemberScope(props: MemberScopeProps) {
  const parentScope = usePythonScope();
  const binder = props.ownerSymbol.binder ?? parentScope?.binder;
  const memberScope = createScope(
    PythonMemberScope,
    "member-scope",
    parentScope,
    {
      ownerSymbol: props.ownerSymbol,
      binder,
    },
  );

  return (
    <CoreMemberScope value={memberScope}>{props.children}</CoreMemberScope>
  );
}
