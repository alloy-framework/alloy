import { Children, createContext, reactive, Scope, SourceDirectory, useContext } from "@alloy-js/core";
import {
  ExportConditions,
  ExportPath,
  PackageExports,
  PackageJsonFile,
  PackageJsonFileProps
} from "./PackageJson.js";
import { modulePath } from "../utils.js";
import { join } from "pathe";

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
  exports: Map<string, ExportPath>;
  addExport(publicPath: string, localPath: string | ExportConditions): void;
  dependencies: Map<string, string>;
  addDependency(packageName: string, version: string): void;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const packageContext = createPackageContext();
  if (props.exports) {
    if (typeof props.exports === "string") {
      packageContext.addExport(".", props.exports);
    } else {
      for (const ex of Object.entries(props.exports)) {
        packageContext.addExport(ex[0], ex[1])
      }
    }
  }

  if (props.dependencies) {
    for (const dep of Object.entries(props.dependencies)) {
      packageContext.addDependency(dep[0], dep[1]);
    }
  }

  return <SourceDirectory path={props.path}>
    <PackageContext.Provider value={packageContext}>
      <Scope name={props.name} kind="package">
        <PackageJsonFile {...props} />
        {props.children}
      </Scope>
    </PackageContext.Provider>
  </SourceDirectory>
}

function createPackageContext(): PackageContext {
  const dependencies: Map<string, string> = reactive(new Map());
  const exports: Map<string, ExportPath> = reactive(new Map());
  return {
    dependencies,
    exports,
    addDependency(packageName, version) {
      dependencies.set(packageName, version);
    },
    addExport(publicPath, localPath) {
      exports.set(
        modulePath(publicPath),
        typeof localPath === "string" ? modulePath(join("dist", localPath)) : localPath
      );
    }
  }
}