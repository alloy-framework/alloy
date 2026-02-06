import { OutputScope, OutputScopeOptions, useScope } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/index.js";
import { Optional } from "../util.js";
import { SourceFileScope } from "./source-file.js";

export interface NamespaceScopeOptions extends OutputScopeOptions {}

export class NamespaceScope extends OutputScope {
  constructor(
    symbol: NamespaceSymbol,
    parent: NamespaceScope | SourceFileScope,
    options?: NamespaceScopeOptions,
  ) {
    super(symbol.name, parent, {
      ...options,
      ownerSymbol: symbol,
    });
  }

  get ownerSymbol(): NamespaceSymbol {
    return super.ownerSymbol as NamespaceSymbol;
  }
}

export function useNamespace(): Optional<NamespaceScope> {
  let scope: Optional<OutputScope> = useScope();
  while (scope !== undefined) {
    if (scope instanceof NamespaceScope) {
      return scope;
    }
    if (scope instanceof SourceFileScope) {
      return undefined;
    }
    scope = scope.parent;
  }
  return undefined;
}
