import { OutputScope } from "./output-scope.js";

/**
 * BasicScope is a kind of OutputScope that has a single declaration space named
 * `symbols`. It is suitable for use in simple language implementations where
 * there isn't much in the way of unique scope semantics.
 */
export class BasicScope extends OutputScope {
  public static readonly defaultDeclarationSpace = "symbols";
  public static readonly declarationSpaces = ["symbols"] as const;

  get symbols() {
    return this.spaceFor("symbols")!;
  }

  get symbolNames() {
    return this.spaceFor("symbols")!.symbolNames;
  }

  get symbolsByRefkey() {
    return this.spaceFor("symbols")!.symbolsByRefkey;
  }
}
