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
        <hbr />
        <ts.StatementList>
          <ts.VarDeclaration name="one-two" refkey={ref2}>
            "hello"
          </ts.VarDeclaration>
          <ts.Reference refkey={ref1} />
          <ts.Reference refkey={ref2} />
        </ts.StatementList>
      </ts.SourceFile>
    </Output>,
  );

  expect(res.contents[0].contents).toEqual(d`
    function fooBar() {}
    const oneTwo = "hello";
    fooBar;
    oneTwo;
  `);
});

it("keeps _ and $ prefix", () => {
  const ref1 = refkey({});
  const ref2 = refkey({});

  const namePolicy = createTSNamePolicy();
  const res = render(
    <Output namePolicy={namePolicy}>
      <ts.SourceFile path="test.ts">
        <ts.FunctionDeclaration name="_foo-bar" refkey={ref1} />
        <hbr />
        <ts.StatementList>
          <ts.VarDeclaration name="$one-two" refkey={ref2}>
            "hello"
          </ts.VarDeclaration>
          <ts.Reference refkey={ref1} />
          <ts.Reference refkey={ref2} />
        </ts.StatementList>
      </ts.SourceFile>
    </Output>,
  );

  expect(res.contents[0].contents).toEqual(d`
    function _fooBar() {}
    const $oneTwo = "hello";
    _fooBar;
    $oneTwo;
  `);
});

it("appends _ to reserved words", () => {
  const ref1 = refkey({});
  const ref2 = refkey({});

  const namePolicy = createTSNamePolicy();
  const res = render(
    <Output namePolicy={namePolicy}>
      <ts.SourceFile path="test.ts">
        <ts.FunctionDeclaration
          name="default"
          refkey={ref1}
          parameters={{ await: "any" }}
        />
        <hbr />
        <ts.StatementList>
          <ts.VarDeclaration name="super" refkey={ref2}>
            "hello"
          </ts.VarDeclaration>
          <ts.Reference refkey={ref1} />
          <ts.Reference refkey={ref2} />
        </ts.StatementList>
      </ts.SourceFile>
    </Output>,
  );

  expect(res.contents[0].contents).toEqual(d`
    function default_(await_: any) {}
    const super_ = "hello";
    default_;
    super_;
  `);
});
