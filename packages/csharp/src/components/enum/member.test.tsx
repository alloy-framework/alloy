import { TestNamespace } from "#test/utils.jsx";
import { namekey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { EnumDeclaration } from "./declaration.jsx";
import { EnumMember } from "./member.jsx";

it("declares enum with members", () => {
  expect(
    <TestNamespace>
      <EnumDeclaration public name="TestEnum">
        <EnumMember name="One" />,<hbr />
        <EnumMember name="Two" />
      </EnumDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public enum TestEnum
    {
        One,
        Two
    }
  `);
});

it("takes a namekey", () => {
  const memberKey = namekey("MyMember");
  const tree = (
    <TestNamespace>
      <EnumDeclaration name="Foo">
        <EnumMember name={memberKey} />
      </EnumDeclaration>
      <hbr />
      {memberKey};
    </TestNamespace>
  );
  expect(tree).toRenderTo(`
    enum Foo
    {
        MyMember
    }
    Foo.MyMember;
  `);
});

it("renders doc comment", () => {
  expect(
    <TestNamespace>
      <EnumDeclaration public name="TestEnum">
        <EnumMember name="One" doc="First value" />,<hbr />
        <EnumMember name="Two" doc="Second value" />
      </EnumDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public enum TestEnum
    {
        /// First value
        One,
        /// Second value
        Two
    }
  `);
});
