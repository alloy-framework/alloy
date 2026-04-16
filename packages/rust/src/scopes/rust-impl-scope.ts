import { type OutputScopeOptions } from "@alloy-js/core";
import type { RustOutputSymbol } from "../symbols/rust-output-symbol.js";
import { RustScopeBase } from "./rust-scope.js";

export class RustImplScope extends RustScopeBase {
  public static readonly declarationSpaces: readonly string[] = [];

  constructor(
    ownerSymbol: RustOutputSymbol,
    parent: RustScopeBase | undefined,
    options: OutputScopeOptions = {},
  ) {
    super(`${ownerSymbol.name} impl scope`, parent, {
      ownerSymbol,
      ...options,
    });
  }

  get ownerSymbol(): RustOutputSymbol {
    return super.ownerSymbol as RustOutputSymbol;
  }

  get members() {
    return this.ownerSymbol.members;
  }
}
