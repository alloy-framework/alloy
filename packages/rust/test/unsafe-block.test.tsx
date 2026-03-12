import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory, SourceFile, UnsafeBlock } from "../src/components/index.js";
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

describe("UnsafeBlock", () => {
  it("renders a simple unsafe block", () => {
    expect(
      inFile(
        <UnsafeBlock>
          {code`*ptr`}
        </UnsafeBlock>,
      ),
    ).toRenderTo(d`
      unsafe {
        *ptr
      }
    `);
  });

  it("renders multi-statement block body with indentation", () => {
    expect(
      inFile(
        <UnsafeBlock>
          {code`let ptr = &value as *const i32;`}
          {code`let val = *ptr;`}
        </UnsafeBlock>,
      ),
    ).toRenderTo(d`
      unsafe {
        let ptr = &value as *const i32;
        let val = *ptr;
      }
    `);
  });

  it("renders empty unsafe block", () => {
    expect(inFile(<UnsafeBlock />)).toRenderTo(d`
      unsafe {}
    `);
  });

  it("supports nested control-flow content", () => {
    expect(
      inFile(
        <UnsafeBlock>
          {code`if ptr.is_null() { return None; }`}
          {code`Some(*ptr)`}
        </UnsafeBlock>,
      ),
    ).toRenderTo(d`
      unsafe {
        if ptr.is_null() { return None; }
        Some(*ptr)
      }
    `);
  });

  it("stc wrapper renders the same output", () => {
    expect(inFile(Stc.UnsafeBlock().children(["libc::free(ptr);"]))).toRenderTo(d`
      unsafe {
        libc::free(ptr);
      }
    `);
  });
});
