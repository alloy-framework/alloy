import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  EnumDeclaration,
  FunctionDeclaration,
  ImplBlock,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
} from "../src/components/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";

function TypeMemberNamesProbe(props: { name: string }) {
  const scope = useRustModuleScope();

  for (const symbol of scope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === props.name) {
      return [...symbol.members].map((member) => member.name).join(",");
    }
  }

  return "missing";
}

describe("ImplBlock", () => {
  it("renders inherent impl", () => {
    const typeRef = refkey("foo-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef}>
              <FunctionDeclaration name="new" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      impl Foo {
        fn new(&self) {}
      }
    `);
  });

  it("renders trait impl", () => {
    const typeRef = refkey("foo-type");
    const traitRef = refkey("printable-trait");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Printable" refkey={traitRef} />
            <hbr />
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef} trait={traitRef}>
              <FunctionDeclaration name="print" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Printable {}
      struct Foo {}
      impl Printable for Foo {
        fn print(&self) {}
      }
    `);
  });

  it("renders type parameters", () => {
    const typeRef = refkey("foo-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock
              type={typeRef}
              typeParameters={[{ name: "T" }, { name: "U" }]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      impl<T, U> Foo {}
    `);
  });

  it("renders where clause", () => {
    const typeRef = refkey("foo-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef} whereClause="T: Clone" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      impl Foo where T: Clone {}
    `);
  });

  it("adds methods in impl blocks to the target type members", () => {
    const typeRef = refkey("foo-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef}>
              <FunctionDeclaration name="run" />
            </ImplBlock>
            <hbr />
            <TypeMemberNamesProbe name="Foo" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      impl Foo {
        fn run(&self) {}
      }
      run
    `);
  });

  it("supports type as both refkey and inline children", () => {
    const typeRef = refkey("foo-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef} />
            <hbr />
            <ImplBlock type="Vec<T>" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      impl Foo {}
      impl Vec<T> {}
    `);
  });

  it("supports trait as both refkey and inline children", () => {
    const typeRef = refkey("foo-type");
    const traitRef = refkey("displayable-trait");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Displayable" refkey={traitRef} />
            <hbr />
            <StructDeclaration name="Foo" refkey={typeRef} />
            <hbr />
            <ImplBlock type={typeRef} trait={traitRef} />
            <hbr />
            <ImplBlock type="Vec<T>" trait="Display" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Displayable {}
      struct Foo {}
      impl Displayable for Foo {}
      impl Display for Vec<T> {}
    `);
  });

  it("forwards type parameters from generic structs to impl blocks", () => {
    const typeRef = refkey("store-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Store"
              refkey={typeRef}
              typeParameters={[{ name: "K" }, { name: "V" }]}
            />
            <hbr />
            <ImplBlock type={typeRef}>
              <FunctionDeclaration name="new" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Store<K, V> {}
      impl<K, V> Store<K, V> {
        fn new(&self) {}
      }
    `);
  });

  it("forwards type parameters for trait impls", () => {
    const typeRef = refkey("store-type");
    const traitRef = refkey("displayable-trait");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Displayable" refkey={traitRef} />
            <hbr />
            <StructDeclaration
              name="Store"
              refkey={typeRef}
              typeParameters={[{ name: "K" }, { name: "V" }]}
            />
            <hbr />
            <ImplBlock type={typeRef} trait={traitRef}>
              <FunctionDeclaration name="fmt" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Displayable {}
      struct Store<K, V> {}
      impl<K, V> Displayable for Store<K, V> {
        fn fmt(&self) {}
      }
    `);
  });

  it("forwards type parameters from generic enums to impl blocks and keeps where clauses", () => {
    const enumRef = refkey("result-type");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration
              name="Result"
              refkey={enumRef}
              typeParameters={[{ name: "T" }, { name: "E" }]}
            />
            <hbr />
            <ImplBlock type={enumRef} whereClause="T: Clone" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Result<T, E> {}
      impl<T, E> Result<T, E> where T: Clone {}
    `);
  });
});
