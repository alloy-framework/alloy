import { reactive, Refkey, shallowReactive } from "@alloy-js/core";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { TSOutputSymbol, TSSymbolFlags } from "./ts-output-symbol.js";

export interface ImportedSymbol {
  local: TSOutputSymbol;
  target: TSOutputSymbol;
}
export type ImportRecords = Map<TSModuleScope, Set<ImportedSymbol>>;

export interface AddImportOptions {
  type?: boolean;
}

export class TSModuleScope extends TSLexicalScope {
  #exportedSymbols: Map<Refkey, TSOutputSymbol> = shallowReactive(new Map());
  get exportedSymbols() {
    return this.#exportedSymbols;
  }

  #importedSymbols: Map<TSOutputSymbol, TSOutputSymbol> = shallowReactive(
    new Map(),
  );

  get importedSymbols() {
    return this.#importedSymbols;
  }

  #importedModules: ImportRecords = reactive(new Map());
  get importedModules() {
    return this.#importedModules;
  }

  addImport(
    targetSymbol: TSOutputSymbol,
    targetModule: TSModuleScope,
    options?: AddImportOptions,
  ) {
    const existing = this.importedSymbols.get(targetSymbol);
    if (existing) {
      if (!options?.type && existing.isTypeSymbol) {
        existing.spaces.push(this.values);
      }
      return existing;
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, new Set());
    }

    let localSymbol;

    if (options?.type) {
      localSymbol = new TSOutputSymbol(targetSymbol.name, this.types, {
        aliasTarget: targetSymbol,
        tsFlags: TSSymbolFlags.LocalImportSymbol,
      });
    } else {
      localSymbol = new TSOutputSymbol(targetSymbol.name, this.values, {
        aliasTarget: targetSymbol,
        tsFlags: TSSymbolFlags.LocalImportSymbol,
      });
    }

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }

  getAllSymbols() {
    const allSymbols = new Set<TSOutputSymbol>();
    for (const symbol of this.values.symbols) {
      allSymbols.add(symbol as TSOutputSymbol);
    }
    for (const symbol of this.types.symbols) {
      allSymbols.add(symbol as TSOutputSymbol);
    }
    return allSymbols;
  }
}
