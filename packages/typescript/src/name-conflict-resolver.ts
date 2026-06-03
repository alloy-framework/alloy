import { OutputSymbol } from "@alloy-js/core";
import { TSOutputSymbol, TSSymbolFlags } from "./symbols/index.js";

export function tsNameConflictResolver(name: string, symbols: OutputSymbol[]) {
  const goodNamedSymbols = (symbols as TSOutputSymbol[]).filter(
    (s) => ~s.tsFlags & TSSymbolFlags.LocalImportSymbol,
  );
  const badNamedSymbols = (symbols as TSOutputSymbol[]).filter(
    (s) => s.tsFlags & TSSymbolFlags.LocalImportSymbol,
  );
  let nameCount = 1;
  if (goodNamedSymbols.length >= 1) {
    // The first "good" symbol owns the plain name. Clear any prior
    // deconflict rename so survivors reclaim the original name when a
    // collision is resolved.
    goodNamedSymbols[0].deconflictedName = undefined;
  }
  if (goodNamedSymbols.length > 1) {
    for (const sym of goodNamedSymbols.slice(1)) {
      sym.deconflictedName = name + "_" + nameCount++;
    }
  }
  for (const sym of badNamedSymbols) {
    sym.deconflictedName = name + "_" + nameCount++;
  }
}
