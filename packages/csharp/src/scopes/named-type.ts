import { type OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { CSharpScope } from "./csharp.js";
import { CSharpSourceFileScope } from "./source-file.js";

/**
 * This scope contains NamedTypeSymbols for types that are declared in
 * containers like namespaces. This scope is a member scope which whose
 * member symbol is a NamedTypeSymbol.
 */
export class CSharpNamedTypeScope extends CSharpScope {
  public static readonly declarationSpaces = [];

  constructor(
    ownerSymbol: NamedTypeSymbol,
    parentScope: CSharpNamedTypeScope | CSharpSourceFileScope | undefined,
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

  get enclosingNamespace() {
    return this.ownerSymbol.enclosingNamespace;
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
