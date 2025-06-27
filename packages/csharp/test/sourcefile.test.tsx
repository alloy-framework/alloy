import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassDeclaration } from "../src/components/class/declaration.jsx";
import { Namespace } from "../src/components/namespace.jsx";
import { SourceFile } from "../src/components/SourceFile.jsx";

it("defines multiple source files with unique content", () => {
  const res = render(
    <Output>
      <Namespace name="TestCode">
        <SourceFile path="Test1.cs">
          <ClassDeclaration public name="TestClass1" />
        </SourceFile>
        <SourceFile path="Test2.cs">
          <ClassDeclaration public name="TestClass2" />
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(res.contents[0].path).equals("Test1.cs");
  expect(res.contents[0].contents).toBe(d`
    namespace TestCode;

    public class TestClass1;
  `);

  expect(res.contents[1].path).equals("Test2.cs");
  expect(res.contents[1].contents).toBe(d`
    namespace TestCode;

    public class TestClass2;
  `);
});

it("omits namespace when the namespace is the global namespace", () => {
  const decl = (
    <Output>
      <SourceFile path="cs">
        <ClassDeclaration public name="TestClass2" />
      </SourceFile>
    </Output>
  );
  const res = render(decl);

  expect(res.contents[0].contents).toBe(d`
    public class TestClass2;
  `);
});
