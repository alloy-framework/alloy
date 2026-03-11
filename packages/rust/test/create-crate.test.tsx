import {
  createOutputBinder,
  getSymbolCreator,
  isRefkey,
  Output,
  render,
  type Children,
} from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { useCrateContext } from "../src/context/crate-context.js";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { Reference } from "../src/components/reference.js";
import { SourceFile } from "../src/components/source-file.js";
import { createCrate, getCrateInfo, getCrateScope } from "../src/create-crate.js";
import { RustCrateScope, RustModuleScope } from "../src/scopes/index.js";
import { useRustModuleScope } from "../src/scopes/contexts.js";
import { findFile } from "./utils.js";

interface ScopeCaptureProps {
  onCapture: (moduleScope: RustModuleScope, crateScope: RustCrateScope) => void;
  children?: Children;
}

function ScopeCapture(props: ScopeCaptureProps) {
  const moduleScope = useRustModuleScope();
  const crateScope = useCrateContext()!.scope;
  props.onCapture(moduleScope, crateScope);
  return <>{props.children}</>;
}

function findChildModule(
  scope: RustCrateScope | RustModuleScope,
  name: string,
): RustModuleScope | undefined {
  for (const child of scope.children) {
    if (child instanceof RustModuleScope && child.name === name) {
      return child;
    }
  }
  return undefined;
}

describe("createCrate", () => {
  it("returns root and module-path refkeys and exposes crate info", () => {
    const serde = createCrate({
      name: "serde",
      version: "1.0.219",
      modules: {
        "": {
          Serialize: { kind: "trait" },
          Deserialize: { kind: "trait" },
        },
        json: {
          to_string: { kind: "function" },
        },
      },
    });

    expect(isRefkey(serde[""].Serialize)).toBe(true);
    expect(isRefkey(serde[""].Deserialize)).toBe(true);
    expect(isRefkey(serde.json.to_string)).toBe(true);
    expect(getCrateInfo(serde)).toEqual({ name: "serde", version: "1.0.219" });
  });

  it("creates crate symbols once per binder and maps module hierarchy", () => {
    const serde = createCrate({
      name: "serde",
      version: "1.0.219",
      modules: {
        "": {
          Serialize: { kind: "trait" },
        },
        json: {
          to_string: { kind: "function" },
        },
      },
    });

    const binder = createOutputBinder();
    getSymbolCreator(serde)(binder);

    const crateScope = getCrateScope(serde, binder)!;
    expect(crateScope).toBeDefined();
    expect(findChildModule(crateScope, "json")).toBeDefined();

    const rootResolution = binder.resolveDeclarationByKey(undefined, serde[""].Serialize).value;
    expect(rootResolution?.symbol.name).toBe("Serialize");

    const jsonResolution = binder.resolveDeclarationByKey(undefined, serde.json.to_string).value;
    expect(jsonResolution?.symbol.name).toBe("to_string");
    expect(jsonResolution?.pathDown.map((scope) => scope.name)).toEqual([
      "serde",
      "json",
    ]);

    const jsonModule = findChildModule(crateScope, "json")!;
    expect(jsonModule.values.symbolNames.has("to_string")).toBe(true);

    getSymbolCreator(serde)(binder);
    expect(jsonModule.values.symbolNames.size).toBe(1);
  });

  it("maps root and nested module paths for external references and tracks dependency version", () => {
    const serde = createCrate({
      name: "serde",
      version: "1.0.219",
      modules: {
        "": {
          Serialize: { kind: "trait" },
        },
        de: {
          Deserializer: { kind: "trait" },
        },
      },
    });

    let consumerModuleScope: RustModuleScope | undefined;
    let consumerCrateScope: RustCrateScope | undefined;

    const output = render(
      <Output externals={[serde]}>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib">
            <ScopeCapture
              onCapture={(capturedModuleScope, capturedCrateScope) => {
                consumerModuleScope = capturedModuleScope;
                consumerCrateScope = capturedCrateScope;
              }}
            >
              type RootAlias = <Reference refkey={serde[""].Serialize} />;
              <hbr />
              type NestedAlias = <Reference refkey={serde.de.Deserializer} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib").contents.trim()).toBe(
      [
        "use serde::Serialize;",
        "use serde::de::Deserializer;",
        "type RootAlias = Serialize;",
        "type NestedAlias = Deserializer;",
      ].join("\n"),
    );

    expect(consumerModuleScope).toBeDefined();
    expect(consumerCrateScope).toBeDefined();
    expect(consumerModuleScope!.imports.get("serde")?.size).toBe(1);
    expect(consumerModuleScope!.imports.get("serde::de")?.size).toBe(1);
    expect(consumerCrateScope!.dependencies.get("serde")).toBe("1.0.219");
  });

  it("references builtin crate symbols without tracking Cargo.toml dependencies", () => {
    const std = createCrate({
      name: "std",
      builtin: true,
      modules: {
        collections: {
          HashMap: { kind: "struct" },
        },
      },
    });

    let consumerCrateScope: RustCrateScope | undefined;

    const output = render(
      <Output externals={[std]}>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib">
            <ScopeCapture
              onCapture={(_, capturedCrateScope) => {
                consumerCrateScope = capturedCrateScope;
              }}
            >
              type DataMap = <Reference refkey={std.collections.HashMap} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib").contents.trim()).toBe(
      ["use std::collections::HashMap;", "type DataMap = HashMap;"].join("\n"),
    );
    expect(consumerCrateScope).toBeDefined();
    expect(consumerCrateScope!.dependencies.has("std")).toBe(false);
  });
});
