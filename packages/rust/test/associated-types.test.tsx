import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  AssociatedType,
  CrateDirectory,
  ImplBlock,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
} from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";
import { useRustModuleScope } from "../src/scopes/index.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

function MemberKindsProbe(props: { name: string }) {
  const scope = useRustModuleScope();
  for (const symbol of scope.types) {
    if (symbol instanceof NamedTypeSymbol && symbol.name === props.name) {
      return [...symbol.members]
        .map((member) =>
          member instanceof RustOutputSymbol ?
            `${member.name}:${member.symbolKind}`
          : member.name,
        )
        .join(",");
    }
  }

  return "missing";
}

describe("AssociatedType", () => {
  it("renders trait abstract associated type", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Iterable">
              <AssociatedType name="Item" />
            </TraitDeclaration>
            <hbr />
            <MemberKindsProbe name="Iterable" />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Iterable {
        type Item;
      }
      Item:associated-type
    `);
  });

  it("renders trait constrained associated type", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Iterable">
              <AssociatedType name="Item" constraint="Clone" />
            </TraitDeclaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Iterable {
        type Item: Clone;
      }
    `);
  });

  it("renders impl concrete associated type", () => {
    const iterableRef = refkey("iterable-trait");
    const numbersRef = refkey("numbers-struct");

    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Iterable" refkey={iterableRef} />
            <hbr />
            <StructDeclaration name="Numbers" refkey={numbersRef} />
            <hbr />
            <ImplBlock type={numbersRef} trait={iterableRef}>
              <AssociatedType name="Item">u32</AssociatedType>
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Iterable {}
      struct Numbers {}
      impl Iterable for Numbers {
        type Item = u32;
      }
    `);
  });

  it("exports working STC wrapper", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            {Stc.TraitDeclaration({ name: "Iterable" }).children([
              Stc.AssociatedType({ name: "Item", constraint: "Clone" }),
            ])}
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      trait Iterable {
        type Item: Clone;
      }
    `);
  });

  it("throws when used outside trait or impl scope", () => {
    expect(() =>
      render(
        <Output>
          <CrateDirectory name="my_crate">
            <SourceFile path="lib.rs">
              <AssociatedType name="Item" />
            </SourceFile>
          </CrateDirectory>
        </Output>,
      ),
    ).toThrow(
      "Can't create associated type symbol outside of an impl or trait scope.",
    );
  });
});
