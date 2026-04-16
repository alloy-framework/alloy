import {
  type Children,
  type OutputScopeOptions,
  type OutputSpace,
  shallowReactive,
} from "@alloy-js/core";
import { type RustVisibilityProps } from "../components/visibility.js";
import { RustScopeBase } from "./rust-scope.js";

export interface CrateDependencyDetails {
  version: string;
  features?: string[];
}

export type CrateDependency = string | CrateDependencyDetails;

export interface RustChildModuleDeclaration extends RustVisibilityProps {
  name: string;
  attributes?: Children[];
}

export interface RustCrateScopeOptions extends OutputScopeOptions {
  builtin?: boolean;
}

export class RustCrateScope extends RustScopeBase {
  public static readonly declarationSpaces = ["types", "values"];

  #version?: string;
  get version() {
    return this.#version;
  }

  #childModules = shallowReactive<Map<string, RustChildModuleDeclaration>>(
    new Map(),
  );
  #dependencies = shallowReactive<Map<string, CrateDependency>>(new Map());
  #builtin = false;
  get builtin() {
    return this.#builtin;
  }

  constructor(
    name: string,
    version?: string,
    options: RustCrateScopeOptions = {},
  ) {
    super(name, undefined, options);
    this.#version = version;
    this.#builtin = options.builtin ?? false;
  }

  override get enclosingCrate() {
    return this;
  }

  get childModules() {
    return this.#childModules;
  }

  addChildModule(declaration: RustChildModuleDeclaration) {
    const existing = this.#childModules.get(declaration.name);
    if (existing) {
      return existing;
    }

    this.#childModules.set(declaration.name, declaration);
    return declaration;
  }

  get dependencies() {
    return this.#dependencies;
  }

  addDependency(name: string, dependency: CrateDependency) {
    const existing = this.#dependencies.get(name);
    if (existing) {
      return existing;
    }

    this.#dependencies.set(name, dependency);
    return dependency;
  }

  get types(): OutputSpace {
    return this.spaceFor("types")!;
  }

  get values(): OutputSpace {
    return this.spaceFor("values")!;
  }
}
