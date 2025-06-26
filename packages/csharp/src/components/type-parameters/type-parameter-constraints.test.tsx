import { expect, it } from "vitest";
import { TypeParameterConstraints } from "./type-parameter-constraints.jsx";

it("renders nothing if there is no constraints", () => {
  expect(<TypeParameterConstraints parameters={["A", "B"]} />).toRenderTo(``);
});

it("renders inline if there is only one", () => {
  expect(
    <>
      {"code()"}
      <TypeParameterConstraints
        parameters={[{ name: "A", constraints: "string" }]}
      />
    </>,
  ).toRenderTo(`
    code() where A : string
  `);
});

it("renders multiple constraints", () => {
  expect(
    <>
      {"code()"}
      <TypeParameterConstraints
        parameters={[{ name: "A", constraints: ["string", "int"] }]}
      />
    </>,
  ).toRenderTo(`
    code() where A : string, int
  `);
});

it("renders newline if constraint is very long", () => {
  expect(
    <>
      {"code()"}
      <TypeParameterConstraints
        parameters={[
          {
            name: "ThisIsQuiteALongName",
            constraints: "VeryLongBuilderFactorySingletonThatShouldBeSplit",
          },
        ]}
      />
    </>,
  ).toRenderTo(`
    code()
      where ThisIsQuiteALongName : VeryLongBuilderFactorySingletonThatShouldBeSplit
  `);
});

it("renders multiple constraints on new lines if they are very long", () => {
  expect(
    <>
      {"code()"}
      <TypeParameterConstraints
        parameters={[
          {
            name: "A",
            constraints: [
              "IVeryLongBuilderFactorySingletonThatShouldBeSplitA",
              "IVeryLongBuilderFactorySingletonThatShouldBeSplitB",
            ],
          },
        ]}
      />
    </>,
  ).toRenderTo(`
    code()
      where A :
        IVeryLongBuilderFactorySingletonThatShouldBeSplitA,
        IVeryLongBuilderFactorySingletonThatShouldBeSplitB
  `);
});

it("declare type parameters using parameters", () => {
  expect(
    <>
      {"code()"}
      <TypeParameterConstraints
        parameters={[
          { name: "A", constraints: "string" },
          { name: "B", constraints: "string" },
        ]}
      />
    </>,
  ).toRenderTo(`
    code()
      where A : string
      where B : string
  `);
});
