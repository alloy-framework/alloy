import {
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
import { GoScope } from "../scopes/go.js";
import { PackageSymbol } from "./package.js";

/**
 * Options for creating a Go symbol.
 */
export interface GoSymbolOptions extends OutputSymbolOptions {
  /**
   * Whether this symbol represents a pointer type.
   */
  isPointer?: boolean;

  /**
   * Whether this symbol can be exported. If true, the symbol's name will be
   * automatically adjusted to match the `isExported` property.
   */
  canExport?: boolean;

  /**
   * Whether this symbol is exported. If `canExport` is true, and this property
   * is set, the symbol's name will be capitalized (exported) or lowercased
   * (unexported) to match this property.
   */
  isExported?: boolean;
}

export type GoSymbolKinds =
  | "symbol"
  | "named-type"
  | "function"
  | "field"
  | "package";

function ensureNameExport(
  name: string,
  canExport: boolean | undefined,
  isExported: boolean | undefined,
  isPointer: boolean | undefined,
): string {
  isExported = isExported ?? false;
  const actualExported = canExport ? isNameExported(name) : isExported;
  if (isPointer) {
    if (name.charAt(0) === "*") {
      if (actualExported === isExported) return name;
      if (isExported) {
        return "*" + name.charAt(1).toUpperCase() + name.slice(2);
      } else {
        return "*" + name.charAt(1).toLowerCase() + name.slice(2);
      }
    } else {
      if (actualExported === isExported) return "*" + name;
      if (isExported) {
        return "*" + name.charAt(0).toUpperCase() + name.slice(1);
      } else {
        return "*" + name.charAt(0).toLowerCase() + name.slice(1);
      }
    }
  } else {
    if (name.charAt(0) === "*") {
      if (actualExported === isExported) return name.slice(1);
      if (isExported) {
        return name.charAt(1).toUpperCase() + name.slice(2);
      } else {
        return name.charAt(1).toLowerCase() + name.slice(2);
      }
    } else {
      if (actualExported === isExported) return name;
      if (isExported) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      } else {
        return name.charAt(0).toLowerCase() + name.slice(1);
      }
    }
  }
}

export function isNameExported(name: string): boolean {
  let firstChar = name.charAt(0);
  if (firstChar === "*") {
    firstChar = name.charAt(1);
  }
  return (
    firstChar.toLowerCase() !== firstChar &&
    firstChar.toUpperCase() === firstChar
  );
}

/**
 * This is the base type for all symbols in Go.
 *
 * Many subtypes of this symbol exist for specific purposes. However, this symbol
 * may be used in cases where a more specific symbol is not required.
 */
export class GoSymbol extends OutputSymbol {
  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: GoSymbolOptions = {},
  ) {
    name = ensureNameExport(
      typeof name === "string" ? name : name.name,
      options.canExport,
      options.isExported,
      options.isPointer,
    );
    super(name, spaces, options);
    this.#isPointer = options.isPointer ?? false;
    this.#canExport = options.canExport ?? false;
    this.#isExported = options.isExported ?? false;
    watch(
      [
        () => this.name,
        () => this.canExport,
        () => this.isExported,
        () => this.isPointer,
      ],
      () => {
        const oldName = this.name;
        const newName = ensureNameExport(
          this.name,
          this.canExport,
          this.isExported,
          this.isPointer,
        );
        if (oldName !== newName) {
          this.name = newName;
        }
      },
    );
  }

  #isPointer: boolean = false;
  /**
   * Whether this symbol represents a pointer type.
   */
  get isPointer() {
    track(this, TrackOpTypes.GET, "isPointer");
    return this.#isPointer;
  }
  set isPointer(value: boolean) {
    const old = this.#isPointer;
    if (old === value) {
      return;
    }
    this.#isPointer = value;
    trigger(this, TriggerOpTypes.SET, "isPointer", value, old);
  }

  #canExport: boolean;
  /**
   * Whether this symbol can be exported. If true, the symbol's name will be
   * automatically adjusted to match the `isExported` property.
   */
  get canExport() {
    track(this, TrackOpTypes.GET, "canExport");
    return this.#canExport;
  }
  set canExport(value: boolean) {
    const old = this.#canExport;
    if (old === value) {
      return;
    }
    this.#canExport = value;
    trigger(this, TriggerOpTypes.SET, "canExport", value, old);
  }

  #isExported: boolean;
  /**
   * Whether this symbol is exported. If `canExport` is true, and this property
   * is set, the symbol's name will be capitalized (exported) or lowercased
   * (unexported) to match this property.
   */
  get isExported(): boolean {
    track(this, TrackOpTypes.GET, "isExported");
    return this.#isExported;
  }
  set isExported(value: boolean) {
    const old = this.#isExported;
    if (old === value) {
      return;
    }
    this.#isExported = value;
    trigger(this, TriggerOpTypes.SET, "isExported", value, old);
  }

  get enclosingPackage(): PackageSymbol | undefined {
    if (this.spaces.length === 0) {
      return undefined;
    }

    // todo: probably need to validate that a symbol can't belong to spaces in
    // multiple packages.
    const firstSpace = this.spaces[0];

    if (firstSpace instanceof OutputMemberSpace) {
      // this symbol is a member of something, so get the enclosing package from
      // the symbol.

      if (firstSpace.symbol.constructor.name === "PackageSymbol") {
        // this is a package symbol, so return the package symbol itself.
        // can't use instanceof here due to circular reference issues.
        return firstSpace.symbol as PackageSymbol;
      }

      return (firstSpace.symbol as GoSymbol).enclosingPackage;
    } else if (firstSpace instanceof OutputDeclarationSpace) {
      // this symbol is in a lexical scope, so get the package symbol from the scope.
      return (firstSpace.scope as GoScope).enclosingPackage;
    }
    throw new Error("No place to get package symbol from");
  }

  protected getGoCopyOptions(): GoSymbolOptions {
    return {
      ...this.getCopyOptions(),
      isPointer: this.#isPointer,
      canExport: this.#canExport,
      isExported: this.#isExported,
    };
  }

  protected initializeGoCopy(copy: GoSymbol) {
    this.initializeCopy(copy);
    watch(
      () => this.isExported,
      (newExported) => {
        copy.isExported = newExported;
      },
    );
    watch(
      () => this.canExport,
      (newCanExport) => {
        copy.canExport = newCanExport;
      },
    );
    watch(
      () => this.isPointer,
      (newPointer) => {
        copy.isPointer = newPointer;
      },
    );
  }

  copy(): OutputSymbol {
    const options = this.getGoCopyOptions();
    const copy = new GoSymbol(this.name, undefined, options);
    this.initializeGoCopy(copy);
    return copy;
  }
}
