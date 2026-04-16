import type { OutputSpace } from "@alloy-js/core";
import { RustLexicalScope } from "./rust-lexical-scope.js";

export class RustFunctionScope extends RustLexicalScope {
  public static readonly declarationSpaces = [
    "local-variables",
    "parameters",
    "type-parameters",
  ];

  get localVariables(): OutputSpace {
    return this.spaceFor("local-variables")!;
  }

  get parameters(): OutputSpace {
    return this.spaceFor("parameters")!;
  }

  get typeParameters(): OutputSpace {
    return this.spaceFor("type-parameters")!;
  }
}
