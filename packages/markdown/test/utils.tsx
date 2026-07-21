import type { Children } from "@alloy-js/core";
import { Output } from "@alloy-js/core";

import { SourceFile } from "../src/components/SourceFile.jsx";

export function mdTest(children: Children) {
  return (
    <Output>
      <SourceFile path="test.md">{children}</SourceFile>
    </Output>
  );
}
