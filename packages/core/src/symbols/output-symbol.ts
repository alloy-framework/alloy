import {
  isRef,
  reactive,
  ReactiveFlags,
  Ref,
  shallowReactive,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  watch,
} from "@vue/reactivity";
import type { Binder } from "../binder.js";
import { useBinder } from "../context/binder.js";
import { inspect } from "../inspect.js";
import { NamePolicyGetter } from "../name-policy.js";
import { untrack } from "../reactivity.js";
import { Namekey, type Refkey } from "../refkey.js";
import {
  formatSymbol,
  formatSymbolName,
  trace,
  traceEffect,
  TracePhase,
} from "../tracer.js";
import {
  OutputDeclarationSpace,
  OutputMemberSpace,
  OutputSpace,
} from "./output-space.js";
import { SymbolTable } from "./symbol-table.js";

export interface OutputSymbolOptions {
  /**
   * The binder instance associated with this symbol. Symbol updates and changes
   * will be reported to this binder. This binder will be able to find this
   * symbol via its refkey and other means. Without a binder, this symbol will
   * be unbound, which means it cannot be referenced by refkey.
   */
  binder?: Binder;

  /**
   * The refkey or refkeys associated with this symbol.
   */
  refkeys?: Refkey | Refkey[];

  /**
   * Arbitrary metadata about this symbol.
   */
  metadata?: Record<string, unknown>;

  /**
   * The symbol this symbol is an alias for.
   */
  aliasTarget?: OutputSymbol;

  /**
   * Whether this symbol is transient.
   */
  transient?: boolean;

  /**
   * The symbol that provides type information for this symbol. When present,
   * this symbol will not contain its own members, and instead members will be
   * provided by the type. This can be provided a Ref, in which case the type
   * will be the value of that ref.
   */
  type?: OutputSymbol | Ref<OutputSymbol | undefined>;

  /**
   * When provided, this symbol will be named according to the provided name
   * policy.
   *
   * @example
   *
   * ```ts
   * const classNamer = useNamePolicy().for("class");
   * const symbol = new BasicSymbol("my-class", { namePolicy: classNamer });
   * console.log(symbol.name); // "MyClass" (assuming a PascalCase class naming policy)
   * ```
   */
  namePolicy?: NamePolicyGetter;

  /**
   * Whether the name of this symbol should bypass the active name policy. When true,
   * the name of this symbol will be fixed, though it may conflict with other symbols which are
   * also ignoring the name policy.
   */
  ignoreNamePolicy?: boolean;

  /**
   * Whether the name of this symbol should bypass the active name conflict resolution.
   * When true, the name of this symbol will be fixed, though it may conflict with other symbols which are
   * also ignoring name conflict resolution.
   */
  ignoreNameConflict?: boolean;
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
export abstract class OutputSymbol {
  public static readonly memberSpaces: Readonly<string[]> = [];

  #originalName: string;
  /**
   * Read only. The requested name of this symbol. The symbol's actual name may
   * be different depending on naming policy or conflicts with other symbols.
   *
   * @readonly
   */
  get originalName() {
    return this.#originalName;
  }

  // this field is set by calling the name accessor.
  #name!: string;
  /**
   * The name of this symbol.
   *
   * @reactive
   */
  get name() {
    track(this, TrackOpTypes.GET, "name");
    return this.#name;
  }

  set name(name: string) {
    const old = this.#name;

    if (old === name) {
      return;
    }

    this.#name =
      this.#namePolicy && !this.#ignoreNamePolicy ?
        this.#namePolicy(name)
      : name;
    trigger(this, TriggerOpTypes.SET, "name", name, old);
  }

  #id: number;
  /**
   * The unique id of this symbol.
   *
   * @readonly
   */
  get id() {
    return this.#id;
  }

  #ignoreNamePolicy: boolean = false;
  /**
   * Whether the name of this symbol bypasses the active name policy. When true,
   * the name of this symbol will be fixed, though it may conflict with other
   * symbols which are also ignoring the name policy.
   *
   * @readonly
   */
  get ignoreNamePolicy() {
    return this.#ignoreNamePolicy;
  }

  #ignoreNameConflict: boolean = false;

  /**
   * Whether the name of this symbol bypasses the active name conflict
   * resolution. When true, the name of this symbol will be fixed, though it may
   * conflict with other symbols which are also ignoring name conflict
   * resolution.
   */
  get ignoreNameConflict() {
    return this.#ignoreNameConflict;
  }

