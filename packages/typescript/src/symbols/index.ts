import { computed } from "@alloy-js/core";
import { TSOutputSymbol } from "./ts-output-symbol.js";

export * from "./reference.js";
export * from "./scopes.js";
export * from "./ts-member-scope.js";
export * from "./ts-module-scope.js";
export * from "./ts-output-symbol.js";
export * from "./ts-package-scope.js";

export function mergeSymbols(symbols: TSOutputSymbol[]) {
  if (symbols.length === 0) {
    throw new Error("Must merge at least one symbol");
  }
  const baseSymbol = symbols[0];
  const binder = baseSymbol.binder;
  const mergedSymbol = binder.mergeSymbols(symbols);
  const exp = computed(() => {
    return symbols.some((symbol) => symbol.export);
  });
  const def = computed(() => {
    return symbols.some((symbol) => symbol.default);
  });

  const tsFlags = symbols.reduce(
    (acc, symbol) => acc | symbol.tsFlags,
    baseSymbol.tsFlags,
  );

  // handle TS-specific merging
  /*
  export interface TSOutputSymbol extends OutputSymbol {
    scope: TSOutputScope;
    export: boolean;
    default: boolean;
    tsFlags: TSSymbolFlags;
    privateMemberScope?: TSMemberScope;
    privateStaticMemberScope?: TSMemberScope;
  }
  */
}
