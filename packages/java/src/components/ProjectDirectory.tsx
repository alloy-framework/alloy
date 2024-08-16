import {
  Children,
  code,
  createContext,
  Scope,
  SourceDirectory,
  SourceFile,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";
import { createJavaProjectScope, JavaProjectScope } from "../symbols/index.js";

export interface ProjectContext {
  scope: JavaProjectScope;
}

export const ProjectContext = createContext<ProjectContext>();

export function useProject() {
  return useContext(ProjectContext)!;
}

export interface ProjectDirectoryProps {
  groupId: string;
  artifactId: string; // Also name of project
  version: string;
  javaVersion?: number;
  buildSystem?: "maven" | "gradle"; // TODO: Actually respect this option, for now only maven
  children?: Children;
}

/**
 * Represents a java project directory. Use if you want to generate a Java project
 * with a build tool included (maven, gradle etc).
 */
export function ProjectDirectory({
  javaVersion = 8,
  buildSystem = "maven",
  ...props
}: ProjectDirectoryProps) {
  const scope = createJavaProjectScope(useBinder(), useScope(), props.groupId);

  const projectContext: ProjectContext = {
    scope,
  };

  return <>
      <SourceDirectory path="src/main/java">
        <ProjectContext.Provider value={projectContext}>
          <Scope value={scope}>
            {props.children}
          </Scope>
        </ProjectContext.Provider>
      </SourceDirectory>
      <SourceFile path="pom.xml" filetype="xml">
        {code`
          <?xml version="1.0" encoding="UTF-8"?>
          <project xmlns="http://maven.apache.org/POM/4.0.0"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>
    
            <groupId>${props.groupId}</groupId>
            <artifactId>${props.artifactId}</artifactId>
            <version>${props.version}</version>
    
            <properties>
              <maven.compiler.source>${javaVersion}</maven.compiler.source>
              <maven.compiler.target>${javaVersion}</maven.compiler.target>
              <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            </properties>
            ${scope.dependencies.size > 0 ? code`
              ${"\n"}
              <dependencies>
                ${Array.from(scope.dependencies.values()).map(dep => code`
                  <dependency>
                    <groupId>${dep.groupId}</groupId>
                    <artifactId>${dep.artifactId}</artifactId>
                    ${dep.version !== undefined ? `<version>${dep.version}</version>` : undefined}
                    <scope>${dep.scope ?? "provided"}</scope>
                  </dependency>
                `)}
              </dependencies>
            ` : undefined}
   
          </project>
        `}
      </SourceFile>
    </>;
}
