import { expect, it } from "vitest";
import { ItemGroup, PackageReference, PropertyGroup } from "./index.jsx";

it("renders ItemGroup", () => {
  expect(<ItemGroup Label="MyLabel">Content</ItemGroup>).toRenderTo(`
        <ItemGroup Label="MyLabel">Content</ItemGroup>
    `);
});

it("renders PropertyGroup", () => {
  expect(<PropertyGroup Label="MyLabel">Content</PropertyGroup>).toRenderTo(`
        <PropertyGroup Label="MyLabel">Content</PropertyGroup>
    `);
});

it("renders package reference", () => {
  expect(<PackageReference Include="Newtonsoft.Json" Version="13.0.1" />)
    .toRenderTo(`
        <PackageReference Include="Newtonsoft.Json" Version="13.0.1" />
    `);
});
