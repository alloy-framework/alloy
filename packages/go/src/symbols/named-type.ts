import {
  createSymbol,
  Namekey,
  OutputSpace,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";
import { GoSymbol, GoSymbolOptions } from "./go.js";

// represents a symbol from a .go file. Struct, interface, etc.
export type NamedTypeTypeKind =
  | "import"
  | "function"
  | "var"
  | "type"
  | "struct"
  | "struct-member"
  | "interface"
  | "interface-member"
  | "package";
export type NamedTypeSymbolKind = "named-type" | "package";

export interface NamedTypeSymbolOptions extends GoSymbolOptions {
  typeParameters?: GoSymbol[];
}

/**
 * A symbol for a named type in Go such as a struct, interface, and so forth.
 */
export class NamedTypeSymbol extends GoSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members", "typeParameters"];

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeTypeKind,
    options?: NamedTypeSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#typeKind = kind;
  }

  #typeKind: NamedTypeTypeKind;
  get typeKind() {
    track(this, TrackOpTypes.GET, "typeKind");
    return this.#typeKind;
  }
  set typeKind(value: NamedTypeTypeKind) {
    const old = this.#typeKind;
    if (old === value) {
      return;
    }
    this.#typeKind = value;
    trigger(this, TriggerOpTypes.SET, "typeKind", value, old);
  }

  get typeParameters() {
    return this.memberSpaceFor("typeParameters")!;
  }

  copy() {
    const options = this.getGoCopyOptions();
    const copy = createSymbol(
      NamedTypeSymbol,
      this.name,
      undefined,
      this.#typeKind,
      options,
    );
    this.initializeGoCopy(copy);
    return copy;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}
