import {
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  watch,
} from "@alloy-js/core";
import { TSOutputScope } from "./scopes.js";
import { TSModuleScope } from "./ts-module-scope.js";

// prettier-ignore
export enum TSSymbolFlags {
  None                   = 0,
  LocalImportSymbol      = 1 << 0,
  TypeSymbol             = 1 << 1,
  ParameterSymbol        = 1 << 2,
  Nullish = 1 << 3,
}

export interface CreateTsSymbolOptions extends OutputSymbolOptions {
  export?: boolean;
  default?: boolean;
  tsFlags?: TSSymbolFlags;
  hasInstanceMembers?: boolean;
}

export class TSOutputSymbol extends OutputSymbol {
  static readonly memberSpaces = [
    "static",
    "instance",
    "private-static",
    "private-instance",
  ] as const;

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: CreateTsSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#export = !!options.export;
    this.#default = !!options.default;
    this.#tsFlags = options.tsFlags ?? TSSymbolFlags.None;
    this.#hasInstanceMembers = !!options.hasInstanceMembers;
    if (
      this.ownerSymbol?.isTypeSymbol ||
      (this.spaces.some((s) => s.key === "types") &&
        !this.spaces.some((s) => s.key === "values"))
    ) {
      // Classes and enums are both types and values. The check above will treat them as values
      // exclusively so that referencing occurs properly. This should instead use type or value
      // referencing based on type context.
      this.#tsFlags |= TSSymbolFlags.TypeSymbol;
    }
    if (options.export && this.scope && this.scope instanceof TSModuleScope) {
      for (const refkey of this.refkeys) {
        this.scope.exportedSymbols.set(refkey, this);
      }
    }
  }

  get ownerSymbol() {
    return super.ownerSymbol as TSOutputSymbol | undefined;
  }

  copy() {
    const copy = new TSOutputSymbol(this.name, undefined, {
      binder: this.binder,
      aliasTarget: this.aliasTarget,
      default: this.default,
      export: this.export,
      tsFlags: this.tsFlags,
      metadata: this.metadata,
    });

    this.initializeCopy(copy);

    watch(
      () => this.default,
      (def) => (copy.default = def),
    );

    watch(
      () => this.export,
      (exp) => (copy.export = exp),
    );

    watch(
      () => this.tsFlags,
      (flags) => (copy.tsFlags = flags),
    );

    return copy;
  }

  #export: boolean;
  get export() {
    track(this, TrackOpTypes.GET, "export");
    return this.#export;
  }

  set export(value: boolean) {
    if (this.#export === value) {
      return;
    }
    this.#export = value;
    trigger(this, TriggerOpTypes.SET, "export", value, !value);
  }

  #default: boolean;
  get default() {
    track(this, TrackOpTypes.GET, "default");
    return this.#default;
  }

  set default(value: boolean) {
    if (this.#default === value) {
      return;
    }
    this.#default = value;
    trigger(this, TriggerOpTypes.SET, "default", value, !value);
  }

  #tsFlags: TSSymbolFlags;
  get tsFlags() {
    track(this, TrackOpTypes.GET, "tsFlags");
    return this.#tsFlags;
  }

  #hasInstanceMembers: boolean = false;
  get hasInstanceMembers() {
    track(this, TrackOpTypes.GET, "hasInstanceMembers");
    return this.#hasInstanceMembers;
  }

  set tsFlags(value: TSSymbolFlags) {
    const oldValue = this.#tsFlags;
    if (oldValue === value) {
      return;
    }
    this.#tsFlags = value;
    trigger(this, TriggerOpTypes.SET, "tsFlags", value, oldValue);
  }

  get scope(): TSOutputScope | undefined {
    return super.scope as TSOutputScope | undefined;
  }

  get staticMembers() {
    return this.memberSpaceFor("static")!;
  }

  get instanceMembers() {
    return this.memberSpaceFor("instance")!;
  }

  get privateInstanceMembers() {
    return this.memberSpaceFor("private-instance")!;
  }

  get privateStaticMembers() {
    return this.memberSpaceFor("private-static")!;
  }

  get isPrivateMemberSymbol() {
    return (
      this.spaces.length > 0 &&
      this.spaces.filter(
        (s) => s.key === "private-static" || s.key === "private-instance",
      ).length > 0
    );
  }

  get isPublicMemberSymbol() {
    return !this.isPrivateMemberSymbol;
  }

  get isStaticMemberSymbol() {
    return !this.isInstanceMemberSymbol;
  }

  get isInstanceMemberSymbol() {
    return (
      this.spaces.length > 0 &&
      this.spaces.filter(
        (s) => s.key === "instance" || s.key === "private-instance",
      ).length > 0
    );
  }

  get isTypeSymbol() {
    return !!(this.tsFlags & TSSymbolFlags.TypeSymbol);
  }

  get isValueSymbol() {
    return this.spaces.some((s) => s.key === "values");
  }
}
