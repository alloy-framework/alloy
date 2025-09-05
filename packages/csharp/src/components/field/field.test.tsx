import { List, namekey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration } from "../class/declaration.jsx";
import { Field } from "./field.jsx";

function Wrapper(props: { children: any }) {
  return (
    <TestNamespace>
      <ClassDeclaration public name="TestClass">
        {props.children}
      </ClassDeclaration>
    </TestNamespace>
  );
}
it("declares multiple fields", () => {
  expect(
    <Wrapper>
      <List>
        <Field public name="MemberOne" type="string" />
        <Field public name="MemberTwo" type="int" />
      </List>
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        public string MemberOne;
        public int MemberTwo;
    }
  `);
});

it("takes a namekey", () => {
  expect(
    <Wrapper>
      <Field name={namekey("my-field")} type="string" public />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        public string MyField;
    }
  `);
});

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <Field
              {...{ [accessModifier]: true }}
              name="TestProp"
              type="string"
            />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
            ${accessModifier} string ${accessModifier === "private" ? "_testProp" : "TestProp"};
        }
      `);
      },
    );
  });

  describe("modifiers", () => {
    it.each(["new", "static", "readonly", "volatile"] as const)(
      "%s",
      (methodModifier) => {
        expect(
          <Wrapper>
            <Field
              {...{ [methodModifier]: true }}
              name="TestField"
              type="string"
            />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
            ${methodModifier} string _testField;
        }
      `);
      },
    );
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <Field public new name="TestField" type="string" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
            public new string TestField;
        }
      `);
  });
});

describe("naming", () => {
  it("public field are PascalCase", () => {
    expect(
      <Wrapper>
        <List>
          <Field public name="member_one" type="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
      public class TestClass
      {
          public string MemberOne;
      }
    `);
  });

  it("private field are camelCase with _ prefix", () => {
    expect(
      <Wrapper>
        <List>
          <Field private name="member_one" type="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
    public class TestClass
    {
        private string _memberOne;
    }
  `);
  });
});
