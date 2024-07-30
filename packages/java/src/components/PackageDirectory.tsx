import {
  Children,
  createContext, Scope,
  SourceDirectory,
  SourceDirectoryContext,
  SourceFileContext, useBinder,
  useContext, useScope
} from "@alloy-js/core";
import { JavaPackageScope, JavaProjectScope } from "../symbols.js";

export interface PackageDirectoryContext {
  scope: JavaPackageScope;
  path: string; // Full package path, e.g src/main/java/me/example/code
  name: string; // Full package name qualifier, e.g me.example.code
}

export const PackageDirectoryContext = createContext<PackageDirectoryContext>();
export function usePackage() {
  return useContext(PackageDirectoryContext);
}

export interface PackageDirectoryProps {
  package: string; // Package name, if includes '.', will declare sub directories for you
  children?: Children
}

export function PackageDirectory(props: PackageDirectoryProps) {
  const sourceDirectory = useContext(SourceDirectoryContext);
  const parentPackage = usePackage();

  const packageNames = props.package.split('.');
  const packageName = packageNames[0];

  const fullyQualifiedPackageName = parentPackage ? parentPackage.name + '.' + props.package : props.package;

  const scope = useBinder().createScope<JavaPackageScope>("package", fullyQualifiedPackageName, useScope());

  const packagePath = sourceDirectory?.path + '/' + packageName;
  const packageContext: PackageDirectoryContext = {
    scope,
    path: packagePath,
    name: packageName
  }

  function ChildComponent() {
    if (packageNames.length > 1) {
      return (
        <PackageDirectory package={packageNames.slice(1, packageNames.length).join('.')}>
          {props.children}
        </PackageDirectory>
      )
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
  )
}