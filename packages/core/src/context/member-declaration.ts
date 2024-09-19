import { OutputSymbol } from "../binder.js";
import { ComponentContext, createContext } from "../context.js";

/**
 * Provides the symbol for the member currently being declared.
 *
 * @see {@link DeclarationContext} for getting the symbol for the current non-member declaration.
 */
export const MemberDeclarationContext: ComponentContext<OutputSymbol> =
  createContext();
