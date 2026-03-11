import { Output } from "@alloy-js/core";
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

describe("lifetime parameter integration", () => {
  it("renders lifetime parameters for function, struct, enum, trait, and impl block", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <FunctionDeclaration
              name="longest"
              typeParameters={[{ lifetime: "'a" }]}
              parameters={[
                { name: "a", type: "&'a str" },
                { name: "b", type: "&'a str" },
              ]}
              returnType="&'a str"
            />
            <hbr />
            <StructDeclaration
              name="Ref"
              typeParameters={[{ lifetime: "'a" }, { name: "T", constraint: "'a + Clone" }]}
            />
            <hbr />
            <EnumDeclaration name="EitherRef" typeParameters={[{ lifetime: "'a" }, { name: "T" }]} />
            <hbr />
            <TraitDeclaration name="Reader" typeParameters={[{ lifetime: "'a" }, { name: "T" }]} />
            <hbr />
            <ImplBlock
              type="Ref<'a, T>"
              typeParameters={[
                { lifetime: "'a" },
                { lifetime: "'b", constraint: "'a" },
                { name: "T", constraint: "'a + Clone" },
              ]}
            />
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {}
      struct Ref<'a, T: 'a + Clone> {}
      enum EitherRef<'a, T> {}
      trait Reader<'a, T> {}
      impl<'a, 'b: 'a, T: 'a + Clone> Ref<'a, T> {}
    `);
  });
});
