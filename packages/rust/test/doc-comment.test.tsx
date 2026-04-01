import { Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  BlockComment,
  CrateDirectory,
  DocComment,
  InnerBlockDocComment,
  InnerDocComment,
  LineComment,
  OuterBlockDocComment,
  SourceFile,
} from "../src/components/index.js";

describe("LineComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <LineComment>Hello</LineComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("// Hello\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <LineComment>{"Line 1\nLine 2"}</LineComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("// Line 1\n// Line 2\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <LineComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <LineComment>{""}</LineComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});

describe("BlockComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <BlockComment>Hello</BlockComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/*\n * Hello\n */\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <BlockComment>{"Line 1\nLine 2"}</BlockComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/*\n * Line 1\n * Line 2\n */\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <BlockComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <BlockComment>{""}</BlockComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});

describe("DocComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <DocComment>Hello</DocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/// Hello\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <DocComment>{"Line 1\nLine 2"}</DocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/// Line 1\n/// Line 2\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <DocComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <DocComment>{""}</DocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});

describe("InnerDocComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerDocComment>Module docs</InnerDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("//! Module docs\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerDocComment>{"Line 1\nLine 2"}</InnerDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("//! Line 1\n//! Line 2\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerDocComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerDocComment>{""}</InnerDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});

describe("OuterBlockDocComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <OuterBlockDocComment>Hello</OuterBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/**\n * Hello\n */\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <OuterBlockDocComment>{"Line 1\nLine 2"}</OuterBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/**\n * Line 1\n * Line 2\n */\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <OuterBlockDocComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <OuterBlockDocComment>{""}</OuterBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});

describe("InnerBlockDocComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerBlockDocComment>Hello</InnerBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/*!\n * Hello\n */\n\n");
  });

  it("renders multiple lines", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerBlockDocComment>{"Line 1\nLine 2"}</InnerBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("/*!\n * Line 1\n * Line 2\n */\n\n");
  });

  it("renders nothing for empty or undefined children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerBlockDocComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerBlockDocComment>{""}</InnerBlockDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});
