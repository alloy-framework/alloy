/**
 * Specific java symbols used for dep management
 */

import {
  Binder,
  memo,
  OutputScope,
  OutputSymbol,
  refkey,
  Refkey,
  resolve,
  untrack,
  useBinder,
  useContext,
  useScope
} from "@alloy-js/core";
import { DeclarationProps, SourceFileContext, usePackage } from "./components/index.js";

/**
 * Represents an 'exported' symbol from a .java file. Class, enum, interface etc.
 * Not considered exported if private
 */
export interface JavaOutputSymbol extends OutputSymbol {
  /**
   * Fully qualified package name
   */
  package?: string;
}

/**
 * Represents an external dependency imported through a maven or gradle project
 */
export interface JavaDependency {
  groupId: string;
  artifactId: string;
  version?: string;

  scope?: "compile" | "test" | "runtime" | "provided";
}

export type JavaOutputScope = JavaProjectScope | JavaPackageScope;

/**
 * Represents the java project itself (maven, gradle, etc)
 */
export interface JavaProjectScope extends OutputScope {
  kind: "project";

  /**
   * The dependencies of this project
   * Map qualified package name to dependency
   */
  dependencies: Map<string, JavaDependency>;

  addDependency(dependency: JavaDependency): string;
}

export interface JavaPackageScope extends OutputScope {
  kind: "package";
}

/**
 * Resolve reference to symbol reference, and handle dependency management
 *
 * @param refkey Reference key to symbol
 */
export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<JavaOutputScope, JavaOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    return untrack(() => sourceFile!.addImport(targetDeclaration));
  });
}

export function createJavaProjectScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): JavaProjectScope {
  return binder.createScope<JavaProjectScope>({
    kind: "project", name, parent, dependencies: new Map(),
    addDependency(dependency: JavaDependency): string {
      const depKey = `${dependency.groupId}.${dependency.artifactId}.${dependency.version}`;

      if (this.dependencies.has(depKey)) {
        return depKey;
      }

      this.dependencies.set(depKey, dependency);
      return depKey;
    }
  });
}

export function createJavaPackageScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): JavaPackageScope {
  return binder.createScope<JavaPackageScope>({
    kind: "package", name, parent,
  });
}

export function createJavaSymbol(props: DeclarationProps) {
  const binder = useBinder();
  const scope = useScope() as JavaOutputScope;

  const parentPackage = usePackage();

  const sym = binder.createSymbol<JavaOutputSymbol>({
    name: props.name,
    scope,
    refkey: props.refkey ?? refkey(props.name),
    package: parentPackage !== null ? parentPackage?.qualifiedName : ""
  });

  return sym;
}