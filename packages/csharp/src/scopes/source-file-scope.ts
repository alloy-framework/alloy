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
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";
import { CSharpScope } from "./csharp.js";
import { CSharpNamespaceScope } from "./namespace-scope.js";

export class CSharpSourceFileScope extends CSharpScope {
  #usings = shallowReactive<Set<CSharpNamespaceSymbol>>(new Set());

  constructor(
    name: string,
    parent?: CSharpNamespaceScope,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }
  get usings() {
    return this.#usings;
  }

  get parent() {
    return super.parent! as CSharpNamespaceScope;
  }

  set parent(v: CSharpNamespaceScope) {
    super.parent = v;
  }

  addUsing(using: CSharpNamespaceSymbol) {
    this.#usings.add(using);
  }

  #hasBlockNamespace: boolean = false;
  get hasBlockNamespace() {
    track(this, TrackOpTypes.GET, "hasBlockNamespace");
    return this.#hasBlockNamespace;
  }

  set hasBlockNamespace(value: boolean) {
    const old = this.#hasBlockNamespace;
    if (this.#hasBlockNamespace === value) {
      return;
    }
    this.#hasBlockNamespace = value;
    trigger(this, TriggerOpTypes.SET, "hasBlockNamespace", value, old);
  }
}

export function useSourceFileScope() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof CSharpSourceFileScope) {
      return scope;
    }
    scope = scope.parent;
  }

  return undefined;
}
