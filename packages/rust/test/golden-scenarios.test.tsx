import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  EnumDeclaration,
  EnumVariant,
  Field,
  FunctionDeclaration,
  ImplBlock,
  ModuleDirectory,
  Reference,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
} from "../src/components/index.js";
import { createCrate } from "../src/create-crate.js";
import { findFile } from "./utils.js";

describe("Golden scenarios", () => {
  it("7.1 renders struct with inherent impl", () => {
    const pointRef = refkey("point");

    expect(
      <Output>
        <CrateDirectory name="geometry">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Point" refkey={pointRef} pub>
              <Field name="x" type="f64" pub />
              <Field name="y" type="f64" pub />
            </StructDeclaration>
            <hbr />
            <ImplBlock type={pointRef}>
              <FunctionDeclaration
                name="new"
                receiver="none"
                pub
                parameters={[
                  { name: "x", type: "f64" },
                  { name: "y", type: "f64" },
                ]}
                returnType="Self"
              >
                {"Self { x, y }"}
              </FunctionDeclaration>
              <hbr />
              <FunctionDeclaration
                name="distance"
                parameters={[{ name: "other", type: "&Point" }]}
                returnType="f64"
              >
                {"let dx = self.x - other.x;"}
                <hbr />
                {"let dy = self.y - other.y;"}
                <hbr />
                {"(dx * dx + dy * dy).sqrt()"}
              </FunctionDeclaration>
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub struct Point {
        pub x: f64,
        pub y: f64,
      }
      impl Point {
        pub fn new(x: f64, y: f64) -> Self {
          Self { x, y }
        }
        fn distance(&self, other: &Point) -> f64 {
          let dx = self.x - other.x;
          let dy = self.y - other.y;
          (dx * dx + dy * dy).sqrt()
        }
      }
    `);
  });

  it("7.2 renders multi-module crate with imports", () => {
    const output = render(
      <Output>
        <CrateDirectory name="app">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <StructDeclaration name="User" pub>
                <Field name="name" type="String" pub />
                <Field name="age" type="u32" pub />
              </StructDeclaration>
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="services">
            <SourceFile path="mod.rs">
              {"use crate::models::User;"}
              <hbr />
              <FunctionDeclaration
                name="greet"
                pub
                parameters={[{ name: "user", type: "&User" }]}
                returnType="String"
              >
                {'format!("Hello, {}!", user.name)'}
              </FunctionDeclaration>
            </SourceFile>
          </ModuleDirectory>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(
      d`
        mod models;
        mod services;
      `.trim(),
    );
    expect(findFile(output, "models/mod.rs").contents.trim()).toBe(
      d`
        pub struct User {
          pub name: String,
          pub age: u32,
        }
      `.trim(),
    );
    expect(findFile(output, "services/mod.rs").contents.trim()).toBe(
      d`
        use crate::models::User;
        pub fn greet(user: &User) -> String {
          format!("Hello, {}!", user.name)
        }
      `.trim(),
    );
  });

  it("7.3 renders trait declaration and trait impl", () => {
    const greetableRef = refkey("greetable");
    const userRef = refkey("user");

    expect(
      <Output>
        <CrateDirectory name="greetings">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Greetable" refkey={greetableRef}>
              {"fn greet(&self) -> String;"}
            </TraitDeclaration>
            <hbr />
            <StructDeclaration name="User" refkey={userRef} pub>
              <Field name="name" type="String" pub />
            </StructDeclaration>
            <hbr />
            <ImplBlock type={userRef} trait={greetableRef}>
              <FunctionDeclaration name="greet" returnType="String">
                {'format!("Hello, {}!", self.name)'}
              </FunctionDeclaration>
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Greetable {
        fn greet(&self) -> String;
      }
      pub struct User {
        pub name: String,
      }
      impl Greetable for User {
        fn greet(&self) -> String {
          format!("Hello, {}!", self.name)
        }
      }
    `);
  });

  it("7.4 renders enum with struct, tuple, and unit variants", () => {
    expect(
      <Output>
        <CrateDirectory name="shapes">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Shape" pub>
              <EnumVariant name="Circle">
                {"radius: f64,"}
              </EnumVariant>
              <EnumVariant name="Rectangle">
                {"width: f64,"}
                {"height: f64,"}
              </EnumVariant>
              <EnumVariant name="Point" fields={["f64", "f64"]} />
              <EnumVariant name="Nothing" />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub enum Shape {
        Circle {
          radius: f64,
        },
        Rectangle {
          width: f64,
          height: f64,
        },
        Point(f64, f64),
        Nothing,
      }
    `);
  });

  it("7.5 renders Cargo.toml with external dependency usage", () => {
    const serde = createCrate({
      name: "serde",
      version: "1.0.219",
      modules: {
        "": {
          Serialize: { kind: "trait" },
        },
      },
    });

    const output = render(
      <Output externals={[serde]}>
        <CrateDirectory name="consumer" includeCargoToml>
          <SourceFile path="lib.rs">
            type Serializable = <Reference refkey={serde[""].Serialize} />;
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(
      d`
        use serde::Serialize;
        type Serializable = Serialize;
      `.trim(),
    );
    expect(findFile(output, "Cargo.toml").contents.trim()).toBe(
      d`
        [package]
        name = "consumer"
        version = "0.1.0"
        edition = "2021"

        [dependencies]
        serde = "1.0.219"
      `.trim(),
    );
  });
});
