import { Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  Field,
  SourceFile,
  StructDeclaration,
} from "../src/components/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";

function StructKindProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === props.name) {
      return symbol.typeKind;
    }
  }

  return "missing";
}

describe("StructDeclaration", () => {
  it("renders basic struct", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`struct Foo {}`);
  });

  it("renders pub struct", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" pub={true} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub struct Foo {}`);
  });

  it("renders derives and attributes", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Foo"
              attributes="#[repr(C)]"
              derives={["Debug", "Clone"]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[repr(C)]
      #[derive(Debug, Clone)]
      struct Foo {}
    `);
  });

  it("renders struct doc comment", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" doc="Represents foo." />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      /// Represents foo.
      struct Foo {}
    `);
  });

  it("renders fields with indentation and trailing commas", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo">
              <Field name="first" type="String" />
              <Field name="second" type="u64" />
            </StructDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {
        first: String,
        second: u64,
      }
    `);
  });

  it("renders type parameters and where clause", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Foo"
              typeParameters={[
                { name: "T" },
                { name: "U", constraint: "Display" },
              ]}
              whereClause="U: Clone"
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`struct Foo<T, U: Display> where U: Clone {}`);
  });

  it("renders tuple struct", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" tuple={true} types={["String", "u64"]} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`struct Foo(String, u64);`);
  });

  it("renders tuple struct with visibility, derives, and generics", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Foo"
              pub={true}
              tuple={true}
              types={["T", "U"]}
              derives={["Debug", "Clone"]}
              typeParameters={[
                { name: "T" },
                { name: "U", constraint: "Display" },
              ]}
              whereClause="U: Clone"
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(
      d`
        #[derive(Debug, Clone)]
        pub struct Foo<T, U: Display>(T, U) where U: Clone;
      `,
    );
  });

  it("renders unit struct", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" unit={true} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`struct Foo;`);
  });

  it("renders unit struct with doc, attributes, and derives", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration
              name="Foo"
              unit={true}
              doc="Represents foo."
              attributes="#[repr(C)]"
              derives={["Debug", "Clone"]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      /// Represents foo.
      #[repr(C)]
      #[derive(Debug, Clone)]
      struct Foo;
    `);
  });

  it("creates a NamedTypeSymbol with typeKind struct", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo" />
            <hbr />
            <StructKindProbe name="Foo" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {}
      struct
    `);
  });
});

describe("Field", () => {
  it("renders pub and pub(crate) visibility", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo">
              <Field name="name" type="String" pub={true} />
              <Field name="id" type="u64" pub_crate={true} />
            </StructDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {
        pub name: String,
        pub(crate) id: u64,
      }
    `);
  });

  it("renders field doc comments", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <StructDeclaration name="Foo">
              <Field name="name" type="String" doc="Primary name." />
            </StructDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct Foo {
        /// Primary name.
        name: String,
      }
    `);
  });
});
