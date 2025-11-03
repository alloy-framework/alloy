import {
  OutputScope,
  OutputScopeOptions,
  shallowReactive,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  useScope,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";

import { NamespaceScope } from "./namespace.js";

export class SourceFileScope extends OutputScope {
  #usings = shallowReactive<Set<NamespaceSymbol>>(new Set());
  // #imports = shallowReactive<Set<string>>(new Set());

  constructor(
    name: string,
    parent?: NamespaceScope,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }

  get usings() {
    return this.#usings;
  }

  get parent() {
    return super.parent! as NamespaceScope;
  }

  addUsing(using: NamespaceSymbol) {
    this.#usings.add(using);
  }
}

export function useSourceFileScope() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof SourceFileScope) {
      return scope;
    }
    scope = scope.parent;
  }

  return undefined;
}