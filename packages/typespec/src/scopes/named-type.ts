import { OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { TypeSpecScope } from "./typespec.js";
import { SourceFileScope } from "./source-file.js";

/**
 * This scope contains NamedTypeSymbols for types that are declared in
 * containers like namespaces. This scope is a member scope whose
 * member symbol is a NamedTypeSymbol.
 */
export class TypeSpecNamedTypeScope extends TypeSpecScope {
  public static readonly declarationSpaces = [];

  // constructor(
  //   ownerSymbol: NamedTypeSymbol,
  //   parentScope: TypeSpecNamedTypeScope | SourceFileScope | undefined,
  //   options: OutputScopeOptions = {},
  // ) {
    // super(`${ownerSymbol.name} scope`, parentScope, {
    //   ownerSymbol,
    //   ...options,
    // });
  // }

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