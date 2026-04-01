import { Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  DocComment,
  EnumDeclaration,
  EnumVariant,
  InnerDocComment,
  SourceFile,
  StructDeclaration,
} from "../src/index.js";

describe("T073: doc comment declaration line breaks", () => {
  it("should insert line break between DocComment and EnumDeclaration without explicit hbr", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <DocComment>{"First doc\nSecond line"}</DocComment>
            <EnumDeclaration name="MyEnum" pub>
              <EnumVariant name="Variant1" />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      /// First doc
      /// Second line
      pub enum MyEnum {
        Variant1,
      }
    `);
  });

  it("should insert line break between InnerDocComment and StructDeclaration without explicit hbr", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <InnerDocComment>{"Module docs\nSecond line"}</InnerDocComment>
            <StructDeclaration name="Response" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      //! Module docs
      //! Second line
      struct Response {}
    `);
  });
});
