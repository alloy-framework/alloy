import "@alloy-js/core/testing";
import { namekey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import {
  isParameterDescriptor,
  type ParameterDescriptor,
} from "../src/parameter-descriptor.js";

function formatParameter(parameter: ParameterDescriptor): string {
  const prefix =
    parameter.refType === "&mut"
      ? "&mut "
      : parameter.refType === "&"
        ? "&"
        : "";
  const mutability = parameter.refType ? "" : parameter.mutable ? "mut " : "";
  return `${prefix}${mutability}${String(parameter.name)}`;
}

describe("isParameterDescriptor", () => {
  it("returns true for a parameter with a string name", () => {
    expect(
      isParameterDescriptor({
        name: "value",
        type: "u32",
        mutable: true,
        refType: "&mut",
      }),
    ).toBe(true);
  });

  it("returns true for a parameter with a namekey name", () => {
    expect(isParameterDescriptor({ name: namekey("value"), refType: "&" })).toBe(
      true,
    );
  });

  it.each([null, undefined, "value", 42, {}, { name: 123 }, { name: true }])(
    "returns false for %o",
    (value) => {
      expect(isParameterDescriptor(value)).toBe(false);
    },
  );
});

describe("ParameterDescriptor usage", () => {
  it("supports expected parameter shape with mutability and reference type", () => {
    const parameter: ParameterDescriptor = {
      name: "item",
      type: "Vec<String>",
      mutable: true,
      refType: "&mut",
    };

    expect(formatParameter(parameter)).toBe("&mut item");
  });
});
