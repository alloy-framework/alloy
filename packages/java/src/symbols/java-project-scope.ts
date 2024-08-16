import { Binder, OutputScope } from "@alloy-js/core";

/**
 * Represents an external dependency imported through a maven or gradle project
 */
export interface JavaDependency {
  groupId: string;
  artifactId: string;
  version?: string;

  scope?: "compile" | "test" | "runtime" | "provided";
}

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

export function createJavaProjectScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): JavaProjectScope {
  return binder.createScope<JavaProjectScope>({
    kind: "project",
    name,
    parent,
    dependencies: new Map(),
    addDependency(dependency: JavaDependency): string {
      const depKey = `${dependency.groupId}.${dependency.artifactId}.${dependency.version}`;

      if (this.dependencies.has(depKey)) {
        return depKey;
      }

      this.dependencies.set(depKey, dependency);
      return depKey;
    },
  });
}
