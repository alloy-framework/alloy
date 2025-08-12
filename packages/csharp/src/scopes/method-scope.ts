import { CSharpLexicalScope } from "./lexical-scope.js";

export class CSharpMethodScope extends CSharpLexicalScope {
  public static readonly declarationSpaces = [
    "local-variables",
    "parameters",
    "type-parameters",
  ];

  get localVariables() {
    return this.spaceFor("local-variables")!;
  }

  get parameters() {
    return this.spaceFor("parameters")!;
  }

  get typeParameters() {
    return this.spaceFor("type-parameters")!;
  }
}
