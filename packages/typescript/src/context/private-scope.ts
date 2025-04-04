import { createContext, useContext } from "@alloy-js/core";
import { TSMemberScope } from "../symbols/ts-member-scope.js";

export interface PrivateScopeContext {
  staticMembers: TSMemberScope;
  instanceMembers: TSMemberScope;
}

export const PrivateScopeContext = createContext<PrivateScopeContext>();

export function usePrivateScope() {
  return useContext(PrivateScopeContext);
}
