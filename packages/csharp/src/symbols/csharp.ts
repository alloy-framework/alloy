import {
  createSymbol,
  Namekey,
  OutputDeclarationSpace,
  OutputMemberSpace,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  watch,
} from "@alloy-js/core";
import { AccessModifiers, NonAccessModifiers } from "../modifiers.js";
import type { CSharpScope } from "../scopes/csharp.js";
import { NamespaceSymbol } from "./namespace.js";

export type DeclaredAccessibility =
  | "private"
  | "protected"
  | "internal"
  | "public";

export interface CSharpSymbolOptions extends OutputSymbolOptions {
  /**
   * The accessibility of the symbol.
   */
  accessibility?: DeclaredAccessibility;
  isOverride?: boolean;
  isAbstract?: boolean;
  isVirtual?: boolean;
  isStatic?: boolean;
  isSealed?: boolean;
  isExtern?: boolean;
  isReadOnly?: boolean;
  /**
   * Whether the value held by this symbol could be null.
   */
  isNullable?: boolean;
}

export type CSharpSymbolKinds =
  | "symbol"
  | "named-type"
  | "method"
  | "field"
  | "property"
  | "namespace"
  | "event";
/**
 * This is the base type for all symbols in C#.
 *
 * Many subtypes of this symbol exist for specific purposes. However, this symbol
 * may be used in cases where a more specific symbol is not required.
 *
 * @remarks
 *
 * This is roughly equivalent to the Roslyn ISymbol interface:
 * https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol?view=roslyn-dotnet-4.13.0
 */
