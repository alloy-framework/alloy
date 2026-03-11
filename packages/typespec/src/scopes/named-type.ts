import { OutputScope, OutputScopeOptions, OutputSpace } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { NamespaceScope } from "./namespace.js";

export interface NamedTypeScopeOptions extends OutputScopeOptions {}

export class NamedTypeScope extends OutputScope {
  public static readonly declarationSpaces = ["template-parameters"];

  constructor(
    symbol: NamedTypeSymbol,
    parent: NamespaceScope,
    options?: NamedTypeScopeOptions,
  ) {
    super(symbol.name, parent, {
      ...options,
      ownerSymbol: symbol,
    });
  }

  get ownerSymbol(): NamedTypeSymbol {
    return super.ownerSymbol as NamedTypeSymbol;
  }

  get templateParameters(): OutputSpace {
    return this.spaceFor("template-parameters")!;
  }
}
