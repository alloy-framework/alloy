import { EnumMember } from "#components/enum/member.jsx";
import { TestNamespace, toSourceText } from "#test/utils.jsx";
import { List, Output, refkey, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { createCSharpNamePolicy } from "../../name-policy.js";
import { EnumDeclaration } from "../enum/declaration.jsx";
import { Namespace } from "../namespace.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { ClassDeclaration } from "./declaration.jsx";
import { ClassField } from "./field.jsx";
import { ClassMethod } from "./method.jsx";

it("declares class with no members", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="TestClass" />
    </TestNamespace>,
  ).toRenderTo(`
      class TestClass;
  `);
});

describe("modifiers", () => {
  it.each(["public", "private"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <ClassDeclaration {...{ [mod]: true }} name="TestClass" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} class TestClass;
    `);
  });

  it.each(["partial", "abstract", "static", "sealed"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <ClassDeclaration {...{ [mod]: true }} name="TestClass" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} class TestClass;
    `);
  });

  it("combines modifiers", () => {
    expect(
      <TestNamespace>
        <ClassDeclaration public abstract partial name="TestClass" />
      </TestNamespace>,
    ).toRenderTo(`
        public abstract partial class TestClass;
    `);
  });
});

it("declares class with generic parameters", () => {
  const typeParameters = {
    T: refkey(),
    U: refkey(),
  };

  const res = toSourceText(
    <ClassDeclaration public name="TestClass" typeParameters={typeParameters}>
      <ClassField public name="memberOne" type={typeParameters.T} />
      ;<hbr />
      <ClassField private name="memberTwo" type={typeParameters.U} />;
    </ClassDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;
    
    public class TestClass<T, U>
    {
        public T MemberOne;
        private U memberTwo;
    }
  `);
});

it("declares class with invalid members", () => {
  const decl = (
    <ClassDeclaration public name="TestClass">
      <EnumMember name="One" />,<hbr />
      <EnumMember name="Two" />
    </ClassDeclaration>
  );

  expect(() => toSourceText(decl)).toThrow(
    "EnumMember can only be used within an enum scope",
  );
});

it("uses refkeys for members, params, and return type", () => {
  const inputTypeRefkey = refkey();
  const testResultTypeRefkey = refkey();
  const enumTypeRefkey = refkey();

  const params = [
    {
      name: "IntParam",
      type: "int",
    },
    {
      name: "BodyParam",
      type: inputTypeRefkey,
    },
  ];

  const res = render(
    <Output namePolicy={createCSharpNamePolicy()}>
      <Namespace name="TestCode">
        <SourceFile path="Test.cs">
          <EnumDeclaration public name="TestEnum" refkey={enumTypeRefkey}>
            <List comma hardline>
              <EnumMember name="One" />
              <EnumMember name="Two" />
            </List>
          </EnumDeclaration>
          <hbr />
          <ClassDeclaration public name="TestInput" refkey={inputTypeRefkey} />
          <hbr />
          <ClassDeclaration
            public
            name="TestResult"
            refkey={testResultTypeRefkey}
          />
          <hbr />
          <ClassDeclaration public name="TestClass">
            <ClassField private name="MemberOne" type={enumTypeRefkey} />
            ;
            <hbr />
            <ClassMethod
              public
              name="MethodOne"
              parameters={params}
              returns={testResultTypeRefkey}
            >
              return new {testResultTypeRefkey}();
            </ClassMethod>
          </ClassDeclaration>
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(res.contents[0].contents).toBe(d`
    namespace TestCode;
    
    public enum TestEnum
    {
        One,
        Two
    }
    public class TestInput;
    public class TestResult;
    public class TestClass
    {
        private TestEnum memberOne;
        public TestResult MethodOne(int intParam, TestInput bodyParam)
        {
            return new TestResult();
        }
    }
  `);
});
