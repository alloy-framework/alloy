import { Namekey, OutputSpace, OutputSymbol } from "@alloy-js/core";
import {
  TypeSpecSymbol,
  TypeSpecSymbolKind,
  TypeSpecSymbolOptions,
} from "./typespec.js";

export type NamedTypeKind =
  | "namespace"
  | "model"
  | "enum"
  | "union"
  | "interface"
  | "alias"
  | "operation"
  | "scalar"
  | "decorator";

export class NamedTypeSymbol extends TypeSpecSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "named-type";
  public static readonly memberSpaces = ["members"];

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeKind,
    options?: TypeSpecSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#kind = kind;
  }

  #kind: NamedTypeKind;
  get kind(): NamedTypeKind {
    return this.#kind;
  }

  copy(): OutputSymbol {
    const options = this.getCopyOptions();
    const copy = new NamedTypeSymbol(this.name, this.spaces, this.#kind, {
      ...options,
    });
    this.initializeCopy(copy);
    return copy;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}
