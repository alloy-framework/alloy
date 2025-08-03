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
import { inspect } from "util";
import type { Binder } from "../binder.js";
import { useBinder } from "../context/binder.js";
import { untrack } from "../reactivity.js";
import { isRefkey, refkey, type Refkey } from "../refkey.js";
import {
  formatSymbol,
  formatSymbolName,
  trace,
  traceEffect,
  TracePhase,
} from "../tracer.js";
import { OutputSymbolFlags } from "./flags.js";
import {
  OutputDeclarationSpace,
  OutputMemberSpace,
  OutputSpace,
} from "./output-space.js";

export interface OutputSymbolOptions {
  binder?: Binder;
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
export abstract class OutputSymbol {
  public static readonly memberSpaces: Readonly<string[]> = [];

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

  #memberSpaces: Record<string, OutputMemberSpace> = shallowReactive({});
  get memberSpaces() {
    return Object.values(this.#memberSpaces);
  }

  memberSpaceFor(spaceKey: string): OutputMemberSpace | undefined {
    return this.#memberSpaces[spaceKey];
  }

  set flags(flags: OutputSymbolFlags) {
    const old = this.#flags;

    if (old === flags) {
      return;
    }

    this.#flags = flags;
    trigger(this, TriggerOpTypes.SET, "flags", flags, old);
  }

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

  #handleNewSpaces(newSpaces: OutputSpace[], oldSpaces?: OutputSpace[]) {
    if (oldSpaces) {
      // ensure when changing scope that this symbol only belongs to one of them
      oldSpaces.forEach((oldSpace) => oldSpace.symbols.delete(this));
    }

    if (newSpaces) {
      newSpaces.forEach((newSpace) => newSpace.symbols.add(this));
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

  #aliasTarget?: OutputSymbol;
  get aliasTarget() {
    return this.#aliasTarget;
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

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: OutputSymbolOptions = {},
  ) {
    this.#binder = options.binder ?? useBinder();
    this.#name = name;
    this.#originalName = name;
    this.#id = symbolCount++;
    this.#flags = options.flags ?? OutputSymbolFlags.None;
    this.#spaces =
      Array.isArray(spaces) ? spaces
      : spaces === undefined ? []
      : [spaces];

    this.#aliasTarget = options.aliasTarget;

    if (this.#aliasTarget) {
      this.#flags |= OutputSymbolFlags.Alias;
    }

    this.#refkeys = shallowReactive(
      Array.isArray(options.refkeys) ? options.refkeys
      : isRefkey(options.refkeys) ? [options.refkeys]
      : [],
    );
    this.#metadata = reactive(options.metadata ?? {});
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
      this.#spaces.forEach((space) => space.symbols.delete(this));
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
        fromSpaceKey,
        toSpaceKey,
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
   * Move member symbols from this transient symbol to the target symbol.
   */
  moveMembersTo(targetSymbol: OutputSymbol): void {
    if (this.#aliasTarget) {
      return this.#aliasTarget.moveMembersTo(targetSymbol);
    }

    if (!(this.flags & OutputSymbolFlags.Transient)) {
      throw new Error("Can only move members from transient symbols");
    }
    console.log("Member spaces", this.memberSpaces);
    for (const sourceSpace of this.memberSpaces) {
      const targetSpace = targetSymbol.memberSpaceFor(sourceSpace.key);
      if (!targetSpace) {
        throw new Error(
          "Target symbol doesn't have member space " + sourceSpace.key,
        );
      }

      sourceSpace.moveTo(targetSpace);
    }
  }

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

  copyToSpace(space: OutputSpace) {
    const copy = this.copy();
    copy.spaces = space;
    return copy;
  }

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

  get isTransient(): boolean {
    if (this.flags & OutputSymbolFlags.Transient) {
      return true;
    }

    if (this.ownerSymbol) {
      return this.ownerSymbol.isTransient;
    }

    return false;
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
      flags: this.flags,
      metadata: this.metadata,
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
    watch(
      () => this.flags,
      (newFlags) => (copy.flags = newFlags),
    );
  }

  [inspect.custom]() {
    return untrack(
      () => `${this.constructor.name} Symbol ${this.name}[${this.id}]`,
    );
  }
}
