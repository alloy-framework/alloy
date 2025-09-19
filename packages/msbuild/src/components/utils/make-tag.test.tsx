import { expect, it } from "vitest";
import { makeTag } from "./make-tag.jsx";

const ItemGroup = makeTag<{ Label?: string }>("ItemGroup");

it("renders with children", () => {
  expect(<ItemGroup>Content</ItemGroup>).toRenderTo(`
        <ItemGroup>Content</ItemGroup>
    `);
});

it("renders with attribute only", () => {
  expect(<ItemGroup Label="MyLabel">Content</ItemGroup>).toRenderTo(`
        <ItemGroup Label="MyLabel">Content</ItemGroup>
    `);
});

it("renders with attribute and children", () => {
  expect(<ItemGroup Label="MyLabel" />).toRenderTo(`
        <ItemGroup Label="MyLabel" />
    `);
});
