import { OutputSymbol } from "../binder.js";
import { ComponentContext, createNamedContext } from "../context.js";

/**
 * Provides the symbol for the member currently being declared.
 *
 * @see {@link DeclarationContext} for getting the symbol for the current non-member declaration.
 */
export const MemberDeclarationContext: ComponentContext<OutputSymbol> =
  createNamedContext("MemberDeclaration");
