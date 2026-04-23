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

interface ImportEntry {
  local: TSOutputSymbol;
  target: TSOutputSymbol;
  module: TSModuleScope;
  // Number of live `ref()` consumers that added this symbol as a value import.
  valueRefCount: number;
  // Number of live `ref()` consumers that added this symbol as a type-only import.
  typeRefCount: number;
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

  // Internal refcount + kind bookkeeping keyed by the target (source-of-truth)
  // symbol. Used by {@link removeImport} to know when to actually delete the
  // local import symbol and associated records.
  #importEntries: Map<TSOutputSymbol, ImportEntry> = new Map();

  addImport(
    targetSymbol: TSOutputSymbol,
    targetModule: TSModuleScope,
    options?: AddImportOptions,
  ) {
    const existing = this.importedSymbols.get(targetSymbol);
    if (existing) {
      const entry = this.#importEntries.get(targetSymbol)!;
      if (options?.type) {
        entry.typeRefCount++;
      } else {
        entry.valueRefCount++;
        if (existing.isTypeSymbol && !existing.isValueSymbol) {
          existing.spaces.push(this.values);
        }
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
    this.#importEntries.set(targetSymbol, {
      local: localSymbol,
      target: targetSymbol,
      module: targetModule,
      valueRefCount: options?.type ? 0 : 1,
      typeRefCount: options?.type ? 1 : 0,
    });

    return localSymbol;
  }

  /**
   * Decrement the refcount for an import previously registered via
   * {@link TSModuleScope.addImport | addImport}. When the last live consumer goes away, the local import
   * symbol is deleted, which removes it from the module's name spaces and
   * triggers name-conflict-resolver reconciliation.
   */
  removeImport(targetSymbol: TSOutputSymbol, options?: AddImportOptions) {
    const entry = this.#importEntries.get(targetSymbol);
    if (!entry) {
      return;
    }

    if (options?.type) {
      if (entry.typeRefCount > 0) entry.typeRefCount--;
    } else {
      if (entry.valueRefCount > 0) entry.valueRefCount--;
      // If there are no more value consumers but type consumers remain, demote
      // the local symbol back to being type-only by removing it from the values
      // space.
      if (entry.valueRefCount === 0 && entry.typeRefCount > 0) {
        if (entry.local.isValueSymbol && entry.local.isTypeSymbol) {
          this.values.delete(entry.local);
        }
      }
    }

    if (entry.valueRefCount > 0 || entry.typeRefCount > 0) {
      return;
    }

    // No more live references: tear it all down.
    entry.local.delete();
    this.#importedSymbols.delete(targetSymbol);
    this.#importEntries.delete(targetSymbol);

    const moduleSet = this.#importedModules.get(entry.module);
    if (moduleSet) {
      for (const imp of moduleSet) {
        if (imp.target === targetSymbol) {
          moduleSet.delete(imp);
          break;
        }
      }
      if (moduleSet.size === 0) {
        this.#importedModules.delete(entry.module);
      }
    }
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
