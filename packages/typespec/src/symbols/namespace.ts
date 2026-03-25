import { Namekey, OutputSpace } from "@alloy-js/core";
import { NamedTypeSymbol } from "./named-type.js";
import {
  TypeSpecSymbol,
  TypeSpecSymbolKind,
  TypeSpecSymbolOptions,
} from "./typespec.js";

export interface NamespaceSymbolOptions extends TypeSpecSymbolOptions {
  isGlobal?: boolean;
}
export class NamespaceSymbol extends NamedTypeSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "namespace";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options?: NamespaceSymbolOptions,
  ) {
    super(name, spaces, "namespace", options);

    this.#isGlobal = options?.isGlobal ?? false;
  }

  #isGlobal: boolean;
  get isGlobal() {
    return this.#isGlobal;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}

export function isNamespaceSymbol(
  symbol: TypeSpecSymbol,
): symbol is NamespaceSymbol {
  return symbol.symbolKind === "namespace";
}
