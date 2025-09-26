import { type OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { GoScope } from "./go.js";
import { GoModuleScope } from "./module.js";
import { GoSourceFileScope } from "./source-file.js";

/**
 * This scope contains NamedTypeSymbols for types that are declared in
 * containers like packages. This scope is a member scope which whose
 * member symbol is a NamedTypeSymbol.
 */
export class GoNamedTypeScope extends GoScope {
  public static readonly declarationSpaces = [];

  constructor(
    ownerSymbol: NamedTypeSymbol,
    parentScope:
      | GoNamedTypeScope
      | GoSourceFileScope
      | GoModuleScope
      | undefined,
    options: OutputScopeOptions = {},
  ) {
    super(`${ownerSymbol.name} scope`, parentScope, {
      ownerSymbol,
      ...options,
    });
  }

  get ownerSymbol(): NamedTypeSymbol {
    return super.ownerSymbol as NamedTypeSymbol;
  }

  get enclosingPackage() {
    return this.ownerSymbol.enclosingPackage;
  }

  get members() {
    return this.ownerSymbol.members;
  }

  /**
   * For now, we stuff type parameters into the member scope. This is to ensure
   * name conflicts are handled correctly.
   */
  get typeParameters() {
    return this.ownerSymbol.members;
  }
}
