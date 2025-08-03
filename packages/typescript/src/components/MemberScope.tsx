import { Children, MemberScope as CoreMemberScope } from "@alloy-js/core";
import { useTSLexicalScopeIfPresent } from "../symbols/scopes.js";
import { TSMemberScope } from "../symbols/ts-member-scope.js";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";
export interface MemberScopeProps {
  children: Children;
  ownerSymbol: TSOutputSymbol;
}

export function MemberScope(props: MemberScopeProps) {
  const memberScope = new TSMemberScope(
    "member-scope",
    useTSLexicalScopeIfPresent(),
    props.ownerSymbol,
  );

  return (
    <CoreMemberScope value={memberScope}>{props.children}</CoreMemberScope>
  );
}
