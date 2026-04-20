import {
  Children,
  ComponentContext,
  createContext,
  createScope,
  Scope,
  SourceDirectory,
  useContext,
} from "@alloy-js/core";
import {
  GradleProjectConfig,
  JavaProjectScope,
  MavenProjectConfig,
} from "../symbols/index.js";
import { MavenProject } from "./MavenProject.js";

export interface ProjectContext {
  scope: JavaProjectScope;
}

export const ProjectContext: ComponentContext<ProjectContext> = createContext();

export function useProject() {
  return useContext(ProjectContext)!;
}

export interface ProjectDirectoryProps {
  name: string;

  /**
   * Specify project configuration for either maven or gradle.
   * If not specified, will create generic Java project
   */
  mavenProjectConfig?: MavenProjectConfig;
  gradleProjectConfig?: GradleProjectConfig;

  children?: Children;
}

/**
 * Represents a java project directory. Use if you want to generate a Java project
 * with a build tool included (maven, gradle etc).
 */
export function ProjectDirectory(props: ProjectDirectoryProps) {
  const scope = createScope(JavaProjectScope, props.name, {
    mavenProjectConfig: props.mavenProjectConfig,
    gradleProjectConfig: props.gradleProjectConfig,
  });

  const projectContext: ProjectContext = {
    scope,
  };

  const usingBuildSystem =
    props.mavenProjectConfig !== undefined ||
    props.gradleProjectConfig !== undefined;
  const defaultCodePath = usingBuildSystem ? "src/main/java" : "src";

  return (
    <>
      <Scope value={scope}>
        <ProjectContext.Provider value={projectContext}>
          <SourceDirectory path={defaultCodePath}>
            {props.children}
          </SourceDirectory>
          {scope.mavenProjectConfig ?
            <MavenProject projectConfig={scope.mavenProjectConfig} />
          : undefined}
        </ProjectContext.Provider>
      </Scope>
    </>
  );
}
