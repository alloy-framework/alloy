import { Compile, ItemGroup } from "@alloy-js/msbuild/components";
import { expect, it } from "vitest";
import { CsprojFile } from "./csproj-file.jsx";

it("create empty .csproj file", () => {
  expect(<CsprojFile path={"foo.csproj"}>{"<!-- content -->"}</CsprojFile>)
    .toRenderTo(`
    <Project Sdk="Microsoft.NET.Sdk"><!-- content --></Project>
  `);
});

it("set different sdk", () => {
  expect(
    <CsprojFile path={"foo.csproj"} sdk="Microsoft.NET.Sdk.Web">
      {"<!-- content -->"}
    </CsprojFile>,
  ).toRenderTo(`
    <Project Sdk="Microsoft.NET.Sdk.Web"><!-- content --></Project>
  `);
});

it("can use msbuild components", () => {
  expect(
    <CsprojFile path={"foo.csproj"} sdk="Microsoft.NET.Sdk.Web">
      <ItemGroup>
        <Compile Include="Program.cs" />
        <Compile Include="Other.cs" />
      </ItemGroup>
    </CsprojFile>,
  ).toRenderTo(`
    <Project Sdk="Microsoft.NET.Sdk.Web">
      <ItemGroup>
        <Compile Include="Program.cs" />
        <Compile Include="Other.cs" />
      </ItemGroup>
    </Project>
  `);
});
