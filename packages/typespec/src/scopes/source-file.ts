import {
  OutputScope,
  OutputScopeOptions,
  shallowReactive,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/index.js";
import { DirectoryScope } from "./directory.js";

export interface SourceFileScopeOptions extends OutputScopeOptions {}

export class SourceFileScope extends OutputScope {
  #using = shallowReactive<Set<NamespaceSymbol>>(new Set());

  constructor(
    name: string,
    parent: DirectoryScope,
    options?: SourceFileScopeOptions,
  ) {
    super(name, parent, options);
  }

  get usings() {
    return this.#using;
  }

  get parent(): DirectoryScope {
    return super.parent! as DirectoryScope;
  }

  addUsing(using: NamespaceSymbol) {
    this.#using.add(using);
  }
}
