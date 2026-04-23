import { refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration } from "../class/declaration.jsx";
import { DocSummary } from "../doc/comment.jsx";
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
      <ClassDeclaration public name="TestClass">
        <Constructor public parameters={ctorParams}>
          {paramNameRefkey};<hbr />
          {paramSizeRefkey};
        </Constructor>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class TestClass
    {
        public TestClass(string name, int size)
        {
            name;
            size;
        }
    }
  `);
});

it("renders doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration public name="TestClass">
        <Constructor
          public
          doc={<DocSummary>Creates a new instance</DocSummary>}
        >
          // body
        </Constructor>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class TestClass
    {
        /// <summary>
        /// Creates a new instance
        /// </summary>
        public TestClass()
        {
            // body
        }
    }
  `);
});

it("renders : base() initializer", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration public name="DerivedClass" baseType="BaseClass">
        <Constructor
          public
          parameters={[{ name: "name", type: "string" }]}
          baseConstructor={["name"]}
        >
          // body
        </Constructor>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class DerivedClass : BaseClass
    {
        public DerivedClass(string name) : base(name)
        {
            // body
        }
    }
  `);
});

it("renders : this() initializer", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration public name="MyClass">
        <Constructor public thisConstructor={["0", "0"]}>
          // body
        </Constructor>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class MyClass
    {
        public MyClass() : this(0, 0)
        {
            // body
        }
    }
  `);
});

it("renders : base() with no arguments", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration public name="DerivedClass" baseType="BaseClass">
        <Constructor public baseConstructor={[]}>
          // body
        </Constructor>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class DerivedClass : BaseClass
    {
        public DerivedClass() : base()
        {
            // body
        }
    }
  `);
});
