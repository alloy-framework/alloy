import { RustOutputSymbol } from "./symbols/rust-output-symbol.js";

function isUseImportedSymbol(symbol: RustOutputSymbol): boolean {
  return (
    symbol.isAlias ||
    symbol.metadata.rustImportedSymbol === true ||
    symbol.metadata.isRustUseImport === true
  );
}

export function rustNameConflictResolver(name: string, symbols: RustOutputSymbol[]) {
  if (symbols.length <= 1) {
    return;
  }

  const localSymbols: RustOutputSymbol[] = [];
  const importedSymbols: RustOutputSymbol[] = [];

  for (const symbol of symbols) {
    if (isUseImportedSymbol(symbol)) {
      importedSymbols.push(symbol);
    } else {
      localSymbols.push(symbol);
    }
  }

  let nameCount = 2;

  if (localSymbols.length === 0 && importedSymbols.length > 0) {
    for (const symbol of importedSymbols.slice(1)) {
      symbol.name = `${name}_${nameCount++}`;
    }
    return;
  }

  for (const symbol of importedSymbols) {
    symbol.name = `${name}_${nameCount++}`;
  }
}
