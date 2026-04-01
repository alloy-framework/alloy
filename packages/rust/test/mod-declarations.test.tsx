import { Output, Scope, code, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Attribute } from "../src/components/attribute.js";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { ModDeclarations } from "../src/components/mod-declarations.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { SourceFile } from "../src/components/source-file.js";
import { RustCrateScope } from "../src/scopes/rust-crate-scope.js";
import { RustModuleScope } from "../src/scopes/rust-module-scope.js";
import { findFile } from "./utils.js";

describe("ModDeclarations", () => {
  it("renders crate root declarations with sorting and visibility", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="zebra" />
          <ModuleDirectory path="alpha" pub />
          <SourceFile path="lib.rs">{code`fn main() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub mod alpha;
      mod zebra;
      fn main() {}
    `);
  });

  it("renders nested module-root declarations from parent module scope", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="net">
            <ModuleDirectory path="zebra" />
            <ModuleDirectory path="alpha" pub />
            <SourceFile path="mod.rs">{code`fn net() {}`}</SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "net/mod.rs").contents).toContain(d`
      pub mod alpha;
      mod zebra;
      fn net() {}
    `);
  });

  it("does not render declarations in non-root source files", () => {
    const crateScope = new RustCrateScope("my_crate");
    const parentModuleScope = new RustModuleScope("net", crateScope);
    parentModuleScope.addChildModule("alpha", "pub");

    expect(
      <Output>
        <Scope value={parentModuleScope}>
          <SourceFile path="handler.rs">{code`fn handle() {}`}</SourceFile>
        </Scope>
      </Output>,
    ).toRenderTo(d`fn handle() {}`);
  });

  it("renders declarations before module content", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("mod.rs", crateScope);
    moduleScope.addChildModule("zebra", undefined);
    moduleScope.addChildModule("alpha", "pub");

    expect(
      <Output>
        <Scope value={moduleScope}>
          <ModDeclarations scope={moduleScope} />
          <hbr />
          {code`fn module_root() {}`}
        </Scope>
      </Output>,
    ).toRenderTo(d`
      pub mod alpha;
      mod zebra;
      fn module_root() {}
    `);
  });

  it("renders attributes on mod declarations from SourceFile", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile
            path="tests.rs"
            attributes={<Attribute name="cfg" args="test" />}
          >
            {code`fn test_it() {}`}
          </SourceFile>
          <SourceFile path="lib.rs">{code`fn main() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").contents).toContain(d`
      #[cfg(test)]
      mod tests;
      fn main() {}
    `);
  });

  it("renders attributes on mod declarations from ModuleDirectory", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory
            path="tests"
            pub
            attributes={<Attribute name="cfg" args="test" />}
          />
          <SourceFile path="lib.rs">{code`fn main() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[cfg(test)]
      pub mod tests;
      fn main() {}
    `);
  });

  it("renders attributes via addChildModule on scope", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("mod.rs", crateScope);
    moduleScope.addChildModule(
      "tests",
      undefined,
      <Attribute name="cfg" args="test" />,
    );
    moduleScope.addChildModule("utils", "pub");

    expect(
      <Output>
        <Scope value={moduleScope}>
          <ModDeclarations scope={moduleScope} />
        </Scope>
      </Output>,
    ).toRenderTo(d`
      #[cfg(test)]
      mod tests;
      pub mod utils;
    `);
  });
});
