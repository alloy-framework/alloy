import { OutputSpace, OutputSymbolOptions } from "@alloy-js/core";
import { CSharpSymbol } from "./csharp.js";

// represents a symbol from a .cs file. Class, enum, interface etc.

export type NamedTypeTypeKind =
  | "class"
  | "interface"
  | "enum"
  | "namespace"
  | "struct";
export type NamedTypeSymbolKind = "named-type" | "namespace";

export class NamedTypeSymbol extends CSharpSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members", "type-parameters"];

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeTypeKind,
    options?: OutputSymbolOptions,
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

  get typeParameters() {
    return this.memberSpaceFor("type-parameters")!;
  }
}
