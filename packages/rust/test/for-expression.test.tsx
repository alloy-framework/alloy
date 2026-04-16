import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  ForExpression,
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

describe("ForExpression", () => {
  it("renders a simple for loop", () => {
    expect(
      inFile(
        <ForExpression pattern="item" iterator="collection">
          {code`process(item);`}
        </ForExpression>,
      ),
    ).toRenderTo(d`
      for item in collection {
        process(item);
      }
    `);
  });

  it("renders for loop with destructuring pattern", () => {
    expect(
      inFile(
        <ForExpression pattern="(i, val)" iterator="list.iter().enumerate()">
          {code`println!("{}: {}", i, val);`}
        </ForExpression>,
      ),
    ).toRenderTo(d`
      for (i, val) in list.iter().enumerate() {
        println!("{}: {}", i, val);
      }
    `);
  });

  it("renders for loop with label", () => {
    expect(
      inFile(
        <ForExpression label="'outer" pattern="x" iterator="0..10">
          {code`do_work(x);`}
        </ForExpression>,
      ),
    ).toRenderTo(d`
      'outer: for x in 0..10 {
        do_work(x);
      }
    `);
  });

  it("renders multi-statement loop body", () => {
    expect(
      inFile(
        <ForExpression pattern="item" iterator="items">
          {code`let processed = transform(item);`}
          {code`results.push(processed);`}
        </ForExpression>,
      ),
    ).toRenderTo(d`
      for item in items {
        let processed = transform(item);
        results.push(processed);
      }
    `);
  });

  it("stc wrapper renders the same output", () => {
    expect(
      inFile(
        Stc.ForExpression({ pattern: "x", iterator: "vec" }).children([
          'println!("{}", x);',
        ]),
      ),
    ).toRenderTo(d`
      for x in vec {
        println!("{}", x);
      }
    `);
  });
});
