import { memo, reactive, SourceFile } from "@alloy-js/core";
import { usePackage } from "./PackageDirectory.js";
import { modulePath } from "../utils.js";
import { relative } from "pathe";

export interface PackageJsonFileProps {
  name: string;
  version: string;
  path: string;
  type?: "module" | "commonjs";
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}


export interface ExportConditions {
  [condition: string]: string | ExportConditions;
};

export type ExportPath = string | ExportConditions;

export interface PackageExports {
  [key: string]: ExportPath;
}

export function PackageJsonFile(props: PackageJsonFileProps) {
  const pkg = usePackage();

  const jsonContent = memo(() => {
    const pkgJson = {
      name: props.name,
      version: props.version,
      type: props.type ?? "module",
      dependencies: Object.fromEntries([
        ... pkg.scope.rawDependencies.entries(),
        ... Array.from(pkg.scope.dependencies).map(
          (dependency) => [dependency.name, dependency.version]
        )
      ]),
      devDependencies: props.devDependencies,
      scripts: props.scripts,
      exports: undefined as any
    }

    const exportsEntries: [string, ExportPath][] = [];
    for (const [publicPath, module] of pkg.scope.exportedSymbols) {
      exportsEntries.push([
        publicPath,
        modulePath(relative(pkg.scope.name, module.name))
      ]);
    }

    pkgJson.exports = exportsEntries.length === 0 ? undefined :
                      Object.fromEntries(exportsEntries);

    return JSON.stringify(pkgJson, null, 4);
  });

  return <SourceFile path="package.json" filetype="json">
    {jsonContent}
  </SourceFile>
}