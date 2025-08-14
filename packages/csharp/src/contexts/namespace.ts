import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceContext {
  symbol: NamespaceSymbol;
}

export const NamespaceContext: ComponentContext<NamespaceContext> =
  createContext();

export function useNamespaceContext() {
  return useContext(NamespaceContext);
}
