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
    const first = goodNamedSymbols[0];
    // If the first "good" symbol carries a leftover auto-generated alias from
    // a prior conflict, reset it — it now owns the plain name.
    if (isAutoAlias(first.name, first.originalName)) {
      first.name = first.originalName;
    }
  }
  if (goodNamedSymbols.length > 1) {
    for (const sym of goodNamedSymbols.slice(1)) {
      sym.name = name + "_" + nameCount++;
    }
  }
  for (const sym of badNamedSymbols) {
    sym.name = name + "_" + nameCount++;
  }
}

function isAutoAlias(name: string, originalName: string): boolean {
  if (name === originalName) return true;
  if (!name.startsWith(originalName + "_")) return false;
  const suffix = name.slice(originalName.length + 1);
  return /^\d+$/.test(suffix);
}
