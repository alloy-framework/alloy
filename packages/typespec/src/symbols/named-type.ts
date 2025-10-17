import { Namekey, OutputSpace } from "@alloy-js/core";
import { TypeSpecSymbol, TypeSpecSymbolOptions } from "./typespec.js";

// represents a symbol from a .tsp file. model, enum, interface etc.

export type NamedTypeTypeKind =
  | "model"
  | "interface"
  | "operation"
  | "enum"
  | "union"
  | "alias"
  | "namespace"
  | "scalar";

export type NamedTypeSymbolKind = "named-type" | "namespace";

/**
 * A symbol for a named type in TypeSpec such as a model, interface, enum, and so
 * forth. Named types are generally defined in a namespace, and can have members
 * of their own.
 */
export class NamedTypeSymbol extends TypeSpecSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members"];

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeTypeKind,
    options?: TypeSpecSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#typeKind = kind;
  }

  #typeKind: NamedTypeTypeKind;
  get typeKind() {
    return this.#typeKind;
  }

  copy() {
    const options = this.getCopyOptions();
    const copy = new NamedTypeSymbol(
      this.name,
      undefined,
      this.#typeKind,
      options,
    );
    this.initializeCopy(copy);
    return copy;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}