import { MavenProjectConfig } from "../symbols/index.js";
import { code, Indent, SourceFile } from "@alloy-js/core";
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
  return <SourceFile path="pom.xml" filetype="xml">
      {code`
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
                 
           ${<Indent>
              {code`
                <modelVersion>4.0.0</modelVersion>
                <groupId>${projectConfig.groupId}</groupId>
                <artifactId>${projectConfig.artifactId}</artifactId>
                <version>${projectConfig.version}</version>
        
                <properties>
                  <maven.compiler.source>${projectConfig?.javaVersion}</maven.compiler.source>
                  <maven.compiler.target>${projectConfig?.javaVersion}</maven.compiler.target>
                  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
                </properties>
              `}
          </Indent>}${projectConfig?.repositories && code`
  
  
            <repositories>${projectConfig?.repositories.map(repo => code`
            
                <repository>
                  <id>${repo.id}</id>
                  <url>${repo.url}</url>
                </repository>
              `)}
            </repositories>
          `}${<Indent>{projectConfig?.pluginRepositories && code`


            <pluginRepositories>${projectConfig?.pluginRepositories.map(repo => code`
            
                <pluginRepository>
                  <id>${repo.id}</id>
                  <url>${repo.url}</url>
                </pluginRepository>
              `)}
            </pluginRepositories>
          `}</Indent>}${scope.dependencies.size > 0 ? code`
          
          
            <dependencies>${Array.from(scope.dependencies.values()).map(dep => code`
            
                <dependency>
                  <groupId>${dep.groupId}</groupId>
                  <artifactId>${dep.artifactId}</artifactId>
                  ${dep.version !== undefined ? `<version>${dep.version}</version>` : undefined}
                  <scope>${dep.scope ?? "provided"}</scope>
                </dependency>
              `)}
            </dependencies>
          ` : undefined}${projectConfig?.build && code`
          
          
            <build>
              ${projectConfig?.build?.plugins && code`
                <plugins>${projectConfig?.build?.plugins.map(plugin => code`
                
                    <plugin>
                      <groupId>${plugin.groupId}</groupId>
                      <artifactId>${plugin.artifactId}</artifactId>
                      ${plugin.version !== undefined ? `<version>${plugin.version}</version>` : undefined}
                      ${plugin.executions && code`
                        <executions>${plugin.executions.map(execution => code`
                        
                            <execution>
                              ${execution.id ? `<id>${execution.id}</id>` : undefined}
                              ${execution.phase ? `<phase>${execution.phase}</phase>` : undefined}
                              ${execution.goals && code`
                                <goals>${execution.goals.map(goal => code`
                                
                                    <goal>${goal}</goal>
                                  `)}
                                </goals>
                              `}
                            </execution>
                          `)}
                        </executions>
                      `}${plugin.configuration && code`

                        <configuration>${Object.entries(plugin.configuration).map(([key, value]) => code`
                            
                              <${key}>${value}</${key}>
                          `)}
                        </configuration>
                      `}
                    </plugin>
                  `)}
                </plugins>
              `}${projectConfig?.build?.resources && code`

                <resources>${projectConfig?.build?.resources.map(resource => code`
                
                    <resource>
                      <directory>${resource.directory}</directory>${resource.includes && code`

                        <includes>${resource.includes.map(include => code`
                        
                            <include>${include}</include>
                          `)}
                        </includes>
                      `}${resource.excludes && code`

                        <excludes>${resource.excludes.map(exclude => code`
                        
                            <exclude>${exclude}</exclude>
                          `)}
                        </excludes>
                      `}${resource.filtering !== undefined ? `
<filtering>${resource.filtering}</filtering>` : undefined}${resource.targetPath !== undefined ? `
<targetPath>${resource.targetPath}</targetPath>` : undefined}
                    </resource>
                  `)}
                </resources>
              `}
            </build>
          `}
          
        </project>
      `}
  </SourceFile>;
}
