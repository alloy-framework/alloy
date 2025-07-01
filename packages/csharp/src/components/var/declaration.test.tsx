import { List, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { VarDeclaration } from "./declaration.jsx";

it("declares var without type", () => {
  expect(
    <TestNamespace>
      <VarDeclaration name="testVar">42</VarDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
      var testVar = 42;
  `);
});

it("declares var with type", () => {
  expect(
    <TestNamespace>
      <VarDeclaration name="testVar" type="int">
        42
      </VarDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
      int testVar = 42;
  `);
});

it("name variables camel case", () => {
  expect(
    <TestNamespace>
      <VarDeclaration name="test_var">42</VarDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
      var testVar = 42;
  `);
});

it("links refkey", () => {
  const key = refkey();
  expect(
    <TestNamespace>
      <SourceFile path="test.cs">
        <List>
          <VarDeclaration name="testVar" refkey={key}>
            42
          </VarDeclaration>
          <VarDeclaration name="testVar2">{key}</VarDeclaration>
        </List>
      </SourceFile>
    </TestNamespace>,
  ).toRenderTo(`
      namespace TestCode
      {
          var testVar = 42;
          var testVar2 = testVar;
      }
  `);
});
