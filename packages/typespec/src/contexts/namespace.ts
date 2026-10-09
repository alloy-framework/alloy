import type { ComponentContext } from "@alloy-js/core";
import { createContext, useContext } from "@alloy-js/core";

import type { NamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceContext {
  symbol: NamespaceSymbol;
}

export const NamespaceContext: ComponentContext<NamespaceContext> =
  createContext();

export function useNamespaceContext() {
  return useContext(NamespaceContext);
}
