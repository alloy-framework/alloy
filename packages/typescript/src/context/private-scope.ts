import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { TSMemberScope } from "../symbols/ts-member-scope.js";

export interface PrivateScopeContext {
  /**
   * Scope for private static members.
   */
  staticMembers: TSMemberScope;
  /**
   * Scope for private instance members.
   */
  instanceMembers: TSMemberScope;
}

/**
 * Provides scopes for instance and static private members.
 */
export const PrivateScopeContext: ComponentContext<PrivateScopeContext> =
  createContext<PrivateScopeContext>();

export function usePrivateScope() {
  return useContext(PrivateScopeContext);
}
