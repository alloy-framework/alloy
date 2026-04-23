import type { Binder, NameConflictResolver } from "../binder.js";
import { debug, TracePhase } from "../debug/index.js";
import { ReactiveUnionSet } from "../reactive-union-set.js";
import { Refkey } from "../refkey.js";
import { queueJob } from "../scheduler.js";
import { formatSymbolName, formatSymbolTableName } from "../tracer.js";
import { OutputSpace } from "./output-space.js";
import type { OutputSymbol } from "./output-symbol.js";

/**
 * Returns the canonical requested name for a symbol: the result of applying
 * the symbol's name policy to its original name, or the original name itself
 * when no policy applies. This is the name the symbol would carry if there
 * were no conflicts, and is stable across the symbol's lifetime (it depends
 * only on the immutable `originalName` and the name policy).
 *
 * Conflict resolution groups symbols by this value, so that:
 *
 * - Two symbols with different `originalName`s that normalize to the same
 *   policy-applied name (e.g. `foo_bar` and `fooBar` under camelCase) are
 *   correctly detected as a conflict.
 * - Cohort identity is preserved across renames — a deconfliction rename
 *   writes `deconflictedName` (changing `.name`) but leaves `canonicalName`
 *   untouched, so subsequent passes (e.g. on symbol deletion) can still find
 *   the survivors.
 */
export function canonicalName(symbol: OutputSymbol): string {
  if (symbol.ignoreNamePolicy || !symbol.namePolicy) {
    return symbol.originalName;
  }
  return symbol.namePolicy(symbol.originalName);
}

export abstract class SymbolTable extends ReactiveUnionSet<OutputSymbol> {
  #namesToDeconflict: Set<string> = new Set();
  #nameConflictResolver?: NameConflictResolver;
  #deconflictNames = () => {
    for (const name of this.#namesToDeconflict) {
      const conflictedSymbols = [...this].filter(
        (sym) => canonicalName(sym) === name && !sym.ignoreNameConflict,
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
        debug.trace(
          TracePhase.symbol.addToScope,
          () =>
            `${formatSymbolName(symbol)} added to ${formatSymbolTableName(this)}`,
        );

        this.#namesToDeconflict.add(canonicalName(symbol));

        queueJob(this.#deconflictNames);

        return symbol;
      },
      onDelete: (symbol) => {
        debug.trace(
          TracePhase.symbol.removeFromScope,
          () =>
            `${formatSymbolName(symbol)} removed from ${formatSymbolTableName(this)}`,
        );
        // Re-run conflict resolution for the deleted symbol's canonical name
        // so survivors in the same cohort (those that share the canonical
        // name) can clear any prior `deconflictedName` rename now that the
        // collision is reduced.
        this.#namesToDeconflict.add(canonicalName(symbol));
        queueJob(this.#deconflictNames);
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
    debug.trace(
      TracePhase.scope.moveSymbols,
      () =>
        `${formatSymbolTableName(this)} -> ${formatSymbolTableName(target)}`,
    );

    target.addSubset(this, {
      onAdd: (symbol) => {
        symbol.spaces = [target as OutputSpace];
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
    debug.trace(
      TracePhase.scope.copySymbols,
      () =>
        `${formatSymbolTableName(this)} copied to ${formatSymbolTableName(target)}`,
    );

    target.addSubset(this, {
      onAdd: (symbol) => {
        const copy = symbol.copy();
        copy.spaces = [target as OutputSpace];
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
  if (conflictedSymbols.length === 0) return;
  // The first symbol keeps its original name; clear any prior deconflict
  // rename so it reverts after a collision is resolved.
  conflictedSymbols[0].deconflictedName = undefined;
  for (let i = 1; i < conflictedSymbols.length; i++) {
    conflictedSymbols[i].deconflictedName =
      conflictedSymbols[i].originalName + "_" + (i + 1);
  }
}
