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
import { useBinder } from "../context/binder.js";
import { useScope } from "../context/scope.js";
import type { ReactiveUnionSetOptions } from "../reactive-union-set.js";
import {
  formatScope,
  formatScopeName,
  trace,
  traceEffect,
  TracePhase,
} from "../tracer.js";
import type { Binder } from "./binder.js";
import { OutputScopeFlags } from "./flags.js";
import type { OutputSymbol } from "./output-symbol.js";
import type { Refkey } from "./refkey.js";
import { SymbolTable } from "./symbol-table.js";

let scopeCount = 0;

export interface OutputScopeOptions {
  flags?: OutputScopeFlags;
  kind?: string;
  metadata?: Record<string, unknown>;
  parent?: OutputScope;
  owner?: OutputSymbol;
  binder?: Binder;

  /**
   * Unique id for this scope. If not provided a unique id is created
   * automatically.
   */
  id?: number;
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
export class OutputScope {
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

  #kind: string;

  /**
   * The kind of scope. Subtypes will likely provide a set of known scope kinds.
   * The kind is not used by the binder itself.
   */
  get kind() {
    return this.#kind;
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
  /**
   * The container of this scope. This is only defined for scopes which don't
   * have the {@link OutputScopeFlags.StaticMemberScope} or
   * {@link OutputScopeFlags.InstanceMemberScope} flag.
   */
  get parent() {
    return this.#parent;
  }

  #owner?: OutputSymbol;
  /**
   * The symbol that owns this scope. This is only defined for scopes that have
   * the {@link OutputScopeFlags.StaticMemberScope} or
   * {@link OutputScopeFlags.InstanceMemberScope} flag.
   */
  get owner() {
    return this.#owner;
  }

  #symbols: SymbolTable;
  /**
   * The symbols defined within this scope.
   */
  get symbols() {
    return this.#symbols;
  }

  #symbolsByRefkey: ReadonlyMap<Refkey, OutputSymbol>;
  /**
   * The symbols defined within this scope, indexed by refkey.
   */
  get symbolsByRefkey() {
    return this.#symbolsByRefkey;
  }

  #symbolNames: ReadonlySet<string>;
  get symbolNames() {
    return this.#symbolNames;
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

  [ReactiveFlags.SKIP] = true as const;
  [ReactiveFlags.IS_SHALLOW] = true as const;

  constructor(name: string, options: OutputScopeOptions = {}) {
    this.#name = name;
    this.#id = options.id ?? scopeCount++;
    this.#flags = options.flags ?? OutputScopeFlags.None;
    this.#kind = options.kind ?? "scope";
    this.#metadata = reactive(options.metadata ?? {});
    this.#binder = options.binder ?? useBinder();
    this.#owner = options.owner;
    this.#children = shallowReactive(new Set());

    if (this.#flags & OutputScopeFlags.MemberScope) {
      if (!this.#owner) {
        throw new Error("Member scopes must have an owner");
      }
    } else {
      if (!this.#parent) {
        this.#parent =
          options.parent ?? useScope() ?? this.#binder?.globalScope;
      }
      if (this.#parent) {
        // not global scope
        this.#parent.children.add(this);
      }
    }

    this.#symbols = new SymbolTable(this, {
      nameConflictResolver: this.#binder?.nameConflictResolver,
    });
    this.#symbolsByRefkey = this.#symbols.createIndex((s) => s.refkeys);
    this.#symbolNames = this.#symbols.createDerivedSet((s) => {
      return s.name;
    });

    if (this.#parent) {
      this.#parent.children.add(this);
    }

    this.#binder?.notifyScopeCreated(this);

    trace(TracePhase.scope.create, () => `${formatScope(this)}`);
    traceEffect(TracePhase.scope.update, () => {
      return `${formatScope(this)}`;
    });
  }

  moveSymbolsFrom(
    source: OutputScope,
    options?: ReactiveUnionSetOptions<OutputSymbol>,
  ) {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `Moving symbols from ${formatScopeName(source)} to ${formatScopeName(this)}`,
    );
    this.#symbols.addSubset(source.#symbols, {
      onAdd: (symbol) => {
        if (options?.onAdd) {
          return options.onAdd(symbol);
        }
        symbol.scope = this;
        return symbol;
      },
      onDelete: (symbol) => {
        if (options?.onDelete) {
          options.onDelete(symbol);
        }
      },
    });
  }

  copySymbolsFrom(
    source: OutputScope,
    options?: ReactiveUnionSetOptions<OutputSymbol>,
  ) {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `Copying symbols from ${formatScopeName(source)} to ${formatScopeName(this)}`,
    );
    this.#symbols.addSubset(source.#symbols, {
      onAdd: (symbol) => {
        if (options?.onAdd) {
          return options.onAdd(symbol);
        }
        return symbol.copyToScope(this);
      },
      onDelete: (symbol) => {
        if (options?.onDelete) {
          options.onDelete(symbol);
        }
      },
    });
  }

  clone(options: { parent?: OutputScope; owner?: OutputSymbol } = {}) {
    if (this.#flags & OutputScopeFlags.MemberScope && !options.owner) {
      throw new Error("Member scope clones must specify an owner symbol");
    } else if (this.#flags & ~OutputScopeFlags.MemberScope && !options.parent) {
      throw new Error("Non-member scope clones must specify a parent scope");
    }
    const clone = new OutputScope(this.#name, {
      binder: this.#binder,
      flags: this.#flags,
      kind: this.#kind,
      metadata: this.#metadata,
      parent: options.parent,
      owner: options.owner,
    });

    watch(
      () => this.name,
      (newName) => (clone.name = newName),
    );
    watch(
      () => this.flags,
      (newFlags) => (clone.flags = newFlags),
    );
    // todo: this should be reactive, but cloning non-member scopes
    // seems like a very rare thing.
    for (const child of this.#children) {
      clone.children.add(child.clone());
    }

    clone.copySymbolsFrom(this);

    return clone;
  }

  toJSON(): SerializedOutputScope {
    return {
      id: this.id,
      name: this.name,
      kind: this.kind,
      flags: this.flags,
      symbols: Array.from(this.symbols).map((s) => s.id),
      children: Array.from(this.children).map((c) => c.id),
      parent: this.parent?.id ?? null,
      owner: this.owner?.id ?? null,
      metadata: this.metadata,
    };
  }
}

export interface SerializedOutputScope {
  id: number;
  name: string;
  kind: string;
  flags: OutputScopeFlags;
  symbols: number[];
  children: number[];
  parent: number | null;
  owner: number | null;
  metadata: Record<string, unknown>;
}
