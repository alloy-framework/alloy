import { Namekey } from "@alloy-js/core";
import { NamedTypeSymbol } from "./named-type.js";
import { TypeSpecSymbolKind, TypeSpecSymbolOptions } from "./typespec.js";

export interface NamespaceSymbolOptions extends TypeSpecSymbolOptions {
  isGlobal?: boolean;
}
export class NamespaceSymbol extends NamedTypeSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "namespace";

  constructor(
    name: string | Namekey,
    parentNamespace?: NamespaceSymbol,
    options?: NamespaceSymbolOptions,
  ) {
    const space = parentNamespace?.members;

    super(name, space, "namespace", options);

    this.#isGlobal = options?.isGlobal ?? false;
  }

  #isGlobal: boolean;
  get isGlobal() {
    return this.#isGlobal;
  }

  get members() {
    return this.memberSpaceFor("members")!;
  }
}
