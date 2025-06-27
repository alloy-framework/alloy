import { Output, refkey, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassDeclaration } from "./class/declaration.jsx";
import { Namespace } from "./namespace.jsx";
import { SourceFile } from "./SourceFile.jsx";

it("references types in the same namespace", () => {
  const classRef = refkey();

  const res = render(
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          <ClassDeclaration name="TestClass" refkey={classRef} />
          <hbr />
          {classRef};
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(res.contents[0].contents).toBe(d`
    namespace Test;

    class TestClass;
    TestClass;
  `);
});

it("references types in a parent namespace", () => {
  const classRef = refkey();

  const res = render(
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          <ClassDeclaration name="TestClass" refkey={classRef} />
          <hbr />
          <Namespace name="Nested">{classRef};</Namespace>
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(res.contents[0].contents).toBe(d`
    namespace Test {
        class TestClass;
        namespace Nested {
            TestClass;
        }
    }
  `);
});

it("references types in a child namespace", () => {
  const classRef = refkey();

  const res = render(
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          {classRef};<hbr />
          <Namespace name="Nested">
            <ClassDeclaration name="TestClass" refkey={classRef} />
          </Namespace>
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(res.contents[0].contents).toBe(d`
    namespace Test {
        Nested.TestClass;
        namespace Nested {
            class TestClass;
        }
    }
  `);
});
