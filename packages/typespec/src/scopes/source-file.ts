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
import { NamespaceSymbol } from "../symbols/index.js";
import { Optional } from "../util.js";
import { ProgramScope } from "./program.js";

export interface SourceFileScopeOptions extends OutputScopeOptions {}

export class SourceFileScope extends OutputScope {
  static readonly declarationSpaces: readonly string[] = ["members"];

  #using = shallowReactive<Set<NamespaceSymbol>>(new Set());
  #imports = shallowReactive<Set<string>>(new Set());

  constructor(
    name: string,
    parent: ProgramScope,
    options?: SourceFileScopeOptions,
  ) {
    super(name, parent, options);
  }

  get members() {
    return this.spaceFor("members")!;
  }

  get usings() {
    return this.#using;
  }

  addUsing(using: NamespaceSymbol) {
    this.#using.add(using);
  }

  get imports() {
    return this.#imports;
  }

  addImport(importPath: string) {
    this.#imports.add(importPath);
  }

  #hasFileLevelNamespace: boolean = false;
  get hasFileLevelNamespace() {
    track(this, TrackOpTypes.GET, "hasFileLevelNamespace");
    return this.#hasFileLevelNamespace;
  }

  set hasFileLevelNamespace(value: boolean) {
    const old = this.#hasFileLevelNamespace;
    if (this.#hasFileLevelNamespace === value) {
      return;
    }
    this.#hasFileLevelNamespace = value;
    trigger(this, TriggerOpTypes.SET, "hasFileLevelNamespace", value, old);
  }
}

export function useSourceFileScope() {
  let scope: Optional<OutputScope> = useScope();
  while (scope) {
    if (scope instanceof SourceFileScope) {
      return scope;
    }
    scope = scope.parent;
  }
}
