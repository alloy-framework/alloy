import { Children, Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  MethodChainExpression,
  SourceFile,
} from "../src/components/index.js";

function inFile(children: Children) {
  return (
    <Output>
      <CrateDirectory name="my_crate">
        <SourceFile path="lib.rs">{children}</SourceFile>
      </CrateDirectory>
    </Output>
  );
}

describe("MethodChainExpression", () => {
  it("renders a basic method call chain", () => {
    expect(
      inFile(
        <MethodChainExpression receiver="items">
          <MethodChainExpression.Call name="iter" />
          <MethodChainExpression.Call name="filter" args={["is_valid"]} />
          <MethodChainExpression.Call name="collect" />
        </MethodChainExpression>,
      ),
    ).toRenderTo(d`items.iter().filter(is_valid).collect()`);
  });

  it("renders turbofish on individual calls", () => {
    expect(
      inFile(
        <MethodChainExpression receiver="items">
          <MethodChainExpression.Call name="iter" />
          <MethodChainExpression.Call name="collect" typeArgs={["Vec<_>"]} />
        </MethodChainExpression>,
      ),
    ).toRenderTo(d`items.iter().collect::<Vec<_>>()`);
  });

  it("renders await and try per chain step", () => {
    expect(
      inFile(
        <MethodChainExpression receiver="client">
          <MethodChainExpression.Call name="send" await try />
          <MethodChainExpression.Call name="json" typeArgs={["Response"]} try />
        </MethodChainExpression>,
      ),
    ).toRenderTo(d`client.send().await?.json::<Response>()?`);
  });

  it("wraps long chains using access-expression call-chain formatting", () => {
    expect(
      inFile(
        <MethodChainExpression receiver="items">
          <MethodChainExpression.Call name="iter" />
          <MethodChainExpression.Call name="filter" args={["predicate"]} />
          <MethodChainExpression.Call name="map" args={["mapper"]} />
          <MethodChainExpression.Call name="collect" typeArgs={["Vec<_>"]} />
        </MethodChainExpression>,
      ),
    ).toRenderTo(
      d`
        items
          .iter()
          .filter(predicate)
          .map(mapper)
          .collect::<Vec<_>>()
      `,
      { printWidth: 20 },
    );
  });
});
