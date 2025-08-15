import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import type { OutputScope } from "../symbols/output-scope.js";

export const ScopeContext: ComponentContext<OutputScope> =
  createNamedContext("Scope");

export function useScope() {
  return useContext(ScopeContext)!;
}

export function useMemberScope() {
  const scope = useScope();
  if (!scope.isMemberScope) {
    throw new Error("Expected a member scope, but got a non-member scope.");
  }

  return scope;
}
