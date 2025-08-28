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
import { CSharpLexicalScope } from "./lexical.js";
import { CSharpNamespaceScope } from "./namespace.js";

export class CSharpSourceFileScope extends CSharpLexicalScope {
  #usings = shallowReactive<Set<NamespaceSymbol>>(new Set());

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

  addUsing(using: NamespaceSymbol) {
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
