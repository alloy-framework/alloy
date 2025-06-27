import { OutputSpace } from "@alloy-js/core";
import { CSharpSymbol, CSharpSymbolOptions } from "./csharp.js";

export type MethodKinds = "method" | "constructor";

export class MethodSymbol extends CSharpSymbol {
  public readonly symbolKind = "method";

  #methodKind: MethodKinds;
  get methodKind() {
    return this.#methodKind;
  }

  constructor(
    name: string,
    spaces: OutputSpace | undefined,
    kind: MethodKinds,
    options: CSharpSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#methodKind = kind;
  }
}
