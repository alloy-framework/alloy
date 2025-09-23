import { Children, SourceFile } from "@alloy-js/core";
import { Project } from "@alloy-js/msbuild/components";

export type CSharpProjectSdk =
  | "Microsoft.NET.Sdk"
  | "Microsoft.NET.Sdk.Web"
  | "Microsoft.NET.Sdk.Worker"
  | "Microsoft.NET.Sdk.Razor"
  | "Microsoft.NET.Sdk.BlazorWebAssembly"
  | "Aspire.AppHost.Sdk"
  | "MSTest.Sdk";

export interface CsprojProps {
  path: `${string}.csproj`;
  /**
   * Project SDK https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview
   * @default "Microsoft.NET.Sdk"
   */
  sdk?: CSharpProjectSdk;

  /** Content inside <project> */
  children?: Children;
}

/** Create a .csproj file */
export function CsprojFile(props: CsprojProps) {
  return (
    <SourceFile path={props.path} filetype="xml" tabWidth={2}>
      <Project Sdk={props.sdk ?? "Microsoft.NET.Sdk"}>{props.children}</Project>
    </SourceFile>
  );
}
