import type { Binder, NameConflictResolver } from "../binder.js";
import { ReactiveUnionSet } from "../reactive-union-set.js";
import { Refkey } from "../refkey.js";
import { queueJob } from "../scheduler.js";
import {
  formatSymbolName,
  formatSymbolTableName,
  trace,
  TracePhase,
} from "../tracer.js";
import type { OutputSymbol } from "./output-symbol.js";

export abstract class SymbolTable extends ReactiveUnionSet<OutputSymbol> {
  #namesToDeconflict: Set<string> = new Set();
  #nameConflictResolver?: NameConflictResolver;
  #deconflictNames = () => {
    for (const name of this.#namesToDeconflict) {
      const conflictedSymbols = [...this].filter(
        (sym) => sym.originalName === name,
      );
      if (this.#nameConflictResolver) {
        this.#nameConflictResolver(name, conflictedSymbols);
      } else {
        defaultConflictHandler(name, conflictedSymbols);
      }
      this.#namesToDeconflict.delete(name);
    }
  };

  #binder: Binder | undefined;

  get binder() {
    return this.#binder;
  }

  #key: string;

  /**
   * The key of this symbol table, e.g. "static" or "instance".
   */
  get key() {
    return this.#key;
  }

  #symbolsByRefkey: ReadonlyMap<Refkey, OutputSymbol>;
  /**
   * The symbols defined within this scope, indexed by refkey.
   */
  get symbolsByRefkey() {
    return this.#symbolsByRefkey;
  }

  #symbolNames: ReadonlyMap<string, OutputSymbol>;
  get symbolNames() {
    return this.#symbolNames;
  }

  constructor(
    key: string,
    binder?: Binder,
    options: {
      nameConflictResolver?: NameConflictResolver;
    } = {},
  ) {
    super({
      onAdd: (symbol) => {
        trace(
          TracePhase.symbol.addToScope,
          () =>
            `${formatSymbolName(symbol)} added to ${formatSymbolTableName(this)}`,
        );

        this.#namesToDeconflict.add(symbol.name);

        queueJob(this.#deconflictNames);

        return symbol;
      },
      onDelete: (symbol) => {
        trace(
          TracePhase.symbol.removeFromScope,
          () =>
            `${formatSymbolName(symbol)} removed from ${formatSymbolTableName(this)}`,
        );
      },
    });

    this.#nameConflictResolver =
      options.nameConflictResolver ?? binder?.nameConflictResolver;
    this.#binder = binder;
    this.#key = key;
    this.#symbolsByRefkey = this.createIndex((s) => s.refkeys);
    this.#symbolNames = this.createIndex((s) => {
      return s.name;
    });
  }

  moveTo(target: SymbolTable): void {
    trace(
      TracePhase.scope.moveSymbols,
      () =>
        `${formatSymbolTableName(this)} -> ${formatSymbolTableName(target)}`,
    );

    target.addSubset(this, {
      onAdd: (symbol) => {
        symbol.spaces = [target];
        return symbol;
      },
    });
  }

  copyTo(
    target: SymbolTable,
    options: {
      createRefkeys?(sourceSymbol: OutputSymbol): Refkey[];
    } = {},
  ): void {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `${formatSymbolTableName(this)} copied to ${formatSymbolTableName(target)}`,
    );

    target.addSubset(this, {
      onAdd: (symbol) => {
        const copy = symbol.copy();
        copy.spaces = [target];
        copy.refkeys = options.createRefkeys?.(symbol) ?? [];
        return copy;
      },
    });
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
