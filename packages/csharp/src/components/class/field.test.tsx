import { toSourceText } from "#test/utils.jsx";
import { StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ClassDeclaration } from "./declaration.jsx";
import { ClassField } from "./field.jsx";

it("declares class with some fields", () => {
  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <StatementList>
        <ClassField public name="MemberOne" type="string" />
        <ClassField private name="MemberTwo" type="int" />
      </StatementList>
    </ClassDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;

    public class TestClass
    {
        public string MemberOne;
        private int memberTwo;
    }
  `);
});
