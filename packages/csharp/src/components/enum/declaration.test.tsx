import { TestNamespace, toSourceText } from "#test/utils.jsx";
import { namekey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { EnumDeclaration } from "./declaration.jsx";
import { EnumMember } from "./member.jsx";

it("declares enum with no members", () => {
  const res = toSourceText(<EnumDeclaration public name="TestEnum" />);

  expect(res).toBe(d`
    namespace TestCode;

    public enum TestEnum;
  `);
});

it("applies naming policy to enum and members", () => {
  const res = toSourceText(
    <EnumDeclaration public name="testEnum">
      <EnumMember name="one" />,<hbr />
      <EnumMember name="two" />
    </EnumDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;

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
