import { toRef } from "@vue/reactivity";
import { createSymbol } from "../binder.js";
import { useScope } from "../context/scope.js";
import { Namekey } from "../refkey.js";
import { createComponent } from "../runtime/component.js";
import { BasicScope } from "./basic-scope.js";
import { BasicSymbol } from "./basic-symbol.js";

/**
 * Create a declaration in the current scope with the given namekey. Only works
 * with basic scopes. Import `decl` from a specific language library for
 * declaring language-specific symbols.
 */
export function decl(namekey: Namekey) {
  return createComponent(() => {
    const currentScope = useScope();
    if (!(currentScope instanceof BasicScope)) {
      throw new Error(
        `Cannot declare symbol in non-basic scope: ${currentScope.constructor.name}. Use a language-specific 'decl' function instead.`,
      );
    }
    const binder = currentScope.binder;
    const symbol = createSymbol(BasicSymbol, namekey, currentScope.symbols, {
      binder,
    });

    return toRef(symbol, "name");
  }, {});
}
