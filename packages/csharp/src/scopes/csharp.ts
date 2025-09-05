import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import type { CSharpSymbol } from "../symbols/csharp.js";
import { NamespaceSymbol } from "../symbols/namespace.js";

export class CSharpScope extends OutputScope {
  constructor(
    name: string,
    parent: CSharpScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
    this.#namespaceSymbol = parent?.enclosingNamespace;
  }

  #namespaceSymbol: NamespaceSymbol | undefined;
  get enclosingNamespace() {
    return this.#namespaceSymbol;
  }

  get ownerSymbol(): CSharpSymbol | undefined {
    return super.ownerSymbol as CSharpSymbol | undefined;
  }
}
