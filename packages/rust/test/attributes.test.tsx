import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  Attribute,
  CrateDirectory,
  Declaration,
  DeriveAttribute,
  InnerAttribute,
  SourceFile,
  StructDeclaration,
} from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";

describe("Attribute", () => {
  it("renders simple attribute", () => {
    expect(<Attribute name="test" />).toRenderTo(d`#[test]`);
  });

  it("renders attribute with args", () => {
    expect(<Attribute name="cfg" args="test" />).toRenderTo(d`#[cfg(test)]`);
  });

  it("renders refkey attribute names", () => {
    const attributeName = refkey("custom-attribute");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration
              name="my_custom_attribute"
              refkey={attributeName}
              nameKind="function"
            >
              fn my_custom_attribute() {`{}`}
            </Declaration>
            <hbr />
            <Attribute name={attributeName} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      fn my_custom_attribute() {}
      #[my_custom_attribute]
    `);
  });
});

describe("DeriveAttribute", () => {
  it("renders single derive trait", () => {
    expect(<DeriveAttribute traits={["Debug"]} />).toRenderTo(
      d`#[derive(Debug)]`,
    );
  });

  it("renders multiple derive traits", () => {
    expect(
      <DeriveAttribute traits={["Debug", "Clone", "Serialize"]} />,
    ).toRenderTo(d`#[derive(Debug, Clone, Serialize)]`);
  });

  it("resolves refkey trait names", () => {
    const serializeTrait = refkey("serialize-trait");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration
              name="Serialize"
              refkey={serializeTrait}
              nameKind="trait"
            >
              trait Serialize {`{}`}
            </Declaration>
            <hbr />
            <DeriveAttribute traits={[serializeTrait]} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Serialize {}
      #[derive(Serialize)]
    `);
  });

  it("renders before declarations", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Foo"
              attributes={<Attribute name="repr" args="C" />}
              derives={["Debug", "Clone"]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[repr(C)]
      #[derive(Debug, Clone)]
      struct Foo {}
    `);
  });
});

describe("InnerAttribute", () => {
  it("renders simple inner attribute", () => {
    expect(<InnerAttribute name="allow" />).toRenderTo(d`#![allow]`);
  });

  it("renders inner attribute with args", () => {
    expect(<InnerAttribute name="cfg" args="test" />).toRenderTo(
      d`#![cfg(test)]`,
    );
  });

  it("renders stc inner attribute wrapper", () => {
    expect(
      Stc.InnerAttribute({ name: "cfg", args: 'feature = "cli"' }),
    ).toRenderTo(d`#![cfg(feature = "cli")]`);
  });
});
