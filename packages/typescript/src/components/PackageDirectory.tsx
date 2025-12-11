import {
  Children,
  ComponentContext,
  createNamedContext,
  Ref,
  Scope,
  shallowRef,
  SourceDirectory,
  SourceDirectoryContext,
  splitProps,
  useContext,
  Wrap,
} from "@alloy-js/core";
import { join } from "pathe";
import { PackageMetadataContext } from "../context/package-metadata.js";
import { ExternalPackage, getPackageScope } from "../create-package.js";
import { TSPackageScope } from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { PackageJsonFile, PackageJsonFileProps } from "./PackageJson.js";
import { TSConfigJson } from "./TsConfigJson.js";

export interface PackageDirectoryProps extends PackageJsonFileProps {
  tsConfig?: { outDir?: string };
  children?: Children;
  path?: string;

  /**
   * The versions to use for external packages referenced within this package.
   * By default, the version specified when the external package was created is
   * used.
   */
  packageVersions?: [ExternalPackage, string][];

  /**
   * The package dependency kinds to use for external packages referenced within
   * this package. By default, all external packages are added as
   * "dependencies".
   */
  packageDependencyKinds?: [
    ExternalPackage,
    "dependencies" | "peerDependencies" | "devDependencies",
  ][];
}

export const PackageContext: ComponentContext<PackageContext> =
  createNamedContext("@alloy-js/typescript PackageDirectory");

export function usePackage() {
  const ctx = useContext(PackageContext);
  return ctx;
}

export interface PackageContext {
  scope: TSPackageScope;

  /**
   * A ref for a function that maps a ts file to a JS file.
   */
  outFileMapper: Ref<(path: string) => string>;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const packageContext = createPackageContext(
    props.name,
    props.version,
    props.path ?? ".",
  );

  const devDeps = props.devDependencies ?? {};
  if (!devDeps["typescript"]) {
    devDeps["typescript"] = "^5.5.2";
  }

  const [_, pkgJsonProps] = splitProps(props, [
    "tsConfig",
    "children",
    "path",
    "devDependencies",
  ]);

  let pkgMeta: PackageMetadataContext | undefined = undefined;
  if (props.packageVersions || props.packageDependencyKinds) {
    pkgMeta = {
      versionSpecifiers: new Map(),
      dependencyType: new Map(),
    };

    if (props.packageVersions) {
      for (const [pkg, version] of props.packageVersions) {
        pkgMeta.versionSpecifiers.set(getPackageScope(pkg), version);
      }
    }

    if (props.packageDependencyKinds) {
      for (const [pkg, kind] of props.packageDependencyKinds) {
        pkgMeta.dependencyType.set(getPackageScope(pkg), kind);
      }
    }
  }

  return (
    <SourceDirectory path={props.path ?? "."}>
      <PackageContext.Provider value={packageContext}>
        <Scope value={packageContext.scope}>
          <Wrap
            when={!!pkgMeta}
            with={PackageMetadataContext.Provider}
            props={{ value: pkgMeta }}
          >
            <PackageJsonFile {...pkgJsonProps} devDependencies={devDeps} />
            <TSConfigJson {...props.tsConfig} />
            {props.children}
          </Wrap>
        </Scope>
      </PackageContext.Provider>
    </SourceDirectory>
  );
}

function createPackageContext(
  name: string,
  version: string,
  path: string,
): PackageContext {
  const parentDir = useContext(SourceDirectoryContext);
  // todo: this can probably just use context.
  const fullPath = parentDir ? join(parentDir.path, path) : path;

  const scope = new TSPackageScope(name, version, fullPath);

  return {
    scope,
    outFileMapper: shallowRef((path: string) => modulePath(path)),
  };
}
