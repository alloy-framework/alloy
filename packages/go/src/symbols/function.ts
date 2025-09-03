import { OutputSpace } from "@alloy-js/core";
import { GoSymbol, GoSymbolOptions } from "./go.js";

/**
 * A symbol for a function in Go, including receivers.
 */
export class FunctionSymbol extends GoSymbol {
  public readonly symbolKind = "function";

  constructor(
    name: string,
    spaces: OutputSpace | undefined,
    options: GoSymbolOptions = {},
  ) {
    super(name, spaces, options);
  }
}
