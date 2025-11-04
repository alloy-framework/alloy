import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import type { TypeSpecSymbol } from "../symbols/typespec.js";
import { NamespaceSymbol } from "../symbols/namespace.js";

export class TypeSpecScope extends OutputScope {
  constructor(
    name: string,
    parent: TypeSpecScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
    this.#namespaceSymbol = parent?.enclosingNamespace;
  }

  #namespaceSymbol: NamespaceSymbol | undefined;
  get enclosingNamespace() {
    return this.#namespaceSymbol;
  }

  get ownerSymbol(): TypeSpecSymbol | undefined {
    return super.ownerSymbol as TypeSpecSymbol | undefined;
  }
}