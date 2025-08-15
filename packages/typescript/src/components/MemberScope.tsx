import { Children, MemberScope as CoreMemberScope } from "@alloy-js/core";
import { useTSLexicalScopeIfPresent } from "../symbols/scopes.js";
import { TSMemberScope } from "../symbols/ts-member-scope.js";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";

export interface MemberScopeProps {
  children: Children;

  /**
   * The symbol that this member scope will create member symbols on.
   */
  ownerSymbol: TSOutputSymbol;
}

/**
 * A member scope for TypeScript. Member declarations will create symbols
 * in this scope, which will be added to the owner symbol's members.
 */
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
