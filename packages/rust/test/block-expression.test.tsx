import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  BlockExpression,
  CrateDirectory,
  LetBinding,
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

describe("BlockExpression", () => {
  it("renders a block with a final expression", () => {
    expect(inFile(<BlockExpression>{code`x + y`}</BlockExpression>))
      .toRenderTo(d`
      {
        x + y
      }
    `);
  });

  it("renders let bindings and a trailing return expression", () => {
    expect(
      inFile(
        <BlockExpression>
          <LetBinding name="a">{code`compute()`}</LetBinding>
          <LetBinding name="b">{code`transform(a)`}</LetBinding>
          {code`a + b`}
        </BlockExpression>,
      ),
    ).toRenderTo(d`
      {
        let a = compute();
        let b = transform(a);
        a + b
      }
    `);
  });

  it("renders empty blocks", () => {
    expect(inFile(<BlockExpression />)).toRenderTo(d`
      {}
    `);
  });

  it("composes inside let bindings", () => {
    expect(
      inFile(
        <LetBinding name="x">
          <BlockExpression>
            <LetBinding name="a">{code`compute()`}</LetBinding>
            <LetBinding name="b">{code`transform(a)`}</LetBinding>
            {code`a + b`}
          </BlockExpression>
        </LetBinding>,
      ),
    ).toRenderTo(d`
      let x = {
        let a = compute();
        let b = transform(a);
        a + b
      };
    `);
  });

  it("stc wrapper renders the same output", () => {
    expect(
      inFile(
        Stc.BlockExpression().children([
          <LetBinding name="x">{code`5`}</LetBinding>,
          code`x + 1`,
        ]),
      ),
    ).toRenderTo(d`
      {
        let x = 5;
        x + 1
      }
    `);
  });
});
