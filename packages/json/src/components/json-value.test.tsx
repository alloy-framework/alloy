import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import { JsonValue } from "./json-value.jsx";
import { SourceFile } from "./source-file.jsx";

const TestingJsonObject = () => {
  return (
    <JsonValue
      jsValue={{
        id: "test-id",
        name: "Test Name",
        nested: () => <Bar />,
      }}
    />
  );
};

const Bar = () => {
  return (
    <JsonValue
      jsValue={{
        bar: "Foo",
      }}
    />
  );
};

it("compose json data with components", () => {
  expect(
    <Output>
      <SourceFile path="test.json">
        <TestingJsonObject />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    {
      "id": "test-id",
      "name": "Test Name",
      "nested": {
        "bar": "Foo"
      }
    }
  `);
});
