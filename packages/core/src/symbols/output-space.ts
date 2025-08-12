import { inspect } from "util";
import { Binder } from "../binder.js";
import { untrack } from "../reactivity.js";
import { OutputScope } from "./output-scope.js";
import { OutputSymbol } from "./output-symbol.js";
import { SymbolTable } from "./symbol-table.js";

export type OutputSpace = OutputDeclarationSpace | OutputMemberSpace;
export class OutputDeclarationSpace extends SymbolTable {
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

  [inspect.custom]() {
    return untrack(
      () => `OutputDeclarationSpace for scope ${inspect(this.#scope)}`,
    );
  }
}

export class OutputMemberSpace extends SymbolTable {
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

  [inspect.custom]() {
    return untrack(
      () => `OutputMemberSpace for symbol ${inspect(this.#symbol)}`,
    );
  }
}
