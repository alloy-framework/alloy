import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory, MatchArm, MatchExpression, SourceFile } from "../src/components/index.js";
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

describe("MatchExpression", () => {
  it("renders inline match arms", () => {
    expect(
      inFile(
        <MatchExpression expression="self">
          <MatchArm pattern="Self::NotFound">{code`write!(f, "key not found")`}</MatchArm>
          <MatchArm pattern="Self::StorageFull">{code`write!(f, "storage is full")`}</MatchArm>
          <MatchArm pattern="Self::SerializationError(msg)">
            {code`write!(f, "serialization error: {}", msg)`}
          </MatchArm>
        </MatchExpression>,
      ),
    ).toRenderTo(d`
      match self {
        Self::NotFound => write!(f, "key not found"),
        Self::StorageFull => write!(f, "storage is full"),
        Self::SerializationError(msg) => write!(f, "serialization error: {}", msg),
      }
    `);
  });

  it("renders guard clauses", () => {
    expect(
      inFile(
        <MatchExpression expression="entry">
          <MatchArm pattern="Some(e)" guard="e.is_expired()">
            {code`Err(StoreError::NotFound)`}
          </MatchArm>
        </MatchExpression>,
      ),
    ).toRenderTo(d`
      match entry {
        Some(e) if e.is_expired() => Err(StoreError::NotFound),
      }
    `);
  });

  it("renders block arms for multi-statement bodies", () => {
    expect(
      inFile(
        <MatchExpression expression="option">
          <MatchArm pattern="Some(x)">
            {code`println!("got value");`}
            {code`x + 1`}
          </MatchArm>
        </MatchExpression>,
      ),
    ).toRenderTo(d`
      match option {
        Some(x) => {
          println!("got value");
          x + 1
        },
      }
    `);
  });

  it("stc wrappers render the same output", () => {
    expect(
      inFile(
        Stc.MatchExpression({ expression: "result" }).children([
          Stc.MatchArm({ pattern: "Ok(value)" }).children(["value"]),
        ]),
      ),
    ).toRenderTo(d`
      match result {
        Ok(value) => value,
      }
    `);
  });
});
