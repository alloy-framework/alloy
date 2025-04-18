import { ComponentContext, createContext, useContext } from "@alloy-js/core";

export interface TypeScriptContext {
  /** If in a type context */
  type?: boolean;
}

/**
 * Provides scopes for instance and static private members.
 */
export const TypeScriptContext: ComponentContext<TypeScriptContext> =
  createContext<TypeScriptContext>();

export function useTSContext(): TypeScriptContext {
  return useContext(TypeScriptContext) ?? { type: false };
}
