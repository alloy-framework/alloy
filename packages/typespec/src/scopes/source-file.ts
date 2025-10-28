import {
  OutputScope,
  OutputScopeOptions,
  shallowReactive,
  useScope,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";
import { DirectoryScope } from "./directory.js";

export class SourceFileScope extends OutputScope {
  #usings = shallowReactive<Set<NamespaceSymbol>>(new Set());
  // #imports = shallowReactive<Set<string>>(new Set());

  constructor(
    name: string,
    parent: DirectoryScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }

  get usings() {
    return this.#usings;
  }

  get parent() {
    return super.parent as DirectoryScope | undefined;
  }

  addUsing(using: NamespaceSymbol) {
    this.#usings.add(using);
  }
}

export function useSourceFileScope() {
  const scope = useScope();
  if (scope === undefined) {
    return scope;
  }
  if (!(scope instanceof SourceFileScope)) {
    throw new Error("Expected a SourceFile scope, got a different kind of scope.");
  }
  return scope;
}