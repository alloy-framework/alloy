import {
  Namekey,
  OutputDeclarationSpace,
  OutputMemberSpace,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
} from "@alloy-js/core";
import { GoScope } from "../scopes/go.js";
import { PackageSymbol } from "./package.js";

/**
 * Options for creating a Go symbol.
 */
export interface GoSymbolOptions extends OutputSymbolOptions {}

export type GoSymbolKinds =
  | "symbol"
  | "named-type"
  | "function"
  | "field"
  | "package";

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
    super(name, spaces, options);
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
    };
  }

  protected initializeGoCopy(copy: GoSymbol) {
    this.initializeCopy(copy);
  }

  copy(): OutputSymbol {
    const options = this.getGoCopyOptions();
    const copy = new GoSymbol(this.name, undefined, options);
    this.initializeGoCopy(copy);
    return copy;
  }
}
