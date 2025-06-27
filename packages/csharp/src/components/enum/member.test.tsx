import { toSourceText } from "#test/utils.jsx";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { EnumDeclaration } from "./declaration.jsx";
import { EnumMember } from "./member.jsx";

it("declares enum with members", () => {
  const res = toSourceText(
    <EnumDeclaration public name="TestEnum">
      <EnumMember name="One" />,<hbr />
      <EnumMember name="Two" />
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
