import type { Children, Namekey, OutputSpace } from "@alloy-js/core";

import type { GoSymbolOptions } from "./go.js";
import { GoSymbol } from "./go.js";

interface TypeParameterSymbolOptions extends GoSymbolOptions {
  constraint?: Children;
}
/**
 * A symbol for type parameters in Go.
 */
export class TypeParameterSymbol extends GoSymbol {
  public readonly symbolKind = "type-parameter";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace | undefined,
    options: TypeParameterSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#constraint = options.constraint ?? "any";
  }

  #constraint: Children;
  get constraint(): Children {
    return this.#constraint;
  }
}
