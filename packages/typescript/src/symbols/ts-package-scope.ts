import { OutputScope, Refkey, Binder } from "@alloy-js/core";
import {
  PackageExports,
  ExportConditions,
} from "../components/PackageJson.jsx";
import { modulePath } from "../utils.js";
import { TSModuleScope } from "./ts-module-scope.js";

export interface TSPackageScope extends OutputScope {
  kind: "package";
  /**
   * The version of the this package.
   */
  version: string;

  /**
   * The symbols exported by this package. They are broken down by which paths
   * they are exported from. It is possible a symbol may be present at multiple
   * paths, in which case emitters can decide which symbol to use based on their
   * own heuristics.
   */
  exportedSymbols: Map<string, TSModuleScope>;

  /**
   * The path of the root directory of the package.
   */
  path: string;

  /**
   * The scopes for the packages this package depends on.
   */
  dependencies: Set<TSPackageScope>;

  /**
   * Fixed dependencies of this package. Only use this for packages in which you
   * do not intend to reference via the `Reference` component. Symbols from raw
   * dependencies cannot be auto imported.
   */
  rawDependencies: Map<string, string>;

  /**
   * Fixed exports of this package. Only use this for exports which you want to
   * add manually to the package. Otherwise use the `export` prop on
   * `SourceFile` to add an export.
   */
  rawExports: PackageExports;

  /**
   * All of the modules contained within the package. These modules may or may not
   * be exported.
   */
  modules: Set<TSModuleScope>;

  /**
   * Whether this is a built-in package provided by the platform.
   */
  builtin?: boolean;

  addExport(publicPath: string, localModule: TSModuleScope): void;
  addRawExport(publicPath: string, exportPath: string | ExportConditions): void;
  addDependency(pkg: TSPackageScope): void;
  addRawDependency(packageName: string, version: string): void;
  addModule(module: TSModuleScope): void;
  findExportedSymbol(refkey: Refkey): [string, TSModuleScope] | null;
}

export function createTSPackageScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
  version: string,
  path: string,
  builtin: boolean = false,
) {
  return binder.createScope<TSPackageScope>({
    kind: "package",
    name,
    parent,
    exportedSymbols: new Map(),
    dependencies: new Set(),
    rawDependencies: new Map(),
    rawExports: {},
    modules: new Set(),
    version,
    path: path,
    builtin,
    addDependency(pkg) {
      this.dependencies.add(pkg);
    },
    addExport(publicPath, module) {
      this.exportedSymbols.set(modulePath(publicPath), module);
    },
    addRawDependency(packageName, version) {
      this.rawDependencies.set(packageName, version);
    },
    addRawExport(localPath, exportPath) {
      this.rawExports[localPath] = exportPath;
    },
    addModule(module) {
      this.modules.add(module);
    },
    findExportedSymbol(refkey: Refkey): [string, TSModuleScope] | null {
      for (const [publicPath, module] of this.exportedSymbols) {
        if (module.exportedSymbols.has(refkey)) {
          return [publicPath, module];
        }
      }

      return null;
    },
  });
}
