import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { Output, render } from "@alloy-js/core";
import { ProjectDirectory } from "../src/components/index.js";
import { MavenProjectConfig } from "../src/index.js";
import { assertFileContents, findFile } from "./utils.js";
import { d } from "@alloy-js/core/testing";

it("generates barebones pom.xml file", () => {
  const projectConfig: MavenProjectConfig = {
    groupId: "me.example",
    artifactId: "test",
    version: "1.0.0",
    javaVersion: 8,
  };

  const res = render(
    <Output>
      <ProjectDirectory name='TestMavenProject' mavenProjectConfig={projectConfig}>
      </ProjectDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "pom.xml": `
      <?xml version="1.0" encoding="UTF-8"?>
      <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        
        <modelVersion>4.0.0</modelVersion>
        <groupId>me.example</groupId>
        <artifactId>test</artifactId>
        <version>1.0.0</version>
        
        <properties>
          <maven.compiler.source>8</maven.compiler.source>
          <maven.compiler.target>8</maven.compiler.target>
          <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        </properties>
  
      </project>
    `,
  });
});

it("generates complex configuration", () => {
  // Some fields are duplicate, just to show it can handle array data
  const projectConfig: MavenProjectConfig = {
    groupId: "me.example",
    artifactId: "test",
    version: "1.0.0",
    javaVersion: 8,
    repositories: [
      { id: "central", url: "https://repo.maven.apache.org/maven2" },
      { id: "central", url: "https://repo.maven.apache.org/maven2" },
    ],
    pluginRepositories: [
      { id: "central", url: "https://repo.maven.apache.org/maven2" },
      { id: "central", url: "https://repo.maven.apache.org/maven2" },
    ],
    build: {
      plugins: [
        {
          groupId: "org.apache.maven.plugins",
          artifactId: "maven-compiler-plugin",
          version: "3.8.1",
          executions: [
            {
              id: "default-compile",
              phase: "compile",
              goals: ["compile", "test"],
            },
            {
              id: "default-testCompile",
              phase: "test-compile",
              goals: ["testCompile", "test"],
            },
          ],
          configuration: {
            source: 8,
            target: 8,
          },
        },
        {
          groupId: "org.apache.maven.plugins",
          artifactId: "maven-compiler-plugin",
          version: "3.8.1",
          executions: [
            {
              id: "default-compile",
              phase: "compile",
              goals: ["compile", "test"],
            },
            {
              id: "default-testCompile",
              phase: "test-compile",
              goals: ["testCompile", "test"],
            },
          ],
          configuration: {
            source: 8,
            target: 8,
          },
        },
      ],
      resources: [
        {
          directory: "src/main/resources",
          filtering: true,
          targetPath: "target/classes",
          includes: ["**/*.properties", "**/*.xml"],
          excludes: ["**/*.xml", "**/*.json"],
        },
        {
          directory: "src/main/resources",
          filtering: true,
          targetPath: "target/classes",
          includes: ["**/*.properties", "**/*.xml"],
          excludes: ["**/*.xml", "**/*.json"],
        },
      ],
    },
  };

  const res = render(
    <Output>
      <ProjectDirectory name='TestMavenProject' mavenProjectConfig={projectConfig}>
      </ProjectDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "pom.xml": `
      <?xml version="1.0" encoding="UTF-8"?>
      <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        
        <modelVersion>4.0.0</modelVersion>
        <groupId>me.example</groupId>
        <artifactId>test</artifactId>
        <version>1.0.0</version>
        
        <properties>
          <maven.compiler.source>8</maven.compiler.source>
          <maven.compiler.target>8</maven.compiler.target>
          <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        </properties>

        <repositories>
          <repository>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
          </repository>
          <repository>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
          </repository>
        </repositories>
        
        <pluginRepositories>
          <pluginRepository>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
          </pluginRepository>
          <pluginRepository>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
          </pluginRepository>
        </pluginRepositories>

        <build>
          <plugins>
            <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-compiler-plugin</artifactId>
              <version>3.8.1</version>
              <executions>
                <execution>
                  <id>default-compile</id>
                  <phase>compile</phase>
                  <goals>
                    <goal>compile</goal>
                    <goal>test</goal>
                  </goals>
                </execution>
                <execution>
                  <id>default-testCompile</id>
                  <phase>test-compile</phase>
                  <goals>
                    <goal>testCompile</goal>
                    <goal>test</goal>
                  </goals>
                </execution>
              </executions>
              <configuration>
                <source>8</source>
                <target>8</target>
              </configuration>
            </plugin>
            <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-compiler-plugin</artifactId>
              <version>3.8.1</version>
              <executions>
                <execution>
                  <id>default-compile</id>
                  <phase>compile</phase>
                  <goals>
                    <goal>compile</goal>
                    <goal>test</goal>
                  </goals>
                </execution>
                <execution>
                  <id>default-testCompile</id>
                  <phase>test-compile</phase>
                  <goals>
                    <goal>testCompile</goal>
                    <goal>test</goal>
                  </goals>
                </execution>
              </executions>
              <configuration>
                <source>8</source>
                <target>8</target>
              </configuration>
            </plugin>
          </plugins>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
              <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
              </includes>
              <excludes>
                <exclude>**/*.xml</exclude>
                <exclude>**/*.json</exclude>
              </excludes>
              <filtering>true</filtering>
              <targetPath>target/classes</targetPath>
            </resource>
            <resource>
              <directory>src/main/resources</directory>
              <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
              </includes>
              <excludes>
                <exclude>**/*.xml</exclude>
                <exclude>**/*.json</exclude>
              </excludes>
              <filtering>true</filtering>
              <targetPath>target/classes</targetPath>
            </resource>
          </resources>
        </build>
        
      </project>
    `,
  });
});
