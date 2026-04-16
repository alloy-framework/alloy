import {
  type Children,
  type OutputScopeOptions,
  type OutputSpace,
  shallowReactive,
} from "@alloy-js/core";
import { type RustOutputSymbol } from "../symbols/rust-output-symbol.js";
import { type RustVisibilityProps } from "../components/visibility.js";
import { RustCrateScope } from "./rust-crate-scope.js";
import { RustScopeBase } from "./rust-scope.js";

export interface RustModuleDeclaration extends RustVisibilityProps {
  name: string;
  attributes?: Children[];
}

export class RustModuleScope extends RustScopeBase {
  public static readonly declarationSpaces = ["types", "values"];

  #imports = shallowReactive<Map<string, Set<RustOutputSymbol>>>(new Map());
  #childModules = shallowReactive<Map<string, RustModuleDeclaration>>(
    new Map(),
  );

  constructor(
    name: string,
    parent: RustCrateScope | RustModuleScope | undefined,
    options?: OutputScopeOptions,
  ) {
    super(name, parent, options);
  }

  get parent() {
    return super.parent as RustCrateScope | RustModuleScope | undefined;
  }

  set parent(value: RustCrateScope | RustModuleScope | undefined) {
    super.parent = value;
  }

  override get enclosingModule() {
    return this;
  }

  get imports() {
    return this.#imports;
  }

  addUse(path: string, symbol: RustOutputSymbol) {
    let symbolsForPath = this.#imports.get(path);
    if (!symbolsForPath) {
      symbolsForPath = shallowReactive(new Set<RustOutputSymbol>());
      this.#imports.set(path, symbolsForPath);
    }

    symbolsForPath.add(symbol);
  }

  get childModules() {
    return this.#childModules;
  }

  addChildModule(declaration: RustModuleDeclaration) {
    const existing = this.#childModules.get(declaration.name);
    if (existing) {
      return existing;
    }

    this.#childModules.set(declaration.name, declaration);
    return declaration;
  }

  get types(): OutputSpace {
    return this.spaceFor("types")!;
  }

  get values(): OutputSpace {
    return this.spaceFor("values")!;
  }
}
