import { OutputSpace } from "@alloy-js/core";
import { CSharpSymbol, CSharpSymbolOptions } from "./csharp.js";

export class PropertySymbol extends CSharpSymbol {
  public readonly symbolKind = "property";

  constructor(
    name: string,
    spaces: OutputSpace | undefined,
    options: CSharpSymbolOptions = {},
  ) {
    super(name, spaces, options);
  }
}
