import { Output } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import {
  createRustNamePolicy,
  RustElements,
  useRustNamePolicy,
} from "../src/name-policy.js";

const RESERVED_KEYWORDS = [
  "as",
  "async",
  "await",
  "break",
  "const",
  "continue",
  "crate",
  "dyn",
  "else",
  "enum",
  "extern",
  "false",
  "fn",
  "for",
  "if",
  "impl",
  "in",
  "let",
  "loop",
  "match",
  "mod",
  "move",
  "mut",
  "pub",
  "ref",
  "return",
  "self",
  "Self",
  "static",
  "struct",
  "super",
  "trait",
  "true",
  "type",
  "unsafe",
  "use",
  "where",
  "while",
  "yield",
] as const;

describe("createRustNamePolicy", () => {
  it.each<[RustElements, string, string]>([
    ["struct", "my-type", "MyType"],
    ["enum", "status-kind", "StatusKind"],
    ["enum-variant", "active-state", "ActiveState"],
    ["trait", "display-item", "DisplayItem"],
    ["type-alias", "result-value", "ResultValue"],
    ["type-parameter", "item-type", "ItemType"],
    ["function", "do-work", "do_work"],
    ["method", "run-task", "run_task"],
    ["field", "user-name", "user_name"],
    ["variable", "temp-value", "temp_value"],
    ["parameter", "input-value", "input_value"],
    ["module", "my-module", "my_module"],
    ["constant", "max-retries", "MAX_RETRIES"],
  ])("applies case mapping for %s", (element, input, expected) => {
    const namePolicy = createRustNamePolicy();
    expect(namePolicy.getName(input, element)).toBe(expected);
  });

  it("prefixes all reserved keywords using raw identifiers", () => {
    const namePolicy = createRustNamePolicy();

    for (const keyword of RESERVED_KEYWORDS) {
      const element: RustElements = keyword === "Self" ? "struct" : "variable";
      const expected = keyword === "Self" ? "r#Self" : `r#${keyword}`;
      expect(namePolicy.getName(keyword, element)).toBe(expected);
    }
  });

  it("leaves non-reserved names unchanged after case mapping", () => {
    const namePolicy = createRustNamePolicy();

    expect(namePolicy.getName("already_snake_case", "function")).toBe(
      "already_snake_case",
    );
    expect(namePolicy.getName("alreadyCamel", "variable")).toBe("already_camel");
    expect(namePolicy.getName("already_pascal", "struct")).toBe("AlreadyPascal");
  });
});

describe("useRustNamePolicy", () => {
  it("returns the current output name policy from context", () => {
    const namePolicy = createRustNamePolicy();

    function Probe() {
      const rustNamePolicy = useRustNamePolicy();
      return rustNamePolicy.getName("sample-item", "struct");
    }

    expect(
      <Output namePolicy={namePolicy}>
        <Probe />
      </Output>,
    ).toRenderTo("SampleItem");
  });
});
