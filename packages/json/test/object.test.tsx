import { Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  JsonObject,
  JsonObjectProperty,
} from "../src/components/JsonObject.jsx";
import { SourceFile } from "../src/components/SourceFile.jsx";
import { jsonTest } from "./utils.jsx";

it("renders objects", () => {
  const template = jsonTest({
    a: 1,
    b: "hello",
  });

  expect(template).toRenderTo(`
    {
      "a": 1,
      "b": "hello"
    }
  `);
});

it("renders nested objects", () => {
  const template = jsonTest({
    a: {
      b: 1,
    },
  });

  expect(template).toRenderTo(`
    {
      "a": {
        "b": 1
      }
    }
  `);
});

it("can can manually assemble objects", () => {
  const template =
    <Output>
      <SourceFile path="test.json">
        <JsonObject>
          <JsonObjectProperty name="foo">12</JsonObjectProperty>,
          <JsonObjectProperty name="bar">
            13
          </JsonObjectProperty>
        </JsonObject>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    {
      "foo": 12,
      "bar": 13
    }
  `);
});
