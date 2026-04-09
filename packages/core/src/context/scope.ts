import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import type { OutputScope } from "../symbols/output-scope.js";

export const ScopeContext: ComponentContext<OutputScope> =
  createNamedContext("Scope");

/**
 * Returns the current {@link OutputScope} from context. Must be called inside
 * a component that is a descendant of a `<Scope>` provider.
 */
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
