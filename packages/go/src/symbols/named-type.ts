import {
  OutputSpace,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";
import { GoSymbol } from "./go.js";

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

/**
 * A symbol for a named type in Go such as a struct, interface, and so forth.
 */
export class NamedTypeSymbol extends GoSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members"];

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

  copy() {
    const options = this.getGoCopyOptions();
    const copy = new NamedTypeSymbol(
      this.name,
      undefined,
      this.#typeKind,
      options,
    );
    this.initializeGoCopy(copy);
    return copy;
  }

  #pointerSymbol?: GoSymbol;
  get pointerSymbol() {
    track(this, TrackOpTypes.GET, "pointerSymbol");
    return this.#pointerSymbol;
  }
  set pointerSymbol(value: GoSymbol | undefined) {
    const old = this.#pointerSymbol;
    if (old === value) {
      return;
    }
    this.#pointerSymbol = value;
    trigger(this, TriggerOpTypes.SET, "pointerSymbol", value, old);
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}
