import { Children, expect, it } from "vitest";
import { TestPackage } from "../../../test/utils.js";
import { TypeDeclaration } from "./declaration.js";

it("applies explicit public prop - public=true with lowercase name for types", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="myType" public={true}>string</TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type MyType string
  `);
});

it("applies explicit public prop - public=false with uppercase name for types", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="MyType" public={false}>string</TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type myType string
  `);
});

it("preserves original case when public prop is not specified for types", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="MixedCaseType">string</TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type MixedCaseType string
  `);
});

it("handles reserved words with public prop for types", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="type" public={true}>string</TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type Type_ string
  `);
});