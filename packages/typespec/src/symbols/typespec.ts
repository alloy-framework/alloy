import {
  Namekey,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
} from "@alloy-js/core";

export interface TypeSpecSymbolOptions extends OutputSymbolOptions {}

export type TypeSpecSymbolKind = "symbol" | "namespace" | "named-type";

export class TypeSpecSymbol extends OutputSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "symbol";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: TypeSpecSymbolOptions = {},
  ) {
    super(name, spaces, options);
  }

  copy(): OutputSymbol {
    const options = this.getCopyOptions();
    const copy = new TypeSpecSymbol(this.name, this.spaces, {
      ...options,
    });
    this.initializeCopy(copy);

    return copy;
  }
}
