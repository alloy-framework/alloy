import {
  OutputScope,
  OutputScopeOptions,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";

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

export interface JavaProjectScopeOptions extends OutputScopeOptions {
  mavenProjectConfig?: MavenProjectConfig;
  gradleProjectConfig?: GradleProjectConfig;
}
/**
 * Represents the java project itself (maven, gradle, etc)
 */
export class JavaProjectScope extends OutputScope {
  get kind() {
    return "project";
  }

  /**
   * The dependencies of this project
   * Map qualified package name to dependency
   */
  get dependencies() {
    return this.#dependencies;
  }
  #dependencies = new Map<string, JavaDependency>();

  /**
   * Define project configuration. Either maven or gradle
   */
  get mavenProjectConfig() {
    track(this, TrackOpTypes.GET, "mavenProjectConfig");
    return this.#mavenProjectConfig;
  }

  set(mavenProjectConfig: MavenProjectConfig | undefined) {
    const old = this.#mavenProjectConfig;
    if (old === mavenProjectConfig) {
      return;
    }

    this.#mavenProjectConfig = mavenProjectConfig;
    trigger(
      this,
      TriggerOpTypes.SET,
      "mavenProjectConfig",
      mavenProjectConfig,
      old,
    );
  }
  #mavenProjectConfig?: MavenProjectConfig;

  /**
   * Define project configuration. Either maven or gradle
   */
  get gradleProjectConfig() {
    track(this, TrackOpTypes.GET, "gradleProjectConfig");
    return this.#gradleProjectConfig;
  }
  set gradleProjectConfig(
    gradleProjectConfig: GradleProjectConfig | undefined,
  ) {
    const old = this.#gradleProjectConfig;
    if (old === gradleProjectConfig) {
      return;
    }

    this.#gradleProjectConfig = gradleProjectConfig;
    trigger(
      this,
      TriggerOpTypes.SET,
      "gradleProjectConfig",
      gradleProjectConfig,
      old,
    );
  }
  #gradleProjectConfig?: GradleProjectConfig;

  constructor(name: string, options: JavaProjectScopeOptions = {}) {
    super(name, options);

    this.#mavenProjectConfig = options.mavenProjectConfig;
    this.#gradleProjectConfig = options.gradleProjectConfig;
  }

  addDependency(dependency: JavaDependency): string {
    const depKey = `${dependency.groupId}.${dependency.artifactId}.${dependency.version}`;

    if (this.dependencies.has(depKey)) {
      return depKey;
    }

    this.dependencies.set(depKey, dependency);
    return depKey;
  }
}
