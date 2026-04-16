import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  FunctionCallExpression,
  MethodChainExpression,
  SourceFile,
  TryExpression,
} from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";

function inFile(children: Children) {
  return (
    <Output>
      <CrateDirectory name="my_crate">
        <SourceFile path="lib.rs">{children}</SourceFile>
      </CrateDirectory>
    </Output>
  );
}

describe("TryExpression", () => {
  it("renders postfix question mark operator", () => {
    expect(inFile(<TryExpression>{code`result`}</TryExpression>)).toRenderTo(
      d`result?`,
    );
  });

  it("composes with function call expression", () => {
    expect(
      inFile(
        <TryExpression>
          <FunctionCallExpression
            target="std::fs::read_to_string"
            args={['"file.txt"']}
          />
        </TryExpression>,
      ),
    ).toRenderTo(d`std::fs::read_to_string("file.txt")?`);
  });

  it("composes with method chain expression", () => {
    expect(
      inFile(
        <TryExpression>
          <MethodChainExpression receiver="map">
            <MethodChainExpression.Call name="get" args={['"key"']} />
            <MethodChainExpression.Call
              name="ok_or"
              args={["Error::NotFound"]}
            />
          </MethodChainExpression>
        </TryExpression>,
      ),
    ).toRenderTo(d`map.get("key").ok_or(Error::NotFound)?`);
  });

  it("stc wrapper renders question mark operator", () => {
    expect(inFile(Stc.TryExpression().children([code`result`]))).toRenderTo(
      d`result?`,
    );
  });
});
