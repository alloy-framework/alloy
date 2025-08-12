import { type OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { CSharpScope } from "./csharp.js";
import { CSharpSourceFileScope } from "./source-file-scope.js";

/**
 * This scope contains NamedTypeSymbols for types that are declared in
 * containers like namespaces. This scope is a member scope which whose
 * member symbol is a NamedTypeSymbol.
 */
export class CSharpNamedTypeScope extends CSharpScope {
  // only need to store type parameters in this scope, types will be stored on
  // the ownerSymbol.
  public static readonly declarationSpaces = ["type-parameters"];

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

  get typeParameters() {
    return this.spaceFor("type-parameters");
  }
}
