import { Output } from "@alloy-js/core";
import { JsonValue } from "../src/components/json-value.jsx";
import { SourceFile } from "../src/components/SourceFile.jsx";

export function jsonTest(jsValue: unknown) {
  return (
    <Output>
      <SourceFile path="test.json">
        <JsonValue jsValue={jsValue} />
      </SourceFile>
    </Output>
  );
}
