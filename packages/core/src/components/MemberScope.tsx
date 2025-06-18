import { MemberScopeContext } from "../context/member-scope.js";
import type { Children } from "../runtime/component.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";
export interface MemberScopeProps {
  /**
   * The symbol that owns these members.
   */
  owner: OutputSymbol;
  children?: Children;
}

/**
 * Declare a member scope, which is a scope that holds symbols which are members
 * of the given owner symbol. This scope is then used for nested instance or
 * static member declarations and resolution of instance members.
 */
export function MemberScope(props: MemberScopeProps) {
  const context: MemberScopeContext = {
    ownerSymbol: props.owner,
  };
  return (
    <MemberScopeContext.Provider value={context}>
      {props.children}
    </MemberScopeContext.Provider>
  );
}
