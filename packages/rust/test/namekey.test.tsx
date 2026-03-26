import { namekey, Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  ConstDeclaration,
  CrateDirectory,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  ImplBlock,
  Reference,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
  TypeAlias,
} from "../src/components/index.js";
import { findFile, toSourceTextMultiple } from "./utils.js";

describe("namekey support", () => {
  it("struct declaration with namekey as name", () => {
    const personKey = namekey("Person");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name={personKey} pub>
              <Field name="name" type="String" pub />
            </StructDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Person {
        pub name: String,
      }
    `);
  });

  it("namekey enables cross-reference without explicit refkey", () => {
    const personKey = namekey("Person");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name={personKey} pub>
              <Field name="name" type="String" pub />
            </StructDeclaration>
            <hbr />
            type Alias = <Reference refkey={personKey} />;
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Person {
        pub name: String,
      }
      type Alias = Person;
    `);
  });

  it("namekey works for inline refkey resolution", () => {
    const personKey = namekey("Person");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name={personKey} pub>
              <Field name="name" type="String" pub />
            </StructDeclaration>
            <hbr />
            type Alias = {personKey};
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Person {
        pub name: String,
      }
      type Alias = Person;
    `);
  });

  it("namekey generates use statement across files", () => {
    const personKey = namekey("Person");
    const output = toSourceTextMultiple([
      <SourceFile path="models.rs">
        <StructDeclaration name={personKey} pub>
          <Field name="name" type="String" pub />
        </StructDeclaration>
      </SourceFile>,
      <SourceFile path="lib.rs">
        type Alias = {personKey};
      </SourceFile>,
    ]);
    const libFile = findFile(output, "lib.rs");
    expect(libFile.contents).toContain("use crate::models::Person;");
    expect(libFile.contents).toContain("type Alias = Person;");
  });

  it("enum declaration with namekey", () => {
    const statusKey = namekey("Status");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name={statusKey} pub>
              <EnumVariant name="Active" />
              <EnumVariant name="Inactive" />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub enum Status {
        Active,
        Inactive,
      }
    `);
  });

  it("trait declaration with namekey and cross-reference", () => {
    const greetableKey = namekey("Greetable");
    const personKey = namekey("Person");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name={personKey} pub />
            <hbr />
            <TraitDeclaration name={greetableKey} pub>
              <FunctionDeclaration name="greet" receiver="&self" returnType="String" />
            </TraitDeclaration>
            <hbr />
            <ImplBlock type={personKey} trait={greetableKey}>
              <FunctionDeclaration name="greet" receiver="&self" returnType="String">
                String::from("hello")
              </FunctionDeclaration>
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Person {}
      pub trait Greetable {
        fn greet(&self) -> String;
      }
      impl Greetable for Person {
        fn greet(&self) -> String {
          String::from("hello")
        }
      }
    `);
  });

  it("function declaration with namekey", () => {
    const fnKey = namekey("do_stuff");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration name={fnKey} pub receiver="none" returnType="bool">
              true
            </FunctionDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub fn do_stuff() -> bool {
        true
      }
    `);
  });

  it("const declaration with namekey", () => {
    const maxKey = namekey("MAX_RETRIES");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ConstDeclaration name={maxKey} pub type="u32">5</ConstDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub const MAX_RETRIES: u32 = 5;`);
  });

  it("type alias with namekey", () => {
    const resultKey = namekey("AppResult");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TypeAlias name={resultKey} pub>Result&lt;String, String&gt;</TypeAlias>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub type AppResult = Result<String, String>;`);
  });

  it("field with namekey", () => {
    const nameField = namekey("user_name");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Config" pub>
              <Field name={nameField} type="String" pub />
            </StructDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Config {
        pub user_name: String,
      }
    `);
  });

  it("namekey with explicit refkey — both resolve to symbol", () => {
    const explicitKey = refkey();
    const nk = namekey("Foo");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name={nk} refkey={explicitKey} pub />
            <hbr />
            type A = <Reference refkey={explicitKey} />;
            <hbr />
            type B = {nk};
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Foo {}
      type A = Foo;
      type B = Foo;
    `);
  });
});
