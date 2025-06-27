import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassDeclaration } from "./class/declaration.jsx";
import { Namespace } from "./namespace.jsx";
import { SourceFile } from "./SourceFile.jsx";

it("defines multiple namespaces and source files with unique content", () => {
  const res = render(
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
    </Output>,
  );

  expect(res.contents[0].path).equals("Model1.cs");
  expect(res.contents[0].contents).toBe(d`
    namespace Namespace1;
    
    public class Model1;
  `);

  expect(res.contents[1].path).equals("Model2.cs");
  expect(res.contents[1].contents).toBe(d`
    namespace Namespace1;

    public class Model2;
  `);

  expect(res.contents[2].path).equals("Model3.cs");
  expect(res.contents[2].contents).toBe(d`
    namespace Namespace2;
    
    public class Model3;
  `);

  expect(res.contents[3].path).equals("Model4.cs");
  expect(res.contents[3].contents).toBe(d`
    namespace Namespace2;
    
    public class Model4;
  `);
});
