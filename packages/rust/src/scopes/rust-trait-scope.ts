import { type OutputScopeOptions } from "@alloy-js/core";
import type { NamedTypeSymbol } from "../symbols/named-type-symbol.js";
import { RustScopeBase } from "./rust-scope.js";

export class RustTraitScope extends RustScopeBase {
  public static readonly declarationSpaces: readonly string[] = [];

  constructor(
    ownerSymbol: NamedTypeSymbol,
    parent: RustScopeBase | undefined,
    options: OutputScopeOptions = {},
  ) {
    super(`${ownerSymbol.name} trait scope`, parent, {
      ownerSymbol,
      ...options,
    });
  }

  get ownerSymbol(): NamedTypeSymbol {
    return super.ownerSymbol as NamedTypeSymbol;
  }

  get members() {
    return this.ownerSymbol.members;
  }

  get typeParameters() {
    return this.ownerSymbol.typeParameters;
  }
}
