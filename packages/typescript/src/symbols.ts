import { OutputScope, OutputSymbol, Refkey } from "@alloy-js/core";
import { ExportPath, PackageExports } from "./components/PackageJson.jsx";

export interface TSOutputSymbol extends OutputSymbol {
  export: boolean;
  default: boolean;
}

export type TSOutputScope =
  | TSGlobalScope
  | TSPackageScope
  | TSModuleScope
  | TSOtherScope;

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
}

export interface TSModuleScope extends OutputScope {
  kind: "module";
  exportedSymbols: Map<Refkey, TSOutputSymbol>;
}

export interface TSGlobalScope extends OutputScope {
  kind: "global";
}

export interface TSOtherScope extends OutputScope {
  kind: never;
}
