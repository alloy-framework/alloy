import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { ClosureExpression, CrateDirectory, SourceFile } from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";

function inFile(children: Children) {
  return (
    <Output>
      <CrateDirectory name="my_crate">
        <SourceFile path="lib.rs">{children}</SourceFile>
      </CrateDirectory>
    </Output>
  );
}

describe("ClosureExpression", () => {
  it("renders a simple closure", () => {
    expect(
      inFile(
        <ClosureExpression parameters={[{ name: "value" }]}>
          {code`value + 1`}
        </ClosureExpression>,
      ),
    ).toRenderTo(d`
      |value| value + 1
    `);
  });

  it("renders typed parameters", () => {
    expect(
      inFile(
        <ClosureExpression
          parameters={[
            { name: "left", type: "i32" },
            { name: "right", type: "i32" },
          ]}
        >
          {code`left + right`}
        </ClosureExpression>,
      ),
    ).toRenderTo(d`
      |left: i32, right: i32| left + right
    `);
  });

  it("renders move closures", () => {
    expect(
      inFile(
        <ClosureExpression move parameters={[{ name: "value" }]}>
          {code`value > limit`}
        </ClosureExpression>,
      ),
    ).toRenderTo(d`
      move |value| value > limit
    `);
  });

  it("renders block bodies for multi-statement closures", () => {
    expect(
      inFile(
        <ClosureExpression parameters={[{ name: "entry" }]}>
          {code`let ttl = entry.ttl;`}
          {code`ttl.is_some()`}
        </ClosureExpression>,
      ),
    ).toRenderTo(d`
      |entry| {
        let ttl = entry.ttl;
        ttl.is_some()
      }
    `);
  });

  it("renders return type closures with a block body", () => {
    expect(
      inFile(
        <ClosureExpression parameters={[{ name: "value", type: "i32" }]} returnType="bool">
          {code`value > 0`}
        </ClosureExpression>,
      ),
    ).toRenderTo(d`
      |value: i32| -> bool {
        value > 0
      }
    `);
  });

  it("stc wrappers render the same output", () => {
    expect(
      inFile(
        Stc.ClosureExpression({ parameters: [{ name: "value" }] }).children([code`value * 2`]),
      ),
    ).toRenderTo(d`
      |value| value * 2
    `);
  });
});
