import { Output, Scope, code, createSymbol } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { SourceFile } from "../src/components/source-file.js";
import {
  UseStatement,
  UseStatements,
} from "../src/components/use-statement.js";
import { RustCrateScope } from "../src/scopes/rust-crate-scope.js";
import { RustModuleScope } from "../src/scopes/rust-module-scope.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

describe("UseStatement", () => {
  it("renders a single use line", () => {
    expect(<UseStatement path="std::fmt" symbol="Display" />).toRenderTo(
      d`use std::fmt::Display;`,
    );
  });
});

describe("UseStatements", () => {
  it("reads imports from RustModuleScope", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("lib.rs", crateScope);
    const display = createSymbol(
      RustOutputSymbol,
      "Display",
      moduleScope.values,
    );
    moduleScope.addUse("std::fmt", display);

    expect(
      <Output>
        <Scope value={moduleScope}>
          <UseStatements />
        </Scope>
      </Output>,
    ).toRenderTo(d`use std::fmt::Display;`);
  });

  it("renders grouped statements for multiple symbols from same path", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("lib.rs", crateScope);
    const display = createSymbol(
      RustOutputSymbol,
      "Display",
      moduleScope.values,
    );
    const debug = createSymbol(RustOutputSymbol, "Debug", moduleScope.values);
    moduleScope.addUse("std::fmt", display);
    moduleScope.addUse("std::fmt", debug);

    expect(
      <Output>
        <Scope value={moduleScope}>
          <UseStatements />
        </Scope>
      </Output>,
    ).toRenderTo(d`
      use std::fmt::{Debug, Display};
    `);
  });

  it("sorts groups as std, external, crate with blank lines and integrates in SourceFile", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("lib.rs", crateScope);
    moduleScope.addUse(
      "crate::types",
      createSymbol(RustOutputSymbol, "Response", moduleScope.values),
    );
    moduleScope.addUse(
      "std::fmt",
      createSymbol(RustOutputSymbol, "Debug", moduleScope.values),
    );
    moduleScope.addUse(
      "serde::de",
      createSymbol(RustOutputSymbol, "DeserializeOwned", moduleScope.values),
    );
    moduleScope.addUse(
      "crate::models",
      createSymbol(RustOutputSymbol, "User", moduleScope.values),
    );
    moduleScope.addUse(
      "std::collections",
      createSymbol(RustOutputSymbol, "HashMap", moduleScope.values),
    );
    moduleScope.addUse(
      "tokio::runtime",
      createSymbol(RustOutputSymbol, "Runtime", moduleScope.values),
    );

    expect(
      <Output>
        <Scope value={moduleScope}>
          <UseStatements />
        </Scope>
      </Output>,
    ).toRenderTo(d`
      use std::collections::HashMap;
      use std::fmt::Debug;

      use serde::de::DeserializeOwned;
      use tokio::runtime::Runtime;

      use crate::models::User;
      use crate::types::Response;
    `);
  });

  it("does not add blank lines for missing groups", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("lib.rs", crateScope);
    moduleScope.addUse(
      "crate::types",
      createSymbol(RustOutputSymbol, "OnlyType", moduleScope.values),
    );

    expect(
      <Output>
        <Scope value={moduleScope}>
          <UseStatements />
        </Scope>
      </Output>,
    ).toRenderTo(d`
      use crate::types::OnlyType;
    `);
  });

  it("integrates into SourceFile output position", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">{code`fn main() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn main() {}`);
  });
});
