import { Children, createContext, reactive, Scope, SourceDirectory, useBinder, useContext, useScope } from "@alloy-js/core";
import {
  ExportConditions,
  ExportPath,
  PackageExports,
  PackageJsonFile,
  PackageJsonFileProps
} from "./PackageJson.js";
import { modulePath } from "../utils.js";
import { join } from "pathe";
import { TSModuleScope, TSPackageScope } from "../symbols.js";

export interface PackageDirectoryProps extends PackageJsonFileProps {
  dependencies?: Record<string, string>;
  exports?: PackageExports | ExportPath;
  children?: Children;
}

export const PackageContext = createContext<PackageContext>();

export function usePackage() {
  const ctx = useContext(PackageContext);
  if (!ctx) {
    throw new Error("Expected package context. Make sure this component is inside a PackageDirectory.");
  }
  return ctx;
}

export interface PackageContext {
  scope: TSPackageScope,
  addExport(publicPath: string, localModule: TSModuleScope): void;
  addRawExport(publicPath: string, exportPath: string | ExportConditions): void;
  addDependency(pkg: TSPackageScope): void;
  addRawDependency(packageName: string, version: string): void;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const packageContext = createPackageContext(props.name, props.version);

  if (props.exports) {
    if (typeof props.exports === "string") {
      packageContext.addRawExport(".", props.exports);
    } else {
      for (const ex of Object.entries(props.exports)) {
        packageContext.addRawExport(ex[0], ex[1])
      }
    }
  }

  if (props.dependencies) {
    for (const dep of Object.entries(props.dependencies)) {
      packageContext.addRawDependency(dep[0], dep[1]);
    }
  }

  return <SourceDirectory path={props.path}>
    <PackageContext.Provider value={packageContext}>
      <Scope value={packageContext.scope}>
        <PackageJsonFile {...props} />
        {props.children}
      </Scope>
    </PackageContext.Provider>
  </SourceDirectory>
}

function createPackageContext(name: string, version: string): PackageContext {
  const scope = useBinder().createScope<TSPackageScope>("package", name, useScope(), {
    exportedSymbols: reactive(new Map()),
    dependencies: reactive(new Set()),
    rawDependencies: reactive(new Map()),
    rawExports: reactive({}),
    version
  });

  return {
    scope,
    addDependency(pkg) {
      scope.dependencies.add(pkg);
    },
    addExport(publicPath, module) {
      scope.exportedSymbols.set(modulePath(publicPath), module);
    },
    addRawDependency(packageName, version) {
      scope.rawDependencies.set(packageName, version)
    },
    addRawExport(localPath, exportPath) {
      scope.rawExports[localPath] = exportPath;
    }
  }
}