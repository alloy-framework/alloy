import { Output } from "@alloy-js/core";
import { JsonValue } from "../src/components/json-value.jsx";
import { SourceFile } from "../src/components/source-file.jsx";

export function jsonTest(jsValue: unknown) {
  return (
    <Output>
      <SourceFile path="test.json">
        <JsonValue jsValue={jsValue} />
      </SourceFile>
    </Output>
  );
}
