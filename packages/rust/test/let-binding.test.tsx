import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
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

describe("LetBinding", () => {
  it("renders a simple let binding", () => {
    expect(
      inFile(<LetBinding name="before">{code`self.data.len()`}</LetBinding>),
    ).toRenderTo(d`
      let before = self.data.len();
    `);
  });

  it("renders mutable bindings", () => {
    expect(
      inFile(
        <LetBinding name="entry" mutable>{code`Entry::default()`}</LetBinding>,
      ),
    ).toRenderTo(d`
      let mut entry = Entry::default();
    `);
  });

  it("renders type annotations", () => {
    expect(
      inFile(
        <LetBinding
          name="entry"
          type="Entry<V>"
        >{code`Entry::default()`}</LetBinding>,
      ),
    ).toRenderTo(d`
      let entry: Entry<V> = Entry::default();
    `);
  });

  it("renders let binding without initializer", () => {
    expect(inFile(<LetBinding name="slot" />)).toRenderTo(d`
      let slot;
    `);
  });

  it("renders destructuring patterns", () => {
    expect(inFile(<LetBinding name="(key, value)">{code`pair`}</LetBinding>))
      .toRenderTo(d`
      let (key, value) = pair;
    `);
  });

  it("stc wrapper renders the same output", () => {
    expect(
      inFile(
        Stc.LetBinding({ name: "count", mutable: true }).children([
          "items.len()",
        ]),
      ),
    ).toRenderTo(d`
      let mut count = items.len();
    `);
  });
});
