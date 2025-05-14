import { NameConflictResolver } from "../binder.js";
import { ReactiveUnionSet } from "../reactive-union-set.js";
import { queueJob } from "../scheduler.js";
import {
  formatScopeName,
  formatSymbolName,
  trace,
  TracePhase,
} from "../tracer.js";
import { OutputScope } from "./output-scope.js";
import { OutputSymbol } from "./output-symbol.js";

export class SymbolTable extends ReactiveUnionSet<OutputSymbol> {
  private _namesToDeconflict: Set<string> = new Set();
  private _nameConflictResolver?: NameConflictResolver;
  private _deconflictNames = () => {
    for (const name of this._namesToDeconflict) {
      const conflictedSymbols = [...this].filter(
        (sym) => sym.originalName === name,
      );
      if (this._nameConflictResolver) {
        this._nameConflictResolver(name, conflictedSymbols);
      } else {
        defaultConflictHandler(name, conflictedSymbols);
      }
      this._namesToDeconflict.delete(name);
    }
  };
  public scope;
  constructor(
    scope: OutputScope,
    options: {
      nameConflictResolver?: NameConflictResolver;
    } = {},
  ) {
    super({
      onAdd: (symbol) => {
        trace(
          TracePhase.symbol.addToScope,
          () => `${formatSymbolName(symbol)} -> ${formatScopeName(scope)}`,
        );

        this._namesToDeconflict.add(symbol.name);

        queueJob(this._deconflictNames);

        return symbol;
      },
      onDelete(symbol) {
        trace(
          TracePhase.symbol.removeFromScope,
          () => `${formatSymbolName(symbol)} -> ${formatScopeName(scope)}`,
        );
      },
    });

    this.scope = scope;

    this._nameConflictResolver = options.nameConflictResolver;
  }
}

/**
 * Default conflict handler. This will rename all but the first symbol
 * to have a suffix of _2, _3, etc.
 */
function defaultConflictHandler(_: string, conflictedSymbols: OutputSymbol[]) {
  for (let i = 1; i < conflictedSymbols.length; i++) {
    conflictedSymbols[i].name =
      conflictedSymbols[i].originalName + "_" + (i + 1);
  }
}
