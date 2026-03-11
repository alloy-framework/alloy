import { Output, code, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { useCrateContext } from "../src/context/crate-context.js";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { SourceFile } from "../src/components/source-file.js";
import { RustCrateScope } from "../src/scopes/rust-crate-scope.js";
import { RustModuleScope, useRustModuleScope } from "../src/scopes/index.js";
import { findFile } from "./utils.js";

function ScopeCapture() {
  const sourceFileScope = useRustModuleScope();
  const crateScope = useCrateContext()!.scope;
  const directoryScope = sourceFileScope.parent;
  const parentDirectoryScope =
    directoryScope instanceof RustModuleScope ? directoryScope.parent : undefined;

  return (
    <>
      {`${sourceFileScope.name}|${directoryScope?.name ?? "none"}|${
        parentDirectoryScope?.name ?? "none"
      }|${crateScope instanceof RustCrateScope}`}
    </>
  );
}

describe("ModuleDirectory", () => {
  it("creates a source directory and registers a public child module on the crate scope", () => {
    let crateScope: RustCrateScope | undefined;

    function CrateScopeCapture() {
      crateScope = useCrateContext()!.scope;
      return <ScopeCapture />;
    }

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="net" pub>
            <SourceFile path="client.rs">
              <CrateScopeCapture />
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "net/client.rs").contents.trim()).toBe(
      d`client.rs|net|my_crate|true`,
    );
    expect(crateScope).toBeDefined();
    expect(crateScope!.childModules.get("net")).toEqual({
      name: "net",
      visibility: "pub",
    });
  });

  it("registers nested module directories as child modules of their parent module scope", () => {
    let crateScope: RustCrateScope | undefined;
    let sourceFileScope: RustModuleScope | undefined;

    function NestedScopeCapture() {
      sourceFileScope = useRustModuleScope();
      crateScope = useCrateContext()!.scope;
      return <></>;
    }

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="net">
            <ModuleDirectory path="http" pub>
              <SourceFile path="client.rs">
                <NestedScopeCapture />
                {code`fn client() {}`}
              </SourceFile>
            </ModuleDirectory>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "net/http/client.rs").contents.trim()).toBe(d`fn client() {}`);
    expect(crateScope).toBeDefined();
    expect(sourceFileScope).toBeDefined();
    expect(crateScope!.childModules.get("net")).toEqual({
      name: "net",
      visibility: undefined,
    });

    const innerDirectoryScope = sourceFileScope!.parent;
    expect(innerDirectoryScope).toBeInstanceOf(RustModuleScope);
    expect(innerDirectoryScope!.name).toBe("http");
    expect(innerDirectoryScope!.childModules.size).toBe(0);

    const outerDirectoryScope = innerDirectoryScope!.parent;
    expect(outerDirectoryScope).toBeInstanceOf(RustModuleScope);
    if (!(outerDirectoryScope instanceof RustModuleScope)) {
      throw new Error("Expected outer directory scope to be a RustModuleScope.");
    }
    expect(outerDirectoryScope.name).toBe("net");
    expect(outerDirectoryScope.childModules.get("http")).toEqual({
      name: "http",
      visibility: "pub",
    });
  });
});
