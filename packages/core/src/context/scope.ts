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
