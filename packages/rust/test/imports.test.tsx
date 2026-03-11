import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { Declaration } from "../src/components/declaration.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { Reference } from "../src/components/reference.js";
import { SourceFile } from "../src/components/source-file.js";
import { findFile } from "./utils.js";

describe("Rust imports integration", () => {
  it("does not generate use statements for same-module references", () => {
    const userRef = refkey("user");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="User" refkey={userRef} nameKind="struct" pub>
              struct User;
            </Declaration>
            <hbr />
            type UserAlias = <Reference refkey={userRef} />;
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`
      pub struct User;
      type UserAlias = User;
    `.trim());
  });

  it("generates crate use for same-crate references across modules", () => {
    const userRef = refkey("user");

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
              type UserAlias = <Reference refkey={userRef} />;
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::User;
      type UserAlias = User;
    `.trim());
  });

  it("groups multiple imports from same module path with braces", () => {
    const userRef = refkey("user");
    const accountRef = refkey("account");

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

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::{Account, User};
      type UserAlias = User;
      type AccountAlias = Account;
    `.trim());
  });

  it("sorts imports by std, external, then crate groups with blank lines", () => {
    const mapRef = refkey("hash-map");
    const deserializeRef = refkey("deserialize");
    const userRef = refkey("user");

    const output = render(
      <Output>
        <CrateDirectory name="std">
          <ModuleDirectory path="collections">
            <SourceFile path="mod.rs">
              <Declaration name="HashMap" refkey={mapRef} nameKind="struct" pub>
                pub struct HashMap;
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
        <CrateDirectory name="serde">
          <ModuleDirectory path="de">
            <SourceFile path="mod.rs">
              <Declaration name="DeserializeOwned" refkey={deserializeRef} nameKind="trait" pub>
                pub trait DeserializeOwned {}
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
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
              type MapAlias = <Reference refkey={mapRef} />;
              <hbr />
              type DeserializeAlias = <Reference refkey={deserializeRef} />;
              <hbr />
              type UserAlias = <Reference refkey={userRef} />;
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use std::collections::HashMap;

      use serde::de::DeserializeOwned;

      use crate::models::User;
      type MapAlias = HashMap;
      type DeserializeAlias = DeserializeOwned;
      type UserAlias = User;
    `.trim());
  });

  it("does not generate use statements for prelude types", () => {
    const optionRef = refkey("option");
    const resultRef = refkey("result");
    const vecRef = refkey("vec");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="types">
            <Declaration name="Option" refkey={optionRef} nameKind="struct" pub>
              pub struct Option;
            </Declaration>
            <hbr />
            <Declaration name="Result" refkey={resultRef} nameKind="enum" pub>
              pub enum Result {}
            </Declaration>
            <hbr />
            <Declaration name="Vec" refkey={vecRef} nameKind="struct" pub>
              pub struct Vec;
            </Declaration>
          </SourceFile>
          <SourceFile path="lib.rs">
            type OptionAlias = <Reference refkey={optionRef} />;
            <hbr />
            type ResultAlias = <Reference refkey={resultRef} />;
            <hbr />
            type VecAlias = <Reference refkey={vecRef} />;
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`
      type OptionAlias = Option;
      type ResultAlias = Result;
      type VecAlias = Vec;
    `.trim());
  });
});
