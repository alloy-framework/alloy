import {
  Binder,
  memo,
  OutputScope,
  OutputSymbol,
  refkey,
  Refkey,
  resolve,
  untrack,
  useContext,
  useScope,
} from "@alloy-js/core";
import { usePackage } from "./components/PackageDirectory.js";
import { ExportConditions, PackageExports } from "./components/PackageJson.js";
import { SourceFileContext } from "./components/SourceFile.js";
import { modulePath } from "./utils.js";

export enum TSSymbolFlags {
  None = 0,
  LocalImportSymbol = 1,
}
export interface TSOutputSymbol extends OutputSymbol {
  scope: TSOutputScope;
  export: boolean;
  default: boolean;
  flags: TSSymbolFlags;
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

export interface ImportedSymbol {
  local: TSOutputSymbol;
  target: TSOutputSymbol;
}
export type ImportRecords = Map<TSModuleScope, Set<ImportedSymbol>>;

export interface TSModuleScope extends OutputScope {
  kind: "module";
  exportedSymbols: Map<Refkey, TSOutputSymbol>;
  /**
   * A mapping of foreign symbols to module-local symbols
   */
  importedSymbols: Map<TSOutputSymbol, TSOutputSymbol>;
  importedModules: ImportRecords;
  addImport(symbol: TSOutputSymbol, module: TSModuleScope): TSOutputSymbol;
}

export interface TSGlobalScope extends OutputScope {
  kind: "global";
}

export interface TSOtherScope extends OutputScope {
  kind: never;
}

export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(
    refkey as Refkey,
  );

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, commonScope } = resolveResult.value;

    if (commonScope!.kind === "global" && pathDown[0].kind === "package") {
      // need package import
      const pkg = usePackage();
      const sourcePackage = pathDown[0];

      if (pkg && !sourcePackage.builtin) {
        pkg.scope.addDependency(sourcePackage);
      }
      // find public dependency
      for (const [publicPath, module] of sourcePackage.exportedSymbols) {
        if (module.exportedSymbols.has(targetDeclaration.refkey)) {
          return untrack(() =>
            sourceFile!.scope.addImport(targetDeclaration, module)).name;
        }
      }

      throw new Error(
        "The symbol " +
          targetDeclaration.name +
          " is not exported from package",
      );
    } else if (pathDown.length > 0 && pathDown[0].kind === "module") {
      return untrack(() =>
        sourceFile!.scope.addImport(
          targetDeclaration,
          pathDown[0] as TSModuleScope,
        )).name;
    }

    return targetDeclaration.name;
  });
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

export function createTSModuleScope(
  binder: Binder,
  parent: OutputScope,
  path: string,
): TSModuleScope {
  return binder.createScope<TSModuleScope>({
    kind: "module",
    name: path,
    parent,
    exportedSymbols: new Map(),
    importedSymbols: new Map(),
    importedModules: new Map(),
    addImport(targetSymbol, targetModule) {
      if (this.importedSymbols.has(targetSymbol)) {
        return this.importedSymbols.get(targetSymbol)!;
      }

      if (targetModule.kind !== "module") {
        throw new Error("Cannot import symbol that isn't in module scope");
      }

      if (!this.importedModules.has(targetModule)) {
        this.importedModules.set(targetModule, new Set());
      }

      const localSymbol = createTsSymbol({
        binder,
        name: targetSymbol.name,
        refkey: refkey({}),
        flags: TSSymbolFlags.LocalImportSymbol,
      });

      this.importedSymbols.set(targetSymbol, localSymbol);
      this.importedModules.get(targetModule)!.add({
        local: localSymbol,
        target: targetSymbol,
      });

      return localSymbol;
    },
  });
}

interface createTsSymbolOptions {
  name: string;
  refkey: Refkey;
  binder?: Binder;
  scope?: TSOutputScope;
  export?: boolean;
  default?: boolean;
  flags?: TSSymbolFlags;
}

export function createTsSymbol(options: createTsSymbolOptions) {
  const scope = options.scope ?? (useScope() as TSOutputScope);
  if (scope.kind !== "module") {
    throw new Error("Can't create declaration symbols in non-module scope");
  }

  const binder = scope.binder;

  const sym = binder.createSymbol<TSOutputSymbol>({
    name: options.name,
    scope,
    refkey: options.refkey,
    export: !!options.export,
    default: !!options.default,
    flags: options.flags ?? TSSymbolFlags.None,
  });

  if (options.export && scope.kind === "module") {
    scope.exportedSymbols.set(sym.refkey, sym);
  }

  return sym;
}
