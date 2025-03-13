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
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";
import { join } from "pathe";
import { createTSPackageScope, TSPackageScope } from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { PackageJsonFile, PackageJsonFileProps } from "./PackageJson.js";
import { TSConfigJson } from "./TsConfigJson.js";

export interface PackageDirectoryProps extends PackageJsonFileProps {
  tsConfig?: { outDir?: string };
  children?: Children;
  path?: string;
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

  return (
    <SourceDirectory path={props.path ?? "."}>
      <PackageContext.Provider value={packageContext}>
        <Scope value={packageContext.scope}>
          <PackageJsonFile {...pkgJsonProps} devDependencies={devDeps} />
          <TSConfigJson {...props.tsConfig} />
          {props.children}
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

  const scope = createTSPackageScope(
    useBinder(),
    useScope(),
    name,
    version,
    fullPath,
  );

  return {
    scope,
    outFileMapper: shallowRef((path: string) => modulePath(path)),
  };
}
