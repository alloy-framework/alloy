import {
  OutputScope,
  OutputScopeOptions,
  Refkey,
  shallowReactive,
} from "@alloy-js/core";
import { modulePath } from "../utils.js";
import { TSModuleScope } from "./ts-module-scope.js";

export interface TSPackageScopeOptions extends OutputScopeOptions {
  builtin?: boolean;
}

export class TSPackageScope extends OutputScope {
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
  #exportedSymbols: Map<string, TSModuleScope> = shallowReactive(new Map());

  /**
   * The scopes for the packages this package depends on.
   */
  get dependencies() {
    return this.#dependencies;
  }
  #dependencies: Set<TSPackageScope> = shallowReactive(new Set());

  /**
   * All of the modules contained within the package. These modules may or may not
   * be exported.
   */
  get modules() {
    return this.#modules;
  }
  #modules: Set<TSModuleScope> = shallowReactive(new Set());

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
    options: TSPackageScopeOptions = {},
  ) {
    super(name, undefined, options);
    this.#version = version;
    this.#path = path;
    this.#builtin = !!options.builtin;
  }

  addDependency(pkg: TSPackageScope) {
    this.dependencies.add(pkg);
  }
  addExport(publicPath: string, module: TSModuleScope) {
    this.exportedSymbols.set(modulePath(publicPath), module);
  }
  addModule(module: TSModuleScope) {
    this.modules.add(module);
  }

  findExportedSymbol(refkey: Refkey): [string, TSModuleScope] | null {
    for (const [publicPath, module] of this.exportedSymbols) {
      if (module.exportedSymbols.has(refkey)) {
        return [publicPath, module];
      }
    }

    return null;
  }

  copyTo(): TSPackageScope {
    throw new Error("Not supported");
  }

  override get debugInfo(): Record<string, unknown> {
    return {
      ...super.debugInfo,
      version: this.version,
      path: this.path,
      builtin: this.builtin,
    };
  }
}
