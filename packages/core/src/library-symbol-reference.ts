import { RefkeyableObject } from "./refkey.js";
import { OutputSymbol } from "./symbols/output-symbol.js";

export const TO_SYMBOL: unique symbol = Symbol(
  "Alloy.RefkeyableObject.TO_SYMBOL",
);

export interface LibrarySymbolReference extends RefkeyableObject {
  [TO_SYMBOL](): OutputSymbol;
}

export function isLibrarySymbolReference(
  value: unknown,
): value is LibrarySymbolReference {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.hasOwn(value, TO_SYMBOL)
  );
}
