import { Output, Scope, createSymbol } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import {
  RustCrateScope,
  RustFunctionScope,
  RustImplScope,
  RustLexicalScope,
  RustModuleScope,
  RustTraitScope,
  useRustCrateScope,
  useRustModuleScope,
  useRustScope,
} from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

describe("Rust scope hierarchy", () => {
  it("tracks crate modules and dependencies", () => {
    const crateScope = new RustCrateScope("my_crate");

    crateScope.addChildModule("net", "pub");
    crateScope.addChildModule("net", "pub(super)");
    crateScope.addDependency("serde", "1.0");
    crateScope.addDependency("tokio", { version: "1.42", features: ["rt"] });

    expect(crateScope.types).toBeDefined();
    expect(crateScope.values).toBeDefined();
    expect(crateScope.childModules.size).toBe(1);
    expect(crateScope.childModules.get("net")).toEqual({
      name: "net",
      visibility: "pub",
    });
    expect(crateScope.dependencies.get("serde")).toBe("1.0");
    expect(crateScope.dependencies.get("tokio")).toEqual({
      version: "1.42",
      features: ["rt"],
    });
  });

  it("tracks module imports grouped by path and child modules", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("http", crateScope);
    const request = createSymbol(
      RustOutputSymbol,
      "Request",
      moduleScope.values,
    );
    const response = createSymbol(
      RustOutputSymbol,
      "Response",
      moduleScope.values,
    );

    moduleScope.addUse("crate::types", request);
    moduleScope.addUse("crate::types", response);
    moduleScope.addUse("crate::types", request);
    moduleScope.addChildModule("client", "pub(crate)");

    expect(moduleScope.types).toBeDefined();
    expect(moduleScope.values).toBeDefined();
    expect(moduleScope.imports.get("crate::types")?.has(request)).toBe(true);
    expect(moduleScope.imports.get("crate::types")?.has(response)).toBe(true);
    expect(moduleScope.imports.get("crate::types")?.size).toBe(2);
    expect(moduleScope.childModules.get("client")?.visibility).toBe(
      "pub(crate)",
    );
  });

  it("defines lexical and function declaration spaces", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("ops", crateScope);
    const lexicalScope = new RustLexicalScope("block", moduleScope);
    const functionScope = new RustFunctionScope("run", moduleScope);

    expect(lexicalScope.localVariables).toBeDefined();
    expect(functionScope.localVariables).toBeDefined();
    expect(functionScope.parameters).toBeDefined();
    expect(functionScope.typeParameters).toBeDefined();
  });

  it("creates impl and trait member scopes", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("types", crateScope);
    const implOwner = createSymbol(
      RustOutputSymbol,
      "Service",
      moduleScope.types,
      { symbolKind: "struct" },
    );
    const traitOwner = createSymbol(
      NamedTypeSymbol,
      "Display",
      moduleScope.types,
      "trait",
      { symbolKind: "trait" },
    );

    const implScope = new RustImplScope(implOwner, moduleScope);
    const traitScope = new RustTraitScope(traitOwner, moduleScope);

    expect(implScope.isMemberScope).toBe(true);
    expect(traitScope.isMemberScope).toBe(true);
    expect(implScope.members).toBe(implOwner.members);
    expect(traitScope.members).toBe(traitOwner.members);
    expect(traitScope.typeParameters).toBe(traitOwner.typeParameters);
  });

  it("resolves scope hooks", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("mod_a", crateScope);

    function RustScopeProbe() {
      return useRustScope().name;
    }

    function RustModuleScopeProbe() {
      return useRustModuleScope().name;
    }

    function RustCrateScopeProbe() {
      return useRustCrateScope().name;
    }

    expect(
      <Output>
        <Scope value={moduleScope}>
          <RustScopeProbe />
        </Scope>
      </Output>,
    ).toRenderTo("mod_a");

    expect(
      <Output>
        <Scope value={moduleScope}>
          <RustModuleScopeProbe />
        </Scope>
      </Output>,
    ).toRenderTo("mod_a");

    expect(
      <Output>
        <Scope value={crateScope}>
          <RustCrateScopeProbe />
        </Scope>
      </Output>,
    ).toRenderTo("my_crate");
  });
});
