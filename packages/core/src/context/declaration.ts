import { OutputSymbol } from "../binder.js";
import { ComponentContext, createNamedContext } from "../context.js";

export const DeclarationContext: ComponentContext<OutputSymbol> =
  createNamedContext("Declaration");