  #memberSpaces: Record<string, OutputMemberSpace> = shallowReactive({});
  /**
   * The member spaces of this symbol.
   *
   * @readonly
   */
  get memberSpaces() {
    return Object.values(this.#memberSpaces);
  }

  /**
   * Get the member space for the given key.
   */
  memberSpaceFor(spaceKey: string): OutputMemberSpace | undefined {
    return this.#memberSpaces[spaceKey];
  }

  /**
   * The scope this symbol is in. When this symbol is a member symbol, this will
   * return undefined.
   *
   * @readonly
   */
  get scope() {
    if (this.isMemberSymbol) {
      return undefined;
    }

    if (this.spaces.length === 0) {
      return undefined;
    }

    return (this.spaces[0] as OutputDeclarationSpace).scope;
  }

  #spaces: OutputSpace[];
  /**
   * The declaration or member spaces this symbol belongs to.
   *
   * @reactive
   */
  get spaces(): OutputSpace[] {
    track(this, TrackOpTypes.GET, "spaces");
    return this.#spaces;
  }

  set spaces(spaces: OutputSpace[] | OutputSpace | undefined) {
    const old = this.#spaces;

    if (old === spaces) {
      return;
    }

    const spacesArray =
      spaces === undefined ? []
      : Array.isArray(spaces) ? spaces
      : [spaces];
    this.#handleNewSpaces(spacesArray, old);

    this.#spaces = spacesArray;

    trigger(this, TriggerOpTypes.SET, "spaces", spaces, old);
  }

  #handleNewSpaces(newSpaces: SymbolTable[], oldSpaces?: SymbolTable[]) {
    if (oldSpaces) {
      // ensure when changing scope that this symbol only belongs to one of them
      oldSpaces.forEach((oldSpace) => oldSpace.delete(this));
    }

    if (newSpaces) {
      newSpaces.forEach((newSpace) => newSpace.add(this));
    }
  }

  #binder: Binder | undefined;
  /**
   * The binder that is tracking this symbol.
   *
   * @readonly
   */
  get binder() {
    return this.#binder;
  }

  #refkeys: Refkey[];

  /**
   * The refkeys for this symbol.
   *
   * @reactive
   */
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

  #aliasTarget?: OutputSymbol;
  /**
   * The symbol that this symbol is an alias for.
   *
   * @readonly
   */
  get aliasTarget() {
    return this.#aliasTarget;
  }

  /**
   * If this symbol is an alias for another symbol, return the the aliased symbol. Otherwise, return this symbol.
   */
  dealias(): OutputSymbol {
    if (this.#aliasTarget) {
      return this.#aliasTarget.dealias();
    }
    return this;
  }

  /**
   * Whether this symbol is an alias for another symbol.
   *
   * @readonly
   */
  get isAlias() {
    return !!this.#aliasTarget;
  }

  #metadata: Record<string, unknown>;
  /**
   * An arbitrary bag of metadata for this symbol. This property is read only,
   * but the metadata is a reactive object.
   *
   * @readonly
   */
  get metadata() {
    return this.#metadata;
  }

  copyToSpace(space: OutputSpace) {
    const copy = this.copy();
    copy.spaces = space;
    return copy;
  }

  /**
   * Whether this symbol is a member of another symbol.
   *
   * @readonly
   */
  get isMemberSymbol() {
    return this.spaces[0] instanceof OutputMemberSpace;
  }

  /**
   * When this is a member symbol, this returns the symbol that this is symbol
   * is a member of.
   */
  get ownerSymbol(): OutputSymbol | undefined {
    if (!this.isMemberSymbol) {
      return undefined;
    }

    return (this.spaces[0] as OutputMemberSpace).symbol;
  }

  #isTransient: boolean;

  /**
   * Whether this symbol is a transient symbol. Transient symbols cannot be
   * referenced and are meant to be combined with other symbols.
   *
   * @readonly
   */
  get isTransient(): boolean {
    if (this.#isTransient) {
      return true;
    }

    if (this.ownerSymbol) {
      return this.ownerSymbol.isTransient;
    }

    return false;
  }

  #movedTo: OutputSymbol | undefined;
  /**
   * The symbol that this symbol's members have been moved to.
   *
   * @readonly
   * @reactive
   */
  get movedTo() {
    track(this, TrackOpTypes.GET, "movedTo");
    return this.#movedTo;
  }

  #setMovedTo(value: OutputSymbol | undefined) {
    this.#movedTo = value;
    trigger(this, TriggerOpTypes.SET, "movedTo");
  }

  /**
   * Whether this symbol's members have been moved to another symbol.
   *
   * @reactive
   */
  get isMoved() {
    return this.movedTo !== undefined;
  }

  #type: OutputSymbol | undefined;

  /**
   * The symbol which defines the type of this symbol. The type symbol provides
   * information about the value this symbol contains, such as what members it
   * has.
   *
   * @reactive
   */
  get type() {
    track(this, TrackOpTypes.GET, "type");
    return this.#type;
  }

  set type(value: OutputSymbol | Ref<OutputSymbol | undefined> | undefined) {
    if (isRef(value)) {
      watch(value, (newValue) => {
        const old = this.#type;
        this.#type = newValue && newValue.dealias();
        trigger(this, TriggerOpTypes.SET, "type", newValue, old);
      });
    } else {
      const old = this.#type;
      this.#type = value && value.dealias();
      trigger(this, TriggerOpTypes.SET, "type", value, old);
    }
  }

  /**
   * Whether this symbol has its symbol representing its type available.
   *
   * @readonly
   * @reactive
   */
  get hasTypeSymbol() {
    return this.type !== undefined;
  }

