import { CSharpScope } from "./csharp.js";

export class CSharpLexicalScope extends CSharpScope {
  public static readonly declarationSpaces = ["local-variables"];

  get localVariables() {
    return this.spaceFor("local-variables")!;
  }
}
