import { Binder } from "../binder.js";
import { inspect } from "../inspect.js";
import { untrack } from "../reactivity.js";
import { OutputScope } from "./output-scope.js";
import { OutputSymbol } from "./output-symbol.js";
import { SymbolTable } from "./symbol-table.js";

/**
 * A symbol table that belongs to either a scope (declaration space) or a symbol
 * (member space).
 */
export type OutputSpace = OutputDeclarationSpace | OutputMemberSpace;

/**
 * A symbol table attached to an {@link OutputScope}. Holds lexical declarations
 * visible within that scope (e.g., "types" or "values" in a TypeScript module).
 */
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

/**
 * A symbol table attached to an {@link OutputSymbol}. Holds member declarations
 * belonging to that symbol (e.g., "static" or "instance" members of a class).
 */
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
