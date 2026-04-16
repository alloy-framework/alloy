import { Children, Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  BreakExpression,
  ContinueExpression,
  CrateDirectory,
  SourceFile,
} from "../src/components/index.js";
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

describe("BreakExpression + ContinueExpression", () => {
  it("break simple", () => {
    expect(inFile(<BreakExpression />)).toRenderTo(d`break`);
  });

  it("break with label and value", () => {
    expect(
      inFile(<BreakExpression label="'outer">result</BreakExpression>),
    ).toRenderTo(d`break 'outer result`);
  });

  it("continue simple", () => {
    expect(inFile(<ContinueExpression />)).toRenderTo(d`continue`);
  });

  it("continue with label", () => {
    expect(inFile(<ContinueExpression label="'outer" />)).toRenderTo(
      d`continue 'outer`,
    );
  });

  it("stc wrappers exported and render correctly", () => {
    expect(
      inFile(
        <>
          {Stc.BreakExpression({ label: "'outer" }).children(["value"])}
          <hbr />
          {Stc.ContinueExpression({ label: "'outer" })}
        </>,
      ),
    ).toRenderTo(d`
      break 'outer value
      continue 'outer
    `);
  });
});
