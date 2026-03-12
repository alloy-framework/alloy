import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  AwaitExpression,
  CrateDirectory,
  FunctionDeclaration,
  FunctionCallExpression,
  SourceFile,
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

describe("AwaitExpression", () => {
  it("renders postfix await", () => {
    expect(inFile(<AwaitExpression>{code`client.get(url)`}</AwaitExpression>)).toRenderTo(
      d`client.get(url).await`,
    );
  });

  it("renders postfix await with try operator", () => {
    expect(inFile(<AwaitExpression try>{code`client.get(url)`}</AwaitExpression>)).toRenderTo(
      d`client.get(url).await?`,
    );
  });

  it("composes with other expression components", () => {
    expect(
      inFile(
        <AwaitExpression>
          <FunctionCallExpression target="client.get" args={["url"]} />
        </AwaitExpression>,
      ),
    ).toRenderTo(d`client.get(url).await`);
  });

  it("renders inside async function bodies", () => {
    expect(
      inFile(
        <FunctionDeclaration name="fetch_user" async>
          <AwaitExpression try>{code`client.get(url)`}</AwaitExpression>
        </FunctionDeclaration>,
      ),
    ).toRenderTo(d`
      async fn fetch_user() {
        client.get(url).await?
      }
    `);
  });

  it("stc wrapper renders await and await? forms", () => {
    expect(
      inFile(
        <>
          {Stc.AwaitExpression().children([code`client.get(url)`])}
          <hbr />
          {Stc.AwaitExpression({ try: true }).children([code`client.get(url)`])}
        </>,
      ),
    ).toRenderTo(d`
      client.get(url).await
      client.get(url).await?
    `);
  });
});
