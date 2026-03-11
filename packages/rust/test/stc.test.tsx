import { type Children, Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  Attribute,
  ConstDeclaration,
  CrateDirectory,
  DeriveAttribute,
  DocComment,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  ImplBlock,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
  TypeAlias,
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

describe("STC wrappers", () => {
  it("StructDeclaration and Field wrappers match JSX output", () => {
    expect(
      inFile(
        <StructDeclaration name="Point">
          <Field name="x" type="i32" />
        </StructDeclaration>,
      ),
    ).toRenderTo(d`
      struct Point {
        x: i32,
      }
    `);

    expect(
      inFile(
        Stc.StructDeclaration({ name: "Point" }).children([
          Stc.Field({ name: "x", type: "i32" }),
        ]),
      ),
    ).toRenderTo(d`
      struct Point {
        x: i32,
      }
    `);
  });

  it("EnumDeclaration and EnumVariant wrappers match JSX output", () => {
    expect(
      inFile(
        <EnumDeclaration name="Status">
          <EnumVariant name="Ok" />
        </EnumDeclaration>,
      ),
    ).toRenderTo(d`
      enum Status {
        Ok,
      }
    `);

    expect(
      inFile(
        Stc.EnumDeclaration({ name: "Status" }).children([
          Stc.EnumVariant({ name: "Ok" }),
        ]),
      ),
    ).toRenderTo(d`
      enum Status {
        Ok,
      }
    `);
  });

  it("FunctionDeclaration wrapper supports .code and matches JSX output", () => {
    expect(
      inFile(<FunctionDeclaration name="hello">{"println!(\"hi\");"}</FunctionDeclaration>),
    ).toRenderTo(d`
      fn hello() {
        println!("hi");
      }
    `);

    expect(
      inFile(Stc.FunctionDeclaration({ name: "hello" }).code`println!("hi");`),
    ).toRenderTo(d`
      fn hello() {
        println!("hi");
      }
    `);
  });

  it("TraitDeclaration wrapper matches JSX output", () => {
    expect(inFile(<TraitDeclaration name="Runner" />)).toRenderTo(d`trait Runner {}`);
    expect(inFile(Stc.TraitDeclaration({ name: "Runner" }))).toRenderTo(d`trait Runner {}`);
  });

  it("ImplBlock wrapper matches JSX output", () => {
    const itemRef = refkey("item");

    expect(
      inFile(
        <>
          <StructDeclaration name="Item" refkey={itemRef} />
          <hbr />
          <ImplBlock type={itemRef}>
            <FunctionDeclaration name="run" />
          </ImplBlock>
        </>,
      ),
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn run(&self) {}
      }
    `);

    expect(
      inFile(
        <>
          <StructDeclaration name="Item" refkey={itemRef} />
          <hbr />
          {Stc.ImplBlock({ type: itemRef }).children([
            Stc.FunctionDeclaration({ name: "run" }),
          ])}
        </>,
      ),
    ).toRenderTo(d`
      struct Item {}
      impl Item {
        fn run(&self) {}
      }
    `);
  });

  it("TypeAlias wrapper matches JSX output", () => {
    expect(inFile(<TypeAlias name="Bytes">{"Vec<u8>"}</TypeAlias>)).toRenderTo(
      d`type Bytes = Vec<u8>;`,
    );
    expect(inFile(Stc.TypeAlias({ name: "Bytes" }).children(["Vec<u8>"]))).toRenderTo(
      d`type Bytes = Vec<u8>;`,
    );
  });

  it("ConstDeclaration wrapper matches JSX output", () => {
    expect(inFile(<ConstDeclaration name="MAX" type="usize">100</ConstDeclaration>)).toRenderTo(
      d`const MAX: usize = 100;`,
    );
    expect(inFile(Stc.ConstDeclaration({ name: "MAX", type: "usize" }).children(["100"]))).toRenderTo(
      d`const MAX: usize = 100;`,
    );
  });

  it("Attribute wrapper matches JSX output", () => {
    expect(inFile(<Attribute name="cfg" args="test" />)).toRenderTo(d`#[cfg(test)]`);
    expect(inFile(Stc.Attribute({ name: "cfg", args: "test" }))).toRenderTo(d`#[cfg(test)]`);
  });

  it("DeriveAttribute wrapper matches JSX output", () => {
    expect(inFile(<DeriveAttribute traits={["Debug", "Clone"]} />)).toRenderTo(
      d`#[derive(Debug, Clone)]`,
    );
    expect(inFile(Stc.DeriveAttribute({ traits: ["Debug", "Clone"] }))).toRenderTo(
      d`#[derive(Debug, Clone)]`,
    );
  });

  it("DocComment wrapper supports .children and matches JSX output", () => {
    expect(inFile(<DocComment>Hello</DocComment>)).toRenderTo(d`/// Hello`);
    expect(inFile(Stc.DocComment().children(["Hello"]))).toRenderTo(d`/// Hello`);
  });
});
