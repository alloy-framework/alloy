import { type OutputSpace } from "@alloy-js/core";
import { TypeSpecScope } from "./typespec.js";

// What is "local-variables"? Doesn't sound right for TypeSpec.
export class TypeSpecLexicalScope extends TypeSpecScope {
  public static readonly declarationSpaces = ["local-variables"];

  get localVariables(): OutputSpace {
    return this.spaceFor("local-variables")!;
  }
}