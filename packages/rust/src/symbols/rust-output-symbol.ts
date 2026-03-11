import {
  createSymbol,
  Namekey,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
  TrackOpTypes,
  TriggerOpTypes,
  track,
  trigger,
  watch,
} from "@alloy-js/core";

export type RustVisibility = "pub" | "pub(crate)" | "pub(super)" | undefined;

export type RustSymbolKind =
  | "symbol"
  | "function"
  | "struct"
  | "enum"
  | "trait"
  | "type-alias"
  | "const"
  | "static"
  | "module"
  | "field"
  | "variant"
  | "method"
  | "associated-type"
  | "parameter"
  | "lifetime"
  | "type-parameter";

export interface RustOutputSymbolOptions extends OutputSymbolOptions {
  visibility?: RustVisibility;
  symbolKind?: RustSymbolKind;
  isAsync?: boolean;
  isUnsafe?: boolean;
  isConst?: boolean;
}

export class RustOutputSymbol extends OutputSymbol {
  static readonly memberSpaces = ["members"] as const;

  #visibility: RustVisibility;
  get visibility() {
    track(this, TrackOpTypes.GET, "visibility");
    return this.#visibility;
  }

  set visibility(value: RustVisibility) {
    const old = this.#visibility;
    if (old === value) {
      return;
    }

    this.#visibility = value;
    trigger(this, TriggerOpTypes.SET, "visibility", value, old);
  }

  #symbolKind: RustSymbolKind;
  get symbolKind() {
    track(this, TrackOpTypes.GET, "symbolKind");
    return this.#symbolKind;
  }

  set symbolKind(value: RustSymbolKind) {
    const old = this.#symbolKind;
    if (old === value) {
      return;
    }

    this.#symbolKind = value;
    trigger(this, TriggerOpTypes.SET, "symbolKind", value, old);
  }

  #isAsync: boolean;
  get isAsync() {
    track(this, TrackOpTypes.GET, "isAsync");
    return this.#isAsync;
  }

  set isAsync(value: boolean) {
    const old = this.#isAsync;
    if (old === value) {
      return;
    }

    this.#isAsync = value;
    trigger(this, TriggerOpTypes.SET, "isAsync", value, old);
  }

  #isUnsafe: boolean;
  get isUnsafe() {
    track(this, TrackOpTypes.GET, "isUnsafe");
    return this.#isUnsafe;
  }

  set isUnsafe(value: boolean) {
    const old = this.#isUnsafe;
    if (old === value) {
      return;
    }

    this.#isUnsafe = value;
    trigger(this, TriggerOpTypes.SET, "isUnsafe", value, old);
  }

  #isConst: boolean;
  get isConst() {
    track(this, TrackOpTypes.GET, "isConst");
    return this.#isConst;
  }

  set isConst(value: boolean) {
    const old = this.#isConst;
    if (old === value) {
      return;
    }

    this.#isConst = value;
    trigger(this, TriggerOpTypes.SET, "isConst", value, old);
  }

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: RustOutputSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#visibility = options.visibility;
    this.#symbolKind = options.symbolKind ?? "symbol";
    this.#isAsync = options.isAsync ?? false;
    this.#isUnsafe = options.isUnsafe ?? false;
    this.#isConst = options.isConst ?? false;
  }

  copy() {
    const options = this.getCopyOptions();
    const binder = this.binder;
    const copy = createSymbol(RustOutputSymbol, this.name, undefined, {
      ...options,
      binder,
      visibility: this.#visibility,
      symbolKind: this.#symbolKind,
      isAsync: this.#isAsync,
      isUnsafe: this.#isUnsafe,
      isConst: this.#isConst,
    });
    this.initializeCopy(copy);

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
}
