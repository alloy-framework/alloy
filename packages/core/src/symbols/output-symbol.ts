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
import { inspect } from "../inspect.js";
import { untrack } from "../reactivity.js";
import { isRefkey, refkey, type Refkey } from "../refkey.js";
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
  binder?: Binder;
  refkeys?: Refkey | Refkey[];
  metadata?: Record<string, unknown>;
  aliasTarget?: OutputSymbol;
  transient?: boolean;
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

  #name: string;
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

    this.#name = name;
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

  // Tell \@vue/reactivity that this symbol should never be wrapped in a reactive
  // proxy.
  [ReactiveFlags.SKIP] = true;

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: OutputSymbolOptions = {},
  ) {
    this.#binder = options.binder ?? useBinder();
    this.#name = name;
    this.#originalName = name;
    this.#id = symbolCount++;
    this.#spaces =
      Array.isArray(spaces) ? spaces
      : spaces === undefined ? []
      : [spaces];
    this.#aliasTarget = options.aliasTarget;
    this.#refkeys = shallowReactive(
      Array.isArray(options.refkeys) ? options.refkeys
      : isRefkey(options.refkeys) ? [options.refkeys]
      : [],
    );
    this.#metadata = reactive(options.metadata ?? {});
    this.#isTransient = !!options.transient;
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

  delete() {
    trace(TracePhase.symbol.delete, () => `${formatSymbolName(this)}`);
    if (this.#spaces) {
      this.#spaces.forEach((space) => space.delete(this));
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
  instantiateTo(
    targetSymbol: OutputSymbol,
    toSpaceKey: string,
    fromSpaceKey: string,
  ): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.instantiateTo(
        targetSymbol,
        toSpaceKey,
        fromSpaceKey,
      );
    }

    trace(TracePhase.symbol.instantiate, () => {
      return `${formatSymbolName(this)} -> ${formatSymbolName(targetSymbol)}`;
    });

    const toSpace = targetSymbol.memberSpaceFor(toSpaceKey);
    if (!toSpace) {
      throw new Error("Target space with key " + toSpaceKey + " doesn't exist");
    }
    const fromSpace = this.memberSpaceFor(fromSpaceKey);
    if (!fromSpace) {
      throw new Error(
        "Source space with key " + fromSpaceKey + " doesn't exist",
      );
    }

    fromSpace!.copyTo(toSpace, {
      createRefkeys(sourceSymbol) {
        const instantiationRks = [];
        for (const baseRk of targetSymbol.refkeys) {
          for (const sourceRk of sourceSymbol.refkeys) {
            instantiationRks.push(refkey(baseRk, sourceRk));
          }
        }

        return instantiationRks;
      },
    });
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
