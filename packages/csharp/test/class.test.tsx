import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";
import * as utils from "./utils.js";

it("declares class with no members", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier='public' name="TestClass" />,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass;
    }
  `);
});

it("declares class with some members", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier='public' name="TestClass">
      <csharp.ClassMember accessModifier="public" name="MemberOne" type="string" />
      <csharp.ClassMember accessModifier="private" name="MemberTwo" type="int" />
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass
      {
        public string memberOne;
        private int memberTwo;
      }
    }
  `);
});

it("declares class with some methods", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier='public' name="TestClass">
      <csharp.ClassMethod accessModifier="public" name="MethodOne" />
      <csharp.ClassMethod accessModifier="private" methodModifier="virtual" name="MethodTwo" />
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass
      {
        public void MethodOne() {}
        private virtual void MethodTwo() {}
      }
    }
  `);
});

it("declares class with params and return type", () => {
  const params = {
    IntParam: "int",
    StringParam: "string",
  };
  const res = utils.toSourceText(
    <csharp.Class accessModifier='public' name="TestClass">
      <csharp.ClassMethod accessModifier="public" name="MethodOne" parameters={params} returns="string" />
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass
      {
        public string MethodOne(int intParam, string stringParam) {}
      }
    }
  `);
});

it("uses refkeys for members, params, and return type", () => {
  const inputTypeRefkey = core.refkey();
  const params = {
    IntParam: "int",
    BodyParam: inputTypeRefkey,
  };

  const res = core.render(
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.Namespace name='TestCode'>
        <csharp.SourceFile path="Test.cs">
          <csharp.Enum accessModifier='public' name="TestEnum">
            <csharp.EnumMember name="One" />,
            <csharp.EnumMember name="Two" />
          </csharp.Enum>
          <csharp.Class accessModifier="public" name="TestInput" refkey={inputTypeRefkey} />
          <csharp.Class accessModifier="public" name="TestResult" />
          <csharp.Class accessModifier='public' name="TestClass">
            <csharp.ClassMember accessModifier="private" name="MemberOne" type={core.refkey("TestEnum")} />
            <csharp.ClassMethod accessModifier="public" name="MethodOne" parameters={params} returns={core.refkey("TestResult")}>
              return new {core.refkey("TestResult")}();
            </csharp.ClassMethod>
          </csharp.Class>
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].contents).toBe(coretest.d`
    namespace TestCode
    {
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
    }
  `);
});

it("declares class with generic parameters", () => {
  const typeParameters = {
    T: core.refkey(),
    U: core.refkey(),
  };

  const res = utils.toSourceText(
    <csharp.Class accessModifier='public' name="TestClass" typeParameters={typeParameters}>
      <csharp.ClassMember accessModifier="public" name="MemberOne" type={typeParameters.T} />
      <csharp.ClassMember accessModifier="private" name="MemberTwo" type={typeParameters.U} />
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass<T, U>
      {
        public T memberOne;
        private U memberTwo;
      }
    }
  `);
});

it("declares class with invalid members", () => {
  const decl =
    <csharp.Class accessModifier='public' name="TestClass">
      <csharp.EnumMember name="One" />,
      <csharp.EnumMember name="Two" />
    </csharp.Class>;

  expect(() => utils.toSourceText(decl)).toThrow(
    "can't define an enum member outside of an enum scope",
  );
});
