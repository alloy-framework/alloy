import type { OutputScopeOptions } from "@alloy-js/core";
import { OutputScope } from "@alloy-js/core";

import type { PackageSymbol } from "../symbols/package.js";

export class GoScope extends OutputScope {
  constructor(
    name: string,
    parent: GoScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
    this.#packageSymbol = parent?.enclosingPackage;
  }

  #packageSymbol: PackageSymbol | undefined;
  get enclosingPackage() {
    return this.#packageSymbol;
  }
}
