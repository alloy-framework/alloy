import { reactive, shallowReactive } from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import { CustomOutputScope } from "./custom-output-scope.js";
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

export type ImportRecords = Map<PythonModuleScope, ImportRecordProps>;

export const ImportRecords = Map as {
  new (): ImportRecords;
  new (
    entries?:
      | readonly (readonly [PythonModuleScope, ImportRecordProps])[]
      | null,
  ): ImportRecords;
  prototype: Map<PythonModuleScope, ImportRecordProps>;
};

export class PythonModuleScope extends CustomOutputScope {
  get kind() {
    return "module" as const;
  }

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

    if (targetModule.kind !== "module") {
      throw new Error("Cannot import symbol that isn't in module scope");
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, {
        symbols: new Set<ImportedSymbol>(),
      });
    }

    const localSymbol = createPythonSymbol(
      targetSymbol.name,
      {
        binder: this.binder,
        scope: this,
        aliasTarget: targetSymbol,
      },
      undefined,
      false,
      false,
    );

    targetSymbol.copyTo(localSymbol);

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.symbols?.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }
}
