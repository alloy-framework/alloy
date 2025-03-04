import {
  Children,
  code,
  List,
  mapJoin,
  Show,
  SourceFile,
} from "@alloy-js/core";
import { MavenProjectConfig } from "../symbols/index.js";
import { useProject } from "./ProjectDirectory.js";

export interface MavenProjectProps {
  projectConfig: MavenProjectConfig;
}

/**
 * Represents a maven project. Use if you want to generate a Java project
 */
export function MavenProject(props: MavenProjectProps) {
  return <PomFile projectConfig={props.projectConfig} />;
}

export interface PomFileProps {
  projectConfig: MavenProjectConfig;
}

export function PomFile({ projectConfig }: PomFileProps) {
  const scope = useProject().scope;

  // The following spaghetti mess is so the final output is formatted correctly.
  // Needs to be this way for when some options aren't provided, there's no random whitespace,
  // and so that looped sections are indented correctly.
  return (
    <SourceFile path="pom.xml" filetype="xml">
      <PomFileRoot>
        <hbr />
        <List
          joiner={
            <>
              <hbr />
              <hbr />
            </>
          }
        >
          <PomFileMetadata projectConfig={projectConfig} />
          <PomFileProperties projectConfig={projectConfig} />
          {projectConfig.repositories && (
            <PomFileRepositories projectConfig={projectConfig} />
          )}
          {projectConfig.pluginRepositories && (
            <PomFilePluginRepositories projectConfig={projectConfig} />
          )}
          {scope.dependencies.size > 0 && (
            <PomFileDependencies projectConfig={projectConfig} />
          )}
          {projectConfig.build && (
            <PomFileBuild projectConfig={projectConfig} />
          )}
        </List>
      </PomFileRoot>
    </SourceFile>
  );
}

function PomFileRoot(props: { children: Children }) {
  return code`
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      ${props.children}
    </project>
  `;
}

function PomFileMetadata(props: PomFileProps) {
  return code`
    <modelVersion>4.0.0</modelVersion>
    <groupId>${props.projectConfig.groupId}</groupId>
    <artifactId>${props.projectConfig.artifactId}</artifactId>
    <version>${props.projectConfig.version}</version>
  `;
}

function PomFileProperties(props: PomFileProps) {
  return code`
    <properties>
      <maven.compiler.source>${props.projectConfig?.javaVersion}</maven.compiler.source>
      <maven.compiler.target>${props.projectConfig?.javaVersion}</maven.compiler.target>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
  `;
}

function PomFileRepositories(props: PomFileProps) {
  if (props.projectConfig.repositories === undefined) {
    return undefined;
  }

  return code`
    <repositories>
      ${mapJoin(
        () => props.projectConfig.repositories!,
        (repo) => code`
          <repository>
            <id>${repo.id}</id>
            <url>${repo.url}</url>
          </repository>
        `,
        { joiner: <hbr /> },
      )}
    </repositories>
  `;
}

function PomFilePluginRepositories(props: PomFileProps) {
  if (!props.projectConfig.pluginRepositories) {
    return "";
  }

  return code`
    <pluginRepositories>
      ${mapJoin(
        () => props.projectConfig.pluginRepositories!,
        (repo) => code`
          <pluginRepository>
            <id>${repo.id}</id>
            <url>${repo.url}</url>
          </pluginRepository>
        `,
        { joiner: <hbr /> },
      )}
    </pluginRepositories>
  `;
}

function PomFileDependencies(props: PomFileProps) {
  const scope = useProject().scope;
  return (
    <Show when={scope.dependencies.size > 0}>
      {code`
      <dependencies>${Array.from(scope.dependencies.values()).map(
        (dep) => code`
      
          <dependency>
            <groupId>${dep.groupId}</groupId>
            <artifactId>${dep.artifactId}</artifactId>
            ${dep.version !== undefined ? `<version>${dep.version}</version>` : undefined}
            <scope>${dep.scope ?? "provided"}</scope>
          </dependency>
        `,
      )}
      </dependencies>
    `}
    </Show>
  );
}

export function PomFileBuild(props: PomFileProps) {
  if (!props.projectConfig.build) {
    return "";
  }

  return code`
    <build>
      ${(<PomFileBuildPlugins {...props.projectConfig.build} />)}
      ${(<PomFileBuildResources {...props.projectConfig.build} />)}
    </build>
  `;
}

function PomFileBuildPlugins(props: MavenProjectConfig["build"]) {
  if (!props || !props.plugins) {
    return "";
  }

  return code`
    <plugins>
      ${mapJoin(
        () => props.plugins!,
        (plugin) => code`
          <plugin>
            <groupId>${plugin.groupId}</groupId>
            <artifactId>${plugin.artifactId}</artifactId>
            ${plugin.version !== undefined ? `<version>${plugin.version}</version>` : undefined}
            ${
              plugin.executions &&
              code`
              <executions>
                ${mapJoin(
                  () => plugin.executions!,
                  (execution) => code`
                  <execution>
                    ${execution.id ? `<id>${execution.id}</id>` : undefined}
                    ${execution.phase ? `<phase>${execution.phase}</phase>` : undefined}
                    ${
                      execution.goals &&
                      code`
                      <goals>
                        ${mapJoin(
                          () => execution.goals!,
                          (goal) => code`
                            <goal>${goal}</goal>
                          `,
                        )}
                      </goals>
                    `
                    }
                  </execution>
                `,
                )}
              </executions>
            `
            }${
              plugin.configuration &&
              code`

              <configuration>
                ${mapJoin(
                  () => Object.entries(plugin.configuration!),
                  ([key, value]) => code`
                      <${key}>${value}</${key}>
                  `,
                )}
              </configuration>
            `
            }
          </plugin>
        `,
      )}
    </plugins>
  `;
}

function PomFileBuildResources(props: MavenProjectConfig["build"]) {
  if (!props || !props.resources) {
    return "";
  }

  return code`
  <resources>
    ${mapJoin(
      () => props.resources!,
      (resource) => code`
        <resource>
          <directory>${resource.directory}</directory>${
            resource.includes &&
            code`

            <includes>${resource.includes.map(
              (include) => code`
            
                <include>${include}</include>
              `,
            )}
            </includes>
          `
          }${
            resource.excludes &&
            code`

            <excludes>${resource.excludes.map(
              (exclude) => code`
            
                <exclude>${exclude}</exclude>
              `,
            )}
            </excludes>
          `
          }${
            resource.filtering !== undefined ?
              `
<filtering>${resource.filtering}</filtering>`
            : undefined
          }${
            resource.targetPath !== undefined ?
              `
<targetPath>${resource.targetPath}</targetPath>`
            : undefined
          }
        </resource>
      `,
    )}
  </resources>
  `;
}
