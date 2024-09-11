import { OutputScope } from "../binder.js";
import { ComponentContext, createContext, useContext } from "../context.js";

export const ScopeContext: ComponentContext<OutputScope> = createContext();

export function useScope() {
  return useContext(ScopeContext)!;
}
