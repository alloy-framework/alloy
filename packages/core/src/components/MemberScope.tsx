import { MemberScopeContext } from "../context/member-scope.js";
import { Children } from "../jsx-runtime.js";
import { OutputSymbol } from "../symbols/output-symbol.js";
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
 *
 * @see {@link (MemberScopeContext:variable)}
 */
export function MemberScope(props: MemberScopeProps) {
  const context: MemberScopeContext = {
    instanceMembers: props.owner.instanceMemberScope,
    staticMembers: props.owner.staticMemberScope,
  };
  return (
    <MemberScopeContext.Provider value={context}>
      {props.children}
    </MemberScopeContext.Provider>
  );
}
