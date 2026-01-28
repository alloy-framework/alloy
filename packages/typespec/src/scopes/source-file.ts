import {
  OutputScope,
  OutputScopeOptions,
  shallowReactive,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/index.js";
import { SourceDirectoryScope } from "./source-directory.js";

export interface SourceFileScopeOptions extends OutputScopeOptions {}

export class SourceFileScope extends OutputScope {
  #using = shallowReactive<Set<NamespaceSymbol>>(new Set());

  constructor(
    name: string,
    // parent: SourceDirectoryScope,
    options?: SourceFileScopeOptions,
  ) {
    super(name, undefined, options);
  }

  get usings() {
    return this.#using;
  }

  addUsing(using: NamespaceSymbol) {
    this.#using.add(using);
  }
}
