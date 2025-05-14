import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import type { OutputScope } from "../symbols/output-scope.js";

/**
 * The member scope context provides the instance and static member scopes that
 * are used for member declarations and instance member resolution.
 */
export interface MemberScopeContext {
  staticMembers?: OutputScope;
  instanceMembers?: OutputScope;
}
export const MemberScopeContext: ComponentContext<MemberScopeContext> =
  createNamedContext("MemberScope");

export function useMemberScope() {
  return useContext(MemberScopeContext)!;
}
