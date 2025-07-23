import { StatementList } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration } from "../ClassDeclaration.jsx";
import { Field } from "./field.jsx";

it("declares some field", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration public name="TestClass">
        <StatementList>
          <Field public name="MemberOne" type="string" />
          <Field private name="MemberTwo" type="int" />
        </StatementList>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    public class TestClass
    {
      public string MemberOne;
      private int memberTwo;
    }
  `);
});
