import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { PythonMemberScope } from "../symbols/python-member-scope.js";

export interface PrivateScopeContext {
  /**
   * Scope for private static members.
   */
  staticMembers: PythonMemberScope;
  /**
   * Scope for private instance members.
   */
  instanceMembers: PythonMemberScope;
}

/**
 * Provides scopes for instance and static private members.
 */
export const PrivateScopeContext: ComponentContext<PrivateScopeContext> =
  createContext<PrivateScopeContext>();

export function usePrivateScope() {
  return useContext(PrivateScopeContext);
}
