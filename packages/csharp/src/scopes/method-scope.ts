import { useScope } from "@alloy-js/core";
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

export function useMethodScope() {
  const scope = useScope();
  if (!(scope instanceof CSharpMethodScope)) {
    throw new Error("Expected method scope");
  }
  return scope;
}
