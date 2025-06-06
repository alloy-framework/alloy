import { Binder, OutputScope, reactive, shallowReactive } from "@alloy-js/core";
import { PythonOutputSymbol, PythonSymbolFlags } from "./python-output-symbol.js";

export class ImportedSymbol {
  local?: PythonOutputSymbol;  // The alias of the target symbol, if it exists
  target: PythonOutputSymbol;

  constructor(target: PythonOutputSymbol, local?: PythonOutputSymbol) {
    this.target = target;
    this.local = local;
  }

  static from(target: PythonOutputSymbol, local?: PythonOutputSymbol) {
    return new ImportedSymbol(target, local);
  }
}

export type ImportRecords = Map<PythonModuleScope, Set<ImportedSymbol>>;

export const ImportRecords = Map as {
  new (): ImportRecords;
  new (entries?: readonly (readonly [PythonModuleScope, Set<ImportedSymbol>])[] | null): ImportRecords;
  prototype: Map<PythonModuleScope, Set<ImportedSymbol>>;
};

export class PythonModuleScope extends OutputScope {
  get kind() {
    return "module" as const;
  }

  #importedSymbols: Map<PythonOutputSymbol, PythonOutputSymbol> = shallowReactive(
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
    targetSymbol: PythonOutputSymbol,
    targetModule: PythonModuleScope,
  ) {
    const existing = this.importedSymbols.get(targetSymbol);
    if (existing) {
      return existing;
    }

    if (targetModule.kind !== "module") {
      throw new Error("Cannot import symbol that isn't in module scope");
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, new Set());
    }

    const localSymbol = new PythonOutputSymbol(targetSymbol.name, {
      binder: this.binder,
      scope: this,
      aliasTarget: targetSymbol,
      pythonFlags: PythonSymbolFlags.LocalImport,
    });

    targetSymbol.copyTo(localSymbol);

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }
}

export function createPythonModuleScope(
  name: string,
  parent: OutputScope | undefined,
  binder: Binder | undefined = undefined,
): PythonModuleScope {
  return new PythonModuleScope(name, {
    parent: parent,
    binder: binder,
  });
}