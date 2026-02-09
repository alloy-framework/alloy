import { Namekey, OutputSpace, createSymbol } from "@alloy-js/core";
import { CSharpSymbol, CSharpSymbolOptions } from "./csharp.js";

// represents a symbol from a .cs file. Class, enum, interface etc.

export type NamedTypeTypeKind =
  | "class"
  | "interface"
  | "enum"
  | "namespace"
  | "struct"
  | "record";
export type NamedTypeSymbolKind = "named-type" | "namespace";

/**
 * A symbol for a named type in C# such as a class, interface, enum, and so
 * forth. Named types are generally defined in a namespace, and can have members
 * of their own.
 */
export class NamedTypeSymbol extends CSharpSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members"];

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeTypeKind,
    options?: CSharpSymbolOptions,
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
    const binder = this.binder;
    const copy = createSymbol(
      NamedTypeSymbol,
      this.name,
      undefined,
      this.#typeKind,
      {
        ...options,
        binder,
      },
    );
    this.initializeCopy(copy);
    return copy;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      typeKind: this.typeKind,
    };
  }
}
