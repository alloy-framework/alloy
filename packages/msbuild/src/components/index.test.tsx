import { describe, expect, it } from "vitest";
import { ItemGroup, PackageReference, PropertyGroup } from "./index.jsx";

describe("ItemGroup", () => {
  it("renders with children", () => {
    expect(<ItemGroup>Content</ItemGroup>).toRenderTo(`
        <ItemGroup>Content</ItemGroup>
    `);
  });
  it("renders with label and children", () => {
    expect(<ItemGroup Label="MyLabel">Content</ItemGroup>).toRenderTo(`
        <ItemGroup Label="MyLabel">Content</ItemGroup>
    `);
  });
});
describe("PropertyGroup", () => {
  it("renders with children", () => {
    expect(<PropertyGroup>Content</PropertyGroup>).toRenderTo(`
        <PropertyGroup>Content</PropertyGroup>
    `);
  });
  it("renders with label and children", () => {
    expect(<PropertyGroup Label="MyLabel">Content</PropertyGroup>).toRenderTo(`
        <PropertyGroup Label="MyLabel">Content</PropertyGroup>
    `);
  });
});

it("renders package reference", () => {
  expect(<PackageReference Include="Newtonsoft.Json" Version="13.0.1" />)
    .toRenderTo(`
        <PackageReference Include="Newtonsoft.Json" Version="13.0.1" />
    `);
});
