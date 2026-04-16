import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  EnumDeclaration,
  EnumVariant,
  FunctionDeclaration,
  ImplBlock,
  SourceFile,
  StructDeclaration,
} from "../src/components/index.js";

describe("ref() qualified path rendering", () => {
  it("renders enum variant with qualified path (same module)", () => {
    const pendingVariant = refkey();

    // In Rust, enum variants must always be qualified: Status::Pending
    // Currently ref() returns only the leaf name "Pending"
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration pub name="Status">
              <EnumVariant name="Active" />
              <EnumVariant name="Pending" refkey={pendingVariant} />
            </EnumDeclaration>
            <hbr />
            let s = {pendingVariant};
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub enum Status {
        Active,
        Pending,
      }
      let s = Status::Pending;
    `);
  });

  it("renders enum variant with qualified path (cross module)", () => {
    const pendingVariant = refkey();

    // Cross-module: should generate use for the enum + qualified variant access
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="models.rs">
            <EnumDeclaration pub name="Status">
              <EnumVariant name="Active" />
              <EnumVariant name="Pending" refkey={pendingVariant} />
            </EnumDeclaration>
          </SourceFile>
          <SourceFile path="lib.rs">
            let s = {pendingVariant};
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo({
      "models.rs": d`
        pub enum Status {
          Active,
          Pending,
        }
      `,
      "lib.rs": d`
        mod models;
        use crate::models::Status;
        let s = Status::Pending;
      `,
    });
  });

  it("renders associated function with qualified path", () => {
    const structKey = refkey();
    const newFn = refkey();

    // Associated functions use :: syntax: Config::new()
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration pub name="Config" refkey={structKey}>
              {"timeout: u64,"}
            </StructDeclaration>
            <hbr />
            <ImplBlock type={structKey}>
              <FunctionDeclaration pub name="new" refkey={newFn} receiver="none" returnType="Self">
                {"Self { timeout: 30 }"}
              </FunctionDeclaration>
            </ImplBlock>
            <hbr />
            let c = {newFn}();
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Config {
        timeout: u64,
      }
      impl Config {
        pub fn new() -> Self {
          Self { timeout: 30 }
        }
      }
      let c = Config::new();
    `);
  });
});
