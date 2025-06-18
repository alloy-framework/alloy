import {
  reactive,
  ReactiveFlags,
  shallowReactive,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@vue/reactivity";
import type { Binder } from "../binder.js";
import { useBinder } from "../context/binder.js";
import { formatScope, trace, traceEffect, TracePhase } from "../tracer.js";
import { OutputScopeFlags } from "./flags.js";
import { OutputDeclarationSpace, OutputSpace } from "./output-space.js";

let scopeCount = 0;

export interface OutputScopeOptions {
  flags?: OutputScopeFlags;
  metadata?: Record<string, unknown>;
  binder?: Binder;
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

  /*
  copySymbolsTo(targetScope: OutputScope) {
    trace(
      TracePhase.scope.copySymbols,
      () =>
        `Copying symbols from ${formatScopeName(this)} to ${formatScopeName(targetScope)}`,
    );
    for (const space of this.spaces) {
      const targetSpace = targetScope.spaceFor(space.key);
      if (!targetSpace) {
        throw new Error(`Target scope does not have space ${space.key}`);
      }

      console.log("Copying space key " + space.key);
      space.copyTo(targetSpace);
    }
  }

  abstract copy(): OutputScope;

  copyTo(parentScope: OutputScope): OutputScope {
    const copy = this.copy();
    copy.parent = parentScope;
    return copy;
  }
  */
  /**
   * Copies this symbol to the provided copy symbol. This method only copies
   * child scopes, symbols in declaration spaces, name, and flags. Subclasses
   * should copy any additional fields that are needed.
   */
  /*
  protected initializeCopy(copy: OutputScope) {
    watch(
      () => this.name,
      (newName) => (copy.name = newName),
    );
    watch(
      () => this.flags,
      (newFlags) => (copy.flags = newFlags),
    );

    // todo: this should be reactive, but cloning non-member scopes
    // seems like a very rare thing.
    for (const child of this.#children) {
      copy.children.add(child.copyTo(copy));
    }

    this.copySymbolsTo(copy);
  }
  */
  /**
   * Get options for creating a new base OutputScope based on this scope's
   * non-reactive values. Does not copy symbols or scopes, see initializeCopy
   * for that functionality.
   */
  /*
  protected getCopyOptions(): OutputScopeOptions {
    return {
      binder: this.#binder,
      flags: this.#flags,
      metadata: this.#metadata,
    };
  }
    */

  get spaces() {
    return Object.values(this.#spaces);
  }
}
