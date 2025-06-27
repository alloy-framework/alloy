import { OutputSymbolOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "./named-type.js";

export interface CSharpNamespaceSymbolOptions extends OutputSymbolOptions {
  isGlobal?: boolean;
}

export class CSharpNamespaceSymbol extends NamedTypeSymbol {
  public readonly symbolKind = "namespace";
  constructor(
    name: string,
    parentNamespace?: CSharpNamespaceSymbol,
    options?: CSharpNamespaceSymbolOptions,
  ) {
    const space = parentNamespace?.members;
    super(name, space, "namespace", options);

    this.#isGlobal = !!options?.isGlobal;
  }

  #isGlobal: boolean;
  get isGlobal() {
    return this.#isGlobal;
  }

  copy() {
    const options = this.getCopyOptions();
    const copy = new CSharpNamespaceSymbol(this.name, undefined, {
      ...options,
      isGlobal: this.#isGlobal,
    });
    this.initializeCopy(copy);
    return copy;
  }
}
