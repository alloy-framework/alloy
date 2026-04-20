import { RefkeyableObject } from "./refkey.js";
import { OutputSymbol } from "./symbols/output-symbol.js";

/**
 * Well-known symbol for the lazy-symbol-creation protocol used by external
 * library descriptors. Objects implementing `[TO_SYMBOL]()` are recognized as
 * {@link LibrarySymbolReference} values that can be passed anywhere a refkey
 * is accepted.
 *
 * @remarks
 *
 * Implement `[TO_SYMBOL]()` on a descriptor object to register it as a
 * referenceable library symbol. Inside the method:
 *
 * 1. Call {@link useBinder} to get the current binder context.
 * 2. Look up (or create) the symbol for that binder in a
 *    `WeakMap<object, OutputSymbol>` (use a sentinel object for the
 *    no-binder case, since `WeakMap` keys must be objects).
 * 3. On first creation, construct the symbol and register it into the
 *    appropriate space for your library, passing `{ binder }`
 *    (see {@link OutputSymbolOptions.binder}).
 *
 * The method is called by language package code each time the descriptor is
 * used as a reference (e.g. inside `ref()`). It is NOT called by the binder
 * itself.
 *
 * @example
 *
 * ```ts
 * const defaultKey = {};
 * const symbols = new WeakMap<object, MySymbol>();
 * const descriptor: LibrarySymbolReference = {
 *   [REFKEYABLE]() {
 *     return descriptor[TO_SYMBOL]().refkeys[0];
 *   },
 *   [TO_SYMBOL]() {
 *     const binder = useBinder();
 *     const key = binder ?? defaultKey;
 *     let sym = symbols.get(key);
 *     if (!sym) {
 *       sym = new MySymbol("SomeType", space, { binder });
 *       symbols.set(key, sym);
 *     }
 *     return sym;
 *   },
 * };
 * ```
 */
export const TO_SYMBOL: unique symbol = Symbol(
  "Alloy.RefkeyableObject.TO_SYMBOL",
);

/**
 * An object that acts as a lazy reference to an external library symbol.
 * Implements {@link REFKEYABLE} and `[TO_SYMBOL]()`.
 *
 * Use {@link isLibrarySymbolReference} to test whether an unknown value is a
 * library symbol reference.
 */
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
