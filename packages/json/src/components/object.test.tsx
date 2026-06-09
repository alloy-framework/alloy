import { List, Output, reactive } from "@alloy-js/core";
import { expect, it } from "vitest";
import { jsonTest } from "../../test/utils.jsx";
import { JsonObject, JsonObjectProperty } from "./json-object.jsx";
import { SourceFile } from "./source-file.jsx";

it("renders objects", () => {
  const template = jsonTest({ a: 1, b: "hello" });

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
  const template = (
    <Output>
      <SourceFile path="test.json">
        <JsonObject>
          <List comma softline>
            <JsonObjectProperty name="foo">12</JsonObjectProperty>
            <JsonObjectProperty name="bar">13</JsonObjectProperty>
          </List>
        </JsonObject>
      </SourceFile>
    </Output>
  );

  expect(template).toRenderTo(`
    {
      "foo": 12,
      "bar": 13
    }
  `);
});

it("works reactively", () => {
  const obj = reactive({ a: 1 } as Record<string, unknown>);

  const template = jsonTest(obj);

  expect(template).toRenderTo(`
    {
      "a": 1
    }
  `);

  const tree = template;

  (obj.a as any)++;

  expect(tree).toRenderTo(`
    {
      "a": 2
    }
  `);

  obj.b = "hello";

  expect(tree).toRenderTo(`
    {
      "a": 2,
      "b": "hello"
    }
  `);
});
