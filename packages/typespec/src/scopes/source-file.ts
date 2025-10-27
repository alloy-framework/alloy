import {
  OutputScope,
  OutputScopeOptions,
  shallowReactive,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { DirectoryScope } from "./directory.js";

export class SourceFileScope extends OutputScope {
  #usings = shallowReactive<Set<NamespaceSymbol>>(new Set());
  // #imports = shallowReactive<Set<string>>(new Set());

  constructor(
    name: string,
    parent: DirectoryScope,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }

  get usings() {
    return this.#usings;
  }

  get parent() {
    return super.parent! as DirectoryScope;
  }

  addUsing(using: NamespaceSymbol) {
    this.#usings.add(using);
  }
}

export function useSourceFileScope() {
  // let scope: OutputScope | undefined = useScope();
  // while (scope) {
  //   if (scope instanceof TypeSpecSourceFileScope) {
  //     return scope;
  //   }
  //   scope = scope.parent;
  // }

  return undefined;
}