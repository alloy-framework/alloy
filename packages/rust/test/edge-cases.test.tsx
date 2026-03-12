import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  Declaration,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  ImplBlock,
  Reference,
  SourceFile,
  StructDeclaration,
} from "../src/components/index.js";
import { createRustNamePolicy } from "../src/name-policy.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { findFile } from "./utils.js";

describe("Rust edge cases", () => {
  describe("empty and minimal constructs", () => {
    it("renders empty struct, empty enum, and empty function", () => {
      expect(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="lib.rs">
              <StructDeclaration name="Empty" />
              <hbr />
              <EnumDeclaration name="Never" />
              <hbr />
              <FunctionDeclaration name="noop" receiver="none" />
            </SourceFile>
          </CrateDirectory>
        </Output>,
      ).toRenderTo(d`
        struct Empty {}
        enum Never {}
        fn noop() {}
      `);
    });

    it("renders minimal single-field and single-variant constructs", () => {
      expect(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="lib.rs">
              <StructDeclaration name="Wrapper">
                <Field name="value" type="i32" />
              </StructDeclaration>
              <hbr />
              <EnumDeclaration name="Unit">
                <EnumVariant name="Only" />
              </EnumDeclaration>
            </SourceFile>
          </CrateDirectory>
        </Output>,
      ).toRenderTo(d`
        struct Wrapper {
          value: i32,
        }
        enum Unit {
          Only,
        }
      `);
    });
  });

  describe("reserved word escaping", () => {
    it("escapes type and related reserved identifiers with r# prefix", () => {
      const namePolicy = createRustNamePolicy();
      const reservedWords = [
        "type",
        "self",
        "super",
        "crate",
        "fn",
        "struct",
        "enum",
        "trait",
        "impl",
      ] as const;

      for (const reservedWord of reservedWords) {
        expect(namePolicy.getName(reservedWord, "variable")).toBe(
          `r#${reservedWord}`,
        );
      }
    });
  });

  describe("imports and references", () => {
    it("deduplicates duplicate references to the same symbol", () => {
      const userRef = refkey("edge-user");

      const output = render(
        <Output>
          <CrateDirectory name="my_crate">
            <ModuleDirectory path="models">
              <SourceFile path="mod.rs">
                <Declaration name="User" refkey={userRef} nameKind="struct" pub>
                  pub struct User;
                </Declaration>
              </SourceFile>
            </ModuleDirectory>
            <ModuleDirectory path="routes">
              <SourceFile path="mod.rs">
                type FirstAlias = <Reference refkey={userRef} />;
                <hbr />
                type SecondAlias = <Reference refkey={userRef} />;
              </SourceFile>
            </ModuleDirectory>
          </CrateDirectory>
        </Output>,
      );

      expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(
        d`
          use crate::models::User;
          type FirstAlias = User;
          type SecondAlias = User;
        `.trim(),
      );
    });

    it("groups imports from the same module path", () => {
      const userRef = refkey("edge-user");
      const accountRef = refkey("edge-account");

      const output = render(
        <Output>
          <CrateDirectory name="my_crate">
            <ModuleDirectory path="models">
              <SourceFile path="mod.rs">
                <Declaration name="User" refkey={userRef} nameKind="struct" pub>
                  pub struct User;
                </Declaration>
                <hbr />
                <Declaration name="Account" refkey={accountRef} nameKind="struct" pub>
                  pub struct Account;
                </Declaration>
              </SourceFile>
            </ModuleDirectory>
            <ModuleDirectory path="routes">
              <SourceFile path="mod.rs">
                type UserAlias = <Reference refkey={userRef} />;
                <hbr />
                type AccountAlias = <Reference refkey={accountRef} />;
              </SourceFile>
            </ModuleDirectory>
          </CrateDirectory>
        </Output>,
      );

      expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(
        d`
          use crate::models::{Account, User};
          type UserAlias = User;
          type AccountAlias = Account;
        `.trim(),
      );
    });

    it("generates use statements for same-crate types shadowing prelude names", () => {
      const optionRef = refkey("edge-option");
      const vecRef = refkey("edge-vec");
      const stringRef = refkey("edge-string");

      const output = render(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="types">
              <Declaration name="Option" refkey={optionRef} nameKind="struct" pub>
                pub struct Option;
              </Declaration>
              <hbr />
              <Declaration name="Vec" refkey={vecRef} nameKind="struct" pub>
                pub struct Vec;
              </Declaration>
              <hbr />
              <Declaration name="String" refkey={stringRef} nameKind="struct" pub>
                pub struct String;
              </Declaration>
            </SourceFile>
            <SourceFile path="lib.rs">
              type Maybe = <Reference refkey={optionRef} />;
              <hbr />
              type Items = <Reference refkey={vecRef} />;
              <hbr />
              type Name = <Reference refkey={stringRef} />;
            </SourceFile>
          </CrateDirectory>
        </Output>,
      );

      expect(findFile(output, "lib.rs").contents.trim()).toBe(
        d`
          use crate::types::{Option, String, Vec};
          type Maybe = Option;
          type Items = Vec;
          type Name = String;
        `.trim(),
      );
    });

    it("throws when referencing a private symbol across modules", () => {
      const privateType = refkey("edge-private-model");

      expect(() =>
        render(
          <Output>
            <CrateDirectory name="my_crate">
              <SourceFile path="models">
                <Declaration name="PrivateModel" refkey={privateType} nameKind="struct">
                  struct PrivateModel;
                </Declaration>
              </SourceFile>
              <SourceFile path="routes">
                type Alias = <Reference refkey={privateType} />;
              </SourceFile>
            </CrateDirectory>
          </Output>,
        ),
      ).toThrowError("Cannot reference private symbol 'PrivateModel'");
    });
  });

  describe("multiple impl blocks", () => {
    it("renders multiple impl blocks for the same type", () => {
      const pointRef = refkey("edge-point");

      expect(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="lib.rs">
              <StructDeclaration name="Point" refkey={pointRef} />
              <hbr />
              <ImplBlock type={pointRef}>
                <FunctionDeclaration name="new" receiver="none" />
              </ImplBlock>
              <hbr />
              <ImplBlock type={pointRef}>
                <FunctionDeclaration name="distance" />
              </ImplBlock>
            </SourceFile>
          </CrateDirectory>
        </Output>,
      ).toRenderTo(d`
        struct Point {}
        impl Point {
          fn new() {}
        }
        impl Point {
          fn distance(&self) {}
        }
      `);
    });
  });
});
