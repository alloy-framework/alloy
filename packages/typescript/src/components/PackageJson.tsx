import { memo, SourceFile } from "@alloy-js/core";
import { modulePath } from "../utils.js";
import { usePackage } from "./PackageDirectory.js";

export interface PackageJsonFileProps {
  /** The name of the package */
  name: string;

  /** The version of the package */
  version: string;

  /** The description of the package */
  description?: string;

  /** The license of the package */
  license?: string;

  /** The author of the package */
  author?: string;

  /** The homepage of the package */
  homepage?: string;

  /** The repository of the package */
  repository?: string | { type: string; url: string };

  /** The keywords of the package */
  keywords?: string[];

  /** Whether this is a commonjs or module. Defaults to module. */
  type?: "module" | "commonjs";

  /**
   * The hard-coded dependencies of the package. References to external packages
   * will add to the dependency list automatically. Only list dependencies here
   * that are not referenced via refkey.
   */
  dependencies?: Record<string, string>;

  /** The hard-coded exports of the package. */
  exports?: PackageExports | ExportPath;

  /** The dev dependencies of the package. */
  devDependencies?: Record<string, string>;

  /** The scripts entries of the package. */
  scripts?: Record<string, string>;
}

export interface ExportConditions {
  [condition: string]: string | ExportConditions;
}

export type ExportPath = string | ExportConditions;

export interface PackageExports {
  [key: string]: ExportPath;
}

/**
 * A file containing a package.json that defines a package. When placed inside a
 * {@link PackageDirectory}, it will contain dependencies and exports for
 * symbols defined inside the package. Additional dependencies and exports can
 * be provided.
 *
 * @example
 * ```tsx
 * <PackageJsonFile name="my-package" version="1.0.0" />
 * ```
 */
export function PackageJsonFile(props: PackageJsonFileProps) {
  const pkg = usePackage();

  const jsonContent = memo(() => {
    const pkgJson = {
      name: props.name,
      version: props.version,
      author: props.author,
      description: props.description,
      license: props.license,
      homepage: props.homepage,
      type: props.type ?? "module",
      dependencies:
        props.dependencies || (pkg && pkg.scope.dependencies.size > 0) ?
          Object.fromEntries([
            ...Object.entries(props.dependencies ?? {}),
            ...(pkg ?
              Array.from(pkg.scope.dependencies).map((dependency) => [
                dependency.name,
                dependency.version,
              ])
            : []),
          ])
        : undefined,
      devDependencies: props.devDependencies,
      scripts: props.scripts,
      exports: undefined as any,
    };

    if (typeof props.exports === "string") {
      pkgJson.exports = props.exports;
    } else {
      const exportsEntries: [string, ExportPath][] = [];
      for (const entry of Object.entries(props.exports ?? {})) {
        exportsEntries.push(entry);
      }

      if (pkg) {
        for (const [publicPath, module] of pkg.scope.exportedSymbols) {
          exportsEntries.push([
            publicPath,
            modulePath(pkg.outFileMapper.value(module.name)),
          ]);
        }
      }

      pkgJson.exports =
        exportsEntries.length === 0 ?
          undefined
        : Object.fromEntries(exportsEntries);
    }

    return JSON.stringify(pkgJson, null, 2);
  });

  return (
    <SourceFile path="package.json" filetype="json">
      {jsonContent}
    </SourceFile>
  );
}
