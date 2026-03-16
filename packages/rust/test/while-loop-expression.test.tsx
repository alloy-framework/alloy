import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  LoopExpression,
  SourceFile,
  WhileExpression,
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

describe("WhileExpression + LoopExpression", () => {
  it("renders a simple while loop", () => {
    expect(
      inFile(
        <WhileExpression condition="!stack.is_empty()">
          {code`process(stack.pop());`}
        </WhileExpression>,
      ),
    ).toRenderTo(d`
      while !stack.is_empty() {
        process(stack.pop());
      }
    `);
  });

  it("supports while let via condition prop", () => {
    expect(
      inFile(
        <WhileExpression condition="let Some(item) = iter.next()">
          {code`process(item);`}
        </WhileExpression>,
      ),
    ).toRenderTo(d`
      while let Some(item) = iter.next() {
        process(item);
      }
    `);
  });

  it("renders while with label", () => {
    expect(
      inFile(
        <WhileExpression label="'retry" condition="attempts < max_attempts">
          {code`attempts += 1;`}
        </WhileExpression>,
      ),
    ).toRenderTo(d`
      'retry: while attempts < max_attempts {
        attempts += 1;
      }
    `);
  });

  it("renders loop expression", () => {
    expect(
      inFile(
        <LoopExpression>{code`if done { break result; }`}</LoopExpression>,
      ),
    ).toRenderTo(d`
      loop {
        if done { break result; }
      }
    `);
  });

  it("renders loop expression with label", () => {
    expect(
      inFile(
        <LoopExpression label="'outer">{code`run_once();`}</LoopExpression>,
      ),
    ).toRenderTo(d`
      'outer: loop {
        run_once();
      }
    `);
  });

  it("stc wrappers render same output", () => {
    expect(
      inFile(
        <>
          {Stc.WhileExpression({
            condition: "let Some(item) = queue.pop_front()",
            label: "'retry",
          }).children(["process(item);"])}
          <hbr />
          {Stc.LoopExpression({ label: "'outer" }).children(["break;"])}
        </>,
      ),
    ).toRenderTo(d`
      'retry: while let Some(item) = queue.pop_front() {
        process(item);
      }
      'outer: loop {
        break;
      }
    `);
  });
});
