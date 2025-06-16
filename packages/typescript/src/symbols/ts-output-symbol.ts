import {
  OutputScopeFlags,
  OutputSymbol,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";
import { TSOutputScope } from "./scopes.js";
import { TSMemberScope } from "./ts-member-scope.js";

// prettier-ignore
export enum TSSymbolFlags {
  None                   = 0,
  LocalImportSymbol      = 1 << 0,
  TypeSymbol             = 1 << 1,
  ParameterSymbol        = 1 << 2,
  PrivateMember          = 1 << 3,
  PrivateMemberContainer = 1 << 4,
  Nullish = 1 << 5,
}

export interface CreateTsSymbolOptions extends OutputSymbolOptions {
  scope?: TSOutputScope;
  owner?: TSOutputSymbol;
  export?: boolean;
  default?: boolean;
  tsFlags?: TSSymbolFlags;
}

export class TSOutputSymbol extends OutputSymbol {
  constructor(name: string, options: CreateTsSymbolOptions = {}) {
    super(name, options);
    this.#export = !!options.export;
    this.#default = !!options.default;
    this.#tsFlags = options.tsFlags ?? TSSymbolFlags.None;
    this.#privateMemberScope = undefined;
    this.#privateStaticMemberScope = undefined;
    if (this.#tsFlags & TSSymbolFlags.PrivateMemberContainer) {
      this.#privateMemberScope = new TSMemberScope("private members", {
        binder: this.binder,
        owner: this,
        flags: OutputScopeFlags.InstanceMemberScope,
      });

      this.#privateStaticMemberScope = new TSMemberScope(
        "private static members",
        {
          flags: OutputScopeFlags.StaticMemberScope,
          binder: this.binder,
          owner: this,
        },
      );
    }

    if (options.export && this.scope.kind === "module") {
      for (const refkey of this.refkeys) {
        this.scope.exportedSymbols.set(refkey, this);
      }
    }
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
  set tsFlags(value: TSSymbolFlags) {
    const oldValue = this.#tsFlags;
    if (oldValue === value) {
      return;
    }
    this.#tsFlags = value;
    trigger(this, TriggerOpTypes.SET, "tsFlags", value, oldValue);
  }

  get scope() {
    return super.scope as TSOutputScope;
  }
  set scope(value: TSOutputScope) {
    super.scope = value;
  }

  get staticMemberScope() {
    return super.staticMemberScope as TSMemberScope | undefined;
  }

  get instanceMemberScope() {
    return super.instanceMemberScope as TSMemberScope | undefined;
  }

  #privateMemberScope: TSMemberScope | undefined;
  get privateMemberScope() {
    return this.#privateMemberScope;
  }

  #privateStaticMemberScope: TSMemberScope | undefined;
  get privateStaticMemberScope() {
    return this.#privateStaticMemberScope;
  }

  protected createMemberScope(
    name: string,
    options: { owner?: OutputSymbol; flags?: OutputScopeFlags },
  ): TSMemberScope {
    return new TSMemberScope(name, {
      ...options,
    });
  }
}
