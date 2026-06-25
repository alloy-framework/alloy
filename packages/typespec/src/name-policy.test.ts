import { describe, expect, it } from "vitest";
import { createTypeSpecNamePolicy } from "./name-policy.js";

describe("createTypeSpecNamePolicy", () => {
  const policy = createTypeSpecNamePolicy();

  describe("active keywords are escaped in all positions", () => {
    const activeKeywords = [
      "model",
      "enum",
      "op",
      "interface",
      "union",
      "namespace",
      "alias",
      "scalar",
      "import",
      "using",
      "is",
      "extends",
      "const",
      "if",
      "else",
      "true",
      "false",
      "void",
      "never",
      "unknown",
      "typeof",
      "valueof",
    ];

    it.each(activeKeywords)(
      "escapes active keyword '%s' in declaration position",
      (keyword) => {
        expect(policy.getName(keyword, "model")).toBe(`\`${keyword}\``);
      },
    );

    it.each(activeKeywords)(
      "escapes active keyword '%s' in member position",
      (keyword) => {
        expect(policy.getName(keyword, "model-property")).toBe(
          `\`${keyword}\``,
        );
      },
    );
  });

  describe("reserved keywords are escaped only in declaration positions", () => {
    const reservedKeywords = [
      "prop",
      "property",
      "record",
      "array",
      "struct",
      "trait",
      "this",
      "self",
      "super",
      "keyof",
      "with",
      "private",
      "public",
      "protected",
    ];

    it.each(reservedKeywords)(
      "escapes reserved keyword '%s' in declaration position",
      (keyword) => {
        expect(policy.getName(keyword, "model")).toBe(`\`${keyword}\``);
      },
    );

    it.each(reservedKeywords)(
      "does not escape reserved keyword '%s' in model-property position",
      (keyword) => {
        expect(policy.getName(keyword, "model-property")).toBe(keyword);
      },
    );

    it.each(reservedKeywords)(
      "does not escape reserved keyword '%s' in enum-member position",
      (keyword) => {
        expect(policy.getName(keyword, "enum")).toBe(keyword);
      },
    );

    it.each(reservedKeywords)(
      "does not escape reserved keyword '%s' in union-variant position",
      (keyword) => {
        expect(policy.getName(keyword, "union")).toBe(keyword);
      },
    );

    it.each(reservedKeywords)(
      "does not escape reserved keyword '%s' in decorator position",
      (keyword) => {
        expect(policy.getName(keyword, "decorator")).toBe(keyword);
      },
    );
  });

  describe("modifier keywords are not escaped", () => {
    const modifierKeywords = ["extern", "internal"];

    it.each(modifierKeywords)(
      "does not escape modifier keyword '%s' in declaration position",
      (keyword) => {
        expect(policy.getName(keyword, "model")).toBe(keyword);
      },
    );

    it.each(modifierKeywords)(
      "does not escape modifier keyword '%s' in member position",
      (keyword) => {
        expect(policy.getName(keyword, "model-property")).toBe(keyword);
      },
    );
  });

  describe("invalid identifiers are always escaped", () => {
    it("escapes names starting with a digit", () => {
      expect(policy.getName("123abc", "model")).toBe("`123abc`");
      expect(policy.getName("123abc", "model-property")).toBe("`123abc`");
    });

    it("escapes names with spaces", () => {
      expect(policy.getName("my model", "model")).toBe("`my model`");
      expect(policy.getName("my prop", "model-property")).toBe("`my prop`");
    });

    it("escapes names with hyphens", () => {
      expect(policy.getName("my-model", "model")).toBe("`my-model`");
    });
  });

  describe("valid non-keyword names are not escaped", () => {
    const validNames = ["foo", "Bar", "_private", "$special", "camelCase"];

    it.each(validNames)("does not escape '%s'", (name) => {
      expect(policy.getName(name, "model")).toBe(name);
      expect(policy.getName(name, "model-property")).toBe(name);
      expect(policy.getName(name, "enum")).toBe(name);
      expect(policy.getName(name, "union")).toBe(name);
    });
  });
});
