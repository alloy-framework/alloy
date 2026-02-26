import {
  createSymbol,
  Namekey,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";

export interface PythonOutputSymbolOptions extends OutputSymbolOptions {
  module?: string;
  /** Whether this symbol is only used in type annotation contexts */
  typeOnly?: boolean;
}

export interface CreatePythonSymbolFunctionOptions
  extends PythonOutputSymbolOptions {
  name: string;
}

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export class PythonOutputSymbol extends OutputSymbol {
  static readonly memberSpaces = ["static", "instance"] as const;

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: PythonOutputSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#module = options.module ?? undefined;
    this.#typeOnly = options.typeOnly ?? false;
  }

  // The module in which the symbol is defined
  #module?: string;

  get module() {
    return this.#module;
  }

  #typeOnly: boolean;

  /**
   * Returns true if this symbol is only used in type annotation contexts.
   * Such symbols can be imported inside a TYPE_CHECKING block.
   */
  get isTypeOnly() {
    track(this, TrackOpTypes.GET, "typeOnly");
    return this.#typeOnly;
  }

  /**
   * Mark this symbol as also being used as a value (not just a type).
   */
  markAsValue() {
    if (!this.#typeOnly) {
      return;
    }
    const oldValue = this.#typeOnly;
    this.#typeOnly = false;
    trigger(this, TriggerOpTypes.SET, "typeOnly", false, oldValue);
  }

  get staticMembers() {
    return this.memberSpaceFor("static")!;
  }

  get instanceMembers() {
    return this.memberSpaceFor("instance")!;
  }

  get isStaticMemberSymbol() {
    return !this.isInstanceMemberSymbol;
  }

  get isInstanceMemberSymbol() {
    return this.spaces.some((s) => s.key === "instance");
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      module: this.#module,
      isStaticMemberSymbol: this.isStaticMemberSymbol,
      isInstanceMemberSymbol: this.isInstanceMemberSymbol,
    };
  }

  copy() {
    const binder = this.binder;
    const copy = createSymbol(PythonOutputSymbol, this.name, undefined, {
      binder,
      aliasTarget: this.aliasTarget,
      module: this.module,
      metadata: this.metadata,
      typeOnly: this.isTypeOnly,
    });

    this.initializeCopy(copy);

    return copy;
  }
}
