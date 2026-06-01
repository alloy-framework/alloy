import { Namekey, OutputSpace, OutputSymbol } from "@alloy-js/core";
import { NamedTypeSymbol } from "./named-type.js";
import {
  TypeSpecSymbol,
  TypeSpecSymbolKind,
  TypeSpecSymbolOptions,
} from "./typespec.js";

export interface NamespaceSymbolOptions extends TypeSpecSymbolOptions {
  isGlobal?: boolean;
}
export class NamespaceSymbol extends NamedTypeSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "namespace";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options?: NamespaceSymbolOptions,
  ) {
    super(name, spaces, "namespace", options);

    this.#isGlobal = options?.isGlobal ?? false;
  }

  #isGlobal: boolean;
  get isGlobal() {
    return this.#isGlobal;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }

  /**
   * Returns the fully qualified dotted name of this namespace, walking up
   * the owner chain and omitting the global namespace.
   */
  getFullyQualifiedName(): string {
    const parts: string[] = [];
    let current: OutputSymbol | undefined = this;
    while (current instanceof NamespaceSymbol && !current.isGlobal) {
      parts.unshift(current.name);
      current = current.ownerSymbol;
    }
    return parts.join(".");
  }
}

export function isNamespaceSymbol(
  symbol: TypeSpecSymbol,
): symbol is NamespaceSymbol {
  return symbol.symbolKind === "namespace";
}
