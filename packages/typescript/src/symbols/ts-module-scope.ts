import { OutputScope, reactive, Refkey, shallowReactive } from "@alloy-js/core";
import { TSOutputSymbol, TSSymbolFlags } from "./ts-output-symbol.js";

export interface ImportedSymbol {
  local: TSOutputSymbol;
  target: TSOutputSymbol;
}
export type ImportRecords = Map<TSModuleScope, Set<ImportedSymbol>>;

export interface AddImportOptions {
  type?: boolean;
}

export class TSModuleScope extends OutputScope {
  get kind() {
    return "module" as const;
  }

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
      if (!options?.type && existing.tsFlags & TSSymbolFlags.TypeSymbol) {
        existing.tsFlags &= ~TSSymbolFlags.TypeSymbol;
      }
      return existing;
    }

    if (targetModule.kind !== "module") {
      throw new Error("Cannot import symbol that isn't in module scope");
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, new Set());
    }

    const localSymbol = new TSOutputSymbol(targetSymbol.name, {
      binder: this.binder,
      scope: this,
      aliasTarget: targetSymbol,
      tsFlags: TSSymbolFlags.LocalImportSymbol,
    });

    targetSymbol.copyTo(localSymbol);

    if (options?.type) {
      localSymbol.tsFlags |= TSSymbolFlags.TypeSymbol;
    }

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }
}
