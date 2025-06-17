import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { DocComment } from "../src/components/doc/comment.jsx";
import * as csharp from "../src/index.js";
import { ClassDeclaration } from "../src/index.js";
import * as utils from "./utils.js";

it("declares class with no members", () => {
  expect(
    <utils.TestNamespace>
      <ClassDeclaration name="TestClass" />
    </utils.TestNamespace>,
  ).toRenderTo(`
      class TestClass;
  `);
});

describe("modifiers", () => {
  it.each(["public", "private"])("%s", (mod) => {
    expect(
      <utils.TestNamespace>
        <ClassDeclaration {...{ [mod]: true }} name="TestClass" />
      </utils.TestNamespace>,
    ).toRenderTo(`
        ${mod} class TestClass;
    `);
  });

  it.each(["partial", "abstract", "static", "sealed"])("%s", (mod) => {
    expect(
      <utils.TestNamespace>
        <ClassDeclaration {...{ [mod]: true }} name="TestClass" />
      </utils.TestNamespace>,
    ).toRenderTo(`
        ${mod} class TestClass;
    `);
  });

  it("combines modifiers", () => {
    expect(
      <utils.TestNamespace>
        <ClassDeclaration public abstract partial name="TestClass" />
      </utils.TestNamespace>,
    ).toRenderTo(`
        public abstract partial class TestClass;
    `);
  });
});

it("declares class with some members", () => {
  const res = utils.toSourceText(
    <csharp.ClassDeclaration public name="TestClass">
      <core.StatementList>
        <csharp.ClassMember public name="MemberOne" type="string" />
        <csharp.ClassMember private name="MemberTwo" type="int" />
      </core.StatementList>
    </csharp.ClassDeclaration>,
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
    <csharp.ClassDeclaration public name="TestClass">
      <core.List>
        <csharp.ClassMethod public name="MethodOne" />
        <csharp.ClassMethod private virtual name="MethodTwo" />
      </core.List>
    </csharp.ClassDeclaration>,
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
          <csharp.EnumDeclaration
            public
            name="TestEnum"
            refkey={enumTypeRefkey}
          >
            <core.List comma hardline>
              <csharp.EnumMember name="One" />
              <csharp.EnumMember name="Two" />
            </core.List>
          </csharp.EnumDeclaration>
          <hbr />
          <csharp.ClassDeclaration
            public
            name="TestInput"
            refkey={inputTypeRefkey}
          />
          <hbr />
          <csharp.ClassDeclaration
            public
            name="TestResult"
            refkey={testResultTypeRefkey}
          />
          <hbr />
          <csharp.ClassDeclaration public name="TestClass">
            <csharp.ClassMember
              private
              name="MemberOne"
              type={enumTypeRefkey}
            />
            ;
            <hbr />
            <csharp.ClassMethod
              public
              name="MethodOne"
              parameters={params}
              returns={testResultTypeRefkey}
            >
              return new {testResultTypeRefkey}();
            </csharp.ClassMethod>
          </csharp.ClassDeclaration>
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
    <csharp.ClassDeclaration
      public
      name="TestClass"
      typeParameters={typeParameters}
    >
      <csharp.ClassMember public name="memberOne" type={typeParameters.T} />
      ;<hbr />
      <csharp.ClassMember private name="memberTwo" type={typeParameters.U} />;
    </csharp.ClassDeclaration>,
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
    <csharp.ClassDeclaration public name="TestClass">
      <csharp.EnumMember name="One" />,<hbr />
      <csharp.EnumMember name="Two" />
    </csharp.ClassDeclaration>
  );

  expect(() => utils.toSourceText(decl)).toThrow(
    "can't define an enum member outside of an enum-decl scope",
  );
});

it("declares class with constructor", () => {
  const res = utils.toSourceText(
    <csharp.ClassDeclaration public name="TestClass">
      <csharp.ClassConstructor public />
    </csharp.ClassDeclaration>,
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
    <csharp.ClassDeclaration public name="TestClass">
      <csharp.ClassMember
        private
        name="name"
        type="string"
        refkey={thisNameRefkey}
      />
      ;<hbr />
      <csharp.ClassMember
        private
        name="size"
        type="int"
        refkey={thisSizeRefkey}
      />
      ;<hbr />
      <csharp.ClassConstructor public parameters={ctorParams}>
        {thisNameRefkey} = {paramNameRefkey};<hbr />
        {thisSizeRefkey} = {paramSizeRefkey};
      </csharp.ClassConstructor>
    </csharp.ClassDeclaration>,
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

it("specify doc comment", () => {
  expect(
    <utils.TestNamespace>
      <ClassDeclaration
        name="Test"
        doc={<DocComment>This is a test class</DocComment>}
      />
    </utils.TestNamespace>,
  ).toRenderTo(`
    /// This is a test class
    class Test;
  `);
});
