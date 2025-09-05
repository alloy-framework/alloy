import { Namekey, OutputSymbolOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "./named-type.js";

export interface NamespaceSymbolOptions extends OutputSymbolOptions {
  isGlobal?: boolean;
}

/**
 * A symbol for a namespace in C#.
 */
export class NamespaceSymbol extends NamedTypeSymbol {
  public readonly symbolKind = "namespace";
  constructor(
    name: string | Namekey,
    parentNamespace?: NamespaceSymbol,
    options?: NamespaceSymbolOptions,
  ) {
    const space = parentNamespace?.members;

    super(name, space, "namespace", options);

    this.#isGlobal = !!options?.isGlobal;
  }

  #isGlobal: boolean;
  /**
   * Whether this symbol is the global namespace symbol.
   */
  get isGlobal() {
    return this.#isGlobal;
  }

  getFullyQualifiedName(options: { omitGlobal?: boolean } = {}): string {
    const parts = [];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: NamespaceSymbol | undefined = this;

    while (current && !current.isGlobal) {
      parts.unshift(current.name);
      current = current.ownerSymbol as NamespaceSymbol | undefined;
    }

    const idPart = parts.join(".");

    if (options.omitGlobal) {
      return idPart;
    } else {
      return `global::${idPart}`;
    }
  }

  copy() {
    const options = this.getCopyOptions();
    const copy = new NamespaceSymbol(this.name, undefined, {
      ...options,
      isGlobal: this.#isGlobal,
    });
    this.initializeCopy(copy);
    return copy;
  }
}
