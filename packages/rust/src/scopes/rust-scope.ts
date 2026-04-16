import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import type { RustOutputSymbol } from "../symbols/rust-output-symbol.js";

export class RustScopeBase extends OutputScope {
  constructor(
    name: string,
    parent: RustScopeBase | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
    this.#crateScope = parent?.enclosingCrate;
    this.#moduleScope = parent?.enclosingModule;
  }

  #crateScope: RustScopeBase | undefined;
  get enclosingCrate() {
    return this.#crateScope;
  }

  #moduleScope: RustScopeBase | undefined;
  get enclosingModule() {
    return this.#moduleScope;
  }

  get ownerSymbol(): RustOutputSymbol | undefined {
    return super.ownerSymbol as RustOutputSymbol | undefined;
  }
}
