import { reactive, shallowReactive } from "@alloy-js/core";
import { PythonLexicalScope } from "./python-lexical-scope.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";

export class ImportedSymbol {
  local: PythonOutputSymbol;
  target: PythonOutputSymbol;

  constructor(target: PythonOutputSymbol, local: PythonOutputSymbol) {
    this.target = target;
    this.local = local;
  }

  static from(target: PythonOutputSymbol, local: PythonOutputSymbol) {
    return new ImportedSymbol(target, local);
  }
}

export interface ImportRecordProps {
  symbols: Set<ImportedSymbol>;
}

export class ImportRecords extends Map<PythonModuleScope, ImportRecordProps> {}

export class PythonModuleScope extends PythonLexicalScope {
  #importedSymbols: Map<PythonOutputSymbol, PythonOutputSymbol> =
    shallowReactive(new Map());
  get importedSymbols() {
    return this.#importedSymbols;
  }

  #importedModules: ImportRecords = reactive(new Map());
  get importedModules() {
    return this.#importedModules;
  }

  addImport(targetSymbol: PythonOutputSymbol, targetModule: PythonModuleScope) {
    const existing = this.importedSymbols.get(targetSymbol);
    if (existing) {
      return existing;
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, {
        symbols: new Set<ImportedSymbol>(),
      });
    }

    const localSymbol = new PythonOutputSymbol(
      targetSymbol.name,
      this.symbols,
      { binder: this.binder, aliasTarget: targetSymbol },
    );

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.symbols?.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }
}
