import {
  reactive,
  ReactiveFlags,
  shallowReactive,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  watch,
} from "@vue/reactivity";
import type { Binder } from "../binder.js";
import { useBinder } from "../context/binder.js";
import { useMemberScope } from "../context/member-scope.js";
import { useScope } from "../context/scope.js";
import { isRefkey, refkey, type Refkey } from "../refkey.js";
import {
  formatScopeName,
  formatSymbol,
  formatSymbolName,
  trace,
  traceEffect,
  TracePhase,
} from "../tracer.js";
import { OutputScopeFlags, OutputSymbolFlags } from "./flags.js";
import { OutputScope } from "./output-scope.js";

export interface OutputSymbolOptions {
  binder?: Binder;
  scope?: OutputScope;
  flags?: OutputSymbolFlags;
  refkeys?: Refkey | Refkey[];
  metadata?: Record<string, unknown>;
  aliasTarget?: OutputSymbol;
}

let symbolCount = 0;

/**
 * An output symbol is a named entity that can be referenced in your output
 * code.
 *
 * @remarks
 *
 * This class is the base implementation of symbol. Most languages will have
 * subtypes that provide additional metadata. Symbols are reactive values, so
 * you can observe changes to their properties in a reactive context.
 */
export class OutputSymbol {
  #originalName: string;
  get originalName() {
    return this.#originalName;
  }

  #name: string;
  get name() {
    track(this, TrackOpTypes.GET, "name");
    return this.#name;
  }
  set name(name: string) {
    const old = this.#name;

    if (old === name) {
      return;
    }

    this.#name = name;
    trigger(this, TriggerOpTypes.SET, "name", name, old);
  }

  #id: number;
  get id() {
    return this.#id;
  }

  #flags: OutputSymbolFlags;
  get flags() {
    track(this, TrackOpTypes.GET, "flags");
    return this.#flags;
  }
  set flags(flags: OutputSymbolFlags) {
    const old = this.#flags;

    if (old === flags) {
      return;
    }

    this.#flags = flags;
    trigger(this, TriggerOpTypes.SET, "flags", flags, old);

    this.#createInstanceMemberScope();
    this.#createStaticMemberScope();
  }

  #scope: OutputScope;
  get scope() {
    track(this, TrackOpTypes.GET, "scope");
    return this.#scope;
  }

  set scope(scope: OutputScope) {
    const old = this.#scope;

    if (old === scope) {
      return;
    }

    this.#handleNewScope(scope, old);

    this.#scope = scope;

    trigger(this, TriggerOpTypes.SET, "scope", scope, old);
  }

  #handleNewScope(newScope: OutputScope, oldScope?: OutputScope) {
    if (oldScope) {
      // ensure when changing scope that this symbol only belongs to one of them
      oldScope.symbols.delete(this);
    }

    if (!newScope) {
      return;
    }

    newScope.symbols.add(this);

    if (newScope.flags & OutputScopeFlags.InstanceMemberScope) {
      this.flags |= OutputSymbolFlags.InstanceMember;
    }

