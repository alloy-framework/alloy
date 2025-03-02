import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { toSourceText } from "./utils.js";

it("Annotates object", () => {
  const res = toSourceText(<jv.Annotation type="Getter" />);

  expect(res).toBe(d`
    package me.test.code;

    @Getter
  `);
});

it("Takes single parameter", () => {
  const res = toSourceText(
    <jv.Annotation
      type="Getter"
      value={{ value: <jv.Value value="Test" /> }}
    />,
  );

  expect(res).toBe(d`
    package me.test.code;

    @Getter("Test")
  `);
});

it("Takes named parameters", () => {
  const res = toSourceText(
    <jv.Annotation
      type="Getter"
      value={{
        value1: <jv.Value value="Tester" />,
        value2: <jv.Value value="Tested" />,
      }}
    />,
  );

  expect(res).toBe(d`
    package me.test.code;

    @Getter(value1 = "Tester", value2 = "Tested")
  `);
});

it("breaks named parameters across multiple lines", () => {
  const res = toSourceText(
    <jv.Annotation
      type="Getter"
      value={{
        value1: <jv.Value value="Tester" />,
        value2: <jv.Value value="Tested" />,
      }}
    />,
    { printWidth: 20 },
  );

  expect(res).toBe(d`
    package me.test.code;

    @Getter(
      value1 = "Tester",
      value2 = "Tested"
    )
  `);
});
