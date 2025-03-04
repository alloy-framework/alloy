import * as core from "@alloy-js/core";
import { join } from "pathe";

// properties for creating the project directory
export interface ProjectDirectoryProps {
  // the name of the project directory
  name: string;

  // the semver of the project
  version: string;

  // project description
  description: string;

  // parent path where the project directory will be created
  path: string;

  // directory name for source files. defaults to "src"
  srcDir?: string;

  // the .NET TFM for this project. defaults to net8.0
  targetFrameworkMoniker?: string;

  // child components of the project
  children?: core.Children;
}

// the top-level C# project directory. includes a csproj file
export function ProjectDirectory(props: ProjectDirectoryProps) {
  if (!props.srcDir) {
    props.srcDir = "src";
  }

  if (!props.targetFrameworkMoniker) {
    props.targetFrameworkMoniker = "net8.0";
  }

  return (
    <core.SourceDirectory path={join(props.path, props.name)}>
      <core.SourceFile path={props.name + ".csproj"} filetype="xml">
        {core.code`
        <Project Sdk="Microsoft.NET.Sdk">
          <PropertyGroup>
            <Version>${props.version}</Version>
            <Description>${props.description}</Description>
            <TargetFramework>${props.targetFrameworkMoniker}</TargetFramework>
          </PropertyGroup>
        </Project>
      `}
      </core.SourceFile>
      <core.SourceDirectory path={props.srcDir}>
        {props.children}
      </core.SourceDirectory>
    </core.SourceDirectory>
  );
}
