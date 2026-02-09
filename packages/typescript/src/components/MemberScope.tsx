import {
  Children,
  MemberScope as CoreMemberScope,
  createScope,
} from "@alloy-js/core";
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
  const parentScope = useTSLexicalScopeIfPresent();
  const binder = props.ownerSymbol.binder ?? parentScope?.binder;
  const memberScope = createScope(
    TSMemberScope,
    "member-scope",
    parentScope,
    props.ownerSymbol,
    {
      binder,
    },
  );

  return (
    <CoreMemberScope value={memberScope}>{props.children}</CoreMemberScope>
  );
}
