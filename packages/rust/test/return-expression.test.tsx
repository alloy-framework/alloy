import { Children, Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory, ReturnExpression, SourceFile } from "../src/components/index.js";
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

describe("ReturnExpression", () => {
  it("renders bare return", () => {
    expect(inFile(<ReturnExpression />)).toRenderTo(d`return`);
  });

  it("renders return with value", () => {
    expect(inFile(<ReturnExpression>Err(StoreError::NotFound)</ReturnExpression>)).toRenderTo(
      d`return Err(StoreError::NotFound)`,
    );
  });

  it("stc wrapper renders correctly", () => {
    expect(inFile(Stc.ReturnExpression({}).children(["Ok(())"]))).toRenderTo(d`return Ok(())`);
  });
});
