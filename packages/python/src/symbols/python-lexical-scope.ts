import { OutputScope } from "@alloy-js/core";

export class PythonLexicalScope extends OutputScope {
  public static readonly declarationSpaces: readonly string[] = ["symbols"];

  get symbols() {
    return this.spaceFor("symbols")!;
  }

  // Lexical scopes do not have an owner symbol. This ensures that we get the
  // correct type when using `usePythonScope` (i.e. we don't get the
  // OutputScope's `OutputSymbol | undefined` type).
  get ownerSymbol(): undefined {
    return undefined;
  }
}
