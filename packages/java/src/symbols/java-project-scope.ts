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

export interface MavenProjectConfig {
  groupId: string;
  artifactId: string;
  version: string;
  javaVersion: number;

  name?: string;
  description?: string;

  repositories?: {
    id: string;
    url: string;
  }[];

  pluginRepositories?: {
    id: string;
    url: string;
  }[];

  build?: {
    plugins?: {
      groupId: string;
      artifactId: string;
      version?: string;
      executions?: {
        id?: string;
        phase?: string;
        goals?: string[];
      }[];
      // TODO: Maybe worry about multi-level config such as maven shade plugin
      configuration?: Record<string, any>;
    }[];
    resources?: {
      directory: string;
      includes?: string[];
      excludes?: string[];
      filtering?: boolean;
      targetPath?: string;
    }[];
  };
}

// TODO: Support gradle projects
export interface GradleProjectConfig {}

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

  /**
   * Define project configuration. Either maven or gradle
   */
  mavenProjectConfig?: MavenProjectConfig;
  gradleProjectConfig?: GradleProjectConfig;
}

export function createJavaProjectScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
  mavenProjectConfig?: MavenProjectConfig,
  gradleProjectConfig?: GradleProjectConfig,
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
    mavenProjectConfig,
    gradleProjectConfig,
  });
}
