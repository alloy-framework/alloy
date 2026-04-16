import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory } from "../src/components/crate-directory.js";
import { Declaration } from "../src/components/declaration.js";
import { Reference } from "../src/components/reference.js";
import { SourceFile } from "../src/components/source-file.js";

describe("Declaration", () => {
  it("renders no visibility prefix by default", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="thing" nameKind="struct">
              struct Thing;
            </Declaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`struct Thing;`);
  });

  it("renders pub visibility prefix", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="thing" nameKind="struct" pub={true}>
              struct Thing;
            </Declaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub struct Thing;`);
  });

  it("renders pub(crate) visibility prefix", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="thing" nameKind="struct" pub="crate">
              struct Thing;
            </Declaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub(crate) struct Thing;`);
  });

  it("renders pub(super) visibility prefix", () => {
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="thing" nameKind="struct" pub="super">
              struct Thing;
            </Declaration>
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`pub(super) struct Thing;`);
  });
});

describe("Reference", () => {
  it("resolves explicit Reference component to symbol name", () => {
    const userType = refkey("user-type");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration name="UserType" refkey={userType} nameKind="struct">
              struct UserType;
            </Declaration>
            <hbr />
            type Alias = <Reference refkey={userType} />;
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct UserType;
      type Alias = UserType;
    `);
  });

  it("resolves inline refkeys through SourceFile reference component", () => {
    const responseType = refkey("response-type");
    expect(
      <Output>
        <CrateDirectory name="my_crate">
          <SourceFile path="lib.rs">
            <Declaration
              name="ResponseType"
              refkey={responseType}
              nameKind="struct"
            >
              struct ResponseType;
            </Declaration>
            <hbr />
            type Alias = {responseType};
          </SourceFile>
        </CrateDirectory>
      </Output>,
    ).toRenderTo(d`
      struct ResponseType;
      type Alias = ResponseType;
    `);
  });
});
