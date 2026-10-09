import type { Namekey, OutputSpace } from "@alloy-js/core";

import type { CSharpSymbolOptions } from "./csharp.js";
import { CSharpSymbol } from "./csharp.js";

export type MethodKinds = "ordinary" | "constructor";

/**
 * A symbol for a method or constructor of a class, interface, or struct.
 */
export class MethodSymbol extends CSharpSymbol {
  public readonly symbolKind = "method";

  #methodKind: MethodKinds;
  get methodKind() {
    return this.#methodKind;
  }

  constructor(
    name: string | Namekey,
    spaces: OutputSpace | undefined,
    kind: MethodKinds,
    options: CSharpSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#methodKind = kind;
  }
}
