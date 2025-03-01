import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";
import * as utils from "./utils.js";

it("declares class with no members", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier="public" name="TestClass" />,
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
    <csharp.Class accessModifier="public" name="TestClass">
      <core.StatementList>
        <csharp.ClassMember
          accessModifier="public"
          name="MemberOne"
          type="string"
        />
        <csharp.ClassMember
          accessModifier="private"
          name="MemberTwo"
          type="int"
        />
      </core.StatementList>
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass
        {
            public string MemberOne;
            private int memberTwo;
        }
    }
  `);
});

it("declares class with some methods", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier="public" name="TestClass">
      <core.List>
        <csharp.ClassMethod accessModifier="public" name="MethodOne" />
        <csharp.ClassMethod
          accessModifier="private"
          methodModifier="virtual"
          name="MethodTwo"
        />
      </core.List>
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
  const params = [
    {
      name: "IntParam",
      type: "int",
    },
    {
      name: "StringParam",
      type: "string",
    },
  ];
  const res = utils.toSourceText(
    <csharp.Class accessModifier="public" name="TestClass">
      <csharp.ClassMethod
        accessModifier="public"
        name="MethodOne"
        parameters={params}
        returns="string"
      />
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
  const testResultTypeRefkey = core.refkey();
  const enumTypeRefkey = core.refkey();

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

  const res = core.render(
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.Namespace name="TestCode">
        <csharp.SourceFile path="Test.cs">
          <csharp.Enum
            accessModifier="public"
            name="TestEnum"
            refkey={enumTypeRefkey}
          >
            <core.List comma hardline>
              <csharp.EnumMember name="One" />
              <csharp.EnumMember name="Two" />
            </core.List>
          </csharp.Enum>
          <hbr />
          <csharp.Class
            accessModifier="public"
            name="TestInput"
            refkey={inputTypeRefkey}
          />
          <hbr />
          <csharp.Class
            accessModifier="public"
            name="TestResult"
            refkey={testResultTypeRefkey}
          />
          <hbr />
          <csharp.Class accessModifier="public" name="TestClass">
            <csharp.ClassMember
              accessModifier="private"
              name="MemberOne"
              type={enumTypeRefkey}
            />
            ;
            <hbr />
            <csharp.ClassMethod
              accessModifier="public"
              name="MethodOne"
              parameters={params}
              returns={testResultTypeRefkey}
            >
              return new {testResultTypeRefkey}();
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
    <csharp.Class
      accessModifier="public"
      name="TestClass"
      typeParameters={typeParameters}
    >
      <csharp.ClassMember
        accessModifier="public"
        name="memberOne"
        type={typeParameters.T}
      />
      ;<hbr />
      <csharp.ClassMember
        accessModifier="private"
        name="memberTwo"
        type={typeParameters.U}
      />
      ;
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass<T, U>
        {
            public T MemberOne;
            private U memberTwo;
        }
    }
  `);
});

it("declares class with invalid members", () => {
  const decl = (
    <csharp.Class accessModifier="public" name="TestClass">
      <csharp.EnumMember name="One" />,<hbr />
      <csharp.EnumMember name="Two" />
    </csharp.Class>
  );

  expect(() => utils.toSourceText(decl)).toThrow(
    "can't define an enum member outside of an enum-decl scope",
  );
});

it("declares class with constructor", () => {
  const res = utils.toSourceText(
    <csharp.Class accessModifier="public" name="TestClass">
      <csharp.ClassConstructor accessModifier="public" />
    </csharp.Class>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass
        {
            public TestClass() {}
        }
    }
  `);
});

it("declares class with constructor params and assigns values to fields", () => {
  const thisNameRefkey = core.refkey();
  const thisSizeRefkey = core.refkey();
  const paramNameRefkey = core.refkey();
  const paramSizeRefkey = core.refkey();

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

  const res = utils.toSourceText(
    <csharp.Class accessModifier="public" name="TestClass">
      <csharp.ClassMember
        accessModifier="private"
        name="name"
        type="string"
        refkey={thisNameRefkey}
      />
      ;<hbr />
      <csharp.ClassMember
        accessModifier="private"
        name="size"
        type="int"
        refkey={thisSizeRefkey}
      />
      ;<hbr />
      <csharp.ClassConstructor accessModifier="public" parameters={ctorParams}>
        {thisNameRefkey} = {paramNameRefkey};<hbr />
        {thisSizeRefkey} = {paramSizeRefkey};
      </csharp.ClassConstructor>
    </csharp.Class>,
  );

  // TODO: assignments to members should have this. prefix
  // e.g. this.name = name;
  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass
        {
            private string name;
            private int size;
            public TestClass(string name, int size)
            {
                name = name;
                size = size;
            }
        }
    }
  `);
});
