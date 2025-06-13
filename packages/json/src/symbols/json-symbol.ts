import {
  OutputSymbol,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";

// prettier-ignore
export enum JsonSymbolFlags {
  None = 0,
  Object = 1 << 0,
  Array = 1 << 1,
}

/**
 * JsonOutputSymbol is created for JSON Values with a refkey. For JSON objects
 * and arrays, the symbol will have the `StaticMemberContainer` flag. For JSON
 * values that are members of an object or an array, the symbol will have the
 * `StaticMember` flag.
 */
export class JsonOutputSymbol extends OutputSymbol {
  #jsonFlags: JsonSymbolFlags;
  get jsonFlags(): JsonSymbolFlags {
    track(this, TrackOpTypes.GET, "jsonFlags");
    return this.#jsonFlags;
  }

  set jsonFlags(value: JsonSymbolFlags) {
    const old = this.#jsonFlags;
    if (old === value) {
      return;
    }

    this.#jsonFlags = value;
    trigger(this, TriggerOpTypes.SET, "jsonFlags", value, old);
  }

  constructor(name: string, options: CreateJsonSymbolOptions = {}) {
    super(name, options);

    this.#jsonFlags = options.jsonFlags ?? JsonSymbolFlags.None;
  }
}

export interface CreateJsonSymbolOptions extends OutputSymbolOptions {
  jsonFlags?: JsonSymbolFlags;
}
