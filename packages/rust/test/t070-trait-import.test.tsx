import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  Declaration,
  FunctionDeclaration,
  ImplBlock,
  ModuleDirectory,
  SourceFile,
  StructDeclaration,
  TraitDeclaration,
} from "../src/components/index.js";
import { findFile } from "./utils.js";

describe("T070 - ImplBlock Trait Name Missing Use Import", () => {
  it("generates use statement for external trait reference via refkey in impl block", () => {
    const storeErrorRef = refkey("store-error");
    const displayRef = refkey("display-trait");

    const output = render(
      <Output>
        <CrateDirectory name="std">
          <ModuleDirectory path="fmt">
            <SourceFile path="mod.rs">
              <Declaration name="Display" refkey={displayRef} nameKind="trait" pub>
                pub trait Display {}
              </Declaration>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
        <CrateDirectory name="my_app">
          <SourceFile path="lib.rs">
            <StructDeclaration name="StoreError" refkey={storeErrorRef} />
            <hbr />
            <ImplBlock type={storeErrorRef} trait={displayRef}>
              <FunctionDeclaration name="fmt" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    const libFile = findFile(output, "lib.rs");
    expect(libFile.contents).toContain("use std::fmt::Display");
    expect(libFile.contents).toContain("impl Display for StoreError");
  });

  it("generates use statement for local trait reference via refkey in impl block", () => {
    const userRef = refkey("user-type");
    const greetableRef = refkey("greetable-trait");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <ModuleDirectory path="traits">
            <SourceFile path="mod.rs">
              <TraitDeclaration name="Greetable" refkey={greetableRef} pub />
            </SourceFile>
          </ModuleDirectory>
          <ModuleDirectory path="models">
            <SourceFile path="mod.rs">
              <StructDeclaration name="User" refkey={userRef} pub />
              <hbr />
              <ImplBlock type={userRef} trait={greetableRef}>
                <FunctionDeclaration name="greet" />
              </ImplBlock>
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
      </Output>,
    );

    const modFile = findFile(output, "models/mod.rs");
    expect(modFile.contents).toContain("use crate::traits::Greetable");
    expect(modFile.contents).toContain("impl Greetable for User");
  });

  it("does not generate duplicate use statements when trait already imported", () => {
    const userRef = refkey("user-type");
    const greetableRef = refkey("greetable-trait");

    const output = render(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <TraitDeclaration name="Greetable" refkey={greetableRef} pub />
            <hbr />
            <StructDeclaration name="User" refkey={userRef} pub />
            <hbr />
            <ImplBlock type={userRef} trait={greetableRef}>
              <FunctionDeclaration name="greet" />
            </ImplBlock>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    const libFile = findFile(output, "lib.rs");
    // Should not contain duplicate use statements
    const useCount = (libFile.contents.match(/use.*Greetable/g) || []).length;
    expect(useCount).toBeLessThanOrEqual(1);
    expect(libFile.contents).toContain("impl Greetable for User");
  });

  it("generates use for external trait in blanket impl pattern", () => {
    const displayRef = refkey("display-trait");
    const genericRef = refkey("generic-type");

    const output = render(
      <Output>
        <CrateDirectory name="std">
          <ModuleDirectory path="fmt">
            <SourceFile path="mod.rs">
              <TraitDeclaration name="Display" refkey={displayRef} pub />
            </SourceFile>
          </ModuleDirectory>
        </CrateDirectory>
        <CrateDirectory name="my_app">
          <SourceFile path="lib.rs">
            <StructDeclaration name="MyType" refkey={genericRef} pub typeParameters={[{ name: "T" }]} />
            <hbr />
            <ImplBlock type={genericRef} trait={displayRef} typeParameters={[{ name: "T" }]} />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    );

    const libFile = findFile(output, "lib.rs");
    expect(libFile.contents).toContain("use std::fmt::Display");
    expect(libFile.contents).toContain("impl<T> Display for MyType<T>");
  });
});