  #isTyped: boolean = false;

  /**
   * Whether this symbol's members are provided by a type symbol. The
   * `typeSymbol` property is this symbol. It may not be available yet, so check
   * `hasTypeSymbol`.
   */
  get isTyped() {
    return this.#isTyped;
  }

  #namePolicy: NamePolicyGetter | undefined;
  get namePolicy() {
    return this.#namePolicy;
  }

  // Tell \@vue/reactivity that this symbol should never be wrapped in a reactive
  // proxy.
  [ReactiveFlags.SKIP] = true;

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: OutputSymbolOptions = {},
  ) {
    this.#binder = options.binder ?? useBinder();
    this.#namePolicy = options.namePolicy;

    if (typeof name === "string") {
      this.#ignoreNameConflict = !!options.ignoreNameConflict;
      this.#ignoreNamePolicy = !!options.ignoreNamePolicy;
      this.name = name;
      this.#originalName = name;
      this.#refkeys = shallowReactive(
        this.#normalizeRefkeyOption(options.refkeys),
      );
    } else {
      this.#ignoreNameConflict =
        name.options.ignoreNameConflict ?? !!options.ignoreNameConflict;
      this.#ignoreNamePolicy =
        name.options.ignoreNamePolicy ?? !!options.ignoreNamePolicy;
      this.name = name.name;
      this.#originalName = name.name;
      this.#refkeys = shallowReactive([
        name,
        ...this.#normalizeRefkeyOption(options.refkeys),
      ]);
    }

    this.#id = symbolCount++;
    this.#spaces =
      Array.isArray(spaces) ? spaces
      : spaces === undefined ? []
      : [spaces];
    this.#aliasTarget = options.aliasTarget;
    this.#metadata = reactive(options.metadata ?? {});
    this.#isTransient = !!options.transient;
    this.#isTyped = !!options.type;
    this.type = options.type;

    this.#handleNewSpaces(this.#spaces);
    const constructor = this.constructor as typeof OutputSymbol;
    this.#memberSpaces = Object.fromEntries(
      constructor.memberSpaces.map((spaceKey) => [
        spaceKey,
        new OutputMemberSpace(this, spaceKey, this.#binder),
      ]),
    );

    trace(TracePhase.symbol.create, () => `${formatSymbol(this)}`);
    traceEffect(TracePhase.symbol.update, () => {
      return `${formatSymbol(this)}`;
    });
    this.#binder?.notifySymbolCreated(this);
  }

  #normalizeRefkeyOption(refkeys: Refkey | Refkey[] | undefined) {
    if (refkeys === undefined) {
      return [];
    } else if (Array.isArray(refkeys)) {
      return refkeys;
    } else {
      return [refkeys];
    }
  }

  delete() {
    trace(TracePhase.symbol.delete, () => `${formatSymbolName(this)}`);
    if (this.#spaces) {
      this.#spaces.forEach((space) => space.delete(this));
    }

    this.#binder?.notifySymbolDeleted(this);
  }

  /**
   * Move member symbols from this transient symbol to the target symbol. This is reactive -
   * whenever a member is added to this symbol, it will be moved to the target
   * symbol.
   */
  moveMembersTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.moveMembersTo(targetSymbol);
    }

    if (!this.isTransient) {
      throw new Error("Can only move members from transient symbols");
    }

    for (const sourceSpace of this.memberSpaces) {
      const targetSpace = targetSymbol.memberSpaceFor(sourceSpace.key);
      if (!targetSpace) {
        throw new Error(
          "Target symbol doesn't have member space " + sourceSpace.key,
        );
      }

      sourceSpace.moveTo(targetSpace);
    }

    this.#setMovedTo(targetSymbol);
  }

  /**
   * Copy the members of this symbol to the target symbol. This is reactive -
   * whenever a member is added to this symbol, it will be copied to the target
   * symbol.
   */
  copyMembersTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.copyMembersTo(targetSymbol);
    }

    for (const sourceSpace of this.memberSpaces) {
      const targetSpace = targetSymbol.memberSpaceFor(sourceSpace.key);
      if (!targetSpace) {
        throw new Error(
          "Target symbol doesn't have member space " + sourceSpace.key,
        );
      }

      sourceSpace.copyTo(targetSpace);
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
  abstract copy(): OutputSymbol;

  protected getCopyOptions() {
    return {
      binder: this.binder,
      aliasTarget: this.aliasTarget,
      metadata: this.metadata,
      transient: this.isTransient,
    };
  }

  protected initializeCopy(copy: OutputSymbol) {
    for (const sourceSpace of this.memberSpaces) {
      const targetSpace = copy.memberSpaceFor(sourceSpace.key);

      if (!targetSpace) {
        throw new Error("Target doesn't have space " + sourceSpace.key);
      }

      sourceSpace.copyTo(targetSpace);
    }

    watch(
      () => this.name,
      (newName) => (copy.name = newName),
    );
  }

  [inspect.custom]() {
    return untrack(() => `${this.constructor.name} "${this.name}"[${this.id}]`);
  }
}
