import {
  Namekey,
  OutputSpace,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";
import { TypeParameterProps } from "../components/parameters/typeparameters.js";
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
  typeParameters?: TypeParameterProps[];
}

/**
 * A symbol for a named type in Go such as a struct, interface, and so forth.
 */
export class NamedTypeSymbol extends GoSymbol {
  public readonly symbolKind: NamedTypeSymbolKind = "named-type";
  public static readonly memberSpaces = ["members"];

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    kind: NamedTypeTypeKind,
    options?: NamedTypeSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#typeKind = kind;
    this.#typeParameters = options?.typeParameters;
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

  #typeParameters?: TypeParameterProps[];
  get typeParameters() {
    track(this, TrackOpTypes.GET, "typeParameters");
    return this.#typeParameters;
  }
  set typeParameters(value: TypeParameterProps[] | undefined) {
    const old = this.#typeParameters;
    if (old === value) {
      return;
    }
    this.#typeParameters = value;
    trigger(this, TriggerOpTypes.SET, "typeParameters", value, old);
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
