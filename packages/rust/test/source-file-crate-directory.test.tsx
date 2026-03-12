import { Output, code, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { useCrateContext } from "../src/context/crate-context.js";
import { RustCrateScope } from "../src/scopes/rust-crate-scope.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { ModuleDocComment } from "../src/components/doc-comment.js";
import { SourceFile } from "../src/components/source-file.js";
import { findFile } from "./utils.js";

function CrateContextProbe() {
  const crate = useCrateContext();
  return `${crate?.name}|${crate?.version ?? "none"}|${crate?.edition}|${crate?.crateType}|${crate?.scope instanceof RustCrateScope}`;
}

function ModuleScopeProbe() {
  const scope = useRustModuleScope();
  return scope.name;
}

describe("SourceFile", () => {
  it("creates a RustModuleScope and renders children in that scope", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ModuleScopeProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`lib.rs`);
  });

  it("renders files with filetype='rust'", () => {
    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">{code`pub fn run() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib.rs").filetype).toBe("rust");
  });

  it("keeps placeholder blocks output-neutral", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">{code`fn main() {}`}</SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`fn main() {}`);
  });

  it("renders module doc comments via headerComment", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs" headerComment={<ModuleDocComment>Crate docs</ModuleDocComment>}>
            {code`fn main() {}`}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      //! Crate docs

      fn main() {}
    `);
  });

  it("registers standalone source files with pub(super) visibility", () => {
    let moduleScopeName = "";
    let moduleScopeValues = "";

    function ModuleVisibilityCapture() {
      const scope = useRustModuleScope();
      const parentScope = scope.parent;
      if (parentScope instanceof RustCrateScope) {
        return "missing-parent-module";
      }

      moduleScopeName = parentScope?.name ?? "";
      moduleScopeValues = [...(parentScope?.childModules.values() ?? [])]
        .map((entry) => `${entry.name}:${entry.visibility ?? "none"}`)
        .sort()
        .join("|");

      return <></>;
    }

    render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="net">
            <SourceFile path="client.rs" pub_super={true}>
              <ModuleVisibilityCapture />
              {code`fn client() {}`}
            </SourceFile>
            <SourceFile path="server.rs" pub_crate={true} pub_super={true}>
              <ModuleVisibilityCapture />
              {code`fn server() {}`}
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(moduleScopeName).toBe("net");
    expect(moduleScopeValues).toBe("client:pub(super)|server:pub(crate)");
  });
});

describe("CrateDirectory", () => {
  it("provides crate metadata context with default edition", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate" version="0.1.0">
          <SourceFile path="lib.rs">
            <CrateContextProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`my_crate|0.1.0|2021|lib|true`);
  });

  it("uses explicit edition override", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate" edition="2024">
          <SourceFile path="lib.rs">
            <CrateContextProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`my_crate|none|2024|lib|true`);
  });

  it("defaults crateType to lib when omitted", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <CrateContextProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`my_crate|none|2021|lib|true`);
  });

  it("propagates explicit crateType=bin", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate" crateType="bin">
          <SourceFile path="lib.rs">
            <CrateContextProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`my_crate|none|2021|bin|true`);
  });

  it("propagates explicit crateType=lib", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate" crateType="lib">
          <SourceFile path="lib.rs">
            <CrateContextProbe />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`my_crate|none|2021|lib|true`);
  });
});
