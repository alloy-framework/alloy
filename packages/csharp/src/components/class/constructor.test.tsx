import { TestNamespace, toSourceText } from "#test/utils.jsx";
import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassConstructor } from "./constructor.jsx";
import { ClassDeclaration } from "./declaration.jsx";
import { ClassField } from "./field.jsx";

it("declares class with constructor", () => {
  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <ClassConstructor public />
    </ClassDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;
    
    public class TestClass
    {
        public TestClass() {}
    }
  `);
});

it("declares class with constructor params and assigns values to fields", () => {
  const thisNameRefkey = refkey();
  const thisSizeRefkey = refkey();
  const paramNameRefkey = refkey();
  const paramSizeRefkey = refkey();

  const ctorParams = [
    {
      name: "name",
      type: "string",
      refkey: paramNameRefkey,
    },
    {
      name: "size",
      type: "int",
      refkey: paramSizeRefkey,
    },
  ];

  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <ClassField private name="name" type="string" refkey={thisNameRefkey} />
      ;<hbr />
      <ClassField private name="size" type="int" refkey={thisSizeRefkey} />
      ;<hbr />
      <ClassConstructor public parameters={ctorParams}>
        {thisNameRefkey} = {paramNameRefkey};<hbr />
        {thisSizeRefkey} = {paramSizeRefkey};
      </ClassConstructor>
    </ClassDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;

    public class TestClass
    {
        private string name;
        private int size;
        public TestClass(string name, int size)
        {
            this.name = name;
            this.size = size;
        }
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test" doc="This is a test" />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    class Test;
  `);
});
