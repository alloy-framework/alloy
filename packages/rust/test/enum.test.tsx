import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  EnumDeclaration,
  EnumVariant,
  SourceFile,
} from "../src/components/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";

function EnumKindProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === props.name) {
      return symbol.typeKind;
    }
  }

  return "missing";
}

describe("EnumDeclaration", () => {
  it("renders empty enum", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Foo" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`enum Foo {}`);
  });

  it("renders pub enum", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Foo" pub={true} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub enum Foo {}`);
  });

  it("renders derives and attributes", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration
              name="Foo"
              attributes="#[repr(u8)]"
              derives={["Debug", "Clone"]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      #[repr(u8)]
      #[derive(Debug, Clone)]
      enum Foo {}
    `);
  });

  it("renders enum doc comment", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Foo" doc="Represents status." />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      /// Represents status.
      enum Foo {}
    `);
  });

  it("renders type parameters", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration
              name="Result"
              typeParameters={[{ name: "T" }, { name: "E" }]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`enum Result<T, E> {}`);
  });

  it("creates a NamedTypeSymbol with enum typeKind", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Status" />
            <hbr />
            <EnumKindProbe name="Status" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Status {}
      enum
    `);
  });
});

describe("EnumVariant", () => {
  it("renders unit variant", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Status">
              <EnumVariant name="Pending" />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Status {
        Pending,
      }
    `);
  });

  it("renders tuple variant", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Message">
              <EnumVariant name="Text" fields={["String", "i32"]} />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Message {
        Text(String, i32),
      }
    `);
  });

  it("renders tuple variant from children when kind is tuple", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Message">
              <EnumVariant name="Text" kind="tuple">
                {"String"}
              </EnumVariant>
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Message {
        Text(String),
      }
    `);
  });

  it("renders struct variant with fields", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Message">
              <EnumVariant name="Data" kind="struct">
                {"id: u64,"}
                {"payload: String,"}
              </EnumVariant>
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Message {
        Data {
          id: u64,
          payload: String,
        },
      }
    `);
  });

  it("renders doc comment above variant", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Status">
              <EnumVariant name="Pending" doc="Waiting for processing." />
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Status {
        /// Waiting for processing.
        Pending,
      }
    `);
  });

  it("renders mixed variant kinds", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Event" pub={true}>
              <EnumVariant name="Ready" />
              <EnumVariant name="Data" kind="tuple" fields={["String"]} />
              <EnumVariant name="Error" kind="struct">
                {"code: u32,"}
                {"message: String,"}
              </EnumVariant>
            </EnumDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      pub enum Event {
        Ready,
        Data(String),
        Error {
          code: u32,
          message: String,
        },
      }
    `);
  });

  it("resolves variant references by refkey", () => {
    const pending = refkey("variant-pending");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <EnumDeclaration name="Status">
              <EnumVariant name="Pending" refkey={pending} />
            </EnumDeclaration>
            <hbr />
            {pending}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      enum Status {
        Pending,
      }
      Pending
    `);
  });
});
