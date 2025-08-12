import {
  effect,
  reactive,
  ReactiveFlags,
  shallowReactive,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@vue/reactivity";
import { inspect } from "util";
import type { Binder } from "../binder.js";
import { useBinder } from "../context/binder.js";
import { untrack } from "../reactivity.js";
import { formatScope, trace, traceEffect, TracePhase } from "../tracer.js";
import { OutputScopeFlags } from "./flags.js";
import { OutputDeclarationSpace, OutputSpace } from "./output-space.js";
import { OutputSymbol } from "./output-symbol.js";

let scopeCount = 0;

export interface OutputScopeOptions {
  /**
   * Flags for this scope.
   */
  flags?: OutputScopeFlags;

  /**
   * Arbitrary metadata that is associated with this scope.
   */
  metadata?: Record<string, unknown>;

  /**
   * The binder instance this scope belongs to. If not provided, it will
   * attempt to find the current binder from context.
   */
  binder?: Binder;

  /**
   * The owner symbol of this scope. When provided, this scope becomes a member
   * scope, which exposes the symbols on its owner symbol instead of having its
   * own declaration spaces.
   */
  ownerSymbol?: OutputSymbol;
}

/**
 * A container of symbols accessible within some scope in your output code.
 *
 * @remarks
 *
 * Scopes form a tree. All scopes except the global scope have a parent scope
 * identified by `parent`. Scopes can have nested scopes which can be accessed
 * using the `children` property. Whether a child scope can be accessed from
 * the parent scope is determined by each language's scoping rules.
 *
 * This interface is the base implementation of scope. Generally, most languages
 * will have subtypes of this interface that provide additional metadata about
 * the scope. For example, TypeScript scopes need to track whether the scope
 * represents a package, module, class, function, etc.
 *
 * Scopes are reactive values, which allows you to observe changes to the scope
 * within a reactive context.
 */
export abstract class OutputScope {
  static readonly declarationSpaces: Readonly<string[]> = [] as const;

  // my kingdom for decorators
  #name: string;
  /**
   * The name of the scope.
   */
  get name() {
    track(this, TrackOpTypes.GET, "name");
    return this.#name;
  }

  set name(name: string) {
    const old = this.#name;
    this.#name = name;
    trigger(this, TriggerOpTypes.SET, "name", name, old);
  }

  #id: number;
  /**
   * The unique id of this scope.
   */
  get id() {
    return this.#id;
  }

  #flags: OutputScopeFlags;
  /**
   * The flags that describe this scope.
   */
  get flags() {
    track(this, TrackOpTypes.GET, "flags");
    return this.#flags;
  }
  set flags(flags: OutputScopeFlags) {
    const old = this.#flags;
    this.#flags = flags;
    trigger(this, TriggerOpTypes.SET, "flags", flags, old);
  }

  // read only
  #metadata: Record<string, unknown>;
  get metadata() {
    return this.#metadata;
  }

  #parent?: OutputScope;

  get parent() {
    track(this, TrackOpTypes.GET, "parent");
    return this.#parent;
  }

  set parent(scope: OutputScope | undefined) {
    const old = this.#parent;

    if (old) {
      old.children.delete(this);
    }

    if (scope) {
      scope.children.add(this);
    }

    trigger(this, TriggerOpTypes.SET, "parent", scope, old);
    this.#parent = scope;
  }

  #spaces: Record<string, OutputSpace>;
  spaceFor(key: string): OutputSpace | undefined {
    return this.#spaces[key];
  }

  #children: Set<OutputScope>;
  /**
   * The scopes nested within this scope.
   */
  get children() {
    return this.#children;
  }

  #binder: Binder | undefined;
  /**
   * The binder that created this scope.
   */
  get binder() {
    return this.#binder;
  }

  [ReactiveFlags.SKIP] = this;

  constructor(
    name: string,
    parentScope: OutputScope | undefined,
    options: OutputScopeOptions = {},
  ) {
    this.#name = name;
    this.#id = scopeCount++;
    this.#flags = options.flags ?? OutputScopeFlags.None;
    this.#metadata = reactive(options.metadata ?? {});
    this.#binder = options.binder ?? useBinder();
    this.#children = shallowReactive(new Set());
    this.#parent = parentScope;
    effect(() => {
      this.#setOwnerSymbol(options.ownerSymbol?.movedTo ?? options.ownerSymbol);
    });

    if (this.#parent) {
      this.#parent.children.add(this);
    }

    const constructor = this.constructor as typeof OutputScope;

    this.#spaces = Object.fromEntries(
      constructor.declarationSpaces.map((spaceKey) => [
        spaceKey,
        new OutputDeclarationSpace(this, spaceKey, this.#binder),
      ]),
    );

    this.#binder?.notifyScopeCreated(this);

    trace(TracePhase.scope.create, () => `${formatScope(this)}`);
    traceEffect(TracePhase.scope.update, () => {
      return `${formatScope(this)}`;
    });
  }

  get spaces() {
    return Object.values(this.#spaces);
  }

  #ownerSymbol: OutputSymbol | undefined;
  /**
   * The symbol whose members are in scope. When an owner symbol is present,
   * this scope is considered a member scope, and does not provide its own
   * declaration spaces.
   */
  get ownerSymbol() {
    track(this, TrackOpTypes.GET, "ownerSymbol");
    return this.#ownerSymbol;
  }

  #setOwnerSymbol(value: OutputSymbol | undefined) {
    const old = this.#ownerSymbol;
    this.#ownerSymbol = value;
    trigger(this, TriggerOpTypes.SET, "ownerSymbol", value, old);
  }

  get isTransient() {
    if (!this.ownerSymbol) {
      return false;
    }

    return this.ownerSymbol.isTransient;
  }
  /**
   * Check if this is scope is a member scope. Member scopes have no member
   * spaces of their own, but instead put members of their owner symbol in
   * scope.
   */
  get isMemberScope() {
    return !!this.ownerSymbol;
  }

  [inspect.custom]() {
    return untrack(() => `${this.constructor.name} ${this.name}[${this.id}]`);
  }
}
