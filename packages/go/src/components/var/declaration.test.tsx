import { Children, expect, it } from "vitest";
import { TestPackage } from "../../../test/utils.js";
import { VariableDeclaration, VariableDeclarationGroup } from "./declaration.js";

it("applies explicit public prop - public=true with lowercase name for variables", () => {
  expect(
    <TestPackage>
      <VariableDeclaration name="myVar" type="string" public={true} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    var MyVar string
  `);
});

it("applies explicit public prop - public=false with uppercase name for variables", () => {
  expect(
    <TestPackage>
      <VariableDeclaration name="MyVar" type="string" public={false} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    var myVar string
  `);
});

it("applies explicit public prop - public=true with const for variables", () => {
  expect(
    <TestPackage>
      <VariableDeclaration name="myConst" type="string" const={true} public={true} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    const MyConst string
  `);
});

it("preserves original case when public prop is not specified for variables", () => {
  expect(
    <TestPackage>
      <VariableDeclaration name="MixedCaseVar" type="string" />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    var MixedCaseVar string
  `);
});

it("handles reserved words with public prop for variables", () => {
  expect(
    <TestPackage>
      <VariableDeclaration name="type" type="string" public={true} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    var Type_ string
  `);
});