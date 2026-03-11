import { code } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { FieldInit, StructExpression } from "../src/components/struct-expression.js";

describe("StructExpression", () => {
  it("renders field initializers", () => {
    expect(
      <StructExpression type="Self">
        <FieldInit name="max_capacity">{code`capacity`}</FieldInit>
      </StructExpression>,
    ).toRenderTo(d`
      Self {
        max_capacity: capacity,
      }
    `);
  });

  it("renders shorthand field initialization", () => {
    expect(
      <StructExpression type="Entry">
        <FieldInit name="value" />
      </StructExpression>,
    ).toRenderTo(d`
      Entry {
        value,
      }
    `);
  });

  it("renders spread after all fields", () => {
    expect(
      <StructExpression type="Self" spread="self">
        <FieldInit name="max_capacity">{code`capacity`}</FieldInit>
        <FieldInit name="default_ttl">{code`None`}</FieldInit>
      </StructExpression>,
    ).toRenderTo(d`
      Self {
        max_capacity: capacity,
        default_ttl: None,
        ..self
      }
    `);
  });
});
