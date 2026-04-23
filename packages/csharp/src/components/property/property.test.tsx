import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Attribute } from "../attributes/attributes.jsx";
import { ClassDeclaration } from "../class/declaration.jsx";
import { Property } from "./property.jsx";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <ClassDeclaration public name="TestClass">
      {props.children}
    </ClassDeclaration>
  </TestNamespace>
);

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <Property
              {...{ [accessModifier]: true }}
              name="TestProp"
              type="string"
              get
            />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
            ${accessModifier} string TestProp { get; }
        }
      `);
      },
    );
  });

  describe("property modifiers", () => {
    it.each([
      "new",
      "static",
      "virtual",
      "sealed",
      "override",
      "abstract",
      "extern",
      "readonly",
      "required",
    ] as const)("%s", (methodModifier) => {
      expect(
        <Wrapper>
          <Property
            {...{ [methodModifier]: true }}
            name="TestProp"
            type="string"
            get
          />
        </Wrapper>,
      ).toRenderTo(`
        public class TestClass
        {
            ${methodModifier} string TestProp { get; }
        }
      `);
    });
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <Property public new name="TestProp" type="string" get />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
            public new string TestProp { get; }
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <Property name="test_prop" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { get; }
    }
`);
});

it("has getter only", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { get; }
    }
  `);
});

it("has setter only", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { set; }
    }
  `);
});

it("has getter and setter", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" get set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { get; set; }
    }
  `);
});

it("has getter and init", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" get init />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { get; init; }
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test">
        <Property name="Method" type="string" get set doc="This is a test" />
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    class Test
    {
        /// This is a test
        string Method { get; set; }
    }
  `);
});

it("specify nullable property", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" nullable get set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string? TestProp { get; set; }
    }
  `);
});

it("specify initializer", () => {
  expect(
    <Wrapper>
      <Property name="TestProp" type="string" get set initializer={`"abc"`} />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        string TestProp { get; set; } = "abc";
    }
  `);
});

it("specify attributes", () => {
  expect(
    <Wrapper>
      <Property
        name="Test"
        type="int"
        attributes={[<Attribute name="Test" />]}
        get
        set
      />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        [Test]
        int Test { get; set; }
    }
  `);
});

describe("format", () => {
  it("split after = if initializer too long", () => {
    expect(
      <TestNamespace printWidth={60}>
        <ClassDeclaration name="Test">
          <Property
            public
            get
            set
            name="ThisIsAVeryLongPropertyName"
            type="string"
            initializer={`"Some very long initializer value"`}
          />
        </ClassDeclaration>
      </TestNamespace>,
    ).toRenderTo(`
      class Test
      {
          public string ThisIsAVeryLongPropertyName { get; set; } =
              "Some very long initializer value";
      }
  `);
  });
});

describe("accessor bodies", () => {
  it("renders get with body", () => {
    expect(
      <Wrapper>
        <Property public name="Name" type="string" get={<>return _name;</>} />
      </Wrapper>,
    ).toRenderTo(`
      public class TestClass
      {
          public string Name
          {
              get { return _name; }
          }
      }
    `);
  });

  it("renders set with body", () => {
    expect(
      <Wrapper>
        <Property
          public
          name="Value"
          type="int"
          get
          set={<>_value = value;</>}
        />
      </Wrapper>,
    ).toRenderTo(`
      public class TestClass
      {
          public int Value
          {
              get;
              set { _value = value; }
          }
      }
    `);
  });

  it("renders both get and set with bodies", () => {
    expect(
      <Wrapper>
        <Property
          public
          name="MinValue"
          type="T"
          get={<>return _minValue.HasValue ? _minValue.Value : default(T);</>}
          set={<>_minValue = value;</>}
        />
      </Wrapper>,
    ).toRenderTo(`
      public class TestClass
      {
          public T MinValue
          {
              get { return _minValue.HasValue ? _minValue.Value : default(T); }
              set { _minValue = value; }
          }
      }
    `);
  });

  it("breaks long accessor body across lines", () => {
    expect(
      <TestNamespace printWidth={40}>
        <ClassDeclaration name="Test">
          <Property
            public
            name="Value"
            type="int"
            get={<>return _someVeryLongFieldName;</>}
          />
        </ClassDeclaration>
      </TestNamespace>,
    ).toRenderTo(`
      class Test
      {
          public int Value
          {
              get {
                  return _someVeryLongFieldName;
              }
          }
      }
  `);
  });
});
