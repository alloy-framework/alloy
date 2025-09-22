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
