import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";

export class CSharpScope extends OutputScope {
  constructor(
    name: string,
    parent: CSharpScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
    this.#namespaceSymbol = parent?.enclosingNamespace;
  }

  #namespaceSymbol: CSharpNamespaceSymbol | undefined;
  get enclosingNamespace() {
    return this.#namespaceSymbol;
  }
}
