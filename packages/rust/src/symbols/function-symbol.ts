import {
  Children,
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

export interface FunctionSymbolOptions extends RustOutputSymbolOptions {
  receiverType?: Children;
}

export class FunctionSymbol extends RustOutputSymbol {
  #receiverType?: Children;
  get receiverType() {
    track(this, TrackOpTypes.GET, "receiverType");
    return this.#receiverType;
  }

  set receiverType(value: Children | undefined) {
    const old = this.#receiverType;
    if (old === value) {
      return;
    }

    this.#receiverType = value;
    trigger(this, TriggerOpTypes.SET, "receiverType", value, old);
  }

  get isInstanceMemberSymbol(): boolean {
    return this.receiverType !== undefined;
  }

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: FunctionSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#receiverType = options.receiverType;
  }

  copy() {
    const options = this.getCopyOptions();
    const binder = this.binder;
    const copy = createSymbol(FunctionSymbol, this.name, undefined, {
      ...options,
      binder,
      visibility: this.visibility,
      symbolKind: this.symbolKind,
      isAsync: this.isAsync,
      isUnsafe: this.isUnsafe,
      isConst: this.isConst,
      receiverType: this.#receiverType,
    });
    this.initializeCopy(copy);

    watch(
      () => this.receiverType,
      (newValue) => {
        copy.receiverType = newValue;
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
}
