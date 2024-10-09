import { OutputScope } from "../binder.js";
import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";

export const ScopeContext: ComponentContext<OutputScope> =
  createNamedContext("Scope");

export function useScope() {
  return useContext(ScopeContext)!;
}
