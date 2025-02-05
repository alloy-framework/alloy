import { Output, refkey, SourceDirectory } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { JsonArray, JsonArrayElement } from "../src/components/JsonArray.jsx";
import {
  JsonObject,
  JsonObjectProperty,
} from "../src/components/JsonObject.jsx";
import { JsonValue } from "../src/components/JsonValue.jsx";
import { SourceFile } from "../src/components/SourceFile.jsx";

it("references objects within the same file", () => {
  const objectValue = refkey();
  const nullKey = refkey();
  const template =
    <Output>
      <SourceFile path="test.json">
        <JsonObject refkey={objectValue}>
          <JsonObjectProperty name="nullValue">
            <JsonValue jsValue={null} refkey={nullKey} />,
          </JsonObjectProperty>
          <JsonObjectProperty name="refToNull">{nullKey}</JsonObjectProperty>,
          <JsonObjectProperty name="refToObject">{objectValue}</JsonObjectProperty>
        </JsonObject>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    {
      "nullValue": null,
      "refToNull": "#/nullValue",
      "refToObject": "#"
    }
  `);
});

it("references objects across files", () => {
  const objectValue = refkey();
  const nullKey = refkey();
  const template =
    <Output>
      <SourceFile path="test.json">
        <JsonObject refkey={objectValue}>
          <JsonObjectProperty name="nullValue">
            <JsonValue jsValue={null} refkey={nullKey} />,
          </JsonObjectProperty>
        </JsonObject>
      </SourceFile>
      <SourceFile path="test.json">
        <JsonObject>
          <JsonObjectProperty name="refToNull">{nullKey}</JsonObjectProperty>,
          <JsonObjectProperty name="refToObject">{objectValue}</JsonObjectProperty>
        </JsonObject>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    {
      "nullValue": null,
    }
    {
      "refToNull": "test.json#/nullValue",
      "refToObject": "test.json#"
    }
  `);
});

it("references objects across files and directories", () => {
  const objectValue = refkey();
  const nullKey = refkey();
  const template =
    <Output>
      <SourceDirectory path="subdir">
        <SourceFile path="test.json">
          <JsonObject refkey={objectValue}>
            <JsonObjectProperty name="nullValue">
              <JsonValue jsValue={null} refkey={nullKey} />,
            </JsonObjectProperty>
          </JsonObject>
        </SourceFile>  
      </SourceDirectory>
      <SourceFile path="test.json">
        <JsonObject>
          <JsonObjectProperty name="refToNull">{nullKey}</JsonObjectProperty>,
          <JsonObjectProperty name="refToObject">{objectValue}</JsonObjectProperty>
        </JsonObject>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    {
      "nullValue": null,
    }
    {
      "refToNull": "subdir/test.json#/nullValue",
      "refToObject": "subdir/test.json#"
    }
  `);
});

it("references arrays within the same file", () => {
  const arrayValue = refkey();
  const nullKey = refkey();
  const template =
    <Output>
      <SourceFile path="test.json">
        <JsonArray refkey={arrayValue}>
          <JsonArrayElement>{nullKey}</JsonArrayElement>,
          <JsonArrayElement>{arrayValue}</JsonArrayElement>,
          <JsonArrayElement>
            <JsonValue jsValue={null} refkey={nullKey} />
          </JsonArrayElement>
        </JsonArray>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    [
      "#/2",
      "#",
      null
    ]
  `);
});

it("does complex references", () => {
  const objectValue = refkey();
  const arrayValue = refkey();
  const nullKey = refkey();
  const nestedKey = refkey();
  const template =
    <Output>
      <SourceFile path="test.json">
        <JsonObject refkey={objectValue}>
          <JsonObjectProperty name="nullValue">
            <JsonValue jsValue={null} refkey={nullKey} />,
          </JsonObjectProperty>
          <JsonObjectProperty name="refToNull">{nullKey}</JsonObjectProperty>,
          <JsonObjectProperty name="refToObject">{objectValue}</JsonObjectProperty>
          <JsonObjectProperty name="refToNested">{nestedKey}</JsonObjectProperty>
          <JsonObjectProperty name="nestedArray">
            <JsonArray refkey={arrayValue}>
              <JsonArrayElement>{nullKey}</JsonArrayElement>,
              <JsonArrayElement>{arrayValue}</JsonArrayElement>
              <JsonArrayElement>
                <JsonObject>
                  <JsonObjectProperty name="nestedProp">
                    <JsonValue jsValue="hi" refkey={nestedKey} />
                  </JsonObjectProperty>
                </JsonObject>
              </JsonArrayElement>
            </JsonArray>
          </JsonObjectProperty>
        </JsonObject>
      </SourceFile>
    </Output>;

  expect(template).toRenderTo(`
    {
      "nullValue": null,
      "refToNull": "#/nullValue",
      "refToObject": "#"
      "refToNested": "#/nestedArray/2/nestedProp"
      "nestedArray": [
        "#/nullValue",
        "#/nestedArray"
        {
          "nestedProp": "hi"
        }
      ]
    }
  `);
});
