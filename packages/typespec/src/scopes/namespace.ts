import { OutputScope, OutputScopeOptions } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/index.js";
import { SourceFileScope } from "./source-file.js";

export interface NamespaceScopeOptions extends OutputScopeOptions {}

export class NamespaceScope extends OutputScope {
  constructor(
    symbol: NamespaceSymbol,
    parent: NamespaceScope | SourceFileScope,
    options?: NamespaceScopeOptions,
  ) {
    super(symbol.name, parent, options);
  }
}
