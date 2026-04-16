import type { OutputSpace } from "@alloy-js/core";
import { RustScopeBase } from "./rust-scope.js";

export class RustLexicalScope extends RustScopeBase {
  public static readonly declarationSpaces = ["local-variables"];

  get localVariables(): OutputSpace {
    return this.spaceFor("local-variables")!;
  }
}
