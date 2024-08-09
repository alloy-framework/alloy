import {
  Children,
  createContext,
  Scope,
  SourceDirectory,
  SourceDirectoryContext,
  useBinder,
  useContext,
  useScope
} from "@alloy-js/core";
import { createJavaPackageScope, JavaPackageScope } from "../symbols.js";

export interface PackageDirectoryContext {
  scope: JavaPackageScope;
  // Full package path, e.g src/main/java/me/example/code
  path: string;
  // Name of package, usually name of this directory
  name: string;
  // Full qualified name of package, e.g me.example.code
  qualifiedName: string;
}

export const PackageDirectoryContext = createContext<PackageDirectoryContext>();

export function usePackage() {
  return useContext(PackageDirectoryContext);
}

export interface PackageDirectoryProps {
  package: string; // Package name, if includes '.', will declare sub directories for you
  children?: Children;
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const sourceDirectory = useContext(SourceDirectoryContext);
  const parentPackage = usePackage();

  const packageNames = props.package.split(".");
  const packageName = packageNames[0];

  const fullyQualifiedPackageName = parentPackage ? parentPackage.qualifiedName + "." + packageName : packageName;

  const scope = createJavaPackageScope(useBinder(), useScope(), fullyQualifiedPackageName);

  const packagePath = sourceDirectory?.path + "/" + packageName;
  const packageContext: PackageDirectoryContext = {
    scope,
    path: packagePath,
    name: packageName,
    qualifiedName: fullyQualifiedPackageName
  };

  function ChildComponent() {
    if (packageNames.length > 1) {
      return (
        <PackageDirectory package={packageNames.slice(1, packageNames.length).join(".")}>
          {props.children}
        </PackageDirectory>
      );
    } else {
      return props.children;
    }
  }

  return (
    <PackageDirectoryContext.Provider value={packageContext}>
      <Scope value={scope}>
        <SourceDirectory path={packagePath}>
          <ChildComponent />
        </SourceDirectory>
      </Scope>
    </PackageDirectoryContext.Provider>
  );
}