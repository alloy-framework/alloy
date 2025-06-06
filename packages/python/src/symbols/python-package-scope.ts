import {
  OutputScope,
  OutputScopeOptions,
  Refkey,
  shallowReactive,
} from "@alloy-js/core";
import { PythonModuleScope } from "./python-module-scope.js";

export interface PythonPackageScopeOptions extends OutputScopeOptions {
  builtin?: boolean;
}

export class PythonPackageScope extends OutputScope {
  get kind() {
    return "package" as const;
  }

  /**
   * The version of the this package.
   */
  get version() {
    return this.#version;
  }
  #version: string;

  /**
   * The symbols exported by this package. They are broken down by which paths
   * they are exported from. It is possible a symbol may be present at multiple
   * paths, in which case emitters can decide which symbol to use based on their
   * own heuristics.
   */
  get exportedSymbols() {
    return this.#exportedSymbols;
  }
  #exportedSymbols: Map<string, PythonModuleScope> = shallowReactive(new Map());

  /**
   * The scopes for the packages this package depends on.
   */
  get dependencies() {
    return this.#dependencies;
  }
  #dependencies: Set<PythonPackageScope> = shallowReactive(new Set());

  /**
   * All of the modules contained within the package. These modules may or may not
   * be exported.
   */
  get modules() {
    return this.#modules;
  }
  #modules: Set<PythonModuleScope> = shallowReactive(new Set());

  /**
   * The path of the root directory of the package.
   */
  get path() {
    return this.#path;
  }
  #path: string;

  /**
   * Whether this is a built-in package provided by the platform.
   */
  get builtin() {
    return this.#builtin;
  }
  #builtin: boolean;

  constructor(
    name: string,
    version: string,
    path: string,
    options: PythonPackageScopeOptions = {},
  ) {
    super(name, options);
    this.#version = version;
    this.#path = path;
    this.#builtin = !!options.builtin;
  }

  addDependency(pkg: PythonPackageScope) {
    this.dependencies.add(pkg);
  }
  addModule(module: PythonModuleScope) {
    this.modules.add(module);
  }
}
