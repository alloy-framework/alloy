import { TSOutputSymbol, TSSymbolFlags } from "./symbols/index.js";

export function tsNameConflictResolver(
  name: string,
  symbols: TSOutputSymbol[],
) {
  const goodNamedSymbols = symbols.filter(
    (s) => ~s.tsFlags & TSSymbolFlags.LocalImportSymbol,
  );
  const badNamedSymbols = symbols.filter(
    (s) => s.tsFlags & TSSymbolFlags.LocalImportSymbol,
  );
  let nameCount = 1;
  if (goodNamedSymbols.length > 1) {
    for (const sym of goodNamedSymbols.slice(1)) {
      sym.name = name + "_" + nameCount++;
    }
  }
  for (const sym of badNamedSymbols) {
    sym.name = name + "_" + nameCount++;
  }
}
