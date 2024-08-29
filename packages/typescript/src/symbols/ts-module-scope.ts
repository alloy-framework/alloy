import { OutputScope, Refkey, Binder, refkey } from "@alloy-js/core";
import {
  TSOutputSymbol,
  createTSSymbol,
  TSSymbolFlags,
} from "./ts-output-symbol.js";

export interface ImportedSymbol {
  local: TSOutputSymbol;
  target: TSOutputSymbol;
}
export type ImportRecords = Map<TSModuleScope, Set<ImportedSymbol>>;

export interface TSModuleScope extends OutputScope {
  kind: "module";
  exportedSymbols: Map<Refkey, TSOutputSymbol>;
  /**
   * A mapping of foreign symbols to module-local symbols
   */
  importedSymbols: Map<TSOutputSymbol, TSOutputSymbol>;
  importedModules: ImportRecords;
  addImport(symbol: TSOutputSymbol, module: TSModuleScope): TSOutputSymbol;
}

export function createTSModuleScope(
  binder: Binder,
  parent: OutputScope,
  path: string,
): TSModuleScope {
  return binder.createScope<TSModuleScope>({
    kind: "module",
    name: path,
    parent,
    exportedSymbols: new Map(),
    importedSymbols: new Map(),
    importedModules: new Map(),
    addImport(targetSymbol, targetModule) {
      if (this.importedSymbols.has(targetSymbol)) {
        return this.importedSymbols.get(targetSymbol)!;
      }

      if (targetModule.kind !== "module") {
        throw new Error("Cannot import symbol that isn't in module scope");
      }

      if (!this.importedModules.has(targetModule)) {
        this.importedModules.set(targetModule, new Set());
      }

      const localSymbol = createTSSymbol({
        binder,
        name: targetSymbol.name,
        refkey: refkey({}),
        flags: TSSymbolFlags.LocalImportSymbol,
      });

      this.importedSymbols.set(targetSymbol, localSymbol);
      this.importedModules.get(targetModule)!.add({
        local: localSymbol,
        target: targetSymbol,
      });

      return localSymbol;
    },
  });
}
