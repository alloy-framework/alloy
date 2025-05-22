import { ComponentContext, createNamedContext } from "../context.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";

export const DeclarationContext: ComponentContext<OutputSymbol> =
  createNamedContext("Declaration");
