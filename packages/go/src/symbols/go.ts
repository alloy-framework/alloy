import {
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

export interface GoSymbolOptions extends OutputSymbolOptions {
  pointer?: boolean;
  canExport?: boolean;
  exported?: boolean;
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
  exported: boolean | undefined,
  pointer: boolean | undefined,
): string {
  exported = exported ?? false;
  const actualExported = canExport ? isNameExported(name) : exported;
  if (pointer) {
    if (name.charAt(0) === "*") {
      if (actualExported === exported) return name;
      if (exported) {
        return "*" + name.charAt(1).toUpperCase() + name.slice(2);
      } else {
        return "*" + name.charAt(1).toLowerCase() + name.slice(2);
      }
    } else {
      if (actualExported === exported) return "*" + name;
      if (exported) {
        return "*" + name.charAt(0).toUpperCase() + name.slice(1);
      } else {
        return "*" + name.charAt(0).toLowerCase() + name.slice(1);
      }
    }
  } else {
    if (name.charAt(0) === "*") {
      if (actualExported === exported) return name.slice(1);
      if (exported) {
        return name.charAt(1).toUpperCase() + name.slice(2);
      } else {
        return name.charAt(1).toLowerCase() + name.slice(2);
      }
    } else {
      if (actualExported === exported) return name;
      if (exported) {
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
    name: string,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: GoSymbolOptions = {},
  ) {
    name = ensureNameExport(
      name,
      options.canExport,
      options.exported,
      options.pointer,
    );
    super(name, spaces, options);
    this.#pointer = options.pointer ?? false;
    this.#canExport = options.canExport ?? false;
    this.#exported = options.exported ?? false;
    watch(
      [() => this.canExport, () => this.exported, () => this.pointer],
      () => {
        this.name = ensureNameExport(
          this.name,
          this.canExport,
          this.exported,
          this.pointer,
        );
      },
    );
  }

  get name() {
    return super.name;
  }
  set name(value: string) {
    super.name = ensureNameExport(
      value,
      this.canExport,
      this.exported,
      this.pointer,
    );
  }

  #pointer: boolean = false;
  get pointer() {
    track(this, TrackOpTypes.GET, "pointer");
    return this.#pointer;
  }
  set pointer(value: boolean) {
    const old = this.#pointer;
    if (old === value) {
      return;
    }
    this.#pointer = value;
    trigger(this, TriggerOpTypes.SET, "pointer", value, old);
  }

  #canExport: boolean;
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

  #exported: boolean;
  get exported(): boolean {
    track(this, TrackOpTypes.GET, "exported");
    return this.#exported;
  }
  set exported(value: boolean) {
    const old = this.#exported;
    if (old === value) {
      return;
    }
    this.#exported = value;
    trigger(this, TriggerOpTypes.SET, "exported", value, old);
  }

  get enclosingPackage(): PackageSymbol | undefined {
    if (this.spaces.length === 0) {
      return undefined;
    }

    // todo: probably need to validate that a symbol can't belong to spaces in
    // multiple packages.
    const firstSpace = this.spaces[0];

    if (firstSpace instanceof OutputMemberSpace) {
      // this symbol is a member of something, so get the enclosing namespace from
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
      pointer: this.#pointer,
      canExport: this.#canExport,
      exported: this.#exported,
    };
  }

  protected initializeGoCopy(copy: GoSymbol) {
    this.initializeCopy(copy);
    watch(
      () => this.exported,
      (newExported) => {
        copy.exported = newExported;
      },
    );
    watch(
      () => this.pointer,
      (newPointer) => {
        copy.pointer = newPointer;
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
