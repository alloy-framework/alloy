import type { OutputSpace } from "@alloy-js/core";
import { CSharpLexicalScope } from "./lexical.js";

export class CSharpMethodScope extends CSharpLexicalScope {
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
