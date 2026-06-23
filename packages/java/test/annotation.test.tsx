import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("Annotates object", () => {
  expect(
    <TestPackage>
      <jv.Annotation type="Getter" />
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    @Getter
  `);
});

it("Takes single parameter", () => {
  expect(
    <TestPackage>
      <jv.Annotation
        type="Getter"
        value={{ value: <jv.Value value="Test" /> }}
      />
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    @Getter("Test")
  `);
});

it("Takes named parameters", () => {
  expect(
    <TestPackage>
      <jv.Annotation
        type="Getter"
        value={{
          value1: <jv.Value value="Tester" />,
          value2: <jv.Value value="Tested" />,
        }}
      />
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    @Getter(value1 = "Tester", value2 = "Tested")
  `);
});

it("breaks named parameters across multiple lines", () => {
  expect(
    <TestPackage>
      <jv.Annotation
        type="Getter"
        value={{
          value1: <jv.Value value="Tester" />,
          value2: <jv.Value value="Tested" />,
        }}
      />
    </TestPackage>,
  ).toRenderTo(
    `
      package me.test.code;

      @Getter(
        value1 = "Tester",
        value2 = "Tested"
      )
    `,
    { printWidth: 20 },
  );
});
