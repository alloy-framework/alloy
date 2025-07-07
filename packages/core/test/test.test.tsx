import { Children, json } from "@alloy-js/core";
import { expect, it } from "vitest";

const TestingJsonObject = (): Children => {
  return json({
    id: "test-id",
    name: "Test Name",
    nested: <Bar />,
  });
};

const Bar = (): Children => {
  return json({
    bar: "Foo",
  });
};

it("works", () => {
  expect(TestingJsonObject()).toRenderTo(`
    {
      "id": "test-id",
      "name": "Test Name",
      "nested": {
        "bar": "Foo"
      }
    }
  `);
});
