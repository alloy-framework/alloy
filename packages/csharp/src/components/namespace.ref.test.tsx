import { List, memberRefkey, namekey, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { ClassDeclaration } from "./class/declaration.jsx";
import { Namespace } from "./namespace.jsx";
import { SourceFile } from "./source-file/source-file.jsx";

it("references types in the same namespace", () => {
  const classRef = refkey();

  const tree = (
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          <ClassDeclaration name="TestClass" refkey={classRef} />
          <hbr />
          {classRef};
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
    namespace Test;

    class TestClass;
    TestClass;
  `);
});

it("references types in a parent namespace", () => {
  const classRef = refkey();

  const tree = (
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          <ClassDeclaration name="TestClass" refkey={classRef} />
          <hbr />
          <Namespace name="Nested">{classRef};</Namespace>
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
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

  const tree = (
    <Output>
      <Namespace name="Test">
        <SourceFile path="test.cs">
          {classRef};<hbr />
          <Namespace name="Nested">
            <ClassDeclaration name="TestClass" refkey={classRef} />
          </Namespace>
        </SourceFile>
      </Namespace>
    </Output>
  );

  expect(tree).toRenderTo(`
    namespace Test {
        Nested.TestClass;
        namespace Nested {
            class TestClass;
        }
    }
  `);
});

it("references types in a different top-level namespace declared in the same file", () => {
  const classRef = refkey();

  const tree = (
    <Output>
      <SourceFile path="test.cs">
        <Namespace name="TestCode1">{classRef}</Namespace>
        <hbr />
        <Namespace name="TestCode2">
          <ClassDeclaration name="TestClass" refkey={classRef} />
        </Namespace>
      </SourceFile>
    </Output>
  );

  expect(tree).toRenderTo(`
    using TestCode2;

    namespace TestCode1 {
        TestClass
    }
    namespace TestCode2 {
        class TestClass;
    }
  `);
});

it("references types in a different top-level namespace declared in a different file", () => {
  const classRef = refkey();

  const tree = (
    <Output>
      <SourceFile path="test.cs">
        <Namespace name="TestCode1">{classRef};</Namespace>
      </SourceFile>
      <SourceFile path="other.cs">
        <Namespace name="TestCode2">
          <ClassDeclaration name="TestClass" refkey={classRef} />
        </Namespace>
      </SourceFile>
    </Output>
  );

  expect(tree).toRenderTo({
    "test.cs": `
      using TestCode2;

      namespace TestCode1 {
          TestClass;
      }
    `,
    "other.cs": `
        namespace TestCode2 {
            class TestClass;
        }
      `,
  });
});

it("can be referenced by refkey", () => {
  const classRef = namekey("TestClass");
  const nsRef = namekey("TestCode2");
  const tree = (
    <Output>
      <SourceFile path="other.cs">
        <List>
          <Namespace name={nsRef}>
            <ClassDeclaration name={classRef} />
          </Namespace>
          <>{memberRefkey(nsRef, classRef)};</>
        </List>
      </SourceFile>
    </Output>
  );

  expect(tree).toRenderTo(`
    using TestCode2;

    namespace TestCode2 {
        class TestClass;
    }
    TestClass;
  `);
});
