import { type OutputSpace } from "@alloy-js/core";
import { GoScope } from "./go.js";

export class GoLexicalScope extends GoScope {
  public static readonly declarationSpaces = ["values", "types"];

  get values(): OutputSpace {
    return this.spaceFor("values")!;
  }

  get types(): OutputSpace {
    return this.spaceFor("types")!;
  }
}
