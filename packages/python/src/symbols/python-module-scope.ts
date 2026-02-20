import { createSymbol, reactive, shallowReactive } from "@alloy-js/core";
import { PythonLexicalScope } from "./python-lexical-scope.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";

// Internal typing module for TYPE_CHECKING imports
let _typingModuleScope: PythonModuleScope | undefined;
let _typeCheckingSymbol: PythonOutputSymbol | undefined;

/**
 * Get the internal typing module scope and TYPE_CHECKING symbol.
 * Used by addTypeImport() to add TYPE_CHECKING imports without
 * going through the binder's refkey resolution.
 */
function getTypingModuleInternal(): {
  scope: PythonModuleScope;
  TYPE_CHECKING: PythonOutputSymbol;
} {
  if (!_typingModuleScope) {
    _typingModuleScope = new PythonModuleScope("typing", undefined);
    _typeCheckingSymbol = new PythonOutputSymbol(
      "TYPE_CHECKING",
      _typingModuleScope.symbols,
      {},
    );
  }
  return { scope: _typingModuleScope, TYPE_CHECKING: _typeCheckingSymbol! };
}

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

export interface AddImportOptions {
  /**
   * If true, this import is only used in type annotation contexts.
   * Such imports will be guarded with `if TYPE_CHECKING:`.
   */
  type?: boolean;
}

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

  addImport(
    targetSymbol: PythonOutputSymbol,
    targetModule: PythonModuleScope,
    options?: AddImportOptions,
  ) {
    const existing = this.importedSymbols.get(targetSymbol);
    if (existing) {
      // If existing is type-only but now used as value, upgrade it
      if (!options?.type && existing.isTypeOnly) {
        existing.markAsValue();
      }
      return existing;
    }

    if (!this.importedModules.has(targetModule)) {
      this.importedModules.set(targetModule, {
        symbols: new Set<ImportedSymbol>(),
      });
    }

    const localSymbol = createSymbol(
      PythonOutputSymbol,
      targetSymbol.name,
      this.symbols,
      {
        binder: this.binder,
        aliasTarget: targetSymbol,
        typeOnly: options?.type,
      },
    );

    this.importedSymbols.set(targetSymbol, localSymbol);
    this.importedModules.get(targetModule)!.symbols?.add({
      local: localSymbol,
      target: targetSymbol,
    });

    return localSymbol;
  }

  /**
   * Add TYPE_CHECKING import from the typing module.
   * Returns the local symbol for use in the if block opener.
   */
  addTypeImport(): PythonOutputSymbol {
    const typing = getTypingModuleInternal();
    return this.addImport(typing.TYPE_CHECKING, typing.scope);
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      importedSymbolCount: this.#importedSymbols.size,
      importedModuleCount: this.#importedModules.size,
    };
  }
}
