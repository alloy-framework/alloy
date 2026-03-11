import { Children, Output, code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  CrateDirectory,
  ElseClause,
  ElseIfClause,
  IfExpression,
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

describe("IfExpression", () => {
  it("renders a simple if expression", () => {
    expect(
      inFile(
        <IfExpression condition="self.data.len() >= self.max_capacity">
          {code`return Err(StoreError::StorageFull);`}
        </IfExpression>,
      ),
    ).toRenderTo(d`
      if self.data.len() >= self.max_capacity {
        return Err(StoreError::StorageFull);
      }
    `);
  });

  it("renders chained else-if and else clauses from children", () => {
    expect(
      inFile(
        <IfExpression condition="entry.status == EntryStatus::Expired">
          {code`Err(StoreError::NotFound)`}
          <ElseIfClause condition="entry.is_stale()">{code`Err(StoreError::NotFound)`}</ElseIfClause>
          <ElseClause>{code`Ok(&entry.value)`}</ElseClause>
        </IfExpression>,
      ),
    ).toRenderTo(d`
      if entry.status == EntryStatus::Expired {
        Err(StoreError::NotFound)
      } else if entry.is_stale() {
        Err(StoreError::NotFound)
      } else {
        Ok(&entry.value)
      }
    `);
  });

  it("supports if-let and nested if expressions", () => {
    expect(
      inFile(
        <IfExpression condition="let Some(ttl) = entry.ttl">
          <IfExpression condition="entry.created_at.elapsed() > ttl">
            {code`return Err(StoreError::NotFound);`}
          </IfExpression>
        </IfExpression>,
      ),
    ).toRenderTo(d`
      if let Some(ttl) = entry.ttl {
        if entry.created_at.elapsed() > ttl {
          return Err(StoreError::NotFound);
        }
      }
    `);
  });

  it("stc wrappers render the same output", () => {
    expect(
      inFile(
        Stc.IfExpression({ condition: "value > 10" }).children([
          "value",
          Stc.ElseIfClause({ condition: "value > 0" }).children(["0"]),
          Stc.ElseClause().children(["-1"]),
        ]),
      ),
    ).toRenderTo(d`
      if value > 10 {
        value
      } else if value > 0 {
        0
      } else {
        -1
      }
    `);
  });
});
