import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { TypeParameters } from "./type-parameters.jsx";

it("render one", () => {
  expect(
    <TestNamespace>
      <TypeParameters parameters={["A"]} />
    </TestNamespace>,
  ).toRenderTo(`<A>`);
});

it("render very long", () => {
  expect(
    <TestNamespace>
      <TypeParameters
        parameters={[
          "SomeVeryVeryLongParamThatMightGetSplitOverMultipleLinesA",
          "SomeVeryVeryLongParamThatMightGetSplitOverMultipleLinesB",
        ]}
      />
    </TestNamespace>,
  ).toRenderTo(
    `
    <
      SomeVeryVeryLongParamThatMightGetSplitOverMultipleLinesA,
      SomeVeryVeryLongParamThatMightGetSplitOverMultipleLinesB>
    `,
  );
});

it("declare type parameters using parameters names", () => {
  expect(
    <TestNamespace>
      <TypeParameters parameters={["A", "B"]} />
    </TestNamespace>,
  ).toRenderTo(`<A, B>`);
});

it("declare type parameters using parameters", () => {
  expect(
    <TestNamespace>
      <TypeParameters parameters={[{ name: "A" }, { name: "B" }]} />
    </TestNamespace>,
  ).toRenderTo(`<A, B>`);
});
