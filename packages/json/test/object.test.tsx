import { List, Output, reactive, renderTree } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d, printTree } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  JsonObject,
  JsonObjectProperty,
} from "../src/components/json-object.jsx";
import { SourceFile } from "../src/components/SourceFile.jsx";
import { jsonTest } from "./utils.jsx";

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
  const tree = renderTree(template);

  expect(printTree(tree)).toEqual(d`
    {
      "a": 1
    }
  `);

  (obj.a as any)++;

  expect(printTree(tree)).toEqual(d`
    {
      "a": 2
    }
  `);

  obj.b = "hello";

  expect(printTree(tree)).toEqual(d`
    {
      "a": 2,
      "b": "hello"
    }
  `);
});
