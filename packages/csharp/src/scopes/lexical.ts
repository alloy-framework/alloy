import { type OutputSpace } from "@alloy-js/core";
import { CSharpScope } from "./csharp.js";

export class CSharpLexicalScope extends CSharpScope {
  public static readonly declarationSpaces = ["local-variables"];

  get localVariables(): OutputSpace {
    return this.spaceFor("local-variables")!;
  }
}
