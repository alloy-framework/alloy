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
import { JavaProjectScope } from "../symbols.js";

export interface ProjectContext {
  scope: JavaProjectScope;
  addDependency(groupId: string, artifactId: string, version: string): void; // TODO
}

export const ProjectContext = createContext<ProjectContext>();
export function useProject() {
  return useContext(ProjectContext)!;
}

export interface ProjectDirectoryProps {
  groupId: string;
  artifactId: string; // Also name of project
  version: string;
  children?: Children;
}

/**
 * Represents a java project directory. Use if you want to generate a Java project
 * with a build tool included (maven, gradle etc).
 *
 * TODO: What java version are we basing off?
 * TODO: Manage external deps and import through pom.xml
 */
export function ProjectDirectory(props: ProjectDirectoryProps) {
  const scope = useBinder().createScope<JavaProjectScope>({ kind: "project", name: props.artifactId, parent: useScope()});

  function addDependency(groupId: string, artifactId: string, version: string) {
    // TODO: Add deps to be imported from pom.xml or gradle file
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
              <maven.compiler.source>17</maven.compiler.source>
              <maven.compiler.target>17</maven.compiler.target>
              <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            </properties>
    
          </project>
        `}
      </SourceFile>
    </>
  )
}