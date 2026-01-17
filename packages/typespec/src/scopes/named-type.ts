import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { NamespaceScope } from "./namespace.js";

export interface NamedTypeScopeOptions extends OutputScopeOptions {}

export class NamedTypeScope extends OutputScope {
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
}
