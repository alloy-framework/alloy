import { Binder, Children, createContext, OutputScope, reactive, Ref, Scope, shallowRef, SourceDirectory, SourceDirectoryContext, useBinder, useContext, useScope } from "@alloy-js/core";
import {
  ExportConditions,
  ExportPath,
  PackageExports,
  PackageJsonFile,
  PackageJsonFileProps
} from "./PackageJson.js";
import { modulePath } from "../utils.js";
import { join } from "pathe";
import { createTSPackageScope, TSModuleScope, TSPackageScope } from "../symbols.js";
import { TSConfigJson } from "./TsConfigJson.js";

export interface PackageDirectoryProps extends PackageJsonFileProps {
  dependencies?: Record<string, string>;
  exports?: PackageExports | ExportPath;
  tsConfig?: { outDir?: string };
  children?: Children;
}

export const PackageContext = createContext<PackageContext>();

export function usePackage() {
  const ctx = useContext(PackageContext);
  return ctx;
}

export interface PackageContext {
  scope: TSPackageScope,

  /**
   * A ref for a function that maps a ts file to a JS file.
   */
  outFileMapper: Ref<(path: string) => string>;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const packageContext = createPackageContext(
    props.name,
    props.version,
    props.path
  );

  if (props.exports) {
    if (typeof props.exports === "string") {
      packageContext.scope.addRawExport(".", props.exports);
    } else {
      for (const ex of Object.entries(props.exports)) {
        packageContext.scope.addRawExport(ex[0], ex[1])
      }
    }
  }

  if (props.dependencies) {
    for (const dep of Object.entries(props.dependencies)) {
      packageContext.scope.addRawDependency(dep[0], dep[1]);
    }
  }

  return <SourceDirectory path={props.path}>
    <PackageContext.Provider value={packageContext}>
      <Scope value={packageContext.scope}>
        <PackageJsonFile {...props} />
        <TSConfigJson {... props.tsConfig} />
        {props.children}
      </Scope>
    </PackageContext.Provider>
  </SourceDirectory>
}



function createPackageContext(name: string, version: string, path: string): PackageContext {
  const parentDir = useContext(SourceDirectoryContext);
  // todo: this can probably just use context.
  const fullPath = parentDir ? join(parentDir.path, path) : path;
  
  const scope = createTSPackageScope(useBinder(), useScope(), name, version, fullPath);

  return {
    scope,
    outFileMapper: shallowRef((path: string) => modulePath(path))
  }
}