    if (newScope.flags & OutputScopeFlags.StaticMemberScope) {
      this.flags |= OutputSymbolFlags.StaticMember;
    }
  }

  #binder: Binder | undefined;
  get binder() {
    return this.#binder;
  }

  #refkeys: Refkey[];
  get refkeys() {
    track(this, TrackOpTypes.GET, "refkeys");
    return this.#refkeys;
  }

  set refkeys(refkeys: Refkey[]) {
    const old = this.#refkeys;

    if (old === refkeys) {
      return;
    }

    this.#refkeys = shallowReactive(
      Array.isArray(refkeys) ? refkeys : [refkeys],
    );
    trigger(this, TriggerOpTypes.SET, "refkeys", this.#refkeys, old);
  }

  #instanceMemberScope?: OutputScope;
  get instanceMemberScope() {
    track(this, TrackOpTypes.GET, "instanceMemberScope");
    return this.#instanceMemberScope;
  }

  #aliasTarget?: OutputSymbol;
  get aliasTarget() {
    return this.#aliasTarget;
  }

  #createInstanceMemberScope() {
    if (
      this.#instanceMemberScope ||
      !(this.#flags & OutputSymbolFlags.InstanceMemberContainer)
    ) {
      return;
    }

    this.#instanceMemberScope = new OutputScope(
      `${this.name} instance members`,
      {
        binder: this.#binder,
        owner: this,
        flags: OutputScopeFlags.InstanceMemberScope,
      },
    );
    trigger(
      this,
      TriggerOpTypes.SET,
      "instanceMemberScope",
      this.#instanceMemberScope,
      undefined,
    );
  }

  /**
   * Create an output scope to hold member symbols. By default this just creates
   * an OutputScope, but can be subclassed to build scope subtypes when needed.
   */
  protected createMemberScope(
    name: string,
    options: {
      owner?: OutputSymbol;
      flags?: OutputScopeFlags;
    },
  ) {
    return new OutputScope(name, {
      binder: this.#binder,
      owner: options.owner,
      flags: options.flags,
    });
  }

  #staticMemberScope?: OutputScope;
  get staticMemberScope() {
    track(this, TrackOpTypes.GET, "staticMemberScope");
    return this.#staticMemberScope;
  }

  #createStaticMemberScope() {
    if (
      this.#staticMemberScope ||
      !(this.#flags & OutputSymbolFlags.StaticMemberContainer)
    ) {
      return;
    }

    this.#staticMemberScope = new OutputScope(`${this.name} static members`, {
      binder: this.#binder,
      owner: this,
      flags: OutputScopeFlags.StaticMemberScope,
    });
    trigger(
      this,
      TriggerOpTypes.SET,
      "staticMemberScope",
      this.#staticMemberScope,
      undefined,
    );
  }

  #metadata: Record<string, unknown>;
  get metadata() {
    return this.#metadata;
  }

  /**
   * Tell \@vue/reactivity that this symbol should never be wrapped in a reactive
   * proxy.
   */
  [ReactiveFlags.SKIP] = true;

  constructor(name: string, options: OutputSymbolOptions = {}) {
    this.#binder = options.binder ?? useBinder();
    this.#name = name;
    this.#originalName = name;
    this.#id = symbolCount++;
    this.#flags = options.flags ?? OutputSymbolFlags.None;
    this.#scope = options.scope ?? (this.#defaultScope() as OutputScope);
    this.#aliasTarget = options.aliasTarget;
    if (this.#aliasTarget) {
      this.#flags |= OutputSymbolFlags.Alias;
      this.#flags &= ~(
        OutputSymbolFlags.MemberContainer | OutputSymbolFlags.Member
      );
    }
    this.#refkeys = shallowReactive(
      Array.isArray(options.refkeys) ? options.refkeys
      : isRefkey(options.refkeys) ? [options.refkeys]
      : [],
    );
    this.#metadata = reactive(options.metadata ?? {});
    this.#createInstanceMemberScope();
    this.#createStaticMemberScope();
    this.#handleNewScope(this.#scope);

    trace(TracePhase.symbol.create, () => `${formatSymbol(this)}`);
    traceEffect(TracePhase.symbol.update, () => {
      return `${formatSymbol(this)}`;
    });
    this.#binder?.notifySymbolCreated(this);
  }

  delete() {
    trace(TracePhase.symbol.delete, () => `${formatSymbolName(this)}`);
    if (this.#scope) {
      this.#scope.symbols.delete(this);
    }

    this.#binder?.notifySymbolDeleted(this);
  }

  /**
   * Takes the instance members or static members on this symbol and creates
   * corresponding static members on the target symbol. Instance or static
   * members of instantiated symbols are copied. The refkey of any instantiated
   * symbols are set to a composite refkey of the target symbol's refkey and the
   * instantiated symbol's refkey.
   */
  instantiateTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.instantiateTo(targetSymbol);
    }

    trace(TracePhase.symbol.instantiate, () => {
      return `${formatSymbolName(this)} -> ${formatSymbolName(targetSymbol)}`;
    });

    const from = this.#instanceMemberScope ?? this.#staticMemberScope;

    if (from) {
      targetSymbol.flags |= OutputSymbolFlags.StaticMemberContainer;
      targetSymbol.#createStaticMemberScope();
      targetSymbol.#staticMemberScope!.copySymbolsFrom(from, {
        onAdd: (symbol) => {
          const clone = symbol.copyToScope(
            targetSymbol.#staticMemberScope!,
            targetSymbol,
          );
          clone.#flags &= ~OutputSymbolFlags.InstanceMember;
          clone.#flags |= OutputSymbolFlags.StaticMember;
          return clone;
        },
      });
    }
  }

  #instantiationRk(base: OutputSymbol, member: OutputSymbol) {
    const instantiationRks = [];
    for (const baseRk of base.refkeys) {
      for (const targetRk of member.refkeys) {
        instantiationRks.push(refkey(baseRk, targetRk));
      }
    }

    return instantiationRks;
  }

  /**
   * Copy member symbols from the target symbol into the target symbol. The
   * copied symbols have their refkey set to
   * `refkey(targetSymbol.refkey, this.refkey)`.
   */
  copyTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.copyTo(targetSymbol);
    }
    if (this.staticMemberScope) {
      targetSymbol.flags |= OutputSymbolFlags.StaticMemberContainer;
      targetSymbol.staticMemberScope!.copySymbolsFrom(this.staticMemberScope);
    }

    if (this.instanceMemberScope) {
      targetSymbol.flags |= OutputSymbolFlags.InstanceMemberContainer;
      targetSymbol.instanceMemberScope!.copySymbolsFrom(
        this.instanceMemberScope,
      );
    }
  }

  /**
   * Move member symbols from this transient symbol to the target symbol.
   */
  moveTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.moveTo(targetSymbol);
    }

    if (!(this.flags & OutputSymbolFlags.Transient)) {
      throw new Error("Can only move members from transient symbols");
    }
    if (this.staticMemberScope) {
      targetSymbol.flags |= OutputSymbolFlags.StaticMemberContainer;
      targetSymbol.staticMemberScope!.moveSymbolsFrom(this.staticMemberScope);
    }

    if (this.instanceMemberScope) {
      targetSymbol.flags |= OutputSymbolFlags.InstanceMemberContainer;
      targetSymbol.instanceMemberScope!.moveSymbolsFrom(
        this.instanceMemberScope,
      );
    }
  }

  /**
   * Makes a copy of this symbol which will update the name and flags
   * of the clone when the original symbol is updated.
   *
   * @remarks
   *
   * This is used to create a symbol that is a copy of this symbol, but
   * with a different scope. Changes to the copy will not affect the
   * original symbol, and changes to the original symbol's name and flags
   * will overwrite the copy's name and flags.
   *
   * @param newScope - The scope to use for the copy.
   */
  copyToScope(newScope: OutputScope, baseSymbol?: OutputSymbol): OutputSymbol {
    if (this.#aliasTarget) {
      return this.#aliasTarget.copyToScope(newScope, baseSymbol);
    }
    trace(TracePhase.symbol.clone, () => {
      return `${formatSymbolName(this)} -> ${formatScopeName(newScope)}`;
    });
    const clone = new OutputSymbol(this.#name, {
      binder: this.#binder,
      scope: newScope,
      flags: this.#flags,
      refkeys: baseSymbol ? this.#instantiationRk(baseSymbol, this) : [],
      metadata: this.#metadata,
    });

    if (this.instanceMemberScope) {
      clone.#instanceMemberScope = this.instanceMemberScope.clone({
        owner: clone,
      });
    }

    if (this.staticMemberScope) {
      clone.#staticMemberScope = this.staticMemberScope.clone({ owner: clone });
    }

    watch(
      () => this.name,
      (newName) => (clone.name = newName),
    );
    watch(
      () => this.flags,
      (newFlags) => (clone.flags = newFlags),
    );

    return clone;
  }

  #defaultScope() {
    if ((this.#flags & OutputSymbolFlags.Member) === 0) {
      return useScope();
    } else {
      const memberScope = useMemberScope();
      if (!memberScope) {
        throw new Error("Cannot declare member symbols without a member scope");
      }
      if (this.#flags & OutputSymbolFlags.InstanceMember) {
        if (!memberScope.instanceMembers) {
          throw new Error(
            "Cannot declare instance member symbols without an instance member scope",
          );
        }
        return memberScope.instanceMembers;
      } else {
        if (!memberScope.staticMembers) {
          throw new Error(
            "Cannot declare static member symbols without a static member scope",
          );
        }
        return memberScope.staticMembers;
      }
    }
  }
}
