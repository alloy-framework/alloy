/**
 * Specific java symbols used for dep management
 */

import { memo, OutputScope, OutputSymbol, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "./components/index.js";

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
  version: string;

  scope?: 'compile' | 'test' | 'runtime' | 'provided';
}

export type JavaOutputScope = JavaProjectScope | JavaPackageScope;

/**
 * Represents the java project itself (maven, gradle, etc)
 */
export interface JavaProjectScope extends OutputScope {
  kind: 'project';

  /**
   * The dependencies of this project
   * Map qualified package name to dependency
   */
  dependencies: Map<string, JavaDependency>;
}

export interface JavaPackageScope extends OutputScope {
  kind: 'package';
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
      return;
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    return untrack(() => sourceFile!.addImport(targetDeclaration));
  })
}
