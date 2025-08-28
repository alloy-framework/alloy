import { OutputScope } from "@alloy-js/core";

/**
 * A lexical scope for TypeScript, which contains declaration spaces for types
 * and values. This scope is used to hold symbols for things like variable or
 * interface declarations.
 */
export class TSLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["values", "types"];

  get values() {
    return this.spaceFor("values")!;
  }

  get types() {
    return this.spaceFor("types")!;
  }
}