export class CSharpSymbol extends OutputSymbol {
  public readonly symbolKind: CSharpSymbolKinds = "symbol";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: CSharpSymbolOptions = {},
  ) {
    super(name, spaces, options);

    this.#accessibility = options.accessibility;
    this.#isAbstract = options.isAbstract ?? false;
    this.#isVirtual = options.isVirtual ?? false;
    this.#isStatic = options.isStatic ?? false;
    this.#isOverride = options.isOverride ?? false;
    this.#isSealed = options.isSealed ?? false;
    this.#isExtern = options.isExtern ?? false;
    this.#isReadOnly = options.isReadOnly ?? false;
    this.#isNullable = options.isNullable; // undefined means unset, here.
    this.init();
  }

  get enclosingNamespace(): NamespaceSymbol | undefined {
    if (this.spaces.length === 0) {
      return undefined;
    }

    // todo: probably need to validate that a symbol can't belong to spaces in
    // multiple namespaces.
    const firstSpace = this.spaces[0];

    if (firstSpace instanceof OutputMemberSpace) {
      // this symbol is a member of something, so get the enclosing namespace from
      // the symbol.

      if (firstSpace.symbol.constructor.name === "NamespaceSymbol") {
        // this is a namespace symbol, so return the namespace symbol itself.
        // can't use instanceof here due to circular reference issues.
        return firstSpace.symbol as NamespaceSymbol;
      }

      return (firstSpace.symbol as CSharpSymbol).enclosingNamespace;
    } else if (firstSpace instanceof OutputDeclarationSpace) {
      // this symbol is in a lexical scope, so get the namespace symbol from the
      // scope.
      return (firstSpace.scope as CSharpScope).enclosingNamespace;
    }
    throw new Error("No place to get namespace symbol from");

    return undefined;
  }

  #accessibility: DeclaredAccessibility | undefined;
  get accessibility() {
    track(this, TrackOpTypes.GET, "accessibility");
    return this.#accessibility;
  }

  set accessibility(value: DeclaredAccessibility | undefined) {
    const old = this.#accessibility;
    if (old === value) {
      return;
    }

    this.#accessibility = value;

    trigger(this, TriggerOpTypes.SET, "accessibility", value, old);
  }

  copy() {
    const options = this.getCopyOptions();
    const binder = this.binder;
    const copy = createSymbol(CSharpSymbol, this.name, undefined, {
      ...options,
      binder,
      accessibility: this.#accessibility,
      isStatic: this.#isStatic,
      isVirtual: this.#isVirtual,
      isAbstract: this.#isAbstract,
      isOverride: this.#isOverride,
      isSealed: this.#isSealed,
      isExtern: this.#isExtern,
      isReadOnly: this.#isReadOnly,
    });
    this.initializeCopy(copy);

    watch(
      () => this.accessibility,
      (newAccessibility) => {
        copy.accessibility = newAccessibility;
      },
    );

    return copy;
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      kind: this.symbolKind,
      accessibility: this.accessibility,
      isAbstract: this.isAbstract,
      isVirtual: this.isVirtual,
      isOverride: this.isOverride,
      isStatic: this.isStatic,
      isSealed: this.isSealed,
      isExtern: this.isExtern,
      isReadOnly: this.isReadOnly,
      isNullable: this.isNullable,
    };
  }

  /**
   * Whether this symbol is static.
   */
  get isStatic(): boolean {
    track(this, TrackOpTypes.GET, "isStatic");
    return this.#isStatic;
  }

  set isStatic(value: boolean) {
    const old = this.#isStatic;
    if (old === value) {
      return;
    }

    this.#isStatic = value;

    trigger(this, TriggerOpTypes.SET, "isStatic", value, old);
  }
  #isStatic: boolean = false;

  /**
   * Whether this symbol is virtual.
   */
  get isVirtual(): boolean {
    track(this, TrackOpTypes.GET, "isVirtual");
    return this.#isVirtual;
  }
  set isVirtual(value: boolean) {
    const old = this.#isVirtual;
    if (old === value) {
      return;
    }

    this.#isVirtual = value;

    trigger(this, TriggerOpTypes.SET, "isVirtual", value, old);
  }

  #isVirtual: boolean = false;

  /**
   * Whether this symbol is abstract.
   */
  get isAbstract(): boolean {
    track(this, TrackOpTypes.GET, "isAbstract");
    return this.#isAbstract;
  }
  set isAbstract(value: boolean) {
    const old = this.#isAbstract;
    if (old === value) {
      return;
    }

    this.#isAbstract = value;

    trigger(this, TriggerOpTypes.SET, "isAbstract", value, old);
  }
  #isAbstract: boolean = false;

  /**
   * Whether this symbol is override.
   */
  get isOverride(): boolean {
    track(this, TrackOpTypes.GET, "isOverride");
    return this.#isOverride;
  }
  set isOverride(value: boolean) {
    const old = this.#isOverride;
    if (old === value) {
      return;
    }

    this.#isOverride = value;

    trigger(this, TriggerOpTypes.SET, "isOverride", value, old);
  }
  #isOverride: boolean = false;

  /**
   * Whether this symbol is sealed.
   */
  get isSealed(): boolean {
    track(this, TrackOpTypes.GET, "isSealed");
    return this.#isSealed;
  }
  set isSealed(value: boolean) {
    const old = this.#isSealed;
    if (old === value) {
      return;
    }

    this.#isSealed = value;

    trigger(this, TriggerOpTypes.SET, "isSealed", value, old);
  }
  #isSealed: boolean = false;

  /**
   * Whether this symbol is extern.
   */
  get isExtern(): boolean {
    track(this, TrackOpTypes.GET, "isExtern");
    return this.#isExtern;
  }
  set isExtern(value: boolean) {
    const old = this.#isExtern;
    if (old === value) {
      return;
    }

    this.#isExtern = value;

    trigger(this, TriggerOpTypes.SET, "isExtern", value, old);
  }
  #isExtern: boolean = false;

  /**
   * Whether this symbol is readonly.
   */
  get isReadOnly(): boolean {
    track(this, TrackOpTypes.GET, "isReadOnly");
    return this.#isReadOnly;
  }
  set isReadOnly(value: boolean) {
    const old = this.#isReadOnly;
    if (old === value) {
      return;
    }

    this.#isReadOnly = value;

    trigger(this, TriggerOpTypes.SET, "isReadOnly", value, old);
  }
  #isReadOnly: boolean = false;

  #isNullable: boolean | undefined = undefined;

  /**
   * Whether this symbol might contain null. True if this symbol has a
   * `typeSymbol` and that symbol is nullable, or else when this symbol has the
   * `nullable` option set.
   */
  get isNullable() {
    if (this.hasTypeSymbol && this.#isNullable === undefined) {
      return (this.type! as CSharpSymbol).isNullable;
    }

    track(this, TrackOpTypes.GET, "isNullable");
    return !!this.#isNullable;
  }

  set isNullable(value: boolean) {
    const old = this.#isNullable;
    if (old === value) {
      return;
    }

    this.#isNullable = value;

    trigger(this, TriggerOpTypes.SET, "isNullable", value, old);
  }
}

export function accessibilityFromProps(props: AccessModifiers) {
  for (const key of ["public", "internal", "protected", "private"] as const) {
    if (props[key]) {
      return key;
    }
  }

  return "private";
}

export function nonAccessibilityFromProps(
  props: NonAccessModifiers,
): CSharpSymbolOptions {
  return {
    isOverride: props.override ?? false,
    isAbstract: props.abstract ?? false,
    isVirtual: props.virtual ?? false,
    isStatic: props.static ?? false,
    isSealed: props.sealed ?? false,
    isExtern: props.extern ?? false,
    isReadOnly: props.readOnly ?? false,
  };
}
