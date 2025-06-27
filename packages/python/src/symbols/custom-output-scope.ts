import { OutputScope, OutputScopeOptions, SymbolTable } from "@alloy-js/core";

// This is named as CustomOutputScope and not PythonOutputScope to avoid confusion with the one defined in scopes.ts
// We are creating a custom output scope so we can add out custom name conflict resolution logic.
export class CustomOutputScope extends OutputScope {
  #symbols: SymbolTable;
  /**
   * The symbols defined within this scope.
   */
  get symbols() {
    return this.#symbols;
  }

  constructor(name: string, options: OutputScopeOptions = {}) {
    super(name, options);
    this.#symbols = new SymbolTable(this, {
      nameConflictResolver: (_, symbols) => {
        for (let i = 1; i < symbols.length; i++) {
          // Rename all but the first symbol to have a suffix of _2, _3, plus the scope name if available.
          symbols[i].name =
            symbols[i].originalName +
            "_" +
            (i + 1) +
            "_" +
            (symbols[i].aliasTarget?.scope?.name ?? "");
        }
      },
    });
  }
}
