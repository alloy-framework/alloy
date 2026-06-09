import { TestNamespace } from "#test/utils.jsx";
import { namekey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { EnumDeclaration } from "./declaration.jsx";
import { EnumMember } from "./member.jsx";

it("declares enum with no members", () => {
  expect(
    <TestNamespace>
      <EnumDeclaration public name="TestEnum" />
    </TestNamespace>,
  ).toRenderTo(`
    public enum TestEnum;
  `);
});

it("applies naming policy to enum and members", () => {
  expect(
    <TestNamespace>
      <EnumDeclaration public name="testEnum">
        <EnumMember name="one" />,<hbr />
        <EnumMember name="two" />
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
  const key = namekey("my-enum");
  const tree = (
    <TestNamespace>
      <EnumDeclaration name={key} />
    </TestNamespace>
  );
  expect(tree).toRenderTo(`
    enum MyEnum;
  `);
});

it("renders doc comment", () => {
  expect(
    <TestNamespace>
      <EnumDeclaration public name="TestEnum" doc="This is a test enum">
        <EnumMember name="One" />,<hbr />
        <EnumMember name="Two" />
      </EnumDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test enum
    public enum TestEnum
    {
        One,
        Two
    }
  `);
});
