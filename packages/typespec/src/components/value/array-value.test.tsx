import { Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ConstDeclaration } from "../const/const-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ArrayValue } from "./array-value.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an array value expression", () => {
  expect(<ArrayValue values={['"one"', '"two"', '"three"']} />).toRenderTo(
    '#["one", "two", "three"]',
  );
});

it("renders an empty array value", () => {
  expect(<ArrayValue values={[]} />).toRenderTo("#[]");
});

it("renders a single-element array value", () => {
  expect(<ArrayValue values={['"hello"']} />).toRenderTo('#["hello"]');
});

it("renders a const with an array value", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration
          name="tags"
          value={<ArrayValue values={['"TypeSpec"', '"JSON"']} />}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const tags = #["TypeSpec", "JSON"]
    `,
  });
});
