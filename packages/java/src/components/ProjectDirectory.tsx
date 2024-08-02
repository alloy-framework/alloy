import {
  Children,
  SourceDirectory,
  SourceFile,
  code,
  Scope,
  useBinder,
  useScope,
  reactive,
  createContext, useContext
} from "@alloy-js/core";
import { JavaDependency, JavaProjectScope } from "../symbols.js";

export interface ProjectContext {
  scope: JavaProjectScope;
  addDependency(dependency: JavaDependency): string;
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
  children?: Children;
}

/**
 * Represents a java project directory. Use if you want to generate a Java project
 * with a build tool included (maven, gradle etc).
 */
export function ProjectDirectory(props: ProjectDirectoryProps) {
  const dependencies = reactive(new Map<string, JavaDependency>());
  const scope = useBinder().createScope<JavaProjectScope>({ kind: "project", name: props.artifactId, parent: useScope(), dependencies});

  function addDependency(dependency: JavaDependency) {
    const depKey = `${dependency.groupId}.${dependency.artifactId}.${dependency.version}`;

    if (dependencies.has(depKey)) {
      return depKey;
    }

    dependencies.set(depKey, dependency);
    return depKey;
  }

  const projectContext: ProjectContext = {
    scope,
    addDependency
  };

  return (
    <>
      <SourceDirectory path='src/main/java'>
        <ProjectContext.Provider value={projectContext}>
          <Scope value={scope}>
            {props.children}
          </Scope>
        </ProjectContext.Provider>
      </SourceDirectory>
      <SourceFile path='pom.xml' filetype='xml'>
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
              <maven.compiler.source>${props.javaVersion ?? 8}</maven.compiler.source>
              <maven.compiler.target>${props.javaVersion ?? 8}</maven.compiler.target>
              <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            </properties>
            ${dependencies.size > 0 ? code`
              ${'\n'}
              <dependencies>
                ${Array.from(dependencies.values()).map(dep => code`
                  <dependency>
                    <groupId>${dep.groupId}</groupId>
                    <artifactId>${dep.artifactId}</artifactId>
                    <version>${dep.version}</version>
                    <scope>${dep.scope ?? 'provided'}</scope>
                  </dependency>
                `)}
              </dependencies>
            ` : undefined}
   
          </project>
        `}
      </SourceFile>
    </>
  )
}