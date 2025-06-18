import { Binder } from "../binder.js";
import { Refkey } from "../refkey.js";
import { formatSpaceName, trace, TracePhase } from "../tracer.js";
import { OutputScope } from "./output-scope.js";
import { OutputSymbol } from "./output-symbol.js";
import { SymbolTable } from "./symbol-table.js";

export abstract class OutputSpace {
  #binder: Binder | undefined;

  get binder() {
    return this.#binder;
  }

  #key: string;

  /**
   * The key of the space.
   */
  get key() {
    return this.#key;
  }

  #symbols: SymbolTable;
  get symbols() {
    return this.#symbols;
  }

  #symbolsByRefkey: ReadonlyMap<Refkey, OutputSymbol>;
  /**
   * The symbols defined within this scope, indexed by refkey.
   */
  get symbolsByRefkey() {
    return this.#symbolsByRefkey;
  }

  #symbolNames: ReadonlySet<string>;
  get symbolNames() {
    return this.#symbolNames;
  }

  constructor(key: string, binder?: Binder) {
    this.#binder = binder;
    this.#key = key;
    this.#symbols = new SymbolTable(this, {
      nameConflictResolver: binder?.nameConflictResolver,
    });
    this.#symbolsByRefkey = this.#symbols.createIndex((s) => s.refkeys);
    this.#symbolNames = this.#symbols.createDerivedSet((s) => {
      return s.name;
    });
  }

  moveTo(target: OutputSpace): void {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `Moving symbols from ${formatSpaceName(this)} to ${formatSpaceName(target)}`,
    );

    target.symbols.addSubset(this.symbols, {
      onAdd: (symbol) => {
        symbol.spaces = [target];
        return symbol;
      },
    });
  }

  copyTo(
    target: OutputSpace,
    options: {
      createRefkeys?(sourceSymbol: OutputSymbol): Refkey[];
    } = {},
  ): void {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `Copying symbols from ${formatSpaceName(this)} to ${formatSpaceName(target)}`,
    );

    target.symbols.addSubset(this.symbols, {
      onAdd: (symbol) => {
        const copy = symbol.copy();
        copy.spaces = [target];
        copy.refkeys = options.createRefkeys?.(symbol) ?? [];
        return copy;
      },
    });
  }
}

export class OutputDeclarationSpace extends OutputSpace {
  constructor(scope: OutputScope, key: string, binder?: Binder) {
    super(key, binder);
    this.#scope = scope;
  }

  #scope: OutputScope;
  /**
   * The scope this declaration space belongs to.
   */
  get scope() {
    return this.#scope;
  }
}

export class OutputMemberSpace extends OutputSpace {
  constructor(symbol: OutputSymbol, key: string, binder?: Binder) {
    super(key, binder);
    this.#symbol = symbol;
  }

  #symbol: OutputSymbol;
  /**
   * The symbol this member space belongs to.
   */
  get symbol() {
    return this.#symbol;
  }
}
