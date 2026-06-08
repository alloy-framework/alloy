import { code, Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { AliasDeclaration } from "../alias/alias-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { StringLiteral } from "./string-literal.jsx";
import { StringTemplateExpr } from "./string-template-expr.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a simple string literal", () => {
  expect(<StringLiteral>hello world</StringLiteral>).toRenderTo(
    `"hello world"`,
  );
});

it("renders a multi-line string literal", () => {
  expect(
    <StringLiteral multiline>
      {code`
        line one
        line two
      `}
    </StringLiteral>,
  ).toRenderTo(`
    """
      line one
      line two
      """
  `);
});

it("renders a string template with interpolation", () => {
  expect(
    <StringLiteral>
      hello <StringTemplateExpr>name</StringTemplateExpr>!
    </StringLiteral>,
  ).toRenderTo(`"hello \${name}!"`);
});

it("renders a multi-line string template with interpolation", () => {
  expect(
    <StringLiteral multiline>
      hello <StringTemplateExpr>name</StringTemplateExpr>
      <hbr />
      goodbye
    </StringLiteral>,
  ).toRenderTo(`
    """
      hello \${name}
      goodbye
      """
  `);
});

it("renders a string literal as an alias type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="Greeting"
          type={<StringLiteral>hello world</StringLiteral>}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    alias Greeting = "hello world"
  `);
});

it("renders a StringTemplateExpr", () => {
  expect(<StringTemplateExpr>expr</StringTemplateExpr>).toRenderTo(`\${expr}`);
});
