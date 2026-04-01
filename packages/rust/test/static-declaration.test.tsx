import { Output, refkey, stc } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  Attribute,
  CrateDirectory,
  SourceFile,
  StaticDeclaration,
} from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

function StaticSymbolProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.values) {
    if (symbol instanceof RustOutputSymbol && symbol.name === props.name) {
      return `${symbol.symbolKind}|${symbol.visibility ?? "none"}`;
    }
  }

  return "missing";
}

describe("StaticDeclaration", () => {
  it("renders a basic static declaration", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration name="COUNTER" type="AtomicUsize">
              AtomicUsize::new(0)
            </StaticDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`static COUNTER: AtomicUsize = AtomicUsize::new(0);`);
  });

  it("renders static mut when mutable is true", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration name="BUFFER" mutable={true} type="Vec<u8>">
              Vec::new()
            </StaticDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`static mut BUFFER: Vec<u8> = Vec::new();`);
  });

  it("renders pub, pub(crate), and pub(super) visibility", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration name="COUNTER" pub={true} type="AtomicUsize">
              AtomicUsize::new(0)
            </StaticDeclaration>
            <hbr />
            <StaticDeclaration name="BUFFER" pub_crate={true} type="Vec<u8>">
              Vec::new()
            </StaticDeclaration>
            <hbr />
            <StaticDeclaration name="OWNER" pub_super={true} type="usize">
              7
            </StaticDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub static COUNTER: AtomicUsize = AtomicUsize::new(0);
      pub(crate) static BUFFER: Vec<u8> = Vec::new();
      pub(super) static OWNER: usize = 7;
    `);
  });

  it("exports STC wrapper and supports direct stc wrapper usage", () => {
    const DirectStaticDeclaration = stc(StaticDeclaration);

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            {Stc.StaticDeclaration({ name: "SHARED", type: "usize" }).children([
              "10",
            ])}
            <hbr />
            {DirectStaticDeclaration({
              name: "LOCAL",
              mutable: true,
              type: "usize",
            }).children(["11"])}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      static SHARED: usize = 10;
      static mut LOCAL: usize = 11;
    `);
  });

  it("creates static symbol metadata with visibility value", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration
              name="WORKER_COUNT"
              pub_crate={true}
              type="usize"
            >
              4
            </StaticDeclaration>
            <hbr />
            <StaticSymbolProbe name="WORKER_COUNT" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub(crate) static WORKER_COUNT: usize = 4;
      static|pub(crate)
    `);
  });

  it("applies visibility precedence for static declarations", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration
              name="WORKER_COUNT"
              pub={true}
              pub_crate={true}
              pub_super={true}
              type="usize"
            >
              4
            </StaticDeclaration>
            <hbr />
            <StaticSymbolProbe name="WORKER_COUNT" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub static WORKER_COUNT: usize = 4;
      static|pub
    `);
  });

  it("supports refkey references", () => {
    const staticRef = refkey("global-flag");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration
              name="GLOBAL_FLAG"
              refkey={staticRef}
              type="bool"
            >
              true
            </StaticDeclaration>
            <hbr />
            {staticRef}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      static GLOBAL_FLAG: bool = true;
      GLOBAL_FLAG
    `);
  });

  it("renders attributes before static declaration", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration
              name="GLOBAL"
              type="u32"
              attributes={<Attribute name="no_mangle" />}
            >
              0
            </StaticDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[no_mangle]
      static GLOBAL: u32 = 0;
    `);
  });

  it("renders attributes with mutable static", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StaticDeclaration
              name="BUFFER"
              mutable
              type="Vec<u8>"
              attributes={
                <>
                  <Attribute name="no_mangle" />
                  <hbr />
                  <Attribute name="used" />
                </>
              }
            >
              Vec::new()
            </StaticDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[no_mangle]
      #[used]
      static mut BUFFER: Vec<u8> = Vec::new();
    `);
  });
});
