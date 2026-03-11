import { type Children, Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  Attribute,
  CargoTomlFile,
  ConstDeclaration,
  CrateDirectory,
  DeriveAttribute,
  DocComment,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  FunctionCallExpression,
  ImplBlock,
  ModuleDirectory,
  ModuleDocComment,
  Parameters,
  Reference,
  SourceFile,
  StructExpression,
  FieldInit as FieldInitializer,
  StructDeclaration,
  TraitDeclaration,
  TypeAlias,
  TypeParameters,
  Value,
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

  it("ModuleDocComment wrapper supports .children and matches JSX output", () => {
    expect(inFile(<ModuleDocComment>Hello module</ModuleDocComment>)).toRenderTo(d`//! Hello module`);
    expect(inFile(Stc.ModuleDocComment().children(["Hello module"]))).toRenderTo(d`//! Hello module`);
  });

  it("CrateDirectory + ModuleDirectory + SourceFile wrappers match JSX output", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="net">
            <SourceFile path="client.rs">{"fn client() {}"}</SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn client() {}`);

    expect(
      <Output>
        {Stc.CrateDirectory({ name: "my_crate" }).children([
          Stc.ModuleDirectory({ path: "net" }).children([
            Stc.SourceFile({ path: "client.rs" }).children(["fn client() {}"]),
          ]),
        ])}
      </Output>,
    ).toRenderTo(d`fn client() {}`);
  });

  it("CargoTomlFile wrapper matches JSX output", () => {
    expect(
      <Output>
        <CargoTomlFile
          name="my_crate"
          dependencies={{
            serde: "1.0",
          }}
        />
      </Output>,
    ).toRenderTo(d`
      [package]
      name = "my_crate"
      version = "0.1.0"
      edition = "2021"

      [dependencies]
      serde = "1.0"
    `);

    expect(
      <Output>
        {Stc.CargoTomlFile({
          name: "my_crate",
          dependencies: {
            serde: "1.0",
          },
        })}
      </Output>,
    ).toRenderTo(d`
      [package]
      name = "my_crate"
      version = "0.1.0"
      edition = "2021"

      [dependencies]
      serde = "1.0"
    `);
  });

  it("Reference wrapper matches JSX output", () => {
    const userRef = refkey("user");

    expect(
      inFile(
        <>
          <StructDeclaration name="User" refkey={userRef} />
          <hbr />
          <TypeAlias name="UserAlias">
            <Reference refkey={userRef} />
          </TypeAlias>
        </>,
      ),
    ).toRenderTo(d`
      struct User {}
      type UserAlias = User;
    `);

    expect(
      inFile(
        <>
          <StructDeclaration name="User" refkey={userRef} />
          <hbr />
          {Stc.TypeAlias({ name: "UserAlias" }).children([Stc.Reference({ refkey: userRef })])}
        </>,
      ),
    ).toRenderTo(d`
      struct User {}
      type UserAlias = User;
    `);
  });

  it("Parameters and TypeParameters wrappers match JSX output", () => {
    expect(
      inFile(
        <FunctionDeclaration name="render_params">
          <Parameters parameters={[{ name: "value", type: "i32" }]} />
        </FunctionDeclaration>,
      ),
    ).toRenderTo(d`
      fn render_params() {
        (value: i32)
      }
    `);
    expect(
      inFile(
        Stc.FunctionDeclaration({ name: "render_params" }).children([
          Stc.Parameters({ parameters: [{ name: "value", type: "i32" }] }),
        ]),
      ),
    ).toRenderTo(d`
      fn render_params() {
        (value: i32)
      }
    `);

    expect(inFile(<TypeParameters params={[{ name: "T", constraint: "Clone" }]} />)).toRenderTo(
      d`<T: Clone>`,
    );
    expect(inFile(Stc.TypeParameters({ params: [{ name: "T", constraint: "Clone" }] }))).toRenderTo(
      d`<T: Clone>`,
    );
  });

  it("Value wrapper matches JSX output", () => {
    expect(<Value value={[1, "a"]} />).toRenderTo(d`vec![1, "a"]`);
    expect(Stc.Value({ value: [1, "a"] })).toRenderTo(d`vec![1, "a"]`);
  });

  it("StructExpression and FieldInit wrappers match JSX output", () => {
    expect(
      <StructExpression type="Self" spread="self">
        <FieldInitializer name="max_capacity">capacity</FieldInitializer>
      </StructExpression>,
    ).toRenderTo(d`
      Self {
        max_capacity: capacity,
        ..self
      }
    `);

    expect(
      Stc.StructExpression({ type: "Self", spread: "self" }).children([
        Stc.FieldInit({ name: "max_capacity" }).children(["capacity"]),
      ]),
    ).toRenderTo(d`
      Self {
        max_capacity: capacity,
        ..self
      }
    `);
  });

  it("FunctionCallExpression wrapper matches JSX output", () => {
    expect(
      <FunctionCallExpression target="self.data.insert" typeArgs={["String"]} args={["key", "entry"]} />,
    ).toRenderTo(d`self.data.insert::<String>(key, entry)`);

    expect(
      Stc.FunctionCallExpression({
        target: "self.data.insert",
        typeArgs: ["String"],
        args: ["key", "entry"],
      }),
    ).toRenderTo(d`self.data.insert::<String>(key, entry)`);
  });
});
