import { Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  DocComment,
  ModuleDocComment,
  SourceFile,
} from "../src/components/index.js";

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

describe("ModuleDocComment", () => {
  it("renders a single line", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ModuleDocComment>Module docs</ModuleDocComment>
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
            <ModuleDocComment>{"Line 1\nLine 2"}</ModuleDocComment>
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
            <ModuleDocComment />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ModuleDocComment>{""}</ModuleDocComment>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo("");
  });
});
