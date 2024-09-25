import { Children } from "@alloy-js/core/jsx-runtime";
import { OutputSymbol } from "../binder.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OutputSymbolFlags } from "../binder.js";
import { MemberScopeContext } from "../context/member-scope.js";
export interface MemberScopeProps {
  /**
   * The name of the member scope.
   */
  name?: string;

  /**
   * The symbol that owns these members. This symbol must have either
   * {@link OutputSymbolFlags.InstanceMemberContainer} or
   * {@link OutputSymbolFlags.StaticMemberContainer}.
   */
  owner: OutputSymbol;
  children?: Children;
}

/**
 * Declare a member scope, which is a scope that holds instance and static
 * members. This scope is then used for nested instance or static member
 * declarations and resolution of instance members.
 *
 * @remarks
 *
 * The member scope contains scopes for both instance and static members.
 * However, it does not affect the resolution of static members.
 */
export function MemberScope(props: MemberScopeProps) {
  const context: MemberScopeContext = {
    instanceMembers: props.owner.instanceMemberScope,
    staticMembers: props.owner.staticMemberScope,
  };
  return <MemberScopeContext.Provider value={context}>
      {props.children}
    </MemberScopeContext.Provider>;
}
