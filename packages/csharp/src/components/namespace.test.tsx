import { TestNamespace } from "#test/utils.jsx";
import { Output } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassDeclaration } from "./class/declaration.jsx";
import { Namespace } from "./namespace.jsx";
import { SourceFile } from "./source-file/source-file.jsx";

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

it("uses a name policy", () => {
  expect(
    <TestNamespace>
      <Namespace name="my-namespace" />
    </TestNamespace>,
  ).toRenderTo(`
    namespace MyNamespace {

    }
  `);
});
