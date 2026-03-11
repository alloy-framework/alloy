import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { createRustNamePolicy } from "../src/name-policy.js";
import {
  ConstDeclaration,
  CrateDirectory,
  SourceFile,
  TypeAlias,
} from "../src/components/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

function TypeAliasSymbolProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === props.name) {
      return `${symbol.typeKind}|${symbol.symbolKind}|${symbol.visibility ?? "none"}`;
    }
  }

  return "missing";
}

function ConstSymbolProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.values) {
    if (symbol instanceof RustOutputSymbol && symbol.name === props.name) {
      return `${symbol.symbolKind}|${symbol.visibility ?? "none"}`;
    }
  }

  return "missing";
}

describe("TypeAlias", () => {
  it("renders a basic type alias", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TypeAlias name="Foo">Bar</TypeAlias>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`type Foo = Bar;`);
  });

  it("renders public and pub(crate) visibility", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TypeAlias name="PublicAlias" pub={true}>
              String
            </TypeAlias>
            <hbr />
            <TypeAlias name="CrateAlias" pub_crate={true}>
              usize
            </TypeAlias>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub type PublicAlias = String;
      pub(crate) type CrateAlias = usize;
    `);
  });

  it("renders type parameters", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TypeAlias
              name="Collection"
              typeParameters={[{ name: "T" }, { name: "U", constraint: "Display" }]}
            >
              {"Vec<T>"}
            </TypeAlias>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`type Collection<T, U: Display> = Vec<T>;`);
  });

  it("creates type-alias symbol with visibility and supports refkey", () => {
    const alias = refkey("response-alias");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TypeAlias name="ResponseValue" refkey={alias} pub_crate={true}>
              String
            </TypeAlias>
            <hbr />
            <TypeAliasSymbolProbe name="ResponseValue" />
            <hbr />
            {alias}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub(crate) type ResponseValue = String;
      type-alias|type-alias|pub(crate)
      ResponseValue
    `);
  });
});

describe("ConstDeclaration", () => {
  it("renders a basic const declaration", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ConstDeclaration name="MAX_SIZE" type="usize">
              100
            </ConstDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`const MAX_SIZE: usize = 100;`);
  });

  it("renders visibility and applies SCREAMING_SNAKE_CASE name policy", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ConstDeclaration name="MAX_SIZE" type="usize" pub={true}>
              100
            </ConstDeclaration>
            <hbr />
            <ConstDeclaration name="WORKER_ID" type="u64" pub_crate={true}>
              1
            </ConstDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub const MAX_SIZE: usize = 100;
      pub(crate) const WORKER_ID: u64 = 1;
    `);
  });

  it("applies SCREAMING_SNAKE_CASE when rust name policy is configured", () => {
    expect(
      <Output namePolicy={createRustNamePolicy()}>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ConstDeclaration name="max-size" type="usize">
              100
            </ConstDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`const MAX_SIZE: usize = 100;`);
  });

  it("creates const symbol with visibility and supports refkey", () => {
    const maxItems = refkey("max-items");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <ConstDeclaration name="MAX_ITEMS" refkey={maxItems} type="usize" pub={true}>
              16
            </ConstDeclaration>
            <hbr />
            <ConstSymbolProbe name="MAX_ITEMS" />
            <hbr />
            {maxItems}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub const MAX_ITEMS: usize = 16;
      const|pub
      MAX_ITEMS
    `);
  });
});
