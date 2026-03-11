import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  Declaration,
  Field,
  FunctionDeclaration,
  ModuleDirectory,
  Reference,
  SourceFile,
  StructDeclaration,
} from "../src/components/index.js";
import { findFile } from "./utils.js";

describe("Module structure integration", () => {
  it("renders a multi-file crate tree with root module declarations", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">{`pub struct User;`}</SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="routes">
            <SourceFile path="mod.rs">{`pub fn list() {}`}</SourceFile>
          </ModuleDirectory>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(
      d`
        mod models;
        mod routes;
      `.trim(),
    );
    expect(findFile(output, "models/mod.rs").contents.trim()).toBe(d`pub struct User;`);
    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`pub fn list() {}`);
  });

  it("renders nested module directories with expected file tree", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <ModuleDirectory path="user">
              <SourceFile path="mod.rs">{`pub struct User;`}</SourceFile>
            </ModuleDirectory>
            <SourceFile path="mod.rs" />
          </ModuleDirectory>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`mod models;`);
    expect(findFile(output, "models/mod.rs").contents.trim()).toBe(d`mod user;`);
    expect(findFile(output, "models/user/mod.rs").contents.trim()).toBe(d`pub struct User;`);
  });

  it("auto-generates lib.rs mod declarations for top-level modules", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="zebra">
            <SourceFile path="mod.rs" />
          </ModuleDirectory>
          <ModuleDirectory path="alpha" pub>
            <SourceFile path="mod.rs" />
          </ModuleDirectory>
          <SourceFile path="lib.rs">{`fn root() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(
      d`
        pub mod alpha;
        mod zebra;
        fn root() {}
      `.trim(),
    );
  });

  it("auto-generates nested mod.rs declarations for child module directories", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="api">
            <ModuleDirectory path="internal">
              <SourceFile path="mod.rs" />
            </ModuleDirectory>
            <ModuleDirectory path="v1" pub>
              <SourceFile path="mod.rs" />
            </ModuleDirectory>
            <SourceFile path="mod.rs">{`fn api_root() {}`}</SourceFile>
          </ModuleDirectory>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "api/mod.rs").contents.trim()).toBe(
      d`
        mod internal;
        pub mod v1;
        fn api_root() {}
      `.trim(),
    );
  });

  it("auto-generates lib.rs mod declarations for standalone root source files", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="user.rs">{`pub struct User;`}</SourceFile>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`mod user;`);
    expect(findFile(output, "user.rs").contents.trim()).toBe(d`pub struct User;`);
  });

  it("supports pub mod declarations for standalone root source files", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="api.rs" pub>{`pub fn ping() {}`}</SourceFile>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`pub mod api;`);
    expect(findFile(output, "api.rs").contents.trim()).toBe(d`pub fn ping() {}`);
  });

  it("does not self-register module-root files", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">{`fn root() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(d`fn root() {}`);
  });

  it("keeps deterministic ordering across module directories and standalone source files", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="zebra">
            <SourceFile path="mod.rs" />
          </ModuleDirectory>
          <ModuleDirectory path="beta" pub>
            <SourceFile path="mod.rs" />
          </ModuleDirectory>
          <SourceFile path="alpha.rs" />
          <SourceFile path="gamma.rs" pub />
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents.trim()).toBe(
      d`
        mod alpha;
        pub mod beta;
        pub mod gamma;
        mod zebra;
      `.trim(),
    );
  });

  it("generates use statements for cross-module references", () => {
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
          <ModuleDirectory path="services">
            <SourceFile path="mod.rs">
              type UserAlias = <Reference refkey={userRef} />;
            </SourceFile>
          </ModuleDirectory>
          <SourceFile path="lib.rs" />
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "services/mod.rs").contents.trim()).toBe(
      d`
        use crate::models::User;
        type UserAlias = User;
      `.trim(),
    );
  });

  it("renders the PRD 7.2 golden module scenario", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
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
              {`use crate::models::User;`}
              <hbr />
              <FunctionDeclaration
                name="greet"
                pub
                parameters={[{ name: "user", type: "&User" }]}
                returnType="String"
              >
                {`format!("Hello, {}!", user.name)`}
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
});
