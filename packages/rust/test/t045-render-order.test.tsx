import { Output, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { SourceFile } from "../src/components/source-file.js";

describe("T045 — ModDeclarations render order (lib.rs before modules)", () => {
  it("renders sorted declarations with visibility when lib.rs is placed BEFORE ModuleDirectory children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs" />
          <ModuleDirectory path="zebra" />
          <ModuleDirectory path="alpha" pub />
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub mod alpha;
      mod zebra;
    `);
  });

  it("renders sorted declarations with visibility when lib.rs is placed AFTER ModuleDirectory children", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="zebra" />
          <ModuleDirectory path="alpha" pub />
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub mod alpha;
      mod zebra;
    `);
  });
});
