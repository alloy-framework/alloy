import {
  Children,
  Output,
  Scope,
  createScope,
  refkey,
  render,
} from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { useCrateContext } from "../src/context/crate-context.js";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { Declaration } from "../src/components/declaration.js";
import { Reference } from "../src/components/reference.js";
import { SourceFile } from "../src/components/source-file.js";
import { RustCrateScope } from "../src/scopes/rust-crate-scope.js";
import { RustModuleScope, useRustModuleScope } from "../src/scopes/index.js";
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

interface NestedModuleProps {
  name: string;
  children?: Children;
}

function NestedModule(props: NestedModuleProps) {
  const parent = useRustModuleScope();
  const scope = createScope(RustModuleScope, props.name, parent, {
    binder: parent.binder,
  });

  return <Scope value={scope}>{props.children}</Scope>;
}

describe("Rust reference resolution", () => {
  it("renders same-module references without adding use imports", () => {
    const userType = refkey("user-type");
    let moduleScope: RustModuleScope | undefined;

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ScopeCapture
              onCapture={(capturedModuleScope) => {
                moduleScope = capturedModuleScope;
              }}
            >
              <Declaration name="UserType" refkey={userType} nameKind="struct">
                struct UserType;
              </Declaration>
              <hbr />
              type Alias = <Reference refkey={userType} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct UserType;
      type Alias = UserType;
    `);

    expect(moduleScope).toBeDefined();
    expect(moduleScope!.imports.size).toBe(0);
  });

  it("adds crate use imports for same-crate references across modules using pathDown", () => {
    const nestedType = refkey("nested-type");
    let consumerModuleScope: RustModuleScope | undefined;

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="types">
            <NestedModule name="nested">
              <Declaration name="NestedType" refkey={nestedType} nameKind="struct">
                struct NestedType;
              </Declaration>
            </NestedModule>
          </SourceFile>
          <SourceFile path="lib">
            <ScopeCapture
              onCapture={(capturedModuleScope) => {
                consumerModuleScope = capturedModuleScope;
              }}
            >
              type Alias = <Reference refkey={nestedType} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib").contents.trim()).toBe("type Alias = NestedType;");
    expect(consumerModuleScope).toBeDefined();
    expect(consumerModuleScope!.imports.get("crate::types::nested")?.size).toBe(1);
  });

  it("adds external crate use import and crate dependency", () => {
    const externalType = refkey("external-type");
    let consumerModuleScope: RustModuleScope | undefined;
    let consumerCrateScope: RustCrateScope | undefined;

    const output = render(
      <Output>
        <CrateDirectory name="serde">
          <SourceFile path="types">
            <Declaration name="Serialize" refkey={externalType} nameKind="trait">
              trait Serialize;
            </Declaration>
          </SourceFile>
        </CrateDirectory>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib">
            <ScopeCapture
              onCapture={(capturedModuleScope, capturedCrateScope) => {
                consumerModuleScope = capturedModuleScope;
                consumerCrateScope = capturedCrateScope;
              }}
            >
              type Alias = <Reference refkey={externalType} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib").contents.trim()).toBe("type Alias = Serialize;");
    expect(consumerModuleScope).toBeDefined();
    expect(consumerCrateScope).toBeDefined();
    expect(consumerModuleScope!.imports.get("serde::types")?.size).toBe(1);
    expect(consumerCrateScope!.dependencies.get("serde")).toBe("*");
  });

  it("does not add imports for prelude type names", () => {
    const preludeLikeType = refkey("prelude-like-type");
    let consumerModuleScope: RustModuleScope | undefined;

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="types">
            <Declaration name="Option" refkey={preludeLikeType} nameKind="struct">
              struct Option;
            </Declaration>
          </SourceFile>
          <SourceFile path="lib">
            <ScopeCapture
              onCapture={(capturedModuleScope) => {
                consumerModuleScope = capturedModuleScope;
              }}
            >
              type Alias = <Reference refkey={preludeLikeType} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "lib").contents.trim()).toBe("type Alias = Option;");
    expect(consumerModuleScope).toBeDefined();
    expect(consumerModuleScope!.imports.size).toBe(0);
  });
});
