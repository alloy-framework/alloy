import { OutputSymbol } from "../binder.js";
import { ComponentContext, createContext } from "../context.js";

export const DeclarationContext: ComponentContext<OutputSymbol> =
  createContext();
