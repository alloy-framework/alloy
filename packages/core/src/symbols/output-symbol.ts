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
import { isRefkey, type Refkey } from "../refkey.js";
import {
  formatScopeName,
  formatSymbol,
  formatSymbolName,
  trace,
  traceEffect,
  TracePhase,
} from "../tracer.js";
import { OutputScope, OutputScopeFlags } from "./output-scope.js";
/**
 * Flags that describe an output symbol.
 */
export enum OutputSymbolFlags {
  None = 0,

  /**
   * The symbol is an instance member container. Symbols with this flag will have a
   * instanceMemberScope property that contains symbols for instance members.
   */
  InstanceMemberContainer = 1 << 0,

  /**
   * The symbol is a static member container. Symbols with this flag will have a
   * staticMemberScope property that contains symbols for static members.
   */
  StaticMemberContainer = 1 << 1,

  /**
   * Whether this symbol contains members of any kind.
   */
  MemberContainer = InstanceMemberContainer | StaticMemberContainer,

  /**
   * Whether this symbol is an instance member of another symbol (i.e that it is
   * stored in an instance member scope).
   */
  InstanceMember = 1 << 2,

  /**
   * Whether this symbol is a static member of another symbol (i.e that it is
   * stored in a static member scope).
   */
  StaticMember = 1 << 3,

  /**
   * Transient symbols are not added to symbol tables and do not create
   * referencable refkeys. They are used for temporary symbols that are intended
   * to be used to calculate other symbols.
   */
  Transient = 1 << 4,

  /**
   * Whether this is an instance member or static member of another symbol.
   */
  Member = InstanceMember | StaticMember,
}

export interface OutputSymbolOptions {
  binder?: Binder;
  scope?: OutputScope;
  flags?: OutputSymbolFlags;
  refkeys?: Refkey | Refkey[];
  metadata?: Record<string, unknown>;
}

let symbolCount = 0;

/**
 * Classes are used for the following reasons:
 * * Directly implement the reactive interface, which avoids proxies, makes
 *   readonly properties easier, and avoids needless tracking and inadvertent
 *   triggering of signals.l
 */

/**
 * An output symbol is a named entity that can be referenced in your output code.
 *
 * @remarks
 *
 * This class is the base implementation of symbol. Most languages will have subtypes
 * that provide additional metadata. Symbols are reactive values, so you can observe
 * changes to their properties in a reactive context.
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
   * Tell @vue/reactivity that this symbol should never be wrapped in a reactive
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
   * Takes the instance members on this symbol and creates corresponding
   * static members on the target symbol. Instance and static members of
   * instantiated symbols are copied. The refkey of any instantiated
   * symbols are set to a composite refkey of the target symbol's refkey
   * and the instantiated symbol's refkey.
   */
  instantiateInto(targetSymbol: OutputSymbol) {
    trace(TracePhase.symbol.instantiate, () => {
      return `${formatSymbolName(this)} -> ${formatSymbolName(targetSymbol)}`;
    });

    if (this.#instanceMemberScope) {
      targetSymbol.flags |= OutputSymbolFlags.StaticMemberContainer;
      targetSymbol.#createStaticMemberScope();
      targetSymbol.#staticMemberScope!.copySymbolsFrom(
        this.#instanceMemberScope,
        {
          onAdd: (symbol) => {
            const clone = symbol.cloneInto(targetSymbol.#staticMemberScope!);
            clone.#flags &= ~OutputSymbolFlags.InstanceMember;
            clone.#flags |= OutputSymbolFlags.StaticMember;
            return clone;
          },
        },
      );
    }
  }

  /**
   * Makes a clone of this symbol which will update the name and flags
   * of the clone when the original symbol is updated.
   *
   * @remarks
   *
   * This is used to create a symbol that is a copy of this symbol, but
   * with a different scope. Changes to the clone will not affect the
   * original symbol, and changes to the original symbol's name and flags
   * will overwrite the clone's name and flags.
   *
   * @param newScope The scope to use for the clone.
   */
  cloneInto(newScope: OutputScope) {
    trace(TracePhase.symbol.clone, () => {
      return `${formatSymbolName(this)} -> ${formatScopeName(newScope)}`;
    });
    const clone = new OutputSymbol(this.#name, {
      binder: this.#binder,
      scope: newScope,
      flags: this.#flags,
      refkeys: this.#refkeys,
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
