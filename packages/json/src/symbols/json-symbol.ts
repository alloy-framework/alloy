import {
  createSymbol,
  OutputSpace,
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
  static readonly memberSpaces = ["static"] as const;

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

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: CreateJsonSymbolOptions = {},
  ) {
    super(name, spaces, options);

    this.#jsonFlags = options.jsonFlags ?? JsonSymbolFlags.None;
  }

  copy() {
    const options = this.getCopyOptions();
    const binder = this.binder;
    const copy = createSymbol(JsonOutputSymbol, this.name, undefined, {
      ...options,
      binder,
      jsonFlags: this.#jsonFlags,
    });
    this.initializeCopy(copy);
    return copy;
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      jsonFlags: this.#jsonFlags,
      isObject: Boolean(this.#jsonFlags & JsonSymbolFlags.Object),
      isArray: Boolean(this.#jsonFlags & JsonSymbolFlags.Array),
    };
  }

  get staticMembers() {
    return this.memberSpaceFor("static")!;
  }
}

export interface CreateJsonSymbolOptions extends OutputSymbolOptions {
  jsonFlags?: JsonSymbolFlags;
}
