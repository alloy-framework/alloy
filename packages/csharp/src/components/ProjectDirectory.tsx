import * as core from "@alloy-js/core";

export interface ProjectDirectoryProps {
  name: string;
  version: string;
  description: string;
  srcDir?: string;
  children?: core.Children;
}

// the top-level C# project directory. includes a csproj file
export function ProjectDirectory(props: ProjectDirectoryProps) {
  if (!props.srcDir) {
    props.srcDir = "src";
  }

  return <>
      <core.SourceFile path={props.name+".csproj"} filetype="xml">
        {core.code`
          <Project Sdk="Microsoft.NET.Sdk">
            <PropertyGroup>
              <Version>${props.version}</Version>
              <Description>${props.description}</Description>
            </PropertyGroup>
          </Project>
        `}
      </core.SourceFile>
      <core.SourceDirectory path={props.srcDir}>
        {props.children}
      </core.SourceDirectory>
    </>;
}
