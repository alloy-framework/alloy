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
import { FunctionDeclaration } from "../src/components/function-declaration.js";
import { ImplBlock } from "../src/components/impl-block.js";
import { ModuleDirectory } from "../src/components/module-directory.js";
import { Reference } from "../src/components/reference.js";
import { SourceFile } from "../src/components/source-file.js";
import { Field, StructDeclaration } from "../src/components/struct-declaration.js";
import { TraitDeclaration } from "../src/components/trait-declaration.js";
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
  it("resolves refkey to same-module symbol", () => {
    const userType = refkey("user-type");
    let moduleScope: RustModuleScope | undefined;

    render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ScopeCapture
              onCapture={(capturedModuleScope) => {
                moduleScope = capturedModuleScope;
              }}
            >
              <Declaration name="UserType" refkey={userType} nameKind="struct" pub>
                pub struct UserType;
              </Declaration>
              <hbr />
              type Alias = <Reference refkey={userType} />;
            </ScopeCapture>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    expect(moduleScope).toBeDefined();
    expect(moduleScope!.imports.size).toBe(0);
  });

  it("resolves refkey to different-module symbol in same crate", () => {
    const nestedType = refkey("nested-type");
    let consumerModuleScope: RustModuleScope | undefined;

    render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="types">
            <NestedModule name="nested">
              <Declaration name="NestedType" refkey={nestedType} nameKind="struct" pub>
                pub struct NestedType;
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

    expect(consumerModuleScope).toBeDefined();
    expect(consumerModuleScope!.imports.get("crate::types::nested")?.size).toBe(1);
  });

  it("resolves refkey to external crate symbol and tracks dependency", () => {
    const externalType = refkey("external-type");
    let consumerModuleScope: RustModuleScope | undefined;
    let consumerCrateScope: RustCrateScope | undefined;

    render(
      <Output>
        <CrateDirectory name="serde">
          <SourceFile path="types">
            <Declaration name="Serialize" refkey={externalType} nameKind="trait" pub>
              pub trait Serialize {}
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

    expect(consumerModuleScope).toBeDefined();
    expect(consumerCrateScope).toBeDefined();
    expect(consumerModuleScope!.imports.get("serde::types")?.size).toBe(1);
    expect(consumerCrateScope!.dependencies.get("serde")).toBe("*");
  });

  it("bypasses use tracking for prelude symbols", () => {
    const preludeLikeType = refkey("prelude-like-type");
    let consumerModuleScope: RustModuleScope | undefined;

    render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="types">
            <Declaration name="Option" refkey={preludeLikeType} nameKind="struct" pub>
              pub struct Option;
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

    expect(consumerModuleScope).toBeDefined();
    expect(consumerModuleScope!.imports.size).toBe(0);
  });

  it("throws on private symbol reference from another module", () => {
    const privateType = refkey("private-type");

    expect(() =>
      render(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="models">
              <Declaration name="PrivateModel" refkey={privateType} nameKind="struct">
                struct PrivateModel;
              </Declaration>
            </SourceFile>
            <SourceFile path="routes">
              type Alias = <Reference refkey={privateType} />;
            </SourceFile>
          </CrateDirectory>
        </Output>,
      ),
    ).toThrowError("Cannot reference private symbol 'PrivateModel'");
  });
});

describe("Rust reference nested scope traversal", () => {
  it("resolves Reference inside Field type and emits use in enclosing module", () => {
    const userType = refkey("user-type");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <Declaration name="User" refkey={userType} nameKind="struct" pub>
                pub struct User;
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="routes">
            <SourceFile path="mod.rs">
              <StructDeclaration name="Response">
                <Field name="user" type={<Reference refkey={userType} />} />
              </StructDeclaration>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::User;
      struct Response {
        user: User,
      }
    `.trim());
  });

  it("resolves Reference inside function parameters and returnType", () => {
    const userType = refkey("user-type");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <Declaration name="User" refkey={userType} nameKind="struct" pub>
                pub struct User;
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="routes">
            <SourceFile path="mod.rs">
              <FunctionDeclaration
                name="lookup"
                parameters={[{ name: "user", type: <Reference refkey={userType} /> }]}
                returnType={<Reference refkey={userType} />}
              />
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::User;
      fn lookup(user: User) -> User {}
    `.trim());
  });

  it("resolves Reference inside ImplBlock method signatures", () => {
    const userType = refkey("user-type");
    const routerType = refkey("router-type");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <Declaration name="User" refkey={userType} nameKind="struct" pub>
                pub struct User;
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="routes">
            <SourceFile path="mod.rs">
              <StructDeclaration name="Router" refkey={routerType} />
              <hbr />
              <ImplBlock type={routerType}>
                <FunctionDeclaration
                  name="from_user"
                  receiver="none"
                  parameters={[{ name: "user", type: <Reference refkey={userType} /> }]}
                  returnType={<Reference refkey={userType} />}
                />
              </ImplBlock>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::User;
      struct Router {}
      impl Router {
        fn from_user(user: User) -> User {}
      }
    `.trim());
  });

  it("resolves Reference inside TraitDeclaration method signatures", () => {
    const userType = refkey("user-type");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <Declaration name="User" refkey={userType} nameKind="struct" pub>
                pub struct User;
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="routes">
            <SourceFile path="mod.rs">
              <TraitDeclaration name="UserMapper">
                <FunctionDeclaration
                  name="map_user"
                  receiver="none"
                  parameters={[{ name: "user", type: <Reference refkey={userType} /> }]}
                  returnType={<Reference refkey={userType} />}
                />
              </TraitDeclaration>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    expect(findFile(output, "routes/mod.rs").contents.trim()).toBe(d`
      use crate::models::User;
      trait UserMapper {
        fn map_user(user: User) -> User {}
      }
    `.trim());
  });
});
