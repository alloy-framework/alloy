import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceContext {
  symbol: CSharpNamespaceSymbol;
}

export const NamespaceContext: ComponentContext<NamespaceContext> =
  createContext();

export function useNamespaceContext() {
  return useContext(NamespaceContext);
}
