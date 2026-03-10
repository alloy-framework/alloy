import { TestNamespace } from "#test/utils.jsx";
import { Output, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createCSharpNamePolicy } from "../../name-policy.js";
import { ClassDeclaration } from "../class/declaration.jsx";
import { Constructor } from "../constructor/constructor.jsx";
import { Field } from "../field/field.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { StructDeclaration } from "../struct/declaration.jsx";
import { Namespace } from "./namespace.jsx";

it("defines multiple namespaces and source files with unique content", () => {
  const tree = (
    <Output>
      <Namespace name="Namespace1">
        <SourceFile path="Model1.cs">
          <ClassDeclaration public name="Model1" />
        </SourceFile>
        <SourceFile path="Model2.cs">
          <ClassDeclaration public name="Model2" />
        </SourceFile>
      </Namespace>
      <Namespace name="Namespace2">
        <SourceFile path="Model3.cs">
          <ClassDeclaration public name="Model3" />
        </SourceFile>
        <SourceFile path="Model4.cs">
          <ClassDeclaration public name="Model4" />
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo({
    "Model1.cs": d`
      namespace Namespace1;

      public class Model1;
    `,
    "Model2.cs": d`
      namespace Namespace1;

      public class Model2;
    `,
    "Model3.cs": d`
      namespace Namespace2;
      
      public class Model3;
    `,
    "Model4.cs": d`
      namespace Namespace2;
      
      public class Model4;
    `,
  });
});

it("nest namespaces", () => {
  const tree = (
    <Output>
      <Namespace name={["Namespace1"]}>
        <Namespace name={["Namespace2"]}>
          <SourceFile path="Model1.cs">
            <ClassDeclaration public name="Model1" />
          </SourceFile>
        </Namespace>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
    namespace Namespace1.Namespace2;

    public class Model1;
  `);
});

it("define nested namespace directly with array", () => {
  const tree = (
    <Output>
      <Namespace name={["Namespace1", "Namespace2"]}>
        <SourceFile path="Model1.cs">
          <ClassDeclaration public name="Model1" />
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
    namespace Namespace1.Namespace2;

    public class Model1;
  `);
});

it("define nested namespace directly as dotted notation", () => {
  const tree = (
    <Output>
      <Namespace name="Namespace1.Namespace2">
        <SourceFile path="Model1.cs">
          <ClassDeclaration public name="Model1" />
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo({
    "Model1.cs": d`
      namespace Namespace1.Namespace2;

      public class Model1;
    `,
  });
});

it("uses a name policy", () => {
  expect(
    <TestNamespace>
      <Namespace name="my-namespace" />
    </TestNamespace>,
  ).toRenderTo(`
    namespace MyNamespace {}
  `);
});

it("define nested namespace in sourcefile", () => {
  const tree = (
    <Output>
      <Namespace name="Base">
        <SourceFile path="Model1.cs">
          <Namespace name="Namespace1.Namespace2">
            <ClassDeclaration public name="Model1" />
          </Namespace>
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
    namespace Base {
        namespace Namespace1.Namespace2 {
            public class Model1;
        }
    }
  `);
});

it("contains a struct with a private field initialized by a constructor", () => {
  const fieldRefkey = refkey();
  const paramRefkey = refkey();

  const tree = (
    <Output namePolicy={createCSharpNamePolicy()}>
      <SourceFile path="MyStruct.cs">
        <Namespace name="TestNamespace.Test">
          <StructDeclaration public name="MyStruct">
            <Field private name="value" type="int" refkey={fieldRefkey} />
            <hbr />
            <Constructor
              public
              parameters={[{ name: "value", type: "int", refkey: paramRefkey }]}
            >
              {fieldRefkey} = {paramRefkey};
            </Constructor>
          </StructDeclaration>
        </Namespace>
      </SourceFile>
    </Output>
  );

  expect(tree).toRenderTo(d`
    namespace TestNamespace.Test {
        public struct MyStruct
        {
            private int _value;
            public MyStruct(int value)
            {
                _value = value;
            }
        }
    }
  `);
});
