import * as core from "@alloy-js/core";
import { List, refkey } from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Attribute } from "../src/components/attributes/attributes.jsx";
import { Field } from "../src/components/field/field.jsx";
import { Constructor } from "../src/components/stc/index.js";
import { TypeParameterProps } from "../src/components/type-parameters/type-parameter.jsx";
import * as csharp from "../src/index.js";
import { ClassDeclaration, Property, SourceFile } from "../src/index.js";
import * as utils from "./utils.jsx";

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

describe("base", () => {
  it("define base class", () => {
    expect(
      <utils.TestNamespace>
        <csharp.ClassDeclaration name="TestClass" baseType="Foo" />
      </utils.TestNamespace>,
    ).toRenderTo(`
        class TestClass : Foo;
    `);
  });

  it("define multiple interface types", () => {
    expect(
      <utils.TestNamespace>
        <csharp.ClassDeclaration
          name="TestClass"
          interfaceTypes={["Foo", "Bar"]}
        />
      </utils.TestNamespace>,
    ).toRenderTo(`
        class TestClass : Foo, Bar;
    `);
  });

  it("define base class and multiple interface types", () => {
    expect(
      <utils.TestNamespace>
        <csharp.ClassDeclaration
          name="TestClass"
          baseType="BaseClass"
          interfaceTypes={["Foo", "Bar"]}
        />
      </utils.TestNamespace>,
    ).toRenderTo(`
        class TestClass : BaseClass, Foo, Bar;
    `);
  });
});

it("declares class with some members", () => {
  const res = utils.toSourceText(
    <csharp.ClassDeclaration public name="TestClass">
      <List>
        <Field public name="MemberOne" type="string" />
        <Field public name="MemberTwo" type="int" />
      </List>
    </csharp.ClassDeclaration>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass
        {
            public string MemberOne;
            public int MemberTwo;
        }
    }
  `);
});

it("declares class with some methods", () => {
  const res = utils.toSourceText(
    <csharp.ClassDeclaration public name="TestClass">
      <core.List>
        <csharp.Method public name="MethodOne" />
        <csharp.Method private virtual name="MethodTwo" />
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
            <Field private name="MemberOne" type={enumTypeRefkey} />
            <hbr />
            <csharp.Method
              public
              name="MethodOne"
              parameters={params}
              returns={testResultTypeRefkey}
            >
              return new {testResultTypeRefkey}();
            </csharp.Method>
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
            private TestEnum _memberOne;
            public TestResult MethodOne(int intParam, TestInput bodyParam)
            {
                return new TestResult();
            }
        }
    }
  `);
});

describe("with type parameters", () => {
  it("reference parameters", () => {
    const typeParameters: TypeParameterProps[] = [
      {
        name: "T",
        refkey: refkey(),
      },
      {
        name: "U",
        refkey: refkey(),
      },
    ];

    expect(
      <utils.TestNamespace>
        <SourceFile path="Test.cs">
          <ClassDeclaration
            public
            name="TestClass"
            typeParameters={typeParameters}
          >
            <List>
              <Property name="PropA" type={typeParameters[0].refkey} get set />
              <Property name="PropB" type={typeParameters[1].refkey} get set />
            </List>
          </ClassDeclaration>
        </SourceFile>
      </utils.TestNamespace>,
    ).toRenderTo(`
      namespace TestCode
      {
          public class TestClass<T, U>
          {
              T PropA { get; set; }
              U PropB { get; set; }
          }
      }
    `);
  });

  it("defines with constraints", () => {
    const typeParameters: TypeParameterProps[] = [
      {
        name: "T",
        constraints: "IFoo",
      },
      {
        name: "U",
        constraints: "IBar",
      },
    ];

    expect(
      <utils.TestNamespace>
        <ClassDeclaration
          public
          name="TestClass"
          typeParameters={typeParameters}
        >
          // Body
        </ClassDeclaration>
      </utils.TestNamespace>,
    ).toRenderTo(`
      public class TestClass<T, U>
        where T : IFoo
        where U : IBar
      {
        // Body
      }
    `);
  });
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
      <Constructor public />
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
      <Field private name="name" type="string" refkey={thisNameRefkey} />
      <hbr />
      <Field private name="size" type="int" refkey={thisSizeRefkey} />
      <hbr />
      <Constructor public parameters={ctorParams}>
        {thisNameRefkey} = {paramNameRefkey};<hbr />
        {thisSizeRefkey} = {paramSizeRefkey};
      </Constructor>
    </csharp.ClassDeclaration>,
  );

  // TODO: assignments to members should have this. prefix
  // e.g. this.name = name;
  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass
        {
            private string _name;
            private int _size;
            public TestClass(string name, int size)
            {
                _name = name;
                _size = size;
            }
        }
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <utils.TestNamespace>
      <ClassDeclaration name="Test" doc="This is a test" />
    </utils.TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    class Test;
  `);
});

it("supports class member doc comments", () => {
  expect(
    <utils.TestNamespace>
      <ClassDeclaration name="Test" doc="This is a test">
        <Field name="Member" public type="int" doc="This is a member" />
      </ClassDeclaration>
    </utils.TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    class Test
    {
      /// This is a member
      public int Member;
    }
  `);
});

it("specify attributes", () => {
  expect(
    <utils.TestNamespace>
      <ClassDeclaration name="Test" attributes={[<Attribute name="Test" />]} />
    </utils.TestNamespace>,
  ).toRenderTo(`
    [Test]
    class Test;
  `);
});
