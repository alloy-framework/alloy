import { OutputScope } from "../binder.js";
import { ComponentContext, createContext, useContext } from "../context.js";

/**
 * The member scope context provides the instance and static member scopes that
 * are used for member declarations and instance member resolution.
 */
export interface MemberScopeContext {
  staticMembers?: OutputScope;
  instanceMembers?: OutputScope;
}
export const MemberScopeContext: ComponentContext<MemberScopeContext> =
  createContext();

export function useMemberScope() {
  return useContext(MemberScopeContext)!;
}
