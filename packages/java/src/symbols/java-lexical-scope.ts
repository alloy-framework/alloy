import { OutputScope } from "@alloy-js/core";

export class JavaLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"];

  get symbols() {
    return this.spaceFor("symbols")!;
  }
}
