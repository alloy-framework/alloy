import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  FunctionDeclaration,
  CrateDirectory,
  ImplBlock,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
} from "../src/components/index.js";
import { RustFunctionScope, useRustModuleScope, useRustScope } from "../src/scopes/index.js";
import { FunctionSymbol } from "../src/symbols/function-symbol.js";

function FunctionFlagsProbe(props: { name: string }) {
  const scope = useRustModuleScope();

  for (const symbol of scope.values) {
    if (symbol instanceof FunctionSymbol && symbol.name === props.name) {
      return `${symbol.visibility ?? "none"}|${symbol.isAsync}|${symbol.isUnsafe}|${symbol.isConst}`;
    }
  }

  return "missing";
}

function ParameterNamesProbe() {
  const scope = useRustScope();
  if (!(scope instanceof RustFunctionScope)) {
    return "not-function-scope";
  }

  return [...scope.parameters].map((symbol) => symbol.name).join(",");
}

describe("FunctionDeclaration", () => {
  it("renders basic function with empty body", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration name="foo" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn foo() {}`);
  });

  it("renders qualifiers in rust order", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration
              name="work"
              pub_crate={true}
              async={true}
              unsafe={true}
              const={true}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub(crate) async unsafe const fn work() {}`);
  });

  it("renders parameters from descriptors", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration
              name="process"
              parameters={[
                { name: "input-value", type: "String", mutable: true, refType: "&mut" },
                { name: "count", type: "usize" },
              ]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn process(mut input-value: &mut String, count: usize) {}`);
  });

  it("renders return type, type parameters, and where clause", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration
              name="map"
              parameters={[{ name: "item", type: "T" }]}
              returnType="U"
              typeParameters={[{ name: "T" }, { name: "U", constraint: "Display" }]}
              whereClause="U: Clone"
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn map<T, U: Display>(item: T) -> U where U: Clone {}`);
  });

  it("renders multiline doc comments and indented body", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration name="run" doc={"Line one.\nLine two."}>
              {"let value = 1;"}
              <hbr />
              {"value"}
            </FunctionDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      /// Line one.
      /// Line two.
      fn run() {
        let value = 1;
        value
      }
    `);
  });

  it("creates function and parameter symbols in function scope", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration
              name="run-work"
              pub_crate={true}
              async={true}
              unsafe={true}
              const={true}
              parameters={[{ name: "input-value", type: "i32" }]}
            >
              <ParameterNamesProbe />
            </FunctionDeclaration>
            <hbr />
            <FunctionFlagsProbe name="run-work" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub(crate) async unsafe const fn run-work(input-value: i32) {
        input-value
      }
      pub(crate)|true|true|true
    `);
  });

  it("defaults to &self receiver for methods in impl blocks", () => {
    const itemRef = refkey("item");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Item" refkey={itemRef} />
            <hbr />
            <ImplBlock type={itemRef}>
              <FunctionDeclaration name="run" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn run(&self) {}
      }
    `);
  });

  it("supports explicit &mut self receiver in methods", () => {
    const itemRef = refkey("item");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Item" refkey={itemRef} />
            <hbr />
            <ImplBlock type={itemRef}>
              <FunctionDeclaration name="run" receiver="&mut self" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn run(&mut self) {}
      }
    `);
  });

  it("supports explicit self receiver by value in methods", () => {
    const itemRef = refkey("item");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Item" refkey={itemRef} />
            <hbr />
            <ImplBlock type={itemRef}>
              <FunctionDeclaration name="consume" receiver="self" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn consume(self) {}
      }
    `);
  });

  it("supports associated functions with receiver none in methods", () => {
    const itemRef = refkey("item");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Item" refkey={itemRef} />
            <hbr />
            <ImplBlock type={itemRef}>
              <FunctionDeclaration name="new" receiver="none" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn new() {}
      }
    `);
  });

  it("renders receiver before additional parameters", () => {
    const itemRef = refkey("item");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Item" refkey={itemRef} />
            <hbr />
            <ImplBlock type={itemRef}>
              <FunctionDeclaration
                name="set"
                parameters={[{ name: "x", type: "i32" }, { name: "y", type: "i32" }]}
              />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn set(&self, x: i32, y: i32) {}
      }
    `);
  });

  it("defaults to &self receiver for methods in traits", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Runner">
              <FunctionDeclaration name="run" />
            </TraitDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Runner {
        fn run(&self) {}
      }
    `);
  });

  it("ignores receiver prop outside impl and trait scopes", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration name="utility" receiver="self" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn utility() {}`);
  });
});
