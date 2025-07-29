import { refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration } from "../class/declaration.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { Constructor } from "./constructor.jsx";

it("reference constructor parameters in body", () => {
  const paramNameRefkey = refkey();
  const paramSizeRefkey = refkey();

  const ctorParams = [
    { name: "name", type: "string", refkey: paramNameRefkey },
    { name: "size", type: "int", refkey: paramSizeRefkey },
  ];

  expect(
    <TestNamespace>
      <SourceFile path="Test.cs">
        <ClassDeclaration public name="TestClass">
          <Constructor public parameters={ctorParams}>
            {paramNameRefkey};<hbr />
            {paramSizeRefkey};
          </Constructor>
        </ClassDeclaration>
      </SourceFile>
    </TestNamespace>,
  ).toRenderTo(`
    namespace TestCode
    {
        public class TestClass
        {
            public TestClass(string name, int size)
            {
                name;
                size;
            }
        }
    }
  `);
});
