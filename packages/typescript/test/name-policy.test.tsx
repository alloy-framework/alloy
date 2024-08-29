import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { createTSNamePolicy } from "../src/name-policy.js";

it("applies to functions and variables", () => {
  const ref1 = refkey({});
  const ref2 = refkey({});

  const namePolicy = createTSNamePolicy();
  const res = render(
    <Output namePolicy={namePolicy}>
      <ts.SourceFile path="test.ts">
        <ts.FunctionDeclaration name="foo-bar" refkey={ref1} />
        <ts.VarDeclaration name="one-two" refkey={ref2}>
          "hello"
        </ts.VarDeclaration>
        <ts.Reference refkey={ref1} />;
        <ts.Reference refkey={ref2} />;
      </ts.SourceFile>
    </Output>,
  );

  expect(res.contents[0].contents).toEqual(d`
    function fooBar() {
      
    }
    const oneTwo = "hello";
    fooBar;
    oneTwo;
  `);
});
