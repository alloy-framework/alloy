import {
  createSymbol,
  Namekey,
  OutputSpace,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  watch,
} from "@alloy-js/core";
import {
  RustOutputSymbol,
  RustOutputSymbolOptions,
} from "./rust-output-symbol.js";

export type NamedTypeTypeKind = "struct" | "enum" | "trait" | "type-alias";
export interface NamedTypeSymbolOptions extends RustOutputSymbolOptions {}

export class NamedTypeSymbol extends RustOutputSymbol {
  static readonly memberSpaces: readonly string[] = [
    "members",
    "type-parameters",
  ];

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

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    typeKind: NamedTypeTypeKind,
    options: NamedTypeSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#typeKind = typeKind;
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
        visibility: this.visibility,
        symbolKind: this.symbolKind,
        isAsync: this.isAsync,
        isUnsafe: this.isUnsafe,
        isConst: this.isConst,
      },
    );
    this.initializeCopy(copy);

    watch(
      () => this.typeKind,
      (newValue) => {
        copy.typeKind = newValue;
      },
    );

    watch(
      () => this.visibility,
      (newValue) => {
        copy.visibility = newValue;
      },
    );

    watch(
      () => this.symbolKind,
      (newValue) => {
        copy.symbolKind = newValue;
      },
    );

    watch(
      () => this.isAsync,
      (newValue) => {
        copy.isAsync = newValue;
      },
    );

    watch(
      () => this.isUnsafe,
      (newValue) => {
        copy.isUnsafe = newValue;
      },
    );

    watch(
      () => this.isConst,
      (newValue) => {
        copy.isConst = newValue;
      },
    );

    return copy;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }

  get typeParameters() {
    return this.memberSpaceFor("type-parameters")!;
  }
}
