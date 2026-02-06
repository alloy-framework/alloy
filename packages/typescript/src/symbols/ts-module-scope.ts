import {
  createSymbol,
  reactive,
  Refkey,
  shallowReactive,
} from "@alloy-js/core";
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

/**
 * A lexical scope for TypeScript which represents the top-level scope of a
 * module. Manages the module's imported and exported symbols.
 */
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

    const binder = this.binder;
    let localSymbol;

    if (options?.type) {
      localSymbol = createSymbol(
        TSOutputSymbol,
        targetSymbol.name,
        this.types,
        {
          binder,
          aliasTarget: targetSymbol,
          tsFlags: TSSymbolFlags.LocalImportSymbol,
        },
      );
    } else {
      localSymbol = createSymbol(
        TSOutputSymbol,
        targetSymbol.name,
        this.values,
        {
          binder,
          aliasTarget: targetSymbol,
          tsFlags: TSSymbolFlags.LocalImportSymbol,
        },
      );
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
    for (const symbol of this.values) {
      allSymbols.add(symbol as TSOutputSymbol);
    }
    for (const symbol of this.types) {
      allSymbols.add(symbol as TSOutputSymbol);
    }
    return allSymbols;
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      exportedSymbolCount: this.#exportedSymbols.size,
      importedSymbolCount: this.#importedSymbols.size,
      importedModuleCount: this.#importedModules.size,
    };
  }
}
