import { OutputSpace } from "@alloy-js/core";
import { CSharpSymbol, CSharpSymbolOptions } from "./csharp.js";

export class FieldSymbol extends CSharpSymbol {
  public readonly symbolKind = "field";

  constructor(
    name: string,
    spaces: OutputSpace | undefined,
    options: CSharpSymbolOptions = {},
  ) {
    super(name, spaces, options);
  }
}
