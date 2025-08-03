import { OutputScope } from "@alloy-js/core";

export class TSLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["values", "types"];

  get values() {
    return this.spaceFor("values")!;
  }

  get types() {
    return this.spaceFor("types")!;
  }
}
