import {
  OutputScope,
  OutputScopeOptions,
  createSymbol,
  shallowReactive,
  useScope,
} from "@alloy-js/core";
import { GoSymbol } from "../symbols/go.js";
import { PackageSymbol } from "../symbols/package.js";
import { GoLexicalScope } from "./lexical.js";
import { GoPackageScope } from "./package.js";

export type ImportRecords = Map<PackageSymbol, GoSymbol>;

export class GoSourceFileScope extends GoLexicalScope {
  #imports = shallowReactive<ImportRecords>(new Map());

  constructor(
    name: string,
    parent?: GoPackageScope,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }

  get imports() {
    return this.#imports;
  }

  get parent() {
    return super.parent! as GoPackageScope;
  }

  set parent(v: GoPackageScope) {
    super.parent = v;
  }

  addImport(import_: PackageSymbol) {
    if (this.#imports.has(import_)) {
      return this.#imports.get(import_)!;
    }

    const localSymbol = createSymbol(GoSymbol, import_.name, this.values, {
      aliasTarget: import_,
      binder: this.binder,
    });

    this.#imports.set(import_, localSymbol);

    return localSymbol;
  }

  get enclosingPackage(): PackageSymbol | undefined {
    return this.parent?.ownerSymbol;
  }
}

export function useSourceFileScope() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof GoSourceFileScope) {
      return scope;
    }
    scope = scope.parent;
  }

  return undefined;
}
