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
import { inspect } from "../inspect.js";
import { effect, untrack } from "../reactivity.js";
import { OutputDeclarationSpace, OutputSpace } from "./output-space.js";
import { OutputSymbol } from "./output-symbol.js";

let scopeCount = 0;

export interface OutputScopeOptions {
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

  #name: string;
  /**
   * The name of the scope.
   *
   * @reactive
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
   *
   * @readonly
   */
  get id() {
    return this.#id;
  }

  // read only
  #metadata: Record<string, unknown>;
  /**
   * Arbitrary metadata associated with this scope. This property is not
   * reactive but the metadata object is a reactive object.
   *
   * @readonly
   */
  get metadata() {
    return this.#metadata;
  }

  #parent?: OutputScope;

  /**
   * The parent scope of this scope. Undefined if this is a root scope.
   *
   * @reactive
   */
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

  #spaces: Record<string, OutputDeclarationSpace>;

  /**
   * Get the declaration space for the given key.
   */
  spaceFor(key: string): OutputSpace | undefined {
    return this.#spaces[key];
  }

  #children: Set<OutputScope>;
  /**
   * The scopes nested within this scope.
   *
   * @readonly
   */
  get children() {
    return this.#children;
  }

  #binder: Binder | undefined;
  /**
   * The binder that created this scope.
   *
   * @readonly
   */
  get binder() {
    return this.#binder;
  }

  [ReactiveFlags.SKIP] = true;

  constructor(
    name: string,
    parentScope: OutputScope | undefined,
    options: OutputScopeOptions = {},
  ) {
    this.#name = name;
    this.#id = scopeCount++;
    this.#metadata = reactive(options.metadata ?? {});
    this.#binder = options.binder ?? useBinder();
    this.#children = shallowReactive(new Set());
    this.#parent = parentScope;
    effect(
      () => {
        this.#setOwnerSymbol(
          options.ownerSymbol?.movedTo ?? options.ownerSymbol,
        );
      },
      undefined,
      {
        debug: {
          name: "outputScope:ownerSymbol",
          type: "symbol",
        },
      },
    );

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

    // Notify binder so resolution tracking works even without createScope
    this.#binder?.notifyScopeCreated(this);
  }

  /**
   * Get all the declaration spaces in this scope.
   *
   * @readonly
   */
  get spaces() {
    return Object.values(this.#spaces);
  }

  #ownerSymbol: OutputSymbol | undefined;
  /**
   * The symbol whose members are in scope. When an owner symbol is present,
   * this scope is considered a member scope, and does not provide its own
   * declaration spaces.
   *
   * @readonly
   * @reactive
   */
  get ownerSymbol() {
    track(this, TrackOpTypes.GET, "ownerSymbol");
    return this.#ownerSymbol;
  }

  get debugInfo(): Record<string, unknown> {
    return {};
  }

  #setOwnerSymbol(value: OutputSymbol | undefined) {
    const old = this.#ownerSymbol;
    this.#ownerSymbol = value;
    trigger(this, TriggerOpTypes.SET, "ownerSymbol", value, old);
  }

  /**
   * Whether this scope is a transient scope. Transient scopes are used for
   * temporary values that are to be combined with other non-transient symbols.
   * Scopes are transient when their owner symbol is transient.
   *
   * @readonly
   */
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
   *
   * @readonly
   * @reactive
   */
  get isMemberScope() {
    return !!this.ownerSymbol;
  }

  [inspect.custom]() {
    const ownerSymbol =
      this.ownerSymbol ? ` for ${inspect(this.ownerSymbol)}` : "";
    return untrack(
      () => `${this.constructor.name} ${this.name}[${this.id}]${ownerSymbol}`,
    );
  }

  toString() {
    return untrack(() => {
      const ownerSymbol = this.ownerSymbol ? ` for ${this.ownerSymbol}` : "";
      return `${this.constructor.name} ${this.name}[${this.id}]${ownerSymbol}`;
    });
  }
}
