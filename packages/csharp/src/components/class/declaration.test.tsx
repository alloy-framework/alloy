import {
  Children,
  code,
  createNamePolicy,
  List,
  NamePolicyContext,
  Output,
  refkey,
  render,
} from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { findFile, TestNamespace, toSourceText } from "../../../test/utils.jsx";
import { createCSharpNamePolicy } from "../../name-policy.js";
import { Attribute } from "../attributes/attributes.jsx";
import { Field } from "../field/field.jsx";
import { Method } from "../method/method.jsx";
import { Namespace } from "../Namespace.jsx";
import { Property } from "../property/property.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { Constructor, EnumDeclaration, EnumMember } from "../stc/index.js";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { ClassDeclaration } from "./declaration.jsx";

function Wrapper({ children }: { children: Children }) {
  return (
    <TestNamespace>
      <SourceFile path="Test.cs">{children}</SourceFile>
    </TestNamespace>
  );
}

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

  it("places visibility, attributes, and modifiers in the correct order", () => {
    expect(
      <TestNamespace>
        <ClassDeclaration
          partial
          public
          abstract
          sealed
          name="TestClass"
          attributes={[<Attribute name="Test" />]}
        />
      </TestNamespace>,
    ).toRenderTo(`
        [Test]
        public abstract partial class TestClass;
    `);
  });
});

describe("base", () => {
  it("define base class", () => {
    expect(
      <TestNamespace>
        <ClassDeclaration name="TestClass" baseType="Foo" />
      </TestNamespace>,
    ).toRenderTo(`
        class TestClass : Foo;
    `);
  });

  it("define multiple interface types", () => {
    expect(
      <TestNamespace>
        <ClassDeclaration name="TestClass" interfaceTypes={["Foo", "Bar"]} />
      </TestNamespace>,
    ).toRenderTo(`
        class TestClass : Foo, Bar;
    `);
  });

  it("define base class and multiple interface types", () => {
    expect(
      <TestNamespace>
        <ClassDeclaration
          name="TestClass"
          baseType="BaseClass"
          interfaceTypes={["Foo", "Bar"]}
        />
      </TestNamespace>,
    ).toRenderTo(`
        class TestClass : BaseClass, Foo, Bar;
    `);
  });
});

it("declares class with some members", () => {
  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <List>
        <Field public name="MemberOne" type="string" />
        <Field public name="MemberTwo" type="int" />
      </List>
    </ClassDeclaration>,
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
  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <List>
        <Method public name="MethodOne" />
        <Method private virtual name="MethodTwo" />
      </List>
    </ClassDeclaration>,
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
            <Field private name="MemberOne" type={enumTypeRefkey} />
            <hbr />
            <Method
              public
              name="MethodOne"
              parameters={params}
              returns={testResultTypeRefkey}
            >
              return new {testResultTypeRefkey}();
            </Method>
          </ClassDeclaration>
        </SourceFile>
      </Namespace>
    </Output>,
  );

  expect(findFile(res, "Test.cs").contents).toBe(coretest.d`
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
      <TestNamespace>
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
      </TestNamespace>,
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
      <TestNamespace>
        <ClassDeclaration
          public
          name="TestClass"
          typeParameters={typeParameters}
        >
          // Body
        </ClassDeclaration>
      </TestNamespace>,
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
    <ClassDeclaration public name="TestClass">
      <EnumMember name="One" />,<hbr />
      <EnumMember name="Two" />
    </ClassDeclaration>
  );

  expect(() => toSourceText(decl)).toThrow(
    "Can't define a EnumMember outside of a enum-decl scope",
  );
});

describe("constructor", () => {
  it("declares with constructor", () => {
    const res = toSourceText(
      <ClassDeclaration public name="TestClass">
        <Constructor public />
      </ClassDeclaration>,
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

  it("declares with constructor params and assigns values to fields", () => {
    const thisNameRefkey = refkey();
    const thisSizeRefkey = refkey();
    const paramNameRefkey = refkey();
    const paramSizeRefkey = refkey();

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

    const res = toSourceText(
      <ClassDeclaration public name="TestClass">
        <Field private name="name" type="string" refkey={thisNameRefkey} />
        <hbr />
        <Field private name="size" type="int" refkey={thisSizeRefkey} />
        <hbr />
        <Constructor public parameters={ctorParams}>
          {thisNameRefkey} = {paramNameRefkey};<hbr />
          {thisSizeRefkey} = {paramSizeRefkey};
        </Constructor>
      </ClassDeclaration>,
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

  it("declares primary constructor with args", () => {
    const paramNameRefkey = refkey();
    const paramSizeRefkey = refkey();

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

    expect(
      <Wrapper>
        <ClassDeclaration
          public
          name="TestClass"
          primaryConstructor={ctorParams}
        >
          <Property
            name="PrettyName"
            type="string"
            get
            initializer={code`$"{${paramNameRefkey}} {${paramSizeRefkey}}"`}
          />
        </ClassDeclaration>
      </Wrapper>,
    ).toRenderTo(`
      namespace TestCode
      {
          public class TestClass(string name, int size)
          {
              string PrettyName { get; } = $"{name} {size}";
          }
      }
  `);
  });

  it("primary constructor params conflict with method", () => {
    const ctorParams = [{ name: "name", type: "string" }];

    expect(
      <Wrapper>
        <NamePolicyContext.Provider value={createNamePolicy((x) => x)}>
          <ClassDeclaration
            public
            name="TestClass"
            primaryConstructor={ctorParams}
          >
            <Field name="name" type="string" />
          </ClassDeclaration>
        </NamePolicyContext.Provider>
      </Wrapper>,
    ).toRenderTo(`
      namespace TestCode
      {
          public class TestClass(string name)
          {
              string name_2;
          }
      }
  `);
  });
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test" doc="This is a test" />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    class Test;
  `);
});

it("supports class member doc comments", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test" doc="This is a test">
        <Field name="Member" public type="int" doc="This is a member" />
      </ClassDeclaration>
    </TestNamespace>,
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
    <TestNamespace>
      <ClassDeclaration name="Test" attributes={[<Attribute name="Test" />]} />
    </TestNamespace>,
  ).toRenderTo(`
    [Test]
    class Test;
  `);
});
